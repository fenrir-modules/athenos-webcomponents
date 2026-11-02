import {
  calendarDayOf,
  calendarDaysUntil,
  compactDueText,
  describeDue,
  dueToneOf,
  fullDueDate,
  isDayOnly,
  shortDay,
  zonedWallClock,
} from './due-date';

const LABELS = {
  overdue: '{count} days overdue',
  overdueOne: '{count} day overdue',
  today: 'today',
  tomorrow: 'tomorrow',
  inDays: 'in {count} days',
};
// Wednesday 22 Oct 2026, 10:00 local.
const NOW = new Date(2026, 9, 22, 10, 0);

describe('due-date', () => {
  describe('dueToneOf: one colour rule', () => {
    it('overdue before today, today red, the next two days soon, later after', () => {
      expect(dueToneOf(-3)).toBe('overdue');
      expect(dueToneOf(-1)).toBe('overdue');
      expect(dueToneOf(0)).toBe('today');
      expect(dueToneOf(1)).toBe('soon');
      expect(dueToneOf(2)).toBe('soon');
      expect(dueToneOf(3)).toBe('later');
      expect(dueToneOf(null)).toBe('later');
    });

    it('finished work is never urgent', () => {
      expect(dueToneOf(-5, true)).toBe('done');
      expect(dueToneOf(0, true)).toBe('done');
    });
  });

  describe('calendarDayOf', () => {
    it('reads a bare date as that day, in any zone', () => {
      const day = calendarDayOf('2026-10-30', 'Pacific/Honolulu')!;
      expect([day.getFullYear(), day.getMonth(), day.getDate()]).toEqual([2026, 9, 30]);
    });

    it('reads a picker timestamp (UTC midnight or noon) as its day', () => {
      expect(calendarDayOf('2026-10-30T00:00:00Z', 'America/Los_Angeles')!.getDate()).toBe(30);
      expect(calendarDayOf('2026-10-30T12:00:00Z', 'Asia/Tokyo')!.getDate()).toBe(30);
    });

    it('places any other moment on its day in the reader zone', () => {
      // 23:30 UTC on the 30th is already the 31st in Berlin.
      expect(calendarDayOf('2026-10-30T23:30:00Z', 'Europe/Berlin')!.getDate()).toBe(31);
    });

    it('rejects what is not a date', () => {
      expect(calendarDayOf('soon')).toBeNull();
    });
  });

  it('counts calendar days, not 24h periods', () => {
    const late = new Date(2026, 9, 22, 23, 59);
    expect(calendarDaysUntil(new Date(2026, 9, 23, 12), late)).toBe(1);
    expect(calendarDaysUntil(new Date(2026, 9, 22, 12), new Date(2026, 9, 22, 0, 1))).toBe(0);
  });

  it('computes "today" in the reader zone', () => {
    // 01:00 UTC on the 23rd is still the 22nd in New York.
    const now = new Date(Date.UTC(2026, 9, 23, 1, 0));
    const day = calendarDayOf('2026-10-22')!;
    expect(calendarDaysUntil(day, now, 'America/New_York')).toBe(0);
    expect(calendarDaysUntil(day, now, 'Europe/Berlin')).toBe(-1);
  });

  describe('compactDueText', () => {
    const day = new Date(2026, 10, 5, 12);
    it('says overdue, today, tomorrow, in N days, then the date', () => {
      expect(compactDueText(-2, day, LABELS)).toBe('2 days overdue');
      expect(compactDueText(-1, day, LABELS)).toBe('1 day overdue');
      expect(compactDueText(0, day, LABELS)).toBe('today');
      expect(compactDueText(1, day, LABELS)).toBe('tomorrow');
      expect(compactDueText(6, day, LABELS)).toBe('in 6 days');
      expect(compactDueText(7, day, LABELS, { dateFormat: 'iso' })).toBe('2026-11-05');
    });

    it('falls back to the plural template without a singular one', () => {
      expect(compactDueText(-1, day, { ...LABELS, overdueOne: undefined })).toBe('1 days overdue');
    });
  });

  describe('fullDueDate', () => {
    const day = new Date(2026, 9, 30, 12);
    it('spells out a day in the locale', () => {
      expect(fullDueDate('2026-10-30', day, { locale: 'de' })).toBe('Freitag, 30. Oktober 2026');
      expect(fullDueDate('2026-10-30', day, { locale: 'en-GB' })).toBe('Friday, 30 October 2026');
      expect(fullDueDate('2026-10-30', day, { locale: 'de', dateFormat: 'iso' })).toBe(
        'Freitag, 2026-10-30'
      );
    });

    it('adds the time of a moment, in the reader zone, never of a day', () => {
      expect(isDayOnly('2026-10-30T12:00:00Z')).toBe(true);
      expect(isDayOnly('2026-10-30T00:00:00Z')).toBe(true);
      expect(isDayOnly('2026-10-30T16:00:00Z')).toBe(false);
      expect(
        fullDueDate('2026-10-30T16:00:00Z', day, {
          locale: 'de',
          timeZone: 'Europe/Berlin',
          hour12: false,
        })
      ).toBe('Freitag, 30. Oktober 2026, 17:00');
    });
  });

  it('formats short days in the reader format', () => {
    const day = new Date(2026, 9, 30, 12);
    expect(shortDay(day, { dateFormat: 'dmy' })).toBe('30.10.');
    expect(shortDay(day, { dateFormat: 'mdy' })).toBe('10/30');
    expect(shortDay(day, { dateFormat: 'iso' })).toBe('2026-10-30');
    expect(shortDay(day, { locale: 'de' })).toBe('30. Okt.');
    expect(shortDay(day, { locale: 'en' })).toBe('Oct 30');
  });

  describe('describeDue', () => {
    it('is null without a date', () => {
      expect(describeDue({ date: null, now: NOW }, LABELS)).toBeNull();
      expect(describeDue({ date: '', now: NOW }, LABELS)).toBeNull();
    });

    it('marks today red and tomorrow amber', () => {
      expect(describeDue({ date: '2026-10-22', now: NOW }, LABELS)).toEqual(
        expect.objectContaining({ tone: 'today', text: 'today', days: 0 })
      );
      expect(describeDue({ date: '2026-10-23', now: NOW }, LABELS)?.tone).toBe('soon');
      expect(describeDue({ date: '2026-10-20', now: NOW }, LABELS)?.text).toBe('2 days overdue');
    });

    it('shows finished work as its plain date, muted', () => {
      const view = describeDue({ date: '2026-10-20', done: true, now: NOW }, LABELS, {
        dateFormat: 'dmy',
      });
      expect(view).toEqual(expect.objectContaining({ tone: 'done', text: '20.10.' }));
    });

    it('names the day of a sprint-derived date, coloured by the same rule', () => {
      const view = describeDue({ date: '2026-10-23', source: 'sprint', now: NOW }, LABELS, {
        dateFormat: 'dmy',
      });
      expect(view).toEqual(expect.objectContaining({ tone: 'soon', text: '23.10.' }));
    });
  });
});

describe('zonedWallClock', () => {
  it('reads the clock of the zone, building one formatter per zone (P04: 12 ms on the board)', () => {
    const at = new Date('2026-10-30T23:30:00Z');
    const spy = vi.spyOn(Intl, 'DateTimeFormat');
    const first = zonedWallClock(at, 'Pacific/Auckland');
    for (let i = 0; i < 50; i++) zonedWallClock(at, 'Pacific/Auckland');
    const berlin = zonedWallClock(at, 'Europe/Berlin');
    expect([first.getDate(), first.getHours(), first.getMinutes()]).toEqual([31, 12, 30]);
    expect([berlin.getDate(), berlin.getHours()]).toEqual([31, 0]);
    expect(spy.mock.calls.length).toBeLessThanOrEqual(2);
  });

  it('still rejects an unknown zone', () => {
    expect(() => zonedWallClock(new Date(), 'Mars/Olympus')).toThrow(RangeError);
  });
});
