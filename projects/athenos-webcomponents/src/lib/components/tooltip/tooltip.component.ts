import {
  Directive,
  ElementRef,
  OnDestroy,
  Renderer2,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { floatPanel, type FloatingCleanup } from '../floating/floating';

/**
 * Tooltip position variants
 */
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

/** Hover delay before the tooltip shows, and before it hides after leaving. */
const SHOW_DELAY = 300;
const HIDE_DELAY = 100;

let nextTooltipId = 0;

/**
 * Athenos Tooltip Directive
 *
 * Shows a tooltip on hover (after a short delay) and right away on keyboard
 * focus; hides it on leave, blur and Escape. While shown it is a
 * `role="tooltip"` element named in the host's `aria-describedby`, so screen
 * readers read it with the host. Placed with `floatPanel` in the top layer:
 * above dialogs and sheets, flipped and kept inside the viewport.
 *
 * @example
 * <button [athTooltip]="'Click to save'" tooltipPosition="bottom">Save</button>
 */
@Directive({
  selector: '[athTooltip]',
})
export class AthTooltipDirective implements OnDestroy {
  /** Tooltip text */
  readonly text = input('', { alias: 'athTooltip' });

  /** Tooltip position */
  readonly tooltipPosition = input<TooltipPosition>('top');

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly tooltipId = `ath-tooltip-${++nextTooltipId}`;

  private tooltipElement: HTMLElement | null = null;
  private float: FloatingCleanup | null = null;
  private showTimeout: ReturnType<typeof setTimeout> | null = null;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;
  private hovered = false;
  private focused = false;

  private readonly listeners: (() => void)[] = [];
  private unlistenEscape: (() => void) | null = null;

  constructor() {
    const host = this.el.nativeElement;
    const on = (type: string, fn: (event: Event) => void): void => {
      this.listeners.push(this.renderer.listen(host, type, fn));
    };
    on('mouseenter', () => {
      this.hovered = true;
      this.show(SHOW_DELAY);
    });
    on('mouseleave', () => {
      this.hovered = false;
      this.hide();
    });
    on('focusin', (event) => {
      // Keyboard focus only: a click already shows it through hover.
      if (!isKeyboardFocus(event.target)) return;
      this.focused = true;
      this.show(0);
    });
    on('focusout', (event) => {
      const next = (event as FocusEvent).relatedTarget;
      if (next instanceof Node && host.contains(next)) return;
      this.focused = false;
      this.hide();
    });

    // A shown tooltip follows its text; an empty text hides it.
    effect(() => {
      const text = this.text();
      untracked(() => {
        if (!this.tooltipElement) return;
        if (!text) {
          this.removeTooltip();
          return;
        }
        this.tooltipElement.textContent = text;
        this.float?.update();
      });
    });
  }

  ngOnDestroy(): void {
    this.clearTimers();
    this.removeTooltip();
    for (const off of this.listeners.splice(0)) off();
  }

  private show(delay: number): void {
    if (!this.text()) return;
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
    if (this.tooltipElement) return;
    if (delay === 0) {
      this.clearTimers();
      this.createTooltip();
      return;
    }
    if (this.showTimeout) return;
    this.showTimeout = setTimeout(() => {
      this.showTimeout = null;
      this.createTooltip();
    }, delay);
  }

  private hide(): void {
    // Still hovered or keyboard-focused: it stays.
    if (this.hovered || this.focused) return;
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }
    if (!this.tooltipElement || this.hideTimeout) return;
    this.hideTimeout = setTimeout(() => {
      this.hideTimeout = null;
      this.removeTooltip();
    }, HIDE_DELAY);
  }

  private clearTimers(): void {
    if (this.showTimeout) clearTimeout(this.showTimeout);
    if (this.hideTimeout) clearTimeout(this.hideTimeout);
    this.showTimeout = null;
    this.hideTimeout = null;
  }

  private createTooltip(): void {
    const host = this.el.nativeElement;
    // Removed (or destroyed) while the show delay ran: nothing to point at.
    if (this.tooltipElement || !this.text() || !host.isConnected) return;

    const tooltip: HTMLElement = this.renderer.createElement('div') as HTMLElement;
    this.tooltipElement = tooltip;
    this.renderer.addClass(tooltip, 'ath-tooltip');
    this.renderer.addClass(tooltip, `ath-tooltip--${this.tooltipPosition()}`);
    this.renderer.setAttribute(tooltip, 'role', 'tooltip');
    this.renderer.setAttribute(tooltip, 'id', this.tooltipId);
    tooltip.textContent = this.text();

    // Inside an open modal dialog the rest of the page is inert; the tooltip
    // stays in the dialog so it is read and shown with it.
    const container = host.closest('dialog') ?? host.ownerDocument.body;
    this.renderer.appendChild(container, tooltip);
    const position = this.tooltipPosition();
    this.float = floatPanel(tooltip, host, { side: position, align: 'center', offset: 8 });
    // Without top-layer support: the tooltip layer, not the popover one.
    tooltip.style.zIndex = '';
    this.setDescribedBy(true);

    this.unlistenEscape = this.renderer.listen(host.ownerDocument, 'keydown', (event) => {
      if ((event as KeyboardEvent).key !== 'Escape') return;
      this.clearTimers();
      this.removeTooltip();
    });

    // Next frame, so the CSS transition runs from the hidden state (not change detection).
    requestAnimationFrame(() => {
      if (this.tooltipElement === tooltip) {
        this.renderer.addClass(tooltip, 'ath-tooltip--visible');
      }
    });
  }

  private removeTooltip(): void {
    this.unlistenEscape?.();
    this.unlistenEscape = null;
    this.float?.();
    this.float = null;
    if (this.tooltipElement) {
      this.tooltipElement.remove();
      this.tooltipElement = null;
      this.setDescribedBy(false);
    }
  }

  /** Adds or removes the tooltip's id, keeping ids the app set on the host. */
  private setDescribedBy(on: boolean): void {
    const host = this.el.nativeElement;
    const ids = (host.getAttribute('aria-describedby') ?? '')
      .split(/\s+/)
      .filter((id) => id && id !== this.tooltipId);
    if (on) ids.push(this.tooltipId);
    if (ids.length) host.setAttribute('aria-describedby', ids.join(' '));
    else host.removeAttribute('aria-describedby');
  }
}

function isKeyboardFocus(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  try {
    return target.matches(':focus-visible');
  } catch {
    // No `:focus-visible` support: treat focus as keyboard focus.
    return true;
  }
}
