import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';

import { AthIconComponent } from '../icon/icon.component';
import { Copy, Check } from 'lucide';
import { injectAthLabels } from '../../i18n/labels';
import { copyText } from './clipboard';

/**
 * Athenos Copy Button Component
 *
 * One-click copy-to-clipboard with success feedback.
 *
 * @example
 * <ath-copy-button [value]="apiKey" />
 * <ath-copy-button [value]="secretToken" label="Copy token" />
 */
@Component({
  selector: 'ath-copy-button',
  imports: [AthIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './copy-button.component.html',
  styleUrl: './copy-button.component.scss',
})
export class AthCopyButtonComponent {
  protected readonly labels = injectAthLabels();

  /** Value to copy to clipboard */
  readonly value = input.required<string>();

  /** Optional tooltip/label */
  readonly label = input<string | null>(null);

  protected readonly copied = signal(false);
  protected readonly copyIcon = Copy;
  protected readonly checkIcon = Check;

  private resetTimeout: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.resetTimeout));
  }

  async copy(): Promise<void> {
    // "Copied" only when it is true: a refused clipboard keeps the copy label.
    if (!(await copyText(this.value()))) return;
    this.copied.set(true);
    // Feedback timer, not change detection: the signal schedules the render.
    clearTimeout(this.resetTimeout);
    this.resetTimeout = setTimeout(() => this.copied.set(false), 2000);
  }
}
