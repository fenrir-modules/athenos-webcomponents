import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AthAlertComponent } from './alert.component';

/** Lets pending promise callbacks run (no `fakeAsync`: the zoneless run has no zone.js). */
const settle = (): Promise<void> => new Promise((resolve) => setTimeout(resolve));

describe('AthAlertComponent', () => {
  let fixture: ComponentFixture<AthAlertComponent>;
  const host = () => fixture.nativeElement as HTMLElement;
  const box = () => host().querySelector<HTMLElement>('.ath-alert')!;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({ imports: [AthAlertComponent] }).createComponent(
      AthAlertComponent
    );
  });

  it('takes no space without a message', () => {
    fixture.componentRef.setInput('message', null);
    fixture.detectChanges();
    expect(getComputedStyle(host()).display).toBe('none');
    fixture.componentRef.setInput('message', 'Could not load');
    fixture.detectChanges();
    expect(getComputedStyle(host()).display).toBe('block');
  });

  it('maps warning to warn and interrupts only for warn and error', () => {
    fixture.componentRef.setInput('message', 'x');
    fixture.componentRef.setInput('variant', 'warning');
    fixture.detectChanges();
    expect(box().dataset['tone']).toBe('warn');
    expect(box().getAttribute('role')).toBe('alert');
    fixture.componentRef.setInput('variant', 'success');
    fixture.detectChanges();
    expect(box().getAttribute('role')).toBe('status');
  });

  it('shows an icon as a banner, not inline by default', () => {
    fixture.componentRef.setInput('message', 'x');
    fixture.detectChanges();
    expect(box().querySelector('.ath-alert__icon')).toBeNull();
    fixture.componentRef.setInput('appearance', 'banner');
    fixture.detectChanges();
    expect(box().querySelector('.ath-alert__icon')).not.toBeNull();
    expect(getComputedStyle(box()).borderTopLeftRadius).toBe('0px');
  });

  it('retries through a busy button', async () => {
    let resolve!: () => void;
    const retry = vi
      .fn()
      .mockName('retry')
      .mockImplementation(() => new Promise<void>((r) => (resolve = r)));
    fixture.componentRef.setInput('variant', 'error');
    fixture.componentRef.setInput('message', 'Could not load');
    fixture.componentRef.setInput('retry', retry);
    fixture.detectChanges();
    const button = box().querySelector<HTMLButtonElement>('.ath-alert__retry button')!;
    expect(button.textContent.trim()).toBe('Retry');
    button.click();
    button.click();
    fixture.detectChanges();
    expect(retry).toHaveBeenCalledTimes(1);
    // Busy is aria-disabled (it keeps focus), not natively disabled.
    expect(button.getAttribute('aria-disabled')).toBe('true');
    resolve();
    await settle();
    fixture.detectChanges();
    expect(button.hasAttribute('aria-disabled')).toBe(false);
  });

  it('dismisses with a labelled button', () => {
    const dismissed = vi.fn().mockName('dismissed');
    fixture.componentRef.setInput('message', 'Saved');
    fixture.componentRef.setInput('dismissible', true);
    fixture.componentInstance.dismissed.subscribe(dismissed);
    fixture.detectChanges();
    const button = box().querySelector<HTMLButtonElement>('.ath-alert__dismiss')!;
    expect(button.getAttribute('aria-label')).toBe('Dismiss');
    button.click();
    expect(dismissed).toHaveBeenCalled();
  });
});
