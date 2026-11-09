import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AthPopoverComponent } from '../popover/popover.component';
import { AthPopoverTriggerDirective } from '../popover/popover-trigger.directive';
import { parseColour, tokenColour } from '../../testing/colour';
import { AthDialogComponent } from './dialog.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthDialogComponent, AthPopoverComponent, AthPopoverTriggerDirective],
  template: `
    <button type="button" class="opener" (click)="open.set(true)">Open</button>
    <ath-dialog
      [(open)]="open"
      title="Create item"
      description="Fill in the fields"
      [closeOnBackdrop]="backdrop()"
      [closeOnEscape]="escape()"
      (closed)="closedCount = closedCount + 1"
    >
      <input class="field" aria-label="Name" />
      <button type="button" class="pop-trigger" [athPopoverTrigger]="pop">Pick</button>
      <ath-popover #pop ariaLabel="Picker"
        ><button type="button" class="pop-btn">x</button></ath-popover
      >
      <div slot="footer"><button type="button" class="save">Save</button></div>
    </ath-dialog>
  `,
})
class DialogHostComponent {
  readonly open = signal(false);
  readonly backdrop = signal(true);
  readonly escape = signal(true);
  closedCount = 0;
}

const wait = (): Promise<void> => new Promise((r) => setTimeout(r));

/**
 * What the browser does on a second Escape without user activation: closes
 * the dialog without a `cancel`. Resolves after its `close` event (a task).
 */
function forceClose(el: HTMLDialogElement): Promise<void> {
  const fired = new Promise<void>((r) => el.addEventListener('close', () => r(), { once: true }));
  el.close();
  return fired;
}

describe('AthDialogComponent', () => {
  let fixture: ComponentFixture<DialogHostComponent>;
  let host: DialogHostComponent;
  let root: HTMLElement;
  const q = <T extends HTMLElement = HTMLElement>(sel: string): T | null =>
    root.querySelector<T>(sel);
  const dialog = (): HTMLDialogElement | null => q<HTMLDialogElement>('dialog');

  function openDialog(): HTMLDialogElement {
    const opener = q('.opener')!;
    opener.focus();
    opener.click();
    fixture.detectChanges();
    return dialog()!;
  }

  function cancel(): Event {
    const event = new Event('cancel', { cancelable: true });
    dialog()!.dispatchEvent(event);
    fixture.detectChanges();
    return event;
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHostComponent);
    host = fixture.componentInstance;
    root = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('opens a native modal dialog in the top layer, named and described', () => {
    expect(dialog()).toBeNull();
    const el = openDialog();
    expect(el.open).toBe(true);
    expect(el.matches(':modal')).toBe(true);
    expect(document.getElementById(el.getAttribute('aria-labelledby')!)?.textContent).toBe(
      'Create item'
    );
    expect(document.getElementById(el.getAttribute('aria-describedby')!)?.textContent).toBe(
      'Fill in the fields'
    );
    expect(q('.ath-dialog__footer .save')).not.toBeNull();
  });

  it('focuses the first control of the body and returns focus on close', () => {
    openDialog();
    expect(document.activeElement).toBe(q('.field'));
    host.open.set(false);
    fixture.detectChanges();
    expect(dialog()).toBeNull();
    expect(document.activeElement).toBe(q('.opener'));
  });

  it('requests closing with the close button; [(open)] follows', () => {
    openDialog();
    q('.ath-dialog__close')!.click();
    fixture.detectChanges();
    expect(host.closedCount).toBe(1);
    expect(host.open()).toBe(false);
    expect(dialog()).toBeNull();
  });

  it('closes on Escape (cancel) only when closeOnEscape', () => {
    host.escape.set(false);
    fixture.detectChanges();
    openDialog();
    const ev = cancel();
    expect(ev.defaultPrevented).toBe(true);
    expect(host.closedCount).toBe(0);
    expect(dialog()).not.toBeNull();

    host.escape.set(true);
    fixture.detectChanges();
    cancel();
    expect(host.closedCount).toBe(1);
    expect(dialog()).toBeNull();
  });

  it('stays open after a forced native close when closeOnEscape is false (R-51)', async () => {
    host.escape.set(false);
    fixture.detectChanges();
    const el = openDialog();
    await forceClose(el);
    fixture.detectChanges();
    expect(host.closedCount).toBe(0);
    expect(host.open()).toBe(true);
    expect(dialog()).toBe(el);
    expect(el.open).toBe(true);
    expect(el.matches(':modal')).toBe(true);
    expect(document.documentElement.style.overflow).toBe('hidden');
    expect(el.contains(document.activeElement)).toBe(true);

    host.open.set(false);
    fixture.detectChanges();
    expect(document.documentElement.style.overflow).toBe('');
  });

  it('a forced native close with closeOnEscape requests closing', async () => {
    const el = openDialog();
    await forceClose(el);
    fixture.detectChanges();
    expect(host.closedCount).toBe(1);
    expect(dialog()).toBeNull();
    expect(document.documentElement.style.overflow).toBe('');
  });

  it('closes on a backdrop click only when closeOnBackdrop', () => {
    const el = openDialog();
    const r = el.getBoundingClientRect();
    const outside = { bubbles: true, clientX: r.left - 5, clientY: r.top - 5 };
    const inside = { bubbles: true, clientX: r.left + 5, clientY: r.top + 5 };

    el.dispatchEvent(new PointerEvent('pointerdown', inside));
    el.dispatchEvent(new MouseEvent('click', inside));
    fixture.detectChanges();
    expect(host.closedCount).toBe(0);

    host.backdrop.set(false);
    fixture.detectChanges();
    el.dispatchEvent(new PointerEvent('pointerdown', outside));
    el.dispatchEvent(new MouseEvent('click', outside));
    fixture.detectChanges();
    expect(host.closedCount).toBe(0);

    host.backdrop.set(true);
    fixture.detectChanges();
    el.dispatchEvent(new PointerEvent('pointerdown', outside));
    el.dispatchEvent(new MouseEvent('click', outside));
    fixture.detectChanges();
    expect(host.closedCount).toBe(1);
  });

  it('keeps Tab inside', () => {
    openDialog();
    const save = q('.save')!;
    save.focus();
    const tab = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    save.dispatchEvent(tab);
    expect(tab.defaultPrevented).toBe(true);
    // Wraps to the first control of the dialog (the header's close button).
    expect(document.activeElement).toBe(q('.ath-dialog__close'));
  });

  it('locks page scrolling while open', () => {
    openDialog();
    expect(document.documentElement.style.overflow).toBe('hidden');
    host.open.set(false);
    fixture.detectChanges();
    expect(document.documentElement.style.overflow).toBe('');
  });

  it('raises [data-ath-top-layer] elements (toasts) above the opened dialog', () => {
    const toasts = document.createElement('div');
    toasts.setAttribute('data-ath-top-layer', '');
    document.body.appendChild(toasts);
    try {
      openDialog();
      if ('showPopover' in HTMLElement.prototype) {
        expect(toasts.matches(':popover-open')).toBe(true);
      }
    } finally {
      toasts.remove();
    }
  });

  it('lets Escape close a popover inside it first', async () => {
    openDialog();
    q('.pop-trigger')!.click();
    fixture.detectChanges();
    await wait();
    fixture.detectChanges();
    expect(q('.pop-btn')).not.toBeNull();

    // The browser fires keydown, then the dialog's cancel for the same press.
    q('.pop-btn')!.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })
    );
    fixture.detectChanges();
    cancel();
    expect(q('.pop-btn')).toBeNull();
    expect(host.closedCount).toBe(0);
    expect(dialog()).not.toBeNull();

    await wait();
    cancel();
    expect(host.closedCount).toBe(1);
  });
});

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthDialogComponent],
  template: `
    <ath-dialog [open]="true" title="Unsaved changes" (closed)="closedCount = closedCount + 1">
      <input class="field" aria-label="Name" />
    </ath-dialog>
  `,
})
class RefusingHostComponent {
  closedCount = 0;
}

describe('AthDialogComponent (parent refuses to close)', () => {
  it('shows the dialog again after a forced native close, scroll lock kept', async () => {
    const fixture = TestBed.createComponent(RefusingHostComponent);
    fixture.detectChanges();
    const el = (fixture.nativeElement as HTMLElement).querySelector('dialog')!;
    await forceClose(el);
    fixture.detectChanges();
    expect(fixture.componentInstance.closedCount).toBe(1);
    expect(el.open).toBe(true);
    expect(el.matches(':modal')).toBe(true);
    expect(document.documentElement.style.overflow).toBe('hidden');
    fixture.destroy();
    expect(document.documentElement.style.overflow).toBe('');
  });
});

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthDialogComponent],
  template: `
    <button type="button" class="opener" (click)="open.set(true)">Open</button>
    <ath-dialog
      bare
      [(open)]="open"
      title="Ignored"
      ariaLabel="Command palette"
      (closed)="closedCount = closedCount + 1"
    >
      <div class="surface" style="width:300px;height:120px;margin:80px auto 0">
        <input class="query" aria-label="Search" />
      </div>
    </ath-dialog>
  `,
})
class BareDialogHostComponent {
  readonly open = signal(false);
  closedCount = 0;
}

describe('AthDialogComponent (bare)', () => {
  let fixture: ComponentFixture<BareDialogHostComponent>;
  let root: HTMLElement;
  const q = <T extends HTMLElement = HTMLElement>(sel: string): T | null =>
    root.querySelector<T>(sel);

  beforeEach(() => {
    fixture = TestBed.createComponent(BareDialogHostComponent);
    root = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    q('.opener')!.focus();
    fixture.componentInstance.open.set(true);
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('shows only the content, named by ariaLabel, as a modal over the viewport', () => {
    const el = q<HTMLDialogElement>('dialog')!;
    expect(el.matches(':modal')).toBe(true);
    expect(el.classList).toContain('ath-dialog--bare');
    expect(el.getAttribute('aria-label')).toBe('Command palette');
    expect(el.hasAttribute('aria-labelledby')).toBe(false);
    expect(q('.ath-dialog__header')).toBeNull();
    expect(q('.ath-dialog__close')).toBeNull();
    expect(q('.ath-dialog__footer')).toBeNull();
    const r = el.getBoundingClientRect();
    expect(Math.round(r.width)).toBe(document.documentElement.clientWidth);
    expect(document.activeElement).toBe(q('.query'));
  });

  it('treats a press on the layer around the content as a backdrop press', () => {
    const el = q<HTMLDialogElement>('dialog')!;
    const surface = q('.surface')!;
    surface.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    surface.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.closedCount).toBe(0);

    el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: 5, clientY: 5 }));
    el.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: 5, clientY: 5 }));
    fixture.detectChanges();
    expect(fixture.componentInstance.closedCount).toBe(1);
    expect(q('dialog')).toBeNull();
    expect(document.activeElement).toBe(q('.opener'));
  });

  it('closes on Escape like any dialog', () => {
    q('dialog')!.dispatchEvent(new Event('cancel', { cancelable: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.closedCount).toBe(1);
  });
});

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthDialogComponent, AthPopoverComponent, AthPopoverTriggerDirective],
  template: `
    <header class="band">
      <button
        type="button"
        class="band-btn"
        [athPopoverTrigger]="menu"
        (click)="clicks = clicks + 1"
      >
        Timer
      </button>
      <ath-popover #menu ariaLabel="Menu"
        ><button type="button" class="menu-btn">x</button></ath-popover
      >
    </header>
    <ath-dialog
      bare
      uncover="48px"
      [(open)]="open"
      ariaLabel="Ticket"
      (closed)="closedCount = closedCount + 1"
    >
      <div class="card"><button type="button" class="inside">Inside</button></div>
    </ath-dialog>
  `,
})
class UncoverHostComponent {
  readonly open = signal(true);
  clicks = 0;
  closedCount = 0;
}

/** W5-C: a bare dialog can leave a band (a top bar) uncovered and usable. */
describe('AthDialogComponent uncover', () => {
  let fixture: ComponentFixture<UncoverHostComponent>;
  let root: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(UncoverHostComponent);
    root = fixture.nativeElement as HTMLElement;
    document.body.appendChild(root);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    root.remove();
  });

  it('opens without showModal, below the band, named as a modal', () => {
    const el = root.querySelector('dialog') as HTMLDialogElement;
    expect(el.open).toBe(true);
    expect(el.matches(':modal')).toBe(false);
    expect(el.getAttribute('aria-modal')).toBe('true');
    expect(getComputedStyle(el).top).toBe('48px');
  });

  it('leaves the band clickable: its popover opens above the dialog, and Escape closes the popover first', async () => {
    const band = root.querySelector('.band-btn') as HTMLButtonElement;
    expect(band.closest('[inert]')).toBeNull();
    band.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.componentInstance.clicks).toBe(1);
    expect(fixture.componentInstance.open()).toBe(true);
    const menu = document.querySelector<HTMLElement>('.menu-btn');
    expect(menu?.checkVisibility()).toBe(true);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    await new Promise((r) => setTimeout(r));
    expect(menu?.checkVisibility()).toBe(false);
    expect(fixture.componentInstance.closedCount).toBe(0);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.closedCount).toBe(1);
  });

  it('a press on the scrim still closes it', () => {
    const el = root.querySelector('dialog') as HTMLDialogElement;
    el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.closedCount).toBe(1);
  });
});

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthDialogComponent],
  template: `
    <ath-dialog
      [open]="true"
      role="alertdialog"
      size="sm"
      title="WEB-42 loeschen?"
      description="Das Ticket wandert in den Papierkorb, wo Owner und Admins es 30 Tage lang wiederherstellen koennen."
    >
      @if (body()) {
        <p class="text">Mit Inhalt</p>
      }
      <div slot="footer">
        <button type="button" class="cancel">Abbrechen</button>
        <button type="button" class="confirm">Loeschen</button>
      </div>
    </ath-dialog>
  `,
})
class ConfirmDialogHostComponent {
  readonly body = signal(false);
}

/** UX tour A-01 (cons-13-dialog-cancel-three-variants, tickets-confirm-dialog-gap). */
describe('AthDialogComponent footer contract', () => {
  let fixture: ComponentFixture<ConfirmDialogHostComponent>;
  let root: HTMLElement;
  const q = (sel: string): HTMLElement => root.querySelector<HTMLElement>(sel)!;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogHostComponent);
    root = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    // Measured without the opening scale.
    q('dialog').style.animation = 'none';
  });

  afterEach(() => fixture.destroy());

  it('draws no body without projected content: the footer sits 24px under the description', () => {
    const body = q('.ath-dialog__body');
    expect(body.childElementCount).toBe(0);
    expect(getComputedStyle(body).display).toBe('none');
    expect(getComputedStyle(q('.ath-dialog__header')).paddingBottom).toBe('24px');
    const gap =
      q('.ath-dialog__footer').getBoundingClientRect().top -
      q('.ath-dialog__description').getBoundingClientRect().bottom;
    expect(Math.round(gap)).toBe(24);
  });

  it('keeps the body (and the header without bottom padding) when content is projected', () => {
    fixture.componentInstance.body.set(true);
    fixture.detectChanges();
    expect(getComputedStyle(q('.ath-dialog__body')).display).toBe('block');
    expect(getComputedStyle(q('.ath-dialog__header')).paddingBottom).toBe('0px');
  });

  it('lays out the footer: right-aligned, 8px apart, white under a hairline', () => {
    const footer = q('.ath-dialog__footer');
    const style = getComputedStyle(footer);
    expect(style.justifyContent).toBe('flex-end');
    expect(style.columnGap).toBe('8px');
    expect(style.borderTopWidth).toBe('1px');
    expect(parseColour(style.backgroundColor)).toEqual(tokenColour('surface'));
    // The projected wrapper follows the same contract (no page class needed).
    const wrapper = getComputedStyle(q('[slot=footer]'));
    expect(wrapper.display).toBe('flex');
    expect(wrapper.columnGap).toBe('8px');
    const cancel = q('.cancel').getBoundingClientRect();
    const confirm = q('.confirm').getBoundingClientRect();
    expect(Math.round(confirm.left - cancel.right)).toBe(8);
    const right = footer.getBoundingClientRect().right - parseFloat(style.paddingRight);
    expect(Math.round(confirm.right)).toBe(Math.round(right));
  });
});
