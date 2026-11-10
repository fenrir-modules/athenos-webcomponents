import * as i0 from "@angular/core";
import { AfterViewInit, ElementRef, InjectionToken, OnChanges, OnDestroy, Signal, SimpleChanges, TemplateRef } from "@angular/core";
import { LucideIconData } from "@lucide/angular";
import { IconNode } from "lucide";
import { ATH_DATE_CONTEXT, ATH_DEFAULT_LABELS, ATH_LABELS, ATH_MARKDOWN_PARSER, ATH_PRIORITY_LABELS, ATH_STATUS_LABELS, ATH_STATUS_TONES, AthDateContext, AthDateContext as AthDateContext$1, AthLabels, AthLabels as AthLabels$1, AthMarkdownParser, AthMarkdownParser as AthMarkdownParser$1, AthToastService, AthToastService as AthToastService$1, DueDateFormat, PriorityLabelResolver, StatusLabelResolver, StatusToneResolver, TicketPriority, TicketPriority as TicketPriority$1, TicketStatus, TicketStatus as TicketStatus$1, ToastAction, ToastMessage, ToastMessage as ToastMessage$1, ToastOptions, ToastVariant, ToastVariant as ToastVariant$1 } from "@athenos/webcomponents/core";
import { Params } from "@angular/router";
import { Observable } from "rxjs";
import { ControlValueAccessor } from "@angular/forms";
/** Heading level of the page head's title. */
export type PageHeaderLevel = 1 | 2;
/**
 * The page head every app page uses: H1, one muted meta line, actions on
 * the right, a hairline underneath. The breadcrumb lives in the shell's
 * topbar, so this component starts at the page gutter like every other.
 *
 * - Meta: `subItems` strings render with `·` separators. Anything richer
 *   (a health pill, an avatar) goes in an `[athPageMeta]` child, which
 *   continues the same line.
 * - Leading: an `[athPageLeading]` child (e.g. a project key tile) sits
 *   left of the title block.
 * - Actions: default content. At most one primary; the topbar's "New" is
 *   already the view's primary on most pages.
 * - `divider`: the hairline. Turn it off only when the next element draws
 *   its own rule directly under the head (an underline tab bar).
 * - Height: a page head (level 1) is one height whatever it holds — the
 *   meta line keeps its room while it is empty or still loading, so a late
 *   meta never pushes the page down. `loading` draws title and meta as
 *   skeleton bars. A section head (level 2) folds an empty meta line.
 *
 * @example
 * <ath-page-header title="Tickets" [subItems]="['12 of 45', 'across 6 projects']">
 *   <ath-button variant="secondary" size="sm">Filter</ath-button>
 * </ath-page-header>
 */
export declare class AthPageHeaderComponent {
  /** Page title. */
  readonly title: import("@angular/core").InputSignal<string>;
  /** Multi-segment sub-row, rendered with bullet (•) separators. */
  readonly subItems: import("@angular/core").InputSignal<string[]>;
  /** Legacy free-form description (single paragraph). Falls back if subItems empty. */
  readonly description: import("@angular/core").InputSignal<string>;
  /** Hairline under the head. On by default: it is part of the contract. */
  readonly divider: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /**
   * Heading level of the title. 1 for a page; 2 for a section head inside a
   * page that already has its h1 (the settings sub-pages under "Settings").
   */
  readonly level: import("@angular/core").InputSignal<PageHeaderLevel>;
  /**
   * The page's object is still loading (a project, a doc): the title and
   * the meta line draw as skeleton bars of their final height, so the head
   * stands from the first frame and nothing below it moves when the data
   * arrives. Actions and leading content still render.
   */
  readonly loading: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /**
   * The sub-items worth separating.
   *
   * Callers build this array inline from conditionals, so a fact that
   * does not apply arrives as `''` rather than being left out — and a
   * blank segment still earned its bullet, leaving headers reading
   * "All open tickets ·" with nothing after the separator.
   */
  protected readonly visibleSubItems: import("@angular/core").Signal<string[]>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthPageHeaderComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthPageHeaderComponent, "ath-page-header", never, {
    "title": {
      "alias": "title";
      "required": true;
      "isSignal": true;
    };
    "subItems": {
      "alias": "subItems";
      "required": false;
      "isSignal": true;
    };
    "description": {
      "alias": "description";
      "required": false;
      "isSignal": true;
    };
    "divider": {
      "alias": "divider";
      "required": false;
      "isSignal": true;
    };
    "level": {
      "alias": "level";
      "required": false;
      "isSignal": true;
    };
    "loading": {
      "alias": "loading";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, ["[athPageLeading]", "[athPageMeta]", "*"], true, never>;
}
/**
 * Athenos Sidebar Component
 *
 * Navigation sidebar for admin and app layouts.
 *
 * @example
 * <ath-sidebar [collapsed]="isCollapsed" (collapsedChange)="isCollapsed = $event">
 *   <div slot="header">Logo</div>
 *   <ath-nav-item [icon]="Home" label="Home" route="/home" [compact]="isCollapsed" />
 *   <div slot="footer">User info</div>
 * </ath-sidebar>
 */
export declare class AthSidebarComponent {
  protected readonly labels: Readonly<import("@athenos/webcomponents").AthLabels>;
  /** Collapsed state. Two-way: `[(collapsed)]` (`collapsedChange`). */
  readonly collapsed: import("@angular/core").ModelSignal<boolean>;
  protected readonly collapseIcon: import("lucide").IconNode;
  protected readonly expandIcon: import("lucide").IconNode;
  protected readonly sidebarClasses: import("@angular/core").Signal<string>;
  toggleCollapse(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthSidebarComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthSidebarComponent, "ath-sidebar", never, {
    "collapsed": {
      "alias": "collapsed";
      "required": false;
      "isSignal": true;
    };
  }, {
    "collapsed": "collapsedChange";
  }, never, ["[slot=header]", "*", "[slot=footer]"], true, never>;
}
/**
 * A Lucide icon: the plain data from `@athenos/webcomponents/icons`
 * (`import { Users } from '@athenos/webcomponents/icons'`), or a named icon
 * object of your own (`{ name, node }`, the `name` becomes the svg's
 * `lucide-<name>` class).
 */
export type AthIconData = IconNode | LucideIconData;
/**
 * Draws a Lucide icon (quality package W4-A, successor of `lucide-angular`'s
 * `<ath-icon>`, which allows Angular up to 21 only and is deprecated).
 *
 * Same shape as before: an inline `<ath-icon>` host with the `<svg>` inside,
 * so styles on the host, toggled host classes, `role`, `aria-label` and
 * `title` keep working. The inputs are the old ones (`img`, `size`,
 * `strokeWidth`, `color`, `absoluteStrokeWidth`); `class` goes to the svg as
 * well. The svg is drawn by `@lucide/angular`'s `LucideDynamicIcon` and is
 * `aria-hidden`; name the host when the icon carries meaning.
 *
 * The per-icon components of `@lucide/angular` are not used: each carries
 * its own copy of the icon template, 2–3 kB per icon in a bundle.
 */
export declare class AthIconComponent {
  readonly img: import("@angular/core").InputSignal<AthIconData>;
  /** Width and height in px (default 24). */
  readonly size: import("@angular/core").InputSignal<string | number | null>;
  /** Default 2; the library's reset draws 2 at `--icon-stroke`. */
  readonly strokeWidth: import("@angular/core").InputSignal<string | number | null>;
  /** Stroke colour (default `currentColor`). */
  readonly color: import("@angular/core").InputSignal<string | null>;
  readonly absoluteStrokeWidth: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Classes for the svg too (the host keeps its own `class` attribute). */
  readonly class: import("@angular/core").InputSignal<string | null>;
  protected readonly data: import("@angular/core").Signal<LucideIconData>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthIconComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthIconComponent, "ath-icon", never, {
    "img": {
      "alias": "img";
      "required": true;
      "isSignal": true;
    };
    "size": {
      "alias": "size";
      "required": false;
      "isSignal": true;
    };
    "strokeWidth": {
      "alias": "strokeWidth";
      "required": false;
      "isSignal": true;
    };
    "color": {
      "alias": "color";
      "required": false;
      "isSignal": true;
    };
    "absoluteStrokeWidth": {
      "alias": "absoluteStrokeWidth";
      "required": false;
      "isSignal": true;
    };
    "class": {
      "alias": "class";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, never, true, never>;
}
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
export declare class AthNavItemComponent {
  /** Visible label; also the tooltip and accessible name when compact. */
  readonly label: import("@angular/core").InputSignal<string>;
  /** Router target: a path, or link parameters for a parameterised route. */
  readonly route: import("@angular/core").InputSignal<string | readonly unknown[] | null>;
  /** Exact match for the active state (default: prefix match, like Angular). */
  readonly exact: import("@angular/core").InputSignal<boolean>;
  /**
   * The active state, set by the caller instead of matched from the URL:
   * for a row whose route forwards elsewhere (Board → Tickets › Kanban)
   * and a row sharing its page with it. `null` (default) matches `route`.
   */
  readonly current: import("@angular/core").InputSignal<boolean | null>;
  /** Either an icon or a chip. */
  readonly icon: import("@angular/core").InputSignal<AthIconData | null>;
  readonly chip: import("@angular/core").InputSignal<AthNavChip | null>;
  /** A count (unread items); nothing below 1. */
  readonly badge: import("@angular/core").InputSignal<number | null>;
  readonly dot: import("@angular/core").InputSignal<AthNavDot | null>;
  /** A secondary row in a quieter tone ("… All projects"). */
  readonly muted: import("@angular/core").InputSignal<boolean>;
  /** Rail mode: the label folds away, a tooltip shows it. */
  readonly compact: import("@angular/core").InputSignal<boolean>;
  /** The 2-px bar at the left edge of the active row. */
  readonly indicator: import("@angular/core").InputSignal<boolean>;
  /** Tooltip text in compact mode; defaults to the label. */
  readonly tooltip: import("@angular/core").InputSignal<string | null>;
  /** Link parameters for `routerLink` (a copy: it takes a mutable array). */
  protected readonly target: import("@angular/core").Signal<unknown[]>;
  protected readonly count: import("@angular/core").Signal<number | null>;
  protected readonly tooltipText: import("@angular/core").Signal<string | null>;
  /** Pointer over the row or keyboard focus on it: shows the tooltip. */
  protected readonly active: import("@angular/core").WritableSignal<boolean>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthNavItemComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthNavItemComponent, "ath-nav-item", never, {
    "label": {
      "alias": "label";
      "required": true;
      "isSignal": true;
    };
    "route": {
      "alias": "route";
      "required": false;
      "isSignal": true;
    };
    "exact": {
      "alias": "exact";
      "required": false;
      "isSignal": true;
    };
    "current": {
      "alias": "current";
      "required": false;
      "isSignal": true;
    };
    "icon": {
      "alias": "icon";
      "required": false;
      "isSignal": true;
    };
    "chip": {
      "alias": "chip";
      "required": false;
      "isSignal": true;
    };
    "badge": {
      "alias": "badge";
      "required": false;
      "isSignal": true;
    };
    "dot": {
      "alias": "dot";
      "required": false;
      "isSignal": true;
    };
    "muted": {
      "alias": "muted";
      "required": false;
      "isSignal": true;
    };
    "compact": {
      "alias": "compact";
      "required": false;
      "isSignal": true;
    };
    "indicator": {
      "alias": "indicator";
      "required": false;
      "isSignal": true;
    };
    "tooltip": {
      "alias": "tooltip";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, ["[athNavItemEnd]"], true, never>;
}
/**
 * Which edge of the anchor a floating panel lines up with (`start` follows
 * `dir`); `center` centres the panel on the anchor (a toolbar over a text
 * selection).
 */
export type FloatingAlign = 'start' | 'end' | 'auto' | 'center';
/**
 * A rectangle to hang a panel from instead of an element: a caret, a text
 * selection, the spot the pointer rests on. `getBoundingClientRect()` is read
 * on every placement, so a live rectangle keeps the panel in place while
 * things scroll.
 */
export interface FloatingVirtualAnchor {
  getBoundingClientRect(): DOMRect | DOMRectReadOnly;
  /**
   * The element the rectangle belongs to (the editor, the row): its size
   * changes re-place the panel, its `dir` decides `start`/`end`, and its
   * removal from the document stops placing.
   */
  readonly contextElement?: Element | null;
}
/** What `floatPanel` can hang a panel from. */
export type FloatingTarget = Element | FloatingVirtualAnchor;
/** Whether `target` is a virtual anchor rather than an element. */
export declare function isVirtualAnchor(target: unknown): target is FloatingVirtualAnchor;
/** The side of the anchor a panel prefers; it flips when the other side has more room. */
export type FloatingSide = 'bottom' | 'top';
export interface FloatingOptions {
  align?: FloatingAlign;
  /**
   * Preferred side; default `bottom`. `left` / `right` (tooltips) hang the
   * panel beside the anchor, centred on it and flipped to the other side
   * when that has more room; `align`, `matchWidth`, `maxHeight` and `arrow`
   * do not apply there.
   */
  side?: FloatingSide | 'left' | 'right';
  /** Gap between anchor and panel, in px. Default 4. */
  offset?: number;
  /** At least as wide as the anchor. */
  matchWidth?: boolean;
  /** Upper bound for the panel's height in px; the viewport caps it anyway. */
  maxHeight?: number | null;
  /**
   * Promote the panel into the browser's top layer (`popover="manual"`), so no
   * ancestor's `overflow`, `transform` or `z-index` can clip or cover it. Default
   * true; without Popover API support the panel stays `position: fixed` with
   * `z-index: var(--z-popover)`.
   */
  topLayer?: boolean;
  /** An arrow element inside the panel; its `left` is set to point at the anchor's centre. */
  arrow?: HTMLElement | null;
}
/** Stops following when called; `update()` re-measures right away. */
export interface FloatingCleanup {
  (): void;
  update(): void;
}
/**
 * The one positioning engine of the library (menus, listboxes, popovers,
 * pickers; the `athFloating` directive wraps it).
 *
 * Pins `panel` to `anchor` (an element, or a `FloatingVirtualAnchor` such as
 * a caret rectangle) and keeps it inside the viewport: on the preferred
 * side when it fits, on the other side when that has more room, shifted
 * sideways to stay on screen, height-capped (scrolling inside) when neither
 * side has room for all of it. Follows scrolls in any container, viewport
 * resizes, and size changes of the panel and the anchor.
 *
 * The panel stays where the template rendered it (focus order, event
 * bubbling and "click outside" checks keep working). It is promoted into the
 * top layer, or, without Popover API support, made `position: fixed` with a
 * correction for transformed ancestors that would otherwise move a fixed box.
 *
 * Writes `data-placement="bottom|top"` (`left|right` for a side panel) on the
 * panel for side-dependent styles.
 */
export declare function floatPanel(panel: HTMLElement, anchor: FloatingTarget, options?: FloatingOptions): FloatingCleanup;
/** Whether this browser has the Popover API (top layer for non-modal panels). */
export declare function supportsTopLayer(): boolean;
/** @internal Installs the reset once; used by `floatPanel` and `AthOverlayStack`. */
export declare function installTopLayerStyles(): void;
/**
 * An anchor given as an element, an `ElementRef` (a template ref of a
 * component) or a `FloatingVirtualAnchor` (a caret or pointer rectangle).
 */
export type FloatingAnchor = HTMLElement | ElementRef<HTMLElement> | FloatingVirtualAnchor | null | undefined;
/**
 * The element behind an anchor: itself, or a virtual anchor's
 * `contextElement` (focus return, outside clicks, `aria-*`).
 */
export declare function resolveAnchor(anchor: FloatingAnchor): HTMLElement | null;
/** What a panel is placed against: the element, or the virtual anchor itself. */
export declare function resolveFloatingTarget(anchor: FloatingAnchor): HTMLElement | FloatingVirtualAnchor | null;
/**
 * Hangs the host element from an anchor with `floatPanel`: top layer (so no
 * `overflow`, `transform` or `z-index` of a container can clip or cover it),
 * kept inside the viewport (flip, shift, height cap), following scrolls,
 * resizes and size changes. The host stays where the template puts it.
 *
 * The only positioning logic of the library; `ath-popover`, `ath-menu` and
 * `ath-option-picker` use it, and app code that needs a bare floating panel
 * uses it instead of measuring rectangles itself.
 *
 * @example
 * @if (open()) {
 *   <div class="menu" [athFloating]="trigger" align="end">…</div>
 * }
 */
export declare class AthFloatingDirective implements AfterViewInit, OnChanges, OnDestroy {
  /** The element (or virtual anchor) the panel hangs from. */
  readonly anchor: import("@angular/core").InputSignal<FloatingAnchor>;
  /**
   * `start`: start edges line up; `end`: end edges; `auto`: start unless it
   * overflows; `center`: centred on the anchor.
   */
  readonly align: import("@angular/core").InputSignal<FloatingAlign>;
  /** Preferred side; flips when the other side has more room. */
  readonly side: import("@angular/core").InputSignal<FloatingSide>;
  /** Gap between anchor and panel, in px. */
  readonly offset: import("@angular/core").InputSignal<number>;
  /** At least as wide as the anchor (selects, comboboxes). */
  readonly matchWidth: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Upper bound for the height in px (the viewport caps it anyway). */
  readonly maxHeight: import("@angular/core").InputSignal<number | null>;
  /** Promote into the top layer (default). `false` keeps `position: fixed` + `--z-popover`. */
  readonly topLayer: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** An arrow element inside the panel, kept pointing at the anchor's centre. */
  readonly arrow: import("@angular/core").InputSignal<HTMLElement | null>;
  private readonly el;
  private cleanup;
  private viewReady;
  ngAfterViewInit(): void;
  ngOnChanges(): void;
  ngOnDestroy(): void;
  /** Re-measures now (after a content change the ResizeObserver cannot see). */
  update(): void;
  private attach;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthFloatingDirective, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<AthFloatingDirective, "[athFloating]", ["athFloating"], {
    "anchor": {
      "alias": "athFloating";
      "required": true;
      "isSignal": true;
    };
    "align": {
      "alias": "align";
      "required": false;
      "isSignal": true;
    };
    "side": {
      "alias": "side";
      "required": false;
      "isSignal": true;
    };
    "offset": {
      "alias": "offset";
      "required": false;
      "isSignal": true;
    };
    "matchWidth": {
      "alias": "matchWidth";
      "required": false;
      "isSignal": true;
    };
    "maxHeight": {
      "alias": "maxHeight";
      "required": false;
      "isSignal": true;
    };
    "topLayer": {
      "alias": "topLayer";
      "required": false;
      "isSignal": true;
    };
    "arrow": {
      "alias": "arrow";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, never, true, never>;
}
/** Why an overlay closed. */
export type AthOverlayCloseReason = 'escape' | 'outside' | 'select' | 'tab' | 'programmatic';
/** What an open overlay tells the stack about itself. */
export interface AthOverlayEntry {
  /** The overlay's box; clicks inside it are not "outside". */
  panel(): HTMLElement | null;
  /** The trigger or anchor; clicks on it are left to its own toggle. */
  anchor(): HTMLElement | null;
  /** Modal overlays (dialogs) stop outside-click handling for everything below them. */
  readonly modal?: boolean;
  closeOnEscape(): boolean;
  closeOnOutsideClick(): boolean;
  dismiss(reason: 'escape' | 'outside'): void;
}
/**
 * The open overlays (popovers, menus, pickers, dialogs) in opening order.
 * One document listener each for Escape and outside pointer-downs, so only
 * the topmost overlay reacts to Escape and a click inside a nested overlay
 * does not close its parent. Also owns the page scroll lock of modal dialogs.
 */
export declare class AthOverlayStack {
  private readonly doc;
  private readonly entries;
  private listening;
  private escapeTask;
  private locks;
  private savedScroll;
  /** Registers an overlay as the new topmost one. */
  open(entry: AthOverlayEntry): void;
  /** Unregisters an overlay (idempotent). */
  close(entry: AthOverlayEntry): void;
  isTop(entry: AthOverlayEntry): boolean;
  /** How many overlays are open. */
  get size(): number;
  /**
   * True while the current Escape key press has already closed an overlay.
   * A native modal `<dialog>` checks this in its `cancel` event, which the
   * browser fires after the keydown, so one press closes one layer.
   */
  escapeConsumed(): boolean;
  /**
   * A modal dialog that opens goes on top of the top layer. Elements marked
   * `data-ath-top-layer` (the toast container) are moved back above it, so a
   * toast raised while a dialog is open is still seen.
   */
  raiseTopLayer(): void;
  /** Locks page scrolling while at least one lock is held (modal dialogs). */
  lockScroll(): void;
  unlockScroll(): void;
  private remove;
  private readonly onKeydown;
  private readonly onPointerDown;
  private markEscape;
  /**
   * Registered only while an overlay is open. No `NgZone`: in a zone.js app
   * the listeners run in the Angular zone like any template listener, so a
   * dismissal's handlers (the overlay's `closed`, the app's reaction) are
   * followed by change detection; zoneless, the signals and output
   * listeners they touch schedule it.
   */
  private listen;
  private unlisten;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthOverlayStack, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<any>;
}
/** Panel width: `sm` 220px, `md` 280px (default), `lg` 360px, `auto` fits the content. */
export type PopoverSize = 'sm' | 'md' | 'lg' | 'auto';
/** Inner padding of the panel. */
export type PopoverPadding = 'md' | 'sm' | 'none';
/** Where focus goes when the panel opens. */
export type PopoverAutoFocus = 'first' | 'panel' | 'none';
/** ARIA role of the panel; `null` for a bare container (the content brings its own role). */
export type PopoverRole = 'dialog' | 'menu' | 'listbox' | null;
/**
 * Lazy panel content: rendered only while the popover is open.
 *
 * @example
 * <ath-popover>
 *   <ng-template athPopoverContent>…</ng-template>
 * </ath-popover>
 */
export declare class AthPopoverContentDirective {
  readonly template: TemplateRef<any>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthPopoverContentDirective, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<AthPopoverContentDirective, "ng-template[athPopoverContent]", never, {}, {}, never, never, true, never>;
}
/**
 * Athenos Popover
 *
 * An anchored panel in the top layer: no container's overflow or z-index
 * clips it. Opens from `athPopoverTrigger`, `show()` or `[(open)]`; closes on
 * Escape (topmost overlay only), outside click and Tab-out, and returns focus
 * to the trigger. `role="dialog"` by default; `trapFocus` keeps Tab inside.
 *
 * @example
 * <ath-button [athPopoverTrigger]="info">Details</ath-button>
 * <ath-popover #info ariaLabel="Details" arrow>
 *   <p>Content</p>
 * </ath-popover>
 */
export declare class AthPopoverComponent implements OnChanges, OnDestroy {
  private readonly stack;
  /** Whether the panel is shown. Two-way: `[(open)]`. */
  readonly open: import("@angular/core").ModelSignal<boolean>;
  /**
   * The element the panel hangs from (a trigger directive sets it on its
   * own), or a `FloatingVirtualAnchor` such as the spot the pointer rests on;
   * its `contextElement` then counts as the trigger.
   */
  readonly anchor: import("@angular/core").InputSignal<FloatingAnchor>;
  readonly size: import("@angular/core").InputSignal<PopoverSize>;
  readonly padding: import("@angular/core").InputSignal<PopoverPadding>;
  readonly align: import("@angular/core").InputSignal<FloatingAlign>;
  readonly side: import("@angular/core").InputSignal<FloatingSide>;
  /** Gap to the anchor in px. */
  readonly offset: import("@angular/core").InputSignal<number>;
  readonly matchWidth: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Upper bound for the height in px (the viewport caps it anyway). */
  readonly maxHeight: import("@angular/core").InputSignal<number | null>;
  /** Show an arrow pointing at the anchor. */
  readonly arrow: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Keep Tab inside the panel (modal-like content); otherwise Tab out closes it. */
  readonly trapFocus: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  readonly autoFocus: import("@angular/core").InputSignal<PopoverAutoFocus>;
  /** Return focus to the trigger on Escape / selection / programmatic close. */
  readonly restoreFocus: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  readonly closeOnEscape: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  readonly closeOnOutsideClick: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  readonly panelRole: import("@angular/core").InputSignal<PopoverRole>;
  readonly ariaLabel: import("@angular/core").InputSignal<string | null>;
  readonly ariaLabelledby: import("@angular/core").InputSignal<string | null>;
  /** Extra classes on the panel (it lives in this component's view). */
  readonly panelClass: import("@angular/core").InputSignal<string>;
  readonly opened: import("@angular/core").OutputEmitterRef<void>;
  readonly closed: import("@angular/core").OutputEmitterRef<AthOverlayCloseReason>;
  /** Id of the panel, for `aria-controls`. */
  readonly panelId: import("@angular/core").InputSignal<string>;
  protected readonly lazyContent: Signal<AthPopoverContentDirective | undefined>;
  private readonly panelRef;
  private readonly triggerAnchor;
  /** The element the panel currently hangs from. */
  readonly anchorElement: Signal<HTMLElement | null>;
  /** What the panel is placed against: the anchor input (element or virtual) or the trigger. */
  protected readonly floatTarget: Signal<HTMLElement | FloatingVirtualAnchor | null>;
  protected readonly panelClasses: Signal<string>;
  private registered;
  private returnFocus;
  /** Work waiting for the open panel to render (see `whenPanelReady`). */
  private panelJobs;
  private readonly entry;
  /** The panel element while open. */
  get panel(): HTMLElement | null;
  constructor();
  /**
   * Runs `fn` once the open panel is rendered and placed (`athFloating`
   * places it when it is created); right away when it already is. Dropped
   * when the popover closes first. For `ath-menu` and `ath-option-picker`.
   */
  whenPanelReady(fn: () => void): void;
  ngOnChanges(changes: SimpleChanges): void;
  ngOnDestroy(): void;
  /** Opens the panel, optionally hanging it from `anchor`. */
  show(anchor?: HTMLElement | null): void;
  /**
   * Closes the panel. `restore` overrides whether focus goes back to the
   * trigger (default: yes when focus was inside or the user pressed Escape).
   */
  hide(reason?: AthOverlayCloseReason, restore?: boolean): void;
  toggle(anchor?: HTMLElement | null): void;
  /** Moves focus into the panel according to `autoFocus` (or `mode`). */
  focusPanel(mode?: PopoverAutoFocus): void;
  protected onKeydown(event: KeyboardEvent): void;
  protected onFocusOut(event: FocusEvent): void;
  private afterOpen;
  private runPanelJobs;
  private afterClose;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthPopoverComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthPopoverComponent, "ath-popover", ["athPopover"], {
    "open": {
      "alias": "open";
      "required": false;
      "isSignal": true;
    };
    "anchor": {
      "alias": "anchor";
      "required": false;
      "isSignal": true;
    };
    "size": {
      "alias": "size";
      "required": false;
      "isSignal": true;
    };
    "padding": {
      "alias": "padding";
      "required": false;
      "isSignal": true;
    };
    "align": {
      "alias": "align";
      "required": false;
      "isSignal": true;
    };
    "side": {
      "alias": "side";
      "required": false;
      "isSignal": true;
    };
    "offset": {
      "alias": "offset";
      "required": false;
      "isSignal": true;
    };
    "matchWidth": {
      "alias": "matchWidth";
      "required": false;
      "isSignal": true;
    };
    "maxHeight": {
      "alias": "maxHeight";
      "required": false;
      "isSignal": true;
    };
    "arrow": {
      "alias": "arrow";
      "required": false;
      "isSignal": true;
    };
    "trapFocus": {
      "alias": "trapFocus";
      "required": false;
      "isSignal": true;
    };
    "autoFocus": {
      "alias": "autoFocus";
      "required": false;
      "isSignal": true;
    };
    "restoreFocus": {
      "alias": "restoreFocus";
      "required": false;
      "isSignal": true;
    };
    "closeOnEscape": {
      "alias": "closeOnEscape";
      "required": false;
      "isSignal": true;
    };
    "closeOnOutsideClick": {
      "alias": "closeOnOutsideClick";
      "required": false;
      "isSignal": true;
    };
    "panelRole": {
      "alias": "panelRole";
      "required": false;
      "isSignal": true;
    };
    "ariaLabel": {
      "alias": "ariaLabel";
      "required": false;
      "isSignal": true;
    };
    "ariaLabelledby": {
      "alias": "ariaLabelledby";
      "required": false;
      "isSignal": true;
    };
    "panelClass": {
      "alias": "panelClass";
      "required": false;
      "isSignal": true;
    };
    "panelId": {
      "alias": "panelId";
      "required": false;
      "isSignal": true;
    };
  }, {
    "open": "openChange";
    "opened": "opened";
    "closed": "closed";
  }, ["lazyContent"], ["*"], true, never>;
}
/** What a menu item needs from its menu (breaks the import cycle menu ↔ item). */
interface AthMenuParent {
  itemActivated(item: {
    keepOpen(): boolean;
  }): void;
  isOpen(): boolean;
}
declare const ATH_MENU_PARENT: InjectionToken<AthMenuParent>;
/**
 * Which item gets focus when the menu opens. `'first'` is the current item
 * instead when the menu picks a value (an item with `[selected]="true"`).
 */
export type MenuFocus = 'first' | 'last' | 'none';
/**
 * Athenos Menu: the WAI-ARIA menu button pattern for row actions, `⋯` menus
 * and toolbars.
 *
 * Keyboard: on the trigger Enter, Space and ArrowDown open on the first
 * item, ArrowUp on the last. In the menu: ArrowDown/ArrowUp (wrapping),
 * Home/End, typeahead, Enter/Space activate, Escape closes and returns
 * focus to the trigger, Tab closes and moves on.
 *
 * Items in `<ng-template athPopoverContent>` are built only while the menu
 * is open (a menu per table row costs nothing until it is used).
 *
 * @example
 * <ath-button variant="ghost" [athMenuTrigger]="rowMenu" ariaLabel="Actions">⋯</ath-button>
 * <ath-menu #rowMenu>
 *   <button athMenuItem [icon]="Pencil" shortcut="E" (triggered)="edit()">Edit</button>
 *   <ath-menu-separator />
 *   <button athMenuItem variant="danger" (triggered)="remove()">Delete</button>
 * </ath-menu>
 */
export declare class AthMenuComponent implements AthMenuParent {
  /** Whether the menu is shown. Two-way: `[(open)]`. */
  readonly open: import("@angular/core").ModelSignal<boolean>;
  /** Anchor for programmatic use; `athMenuTrigger` sets it on its own. */
  readonly anchor: import("@angular/core").InputSignal<FloatingAnchor>;
  readonly align: import("@angular/core").InputSignal<FloatingAlign>;
  readonly side: import("@angular/core").InputSignal<FloatingSide>;
  readonly maxHeight: import("@angular/core").InputSignal<number | null>;
  /** Accessible name; by default the menu is labelled by its trigger. */
  readonly ariaLabel: import("@angular/core").InputSignal<string | null>;
  readonly panelClass: import("@angular/core").InputSignal<string>;
  readonly opened: import("@angular/core").OutputEmitterRef<void>;
  readonly closed: import("@angular/core").OutputEmitterRef<AthOverlayCloseReason>;
  readonly panelId: string;
  protected readonly labelledBy: import("@angular/core").WritableSignal<string | null>;
  private readonly popover;
  protected readonly lazyContent: import("@angular/core").Signal<AthPopoverContentDirective | undefined>;
  private readonly items;
  private readonly typeahead;
  private pendingFocus;
  isOpen(): boolean;
  /** Opens the menu from `anchor`, focusing the first or last item. */
  show(anchor?: FloatingAnchor, focus?: MenuFocus): void;
  /** Closes the menu; focus returns to the trigger unless `restoreFocus` is false. */
  hide(restoreFocus?: boolean): void;
  toggle(anchor?: FloatingAnchor, focus?: MenuFocus): void;
  /** Called by `athMenuTrigger`: the trigger names the menu. */
  labelFrom(triggerId: string): void;
  itemActivated(item: {
    keepOpen(): boolean;
  }): void;
  protected onOpened(): void;
  protected onKeydown(event: KeyboardEvent): void;
  private focusEdge;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthMenuComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthMenuComponent, "ath-menu", ["athMenu"], {
    "open": {
      "alias": "open";
      "required": false;
      "isSignal": true;
    };
    "anchor": {
      "alias": "anchor";
      "required": false;
      "isSignal": true;
    };
    "align": {
      "alias": "align";
      "required": false;
      "isSignal": true;
    };
    "side": {
      "alias": "side";
      "required": false;
      "isSignal": true;
    };
    "maxHeight": {
      "alias": "maxHeight";
      "required": false;
      "isSignal": true;
    };
    "ariaLabel": {
      "alias": "ariaLabel";
      "required": false;
      "isSignal": true;
    };
    "panelClass": {
      "alias": "panelClass";
      "required": false;
      "isSignal": true;
    };
  }, {
    "open": "openChange";
    "opened": "opened";
    "closed": "closed";
  }, ["lazyContent", "items"], ["*"], true, never>;
}
/** An action of the menu; choosing it emits its `id`. */
export interface DropdownAction {
  id: string;
  label: string;
  /** A Lucide icon (`import { Pencil } from '@athenos/webcomponents/icons'`). */
  icon?: AthIconData;
  variant?: 'default' | 'danger';
  disabled?: boolean;
  /** A tooltip — e.g. why a disabled item cannot be chosen (also read by screen readers). */
  title?: string;
  /** Shortcut hint at the end of the item, e.g. `⌘E`. */
  shortcut?: string;
}
/** A hairline between two groups of actions; use `DROPDOWN_SEPARATOR`. */
export interface DropdownSeparator {
  readonly separator: true;
}
/** One entry of `ath-dropdown`: an action or `DROPDOWN_SEPARATOR`. */
export type DropdownItem = DropdownAction | DropdownSeparator;
/**
 * The separator entry: `[edit, rename, DROPDOWN_SEPARATOR, remove]`. It
 * replaces the old pseudo-item `{ id: 'divider', label: '', divider: true }`
 * (quality step 2.7).
 */
export declare const DROPDOWN_SEPARATOR: DropdownSeparator;
export declare function isDropdownSeparator(item: DropdownItem): item is DropdownSeparator;
type Entry = {
  key: string;
  action: DropdownAction | null;
};
/**
 * Static content at the top of the menu, above the first item (who is
 * signed in: avatar, name, email). Built only while the menu is open, like
 * the items. Not focusable and not an item: keep controls out of it.
 *
 * @example
 * <ath-dropdown [items]="items">
 *   <ath-button variant="ghost">Account</ath-button>
 *   <ng-template athDropdownHeader><strong>Mira Mock</strong> mira@example.com</ng-template>
 * </ath-dropdown>
 */
export declare class AthDropdownHeaderDirective {
  readonly template: TemplateRef<unknown>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthDropdownHeaderDirective, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<AthDropdownHeaderDirective, "ng-template[athDropdownHeader]", never, {}, {}, never, never, true, never>;
}
/**
 * Horizontal alignment hint.
 * `'auto'` picks left or right based on available viewport space.
 */
export type DropdownAlign = 'left' | 'right' | 'auto';
/**
 * Athenos Dropdown: an action menu from a flat `items` list. A preset on
 * `ath-menu` (keyboard, focus and ARIA come from there); for custom rows use
 * `ath-menu` + `athMenuItem` directly.
 *
 * The projected content is the trigger. When it is (or contains) a button,
 * that button is the menu button: one tab stop, with `aria-haspopup`,
 * `aria-expanded` and `aria-controls` on it. Plain content (text, an icon)
 * gets a `role="button"` wrapper instead.
 *
 * A menu that picks a value (a status, a priority) takes `activeId`: the
 * items become `menuitemradio`s, the current one carries a trailing check
 * and the menu opens on it.
 *
 * @example
 * <ath-dropdown [items]="menuItems" (itemClicked)="onAction($event)">
 *   <ath-button variant="ghost">Actions</ath-button>
 * </ath-dropdown>
 * <ath-dropdown [items]="statuses" [activeId]="ticket.status" (itemClicked)="setStatus($event)">
 *   <ath-status-pill [status]="ticket.status" />
 * </ath-dropdown>
 */
export declare class AthDropdownComponent implements AfterViewInit {
  /** Menu entries: actions, and `DROPDOWN_SEPARATOR` between groups. */
  readonly items: import("@angular/core").InputSignal<readonly DropdownItem[]>;
  /**
   * The id of the current value when the menu picks one: that item gets a
   * trailing check and focus on open. `null` (default): an action menu.
   */
  readonly activeId: import("@angular/core").InputSignal<string | null | undefined>;
  /** `<ng-template athDropdownHeader>`: content above the first item. */
  protected readonly header: import("@angular/core").Signal<AthDropdownHeaderDirective | undefined>;
  /** `[selected]` of an item: `null` in an action menu. */
  protected selectedOf(item: DropdownAction): boolean | null;
  /** Separators are keyed by position, actions by id. */
  protected readonly entries: import("@angular/core").Signal<Entry[]>;
  /**
   * Horizontal alignment hint.
   * - `'left'`  – menu anchored to the left edge of trigger
   * - `'right'` – menu anchored to the right edge of trigger
   * - `'auto'`  – pick best side based on viewport space
   *
   * Vertical direction is always auto-detected.
   */
  readonly align: import("@angular/core").InputSignal<DropdownAlign>;
  /** Item click event */
  readonly itemClicked: import("@angular/core").OutputEmitterRef<string>;
  /** Emits `true` when the menu opens, `false` when it closes. */
  readonly openChange: import("@angular/core").OutputEmitterRef<boolean>;
  protected readonly menuAlign: () => FloatingAlign;
  protected readonly menu: import("@angular/core").Signal<AthMenuComponent>;
  private readonly triggerRef;
  private readonly menuQuery;
  private viewReady;
  constructor();
  ngAfterViewInit(): void;
  /** Opens or closes the menu (focus goes to the first item when opening). */
  toggle(): void;
  /** Emits the item's id, as a click on it does. */
  selectItem(item: DropdownAction): void;
  protected onOpenChange(open: boolean): void;
  protected onHostClick(event: MouseEvent): void;
  protected onHostKeydown(event: KeyboardEvent): void;
  /** The trigger's real control, or the wrapper when there is none. */
  private control;
  private inTrigger;
  private syncAria;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthDropdownComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthDropdownComponent, "ath-dropdown", never, {
    "items": {
      "alias": "items";
      "required": false;
      "isSignal": true;
    };
    "activeId": {
      "alias": "activeId";
      "required": false;
      "isSignal": true;
    };
    "align": {
      "alias": "align";
      "required": false;
      "isSignal": true;
    };
  }, {
    "itemClicked": "itemClicked";
    "openChange": "openChange";
  }, ["header"], ["*"], true, never>;
}
/** One step of the trail. The last item is the current page. */
export interface BreadcrumbItem {
  label: string;
  /** Router path of the step; omitted on the current page. */
  route?: string;
  /** Query of `route` (a list with its filters, say). */
  queryParams?: Record<string, string>;
  /** A key (`ATL`, `ATL-12`), drawn as a mono chip before the label. */
  key?: string;
  /** Tooltip, when it says more than the label. */
  title?: string;
}
type Shown = {
  kind: 'crumb';
  crumb: BreadcrumbItem;
  last: boolean;
} | {
  kind: 'more';
  hidden: BreadcrumbItem[];
  items: DropdownItem[];
};
/**
 * Athenos Breadcrumb Component
 *
 * Ancestors are links (to `route` with `queryParams`), the last item is the
 * page (`aria-current`). A trail longer than `maxVisible` keeps its first
 * step and its last two and folds the rest into "…", a menu of the hidden
 * steps; on a phone only parent › current show. Long labels end in an
 * ellipsis with the full text as tooltip.
 *
 * @example
 * <ath-breadcrumb [items]="[{ label: 'Projects', route: '/projects' }, { label: 'Atlas', key: 'ATL' }]" />
 */
export declare class AthBreadcrumbComponent {
  private readonly labels;
  private readonly router;
  readonly items: import("@angular/core").InputSignal<readonly BreadcrumbItem[]>;
  /** Accessible name of the landmark; defaults to `ATH_LABELS.breadcrumb`. */
  readonly ariaLabel: import("@angular/core").InputSignal<string | null>;
  /** More steps than this fold their middle into "…". */
  readonly maxVisible: import("@angular/core").InputSignal<number>;
  protected readonly navLabel: import("@angular/core").Signal<string>;
  protected readonly moreLabel: import("@angular/core").Signal<string>;
  protected readonly separatorIcon: import("lucide").IconNode;
  private readonly narrow;
  protected readonly shown: import("@angular/core").Signal<Shown[]>;
  constructor();
  /** Where a step links to, if anywhere. */
  protected target(crumb: BreadcrumbItem): string | null;
  protected openHidden(hidden: readonly BreadcrumbItem[], id: string): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthBreadcrumbComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthBreadcrumbComponent, "ath-breadcrumb", never, {
    "items": {
      "alias": "items";
      "required": false;
      "isSignal": true;
    };
    "ariaLabel": {
      "alias": "ariaLabel";
      "required": false;
      "isSignal": true;
    };
    "maxVisible": {
      "alias": "maxVisible";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, never, true, never>;
}
export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerSpacing = 'none' | 'sm' | 'md' | 'lg';
/**
 * Athenos Divider Component
 *
 * Visual separator for content sections.
 *
 * @example
 * <ath-divider />
 * <ath-divider spacing="lg" />
 * <ath-divider orientation="vertical" />
 */
export declare class AthDividerComponent {
  /** Orientation */
  readonly orientation: import("@angular/core").InputSignal<DividerOrientation>;
  /** Spacing around the divider */
  readonly spacing: import("@angular/core").InputSignal<DividerSpacing>;
  protected readonly dividerClasses: import("@angular/core").Signal<string>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthDividerComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthDividerComponent, "ath-divider", never, {
    "orientation": {
      "alias": "orientation";
      "required": false;
      "isSignal": true;
    };
    "spacing": {
      "alias": "spacing";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, never, true, never>;
}
/**
 * Tab item definition
 */
export interface TabItem {
  id: string;
  label: string;
  /** Optional inline count badge after the label (e.g., `12`, `'3/5'`). */
  count?: number | string;
  disabled?: boolean;
}
/**
 * Athenos Tabs Component
 *
 * Tab navigation for switching between content sections. More tabs than
 * fit scroll sideways (no scrollbar): a fade marks each side that has more,
 * and the active tab is scrolled into view when it changes.
 *
 * @example
 * <ath-tabs [tabs]="tabs" [activeTab]="activeTab" (tabChanged)="activeTab = $event" />
 */
export declare class AthTabsComponent {
  /** Tab items */
  readonly tabs: import("@angular/core").InputSignal<TabItem[]>;
  /** Currently active tab ID. Controlled: pair with `(tabChanged)`. */
  readonly activeTab: import("@angular/core").InputSignal<string>;
  /** Tab change event */
  readonly tabChanged: import("@angular/core").OutputEmitterRef<string>;
  private readonly host;
  private readonly list;
  /** Which physical sides of the bar have tabs scrolled out of view. */
  protected readonly fadeLeft: import("@angular/core").WritableSignal<boolean>;
  protected readonly fadeRight: import("@angular/core").WritableSignal<boolean>;
  constructor();
  protected syncFade(): void;
  /** Scrolls the bar (never the page) so the tab at `index` is in view. */
  private reveal;
  /** The one tab in the tab order; the arrow keys reach the others. */
  protected readonly tabStop: import("@angular/core").Signal<number>;
  selectTab(tab: TabItem): void;
  protected onKey(event: KeyboardEvent, index: number): void;
  getTabClasses(tab: TabItem): string;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthTabsComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthTabsComponent, "ath-tabs", never, {
    "tabs": {
      "alias": "tabs";
      "required": false;
      "isSignal": true;
    };
    "activeTab": {
      "alias": "activeTab";
      "required": false;
      "isSignal": true;
    };
  }, {
    "tabChanged": "tabChanged";
  }, never, never, true, never>;
}
/**
 * Vertical timeline container with connecting rail.
 * Wraps `<ath-timeline-entry>` and `<ath-timeline-event>` items.
 *
 * @example
 * <ath-timeline>
 *   <ath-timeline-entry author="Mira Voss" avatarName="Mira Voss" [whenMinutes]="48">
 *     <p>Pushed first pass to a feature branch.</p>
 *   </ath-timeline-entry>
 *   <ath-timeline-event statusColor="var(--green)">
 *     <b>Mira</b> moved this to In Progress · 2d ago
 *   </ath-timeline-event>
 * </ath-timeline>
 */
export declare class AthTimelineComponent {
  static ɵfac: i0.ɵɵFactoryDeclaration<AthTimelineComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthTimelineComponent, "ath-timeline", never, {}, {}, never, ["*"], true, never>;
}
/**
 * A full timeline item (comment, note, change-with-content).
 * Use inside <ath-timeline>.
 *
 * @example
 * <ath-timeline-entry
 *   author="Mira Voss"
 *   avatarName="Mira Voss"
 *   timeLabel="48m ago"
 *   [internal]="false">
 *   <p>Pushed first pass.</p>
 * </ath-timeline-entry>
 */
export declare class AthTimelineEntryComponent {
  protected readonly labels: Readonly<import("@athenos/webcomponents").AthLabels>;
  readonly author: import("@angular/core").InputSignal<string>;
  /** Defaults to `author` for initials/colors. Override if avatar should differ. */
  readonly avatarName: import("@angular/core").InputSignal<string | null>;
  readonly avatarSrc: import("@angular/core").InputSignal<string>;
  /** Pre-formatted relative time (e.g., "5m ago"). */
  readonly timeLabel: import("@angular/core").InputSignal<string>;
  /** Marks the entry as internal (only visible to operators/admins). */
  readonly internal: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  protected readonly effectiveAvatarName: import("@angular/core").Signal<string>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthTimelineEntryComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthTimelineEntryComponent, "ath-timeline-entry", never, {
    "author": {
      "alias": "author";
      "required": true;
      "isSignal": true;
    };
    "avatarName": {
      "alias": "avatarName";
      "required": false;
      "isSignal": true;
    };
    "avatarSrc": {
      "alias": "avatarSrc";
      "required": false;
      "isSignal": true;
    };
    "timeLabel": {
      "alias": "timeLabel";
      "required": false;
      "isSignal": true;
    };
    "internal": {
      "alias": "internal";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, ["*"], true, never>;
}
/**
 * Compact timeline marker for status changes, assignments etc.
 * (Lighter weight than <ath-timeline-entry>.)
 *
 * @example
 * <ath-timeline-event statusColor="var(--green)">
 *   <b>Mira</b> moved to In Progress · 2d ago
 * </ath-timeline-event>
 */
export declare class AthTimelineEventComponent {
  /** Dot color — any CSS color (e.g., `var(--green)`, `#f59e0b`). */
  readonly statusColor: import("@angular/core").InputSignal<string>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthTimelineEventComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthTimelineEventComponent, "ath-timeline-event", never, {
    "statusColor": {
      "alias": "statusColor";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, ["*"], true, never>;
}
/**
 * The Athenos AI mark, drawn on a 24-unit grid (AI1).
 *
 * "Perch": a solid, rounded A — the A of Athenos and a perched little owl
 * (Athenos noctua) at once — with two round eyes cut out of it, the notch
 * between its feet, and a four-point spark beside its head.
 *
 * Two optical sizes: below 21 px the eyes sit wider apart and are a little
 * smaller, so they never run together, and the spark grows so it still
 * reads as a spark rather than a dot.
 */
export interface AiMarkGeometry {
  /** The body with both eyes cut out (fill-rule even-odd). */
  readonly body: string;
  readonly spark: string;
}
/** 21 px and up (24, 32, 48 …). */
export declare const AI_MARK_REGULAR: AiMarkGeometry;
/** Up to 20 px (16, 20). */
export declare const AI_MARK_SMALL: AiMarkGeometry;
/** The largest size that still uses the small drawing. */
export declare const AI_MARK_SMALL_MAX = 20;
/**
 * - `color`: the body in the current text colour, the spark in `--accent`
 *   (hints, rows, nav).
 * - `mono`: everything in the current text colour (one-colour contexts).
 * - `gradient`: body and spark in `--ai-gradient`'s two steps (hero areas,
 *   24 px and up).
 */
export type AiMarkVariant = 'color' | 'mono' | 'gradient';
/**
 * The Athenos AI mark ("Perch"), optionally with the wordmark.
 *
 * Decorative unless it carries a `label` (then `role="img"` with that
 * name). With `wordmark`, the text "Athenos AI" follows the mark and is
 * what screen readers read; the mark itself is then hidden from them.
 *
 * @example
 * <ath-ai-mark />                                   <!-- 16 px, decorative -->
 * <ath-ai-mark [size]="48" variant="gradient" />
 * <ath-ai-mark [size]="20" wordmark />
 * <ath-ai-mark label="Athenos AI" />
 */
export declare class AthAiMarkComponent {
  /** Edge length in px; the drawing switches to its small optical size up to 20. */
  readonly size: import("@angular/core").InputSignal<number>;
  readonly variant: import("@angular/core").InputSignal<AiMarkVariant>;
  /** Accessible name of the mark alone; empty = decorative. Ignored with `wordmark`. */
  readonly label: import("@angular/core").InputSignal<string>;
  /** Show "Athenos AI" next to the mark. */
  readonly wordmark: import("@angular/core").InputSignalWithTransform<boolean, boolean | "" | null | undefined>;
  /** Unique per instance: two gradients on one page must not share an id. */
  protected readonly gradientId: string;
  protected readonly fillUrl: string;
  protected readonly shape: import("@angular/core").Signal<AiMarkGeometry>;
  /** The name the image carries, when it stands alone. */
  protected readonly imageName: import("@angular/core").Signal<string>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthAiMarkComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthAiMarkComponent, "ath-ai-mark", never, {
    "size": {
      "alias": "size";
      "required": false;
      "isSignal": true;
    };
    "variant": {
      "alias": "variant";
      "required": false;
      "isSignal": true;
    };
    "label": {
      "alias": "label";
      "required": false;
      "isSignal": true;
    };
    "wordmark": {
      "alias": "wordmark";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, never, true, never>;
}
/**
 * Athenos Table Component
 *
 * Clean data table with consistent styling.
 *
 * `flush`: no frame of its own. The table sits on the page between two
 * hairlines, the head is a quiet line instead of a filled band and the
 * cells keep a small side inset, so it lines up with a list of settings
 * rows above or below it.
 * Uses ViewEncapsulation.None so projected content (thead/tbody)
 * inherits the table styles.
 *
 * @example
 * <ath-table>
 *   <thead>
 *     <tr><th>Name</th><th>Status</th></tr>
 *   </thead>
 *   <tbody>
 *     <tr><td>Item 1</td><td>Active</td></tr>
 *   </tbody>
 * </ath-table>
 * <ath-table flush>…</ath-table>
 */
export declare class AthTableComponent {
  /** No frame: hairlines above and below, a quiet head, a small side inset. */
  readonly flush: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthTableComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthTableComponent, "ath-table", never, {
    "flush": {
      "alias": "flush";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, ["*"], true, never>;
}
/**
 * Badge variant types
 */
export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'muted';
/**
 * Athenos Badge Component
 *
 * Status badges for tables, lists and inline indicators.
 *
 * @example
 * <ath-badge variant="success">Active</ath-badge>
 * <ath-badge variant="error">Revoked</ath-badge>
 */
export declare class AthBadgeComponent {
  /** Badge variant */
  readonly variant: import("@angular/core").InputSignal<BadgeVariant>;
  /** Show dot indicator */
  readonly dot: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  protected readonly badgeClasses: import("@angular/core").Signal<string>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthBadgeComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthBadgeComponent, "ath-badge", never, {
    "variant": {
      "alias": "variant";
      "required": false;
      "isSignal": true;
    };
    "dot": {
      "alias": "dot";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, ["*"], true, never>;
}
/** A lucide icon (`import { Bug } from '@athenos/webcomponents/icons'`). */
export type AthChipIcon = AthIconData;
/** Semantic tone of a `tag` or `status` chip. */
export type ChipVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
/**
 * What a chip shows. Every kind is one height (`--chip-h`, 20px), so chips
 * of different kinds line up in a row.
 *
 * - `tag`: text on a tinted pill in a semantic `variant`
 * - `label`: a dot in the label's own `color`, then its name
 * - `epic`: a quiet outline, the bolt (or `icon`) in the epic `color`
 * - `type`: a small square in the type `color` with its `icon` glyph; text optional
 * - `status`: a dot (or `icon`) in the `variant` tone, then the status name
 * - `count`: "+N" for items that did not fit; `tooltip` names them
 */
export type ChipKind = 'tag' | 'label' | 'epic' | 'type' | 'status' | 'count';
/**
 * Outline of a `tag` chip: `pill` (default, round ends) or `square`, the
 * plain grey tag of dense ticket rows and board cards (references 05/06):
 * small radius, `--bg-2`, a faint border, no dot.
 */
export type ChipShape = 'pill' | 'square';
/**
 * Athenos Chip
 *
 * The library takes colour and words; resolving a label's, epic's or
 * type's colour and name stays in the app.
 *
 * @example
 * <ath-chip>authentication</ath-chip>
 * <ath-chip shape="square">backend</ath-chip>
 * <ath-chip kind="label" [color]="label.color">{{ label.name }}</ath-chip>
 * <ath-chip kind="epic" [color]="'var(--purple)'" [tooltip]="epic.title">{{ epic.title }}</ath-chip>
 * <ath-chip kind="type" [icon]="bugIcon" color="var(--red)" [tooltip]="'Bug'" />
 * <ath-chip kind="status" variant="warning">In progress</ath-chip>
 * <ath-chip kind="count" [count]="3" tooltip="design, backend, api" />
 * <ath-chip kind="label" [color]="c" [removable]="true" (removed)="drop(l)">{{ l.name }}</ath-chip>
 */
export declare class AthChipComponent {
  private readonly labels;
  readonly kind: import("@angular/core").InputSignal<ChipKind>;
  /** Tone of a `tag` or `status` chip. */
  readonly variant: import("@angular/core").InputSignal<ChipVariant>;
  /** Outline of a `tag` chip; `square` is the plain grey tag of dense rows. */
  readonly shape: import("@angular/core").InputSignal<ChipShape>;
  /** Any CSS colour: the label dot, the epic glyph, the type square, the status dot. */
  readonly color: import("@angular/core").InputSignal<string | null | undefined>;
  /** Glyph for `epic` (default bolt), `type` (required) and `status` (instead of the dot). */
  readonly icon: import("@angular/core").InputSignal<AthIconData | null>;
  /** N of a `count` chip. */
  readonly count: import("@angular/core").InputSignal<number | null>;
  /** Hover text, also the accessible description (names behind "+N", an epic's full title). */
  readonly tooltip: import("@angular/core").InputSignal<string | null | undefined>;
  /** `type` in dense lists: the glyph alone, in grey. */
  readonly muted: import("@angular/core").InputSignal<boolean>;
  readonly removable: import("@angular/core").InputSignal<boolean>;
  /** Accessible name of the remove button; default "Remove {name}". */
  readonly removeLabel: import("@angular/core").InputSignal<string | null>;
  /** The chip's text, for the default remove label (projected text is not readable here). */
  readonly name: import("@angular/core").InputSignal<string | null>;
  readonly removed: import("@angular/core").OutputEmitterRef<void>;
  protected readonly removeIcon: import("lucide").IconNode;
  protected readonly glyph: import("@angular/core").Signal<AthIconData | null>;
  protected readonly countText: import("@angular/core").Signal<string>;
  /** "+3" is read as "3 more: a, b, c". */
  protected readonly countLabel: import("@angular/core").Signal<string>;
  protected readonly resolvedRemoveLabel: import("@angular/core").Signal<string>;
  remove(event: MouseEvent): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthChipComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthChipComponent, "ath-chip", never, {
    "kind": {
      "alias": "kind";
      "required": false;
      "isSignal": true;
    };
    "variant": {
      "alias": "variant";
      "required": false;
      "isSignal": true;
    };
    "shape": {
      "alias": "shape";
      "required": false;
      "isSignal": true;
    };
    "color": {
      "alias": "color";
      "required": false;
      "isSignal": true;
    };
    "icon": {
      "alias": "icon";
      "required": false;
      "isSignal": true;
    };
    "count": {
      "alias": "count";
      "required": false;
      "isSignal": true;
    };
    "tooltip": {
      "alias": "tooltip";
      "required": false;
      "isSignal": true;
    };
    "muted": {
      "alias": "muted";
      "required": false;
      "isSignal": true;
    };
    "removable": {
      "alias": "removable";
      "required": false;
      "isSignal": true;
    };
    "removeLabel": {
      "alias": "removeLabel";
      "required": false;
      "isSignal": true;
    };
    "name": {
      "alias": "name";
      "required": false;
      "isSignal": true;
    };
  }, {
    "removed": "removed";
  }, never, ["*"], true, never>;
}
/** Avatar sizes; each reads its `--avatar-<size>` token. */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
/** Who an avatar shows. `id` is the stable key of the colour tone. */
export interface AthPerson {
  id?: string | null;
  name?: string | null;
  src?: string | null;
}
/**
 * A person as an avatar (image, else initials on a per-person tone), or an
 * empty seat: the soft grey circle with a user glyph, the same size as a
 * person, titled "Unassigned". One symbol for "nobody" everywhere (DS-09).
 *
 * The tone is keyed on the person's stable id, so two people with the same
 * initials differ and one person keeps a colour wherever they appear.
 *
 * @example
 * <ath-avatar [person]="{ id: user.id, name: user.name, src: user.avatar_url }" size="sm" />
 * <ath-avatar [person]="assignee ?? null" size="sm" />   <!-- null → empty seat -->
 * <ath-avatar [unassigned]="true" size="sm" />
 * <ath-avatar name="Mira Voss" />                         <!-- legacy: tone from initials -->
 * <ath-avatar [person]="member" ring="blue" />            <!-- ring in the role's colour -->
 */
export declare class AthAvatarComponent {
  private readonly labels;
  /**
   * The person. `null` draws the empty seat; leave it unset to use the
   * separate `name` / `src` / `id` inputs.
   */
  readonly person: import("@angular/core").InputSignal<AthPerson | null | undefined>;
  /** Display name (initials and accessible name) when `person` is not used. */
  readonly name: import("@angular/core").InputSignal<string | null | undefined>;
  /** Image URL when `person` is not used. */
  readonly src: import("@angular/core").InputSignal<string | null | undefined>;
  /** Stable id for the tone when `person` is not used. */
  readonly id: import("@angular/core").InputSignal<string | null | undefined>;
  readonly size: import("@angular/core").InputSignal<AvatarSize>;
  /** Draw the empty seat regardless of the other inputs. */
  readonly unassigned: import("@angular/core").InputSignal<boolean>;
  /** Accessible name and tooltip; defaults to the name or the "Unassigned" label. */
  readonly label: import("@angular/core").InputSignal<string | null>;
  /**
   * A ring in a palette colour (`AthDecoColor`): the person's role colour
   * in member lists and pickers. Decorative; the role's name is shown or
   * read elsewhere. `null` (or an unknown token): no ring.
   */
  readonly ring: import("@angular/core").InputSignal<string | null | undefined>;
  protected readonly userIcon: import("lucide").IconNode;
  private readonly failedSrc;
  private readonly who;
  protected readonly empty: import("@angular/core").Signal<boolean>;
  protected readonly initials: import("@angular/core").Signal<string>;
  protected readonly tone: import("@angular/core").Signal<number | null>;
  protected readonly image: import("@angular/core").Signal<string | null>;
  protected readonly ringColor: import("@angular/core").Signal<import("@athenos/webcomponents").AthDecoColor | null>;
  protected readonly iconSize: import("@angular/core").Signal<number>;
  protected readonly accessibleName: import("@angular/core").Signal<string | null>;
  /**
   * Tooltip: shown for the empty seat and whenever the avatar was given a
   * person or an explicit label; a bare `name` keeps the old behaviour of
   * no tooltip (the name usually sits next to it).
   */
  protected readonly tooltip: import("@angular/core").Signal<string | null>;
  protected onImageError(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthAvatarComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthAvatarComponent, "ath-avatar", never, {
    "person": {
      "alias": "person";
      "required": false;
      "isSignal": true;
    };
    "name": {
      "alias": "name";
      "required": false;
      "isSignal": true;
    };
    "src": {
      "alias": "src";
      "required": false;
      "isSignal": true;
    };
    "id": {
      "alias": "id";
      "required": false;
      "isSignal": true;
    };
    "size": {
      "alias": "size";
      "required": false;
      "isSignal": true;
    };
    "unassigned": {
      "alias": "unassigned";
      "required": false;
      "isSignal": true;
    };
    "label": {
      "alias": "label";
      "required": false;
      "isSignal": true;
    };
    "ring": {
      "alias": "ring";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, never, true, never>;
}
/**
 * Number of avatar colour tones defined in the design tokens
 * (`--avatar-1-bg` … `--avatar-8-bg`, per theme).
 */
export declare const AVATAR_TONE_COUNT = 8;
/**
 * Initials for a display name: first + last word, or the first two letters
 * of a single word. Already-abbreviated input ("DU") passes through.
 */
export declare function avatarInitials(name: string | null | undefined): string;
/**
 * Deterministic colour tone (1…AVATAR_TONE_COUNT) for an arbitrary key.
 * FNV-1a with a murmur3 finaliser: tiny and stable across sessions.
 */
export declare function toneOfKey(key: string): number;
/**
 * The tone of a person: keyed on their stable id when there is one, so two
 * people with the same initials still differ and one person keeps a colour
 * however a call site spells the name. Without an id it falls back to the
 * initials (two people with the same initials then share a colour, DS-9:
 * pass the id), and with neither it is `null` (neutral tone).
 */
export declare function avatarToneFor(person: {
  id?: string | null;
  name?: string | null;
}): number | null;
export interface StackedUser {
  /**
   * Stable id (the user's id): the key of the avatar's colour tone, so one
   * person has the same colour here as in every other `ath-avatar` (DS-09).
   */
  id: string;
  /** Display name (also used for initials). */
  name: string;
  /** Optional avatar image URL. */
  src?: string;
}
/**
 * Overlapping avatars with a `+N` chip when the list exceeds `max`.
 *
 * @example
 * <ath-avatar-stack [users]="[{ id: 'u1', name: 'Joel' }, { id: 'u2', name: 'Mira' }]" />
 * <ath-avatar-stack [users]="watchers" [max]="5" size="md" />
 */
export declare class AthAvatarStackComponent {
  /** The people to show; `null`/`undefined` count as none. */
  readonly users: import("@angular/core").InputSignalWithTransform<StackedUser[], StackedUser[] | null | undefined>;
  readonly max: import("@angular/core").InputSignalWithTransform<number, unknown>;
  readonly size: import("@angular/core").InputSignal<AvatarSize>;
  protected readonly visible: import("@angular/core").Signal<StackedUser[]>;
  protected readonly overflowCount: import("@angular/core").Signal<number>;
  trackById: (_: number, user: StackedUser) => string;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthAvatarStackComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthAvatarStackComponent, "ath-avatar-stack", never, {
    "users": {
      "alias": "users";
      "required": false;
      "isSignal": true;
    };
    "max": {
      "alias": "max";
      "required": false;
      "isSignal": true;
    };
    "size": {
      "alias": "size";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, never, true, never>;
}
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
export declare class AthEmptyStateComponent {
  /** Empty state message */
  readonly message: import("@angular/core").InputSignal<string>;
  /** Optional sub-message */
  readonly subMessage: import("@angular/core").InputSignal<string>;
  /** Optional lucide icon shown above the message. */
  readonly icon: import("@angular/core").InputSignal<AthIconData | null>;
  /**
   * No frame of its own, for an empty state that already sits inside a
   * panel; the dashed box inside a white panel drew a card in a card.
   */
  readonly bare: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** `compact`: icon tile left, auto height, optional hint rows. */
  readonly size: import("@angular/core").InputSignal<EmptyStateSize>;
  /** 2–4 rows describing what will appear here (compact layout). */
  readonly hints: import("@angular/core").InputSignal<readonly EmptyStateHint[]>;
  /** Primary action label; emits `action` when clicked. */
  readonly actionLabel: import("@angular/core").InputSignal<string>;
  readonly actionIcon: import("@angular/core").InputSignal<AthIconData | null>;
  /** Secondary (outline) action label; emits `secondaryAction`. */
  readonly secondaryActionLabel: import("@angular/core").InputSignal<string>;
  readonly action: import("@angular/core").OutputEmitterRef<void>;
  readonly secondaryAction: import("@angular/core").OutputEmitterRef<void>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthEmptyStateComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthEmptyStateComponent, "ath-empty-state", never, {
    "message": {
      "alias": "message";
      "required": true;
      "isSignal": true;
    };
    "subMessage": {
      "alias": "subMessage";
      "required": false;
      "isSignal": true;
    };
    "icon": {
      "alias": "icon";
      "required": false;
      "isSignal": true;
    };
    "bare": {
      "alias": "bare";
      "required": false;
      "isSignal": true;
    };
    "size": {
      "alias": "size";
      "required": false;
      "isSignal": true;
    };
    "hints": {
      "alias": "hints";
      "required": false;
      "isSignal": true;
    };
    "actionLabel": {
      "alias": "actionLabel";
      "required": false;
      "isSignal": true;
    };
    "actionIcon": {
      "alias": "actionIcon";
      "required": false;
      "isSignal": true;
    };
    "secondaryActionLabel": {
      "alias": "secondaryActionLabel";
      "required": false;
      "isSignal": true;
    };
  }, {
    "action": "action";
    "secondaryAction": "secondaryAction";
  }, never, ["*"], true, never>;
}
/** Path geometry of a sparkline, or `null` below two samples. */
export interface SparklineGeometry {
  linePath: string;
  areaPath: string;
  lastX: number;
  lastY: number;
}
/**
 * The line, area and last point for `values` in a `width` × `height` box
 * (1px inset, so the stroke is never clipped). Pure, for tests.
 */
export declare function sparklineGeometry(values: readonly number[], width: number, height: number): SparklineGeometry | null;
/**
 * Mini line chart: no axes, no labels, no charting library. A filled area
 * under a thin line and a dot on the latest value; nothing at all below
 * two samples (a cold-start dashboard has no trend yet). Decorative
 * (`aria-hidden`): the figure next to it carries the meaning.
 *
 * @example
 * <ath-sparkline [data]="[12, 14, 13, 18, 22, 20, 24]" color="var(--green)" />
 * <ath-sparkline [data]="trend" [width]="86" [height]="28" [showArea]="false" />
 */
export declare class AthSparklineComponent {
  /** Values to plot; fewer than two renders nothing. */
  readonly data: import("@angular/core").InputSignal<readonly number[] | null | undefined>;
  /** Width in px (the KPI tile's footprint by default). */
  readonly width: import("@angular/core").InputSignal<number>;
  /** Height in px. */
  readonly height: import("@angular/core").InputSignal<number>;
  /** Any CSS colour, e.g. `var(--green)`. */
  readonly color: import("@angular/core").InputSignal<string>;
  /** Dot on the most recent value. */
  readonly showDot: import("@angular/core").InputSignal<boolean>;
  /** Translucent area under the line. */
  readonly showArea: import("@angular/core").InputSignal<boolean>;
  /** Stroke width in px. */
  readonly strokeWidth: import("@angular/core").InputSignal<number>;
  protected readonly geometry: import("@angular/core").Signal<SparklineGeometry | null>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthSparklineComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthSparklineComponent, "ath-sparkline", never, {
    "data": {
      "alias": "data";
      "required": false;
      "isSignal": true;
    };
    "width": {
      "alias": "width";
      "required": false;
      "isSignal": true;
    };
    "height": {
      "alias": "height";
      "required": false;
      "isSignal": true;
    };
    "color": {
      "alias": "color";
      "required": false;
      "isSignal": true;
    };
    "showDot": {
      "alias": "showDot";
      "required": false;
      "isSignal": true;
    };
    "showArea": {
      "alias": "showArea";
      "required": false;
      "isSignal": true;
    };
    "strokeWidth": {
      "alias": "strokeWidth";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, never, true, never>;
}
/**
 * The decorative palette a user picks from (role colours, the badge and
 * avatar ring of a role). The same tokens as athenos-contracts
 * `TicketTypeColor`, drawn with the `--<hue>-muted` deco tokens (`--grey-
 * muted` for `neutral`), which are validated for both themes.
 */
export type AthDecoColor = 'neutral' | 'blue' | 'green' | 'amber' | 'red' | 'purple' | 'pink';
/** Every palette token, in picker order. */
export declare const ATH_DECO_COLORS: readonly AthDecoColor[];
/** Whether a stored value is one of the palette tokens. */
export declare function isAthDecoColor(value: unknown): value is AthDecoColor;
/** The palette token's accessible name. */
export declare function athDecoColorLabel(labels: AthLabels$1, color: AthDecoColor): string;
export type StatusPillSize = 'sm' | 'md';
/**
 * Status indicator for a ticket: colored inner-ring dot + label.
 *
 * `status` is a short code (`prog`) or any status key of the workspace
 * (`in_progress`, `qa`). The dot's colour is `tone` (a palette token), else
 * the app's `ATH_STATUS_TONES` resolver, else the pill's own colour for a
 * built-in code; an unknown status without a tone is grey.
 *
 * @example
 * <ath-status-pill status="open" />
 * <ath-status-pill status="prog" [showLabel]="false" />
 * <ath-status-pill status="qa" tone="purple" label="QA" size="sm" />
 */
export declare class AthStatusPillComponent {
  readonly status: import("@angular/core").InputSignal<TicketStatus$1 | (string & {})>;
  readonly showDot: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  readonly showLabel: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  readonly size: import("@angular/core").InputSignal<StatusPillSize>;
  /** Optional override label (otherwise the app's resolver, then the English default). */
  readonly label: import("@angular/core").InputSignal<string | null>;
  /** Optional palette token for the dot (otherwise the app's resolver, then the code's colour). */
  readonly tone: import("@angular/core").InputSignal<AthDecoColor | (string & {}) | null>;
  private readonly resolveLabel;
  private readonly resolveTone;
  /** The resolver reads a signal for the language (see `StatusLabelResolver`), so this follows it. */
  protected readonly computedLabel: import("@angular/core").Signal<string>;
  /** A palette token, or `null` (the code's own colour). Unknown tokens are ignored. */
  protected readonly computedTone: import("@angular/core").Signal<AthDecoColor | null>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthStatusPillComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthStatusPillComponent, "ath-status-pill", never, {
    "status": {
      "alias": "status";
      "required": false;
      "isSignal": true;
    };
    "showDot": {
      "alias": "showDot";
      "required": false;
      "isSignal": true;
    };
    "showLabel": {
      "alias": "showLabel";
      "required": false;
      "isSignal": true;
    };
    "size": {
      "alias": "size";
      "required": false;
      "isSignal": true;
    };
    "label": {
      "alias": "label";
      "required": false;
      "isSignal": true;
    };
    "tone": {
      "alias": "tone";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, never, true, never>;
}
/**
 * Priority indicator with rising bars (low → critical).
 *
 * @example
 * <ath-priority priority="high" />
 * <ath-priority priority="crit" [showLabel]="false" />
 */
export declare class AthPriorityComponent {
  private readonly resolveLabel;
  readonly priority: import("@angular/core").InputSignal<TicketPriority$1>;
  readonly showLabel: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Optional override label. */
  readonly label: import("@angular/core").InputSignal<string | null>;
  /** The resolver reads a signal for the language (see `PriorityLabelResolver`), so this follows it. */
  protected readonly computedLabel: import("@angular/core").Signal<string>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthPriorityComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthPriorityComponent, "ath-priority", never, {
    "priority": {
      "alias": "priority";
      "required": false;
      "isSignal": true;
    };
    "showLabel": {
      "alias": "showLabel";
      "required": false;
      "isSignal": true;
    };
    "label": {
      "alias": "label";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, never, true, never>;
}
export type KpiDeltaDirection = 'up' | 'down' | 'neutral';
/** Tint of the trend line. */
export type KpiTone = 'neutral' | 'amber' | 'blue' | 'green' | 'red';
/** Colour of the figure itself, from the contrast-safe `--*-text` tokens. */
export type KpiValueTone = 'amber' | 'blue' | 'green' | 'red' | 'purple';
/** A trend worth drawing: two samples or more, and not all zero. */
export declare function hasKpiTrend(spark: readonly number[] | null | undefined): boolean;
/**
 * One cell of a KPI strip (`ath-kpi-strip`): label, figure, an optional
 * delta badge, and a trend or a quiet note bottom-right. The tile carries
 * no chrome of its own; the strip draws one card and hairlines between the
 * tiles, so the row reads as one instrument panel.
 *
 * The label wins (UX tour A-09): it has its line to itself and may take two
 * lines (then an ellipsis, the full text as its tooltip); the delta sits on
 * the figure's line, at its far end, in the sans face. In a narrow strip
 * (two columns) every label keeps the room for two lines, so the figures of
 * a row stay level. The rule lives here because Home, Reports, My work and
 * the project overview all draw their figures with this tile.
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
export declare class AthKpiTileComponent {
  private readonly labels;
  readonly label: import("@angular/core").InputSignal<string>;
  /** The figure; `null` (or `undefined`): still loading, drawn as a 48 × 22 skeleton. */
  readonly value: import("@angular/core").InputSignal<string | number | null | undefined>;
  /** Pre-formatted delta ("+1", "−2") on the figure's line; `null` hides the badge. */
  readonly delta: import("@angular/core").InputSignal<string | null | undefined>;
  readonly deltaDirection: import("@angular/core").InputSignal<KpiDeltaDirection | null | undefined>;
  /** Long form of a compact delta ("+1" → "1 overdue"): tooltip and accessible name. */
  readonly deltaTitle: import("@angular/core").InputSignal<string | null | undefined>;
  /** Tints the trend line. */
  readonly tone: import("@angular/core").InputSignal<KpiTone>;
  /** Trend samples; fewer than two, or all zero, draw nothing. */
  readonly spark: import("@angular/core").InputSignal<readonly number[] | null | undefined>;
  /** Overrides the tone's trend colour. */
  readonly sparkColor: import("@angular/core").InputSignal<string | null>;
  /**
   * A small quiet note under the figure ("3 done"), drawn instead of a
   * trend; two lines at most, ending in an ellipsis when the tile is narrow
   * (the full text is the tooltip unless `noteTitle` says more).
   */
  readonly note: import("@angular/core").InputSignal<string | null | undefined>;
  readonly noteTitle: import("@angular/core").InputSignal<string | null | undefined>;
  /** The figure in red: something needs attention now. */
  readonly alert: import("@angular/core").InputSignal<boolean>;
  /**
   * The figure in a status colour (`--amber-text`, `--blue-text` …), e.g. a
   * count of tickets in a status. `alert` and `muted` win over it.
   */
  readonly valueTone: import("@angular/core").InputSignal<KpiValueTone | null | undefined>;
  /** A small dot in this CSS colour before the label (a status key). */
  readonly dot: import("@angular/core").InputSignal<string | null | undefined>;
  /** Nothing to count: a quiet figure (pass "–" for a zero), no trend. */
  readonly muted: import("@angular/core").InputSignal<boolean>;
  /** Where the tile leads (router link). */
  readonly link: import("@angular/core").InputSignal<string | readonly unknown[] | null>;
  readonly linkParams: import("@angular/core").InputSignal<Params | null>;
  /** Accessible name of the link; defaults to the label. */
  readonly linkLabel: import("@angular/core").InputSignal<string | null>;
  protected readonly loading: import("@angular/core").Signal<boolean>;
  protected readonly hasDelta: import("@angular/core").Signal<boolean>;
  protected readonly loadingLabel: import("@angular/core").Signal<string>;
  protected readonly samples: import("@angular/core").Signal<readonly number[] | null>;
  protected readonly showTrend: import("@angular/core").Signal<boolean>;
  protected readonly trendColor: import("@angular/core").Signal<string>;
  protected readonly routerLink: import("@angular/core").Signal<string | unknown[]>;
  /** `alert` and `muted` say more than a status colour, so they win. */
  protected readonly figureTone: import("@angular/core").Signal<KpiValueTone | null>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthKpiTileComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthKpiTileComponent, "ath-kpi-tile", never, {
    "label": {
      "alias": "label";
      "required": true;
      "isSignal": true;
    };
    "value": {
      "alias": "value";
      "required": false;
      "isSignal": true;
    };
    "delta": {
      "alias": "delta";
      "required": false;
      "isSignal": true;
    };
    "deltaDirection": {
      "alias": "deltaDirection";
      "required": false;
      "isSignal": true;
    };
    "deltaTitle": {
      "alias": "deltaTitle";
      "required": false;
      "isSignal": true;
    };
    "tone": {
      "alias": "tone";
      "required": false;
      "isSignal": true;
    };
    "spark": {
      "alias": "spark";
      "required": false;
      "isSignal": true;
    };
    "sparkColor": {
      "alias": "sparkColor";
      "required": false;
      "isSignal": true;
    };
    "note": {
      "alias": "note";
      "required": false;
      "isSignal": true;
    };
    "noteTitle": {
      "alias": "noteTitle";
      "required": false;
      "isSignal": true;
    };
    "alert": {
      "alias": "alert";
      "required": false;
      "isSignal": true;
    };
    "valueTone": {
      "alias": "valueTone";
      "required": false;
      "isSignal": true;
    };
    "dot": {
      "alias": "dot";
      "required": false;
      "isSignal": true;
    };
    "muted": {
      "alias": "muted";
      "required": false;
      "isSignal": true;
    };
    "link": {
      "alias": "link";
      "required": false;
      "isSignal": true;
    };
    "linkParams": {
      "alias": "linkParams";
      "required": false;
      "isSignal": true;
    };
    "linkLabel": {
      "alias": "linkLabel";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, ["*"], true, never>;
}
/**
 * The card around a row of `ath-kpi-tile`s: one border, radius and shadow,
 * hairlines between the tiles, `columns` equal columns (default: one per
 * tile up to 4); two columns when the strip is narrower than 920px.
 *
 * @example
 * <ath-kpi-strip [columns]="4"> <ath-kpi-tile … /> … </ath-kpi-strip>
 */
export declare class AthKpiStripComponent {
  /** Number of columns on wide screens. */
  readonly columns: import("@angular/core").InputSignal<number>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthKpiStripComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthKpiStripComponent, "ath-kpi-strip", never, {
    "columns": {
      "alias": "columns";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, ["*"], true, never>;
}
export type SlaStatus = 'met' | 'pending' | 'breached';
export interface SlaTarget {
  /** Display label (e.g., "Response", "Resolution"). */
  label: string;
  /** Status of this SLA. */
  status: SlaStatus;
  /** Pre-formatted detail text (e.g., "met · 24m", "6h 12m left"). */
  text: string;
}
/**
 * SLA progress widget. Two rows (response + resolution) and a progress bar
 * for the active (pending) one.
 *
 * The color of the bar transitions:
 *   < 80% → green / accent
 *   80-95% → amber (warn)
 *   ≥ 95% → red (breach)
 *
 * @example
 * <ath-sla-bar
 *   [response]="{label:'Response',  status:'met',     text:'met · 24m'}"
 *   [resolution]="{label:'Resolution', status:'pending', text:'6h 12m left'}"
 *   [progressPct]="68" />
 */
export declare class AthSlaBarComponent {
  readonly response: import("@angular/core").InputSignal<SlaTarget | null>;
  readonly resolution: import("@angular/core").InputSignal<SlaTarget | null>;
  /** 0..100 (clamped). The progress bar reflects the most "at risk" target. */
  readonly progressPct: import("@angular/core").InputSignalWithTransform<number, unknown>;
  protected readonly severity: import("@angular/core").Signal<SlaStatus>;
  /** The target the bar is labelled by: resolution, else response. */
  protected readonly barTarget: import("@angular/core").Signal<SlaTarget | null>;
  protected statusColor(s: SlaStatus): string;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthSlaBarComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthSlaBarComponent, "ath-sla-bar", never, {
    "response": {
      "alias": "response";
      "required": false;
      "isSignal": true;
    };
    "resolution": {
      "alias": "resolution";
      "required": false;
      "isSignal": true;
    };
    "progressPct": {
      "alias": "progressPct";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, never, true, never>;
}
export type ProgressTone = 'accent' | 'success' | 'warning' | 'danger' | 'neutral';
export type ProgressSize = 'xs' | 'sm' | 'md';
/**
 * Generic progress bar. Used for milestones, subtasks, sprint burn,
 * upload progress, etc.
 *
 * @example
 * <ath-progress [value]="62" />
 * <ath-progress [value]="80" tone="warning" size="md" [showLabel]="true" />
 * <ath-progress [value]="40" [total]="50" [showLabel]="true" />
 */
export declare class AthProgressComponent {
  /** Current value. When `total` is unset, treated as a percentage (0..100). Negative counts as 0. */
  readonly value: import("@angular/core").InputSignalWithTransform<number, unknown>;
  /** Total (denominator). If unset, `value` is a percent. */
  readonly total: import("@angular/core").InputSignal<number | null>;
  readonly tone: import("@angular/core").InputSignal<ProgressTone>;
  readonly size: import("@angular/core").InputSignal<ProgressSize>;
  /** Show a small `X / Y` (or `X %`) label next to the bar. */
  readonly showLabel: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Optional aria-label for screen readers. */
  readonly ariaLabel: import("@angular/core").InputSignal<string | null>;
  protected readonly pct: import("@angular/core").Signal<number>;
  protected readonly label: import("@angular/core").Signal<string>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthProgressComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthProgressComponent, "ath-progress", never, {
    "value": {
      "alias": "value";
      "required": false;
      "isSignal": true;
    };
    "total": {
      "alias": "total";
      "required": false;
      "isSignal": true;
    };
    "tone": {
      "alias": "tone";
      "required": false;
      "isSignal": true;
    };
    "size": {
      "alias": "size";
      "required": false;
      "isSignal": true;
    };
    "showLabel": {
      "alias": "showLabel";
      "required": false;
      "isSignal": true;
    };
    "ariaLabel": {
      "alias": "ariaLabel";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, never, true, never>;
}
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
export declare class AthCodeBlockComponent {
  protected readonly labels: Readonly<import("@athenos/webcomponents").AthLabels>;
  readonly code: import("@angular/core").InputSignal<string>;
  readonly language: import("@angular/core").InputSignal<string | null>;
  /** Optional filename to display next to the language label. */
  readonly filename: import("@angular/core").InputSignal<string | null>;
  /** Show line numbers down the left gutter. */
  readonly showLineNumbers: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Hide the copy button (e.g., for short read-only snippets). */
  readonly copyable: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  protected readonly copyIcon: import("lucide").IconNode;
  protected readonly checkIcon: import("lucide").IconNode;
  protected readonly copied: import("@angular/core").WritableSignal<boolean>;
  private resetTimer;
  private readonly host;
  protected readonly lines: import("@angular/core").Signal<string[]>;
  constructor();
  copy(): Promise<void>;
  private selectCode;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthCodeBlockComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthCodeBlockComponent, "ath-code-block", never, {
    "code": {
      "alias": "code";
      "required": true;
      "isSignal": true;
    };
    "language": {
      "alias": "language";
      "required": false;
      "isSignal": true;
    };
    "filename": {
      "alias": "filename";
      "required": false;
      "isSignal": true;
    };
    "showLineNumbers": {
      "alias": "showLineNumbers";
      "required": false;
      "isSignal": true;
    };
    "copyable": {
      "alias": "copyable";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, never, true, never>;
}
/** Escapes text for HTML. */
export declare function athEscapeHtml(text: string): string;
/** Plain text as paragraphs and line breaks: the fallback without a parser. */
export declare function athPlainTextHtml(text: string): string;
/**
 * Rendered Markdown, styled.
 *
 * **Security (SEC-14):** every path ends in Angular's HTML sanitizer
 * (`DomSanitizer.sanitize(SecurityContext.HTML, …)`): script, event
 * handlers, `style`, `javascript:` URLs and unknown elements are removed.
 * There is no bypass: neither a parser nor `[html]` can put unsanitized
 * markup on the page. A parser that escapes its input first (the app's
 * `renderMarkdown`) is the first line; the sanitizer is the second.
 *
 * Sources, first match wins:
 *  1. `[html]`: HTML rendered elsewhere (e.g. the server); sanitized too.
 *  2. `[text]` (alias `[source]`): Markdown, parsed with `[parse]` or the
 *     `ATH_MARKDOWN_PARSER` the app provides; without a parser it shows as
 *     escaped paragraphs.
 *
 * The rendered elements are not part of this component's template, so the
 * styles are global, scoped under `.ath-markdown .ath-md` (the
 * `styles/_markdown.scss` mixin, shared with editors).
 *
 * @example
 * <ath-markdown [text]="ticket.description" />
 * <ath-markdown [text]="comment.body" [parse]="renderMarkdown" />
 * <ath-markdown [html]="serverRenderedHtml" />
 */
export declare class AthMarkdownComponent {
  private readonly sanitizer;
  private readonly defaultParser;
  /** Markdown source. */
  readonly text: import("@angular/core").InputSignal<string | null | undefined>;
  /** Parser for this instance; defaults to `ATH_MARKDOWN_PARSER`. */
  readonly parse: import("@angular/core").InputSignal<AthMarkdownParser$1 | null>;
  /** Pre-rendered HTML (still sanitized). Wins over `text`. */
  readonly html: import("@angular/core").InputSignal<string | null | undefined>;
  /** The sanitized HTML, as a string (Angular sanitizes `innerHTML` again on binding). */
  protected readonly renderedHtml: import("@angular/core").Signal<string>;
  private clean;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthMarkdownComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthMarkdownComponent, "ath-markdown", never, {
    "text": {
      "alias": "text";
      "required": false;
      "isSignal": true;
    };
    "parse": {
      "alias": "parse";
      "required": false;
      "isSignal": true;
    };
    "html": {
      "alias": "html";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, never, true, never>;
}
/**
 * Work a button (or an alert's retry) starts: a function returning a
 * Promise, an Observable or nothing. While it runs the button is busy:
 * disabled, a spinner, further clicks ignored (exhaust semantics).
 */
export type AthAction = () => Promise<unknown> | Observable<unknown> | void;
/**
 * Runs an action and settles when it does: a Promise when it resolves or
 * rejects, an Observable on its first value, completion or error (so a
 * long-lived stream does not keep the button busy), anything else at once.
 * A synchronous throw rejects.
 */
export declare function runAthAction(action: AthAction): Promise<unknown>;
/**
 * Button variant types
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'danger-ghost' | 'create';
/**
 * Button size types
 */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
/** The native button's `type`. */
export type ButtonType = 'button' | 'submit' | 'reset';
/**
 * Athenos Button Component
 *
 * `[action]` makes the button track its own work: pass a function that
 * returns a Promise or an Observable and the button is busy until it
 * settles: `aria-disabled` (so it keeps focus), a spinner, `aria-busy`,
 * and a second click (or a double click) does nothing. No hand-kept `saving` signal (QA-13).
 *
 * @example
 * <ath-button variant="primary" (clicked)="handleClick()">Click me</ath-button>
 * <ath-button variant="primary" [action]="save">Save</ath-button>
 *   // in the component: protected readonly save = () => this.sprints.create(this.draft());
 * <ath-button variant="outline" size="sm" [loading]="true">Loading...</ath-button>
 */
export declare class AthButtonComponent {
  private readonly errorHandler;
  /**
   * The action may remove the button before it settles (it navigates
   * away, or hides the button it was started from): then nothing is left
   * to update or to emit from (NG0953). Failures still reach the handler.
   */
  private destroyed;
  constructor();
  readonly variant: import("@angular/core").InputSignal<ButtonVariant>;
  readonly size: import("@angular/core").InputSignal<ButtonSize>;
  /** Button type attribute. */
  readonly type: import("@angular/core").InputSignal<ButtonType>;
  readonly disabled: import("@angular/core").InputSignal<boolean>;
  /** Busy from outside (an action started elsewhere). `[action]` sets its own. */
  readonly loading: import("@angular/core").InputSignal<boolean>;
  readonly fullWidth: import("@angular/core").InputSignal<boolean>;
  /**
   * Toggle state. `null` (default) renders a plain button; `true`/`false`
   * make it a toggle button with `aria-pressed` and a sunken pressed look.
   */
  readonly pressed: import("@angular/core").InputSignal<boolean | null>;
  /**
   * Disclosure state for a button that opens a panel or menu. `null`
   * (default) omits `aria-expanded`. Set this instead of
   * `[attr.aria-expanded]` on the host: host attributes do not reach the
   * focusable inner `<button>`.
   */
  readonly expanded: import("@angular/core").InputSignal<boolean | null>;
  /** Id of the element this button controls (`aria-controls`). */
  readonly controls: import("@angular/core").InputSignal<string | null>;
  /** Optional aria-label for icon-only usage. */
  readonly ariaLabel: import("@angular/core").InputSignal<string | null>;
  /** Work to run on click; the button is busy until it settles. */
  readonly action: import("@angular/core").InputSignal<AthAction | null>;
  /** Every accepted click (also with `[action]`, before it runs). */
  readonly clicked: import("@angular/core").OutputEmitterRef<MouseEvent>;
  /** The action settled successfully. */
  readonly done: import("@angular/core").OutputEmitterRef<unknown>;
  /** The action failed; the error also goes to Angular's `ErrorHandler`. */
  readonly failed: import("@angular/core").OutputEmitterRef<unknown>;
  private readonly running;
  /** Busy: an `[action]` is running or `[loading]` is set. */
  readonly busy: import("@angular/core").Signal<boolean>;
  protected readonly loaderIcon: import("lucide").IconNode;
  protected readonly buttonClasses: import("@angular/core").Signal<string>;
  handleClick(event: MouseEvent): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthButtonComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthButtonComponent, "ath-button", never, {
    "variant": {
      "alias": "variant";
      "required": false;
      "isSignal": true;
    };
    "size": {
      "alias": "size";
      "required": false;
      "isSignal": true;
    };
    "type": {
      "alias": "type";
      "required": false;
      "isSignal": true;
    };
    "disabled": {
      "alias": "disabled";
      "required": false;
      "isSignal": true;
    };
    "loading": {
      "alias": "loading";
      "required": false;
      "isSignal": true;
    };
    "fullWidth": {
      "alias": "fullWidth";
      "required": false;
      "isSignal": true;
    };
    "pressed": {
      "alias": "pressed";
      "required": false;
      "isSignal": true;
    };
    "expanded": {
      "alias": "expanded";
      "required": false;
      "isSignal": true;
    };
    "controls": {
      "alias": "controls";
      "required": false;
      "isSignal": true;
    };
    "ariaLabel": {
      "alias": "ariaLabel";
      "required": false;
      "isSignal": true;
    };
    "action": {
      "alias": "action";
      "required": false;
      "isSignal": true;
    };
  }, {
    "clicked": "clicked";
    "done": "done";
    "failed": "failed";
  }, never, ["*"], true, never>;
}
/**
 * Input type variants
 */
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
/** Field height: `md` 44px, `sm` 33px. */
export type InputSize = 'sm' | 'md';
/**
 * Athenos Input Component
 *
 * A unit goes inside the field, at its end: project it with
 * `[athInputSuffix]` (a content selector, no import). Not with a password.
 *
 * @example
 * <ath-input label="Email" type="email" [(ngModel)]="email" />
 * <ath-input label="Password" type="password" [error]="errorMessage" />
 * <ath-input size="sm" type="number" [(ngModel)]="quota"><span athInputSuffix>MB</span></ath-input>
 */
export declare class AthInputComponent implements ControlValueAccessor {
  private readonly labels;
  /** Field height: `md` 44px (default), `sm` 33px (compact settings rows). */
  readonly size: import("@angular/core").InputSignal<InputSize>;
  /** Accessible names of the password reveal toggle; default `ATH_LABELS`. */
  readonly showPasswordLabel: import("@angular/core").InputSignal<string | null>;
  readonly hidePasswordLabel: import("@angular/core").InputSignal<string | null>;
  /** Input label */
  readonly label: import("@angular/core").InputSignal<string>;
  /** Input type */
  readonly type: import("@angular/core").InputSignal<InputType>;
  /** Placeholder text */
  readonly placeholder: import("@angular/core").InputSignal<string>;
  /** Error message */
  readonly error: import("@angular/core").InputSignal<string>;
  /** Hint text */
  readonly hint: import("@angular/core").InputSignal<string>;
  /** Disabled state (also set by the forms API, see `setDisabledState`). */
  readonly disabled: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Readonly state */
  readonly readonly: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Required field */
  readonly required: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Autocomplete attribute */
  readonly autocomplete: import("@angular/core").InputSignal<string>;
  /** Unique input ID */
  readonly inputId: import("@angular/core").InputSignal<string>;
  /** Ids of the rendered error / hint, so the field can point aria-describedby at them. */
  protected readonly errorId: import("@angular/core").Signal<string>;
  protected readonly hintId: import("@angular/core").Signal<string>;
  protected readonly describedBy: import("@angular/core").Signal<string | null>;
  protected readonly fieldValue: import("@angular/core").WritableSignal<string>;
  private readonly formDisabled;
  protected readonly isDisabled: import("@angular/core").Signal<boolean>;
  protected readonly showPassword: import("@angular/core").WritableSignal<boolean>;
  protected readonly showPasswordText: import("@angular/core").Signal<string>;
  protected readonly hidePasswordText: import("@angular/core").Signal<string>;
  protected readonly eyeIcon: import("lucide").IconNode;
  protected readonly eyeOffIcon: import("lucide").IconNode;
  protected readonly alertIcon: import("lucide").IconNode;
  private onChange;
  protected onTouched: () => void;
  writeValue(value: string): void;
  registerOnChange(fn: (value: string) => void): void;
  registerOnTouched(fn: () => void): void;
  setDisabledState(isDisabled: boolean): void;
  onInput(event: Event): void;
  togglePassword(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthInputComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthInputComponent, "ath-input", never, {
    "size": {
      "alias": "size";
      "required": false;
      "isSignal": true;
    };
    "showPasswordLabel": {
      "alias": "showPasswordLabel";
      "required": false;
      "isSignal": true;
    };
    "hidePasswordLabel": {
      "alias": "hidePasswordLabel";
      "required": false;
      "isSignal": true;
    };
    "label": {
      "alias": "label";
      "required": false;
      "isSignal": true;
    };
    "type": {
      "alias": "type";
      "required": false;
      "isSignal": true;
    };
    "placeholder": {
      "alias": "placeholder";
      "required": false;
      "isSignal": true;
    };
    "error": {
      "alias": "error";
      "required": false;
      "isSignal": true;
    };
    "hint": {
      "alias": "hint";
      "required": false;
      "isSignal": true;
    };
    "disabled": {
      "alias": "disabled";
      "required": false;
      "isSignal": true;
    };
    "readonly": {
      "alias": "readonly";
      "required": false;
      "isSignal": true;
    };
    "required": {
      "alias": "required";
      "required": false;
      "isSignal": true;
    };
    "autocomplete": {
      "alias": "autocomplete";
      "required": false;
      "isSignal": true;
    };
    "inputId": {
      "alias": "inputId";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, ["[athInputSuffix]"], true, never>;
}
/**
 * Select option definition
 */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
/** Field height: `md` 44px, `sm` 33px. */
export type SelectSize = 'sm' | 'md';
/**
 * Athenos Select Component
 *
 * Form select with consistent styling and ControlValueAccessor.
 *
 * @example
 * <ath-select label="Role" [options]="roles" [(ngModel)]="selectedRole" />
 * <ath-select [ariaLabel]="'Role for ' + member.name" [options]="roles" [(ngModel)]="role" />
 */
export declare class AthSelectComponent implements ControlValueAccessor {
  /** Field height: `md` 44px (default), `sm` 33px (compact settings rows). */
  readonly size: import("@angular/core").InputSignal<SelectSize>;
  /** Select label */
  readonly label: import("@angular/core").InputSignal<string>;
  private readonly labels;
  /**
   * The empty first option. Left out: the app's `selectPlaceholder` label
   * (`ATH_LABELS`, English by default); `''`: none — the select always
   * shows a value.
   */
  readonly placeholder: import("@angular/core").InputSignal<string | undefined>;
  protected readonly placeholderText: import("@angular/core").Signal<string>;
  /** Select options */
  readonly options: import("@angular/core").InputSignal<SelectOption[]>;
  /** Error message */
  readonly error: import("@angular/core").InputSignal<string>;
  /** Hint text */
  readonly hint: import("@angular/core").InputSignal<string>;
  /** Disabled state (also set by the forms API, see `setDisabledState`). */
  readonly disabled: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Required field */
  readonly required: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /**
   * Accessible name of the native select when no visible `label` is drawn
   * (a select in a settings row or a table cell that its row already names).
   */
  readonly ariaLabel: import("@angular/core").InputSignal<string>;
  /** Unique select ID */
  readonly selectId: import("@angular/core").InputSignal<string>;
  /** Ids of the rendered error / hint, so the field can point aria-describedby at them. */
  protected readonly errorId: import("@angular/core").Signal<string>;
  protected readonly hintId: import("@angular/core").Signal<string>;
  protected readonly describedBy: import("@angular/core").Signal<string | null>;
  protected readonly fieldValue: import("@angular/core").WritableSignal<string>;
  private readonly formDisabled;
  protected readonly isDisabled: import("@angular/core").Signal<boolean>;
  protected readonly chevronIcon: import("lucide").IconNode;
  protected readonly alertIcon: import("lucide").IconNode;
  private onChange;
  protected onTouched: () => void;
  writeValue(value: string): void;
  registerOnChange(fn: (value: string) => void): void;
  registerOnTouched(fn: () => void): void;
  setDisabledState(isDisabled: boolean): void;
  onSelectionChange(event: Event): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthSelectComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthSelectComponent, "ath-select", never, {
    "size": {
      "alias": "size";
      "required": false;
      "isSignal": true;
    };
    "label": {
      "alias": "label";
      "required": false;
      "isSignal": true;
    };
    "placeholder": {
      "alias": "placeholder";
      "required": false;
      "isSignal": true;
    };
    "options": {
      "alias": "options";
      "required": false;
      "isSignal": true;
    };
    "error": {
      "alias": "error";
      "required": false;
      "isSignal": true;
    };
    "hint": {
      "alias": "hint";
      "required": false;
      "isSignal": true;
    };
    "disabled": {
      "alias": "disabled";
      "required": false;
      "isSignal": true;
    };
    "required": {
      "alias": "required";
      "required": false;
      "isSignal": true;
    };
    "ariaLabel": {
      "alias": "ariaLabel";
      "required": false;
      "isSignal": true;
    };
    "selectId": {
      "alias": "selectId";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, never, true, never>;
}
/** Which way the user may resize the field. */
export type TextareaResize = 'none' | 'vertical' | 'both';
/**
 * Athenos Textarea Component
 *
 * Multi-line text input with ControlValueAccessor.
 *
 * @example
 * <ath-textarea label="Description" [(ngModel)]="description" />
 * <ath-textarea label="Message" [rows]="6" [error]="errorMsg" />
 */
export declare class AthTextareaComponent implements ControlValueAccessor {
  /** Textarea label */
  readonly label: import("@angular/core").InputSignal<string>;
  /** Placeholder text */
  readonly placeholder: import("@angular/core").InputSignal<string>;
  /** Number of rows */
  readonly rows: import("@angular/core").InputSignalWithTransform<number, unknown>;
  /** Error message */
  readonly error: import("@angular/core").InputSignal<string>;
  /** Hint text */
  readonly hint: import("@angular/core").InputSignal<string>;
  /** Disabled state (also set by the forms API, see `setDisabledState`). */
  readonly disabled: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Required field */
  readonly required: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Allow resize */
  readonly resize: import("@angular/core").InputSignal<TextareaResize>;
  /** Max length */
  readonly maxLength: import("@angular/core").InputSignal<number | null>;
  /** Unique textarea ID */
  readonly textareaId: import("@angular/core").InputSignal<string>;
  /** Ids of the rendered error / hint, so the field can point aria-describedby at them. */
  protected readonly errorId: import("@angular/core").Signal<string>;
  protected readonly hintId: import("@angular/core").Signal<string>;
  protected readonly describedBy: import("@angular/core").Signal<string | null>;
  protected readonly fieldValue: import("@angular/core").WritableSignal<string>;
  private readonly formDisabled;
  protected readonly isDisabled: import("@angular/core").Signal<boolean>;
  protected readonly alertIcon: import("lucide").IconNode;
  private onChange;
  protected onTouched: () => void;
  readonly characterCount: import("@angular/core").Signal<number>;
  /** Past 90% of `maxLength`. */
  protected readonly nearLimit: import("@angular/core").Signal<boolean>;
  writeValue(value: string): void;
  registerOnChange(fn: (value: string) => void): void;
  registerOnTouched(fn: () => void): void;
  setDisabledState(isDisabled: boolean): void;
  onInput(event: Event): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthTextareaComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthTextareaComponent, "ath-textarea", never, {
    "label": {
      "alias": "label";
      "required": false;
      "isSignal": true;
    };
    "placeholder": {
      "alias": "placeholder";
      "required": false;
      "isSignal": true;
    };
    "rows": {
      "alias": "rows";
      "required": false;
      "isSignal": true;
    };
    "error": {
      "alias": "error";
      "required": false;
      "isSignal": true;
    };
    "hint": {
      "alias": "hint";
      "required": false;
      "isSignal": true;
    };
    "disabled": {
      "alias": "disabled";
      "required": false;
      "isSignal": true;
    };
    "required": {
      "alias": "required";
      "required": false;
      "isSignal": true;
    };
    "resize": {
      "alias": "resize";
      "required": false;
      "isSignal": true;
    };
    "maxLength": {
      "alias": "maxLength";
      "required": false;
      "isSignal": true;
    };
    "textareaId": {
      "alias": "textareaId";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, never, true, never>;
}
/**
 * Athenos Toggle Component
 *
 * @example
 * <ath-toggle label="Maintenance" [checked]="enabled" (toggled)="onToggle($event)" />
 * <ath-toggle [ariaLabel]="'Email on mention'" [checked]="on" (toggled)="set($event)" />
 */
export declare class AthToggleComponent {
  /** Checked state */
  readonly checked: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Disabled state */
  readonly disabled: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Label text */
  readonly label: import("@angular/core").InputSignal<string>;
  /** Description text */
  readonly description: import("@angular/core").InputSignal<string>;
  /**
   * Accessible name of the switch when no visible `label` is drawn (a switch
   * in a settings row or a table cell that its row already names).
   */
  readonly ariaLabel: import("@angular/core").InputSignal<string>;
  /** Emits the next state; the parent sets `checked`. */
  readonly toggled: import("@angular/core").OutputEmitterRef<boolean>;
  toggle(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthToggleComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthToggleComponent, "ath-toggle", never, {
    "checked": {
      "alias": "checked";
      "required": false;
      "isSignal": true;
    };
    "disabled": {
      "alias": "disabled";
      "required": false;
      "isSignal": true;
    };
    "label": {
      "alias": "label";
      "required": false;
      "isSignal": true;
    };
    "description": {
      "alias": "description";
      "required": false;
      "isSignal": true;
    };
    "ariaLabel": {
      "alias": "ariaLabel";
      "required": false;
      "isSignal": true;
    };
  }, {
    "toggled": "toggled";
  }, never, never, true, never>;
}
/**
 * Athenos Search Input Component
 *
 * Search field with debounce, clear button, and search icon.
 *
 * @example
 * <ath-search-input placeholder="Search flags..." (searched)="onSearch($event)" />
 */
export declare class AthSearchInputComponent {
  protected readonly labels: Readonly<import("@athenos/webcomponents").AthLabels>;
  /** Placeholder text; left out, the app's `searchPlaceholder` label (`ATH_LABELS`). */
  readonly placeholder: import("@angular/core").InputSignal<string | undefined>;
  protected readonly placeholderText: import("@angular/core").Signal<string>;
  /** Debounce time in ms; read per keystroke, so a change applies to the next one. */
  readonly debounce: import("@angular/core").InputSignalWithTransform<number, unknown>;
  /** Search event emitter */
  readonly searched: import("@angular/core").OutputEmitterRef<string>;
  protected readonly value: import("@angular/core").WritableSignal<string>;
  protected readonly searchIcon: import("lucide").IconNode;
  protected readonly clearIcon: import("lucide").IconNode;
  private readonly query$;
  constructor();
  onInput(event: Event): void;
  clear(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthSearchInputComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthSearchInputComponent, "ath-search-input", never, {
    "placeholder": {
      "alias": "placeholder";
      "required": false;
      "isSignal": true;
    };
    "debounce": {
      "alias": "debounce";
      "required": false;
      "isSignal": true;
    };
  }, {
    "searched": "searched";
  }, never, never, true, never>;
}
export interface SegmentOption<T = string> {
  value: T;
  label: string;
  /** Optional inline count badge (e.g., "12"). */
  count?: number | string;
  /** Optional `disabled` state per option. */
  disabled?: boolean;
}
export type SegmentSize = 'sm' | 'md';
/**
 * iOS-style segmented control. Multiple options, exactly one active.
 *
 * @example
 * <ath-segment
 *   [options]="[{value:'list', label:'List'}, {value:'kanban', label:'Kanban'}]"
 *   [value]="view"
 *   (valueChange)="view = $event" />
 */
export declare class AthSegmentComponent<T = string> {
  readonly options: import("@angular/core").InputSignal<SegmentOption<T>[]>;
  /** The active option's value. Controlled: pair with `(valueChange)` or `[(value)]`. */
  readonly value: import("@angular/core").InputSignal<T>;
  readonly size: import("@angular/core").InputSignal<SegmentSize>;
  /** Optional aria-label for the group (for screen readers). */
  readonly ariaLabel: import("@angular/core").InputSignal<string | null>;
  readonly valueChange: import("@angular/core").OutputEmitterRef<T>;
  private readonly host;
  /** The one option in the tab order; the arrow keys reach the others. */
  protected readonly tabStop: import("@angular/core").Signal<number>;
  trackByValue: (_: number, item: SegmentOption<T>) => unknown;
  select(option: SegmentOption<T>): void;
  protected onKey(event: KeyboardEvent, index: number): void;
  isActive(option: SegmentOption<T>): boolean;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthSegmentComponent<any>, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthSegmentComponent<any>, "ath-segment", never, {
    "options": {
      "alias": "options";
      "required": true;
      "isSignal": true;
    };
    "value": {
      "alias": "value";
      "required": true;
      "isSignal": true;
    };
    "size": {
      "alias": "size";
      "required": false;
      "isSignal": true;
    };
    "ariaLabel": {
      "alias": "ariaLabel";
      "required": false;
      "isSignal": true;
    };
  }, {
    "valueChange": "valueChange";
  }, never, never, true, never>;
}
/**
 * Filter pill in the style `Label Value ▾`: quiet grey fill, muted label,
 * semibold value, no separator. Optional clearable.
 * Typically used in toolbars to compose query filters.
 *
 * @example
 * <ath-filter-chip label="Status" value="Any" (clicked)="openMenu()" />
 * <ath-filter-chip label="Assignee" value="Mira Voss" [active]="true" [clearable]="true"
 *                  (clicked)="open()" (cleared)="reset()" />
 */
export declare class AthFilterChipComponent {
  protected readonly labels: Readonly<import("@athenos/webcomponents").AthLabels>;
  readonly label: import("@angular/core").InputSignal<string>;
  readonly value: import("@angular/core").InputSignal<string>;
  /** Visually highlights the chip when a filter value is set. */
  readonly active: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Shows a small `×` button to clear the filter. */
  readonly clearable: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  readonly disabled: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  readonly clicked: import("@angular/core").OutputEmitterRef<void>;
  readonly cleared: import("@angular/core").OutputEmitterRef<void>;
  protected readonly chevronIcon: import("lucide").IconNode;
  protected readonly clearIcon: import("lucide").IconNode;
  protected clearLabel(): string;
  onClick(): void;
  onClear(event: MouseEvent): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthFilterChipComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthFilterChipComponent, "ath-filter-chip", never, {
    "label": {
      "alias": "label";
      "required": true;
      "isSignal": true;
    };
    "value": {
      "alias": "value";
      "required": false;
      "isSignal": true;
    };
    "active": {
      "alias": "active";
      "required": false;
      "isSignal": true;
    };
    "clearable": {
      "alias": "clearable";
      "required": false;
      "isSignal": true;
    };
    "disabled": {
      "alias": "disabled";
      "required": false;
      "isSignal": true;
    };
  }, {
    "clicked": "clicked";
    "cleared": "cleared";
  }, never, never, true, never>;
}
/** One choice of an `ath-listbox`. */
export interface ListboxOption<T = string> {
  value: T;
  label: string;
  /** Second line, e.g. the e-mail under a name. */
  sublabel?: string;
  /**
   * A Lucide icon shown before the label, or a name your own option
   * template resolves (strings are not rendered by the default template).
   */
  icon?: AthIconData | string;
  disabled?: boolean;
  /** Options with the same group are listed together under that heading. */
  group?: string;
  /** Extra text the search matches but does not show (key, alias, e-mail). */
  keywords?: string;
}
/** Context of a custom option template (`<ng-template let-option let-selected="selected">`). */
export interface ListboxOptionContext<T = string> {
  $implicit: ListboxOption<T>;
  selected: boolean;
  active: boolean;
}
interface OptionRow<T> {
  kind: 'option';
  option: ListboxOption<T>;
  index: number;
  id: string;
  selected: boolean;
}
interface CreateRow {
  kind: 'create';
  index: number;
  id: string;
  label: string;
}
type Row<T> = OptionRow<T> | CreateRow;
/** How the highlighted row shows (see `AthListboxComponent.highlight`). */
export type ListboxHighlight = 'none' | 'soft' | 'ring';
interface Section<T> {
  key: string;
  label: string | null;
  labelId: string;
  rows: Row<T>[];
}
/**
 * Athenos Listbox: the WAI-ARIA listbox pattern, single or multi-select.
 *
 * Optional search field (`role="combobox"` with `aria-activedescendant`;
 * focus stays in the field), groups, an optional "create" row, typeahead
 * when there is no search field. Rendering stays cheap for a few hundred
 * options: one element per option, filtering in a `computed`, the active row
 * marked by id, offscreen rows skipped by `content-visibility`.
 *
 * Keyboard: ArrowDown/ArrowUp, Home/End (without search field),
 * PageDown/PageUp, Enter chooses (toggles in multi-select), Space too
 * without search field, typeahead without search field.
 *
 * Driven from a field outside it (an @-mention in a textarea, a slash menu
 * in an editor): the field keeps focus, forwards its keys to
 * `handleKeydown()` and points `aria-activedescendant` at `activeId()`;
 * `autoActivate` keeps the first option ready for Enter.
 *
 * @example
 * <ath-listbox [options]="labels" multiple searchable [(values)]="selected"
 *              creatable (create)="addLabel($event)" ariaLabel="Labels" />
 */
export declare class AthListboxComponent<T = string> {
  protected readonly labels: Readonly<import("@athenos/webcomponents").AthLabels>;
  readonly options: import("@angular/core").InputSignal<readonly ListboxOption<T>[]>;
  readonly multiple: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** The selected value (single-select). Two-way: `[(value)]`. */
  readonly value: import("@angular/core").ModelSignal<T | null>;
  /** The selected values (multi-select). Two-way: `[(values)]`. */
  readonly values: import("@angular/core").ModelSignal<readonly T[]>;
  /** Show a search field above the options. */
  readonly searchable: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** The search text. Two-way: `[(query)]`, e.g. for server-side search. */
  readonly query: import("@angular/core").ModelSignal<string>;
  /** Filter `options` by the query here; turn off when the server filters. */
  readonly localFilter: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Offer a "Create …" row for a query without an exact match. */
  readonly creatable: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  readonly loading: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  readonly searchPlaceholder: import("@angular/core").InputSignal<string | null>;
  /** Text when nothing matches; defaults to `ATH_LABELS.listboxNoMatches`. */
  readonly emptyLabel: import("@angular/core").InputSignal<string | null>;
  readonly ariaLabel: import("@angular/core").InputSignal<string | null>;
  readonly ariaLabelledby: import("@angular/core").InputSignal<string | null>;
  /** Custom option rendering; see `ListboxOptionContext`. */
  readonly optionTemplate: import("@angular/core").InputSignal<TemplateRef<ListboxOptionContext<T>> | null>;
  /** Height of the option list before it scrolls, in px. */
  readonly maxHeight: import("@angular/core").InputSignal<number | null>;
  /** Equality of values; `Object.is` by default. */
  readonly compareWith: import("@angular/core").InputSignal<((a: T, b: T) => boolean) | null>;
  /**
   * With no option highlighted, the first usable one counts as active (Enter
   * chooses it). For a list driven from an outside field (`handleKeydown`).
   */
  readonly autoActivate: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** The user chose (single) or toggled (multi) an option. */
  readonly picked: import("@angular/core").OutputEmitterRef<ListboxOption<T>>;
  /** The user chose the "create" row; carries the trimmed query. */
  readonly create: import("@angular/core").OutputEmitterRef<string>;
  readonly listId: string;
  protected readonly checkIcon: import("lucide").IconNode;
  protected readonly plusIcon: import("lucide").IconNode;
  protected readonly searchIcon: import("lucide").IconNode;
  private readonly searchRef;
  private readonly listRef;
  private readonly activeRaw;
  /**
   * How the highlighted row shows: `none` right after opening on a selected
   * row (it keeps only its check mark), `soft` under the pointer, while
   * typing or on the first row Enter would pick (a background), `ring` once
   * the arrow keys moved it (the accent ring, the list's keyboard focus
   * indicator).
   */
  readonly highlight: import("@angular/core").WritableSignal<ListboxHighlight>;
  private readonly typeahead;
  constructor();
  protected readonly searchText: import("@angular/core").Signal<string>;
  protected readonly emptyText: import("@angular/core").Signal<string>;
  private readonly folded;
  private readonly filtered;
  private readonly showCreate;
  private readonly isSelected;
  /** Sections in display order; row indexes run across all of them. */
  protected readonly sections: import("@angular/core").Signal<Section<T>[]>;
  protected readonly rows: import("@angular/core").Signal<Row<T>[]>;
  /** Index of the highlighted row, -1 for none. */
  readonly activeIndex: import("@angular/core").Signal<number>;
  /** Element id of the highlighted option, for an outside field's `aria-activedescendant`. */
  readonly activeId: import("@angular/core").Signal<string>;
  /** Focuses the search field, or the list itself. */
  focus(): void;
  /** Highlights the first selected option, else the first enabled one. */
  resetActive(): void;
  /** Chooses the row at `index` as if the user had clicked it. */
  choose(index: number): void;
  protected optionIcon(option: ListboxOption<T>): AthIconData | null;
  protected onQueryInput(event: Event): void;
  /**
   * The list's keyboard model, for keys that arrive elsewhere (a textarea
   * that keeps focus while it suggests). A key it uses has its default
   * prevented (`event.defaultPrevented`); others pass untouched. Without a
   * search field, Home/End, Space and typeahead are handled too.
   */
  handleKeydown(event: KeyboardEvent): void;
  protected onListClick(event: MouseEvent): void;
  protected onListMousedown(event: MouseEvent): void;
  protected onListHover(event: MouseEvent): void;
  private readonly usable;
  private jump;
  private rowLabels;
  private rowIndexAt;
  private scrollToActive;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthListboxComponent<any>, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthListboxComponent<any>, "ath-listbox", ["athListbox"], {
    "options": {
      "alias": "options";
      "required": false;
      "isSignal": true;
    };
    "multiple": {
      "alias": "multiple";
      "required": false;
      "isSignal": true;
    };
    "value": {
      "alias": "value";
      "required": false;
      "isSignal": true;
    };
    "values": {
      "alias": "values";
      "required": false;
      "isSignal": true;
    };
    "searchable": {
      "alias": "searchable";
      "required": false;
      "isSignal": true;
    };
    "query": {
      "alias": "query";
      "required": false;
      "isSignal": true;
    };
    "localFilter": {
      "alias": "localFilter";
      "required": false;
      "isSignal": true;
    };
    "creatable": {
      "alias": "creatable";
      "required": false;
      "isSignal": true;
    };
    "loading": {
      "alias": "loading";
      "required": false;
      "isSignal": true;
    };
    "searchPlaceholder": {
      "alias": "searchPlaceholder";
      "required": false;
      "isSignal": true;
    };
    "emptyLabel": {
      "alias": "emptyLabel";
      "required": false;
      "isSignal": true;
    };
    "ariaLabel": {
      "alias": "ariaLabel";
      "required": false;
      "isSignal": true;
    };
    "ariaLabelledby": {
      "alias": "ariaLabelledby";
      "required": false;
      "isSignal": true;
    };
    "optionTemplate": {
      "alias": "optionTemplate";
      "required": false;
      "isSignal": true;
    };
    "maxHeight": {
      "alias": "maxHeight";
      "required": false;
      "isSignal": true;
    };
    "compareWith": {
      "alias": "compareWith";
      "required": false;
      "isSignal": true;
    };
    "autoActivate": {
      "alias": "autoActivate";
      "required": false;
      "isSignal": true;
    };
  }, {
    "value": "valueChange";
    "values": "valuesChange";
    "query": "queryChange";
    "picked": "picked";
    "create": "create";
  }, never, never, true, never>;
}
/**
 * Searchable single-select dropdown: a preset on `ath-option-picker`
 * (popover + listbox), kept for its established API. For multi-select,
 * "create" rows or a custom anchor use `ath-option-picker` directly.
 *
 * Options are `ListboxOption`s: `icon` may be a Lucide icon (rendered) or a
 * name your `optionTpl` resolves. For custom rendering pass an `optionTpl`
 * template (`let-option`). Clearing is built in (`clearable`); from code,
 * `value.set(null)`.
 *
 * @example
 * <ath-combobox
 *   [options]="users"
 *   [(value)]="selected"
 *   placeholder="Pick assignee"
 *   (queryChange)="search($event)" />
 */
export declare class AthComboboxComponent<T = string> {
  protected readonly host: HTMLElement;
  readonly options: import("@angular/core").InputSignal<ListboxOption<T>[]>;
  /** The selected value. Two-way: `[(value)]`. */
  readonly value: import("@angular/core").ModelSignal<T | null>;
  /** Trigger text without a value; defaults to `ATH_LABELS.pickerPlaceholder`. */
  readonly placeholder: import("@angular/core").InputSignal<string | null>;
  /** Search field placeholder; defaults to `ATH_LABELS.listboxSearch`. */
  readonly searchPlaceholder: import("@angular/core").InputSignal<string | null>;
  readonly disabled: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  readonly clearable: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  readonly loading: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Hide the trigger; render only the popup (controlled mode, see `openPanel()`). */
  readonly bare: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Optional custom template for each option (`<ng-template let-option>`). */
  readonly optionTpl: import("@angular/core").InputSignal<TemplateRef<ListboxOptionContext<T>> | null>;
  /** Emits the search query when it changes (for async/server search). */
  readonly queryChange: import("@angular/core").OutputEmitterRef<string>;
  readonly opened: import("@angular/core").OutputEmitterRef<void>;
  readonly closed: import("@angular/core").OutputEmitterRef<void>;
  private readonly picker;
  toggle(): void;
  openPanel(): void;
  close(): void;
  select(option: ListboxOption<T>): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthComboboxComponent<any>, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthComboboxComponent<any>, "ath-combobox", never, {
    "options": {
      "alias": "options";
      "required": false;
      "isSignal": true;
    };
    "value": {
      "alias": "value";
      "required": false;
      "isSignal": true;
    };
    "placeholder": {
      "alias": "placeholder";
      "required": false;
      "isSignal": true;
    };
    "searchPlaceholder": {
      "alias": "searchPlaceholder";
      "required": false;
      "isSignal": true;
    };
    "disabled": {
      "alias": "disabled";
      "required": false;
      "isSignal": true;
    };
    "clearable": {
      "alias": "clearable";
      "required": false;
      "isSignal": true;
    };
    "loading": {
      "alias": "loading";
      "required": false;
      "isSignal": true;
    };
    "bare": {
      "alias": "bare";
      "required": false;
      "isSignal": true;
    };
    "optionTpl": {
      "alias": "optionTpl";
      "required": false;
      "isSignal": true;
    };
  }, {
    "value": "valueChange";
    "queryChange": "queryChange";
    "opened": "opened";
    "closed": "closed";
  }, never, never, true, never>;
}
export interface UserOption {
  id: string;
  name: string;
  email?: string;
  avatarSrc?: string;
}
/**
 * User picker — wraps `<ath-combobox>` with avatar rendering on the trigger
 * and in options. Use for Assignee, Reporter, Watchers, Mentions, etc.
 *
 * @example
 * <ath-user-picker
 *   [users]="workspaceMembers"
 *   [(value)]="assigneeId"
 *   placeholder="Unassigned" />
 */
export declare class AthUserPickerComponent {
  protected readonly labels: Readonly<import("@athenos/webcomponents").AthLabels>;
  /** The people to choose from; `null`/`undefined` count as none. */
  readonly users: import("@angular/core").InputSignalWithTransform<UserOption[], UserOption[] | null | undefined>;
  /** The chosen user's id. Two-way: `[(value)]`. */
  readonly value: import("@angular/core").ModelSignal<string | null>;
  readonly placeholder: import("@angular/core").InputSignal<string | null>;
  readonly searchPlaceholder: import("@angular/core").InputSignal<string | null>;
  readonly disabled: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  readonly clearable: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  readonly allowUnassigned: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Show email under each name. */
  readonly showEmail: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  protected readonly options: import("@angular/core").Signal<ListboxOption<string>[]>;
  protected readonly selectedUser: import("@angular/core").Signal<UserOption | null>;
  onValueChange(v: string | null): void;
  protected readonly triggerLabel: import("@angular/core").Signal<string>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthUserPickerComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthUserPickerComponent, "ath-user-picker", never, {
    "users": {
      "alias": "users";
      "required": false;
      "isSignal": true;
    };
    "value": {
      "alias": "value";
      "required": false;
      "isSignal": true;
    };
    "placeholder": {
      "alias": "placeholder";
      "required": false;
      "isSignal": true;
    };
    "searchPlaceholder": {
      "alias": "searchPlaceholder";
      "required": false;
      "isSignal": true;
    };
    "disabled": {
      "alias": "disabled";
      "required": false;
      "isSignal": true;
    };
    "clearable": {
      "alias": "clearable";
      "required": false;
      "isSignal": true;
    };
    "allowUnassigned": {
      "alias": "allowUnassigned";
      "required": false;
      "isSignal": true;
    };
    "showEmail": {
      "alias": "showEmail";
      "required": false;
      "isSignal": true;
    };
  }, {
    "value": "valueChange";
  }, never, never, true, never>;
}
/**
 * Drag-and-drop file upload zone with click-to-browse fallback.
 *
 * Emits raw `File[]` — actual uploading is the caller's job (typically
 * routed via `file-service`).
 *
 * @example
 * <ath-file-drop accept="image/*,.pdf" (filesPicked)="upload($event)" />
 * <ath-file-drop [multiple]="false" [maxSizeMb]="20" (rejected)="showError($event)"
 *                (filesPicked)="onPick($event)">
 *   Drop your avatar here
 * </ath-file-drop>
 */
export declare class AthFileDropComponent {
  protected readonly labels: Readonly<import("@athenos/webcomponents").AthLabels>;
  /** Filter for the file picker (e.g., `image/*,.pdf`). */
  readonly accept: import("@angular/core").InputSignal<string | null>;
  readonly multiple: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Reject files larger than this (in MB). 0 = no limit. */
  readonly maxSizeMb: import("@angular/core").InputSignalWithTransform<number, unknown>;
  readonly disabled: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Custom prompt text. Defaults to "Drop files or click to browse". */
  readonly prompt: import("@angular/core").InputSignal<string | null>;
  readonly filesPicked: import("@angular/core").OutputEmitterRef<File[]>;
  /** Emits when files are rejected (size limit, wrong type). */
  readonly rejected: import("@angular/core").OutputEmitterRef<{
    file: File;
    reason: "size" | "type";
  }[]>;
  protected readonly uploadIcon: import("lucide").IconNode;
  protected readonly dragging: import("@angular/core").WritableSignal<boolean>;
  private readonly fileInput;
  onDragOver(event: DragEvent): void;
  onDragLeave(event: DragEvent): void;
  onDrop(event: DragEvent): void;
  openPicker(): void;
  onPickerChange(event: Event): void;
  private handle;
  private matchesAccept;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthFileDropComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthFileDropComponent, "ath-file-drop", never, {
    "accept": {
      "alias": "accept";
      "required": false;
      "isSignal": true;
    };
    "multiple": {
      "alias": "multiple";
      "required": false;
      "isSignal": true;
    };
    "maxSizeMb": {
      "alias": "maxSizeMb";
      "required": false;
      "isSignal": true;
    };
    "disabled": {
      "alias": "disabled";
      "required": false;
      "isSignal": true;
    };
    "prompt": {
      "alias": "prompt";
      "required": false;
      "isSignal": true;
    };
  }, {
    "filesPicked": "filesPicked";
    "rejected": "rejected";
  }, never, ["*"], true, never>;
}
/**
 * How the swatches paint their colour: `muted` the deco marks (role badges,
 * avatar rings) as they appear elsewhere; `solid` the full colour, for a
 * choice shown solid next to the picker (a workspace tile).
 */
export type AthColorSwatchTone = 'muted' | 'solid';
/**
 * A colour from the decorative palette, as a radio group (WAI-ARIA radio
 * pattern): one tab stop, the arrow keys move and pick, Home/End jump.
 * Each swatch is named for screen readers ("Blue"), the selected one also
 * carries a check, so the choice does not rest on colour alone.
 *
 * @example
 * <ath-color-swatch [(value)]="role.color" label="Rollenfarbe" />
 * <ath-color-swatch [(value)]="workspace.color" tone="solid" />
 */
export declare class AthColorSwatchComponent {
  private readonly labels;
  private readonly host;
  /** The picked token; `null`: none yet (the first swatch takes the tab stop). */
  readonly value: import("@angular/core").ModelSignal<string | null>;
  /** The group's accessible name; defaults to the "Colour" label. */
  readonly label: import("@angular/core").InputSignal<string | null>;
  readonly disabled: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** `muted` (default) or `solid`: draw the swatches as the colour is used. */
  readonly tone: import("@angular/core").InputSignal<AthColorSwatchTone>;
  /** The tokens offered, in order (default: the whole palette). */
  readonly colors: import("@angular/core").InputSignal<readonly AthDecoColor[]>;
  protected readonly checkIcon: import("lucide").IconNode;
  protected readonly groupLabel: import("@angular/core").Signal<string>;
  protected readonly options: import("@angular/core").Signal<{
    color: AthDecoColor;
    name: string;
  }[]>;
  /** The index holding the tab stop: the picked swatch, else the first. */
  protected readonly stop: import("@angular/core").Signal<number>;
  protected pick(color: AthDecoColor): void;
  protected onKey(event: KeyboardEvent, index: number): void;
  private focusAt;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthColorSwatchComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthColorSwatchComponent, "ath-color-swatch", never, {
    "value": {
      "alias": "value";
      "required": false;
      "isSignal": true;
    };
    "label": {
      "alias": "label";
      "required": false;
      "isSignal": true;
    };
    "disabled": {
      "alias": "disabled";
      "required": false;
      "isSignal": true;
    };
    "tone": {
      "alias": "tone";
      "required": false;
      "isSignal": true;
    };
    "colors": {
      "alias": "colors";
      "required": false;
      "isSignal": true;
    };
  }, {
    "value": "valueChange";
  }, never, never, true, never>;
}
/** An override's state: forbid, take the inherited value, or allow. */
export type TriStateValue = 'deny' | 'inherit' | 'allow';
/**
 * Three segments *Deny · Inherit · Allow* for one permission in an
 * override. A radio group (WAI-ARIA radio pattern), not `ath-segment`
 * (which is a tab list): one tab stop on the chosen segment, the arrow keys
 * move and choose, Home/End jump, Space/Enter choose.
 *
 * `inherited` is the value the "Inherit" segment currently stands for; it
 * is read out with it ("Inherit (currently allowed)"). `compact` shows the
 * icons only (each still named); below 480px the segments are icons only
 * anyway.
 *
 * @example
 * <ath-tri-state label="Tickets bearbeiten" [(value)]="state" [inherited]="true" />
 */
export declare class AthTriStateComponent {
  private readonly labels;
  private readonly host;
  readonly value: import("@angular/core").ModelSignal<TriStateValue>;
  /** The value "Inherit" stands for now; `null`: unknown. */
  readonly inherited: import("@angular/core").InputSignal<boolean | null>;
  readonly disabled: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** The permission's name: the group's accessible name. */
  readonly label: import("@angular/core").InputSignal<string>;
  /** Icons only (each segment keeps its accessible name). */
  readonly compact: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  protected readonly segments: import("@angular/core").Signal<{
    state: TriStateValue;
    icon: AthIconData;
    text: string;
    name: string;
  }[]>;
  protected select(state: TriStateValue): void;
  protected onKey(event: KeyboardEvent, index: number): void;
  private textOf;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthTriStateComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthTriStateComponent, "ath-tri-state", never, {
    "value": {
      "alias": "value";
      "required": false;
      "isSignal": true;
    };
    "inherited": {
      "alias": "inherited";
      "required": false;
      "isSignal": true;
    };
    "disabled": {
      "alias": "disabled";
      "required": false;
      "isSignal": true;
    };
    "label": {
      "alias": "label";
      "required": true;
      "isSignal": true;
    };
    "compact": {
      "alias": "compact";
      "required": false;
      "isSignal": true;
    };
  }, {
    "value": "valueChange";
  }, never, never, true, never>;
}
/**
 * One permission in a roles editor: icon, name, a one-line explanation and,
 * on the right, the control (projected: an `ath-toggle` on a role, an
 * `ath-tri-state` in an override).
 *
 * With `interactive` (a toggle) the whole row is the mouse target: a click
 * anywhere outside the control emits `activate`, which the page wires to
 * the same change as the toggle. A click on the control itself is left to
 * the control, so nothing toggles twice. Keyboard users reach the control
 * directly; the row adds no tab stop of its own.
 *
 * `disabledReason` is the tooltip of a disabled row ("Gäste können das nie")
 * and is read out with it. Below 480px the control moves under the text.
 *
 * @example
 * <ath-permission-row [icon]="FolderPlus" label="Projekte anlegen"
 *   description="Neue Projekte im Workspace erstellen" [interactive]="true"
 *   (activate)="toggle('project.create')">
 *   <ath-toggle ariaLabel="Projekte anlegen" [checked]="on" (toggled)="set($event)" />
 * </ath-permission-row>
 */
export declare class AthPermissionRowComponent {
  readonly icon: import("@angular/core").InputSignal<AthIconData | null>;
  readonly label: import("@angular/core").InputSignal<string>;
  /** One line in `--fg-3`, cut with an ellipsis (the full text as tooltip). */
  readonly description: import("@angular/core").InputSignal<string | null>;
  /** Where the value comes from, e.g. "✓ von Rolle Developer geerbt". */
  readonly inheritedHint: import("@angular/core").InputSignal<string | null>;
  readonly disabled: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Why it is disabled: tooltip and screen-reader text. */
  readonly disabledReason: import("@angular/core").InputSignal<string | null>;
  /** The whole row toggles (only with a two-state control). */
  readonly interactive: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** A click on the row outside the control (with `interactive`). */
  readonly activate: import("@angular/core").OutputEmitterRef<void>;
  /** Ids a projected control can point `aria-describedby` at. */
  readonly labelId: string;
  readonly descriptionId: string;
  private readonly control;
  protected onClick(event: MouseEvent): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthPermissionRowComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthPermissionRowComponent, "ath-permission-row", never, {
    "icon": {
      "alias": "icon";
      "required": false;
      "isSignal": true;
    };
    "label": {
      "alias": "label";
      "required": true;
      "isSignal": true;
    };
    "description": {
      "alias": "description";
      "required": false;
      "isSignal": true;
    };
    "inheritedHint": {
      "alias": "inheritedHint";
      "required": false;
      "isSignal": true;
    };
    "disabled": {
      "alias": "disabled";
      "required": false;
      "isSignal": true;
    };
    "disabledReason": {
      "alias": "disabledReason";
      "required": false;
      "isSignal": true;
    };
    "interactive": {
      "alias": "interactive";
      "required": false;
      "isSignal": true;
    };
  }, {
    "activate": "activate";
  }, never, ["*"], true, never>;
}
/**
 * The sticky "unsaved changes" bar at the bottom of an editor: a sentence
 * and *Discard* / *Save*. Replaces hand-kept dirty flags per field.
 *
 * - Appearing is announced once (`aria-live="polite"`); the bar is a named
 *   region, so it can be found with a screen reader's landmark keys.
 * - `confirmDiscard`: *Discard* asks first (the button turns into "Really
 *   discard?"); Escape anywhere on the page starts the same question and
 *   moves focus to it, a second Escape takes it back. Escape is left alone
 *   while a dialog, menu or popover is open.
 * - `saving`: *Save* shows its spinner and both buttons wait.
 *
 * Sticky to the bottom of its scroll container; full width on phones.
 *
 * @example
 * <ath-save-bar [open]="dirty()" [saving]="saving()" [confirmDiscard]="true"
 *   (save)="save()" (discard)="reset()" />
 */
export declare class AthSaveBarComponent {
  private readonly labels;
  private readonly host;
  private readonly stack;
  private readonly injector;
  readonly open: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  readonly message: import("@angular/core").InputSignal<string | null>;
  readonly saving: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  readonly saveLabel: import("@angular/core").InputSignal<string | null>;
  readonly discardLabel: import("@angular/core").InputSignal<string | null>;
  /** *Discard* (and Escape) asks before it discards. */
  readonly confirmDiscard: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  readonly save: import("@angular/core").OutputEmitterRef<void>;
  readonly discard: import("@angular/core").OutputEmitterRef<void>;
  /** The discard question is showing. */
  protected readonly confirming: import("@angular/core").WritableSignal<boolean>;
  /** The live region's text: the message while open, so appearing is read out. */
  protected readonly announcement: import("@angular/core").Signal<string>;
  protected readonly text: import("@angular/core").Signal<string>;
  protected readonly saveText: import("@angular/core").Signal<string>;
  protected readonly discardText: import("@angular/core").Signal<string>;
  constructor();
  protected onSave(): void;
  protected onDiscard(): void;
  protected onDocumentKey(event: KeyboardEvent): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthSaveBarComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthSaveBarComponent, "ath-save-bar", never, {
    "open": {
      "alias": "open";
      "required": false;
      "isSignal": true;
    };
    "message": {
      "alias": "message";
      "required": false;
      "isSignal": true;
    };
    "saving": {
      "alias": "saving";
      "required": false;
      "isSignal": true;
    };
    "saveLabel": {
      "alias": "saveLabel";
      "required": false;
      "isSignal": true;
    };
    "discardLabel": {
      "alias": "discardLabel";
      "required": false;
      "isSignal": true;
    };
    "confirmDiscard": {
      "alias": "confirmDiscard";
      "required": false;
      "isSignal": true;
    };
  }, {
    "save": "save";
    "discard": "discard";
  }, never, never, true, never>;
}
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
export declare class AthRoleBadgeComponent {
  private readonly labels;
  readonly name: import("@angular/core").InputSignal<string>;
  /**
   * A palette token (`AthDecoColor`), `accent` (the accent tint, for Owner
   * and Admin) or `#RRGGBB`; anything else is neutral.
   */
  readonly color: import("@angular/core").InputSignal<string | null | undefined>;
  readonly size: import("@angular/core").InputSignal<RoleBadgeSize>;
  readonly locked: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  protected readonly lockIcon: import("lucide").IconNode;
  /** `#RRGGBB` (a team's colour) as the dot's colour; `null` for a token. */
  protected readonly hex: Signal<string | null>;
  /**
   * The chip's `data-color`. Typed as written so the printed d.ts does not
   * depend on the order the compiler met the union's members in (a clean
   * build and an incremental one printed it differently).
   */
  protected readonly tone: Signal<AthDecoColor | 'accent' | 'custom'>;
  protected readonly lockedText: Signal<string>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthRoleBadgeComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthRoleBadgeComponent, "ath-role-badge", never, {
    "name": {
      "alias": "name";
      "required": true;
      "isSignal": true;
    };
    "color": {
      "alias": "color";
      "required": false;
      "isSignal": true;
    };
    "size": {
      "alias": "size";
      "required": false;
      "isSignal": true;
    };
    "locked": {
      "alias": "locked";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, never, true, never>;
}
/** Alert tones. `warning` is an alias of `warn`. */
export type AlertVariant = 'info' | 'success' | 'warn' | 'warning' | 'error';
/**
 * - `inline`: a tinted box inside the page flow (forms, lists, panels)
 * - `banner`: full width, square edges, an icon; for the top of a layout or panel
 */
export type AlertAppearance = 'inline' | 'banner';
/**
 * Athenos Alert
 *
 * Feedback in the page: info, warn, error or success, inline or as a
 * banner, with an optional retry. `[retry]` takes the work to repeat; the
 * retry button is an `ath-button [action]`, so it is busy while the retry
 * runs. With no `message` (and nothing projected) the alert takes no
 * space, so a page can keep `<ath-alert [message]="error()" …>` in its
 * template unconditionally.
 *
 * Replaces the app's `error-banner`.
 *
 * @example
 * <ath-alert variant="error" [message]="error()" [retry]="reload" />
 * <ath-alert variant="warn" appearance="banner" [message]="'Maintenance at 22:00'" />
 * <ath-alert variant="success" message="Saved" [dismissible]="true" (dismissed)="clear()" />
 */
export declare class AthAlertComponent {
  private readonly labels;
  readonly variant: import("@angular/core").InputSignal<AlertVariant>;
  readonly appearance: import("@angular/core").InputSignal<AlertAppearance>;
  /** The text; empty or `null` (with no projected content) hides the alert. */
  readonly message: import("@angular/core").InputSignal<string | null | undefined>;
  /** Optional bold lead-in before the message. */
  readonly title: import("@angular/core").InputSignal<string | null>;
  /** Icon before the text; default on for banners, off inline. */
  readonly icon: import("@angular/core").InputSignal<boolean | null>;
  readonly dismissible: import("@angular/core").InputSignal<boolean>;
  /** Work to repeat; shows the retry button. */
  readonly retry: import("@angular/core").InputSignal<AthAction | null>;
  /** Retry button text; default `ATH_LABELS.retry`. */
  readonly retryLabel: import("@angular/core").InputSignal<string | null>;
  /** Dismiss button's accessible name; default `ATH_LABELS.dismiss`. */
  readonly dismissLabel: import("@angular/core").InputSignal<string | null>;
  readonly dismissed: import("@angular/core").OutputEmitterRef<void>;
  protected readonly closeIcon: import("lucide").IconNode;
  protected readonly tone: Signal<'info' | 'success' | 'warn' | 'error'>;
  /** Errors and warnings interrupt; info and success wait their turn. */
  protected readonly role: Signal<'alert' | 'status'>;
  protected readonly showIcon: Signal<boolean>;
  protected readonly glyph: Signal<import("lucide").IconNode>;
  protected readonly retryText: Signal<string>;
  protected readonly dismissText: Signal<string>;
  dismiss(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthAlertComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthAlertComponent, "ath-alert", never, {
    "variant": {
      "alias": "variant";
      "required": false;
      "isSignal": true;
    };
    "appearance": {
      "alias": "appearance";
      "required": false;
      "isSignal": true;
    };
    "message": {
      "alias": "message";
      "required": false;
      "isSignal": true;
    };
    "title": {
      "alias": "title";
      "required": false;
      "isSignal": true;
    };
    "icon": {
      "alias": "icon";
      "required": false;
      "isSignal": true;
    };
    "dismissible": {
      "alias": "dismissible";
      "required": false;
      "isSignal": true;
    };
    "retry": {
      "alias": "retry";
      "required": false;
      "isSignal": true;
    };
    "retryLabel": {
      "alias": "retryLabel";
      "required": false;
      "isSignal": true;
    };
    "dismissLabel": {
      "alias": "dismissLabel";
      "required": false;
      "isSignal": true;
    };
  }, {
    "dismissed": "dismissed";
  }, never, ["*"], true, never>;
}
/**
 * Dialog size variants: max widths 400 / 520 / 680 / 860px, `full` = the
 * viewport minus a margin.
 */
export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
/** ARIA role of the dialog: `alertdialog` for confirmations that interrupt. */
export type DialogRole = 'dialog' | 'alertdialog';
/**
 * Athenos Dialog: the one modal of the library, on a native `<dialog>`
 * opened with `showModal()`. That puts it in the top layer (no z-index, no
 * clipping), makes the rest of the page inert and gives a `::backdrop`
 * (`--scrim`). On top: Tab stays inside, page scroll is locked, Escape and
 * backdrop clicks follow `closeOnEscape` / `closeOnBackdrop`, and focus goes
 * back to where it was when the dialog closes.
 *
 * Controlled: a close request (✕, Escape, backdrop) emits `closed` and
 * `openChange(false)`; the dialog closes when `open` becomes false, so a
 * parent can refuse (unsaved changes). `[(open)]` works.
 *
 * Content: the default slot is the scrolling body; `[slot=header]` (or
 * `[athDialogHeader]`) goes into the header under the title,
 * `[slot=footer]` (or `[athDialogFooter]`) into the footer. Initial focus:
 * an element with `autofocus`, else the first control in the body/footer,
 * else the close button. With nothing in the default slot (a confirm that
 * says it all in `title` and `description`) no body is drawn.
 *
 * Footer contract (UX tour A-01): one `<div slot="footer">` holding a
 * `ghost` Cancel, then one `primary` (or `danger` for a destructive
 * confirm), default size. The dialog lays it out: right-aligned, 8px
 * apart, on a white footer under a hairline; the page adds no footer class.
 *
 * `bare`: no header, footer, close button or surface. The dialog is a
 * transparent layer over the viewport and the content draws and places its
 * own surface (a palette at the top, a bottom sheet, a composer with its own
 * head); a click on the layer around it counts as a backdrop click. Top
 * layer, inert page, scrim, focus trap, Escape and focus return stay. Name it
 * with `ariaLabel`.
 *
 * @example
 * <ath-dialog [(open)]="isOpen" title="Create item" (closed)="onClose()">
 *   <p>Dialog content here</p>
 *   <div slot="footer">
 *     <ath-button variant="ghost" (clicked)="isOpen = false">Cancel</ath-button>
 *     <ath-button (clicked)="save()">Save</ath-button>
 *   </div>
 * </ath-dialog>
 */
export declare class AthDialogComponent implements OnChanges, OnDestroy {
  private readonly stack;
  private readonly labels;
  /** Ids that name and describe the dialog (`aria-labelledby/-describedby`). */
  protected readonly titleId: string;
  protected readonly descriptionId: string;
  /** Whether the dialog is open. Two-way: `[(open)]`. */
  readonly open: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Dialog title (names the dialog). */
  readonly title: import("@angular/core").InputSignal<string>;
  /** Dialog description (describes the dialog). */
  readonly description: import("@angular/core").InputSignal<string>;
  readonly size: import("@angular/core").InputSignal<DialogSize>;
  /** Whether clicking the backdrop requests closing. */
  readonly closeOnBackdrop: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Whether Escape requests closing. */
  readonly closeOnEscape: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Show the ✕ button in the header. */
  readonly showClose: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Accessible name of the close button; defaults to `ATH_LABELS.closeDialog`. */
  readonly closeLabel: import("@angular/core").InputSignal<string | null>;
  /** Accessible name when there is no visible `title`. */
  readonly ariaLabel: import("@angular/core").InputSignal<string | null>;
  /** `alertdialog` for confirmations that interrupt. */
  readonly role: import("@angular/core").InputSignal<DialogRole>;
  /**
   * Only the content, on a transparent full-viewport layer: the content is
   * the surface and places itself (see the class comment). `title`,
   * `description`, `size` and `showClose` do not apply.
   */
  readonly bare: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /**
   * For a `bare` dialog: a band at the top that stays uncovered and usable
   * while the dialog is open (a CSS length: a shell's top bar, e.g. `48px`),
   * as `ath-sheet`'s `top`. The dialog then opens with `show()` instead of
   * `showModal()`:
   * fixed below the band at the modal layer, its own scrim, Tab kept
   * inside, `aria-modal`, page scroll locked, Escape and backdrop clicks as
   * before (through the overlay stack). What the band holds (a timer, a
   * search) works with one click, and its popovers show above the dialog.
   */
  readonly uncover: import("@angular/core").InputSignal<string | null>;
  /** A band is uncovered (bare dialogs only). */
  protected readonly uncovered: import("@angular/core").Signal<boolean>;
  /** The user asked to close (✕, Escape, backdrop). */
  readonly closed: import("@angular/core").OutputEmitterRef<void>;
  /** Two-way partner of `open`; emits `false` on a close request. */
  readonly openChange: import("@angular/core").OutputEmitterRef<boolean>;
  /** The dialog is shown (after `showModal()`). */
  readonly opened: import("@angular/core").OutputEmitterRef<void>;
  protected readonly closeIcon: import("lucide").IconNode;
  protected readonly closeText: import("@angular/core").Signal<string>;
  private dialogEl;
  private returnFocus;
  private pressedOnBackdrop;
  private locked;
  private readonly entry;
  /** The `<dialog>`; rendered while `open` is true. */
  private readonly dialogRef;
  constructor();
  ngOnChanges(changes: SimpleChanges): void;
  ngOnDestroy(): void;
  private attach;
  /** Requests closing, as the ✕ button does. */
  close(): void;
  protected onKeydown(event: KeyboardEvent): void;
  /** Escape: the browser's close request. Always prevented; the parent decides. */
  protected onCancel(event: Event): void;
  /**
   * The browser closed it anyway: a second Escape without user activation
   * skips `cancel`. Controlled, so it is shown again until `open` turns
   * false (the parent may refuse), and it only asks to close when
   * `closeOnEscape` allows it (a secret shown once must stay).
   */
  protected onNativeClose(): void;
  protected onPointerDown(event: PointerEvent): void;
  protected onClick(event: MouseEvent): void;
  private requestClose;
  /**
   * A press on the `::backdrop`: it targets the dialog, outside its box. In
   * `bare` mode the dialog is the transparent layer around the content, so
   * any press on the dialog element itself is one.
   */
  private isBackdropEvent;
  private present;
  private showNative;
  private focusInitial;
  private teardown;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthDialogComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthDialogComponent, "ath-dialog", never, {
    "open": {
      "alias": "open";
      "required": false;
      "isSignal": true;
    };
    "title": {
      "alias": "title";
      "required": false;
      "isSignal": true;
    };
    "description": {
      "alias": "description";
      "required": false;
      "isSignal": true;
    };
    "size": {
      "alias": "size";
      "required": false;
      "isSignal": true;
    };
    "closeOnBackdrop": {
      "alias": "closeOnBackdrop";
      "required": false;
      "isSignal": true;
    };
    "closeOnEscape": {
      "alias": "closeOnEscape";
      "required": false;
      "isSignal": true;
    };
    "showClose": {
      "alias": "showClose";
      "required": false;
      "isSignal": true;
    };
    "closeLabel": {
      "alias": "closeLabel";
      "required": false;
      "isSignal": true;
    };
    "ariaLabel": {
      "alias": "ariaLabel";
      "required": false;
      "isSignal": true;
    };
    "role": {
      "alias": "role";
      "required": false;
      "isSignal": true;
    };
    "bare": {
      "alias": "bare";
      "required": false;
      "isSignal": true;
    };
    "uncover": {
      "alias": "uncover";
      "required": false;
      "isSignal": true;
    };
  }, {
    "closed": "closed";
    "openChange": "openChange";
    "opened": "opened";
  }, never, ["*", "[slot=header],[athDialogHeader]", "[slot=footer],[athDialogFooter]"], true, never>;
}
/** Where the stack sits: at the bottom (newest at the bottom) or at the top (newest on top). */
export type ToastPlacement = 'bottom' | 'top';
export declare class AthToastContainerComponent {
  protected readonly successIcon: import("lucide").IconNode;
  protected readonly errorIcon: import("lucide").IconNode;
  protected readonly warningIcon: AthIconData;
  protected readonly infoIcon: AthIconData;
  protected readonly closeIcon: import("lucide").IconNode;
  protected readonly moreIcon: import("lucide").IconNode;
  protected readonly toastService: AthToastService$1;
  private readonly labels;
  private readonly host;
  private readonly doc;
  /** How many toasts show at once; older ones collapse behind a counter (default 3). */
  readonly maxVisible: import("@angular/core").InputSignal<number>;
  /** `bottom` (default) or `top`; set `--toast-offset-top` / `-bottom` to match. */
  readonly placement: import("@angular/core").InputSignal<ToastPlacement>;
  /** Accessible name of each close button; `{message}` is the toast's text. Default `ATH_LABELS.toastDismiss`. */
  readonly dismissLabel: import("@angular/core").InputSignal<string | null>;
  /** Name of the notifications region. Default `ATH_LABELS.toastRegion`. */
  readonly regionLabel: import("@angular/core").InputSignal<string | null>;
  private readonly hovered;
  private readonly focused;
  /** Opened with the "+N more" button; stays open until pointer and focus leave. */
  private readonly pinned;
  /** Where focus was before it entered the stack. */
  private returnFocus;
  /** Read by the template, so a pause renders the view (and the hairlines sync). */
  protected readonly paused: import("@angular/core").Signal<boolean>;
  protected readonly expanded: import("@angular/core").Signal<boolean>;
  /** Ids of the toasts collapsed behind the visible ones. */
  protected readonly collapsed: import("@angular/core").Signal<Set<string>>;
  protected readonly moreText: import("@angular/core").Signal<string>;
  protected readonly regionText: import("@angular/core").Signal<string>;
  /** Text of the two live regions; set a moment after a toast appears. */
  protected readonly politeText: import("@angular/core").WritableSignal<string>;
  protected readonly assertiveText: import("@angular/core").WritableSignal<string>;
  private readonly announced;
  private readonly held;
  /**
   * Toasts the service removed, shown a moment longer while they leave
   * (`ath-toast-slot--leave`), at the place they had. CSS and a timer, not
   * `animate.leave`: that would pull Angular's animation runtime into the
   * initial bundle of every app that shows a toast.
   */
  private readonly leaving;
  private previous;
  /** The rows of the stack: the service's toasts, and the ones leaving. */
  protected readonly rows: import("@angular/core").Signal<{
    toast: ToastMessage$1;
    leaving: boolean;
  }[]>;
  constructor();
  getIcon(variant: ToastVariant$1): AthIconData;
  dismiss(id: string): void;
  runAction(id: string): void;
  protected closeLabel(toast: ToastMessage$1): string;
  protected timed(toast: ToastMessage$1): boolean;
  protected onPointerEnter(): void;
  protected onPointerLeave(): void;
  protected onFocusIn(event: FocusEvent): void;
  protected onFocusOut(event: FocusEvent): void;
  protected onKeydown(event: KeyboardEvent, id: string): void;
  /** "+N more": shows every toast and moves focus to the oldest. */
  protected expand(): void;
  private leaveFocus;
  /**
   * Focus inside a toast that is about to close goes to the next toast (the
   * one below it, else the one above), else back to where it came from.
   */
  private moveFocusFrom;
  private focusToast;
  private toastElement;
  private syncVisibility;
  private announceTask;
  private announce;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthToastContainerComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthToastContainerComponent, "ath-toast-container", never, {
    "maxVisible": {
      "alias": "maxVisible";
      "required": false;
      "isSignal": true;
    };
    "placement": {
      "alias": "placement";
      "required": false;
      "isSignal": true;
    };
    "dismissLabel": {
      "alias": "dismissLabel";
      "required": false;
      "isSignal": true;
    };
    "regionLabel": {
      "alias": "regionLabel";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, never, true, never>;
}
/**
 * Spinner size variants
 */
export type SpinnerSize = 'sm' | 'md' | 'lg';
/**
 * Athenos Spinner Component
 *
 * Loading indicator for async operations.
 *
 * @example
 * <ath-spinner />
 * <ath-spinner size="lg" />
 */
export declare class AthSpinnerComponent {
  protected readonly labels: Readonly<import("@athenos/webcomponents").AthLabels>;
  /** Spinner size */
  readonly size: import("@angular/core").InputSignal<SpinnerSize>;
  protected readonly spinnerClasses: import("@angular/core").Signal<string>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthSpinnerComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthSpinnerComponent, "ath-spinner", never, {
    "size": {
      "alias": "size";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, never, true, never>;
}
/**
 * Skeleton variants.
 *
 * - `line`: one line of text, as tall as the surrounding text's line box
 * - `row`: one list or table row (`--row-h`), full width
 * - `card`: one compact card (64px)
 * - `text` / `circular` / `rectangular`: free-form shapes sized by `width` / `height`
 */
export type SkeletonVariant = 'line' | 'row' | 'card' | 'text' | 'circular' | 'rectangular';
/**
 * Athenos Skeleton
 *
 * A loading placeholder shaped like the content it stands in for, so the
 * page does not jump when the data arrives. Pulses gently; still under
 * `prefers-reduced-motion`.
 *
 * @example
 * <ath-skeleton variant="line" width="60%" />
 * <ath-skeleton variant="row" />
 * <ath-skeleton variant="circular" width="22px" height="22px" />
 */
export declare class AthSkeletonComponent {
  readonly variant: import("@angular/core").InputSignal<SkeletonVariant>;
  /** Width (CSS value). */
  readonly width: import("@angular/core").InputSignal<string>;
  /** Height (CSS value); the variant's own height when empty. */
  readonly height: import("@angular/core").InputSignal<string>;
  /** Pulse; off is also forced by `prefers-reduced-motion`. */
  readonly animated: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthSkeletonComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthSkeletonComponent, "ath-skeleton", never, {
    "variant": {
      "alias": "variant";
      "required": false;
      "isSignal": true;
    };
    "width": {
      "alias": "width";
      "required": false;
      "isSignal": true;
    };
    "height": {
      "alias": "height";
      "required": false;
      "isSignal": true;
    };
    "animated": {
      "alias": "animated";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, never, true, never>;
}
/** Layout of `ath-skeleton-list`. */
export type SkeletonListVariant = 'row' | 'card' | 'card-grid';
/**
 * A list's or grid's loading state: `count` placeholders the size of real
 * rows (`--row-h`), cards (64px) or grid cards (168px), in a panel-like
 * frame. Announced once as "Loading" to assistive tech.
 *
 * @example
 * <ath-skeleton-list variant="row" [count]="8" />
 * <ath-skeleton-list variant="card-grid" [count]="6" />
 */
export declare class AthSkeletonListComponent {
  private readonly labels;
  readonly variant: import("@angular/core").InputSignal<SkeletonListVariant>;
  readonly count: import("@angular/core").InputSignalWithTransform<number, unknown>;
  /** Accessible text; default `ATH_LABELS.loading`. */
  readonly label: import("@angular/core").InputSignal<string | null>;
  protected readonly indexes: import("@angular/core").Signal<number[]>;
  protected readonly loadingLabel: import("@angular/core").Signal<string>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthSkeletonListComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthSkeletonListComponent, "ath-skeleton-list", never, {
    "variant": {
      "alias": "variant";
      "required": false;
      "isSignal": true;
    };
    "count": {
      "alias": "count";
      "required": false;
      "isSignal": true;
    };
    "label": {
      "alias": "label";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, never, true, never>;
}
/**
 * Skeleton Table Component
 *
 * Pre-built skeleton for table loading states
 */
export declare class AthSkeletonTableComponent {
  /** Number of rows */
  readonly rows: import("@angular/core").InputSignalWithTransform<number, unknown>;
  /** Column widths in percent */
  readonly columns: import("@angular/core").InputSignal<number[]>;
  protected readonly rowsArray: import("@angular/core").Signal<number[]>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthSkeletonTableComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthSkeletonTableComponent, "ath-skeleton-table", never, {
    "rows": {
      "alias": "rows";
      "required": false;
      "isSignal": true;
    };
    "columns": {
      "alias": "columns";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, never, true, never>;
}
/**
 * Skeleton Card Component
 *
 * Pre-built skeleton for card loading states
 */
export declare class AthSkeletonCardComponent {
  /** Show image placeholder */
  readonly showImage: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Show action buttons */
  readonly showActions: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthSkeletonCardComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthSkeletonCardComponent, "ath-skeleton-card", never, {
    "showImage": {
      "alias": "showImage";
      "required": false;
      "isSignal": true;
    };
    "showActions": {
      "alias": "showActions";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, never, true, never>;
}
/**
 * Tooltip position variants
 */
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
/**
 * Athenos Tooltip Directive
 *
 * Shows a tooltip on hover (after a short delay) and right away on keyboard
 * focus; hides it on leave, blur and Escape. While shown it is a
 * `role="tooltip"` element named in the host's `aria-describedby`, so screen
 * readers read it with the host. Placed with `floatPanel` in the top layer:
 * above dialogs and sheets, flipped and kept inside the viewport.
 *
 * @example
 * <button [athTooltip]="'Click to save'" tooltipPosition="bottom">Save</button>
 */
export declare class AthTooltipDirective implements OnDestroy {
  /** Tooltip text */
  readonly text: import("@angular/core").InputSignal<string>;
  /** Tooltip position */
  readonly tooltipPosition: import("@angular/core").InputSignal<TooltipPosition>;
  private readonly el;
  private readonly renderer;
  private readonly tooltipId;
  private tooltipElement;
  private float;
  private showTimeout;
  private hideTimeout;
  private hovered;
  private focused;
  private readonly listeners;
  private unlistenEscape;
  constructor();
  ngOnDestroy(): void;
  private show;
  private hide;
  private clearTimers;
  private createTooltip;
  private removeTooltip;
  /** Adds or removes the tooltip's id, keeping ids the app set on the host. */
  private setDescribedBy;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthTooltipDirective, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<AthTooltipDirective, "[athTooltip]", never, {
    "text": {
      "alias": "athTooltip";
      "required": false;
      "isSignal": true;
    };
    "tooltipPosition": {
      "alias": "tooltipPosition";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, never, true, never>;
}
export type KbdSize = 'sm' | 'md' | 'lg';
/**
 * Athenos Kbd (Keyboard) Component
 *
 * Displays keyboard shortcuts in a styled badge
 *
 * @example
 * <ath-kbd>Ctrl</ath-kbd>
 * <ath-kbd>⌘</ath-kbd>
 * <ath-kbd size="sm">K</ath-kbd>
 * <ath-kbd label="⌘K" size="sm" />
 */
export declare class AthKbdComponent {
  /** Size variant */
  readonly size: import("@angular/core").InputSignal<KbdSize>;
  /**
   * Keys as text, for a self-closing tag. Callers wrote `label="⌘K"`
   * before this input existed, which rendered an empty chip.
   */
  readonly label: import("@angular/core").InputSignal<string>;
  protected readonly kbdClasses: import("@angular/core").Signal<string>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthKbdComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthKbdComponent, "ath-kbd", never, {
    "size": {
      "alias": "size";
      "required": false;
      "isSignal": true;
    };
    "label": {
      "alias": "label";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, ["*"], true, never>;
}
/**
 * Athenos Copy Button Component
 *
 * One-click copy-to-clipboard with success feedback.
 *
 * @example
 * <ath-copy-button [value]="apiKey" />
 * <ath-copy-button [value]="secretToken" label="Copy token" />
 */
export declare class AthCopyButtonComponent {
  protected readonly labels: Readonly<import("@athenos/webcomponents").AthLabels>;
  /** Value to copy to clipboard */
  readonly value: import("@angular/core").InputSignal<string>;
  /** Optional tooltip/label */
  readonly label: import("@angular/core").InputSignal<string | null>;
  protected readonly copied: import("@angular/core").WritableSignal<boolean>;
  protected readonly copyIcon: import("lucide").IconNode;
  protected readonly checkIcon: import("lucide").IconNode;
  private resetTimeout;
  constructor();
  copy(): Promise<void>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthCopyButtonComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthCopyButtonComponent, "ath-copy-button", never, {
    "value": {
      "alias": "value";
      "required": true;
      "isSignal": true;
    };
    "label": {
      "alias": "label";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, never, true, never>;
}
/** Long-running timer: `warn` after 8h, `alert` after 24h. */
export type TimerPillWarning = 'warn' | 'alert';
/**
 * Live time-tracking pill for the topbar. **Stateless about ticking** —
 * the consumer (TimeTrackingService) feeds `seconds` and reacts to `toggled`.
 *
 * This keeps the component pure (testable) while letting the service stay
 * authoritative about the real running time.
 *
 * @example
 * <ath-timer-pill
 *   [active]="timer.running()"
 *   [seconds]="timer.elapsed()"
 *   [ticketKey]="timer.ticketKey()"
 *   (toggled)="timer.toggle()" />
 */
export declare class AthTimerPillComponent {
  readonly active: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Elapsed time in seconds; fractions are dropped, negative counts as 0. */
  readonly seconds: import("@angular/core").InputSignalWithTransform<number, unknown>;
  readonly ticketKey: import("@angular/core").InputSignal<string | null>;
  /** Tooltip override; otherwise auto-built from state. */
  readonly tooltip: import("@angular/core").InputSignal<string | null>;
  readonly toggled: import("@angular/core").OutputEmitterRef<void>;
  /** After 8h surfaces a warn color; after 24h, an alert color. */
  protected readonly warning: Signal<TimerPillWarning | null>;
  protected readonly time: Signal<string>;
  protected readonly effectiveTooltip: Signal<string>;
  onToggle(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthTimerPillComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthTimerPillComponent, "ath-timer-pill", never, {
    "active": {
      "alias": "active";
      "required": false;
      "isSignal": true;
    };
    "seconds": {
      "alias": "seconds";
      "required": false;
      "isSignal": true;
    };
    "ticketKey": {
      "alias": "ticketKey";
      "required": false;
      "isSignal": true;
    };
    "tooltip": {
      "alias": "tooltip";
      "required": false;
      "isSignal": true;
    };
  }, {
    "toggled": "toggled";
  }, never, never, true, never>;
}
export type PaginationMode = 'numbered' | 'cursor';
/**
 * Pagination control. Two modes:
 *  - `numbered`: Prev / 1 / 2 / 3 / … / N / Next  (requires `totalPages`)
 *  - `cursor`:   ← Previous · "Showing X–Y of Z" · Next →  (use `hasPrev`/`hasNext`)
 *
 * Cursor mode is preferred for large datasets where `totalPages` is unknown
 * (e.g., Meilisearch results, infinite-scroll alternatives).
 *
 * @example
 * <ath-pagination [page]="page" [totalPages]="20" (pageChange)="page = $event" />
 * <ath-pagination mode="cursor" [hasPrev]="false" [hasNext]="true"
 *   summary="Showing 1–30 of 412" (previous)="loadPrev()" (next)="loadNext()" />
 */
export declare class AthPaginationComponent {
  protected readonly labels: Readonly<import("@athenos/webcomponents").AthLabels>;
  protected pageLabel(page: number | string): string;
  readonly mode: import("@angular/core").InputSignal<PaginationMode>;
  /** Current page (1-based); values below 1 count as 1. */
  readonly page: import("@angular/core").InputSignalWithTransform<number, unknown>;
  readonly totalPages: import("@angular/core").InputSignalWithTransform<number, unknown>;
  /** How many siblings of the current page to always show (default 1). */
  readonly siblingCount: import("@angular/core").InputSignalWithTransform<number, unknown>;
  readonly pageChange: import("@angular/core").OutputEmitterRef<number>;
  readonly hasPrev: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  readonly hasNext: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Caption shown between prev/next in cursor mode (e.g., "1–30 of 412"). */
  readonly summary: import("@angular/core").InputSignal<string>;
  readonly previous: import("@angular/core").OutputEmitterRef<void>;
  readonly next: import("@angular/core").OutputEmitterRef<void>;
  protected readonly prevIcon: import("lucide").IconNode;
  protected readonly nextIcon: import("lucide").IconNode;
  protected readonly firstIcon: import("lucide").IconNode;
  protected readonly lastIcon: import("lucide").IconNode;
  protected readonly ellipsisIcon: import("lucide").IconNode;
  protected readonly pages: import("@angular/core").Signal<(number | "ellipsis")[]>;
  goTo(page: number): void;
  goPrev(): void;
  goNext(): void;
  goFirst(): void;
  goLast(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthPaginationComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthPaginationComponent, "ath-pagination", never, {
    "mode": {
      "alias": "mode";
      "required": false;
      "isSignal": true;
    };
    "page": {
      "alias": "page";
      "required": false;
      "isSignal": true;
    };
    "totalPages": {
      "alias": "totalPages";
      "required": false;
      "isSignal": true;
    };
    "siblingCount": {
      "alias": "siblingCount";
      "required": false;
      "isSignal": true;
    };
    "hasPrev": {
      "alias": "hasPrev";
      "required": false;
      "isSignal": true;
    };
    "hasNext": {
      "alias": "hasNext";
      "required": false;
      "isSignal": true;
    };
    "summary": {
      "alias": "summary";
      "required": false;
      "isSignal": true;
    };
  }, {
    "pageChange": "pageChange";
    "previous": "previous";
    "next": "next";
  }, never, never, true, never>;
}
/**
 * Due dates as the product shows them: pure functions, no Angular, so the
 * thresholds are tested with plain values (`due-date.spec.ts`).
 *
 * A due date names a calendar day. "Today" is today in the reader's time
 * zone; a bare `YYYY-MM-DD` (or a timestamp at UTC midnight/noon, which is
 * what the date pickers write) is that day everywhere.
 */
/** How urgent a due date reads. One rule, one place (DS-08). */
export type DueTone = 'overdue' | 'today' | 'soon' | 'later' | 'done';
/** Where a due date comes from: the ticket's own, or its sprint's end. */
export type DueSource = 'own' | 'sprint';
/** Label templates the compact text is built from (`{count}` placeholder). */
export interface DueTextLabels {
  /** Two or more days past the date. */
  overdue: string;
  /** One day past the date ("1 day overdue"); `overdue` when missing. */
  overdueOne?: string;
  today: string;
  tomorrow: string;
  inDays: string;
}
/**
 * `date` as wall-clock time in `timeZone`: a Date whose local fields read
 * what a clock in that zone shows. Only for day comparisons.
 */
export declare function zonedWallClock(date: Date, timeZone?: string): Date;
/**
 * The calendar day a due value names, as local midday; `null` when the
 * value is not a date.
 */
export declare function calendarDayOf(value: string, timeZone?: string): Date | null;
/**
 * Whether a due value names a day rather than a moment: a bare
 * `YYYY-MM-DD`, or a timestamp at UTC midnight or noon (what the date
 * pickers write for a day). Only a moment has a time worth showing.
 */
export declare function isDayOnly(value: string): boolean;
/** Whole calendar days from `now` (in `timeZone`) to `day`; negative = past. */
export declare function calendarDaysUntil(day: Date, now: Date, timeZone?: string): number;
/**
 * The one colour rule: before today overdue, today today (both red), the
 * next two days soon (amber), later muted. Finished work is never urgent.
 */
export declare function dueToneOf(days: number | null, done?: boolean): DueTone;
/** A calendar day in the chosen short format ("30 Oct", "30.10.", "10/30", "2026-10-30"). */
export declare function shortDay(day: Date, ctx?: AthDateContext$1): string;
/**
 * The full date, for the tooltip and screen readers: "Freitag, 30. Oktober
 * 2026" ("Friday 30 October 2026"), with the clock time when the value is
 * a moment rather than a day ("…, 18:00"). The ISO format keeps its digits.
 */
export declare function fullDueDate(value: string, day: Date, ctx?: AthDateContext$1): string;
/**
 * The compact due text: "2 days overdue" ("1 day overdue"), "today",
 * "tomorrow", "in 3 days" up to six days ahead, then the short date.
 */
export declare function compactDueText(days: number, day: Date, labels: DueTextLabels, ctx?: AthDateContext$1): string;
export interface DueInput {
  /** ISO date or timestamp; empty = no due date. */
  date: string | null | undefined;
  /** Finished work: muted, and the plain date instead of "overdue". */
  done?: boolean;
  /** A sprint-derived date names its day ("Sprint end · 31 Oct"). */
  source?: DueSource;
  now?: Date;
}
export interface DueView {
  tone: DueTone;
  /** The date part of the label (without the "Sprint end ·" prefix). */
  text: string;
  /** Calendar days from today; negative = past. */
  days: number;
  /** The short date, e.g. for a tooltip. */
  day: string;
  /** The full date (and time, for a moment): tooltip and screen readers. */
  full: string;
}
/** Everything `ath-due-label` draws, from a date; `null` without one. */
export declare function describeDue(input: DueInput, labels: DueTextLabels, ctx?: AthDateContext$1): DueView | null;
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
export declare class AthDueLabelComponent {
  private readonly labels;
  private readonly localeId;
  private readonly dateContext;
  private readonly today;
  /** ISO date or timestamp; empty shows `placeholder` (or nothing). */
  readonly date: import("@angular/core").InputSignal<string | null | undefined>;
  /** Finished work: muted, never "overdue". */
  readonly done: import("@angular/core").InputSignal<boolean>;
  readonly source: import("@angular/core").InputSignal<DueSource>;
  readonly sprintName: import("@angular/core").InputSignal<string | null | undefined>;
  /** The own date lies after the sprint's end: amber warning icon. */
  readonly afterSprintEnd: import("@angular/core").InputSignal<boolean>;
  /** Text without a date (e.g. "—"); default nothing. */
  readonly placeholder: import("@angular/core").InputSignal<string | null>;
  /** Narrow columns: the sprint icon only, "Sprint end" moves to the tooltip. */
  readonly compact: import("@angular/core").InputSignal<boolean>;
  /** Reference time, for stories and tests; default the current day (`AthToday`). */
  readonly now: import("@angular/core").InputSignal<Date | null>;
  protected readonly ic: {
    readonly sprint: import("lucide").IconNode;
    readonly warn: import("lucide").IconNode;
  };
  private readonly ctx;
  /** The time now, read fresh; the tick only makes `view` re-run around midnight. */
  private currentTime;
  protected readonly view: import("@angular/core").Signal<import("@athenos/webcomponents").DueView | null>;
  protected readonly isSprint: import("@angular/core").Signal<boolean>;
  protected readonly sprintEndText: import("@angular/core").Signal<string>;
  /** "Due Friday 30 October 2026" — the tooltip and the screen-reader text. */
  protected readonly dueOnText: import("@angular/core").Signal<string | null>;
  /** The full date; a sprint-derived one also names its sprint. */
  protected readonly title: import("@angular/core").Signal<string | null>;
  protected readonly showWarn: import("@angular/core").Signal<boolean>;
  protected readonly warnText: import("@angular/core").Signal<string>;
  protected readonly warnTitle: import("@angular/core").Signal<string>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthDueLabelComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthDueLabelComponent, "ath-due-label", never, {
    "date": {
      "alias": "date";
      "required": false;
      "isSignal": true;
    };
    "done": {
      "alias": "done";
      "required": false;
      "isSignal": true;
    };
    "source": {
      "alias": "source";
      "required": false;
      "isSignal": true;
    };
    "sprintName": {
      "alias": "sprintName";
      "required": false;
      "isSignal": true;
    };
    "afterSprintEnd": {
      "alias": "afterSprintEnd";
      "required": false;
      "isSignal": true;
    };
    "placeholder": {
      "alias": "placeholder";
      "required": false;
      "isSignal": true;
    };
    "compact": {
      "alias": "compact";
      "required": false;
      "isSignal": true;
    };
    "now": {
      "alias": "now";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, never, true, never>;
}
/**
 * - `scroll`: the page is at least as tall as the stage and grows with its
 *   content; the stage scrolls. Panels in the last `ath-panel-grid` stretch
 *   to the bottom when the content is short, so no dead band is left.
 * - `fill`: the page is exactly the stage's height. The filling child (an
 *   `ath-panel-grid`, an `ath-panel` or an `[athPageFill]` element) takes
 *   the height under the head and its panels scroll inside themselves
 *   (board, calendar, inbox). Below 768px fill falls back to scroll.
 */
export type PageMode = 'scroll' | 'fill';
/**
 * The shared page frame: the head slot (`ath-page-header` or
 * `[athPageHead]`), then a body column spaced by `--section-gap`.
 *
 * In the body, toolbars and alerts keep their height; the first
 * `ath-panel-grid`, `ath-panel` or `[athPageFill]` child takes the rest.
 *
 * **Contract with the app shell** (see the README, "Page frame"): the
 * scroll container that hosts routed pages carries the class `ath-stage`,
 * has a definite height (a flex item with `min-height: 0` in a full-height
 * column) and its bottom padding is `--content-pad-bottom`. `ath-page` is
 * the root element of the routed component's template. The lib's global
 * styles (`styles/_layout.scss`) turn the stage into a flex column and let
 * the route host grow.
 *
 * @example
 * <ath-page mode="fill">
 *   <ath-page-header title="Inbox" [subItems]="[unread + ' unread']" />
 *   <ath-alert variant="error" [message]="error()" [retry]="reload" />
 *   <ath-panel-grid columns="side-main">
 *     <ath-panel title="Filters">…</ath-panel>
 *     <ath-panel title="Activity" [count]="items().length">…</ath-panel>
 *   </ath-panel-grid>
 * </ath-page>
 */
export declare class AthPageComponent {
  readonly mode: import("@angular/core").InputSignal<PageMode>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthPageComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthPageComponent, "ath-page", never, {
    "mode": {
      "alias": "mode";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, ["ath-page-header, [athPageHead]", "*"], true, never>;
}
/** Heading level of a panel's title. */
export type PanelLevel = 2 | 3;
/** How a panel clips what overflows it. */
export type PanelOverflow = 'hidden' | 'clip';
/**
 * A panel: surface, hairline border, `--panel-radius`, and an optional
 * head row (`--panel-head-h`) with title, projected head content, a count
 * and actions. The body takes the panel's height and scrolls inside it
 * when the panel is stretched by `ath-panel-grid` or a fill page.
 *
 * Slots: `[athPanelHead]` (after the title), `[athPanelActions]` (right),
 * default (body), `[athPanelFoot]` (under the body). The head row is drawn
 * only when it has something in it.
 *
 * @example
 * <ath-panel title="Active tickets" [count]="'5 open'">
 *   <ath-button athPanelActions variant="ghost" size="xs">Filter</ath-button>
 *   …rows…
 * </ath-panel>
 * <ath-panel title="Activity" [loading]="loading()" [padded]="true">…</ath-panel>
 * <ath-panel [scroll]="false" overflow="clip">…a sticky toolbar…</ath-panel>
 */
export declare class AthPanelComponent {
  readonly title: import("@angular/core").InputSignal<string | null | undefined>;
  /** Heading level of the title (2 under a page's h1). */
  readonly level: import("@angular/core").InputSignal<PanelLevel>;
  /** Quiet count at the head's right ("5 open", 12). */
  readonly count: import("@angular/core").InputSignal<string | number | null | undefined>;
  /** Pad the body with `--panel-pad-y` / `--panel-pad-x` (off for tables and lists). */
  readonly padded: import("@angular/core").InputSignal<boolean>;
  /** Let the body scroll when the panel is shorter than its content. */
  readonly scroll: import("@angular/core").InputSignal<boolean>;
  /**
   * How the panel cuts its content at the rounded frame. `hidden` (default)
   * makes the panel a scroll container; `clip` cuts the same way without
   * one, so `position: sticky` inside (an editor toolbar, an outline) sticks
   * to the page's scroller instead. Use `clip` with `[scroll]="false"`.
   */
  readonly overflow: import("@angular/core").InputSignal<PanelOverflow>;
  /** Rows placeholder instead of the content. */
  readonly loading: import("@angular/core").InputSignal<boolean>;
  readonly skeletonRows: import("@angular/core").InputSignal<number>;
  /** Columns / rows this panel spans in an `ath-panel-grid` (1–4). */
  readonly colSpan: import("@angular/core").InputSignal<number>;
  readonly rowSpan: import("@angular/core").InputSignal<number>;
  protected readonly rows: import("@angular/core").Signal<number[]>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthPanelComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthPanelComponent, "ath-panel", never, {
    "title": {
      "alias": "title";
      "required": false;
      "isSignal": true;
    };
    "level": {
      "alias": "level";
      "required": false;
      "isSignal": true;
    };
    "count": {
      "alias": "count";
      "required": false;
      "isSignal": true;
    };
    "padded": {
      "alias": "padded";
      "required": false;
      "isSignal": true;
    };
    "scroll": {
      "alias": "scroll";
      "required": false;
      "isSignal": true;
    };
    "overflow": {
      "alias": "overflow";
      "required": false;
      "isSignal": true;
    };
    "loading": {
      "alias": "loading";
      "required": false;
      "isSignal": true;
    };
    "skeletonRows": {
      "alias": "skeletonRows";
      "required": false;
      "isSignal": true;
    };
    "colSpan": {
      "alias": "colSpan";
      "required": false;
      "isSignal": true;
    };
    "rowSpan": {
      "alias": "rowSpan";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, ["[athPanelHead]", "[athPanelActions]", "*", "[athPanelFoot]"], true, never>;
}
/**
 * Column presets of `ath-panel-grid`; any other string is used as
 * `grid-template-columns` as given.
 */
export type PanelGridColumns = '1' | '2' | '3' | '4' | 'main-side' | 'side-main' | (string & {});
/**
 * - `fill` (default): rows share the height. In a fill page each row gets
 *   an equal part and the panels scroll inside; in a scroll page rows are
 *   as tall as their content and stretch to the bottom when it is short.
 * - `auto`: natural row heights, no stretching.
 * - any other string: `grid-template-rows` as given (e.g. `auto minmax(0, 1fr)`).
 */
export type PanelGridRows = 'fill' | 'auto' | (string & {});
/** The `grid-template-columns` for a preset or a custom template. */
export declare function panelGridColumns(columns: PanelGridColumns): string;
/**
 * Panels in rows that share their height: every panel in a row is as tall
 * as the row (no height mismatch between neighbours), the rows fill the
 * page body, and a panel's body scrolls inside it when the row is shorter.
 * Narrower than 720px (its own width, a container query) the grid stacks
 * into one column with natural heights, and the page scrolls.
 *
 * Panels span columns or rows with `ath-panel [colSpan]` / `[rowSpan]`.
 *
 * @example
 * <ath-panel-grid columns="main-side">
 *   <ath-panel title="Active tickets">…</ath-panel>
 *   <ath-panel title="Due this week">…</ath-panel>
 * </ath-panel-grid>
 * <ath-panel-grid columns="2" rows="auto minmax(0, 1fr)">…</ath-panel-grid>
 */
export declare class AthPanelGridComponent {
  readonly columns: import("@angular/core").InputSignal<PanelGridColumns>;
  readonly rows: import("@angular/core").InputSignal<PanelGridRows>;
  protected readonly templateColumns: import("@angular/core").Signal<string>;
  protected readonly rowsMode: import("@angular/core").Signal<"custom" | PanelGridRows>;
  protected readonly templateRows: import("@angular/core").Signal<PanelGridRows | null>;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthPanelGridComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthPanelGridComponent, "ath-panel-grid", never, {
    "columns": {
      "alias": "columns";
      "required": false;
      "isSignal": true;
    };
    "rows": {
      "alias": "rows";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, ["*"], true, never>;
}
/**
 * Shared part of `athPopoverTrigger` and `athMenuTrigger`: keeps
 * `aria-haspopup`, `aria-expanded` and `aria-controls` on the real control.
 * On a wrapper component such as `<ath-button>` that is its inner `<button>`,
 * so there is one tab stop and the state is announced where focus is.
 */
declare abstract class AthOverlayTriggerBase {
  protected readonly host: HTMLElement;
  /** The value of `aria-haspopup`. */
  protected abstract popupKind(): string;
  protected abstract isOpen(): boolean;
  protected abstract popupId(): string;
  constructor();
  /** The focusable control the attributes go on. */
  get control(): HTMLElement;
  /** A stable id on the control, for `aria-labelledby` of the popup. */
  controlId(): string;
  private syncAria;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthOverlayTriggerBase, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<AthOverlayTriggerBase, never, never, {}, {}, never, never, true, never>;
}
/** The `aria-haspopup` value of a popover trigger. */
export type PopoverTriggerPopup = 'dialog' | 'listbox' | 'menu';
/**
 * Opens an `ath-popover` from a button and anchors it there. Sets
 * `aria-haspopup`, `aria-expanded` and `aria-controls` on the real control
 * (the inner `<button>` of an `<ath-button>`).
 *
 * @example
 * <button type="button" [athPopoverTrigger]="pop">Filter</button>
 * <ath-popover #pop ariaLabel="Filter">…</ath-popover>
 */
export declare class AthPopoverTriggerDirective extends AthOverlayTriggerBase {
  readonly popover: import("@angular/core").InputSignal<AthPopoverComponent>;
  /** `aria-haspopup` value; `listbox` for a picker without a search field. */
  readonly popupType: import("@angular/core").InputSignal<PopoverTriggerPopup>;
  protected popupKind(): string;
  protected isOpen(): boolean;
  protected popupId(): string;
  protected onClick(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthPopoverTriggerDirective, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<AthPopoverTriggerDirective, "[athPopoverTrigger]", ["athPopoverTrigger"], {
    "popover": {
      "alias": "athPopoverTrigger";
      "required": true;
      "isSignal": true;
    };
    "popupType": {
      "alias": "popupType";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, never, true, never>;
}
export type MenuItemVariant = 'default' | 'danger';
/**
 * One entry of an `ath-menu`: `<button athMenuItem>`, `<a athMenuItem>` or
 * `<ath-menu-item>`.
 *
 * Disabled items stay focusable (`aria-disabled`), so keyboard and screen
 * reader users can find them and hear `disabledReason`, which is also the
 * hover tooltip. Use `(triggered)` rather than `(click)`: it does not fire for
 * disabled items and closes the menu afterwards (unless `keepOpen`).
 *
 * @example
 * <button athMenuItem [icon]="Pencil" shortcut="E" (triggered)="edit()">Edit</button>
 * <button athMenuItem variant="danger" [disabled]="!canDelete" [disabledReason]="why"
 *         (triggered)="delete()">Delete</button>
 */
export declare class AthMenuItemComponent {
  private readonly menu;
  /** The item element (the `<button>` or `<a>`). */
  readonly element: HTMLElement;
  protected readonly isButton: boolean;
  protected readonly checkIcon: import("lucide").IconNode;
  protected readonly reasonId: string;
  /** A Lucide icon before the label. */
  readonly icon: import("@angular/core").InputSignal<AthIconData | null | undefined>;
  /** Shortcut hint shown at the end, e.g. `⌘E`. */
  readonly shortcut: import("@angular/core").InputSignal<string | null>;
  /** `aria-keyshortcuts` value, e.g. `Meta+E` (the hint itself is hidden from AT). */
  readonly keyshortcuts: import("@angular/core").InputSignal<string | null>;
  readonly variant: import("@angular/core").InputSignal<MenuItemVariant>;
  readonly disabled: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Why the item is disabled: tooltip and accessible description. */
  readonly disabledReason: import("@angular/core").InputSignal<string | null | undefined>;
  /** Hover tooltip (for a disabled item `disabledReason` takes its place). */
  readonly tooltip: import("@angular/core").InputSignal<string | null | undefined>;
  /** `true`/`false` makes it a `menuitemcheckbox` with a check mark. */
  readonly checked: import("@angular/core").InputSignal<boolean | null>;
  /**
   * `true`/`false` makes it a `menuitemradio`, one of a menu that picks a
   * value: the current one carries a trailing check (`ath-dropdown
   * [activeId]`), and the menu opens on it.
   */
  readonly selected: import("@angular/core").InputSignal<boolean | null>;
  /** Leave the menu open after activation. */
  readonly keepOpen: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** The item was chosen (click, Enter or Space) and is not disabled. */
  readonly triggered: import("@angular/core").OutputEmitterRef<void>;
  protected readonly role: import("@angular/core").Signal<"menuitemcheckbox" | "menuitemradio" | "menuitem">;
  /** The visible label, for typeahead. */
  label(): string;
  focus(): void;
  protected onClick(event: MouseEvent): void;
  protected onKeydown(event: KeyboardEvent): void;
  protected onHover(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthMenuItemComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthMenuItemComponent, "ath-menu-item, button[athMenuItem], a[athMenuItem]", ["athMenuItem"], {
    "icon": {
      "alias": "icon";
      "required": false;
      "isSignal": true;
    };
    "shortcut": {
      "alias": "shortcut";
      "required": false;
      "isSignal": true;
    };
    "keyshortcuts": {
      "alias": "keyshortcuts";
      "required": false;
      "isSignal": true;
    };
    "variant": {
      "alias": "variant";
      "required": false;
      "isSignal": true;
    };
    "disabled": {
      "alias": "disabled";
      "required": false;
      "isSignal": true;
    };
    "disabledReason": {
      "alias": "disabledReason";
      "required": false;
      "isSignal": true;
    };
    "tooltip": {
      "alias": "tooltip";
      "required": false;
      "isSignal": true;
    };
    "checked": {
      "alias": "checked";
      "required": false;
      "isSignal": true;
    };
    "selected": {
      "alias": "selected";
      "required": false;
      "isSignal": true;
    };
    "keepOpen": {
      "alias": "keepOpen";
      "required": false;
      "isSignal": true;
    };
  }, {
    "triggered": "triggered";
  }, never, ["*"], true, never>;
}
/** A divider between groups of menu items. */
export declare class AthMenuSeparatorComponent {
  static ɵfac: i0.ɵɵFactoryDeclaration<AthMenuSeparatorComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthMenuSeparatorComponent, "ath-menu-separator", never, {}, {}, never, never, true, never>;
}
/**
 * Makes a button the menu button of an `ath-menu`: click, Enter and Space
 * open it on the first item, ArrowDown on the first, ArrowUp on the last.
 * `aria-haspopup="menu"`, `aria-expanded` and `aria-controls` go on the real
 * control (the inner `<button>` of an `<ath-button>`), and the menu is
 * labelled by it.
 *
 * @example
 * <button type="button" [athMenuTrigger]="menu" aria-label="Actions">⋯</button>
 */
export declare class AthMenuTriggerDirective extends AthOverlayTriggerBase {
  readonly menu: import("@angular/core").InputSignal<AthMenuComponent>;
  protected popupKind(): string;
  protected isOpen(): boolean;
  protected popupId(): string;
  protected onClick(): void;
  protected onKeydown(event: KeyboardEvent): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthMenuTriggerDirective, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<AthMenuTriggerDirective, "[athMenuTrigger]", ["athMenuTrigger"], {
    "menu": {
      "alias": "athMenuTrigger";
      "required": true;
      "isSignal": true;
    };
  }, {}, never, never, true, never>;
}
/** `button`: the picker draws its own trigger; `none`: it hangs from `anchor`. */
export type OptionPickerTrigger = 'button' | 'none';
/**
 * Athenos Option Picker: `ath-popover` + `ath-listbox` behind a select-style
 * trigger. The base for person, label, filter and relation pickers.
 *
 * `trigger="none"` drops the built-in button: the panel hangs from `anchor`
 * (or the host) and opens through `[(open)]` or `show()`.
 *
 * @example
 * <ath-option-picker [options]="labels" multiple [(values)]="selected"
 *                    creatable (create)="addLabel($event)" ariaLabel="Labels" />
 */
export declare class AthOptionPickerComponent<T = string> {
  protected readonly labels: Readonly<import("@athenos/webcomponents").AthLabels>;
  private readonly host;
  readonly options: import("@angular/core").InputSignal<readonly ListboxOption<T>[]>;
  readonly multiple: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  readonly value: import("@angular/core").ModelSignal<T | null>;
  readonly values: import("@angular/core").ModelSignal<readonly T[]>;
  /** Search text; `(queryChange)` drives server-side search. */
  readonly query: import("@angular/core").ModelSignal<string>;
  readonly searchable: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  readonly localFilter: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  readonly creatable: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  readonly loading: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  readonly searchPlaceholder: import("@angular/core").InputSignal<string | null>;
  readonly emptyLabel: import("@angular/core").InputSignal<string | null>;
  readonly optionTemplate: import("@angular/core").InputSignal<TemplateRef<ListboxOptionContext<T>> | null>;
  readonly compareWith: import("@angular/core").InputSignal<((a: T, b: T) => boolean) | null>;
  readonly maxHeight: import("@angular/core").InputSignal<number | null>;
  /** `button`: built-in select-style trigger; `none`: you provide `anchor` and open it. */
  readonly trigger: import("@angular/core").InputSignal<OptionPickerTrigger>;
  /** Trigger text without a selection; defaults to `ATH_LABELS.pickerPlaceholder`. */
  readonly placeholder: import("@angular/core").InputSignal<string | null>;
  readonly disabled: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** A clear button next to the trigger while something is selected. */
  readonly clearable: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** What is being picked ("Assignee"): names the trigger and the popup. */
  readonly ariaLabel: import("@angular/core").InputSignal<string | null>;
  readonly open: import("@angular/core").ModelSignal<boolean>;
  readonly anchor: import("@angular/core").InputSignal<FloatingAnchor>;
  readonly size: import("@angular/core").InputSignal<PopoverSize>;
  readonly align: import("@angular/core").InputSignal<FloatingAlign>;
  readonly matchWidth: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Close after a pick; default: single-select yes, multi-select no. */
  readonly closeOnPick: import("@angular/core").InputSignal<boolean | null>;
  /** Empty the search when the popup opens. */
  readonly resetQueryOnOpen: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  readonly picked: import("@angular/core").OutputEmitterRef<ListboxOption<T>>;
  readonly create: import("@angular/core").OutputEmitterRef<string>;
  readonly opened: import("@angular/core").OutputEmitterRef<void>;
  readonly closed: import("@angular/core").OutputEmitterRef<AthOverlayCloseReason>;
  protected readonly chevronIcon: import("lucide").IconNode;
  protected readonly clearIcon: import("lucide").IconNode;
  protected readonly labelId: string;
  protected readonly valueId: string;
  private readonly popover;
  private readonly triggerButton;
  /** Rendered only while the popup is open. */
  private readonly listbox;
  protected readonly popupAnchor: import("@angular/core").Signal<HTMLElement | null>;
  protected readonly placeholderText: import("@angular/core").Signal<string>;
  private readonly selectedOptions;
  protected readonly hasValue: import("@angular/core").Signal<boolean>;
  /** The trigger text: the selection, "N selected", or the placeholder. */
  readonly summary: import("@angular/core").Signal<string>;
  show(): void;
  hide(): void;
  toggle(): void;
  /** Empties the selection. */
  clear(): void;
  protected onOpened(): void;
  protected onPicked(option: ListboxOption<T>): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthOptionPickerComponent<any>, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthOptionPickerComponent<any>, "ath-option-picker", ["athOptionPicker"], {
    "options": {
      "alias": "options";
      "required": false;
      "isSignal": true;
    };
    "multiple": {
      "alias": "multiple";
      "required": false;
      "isSignal": true;
    };
    "value": {
      "alias": "value";
      "required": false;
      "isSignal": true;
    };
    "values": {
      "alias": "values";
      "required": false;
      "isSignal": true;
    };
    "query": {
      "alias": "query";
      "required": false;
      "isSignal": true;
    };
    "searchable": {
      "alias": "searchable";
      "required": false;
      "isSignal": true;
    };
    "localFilter": {
      "alias": "localFilter";
      "required": false;
      "isSignal": true;
    };
    "creatable": {
      "alias": "creatable";
      "required": false;
      "isSignal": true;
    };
    "loading": {
      "alias": "loading";
      "required": false;
      "isSignal": true;
    };
    "searchPlaceholder": {
      "alias": "searchPlaceholder";
      "required": false;
      "isSignal": true;
    };
    "emptyLabel": {
      "alias": "emptyLabel";
      "required": false;
      "isSignal": true;
    };
    "optionTemplate": {
      "alias": "optionTemplate";
      "required": false;
      "isSignal": true;
    };
    "compareWith": {
      "alias": "compareWith";
      "required": false;
      "isSignal": true;
    };
    "maxHeight": {
      "alias": "maxHeight";
      "required": false;
      "isSignal": true;
    };
    "trigger": {
      "alias": "trigger";
      "required": false;
      "isSignal": true;
    };
    "placeholder": {
      "alias": "placeholder";
      "required": false;
      "isSignal": true;
    };
    "disabled": {
      "alias": "disabled";
      "required": false;
      "isSignal": true;
    };
    "clearable": {
      "alias": "clearable";
      "required": false;
      "isSignal": true;
    };
    "ariaLabel": {
      "alias": "ariaLabel";
      "required": false;
      "isSignal": true;
    };
    "open": {
      "alias": "open";
      "required": false;
      "isSignal": true;
    };
    "anchor": {
      "alias": "anchor";
      "required": false;
      "isSignal": true;
    };
    "size": {
      "alias": "size";
      "required": false;
      "isSignal": true;
    };
    "align": {
      "alias": "align";
      "required": false;
      "isSignal": true;
    };
    "matchWidth": {
      "alias": "matchWidth";
      "required": false;
      "isSignal": true;
    };
    "closeOnPick": {
      "alias": "closeOnPick";
      "required": false;
      "isSignal": true;
    };
    "resetQueryOnOpen": {
      "alias": "resetQueryOnOpen";
      "required": false;
      "isSignal": true;
    };
  }, {
    "value": "valueChange";
    "values": "valuesChange";
    "query": "queryChange";
    "open": "openChange";
    "picked": "picked";
    "create": "create";
    "opened": "opened";
    "closed": "closed";
  }, never, never, true, never>;
}
/** Where focus goes when the sheet opens. */
export type SheetAutoFocus = 'panel' | 'first' | 'none';
/**
 * Athenos Sheet: a non-modal side sheet at the inline end of the viewport
 * (the right in LTR), for detail that sits beside the page instead of over
 * it — a ticket's peek view next to the list it was opened from.
 *
 * - **Non-modal:** no scrim, no focus trap, no scroll lock. The page beside
 *   it stays usable; a click there does not close the sheet.
 * - **Top layer:** the panel is promoted with `popover="manual"`, so no
 *   ancestor's `overflow`, `transform` or `z-index` clips or covers it.
 *   Menus, pickers and dialogs opened later lie above it; the toast
 *   container is raised above it too. Without the Popover API it falls back
 *   to `position: fixed` at `--z-fixed`.
 * - **Escape** (topmost overlay only, via `AthOverlayStack`) asks to close:
 *   it emits `closed` and `openChange(false)`. The sheet is controlled and
 *   closes when `open` turns false, so a parent may refuse (an edit to
 *   cancel first).
 * - **Focus:** on open it moves into the sheet (`autoFocus`: the panel
 *   itself by default, or the first control); on close it returns to where
 *   it was before, when it was inside the sheet or would otherwise be lost.
 *   Tab moves on through the page as usual.
 *
 * The panel stays where the template puts it in the DOM (encapsulated
 * styles, event bubbling and tab order keep working) and inherits text
 * styles from there. `top` keeps a shell's top bar uncovered.
 *
 * @example
 * <ath-sheet [open]="!!ticket()" [ariaLabel]="ticket()?.title" width="560px" top="48px"
 *            (closed)="ticket.set(null)">
 *   …detail…
 * </ath-sheet>
 */
export declare class AthSheetComponent implements OnChanges, OnDestroy {
  private readonly stack;
  /** Whether the sheet is shown. Controlled; pair with `(openChange)` or `(closed)`. */
  readonly open: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Width (a CSS length); capped at the viewport. Default 480px. */
  readonly width: import("@angular/core").InputSignal<string | null>;
  /** Distance from the viewport's top (a CSS length), e.g. a top bar's height. Default 0. */
  readonly top: import("@angular/core").InputSignal<string | null>;
  readonly ariaLabel: import("@angular/core").InputSignal<string | null>;
  readonly ariaLabelledby: import("@angular/core").InputSignal<string | null>;
  readonly autoFocus: import("@angular/core").InputSignal<SheetAutoFocus>;
  /** Return focus to where it was before opening (see the class comment). */
  readonly restoreFocus: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Whether Escape asks to close. */
  readonly closeOnEscape: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
  /** Extra classes on the panel (it lives in this component's view). */
  readonly panelClass: import("@angular/core").InputSignal<string>;
  readonly panelId: import("@angular/core").InputSignal<string>;
  /** The user asked to close (Escape). */
  readonly closed: import("@angular/core").OutputEmitterRef<void>;
  /** Two-way partner of `open`; emits `false` on a close request. */
  readonly openChange: import("@angular/core").OutputEmitterRef<boolean>;
  /** The sheet is shown (in the top layer, focus placed). */
  readonly opened: import("@angular/core").OutputEmitterRef<void>;
  private panelEl;
  private returnFocus;
  private readonly entry;
  /** The panel element while open. */
  get panel(): HTMLElement | null;
  /** The panel; rendered while `open` is true. */
  private readonly panelRef;
  constructor();
  private attach;
  ngOnChanges(changes: SimpleChanges): void;
  ngOnDestroy(): void;
  /** Asks to close, as Escape does. */
  close(): void;
  private requestClose;
  private present;
  private focusInitial;
  private teardown;
  static ɵfac: i0.ɵɵFactoryDeclaration<AthSheetComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<AthSheetComponent, "ath-sheet", never, {
    "open": {
      "alias": "open";
      "required": false;
      "isSignal": true;
    };
    "width": {
      "alias": "width";
      "required": false;
      "isSignal": true;
    };
    "top": {
      "alias": "top";
      "required": false;
      "isSignal": true;
    };
    "ariaLabel": {
      "alias": "ariaLabel";
      "required": false;
      "isSignal": true;
    };
    "ariaLabelledby": {
      "alias": "ariaLabelledby";
      "required": false;
      "isSignal": true;
    };
    "autoFocus": {
      "alias": "autoFocus";
      "required": false;
      "isSignal": true;
    };
    "restoreFocus": {
      "alias": "restoreFocus";
      "required": false;
      "isSignal": true;
    };
    "closeOnEscape": {
      "alias": "closeOnEscape";
      "required": false;
      "isSignal": true;
    };
    "panelClass": {
      "alias": "panelClass";
      "required": false;
      "isSignal": true;
    };
    "panelId": {
      "alias": "panelId";
      "required": false;
      "isSignal": true;
    };
  }, {
    "closed": "closed";
    "openChange": "openChange";
    "opened": "opened";
  }, never, ["*"], true, never>;
}
/**
 * The labels a component reads: the app's `ATH_LABELS` where it provides
 * one, the English default otherwise. Call in an injection context; the
 * members stay functions, so a provider that reads a signal (the current
 * language) keeps a `computed` that calls them current.
 *
 * The result is shared by every component under the same provider (a board
 * built hundreds of 40-key copies): read it, never write to it.
 */
export declare function injectAthLabels(): Readonly<AthLabels$1>;
/** Fills `{name}` placeholders of a label; unknown ones stay as written. */
export declare function formatAthLabel(template: string, params: Readonly<Record<string, string | number>>): string;
export { ATH_DATE_CONTEXT, ATH_DEFAULT_LABELS, ATH_LABELS, ATH_MARKDOWN_PARSER, ATH_PRIORITY_LABELS, ATH_STATUS_LABELS, ATH_STATUS_TONES, type AthDateContext, type AthLabels, type AthMarkdownParser, type AthOverlayCloseReason as PopoverCloseReason, AthToastService, type DueDateFormat, type PriorityLabelResolver, type StatusLabelResolver, type StatusToneResolver, type TicketPriority, type TicketStatus, type ToastAction, type ToastMessage, type ToastOptions, type ToastVariant };