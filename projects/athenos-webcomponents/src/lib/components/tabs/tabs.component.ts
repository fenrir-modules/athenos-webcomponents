import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { nextTabIndex, tabStopIndex } from './tab-keys';

/**
 * Tab item definition
 */
export interface TabItem {
  id: string;
  label: string;
  /** Optional inline count badge after the label (e.g., `12`, `'3/5'`). */
  count?: number | string;
  disabled?: boolean;
}

/** Room kept beside the active tab when it is scrolled into view (the fade's width). */
const EDGE = 24;

/**
 * Athenos Tabs Component
 *
 * Tab navigation for switching between content sections. More tabs than
 * fit scroll sideways (no scrollbar): a fade marks each side that has more,
 * and the active tab is scrolled into view when it changes.
 *
 * @example
 * <ath-tabs [tabs]="tabs" [activeTab]="activeTab" (tabChanged)="activeTab = $event" />
 */
@Component({
  selector: 'ath-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class AthTabsComponent {
  /** Tab items */
  readonly tabs = input<TabItem[]>([]);

  /** Currently active tab ID. Controlled: pair with `(tabChanged)`. */
  readonly activeTab = input('');

  /** Tab change event */
  readonly tabChanged = output<string>();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly list = viewChild<ElementRef<HTMLElement>>('list');

  /** Which physical sides of the bar have tabs scrolled out of view. */
  protected readonly fadeLeft = signal(false);
  protected readonly fadeRight = signal(false);

  constructor() {
    // DOM sync without a render hook: follows the list element, then the
    // active tab once the frame has rendered it.
    effect((onCleanup) => {
      const el = this.list()?.nativeElement;
      if (!el || typeof ResizeObserver === 'undefined') return;
      const observer = untracked(() => new ResizeObserver(() => this.syncFade()));
      observer.observe(el);
      onCleanup(() => observer.disconnect());
    });
    effect((onCleanup) => {
      const el = this.list()?.nativeElement;
      const index = this.tabs().findIndex((tab) => tab.id === this.activeTab());
      if (!el || index < 0 || typeof requestAnimationFrame === 'undefined') return;
      const frame = requestAnimationFrame(() => this.reveal(el, index));
      onCleanup(() => cancelAnimationFrame(frame));
    });
  }

  protected syncFade(): void {
    const el = this.list()?.nativeElement;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    // Right-to-left: scrollLeft runs from 0 (start, at the right) to -max.
    const x = Math.abs(el.scrollLeft);
    const rtl = el.scrollLeft < 0 || getComputedStyle(el).direction === 'rtl';
    const startHidden = max > 1 && x > 1;
    const endHidden = max > 1 && x < max - 1;
    this.fadeLeft.set(rtl ? endHidden : startHidden);
    this.fadeRight.set(rtl ? startHidden : endHidden);
  }

  /** Scrolls the bar (never the page) so the tab at `index` is in view. */
  private reveal(el: HTMLElement, index: number): void {
    const tab = el.querySelectorAll<HTMLElement>('[role="tab"]')[index];
    if (tab && el.scrollWidth > el.clientWidth) {
      const bar = el.getBoundingClientRect();
      const r = tab.getBoundingClientRect();
      if (r.left < bar.left + EDGE) el.scrollLeft += r.left - bar.left - EDGE;
      else if (r.right > bar.right - EDGE) el.scrollLeft += r.right - bar.right + EDGE;
    }
    this.syncFade();
  }

  /** The one tab in the tab order; the arrow keys reach the others. */
  protected readonly tabStop = computed(() => {
    const tabs = this.tabs();
    return tabStopIndex(
      tabs.findIndex((tab) => tab.id === this.activeTab()),
      tabs.map((tab) => !!tab.disabled)
    );
  });

  selectTab(tab: TabItem): void {
    if (!tab.disabled && tab.id !== this.activeTab()) {
      this.tabChanged.emit(tab.id);
    }
  }

  protected onKey(event: KeyboardEvent, index: number): void {
    const tabs = this.tabs();
    const next = nextTabIndex(
      event,
      index,
      tabs.map((tab) => !!tab.disabled),
      this.host.nativeElement
    );
    if (next === null) return;
    event.preventDefault();
    this.selectTab(tabs[next]);
    this.host.nativeElement.querySelectorAll<HTMLElement>('[role="tab"]')[next]?.focus();
  }

  getTabClasses(tab: TabItem): string {
    return [
      'ath-tabs__tab',
      tab.id === this.activeTab() ? 'ath-tabs__tab--active' : '',
      tab.disabled ? 'ath-tabs__tab--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
