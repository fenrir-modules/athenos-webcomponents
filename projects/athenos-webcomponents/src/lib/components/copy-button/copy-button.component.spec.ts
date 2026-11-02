import { TestBed } from '@angular/core/testing';

import { AthCopyButtonComponent } from './copy-button.component';
import { copyText } from './clipboard';

/** Own properties shadow the prototype's; `delete` brings the real ones back. */
function stubClipboard(writeText: () => Promise<void>, execCommandResult: boolean) {
  const write = vi.fn(writeText);
  const exec = vi.fn(() => execCommandResult);
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText: write },
    configurable: true,
  });
  Object.defineProperty(document, 'execCommand', { value: exec, configurable: true });
  return { write, exec };
}

afterEach(() => {
  delete (navigator as { clipboard?: unknown }).clipboard;
  delete (document as { execCommand?: unknown }).execCommand;
});

describe('copyText', () => {
  it('uses the async Clipboard API when it works', async () => {
    const { write, exec } = stubClipboard(() => Promise.resolve(), false);
    expect(await copyText('abc')).toBe(true);
    expect(write).toHaveBeenCalledWith('abc');
    expect(exec).not.toHaveBeenCalled();
  });

  it('falls back to execCommand when the Clipboard API is refused', async () => {
    const { exec } = stubClipboard(() => Promise.reject(new Error('denied')), true);
    expect(await copyText('abc')).toBe(true);
    expect(exec).toHaveBeenCalledWith('copy');
    // The helper textarea is gone again.
    expect(document.querySelector('textarea')).toBeNull();
  });

  it('reports failure when neither path copies', async () => {
    stubClipboard(() => Promise.reject(new Error('denied')), false);
    expect(await copyText('abc')).toBe(false);
  });
});

describe('AthCopyButtonComponent', () => {
  function setup() {
    const fixture = TestBed.createComponent(AthCopyButtonComponent);
    fixture.componentRef.setInput('value', 'tok_123');
    fixture.detectChanges();
    const button = (fixture.nativeElement as HTMLElement).querySelector('button')!;
    return { fixture, button };
  }

  it('says "Copied" once the value is on the clipboard', async () => {
    stubClipboard(() => Promise.resolve(), false);
    const { fixture, button } = setup();
    await fixture.componentInstance.copy();
    fixture.detectChanges();
    expect(button.getAttribute('aria-label')).toBe('Copied');
  });

  /** R-78: it said "Copied" even when nothing was copied. */
  it('keeps the copy label when the copy failed', async () => {
    stubClipboard(() => Promise.reject(new Error('denied')), false);
    const { fixture, button } = setup();
    await fixture.componentInstance.copy();
    fixture.detectChanges();
    expect(button.getAttribute('aria-label')).toBe('Copy');
  });
});
