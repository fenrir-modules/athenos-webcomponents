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

describe('AthInputComponent wrapped error (P04)', () => {
  it('keeps the 14px error icon at the first line when the message wraps', () => {
    const fixture = TestBed.configureTestingModule({
      imports: [AthInputComponent],
    }).createComponent(AthInputComponent);
    fixture.componentRef.setInput('label', 'Password');
    fixture.componentRef.setInput(
      'error',
      'At least 12 characters with upper and lower case letters, a number and a symbol.'
    );
    (fixture.nativeElement as HTMLElement).style.cssText = 'display:block;width:240px';
    fixture.detectChanges();
    const error = (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
      '.ath-input__error'
    )!;
    const icon = error.querySelector('ath-icon')!.getBoundingClientRect();
    const box = error.getBoundingClientRect();
    expect(box.height).toBeGreaterThan(30); // two lines
    expect(icon.width).toBe(14);
    expect(icon.height).toBe(14);
    expect(icon.top - box.top).toBeLessThan(6); // at the first line, not centred
  });
});

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthInputComponent],
  template: `
    <div style="width:120px;display:grid;gap:8px">
      <ath-input class="mb" size="sm" type="number" inputId="q-mb"
        ><span athInputSuffix>MB</span></ath-input
      >
      <ath-input class="days" size="sm" type="number" inputId="q-days"
        ><span athInputSuffix>Tage</span></ath-input
      >
      <ath-input class="plain" size="sm" type="number" inputId="q-plain" />
      <ath-input class="pw" type="password" inputId="q-pw" />
    </div>
  `,
})
class SuffixHostComponent {}

/** UX tour A-05 (admin-settings-unit-misalign): the unit sits inside the field. */
describe('AthInputComponent [athInputSuffix]', () => {
  let fixture: ComponentFixture<SuffixHostComponent>;
  let root: HTMLElement;
  const el = (sel: string): HTMLElement => root.querySelector<HTMLElement>(sel)!;

  beforeEach(() => {
    fixture = TestBed.createComponent(SuffixHostComponent);
    fixture.detectChanges();
    root = fixture.nativeElement as HTMLElement;
  });

  afterEach(() => fixture.destroy());

  it('renders a projected unit inside the wrapper, at the field end, in fg-3', () => {
    for (const name of ['mb', 'days']) {
      const suffix = el(`.${name} .ath-input__suffix`);
      expect(suffix.parentElement?.classList).toContain('ath-input__wrapper');
      expect(suffix.querySelector('[athInputSuffix]')).not.toBeNull();
      const field = el(`.${name} .ath-input__field`).getBoundingClientRect();
      const unit = suffix.getBoundingClientRect();
      expect(unit.right, name).toBeLessThanOrEqual(field.right - 8);
      expect(unit.top, name).toBeGreaterThan(field.top);
      expect(unit.bottom, name).toBeLessThan(field.bottom);
      // The value never runs under the unit.
      const pad = parseFloat(getComputedStyle(el(`.${name} .ath-input__field`)).paddingRight);
      expect(field.right - pad, name).toBeLessThanOrEqual(unit.left);
      expect(getComputedStyle(suffix).pointerEvents).toBe('none');
    }
  });

  it('keeps one right edge: fields with and without a unit are the same width', () => {
    const widths = ['mb', 'days', 'plain'].map(
      (n) => el(`.${n} .ath-input__field`).getBoundingClientRect().right
    );
    expect(new Set(widths).size).toBe(1);
  });

  it('draws nothing without a unit; the password toggle still works', () => {
    expect(getComputedStyle(el('.plain .ath-input__suffix')).display).toBe('none');
    expect(getComputedStyle(el('.plain .ath-input__field')).paddingRight).toBe('10px');
    expect(getComputedStyle(el('.pw .ath-input__suffix')).display).toBe('none');
    const toggle = el('.pw .ath-input__toggle') as HTMLButtonElement;
    toggle.click();
    fixture.detectChanges();
    expect(el('.pw input').getAttribute('type')).toBe('text');
  });
});
