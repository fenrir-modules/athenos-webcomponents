import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
} from '@angular/core';
import { AthIconComponent } from '../icon/icon.component';
import { Check } from 'lucide';
import { injectAthLabels } from '../../i18n/labels';
import { ATH_DECO_COLORS, type AthDecoColor, athDecoColorLabel } from './deco-color';

/**
 * How the swatches paint their colour: `muted` the deco marks (role badges,
 * avatar rings) as they appear elsewhere; `solid` the full colour, for a
 * choice shown solid next to the picker (a workspace tile).
 */
export type AthColorSwatchTone = 'muted' | 'solid';

/**
 * A colour from the decorative palette, as a radio group (WAI-ARIA radio
 * pattern): one tab stop, the arrow keys move and pick, Home/End jump.
 * Each swatch is named for screen readers ("Blue"), the selected one also
 * carries a check, so the choice does not rest on colour alone.
 *
 * @example
 * <ath-color-swatch [(value)]="role.color" label="Rollenfarbe" />
 * <ath-color-swatch [(value)]="workspace.color" tone="solid" />
 */
@Component({
  selector: 'ath-color-swatch',
  imports: [AthIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './color-swatch.component.html',
  styleUrl: './color-swatch.component.scss',
})
export class AthColorSwatchComponent {
  private readonly labels = injectAthLabels();
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  /** The picked token; `null`: none yet (the first swatch takes the tab stop). */
  readonly value = model<string | null>(null);
  /** The group's accessible name; defaults to the "Colour" label. */
  readonly label = input<string | null>(null);
  readonly disabled = input(false, { transform: booleanAttribute });
  /** `muted` (default) or `solid`: draw the swatches as the colour is used. */
  readonly tone = input<AthColorSwatchTone>('muted');
  /** The tokens offered, in order (default: the whole palette). */
  readonly colors = input<readonly AthDecoColor[]>(ATH_DECO_COLORS);

  protected readonly checkIcon = Check;
  protected readonly groupLabel = computed(() => this.label() || this.labels.colorPicker());
  protected readonly options = computed(() =>
    this.colors().map((color) => ({ color, name: athDecoColorLabel(this.labels, color) }))
  );
  /** The index holding the tab stop: the picked swatch, else the first. */
  protected readonly stop = computed(() =>
    Math.max(
      0,
      this.colors().findIndex((c) => c === this.value())
    )
  );

  protected pick(color: AthDecoColor): void {
    if (!this.disabled()) this.value.set(color);
  }

  protected onKey(event: KeyboardEvent, index: number): void {
    if (this.disabled()) return;
    const count = this.colors().length;
    // Right-to-left: Left and Right follow the visual order.
    const rtl = getComputedStyle(this.host.nativeElement).direction === 'rtl';
    let next: number;
    switch (event.key) {
      case 'ArrowRight':
        next = index + (rtl ? -1 : 1);
        break;
      case 'ArrowLeft':
        next = index + (rtl ? 1 : -1);
        break;
      case 'ArrowDown':
        next = index + 1;
        break;
      case 'ArrowUp':
        next = index - 1;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = count - 1;
        break;
      case ' ':
      case 'Enter':
        event.preventDefault();
        this.pick(this.colors()[index]);
        return;
      default:
        return;
    }
    event.preventDefault();
    next = (next + count) % count;
    this.pick(this.colors()[next]);
    this.focusAt(next);
  }

  private focusAt(index: number): void {
    const radios = this.host.nativeElement.querySelectorAll<HTMLElement>('[role="radio"]');
    radios[index]?.focus();
  }
}
