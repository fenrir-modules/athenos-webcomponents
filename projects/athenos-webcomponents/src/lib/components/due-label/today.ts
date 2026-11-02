import { isPlatformBrowser } from '@angular/common';
import { DestroyRef, Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { ATH_DATE_CONTEXT, zonedWallClock } from './due-date';

const HOUR_MS = 3_600_000;

/**
 * A signal that changes when the day may have moved on, so a "today" /
 * "tomorrow" / "overdue" label left on screen overnight is right in the
 * morning without a reload. One timer for the app, however many labels
 * read it.
 *
 * Only a dependency: readers take `new Date()` when they compute. A stored
 * moment is a day off in the reader's time zone (`ATH_DATE_CONTEXT`)
 * whenever that differs from the browser's.
 */
@Injectable({ providedIn: 'root' })
export class AthToday {
  private readonly version = signal(0);
  /** Read it to recompute at midnight, local or in the reader's zone. */
  readonly tick = this.version.asReadonly();
  private readonly dateContext = inject(ATH_DATE_CONTEXT, { optional: true });
  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;
    this.schedule();
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  private schedule(): void {
    const now = new Date();
    // Recomputed from the clock each time, so a late (sleep) or early
    // (clock change) wake-up corrects itself on the next round. The hour
    // cap picks up a changed time zone preference.
    const delay = Math.min(
      untilMidnight(now),
      untilMidnight(zonedWallClock(now, this.dateContext?.().timeZone)),
      HOUR_MS
    );
    this.timer = setTimeout(() => {
      this.version.update((v) => v + 1);
      this.schedule();
    }, delay);
  }
}

/** Milliseconds from a wall-clock `now` to the next midnight on that clock. */
function untilMidnight(now: Date): number {
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return midnight.getTime() - now.getTime();
}
