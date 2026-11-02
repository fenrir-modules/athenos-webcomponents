import { TestBed } from '@angular/core/testing';

import { AthTextareaComponent } from './textarea.component';

describe('AthTextareaComponent', () => {
  /** R-53: hint, error and required reached sighted users only. */
  it('exposes error, hint and required to assistive tech', () => {
    const fixture = TestBed.createComponent(AthTextareaComponent);
    fixture.componentRef.setInput('textareaId', 'note');
    fixture.componentRef.setInput('hint', 'Markdown works');
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const field = root.querySelector('textarea')!;
    expect(field.getAttribute('aria-required')).toBe('true');
    expect(field.hasAttribute('aria-invalid')).toBe(false);
    expect(root.querySelector('#' + field.getAttribute('aria-describedby'))?.textContent).toBe(
      'Markdown works'
    );

    fixture.componentRef.setInput('error', 'Too short');
    fixture.detectChanges();
    expect(field.getAttribute('aria-invalid')).toBe('true');
    expect(field.getAttribute('aria-describedby')).toBe('note-error');
    expect(root.querySelector('#note-error')?.textContent).toContain('Too short');

    fixture.componentRef.setInput('error', '');
    fixture.componentRef.setInput('hint', '');
    fixture.detectChanges();
    expect(field.hasAttribute('aria-describedby')).toBe(false);
  });
});
