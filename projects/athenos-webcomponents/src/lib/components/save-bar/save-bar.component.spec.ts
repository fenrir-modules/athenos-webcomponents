import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AthSaveBarComponent } from './save-bar.component';

describe('AthSaveBarComponent', () => {
  let fixture: ComponentFixture<AthSaveBarComponent>;
  const host = () => fixture.nativeElement as HTMLElement;
  const region = () => host().querySelector<HTMLElement>('[role="region"]');
  const buttons = () => Array.from(host().querySelectorAll<HTMLButtonElement>('button'));
  const escape = () =>
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', cancelable: true }));

  function render(inputs: Record<string, unknown>) {
    fixture = TestBed.configureTestingModule({ imports: [AthSaveBarComponent] }).createComponent(
      AthSaveBarComponent
    );
    for (const [k, v] of Object.entries(inputs)) fixture.componentRef.setInput(k, v);
    fixture.detectChanges();
  }

  it('shows nothing while closed, but keeps the live region', () => {
    render({ open: false });
    expect(region()).toBeNull();
    const live = host().querySelector('[aria-live="polite"]')!;
    expect(live.textContent.trim()).toBe('');
  });

  it('appears as a named region and announces itself', () => {
    render({ open: true });
    expect(region()!.getAttribute('aria-label')).toBe('You have unsaved changes');
    expect(host().querySelector('[aria-live="polite"]')!.textContent.trim()).toBe(
      'You have unsaved changes'
    );
    expect(buttons().map((b) => b.textContent.trim())).toEqual(['Discard', 'Save']);
  });

  it('takes its own words', () => {
    render({ open: true, message: 'Role changed', saveLabel: 'Apply', discardLabel: 'Reset' });
    expect(region()!.textContent).toContain('Role changed');
    expect(buttons().map((b) => b.textContent.trim())).toEqual(['Reset', 'Apply']);
  });

  it('emits save and discard', () => {
    render({ open: true });
    let saved = 0;
    let discarded = 0;
    fixture.componentInstance.save.subscribe(() => saved++);
    fixture.componentInstance.discard.subscribe(() => discarded++);
    buttons()[1].click();
    buttons()[0].click();
    expect([saved, discarded]).toEqual([1, 1]);
  });

  it('asks before discarding with confirmDiscard', () => {
    render({ open: true, confirmDiscard: true });
    let discarded = 0;
    fixture.componentInstance.discard.subscribe(() => discarded++);
    buttons()[0].click();
    fixture.detectChanges();
    expect(discarded).toBe(0);
    expect(buttons()[0].textContent.trim()).toBe('Really discard?');
    buttons()[0].click();
    expect(discarded).toBe(1);
  });

  it('starts the question with Escape, and a second Escape takes it back', () => {
    render({ open: true, confirmDiscard: true });
    let discarded = 0;
    fixture.componentInstance.discard.subscribe(() => discarded++);
    escape();
    fixture.detectChanges();
    expect(buttons()[0].textContent.trim()).toBe('Really discard?');
    escape();
    fixture.detectChanges();
    expect(buttons()[0].textContent.trim()).toBe('Discard');
    expect(discarded).toBe(0);
  });

  it('ignores Escape without confirmDiscard, and when closed', () => {
    render({ open: true });
    let discarded = 0;
    fixture.componentInstance.discard.subscribe(() => discarded++);
    escape();
    fixture.componentRef.setInput('open', false);
    fixture.componentRef.setInput('confirmDiscard', true);
    fixture.detectChanges();
    escape();
    expect(discarded).toBe(0);
  });

  it('waits while saving', () => {
    render({ open: true, saving: true });
    let events = 0;
    fixture.componentInstance.save.subscribe(() => events++);
    fixture.componentInstance.discard.subscribe(() => events++);
    expect(buttons()[0].disabled).toBe(true);
    // Busy is aria-disabled (it keeps focus), not natively disabled.
    expect(buttons()[1].getAttribute('aria-disabled')).toBe('true');
    expect(buttons()[1].getAttribute('aria-busy')).toBe('true');
    buttons().forEach((b) => b.click());
    expect(events).toBe(0);
  });
});
