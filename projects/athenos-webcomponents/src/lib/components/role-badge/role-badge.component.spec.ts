import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AthRoleBadgeComponent } from './role-badge.component';

describe('AthRoleBadgeComponent', () => {
  let fixture: ComponentFixture<AthRoleBadgeComponent>;
  const badge = () =>
    (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('.ath-role-badge')!;

  function render(inputs: Record<string, unknown>) {
    fixture = TestBed.configureTestingModule({ imports: [AthRoleBadgeComponent] }).createComponent(
      AthRoleBadgeComponent
    );
    for (const [k, v] of Object.entries(inputs)) fixture.componentRef.setInput(k, v);
    fixture.detectChanges();
  }

  it('shows a dot in the role colour and the name', () => {
    render({ name: 'Developer', color: 'blue' });
    expect(badge().getAttribute('data-color')).toBe('blue');
    expect(badge().querySelector('.ath-role-badge__dot')!.getAttribute('aria-hidden')).toBe('true');
    expect(badge().textContent.trim()).toBe('Developer');
  });

  it('draws a team colour (#RRGGBB) as it is', () => {
    render({ name: 'Team Web', color: '#2f80ed' });
    expect(badge().getAttribute('data-color')).toBe('custom');
    expect(badge().style.getPropertyValue('--_dot')).toBe('#2f80ed');
  });

  it('draws an unknown or missing colour neutral', () => {
    render({ name: 'Gast', color: 'url(x)' });
    expect(badge().getAttribute('data-color')).toBe('neutral');
    expect(badge().style.getPropertyValue('--_dot')).toBe('');
    fixture.componentRef.setInput('color', '#ff00');
    fixture.detectChanges();
    expect(badge().getAttribute('data-color')).toBe('neutral');
    fixture.componentRef.setInput('color', null);
    fixture.detectChanges();
    expect(badge().getAttribute('data-color')).toBe('neutral');
  });

  it('draws Owner and Admin in the accent tint; no colour stays neutral (A-06)', () => {
    render({ name: 'Eigentuemer', color: 'accent' });
    expect(badge().getAttribute('data-color')).toBe('accent');
    const probe = document.createElement('span');
    document.body.append(probe);
    const token = (name: string, prop: 'color' | 'backgroundColor') => {
      probe.style.color = '';
      probe.style.backgroundColor = '';
      probe.style[prop] = `var(${name})`;
      return getComputedStyle(probe)[prop];
    };
    const style = getComputedStyle(badge());
    expect(style.backgroundColor).toBe(token('--accent-faint', 'backgroundColor'));
    expect(getComputedStyle(badge().querySelector('.ath-role-badge__name')!).color).toBe(
      token('--accent-text', 'color')
    );
    expect(getComputedStyle(badge().querySelector('.ath-role-badge__dot')!).backgroundColor).toBe(
      token('--accent', 'backgroundColor')
    );
    // Mitglied: no colour, the neutral look (surface fill, grey dot).
    fixture.componentRef.setInput('color', null);
    fixture.detectChanges();
    expect(badge().getAttribute('data-color')).toBe('neutral');
    expect(getComputedStyle(badge()).backgroundColor).toBe(token('--surface', 'backgroundColor'));
    probe.remove();
  });

  it('marks a fixed role with a lock that is read out', () => {
    render({ name: 'Owner', color: 'amber', locked: true, size: 'sm' });
    expect(badge().querySelector('ath-icon')).not.toBeNull();
    expect(badge().querySelector('.ath-role-badge__sr')!.textContent.trim()).toBe('Fixed role:');
    expect(badge().getAttribute('data-size')).toBe('sm');
  });
});
