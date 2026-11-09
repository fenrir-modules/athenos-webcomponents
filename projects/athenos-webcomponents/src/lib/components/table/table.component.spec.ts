import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthMarkdownComponent } from '../markdown/markdown.component';
import { AthTableComponent } from './table.component';

@Component({
  imports: [AthTableComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <ath-table [flush]="flush()">
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Item</td>
        </tr>
      </tbody>
    </ath-table>
  `,
})
class HostComponent {
  readonly flush = signal(false);
}

describe('AthTableComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('renders projected table content', () => {
    const table = fixture.nativeElement.querySelector('.ath-table__table') as HTMLTableElement;
    expect(table).not.toBeNull();
    expect(table.textContent).toContain('Name');
    expect(table.textContent).toContain('Item');
  });

  it('draws its frame unless flush', () => {
    const frame = () =>
      (fixture.nativeElement as HTMLElement).querySelector('.ath-table') as HTMLElement;
    expect(frame().classList).not.toContain('ath-table--flush');
    fixture.componentInstance.flush.set(true);
    fixture.detectChanges();
    expect(frame().classList).toContain('ath-table--flush');
  });
});

// A table that stays a table on a phone (UX tour B-09): wider than its box.
@Component({
  imports: [AthTableComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="width: 320px">
      <ath-table [class.ath-table--sticky]="sticky()" [flush]="flush()">
        <thead>
          <tr>
            @for (c of cols; track c) {
              <th>{{ c }}</th>
            }
          </tr>
        </thead>
        <tbody>
          @for (r of rows; track r) {
            <tr>
              @for (c of cols; track c) {
                <td>{{ r }} {{ c }}</td>
              }
            </tr>
          }
        </tbody>
      </ath-table>
    </div>
  `,
})
class WideHostComponent {
  readonly sticky = signal(true);
  readonly flush = signal(false);
  readonly cols = ['Schluessel', 'Beschreibung', 'Status', 'Bereiche', 'Zuletzt verwendet'];
  readonly rows = ['api_keys', 'registration'];
}

describe('AthTableComponent sticky first column (B-09)', () => {
  let fixture: ComponentFixture<WideHostComponent>;
  const root = () => fixture.nativeElement as HTMLElement;
  const scroller = () => root().querySelector<HTMLElement>('.ath-table')!;
  const firstCells = () =>
    Array.from(root().querySelectorAll<HTMLElement>('tr > :first-child')).filter((c) =>
      /^(TH|TD)$/.test(c.tagName)
    );

  beforeEach(() => {
    fixture = TestBed.createComponent(WideHostComponent);
    fixture.detectChanges();
  });

  it('keeps the first column in place while the others scroll under it', () => {
    expect(scroller().scrollWidth).toBeGreaterThan(scroller().clientWidth);
    for (const cell of firstCells()) {
      expect(getComputedStyle(cell).position).toBe('sticky');
      // Opaque, so the scrolled columns do not show through.
      expect(getComputedStyle(cell).backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    }
    const [head, body] = firstCells();
    const left = head.getBoundingClientRect().left;
    scroller().scrollLeft = 120;
    expect(head.getBoundingClientRect().left).toBe(left);
    expect(body.getBoundingClientRect().left).toBe(left);
    // The second column did move.
    const second = root().querySelector('tbody td:nth-child(2)')!.getBoundingClientRect();
    expect(second.left).toBeLessThan(body.getBoundingClientRect().right);
  });

  it('is opt-in: without the host class nothing sticks', () => {
    fixture.componentInstance.sticky.set(false);
    fixture.detectChanges();
    for (const cell of firstCells()) expect(getComputedStyle(cell).position).toBe('static');
  });

  it('paints a flush sticky column on the page canvas', () => {
    fixture.componentInstance.flush.set(true);
    fixture.detectChanges();
    const probe = document.createElement('span');
    probe.style.backgroundColor = 'var(--bg-0)';
    document.body.append(probe);
    for (const cell of firstCells()) {
      expect(getComputedStyle(cell).backgroundColor).toBe(getComputedStyle(probe).backgroundColor);
    }
    probe.remove();
  });

  it('fades the end edge while columns are hidden there, where the fade can follow the scroll', () => {
    if (!CSS.supports('animation-timeline: scroll()')) return;
    expect(getComputedStyle(scroller()).maskImage).toContain('linear-gradient');
    expect(getComputedStyle(scroller()).animationName).toBe('ath-table-fade');
  });
});

// Markdown tables (docs, ticket descriptions) always stay tables: the same
// sticky first column, from styles/_sticky-table.scss.
const MD_TABLE =
  '<div class="ath-md__table"><table><thead><tr>' +
  ['Schluessel', 'Beschreibung', 'Status', 'Bereiche', 'Zuletzt verwendet']
    .map((c) => `<th>${c}</th>`)
    .join('') +
  '</tr></thead><tbody><tr>' +
  ['api_keys', 'API-Schluessel fuer Integrationen', 'Aktiv', 'tickets:read', '09.11.2026']
    .map((c) => `<td>${c}</td>`)
    .join('') +
  '</tr></tbody></table></div>';

describe('Markdown tables (B-09)', () => {
  it('keep the first column sticky and whole words in the cells', () => {
    const fixture = TestBed.createComponent(AthMarkdownComponent);
    fixture.componentRef.setInput('html', MD_TABLE);
    const host = fixture.nativeElement as HTMLElement;
    host.style.width = '300px';
    fixture.detectChanges();
    const scroller = host.querySelector<HTMLElement>('.ath-md__table')!;
    const [th, td] = [host.querySelector('th')!, host.querySelector('td')!];
    expect(getComputedStyle(th).position).toBe('sticky');
    expect(getComputedStyle(td).position).toBe('sticky');
    expect(getComputedStyle(td).backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    // Words are not split to squeeze the table into the box: it scrolls.
    expect(getComputedStyle(td).overflowWrap).toBe('break-word');
    expect(scroller.scrollWidth).toBeGreaterThan(scroller.clientWidth);
    const left = td.getBoundingClientRect().left;
    scroller.scrollLeft = 80;
    // Within the half of the collapsed border the cell gives up once stuck.
    expect(Math.abs(td.getBoundingClientRect().left - left)).toBeLessThanOrEqual(1);
    expect(Math.abs(th.getBoundingClientRect().left - left)).toBeLessThanOrEqual(1);
    expect(scroller.scrollLeft).toBeGreaterThan(0);
  });
});
