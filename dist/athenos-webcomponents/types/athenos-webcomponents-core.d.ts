import * as i0 from "@angular/core";
import { InjectionToken } from "@angular/core";
/**
 * The few words the library itself puts on screen for assistive tech.
 *
 * Defaults are English. An app provides `ATH_LABELS` (anywhere above the
 * components, e.g. its shell) with functions that return the translated
 * text; a component input, where one exists, wins over both.
 */
export interface AthLabels {
  closeDialog: () => string;
  showPassword: () => string;
  hidePassword: () => string;
  breadcrumb: () => string;
  /** `ath-breadcrumb`: the "…" that folds the middle of a long trail. */
  breadcrumbMore: () => string;
  /** The empty seat of `ath-avatar`: nobody is assigned. */
  unassigned: () => string;
  dismiss: () => string;
  retry: () => string;
  loading: () => string;
  /** A chip's remove button; `{name}` is the chip's text. */
  removeItem: () => string;
  /** The "+N" overflow chip; `{count}` is N. */
  moreCount: () => string;
  /** `ath-due-label`: `{count}` days past the date (2 or more). */
  dueOverdue: () => string;
  /** `ath-due-label`: one day past the date; `{count}` is 1. */
  dueOverdueOne: () => string;
  dueToday: () => string;
  dueTomorrow: () => string;
  /** `{count}` days ahead, 2 to 6. */
  dueInDays: () => string;
  /** Tooltip and screen-reader text; `{date}` is the full date (and time, when it has one). */
  dueOn: () => string;
  dueSprintEnd: () => string;
  /** Tooltip of a sprint-derived date; `{sprint}` is the sprint name. */
  dueSprintTooltip: () => string;
  dueAfterSprint: () => string;
  /** Placeholder and accessible name of the listbox search field. */
  listboxSearch: () => string;
  listboxNoMatches: () => string;
  /** The "create" row; `{query}` is the typed text. */
  listboxCreate: () => string;
  /** Heading of ungrouped options when other options are grouped. */
  listboxOtherGroup: () => string;
  /** Picker trigger without a selection. */
  pickerPlaceholder: () => string;
  pickerClear: () => string;
  /** Picker trigger with more than two selected; `{count}` is the number. */
  pickerSelected: () => string;
  /** `ath-search-input` clear button. */
  clearSearch: () => string;
  /** `ath-filter-chip` clear button; `{name}` is the filter's label. */
  clearFilter: () => string;
  /** `ath-sidebar` toggle. */
  sidebarExpand: () => string;
  sidebarCollapse: () => string;
  /** `ath-pagination`. `{page}` is the page number. */
  pageFirst: () => string;
  pagePrevious: () => string;
  pageNext: () => string;
  pageLast: () => string;
  pageNumber: () => string;
  /** Visible words of the cursor pagination. */
  previous: () => string;
  next: () => string;
  /** `ath-copy-button`, `ath-code-block`. */
  copy: () => string;
  copied: () => string;
  copyCode: () => string;
  /** `ath-file-drop` default prompt. */
  fileDropPrompt: () => string;
  /** `ath-user-picker` defaults. */
  userPickerPlaceholder: () => string;
  userPickerSearch: () => string;
  /** `ath-timeline-entry` internal marker (visible word, tooltip). */
  internal: () => string;
  internalNote: () => string;
  /** `ath-tri-state`: the three states of an override. */
  triStateDeny: () => string;
  triStateInherit: () => string;
  triStateAllow: () => string;
  /** `ath-tri-state`: "inherit" with the value it currently inherits. */
  triStateInheritAllowed: () => string;
  triStateInheritDenied: () => string;
  /** `ath-save-bar` defaults. */
  saveBarMessage: () => string;
  saveBarSave: () => string;
  saveBarDiscard: () => string;
  saveBarConfirmDiscard: () => string;
  /** `ath-color-swatch`: the group's default name and each colour's name. */
  colorPicker: () => string;
  colorNeutral: () => string;
  colorBlue: () => string;
  colorGreen: () => string;
  colorAmber: () => string;
  colorRed: () => string;
  colorPurple: () => string;
  colorPink: () => string;
  /** `ath-role-badge` with `locked`: screen-reader text of the lock. */
  roleLocked: () => string;
  /** `ath-select`: the empty first option when no `placeholder` is given. */
  selectPlaceholder: () => string;
  /** `ath-search-input`: the field's placeholder when none is given. */
  searchPlaceholder: () => string;
  /** `ath-toast-container`: a toast's close button; `{message}` is the toast's text. */
  toastDismiss: () => string;
  /** `ath-toast-container`: name of the notifications region (a landmark). */
  toastRegion: () => string;
}
export declare const ATH_DEFAULT_LABELS: AthLabels;
export declare const ATH_LABELS: InjectionToken<Partial<AthLabels>>;
/**
 * The five built-in statuses as the pill's short codes, plus the legacy
 * `closed`. A workspace has its own statuses too (athenos-contracts W4-F):
 * the pill also takes any status key, with its name and tone from the app.
 */
export type TicketStatus = 'open' | 'prog' | 'review' | 'done' | 'blocked' | 'closed';
/**
 * Names a status in the reader's language.
 *
 * The library stays free of any translation framework: the app provides
 * this once at the root, and every pill without an explicit `label` asks
 * it, with the status the pill was given (a short code or any status key).
 * Return `null` to fall back to the English default. A resolver that reads
 * a signal (the current language, the workspace's statuses) keeps OnPush
 * pills current when it changes.
 */
export type StatusLabelResolver = (status: string) => string | null;
export declare const ATH_STATUS_LABELS: InjectionToken<StatusLabelResolver>;
/**
 * The tone of a status's dot: a token of the decorative palette (`neutral`,
 * `blue`, `green`, `amber`, `red`, `purple`, `pink`, as `AthDecoColor`), or
 * `null` for the pill's own colour of a built-in code. Provided once at the
 * root like the labels, so a pill shows a workspace's own colour without
 * every caller passing `[tone]`.
 */
export type StatusToneResolver = (status: string) => string | null;
export declare const ATH_STATUS_TONES: InjectionToken<StatusToneResolver>;
export type TicketPriority = 'low' | 'medium' | 'high' | 'crit';
/** Returns the label for a priority in the app's language, or null for the default. */
export type PriorityLabelResolver = (priority: TicketPriority) => string | null;
/**
 * Optional resolver for priority labels. The app provides it once at the
 * root (with its translations); without it the labels are English.
 */
export declare const ATH_PRIORITY_LABELS: InjectionToken<PriorityLabelResolver>;
/**
 * Toast variant types
 */
export type ToastVariant = 'success' | 'error' | 'warning' | 'info';
/**
 * Toast message
 */
export interface ToastMessage {
  id: string;
  variant: ToastVariant;
  message: string;
  /** Optional headline above the message. */
  title?: string;
  duration?: number;
  action?: ToastAction;
}
/** A quiet text button in the toast ("Öffnen"). Runs, then closes the toast. */
export interface ToastAction {
  label: string;
  run: () => void;
}
/**
 * Second argument of the toast methods: a duration in ms (the old form,
 * still accepted), or options. A toast with an action stays a little
 * longer by default (8s) so there is time to reach the button.
 */
export interface ToastOptions {
  duration?: number;
  action?: ToastAction;
  /** A short headline above the message; the message becomes the detail line. */
  title?: string;
}
/**
 * Toast Service
 *
 * Global notification service for displaying toast messages.
 *
 * A toast's lifetime can stop and go on. `pause(reason)` stops every clock
 * until the same reason is resumed: the container pauses while the pointer
 * or the focus is on a toast and while the page is hidden. `hold(id)` stops
 * one toast's clock, so a toast collapsed behind the visible ones does not
 * run out unseen. A stopped toast keeps the time it had left.
 *
 * The same words again (a retry loop, a double click) are one toast: it
 * moves to the newest place with a fresh clock instead of stacking. A toast
 * with an action is never merged, its action may differ. At most
 * `maxQueued` toasts are kept; past that the oldest goes.
 *
 * @example
 * constructor(private toast: AthToastService) {}
 * this.toast.success('Item created');
 * this.toast.error('Something went wrong');
 * this.toast.info('Timer discarded', { title: 'TEST-1', action: { label: 'Undo', run } });
 */
export declare class AthToastService {
  private readonly toastsSignal;
  readonly toasts: import("@angular/core").Signal<ToastMessage[]>;
  private readonly pausedSignal;
  /** True while at least one `pause(reason)` is in effect. */
  readonly paused: import("@angular/core").Signal<boolean>;
  /** Most toasts kept at once; a new one past it closes the oldest. */
  maxQueued: number;
  private readonly clocks;
  private readonly pauses;
  private readonly holds;
  /** Returns the new toast's id (for `remove`). */
  success(message: string, options?: number | ToastOptions): string;
  error(message: string, options?: number | ToastOptions): string;
  warning(message: string, options?: number | ToastOptions): string;
  info(message: string, options?: number | ToastOptions): string;
  /** Run a toast's action, then close the toast. */
  runAction(id: string): void;
  remove(id: string): void;
  /** Closes every toast. */
  clear(): void;
  /**
   * Stops every toast's clock until `resume(reason)`. Reasons stack: the
   * clocks go on once the last one is resumed.
   */
  pause(reason?: string): void;
  resume(reason?: string): void;
  /** Stops one toast's clock until `release(id)`. */
  hold(id: string): void;
  release(id: string): void;
  /** Whether a toast's clock is running now (false for a toast that stays). */
  isRunning(id: string): boolean;
  /** Milliseconds left on a toast's clock; null for a toast that stays (duration 0) or is gone. */
  remaining(id: string): number | null;
  private add;
  /** An identical toast again: the existing one moves to the newest place, its clock restarted. */
  private repeat;
  private startClock;
  private sync;
  private start;
  private stop;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthToastService, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<any>;
}
/** Short-date order: the locale's own, or one the reader chose. */
export type DueDateFormat = 'auto' | 'dmy' | 'mdy' | 'iso';
/** The reader's date settings. All optional; missing = the browser's. */
export interface AthDateContext {
  /** BCP-47 tag for month names (`auto` format). */
  locale?: string;
  /** IANA zone "today" is computed in. */
  timeZone?: string;
  dateFormat?: DueDateFormat;
  /** 12- or 24-hour clock for a due time; missing = the locale's own. */
  hour12?: boolean;
}
/**
 * The app's date settings for every `ath-due-label`, provided once at the
 * root. A function, so a provider that reads signals (language, the
 * reader's preferences) keeps the labels current.
 *
 * @example
 * { provide: ATH_DATE_CONTEXT, useFactory: () => {
 *     const prefs = inject(UserPreferencesService);
 *     return () => ({ locale: prefs.locale(), timeZone: prefs.timeZone(), dateFormat: prefs.dateFormat() });
 * } }
 */
export declare const ATH_DATE_CONTEXT: InjectionToken<() => AthDateContext>;
/** Turns Markdown into HTML. Its output is sanitized before it is shown. */
export type AthMarkdownParser = (source: string) => string;
/**
 * The app's Markdown parser, provided once at the root so every
 * `<ath-markdown [text]>` renders the same dialect. An explicit `[parse]`
 * input wins.
 */
export declare const ATH_MARKDOWN_PARSER: InjectionToken<AthMarkdownParser>;