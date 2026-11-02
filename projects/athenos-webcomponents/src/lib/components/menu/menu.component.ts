import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  contentChildren,
  forwardRef,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AthPopoverComponent, AthPopoverContentDirective } from '../popover/popover.component';
import type { FloatingAlign, FloatingSide } from '../floating/floating';
import { resolveAnchor, type FloatingAnchor } from '../floating/floating.directive';
import type { AthOverlayCloseReason } from '../floating/overlay-stack';
import { Typeahead, edgeIndex, isTypeaheadKey, stepIndex } from '../floating/list-keys';
import { AthMenuItemComponent } from './menu-item.component';
import { ATH_MENU_PARENT, type AthMenuParent } from './menu-parent';

/** Which item gets focus when the menu opens. */
export type MenuFocus = 'first' | 'last' | 'none';

let nextMenuId = 0;

/**
 * Athenos Menu: the WAI-ARIA menu button pattern for row actions, `⋯` menus
 * and toolbars.
 *
 * Keyboard: on the trigger Enter, Space and ArrowDown open on the first
 * item, ArrowUp on the last. In the menu: ArrowDown/ArrowUp (wrapping),
 * Home/End, typeahead, Enter/Space activate, Escape closes and returns
 * focus to the trigger, Tab closes and moves on.
 *
 * Items in `<ng-template athPopoverContent>` are built only while the menu
 * is open (a menu per table row costs nothing until it is used).
 *
 * @example
 * <ath-button variant="ghost" [athMenuTrigger]="rowMenu" ariaLabel="Actions">⋯</ath-button>
 * <ath-menu #rowMenu>
 *   <button athMenuItem [icon]="Pencil" shortcut="E" (triggered)="edit()">Edit</button>
 *   <ath-menu-separator />
 *   <button athMenuItem variant="danger" (triggered)="remove()">Delete</button>
 * </ath-menu>
 */
@Component({
  selector: 'ath-menu',
  imports: [AthPopoverComponent, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'athMenu',
  providers: [{ provide: ATH_MENU_PARENT, useExisting: forwardRef(() => AthMenuComponent) }],
  template: `
    <ath-popover
      [open]="open()"
      (openChange)="open.set($event)"
      [anchor]="anchor()"
      [panelId]="panelId"
      size="auto"
      padding="sm"
      panelRole="menu"
      autoFocus="none"
      [align]="align()"
      [side]="side()"
      [maxHeight]="maxHeight()"
      [ariaLabel]="ariaLabel()"
      [ariaLabelledby]="ariaLabel() ? null : labelledBy()"
      [panelClass]="panelClass()"
      (opened)="onOpened()"
      (closed)="closed.emit($event)"
    >
      @if (lazyContent(); as lazy) {
        @if (open()) {
          <ng-container [ngTemplateOutlet]="lazy.template" />
        }
      } @else {
        <ng-content />
      }
    </ath-popover>
  `,
  styles: [':host { display: contents; }'],
  host: {
    '(keydown)': 'onKeydown($event)',
  },
})
export class AthMenuComponent implements AthMenuParent {
  /** Whether the menu is shown. Two-way: `[(open)]`. */
  readonly open = model(false);
  /** Anchor for programmatic use; `athMenuTrigger` sets it on its own. */
  readonly anchor = input<FloatingAnchor>(null);
  readonly align = input<FloatingAlign>('start');
  readonly side = input<FloatingSide>('bottom');
  readonly maxHeight = input<number | null>(null);
  /** Accessible name; by default the menu is labelled by its trigger. */
  readonly ariaLabel = input<string | null>(null);
  readonly panelClass = input('');

  readonly opened = output<void>();
  readonly closed = output<AthOverlayCloseReason>();

  readonly panelId = `ath-menu-${++nextMenuId}`;

  protected readonly labelledBy = signal<string | null>(null);
  private readonly popover = viewChild.required(AthPopoverComponent);
  protected readonly lazyContent = contentChild(AthPopoverContentDirective, {
    descendants: false,
  });
  private readonly items = contentChildren(AthMenuItemComponent, { descendants: true });
  private readonly typeahead = new Typeahead();
  private pendingFocus: MenuFocus = 'first';

  isOpen(): boolean {
    return this.open();
  }

  /** Opens the menu from `anchor`, focusing the first or last item. */
  show(anchor?: FloatingAnchor, focus: MenuFocus = 'first'): void {
    this.pendingFocus = focus;
    if (this.open()) {
      this.focusEdge(focus);
      return;
    }
    this.popover().show(resolveAnchor(anchor));
  }

  /** Closes the menu; focus returns to the trigger unless `restoreFocus` is false. */
  hide(restoreFocus = true): void {
    this.popover().hide('programmatic', restoreFocus);
  }

  toggle(anchor?: FloatingAnchor, focus: MenuFocus = 'first'): void {
    if (this.open()) this.hide();
    else this.show(anchor, focus);
  }

  /** Called by `athMenuTrigger`: the trigger names the menu. */
  labelFrom(triggerId: string): void {
    this.labelledBy.set(triggerId);
  }

  itemActivated(item: { keepOpen(): boolean }): void {
    if (!item.keepOpen()) this.popover().hide('select', true);
  }

  protected onOpened(): void {
    this.typeahead.reset();
    this.opened.emit();
    const focus = this.pendingFocus;
    this.pendingFocus = 'first';
    // Once the projected items are in the rendered panel.
    this.popover().whenPanelReady(() => this.focusEdge(focus));
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (!this.open()) return;
    const items = this.items();
    const count = items.length;
    if (count === 0) return;
    const active = items.findIndex((i) => i.element === document.activeElement);
    const any = (): boolean => true;
    let next = -1;
    switch (event.key) {
      case 'ArrowDown':
        next = active < 0 ? 0 : stepIndex(count, active, 1, any, true);
        break;
      case 'ArrowUp':
        next = active < 0 ? count - 1 : stepIndex(count, active, -1, any, true);
        break;
      case 'Home':
      case 'PageUp':
        next = 0;
        break;
      case 'End':
      case 'PageDown':
        next = count - 1;
        break;
      case 'Tab':
        // Focus goes back to the trigger; the Tab itself then moves on from there.
        this.popover().hide('tab', true);
        return;
      default:
        if (isTypeaheadKey(event) && event.key !== ' ') {
          next = this.typeahead.next(
            event.key,
            items.map((i) => i.label()),
            Math.max(active, 0)
          );
          if (next < 0) return;
        } else {
          return;
        }
    }
    event.preventDefault();
    items[next]?.focus();
  }

  private focusEdge(focus: MenuFocus): void {
    if (focus === 'none' || !this.open()) return;
    const items = this.items();
    const enabled = (i: number): boolean => !items[i].disabled();
    let index = edgeIndex(items.length, enabled, focus === 'last');
    if (index < 0) index = focus === 'last' ? items.length - 1 : 0;
    if (items[index]) items[index].focus();
    else this.popover().focusPanel('panel');
  }
}
