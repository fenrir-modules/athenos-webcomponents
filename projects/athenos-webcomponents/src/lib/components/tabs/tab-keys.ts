// Roving focus for a horizontal tab list (WAI-ARIA tabs pattern), shared by
// `ath-tabs` and `ath-segment`: one tab stop, the arrow keys move between
// the enabled tabs (wrapping), Home/End jump. `ath-tri-state` does the same
// for its radio group.

/** The tab that takes the list's one tab stop: the active one, else the first enabled. */
export function tabStopIndex(activeIndex: number, disabled: readonly boolean[]): number {
  return activeIndex >= 0 && !disabled[activeIndex] ? activeIndex : disabled.indexOf(false);
}

/**
 * The tab a key moves to from `index`, skipping disabled ones; `null` for a
 * key the list leaves alone. Left and Right follow the visual order, so they
 * swap in a right-to-left context.
 */
export function nextTabIndex(
  event: KeyboardEvent,
  index: number,
  disabled: readonly boolean[],
  host: HTMLElement
): number | null {
  const count = disabled.length;
  let start = index;
  let step: number;
  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowLeft': {
      const rtl = getComputedStyle(host).direction === 'rtl';
      step = (event.key === 'ArrowRight') !== rtl ? 1 : -1;
      break;
    }
    case 'Home':
      start = -1;
      step = 1;
      break;
    case 'End':
      start = count;
      step = -1;
      break;
    default:
      return null;
  }
  for (let i = 1; i <= count; i++) {
    const next = (((start + step * i) % count) + count) % count;
    if (!disabled[next]) return next;
  }
  return null;
}
