import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  forwardRef,
  input,
  numberAttribute,
  signal,
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { AthIconComponent } from '../icon/icon.component';
import { AlertCircle } from 'lucide';

/** Which way the user may resize the field. */
export type TextareaResize = 'none' | 'vertical' | 'both';

/**
 * Athenos Textarea Component
 *
 * Multi-line text input with ControlValueAccessor.
 *
 * @example
 * <ath-textarea label="Description" [(ngModel)]="description" />
 * <ath-textarea label="Message" [rows]="6" [error]="errorMsg" />
 */
@Component({
  selector: 'ath-textarea',
  imports: [FormsModule, AthIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AthTextareaComponent),
      multi: true,
    },
  ],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
})
export class AthTextareaComponent implements ControlValueAccessor {
  /** Textarea label */
  readonly label = input('');

  /** Placeholder text */
  readonly placeholder = input('');

  /** Number of rows */
  readonly rows = input(4, { transform: numberAttribute });

  /** Error message */
  readonly error = input('');

  /** Hint text */
  readonly hint = input('');

  /** Disabled state (also set by the forms API, see `setDisabledState`). */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Required field */
  readonly required = input(false, { transform: booleanAttribute });

  /** Allow resize */
  readonly resize = input<TextareaResize>('vertical');

  /** Max length */
  readonly maxLength = input<number | null>(null);

  /** Unique textarea ID */
  readonly textareaId = input(`ath-textarea-${Math.random().toString(36).substr(2, 9)}`);

  /** Ids of the rendered error / hint, so the field can point aria-describedby at them. */
  protected readonly errorId = computed(() => `${this.textareaId()}-error`);
  protected readonly hintId = computed(() => `${this.textareaId()}-hint`);
  protected readonly describedBy = computed(() =>
    this.error() ? this.errorId() : this.hint() ? this.hintId() : null
  );

  // Written by the forms API (e.g. a setValue after an async lookup) outside
  // an input change; signals, so OnPush (and zoneless) views follow. Not
  // `value`: Storybook copies a story prop of that name onto the instance.
  protected readonly fieldValue = signal('');
  private readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());

  protected readonly alertIcon = AlertCircle;

  private onChange: (value: string) => void = () => {};
  protected onTouched: () => void = () => {};

  readonly characterCount = computed(() => this.fieldValue().length);

  /** Past 90% of `maxLength`. */
  protected readonly nearLimit = computed(() => {
    const max = this.maxLength();
    return max != null && this.characterCount() > max * 0.9;
  });

  writeValue(value: string): void {
    this.fieldValue.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }

  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.fieldValue.set(target.value);
    this.onChange(target.value);
  }
}
