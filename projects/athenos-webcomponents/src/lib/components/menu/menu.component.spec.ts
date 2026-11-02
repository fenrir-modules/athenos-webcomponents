import { ApplicationRef, ChangeDetectionStrategy, Component, Directive } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { Pencil } from 'lucide';
import { AthButtonComponent } from '../button/button.component';
import { AthPopoverContentDirective } from '../popover/popover.component';
import { AthMenuComponent } from './menu.component';
import { AthMenuItemComponent, AthMenuSeparatorComponent } from './menu-item.component';
import { AthMenuTriggerDirective } from './menu-trigger.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AthMenuComponent,
    AthMenuItemComponent,
    AthMenuSeparatorComponent,
    AthMenuTriggerDirective,
    AthButtonComponent,
  ],
  template: `
    <button type="button" class="trigger" [athMenuTrigger]="menu">Actions</button>
    <ath-menu #menu (closed)="reason = $event">
      <button athMenuItem [icon]="pencil" shortcut="E" (triggered)="log.push('edit')">Edit</button>
      <button athMenuItem (triggered)="log.push('copy')">Copy</button>
      <ath-menu-separator />
      <button
        athMenuItem
        variant="danger"
        disabled
        disabledReason="Only admins can delete"
        (triggered)="log.push('delete')"
      >
        Delete
      </button>
      <button athMenuItem (triggered)="log.push('archive')">Archive</button>
    </ath-menu>

    <ath-button variant="ghost" [athMenuTrigger]="menu2" ariaLabel="More">⋯</ath-button>
    <ath-menu #menu2>
      <button athMenuItem>One</button>
    </ath-menu>
    <button type="button" class="outside">Outside</button>
  `,
})
class MenuHostComponent {
  readonly pencil = Pencil;
  readonly log: string[] = [];
  reason: string | null = null;
}

const wait = (ms = 0): Promise<void> => new Promise((r) => setTimeout(r, ms));

describe('AthMenuComponent', () => {
  let fixture: ComponentFixture<MenuHostComponent>;
  let root: HTMLElement;
  const q = <T extends HTMLElement = HTMLElement>(sel: string): T | null =>
    root.querySelector<T>(sel);
  const items = (): HTMLElement[] =>
    Array.from(root.querySelectorAll<HTMLElement>('[role=menuitem]'));
  const active = (): string =>
    (document.activeElement?.querySelector('.ath-menu-item__label')?.textContent ?? '').trim();

  async function settle(): Promise<void> {
    fixture.detectChanges();
    await wait();
    fixture.detectChanges();
  }

  function press(
    key: string,
    target: Element = document.activeElement ?? document.body
  ): KeyboardEvent {
    const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
    target.dispatchEvent(event);
    fixture.detectChanges();
    return event;
  }

  async function openWith(key: 'click' | 'ArrowDown' | 'ArrowUp'): Promise<void> {
    const trigger = q('.trigger')!;
    trigger.focus();
    if (key === 'click') trigger.click();
    else press(key, trigger);
    await settle();
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuHostComponent);
    root = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('wires the menu button pattern', async () => {
    const trigger = q('.trigger')!;
    expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    await openWith('click');
    const menu = q('[role=menu]')!;
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(trigger.getAttribute('aria-controls')).toBe(menu.id);
    expect(menu.getAttribute('aria-labelledby')).toBe(trigger.id);
    expect(items().length).toBe(4);
    expect(q('[role=separator]')).not.toBeNull();
    expect(items().every((i) => i.tabIndex === -1)).toBe(true);
  });

  it('opens on the first item with click and ArrowDown, on the last with ArrowUp', async () => {
    await openWith('click');
    expect(active()).toBe('Edit');
    press('Escape');
    await openWith('ArrowDown');
    expect(active()).toBe('Edit');
    press('Escape');
    await openWith('ArrowUp');
    expect(active()).toBe('Archive');
  });

  it('moves with arrows (wrapping), Home and End', async () => {
    await openWith('ArrowDown');
    press('ArrowDown');
    expect(active()).toBe('Copy');
    press('ArrowDown');
    expect(active()).toBe('Delete');
    press('ArrowDown');
    expect(active()).toBe('Archive');
    press('ArrowDown');
    expect(active()).toBe('Edit');
    press('ArrowUp');
    expect(active()).toBe('Archive');
    press('Home');
    expect(active()).toBe('Edit');
    press('End');
    expect(active()).toBe('Archive');
  });

  it('jumps by typeahead', async () => {
    await openWith('ArrowDown');
    press('a');
    expect(active()).toBe('Archive');
    await wait(600); // a new word
    press('c');
    expect(active()).toBe('Copy');
    press('o'); // "co": still Copy
    expect(active()).toBe('Copy');
  });

  it('activates an item, closes and returns focus to the trigger', async () => {
    await openWith('ArrowDown');
    press('ArrowDown');
    (document.activeElement as HTMLElement).click(); // Enter / Space on a <button>
    fixture.detectChanges();
    expect(fixture.componentInstance.log).toEqual(['copy']);
    expect(q('[role=menu]')).toBeNull();
    expect(fixture.componentInstance.reason).toBe('select');
    expect(document.activeElement).toBe(q('.trigger'));
  });

  it('keeps disabled items focusable but inert, with their reason', async () => {
    await openWith('ArrowDown');
    const del = items()[2];
    expect(del.getAttribute('aria-disabled')).toBe('true');
    expect(del.getAttribute('title')).toBe('Only admins can delete');
    const reason = document.getElementById(del.getAttribute('aria-describedby')!);
    expect(reason?.textContent).toContain('Only admins can delete');
    expect(del.classList).toContain('ath-menu-item--danger');
    del.focus();
    del.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.log).toEqual([]);
    expect(q('[role=menu]')).not.toBeNull();
  });

  it('renders icon and shortcut hint', async () => {
    await openWith('ArrowDown');
    const edit = items()[0];
    expect(edit.querySelector('ath-icon')).not.toBeNull();
    const kbd = edit.querySelector('kbd')!;
    expect(kbd.textContent).toBe('E');
    expect(kbd.getAttribute('aria-hidden')).toBe('true');
  });

  it('closes on Escape and on Tab, focus back on the trigger', async () => {
    await openWith('ArrowDown');
    press('Escape');
    expect(q('[role=menu]')).toBeNull();
    expect(document.activeElement).toBe(q('.trigger'));

    await openWith('ArrowDown');
    press('Tab');
    expect(q('[role=menu]')).toBeNull();
    expect(fixture.componentInstance.reason).toBe('tab');
    expect(document.activeElement).toBe(q('.trigger'));
  });

  it('closes on an outside click', async () => {
    await openWith('click');
    q('.outside')!.dispatchEvent(
      new PointerEvent('pointerdown', { bubbles: true, composed: true })
    );
    fixture.detectChanges();
    expect(q('[role=menu]')).toBeNull();
  });

  it('puts the ARIA state on the inner button of an <ath-button> trigger', async () => {
    const host = q('ath-button')!;
    const inner = host.querySelector('button')!;
    await settle();
    expect(host.getAttribute('aria-haspopup')).toBeNull();
    expect(inner.getAttribute('aria-haspopup')).toBe('menu');
    inner.click();
    await settle();
    expect(inner.getAttribute('aria-expanded')).toBe('true');
  });
});

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthMenuComponent, AthMenuItemComponent, AthMenuTriggerDirective],
  template: `
    <button type="button" class="trigger" [athMenuTrigger]="menu">Actions</button>
    <ath-menu #menu>
      <button athMenuItem>Edit</button>
      <button athMenuItem>Copy</button>
    </ath-menu>
  `,
})
class HandCheckedMenuHostComponent {}

// See the popover spec of the same name: the first item takes focus when the
// panel renders, also in a view an app render does not include.
describe('AthMenuComponent in a view checked by hand', () => {
  it('focuses the first item when its panel renders, not on an app render without it', async () => {
    TestBed.configureTestingModule({
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: false }],
    });
    const fixture = TestBed.createComponent(HandCheckedMenuHostComponent);
    const root = fixture.nativeElement as HTMLElement;
    document.body.appendChild(root);
    const render = () => fixture.componentRef.changeDetectorRef.detectChanges();
    render();
    const trigger = root.querySelector<HTMLElement>('.trigger')!;
    trigger.focus();
    trigger.click();
    TestBed.inject(ApplicationRef).tick();
    expect(root.querySelector('[role=menuitem]')).toBeNull();
    render();
    await fixture.whenStable();
    expect(document.activeElement).toBe(root.querySelector<HTMLElement>('[role=menuitem]'));
    fixture.destroy();
    root.remove();
  });
});

let builtItems = 0;

/** Counts how often the lazy content was built. */
@Directive({ selector: '[athCountBuilt]' })
class CountBuiltDirective {
  constructor() {
    builtItems++;
  }
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AthMenuComponent,
    AthMenuItemComponent,
    AthMenuTriggerDirective,
    AthPopoverContentDirective,
    CountBuiltDirective,
  ],
  template: `
    <button type="button" class="trigger" [athMenuTrigger]="menu">Row actions</button>
    <ath-menu #menu>
      <ng-template athPopoverContent>
        <button athMenuItem athCountBuilt (triggered)="log.push('edit')">Edit</button>
        <button athMenuItem athCountBuilt (triggered)="log.push('copy')">Copy</button>
      </ng-template>
    </ath-menu>
  `,
})
class LazyMenuHostComponent {
  readonly log: string[] = [];
}

/** R-58: a row menu builds its items only while open. */
describe('AthMenuComponent with lazy content', () => {
  let fixture: ComponentFixture<LazyMenuHostComponent>;
  let root: HTMLElement;
  const active = (): string =>
    (document.activeElement?.querySelector('.ath-menu-item__label')?.textContent ?? '').trim();
  const press = (key: string): void => {
    document.activeElement!.dispatchEvent(
      new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true })
    );
    fixture.detectChanges();
  };

  beforeEach(() => {
    builtItems = 0;
    fixture = TestBed.createComponent(LazyMenuHostComponent);
    root = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('builds no items while closed; keyboard, activation and focus return still work', async () => {
    expect(builtItems).toBe(0);
    const trigger = root.querySelector<HTMLElement>('.trigger')!;
    trigger.focus();
    trigger.click();
    fixture.detectChanges();
    await wait();
    fixture.detectChanges();
    expect(builtItems).toBe(2);
    expect(active()).toBe('Edit');
    press('ArrowDown');
    expect(active()).toBe('Copy');
    (document.activeElement as HTMLElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.log).toEqual(['copy']);
    expect(root.querySelector('[role=menuitem]')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
});
