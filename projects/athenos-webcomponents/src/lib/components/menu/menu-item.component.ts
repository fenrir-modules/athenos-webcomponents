import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  booleanAttribute,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { AthIconComponent } from '../icon/icon.component';
import { Check } from 'lucide';
import type { AthIconData } from '../floating/icon';
import { focusSafely } from '../floating/focus';
import { ATH_MENU_PARENT } from './menu-parent';

export type MenuItemVariant = 'default' | 'danger';

let nextReasonId = 0;

/**
 * One entry of an `ath-menu`: `<button athMenuItem>`, `<a athMenuItem>` or
 * `<ath-menu-item>`.
 *
 * Disabled items stay focusable (`aria-disabled`), so keyboard and screen
 * reader users can find them and hear `disabledReason`, which is also the
 * hover tooltip. Use `(triggered)` rather than `(click)`: it does not fire for
 * disabled items and closes the menu afterwards (unless `keepOpen`).
 *
 * @example
 * <button athMenuItem [icon]="Pencil" shortcut="E" (triggered)="edit()">Edit</button>
 * <button athMenuItem variant="danger" [disabled]="!canDelete" [disabledReason]="why"
 *         (triggered)="delete()">Delete</button>
 */
@Component({
  selector: 'ath-menu-item, button[athMenuItem], a[athMenuItem]',
  imports: [AthIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'athMenuItem',
  template: `
    @if (icon(); as img) {
      <ath-icon class="ath-menu-item__icon" [img]="img" [size]="16" aria-hidden="true" />
    } @else if (checked() !== null) {
      <span class="ath-menu-item__icon" aria-hidden="true">
        @if (checked()) {
          <ath-icon [img]="checkIcon" [size]="16" />
        }
      </span>
    }
    <span class="ath-menu-item__label"><ng-content /></span>
    @if (selected()) {
      <ath-icon class="ath-menu-item__current" [img]="checkIcon" [size]="16" aria-hidden="true" />
    }
    @if (shortcut()) {
      <kbd class="ath-menu-item__shortcut" aria-hidden="true">{{ shortcut() }}</kbd>
    }
    @if (disabled() && disabledReason()) {
      <span class="ath-menu-item__reason" [id]="reasonId" aria-hidden="true">{{
        disabledReason()
      }}</span>
    }
  `,
  styleUrl: './menu-item.component.scss',
  host: {
    class: 'ath-menu-item',
    tabindex: '-1',
    // A static `disabled` attribute would make the native button unfocusable;
    // disabled items stay focusable (aria-disabled).
    '[attr.disabled]': 'null',
    '[attr.type]': "isButton ? 'button' : null",
    '[attr.role]': 'role()',
    '[attr.aria-checked]': 'checked() ?? selected()',
    '[attr.aria-disabled]': 'disabled() || null',
    '[attr.aria-describedby]': 'disabled() && disabledReason() ? reasonId : null',
    '[attr.aria-keyshortcuts]': 'keyshortcuts()',
    '[attr.title]': '(disabled() && disabledReason()) || tooltip() || null',
    '[class.ath-menu-item--danger]': "variant() === 'danger'",
    '[class.ath-menu-item--disabled]': 'disabled()',
    '(click)': 'onClick($event)',
    '(keydown)': 'onKeydown($event)',
    '(mouseenter)': 'onHover()',
  },
})
export class AthMenuItemComponent {
  private readonly menu = inject(ATH_MENU_PARENT, { optional: true });
  /** The item element (the `<button>` or `<a>`). */
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  protected readonly isButton = this.element.tagName === 'BUTTON';
  protected readonly checkIcon = Check;
  protected readonly reasonId = `ath-menu-item-reason-${++nextReasonId}`;

  /** A Lucide icon before the label. */
  readonly icon = input<AthIconData | null | undefined>(null);
  /** Shortcut hint shown at the end, e.g. `⌘E`. */
  readonly shortcut = input<string | null>(null);
  /** `aria-keyshortcuts` value, e.g. `Meta+E` (the hint itself is hidden from AT). */
  readonly keyshortcuts = input<string | null>(null);
  readonly variant = input<MenuItemVariant>('default');
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Why the item is disabled: tooltip and accessible description. */
  readonly disabledReason = input<string | null | undefined>(null);
  /** Hover tooltip (for a disabled item `disabledReason` takes its place). */
  readonly tooltip = input<string | null | undefined>(null);
  /** `true`/`false` makes it a `menuitemcheckbox` with a check mark. */
  readonly checked = input<boolean | null>(null);
  /**
   * `true`/`false` makes it a `menuitemradio`, one of a menu that picks a
   * value: the current one carries a trailing check (`ath-dropdown
   * [activeId]`), and the menu opens on it.
   */
  readonly selected = input<boolean | null>(null);
  /** Leave the menu open after activation. */
  readonly keepOpen = input(false, { transform: booleanAttribute });

  /** The item was chosen (click, Enter or Space) and is not disabled. */
  readonly triggered = output<void>();

  protected readonly role = computed(() =>
    this.checked() !== null
      ? 'menuitemcheckbox'
      : this.selected() !== null
        ? 'menuitemradio'
        : 'menuitem'
  );

  /** The visible label, for typeahead. */
  label(): string {
    const el = this.element.querySelector('.ath-menu-item__label');
    return (el?.textContent ?? '').trim();
  }

  focus(): void {
    focusSafely(this.element);
  }

  protected onClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
    this.triggered.emit();
    this.menu?.itemActivated(this);
  }

  protected onKeydown(event: KeyboardEvent): void {
    // Buttons click on Enter and Space natively, links only on Enter, and
    // an <ath-menu-item> element on neither.
    const isLink = this.element.tagName === 'A';
    if (
      (event.key === ' ' && !this.isButton) ||
      (event.key === 'Enter' && !this.isButton && !isLink)
    ) {
      event.preventDefault();
      this.element.click();
    }
  }

  protected onHover(): void {
    if (this.menu?.isOpen()) this.focus();
  }
}

/** A divider between groups of menu items. */
@Component({
  selector: 'ath-menu-separator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '',
  styleUrl: './menu-separator.component.scss',
  host: { class: 'ath-menu-separator', role: 'separator' },
})
export class AthMenuSeparatorComponent {}
