import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink, type Params } from '@angular/router';
import { AthSkeletonComponent } from '../skeleton/skeleton.component';
import { AthSparklineComponent } from '../sparkline';
import { injectAthLabels } from '../../i18n/labels';

export type KpiDeltaDirection = 'up' | 'down' | 'neutral';

/** Tint of the trend line. */
export type KpiTone = 'neutral' | 'amber' | 'blue' | 'green' | 'red';

/** Colour of the figure itself, from the contrast-safe `--*-text` tokens. */
export type KpiValueTone = 'amber' | 'blue' | 'green' | 'red' | 'purple';

const SPARK_COLOR: Record<KpiTone, string> = {
  neutral: 'var(--fg-3)',
  amber: 'var(--amber)',
  blue: 'var(--blue)',
  green: 'var(--green)',
  red: 'var(--red)',
};

/** A trend worth drawing: two samples or more, and not all zero. */
export function hasKpiTrend(spark: readonly number[] | null | undefined): boolean {
  return !!spark && spark.length >= 2 && spark.some((n) => n !== 0);
}

/**
 * One cell of a KPI strip (`ath-kpi-strip`): label, figure, an optional
 * delta badge, and a trend or a quiet note bottom-right. The tile carries
 * no chrome of its own; the strip draws one card and hairlines between the
 * tiles, so the row reads as one instrument panel.
 *
 * With `link` the whole cell is the hit area (a stretched link on the
 * label), still drawn as part of the strip.
 *
 * Replaces the app's `metric-card` and the lib's former `ath-stat-card`.
 *
 * @example
 * <ath-kpi-strip>
 *   <ath-kpi-tile label="Due today" [value]="1" [alert]="true" delta="+1" deltaDirection="down"
 *                 deltaTitle="1 overdue" />
 *   <ath-kpi-tile label="This week" [value]="3" tone="blue" [spark]="[1,2,2,3,2,4,3]" />
 *   <ath-kpi-tile label="Story points" [value]="24" note="3 done" />
 *   <ath-kpi-tile label="In review" [value]="2" link="/app/tickets" [linkParams]="{ status: 'review' }"
 *                 linkLabel="Show in-review tickets" />
 *   <ath-kpi-tile label="In progress" [value]="4" valueTone="amber" dot="var(--amber)" />
 *   <ath-kpi-tile label="Progress" value="62%"><my-progress-bar /></ath-kpi-tile>
 * </ath-kpi-strip>
 *
 * Projected content sits under the figure (a progress bar, a short line).
 */
@Component({
  selector: 'ath-kpi-tile',
  imports: [RouterLink, AthSkeletonComponent, AthSparklineComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-tone]': 'tone()',
    '[class.ath-kpi--link]': 'link() !== null',
  },
  templateUrl: './kpi-tile.component.html',
  styleUrl: './kpi-tile.component.scss',
})
export class AthKpiTileComponent {
  private readonly labels = injectAthLabels();

  readonly label = input.required<string>();
  /** The figure; `null` (or `undefined`): still loading, drawn as a 48 × 22 skeleton. */
  readonly value = input<number | string | null | undefined>(0);

  /** Pre-formatted delta ("+1", "−2"); `null` hides the badge. */
  readonly delta = input<string | null | undefined>(null);
  readonly deltaDirection = input<KpiDeltaDirection | null | undefined>(null);
  /** Long form of a compact delta ("+1" → "1 overdue"): tooltip and accessible name. */
  readonly deltaTitle = input<string | null | undefined>(null);

  /** Tints the trend line. */
  readonly tone = input<KpiTone>('neutral');
  /** Trend samples; fewer than two, or all zero, draw nothing. */
  readonly spark = input<readonly number[] | null | undefined>(null);
  /** Overrides the tone's trend colour. */
  readonly sparkColor = input<string | null>(null);

  /**
   * A small quiet note under the figure ("3 done"), drawn instead of a
   * trend; one line, ending in an ellipsis when the tile is narrow (the
   * full text is the tooltip unless `noteTitle` says more).
   */
  readonly note = input<string | null | undefined>(null);
  readonly noteTitle = input<string | null | undefined>(null);

  /** The figure in red: something needs attention now. */
  readonly alert = input(false);
  /**
   * The figure in a status colour (`--amber-text`, `--blue-text` …), e.g. a
   * count of tickets in a status. `alert` and `muted` win over it.
   */
  readonly valueTone = input<KpiValueTone | null | undefined>(null);
  /** A small dot in this CSS colour before the label (a status key). */
  readonly dot = input<string | null | undefined>(null);
  /** Nothing to count: a quiet figure (pass "–" for a zero), no trend. */
  readonly muted = input(false);

  /** Where the tile leads (router link). */
  readonly link = input<string | readonly unknown[] | null>(null);
  readonly linkParams = input<Params | null>(null);
  /** Accessible name of the link; defaults to the label. */
  readonly linkLabel = input<string | null>(null);

  protected readonly loading = computed(() => this.value() == null);
  protected readonly loadingLabel = computed(() => this.labels.loading());
  protected readonly samples = computed(() => this.spark() ?? null);
  protected readonly showTrend = computed(
    () => !this.muted() && !this.loading() && hasKpiTrend(this.samples())
  );
  protected readonly trendColor = computed(() => this.sparkColor() ?? SPARK_COLOR[this.tone()]);
  protected readonly routerLink = computed(() => this.link() as string | unknown[]);
  /** `alert` and `muted` say more than a status colour, so they win. */
  protected readonly figureTone = computed(() =>
    this.alert() || this.muted() ? null : (this.valueTone() ?? null)
  );
}

/**
 * The card around a row of `ath-kpi-tile`s: one border, radius and shadow,
 * hairlines between the tiles, `columns` equal columns (default: one per
 * tile up to 4); two columns when the strip is narrower than 920px.
 *
 * @example
 * <ath-kpi-strip [columns]="4"> <ath-kpi-tile … /> … </ath-kpi-strip>
 */
@Component({
  selector: 'ath-kpi-strip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'group' },
  template: `<div class="ath-kpi-strip" [style.--_kpi-cols]="columns()"><ng-content /></div>`,
  styleUrl: './kpi-strip.component.scss',
})
export class AthKpiStripComponent {
  /** Number of columns on wide screens. */
  readonly columns = input(4);
}
