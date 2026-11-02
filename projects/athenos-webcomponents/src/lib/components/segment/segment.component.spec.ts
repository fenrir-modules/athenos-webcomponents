import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AthSegmentComponent, type SegmentOption } from './segment.component';
import { backdrop, inTheme, luminance } from '../../testing/colour';

const VIEWS: SegmentOption[] = [
  { value: 'list', label: 'List' },
  { value: 'board', label: 'Board' },
  { value: 'off', label: 'Off', disabled: true },
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthSegmentComponent],
  template: `<ath-segment
    [options]="views"
    [(value)]="view"
    size="sm"
    ariaLabel="View"
    (valueChange)="changes.push($event)"
  />`,
})
class SegmentHostComponent {
  readonly views = VIEWS;
  readonly view = signal('list');
  readonly changes: string[] = [];
}

describe('AthSegmentComponent', () => {
  function setup() {
    const fixture = TestBed.createComponent(SegmentHostComponent);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const segment = host.querySelector<HTMLElement>('ath-segment')!;
    const tabs = () => Array.from(segment.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    return { fixture, segment, tabs };
  }

  it('keeps [(value)] working on the signal input + valueChange pair', () => {
    const { fixture, tabs } = setup();
    expect(tabs()[0].getAttribute('aria-selected')).toBe('true');
    tabs()[1].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.view()).toBe('board');
    expect(tabs()[1].getAttribute('aria-selected')).toBe('true');
    expect(tabs()[0].getAttribute('aria-selected')).toBe('false');
  });

  it('emits only for a different, enabled option', () => {
    const { fixture, tabs } = setup();
    tabs()[0].click();
    tabs()[2].click();
    expect(fixture.componentInstance.changes).toEqual([]);
  });

  it('carries role, name and size on the host', () => {
    const { segment } = setup();
    expect(segment.getAttribute('role')).toBe('tablist');
    expect(segment.getAttribute('aria-label')).toBe('View');
    expect(segment.dataset['size']).toBe('sm');
  });

  /** R-78: the segments had ARIA tab roles but no arrow keys. */
  it('keeps one tab stop and moves with the arrow keys, skipping disabled options', () => {
    const { fixture, tabs } = setup();
    const press = (key: string) => {
      document.activeElement!.dispatchEvent(
        new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true })
      );
      fixture.detectChanges();
    };
    expect(tabs().map((tab) => tab.tabIndex)).toEqual([0, -1, -1]);
    tabs()[0].focus();
    press('ArrowRight');
    expect(fixture.componentInstance.view()).toBe('board');
    expect(document.activeElement).toBe(tabs()[1]);
    expect(tabs().map((tab) => tab.tabIndex)).toEqual([-1, 0, -1]);
    // "Off" is disabled: Right wraps to the first option.
    press('ArrowRight');
    expect(fixture.componentInstance.view()).toBe('list');
    press('End');
    expect(fixture.componentInstance.view()).toBe('board');
    press('Home');
    expect(document.activeElement).toBe(tabs()[0]);
  });
});

describe('AthSegmentComponent active item (P04)', () => {
  it('raises the active item above its track in both themes (lighter fill, a shadow)', () => {
    const fixture = TestBed.createComponent(SegmentHostComponent);
    fixture.detectChanges();
    const host = (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('ath-segment')!;
    const active = host.querySelector<HTMLElement>('.ath-seg__item--active')!;
    active.style.transition = 'none';
    for (const theme of ['light', 'dark'] as const) {
      inTheme(theme, () => {
        expect(luminance(backdrop(active)), theme).toBeGreaterThan(luminance(backdrop(host)));
        expect(getComputedStyle(active).boxShadow, theme).not.toBe('none');
      });
    }
  });
});
