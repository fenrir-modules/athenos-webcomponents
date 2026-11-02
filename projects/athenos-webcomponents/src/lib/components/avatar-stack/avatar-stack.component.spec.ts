import { ComponentFixture, TestBed } from '@angular/core/testing';
import { toneOfKey } from '../avatar/avatar-tone';
import { AthAvatarStackComponent, type StackedUser } from './avatar-stack.component';
import { backdrop, contrast, inTheme, parseColour } from '../../testing/colour';

describe('AthAvatarStackComponent', () => {
  let fixture: ComponentFixture<AthAvatarStackComponent>;
  const items = () =>
    Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('ath-avatar'));

  function render(users: StackedUser[], max = 4) {
    fixture = TestBed.configureTestingModule({
      imports: [AthAvatarStackComponent],
    }).createComponent(AthAvatarStackComponent);
    fixture.componentRef.setInput('users', users);
    fixture.componentRef.setInput('max', max);
    fixture.detectChanges();
  }

  it('tones each avatar by the user id, like every other ath-avatar (DS-09)', () => {
    // Same initials, different people: the id decides the colour.
    render([
      { id: 'u-1', name: 'Mira Voss' },
      { id: 'u-2', name: 'Max Vogel' },
    ]);
    const tones = items().map(
      (el) => el.querySelector<HTMLElement>('[data-tone]')?.getAttribute('data-tone') ?? null
    );
    expect(tones).toEqual([String(toneOfKey('u-1')), String(toneOfKey('u-2'))]);
  });

  it('shows at most max avatars and counts the rest', () => {
    render(
      ['a', 'b', 'c', 'd', 'e', 'f'].map((id) => ({ id, name: `User ${id}` })),
      4
    );
    expect(items().length).toBe(4);
    expect(
      (fixture.nativeElement as HTMLElement).querySelector('.ath-stack__more')?.textContent
    ).toBe('+2');
  });
});

describe('AthAvatarStackComponent small stacks (P04)', () => {
  const PEOPLE: StackedUser[] = [
    'Mira Mock',
    'Mona Weber',
    'Elias Weber',
    'Sara Moll',
    'Jonas Keller',
    'Lea Brandt',
  ].map((name, i) => ({ id: `u-${i}`, name }));

  function stack(size: string): HTMLElement {
    const fixture = TestBed.createComponent(AthAvatarStackComponent);
    fixture.componentRef.setInput('users', PEOPLE);
    fixture.componentRef.setInput('max', 4);
    fixture.componentRef.setInput('size', size);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('overlaps 20px avatars by 4px (6px from md up) with a 2px ring', () => {
    const sm = stack('sm');
    const avatars = Array.from(sm.querySelectorAll<HTMLElement>('ath-avatar'));
    for (let i = 1; i < avatars.length; i++) {
      const prev = avatars[i - 1].getBoundingClientRect();
      const next = avatars[i].getBoundingClientRect();
      expect(Math.round(prev.right - next.left)).toBe(4);
    }
    expect(getComputedStyle(avatars[0]).boxShadow).toMatch(/ 0px 0px 0px 2px$/);
    expect(getComputedStyle(stack('md').querySelectorAll('ath-avatar')[1]).marginLeft).toBe('-6px');
  });

  it('draws "+N" on --bg-3 in --fg-2 at 4.5:1 or more in both themes', () => {
    const more = stack('sm').querySelector<HTMLElement>('.ath-stack__more')!;
    expect(more.textContent).toBe('+2');
    for (const theme of ['light', 'dark'] as const) {
      inTheme(theme, () => {
        const ratio = contrast(parseColour(getComputedStyle(more).color), backdrop(more));
        expect(ratio, theme).toBeGreaterThanOrEqual(4.5);
      });
    }
  });
});
