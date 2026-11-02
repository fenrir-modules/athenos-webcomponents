import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AthColorSwatchComponent } from './color-swatch.component';
import { ATH_DECO_COLORS, isAthDecoColor } from './deco-color';
import { inTheme, parseColour, tokenColour } from '../../testing/colour';

describe('AthColorSwatchComponent', () => {
  let fixture: ComponentFixture<AthColorSwatchComponent>;
  const host = () => fixture.nativeElement as HTMLElement;
  const radios = () => Array.from(host().querySelectorAll<HTMLButtonElement>('[role="radio"]'));
  const key = (el: HTMLElement, k: string) =>
    el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true }));

  function render(inputs: Record<string, unknown> = {}) {
    fixture = TestBed.configureTestingModule({
      imports: [AthColorSwatchComponent],
    }).createComponent(AthColorSwatchComponent);
    for (const [k, v] of Object.entries(inputs)) fixture.componentRef.setInput(k, v);
    fixture.detectChanges();
  }

  it('offers the whole palette as a named radio group', () => {
    render({ label: 'Role colour' });
    expect(host().querySelector('[role="radiogroup"]')!.getAttribute('aria-label')).toBe(
      'Role colour'
    );
    expect(radios().map((r) => r.getAttribute('data-color'))).toEqual([...ATH_DECO_COLORS]);
    expect(radios().map((r) => r.getAttribute('aria-label'))).toEqual([
      'Grey',
      'Blue',
      'Green',
      'Amber',
      'Red',
      'Purple',
      'Pink',
    ]);
  });

  it('defaults the group name to the Colour label', () => {
    render();
    expect(host().querySelector('[role="radiogroup"]')!.getAttribute('aria-label')).toBe('Colour');
  });

  it('marks the picked swatch with aria-checked and a check, and gives it the tab stop', () => {
    render({ value: 'green' });
    const picked = radios()[2];
    expect(picked.getAttribute('aria-checked')).toBe('true');
    expect(picked.querySelector('ath-icon')).not.toBeNull();
    expect(radios().filter((r) => r.tabIndex === 0)).toEqual([picked]);
  });

  it('gives the first swatch the tab stop when nothing is picked', () => {
    render({ value: null });
    expect(radios()[0].tabIndex).toBe(0);
    expect(
      radios()
        .slice(1)
        .every((r) => r.tabIndex === -1)
    ).toBe(true);
  });

  it('picks on click and with the arrow keys, wrapping', () => {
    render({ value: 'neutral' });
    radios()[1].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('blue');
    key(radios()[1], 'ArrowRight');
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('green');
    expect(document.activeElement).toBe(radios()[2]);
    key(radios()[2], 'End');
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('pink');
    key(radios()[6], 'ArrowDown');
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('neutral');
    key(radios()[0], 'ArrowLeft');
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('pink');
  });

  it('does not change while disabled', () => {
    render({ value: 'red', disabled: true });
    radios()[1].click();
    key(radios()[4], 'ArrowRight');
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('red');
  });

  it('recognises palette tokens only', () => {
    expect(isAthDecoColor('purple')).toBe(true);
    expect(isAthDecoColor('#ff0000')).toBe(false);
    expect(isAthDecoColor(null)).toBe(false);
  });
});

describe('AthColorSwatchComponent tones (P04)', () => {
  function swatches(tone?: string): HTMLButtonElement[] {
    const fixture = TestBed.createComponent(AthColorSwatchComponent);
    fixture.componentRef.setInput('value', 'purple');
    if (tone) fixture.componentRef.setInput('tone', tone);
    fixture.detectChanges();
    const items = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>('[role="radio"]')
    );
    for (const item of items) item.style.transition = 'none';
    return items;
  }
  const bg = (el: HTMLElement) => parseColour(getComputedStyle(el).backgroundColor);

  it('paints the full colour with tone="solid" and the muted mark by default, 32px each', () => {
    // One fixture at a time: a second createComponent detaches the first.
    const solid = swatches('solid');
    const purple = solid.find((s) => s.dataset['color'] === 'purple')!;
    for (const theme of ['light', 'dark'] as const) {
      inTheme(theme, () => expect(bg(purple), theme).toEqual(tokenColour('purple')));
    }
    expect(solid.map((s) => s.getBoundingClientRect().width)).toEqual(solid.map(() => 32));
    const muted = swatches().find((s) => s.dataset['color'] === 'purple')!;
    for (const theme of ['light', 'dark'] as const) {
      inTheme(theme, () => expect(bg(muted), theme).toEqual(tokenColour('purple-muted')));
    }
  });

  it('draws the check white with a drop shadow in both themes', () => {
    const picked = swatches('solid').find((s) => s.getAttribute('aria-checked') === 'true')!;
    for (const theme of ['light', 'dark'] as const) {
      inTheme(theme, () => {
        expect(parseColour(getComputedStyle(picked).color), theme).toEqual([255, 255, 255, 1]);
        expect(getComputedStyle(picked.querySelector('ath-icon')!).filter).toContain('drop-shadow');
      });
    }
  });
});
