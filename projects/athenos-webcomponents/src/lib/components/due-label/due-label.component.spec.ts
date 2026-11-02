import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ATH_LABELS } from '../../i18n/labels';
import { ATH_DATE_CONTEXT } from './due-date';
import { AthDueLabelComponent } from './due-label.component';
import { AthToday } from './today';

const NOW = new Date(2026, 9, 22, 10, 0);

describe('AthDueLabelComponent', () => {
  let fixture: ComponentFixture<AthDueLabelComponent>;
  const el = () => fixture.nativeElement as HTMLElement;
  const label = () => el().querySelector<HTMLElement>('.ath-due');
  /** What is drawn, without the screen-reader text. */
  const shown = () =>
    Array.from(label()!.querySelectorAll<HTMLElement>('.ath-due__source, .ath-due__text'))
      .map((e) => e.textContent)
      .join('')
      .replace(/\s+/g, ' ')
      .trim();

  function create(inputs: Record<string, unknown>, providers: unknown[] = []): void {
    TestBed.configureTestingModule({
      imports: [AthDueLabelComponent],
      providers: [
        { provide: ATH_DATE_CONTEXT, useValue: () => ({ dateFormat: 'dmy' }) },
        ...(providers as never[]),
      ],
    });
    fixture = TestBed.createComponent(AthDueLabelComponent);
    fixture.componentRef.setInput('now', NOW);
    for (const [k, v] of Object.entries(inputs)) fixture.componentRef.setInput(k, v);
    fixture.detectChanges();
  }

  it('draws today in the red text shade via the --due-today token', () => {
    create({ date: '2026-10-22' });
    expect(label()!.dataset['tone']).toBe('today');
    expect(shown()).toBe('today');
    const color = getComputedStyle(label()!).color;
    const probe = document.createElement('span');
    probe.style.color = 'var(--red-text)';
    document.body.appendChild(probe);
    expect(color).toBe(getComputedStyle(probe).color);
    probe.remove();
  });

  it('draws tomorrow amber and later muted', () => {
    create({ date: '2026-10-23' });
    expect(label()!.dataset['tone']).toBe('soon');
    fixture.componentRef.setInput('date', '2026-11-20');
    fixture.detectChanges();
    expect(label()!.dataset['tone']).toBe('later');
    expect(shown()).toBe('20.11.');
  });

  it('mutes finished work and shows its date', () => {
    create({ date: '2026-10-01', done: true });
    expect(label()!.dataset['tone']).toBe('done');
    expect(shown()).toBe('1.10.');
  });

  it('reads "Sprint end · <day>" with the sprint icon and a tooltip', () => {
    create({ date: '2026-10-31', source: 'sprint', sprintName: 'Sprint 24' });
    expect(shown()).toBe('Sprint end · 31.10.');
    expect(label()!.querySelector('.ath-due__icon')).not.toBeNull();
    expect(label()!.getAttribute('title')).toMatch(/^Due with Sprint 24 · Due .*2026$/);
  });

  it('compact keeps the icon and moves the words out of sight', () => {
    create({ date: '2026-10-31', source: 'sprint', compact: true });
    expect(el().querySelector('.ath-due__source')).toBeNull();
    expect(el().querySelector('.ath-due__sr')!.textContent).toBe('Sprint end');
  });

  it('warns when the own date is after the sprint end (not for done work)', () => {
    create({ date: '2026-11-03', afterSprintEnd: true, sprintName: 'Sprint 24' });
    const warn = el().querySelector('.ath-due__warn')!;
    expect(warn.getAttribute('aria-label')).toBe('Due after the sprint ends');
    expect(warn.getAttribute('title')).toBe('Due after the sprint ends · Sprint 24');
    fixture.componentRef.setInput('done', true);
    fixture.detectChanges();
    expect(el().querySelector('.ath-due__warn')).toBeNull();
  });

  it('shows the placeholder without a date, nothing by default', () => {
    create({ date: null });
    expect(el().textContent.trim()).toBe('');
    fixture.componentRef.setInput('placeholder', '—');
    fixture.detectChanges();
    expect(el().querySelector('.ath-due--none')!.textContent).toBe('—');
  });

  it('takes its words from ATH_LABELS, one day and several apart', () => {
    create({ date: '2026-10-19' }, [
      {
        provide: ATH_LABELS,
        useValue: {
          dueOverdue: () => 'seit {count} Tagen überfällig',
          dueOverdueOne: () => 'seit {count} Tag überfällig',
          dueOn: () => 'Fällig am {date}',
        },
      },
    ]);
    expect(shown()).toBe('seit 3 Tagen überfällig');
    fixture.componentRef.setInput('date', '2026-10-21');
    fixture.detectChanges();
    expect(shown()).toBe('seit 1 Tag überfällig');
    expect(label()!.getAttribute('title')).toMatch(/^Fällig am /);
  });

  it('says "in N days" ahead and names the full date for hover and screen readers', () => {
    create({ date: '2026-10-27' }, [
      { provide: ATH_DATE_CONTEXT, useValue: () => ({ locale: 'en-GB' }) },
    ]);
    expect(shown()).toBe('in 5 days');
    expect(label()!.getAttribute('title')).toBe('Due Tuesday, 27 October 2026');
    const sr = Array.from(el().querySelectorAll('.ath-due__sr'))
      .map((e) => e.textContent)
      .join('');
    expect(sr).toContain('Due Tuesday, 27 October 2026');
  });

  it('adds the clock time when the due value is a moment', () => {
    create({ date: '2026-10-27T17:30:00Z' }, [
      {
        provide: ATH_DATE_CONTEXT,
        useValue: () => ({ locale: 'de', timeZone: 'Europe/Berlin', hour12: false }),
      },
    ]);
    expect(label()!.getAttribute('title')).toBe('Due Dienstag, 27. Oktober 2026, 18:30');
  });

  describe('across midnight', () => {
    afterEach(() => vi.useRealTimers());

    /** R-78: a label left on screen overnight kept yesterday's words. */
    it('moves on at local midnight without a reload', () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
      vi.setSystemTime(new Date(2026, 9, 22, 23, 59));
      TestBed.configureTestingModule({
        providers: [{ provide: ATH_DATE_CONTEXT, useValue: () => ({}) }],
      });
      fixture = TestBed.createComponent(AthDueLabelComponent);
      fixture.componentRef.setInput('date', '2026-10-23');
      fixture.detectChanges();
      expect(shown()).toBe('tomorrow');

      vi.advanceTimersByTime(60_000);
      fixture.detectChanges();
      expect(shown()).toBe('today');
      expect(label()!.dataset['tone']).toBe('today');
    });

    /** A stored moment lands on the wrong day when the reader's zone is not the browser's. */
    it("moves on at midnight in the reader's time zone, not only the browser's", () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
      // 23:59 on 22 Oct in a zone hours away from the test run's own.
      const tokyo = Date.UTC(2026, 9, 22, 14, 59);
      const [timeZone, at] =
        new Date(tokyo).getTimezoneOffset() === -540
          ? ['Pacific/Honolulu', Date.UTC(2026, 9, 23, 9, 59)]
          : ['Asia/Tokyo', tokyo];
      vi.setSystemTime(at);
      TestBed.configureTestingModule({
        providers: [{ provide: ATH_DATE_CONTEXT, useValue: () => ({ timeZone }) }],
      });
      fixture = TestBed.createComponent(AthDueLabelComponent);
      fixture.componentRef.setInput('date', '2026-10-23');
      fixture.detectChanges();
      expect(shown()).toBe('tomorrow');

      vi.advanceTimersByTime(60_000);
      fixture.detectChanges();
      expect(shown()).toBe('today');
    });

    it('reads the current time when a label is created, not when the app started', () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
      vi.setSystemTime(new Date(2026, 9, 22, 10, 0));
      TestBed.configureTestingModule({
        providers: [{ provide: ATH_DATE_CONTEXT, useValue: () => ({}) }],
      });
      TestBed.inject(AthToday);
      // A day later without the timer having fired (e.g. a suspended tab).
      vi.setSystemTime(new Date(2026, 9, 23, 10, 0));
      fixture = TestBed.createComponent(AthDueLabelComponent);
      fixture.componentRef.setInput('date', '2026-10-23');
      fixture.detectChanges();
      expect(shown()).toBe('today');
    });
  });
});
