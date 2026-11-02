import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  output,
  untracked,
  viewChild,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AthIconComponent } from '../icon/icon.component';
import { X } from 'lucide';
import { injectAthLabels } from '../../i18n/label-utils';
import { AthOverlayStack, type AthOverlayEntry } from '../floating/overlay-stack';
import { focusSafely, tabbables, trapTab } from '../floating/focus';

/**
 * Dialog size variants: max widths 400 / 520 / 680 / 860px, `full` = the
 * viewport minus a margin.
 */
export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/** ARIA role of the dialog: `alertdialog` for confirmations that interrupt. */
export type DialogRole = 'dialog' | 'alertdialog';

let nextDialogId = 0;

/**
 * Athenos Dialog: the one modal of the library, on a native `<dialog>`
 * opened with `showModal()`. That puts it in the top layer (no z-index, no
 * clipping), makes the rest of the page inert and gives a `::backdrop`
 * (`--scrim`). On top: Tab stays inside, page scroll is locked, Escape and
 * backdrop clicks follow `closeOnEscape` / `closeOnBackdrop`, and focus goes
 * back to where it was when the dialog closes.
 *
 * Controlled: a close request (✕, Escape, backdrop) emits `closed` and
 * `openChange(false)`; the dialog closes when `open` becomes false, so a
 * parent can refuse (unsaved changes). `[(open)]` works.
 *
 * Content: the default slot is the scrolling body; `[slot=header]` (or
 * `[athDialogHeader]`) goes into the header under the title,
 * `[slot=footer]` (or `[athDialogFooter]`) into the footer. Initial focus:
 * an element with `autofocus`, else the first control in the body/footer,
 * else the close button.
 *
 * `bare`: no header, footer, close button or surface. The dialog is a
 * transparent layer over the viewport and the content draws and places its
 * own surface (a palette at the top, a bottom sheet, a composer with its own
 * head); a click on the layer around it counts as a backdrop click. Top
 * layer, inert page, scrim, focus trap, Escape and focus return stay. Name it
 * with `ariaLabel`.
 *
 * @example
 * <ath-dialog [(open)]="isOpen" title="Create item" (closed)="onClose()">
 *   <p>Dialog content here</p>
 *   <div slot="footer">
 *     <ath-button variant="secondary" (clicked)="isOpen = false">Cancel</ath-button>
 *     <ath-button (clicked)="save()">Save</ath-button>
 *   </div>
 * </ath-dialog>
 */
@Component({
  selector: 'ath-dialog',
  imports: [AthIconComponent, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  host: {
    '(pointerdown)': 'onPointerDown($event)',
    '(click)': 'onClick($event)',
  },
})
export class AthDialogComponent implements OnChanges, OnDestroy {
  private readonly stack = inject(AthOverlayStack);
  private readonly labels = injectAthLabels();

  /** Ids that name and describe the dialog (`aria-labelledby/-describedby`). */
  protected readonly titleId = `ath-dialog-title-${++nextDialogId}`;
  protected readonly descriptionId = `ath-dialog-desc-${nextDialogId}`;

  /** Whether the dialog is open. Two-way: `[(open)]`. */
  readonly open = input(false, { transform: booleanAttribute });
  /** Dialog title (names the dialog). */
  readonly title = input('');
  /** Dialog description (describes the dialog). */
  readonly description = input('');
  readonly size = input<DialogSize>('md');
  /** Whether clicking the backdrop requests closing. */
  readonly closeOnBackdrop = input(true, { transform: booleanAttribute });
  /** Whether Escape requests closing. */
  readonly closeOnEscape = input(true, { transform: booleanAttribute });
  /** Show the ✕ button in the header. */
  readonly showClose = input(true, { transform: booleanAttribute });
  /** Accessible name of the close button; defaults to `ATH_LABELS.closeDialog`. */
  readonly closeLabel = input<string | null>(null);
  /** Accessible name when there is no visible `title`. */
  readonly ariaLabel = input<string | null>(null);
  /** `alertdialog` for confirmations that interrupt. */
  readonly role = input<DialogRole>('dialog');
  /**
   * Only the content, on a transparent full-viewport layer: the content is
   * the surface and places itself (see the class comment). `title`,
   * `description`, `size` and `showClose` do not apply.
   */
  readonly bare = input(false, { transform: booleanAttribute });
  /**
   * For a `bare` dialog: a band at the top that stays uncovered and usable
   * while the dialog is open (a CSS length: a shell's top bar, e.g. `48px`),
   * as `ath-sheet`'s `top`. The dialog then opens with `show()` instead of
   * `showModal()`:
   * fixed below the band at the modal layer, its own scrim, Tab kept
   * inside, `aria-modal`, page scroll locked, Escape and backdrop clicks as
   * before (through the overlay stack). What the band holds (a timer, a
   * search) works with one click, and its popovers show above the dialog.
   */
  readonly uncover = input<string | null>(null);
  /** A band is uncovered (bare dialogs only). */
  protected readonly uncovered = computed(() => this.bare() && !!this.uncover());

  /** The user asked to close (✕, Escape, backdrop). */
  readonly closed = output<void>();
  /** Two-way partner of `open`; emits `false` on a close request. */
  readonly openChange = output<boolean>();
  /** The dialog is shown (after `showModal()`). */
  readonly opened = output<void>();

  protected readonly closeIcon = X;
  protected readonly closeText = computed(() => this.closeLabel() ?? this.labels.closeDialog());

  private dialogEl: HTMLDialogElement | null = null;
  private returnFocus: HTMLElement | null = null;
  private pressedOnBackdrop = false;
  private locked = false;

  // With a band uncovered the dialog is not modal for the browser: the
  // stack handles its Escape and lets clicks in the band through.
  private readonly entry: AthOverlayEntry & { modal: boolean } = {
    modal: true,
    panel: () => this.dialogEl,
    anchor: () => null,
    closeOnEscape: () => this.closeOnEscape(),
    closeOnOutsideClick: () => false,
    dismiss: () => this.requestClose(),
  };

  /** The `<dialog>`; rendered while `open` is true. */
  private readonly dialogRef = viewChild<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    // DOM sync, no state: `showModal()`, the overlay stack and focus follow
    // the `<dialog>` element as `@if (open())` adds and removes it.
    effect(() => {
      const el = this.dialogRef()?.nativeElement ?? null;
      untracked(() => this.attach(el));
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Remember the focus before the dialog renders and takes it.
    if (changes['open'] && this.open() && !this.dialogEl) {
      const active = document.activeElement;
      this.returnFocus = active instanceof HTMLElement && active !== document.body ? active : null;
    }
  }

  ngOnDestroy(): void {
    if (this.dialogEl) this.teardown();
  }

  private attach(el: HTMLDialogElement | null): void {
    if (el === this.dialogEl) return;
    if (this.dialogEl) this.teardown();
    this.dialogEl = el;
    if (el) this.present(el);
  }

  /** Requests closing, as the ✕ button does. */
  close(): void {
    this.requestClose();
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (this.dialogEl) trapTab(event, this.dialogEl);
  }

  /** Escape: the browser's close request. Always prevented; the parent decides. */
  protected onCancel(event: Event): void {
    event.preventDefault();
    if (!this.closeOnEscape() || this.stack.escapeConsumed() || !this.stack.isTop(this.entry)) {
      return;
    }
    this.requestClose();
  }

  /**
   * The browser closed it anyway: a second Escape without user activation
   * skips `cancel`. Controlled, so it is shown again until `open` turns
   * false (the parent may refuse), and it only asks to close when
   * `closeOnEscape` allows it (a secret shown once must stay).
   */
  protected onNativeClose(): void {
    const el = this.dialogEl;
    if (!this.open() || !el || el.open) return;
    this.showNative(el);
    this.stack.raiseTopLayer();
    this.focusInitial(el);
    if (this.closeOnEscape()) this.requestClose();
  }

  protected onPointerDown(event: PointerEvent): void {
    this.pressedOnBackdrop = this.isBackdropEvent(event);
  }

  protected onClick(event: MouseEvent): void {
    const onBackdrop = this.pressedOnBackdrop && this.isBackdropEvent(event);
    this.pressedOnBackdrop = false;
    if (onBackdrop && this.closeOnBackdrop() && this.stack.isTop(this.entry)) this.requestClose();
  }

  private requestClose(): void {
    this.closed.emit();
    this.openChange.emit(false);
  }

  /**
   * A press on the `::backdrop`: it targets the dialog, outside its box. In
   * `bare` mode the dialog is the transparent layer around the content, so
   * any press on the dialog element itself is one.
   */
  private isBackdropEvent(event: MouseEvent): boolean {
    const el = this.dialogEl;
    if (!el || event.target !== el) return false;
    if (this.bare()) return true;
    const r = el.getBoundingClientRect();
    return (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    );
  }

  private present(el: HTMLDialogElement): void {
    this.entry.modal = !this.uncovered();
    this.stack.open(this.entry);
    this.stack.lockScroll();
    this.locked = true;
    this.showNative(el);
    this.stack.raiseTopLayer();
    this.focusInitial(el);
    this.opened.emit();
  }

  private showNative(el: HTMLDialogElement): void {
    try {
      if (el.open) {
        // Already shown.
      } else if (this.uncovered()) {
        el.show();
      } else {
        el.showModal();
      }
    } catch {
      // Not connected (yet): show it non-modally rather than not at all.
      el.setAttribute('open', '');
    }
  }

  private focusInitial(el: HTMLDialogElement): void {
    const auto = el.querySelector<HTMLElement>('[autofocus]');
    if (auto && focusSafely(auto)) return;
    const parts = el.querySelectorAll<HTMLElement>(
      '.ath-dialog__bare, .ath-dialog__body, .ath-dialog__footer'
    );
    for (const part of Array.from(parts)) {
      const first = tabbables(part)[0];
      if (first && focusSafely(first)) return;
    }
    if (!focusSafely(tabbables(el)[0])) focusSafely(el);
  }

  private teardown(): void {
    const el = this.dialogEl;
    this.dialogEl = null;
    this.stack.close(this.entry);
    if (this.locked) this.stack.unlockScroll();
    this.locked = false;
    try {
      if (el?.open) el.close();
    } catch {
      // Already removed.
    }
    const back = this.returnFocus;
    this.returnFocus = null;
    focusSafely(back);
  }
}
