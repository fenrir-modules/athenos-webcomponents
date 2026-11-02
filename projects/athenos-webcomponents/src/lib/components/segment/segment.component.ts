import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { nextTabIndex, tabStopIndex } from '../tabs/tab-keys';

export interface SegmentOption<T = string> {
  value: T;
  label: string;
  /** Optional inline count badge (e.g., "12"). */
  count?: number | string;
  /** Optional `disabled` state per option. */
  disabled?: boolean;
}

export type SegmentSize = 'sm' | 'md';

/**
 * iOS-style segmented control. Multiple options, exactly one active.
 *
 * @example
 * <ath-segment
 *   [options]="[{value:'list', label:'List'}, {value:'kanban', label:'Kanban'}]"
 *   [value]="view"
 *   (valueChange)="view = $event" />
 */
@Component({
  selector: 'ath-segment',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './segment.component.html',
  styleUrl: './segment.component.scss',
  host: {
    role: 'tablist',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.data-size]': 'size()',
  },
})
export class AthSegmentComponent<T = string> {
  readonly options = input.required<SegmentOption<T>[]>();
  /** The active option's value. Controlled: pair with `(valueChange)` or `[(value)]`. */
  readonly value = input.required<T>();
  readonly size = input<SegmentSize>('md');

  /** Optional aria-label for the group (for screen readers). */
  readonly ariaLabel = input<string | null>(null);

  readonly valueChange = output<T>();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  /** The one option in the tab order; the arrow keys reach the others. */
  protected readonly tabStop = computed(() => {
    const options = this.options();
    return tabStopIndex(
      options.findIndex((option) => option.value === this.value()),
      options.map((option) => !!option.disabled)
    );
  });

  trackByValue = (_: number, item: SegmentOption<T>): unknown => item.value;

  select(option: SegmentOption<T>): void {
    if (option.disabled) return;
    if (option.value !== this.value()) {
      this.valueChange.emit(option.value);
    }
  }

  protected onKey(event: KeyboardEvent, index: number): void {
    const options = this.options();
    const next = nextTabIndex(
      event,
      index,
      options.map((option) => !!option.disabled),
      this.host.nativeElement
    );
    if (next === null) return;
    event.preventDefault();
    this.select(options[next]);
    this.host.nativeElement.querySelectorAll<HTMLElement>('[role="tab"]')[next]?.focus();
  }

  isActive(option: SegmentOption<T>): boolean {
    return option.value === this.value();
  }
}
