import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AthButtonComponent } from '../button/button.component';
import { AthMenuComponent } from '../menu/menu.component';
import { AthDropdownComponent, DROPDOWN_SEPARATOR, DropdownItem } from './dropdown.component';

const ITEMS: DropdownItem[] = [
  { id: 'profile', label: 'Profile' },
  DROPDOWN_SEPARATOR,
  { id: 'locked', label: 'Locked', disabled: true, title: 'Not allowed' },
  { id: 'logout', label: 'Logout', variant: 'danger' },
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthDropdownComponent, AthButtonComponent],
  template: `
    <ath-dropdown
      class="with-button"
      [items]="items"
      align="right"
      (itemClicked)="clicked.push($event)"
      (openChange)="openLog.push($event)"
    >
      <ath-button variant="ghost">Actions</ath-button>
    </ath-dropdown>
    @if (plain()) {
      <ath-dropdown class="plain" [items]="items">More</ath-dropdown>
    }
  `,
})
class DropdownHostComponent {
  readonly items = ITEMS;
  readonly plain = signal(true);
  readonly clicked: string[] = [];
  readonly openLog: boolean[] = [];
}

const wait = (): Promise<void> => new Promise((r) => setTimeout(r));

describe('AthDropdownComponent', () => {
  let fixture: ComponentFixture<DropdownHostComponent>;
  let root: HTMLElement;
  const q = <T extends HTMLElement = HTMLElement>(sel: string): T | null =>
    root.querySelector<T>(sel);
  const menu = (): HTMLElement | null => q('.ath-dropdown__menu');
  const label = (el: Element | null): string =>
    (el?.querySelector('.ath-menu-item__label')?.textContent ?? '').trim();

  async function settle(): Promise<void> {
    fixture.detectChanges();
    await wait();
    fixture.detectChanges();
  }

  beforeEach(async () => {
    fixture = TestBed.createComponent(DropdownHostComponent);
    root = fixture.nativeElement as HTMLElement;
    await settle();
  });

  afterEach(() => fixture.destroy());

  it('builds its items only while open (R-58)', async () => {
    const menuOf = fixture.debugElement
      .query(By.css('.with-button'))
      .query(By.directive(AthMenuComponent)).componentInstance as unknown as {
      items(): readonly unknown[];
    };
    expect(menuOf.items().length).toBe(0);
    const button = q('.with-button button')!;
    button.click();
    await settle();
    expect(menuOf.items().length).toBe(3);
    button.click();
    await settle();
    expect(menuOf.items().length).toBe(0);
  });

  it('makes the projected button the menu button (one tab stop, no role=button wrapper)', () => {
    const wrapper = q('.with-button .ath-dropdown__trigger')!;
    const button = wrapper.querySelector('button')!;
    expect(wrapper.getAttribute('role')).toBeNull();
    expect(wrapper.hasAttribute('tabindex')).toBe(false);
    expect(button.getAttribute('aria-haspopup')).toBe('menu');
    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  it('opens and closes when toggled, focusing the first item', async () => {
    const button = q('.with-button button')!;
    button.focus();
    button.click();
    await settle();
    expect(menu()).not.toBeNull();
    expect(menu()!.getAttribute('role')).toBe('menu');
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(label(document.activeElement)).toBe('Profile');
    expect(fixture.componentInstance.openLog).toEqual([true]);

    button.click();
    await settle();
    expect(menu()).toBeNull();
    expect(fixture.componentInstance.openLog).toEqual([true, false]);
  });

  it('emits the clicked item id and closes', async () => {
    q('.with-button button')!.click();
    await settle();
    const items = Array.from(root.querySelectorAll<HTMLElement>('[role=menuitem]'));
    expect(items.map((i) => label(i))).toEqual(['Profile', 'Locked', 'Logout']);
    expect(root.querySelector('[role=separator]')).not.toBeNull();
    expect(items[1].getAttribute('aria-disabled')).toBe('true');
    expect(items[1].getAttribute('title')).toBe('Not allowed');
    items[1].click();
    expect(fixture.componentInstance.clicked).toEqual([]);
    items[2].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.clicked).toEqual(['logout']);
    expect(menu()).toBeNull();
  });

  it('opens with ArrowDown and moves with the arrow keys', async () => {
    const button = q('.with-button button')!;
    button.focus();
    button.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true })
    );
    await settle();
    expect(label(document.activeElement)).toBe('Profile');
    document.activeElement!.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true })
    );
    expect(label(document.activeElement)).toBe('Locked');
    document.activeElement!.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })
    );
    fixture.detectChanges();
    expect(menu()).toBeNull();
    expect(document.activeElement).toBe(button);
  });

  it('gives a plain-text trigger a role=button wrapper that opens on Enter', async () => {
    const wrapper = q('.plain .ath-dropdown__trigger')!;
    expect(wrapper.getAttribute('role')).toBe('button');
    expect(wrapper.tabIndex).toBe(0);
    expect(wrapper.getAttribute('aria-haspopup')).toBe('menu');
    wrapper.focus();
    wrapper.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true })
    );
    await settle();
    expect(q('.plain .ath-dropdown__menu')).not.toBeNull();
  });
});
