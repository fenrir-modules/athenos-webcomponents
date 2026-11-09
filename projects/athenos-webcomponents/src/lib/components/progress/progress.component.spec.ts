import { TestBed } from '@angular/core/testing';
import { contrast, inTheme, parseColour, tokenColour } from '../../testing/colour';
import { AthProgressComponent } from './progress.component';

describe('AthProgressComponent', () => {
  function render(inputs: Record<string, unknown>) {
    const fixture = TestBed.createComponent(AthProgressComponent);
    for (const [k, v] of Object.entries(inputs)) fixture.componentRef.setInput(k, v);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    el.style.cssText = 'display:flex;width:240px';
    return { fixture, el };
  }

  /** UX tour B-12 (dark-progress-track-invisible): an empty bar still reads as a bar. */
  it('draws the dark track at 3:1 or more against --surface; light keeps --border', () => {
    inTheme('dark', () => {
      expect(
        contrast(tokenColour('progress-track'), tokenColour('surface'))
      ).toBeGreaterThanOrEqual(3);
    });
    inTheme('light', () => {
      expect(tokenColour('progress-track')).toEqual(tokenColour('border'));
    });
  });

  it('paints the track with the token and shows an empty bar with its "0%" label', () => {
    const { fixture, el } = render({ value: 0, showLabel: true, ariaLabel: 'Sprint' });
    const track = el.querySelector<HTMLElement>('.ath-progress__track')!;
    const label = el.querySelector<HTMLElement>('.ath-progress__label')!;
    expect(track.getBoundingClientRect().height).toBe(4);
    expect(track.getBoundingClientRect().width).toBeGreaterThan(40);
    expect(track.getAttribute('aria-valuenow')).toBe('0');
    expect(label.textContent?.trim()).toBe('0%');
    inTheme('dark', () => {
      expect(parseColour(getComputedStyle(track).backgroundColor)).toEqual(
        tokenColour('progress-track')
      );
      expect(parseColour(getComputedStyle(label).color)).toEqual(tokenColour('fg-3'));
    });
    expect(getComputedStyle(label).fontFeatureSettings).toContain('tnum');
    fixture.destroy();
  });

  it('labels a count as "value / total"', () => {
    const { fixture, el } = render({ value: 0, total: 6, showLabel: true });
    expect(el.querySelector('.ath-progress__label')?.textContent?.trim()).toBe('0 / 6');
    fixture.destroy();
  });
});
