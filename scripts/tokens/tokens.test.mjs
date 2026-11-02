// node --test scripts/tokens/   (npm run test:tokens)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  flatten,
  indexBase,
  toCss,
  buildBlocks,
  effectiveMap,
  resolveValue,
  parseColor,
  contrast,
  checkContrast,
  renderScss,
  RETIRED_NAME,
  TokenError,
} from './lib.mjs';
import { generate } from './build.mjs';
import { extract, diff } from './parity.mjs';

const tiny = {
  base: 'base',
  contexts: { theme: ['light', 'dark'], accent: [null, 'blue'] },
  blocks: [
    { selector: ':root', set: 'base' },
    { selector: '[data-theme="dark"]', when: { theme: 'dark' }, set: 'dark' },
    { selector: '[data-accent="blue"]', when: { accent: 'blue' }, set: 'blue' },
    {
      selector: '[data-theme="dark"][data-accent="blue"]',
      when: { theme: 'dark', accent: 'blue' },
      set: 'blue-dark',
    },
  ],
};
const tinySets = {
  base: {
    color: {
      $type: 'color',
      bg: { $value: '#ffffff' },
      fg: { $value: '#111111', $description: 'text' },
      accent: { $value: '#4f46e5' },
      ring: { $value: '{color.accent}' },
    },
    old: { $deprecated: 'use --accent', 'primary-old': { $value: '{color.accent}' } },
    z: { $type: 'number', 'z-a': { $value: 1 } },
  },
  dark: { color: { bg: { $value: '#111113' }, fg: { $value: '#eeeeee' } } },
  blue: { color: { accent: { $value: '#2563eb' } } },
  'blue-dark': { color: { accent: { $value: '#5b80d4' } } },
};
const load = (sets) => (name) => structuredClone(sets[name]);

test('flatten inherits $type and $deprecated from groups', () => {
  const t = flatten(tinySets.base);
  assert.equal(t.find((x) => x.name === 'fg').type, 'color');
  assert.equal(t.find((x) => x.name === 'z-a').type, 'number');
  assert.equal(t.find((x) => x.name === 'primary-old').deprecated, 'use --accent');
  assert.equal(t.find((x) => x.name === 'fg').deprecated, undefined);
});

test('leaf names must be unique and kebab-case', () => {
  assert.throws(
    () => indexBase(flatten({ a: { x: { $value: '1' } }, b: { x: { $value: '2' } } })),
    /duplicate token name --x/
  );
  assert.throws(
    () => indexBase(flatten({ a: { Bad_Name: { $value: '1' } } })),
    /not a valid kebab-case/
  );
});

test('aliases become var(); unknown aliases and raw var() are errors', () => {
  const base = indexBase(flatten(tinySets.base));
  assert.equal(toCss('{color.accent}', base, 'x'), 'var(--accent)');
  assert.equal(
    toCss('0 0 0 2px {color.bg}, 0 0 0 4px {color.ring}', base, 'x'),
    '0 0 0 2px var(--bg), 0 0 0 4px var(--ring)'
  );
  assert.equal(toCss(1000, base, 'x'), '1000');
  assert.throws(() => toCss('{color.nope}', base, 'x'), /unknown alias \{color.nope\}/);
  assert.throws(() => toCss('var(--accent)', base, 'x'), /write aliases as/);
});

test('override sets may only re-value existing tokens', () => {
  const sets = { ...tinySets, dark: { color: { typo: { $value: '#000' } } } };
  assert.throws(() => buildBlocks(tiny, load(sets)), /overrides a token that is not defined/);
});

test('alias cycles are detected per theme context', () => {
  const sets = structuredClone(tinySets);
  sets.base.color.a = { $value: '{color.b}' };
  sets.base.color.b = { $value: '{color.a}' };
  assert.throws(() => buildBlocks(tiny, load(sets)), /alias cycle/);
});

test('cascade emulation: specificity, then source order', () => {
  const { blocks } = buildBlocks(tiny, load(tinySets));
  const m = (theme, accent) => effectiveMap(blocks, { theme, accent });
  assert.equal(resolveValue(m('light', null), 'ring'), '#4f46e5');
  assert.equal(resolveValue(m('light', 'blue'), 'ring'), '#2563eb');
  assert.equal(resolveValue(m('dark', 'blue'), 'ring'), '#5b80d4');
  assert.equal(resolveValue(m('dark', null), 'bg'), '#111113');
});

test('a media block wraps its selector, re-values sizes only and stays out of the cascade emulation', () => {
  const sets = {
    ...structuredClone(tinySets),
    touch: { z: { 'z-a': { $value: 2 } } },
  };
  const config = {
    ...tiny,
    blocks: [...tiny.blocks, { selector: ':root', media: '(pointer: coarse)', set: 'touch' }],
  };
  const built = buildBlocks(config, load(sets));
  const scss = renderScss(built, { sourceLabel: 'tiny' });
  assert.match(scss, /@media \(pointer: coarse\) \{\n:root \{\n {2}--z-a: 2;\n\}\n\}\n/);
  assert.equal(
    resolveValue(effectiveMap(built.blocks, { theme: 'light', accent: null }), 'z-a'),
    '1'
  );
  const colour = { ...sets, touch: { color: { bg: { $value: '#000000' } } } };
  assert.throws(() => buildBlocks(config, load(colour)), /may only re-value sizes/);
});

test('the touch block raises --control-h-sm on phones and coarse pointers', () => {
  const scss = readFileSync(
    new URL('../../projects/athenos-webcomponents/src/lib/styles/_tokens.scss', import.meta.url),
    'utf8'
  );
  assert.match(
    scss,
    /@media \(pointer: coarse\), \(max-width: 639px\) \{\n:root,\n\[data-theme\] \{\n {2}--control-h-sm: 36px;.*\n {2}--control-h: 36px;/
  );
});

test('rendered SCSS marks deprecated aliases and keeps descriptions', () => {
  const built = buildBlocks(tiny, load(tinySets));
  const scss = renderScss(built, { sourceLabel: 'tiny' });
  assert.match(scss, /--primary-old: var\(--accent\); \/\/ deprecated → use --accent/);
  assert.match(scss, /--fg: #111111; \/\/ text/);
  assert.match(scss, /GENERATED FILE — DO NOT EDIT/);
});

test('colour parsing', () => {
  assert.deepEqual(parseColor('#fff'), [255, 255, 255, 1]);
  assert.deepEqual(parseColor('#00000080').slice(0, 3), [0, 0, 0]);
  assert.ok(Math.abs(parseColor('#00000080')[3] - 128 / 255) < 1e-9);
  assert.deepEqual(parseColor('rgba(15, 23, 42, 0.5)'), [15, 23, 42, 0.5]);
  // color-mix with white: 88% green + 12% white
  const mixed = parseColor('color-mix(in srgb, #46a86e 88%, #fff)');
  assert.ok(Math.abs(mixed[0] - (0x46 * 0.88 + 255 * 0.12)) < 1e-9);
  // premultiplied: mixing with transparent keeps the hue, scales alpha
  const tint = parseColor('color-mix(in srgb, #4f46e5 12%, transparent)');
  assert.deepEqual(tint.slice(0, 3).map(Math.round), [0x4f, 0x46, 0xe5]);
  assert.ok(Math.abs(tint[3] - 0.12) < 1e-9);
  assert.throws(() => parseColor('hsl(0 0% 0%)'), /cannot evaluate/);
});

test('WCAG contrast ratio matches known values', () => {
  assert.ok(Math.abs(contrast('#000000', '#ffffff') - 21) < 1e-9);
  assert.equal(contrast('#767676', '#ffffff').toFixed(2), '4.54');
  assert.equal(contrast('#4f46e5', '#ffffff').toFixed(2), '6.29');
  // translucent fg is composited over the background first
  assert.equal(contrast('#4f46e526', '#ffffff').toFixed(2), '1.25');
});

// ---------------------------------------------------------------------------
// The real token set
// ---------------------------------------------------------------------------
const real = generate();

test('generated outputs on disk are up to date', () => {
  for (const [file, content] of Object.entries(real.files)) {
    assert.equal(
      readFileSync(file, 'utf8'),
      content,
      `${file} is stale — run npm run tokens:build`
    );
  }
});

test('every contrast rule passes in every theme × accent', () => {
  const failures = real.contrast
    .filter((r) => !r.ok)
    .map((r) => `${r.fg}/${r.bg} ${r.theme}/${r.accent} ${r.ratio.toFixed(2)}`);
  assert.deepEqual(failures, []);
  assert.ok(real.contrast.length > 400);
});

test('the WCAG fixes stay gated (DS-12, DS-16)', () => {
  const rule = (fg, min) => real.contrast.filter((r) => r.fg === fg && r.min === min);
  for (const [fg, min] of [
    ['focus-ring-color', 3],
    ['fg-label', 4.5],
    ['amber-text', 4.5],
    ['action-create-fg', 4.5],
    ['red-text', 4.5],
    ['green-text', 4.5],
    ['blue-text', 4.5],
    ['purple-text', 4.5],
    ['accent-text', 4.5],
    ['action-danger-fg', 4.5],
  ]) {
    const rows = rule(fg, min);
    assert.ok(rows.length >= 12, `contrast rule for --${fg} ≥ ${min} is missing`);
    assert.ok(rows.every((r) => r.ok));
  }
});

test('status text is gated on its own tint, over the canvas and over cards', () => {
  for (const hue of ['red', 'green', 'blue', 'purple', 'amber']) {
    const rows = real.contrast.filter((r) => r.fg === `${hue}-text` && r.bg === `${hue}-tint`);
    assert.deepEqual([...new Set(rows.map((r) => r.over))].sort(), ['bg-0', 'surface'], hue);
    assert.ok(rows.length === 24 && rows.every((r) => r.ok), hue);
  }
  const pressed = real.contrast.filter(
    (r) => r.fg === 'action-primary-fg' && r.bg === 'action-primary-bg-active'
  );
  assert.ok(pressed.length === 12 && pressed.every((r) => r.ok), 'primary pressed state');
});

test('one z-index scale: unique, strictly increasing, all numbers', () => {
  const z = real.built.baseTokens.filter((t) => t.group === 'z-index');
  assert.ok(z.length >= 10);
  const values = z.map((t) => t.value);
  assert.ok(
    values.every((v) => Number.isInteger(v)),
    'z-index tokens are integers'
  );
  for (let i = 1; i < values.length; i++)
    assert.ok(values[i] > values[i - 1], `--${z[i].name} must be above --${z[i - 1].name}`);
});

test('no --ath-* or --gold token is generated (aliases removed in 2.7)', () => {
  const retired = real.built.baseTokens.filter((t) => RETIRED_NAME.test(t.name));
  assert.deepEqual(
    retired.map((t) => t.name),
    []
  );
  const scss = Object.entries(real.files).find(([f]) => f.endsWith('_tokens.scss'))[1];
  assert.doesNotMatch(scss, /--(ath-[a-z0-9-]+|gold)\s*:/);
});

test('a retired --ath-* or --gold name is a build error', () => {
  for (const name of ['ath-text-primary', 'gold']) {
    const sets = structuredClone(tinySets);
    sets.base.color[name] = { $value: '{color.accent}' };
    assert.throws(() => buildBlocks(tiny, load(sets)), /retired name/);
  }
});

test('light tokens also answer to [data-theme="light"] (DS-15)', () => {
  const scss = Object.entries(real.files).find(([f]) => f.endsWith('_tokens.scss'))[1];
  assert.match(scss, /^:root,\n\[data-theme="light"\] \{/m);
});

test('custom-properties export lists every token', () => {
  const json = JSON.parse(
    Object.entries(real.files).find(([f]) => f.endsWith('tokens.custom-properties.json'))[1]
  );
  assert.equal(Object.keys(json.customProperties).length, real.built.baseTokens.length);
  for (const n of [
    '--focus-ring-shadow',
    '--focus-ring-color',
    '--amber-text',
    '--z-raised',
    '--bg-0',
  ])
    assert.ok(n in json.customProperties, n);
  // DS-14's undefined app tokens; --scrim has been a real token since step 1.6 (ath-dialog backdrop).
  assert.ok('--scrim' in json.customProperties, '--scrim');
  for (const n of ['--bg', '--r-md', '--focus-ring'])
    assert.ok(!(n in json.customProperties), `${n} must stay undefined`);
});

test('parity extract/diff', () => {
  const a = extract(':root { --a: 1; --b: 2; color: red } [x] { --a: 3 }');
  const b = extract(':root, [y] { --a: 1; --b: 9; color: red } [x] { --a: 3 }');
  const d = diff(a, b);
  assert.deepEqual(d.changes.map((c) => `${c.selector} ${c.prop} ${c.before}→${c.after}`).sort(), [
    ':root --b 2→9',
    '[y] --a null→1',
    '[y] --b null→9',
  ]);
  assert.deepEqual(d.ruleChanges, [{ rule: '[y] { color: red }', change: 'added' }]);
});

test('checkContrast honours rule.when', () => {
  const cfg = {
    ...tiny,
    canvas: 'bg',
    contrast: [{ fg: 'fg', bg: ['bg'], min: 4.5, when: { theme: 'dark' } }],
  };
  const { blocks } = buildBlocks(cfg, load(tinySets));
  const rows = checkContrast(cfg, blocks);
  assert.ok(rows.length === 2 && rows.every((r) => r.theme === 'dark' && r.ok));
});

test('checkContrast composites a translucent bg over each rule.over backdrop', () => {
  const sets = structuredClone(tinySets);
  sets.base.color.card = { $value: '#000000' };
  sets.base.color.tint = { $value: '#4f46e580' };
  const rule = { fg: 'fg', bg: ['tint'], min: 1, when: { theme: 'light' } };
  const cfg = { ...tiny, canvas: 'bg', contrast: [{ ...rule, over: ['bg', 'card'] }] };
  const { blocks } = buildBlocks(cfg, load(sets));
  const rows = checkContrast(cfg, blocks);
  assert.deepEqual(
    rows.map((r) => `${r.accent ?? '-'} ${r.over}`),
    ['- bg', '- card', 'blue bg', 'blue card']
  );
  const [onBg, onCard] = rows;
  assert.equal(onBg.ratio, contrast('#111111', '#4f46e580', '#ffffff'));
  assert.equal(onCard.ratio, contrast('#111111', '#4f46e580', '#000000'));
  assert.ok(onBg.ratio > onCard.ratio, 'the same tint is darker over a black card');
  // without `over`: one row per bg, composited over the canvas
  const plain = checkContrast({ ...cfg, contrast: [rule] }, blocks);
  assert.ok(plain.length === 2 && !('over' in plain[0]));
  assert.equal(plain[0].ratio, onBg.ratio);
});

test('TokenError is the error type for source problems', () => {
  assert.throws(() => toCss({}, indexBase([]), 'x'), TokenError);
});
