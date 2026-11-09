import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, booleanAttribute, input, output } from '@angular/core';

import { AthIconComponent, type AthIconData } from '../icon/icon.component';
import { AthButtonComponent } from '../button/button.component';

/**
 * A Lucide icon (`import { Inbox } from '@athenos/webcomponents/icons'`).
 * `LucideIconDataLike` stays as the older name of the same type.
 */
export type LucideIconDataLike = AthIconData;
export type EmptyStateIcon = AthIconData;

/** One "what will appear here" row in a compact empty state. */
export interface EmptyStateHint {
  icon?: EmptyStateIcon | null;
  label: string;
  /** Muted one-line explanation under the label. */
  sub?: string;
}

/** `default`: centred block (existing look). `compact`: content-sized, icon tile left. */
export type EmptyStateSize = 'default' | 'compact';

/**
 * Athenos Empty State Component
 *
 * Display when lists or tables have no data.
 *
 * @example
 * <ath-empty-state message="No items found" />
 * <ath-empty-state [icon]="Inbox" message="Nothing here" subMessage="…" />
 *
 * Compact: content-sized, for a panel that should end with its content.
 * <ath-empty-state
 *   size="compact" bare
 *   [icon]="ic.inbox"
 *   message="You're all caught up"
 *   subMessage="Mentions, assignments and replies land here."
 *   actionLabel="Notification settings" (action)="openPrefs()"
 *   [hints]="[{ icon: ic.at, label: 'Mentions', sub: 'When someone @mentions you' }]"
 * />
 */
@Component({
  selector: 'ath-empty-state',
  imports: [NgTemplateOutlet, AthIconComponent, AthButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
})
export class AthEmptyStateComponent {
  /** Empty state message */
  readonly message = input.required<string>();

  /** Optional sub-message */
  readonly subMessage = input('');

  /** Optional lucide icon shown above the message. */
  readonly icon = input<EmptyStateIcon | null>(null);

  /**
   * No frame of its own, for an empty state that already sits inside a
   * panel; the dashed box inside a white panel drew a card in a card.
   */
  readonly bare = input(false, { transform: booleanAttribute });

  /** `compact`: icon tile left, auto height, optional hint rows. */
  readonly size = input<EmptyStateSize>('default');

  /** 2–4 rows describing what will appear here (compact layout). */
  readonly hints = input<readonly EmptyStateHint[]>([]);

  /** Primary action label; emits `action` when clicked. */
  readonly actionLabel = input('');
  readonly actionIcon = input<EmptyStateIcon | null>(null);
  /** Secondary (outline) action label; emits `secondaryAction`. */
  readonly secondaryActionLabel = input('');

  readonly action = output<void>();
  readonly secondaryAction = output<void>();
}
