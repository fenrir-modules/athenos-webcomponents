import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  Directive,
  signal,
  viewChild,
} from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { page } from 'vitest/browser';
import { AthListboxComponent, type ListboxOption } from './listbox.component';
import { AthOptionPickerComponent } from './option-picker.component';

const FRUIT: ListboxOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana', disabled: true },
  { value: 'cherry', label: 'Cherry', sublabel: 'red' },
  { value: 'date', label: 'Date', keywords: 'dattel' },
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthListboxComponent],
  template: `
    <ath-listbox
      [options]="options()"
      [multiple]="multiple()"
      [searchable]="searchable()"
      [creatable]="creatable()"
      [(value)]="value"
      [(values)]="values"
      ariaLabel="Fruit"
      (picked)="picked.push($event.value)"
      (create)="created = $event"
    />
  `,
})
class ListboxHostComponent {
  readonly options = signal<ListboxOption[]>(FRUIT);
  readonly multiple = signal(false);
  readonly searchable = signal(false);
  readonly creatable = signal(false);
  readonly value = signal<string | null>(null);
  readonly values = signal<readonly string[]>([]);
  readonly picked: string[] = [];
  created: string | null = null;
}

describe('AthListboxComponent', () => {
  let fixture: ComponentFixture<ListboxHostComponent>;
  let host: ListboxHostComponent;
  let root: HTMLElement;
  const q = <T extends HTMLElement = HTMLElement>(sel: string): T | null =>
    root.querySelector<T>(sel);
  const options = (): HTMLElement[] =>
    Array.from(root.querySelectorAll<HTMLElement>('[role=option]'));
  const activeLabel = (): string => {
    const owner = q('[role=combobox]') ?? q('[role=listbox]')!;
    const id = owner.getAttribute('aria-activedescendant');
    return id ? (document.getElementById(id)?.textContent ?? '').trim() : '';
  };

  function press(key: string, target: Element): KeyboardEvent {
    const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
    target.dispatchEvent(event);
    fixture.detectChanges();
    return event;
  }

  function type(text: string): void {
    const input = q<HTMLInputElement>('input')!;
    input.value = text;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(ListboxHostComponent);
    host = fixture.componentInstance;
    root = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('renders the listbox pattern', () => {
    const list = q('[role=listbox]')!;
    expect(list.getAttribute('aria-label')).toBe('Fruit');
    expect(list.tabIndex).toBe(0);
    expect(list.getAttribute('aria-multiselectable')).toBeNull();
    expect(options().length).toBe(4);
    expect(options()[1].getAttribute('aria-disabled')).toBe('true');
    expect(options().every((o) => o.getAttribute('aria-selected') === 'false')).toBe(true);
  });

  it('selects one option by click (single)', () => {
    options()[2].click();
    fixture.detectChanges();
    expect(host.value()).toBe('cherry');
    expect(options()[2].getAttribute('aria-selected')).toBe('true');
    expect(host.picked).toEqual(['cherry']);
  });

  it('ignores disabled options', () => {
    options()[1].click();
    fixture.detectChanges();
    expect(host.value()).toBeNull();
  });

  it('moves with arrows past disabled options, Home/End, and chooses with Enter', () => {
    const list = q('[role=listbox]')!;
    list.focus();
    press('ArrowDown', list);
    expect(activeLabel()).toBe('Apple');
    expect(list.getAttribute('aria-activedescendant')).toBe(options()[0].id);
    press('ArrowDown', list);
    expect(activeLabel()).toContain('Cherry');
    press('End', list);
    expect(activeLabel()).toBe('Date');
    press('Home', list);
    expect(activeLabel()).toBe('Apple');
    press('Enter', list);
    expect(host.value()).toBe('apple');
  });

  it('shows a pointer highlight as a background and a keyboard one as a ring (2026-10-27)', () => {
    host.searchable.set(true);
    host.value.set('cherry');
    fixture.detectChanges();
    const listbox = fixture.debugElement.query((d) => d.name === 'ath-listbox')
      .componentInstance as AthListboxComponent;
    const list = q('[role=listbox]')!;
    const input = q<HTMLInputElement>('input')!;
    input.focus();
    listbox.resetActive();
    fixture.detectChanges();
    // Opened on the selected row: its check mark only, no fill, no weight.
    expect(list.dataset['highlight']).toBe('none');
    const selected = options()[2];
    expect(getComputedStyle(selected).backgroundColor).toBe('rgba(0, 0, 0, 0)');
    expect(getComputedStyle(selected).boxShadow).toBe('none');
    expect(getComputedStyle(selected).fontWeight).toBe(getComputedStyle(options()[0]).fontWeight);
    // Hover: a background only.
    options()[3].dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
    fixture.detectChanges();
    expect(list.dataset['highlight']).toBe('soft');
    expect(getComputedStyle(options()[3]).backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(getComputedStyle(options()[3]).boxShadow).toBe('none');
    // Arrow keys: the ring, on the row the keys moved to.
    press('ArrowUp', input);
    expect(list.dataset['highlight']).toBe('ring');
    expect(getComputedStyle(selected).boxShadow).toContain('inset');
    // Typing: the best match, a background again.
    type('a');
    expect(list.dataset['highlight']).toBe('soft');
    // The search field draws no ring of its own inside the popover.
    const search = q('.ath-listbox__search')!;
    expect(getComputedStyle(search).boxShadow).toBe('none');
  });

  it('jumps by typeahead without a search field', () => {
    const list = q('[role=listbox]')!;
    press('d', list);
    expect(activeLabel()).toBe('Date');
    press(' ', list);
    expect(host.value()).toBe('date');
  });

  it('toggles several options with checkmarks (multi)', () => {
    host.multiple.set(true);
    fixture.detectChanges();
    const list = q('[role=listbox]')!;
    expect(list.getAttribute('aria-multiselectable')).toBe('true');
    options()[0].click();
    fixture.detectChanges();
    press('End', list);
    press(' ', list);
    expect(host.values()).toEqual(['apple', 'date']);
    expect(root.querySelectorAll('.ath-listbox__check--on').length).toBe(2);
    expect(options()[0].getAttribute('aria-selected')).toBe('true');

    options()[0].click();
    fixture.detectChanges();
    expect(host.values()).toEqual(['date']);
  });

  it('filters by the search field and keeps focus there (aria-activedescendant)', () => {
    host.searchable.set(true);
    fixture.detectChanges();
    const input = q<HTMLInputElement>('input')!;
    expect(input.getAttribute('role')).toBe('combobox');
    expect(input.getAttribute('aria-controls')).toBe(q('[role=listbox]')!.id);
    expect(q('[role=listbox]')!.tabIndex).toBe(-1);

    type('dat'); // matches "Date" by keyword and label
    expect(options().length).toBe(1);
    expect(activeLabel()).toBe('Date');
    press('Enter', input);
    expect(host.value()).toBe('date');

    type('RED'); // sublabel, case-insensitive
    expect(options().map((o) => o.textContent?.trim())).toEqual(['Cherryred']);

    type('zzz');
    expect(options().length).toBe(0);
    expect(q('[role=status]')?.textContent).toContain('No matches');
  });

  it('keeps Space in the search field', () => {
    host.searchable.set(true);
    fixture.detectChanges();
    const event = press(' ', q('input')!);
    expect(event.defaultPrevented).toBe(false);
  });

  it('offers a create row for a new query', () => {
    host.searchable.set(true);
    host.creatable.set(true);
    fixture.detectChanges();
    type('Apple');
    expect(root.querySelector('.ath-listbox__option--create')).toBeNull();
    type('Kiwi');
    const create = root.querySelector<HTMLElement>('.ath-listbox__option--create')!;
    expect(create.textContent).toContain('Create “Kiwi”');
    press('Enter', q('input')!);
    expect(host.created).toBe('Kiwi');
  });

  it('groups options under labelled role=group', () => {
    host.options.set([
      { value: 'a', label: 'Alice', group: 'Team' },
      { value: 'b', label: 'Bob' },
      { value: 'c', label: 'Carol', group: 'Team' },
    ]);
    fixture.detectChanges();
    const groups = Array.from(root.querySelectorAll<HTMLElement>('[role=group]'));
    expect(groups.length).toBe(2);
    const label = document.getElementById(groups[0].getAttribute('aria-labelledby')!);
    expect(label?.textContent).toBe('Team');
    expect(options().map((o) => o.textContent?.trim())).toEqual(['Alice', 'Carol', 'Bob']);
    expect(document.getElementById(groups[1].getAttribute('aria-labelledby')!)?.textContent).toBe(
      'Other'
    );
  });

  /** UX tour A-03 (mobile-menu-rows-32px): rows a thumb can hit on a phone. */
  it('keeps a 32px row minimum on the desktop and 44px rows at a phone width', async () => {
    const heights = () => options().map((o) => Math.round(o.getBoundingClientRect().height));
    expect(options().length).toBe(4);
    expect(getComputedStyle(options()[0]).minHeight).toBe('32px');
    try {
      await page.viewport(390, 844);
      expect(options().length).toBe(4);
      expect(getComputedStyle(options()[0]).minHeight).toBe('44px');
      expect(heights().every((h) => h >= 44)).toBe(true);
    } finally {
      await page.viewport(800, 600);
    }
  });

  it('handles a few hundred options', () => {
    host.options.set(
      Array.from({ length: 300 }, (_, i) => ({ value: `v${i}`, label: `Option ${i}` }))
    );
    fixture.detectChanges();
    expect(options().length).toBe(300);
    const list = q('[role=listbox]')!;
    press('End', list);
    expect(activeLabel()).toBe('Option 299');
    press('PageUp', list);
    expect(activeLabel()).toBe('Option 289');
  });

  it('keeps the wheel only while the list scrolls (W5-R)', async () => {
    const list = q('[role=listbox]')!;
    // Four options fit: no containment, the wheel goes on to the page.
    await vi.waitFor(() => expect(list.scrollHeight).toBeLessThanOrEqual(list.clientHeight));
    expect(list.style.overscrollBehaviorY).toBe('');

    host.options.set(
      Array.from({ length: 60 }, (_, i) => ({ value: `v${i}`, label: `Option ${i}` }))
    );
    fixture.detectChanges();
    await vi.waitFor(() => expect(list.style.overscrollBehaviorY).toBe('contain'));

    host.options.set(FRUIT);
    fixture.detectChanges();
    await vi.waitFor(() => expect(list.style.overscrollBehaviorY).toBe(''));
  });
});

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthListboxComponent],
  template: `
    <textarea
      class="box"
      aria-label="Comment"
      [attr.aria-activedescendant]="list.activeId()"
      (keydown)="list.handleKeydown($event)"
    ></textarea>
    <ath-listbox
      #list
      [options]="people"
      autoActivate
      ariaLabel="People"
      (picked)="picked.push($event.value)"
    />
  `,
})
class OutsideFieldHostComponent {
  readonly people: ListboxOption[] = [
    { value: 'ana', label: 'Ana' },
    { value: 'ben', label: 'Ben', disabled: true },
    { value: 'cy', label: 'Cy' },
  ];
  readonly picked: string[] = [];
  readonly list = viewChild.required<AthListboxComponent>('list');
}

describe('AthListboxComponent driven from an outside field', () => {
  it('takes arrows and Enter from the field, which keeps focus', () => {
    const fixture = TestBed.createComponent(OutsideFieldHostComponent);
    const root = fixture.nativeElement as HTMLElement;
    document.body.appendChild(root);
    fixture.detectChanges();
    const box = root.querySelector<HTMLTextAreaElement>('.box')!;
    box.focus();
    const label = (): string =>
      document
        .getElementById(box.getAttribute('aria-activedescendant') ?? '')
        ?.textContent?.trim() ?? '';
    // autoActivate: the first option is ready for Enter.
    expect(label()).toBe('Ana');

    const down = new KeyboardEvent('keydown', {
      key: 'ArrowDown',
      bubbles: true,
      cancelable: true,
    });
    box.dispatchEvent(down);
    fixture.detectChanges();
    expect(down.defaultPrevented).toBe(true);
    expect(label()).toBe('Cy');

    const letter = new KeyboardEvent('keydown', { key: 'x', bubbles: true, cancelable: true });
    fixture.componentInstance.list().handleKeydown(letter);
    expect(letter.defaultPrevented).toBe(false);

    const enter = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
    box.dispatchEvent(enter);
    fixture.detectChanges();
    expect(enter.defaultPrevented).toBe(true);
    expect(fixture.componentInstance.picked).toEqual(['cy']);
    expect(document.activeElement).toBe(box);
    fixture.destroy();
    root.remove();
  });
});

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthOptionPickerComponent],
  template: `
    <ath-option-picker
      [options]="options"
      [multiple]="multiple()"
      [clearable]="true"
      [(value)]="value"
      [(values)]="values"
      ariaLabel="Fruit"
      placeholder="Pick fruit"
    />
    <button type="button" class="outside">Outside</button>
  `,
})
class PickerHostComponent {
  readonly options = FRUIT;
  readonly multiple = signal(false);
  readonly value = signal<string | null>(null);
  readonly values = signal<readonly string[]>([]);
}

describe('AthOptionPickerComponent', () => {
  let fixture: ComponentFixture<PickerHostComponent>;
  let root: HTMLElement;
  const q = <T extends HTMLElement = HTMLElement>(sel: string): T | null =>
    root.querySelector<T>(sel);
  const wait = (): Promise<void> => new Promise((r) => setTimeout(r));

  async function open(): Promise<void> {
    q('.ath-picker__trigger')!.click();
    fixture.detectChanges();
    await wait();
    fixture.detectChanges();
  }

  function press(key: string, target: Element): void {
    target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
    fixture.detectChanges();
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(PickerHostComponent);
    root = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('opens a searchable popup from its trigger and picks with the keyboard', async () => {
    const trigger = q('.ath-picker__trigger')!;
    expect(trigger.textContent).toContain('Pick fruit');
    expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
    await open();
    const input = q<HTMLInputElement>('input')!;
    expect(document.activeElement).toBe(input);
    press('ArrowDown', input);
    press('Enter', input);
    expect(fixture.componentInstance.value()).toBe('cherry');
    expect(q('[role=listbox]')).toBeNull();
    expect(document.activeElement).toBe(trigger);
    expect(trigger.textContent).toContain('Cherry');
  });

  it('stays open in multi-select and summarises the selection', async () => {
    fixture.componentInstance.multiple.set(true);
    fixture.detectChanges();
    await open();
    const opts = (): HTMLElement[] =>
      Array.from(root.querySelectorAll<HTMLElement>('[role=option]'));
    opts()[0].click();
    opts()[2].click();
    opts()[3].click();
    fixture.detectChanges();
    expect(q('[role=listbox]')).not.toBeNull();
    expect(fixture.componentInstance.values()).toEqual(['apple', 'cherry', 'date']);
    expect(q('.ath-picker__trigger')!.textContent).toContain('3 selected');
  });

  it('clears the selection with the clear button', () => {
    fixture.componentInstance.value.set('apple');
    fixture.detectChanges();
    const clear = q('.ath-picker__clear')!;
    expect(clear.getAttribute('aria-label')).toBe('Clear selection');
    clear.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBeNull();
  });

  it('closes on Escape and outside click', async () => {
    await open();
    press('Escape', q('input')!);
    expect(q('[role=listbox]')).toBeNull();
    await open();
    q('.outside')!.dispatchEvent(
      new PointerEvent('pointerdown', { bubbles: true, composed: true })
    );
    fixture.detectChanges();
    expect(q('[role=listbox]')).toBeNull();
  });
});

let builtOptions = 0;

/** Counts the option rows the picker built. */
@Directive({ selector: '[athCountBuilt]' })
class CountBuiltDirective {
  constructor() {
    builtOptions++;
  }
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthOptionPickerComponent, CountBuiltDirective],
  template: `
    <ng-template #opt let-option
      ><span athCountBuilt>{{ option.label }}</span></ng-template
    >
    <ath-option-picker
      [options]="options"
      [(value)]="value"
      [optionTemplate]="opt"
      ariaLabel="Fruit"
    />
  `,
})
class LazyPickerHostComponent {
  readonly options = FRUIT;
  readonly value = signal<string | null>('cherry');
}

/** R-58: a closed picker (one per table cell) builds no listbox. */
describe('AthOptionPickerComponent while closed', () => {
  it('builds the option list only while open', async () => {
    builtOptions = 0;
    const fixture = TestBed.createComponent(LazyPickerHostComponent);
    const root = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    expect(builtOptions).toBe(0);
    expect(root.querySelector('.ath-picker__trigger')!.textContent).toContain('Cherry');

    root.querySelector<HTMLElement>('.ath-picker__trigger')!.click();
    fixture.detectChanges();
    await new Promise((r) => setTimeout(r));
    fixture.detectChanges();
    expect(builtOptions).toBe(FRUIT.length);
    expect(root.querySelector('[role=option][aria-selected=true]')!.textContent).toContain(
      'Cherry'
    );
    fixture.destroy();
  });
});

const MANY: ListboxOption[] = Array.from({ length: 30 }, (_, i) => ({
  value: `o${i}`,
  label: `Option ${i}`,
}));

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthOptionPickerComponent],
  template: `
    <ath-option-picker
      [options]="options"
      [(value)]="value"
      [maxHeight]="120"
      ariaLabel="Option"
      placeholder="Pick one"
    />
  `,
})
class HandCheckedPickerHostComponent {
  readonly options = MANY;
  readonly value = signal<string | null>('o27');
}

// See the popover spec of the same name: focus and the scroll to the
// selected option wait for the rendered panel, also in a view an app render
// does not include.
describe('AthOptionPickerComponent in a view checked by hand', () => {
  it('focuses the search and shows the selected option when its panel renders', async () => {
    TestBed.configureTestingModule({
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: false }],
    });
    const fixture = TestBed.createComponent(HandCheckedPickerHostComponent);
    const root = fixture.nativeElement as HTMLElement;
    document.body.appendChild(root);
    const render = () => fixture.componentRef.changeDetectorRef.detectChanges();
    render();
    root.querySelector<HTMLElement>('.ath-picker__trigger')!.click();
    TestBed.inject(ApplicationRef).tick();
    expect(root.querySelector('[role=listbox]')).toBeNull();
    render();
    await fixture.whenStable();
    expect(document.activeElement).toBe(root.querySelector('input'));
    const list = root.querySelector<HTMLElement>('[role=listbox]')!;
    const selected = root.querySelector<HTMLElement>('[role=option][aria-selected=true]')!;
    expect(selected.textContent).toContain('Option 27');
    const box = list.getBoundingClientRect();
    const row = selected.getBoundingClientRect();
    expect(row.top).toBeGreaterThanOrEqual(box.top - 1);
    expect(row.bottom).toBeLessThanOrEqual(box.bottom + 1);
    fixture.destroy();
    root.remove();
  });
});
