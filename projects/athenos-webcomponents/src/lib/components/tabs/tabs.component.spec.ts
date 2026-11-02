import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AthTabsComponent, type TabItem } from './tabs.component';

const TABS: TabItem[] = [
  { id: 'open', label: 'Open' },
  { id: 'off', label: 'Archived', disabled: true },
  { id: 'done', label: 'Done' },
  { id: 'all', label: 'All' },
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthTabsComponent],
  template: `<ath-tabs [tabs]="tabs" [activeTab]="active()" (tabChanged)="active.set($event)" />`,
})
class TabsHostComponent {
  readonly tabs = TABS;
  readonly active = signal('open');
}

describe('AthTabsComponent', () => {
  function setup() {
    const fixture = TestBed.createComponent(TabsHostComponent);
    fixture.detectChanges();
    const tabs = () =>
      Array.from(
        (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('[role="tab"]')
      );
    const press = (key: string) => {
      const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
      document.activeElement!.dispatchEvent(event);
      fixture.detectChanges();
      return event;
    };
    return { fixture, tabs, press };
  }

  /** R-78: the tab list had ARIA roles but no arrow keys. */
  it('keeps one tab stop and moves with the arrow keys, skipping disabled tabs', () => {
    const { fixture, tabs, press } = setup();
    expect(tabs().map((tab) => tab.tabIndex)).toEqual([0, -1, -1, -1]);
    tabs()[0].focus();

    expect(press('ArrowRight').defaultPrevented).toBe(true);
    expect(fixture.componentInstance.active()).toBe('done');
    expect(document.activeElement).toBe(tabs()[2]);
    expect(tabs()[2].tabIndex).toBe(0);
    expect(tabs()[0].tabIndex).toBe(-1);

    press('ArrowLeft');
    expect(document.activeElement).toBe(tabs()[0]);
    press('ArrowLeft');
    expect(fixture.componentInstance.active()).toBe('all');
    press('Home');
    expect(document.activeElement).toBe(tabs()[0]);
    press('End');
    expect(document.activeElement).toBe(tabs()[3]);
    expect(press('a').defaultPrevented).toBe(false);
  });

  it('puts the tab stop on the first enabled tab when none is active', () => {
    const { fixture, tabs } = setup();
    fixture.componentInstance.active.set('');
    fixture.detectChanges();
    expect(tabs().map((tab) => tab.tabIndex)).toEqual([0, -1, -1, -1]);
  });
});
