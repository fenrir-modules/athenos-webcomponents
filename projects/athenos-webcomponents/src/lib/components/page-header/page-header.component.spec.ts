import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { page } from 'vitest/browser';

import { AthPageHeaderComponent } from './page-header.component';

@Component({
  imports: [AthPageHeaderComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <ath-page-header title="Project" [subItems]="['Sprint 2', '', 'No lead']" [divider]="divider()">
      <span athPageLeading class="key">FP</span>
      <span athPageMeta class="pill">On track</span>
      <button type="button" class="act">More</button>
    </ath-page-header>
  `,
})
class HostComponent {
  readonly divider = signal(true);
}

describe('AthPageHeaderComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
  });

  it('renders the title as the page h1', () => {
    expect(el.querySelector('h1')?.textContent?.trim()).toBe('Project');
  });

  it('drops blank meta items; each item leads with its own separator', () => {
    // The row clips the first separator-width of every line, so the
    // leading dot of the first item on a line is never seen.
    const items = Array.from(el.querySelectorAll('.ath-page-header__sub-item')).map((n) =>
      n.textContent?.replace(/\s+/g, ' ').trim()
    );
    expect(items).toEqual(['· Sprint 2', '· No lead']);
  });

  it('projects leading, meta and actions into their slots', () => {
    expect(el.querySelector('.ath-page-header__leading .key')).not.toBeNull();
    expect(el.querySelector('.ath-page-header__sub .pill')).not.toBeNull();
    expect(el.querySelector('.ath-page-header__actions .act')).not.toBeNull();
  });

  it('draws the hairline by default and lets a page opt out', () => {
    const header = () => el.querySelector('.ath-page-header') as HTMLElement;
    expect(header().classList).toContain('ath-page-header--divided');
    fixture.componentInstance.divider.set(false);
    fixture.detectChanges();
    expect(header().classList).not.toContain('ath-page-header--divided');
  });

  it('renders an h2 when it heads a section inside a page', () => {
    const f = TestBed.createComponent(AthPageHeaderComponent);
    f.componentRef.setInput('title', 'Labels');
    f.componentRef.setInput('level', 2);
    f.detectChanges();
    const root = f.nativeElement as HTMLElement;
    expect(root.querySelector('h1')).toBeNull();
    expect(root.querySelector('h2')?.textContent?.trim()).toBe('Labels');
  });

  it("keeps the meta line's room on a page head while it is empty (UX-043)", () => {
    const f = TestBed.createComponent(AthPageHeaderComponent);
    f.componentRef.setInput('title', 'Docs');
    f.detectChanges();
    const root = f.nativeElement as HTMLElement;
    document.body.append(root);
    const sub = root.querySelector('.ath-page-header__sub') as HTMLElement;
    expect(getComputedStyle(sub).display).not.toBe('none');
    expect(sub.getBoundingClientRect().height).toBeGreaterThan(0);
    f.componentRef.setInput('level', 2);
    f.detectChanges();
    expect(getComputedStyle(sub).display).toBe('none');
    root.remove();
  });

  it('draws title and meta as skeleton bars while loading, without an empty h1', () => {
    const f = TestBed.createComponent(AthPageHeaderComponent);
    f.componentRef.setInput('title', '');
    f.componentRef.setInput('loading', true);
    f.detectChanges();
    const root = f.nativeElement as HTMLElement;
    expect(root.querySelector('h1')).toBeNull();
    expect(root.querySelector('.ath-page-header__skeleton--title')).not.toBeNull();
    expect(root.querySelector('.ath-page-header__skeleton--meta')).not.toBeNull();
    expect(root.querySelector('header')?.getAttribute('aria-busy')).toBe('true');
  });
});

// A 28 px button, the size the app's head actions use.
const BUTTON = 'height: 28px; padding: 0 10px';

/** Vertical centre of an element's box. */
const middle = (node: Element) => {
  const r = node.getBoundingClientRect();
  return r.top + r.height / 2;
};

@Component({
  imports: [AthPageHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="width: 358px">
      <ath-page-header
        [class.ath-page-header--compact]="compact()"
        title="Ein Projekt mit einem sehr langen Namen, der nicht in eine Zeile passt"
        [subItems]="['Sprint 14', '39 % erledigt', '3 ueberfaellig']"
        [divider]="false"
      >
        <span athPageLeading class="key" style="display: inline-block; width: 32px; height: 24px"
          >WEB</span
        >
        <button type="button" class="more" style="${BUTTON}">More</button>
        <button type="button" class="new" style="${BUTTON}">New</button>
      </ath-page-header>
    </div>
  `,
})
class PhoneHostComponent {
  readonly compact = signal(true);
}

describe('AthPageHeaderComponent: one head measure (A-05, A-12)', () => {
  it('centres the actions on the title line, not on the title block', () => {
    const f = TestBed.createComponent(HostComponent);
    f.detectChanges();
    const root = f.nativeElement as HTMLElement;
    root.querySelector<HTMLElement>('.act')!.setAttribute('style', BUTTON);
    const title = root.querySelector('h1')!;
    const actions = root.querySelector('.ath-page-header__actions')!;
    // The title line box: one line of the title.
    expect(title.getBoundingClientRect().height).toBeLessThan(30);
    expect(Math.abs(middle(actions) - middle(title))).toBeLessThanOrEqual(1);
    expect(Math.abs(middle(root.querySelector('.act')!) - middle(title))).toBeLessThanOrEqual(1);
    // The meta line sits below, clear of the title line.
    const sub = root.querySelector('.ath-page-header__sub')!.getBoundingClientRect();
    expect(sub.top).toBeGreaterThanOrEqual(title.getBoundingClientRect().bottom);
  });

  describe('on a phone (390 px)', () => {
    beforeEach(async () => {
      await page.viewport(390, 844);
    });

    afterEach(async () => {
      await page.viewport(800, 600);
    });

    it('compact: leading, title and actions share one row of 44 px, the meta below', () => {
      const f = TestBed.createComponent(PhoneHostComponent);
      f.detectChanges();
      const root = f.nativeElement as HTMLElement;
      const header = root.querySelector('.ath-page-header')!.getBoundingClientRect();
      const title = root.querySelector<HTMLElement>('h1')!;
      const box = title.getBoundingClientRect();
      const more = root.querySelector('.more')!.getBoundingClientRect();
      const add = root.querySelector('.new')!.getBoundingClientRect();
      const key = root.querySelector('.key')!.getBoundingClientRect();
      const sub = root.querySelector('.ath-page-header__sub')!.getBoundingClientRect();
      // One row: everything centred on one line.
      for (const node of ['.more', '.new', '.ath-page-header__leading']) {
        expect(
          Math.abs(middle(root.querySelector(node)!) - middle(title)),
          node
        ).toBeLessThanOrEqual(1);
      }
      expect(key.right).toBeLessThanOrEqual(box.left);
      expect(box.right).toBeLessThanOrEqual(more.left);
      expect(more.right).toBeLessThanOrEqual(add.left);
      expect(add.right).toBeLessThanOrEqual(header.right + 0.5);
      // The row is at least 44 px; the title one line, ending in an ellipsis.
      expect(sub.top - header.top).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeLessThan(30);
      expect(getComputedStyle(title).textOverflow).toBe('ellipsis');
      expect(title.scrollWidth).toBeGreaterThan(title.clientWidth);
      // The meta line runs the full width under the row, from the head's start.
      expect(sub.top).toBeGreaterThanOrEqual(Math.max(box.bottom, more.bottom, key.bottom));
      expect(Math.abs(sub.left + 16 - header.left)).toBeLessThanOrEqual(1);
    });

    it('without the class keeps the phone head as it was: actions on a row of their own', () => {
      const f = TestBed.createComponent(PhoneHostComponent);
      f.componentInstance.compact.set(false);
      f.detectChanges();
      const root = f.nativeElement as HTMLElement;
      const title = root.querySelector('h1')!.getBoundingClientRect();
      const sub = root.querySelector('.ath-page-header__sub')!.getBoundingClientRect();
      const more = root.querySelector('.more')!.getBoundingClientRect();
      expect(more.top).toBeGreaterThanOrEqual(sub.bottom);
      // The title wraps instead of being cut.
      expect(title.height).toBeGreaterThan(30);
    });
  });
});
