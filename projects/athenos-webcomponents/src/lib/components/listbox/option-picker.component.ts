import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  TemplateRef,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';
import { AthIconComponent } from '../icon/icon.component';
import { ChevronDown, X } from 'lucide';
import { formatAthLabel, injectAthLabels } from '../../i18n/label-utils';
import type { FloatingAlign } from '../floating/floating';
import { resolveAnchor, type FloatingAnchor } from '../floating/floating.directive';
import type { AthOverlayCloseReason } from '../floating/overlay-stack';
import {
  AthPopoverComponent,
  AthPopoverContentDirective,
  type PopoverSize,
} from '../popover/popover.component';
import { AthPopoverTriggerDirective } from '../popover/popover-trigger.directive';
import {
  AthListboxComponent,
  type ListboxOption,
  type ListboxOptionContext,
} from './listbox.component';

/** `button`: the picker draws its own trigger; `none`: it hangs from `anchor`. */
export type OptionPickerTrigger = 'button' | 'none';

let nextPickerId = 0;

/**
 * Athenos Option Picker: `ath-popover` + `ath-listbox` behind a select-style
 * trigger. The base for person, label, filter and relation pickers.
 *
 * `trigger="none"` drops the built-in button: the panel hangs from `anchor`
 * (or the host) and opens through `[(open)]` or `show()`.
 *
 * @example
 * <ath-option-picker [options]="labels" multiple [(values)]="selected"
 *                    creatable (create)="addLabel($event)" ariaLabel="Labels" />
 */
@Component({
  selector: 'ath-option-picker',
  imports: [
    AthPopoverComponent,
    AthPopoverContentDirective,
    AthPopoverTriggerDirective,
    AthListboxComponent,
    AthIconComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './option-picker.component.html',
  styleUrl: './option-picker.component.scss',
  exportAs: 'athOptionPicker',
})
export class AthOptionPickerComponent<T = string> {
  protected readonly labels = injectAthLabels();
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  // ----- Data (passed to the listbox) -----
  readonly options = input<readonly ListboxOption<T>[]>([]);
  readonly multiple = input(false, { transform: booleanAttribute });
  readonly value = model<T | null>(null);
  readonly values = model<readonly T[]>([]);
  /** Search text; `(queryChange)` drives server-side search. */
  readonly query = model('');
  readonly searchable = input(true, { transform: booleanAttribute });
  readonly localFilter = input(true, { transform: booleanAttribute });
  readonly creatable = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  readonly searchPlaceholder = input<string | null>(null);
  readonly emptyLabel = input<string | null>(null);
  readonly optionTemplate = input<TemplateRef<ListboxOptionContext<T>> | null>(null);
  readonly compareWith = input<((a: T, b: T) => boolean) | null>(null);
  readonly maxHeight = input<number | null>(320);

  // ----- Trigger -----
  /** `button`: built-in select-style trigger; `none`: you provide `anchor` and open it. */
  readonly trigger = input<OptionPickerTrigger>('button');
  /** Trigger text without a selection; defaults to `ATH_LABELS.pickerPlaceholder`. */
  readonly placeholder = input<string | null>(null);
  readonly disabled = input(false, { transform: booleanAttribute });
  /** A clear button next to the trigger while something is selected. */
  readonly clearable = input(false, { transform: booleanAttribute });
  /** What is being picked ("Assignee"): names the trigger and the popup. */
  readonly ariaLabel = input<string | null>(null);

  // ----- Popup -----
  readonly open = model(false);
  readonly anchor = input<FloatingAnchor>(null);
  readonly size = input<PopoverSize>('md');
  readonly align = input<FloatingAlign>('start');
  readonly matchWidth = input(false, { transform: booleanAttribute });
  /** Close after a pick; default: single-select yes, multi-select no. */
  readonly closeOnPick = input<boolean | null>(null);
  /** Empty the search when the popup opens. */
  readonly resetQueryOnOpen = input(true, { transform: booleanAttribute });

  readonly picked = output<ListboxOption<T>>();
  readonly create = output<string>();
  readonly opened = output<void>();
  readonly closed = output<AthOverlayCloseReason>();

  protected readonly chevronIcon = ChevronDown;
  protected readonly clearIcon = X;
  protected readonly labelId = `ath-picker-label-${++nextPickerId}`;
  protected readonly valueId = `ath-picker-value-${nextPickerId}`;

  private readonly popover = viewChild.required(AthPopoverComponent);
  private readonly triggerButton = viewChild<ElementRef<HTMLElement>>('triggerBtn');
  /** Rendered only while the popup is open. */
  private readonly listbox = viewChild(AthListboxComponent);

  protected readonly popupAnchor = computed<HTMLElement | null>(
    () =>
      resolveAnchor(this.anchor()) ??
      (this.trigger() === 'none' ? this.host : (this.triggerButton()?.nativeElement ?? null))
  );

  protected readonly placeholderText = computed(
    () => this.placeholder() ?? this.labels.pickerPlaceholder()
  );

  private readonly selectedOptions = computed<ListboxOption<T>[]>(() => {
    const eq = this.compareWith() ?? Object.is;
    const options = this.options();
    if (this.multiple()) {
      return this.values()
        .map((v) => options.find((o) => eq(o.value, v)))
        .filter((o): o is ListboxOption<T> => !!o);
    }
    const v = this.value();
    const hit = v === null ? undefined : options.find((o) => eq(o.value, v));
    return hit ? [hit] : [];
  });

  protected readonly hasValue = computed(() => this.selectedOptions().length > 0);

  /** The trigger text: the selection, "N selected", or the placeholder. */
  readonly summary = computed(() => {
    const selected = this.selectedOptions();
    if (selected.length === 0) return this.placeholderText();
    if (selected.length <= 2) return selected.map((o) => o.label).join(', ');
    return formatAthLabel(this.labels.pickerSelected(), { count: selected.length });
  });

  show(): void {
    if (this.disabled()) return;
    this.popover().show(this.popupAnchor());
  }

  hide(): void {
    this.popover().hide();
  }

  toggle(): void {
    if (this.open()) this.hide();
    else this.show();
  }

  /** Empties the selection. */
  clear(): void {
    if (this.multiple()) this.values.set([]);
    else this.value.set(null);
  }

  protected onOpened(): void {
    if (this.resetQueryOnOpen()) this.query.set('');
    this.opened.emit();
    // Once the panel (and with it the listbox) is rendered: the active option
    // is scrolled into view.
    this.popover().whenPanelReady(() => this.listbox()?.resetActive());
  }

  protected onPicked(option: ListboxOption<T>): void {
    this.picked.emit(option);
    if (this.closeOnPick() ?? !this.multiple()) this.popover().hide('select', true);
  }
}
