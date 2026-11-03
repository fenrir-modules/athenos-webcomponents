import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AthIconComponent } from '../icon/icon.component';
import type { AthIconData } from '../floating/icon';

export type { AthIconData } from '../floating/icon';

/** Colour and short text drawn in place of an icon (a project's key). */
export interface AthNavChip {
  text: string;
  color: string;
}

/** A status dot at the row's end (service health, say). */
export type AthNavDot = 'ok' | 'warn' | 'error';

/**
 * Athenos Nav Item: one row of a navigation list (the app sidebar, the
 * settings rail, the admin console).
 *
 * - The single source for hit zone, hover, active, focus and tooltip; no
 *   layout reimplements them.
 * - An `icon` or a `chip` (a project key in the project's colour).
 * - `compact` (a collapsed rail): the label folds away and a CSS tooltip
 *   shows it to the right; an unread `badge` becomes a dot on the icon.
 * - Active: a tinted pill, the accent on the icon, and (with `indicator`)
 *   a 2-px bar at the left edge; matched from `route`, or `current`.
 * - `[athNavItemEnd]`: a projected marker at the row's end (a "Beta" pill),
 *   inside the link and its active pill; it folds away with the label.
 *
 * Layout contract: the row stretches to its parent's width in both modes;
 * the icon sits in a fixed 40-px cell so it keeps its x position while a
 * rail opens, and only the tail (label, badge, dot) collapses.
 *
 * @example
 * <ath-nav-item [icon]="Inbox" label="Inbox" route="/app/inbox" [badge]="3" />
 * <ath-nav-item [chip]="{ text: 'ATL', color: 'var(--blue)' }" label="Atlas" [route]="['/p', id]" />
 * <ath-nav-item [icon]="Sparkles" label="Assistant" route="/ai"><span athNavItemEnd>Beta</span></ath-nav-item>
 */
@Component({
  selector: 'ath-nav-item',
  imports: [RouterLink, RouterLinkActive, AthIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss',
})
export class AthNavItemComponent {
  /** Visible label; also the tooltip and accessible name when compact. */
  readonly label = input.required<string>();
  /** Router target: a path, or link parameters for a parameterised route. */
  readonly route = input<string | readonly unknown[] | null>(null);
  /** Exact match for the active state (default: prefix match, like Angular). */
  readonly exact = input(false);
  /**
   * The active state, set by the caller instead of matched from the URL:
   * for a row whose route forwards elsewhere (Board → Tickets › Kanban)
   * and a row sharing its page with it. `null` (default) matches `route`.
   */
  readonly current = input<boolean | null>(null);
  /** Either an icon or a chip. */
  readonly icon = input<AthIconData | null>(null);
  readonly chip = input<AthNavChip | null>(null);
  /** A count (unread items); nothing below 1. */
  readonly badge = input<number | null>(null);
  readonly dot = input<AthNavDot | null>(null);
  /** A secondary row in a quieter tone ("… All projects"). */
  readonly muted = input(false);
  /** Rail mode: the label folds away, a tooltip shows it. */
  readonly compact = input(false);
  /** The 2-px bar at the left edge of the active row. */
  readonly indicator = input(true);
  /** Tooltip text in compact mode; defaults to the label. */
  readonly tooltip = input<string | null>(null);

  /** Link parameters for `routerLink` (a copy: it takes a mutable array). */
  protected readonly target = computed<unknown[]>(() => {
    const route = this.route() ?? '';
    return typeof route === 'string' ? [route] : [...route];
  });

  protected readonly count = computed(() => {
    const n = this.badge();
    return n !== null && n > 0 ? n : null;
  });

  protected readonly tooltipText = computed(() => {
    if (!this.compact()) return null;
    const text = this.tooltip() ?? this.label();
    const n = this.count();
    return n !== null ? `${text} · ${n}` : text;
  });

  /** Pointer over the row or keyboard focus on it: shows the tooltip. */
  protected readonly active = signal(false);
}
