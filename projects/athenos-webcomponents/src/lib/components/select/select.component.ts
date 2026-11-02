import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { AthIconComponent } from '../icon/icon.component';
import { ChevronDown, AlertCircle } from 'lucide';
import { injectAthLabels } from '../../i18n/labels';

/**
 * Select option definition
 */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/** Field height: `md` 44px, `sm` 33px. */
export type SelectSize = 'sm' | 'md';

/**
 * Athenos Select Component
 *
 * Form select with consistent styling and ControlValueAccessor.
 *
 * @example
 * <ath-select label="Role" [options]="roles" [(ngModel)]="selectedRole" />
 * <ath-select [ariaLabel]="'Role for ' + member.name" [options]="roles" [(ngModel)]="role" />
 */
@Component({
  selector: 'ath-select',
  imports: [FormsModule, AthIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AthSelectComponent),
      multi: true,
    },
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class AthSelectComponent implements ControlValueAccessor {
  /** Field height: `md` 44px (default), `sm` 33px (compact settings rows). */
  readonly size = input<SelectSize>('md');

  /** Select label */
  readonly label = input('');

  private readonly labels = injectAthLabels();

  /**
   * The empty first option. Left out: the app's `selectPlaceholder` label
   * (`ATH_LABELS`, English by default); `''`: none — the select always
   * shows a value.
   */
  readonly placeholder = input<string | undefined>(undefined);
  protected readonly placeholderText = computed(
    () => this.placeholder() ?? this.labels.selectPlaceholder()
  );

  /** Select options */
  readonly options = input<SelectOption[]>([]);

  /** Error message */
  readonly error = input('');

  /** Hint text */
  readonly hint = input('');

  /** Disabled state (also set by the forms API, see `setDisabledState`). */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Required field */
  readonly required = input(false, { transform: booleanAttribute });

  /**
   * Accessible name of the native select when no visible `label` is drawn
   * (a select in a settings row or a table cell that its row already names).
   */
  readonly ariaLabel = input('');

  /** Unique select ID */
  readonly selectId = input(`ath-select-${Math.random().toString(36).substr(2, 9)}`);

  /** Ids of the rendered error / hint, so the field can point aria-describedby at them. */
  protected readonly errorId = computed(() => `${this.selectId()}-error`);
  protected readonly hintId = computed(() => `${this.selectId()}-hint`);
  protected readonly describedBy = computed(() =>
    this.error() ? this.errorId() : this.hint() ? this.hintId() : null
  );

  // Written by the forms API (e.g. a setValue after an async lookup) outside
  // an input change; signals, so OnPush (and zoneless) views follow. Not
  // `value`: Storybook copies a story prop of that name onto the instance.
  protected readonly fieldValue = signal('');
  private readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());

  protected readonly chevronIcon = ChevronDown;
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

  onSelectionChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.fieldValue.set(target.value);
    this.onChange(target.value);
  }
}
