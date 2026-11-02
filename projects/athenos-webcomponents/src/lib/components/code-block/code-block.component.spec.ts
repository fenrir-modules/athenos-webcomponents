import { TestBed } from '@angular/core/testing';

import { AthCodeBlockComponent } from './code-block.component';

function stubClipboard(writeText: () => Promise<void>, execCommandResult: boolean) {
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText: vi.fn(writeText) },
    configurable: true,
  });
  Object.defineProperty(document, 'execCommand', {
    value: vi.fn(() => execCommandResult),
    configurable: true,
  });
}

afterEach(() => {
  delete (navigator as { clipboard?: unknown }).clipboard;
  delete (document as { execCommand?: unknown }).execCommand;
  document.getSelection()?.removeAllRanges();
});

describe('AthCodeBlockComponent', () => {
  function setup() {
    const fixture = TestBed.createComponent(AthCodeBlockComponent);
    fixture.componentRef.setInput('code', 'npm run build');
    fixture.detectChanges();
    const button = (fixture.nativeElement as HTMLElement).querySelector('.ath-code__copy')!;
    return { fixture, button };
  }

  it('says "Copied" once the code is on the clipboard', async () => {
    stubClipboard(() => Promise.resolve(), false);
    const { fixture, button } = setup();
    await fixture.componentInstance.copy();
    fixture.detectChanges();
    expect(button.getAttribute('aria-label')).toBe('Copied');
  });

  it('copies through the execCommand fallback when the Clipboard API is refused', async () => {
    stubClipboard(() => Promise.reject(new Error('denied')), true);
    const { fixture, button } = setup();
    await fixture.componentInstance.copy();
    fixture.detectChanges();
    expect(button.getAttribute('aria-label')).toBe('Copied');
  });

  /** R-78: a failed copy did nothing at all. */
  it('selects the code instead of claiming success when the copy failed', async () => {
    stubClipboard(() => Promise.reject(new Error('denied')), false);
    const { fixture, button } = setup();
    await fixture.componentInstance.copy();
    fixture.detectChanges();
    expect(button.getAttribute('aria-label')).toBe('Copy code');
    expect(document.getSelection()?.toString()).toBe('npm run build');
  });
});
