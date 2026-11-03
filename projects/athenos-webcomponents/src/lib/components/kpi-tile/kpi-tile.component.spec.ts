import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AthKpiStripComponent, AthKpiTileComponent, hasKpiTrend } from './kpi-tile.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthKpiStripComponent, AthKpiTileComponent],
  template: `
    <div style="width: 1000px">
      <ath-kpi-strip>
        <ath-kpi-tile
          label="Due today"
          [value]="1"
          [alert]="true"
          delta="+1"
          deltaDirection="down"
          deltaTitle="1 overdue"
        />
        <ath-kpi-tile label="This week" [value]="3" tone="green" [spark]="[1, 2, 2, 3]" />
        <ath-kpi-tile label="In progress" value="–" [muted]="true" [spark]="[1, 2]" />
        <ath-kpi-tile
          label="Story points"
          [value]="24"
          note="3 done"
          noteTitle="3 of 24 done"
          link="/app/tickets"
          [linkParams]="{ status: 'done' }"
          linkLabel="Show done tickets"
        />
      </ath-kpi-strip>
    </div>
    <ath-kpi-strip class="status" [columns]="3">
      <ath-kpi-tile label="In progress" [value]="4" valueTone="amber" dot="rgb(1, 2, 3)" />
      <ath-kpi-tile label="Overdue" [value]="2" valueTone="green" [alert]="true" />
      <ath-kpi-tile label="Progress" value="62%"><span class="bar">bar</span></ath-kpi-tile>
    </ath-kpi-strip>
  `,
})
class HostComponent {}

describe('AthKpiTileComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  const tiles = () =>
    Array.from(
      (fixture.nativeElement as HTMLElement)
        .querySelector('ath-kpi-strip')!
        .querySelectorAll<HTMLElement>('ath-kpi-tile')
    );

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideRouter([])],
    }).createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('keeps the figures of a strip on one line when only one tile has a note', () => {
    // My Work's shape: the note makes "Story points" taller; the other
    // figures must not drop to the bottom of the stretched cells.
    const tops = tiles().map((t) =>
      Math.round(t.querySelector('.ath-kpi__value')!.getBoundingClientRect().top)
    );
    expect(new Set(tops).size, `value tops ${tops.join(', ')}`).toBe(1);
    const label = tiles()[0].querySelector('.ath-kpi__label')!.getBoundingClientRect();
    // Right under the label row: the row gap, not the cell's leftover height.
    expect(tops[0] - label.bottom).toBeLessThanOrEqual(12);
  });

  it('draws a trend only for two or more samples that are not all zero', () => {
    expect(hasKpiTrend(null)).toBe(false);
    expect(hasKpiTrend([3])).toBe(false);
    expect(hasKpiTrend([0, 0, 0])).toBe(false);
    expect(hasKpiTrend([0, 1])).toBe(true);
  });

  it('sets the alert figure in red and explains the delta', () => {
    const [due] = tiles();
    expect(due.querySelector('.ath-kpi__value--alert')).not.toBeNull();
    const delta = due.querySelector<HTMLElement>('.ath-kpi__delta')!;
    expect(delta.dataset['direction']).toBe('down');
    expect(delta.getAttribute('aria-label')).toBe('1 overdue');
  });

  it('tints the trend by tone; a muted tile keeps the empty slot', () => {
    const [, week, progress] = tiles();
    expect(
      week.querySelector('ath-sparkline path.ath-sparkline__line')!.getAttribute('stroke')
    ).toBe('var(--green)');
    expect(progress.querySelector('ath-sparkline')).toBeNull();
    expect(progress.querySelector('.ath-kpi__spark-slot')!.getBoundingClientRect().width).toBe(70);
  });

  it('makes the whole linked tile the hit area', () => {
    const linked = tiles()[3];
    const a = linked.querySelector<HTMLAnchorElement>('a.ath-kpi__link')!;
    expect(a.getAttribute('href')).toBe('/app/tickets?status=done');
    expect(a.getAttribute('aria-label')).toBe('Show done tickets');
    expect(linked.querySelector('.ath-kpi__note')!.textContent).toBe('3 done');
    expect(getComputedStyle(a, '::after').position).toBe('absolute');
  });

  it('draws one card with hairlines between equal tiles', () => {
    const widths = tiles().map((t) => Math.round(t.getBoundingClientRect().width));
    expect(new Set(widths).size).toBe(1);
    expect(getComputedStyle(tiles()[0]).borderLeftWidth).toBe('0px');
    expect(getComputedStyle(tiles()[1]).borderLeftWidth).toBe('1px');
  });

  describe('status tiles', () => {
    const statusTiles = () =>
      Array.from(
        (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
          'ath-kpi-strip.status ath-kpi-tile'
        )
      );

    it('colours the figure from the --*-text tokens and draws the label dot', () => {
      const [prog] = statusTiles();
      const value = prog.querySelector<HTMLElement>('.ath-kpi__value')!;
      expect(value.dataset['tone']).toBe('amber');
      const probe = document.createElement('span');
      probe.style.color = 'var(--amber-text)';
      prog.appendChild(probe);
      expect(getComputedStyle(value).color).toBe(getComputedStyle(probe).color);
      probe.remove();
      const dot = prog.querySelector<HTMLElement>('.ath-kpi__label .ath-kpi__dot')!;
      expect(getComputedStyle(dot).backgroundColor).toBe('rgb(1, 2, 3)');
      expect(dot.getAttribute('aria-hidden')).toBe('true');
      expect(prog.querySelector('.ath-kpi__label')!.textContent.trim()).toBe('In progress');
    });

    it('lets alert win over a value tone', () => {
      const [, overdue] = statusTiles();
      const value = overdue.querySelector<HTMLElement>('.ath-kpi__value')!;
      expect(value.dataset['tone']).toBeUndefined();
      expect(value.classList).toContain('ath-kpi__value--alert');
    });

    it('projects content under the figure and drops the empty slot', () => {
      const [prog, , progress] = statusTiles();
      const extra = progress.querySelector<HTMLElement>('.ath-kpi__extra')!;
      expect(extra.querySelector('.bar')!.textContent).toBe('bar');
      expect(extra.getBoundingClientRect().top).toBeGreaterThanOrEqual(
        progress.querySelector('.ath-kpi__value')!.getBoundingClientRect().bottom
      );
      expect(getComputedStyle(prog.querySelector('.ath-kpi__extra')!).display).toBe('none');
    });
  });
});

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthKpiStripComponent, AthKpiTileComponent],
  template: `
    <div style="width: 480px">
      <ath-kpi-strip [columns]="4">
        <ath-kpi-tile label="Created" [value]="null" note="in the last 7 days" />
        <ath-kpi-tile
          label="Resolved"
          [value]="9"
          note="in the last 7 days, across all projects of this workspace together"
        />
        <ath-kpi-tile label="Velocity" value="–" [muted]="true" note="No sprint finished yet" />
        <ath-kpi-tile label="Open" [value]="0" />
      </ath-kpi-strip>
    </div>
  `,
})
class NotesHostComponent {}

describe('AthKpiTileComponent loading and notes (P04)', () => {
  it('draws a 48x22 skeleton for a null figure, with the loading label for screen readers', () => {
    const fixture = TestBed.createComponent(NotesHostComponent);
    fixture.detectChanges();
    const [loading, , , zero] = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('ath-kpi-tile')
    );
    const skeleton = loading.querySelector<HTMLElement>('ath-skeleton')!;
    const box = skeleton.getBoundingClientRect();
    expect([box.width, box.height]).toEqual([48, 22]);
    expect(loading.querySelector('.ath-kpi__value')!.textContent.trim()).toBe('Loading');
    // A real zero is a zero, not a skeleton.
    expect(zero.querySelector('ath-skeleton')).toBeNull();
    expect(zero.querySelector('.ath-kpi__value')!.textContent.trim()).toBe('0');
  });

  it('puts the note under the figure in the sans face, one line ending in an ellipsis', () => {
    const fixture = TestBed.createComponent(NotesHostComponent);
    fixture.detectChanges();
    const tiles = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('ath-kpi-tile')
    );
    for (const tile of tiles.slice(0, 3)) {
      const value = tile.querySelector('.ath-kpi__value')!.getBoundingClientRect();
      const note = tile.querySelector<HTMLElement>('.ath-kpi__note')!;
      expect(note.getBoundingClientRect().top).toBeGreaterThanOrEqual(value.bottom - 1);
      const style = getComputedStyle(note);
      expect(style.fontFamily).toContain('Geist');
      expect(style.fontFamily).not.toContain('Mono');
      expect(style.textOverflow).toBe('ellipsis');
      expect(note.getBoundingClientRect().right).toBeLessThanOrEqual(
        tile.getBoundingClientRect().right
      );
    }
    const long = tiles[1].querySelector<HTMLElement>('.ath-kpi__note')!;
    expect(long.scrollWidth).toBeGreaterThan(long.clientWidth);
    // The full text stays reachable as the tooltip.
    expect(long.title).toBe('in the last 7 days, across all projects of this workspace together');
  });

  it('lines the figures up across tiles with and without a note, skeleton included', () => {
    const fixture = TestBed.createComponent(NotesHostComponent);
    fixture.detectChanges();
    // 480px wide: two rows of two; within a row the figures share a line.
    const byRow = new Map<number, number[]>();
    for (const t of Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('ath-kpi-tile')
    )) {
      const row = Math.round(t.getBoundingClientRect().top);
      const top = Math.round(t.querySelector('.ath-kpi__value')!.getBoundingClientRect().top);
      byRow.set(row, [...(byRow.get(row) ?? []), top]);
    }
    expect(byRow.size).toBe(2);
    for (const tops of byRow.values()) {
      expect(new Set(tops).size, `value tops ${tops.join(', ')}`).toBe(1);
    }
  });
});
