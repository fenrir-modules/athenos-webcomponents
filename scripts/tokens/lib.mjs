// Athenos design-token pipeline — pure functions (no I/O except loadConfig).
//
// Source format: DTCG (Design Tokens Community Group) JSON — groups, `$value`,
// `$type` (inherited from the group), `$description`, `$deprecated`
// (inherited) and aliases written as `{group.sub.token}`. Values are kept as
// CSS strings so the output is byte-exact; the files stay readable by
// Style Dictionary 4+ should we ever switch.
//
// Naming rule: a token's CSS custom-property name is its leaf key
// (`color.surface.bg-0` → `--bg-0`). Groups only organise. Leaf keys are
// therefore unique across the whole base set — enforced below.
//
// The base set defines every token. Override sets (dark theme, accent
// presets) may only re-value tokens that exist in the base set, so there is
// exactly one namespace and a typo in an override is a build error.

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const REF = /\{([^{}]+)\}/g;
/** The legacy alias names (quality step 2.7); Stylelint rejects them in styles too. */
export const RETIRED_NAME = /^(ath-.*|gold)$/;
const isToken = (node) => node !== null && typeof node === 'object' && '$value' in node;

export class TokenError extends Error {}

/** Walk a DTCG tree; returns tokens in document order. */
export function flatten(tree, { file = '<memory>' } = {}) {
  const out = [];
  const walk = (node, path, inherited) => {
    const ctx = {
      type: node.$type ?? inherited.type,
      deprecated: node.$deprecated ?? inherited.deprecated,
    };
    for (const [key, child] of Object.entries(node)) {
      if (key.startsWith('$')) continue;
      if (child === null || typeof child !== 'object') {
        throw new TokenError(`${file}: ${[...path, key].join('.')} is neither a group nor a token`);
      }
      const p = [...path, key];
      if (isToken(child)) {
        out.push({
          path: p.join('.'),
          name: key,
          value: child.$value,
          type: child.$type ?? ctx.type,
          description: child.$description,
          deprecated: child.$deprecated ?? ctx.deprecated,
          group: path.join('.'),
          file,
        });
      } else {
        walk(child, p, ctx);
      }
    }
  };
  walk(tree, [], {});
  return out;
}

/** Group descriptions keyed by path, for section comments. */
export function groupDocs(tree) {
  const docs = {};
  const walk = (node, path) => {
    for (const [k, v] of Object.entries(node)) {
      if (k.startsWith('$') || isToken(v)) continue;
      const p = [...path, k].join('.');
      if (v.$description || v.$deprecated)
        docs[p] = { description: v.$description, deprecated: v.$deprecated };
      walk(v, [...path, k]);
    }
  };
  walk(tree, []);
  return docs;
}

/** Build the base index (path → token, name → token) and validate it. */
export function indexBase(tokens) {
  const byPath = new Map();
  const byName = new Map();
  for (const t of tokens) {
    if (!/^[a-z0-9][a-z0-9-]*$/.test(t.name)) {
      throw new TokenError(
        `${t.file}: token name "${t.name}" (${t.path}) is not a valid kebab-case custom-property name`
      );
    }
    if (RETIRED_NAME.test(t.name)) {
      throw new TokenError(
        `${t.file}: --${t.name} (${t.path}) uses a retired name: the --ath-* and --gold aliases were removed in quality step 2.7; name a token by its role (--accent, --fg-2, --space-3)`
      );
    }
    if (byName.has(t.name)) {
      throw new TokenError(
        `${t.file}: duplicate token name --${t.name} (${byName.get(t.name).path} and ${t.path})`
      );
    }
    byPath.set(t.path, t);
    byName.set(t.name, t);
  }
  return { byPath, byName };
}

/** Turn a `$value` into CSS: aliases become var(--leaf). */
export function toCss(value, base, where) {
  if (typeof value === 'number') return String(value);
  if (typeof value !== 'string') {
    throw new TokenError(
      `${where}: $value must be a string or number (object forms are not used here)`
    );
  }
  if (/var\(\s*--/.test(value)) {
    throw new TokenError(`${where}: write aliases as {group.token}, not var(--…) — "${value}"`);
  }
  return value.replace(REF, (_, ref) => {
    const target = base.byPath.get(ref.trim());
    if (!target) throw new TokenError(`${where}: unknown alias {${ref}}`);
    return `var(--${target.name})`;
  });
}

/** Names a CSS value references through var(). */
export const varRefs = (css) => [...css.matchAll(/var\(\s*--([a-z0-9-]+)/g)].map((m) => m[1]);

/**
 * Resolve the config into ordered CSS blocks:
 * [{ selector, when, declarations: [{ name, css, token }], extra }]
 */
export function buildBlocks(config, loadJson) {
  const baseTree = loadJson(config.base);
  const baseTokens = flatten(baseTree, { file: config.base });
  const base = indexBase(baseTokens);
  const docs = groupDocs(baseTree);

  const blocks = [];
  for (const b of config.blocks) {
    let decls;
    if (b.set === config.base) {
      decls = baseTokens.map((t) => ({
        name: t.name,
        css: toCss(t.value, base, `${t.file}: ${t.path}`),
        token: t,
      }));
    } else {
      const overrides = flatten(loadJson(b.set), { file: b.set });
      const seen = new Set();
      for (const o of overrides) {
        const t = base.byPath.get(o.path);
        if (!t)
          throw new TokenError(
            `${b.set}: ${o.path} overrides a token that is not defined in ${config.base}`
          );
        if (seen.has(o.path)) throw new TokenError(`${b.set}: ${o.path} is overridden twice`);
        seen.add(o.path);
      }
      const byPath = new Map(overrides.map((o) => [o.path, o]));
      // Emit in base order so every block reads the same way.
      decls = baseTokens
        .filter((t) => byPath.has(t.path))
        .map((t) => {
          const o = byPath.get(t.path);
          return {
            name: t.name,
            css: toCss(o.value, base, `${o.file}: ${o.path}`),
            token: t,
            description: o.description,
          };
        });
    }
    // A media block (touch sizes) re-values sizes only: the contrast gate and
    // the cascade emulation have no media context, so a colour there would
    // escape them.
    if (b.media) {
      const colour = decls.find((d) => d.token.type === 'color' || d.token.type === 'shadow');
      if (colour)
        throw new TokenError(
          `${b.set}: --${colour.name} is a ${colour.token.type}; a media block may only re-value sizes`
        );
    }
    blocks.push({
      selector: b.selector,
      ...(b.media ? { media: b.media } : {}),
      when: b.when ?? {},
      set: b.set,
      title: b.title,
      declarations: decls,
      extra: b.declarations ?? {},
    });
  }

  const contexts = themeContexts(config);
  for (const ctx of contexts) {
    const map = effectiveMap(blocks, ctx);
    assertNoCycles(map, ctx);
  }
  return { blocks, base, baseTokens, docs };
}

/** Every theme × accent combination the config can produce. */
export function themeContexts(config) {
  const themes = config.contexts?.theme ?? ['light'];
  const accents = config.contexts?.accent ?? [null];
  const out = [];
  for (const theme of themes) for (const accent of accents) out.push({ theme, accent });
  return out;
}

const matches = (when, ctx) => Object.entries(when).every(([k, v]) => ctx[k] === v);

/**
 * Cascade emulation: later matching blocks win (all selectors target <html>).
 * Media blocks are left out: they only re-value sizes (checked in buildBlocks).
 */
export function effectiveMap(blocks, ctx) {
  const map = new Map();
  const ordered = [...blocks].map((b, i) => ({ b, i, spec: Object.keys(b.when).length }));
  // Specificity first (attribute count), then source order.
  ordered.sort((x, y) => x.spec - y.spec || x.i - y.i);
  for (const { b } of ordered) {
    if (b.media || !matches(b.when, ctx)) continue;
    for (const d of b.declarations) map.set(d.name, d.css);
  }
  return map;
}

function assertNoCycles(map, ctx) {
  const state = new Map();
  const visit = (name, stack) => {
    if (state.get(name) === 2) return;
    if (state.get(name) === 1) {
      throw new TokenError(
        `alias cycle in ${JSON.stringify(ctx)}: ${[...stack, name].map((n) => '--' + n).join(' → ')}`
      );
    }
    state.set(name, 1);
    const css = map.get(name);
    if (css) for (const r of varRefs(css)) visit(r, [...stack, name]);
    state.set(name, 2);
  };
  for (const name of map.keys()) visit(name, []);
}

/** Fully resolve a token to a literal CSS string in a context. */
export function resolveValue(map, name, seen = new Set()) {
  if (!map.has(name)) throw new TokenError(`--${name} is not defined in this context`);
  if (seen.has(name)) throw new TokenError(`cycle at --${name}`);
  const next = new Set(seen).add(name);
  return map
    .get(name)
    .replace(/var\(\s*--([a-z0-9-]+)\s*\)/g, (_, n) => resolveValue(map, n, next));
}

// ---------------------------------------------------------------------------
// Colour maths (sRGB, WCAG 2.x relative luminance)
// ---------------------------------------------------------------------------

/** Parse #rgb/#rgba/#rrggbb/#rrggbbaa, rgb()/rgba(), transparent, color-mix(in srgb, …). → [r,g,b,a] 0–255, a 0–1 */
export function parseColor(input) {
  const s = input.trim().toLowerCase();
  if (s === 'transparent') return [0, 0, 0, 0];
  if (s === 'white') return [255, 255, 255, 1];
  if (s === 'black') return [0, 0, 0, 1];
  let m = s.match(/^#([0-9a-f]{3,8})$/);
  if (m) {
    let h = m[1];
    if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join('');
    if (h.length !== 6 && h.length !== 8) throw new TokenError(`bad hex colour ${input}`);
    const n = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
    return [...n, h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1];
  }
  m = s.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/);
  if (m) {
    let a = m[4] === undefined ? 1 : m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
    return [+m[1], +m[2], +m[3], a];
  }
  m = s.match(/^color-mix\(\s*in srgb\s*,(.*)\)$/);
  if (m) return colorMix(splitTopLevel(m[1]));
  throw new TokenError(`cannot evaluate colour "${input}"`);
}

function splitTopLevel(s) {
  const parts = [];
  let depth = 0;
  let cur = '';
  for (const ch of s) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ',' && depth === 0) {
      parts.push(cur.trim());
      cur = '';
    } else cur += ch;
  }
  parts.push(cur.trim());
  return parts;
}

function colorMix([a, b]) {
  const split = (part) => {
    const m = part.match(/^(.*?)(?:\s+([\d.]+)%)?$/);
    return { c: parseColor(m[1]), p: m[2] === undefined ? undefined : parseFloat(m[2]) / 100 };
  };
  const x = split(a);
  const y = split(b);
  let p1 = x.p;
  let p2 = y.p;
  if (p1 === undefined && p2 === undefined) p1 = p2 = 0.5;
  else if (p1 === undefined) p1 = 1 - p2;
  else if (p2 === undefined) p2 = 1 - p1;
  const sum = p1 + p2;
  const scale = sum < 1 ? sum : 1;
  p1 /= sum;
  p2 /= sum;
  // CSS Color 5: interpolate premultiplied components.
  const alpha = x.c[3] * p1 + y.c[3] * p2;
  const rgb = [0, 1, 2].map((i) =>
    alpha === 0 ? 0 : (x.c[i] * x.c[3] * p1 + y.c[i] * y.c[3] * p2) / alpha
  );
  return [...rgb, alpha * scale];
}

/** Composite a (possibly translucent) colour over an opaque one. */
export function over(fg, bg) {
  const a = fg[3];
  return [0, 1, 2].map((i) => fg[i] * a + bg[i] * (1 - a)).concat(1);
}

const channel = (c) => {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};
export const luminance = ([r, g, b]) =>
  0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);

/** WCAG 2.x contrast ratio; translucent colours are composited (fg over bg, bg over white/canvas). */
export function contrast(fgCss, bgCss, canvasCss = '#ffffff') {
  const canvas = parseColor(canvasCss);
  const bg = over(parseColor(bgCss), canvas);
  const fg = over(parseColor(fgCss), bg);
  const [l1, l2] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

/** A colour as an opaque `rgb()` string: composited over the canvas when translucent. */
function opaque(css, canvasCss) {
  const [r, g, b] = over(parseColor(css), parseColor(canvasCss));
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Evaluate config.contrast rules in every context. A translucent `bg` (a
 * tint) is composited over the canvas, or over each token in `rule.over`
 * (the surfaces the tint sits on): one row per bg × backdrop.
 */
export function checkContrast(config, blocks) {
  const rows = [];
  for (const ctx of themeContexts(config)) {
    const map = effectiveMap(blocks, ctx);
    const canvas = resolveValue(map, config.canvas ?? 'bg-0');
    for (const rule of config.contrast ?? []) {
      if (rule.when && !matches(rule.when, ctx)) continue;
      for (const bgName of rule.bg) {
        for (const overName of rule.over ?? [null]) {
          const backdrop = overName ? opaque(resolveValue(map, overName), canvas) : canvas;
          const ratio = contrast(resolveValue(map, rule.fg), resolveValue(map, bgName), backdrop);
          rows.push({
            ...ctx,
            fg: rule.fg,
            bg: bgName,
            ...(overName ? { over: overName } : {}),
            ratio,
            min: rule.min,
            ok: ratio + 1e-9 >= rule.min,
            why: rule.why,
          });
        }
      }
    }
  }
  return rows;
}

// ---------------------------------------------------------------------------
// Renderers
// ---------------------------------------------------------------------------

const HEADER = (
  sources
) => `// =====================================================================
// GENERATED FILE — DO NOT EDIT BY HAND.
// Source of truth: ${sources} (DTCG JSON).
// Regenerate with \`npm run tokens:build\` (runs before \`npm run build:lib\`).
// =====================================================================
`;

function comment(text) {
  return text.replace(/\s+/g, ' ').trim();
}

export function renderScss({ blocks, docs }, { sourceLabel }) {
  let out = HEADER(sourceLabel);
  for (const b of blocks) {
    out += `\n// ---------------------------------------------------------------------\n// ${b.title ?? b.selector}\n// ---------------------------------------------------------------------\n`;
    if (b.media) out += `@media ${b.media} {\n`;
    out += `${b.selector} {\n`;
    const full = b === blocks[0];
    let group = null;
    let top = null;
    for (const d of b.declarations) {
      if (d.token.group !== group) {
        group = d.token.group;
        const head = group.split('.')[0];
        if (full && head !== top) {
          top = head;
          const doc = docs[head];
          out += `\n  // ===== ${head}${doc?.description && head !== group ? ' — ' + comment(doc.description) : ''}\n`;
          if (doc?.deprecated) out += `  // DEPRECATED: ${comment(doc.deprecated)}\n`;
        }
        if (full || b.declarations.length > 12) {
          const doc = docs[group];
          out += `${full && head === group ? '' : '\n'}  // ${group}${full && doc?.description ? ' — ' + comment(doc.description) : ''}\n`;
        }
      }
      let line = `  --${d.name}: ${d.css};`;
      const notes = [];
      const desc = d.description ?? (b === blocks[0] ? d.token.description : undefined);
      if (desc) notes.push(comment(desc));
      if (d.token.deprecated && b === blocks[0]) {
        const target = d.css.match(/^var\(--([a-z0-9-]+)\)$/);
        notes.push(target ? `deprecated → use --${target[1]}` : 'deprecated');
      }
      if (notes.length) line += ` // ${notes.join(' · ')}`;
      out += line + '\n';
    }
    for (const [prop, value] of Object.entries(b.extra)) out += `\n  ${prop}: ${value};\n`;
    out += '}\n';
    if (b.media) out += '}\n';
  }
  return out;
}

/** csstools/value-no-unknown-custom-properties `importFrom` JSON (base values). */
export function renderCustomProperties({ blocks }) {
  const props = {};
  for (const b of blocks) for (const d of b.declarations) props[`--${d.name}`] ??= d.css;
  return JSON.stringify({ customProperties: props }, null, 2) + '\n';
}

/** Machine-readable inventory for scripts (deprecated names, types, groups). */
export function renderInventory({ baseTokens }) {
  const tokens = baseTokens.map((t) => ({
    name: `--${t.name}`,
    path: t.path,
    type: t.type ?? null,
    ...(t.deprecated ? { deprecated: typeof t.deprecated === 'string' ? t.deprecated : true } : {}),
  }));
  return JSON.stringify({ tokens }, null, 2) + '\n';
}

// ---------------------------------------------------------------------------
// Config loading
// ---------------------------------------------------------------------------

export function loadConfig(configPath) {
  const config = JSON.parse(readFileSync(configPath, 'utf8'));
  const dir = dirname(resolve(configPath));
  const loadJson = (rel) => {
    try {
      return JSON.parse(readFileSync(resolve(dir, rel), 'utf8'));
    } catch (e) {
      throw new TokenError(`${rel}: ${e.message}`);
    }
  };
  return { config, dir, loadJson };
}
