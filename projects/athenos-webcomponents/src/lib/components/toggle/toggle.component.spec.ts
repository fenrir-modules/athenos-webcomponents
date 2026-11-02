import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AthToggleComponent } from './toggle.component';
import {
  backdrop,
  contrast as rgbaContrast,
  inTheme,
  parseColour,
  tokenColour,
} from '../../testing/colour';

describe('AthToggleComponent', () => {
  let fixture: ComponentFixture<AthToggleComponent>;
  const button = () => (fixture.nativeElement as HTMLElement).querySelector('button')!;

  function render(inputs: Record<string, unknown>) {
    fixture = TestBed.configureTestingModule({ imports: [AthToggleComponent] }).createComponent(
      AthToggleComponent
    );
    for (const [k, v] of Object.entries(inputs)) fixture.componentRef.setInput(k, v);
    fixture.detectChanges();
  }

  it('is a switch named by ariaLabel, without the boxed label chrome', () => {
    render({ ariaLabel: 'Email on mention', checked: true });
    expect(button().getAttribute('role')).toBe('switch');
    expect(button().getAttribute('aria-checked')).toBe('true');
    expect(button().getAttribute('aria-label')).toBe('Email on mention');
    expect(button().classList).not.toContain('ath-toggle--boxed');
    expect(button().querySelector('.ath-toggle__content')).toBeNull();
    // A box of its own: exactly the switch, no line box (strut) around it.
    const host = fixture.nativeElement as HTMLElement;
    expect(host.hasAttribute('data-bare')).toBe(true);
    expect(getComputedStyle(host).display).toBe('inline-flex');
    expect(Math.round(host.getBoundingClientRect().height)).toBe(
      Math.round(button().getBoundingClientRect().height)
    );
  });

  it('is named by its visible label otherwise', () => {
    render({ label: 'Maintenance' });
    expect(button().hasAttribute('aria-label')).toBe(false);
    expect(button().textContent?.trim()).toBe('Maintenance');
    expect(button().classList).toContain('ath-toggle--boxed');
    expect((fixture.nativeElement as HTMLElement).hasAttribute('data-bare')).toBe(false);
  });

  it('emits the next state, not when disabled', () => {
    render({ ariaLabel: 'Flag' });
    const seen: boolean[] = [];
    fixture.componentInstance.toggled.subscribe((v) => seen.push(v));
    button().click();
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    fixture.componentInstance.toggle();
    expect(seen).toEqual([true]);
  });

  /** The release check: a checked switch's white thumb on dark mode's light fills (1.37:1 in neutral). */
  it('keeps the checked thumb at 3:1 or more against its track in every theme and accent', () => {
    const root = document.documentElement;
    const before = { theme: root.dataset['theme'], accent: root.dataset['accent'] };
    render({ ariaLabel: 'Flag', checked: true });
    const track = button().querySelector<HTMLElement>('.ath-toggle__track')!;
    const thumb = button().querySelector<HTMLElement>('.ath-toggle__thumb')!;
    // No transitions: the computed colour is the end state at once.
    for (const el of [track, thumb]) el.style.transition = 'none';
    try {
      for (const theme of ['light', 'dark']) {
        for (const accent of ['', 'violet', 'blue', 'green', 'orange', 'neutral']) {
          root.dataset['theme'] = theme;
          if (accent) root.dataset['accent'] = accent;
          else delete root.dataset['accent'];
          const ratio = contrast(
            getComputedStyle(thumb).backgroundColor,
            getComputedStyle(track).backgroundColor
          );
          expect(ratio, `${theme} ${accent || 'default'}`).toBeGreaterThanOrEqual(3);
        }
      }
    } finally {
      for (const [key, value] of Object.entries(before)) {
        if (value === undefined) delete root.dataset[key];
        else root.dataset[key] = value;
      }
    }
  });
});

/** WCAG 2.x contrast of two opaque colours, as `rgb()` or (a color-mix) `color(srgb …)`. */
function contrast(a: string, b: string): number {
  const lum = (css: string) => {
    const scale = css.startsWith('color(') ? 1 : 255;
    const [r, g, bl] = (css.match(/[\d.]+/g) ?? []).slice(0, 3).map((v) => {
      const c = Number(v) / scale;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

describe('AthToggleComponent off state (P04, WCAG 1.4.11)', () => {
  it('draws the off track at 3:1 or more against the surfaces it sits on, with a white thumb', () => {
    const fixture = TestBed.configureTestingModule({
      imports: [AthToggleComponent],
    }).createComponent(AthToggleComponent);
    fixture.componentRef.setInput('ariaLabel', 'Flag');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const track = el.querySelector<HTMLElement>('.ath-toggle__track')!;
    const thumb = el.querySelector<HTMLElement>('.ath-toggle__thumb')!;
    for (const node of [track, thumb]) node.style.transition = 'none';
    for (const theme of ['light', 'dark'] as const) {
      inTheme(theme, () => {
        const fill = backdrop(track);
        for (const surface of ['surface', 'bg-0', 'bg-1', 'surface-2']) {
          expect(
            rgbaContrast(fill, tokenColour(surface)),
            `${theme} on --${surface}`
          ).toBeGreaterThanOrEqual(3);
        }
        expect(parseColour(getComputedStyle(thumb).backgroundColor), theme).toEqual([
          255, 255, 255, 1,
        ]);
        expect(getComputedStyle(thumb).boxShadow, theme).not.toBe('none');
        expect(getComputedStyle(track).borderColor, theme).toBe('rgba(0, 0, 0, 0)');
      });
    }
  });
});
