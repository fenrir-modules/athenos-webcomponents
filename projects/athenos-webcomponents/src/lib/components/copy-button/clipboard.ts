/**
 * Puts `text` on the clipboard and resolves whether it got there, so a
 * caller only says "copied" when it is true. The async Clipboard API first;
 * where it is missing (insecure origin, older browser) or refused, the
 * hidden-textarea `execCommand('copy')` fallback.
 */
export async function copyText(text: string, doc: Document = document): Promise<boolean> {
  try {
    await doc.defaultView!.navigator.clipboard.writeText(text);
    return true;
  } catch {
    return copyWithSelection(text, doc);
  }
}

function copyWithSelection(text: string, doc: Document): boolean {
  const previous = doc.activeElement as HTMLElement | null;
  const textarea = doc.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  doc.body.appendChild(textarea);
  textarea.select();
  try {
    // Deprecated, but the only synchronous path left; false when blocked.
    return doc.execCommand('copy');
  } catch {
    return false;
  } finally {
    textarea.remove();
    // select() moved focus to the textarea; give it back to the button.
    previous?.focus?.();
  }
}
