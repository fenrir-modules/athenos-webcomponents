import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  input,
  output,
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

/**
 * Athenos Tabs Component
 *
 * Tab navigation for switching between content sections.
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
