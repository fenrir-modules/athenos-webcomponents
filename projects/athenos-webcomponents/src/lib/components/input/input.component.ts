import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { injectAthLabels } from '../../i18n/labels';

import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { AthIconComponent } from '../icon/icon.component';
import { Eye, EyeOff, AlertCircle } from 'lucide';

/**
 * Input type variants
 */
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

/** Field height: `md` 44px, `sm` 33px. */
export type InputSize = 'sm' | 'md';

/**
 * Athenos Input Component
 *
 * A unit goes inside the field, at its end: project it with
 * `[athInputSuffix]` (a content selector, no import). Not with a password.
 *
 * @example
 * <ath-input label="Email" type="email" [(ngModel)]="email" />
 * <ath-input label="Password" type="password" [error]="errorMessage" />
 * <ath-input size="sm" type="number" [(ngModel)]="quota"><span athInputSuffix>MB</span></ath-input>
 */
@Component({
  selector: 'ath-input',
  imports: [FormsModule, AthIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AthInputComponent),
      multi: true,
    },
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class AthInputComponent implements ControlValueAccessor {
  private readonly labels = injectAthLabels();

  /** Field height: `md` 44px (default), `sm` 33px (compact settings rows). */
  readonly size = input<InputSize>('md');

  /** Accessible names of the password reveal toggle; default `ATH_LABELS`. */
  readonly showPasswordLabel = input<string | null>(null);
  readonly hidePasswordLabel = input<string | null>(null);

  /** Input label */
  readonly label = input('');

  /** Input type */
  readonly type = input<InputType>('text');

  /** Placeholder text */
  readonly placeholder = input('');

  /** Error message */
  readonly error = input('');

  /** Hint text */
  readonly hint = input('');

  /** Disabled state (also set by the forms API, see `setDisabledState`). */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Readonly state */
  readonly readonly = input(false, { transform: booleanAttribute });

  /** Required field */
  readonly required = input(false, { transform: booleanAttribute });

  /** Autocomplete attribute */
  readonly autocomplete = input('off');

  /** Unique input ID */
  readonly inputId = input(`ath-input-${Math.random().toString(36).substr(2, 9)}`);

  /** Ids of the rendered error / hint, so the field can point aria-describedby at them. */
  protected readonly errorId = computed(() => `${this.inputId()}-error`);
  protected readonly hintId = computed(() => `${this.inputId()}-hint`);
  protected readonly describedBy = computed(() =>
    this.error() ? this.errorId() : this.hint() ? this.hintId() : null
  );

  // Written by the forms API (e.g. a setValue after an async lookup) outside
  // an input change; signals, so OnPush (and zoneless) views follow. Not
  // `value`: Storybook copies a story prop of that name onto the instance.
  protected readonly fieldValue = signal('');
  private readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  protected readonly showPassword = signal(false);

  protected readonly showPasswordText = computed(
    () => this.showPasswordLabel() ?? this.labels.showPassword()
  );
  protected readonly hidePasswordText = computed(
    () => this.hidePasswordLabel() ?? this.labels.hidePassword()
  );

  protected readonly eyeIcon = Eye;
  protected readonly eyeOffIcon = EyeOff;
  protected readonly alertIcon = AlertCircle;

  private onChange: (value: string) => void = () => {};
  protected onTouched: () => void = () => {};

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
    const target = event.target as HTMLInputElement;
    this.fieldValue.set(target.value);
    this.onChange(target.value);
  }

  togglePassword(): void {
    this.showPassword.update((shown) => !shown);
  }
}
