import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { Inbox } from 'lucide';
import { AthNavItemComponent } from './nav-item.component';
import { backdrop, contrast, inTheme, parseColour } from '../../testing/colour';

describe('AthNavItemComponent', () => {
  let fixture: ComponentFixture<AthNavItemComponent>;
  const host = () => fixture.nativeElement as HTMLElement;
  const q = (sel: string) => host().querySelector<HTMLElement>(sel);

  function render(inputs: Record<string, unknown>) {
    fixture = TestBed.configureTestingModule({
      imports: [AthNavItemComponent],
      providers: [provideRouter([])],
    }).createComponent(AthNavItemComponent);
    for (const [k, v] of Object.entries({ label: 'Inbox', route: '/inbox', ...inputs })) {
      fixture.componentRef.setInput(k, v);
    }
    fixture.detectChanges();
  }

  it('links to its route and shows the label and count', () => {
    render({ icon: Inbox, badge: 3 });
    expect(q('a')?.getAttribute('href')).toBe('/inbox');
    expect(q('.ath-nav-item__label')?.textContent).toBe('Inbox');
    expect(q('.ath-nav-item__badge')?.textContent).toBe('3');
    expect(q('.ath-nav-item__tooltip')).toBeNull();
  });

  it('takes link parameters for a parameterised route', () => {
    render({ route: ['/projects', 'p1'], chip: { text: 'ATL', color: 'var(--blue)' } });
    expect(q('a')?.getAttribute('href')).toBe('/projects/p1');
    expect(q('.ath-nav-item__chip')?.textContent).toBe('ATL');
  });

  it('current: the caller sets the active state, whatever the URL says', () => {
    render({ route: '/elsewhere', current: true });
    expect(q('a')?.classList).toContain('ath-nav-item--active');
    // On its own URL, and told it is not the current row.
    fixture.componentRef.setInput('route', '/');
    fixture.componentRef.setInput('current', false);
    fixture.detectChanges();
    expect(q('a')?.classList).not.toContain('ath-nav-item--active');
  });

  it('current: drops the active state the route had matched', async () => {
    render({ route: '/', exact: false });
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();
    fixture.detectChanges();
    expect(q('a')?.classList).toContain('ath-nav-item--active');
    fixture.componentRef.setInput('current', false);
    fixture.detectChanges();
    expect(q('a')?.classList).not.toContain('ath-nav-item--active');
    fixture.componentRef.setInput('current', null);
    fixture.detectChanges();
    expect(q('a')?.classList).toContain('ath-nav-item--active');
  });

  it('shows no count below 1', () => {
    render({ badge: 0 });
    expect(q('.ath-nav-item__badge')).toBeNull();
  });

  it('compact: names the link, turns the count into a dot and the tooltip', () => {
    render({ icon: Inbox, badge: 3, compact: true });
    expect(q('a')?.getAttribute('aria-label')).toBe('Inbox');
    expect(q('.ath-nav-item__icon-dot')).not.toBeNull();
    expect(q('.ath-nav-item__tooltip')?.textContent?.trim()).toBe('Inbox · 3');
  });

  it('projects an end marker inside the link, after the label', () => {
    const host = TestBed.configureTestingModule({
      imports: [EndHostComponent],
      providers: [provideRouter([])],
    }).createComponent(EndHostComponent);
    host.detectChanges();
    const root = host.nativeElement as HTMLElement;
    const end = root.querySelector('a .ath-nav-item__tail .ath-nav-item__end');
    expect(end?.querySelector('.beta')?.textContent).toBe('Beta');
    expect(end?.previousElementSibling?.classList).toContain('ath-nav-item__label');
    expect(root.querySelector('a')?.textContent).toContain('Beta');
  });

  it('draws no end cell without a marker', () => {
    render({});
    expect(q('.ath-nav-item__end')?.childElementCount).toBe(0);
  });
});

@Component({
  imports: [AthNavItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ath-nav-item label="Assistant" route="/ai"
    ><span athNavItemEnd class="beta">Beta</span></ath-nav-item
  >`,
})
class EndHostComponent {}

describe('AthNavItemComponent project chips (P04)', () => {
  // Every hue the app hashes a project into (PROJECT_PALETTE).
  const HUES = ['--accent', '--blue', '--green', '--amber', '--purple', '--red', '--pink'];

  // The sidebar (--bg-1) and a page body on the canvas (--bg-0).
  for (const surface of ['bg-1', 'bg-0']) {
    it(`keeps the key text at 4.5:1 or more on --${surface} in both themes, 10px/600 in an 18px chip`, () => {
      TestBed.configureTestingModule({
        imports: [AthNavItemComponent],
        providers: [provideRouter([])],
      });
      const nav = document.createElement('nav');
      nav.style.background = `var(--${surface})`;
      document.body.append(nav);
      try {
        for (const hue of HUES) {
          const fixture = TestBed.createComponent(AthNavItemComponent);
          fixture.componentRef.setInput('label', hue);
          fixture.componentRef.setInput('chip', { text: 'WEB', color: `var(${hue})` });
          fixture.detectChanges();
          nav.append(fixture.nativeElement as HTMLElement);
          const chip = (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
            '.ath-nav-item__chip'
          )!;
          chip.style.transition = 'none';
          for (const theme of ['light', 'dark'] as const) {
            inTheme(theme, () => {
              const style = getComputedStyle(chip);
              const ratio = contrast(parseColour(style.color), backdrop(chip));
              expect(ratio, `${hue} ${theme}`).toBeGreaterThanOrEqual(4.5);
              expect(style.fontSize).toBe('10px');
              expect(style.fontWeight).toBe('600');
              expect(chip.getBoundingClientRect().height).toBe(18);
            });
          }
          fixture.destroy();
        }
      } finally {
        nav.remove();
      }
    });
  }

  it('draws 32px rows with 16px icons, and the unread dot in the accent', () => {
    TestBed.configureTestingModule({
      imports: [AthNavItemComponent],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(AthNavItemComponent);
    fixture.componentRef.setInput('label', 'Inbox');
    fixture.componentRef.setInput('icon', Inbox);
    fixture.componentRef.setInput('compact', true);
    fixture.componentRef.setInput('badge', 2);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('a')!.getBoundingClientRect().height).toBe(32);
    expect(el.querySelector('.ath-nav-item__icon-cell svg')?.getAttribute('width')).toBe('16');
    const dot = getComputedStyle(el.querySelector('.ath-nav-item__icon-dot')!).backgroundColor;
    const accent = document.createElement('span');
    accent.style.background = 'var(--accent)';
    document.body.append(accent);
    expect(dot).toBe(getComputedStyle(accent).backgroundColor);
    accent.remove();
  });
});
