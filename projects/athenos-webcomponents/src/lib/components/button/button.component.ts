import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ErrorHandler,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { AthIconComponent } from '../icon/icon.component';
import { Loader2 } from 'lucide';
import { type AthAction, runAthAction } from './button.action';

/**
 * Button variant types
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  // Quiet destructive: red text at rest, no box (a red tint on hover), for
  // per-row actions where a solid red button would shout. Solid `danger`
  // is the confirm inside a dialog.
  | 'danger-ghost'
  // The global create action (topbar "+ New") — green, distinct from the
  // page's own ink primary.
  | 'create';

/**
 * Button size types
 */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

/** The native button's `type`. */
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Athenos Button Component
 *
 * `[action]` makes the button track its own work: pass a function that
 * returns a Promise or an Observable and the button is busy until it
 * settles: `aria-disabled` (so it keeps focus), a spinner, `aria-busy`,
 * and a second click (or a double click) does nothing. No hand-kept `saving` signal (QA-13).
 *
 * @example
 * <ath-button variant="primary" (clicked)="handleClick()">Click me</ath-button>
 * <ath-button variant="primary" [action]="save">Save</ath-button>
 *   // in the component: protected readonly save = () => this.sprints.create(this.draft());
 * <ath-button variant="outline" size="sm" [loading]="true">Loading...</ath-button>
 */
@Component({
  selector: 'ath-button',
  imports: [AthIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class AthButtonComponent {
  private readonly errorHandler = inject(ErrorHandler);
  /**
   * The action may remove the button before it settles (it navigates
   * away, or hides the button it was started from): then nothing is left
   * to update or to emit from (NG0953). Failures still reach the handler.
   */
  private destroyed = false;

  constructor() {
    inject(DestroyRef).onDestroy(() => (this.destroyed = true));
  }

  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  /** Button type attribute. */
  readonly type = input<ButtonType>('button');
  readonly disabled = input(false);
  /** Busy from outside (an action started elsewhere). `[action]` sets its own. */
  readonly loading = input(false);
  readonly fullWidth = input(false);

  /**
   * Toggle state. `null` (default) renders a plain button; `true`/`false`
   * make it a toggle button with `aria-pressed` and a sunken pressed look.
   */
  readonly pressed = input<boolean | null>(null);

  /**
   * Disclosure state for a button that opens a panel or menu. `null`
   * (default) omits `aria-expanded`. Set this instead of
   * `[attr.aria-expanded]` on the host: host attributes do not reach the
   * focusable inner `<button>`.
   */
  readonly expanded = input<boolean | null>(null);

  /** Id of the element this button controls (`aria-controls`). */
  readonly controls = input<string | null>(null);

  /** Optional aria-label for icon-only usage. */
  readonly ariaLabel = input<string | null>(null);

  /** Work to run on click; the button is busy until it settles. */
  readonly action = input<AthAction | null>(null);

  /** Every accepted click (also with `[action]`, before it runs). */
  readonly clicked = output<MouseEvent>();
  /** The action settled successfully. */
  readonly done = output<unknown>();
  /** The action failed; the error also goes to Angular's `ErrorHandler`. */
  readonly failed = output<unknown>();

  private readonly running = signal(false);

  /** Busy: an `[action]` is running or `[loading]` is set. */
  readonly busy = computed(() => this.running() || this.loading());

  protected readonly loaderIcon = Loader2;

  protected readonly buttonClasses = computed(() =>
    [
      'ath-button',
      `ath-button--${this.variant()}`,
      `ath-button--${this.size()}`,
      this.fullWidth() ? 'ath-button--full-width' : '',
      this.busy() ? 'ath-button--loading' : '',
      this.pressed() ? 'ath-button--pressed' : '',
    ]
      .filter(Boolean)
      .join(' ')
  );

  handleClick(event: MouseEvent): void {
    if (this.disabled() || this.busy()) {
      // A submit button must not submit its form while busy either, and a
      // (click) bound on <ath-button> itself must not fire: with
      // aria-disabled instead of native disabled the click would bubble.
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    this.clicked.emit(event);
    const action = this.action();
    if (!action) return;
    this.running.set(true);
    runAthAction(action).then(
      (value) => {
        if (this.destroyed) return;
        this.running.set(false);
        this.done.emit(value);
      },
      (err: unknown) => {
        if (!this.destroyed) {
          this.running.set(false);
          this.failed.emit(err);
        }
        this.errorHandler.handleError(err);
      }
    );
  }
}
