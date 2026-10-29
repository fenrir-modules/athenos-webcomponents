# @athenos/webcomponents

Athenos's Angular component library: design tokens, global styles and the `ath-*` presentational primitives. No HTTP, no domain words. `athenos-web` uses it through `npm run deps:sync`.

Angular 22 and TypeScript 6.0; the Angular CLI needs Node ^22.22.3 or ^24.15 (CI: 24.15.0).

```sh
npm run build:lib        # tokens:build, then ng build athenos-webcomponents → dist/
npm run check:dist       # build:lib, then fail if dist/ differs from the commit (CI runs it)
npm test                 # unit tests: Vitest in headless Chromium, with zone.js
npm run test:zoneless    # the same specs without zone.js (see "Signal APIs and zoneless")
npm run test:tokens      # token pipeline tests (node --test)
npm run lint             # shared config, ESLint, Stylelint, i18n, tsc, a11y, tokens:check, Prettier, knip
npm run storybook        # component catalogue on :6006
npm run build-storybook  # static catalogue → storybook-static/
npm run test:storybook   # axe + screenshots over storybook-static/ (see "Component catalogue")
```

**Git installs ship the committed `dist/`.** The app installs this package from a git commit, and that commit carries the built `dist/athenos-webcomponents/`. So `package.json` has no `build`, `prepare`, `prepack` or `(pre|post)install` script: with any of them npm runs a full `npm install` with every devDependency (Storybook, ng-packagr, Playwright, Vitest) in the clone, in every consumer's CI. Build with `npm run build:lib` and commit `dist/` together with the source change; `npm run check:dist` and CI (`scripts/check-package.mjs --dist`) fail when the committed `dist/` is not byte for byte what the sources build to, or when one of those scripts comes back.

## Design tokens

### One source of truth

All design tokens live in **DTCG JSON** under `projects/athenos-webcomponents/tokens/`:

| File                                                    | Contents                                                                                                             |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `base.json`                                             | Every token with its light/default value: colour, focus, radius, shadow, type, density, size, space, motion, z-index |
| `themes/dark.json`                                      | Values for `[data-theme="dark"]`. It may only re-value tokens from `base.json`.                                      |
| `accents/<name>.light.json`, `accents/<name>.dark.json` | Accent presets for `[data-accent]` and `[data-theme="dark"][data-accent]`                                            |
| `tokens.config.json`                                    | Output paths, block order (which is the cascade order), the theme × accent contexts and the **contrast gate**        |

`scripts/tokens/build.mjs` (`npm run tokens:build`) generates these files:

- `src/lib/styles/_tokens.scss` holds the CSS custom properties for `:root, [data-theme="light"]`, `[data-theme="dark"]` and the 10 accent blocks. **Never edit this file by hand.**
- `src/lib/styles/tokens.custom-properties.json` is the list of names for Stylelint's `importFrom`. It ships in `dist/…/styles/`, so the app's Stylelint can use it too.
- `src/lib/styles/tokens.inventory.json` lists each name with its path, type and deprecation, for scripts.

`npm run build:lib` runs the generator first. `npm run lint` runs `tokens:check`, which fails when an output is stale or a contrast rule is broken.

### Format rules

- DTCG structure: groups, `$value`, `$type` (inherited from the group), `$description`, `$deprecated` (inherited), and aliases written as `{group.sub.token}`. Values are CSS strings, not the spec's object forms, so the output stays byte-exact. Style Dictionary 4+ reads the same files.
- **The CSS name is the leaf key**, so `color.surface.bg-0` becomes `--bg-0`. Groups only organise the tokens. Leaf keys are unique, and the build fails on duplicates.
- Aliases are emitted as `var(--leaf)`, not resolved, so dark and accent overrides still flow through the cascade. If a `$value` contains `var(--…)` instead of an alias, the build fails, and so it does for unknown aliases, alias cycles in any theme × accent context and overrides of tokens that don't exist.
- Light also matches an explicit `data-theme="light"` (DS-15). Components never carry theme selectors; a difference between themes belongs in a token.

### Contrast gate

`tokens.config.json → contrast` lists foreground/background pairs with a minimum ratio. The build resolves them in all 12 theme × accent contexts using WCAG 2.x maths; translucent values are composited, and `color-mix()` is evaluated. A translucent `bg` (a tint) is composited over the canvas (`--bg-0`), or over each token in the rule's `over` list, the surfaces it sits on: `{ "fg": "red-text", "bg": ["red-tint"], "over": ["bg-0", "surface"], "min": 4.5 }`. Today that is 1296 checks, among them:

- `--focus-ring-color` at ≥ 3:1 on all surfaces (WCAG 1.4.11)
- `--fg` through `--fg-4` and `--fg-label` at ≥ 4.5:1
- the status text tokens `--red-text`, `--amber-text`, `--green-text`, `--blue-text`, `--purple-text` at ≥ 4.5:1 on `--surface`, `--bg-0`, `--bg-1`, `--surface-2`, `--bg-2` and on their own tint over `--bg-0` and `--surface`
- `--accent-text` on the surfaces and on `--accent-faint` / `--accent-ring`, and the dark accent roles that carry text (active tab, nav item and badge, segment count, primary and active chips, outline button, selection bar) on their tints
- the labels of "+ New", the primary button (also pressed), the danger button and the avatars at ≥ 4.5:1

### Using tokens

- **Focus:** buttons, links, chips: `@include focus-ring` (from `_mixins.scss`), or `outline: none; box-shadow: var(--focus-ring-shadow)`. **Form fields** (input, textarea, select, a picker's trigger, an editor box): `@include field-focus` on `:focus-visible` (or `:focus-within` for a box around a borderless field) — the border turns `--focus-ring-color`, `--field-focus-shadow` adds a soft halo; one line, never the gap ring, which on a bordered field read as a heavy double outline. Error state: `field-focus-error`. Rows in lists and menus: `focus-ring-inset`, keyboard focus only; hover is a background. The global `:focus-visible` uses `--focus-ring-color`; on text fields it is 1px on the border itself (`outline-offset: -1px`, zero specificity, so a component's rule wins). `--accent-ring` is only a decorative halo next to a border in the focus colour.
- **Status text:** `--red`, `--amber`, `--green`, `--blue`, `--purple` are for icons, dots, fills and borders; text uses `--red-text`, `--amber-text`, `--green-text`, `--blue-text`, `--purple-text`, a darker (light) or lighter (dark) shade of the same hue. Accent-coloured text uses `--accent-text`; a colour the app passes in (a project colour) is mixed towards `--fg` with `--tone-text-mix`. The solid danger button reads `--action-danger-bg`, `-bg-hover` and `-fg`.
- **z-index:** only the scale `--z-base`, `--z-raised`, `--z-dropdown`, `--z-sticky`, `--z-fixed`, `--z-overlay`, `--z-modal`, `--z-popover`, `--z-tooltip`, `--z-toast` (or a `calc()` on one of them).
- **No fallbacks on tokens:** tokens are always defined, so a fallback is dead code that drifts.
- **No `--ath-*` and no `--gold`.** These legacy aliases were removed in quality step 2.7 (each pointed to one token: `--ath-text-primary` → `--fg`, `--ath-border-color` → `--border`, `--ath-space-3` → `--space-3`, `--ath-transition-fast` → `--t-fast`, `--gold` → `--accent`; the full map is in `artifacts/quality/phase2/p27/alias-map.json`). The token build rejects the names, and Stylelint (`athenos/no-retired-alias`) rejects any `--ath-*` / `--gold` custom property, declared or read, in both repos; a component's own variable takes a plain name (`--panel-grid-columns`).

### Guardrails

- `npm run lint:styles` runs Stylelint (`stylelint.config.mjs`) with these rules:
  - `csstools/value-no-unknown-custom-properties`, fed by the generated list
  - `athenos/no-unknown-custom-property-with-fallback` and `athenos/no-fallback-on-token` (`scripts/stylelint/athenos-tokens.mjs`). The csstools rule lets `var(--unknown, x)` through; these two don't.
  - `athenos/no-retired-alias`: no `--ath-*` / `--gold` custom property (declared or read)
  - z-index only from the scale
  - in component styles: no hex, named or `rgb()`/`hsl()` colours, and no `data-theme`/`.ath-light|dark` selectors
- Existing violations are recorded in `stylelint-suppressions.json` (Stylelint bulk suppressions), so only new ones fail. After fixing something, run `npm run lint:styles:baseline` to shrink the file. Never grow it by hand.
- `npm run tokens:report-app [path/to/app/src]` reports on `athenos-web` (default `../athenos-web/src`) and never edits it. It runs the same rules over the app's SCSS and inline `styles`, plus a pass over templates and TS strings. It reports undefined tokens, fallbacks that disagree with the token value, dead theme selectors and use of deprecated tokens (none today). With `--strict` it exits 1 when it finds undefined tokens.
- `npm run tokens:parity [-- --ref <git-ref>]` compiles `main.scss` at a ref and in the working tree and diffs every custom property per selector, plus all other rules. Any difference that is not listed in `scripts/tokens/parity-expected.json` fails.

### Why a small generator instead of Style Dictionary

Style Dictionary 5 brings 13 runtime dependencies: prettier, colorjs.io, tinycolor2, chalk, commander, change-case, json5, a zip library, a bundled memfs/glob and others. We would still need custom formats for what we need here:

- leaf-key naming
- aliases kept as `var()`
- several selector blocks in cascade order
- byte-exact values
- comments carried over from `$description`
- a contrast gate over theme × accent

The generator is about 450 lines of plain Node with no dependencies and is covered by `scripts/tokens/tokens.test.mjs`. The sources follow DTCG, so switching to Style Dictionary later only means writing a format; the JSON doesn't change.

## Icons: `ath-icon` and `@athenos/webcomponents/icons` (W4-A)

```ts
import { AthIconComponent } from '@athenos/webcomponents';
import { Users } from '@athenos/webcomponents/icons';
```

```html
<ath-icon [img]="Users" [size]="16" />
```

- `@athenos/webcomponents/icons` re-exports every icon of the framework-free `lucide` package as plain data (`AthIconData`), under the names `lucide-angular` used. It has no code of its own, so a bundle gets exactly the icons it imports, in the chunk that imports them.
- `ath-icon` replaces `lucide-angular`'s `<lucide-icon>` (deprecated, Angular up to 21 only) with the same shape and inputs: an inline host with the `<svg>` inside; `img`, `size`, `strokeWidth`, `color`, `absoluteStrokeWidth`; a static `class` lands on the host and the svg. Host styles, toggled host classes, `role`, `aria-label` and `title` work as before.
- The svg is drawn by `LucideDynamicIcon` from `@lucide/angular` and is always `aria-hidden`; name the host when the icon carries meaning. Not used: the per-icon components of `@lucide/angular`, each with its own copy of the template (2–3 kB per icon in a bundle).
- An icon of your own is `{ name, node }`; the svg gets the class `lucide-<name>`. `LucideDynamicIcon` passes only a fixed set of attributes to the paths (no `fill-rule`); set such a property in CSS on `svg.lucide-<name>`.
- `@lucide/angular` and `lucide` are released together; update both to the same version.

## Display primitives (quality step 1.7)

Presentational only: the app passes ids, names, colours and dates; resolving them (directories, ticket types, sprints) stays in the app. Every word comes from `ATH_LABELS` (`core/src/labels.ts`); labels with placeholders (`{count}`, `{name}`, `{sprint}`) keep them in the translation, e.g. `dueOverdue: () => t('time.due.overdue', { count: '{count}' })`.

### `ath-avatar`

```html
<ath-avatar [person]="{ id: u.id, name: u.name, src: u.avatar_url }" size="sm" />
<ath-avatar [person]="assignee ?? null" size="sm" />
<!-- null → empty seat -->
<ath-avatar [unassigned]="true" size="sm" />
```

Inputs: `person: {id, name, src} | null`, or the separate `name` / `src` / `id`; `size: xs|sm|md|lg|xl` (`--avatar-<size>` and `--avatar-font-<size>`); `unassigned`; `label` (accessible name and tooltip). The tone is keyed on the **id** (`avatarToneFor`); without an id it falls back to the initials (two people with the same initials then share a colour: pass the id). `ath-avatar-stack` takes `users: StackedUser[]` with a required `id` (plus `name`, `src`), so a stacked avatar has the person's colour too; `max` (4) and a `+N` chip. `null` or `unassigned` draws the empty seat: a `--bg-2` circle with a user glyph, the size of a person, labelled `ATH_LABELS.unassigned`.

### `ath-due-label`

```html
<ath-due-label [date]="t.due_date" [done]="closed" />
<ath-due-label
  [date]="sprint.end_date"
  source="sprint"
  [sprintName]="sprint.name"
  [compact]="true"
/>
<ath-due-label [date]="t.due_date" [afterSprintEnd]="true" sprintName="Sprint 24" placeholder="—" />
```

One colour rule from the `--due-*` tokens: overdue and **today red** (`--red-text`), the next two days amber (`--amber-text`), later muted, finished work muted with its plain date. Compact text: "2d overdue", "Today", "Tomorrow", "3d" (to 6 days), then the short date. `source="sprint"` reads "Sprint end · 31 Oct" with the sprint icon (`compact` keeps only the icon, the words go to the tooltip and a hidden label); `afterSprintEnd` adds an amber warning icon. The date logic is pure and tested (`due-date.ts`: `describeDue`, `dueToneOf`, `calendarDayOf`, `compactDueText`, `shortDay`). The app provides the reader's settings once:

```ts
{ provide: ATH_DATE_CONTEXT, useFactory: () => { const p = inject(UserPreferencesService);
    return () => ({ locale: p.locale(), timeZone: p.timeZone(), dateFormat: p.dateFormat() }); } }
```

### `ath-ai-mark`

```html
<ath-ai-mark />
<!-- 16 px, decorative -->
<ath-ai-mark [size]="48" variant="gradient" />
<!-- hero -->
<ath-ai-mark [size]="20" wordmark />
<!-- mark + "Athenos AI" -->
<ath-ai-mark label="Athenos AI" />
<!-- an image with a name -->
```

The Athenos AI mark ("Perch"): a solid rounded A — Athenos' A and a perched little owl — with two round eyes cut out and a four-point spark beside its head. `variant`: `color` (body in `currentColor`, spark in `--accent`; hints, rows), `mono` (all `currentColor`), `gradient` (`--ai-from` → `--ai-to`, for hero areas from 24 px). Two optical sizes from one 24-unit grid: up to 20 px the eyes sit wider apart and the spark grows (`AI_MARK_SMALL`), from 21 px the regular drawing (`AI_MARK_REGULAR`); the path data is exported for icon slots (a lucide-style icon of the app's nav). Decorative unless `label` is set; with `wordmark` the text is what screen readers read. Every gradient has its own id, so several marks on a page never share a paint server. Tokens of AI surfaces: `--ai-gradient`, `--ai-surface` (a ≤ 9% accent wash for hero cards), `--ai-border`.

### Status pill: `ath-status-pill`

`status` is a short code (`open`, `prog`, `review`, `blocked`, `done`, legacy `closed`) or any status key of the workspace (`in_progress`, `qa`; athenos-contracts W4-F). The name comes from `[label]`, else the app's `ATH_STATUS_LABELS` resolver, else the English default (then the key itself). The dot's colour comes from `[tone]` (an `AthDecoColor` token), else the app's `ATH_STATUS_TONES` resolver, else the code's own colour; an unknown key without a tone is grey. Both resolvers are provided once at the root and may read signals (language, the workspace's statuses), so OnPush pills follow them.

```html
<ath-status-pill status="qa" label="QA" tone="purple" size="sm" />
```

### Roles editor: `ath-permission-row`, `ath-tri-state`, `ath-save-bar`, `ath-color-swatch`, `ath-role-badge`

```html
<ath-permission-row
  [icon]="FolderPlus"
  label="Projekte anlegen"
  description="Neue Projekte im Workspace"
  [interactive]="true"
  (activate)="flip()"
  [disabled]="guest"
  disabledReason="Gäste können das nie"
>
  <ath-toggle
    ariaLabel="Projekte anlegen"
    [checked]="on"
    [disabled]="guest"
    (toggled)="set($event)"
  />
</ath-permission-row>
<ath-tri-state label="Tickets bearbeiten" [(value)]="state" [inherited]="true" />
<ath-save-bar
  [open]="dirty()"
  [saving]="saving()"
  [confirmDiscard]="true"
  (save)="save()"
  (discard)="reset()"
/>
<ath-color-swatch [(value)]="color" label="Rollenfarbe" />
<ath-role-badge name="Developer" color="blue" /> <ath-avatar [person]="p" ring="blue" />
```

- `ath-permission-row`: icon, name, one-line explanation (`--fg-3`, ellipsis), optional `inheritedHint`; the control is projected. With `interactive` a click anywhere on the row outside the control emits `activate` (a click on the control is left to it, so nothing toggles twice); the row adds no tab stop. `disabledReason` is the control's tooltip and is read out. Below 480 px the control moves under the text. `labelId` / `descriptionId` are public for `aria-describedby`.
- `ath-tri-state`: _Deny · Inherit · Allow_ as a radio group (not `ath-segment`, a tab list): one tab stop, arrows move and choose (mirrored in RTL), Home/End, Space/Enter. `inherited` is read out with "Inherit (currently allowed)". `compact`, and phones, show icons only (each still named).
- `ath-save-bar`: sticky at the bottom of its scroll container (`--selection-bar-*`), a named region whose appearance is announced (`aria-live="polite"`). `confirmDiscard`: _Discard_ asks first; Escape starts the question and focuses it, a second Escape takes it back; Escape is left to open overlays (`AthOverlayStack`). `saving` shows the spinner and blocks both buttons. Full width on phones.
- `ath-color-swatch`, `ath-role-badge`, `ath-avatar [ring]`: the palette `AthDecoColor` (`neutral`, `blue`, `green`, `amber`, `red`, `purple`, `pink`; the same tokens as `TicketTypeColor` in athenos-contracts), drawn with the `--<hue>-muted` deco tokens (`--grey-muted` for neutral). The swatch is a radio group with named swatches and a check on the picked one; an unknown token is neutral on a badge and no ring on an avatar. `ath-role-badge` also takes a `#RRGGBB` colour (a team's, W4-F team queues) and draws it as it is. `ATH_DECO_COLORS`, `isAthDecoColor()` and `athDecoColorLabel()` are exported.
- Words: the `AthLabels` `triState*`, `saveBar*`, `color*`, `colorPicker` and `roleLocked` (English defaults; the app translates them in its `ATH_LABELS` provider).

### `ath-chip`

`kind`: `tag` (semantic `variant`: default, primary, success, warning, error, info), `label` (dot in `color`), `epic` (outline, bolt in `color`, default `--purple`), `type` (16px square in `color` with `icon`; no text = the square alone; `muted` = grey glyph), `status` (toned dot or `icon`), `count` (`[count]="3"` → "+3", `tooltip` names the hidden items and is read as "3 more: …"). `tag` takes `shape`: `pill` (default) or `square`, the plain grey tag of dense ticket rows and board cards (references 05/06: `--r-xs`, `--bg-2`, faint border, no dot). All kinds are `--chip-h` (20px) tall. `removable` + `(removed)` (does not bubble to a clickable row; `name` feeds "Remove {name}").

### `ath-skeleton`, `ath-skeleton-list`

`<ath-skeleton variant="line|row|card|text|circular|rectangular" [width] [height] [animated] />`: `line` is one text line (0.8em bar in a 1.5em box), `row` is `--row-h`, `card` 64px. `<ath-skeleton-list variant="row|card|card-grid" [count]>` replaces the app's `skeleton-list` (same API) and announces `ATH_LABELS.loading` once. Both pulse and stand still under `prefers-reduced-motion`.

### `ath-alert`

```html
<ath-alert variant="error" [message]="error()" [retry]="reload" />
<ath-alert variant="warn" appearance="banner" title="Maintenance" message="Sat 22:00–22:30" />
```

`variant`: info, success, warn (`warning` is an alias), error; `appearance`: `inline` (tinted box) or `banner` (full width, square, icon); `title`, `icon`, `dismissible` + `(dismissed)`, `retry: AthAction` (an `ath-button [action]`, busy while it runs), `retryLabel`, `dismissLabel`. Without a message (and nothing projected) it takes no space, so `[message]="error()"` can stay in the template. Errors and warnings are `role="alert"`, the others `role="status"`.

### Toasts: `AthToastService`, `ath-toast-container` (W5-D)

```ts
const toast = inject(AthToastService); // from @athenos/webcomponents/core
toast.success('Saved');
toast.info('Timer for TEST-1 discarded (under a minute)', { action: { label: 'Undo', run: undo } });
toast.error('The server did not answer. Your text is kept.', {
  title: 'Could not save the comment',
});
```

```html
<ath-toast-container />
<!-- once, at the root; inputs: maxVisible (3), placement ('bottom' | 'top'), dismissLabel, regionLabel -->
```

- **Service** (unchanged calls keep working): `success` / `info` / `warning` / `error(message, durationMs | options)`, options `duration`, `action`, `title` (new: a short headline; the message becomes the detail line). The methods now return the toast's id. Defaults 4 s (success, info), 5 s (warning), 6 s (error); with an action at least 8 s; `duration: 0` stays. Lifetimes can stop: `pause(reason)` / `resume(reason)` (reasons stack), `hold(id)` / `release(id)` for one toast, `paused()`, `isRunning(id)`, `remaining(id)`, `clear()`.
- **Variants**: the colour sits only in the icon disc and the time-left hairline. Success is green, info neutral (ink), warning amber, error red. Pick info for neutral outcomes: discarded, archived, copied, moved, anything with an undo. Success is for something the reader made or finished.
- **Look**: tokens `--toast-bg` (90 % opaque, over a 16 px backdrop blur), `--toast-border`, `--toast-shadow`, `--toast-tint-mix`, `--toast-width` (380 px), theme-aware. The contrast gate checks `--fg` and `--fg-3` on `--toast-bg`. The action is a small soft button; the close button is a round badge on the corner, shown on hover and focus (always on touch screens) and always in the tab order. Below 600 px the stack is full width inside the safe area.
- **Stack**: newest nearest the corner. At most `maxVisible` show; older ones collapse behind a "+N more" button (`ATH_LABELS.moreCount`), and their clocks stop until they show again. Pointer or focus on the stack shows them all.
- **Time left**: a hairline at the foot of a timed toast (Web Animations, in step with the service clock). The clocks pause while the pointer or focus is on the stack and while the page is hidden.
- **Motion**: in on a damped spring (460 ms, `linear()` easing, cubic-bezier fallback) while the row opens, so neighbours glide; out in 180 ms (ease-in), then the row closes. Under `prefers-reduced-motion`, fades only. Angular's `animate.enter` / `animate.leave`; specs that check the exit need `TestBed.configureTestingModule({ animationsEnabled: true })`.
- **Accessibility**: the stack is a region named `ATH_LABELS.toastRegion` ("Notifications"). New toasts are read out by two hidden live regions, 100 ms after they appear (so the first toast is read even when the container mounts with it): errors assertive, the rest polite. The close button is named `ATH_LABELS.toastDismiss` ("Dismiss notification: {message}"), or the `dismissLabel` input. Escape closes the toast that has focus and marks the press handled (`preventDefault`), so `AthOverlayStack` does not also close a popover below; focus goes to the next toast or back to where it came from. Nothing traps focus.

### `ath-button [action]`

```html
<ath-button variant="primary" [action]="save">Save</ath-button>
```

```ts
protected readonly save = () => this.sprints.create(this.draft());  // Promise or Observable
```

While the action runs the button is busy: disabled, spinner, `aria-busy`, further clicks (and a busy submit button's form submit) are ignored. A Promise settles on resolve/reject, an Observable on its first value, completion or error. `(done)` emits the result, `(failed)` the error (also reported to Angular's `ErrorHandler`); `(clicked)` still fires for every accepted click. `[loading]` stays for busy state that starts elsewhere; `busy()` is public. `runAthAction()` is exported for other triggers.

### `ath-markdown`

```html
<ath-markdown [text]="ticket.description" />
```

The app provides its parser once (`{ provide: ATH_MARKDOWN_PARSER, useValue: renderMarkdown }`) or per instance (`[parse]`). Every path, including `[html]`, ends in Angular's HTML sanitizer: no `bypassSecurityTrust*` anywhere (SEC-14). Without a parser the text shows as escaped paragraphs. The typography is the `content` mixin in `styles/_markdown.scss`, which an editor can include to look the same (`@use '@athenos/webcomponents/styles/markdown' as md;`).

### `ath-kpi-strip`, `ath-kpi-tile`, `ath-sparkline`

```html
<ath-kpi-strip [columns]="4">
  <ath-kpi-tile
    label="Due today"
    [value]="1"
    [alert]="true"
    delta="+1"
    deltaDirection="down"
    deltaTitle="1 overdue"
  />
  <ath-kpi-tile label="This week" [value]="3" tone="blue" [spark]="trend" />
  <ath-kpi-tile label="Story points" [value]="24" note="3 done" />
  <ath-kpi-tile
    label="In review"
    [value]="2"
    link="/app/tickets"
    [linkParams]="{ status: 'review' }"
  />
</ath-kpi-strip>
```

One KPI API (the app's `metric-card` features): `label`, `value`, `delta`, `deltaDirection`, `deltaTitle`, `tone` (trend colour), `spark` (≥ 2 samples, not all zero), `note`/`noteTitle`, `alert`, `muted`, `link`/`linkParams`/`linkLabel` (the whole tile is the hit area). For counts per status: `valueTone` (`amber|blue|green|red|purple`, the figure in the `--*-text` shade; `alert` and `muted` win), `dot` (a CSS colour for a small key before the label), and projected content under the figure (a progress bar). The strip draws the card and the hairlines and drops to two columns below 920px. `ath-sparkline` (`data`, `width` 70, `height` 22, `color`, `showDot`, `showArea`, `strokeWidth` 1.2) is decorative; `sparklineGeometry()` is the pure path maths.

## Page frame: `ath-page`, `ath-panel-grid`, `ath-panel`

```html
<ath-page mode="fill">
  <ath-page-header title="Inbox" [subItems]="['3 unread']" />
  <ath-alert variant="error" [message]="error()" [retry]="reload" />
  <ath-panel-grid columns="side-main">
    <ath-panel title="Filters" [padded]="true">…</ath-panel>
    <ath-panel title="Activity" [count]="items().length">…</ath-panel>
  </ath-panel-grid>
</ath-page>
```

- `ath-page mode="scroll"` (default): at least the stage's height, grows with the content, the stage scrolls; panels in the grid stretch to the bottom when the content is short. `mode="fill"`: exactly the stage's height; the filling child (`ath-panel-grid`, `ath-panel` or `[athPageFill]`) takes the height under the head and its panels scroll inside. Toolbars, alerts and KPI strips in the body keep their height. Below 720px of stage width fill falls back to scroll.
- `ath-panel-grid`: `columns` = `1`–`4`, `main-side`, `side-main` or any `grid-template-columns`; `rows` = `fill` (default: rows share the height, panels in a row are equally tall), `auto`, or any `grid-template-rows`. It stacks into one column below 720px of its own width (container query). Panels span with `ath-panel [colSpan] [rowSpan]`.
- `ath-panel`: `title`, `level`, `count`, slots `[athPanelHead]`, `[athPanelActions]`, `[athPanelFoot]`, `padded`, `scroll` (default on), `overflow` (`hidden` default, or `clip`: cuts at the rounded frame without being a scroll container, so sticky content inside sticks to the page's scroller; use it with `[scroll]="false"`), `loading` + `skeletonRows`. Frame and head from the `--panel-*` tokens; no head row when it would be empty.

**Contract the app shell must provide** (`styles/_layout.scss`):

1. The scroll container of routed pages has the class `ath-stage` and a definite height: a flex item with `flex: 1; min-height: 0` in a full-height flex column (shell `height: 100dvh; overflow: hidden`). The lib makes it `overflow-y: auto` and a size container named `ath-stage`, and a flex column while it hosts an `ath-page` (until then the route host keeps plain block flow, so an unmigrated page's `height: 100%` still reaches the stage).
2. Its padding is `var(--content-pad-top) var(--content-pad-x) var(--content-pad-bottom)`. Phone padding is changed by redefining those properties on the stage, not with a literal, because `ath-page` trims the bottom gutter to `--content-pad-top` with a token `calc()` (16px under the last panel).
3. `ath-page` is the root element of the routed component's template: stage › route host › `ath-page`. The lib lets that route host grow (`.ath-stage > :has(> ath-page)`); hosts without an `ath-page` keep plain block flow, so pages migrate one at a time. The per-page `:host:has(...) { height: 100% }` rules go away with the migration.

`page/page-frame.spec.ts` renders this contract at 1440×900 and 1110×760 with pages shaped like the ones in `artifacts/phase5/c/fill/numbers.json` and asserts `dead ≤ 16` and `mismatch = 0` for each (plus fill pages never scrolling the stage, a long panel scrolling inside, and stacking at phone width).

## Overlay primitives (quality step 1.6)

One positioning engine, one overlay stack, one modal. App popups (menus, pickers, hover cards, palettes) are built from these instead of measuring rectangles, listening to `document:click` or inventing a z-index.

- **Top layer:** popover panels are promoted with `popover="manual"` (dialogs with `showModal()`), so no container's `overflow`, `transform` or `z-index` clips or covers them. Without Popover API support a panel falls back to `position: fixed` + `z-index: var(--z-popover)` with a correction for transformed ancestors. The panel stays where the template put it in the DOM, so focus order, event bubbling and encapsulated styles keep working.
- **Overlay stack** (`AthOverlayStack`, root service): Escape closes only the topmost overlay, an outside pointer-down closes the overlays it is outside of (a click in a nested popover keeps its parent open), a modal dialog stops both for what lies below it, and page scroll is locked while a dialog is open. Elements marked `data-ath-top-layer` (the toast container) are raised above a dialog that opens.
- **Focus:** an overlay returns focus to its trigger on Escape, on a choice and on a programmatic close; after an outside click only when focus would otherwise be lost. Rings use `--focus-ring-*` (`@include focus-ring`); items in scrolling lists use an inset `--focus-ring-color` ring, which no `overflow` clips.
- **Words** come from `ATH_LABELS`: `listboxSearch`, `listboxNoMatches`, `listboxCreate` (`{query}`), `listboxOtherGroup`, `pickerPlaceholder`, `pickerClear`, `pickerSelected` (`{count}`), plus `loading` and `closeDialog`.

### `athFloating` (`floatPanel`)

```html
@if (open()) {
<div class="my-panel" [athFloating]="trigger" align="end" [matchWidth]="true">…</div>
}
```

Inputs: `athFloating` (anchor element, `ElementRef`, or a `FloatingVirtualAnchor`), `align` (`start` | `end` | `auto`, follows `dir`; `center` centres the panel on the anchor), `side` (`bottom` | `top`, flips when the other side has more room), `offset` (px, 4), `matchWidth`, `maxHeight` (px; the viewport caps anyway), `topLayer` (true), `arrow` (an element kept pointing at the anchor). Writes `data-placement="bottom|top"`. Follows scrolls in any container, resizes, and size changes of panel and anchor; `update()` re-measures. `floatPanel(panel, anchor, options)` is the same as a function and returns the stop function (with `.update()`). This replaced the app's `shared/directives/floating.directive.ts` (deleted in quality step 2.1).

**Virtual anchors** hang a panel from a rectangle instead of an element: a caret, a text selection, the spot the pointer rests on. `{ getBoundingClientRect(): DOMRect, contextElement?: Element }` (a `Range` qualifies); the rectangle is read on every placement, so a live one follows scrolls. The `contextElement` (the editor, the row) is observed for size changes, decides `dir`, stops placement once it leaves the document, and counts as the trigger of an `ath-popover` (focus return, outside clicks). `resolveAnchor()` gives that element, `resolveFloatingTarget()` the anchor to place against, `isVirtualAnchor()` tells them apart.

```html
<div class="toolbar" [athFloating]="selection" align="center" side="top">…</div>
<!-- selection = { getBoundingClientRect: () => range.getBoundingClientRect(), contextElement: editorEl } -->
```

### `ath-popover`

```html
<ath-button [athPopoverTrigger]="pop">Details</ath-button>
<ath-popover #pop ariaLabel="Details" arrow>
  …content, or <ng-template athPopoverContent>…</ng-template> for lazy content
</ath-popover>
```

`role="dialog"` panel (`panelRole`: `dialog` | `menu` | `listbox` | `null`), named by `ariaLabel` / `ariaLabelledby`. The panel resets the text styles it would inherit from its spot in the DOM (`text-align`, `white-space`, weight, case), so a picker inside a right-aligned table cell reads normally. `[anchor]` also takes a virtual anchor (a hover card by the pointer). Opens from `athPopoverTrigger` (sets `aria-haspopup`, `aria-expanded`, `aria-controls` on the real button, also inside `<ath-button>`), `show(anchor?)` / `hide()` / `toggle()` or `[(open)]` with `[anchor]`. Inputs: `size` (`sm` 220 · `md` 280 default · `lg` 360 · `auto`), `padding` (`md` | `sm` | `none`), `align`, `side`, `offset`, `matchWidth`, `maxHeight`, `arrow`, `trapFocus` (Tab stays inside, `aria-modal`; otherwise Tab out closes), `autoFocus` (`first` | `panel` | `none`), `restoreFocus`, `closeOnEscape`, `closeOnOutsideClick`, `panelClass`, `panelId`. Outputs: `opened`, `closed` (reason: `escape` | `outside` | `select` | `tab` | `programmatic`).

### `ath-menu`, `athMenuItem`, `ath-menu-separator`

```html
<ath-button variant="ghost" [athMenuTrigger]="row" ariaLabel="Actions">⋯</ath-button>
<ath-menu #row>
  <button athMenuItem [icon]="Pencil" shortcut="E" (triggered)="edit()">Edit</button>
  <button
    athMenuItem
    [disabled]="!canMove"
    disabledReason="Only leads can move tickets"
    (triggered)="move()"
  >
    Move
  </button>
  <ath-menu-separator />
  <button athMenuItem variant="danger" (triggered)="remove()">Delete</button>
</ath-menu>
```

The WAI-ARIA menu button. Trigger: click, Enter, Space and ArrowDown open on the first item, ArrowUp on the last; the menu is labelled by the trigger. Menu: ArrowDown/ArrowUp (wrapping), Home/End, typeahead, Enter/Space activate, Escape closes (focus back to the trigger), Tab closes and moves on. Items (`button[athMenuItem]`, `a[athMenuItem]` or `<ath-menu-item>`): `icon`, `shortcut` (hint, hidden from AT; `keyshortcuts` sets `aria-keyshortcuts`), `variant="danger"`, `disabled` (stays focusable with `aria-disabled`; `disabledReason` is the tooltip and the accessible description), `tooltip`, `checked` (`menuitemcheckbox`), `keepOpen`; output `triggered` (not for disabled items; use it instead of `(click)`). `ath-menu` inputs: `open` (two-way), `anchor`, `align`, `side`, `maxHeight`, `ariaLabel`, `panelClass`; methods `show(anchor?, 'first' | 'last' | 'none')`, `hide(restoreFocus?)`, `toggle()`; outputs `opened`, `closed`.

### `ath-listbox`

```html
<ath-listbox
  [options]="labels"
  multiple
  searchable
  creatable
  [(values)]="selected"
  (create)="addLabel($event)"
  ariaLabel="Labels"
/>
```

`ListboxOption<T>`: `value`, `label`, `sublabel`, `icon` (Lucide icon, or a string for your own template), `disabled`, `group`, `keywords` (matched, not shown). Single (`[(value)]`) or multi-select (`multiple`, `[(values)]`, check boxes); `searchable` adds a `role="combobox"` field that keeps focus while `aria-activedescendant` marks the active option (without it the list itself is focused, with typeahead). `[(query)]` + `localFilter="false"` for server search; matching ignores case and accents. Groups render as labelled `role="group"`; ungrouped options next to groups go under `listboxOtherGroup`. `creatable` adds a "Create “…”" row for a query without an exact match (`create` emits the text). Keyboard: ArrowDown/ArrowUp, PageDown/PageUp, Home/End and Space (without search field), Enter. Highlight (`data-highlight` on the list): right after opening on a selected option nothing is highlighted (the selected option shows its check mark, nothing else); under the pointer and while typing the active row gets a background; moved with the keys it also gets the inset accent ring while the list or its field has keyboard focus. The search field inside a popover draws no ring. **Driven from an outside field** (an @-mention in a textarea, a suggestion menu): the field keeps focus, forwards its keys to `handleKeydown(event)` (a used key has its default prevented; call it from code, not as the template handler of a field you type in) and points its `aria-activedescendant` at `activeId()`; `autoActivate` keeps the first usable option ready for Enter, `choose(activeIndex())` picks it. Other inputs: `loading`, `emptyLabel`, `searchPlaceholder`, `optionTemplate` (`let-option let-selected="selected" let-active="active"`), `compareWith`, `maxHeight` (320). Output `picked` per choice. Rendering stays cheap at a few hundred options (one element per option, `content-visibility: auto`).

### `ath-option-picker`

```html
<ath-option-picker [options]="people" [(value)]="assignee" clearable ariaLabel="Assignee" />
<ath-option-picker [options]="labels" multiple [(values)]="ids" creatable (create)="add($event)" />
<ath-option-picker
  trigger="none"
  [anchor]="cell"
  [(open)]="editing"
  [options]="statuses"
  [(value)]="status"
/>
```

`ath-popover` + `ath-listbox` behind a select-style trigger (summary: the selection, "N selected", or the placeholder; a separate clear button, never a button inside the button). All listbox inputs pass through (`searchable` defaults to true), plus `placeholder`, `disabled`, `clearable`, `ariaLabel`, `trigger` (`button` | `none`), `anchor`, `open` (two-way), `size`, `align`, `matchWidth`, `closeOnPick` (default: single yes, multi no), `resetQueryOnOpen`. The base for the person, label and filter pickers.

### `ath-dialog`

```html
<ath-dialog [(open)]="editing" title="Edit ticket" description="…" size="lg" (closed)="onClose()">
  …body…
  <div slot="header">…extra header content…</div>
  <div slot="footer"><ath-button (clicked)="save()">Save</ath-button></div>
</ath-dialog>
```

A native `<dialog>` with `showModal()`: top layer, inert background, `::backdrop` in `--scrim`. Tab stays inside, page scroll is locked, initial focus goes to `[autofocus]`, else the first control in body or footer, else the close button; on close focus returns to where it was. Controlled: ✕, Escape (`closeOnEscape`) and a backdrop click (`closeOnBackdrop`) emit `closed` and `openChange(false)`; it closes when `open` turns false, so a parent may refuse. Escape closes a popover inside the dialog first. Inputs: `open`, `title`, `description`, `size` (`sm` | `md` | `lg` | `xl` | `full`), `closeOnBackdrop`, `closeOnEscape`, `showClose`, `closeLabel`, `ariaLabel` (without a title), `role` (`dialog` | `alertdialog`), `bare`. Content slots: default (scrolling body), `[slot=header]` / `[athDialogHeader]`, `[slot=footer]` / `[athDialogFooter]`.

`bare`: no header, footer, close button or surface. The dialog is a transparent layer over the viewport, and the content draws and places its own surface in it (margins, or absolute positions against the layer): a command palette near the top that does not jump while its results change height, a composer with its own head that grows to full screen, a bottom sheet. Top layer, inert page, `::backdrop` in `--scrim`, focus trap, scroll lock, Escape and focus return stay; a press on the layer around the content is a backdrop press. Name it with `ariaLabel`.

```html
<ath-dialog bare [open]="open()" ariaLabel="Command palette" (closed)="close()">
  <div class="palette" style="margin: 14vh auto 0; width: min(680px, calc(100% - 32px))">…</div>
</ath-dialog>
```

**Escape and app listeners.** A modal dialog gets Escape as its native `cancel` event, which the browser skips when the keydown was prevented: a field that handles Escape itself inside a dialog calls `preventDefault()` (not only `stopPropagation()`). Document-level Escape handlers of the app skip keys an overlay took (`event.defaultPrevented`) or check `AthOverlayStack.size`, since listeners run in registration order and the stack may see the key after them.

### `ath-select`

A styled native `<select>` with `ControlValueAccessor` (`[(ngModel)]`, forms). A value written before its options exist (a saved setting read before the list it picks from has loaded) is shown once they arrive: each option carries `[selected]`, not only the select's `[value]`. Named by its visible `label` (`<label for>`), or, in a row or cell that already says what it is, by `ariaLabel` (on the native select; no hidden `<label class="sr-only">` needed).

### `ath-toggle`

A `role="switch"` button. With `label` (and `description`) it is a boxed, self-labelling row; without, the bare switch. In a settings row or a table cell that names it, pass `ariaLabel` instead of a hidden label: `<ath-toggle [ariaLabel]="'Email on mention'" [checked]="on" (toggled)="set($event)" />`.

### `ath-sheet`

```html
<ath-sheet
  [open]="!!ticket()"
  [ariaLabel]="ticket()?.title"
  width="560px"
  top="48px"
  (closed)="close()"
>
  …detail…
</ath-sheet>
```

A non-modal side sheet at the inline end (the right in LTR, the left in RTL), for detail beside the page instead of over it (the ticket peek). `role="dialog"`, `aria-modal="false"`, named by `ariaLabel` / `ariaLabelledby`.

- **Top layer** (`popover="manual"`): no ancestor clips or covers it; menus, pickers and dialogs opened later lie above it, the toast container is raised above it. Without the Popover API it is `position: fixed` at `--z-fixed`.
- **Non-modal:** no scrim, no focus trap, no scroll lock; a press on the page beside it does not close it.
- **Escape** (topmost overlay only) asks to close: `closed` and `openChange(false)`. Controlled: it closes when `open` turns false.
- **Focus:** on open into the sheet (`autoFocus`: `panel` default, `first`, `none`), on close back to where it was, when focus was inside or would otherwise be lost (`restoreFocus`).
- Inputs: `open`, `width` (CSS length, default 480px, capped at the viewport), `top` (CSS length, default 0: keeps a shell's top bar uncovered), `ariaLabel`, `ariaLabelledby`, `autoFocus`, `restoreFocus`, `closeOnEscape`, `panelClass`, `panelId`; outputs `closed`, `openChange`, `opened`; `close()`. Slides in from the edge in 220ms (a fade under `prefers-reduced-motion`).

### `ath-dropdown`, `ath-combobox` (presets)

Thin presets: `ath-dropdown` = `ath-menu` from a flat `items: DropdownItem[]`, each a `DropdownAction` (`id`, `label`, `icon`, `variant`, `disabled`, `title` = tooltip and, on disabled items, the accessible reason, `shortcut`) or `DROPDOWN_SEPARATOR` between groups (`isDropdownSeparator()`; the old pseudo-item `{ id, label: '', divider: true }` is gone). The projected button is the menu button itself (one tab stop, ARIA on the button); plain text gets a `role="button"` wrapper. `ath-combobox` = single-select `ath-option-picker` (`options: ListboxOption[]`, `[(value)]`, `placeholder`, `searchPlaceholder`, `disabled`, `clearable`, `loading`, `bare`, `optionTpl`, `queryChange`, `opened`, `closed`, `toggle()`, `openPanel()`, `close()`, `select()`). For anything richer use `ath-menu` or `ath-option-picker` directly.

### Unused components kept (quality step 2.7)

The app does not use these today; they stay because they are not duplicates of a newer primitive and the roadmap has a use for them: `ath-pagination` (server-side lists, `Page<T>`, steps 3.9 and 5.4), `ath-file-drop` (attachments, the later file service), `ath-code-block` (API keys, docs snippets), `ath-divider`, `ath-spinner` (inline busy states; content loading is `ath-skeleton`), `ath-sidebar` (the app shell builds its own rail from `ath-nav-item`; candidate for removal when the shell is split in 4.6). Removed in 2.7 as duplicates: `ath-stat-card` (→ `ath-kpi-strip`), `ath-banner` (→ `ath-alert appearance="banner"`), `ath-card` and `ath-section` (→ `ath-panel`), `ath-project-key-badge` (→ `ath-chip`, `ath-nav-item [chip]`).

## Signal APIs and zoneless (quality step 4.1)

Every component and directive uses the signal APIs and is `OnPush`; the lib does not depend on zone.js.

- **Bindings:** `input()` / `input.required()`, `output()`, `model()` for a two-way `[(x)]` pair the component also writes itself (`ath-sidebar [(collapsed)]`, `ath-user-picker [(value)]`). A controlled pair stays `input()` + `output('xChange')`, which `[(x)]` binds as well (`ath-segment`, `ath-pagination`). Flags take `booleanAttribute`, plain numbers `numberAttribute`, so bare attributes (`<ath-input required>`) work. Host bindings and listeners go in `host: {}`; queries are `viewChild()` / `contentChildren()`. ESLint bans the decorator imports (`@Input`, `@Output`, `EventEmitter`, `@HostBinding`, `@HostListener`, `@ViewChild` …), `ChangeDetectorRef` and `NgZone` in `projects/**`, plus `prefer-output-readonly` and `prefer-signals` (angular-eslint 19: no decorator inputs or queries, signal fields `readonly`).
- **State:** what a template reads is a `signal` or `computed`, so no `markForCheck`. A value the forms API writes (`writeValue`, `setDisabledState`) is a signal too; `[disabled]` and the form's disabled state combine. `effect()` only syncs the DOM (ARIA on a trigger; `showModal()`, the top layer and focus when a dialog's, sheet's or popover's element appears) and writes no signal; the lib has no `effect` + `set`, so nothing waits for `linkedSignal` (Angular 19).
- **Timing:** work that needs the rendered panel follows the panel element, not `setTimeout` and not `afterNextRender` (which runs on the next app render even when that render did not include the overlay's view, e.g. a TestBed fixture without autoDetect): the popover focuses into its panel from an effect on the panel query, and `ath-menu` (first item) and `ath-option-picker` (scroll to the active option) hand their work to `popover.whenPanelReady(fn)`. Since Angular 19 these are view effects: the query update marks them, and change detection runs them on its next pass in the same tick that renders the element (Angular 18: one microtask after the tick), so `opened` is emitted inside change detection; a handler may write signals (the effect calls it `untracked`), and the next pass of the same tick renders them. The `setTimeout`s left are real timers: toast lifetime, copy feedback, tooltip delays, the Escape-press marker, focus return after an outside click.
- **`NgZone`:** none. The last use, `runOutsideAngular` in `athFloating` (scroll and resize listeners of an open panel), went when the app dropped zone.js (W4-A); zone.js is only a devDependency, for the `npm test` run with zone.
- **Types in `dist/`:** name a literal union (`export type DividerSpacing = 'none' | 'sm' | 'md' | 'lg'`) or annotate the member instead of `input<'a' | 'b'>()`. An inferred union is printed in the compiler's type-id order, which differs between a cached and a fresh build, and `check:dist` fails on CI.
- **Zoneless run:** `npm run test:zoneless` (CI too) runs every spec with `provideZonelessChangeDetection()` (Angular 20; `provideExperimental…` before) and without zone.js (`src/test-providers-zoneless.ts`, `angular.json → test-build:zoneless` without polyfills). No `fakeAsync` (it needs zone.js): use `async`/`await` with `fixture.whenStable()` or Vitest's fake timers (`vi.useFakeTimers()`). A test host changes state through signals, not plain fields.
- **Test runner (W5-B):** Vitest through the official `@angular/build:unit-test` builder, in browser mode (headless Chromium from `@playwright/test`, `npx playwright install --only-shell chromium` once). The builder takes its build options from `test-build`, an `@angular/build:application` target that exists only for the tests: an `ng-packagr` build target would carry neither the global styles (`main.scss`) nor the polyfills, so neither run could choose zone.js. `test-build` loads zone.js for `npm test`, its `zoneless` configuration loads none. The viewport is 800 × 600 (what Karma's headless Chrome had; breadcrumb folding, popover and page-frame specs measure layout). `splitting: false`: with shared chunks, files that share a component in one page (the specs run non-isolated, as under Karma) can see an earlier file's class as `undefined` (`ɵcmp` errors in the page-frame spec after the page-header spec). `src/test-setup.ts` restores every `vi.spyOn` after each test, as Jasmine did with `spyOn`.
- **Storybook:** a story prop whose name matches a non-input member of the story's `component` is copied onto the instance, so internal members do not use names like `value` (the form controls keep it in `fieldValue`).

## Component catalogue (quality step 1.8)

Storybook 10 with the Angular builder: the targets `athenos-webcomponents:storybook` and `:build-storybook` in `angular.json` carry the global styles (Geist from `@fontsource`, `main.scss` with the tokens) and `.storybook/tsconfig.json`. The toolbar sets **Theme** (`data-theme`), **Accent** (`data-accent`), **Direction** (`dir`) and **Labels** (`ATH_LABELS` English defaults or German, `.storybook/labels.ts`) on `<html>` before the story renders, as the app's theme boot does.

### Adding a story

- One `<component>.stories.ts` next to the component; the title is `Group/Name` (`Forms`, `Display`, `Feedback`, `Layout`, `Overlays`).
- Write a `render` template. Since Angular 19 Storybook also sees `input()` members (through `ɵgetComponentDef`), but an explicit template keeps the bindings visible in the docs and the screenshots independent of Storybook's argument mapping.
- Cover the states that matter: default, disabled, error, empty/loading, long text (`LONG_TEXT`), and RTL (`globals: { dir: 'rtl' }`, `RTL_TEXT`) or German labels (`globals: { labels: 'de' }`) where the component has words or direction. Shared samples are in `src/lib/stories/story-data.ts`; dates are relative to `STORY_NOW` and passed as `[now]`, so screenshots do not age.
- Open states (menus, pickers, popovers) come from a `play` function that opens the trigger with the keyboard, like a user would.
- Opt-outs, each with a comment that says why: `tags: ['!visual']` (no screenshots, e.g. a story that waits on a timer), `parameters.visual: { mode: 'viewport' }` (whole viewport instead of the content box: modal dialogs, fixed toasts; `layout: 'fullscreen'` implies it), `parameters.a11y: { config: { rules: [{ id, enabled: false }] } }` for one rule, or `a11y: { test: 'todo' }` (warn only).

### Checks (`tests/storybook/`)

`npm run build-storybook && npm run test:storybook` runs Playwright against `storybook-static/`, one test per story (about 1 min locally, 6 workers):

- **axe**: the story is loaded in light and in dark; `@storybook/addon-a11y` runs axe after render with the story's `parameters.a11y`, the same result as the Accessibility panel. A violation fails unless `a11y-baseline.json` lists it (story × theme × rule, failing node count). An entry that no longer occurs fails too, so the baseline only shrinks. Every baselined rule has a written reason under `reasons`.
- **Screenshots**: light and dark × 375/768/1280 px, `toHaveScreenshot` against `__screenshots__/<platform>/<story-id>/<theme>-<width>.png`. The image is the content box (story root plus open overlays) at full width, after layout, focus and overlay positions have settled; animations are off and `prefers-reduced-motion` is set.
- A render error, a failing `play` function or an uncaught page error fails the story. A baseline folder without a story fails too.

`SB_A11Y=off` or `SB_VISUAL=off` runs one half only; `npx playwright test -c tests/storybook/playwright.config.ts --grep "Overlays/Menu"` runs a subset.

### Updating baselines

- **Screenshots** after an intended visual change: `npm run test:storybook:update` (rewrites the images of the stories that ran; add `--grep` to limit it), look at the changed PNGs in the diff, commit them with the change. Delete the folder of a removed or renamed story. Baselines are per platform; the committed set is `darwin`, and CI compares on a macOS runner. If the runner's rendering drifts from local macOS, run the CI workflow by hand with `update_baselines` and commit the uploaded artifact instead.
- **axe**: fix the component where you can. To record what is left: add a reason for the rule under `reasons` in `a11y-baseline.json`, then `npm run test:storybook:a11y-baseline`, which rewrites `violations` from a full run. After a fix the same command shrinks the file; never grow it by hand.

Pipeline (`.github/workflows/release.yml`, only on a tag `v*` or by hand, never on a push): lint, npm audit, token tests, unit tests and `build:lib` on Linux; Storybook build + axe on Linux; Storybook build + screenshots on macOS. The GitHub release (`npm pack` + `SHA256SUMS`) is made only after these pass. Tags come from fenrir `infra/release/release.sh`.
