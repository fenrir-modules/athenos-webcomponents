import { chainWheelToAnchor } from './scroll-contain';

/**
 * Which edge of the anchor a floating panel lines up with (`start` follows
 * `dir`); `center` centres the panel on the anchor (a toolbar over a text
 * selection).
 */
export type FloatingAlign = 'start' | 'end' | 'auto' | 'center';

/**
 * A rectangle to hang a panel from instead of an element: a caret, a text
 * selection, the spot the pointer rests on. `getBoundingClientRect()` is read
 * on every placement, so a live rectangle keeps the panel in place while
 * things scroll.
 */
export interface FloatingVirtualAnchor {
  getBoundingClientRect(): DOMRect | DOMRectReadOnly;
  /**
   * The element the rectangle belongs to (the editor, the row): its size
   * changes re-place the panel, its `dir` decides `start`/`end`, and its
   * removal from the document stops placing.
   */
  readonly contextElement?: Element | null;
}

/** What `floatPanel` can hang a panel from. */
export type FloatingTarget = Element | FloatingVirtualAnchor;

/** Whether `target` is a virtual anchor rather than an element. */
export function isVirtualAnchor(target: unknown): target is FloatingVirtualAnchor {
  return (
    !!target &&
    typeof target === 'object' &&
    !(typeof Element !== 'undefined' && target instanceof Element) &&
    typeof (target as FloatingVirtualAnchor).getBoundingClientRect === 'function'
  );
}

/** The side of the anchor a panel prefers; it flips when the other side has more room. */
export type FloatingSide = 'bottom' | 'top';

export interface FloatingOptions {
  align?: FloatingAlign;
  /**
   * Preferred side; default `bottom`. `left` / `right` (tooltips) hang the
   * panel beside the anchor, centred on it and flipped to the other side
   * when that has more room; `align`, `matchWidth`, `maxHeight` and `arrow`
   * do not apply there.
   */
  side?: FloatingSide | 'left' | 'right';
  /** Gap between anchor and panel, in px. Default 4. */
  offset?: number;
  /** At least as wide as the anchor. */
  matchWidth?: boolean;
  /** Upper bound for the panel's height in px; the viewport caps it anyway. */
  maxHeight?: number | null;
  /**
   * Promote the panel into the browser's top layer (`popover="manual"`), so no
   * ancestor's `overflow`, `transform` or `z-index` can clip or cover it. Default
   * true; without Popover API support the panel stays `position: fixed` with
   * `z-index: var(--z-popover)`.
   */
  topLayer?: boolean;
  /** An arrow element inside the panel; its `left` is set to point at the anchor's centre. */
  arrow?: HTMLElement | null;
}

/** Stops following when called; `update()` re-measures right away. */
export interface FloatingCleanup {
  (): void;
  update(): void;
}

/** Space kept between a floating panel and the viewport's edges. */
const MARGIN = 8;
/** Below this much room a side is not worth capping to; the panel flips or overlaps. */
const MIN_ROOM = 120;
/** An arrow stays this far from the panel's corners. */
const ARROW_INSET = 12;

/**
 * The one positioning engine of the library (menus, listboxes, popovers,
 * pickers; the `athFloating` directive wraps it).
 *
 * Pins `panel` to `anchor` (an element, or a `FloatingVirtualAnchor` such as
 * a caret rectangle) and keeps it inside the viewport: on the preferred
 * side when it fits, on the other side when that has more room, shifted
 * sideways to stay on screen, height-capped (scrolling inside) when neither
 * side has room for all of it. Follows scrolls in any container, viewport
 * resizes, and size changes of the panel and the anchor.
 *
 * The panel stays where the template rendered it (focus order, event
 * bubbling and "click outside" checks keep working). It is promoted into the
 * top layer, or, without Popover API support, made `position: fixed` with a
 * correction for transformed ancestors that would otherwise move a fixed box.
 *
 * Writes `data-placement="bottom|top"` (`left|right` for a side panel) on the
 * panel for side-dependent styles.
 */
export function floatPanel(
  panel: HTMLElement,
  anchor: FloatingTarget,
  options: FloatingOptions = {}
): FloatingCleanup {
  // The element that stands for the anchor: itself, or a virtual anchor's context.
  const anchorEl: Element | null = isVirtualAnchor(anchor)
    ? (anchor.contextElement ?? null)
    : anchor;
  const style = panel.style;
  style.position = 'fixed';
  style.top = '0';
  style.left = '0';
  style.right = 'auto';
  style.bottom = 'auto';
  style.margin = '0';
  style.zIndex = 'var(--z-popover)';
  // Measured before it is shown, so it never flashes at the wrong place.
  style.visibility = 'hidden';
  panel.setAttribute('data-ath-floating', '');

  const inTopLayer = (options.topLayer ?? true) && promote(panel);

  const commit = (left: number, top: number, placement: string): void => {
    const origin = inTopLayer ? { x: 0, y: 0 } : fixedOrigin(panel);
    style.left = `${Math.round(left - origin.x)}px`;
    style.top = `${Math.round(top - origin.y)}px`;
    style.maxWidth = `${document.documentElement.clientWidth - MARGIN * 2}px`;
    style.visibility = '';
    panel.dataset['placement'] = placement;
  };

  let frame = 0;
  const place = (): void => {
    if ((anchorEl && !anchorEl.isConnected) || !panel.isConnected) return;
    const a = anchor.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    const gap = options.offset ?? 4;

    if (options.matchWidth) style.minWidth = `${Math.round(a.width)}px`;
    // Its natural height, without an earlier cap.
    style.maxHeight = '';
    style.overflowY = '';
    style.overscrollBehaviorY = '';
    const width = Math.min(panel.offsetWidth, vw - MARGIN * 2);
    const natural = panel.offsetHeight;

    if (options.side === 'left' || options.side === 'right') {
      const right = vw - a.right - gap - MARGIN;
      const leftRoom = a.left - gap - MARGIN;
      const toRight =
        options.side === 'right'
          ? width <= right || right >= leftRoom
          : !(width <= leftRoom || leftRoom >= right);
      const x = toRight ? a.right + gap : a.left - gap - width;
      const y = a.top + a.height / 2 - natural / 2;
      commit(
        Math.max(MARGIN, Math.min(x, vw - width - MARGIN)),
        Math.max(MARGIN, Math.min(y, vh - natural - MARGIN)),
        toRight ? 'right' : 'left'
      );
      return;
    }

    const below = vh - a.bottom - gap - MARGIN;
    const above = a.top - gap - MARGIN;
    const down =
      options.side === 'top'
        ? !(natural <= above || above >= below)
        : natural <= below || below >= above;
    let room = Math.max(down ? below : above, MIN_ROOM);
    if (options.maxHeight) room = Math.min(room, options.maxHeight);
    const height = Math.min(natural, room);
    if (natural > room) {
      style.maxHeight = `${Math.floor(room)}px`;
      style.overflowY = 'auto';
      // Capped, the panel scrolls: the wheel stays in it (W5-R). Uncapped it
      // is no scroll container, and the wheel passes to the page.
      style.overscrollBehaviorY = 'contain';
    }

    const rtl = getComputedStyle(anchorEl ?? panel).direction === 'rtl';
    const leftEdge = a.left;
    const rightEdge = a.right - width;
    const fromStart = rtl ? rightEdge : leftEdge;
    const fromEnd = rtl ? leftEdge : rightEdge;
    const fits = (x: number): boolean => x >= MARGIN && x + width <= vw - MARGIN;
    const align = options.align ?? 'start';
    let left =
      align === 'center'
        ? a.left + a.width / 2 - width / 2
        : align === 'end'
          ? fromEnd
          : align === 'auto' && !fits(fromStart)
            ? fromEnd
            : fromStart;
    left = Math.max(MARGIN, Math.min(left, vw - width - MARGIN));
    const top = Math.max(MARGIN, down ? a.bottom + gap : a.top - gap - height);
    commit(left, top, down ? 'bottom' : 'top');

    if (options.arrow) {
      const x = a.left + a.width / 2 - left;
      const clamped = Math.max(ARROW_INSET, Math.min(x, width - ARROW_INSET));
      options.arrow.style.left = `${Math.round(clamped)}px`;
    }
  };
  const schedule = (event?: Event): void => {
    // Scrolling inside the panel itself does not move it.
    if (event?.type === 'scroll' && event.target instanceof Node && panel.contains(event.target)) {
      return;
    }
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(place);
  };

  window.addEventListener('resize', schedule);
  // Out of the flow, its wheel would chain to the document: pass it on.
  const unchain = chainWheelToAnchor(panel, anchorEl);
  // Capture: a scroll in any container moves the anchor.
  document.addEventListener('scroll', schedule, true);
  const resize =
    typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(() => schedule());
  resize?.observe(panel);
  if (anchorEl) resize?.observe(anchorEl);
  place();

  const stop = (): void => {
    cancelAnimationFrame(frame);
    window.removeEventListener('resize', schedule);
    document.removeEventListener('scroll', schedule, true);
    resize?.disconnect();
    unchain();
    if (inTopLayer) demote(panel);
  };
  return Object.assign(stop, { update: place });
}

/** Whether this browser has the Popover API (top layer for non-modal panels). */
export function supportsTopLayer(): boolean {
  return typeof HTMLElement !== 'undefined' && 'showPopover' in HTMLElement.prototype;
}

function promote(panel: HTMLElement): boolean {
  if (!supportsTopLayer() || !panel.isConnected) return false;
  installTopLayerStyles();
  if (!panel.hasAttribute('popover')) panel.setAttribute('popover', 'manual');
  try {
    if (!panel.matches(':popover-open')) panel.showPopover();
    return true;
  } catch {
    panel.removeAttribute('popover');
    return false;
  }
}

function demote(panel: HTMLElement): void {
  try {
    if (panel.matches(':popover-open')) panel.hidePopover();
  } catch {
    // Already gone from the document.
  }
}

/**
 * `[popover]` brings UA styles (border, padding, canvas colours, centring).
 * This resets them at zero specificity, so any component style still wins.
 */
let baseStylesInstalled = false;
const BASE_STYLES =
  ':where([data-ath-floating][popover],[data-ath-top-layer][popover]){inset:auto;margin:0;' +
  'border:0;padding:0;' +
  'background:none;color:inherit;overflow:visible}';

/** @internal Installs the reset once; used by `floatPanel` and `AthOverlayStack`. */
export function installTopLayerStyles(): void {
  if (baseStylesInstalled) return;
  baseStylesInstalled = true;
  try {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(BASE_STYLES);
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
  } catch {
    const el = document.createElement('style');
    el.textContent = BASE_STYLES;
    document.head.appendChild(el);
  }
}

/**
 * Where `position: fixed; left: 0; top: 0` lands for this element. Normally
 * the viewport's corner; inside a transformed ancestor (a centred dialog)
 * `fixed` is relative to that ancestor instead. Measured with a bare probe,
 * so the panel's own entry animation does not skew it.
 */
function fixedOrigin(el: HTMLElement): { x: number; y: number } {
  const parent = el.parentElement;
  if (!parent) return { x: 0, y: 0 };
  const probe = document.createElement('div');
  probe.style.cssText =
    'position:fixed;left:0;top:0;width:0;height:0;visibility:hidden;pointer-events:none';
  parent.appendChild(probe);
  const box = probe.getBoundingClientRect();
  probe.remove();
  return { x: box.left, y: box.top };
}
