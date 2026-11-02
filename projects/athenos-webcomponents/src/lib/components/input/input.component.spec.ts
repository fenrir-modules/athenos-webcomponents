import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { AthInputComponent } from './input.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthInputComponent, ReactiveFormsModule],
  template: `<ath-input label="Email" required [formControl]="email" />`,
})
class FormHostComponent {
  readonly email = new FormControl('', { nonNullable: true });
}

describe('AthInputComponent', () => {
  let fixture: ComponentFixture<AthInputComponent>;
  let component: AthInputComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AthInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AthInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders label and required marker', () => {
    fixture.componentRef.setInput('label', 'Email');
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('label');
    expect(label?.textContent).toContain('Email');
    expect(label?.textContent).toContain('*');
  });

  it('emits value changes on input event', () => {
    const onChange = vi.fn().mockName('onChange');
    component.registerOnChange(onChange);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'demo@example.com';
    input.dispatchEvent(new Event('input'));

    expect(onChange).toHaveBeenCalledWith('demo@example.com');
  });

  it('toggles password visibility with aria state', () => {
    fixture.componentRef.setInput('type', 'password');
    fixture.detectChanges();

    const toggle = fixture.nativeElement.querySelector('.ath-input__toggle') as HTMLButtonElement;
    expect(toggle.getAttribute('aria-pressed')).toBe('false');
    toggle.click();
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-pressed')).toBe('true');
  });

  it('shows values and the disabled state the forms API writes, without an input change', async () => {
    const host = TestBed.createComponent(FormHostComponent);
    host.detectChanges();
    const field = (host.nativeElement as HTMLElement).querySelector('input')!;
    // `required` as a bare attribute.
    expect((host.nativeElement as HTMLElement).querySelector('label')?.textContent).toContain('*');
    host.componentInstance.email.setValue('mira@example.com');
    host.componentInstance.email.disable();
    await host.whenStable();
    host.detectChanges();
    expect(field.value).toBe('mira@example.com');
    expect(field.disabled).toBe(true);
    host.componentInstance.email.enable();
    await host.whenStable();
    host.detectChanges();
    expect(field.disabled).toBe(false);
  });

  /** R-53: hint, error and required reached sighted users only. */
  it('exposes error, hint and required to assistive tech', () => {
    fixture.componentRef.setInput('inputId', 'mail');
    fixture.componentRef.setInput('hint', 'Work address');
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const field = root.querySelector('input')!;
    expect(field.getAttribute('aria-required')).toBe('true');
    expect(field.hasAttribute('aria-invalid')).toBe(false);
    expect(document.getElementById(field.getAttribute('aria-describedby')!)?.textContent).toBe(
      'Work address'
    );

    fixture.componentRef.setInput('error', 'Address is taken');
    fixture.detectChanges();
    expect(field.getAttribute('aria-invalid')).toBe('true');
    expect(field.getAttribute('aria-describedby')).toBe('mail-error');
    expect(root.querySelector('#mail-error')?.textContent).toContain('Address is taken');

    fixture.componentRef.setInput('error', '');
    fixture.componentRef.setInput('hint', '');
    fixture.componentRef.setInput('required', false);
    fixture.detectChanges();
    expect(field.hasAttribute('aria-describedby')).toBe(false);
    expect(field.hasAttribute('aria-required')).toBe(false);
  });

  it('keeps the password reveal button in the tab order', () => {
    fixture.componentRef.setInput('type', 'password');
    fixture.detectChanges();
    const toggle = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
      '.ath-input__toggle'
    )!;
    expect(toggle.tabIndex).toBe(0);
    expect(toggle.getAttribute('aria-label')).toBe('Show password');
  });
});
