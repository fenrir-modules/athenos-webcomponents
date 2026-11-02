// Colour probes for specs: what a computed style actually paints, measured
// the way WCAG 2.x does. Specs only (not part of the public API).

/** [r, g, b, a] with r/g/b 0–255 and a 0–1, from `rgb()`/`rgba()` or (a color-mix) `color(srgb …)`. */
export type Rgba = [number, number, number, number];

export function parseColour(css: string): Rgba {
  const nums = (css.match(/[\d.]+/g) ?? []).map(Number);
  if (css.startsWith('color(')) {
    return [nums[0] * 255, nums[1] * 255, nums[2] * 255, nums[3] ?? 1];
  }
  if (css === 'transparent') return [0, 0, 0, 0];
  return [nums[0], nums[1], nums[2], nums[3] ?? 1];
}

/** `fg` (possibly translucent) painted over the opaque `bg`. */
export function over(fg: Rgba, bg: Rgba): Rgba {
  const a = fg[3];
  return [0, 1, 2].map((i) => fg[i] * a + bg[i] * (1 - a)).concat(1) as Rgba;
}

export function luminance(c: Rgba): number {
  const [r, g, b] = c.slice(0, 3).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a: Rgba, b: Rgba): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * The opaque colour behind `el`: its own background and its ancestors',
 * composited down to the first opaque one (white when none is).
 */
export function backdrop(el: Element): Rgba {
  const layers: Rgba[] = [];
  for (let e: Element | null = el; e; e = e.parentElement) {
    const c = parseColour(getComputedStyle(e).backgroundColor);
    if (c[3] > 0) layers.push(c);
    if (c[3] >= 1) break;
  }
  let base: Rgba = [255, 255, 255, 1];
  for (const c of layers.reverse()) base = over(c, base);
  return base;
}

/** The colour a token resolves to in the current theme. */
export function tokenColour(name: string): Rgba {
  const probe = document.createElement('span');
  probe.style.background = `var(--${name})`;
  document.body.append(probe);
  const c = parseColour(getComputedStyle(probe).backgroundColor);
  probe.remove();
  return c;
}

/** Runs `fn` with `data-theme` set on <html>, then restores it. */
export function inTheme(theme: 'light' | 'dark', fn: () => void): void {
  const root = document.documentElement;
  const before = root.dataset['theme'];
  root.dataset['theme'] = theme;
  try {
    fn();
  } finally {
    if (before === undefined) delete root.dataset['theme'];
    else root.dataset['theme'] = before;
  }
}
