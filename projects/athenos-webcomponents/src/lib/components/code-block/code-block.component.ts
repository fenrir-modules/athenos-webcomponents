import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  booleanAttribute,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';

import { AthIconComponent } from '../icon/icon.component';
import { Check, Copy } from 'lucide';
import { injectAthLabels } from '../../i18n/labels';
import { copyText } from '../copy-button/clipboard';

/**
 * Code block with optional language label + copy-to-clipboard button.
 *
 * Heavy syntax highlighting is **intentionally not bundled** to keep the
 * library small. Consumers can layer highlight.js or Prism on top by
 * targeting `pre code`. The default rendering is a clean monospace block.
 *
 * @example
 * <ath-code-block language="bash" code="curl https://api.athenos.dev/v1/me" />
 * <ath-code-block language="rust" [code]="snippet" [filename]="'main.rs'" />
 */
@Component({
  selector: 'ath-code-block',
  imports: [AthIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './code-block.component.html',
  styleUrl: './code-block.component.scss',
  host: {
    '[attr.data-language]': 'language()',
  },
})
export class AthCodeBlockComponent {
  protected readonly labels = injectAthLabels();

  readonly code = input.required<string>();
  readonly language = input<string | null>(null);

  /** Optional filename to display next to the language label. */
  readonly filename = input<string | null>(null);

  /** Show line numbers down the left gutter. */
  readonly showLineNumbers = input(false, { transform: booleanAttribute });

  /** Hide the copy button (e.g., for short read-only snippets). */
  readonly copyable = input(true, { transform: booleanAttribute });

  protected readonly copyIcon = Copy;
  protected readonly checkIcon = Check;
  protected readonly copied = signal(false);
  private resetTimer: ReturnType<typeof setTimeout> | undefined;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly lines = computed(() => this.code().split('\n'));

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.resetTimer));
  }

  async copy(): Promise<void> {
    if (!(await copyText(this.code()))) {
      // Nothing reached the clipboard: select the code so Ctrl+C still works.
      this.selectCode();
      return;
    }
    this.copied.set(true);
    // Feedback timer, not change detection: the signal schedules the render.
    clearTimeout(this.resetTimer);
    this.resetTimer = setTimeout(() => this.copied.set(false), 1500);
  }

  private selectCode(): void {
    const body = this.host.nativeElement.querySelector('.ath-code__body');
    const selection = body?.ownerDocument.getSelection();
    if (!body || !selection) return;
    selection.selectAllChildren(body);
  }
}
