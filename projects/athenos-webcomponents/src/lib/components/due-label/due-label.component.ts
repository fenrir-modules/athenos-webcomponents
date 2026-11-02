import {
  ChangeDetectionStrategy,
  Component,
  LOCALE_ID,
  computed,
  inject,
  input,
} from '@angular/core';
import { AthIconComponent } from '../icon/icon.component';
import { AlertTriangle, Zap } from 'lucide';
import { formatAthLabel, injectAthLabels } from '../../i18n/labels';
import { ATH_DATE_CONTEXT, type AthDateContext, type DueSource, describeDue } from './due-date';
import { AthToday } from './today';

/**
 * The one way a due date is shown: text, never a pill.
 *
 * One colour rule (tokens `--due-*`): overdue and today red, the next two
 * days amber, later muted; finished work is always muted and shows its
 * plain date. Words: "2 days overdue" ("1 day overdue"), "today",
 * "tomorrow", "in 3 days" up to six days ahead, then the short date. The
 * full date (and time, for a moment) is the tooltip and is read out to
 * screen readers. A sprint-derived date reads "Sprint end · 31 Oct" with a
 * sprint icon; `afterSprintEnd` adds an amber warning.
 *
 * The app provides `ATH_DATE_CONTEXT` (locale, time zone, date format) and
 * the words through `ATH_LABELS`; resolving a ticket's effective date stays
 * in the app.
 *
 * @example
 * <ath-due-label [date]="t.due_date" [done]="closed" />
 * <ath-due-label [date]="sprint.end_date" source="sprint" [sprintName]="sprint.name" />
 * <ath-due-label [date]="t.due_date" [afterSprintEnd]="true" sprintName="Sprint 24" />
 * <ath-due-label [date]="null" placeholder="—" />
 */
@Component({
  selector: 'ath-due-label',
  imports: [AthIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './due-label.component.html',
  styleUrl: './due-label.component.scss',
})
export class AthDueLabelComponent {
  private readonly labels = injectAthLabels();
  private readonly localeId = inject(LOCALE_ID);
  private readonly dateContext = inject(ATH_DATE_CONTEXT, { optional: true });
  private readonly today = inject(AthToday);

  /** ISO date or timestamp; empty shows `placeholder` (or nothing). */
  readonly date = input<string | null | undefined>(null);
  /** Finished work: muted, never "overdue". */
  readonly done = input(false);
  readonly source = input<DueSource>('own');
  readonly sprintName = input<string | null | undefined>(null);
  /** The own date lies after the sprint's end: amber warning icon. */
  readonly afterSprintEnd = input(false);
  /** Text without a date (e.g. "—"); default nothing. */
  readonly placeholder = input<string | null>(null);
  /** Narrow columns: the sprint icon only, "Sprint end" moves to the tooltip. */
  readonly compact = input(false);
  /** Reference time, for stories and tests; default the current day (`AthToday`). */
  readonly now = input<Date | null>(null);

  protected readonly ic = { sprint: Zap, warn: AlertTriangle } as const;

  private readonly ctx = computed<AthDateContext>(() => ({
    locale: this.localeId,
    ...(this.dateContext?.() ?? {}),
  }));

  /** The time now, read fresh; the tick only makes `view` re-run around midnight. */
  private currentTime(): Date {
    this.today.tick();
    return new Date();
  }

  protected readonly view = computed(() =>
    describeDue(
      {
        date: this.date(),
        done: this.done(),
        source: this.source(),
        now: this.now() ?? this.currentTime(),
      },
      {
        overdue: this.labels.dueOverdue(),
        overdueOne: this.labels.dueOverdueOne(),
        today: this.labels.dueToday(),
        tomorrow: this.labels.dueTomorrow(),
        inDays: this.labels.dueInDays(),
      },
      this.ctx()
    )
  );

  protected readonly isSprint = computed(() => this.source() === 'sprint');
  protected readonly sprintEndText = computed(() => this.labels.dueSprintEnd());

  /** "Due Friday 30 October 2026" — the tooltip and the screen-reader text. */
  protected readonly dueOnText = computed(() => {
    const v = this.view();
    return v ? formatAthLabel(this.labels.dueOn(), { date: v.full }) : null;
  });

  /** The full date; a sprint-derived one also names its sprint. */
  protected readonly title = computed(() => {
    const on = this.dueOnText();
    if (!this.isSprint()) return on;
    const sprint = this.sprintName();
    const source = sprint
      ? formatAthLabel(this.labels.dueSprintTooltip(), { sprint })
      : this.sprintEndText();
    return on ? `${source} · ${on}` : source;
  });

  protected readonly showWarn = computed(() => this.afterSprintEnd() && !this.done());
  protected readonly warnText = computed(() => this.labels.dueAfterSprint());
  protected readonly warnTitle = computed(() => {
    const sprint = this.sprintName();
    return sprint ? `${this.warnText()} · ${sprint}` : this.warnText();
  });
}
