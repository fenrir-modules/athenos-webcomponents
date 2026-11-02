import type { AthDateContext } from '@athenos/webcomponents/core';

/**
 * Due dates as the product shows them: pure functions, no Angular, so the
 * thresholds are tested with plain values (`due-date.spec.ts`).
 *
 * A due date names a calendar day. "Today" is today in the reader's time
 * zone; a bare `YYYY-MM-DD` (or a timestamp at UTC midnight/noon, which is
 * what the date pickers write) is that day everywhere.
 */

/** How urgent a due date reads. One rule, one place (DS-08). */
export type DueTone = 'overdue' | 'today' | 'soon' | 'later' | 'done';

/** Where a due date comes from: the ticket's own, or its sprint's end. */
export type DueSource = 'own' | 'sprint';

// The reader's date settings and their token live in the light core entry
// point, so an app provides them at its root without loading the components.
export {
  ATH_DATE_CONTEXT,
  type AthDateContext,
  type DueDateFormat,
} from '@athenos/webcomponents/core';

/** Label templates the compact text is built from (`{count}` placeholder). */
export interface DueTextLabels {
  /** Two or more days past the date. */
  overdue: string;
  /** One day past the date ("1 day overdue"); `overdue` when missing. */
  overdueOne?: string;
  today: string;
  tomorrow: string;
  inDays: string;
}

const DAY_MS = 86_400_000;

/** One formatter per time zone: building an Intl.DateTimeFormat is the expensive part. */
const wallClockFormats = new Map<string, Intl.DateTimeFormat>();

function wallClockFormat(timeZone: string): Intl.DateTimeFormat {
  let format = wallClockFormats.get(timeZone);
  if (!format) {
    // Throws a RangeError for an unknown zone, as before; nothing is cached then.
    format = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hourCycle: 'h23',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
    wallClockFormats.set(timeZone, format);
  }
  return format;
}

/**
 * `date` as wall-clock time in `timeZone`: a Date whose local fields read
 * what a clock in that zone shows. Only for day comparisons.
 */
export function zonedWallClock(date: Date, timeZone?: string): Date {
  if (!timeZone) return new Date(date);
  const parts = wallClockFormat(timeZone).formatToParts(date);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  return new Date(
    get('year'),
    get('month') - 1,
    get('day'),
    get('hour'),
    get('minute'),
    get('second')
  );
}

/**
 * The calendar day a due value names, as local midday; `null` when the
 * value is not a date.
 */
export function calendarDayOf(value: string, timeZone?: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!m) return null;
  if (isDayOnly(value)) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 12);
  const at = new Date(value);
  const wall = zonedWallClock(at, timeZone);
  return new Date(wall.getFullYear(), wall.getMonth(), wall.getDate(), 12);
}

/**
 * Whether a due value names a day rather than a moment: a bare
 * `YYYY-MM-DD`, or a timestamp at UTC midnight or noon (what the date
 * pickers write for a day). Only a moment has a time worth showing.
 */
export function isDayOnly(value: string): boolean {
  const at = new Date(value);
  return (
    value.length === 10 ||
    Number.isNaN(at.getTime()) ||
    (at.getUTCMinutes() === 0 &&
      at.getUTCSeconds() === 0 &&
      (at.getUTCHours() === 0 || at.getUTCHours() === 12))
  );
}

/** Whole calendar days from `now` (in `timeZone`) to `day`; negative = past. */
export function calendarDaysUntil(day: Date, now: Date, timeZone?: string): number {
  const today = zonedWallClock(now, timeZone);
  const midnight = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  return Math.round((midnight(day) - midnight(today)) / DAY_MS);
}

/**
 * The one colour rule: before today overdue, today today (both red), the
 * next two days soon (amber), later muted. Finished work is never urgent.
 */
export function dueToneOf(days: number | null, done = false): DueTone {
  if (done) return 'done';
  if (days === null) return 'later';
  if (days < 0) return 'overdue';
  if (days === 0) return 'today';
  if (days <= 2) return 'soon';
  return 'later';
}

/** A calendar day in the chosen short format ("30 Oct", "30.10.", "10/30", "2026-10-30"). */
export function shortDay(day: Date, ctx: AthDateContext = {}): string {
  const y = day.getFullYear();
  const m = day.getMonth() + 1;
  const d = day.getDate();
  switch (ctx.dateFormat) {
    case 'dmy':
      return `${d}.${m}.`;
    case 'mdy':
      return `${m}/${d}`;
    case 'iso':
      return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    default:
      return day.toLocaleDateString(ctx.locale || undefined, { month: 'short', day: 'numeric' });
  }
}

/**
 * The full date, for the tooltip and screen readers: "Freitag, 30. Oktober
 * 2026" ("Friday 30 October 2026"), with the clock time when the value is
 * a moment rather than a day ("…, 18:00"). The ISO format keeps its digits.
 */
export function fullDueDate(value: string, day: Date, ctx: AthDateContext = {}): string {
  const locale = ctx.locale || undefined;
  const date =
    ctx.dateFormat === 'iso'
      ? `${day.toLocaleDateString(locale, { weekday: 'long' })}, ${shortDay(day, ctx)}`
      : day.toLocaleDateString(locale, {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
  if (isDayOnly(value)) return date;
  const time = new Date(value).toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    ...(ctx.hour12 === undefined ? {} : { hour12: ctx.hour12 }),
    ...(ctx.timeZone ? { timeZone: ctx.timeZone } : {}),
  });
  return `${date}, ${time}`;
}

function fill(template: string, count: number): string {
  return template.replace(/\{count\}/g, String(count));
}

/**
 * The compact due text: "2 days overdue" ("1 day overdue"), "today",
 * "tomorrow", "in 3 days" up to six days ahead, then the short date.
 */
export function compactDueText(
  days: number,
  day: Date,
  labels: DueTextLabels,
  ctx: AthDateContext = {}
): string {
  if (days === -1 && labels.overdueOne) return fill(labels.overdueOne, 1);
  if (days < 0) return fill(labels.overdue, -days);
  if (days === 0) return labels.today;
  if (days === 1) return labels.tomorrow;
  if (days < 7) return fill(labels.inDays, days);
  return shortDay(day, ctx);
}

export interface DueInput {
  /** ISO date or timestamp; empty = no due date. */
  date: string | null | undefined;
  /** Finished work: muted, and the plain date instead of "overdue". */
  done?: boolean;
  /** A sprint-derived date names its day ("Sprint end · 31 Oct"). */
  source?: DueSource;
  now?: Date;
}

export interface DueView {
  tone: DueTone;
  /** The date part of the label (without the "Sprint end ·" prefix). */
  text: string;
  /** Calendar days from today; negative = past. */
  days: number;
  /** The short date, e.g. for a tooltip. */
  day: string;
  /** The full date (and time, for a moment): tooltip and screen readers. */
  full: string;
}

/** Everything `ath-due-label` draws, from a date; `null` without one. */
export function describeDue(
  input: DueInput,
  labels: DueTextLabels,
  ctx: AthDateContext = {}
): DueView | null {
  if (!input.date) return null;
  const day = calendarDayOf(input.date, ctx.timeZone);
  if (!day) return null;
  const days = calendarDaysUntil(day, input.now ?? new Date(), ctx.timeZone);
  const done = !!input.done;
  const plain = done || input.source === 'sprint';
  const short = shortDay(day, ctx);
  return {
    tone: dueToneOf(days, done),
    text: plain ? short : compactDueText(days, day, labels, ctx),
    days,
    day: short,
    full: fullDueDate(input.date, day, ctx),
  };
}
