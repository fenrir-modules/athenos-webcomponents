import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
  type Signal,
} from '@angular/core';
import { AthIconComponent } from '../icon/icon.component';
import { Lock } from 'lucide';
import { injectAthLabels } from '../../i18n/labels';
import { isAthDecoColor, type AthDecoColor } from '../color-swatch/deco-color';

/** A colour as a team stores it. */
const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;

/** `ath-role-badge` sizes. */
export type RoleBadgeSize = 'sm' | 'md';

/**
 * A workspace role (or team): a dot in its colour and its name. `locked`
 * adds a lock for the fixed roles (Owner, Admin), read out as "Fixed
 * role". The colour is a palette token or a `#RRGGBB` colour (a team's);
 * anything else draws the neutral dot. `accent` draws the whole chip in the
 * accent tint: Owner and Admin, the roles that run a workspace, while every
 * other role (Mitglied) stays neutral (UX tour A-06).
 *
 * @example
 * <ath-role-badge name="Owner" color="accent" />
 * <ath-role-badge name="Developer" color="blue" />
 * <ath-role-badge name="Team Web" color="#2f80ed" size="sm" />
 * <ath-role-badge name="Owner" color="amber" [locked]="true" size="sm" />
 */
@Component({
  selector: 'ath-role-badge',
  imports: [AthIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './role-badge.component.html',
  styleUrl: './role-badge.component.scss',
})
export class AthRoleBadgeComponent {
  private readonly labels = injectAthLabels();

  readonly name = input.required<string>();
  /**
   * A palette token (`AthDecoColor`), `accent` (the accent tint, for Owner
   * and Admin) or `#RRGGBB`; anything else is neutral.
   */
  readonly color = input<string | null | undefined>(null);
  readonly size = input<RoleBadgeSize>('md');
  readonly locked = input(false, { transform: booleanAttribute });

  protected readonly lockIcon = Lock;
  /** `#RRGGBB` (a team's colour) as the dot's colour; `null` for a token. */
  protected readonly hex = computed(() => {
    const color = this.color();
    return typeof color === 'string' && HEX_COLOR.test(color) ? color : null;
  });
  /**
   * The chip's `data-color`. Typed as written so the printed d.ts does not
   * depend on the order the compiler met the union's members in (a clean
   * build and an incremental one printed it differently).
   */
  protected readonly tone: Signal<AthDecoColor | 'accent' | 'custom'> = computed(() => {
    const color = this.color();
    if (this.hex()) return 'custom';
    if (color === 'accent') return 'accent';
    return isAthDecoColor(color) ? color : 'neutral';
  });
  protected readonly lockedText = computed(() => this.labels.roleLocked());
}
