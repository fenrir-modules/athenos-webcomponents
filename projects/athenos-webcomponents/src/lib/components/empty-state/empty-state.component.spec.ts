import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Inbox } from 'lucide';
import { AthEmptyStateComponent, type EmptyStateSize } from './empty-state.component';

@Component({
  imports: [AthEmptyStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ath-empty-state message="Nothing here" [size]="size()"
    ><button type="button" data-projected>Go</button></ath-empty-state
  >`,
})
class ProjectingHostComponent {
  readonly size = signal<EmptyStateSize>('default');
}

describe('AthEmptyStateComponent', () => {
  let fixture: ComponentFixture<AthEmptyStateComponent>;
  const el = () => fixture.nativeElement as HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AthEmptyStateComponent] }).compileComponents();
    fixture = TestBed.createComponent(AthEmptyStateComponent);
    fixture.componentRef.setInput('message', 'Nothing here');
  });

  it('keeps the default centred layout', () => {
    fixture.detectChanges();
    expect(el().querySelector('.ath-empty-state--compact')).toBeNull();
    expect(el().querySelector('.ath-empty-state__message')?.textContent).toContain('Nothing here');
  });

  it('sets the title 14/600 in both sizes, one empty-state form (A-07)', () => {
    fixture.detectChanges();
    const title = () => getComputedStyle(el().querySelector('.ath-empty-state__message')!);
    expect([title().fontSize, title().fontWeight]).toEqual(['14px', '600']);
    fixture.componentRef.setInput('size', 'compact');
    fixture.detectChanges();
    expect(title().fontWeight).toBe('600');
  });

  it('renders the compact layout with tile, hints and actions', () => {
    fixture.componentRef.setInput('size', 'compact');
    fixture.componentRef.setInput('icon', Inbox);
    fixture.componentRef.setInput('hints', [
      { label: 'Mentions', sub: 'When someone mentions you' },
      { label: 'Assignments' },
    ]);
    fixture.componentRef.setInput('actionLabel', 'Open');
    fixture.componentRef.setInput('secondaryActionLabel', 'Later');
    fixture.detectChanges();
    expect(el().querySelector('.ath-empty-state--compact')).not.toBeNull();
    expect(el().querySelector('.ath-empty-state__tile')).not.toBeNull();
    expect(el().querySelectorAll('.ath-empty-state__hint').length).toBe(2);
    let primary = 0;
    let secondary = 0;
    fixture.componentInstance.action.subscribe(() => primary++);
    fixture.componentInstance.secondaryAction.subscribe(() => secondary++);
    const buttons = el().querySelectorAll<HTMLButtonElement>('.ath-empty-state__actions button');
    buttons[0].click();
    buttons[1].click();
    expect([secondary, primary]).toEqual([1, 1]);
  });

  it('accepts a bare attribute and a lucide icon without casts', () => {
    fixture.componentRef.setInput('bare', '');
    fixture.componentRef.setInput('icon', Inbox);
    fixture.detectChanges();
    expect(fixture.componentInstance.bare()).toBe(true);
    expect(el().querySelector('.ath-empty-state--bare')).not.toBeNull();
  });

  it('shows projected content in both sizes', () => {
    const host = TestBed.createComponent(ProjectingHostComponent);
    host.detectChanges();
    const root = host.nativeElement as HTMLElement;
    expect(root.querySelector('.ath-empty-state [data-projected]')).not.toBeNull();
    host.componentInstance.size.set('compact');
    host.detectChanges();
    expect(root.querySelector('.ath-empty-state--compact [data-projected]')).not.toBeNull();
  });
});
