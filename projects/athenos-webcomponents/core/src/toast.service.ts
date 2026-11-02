import { Injectable, signal } from '@angular/core';

/**
 * Toast variant types
 */
export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

/**
 * Toast message
 */
export interface ToastMessage {
  id: string;
  variant: ToastVariant;
  message: string;
  /** Optional headline above the message. */
  title?: string;
  duration?: number;
  action?: ToastAction;
}

/** A quiet text button in the toast ("Öffnen"). Runs, then closes the toast. */
export interface ToastAction {
  label: string;
  run: () => void;
}

/**
 * Second argument of the toast methods: a duration in ms (the old form,
 * still accepted), or options. A toast with an action stays a little
 * longer by default (8s) so there is time to reach the button.
 */
export interface ToastOptions {
  duration?: number;
  action?: ToastAction;
  /** A short headline above the message; the message becomes the detail line. */
  title?: string;
}

const ACTION_MIN_DURATION = 8000;

/** A toast's lifetime: what is left, and since when it runs (null: stopped). */
interface ToastClock {
  remaining: number;
  since: number | null;
  handle: ReturnType<typeof setTimeout> | null;
}

/**
 * Toast Service
 *
 * Global notification service for displaying toast messages.
 *
 * A toast's lifetime can stop and go on. `pause(reason)` stops every clock
 * until the same reason is resumed: the container pauses while the pointer
 * or the focus is on a toast and while the page is hidden. `hold(id)` stops
 * one toast's clock, so a toast collapsed behind the visible ones does not
 * run out unseen. A stopped toast keeps the time it had left.
 *
 * The same words again (a retry loop, a double click) are one toast: it
 * moves to the newest place with a fresh clock instead of stacking. A toast
 * with an action is never merged, its action may differ. At most
 * `maxQueued` toasts are kept; past that the oldest goes.
 *
 * @example
 * constructor(private toast: AthToastService) {}
 * this.toast.success('Item created');
 * this.toast.error('Something went wrong');
 * this.toast.info('Timer discarded', { title: 'TEST-1', action: { label: 'Undo', run } });
 */
@Injectable({ providedIn: 'root' })
export class AthToastService {
  private readonly toastsSignal = signal<ToastMessage[]>([]);
  readonly toasts = this.toastsSignal.asReadonly();

  private readonly pausedSignal = signal(false);
  /** True while at least one `pause(reason)` is in effect. */
  readonly paused = this.pausedSignal.asReadonly();

  /** Most toasts kept at once; a new one past it closes the oldest. */
  maxQueued = 10;

  private readonly clocks = new Map<string, ToastClock>();
  private readonly pauses = new Set<string>();
  private readonly holds = new Set<string>();

  /** Returns the new toast's id (for `remove`). */
  success(message: string, options: number | ToastOptions = 4000): string {
    return this.add('success', message, options, 4000);
  }

  error(message: string, options: number | ToastOptions = 6000): string {
    return this.add('error', message, options, 6000);
  }

  warning(message: string, options: number | ToastOptions = 5000): string {
    return this.add('warning', message, options, 5000);
  }

  info(message: string, options: number | ToastOptions = 4000): string {
    return this.add('info', message, options, 4000);
  }

  /** Run a toast's action, then close the toast. */
  runAction(id: string): void {
    const toast = this.toastsSignal().find((t) => t.id === id);
    this.remove(id);
    toast?.action?.run();
  }

  remove(id: string): void {
    const clock = this.clocks.get(id);
    if (clock?.handle) clearTimeout(clock.handle);
    this.clocks.delete(id);
    this.holds.delete(id);
    this.toastsSignal.update((toasts) => toasts.filter((t) => t.id !== id));
  }

  /** Closes every toast. */
  clear(): void {
    for (const toast of this.toastsSignal()) this.remove(toast.id);
  }

  /**
   * Stops every toast's clock until `resume(reason)`. Reasons stack: the
   * clocks go on once the last one is resumed.
   */
  pause(reason = 'api'): void {
    this.pauses.add(reason);
    if (this.pausedSignal()) return;
    this.pausedSignal.set(true);
    for (const id of this.clocks.keys()) this.stop(id);
  }

  resume(reason = 'api'): void {
    if (!this.pauses.delete(reason) || this.pauses.size > 0) return;
    this.pausedSignal.set(false);
    for (const id of this.clocks.keys()) this.sync(id);
  }

  /** Stops one toast's clock until `release(id)`. */
  hold(id: string): void {
    if (!this.toastsSignal().some((t) => t.id === id)) return;
    this.holds.add(id);
    this.stop(id);
  }

  release(id: string): void {
    if (!this.holds.delete(id)) return;
    this.sync(id);
  }

  /** Whether a toast's clock is running now (false for a toast that stays). */
  isRunning(id: string): boolean {
    return !!this.clocks.get(id)?.handle;
  }

  /** Milliseconds left on a toast's clock; null for a toast that stays (duration 0) or is gone. */
  remaining(id: string): number | null {
    const clock = this.clocks.get(id);
    if (!clock) return null;
    if (clock.since === null) return clock.remaining;
    return Math.max(0, clock.remaining - (Date.now() - clock.since));
  }

  private add(
    variant: ToastVariant,
    message: string,
    options: number | ToastOptions,
    fallback: number
  ): string {
    const opts: ToastOptions = typeof options === 'number' ? { duration: options } : options;
    const action = opts.action;
    const duration = opts.duration ?? (action ? Math.max(fallback, ACTION_MIN_DURATION) : fallback);
    const same = action
      ? undefined
      : this.toastsSignal().find(
          (t) =>
            !t.action &&
            t.variant === variant &&
            t.message === message &&
            (t.title ?? '') === (opts.title ?? '')
        );
    if (same) return this.repeat(same, duration);

    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const toast: ToastMessage = { id, variant, message, duration, action };
    if (opts.title) toast.title = opts.title;

    this.toastsSignal.update((toasts) => [...toasts, toast]);
    this.startClock(id, duration);

    const list = this.toastsSignal();
    for (const old of list.slice(0, Math.max(0, list.length - Math.max(1, this.maxQueued)))) {
      this.remove(old.id);
    }
    return id;
  }

  /** An identical toast again: the existing one moves to the newest place, its clock restarted. */
  private repeat(toast: ToastMessage, duration: number): string {
    const clock = this.clocks.get(toast.id);
    if (clock?.handle) clearTimeout(clock.handle);
    this.clocks.delete(toast.id);
    this.toastsSignal.update((toasts) => [
      ...toasts.filter((t) => t.id !== toast.id),
      { ...toast, duration },
    ]);
    this.startClock(toast.id, duration);
    return toast.id;
  }

  private startClock(id: string, duration: number): void {
    if (duration <= 0) return;
    this.clocks.set(id, { remaining: duration, since: null, handle: null });
    this.sync(id);
  }

  private sync(id: string): void {
    if (this.pausedSignal() || this.holds.has(id)) this.stop(id);
    else this.start(id);
  }

  private start(id: string): void {
    const clock = this.clocks.get(id);
    if (!clock || clock.handle) return;
    clock.since = Date.now();
    clock.handle = setTimeout(() => this.remove(id), clock.remaining);
  }

  private stop(id: string): void {
    const clock = this.clocks.get(id);
    if (!clock?.handle) return;
    clearTimeout(clock.handle);
    clock.remaining = this.remaining(id) ?? 0;
    clock.since = null;
    clock.handle = null;
  }
}
