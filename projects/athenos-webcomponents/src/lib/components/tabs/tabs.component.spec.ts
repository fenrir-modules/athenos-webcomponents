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

const MANY: TabItem[] = [
  'Overview',
  'Tickets',
  'Board',
  'Backlog',
  'Roadmap',
  'Releases',
  'Sprints',
  'Reports',
  'Members',
  'Settings',
].map((label) => ({ id: label.toLowerCase(), label }));

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthTabsComponent],
  template: `<div [style.width.px]="width()">
    <ath-tabs [tabs]="tabs" [activeTab]="active()" (tabChanged)="active.set($event)" />
  </div>`,
})
class ManyTabsHostComponent {
  readonly tabs = MANY;
  readonly width = signal(340);
  readonly active = signal('reports');
}

describe('AthTabsComponent overflow (P04)', () => {
  const frame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));

  it('scrolls inside its width, fades the side with more tabs and shows the active one', async () => {
    const fixture = TestBed.createComponent(ManyTabsHostComponent);
    fixture.detectChanges();
    await frame();
    await frame();
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const list = el.querySelector<HTMLElement>('[role="tablist"]')!;
    expect(el.querySelector('ath-tabs')!.getBoundingClientRect().width).toBe(340);
    expect(list.scrollWidth).toBeGreaterThan(list.clientWidth);
    const bar = list.getBoundingClientRect();
    const active = el.querySelector<HTMLElement>('[aria-selected="true"]')!.getBoundingClientRect();
    expect(active.left).toBeGreaterThanOrEqual(bar.left);
    expect(active.right).toBeLessThanOrEqual(bar.right);
    // Scrolled towards the end: tabs hidden on the left, more on the right.
    expect(list.classList).toContain('ath-tabs--fade-left');
    expect(list.classList).toContain('ath-tabs--fade-right');
    expect(getComputedStyle(list).maskImage).toContain('linear-gradient');

    fixture.componentInstance.active.set('overview');
    fixture.detectChanges();
    await frame();
    fixture.detectChanges();
    expect(list.scrollLeft).toBe(0);
    expect(list.classList).not.toContain('ath-tabs--fade-left');
    expect(list.classList).toContain('ath-tabs--fade-right');
  });

  it('draws no fade when every tab fits', async () => {
    const fixture = TestBed.createComponent(ManyTabsHostComponent);
    fixture.componentInstance.width.set(1400);
    fixture.detectChanges();
    await frame();
    await frame();
    fixture.detectChanges();
    const list = (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
      '[role="tablist"]'
    )!;
    expect(list.className).not.toContain('fade');
    expect(getComputedStyle(list).maskImage).toBe('none');
  });
});
