import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
  numberAttribute,
} from '@angular/core';

export type ProgressTone = 'accent' | 'success' | 'warning' | 'danger' | 'neutral';
export type ProgressSize = 'xs' | 'sm' | 'md';

/**
 * Generic progress bar. Used for milestones, subtasks, sprint burn,
 * upload progress, etc.
 *
 * @example
 * <ath-progress [value]="62" />
 * <ath-progress [value]="80" tone="warning" size="md" [showLabel]="true" />
 * <ath-progress [value]="40" [total]="50" [showLabel]="true" />
 */
@Component({
  selector: 'ath-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss',
  host: {
    '[attr.data-tone]': 'tone()',
    '[attr.data-size]': 'size()',
  },
})
export class AthProgressComponent {
  /** Current value. When `total` is unset, treated as a percentage (0..100). Negative counts as 0. */
  readonly value = input(0, { transform: (v: unknown) => Math.max(0, numberAttribute(v, 0)) });

  /** Total (denominator). If unset, `value` is a percent. */
  readonly total = input<number | null>(null);

  readonly tone = input<ProgressTone>('accent');
  readonly size = input<ProgressSize>('sm');

  /** Show a small `X / Y` (or `X %`) label next to the bar. */
  readonly showLabel = input(false, { transform: booleanAttribute });

  /** Optional aria-label for screen readers. */
  readonly ariaLabel = input<string | null>(null);

  protected readonly pct = computed<number>(() => {
    const v = this.value();
    const total = this.total();
    if (total != null && total > 0) {
      return Math.min(100, (v / total) * 100);
    }
    return Math.min(100, v);
  });

  protected readonly label = computed<string>(() => {
    const total = this.total();
    if (total != null) {
      return `${Math.round(this.value())} / ${total}`;
    }
    // "39 %" with a no-break space, as every other percentage in the app
    // ("39 % erledigt"); the bare "39%" read as a second notation.
    return `${Math.round(this.pct())}\u00a0%`;
  });
}
