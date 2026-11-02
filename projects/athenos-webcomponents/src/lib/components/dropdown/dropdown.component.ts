import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  TemplateRef,
  computed,
  contentChild,
  effect,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import type { AthIconData } from '../floating/icon';
import type { FloatingAlign } from '../floating/floating';
import { AthMenuComponent } from '../menu/menu.component';
import { AthMenuItemComponent, AthMenuSeparatorComponent } from '../menu/menu-item.component';
import { AthPopoverContentDirective } from '../popover/popover.component';

/** An action of the menu; choosing it emits its `id`. */
export interface DropdownAction {
  id: string;
  label: string;
  /** A Lucide icon (`import { Pencil } from '@athenos/webcomponents/icons'`). */
  icon?: AthIconData;
  variant?: 'default' | 'danger';
  disabled?: boolean;
  /** A tooltip — e.g. why a disabled item cannot be chosen (also read by screen readers). */
  title?: string;
  /** Shortcut hint at the end of the item, e.g. `⌘E`. */
  shortcut?: string;
}

/** A hairline between two groups of actions; use `DROPDOWN_SEPARATOR`. */
export interface DropdownSeparator {
  readonly separator: true;
}

/** One entry of `ath-dropdown`: an action or `DROPDOWN_SEPARATOR`. */
export type DropdownItem = DropdownAction | DropdownSeparator;

/**
 * The separator entry: `[edit, rename, DROPDOWN_SEPARATOR, remove]`. It
 * replaces the old pseudo-item `{ id: 'divider', label: '', divider: true }`
 * (quality step 2.7).
 */
export const DROPDOWN_SEPARATOR: DropdownSeparator = Object.freeze({ separator: true });

export function isDropdownSeparator(item: DropdownItem): item is DropdownSeparator {
  return 'separator' in item && item.separator === true;
}

type Entry = { key: string; action: DropdownAction | null };

/**
 * Static content at the top of the menu, above the first item (who is
 * signed in: avatar, name, email). Built only while the menu is open, like
 * the items. Not focusable and not an item: keep controls out of it.
 *
 * @example
 * <ath-dropdown [items]="items">
 *   <ath-button variant="ghost">Account</ath-button>
 *   <ng-template athDropdownHeader><strong>Mira Mock</strong> mira@example.com</ng-template>
 * </ath-dropdown>
 */
@Directive({ selector: 'ng-template[athDropdownHeader]' })
export class AthDropdownHeaderDirective {
  readonly template = inject<TemplateRef<unknown>>(TemplateRef);
}

/**
 * Horizontal alignment hint.
 * `'auto'` picks left or right based on available viewport space.
 */
export type DropdownAlign = 'left' | 'right' | 'auto';

const ALIGN: Record<DropdownAlign, FloatingAlign> = { left: 'start', right: 'end', auto: 'auto' };

/** The controls a projected trigger may be (or contain). */
const CONTROL = 'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Athenos Dropdown: an action menu from a flat `items` list. A preset on
 * `ath-menu` (keyboard, focus and ARIA come from there); for custom rows use
 * `ath-menu` + `athMenuItem` directly.
 *
 * The projected content is the trigger. When it is (or contains) a button,
 * that button is the menu button: one tab stop, with `aria-haspopup`,
 * `aria-expanded` and `aria-controls` on it. Plain content (text, an icon)
 * gets a `role="button"` wrapper instead.
 *
 * A menu that picks a value (a status, a priority) takes `activeId`: the
 * items become `menuitemradio`s, the current one carries a trailing check
 * and the menu opens on it.
 *
 * @example
 * <ath-dropdown [items]="menuItems" (itemClicked)="onAction($event)">
 *   <ath-button variant="ghost">Actions</ath-button>
 * </ath-dropdown>
 * <ath-dropdown [items]="statuses" [activeId]="ticket.status" (itemClicked)="setStatus($event)">
 *   <ath-status-pill [status]="ticket.status" />
 * </ath-dropdown>
 */
@Component({
  selector: 'ath-dropdown',
  imports: [
    NgTemplateOutlet,
    AthMenuComponent,
    AthMenuItemComponent,
    AthMenuSeparatorComponent,
    AthPopoverContentDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  host: {
    '(click)': 'onHostClick($event)',
    '(keydown)': 'onHostKeydown($event)',
  },
})
export class AthDropdownComponent implements AfterViewInit {
  /** Menu entries: actions, and `DROPDOWN_SEPARATOR` between groups. */
  readonly items = input<readonly DropdownItem[]>([]);

  /**
   * The id of the current value when the menu picks one: that item gets a
   * trailing check and focus on open. `null` (default): an action menu.
   */
  readonly activeId = input<string | null | undefined>(null);

  /** `<ng-template athDropdownHeader>`: content above the first item. */
  protected readonly header = contentChild(AthDropdownHeaderDirective);

  /** `[selected]` of an item: `null` in an action menu. */
  protected selectedOf(item: DropdownAction): boolean | null {
    const active = this.activeId();
    return active === null || active === undefined ? null : item.id === active;
  }

  /** Separators are keyed by position, actions by id. */
  protected readonly entries = computed<Entry[]>(() =>
    this.items().map((item, i) =>
      isDropdownSeparator(item)
        ? { key: `separator-${i}`, action: null }
        : { key: item.id, action: item }
    )
  );

  /**
   * Horizontal alignment hint.
   * - `'left'`  – menu anchored to the left edge of trigger
   * - `'right'` – menu anchored to the right edge of trigger
   * - `'auto'`  – pick best side based on viewport space
   *
   * Vertical direction is always auto-detected.
   */
  readonly align = input<DropdownAlign>('auto');

  /** Item click event */
  readonly itemClicked = output<string>();

  /** Emits `true` when the menu opens, `false` when it closes. */
  readonly openChange = output<boolean>();

  protected readonly menuAlign = (): FloatingAlign => ALIGN[this.align()];

  protected readonly menu = viewChild.required(AthMenuComponent);
  private readonly triggerRef = viewChild.required<ElementRef<HTMLElement>>('trigger');
  private readonly menuQuery = viewChild(AthMenuComponent);
  private viewReady = false;

  constructor() {
    effect(() => {
      const open = this.menuQuery()?.open() ?? false;
      if (this.viewReady) this.syncAria(open);
    });
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.syncAria(this.menu().open());
  }

  /** Opens or closes the menu (focus goes to the first item when opening). */
  toggle(): void {
    this.menu().toggle(this.triggerRef().nativeElement, 'first');
  }

  /** Emits the item's id, as a click on it does. */
  selectItem(item: DropdownAction): void {
    if (item.disabled) return;
    this.itemClicked.emit(item.id);
    this.menu().hide();
  }

  protected onOpenChange(open: boolean): void {
    this.openChange.emit(open);
  }

  protected onHostClick(event: MouseEvent): void {
    if (this.inTrigger(event)) this.toggle();
  }

  protected onHostKeydown(event: KeyboardEvent): void {
    if (!this.inTrigger(event)) return;
    const wrapperIsControl = this.control() === this.triggerRef().nativeElement;
    const key = event.key;
    if (key === 'ArrowDown' || key === 'ArrowUp') {
      event.preventDefault();
      this.menu().show(this.triggerRef().nativeElement, key === 'ArrowUp' ? 'last' : 'first');
    } else if (wrapperIsControl && (key === 'Enter' || key === ' ')) {
      // A real button clicks on its own; the role="button" wrapper does not.
      event.preventDefault();
      this.toggle();
    }
  }

  /** The trigger's real control, or the wrapper when there is none. */
  private control(): HTMLElement {
    const wrapper = this.triggerRef().nativeElement;
    return wrapper.querySelector<HTMLElement>(CONTROL) ?? wrapper;
  }

  private inTrigger(event: Event): boolean {
    return event.target instanceof Node && this.triggerRef().nativeElement.contains(event.target);
  }

  private syncAria(open: boolean): void {
    const wrapper = this.triggerRef().nativeElement;
    const control = this.control();
    if (control === wrapper) {
      wrapper.setAttribute('role', 'button');
      wrapper.tabIndex = 0;
    } else {
      wrapper.removeAttribute('role');
      wrapper.removeAttribute('tabindex');
    }
    control.setAttribute('aria-haspopup', 'menu');
    control.setAttribute('aria-expanded', String(open));
    if (open) control.setAttribute('aria-controls', this.menu().panelId);
    else control.removeAttribute('aria-controls');
  }
}
