import * as i0 from "@angular/core";
import { ChangeDetectionStrategy, Component, DOCUMENT, DestroyRef, Directive, ElementRef, ErrorHandler, Injectable, InjectionToken, Injector, LOCALE_ID, PLATFORM_ID, Renderer2, SecurityContext, TemplateRef, ViewEncapsulation, afterNextRender, booleanAttribute, computed, contentChild, contentChildren, effect, forwardRef, inject, input, model, numberAttribute, output, signal, untracked, viewChild } from "@angular/core";
import { LucideDynamicIcon } from "@lucide/angular";
import { AlertCircle, AlertOctagon, AlertTriangle, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ChevronsLeft, ChevronsRight, Copy, Eye, EyeOff, Info, Loader2, Lock, MoreHorizontal, PanelLeft, PanelLeftClose, Plus, Search, Slash, Upload, User, X, Zap } from "lucide";
import { ATH_DATE_CONTEXT, ATH_DEFAULT_LABELS, ATH_DEFAULT_LABELS as ATH_DEFAULT_LABELS$1, ATH_LABELS, ATH_LABELS as ATH_LABELS$1, ATH_MARKDOWN_PARSER, ATH_MARKDOWN_PARSER as ATH_MARKDOWN_PARSER$1, ATH_PRIORITY_LABELS, ATH_PRIORITY_LABELS as ATH_PRIORITY_LABELS$1, ATH_STATUS_LABELS, ATH_STATUS_LABELS as ATH_STATUS_LABELS$1, ATH_STATUS_TONES, ATH_STATUS_TONES as ATH_STATUS_TONES$1, AthToastService, AthToastService as AthToastService$1 } from "@athenos/webcomponents/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { NgTemplateOutlet, isPlatformBrowser } from "@angular/common";
import { Subject, debounce, distinctUntilChanged, firstValueFrom, isObservable, timer } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";
import * as i1 from "@angular/forms";
import { FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
var AthPageHeaderComponent = class AthPageHeaderComponent {
	constructor() {
		this.title = input.required(...ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []);
		this.subItems = input([], ...ngDevMode ? [{ debugName: "subItems" }] : /* istanbul ignore next */ []);
		this.description = input("", ...ngDevMode ? [{ debugName: "description" }] : /* istanbul ignore next */ []);
		this.divider = input(true, {
			...ngDevMode ? { debugName: "divider" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.level = input(1, ...ngDevMode ? [{ debugName: "level" }] : /* istanbul ignore next */ []);
		this.loading = input(false, {
			...ngDevMode ? { debugName: "loading" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.visibleSubItems = computed(() => this.subItems().filter((item) => item != null && item.trim() !== ""), ...ngDevMode ? [{ debugName: "visibleSubItems" }] : /* istanbul ignore next */ []);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthPageHeaderComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthPageHeaderComponent,
			isStandalone: true,
			selector: "ath-page-header",
			inputs: {
				title: {
					classPropertyName: "title",
					publicName: "title",
					isSignal: true,
					isRequired: true,
					transformFunction: null
				},
				subItems: {
					classPropertyName: "subItems",
					publicName: "subItems",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				description: {
					classPropertyName: "description",
					publicName: "description",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				divider: {
					classPropertyName: "divider",
					publicName: "divider",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				level: {
					classPropertyName: "level",
					publicName: "level",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				loading: {
					classPropertyName: "loading",
					publicName: "loading",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			ngImport: i0,
			template: "<header\n  class=\"ath-page-header\"\n  [class.ath-page-header--divided]=\"divider()\"\n  [class.ath-page-header--section]=\"level() === 2\"\n  [attr.aria-busy]=\"loading() || null\"\n>\n  <div class=\"ath-page-header__leading\">\n    <ng-content select=\"[athPageLeading]\" />\n  </div>\n  <div class=\"ath-page-header__text\">\n    @if (loading()) {\n      <div class=\"ath-page-header__title\" aria-hidden=\"true\">\n        <span class=\"ath-page-header__skeleton ath-page-header__skeleton--title\"></span>\n      </div>\n    } @else if (level() === 2) {\n      <h2 class=\"ath-page-header__title\">{{ title() }}</h2>\n    } @else {\n      <h1 class=\"ath-page-header__title\">{{ title() }}</h1>\n    }\n    <div class=\"ath-page-header__sub\">\n      @if (loading()) {\n        <span\n          class=\"ath-page-header__skeleton ath-page-header__skeleton--meta\"\n          aria-hidden=\"true\"\n        ></span>\n      }\n      <!-- Every item leads with its separator, and the row clips the first\n           separator-width of each line: a wrapped line neither ends nor\n           starts on a stray \"·\". -->\n      @for (item of visibleSubItems(); track $index) {\n        <span class=\"ath-page-header__sub-item\">\n          <span class=\"ath-page-header__sub-sep\" aria-hidden=\"true\">·</span>\n          {{ item }}\n        </span>\n      }\n      <span class=\"ath-page-header__sub-slot\"><ng-content select=\"[athPageMeta]\" /></span>\n    </div>\n    @if (visibleSubItems().length === 0 && description()) {\n      <p class=\"ath-page-header__description\">{{ description() }}</p>\n    }\n  </div>\n  <div class=\"ath-page-header__actions\">\n    <ng-content />\n  </div>\n</header>\n",
			styles: [".ath-page-header{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--space-6);padding-bottom:0}.ath-page-header--divided{padding-bottom:var(--page-head-pad-bottom);border-bottom:1px solid var(--page-head-rule)}.ath-page-header__leading{flex-shrink:0;margin-right:calc(var(--space-4) - var(--space-6))}.ath-page-header__leading:empty{display:none}.ath-page-header__text{flex:1;min-width:0}.ath-page-header__title{margin:0;font-size:var(--page-title-size);font-weight:var(--weight-semibold);color:var(--fg);line-height:var(--line-tight);letter-spacing:-.015em}.ath-page-header__sub{--sep-w: 16px;margin-top:var(--page-head-gap);margin-left:calc(-1 * var(--sep-w));clip-path:inset(0 0 0 var(--sep-w));display:flex;align-items:center;flex-wrap:wrap;row-gap:2px;min-height:20px;font-size:var(--page-meta-size);color:var(--fg-3);line-height:var(--line-normal)}.ath-page-header--section .ath-page-header__sub:not(:has(.ath-page-header__sub-item)):has(.ath-page-header__sub-slot:empty){display:none}.ath-page-header__skeleton{display:inline-block;height:.8em;border-radius:var(--r-xs);background:var(--bg-2);vertical-align:middle;animation:ath-page-header-pulse 1.6s ease-in-out infinite}.ath-page-header__skeleton--title{width:min(16em,60%)}.ath-page-header__skeleton--meta{width:min(24em,80%);margin-left:var(--sep-w)}.ath-page-header__sub-item{display:inline-flex;align-items:center;font-weight:var(--weight-normal)}.ath-page-header__sub-sep{display:inline-block;width:var(--sep-w);text-align:center;color:var(--fg-4)}.ath-page-header__sub-slot{display:inline-flex;align-items:center;padding-left:var(--sep-w)}.ath-page-header__sub-slot:empty{display:none}.ath-page-header__description{margin:var(--page-head-gap) 0 0;font-size:var(--page-meta-size);color:var(--fg-3);line-height:var(--line-normal);max-width:62ch}.ath-page-header__actions{display:flex;align-items:center;align-self:center;gap:var(--space-2);flex-shrink:0}@media(max-width:640px){.ath-page-header{flex-wrap:wrap;gap:var(--space-4)}.ath-page-header__text{flex:1 1 0}.ath-page-header__actions{flex-basis:100%;justify-content:flex-start}.ath-page-header__actions:empty{display:none}}@keyframes ath-page-header-pulse{0%,to{opacity:.45}50%{opacity:.85}}@media(prefers-reduced-motion:reduce){.ath-page-header__skeleton{animation:none;opacity:.65}}\n"],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthPageHeaderComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-page-header",
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: "<header\n  class=\"ath-page-header\"\n  [class.ath-page-header--divided]=\"divider()\"\n  [class.ath-page-header--section]=\"level() === 2\"\n  [attr.aria-busy]=\"loading() || null\"\n>\n  <div class=\"ath-page-header__leading\">\n    <ng-content select=\"[athPageLeading]\" />\n  </div>\n  <div class=\"ath-page-header__text\">\n    @if (loading()) {\n      <div class=\"ath-page-header__title\" aria-hidden=\"true\">\n        <span class=\"ath-page-header__skeleton ath-page-header__skeleton--title\"></span>\n      </div>\n    } @else if (level() === 2) {\n      <h2 class=\"ath-page-header__title\">{{ title() }}</h2>\n    } @else {\n      <h1 class=\"ath-page-header__title\">{{ title() }}</h1>\n    }\n    <div class=\"ath-page-header__sub\">\n      @if (loading()) {\n        <span\n          class=\"ath-page-header__skeleton ath-page-header__skeleton--meta\"\n          aria-hidden=\"true\"\n        ></span>\n      }\n      <!-- Every item leads with its separator, and the row clips the first\n           separator-width of each line: a wrapped line neither ends nor\n           starts on a stray \"·\". -->\n      @for (item of visibleSubItems(); track $index) {\n        <span class=\"ath-page-header__sub-item\">\n          <span class=\"ath-page-header__sub-sep\" aria-hidden=\"true\">·</span>\n          {{ item }}\n        </span>\n      }\n      <span class=\"ath-page-header__sub-slot\"><ng-content select=\"[athPageMeta]\" /></span>\n    </div>\n    @if (visibleSubItems().length === 0 && description()) {\n      <p class=\"ath-page-header__description\">{{ description() }}</p>\n    }\n  </div>\n  <div class=\"ath-page-header__actions\">\n    <ng-content />\n  </div>\n</header>\n",
			styles: [".ath-page-header{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--space-6);padding-bottom:0}.ath-page-header--divided{padding-bottom:var(--page-head-pad-bottom);border-bottom:1px solid var(--page-head-rule)}.ath-page-header__leading{flex-shrink:0;margin-right:calc(var(--space-4) - var(--space-6))}.ath-page-header__leading:empty{display:none}.ath-page-header__text{flex:1;min-width:0}.ath-page-header__title{margin:0;font-size:var(--page-title-size);font-weight:var(--weight-semibold);color:var(--fg);line-height:var(--line-tight);letter-spacing:-.015em}.ath-page-header__sub{--sep-w: 16px;margin-top:var(--page-head-gap);margin-left:calc(-1 * var(--sep-w));clip-path:inset(0 0 0 var(--sep-w));display:flex;align-items:center;flex-wrap:wrap;row-gap:2px;min-height:20px;font-size:var(--page-meta-size);color:var(--fg-3);line-height:var(--line-normal)}.ath-page-header--section .ath-page-header__sub:not(:has(.ath-page-header__sub-item)):has(.ath-page-header__sub-slot:empty){display:none}.ath-page-header__skeleton{display:inline-block;height:.8em;border-radius:var(--r-xs);background:var(--bg-2);vertical-align:middle;animation:ath-page-header-pulse 1.6s ease-in-out infinite}.ath-page-header__skeleton--title{width:min(16em,60%)}.ath-page-header__skeleton--meta{width:min(24em,80%);margin-left:var(--sep-w)}.ath-page-header__sub-item{display:inline-flex;align-items:center;font-weight:var(--weight-normal)}.ath-page-header__sub-sep{display:inline-block;width:var(--sep-w);text-align:center;color:var(--fg-4)}.ath-page-header__sub-slot{display:inline-flex;align-items:center;padding-left:var(--sep-w)}.ath-page-header__sub-slot:empty{display:none}.ath-page-header__description{margin:var(--page-head-gap) 0 0;font-size:var(--page-meta-size);color:var(--fg-3);line-height:var(--line-normal);max-width:62ch}.ath-page-header__actions{display:flex;align-items:center;align-self:center;gap:var(--space-2);flex-shrink:0}@media(max-width:640px){.ath-page-header{flex-wrap:wrap;gap:var(--space-4)}.ath-page-header__text{flex:1 1 0}.ath-page-header__actions{flex-basis:100%;justify-content:flex-start}.ath-page-header__actions:empty{display:none}}@keyframes ath-page-header-pulse{0%,to{opacity:.45}50%{opacity:.85}}@media(prefers-reduced-motion:reduce){.ath-page-header__skeleton{animation:none;opacity:.65}}\n"]
		}]
	}],
	propDecorators: {
		title: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "title",
				required: true
			}]
		}],
		subItems: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "subItems",
				required: false
			}]
		}],
		description: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "description",
				required: false
			}]
		}],
		divider: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "divider",
				required: false
			}]
		}],
		level: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "level",
				required: false
			}]
		}],
		loading: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "loading",
				required: false
			}]
		}]
	}
});
const wrapped = /* @__PURE__ */ new WeakMap();
function toIconData(icon) {
	if (!Array.isArray(icon)) return icon;
	let data = wrapped.get(icon);
	if (!data) {
		data = {
			name: "",
			node: icon
		};
		wrapped.set(icon, data);
	}
	return data;
}
var AthIconComponent = class AthIconComponent {
	constructor() {
		this.img = input.required(...ngDevMode ? [{ debugName: "img" }] : /* istanbul ignore next */ []);
		this.size = input(null, ...ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []);
		this.strokeWidth = input(null, ...ngDevMode ? [{ debugName: "strokeWidth" }] : /* istanbul ignore next */ []);
		this.color = input(null, ...ngDevMode ? [{ debugName: "color" }] : /* istanbul ignore next */ []);
		this.absoluteStrokeWidth = input(false, {
			...ngDevMode ? { debugName: "absoluteStrokeWidth" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.class = input(null, ...ngDevMode ? [{ debugName: "class" }] : /* istanbul ignore next */ []);
		this.data = computed(() => toIconData(this.img()), ...ngDevMode ? [{ debugName: "data" }] : /* istanbul ignore next */ []);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthIconComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.1.0",
			version: "22.2.2",
			type: AthIconComponent,
			isStandalone: true,
			selector: "ath-icon",
			inputs: {
				img: {
					classPropertyName: "img",
					publicName: "img",
					isSignal: true,
					isRequired: true,
					transformFunction: null
				},
				size: {
					classPropertyName: "size",
					publicName: "size",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				strokeWidth: {
					classPropertyName: "strokeWidth",
					publicName: "strokeWidth",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				color: {
					classPropertyName: "color",
					publicName: "color",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				absoluteStrokeWidth: {
					classPropertyName: "absoluteStrokeWidth",
					publicName: "absoluteStrokeWidth",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				class: {
					classPropertyName: "class",
					publicName: "class",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			ngImport: i0,
			template: `<svg
    [lucideIcon]="data()"
    [size]="size()"
    [strokeWidth]="strokeWidth()"
    [color]="color()"
    [absoluteStrokeWidth]="absoluteStrokeWidth()"
    [class]="class()"
  ></svg>`,
			isInline: true,
			dependencies: [{
				kind: "component",
				type: LucideDynamicIcon,
				selector: "svg[lucideIcon]",
				inputs: ["lucideIcon"]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthIconComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-icon",
			imports: [LucideDynamicIcon],
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: `<svg
    [lucideIcon]="data()"
    [size]="size()"
    [strokeWidth]="strokeWidth()"
    [color]="color()"
    [absoluteStrokeWidth]="absoluteStrokeWidth()"
    [class]="class()"
  ></svg>`
		}]
	}],
	propDecorators: {
		img: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "img",
				required: true
			}]
		}],
		size: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "size",
				required: false
			}]
		}],
		strokeWidth: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "strokeWidth",
				required: false
			}]
		}],
		color: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "color",
				required: false
			}]
		}],
		absoluteStrokeWidth: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "absoluteStrokeWidth",
				required: false
			}]
		}],
		class: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "class",
				required: false
			}]
		}]
	}
});
const merged = /* @__PURE__ */ new WeakMap();
function injectAthLabels() {
	const provided = inject(ATH_LABELS$1, { optional: true });
	if (!provided) return ATH_DEFAULT_LABELS$1;
	let labels = merged.get(provided);
	if (!labels) {
		labels = {
			...ATH_DEFAULT_LABELS$1,
			...provided
		};
		merged.set(provided, labels);
	}
	return labels;
}
function formatAthLabel(template, params) {
	return template.replace(/\{(\w+)\}/g, (whole, key) => key in params ? String(params[key]) : whole);
}
var AthSidebarComponent = class AthSidebarComponent {
	constructor() {
		this.labels = injectAthLabels();
		this.collapsed = model(false, ...ngDevMode ? [{ debugName: "collapsed" }] : /* istanbul ignore next */ []);
		this.collapseIcon = PanelLeftClose;
		this.expandIcon = PanelLeft;
		this.sidebarClasses = computed(() => ["ath-sidebar", this.collapsed() ? "ath-sidebar--collapsed" : ""].filter(Boolean).join(" "), ...ngDevMode ? [{ debugName: "sidebarClasses" }] : /* istanbul ignore next */ []);
	}
	toggleCollapse() {
		this.collapsed.update((collapsed) => !collapsed);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthSidebarComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.1.0",
			version: "22.2.2",
			type: AthSidebarComponent,
			isStandalone: true,
			selector: "ath-sidebar",
			inputs: { collapsed: {
				classPropertyName: "collapsed",
				publicName: "collapsed",
				isSignal: true,
				isRequired: false,
				transformFunction: null
			} },
			outputs: { collapsed: "collapsedChange" },
			ngImport: i0,
			template: "<aside [class]=\"sidebarClasses()\">\n  <div class=\"ath-sidebar__header\">\n    <ng-content select=\"[slot=header]\" />\n  </div>\n\n  <nav class=\"ath-sidebar__nav\">\n    <ng-content />\n  </nav>\n\n  <div class=\"ath-sidebar__footer\">\n    <ng-content select=\"[slot=footer]\" />\n    <button\n      class=\"ath-sidebar__toggle\"\n      type=\"button\"\n      [attr.aria-label]=\"collapsed() ? labels.sidebarExpand() : labels.sidebarCollapse()\"\n      (click)=\"toggleCollapse()\"\n    >\n      <ath-icon [img]=\"collapsed() ? expandIcon : collapseIcon\" [size]=\"18\" />\n    </button>\n  </div>\n</aside>\n",
			styles: [".ath-sidebar{display:flex;flex-direction:column;width:260px;height:100%;background-color:var(--bg-1);border-right:1px solid var(--border);transition:width var(--t-slow);overflow:hidden}.ath-sidebar--collapsed{width:64px}.ath-sidebar--collapsed .ath-sidebar__header,.ath-sidebar--collapsed .ath-sidebar__footer{padding:var(--space-3)}.ath-sidebar__header{padding:var(--space-4) var(--space-5);border-bottom:1px solid var(--border);flex-shrink:0}.ath-sidebar__nav{flex:1;display:flex;flex-direction:column;gap:var(--space-1);padding:var(--space-3);overflow-y:auto;overflow-x:hidden}.ath-sidebar__nav::-webkit-scrollbar{width:4px}.ath-sidebar__nav::-webkit-scrollbar-track{background:transparent}.ath-sidebar__nav::-webkit-scrollbar-thumb{background-color:var(--border);border-radius:var(--r-full)}.ath-sidebar__footer{display:flex;flex-direction:column;gap:var(--space-2);padding:var(--space-4) var(--space-5);border-top:1px solid var(--border);flex-shrink:0}.ath-sidebar__toggle{display:flex;align-items:center;justify-content:center;width:100%;height:32px;padding:0;color:var(--fg-3);background:none;border:none;border-radius:var(--r-sm);cursor:pointer;transition:color var(--t-fast),background-color var(--t-fast)}.ath-sidebar__toggle:hover{color:var(--fg-2);background-color:var(--bg-2)}\n"],
			dependencies: [{
				kind: "component",
				type: AthIconComponent,
				selector: "ath-icon",
				inputs: [
					"img",
					"size",
					"strokeWidth",
					"color",
					"absoluteStrokeWidth",
					"class"
				]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthSidebarComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-sidebar",
			imports: [AthIconComponent],
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: "<aside [class]=\"sidebarClasses()\">\n  <div class=\"ath-sidebar__header\">\n    <ng-content select=\"[slot=header]\" />\n  </div>\n\n  <nav class=\"ath-sidebar__nav\">\n    <ng-content />\n  </nav>\n\n  <div class=\"ath-sidebar__footer\">\n    <ng-content select=\"[slot=footer]\" />\n    <button\n      class=\"ath-sidebar__toggle\"\n      type=\"button\"\n      [attr.aria-label]=\"collapsed() ? labels.sidebarExpand() : labels.sidebarCollapse()\"\n      (click)=\"toggleCollapse()\"\n    >\n      <ath-icon [img]=\"collapsed() ? expandIcon : collapseIcon\" [size]=\"18\" />\n    </button>\n  </div>\n</aside>\n",
			styles: [".ath-sidebar{display:flex;flex-direction:column;width:260px;height:100%;background-color:var(--bg-1);border-right:1px solid var(--border);transition:width var(--t-slow);overflow:hidden}.ath-sidebar--collapsed{width:64px}.ath-sidebar--collapsed .ath-sidebar__header,.ath-sidebar--collapsed .ath-sidebar__footer{padding:var(--space-3)}.ath-sidebar__header{padding:var(--space-4) var(--space-5);border-bottom:1px solid var(--border);flex-shrink:0}.ath-sidebar__nav{flex:1;display:flex;flex-direction:column;gap:var(--space-1);padding:var(--space-3);overflow-y:auto;overflow-x:hidden}.ath-sidebar__nav::-webkit-scrollbar{width:4px}.ath-sidebar__nav::-webkit-scrollbar-track{background:transparent}.ath-sidebar__nav::-webkit-scrollbar-thumb{background-color:var(--border);border-radius:var(--r-full)}.ath-sidebar__footer{display:flex;flex-direction:column;gap:var(--space-2);padding:var(--space-4) var(--space-5);border-top:1px solid var(--border);flex-shrink:0}.ath-sidebar__toggle{display:flex;align-items:center;justify-content:center;width:100%;height:32px;padding:0;color:var(--fg-3);background:none;border:none;border-radius:var(--r-sm);cursor:pointer;transition:color var(--t-fast),background-color var(--t-fast)}.ath-sidebar__toggle:hover{color:var(--fg-2);background-color:var(--bg-2)}\n"]
		}]
	}],
	propDecorators: { collapsed: [{
		type: i0.Input,
		args: [{
			isSignal: true,
			alias: "collapsed",
			required: false
		}]
	}, {
		type: i0.Output,
		args: ["collapsedChange"]
	}] }
});
var AthNavItemComponent = class AthNavItemComponent {
	constructor() {
		this.label = input.required(...ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []);
		this.route = input(null, ...ngDevMode ? [{ debugName: "route" }] : /* istanbul ignore next */ []);
		this.exact = input(false, ...ngDevMode ? [{ debugName: "exact" }] : /* istanbul ignore next */ []);
		this.current = input(null, ...ngDevMode ? [{ debugName: "current" }] : /* istanbul ignore next */ []);
		this.icon = input(null, ...ngDevMode ? [{ debugName: "icon" }] : /* istanbul ignore next */ []);
		this.chip = input(null, ...ngDevMode ? [{ debugName: "chip" }] : /* istanbul ignore next */ []);
		this.badge = input(null, ...ngDevMode ? [{ debugName: "badge" }] : /* istanbul ignore next */ []);
		this.dot = input(null, ...ngDevMode ? [{ debugName: "dot" }] : /* istanbul ignore next */ []);
		this.muted = input(false, ...ngDevMode ? [{ debugName: "muted" }] : /* istanbul ignore next */ []);
		this.compact = input(false, ...ngDevMode ? [{ debugName: "compact" }] : /* istanbul ignore next */ []);
		this.indicator = input(true, ...ngDevMode ? [{ debugName: "indicator" }] : /* istanbul ignore next */ []);
		this.tooltip = input(null, ...ngDevMode ? [{ debugName: "tooltip" }] : /* istanbul ignore next */ []);
		this.target = computed(() => {
			const route = this.route() ?? "";
			return typeof route === "string" ? [route] : [...route];
		}, ...ngDevMode ? [{ debugName: "target" }] : /* istanbul ignore next */ []);
		this.count = computed(() => {
			const n = this.badge();
			return n !== null && n > 0 ? n : null;
		}, ...ngDevMode ? [{ debugName: "count" }] : /* istanbul ignore next */ []);
		this.tooltipText = computed(() => {
			if (!this.compact()) return null;
			const text = this.tooltip() ?? this.label();
			const n = this.count();
			return n !== null ? `${text} · ${n}` : text;
		}, ...ngDevMode ? [{ debugName: "tooltipText" }] : /* istanbul ignore next */ []);
		this.active = signal(false, ...ngDevMode ? [{ debugName: "active" }] : /* istanbul ignore next */ []);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthNavItemComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthNavItemComponent,
			isStandalone: true,
			selector: "ath-nav-item",
			inputs: {
				label: {
					classPropertyName: "label",
					publicName: "label",
					isSignal: true,
					isRequired: true,
					transformFunction: null
				},
				route: {
					classPropertyName: "route",
					publicName: "route",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				exact: {
					classPropertyName: "exact",
					publicName: "exact",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				current: {
					classPropertyName: "current",
					publicName: "current",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				icon: {
					classPropertyName: "icon",
					publicName: "icon",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				chip: {
					classPropertyName: "chip",
					publicName: "chip",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				badge: {
					classPropertyName: "badge",
					publicName: "badge",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				dot: {
					classPropertyName: "dot",
					publicName: "dot",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				muted: {
					classPropertyName: "muted",
					publicName: "muted",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				compact: {
					classPropertyName: "compact",
					publicName: "compact",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				indicator: {
					classPropertyName: "indicator",
					publicName: "indicator",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				tooltip: {
					classPropertyName: "tooltip",
					publicName: "tooltip",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			ngImport: i0,
			template: "<a\n  class=\"ath-nav-item\"\n  [class.ath-nav-item--compact]=\"compact()\"\n  [class.ath-nav-item--muted]=\"muted()\"\n  [routerLink]=\"target()\"\n  routerLinkActive\n  #matched=\"routerLinkActive\"\n  [routerLinkActiveOptions]=\"{ exact: exact() }\"\n  [class.ath-nav-item--active]=\"current() ?? matched.isActive\"\n  [attr.aria-label]=\"compact() ? label() : null\"\n  (mouseenter)=\"active.set(true)\"\n  (mouseleave)=\"active.set(false)\"\n  (focus)=\"active.set(true)\"\n  (blur)=\"active.set(false)\"\n>\n  @if (indicator()) {\n    <span class=\"ath-nav-item__indicator\" aria-hidden=\"true\"></span>\n  }\n\n  <span class=\"ath-nav-item__icon-cell\">\n    @if (icon(); as img) {\n      <ath-icon [img]=\"img\" [size]=\"16\" />\n    }\n    <!-- Decorative: the label beside it names the row. -->\n    @if (chip(); as c) {\n      <span class=\"ath-nav-item__chip\" [style.--chip-color]=\"c.color\" aria-hidden=\"true\">{{\n        c.text\n      }}</span>\n    }\n    <!-- The rail has no room for a count: an unread item gets a dot on its\n         icon instead. The count returns with the label. -->\n    @if (compact() && count() !== null) {\n      <span class=\"ath-nav-item__icon-dot\" aria-hidden=\"true\"></span>\n    }\n  </span>\n\n  <span class=\"ath-nav-item__tail\">\n    <span class=\"ath-nav-item__label\">{{ label() }}</span>\n    @if (count(); as n) {\n      <span class=\"ath-nav-item__badge\">{{ n }}</span>\n    }\n    @if (dot(); as tone) {\n      <span class=\"ath-nav-item__dot\" [attr.data-tone]=\"tone\" aria-hidden=\"true\"></span>\n    }\n    <!-- A marker at the row's end (\"Beta\"): inside the link, so the active\n         pill covers it and the link's name includes it. -->\n    <span class=\"ath-nav-item__end\"><ng-content select=\"[athNavItemEnd]\" /></span>\n  </span>\n\n  @if (tooltipText(); as text) {\n    <span\n      class=\"ath-nav-item__tooltip\"\n      role=\"tooltip\"\n      [class.ath-nav-item__tooltip--visible]=\"active()\"\n    >\n      {{ text }}\n    </span>\n  }\n</a>\n",
			styles: [".ath-nav-item{position:relative;display:flex;align-items:center;width:auto;height:var(--nav-row-h);margin:0 2px;padding:0;border-radius:var(--r-sm);color:var(--fg-2);text-decoration:none;font-family:var(--font-sans);font-size:13px;font-weight:500;white-space:nowrap;cursor:pointer;outline:none;overflow:hidden;transition:background .12s ease,color .12s ease}.ath-nav-item:hover{background:var(--hover);color:var(--fg)}.ath-nav-item:focus-visible{box-shadow:0 0 0 2px var(--focus-ring-color)}.ath-nav-item__indicator{position:absolute;left:0;top:50%;width:2px;height:16px;border-radius:0 2px 2px 0;background:transparent;transform:translateY(-50%);transition:background .12s ease}.ath-nav-item--active{background:var(--rail-active-bg);color:var(--nav-active-fg)}.ath-nav-item--active .ath-nav-item__indicator{background:var(--nav-active-indicator)}.ath-nav-item--active .ath-nav-item__icon-cell{color:var(--nav-active-icon)}.ath-nav-item__icon-cell{position:relative;flex:0 0 40px;display:flex;align-items:center;justify-content:center;color:var(--fg-4);transition:color .12s ease}.ath-nav-item:hover .ath-nav-item__icon-cell{color:var(--fg)}.ath-nav-item__chip{--chip-color: var(--fg-3);display:inline-flex;align-items:center;justify-content:center;min-width:28px;height:18px;padding:0 4px;border:1px solid color-mix(in srgb,var(--chip-color) 28%,transparent);border-radius:var(--r-xs);background:color-mix(in srgb,var(--chip-color) 10%,transparent);color:color-mix(in srgb,var(--chip-color) 68%,var(--fg));font-family:var(--font-mono);font-weight:600;font-size:10px;letter-spacing:.02em}.ath-nav-item__icon-dot{position:absolute;top:6px;left:calc(50% + 4px);width:6px;height:6px;border-radius:var(--r-full);background:var(--notify-dot);box-shadow:0 0 0 1.5px var(--bg-1)}.ath-nav-item--active .ath-nav-item__icon-dot{display:none}.ath-nav-item--muted:not(.ath-nav-item--active){color:var(--fg-3)}.ath-nav-item__tail{flex:1 1 auto;min-width:0;max-width:220px;display:flex;align-items:center;gap:6px;margin-left:2px;padding-right:10px;overflow:hidden;transition:max-width .18s cubic-bezier(.2,.9,.3,1),margin .18s cubic-bezier(.2,.9,.3,1),padding .18s cubic-bezier(.2,.9,.3,1),opacity .12s ease 40ms}.ath-nav-item__label{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis}.ath-nav-item__end{display:inline-flex;flex-shrink:0;align-items:center}.ath-nav-item__end:empty{display:none}.ath-nav-item__badge{flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;min-width:20px;height:18px;padding:0 5px;font-family:var(--font-mono);font-feature-settings:\"tnum\";font-size:11px;font-weight:500;color:var(--nav-badge-fg);background:var(--bg-1);border:1px solid var(--border);border-radius:var(--r-xs)}.ath-nav-item__dot{flex-shrink:0;width:6px;height:6px;border-radius:var(--r-full);background:var(--fg-4)}.ath-nav-item__dot[data-tone=ok]{background:var(--green)}.ath-nav-item__dot[data-tone=warn]{background:var(--amber)}.ath-nav-item__dot[data-tone=error]{background:var(--red)}.ath-nav-item--compact .ath-nav-item__tail{max-width:0;margin-left:0;padding-right:0;opacity:0;pointer-events:none}.ath-nav-item--compact .ath-nav-item__indicator{display:none}.ath-nav-item--compact.ath-nav-item--active{background:var(--rail-active-bg)}.ath-nav-item__tooltip{position:absolute;left:100%;top:50%;margin-left:10px;transform:translateY(-50%) translate(-4px);padding:5px 10px;background:var(--fg);color:var(--bg-1);font-size:11.5px;font-weight:500;letter-spacing:.005em;border-radius:var(--r-sm);white-space:nowrap;opacity:0;pointer-events:none;box-shadow:var(--shadow-2);transition:opacity .1s ease 60ms,transform .12s cubic-bezier(.2,.9,.3,1) 60ms;z-index:var(--z-tooltip)}.ath-nav-item__tooltip:before{content:\"\";position:absolute;left:-3px;top:50%;transform:translateY(-50%) rotate(45deg);width:6px;height:6px;background:inherit;border-radius:1px}.ath-nav-item__tooltip--visible{opacity:1;transform:translateY(-50%) translate(0)}@media(prefers-reduced-motion:reduce){.ath-nav-item,.ath-nav-item__icon-cell,.ath-nav-item__indicator,.ath-nav-item__tail,.ath-nav-item__tooltip{transition:none}}\n"],
			dependencies: [
				{
					kind: "directive",
					type: RouterLink,
					selector: "[routerLink]",
					inputs: [
						"target",
						"queryParams",
						"fragment",
						"queryParamsHandling",
						"state",
						"info",
						"relativeTo",
						"preserveFragment",
						"skipLocationChange",
						"replaceUrl",
						"browserUrl",
						"routerLink"
					]
				},
				{
					kind: "directive",
					type: RouterLinkActive,
					selector: "[routerLinkActive]",
					inputs: [
						"routerLinkActiveOptions",
						"ariaCurrentWhenActive",
						"routerLinkActive"
					],
					outputs: ["isActiveChange"],
					exportAs: ["routerLinkActive"]
				},
				{
					kind: "component",
					type: AthIconComponent,
					selector: "ath-icon",
					inputs: [
						"img",
						"size",
						"strokeWidth",
						"color",
						"absoluteStrokeWidth",
						"class"
					]
				}
			],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthNavItemComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-nav-item",
			imports: [
				RouterLink,
				RouterLinkActive,
				AthIconComponent
			],
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: "<a\n  class=\"ath-nav-item\"\n  [class.ath-nav-item--compact]=\"compact()\"\n  [class.ath-nav-item--muted]=\"muted()\"\n  [routerLink]=\"target()\"\n  routerLinkActive\n  #matched=\"routerLinkActive\"\n  [routerLinkActiveOptions]=\"{ exact: exact() }\"\n  [class.ath-nav-item--active]=\"current() ?? matched.isActive\"\n  [attr.aria-label]=\"compact() ? label() : null\"\n  (mouseenter)=\"active.set(true)\"\n  (mouseleave)=\"active.set(false)\"\n  (focus)=\"active.set(true)\"\n  (blur)=\"active.set(false)\"\n>\n  @if (indicator()) {\n    <span class=\"ath-nav-item__indicator\" aria-hidden=\"true\"></span>\n  }\n\n  <span class=\"ath-nav-item__icon-cell\">\n    @if (icon(); as img) {\n      <ath-icon [img]=\"img\" [size]=\"16\" />\n    }\n    <!-- Decorative: the label beside it names the row. -->\n    @if (chip(); as c) {\n      <span class=\"ath-nav-item__chip\" [style.--chip-color]=\"c.color\" aria-hidden=\"true\">{{\n        c.text\n      }}</span>\n    }\n    <!-- The rail has no room for a count: an unread item gets a dot on its\n         icon instead. The count returns with the label. -->\n    @if (compact() && count() !== null) {\n      <span class=\"ath-nav-item__icon-dot\" aria-hidden=\"true\"></span>\n    }\n  </span>\n\n  <span class=\"ath-nav-item__tail\">\n    <span class=\"ath-nav-item__label\">{{ label() }}</span>\n    @if (count(); as n) {\n      <span class=\"ath-nav-item__badge\">{{ n }}</span>\n    }\n    @if (dot(); as tone) {\n      <span class=\"ath-nav-item__dot\" [attr.data-tone]=\"tone\" aria-hidden=\"true\"></span>\n    }\n    <!-- A marker at the row's end (\"Beta\"): inside the link, so the active\n         pill covers it and the link's name includes it. -->\n    <span class=\"ath-nav-item__end\"><ng-content select=\"[athNavItemEnd]\" /></span>\n  </span>\n\n  @if (tooltipText(); as text) {\n    <span\n      class=\"ath-nav-item__tooltip\"\n      role=\"tooltip\"\n      [class.ath-nav-item__tooltip--visible]=\"active()\"\n    >\n      {{ text }}\n    </span>\n  }\n</a>\n",
			styles: [".ath-nav-item{position:relative;display:flex;align-items:center;width:auto;height:var(--nav-row-h);margin:0 2px;padding:0;border-radius:var(--r-sm);color:var(--fg-2);text-decoration:none;font-family:var(--font-sans);font-size:13px;font-weight:500;white-space:nowrap;cursor:pointer;outline:none;overflow:hidden;transition:background .12s ease,color .12s ease}.ath-nav-item:hover{background:var(--hover);color:var(--fg)}.ath-nav-item:focus-visible{box-shadow:0 0 0 2px var(--focus-ring-color)}.ath-nav-item__indicator{position:absolute;left:0;top:50%;width:2px;height:16px;border-radius:0 2px 2px 0;background:transparent;transform:translateY(-50%);transition:background .12s ease}.ath-nav-item--active{background:var(--rail-active-bg);color:var(--nav-active-fg)}.ath-nav-item--active .ath-nav-item__indicator{background:var(--nav-active-indicator)}.ath-nav-item--active .ath-nav-item__icon-cell{color:var(--nav-active-icon)}.ath-nav-item__icon-cell{position:relative;flex:0 0 40px;display:flex;align-items:center;justify-content:center;color:var(--fg-4);transition:color .12s ease}.ath-nav-item:hover .ath-nav-item__icon-cell{color:var(--fg)}.ath-nav-item__chip{--chip-color: var(--fg-3);display:inline-flex;align-items:center;justify-content:center;min-width:28px;height:18px;padding:0 4px;border:1px solid color-mix(in srgb,var(--chip-color) 28%,transparent);border-radius:var(--r-xs);background:color-mix(in srgb,var(--chip-color) 10%,transparent);color:color-mix(in srgb,var(--chip-color) 68%,var(--fg));font-family:var(--font-mono);font-weight:600;font-size:10px;letter-spacing:.02em}.ath-nav-item__icon-dot{position:absolute;top:6px;left:calc(50% + 4px);width:6px;height:6px;border-radius:var(--r-full);background:var(--notify-dot);box-shadow:0 0 0 1.5px var(--bg-1)}.ath-nav-item--active .ath-nav-item__icon-dot{display:none}.ath-nav-item--muted:not(.ath-nav-item--active){color:var(--fg-3)}.ath-nav-item__tail{flex:1 1 auto;min-width:0;max-width:220px;display:flex;align-items:center;gap:6px;margin-left:2px;padding-right:10px;overflow:hidden;transition:max-width .18s cubic-bezier(.2,.9,.3,1),margin .18s cubic-bezier(.2,.9,.3,1),padding .18s cubic-bezier(.2,.9,.3,1),opacity .12s ease 40ms}.ath-nav-item__label{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis}.ath-nav-item__end{display:inline-flex;flex-shrink:0;align-items:center}.ath-nav-item__end:empty{display:none}.ath-nav-item__badge{flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;min-width:20px;height:18px;padding:0 5px;font-family:var(--font-mono);font-feature-settings:\"tnum\";font-size:11px;font-weight:500;color:var(--nav-badge-fg);background:var(--bg-1);border:1px solid var(--border);border-radius:var(--r-xs)}.ath-nav-item__dot{flex-shrink:0;width:6px;height:6px;border-radius:var(--r-full);background:var(--fg-4)}.ath-nav-item__dot[data-tone=ok]{background:var(--green)}.ath-nav-item__dot[data-tone=warn]{background:var(--amber)}.ath-nav-item__dot[data-tone=error]{background:var(--red)}.ath-nav-item--compact .ath-nav-item__tail{max-width:0;margin-left:0;padding-right:0;opacity:0;pointer-events:none}.ath-nav-item--compact .ath-nav-item__indicator{display:none}.ath-nav-item--compact.ath-nav-item--active{background:var(--rail-active-bg)}.ath-nav-item__tooltip{position:absolute;left:100%;top:50%;margin-left:10px;transform:translateY(-50%) translate(-4px);padding:5px 10px;background:var(--fg);color:var(--bg-1);font-size:11.5px;font-weight:500;letter-spacing:.005em;border-radius:var(--r-sm);white-space:nowrap;opacity:0;pointer-events:none;box-shadow:var(--shadow-2);transition:opacity .1s ease 60ms,transform .12s cubic-bezier(.2,.9,.3,1) 60ms;z-index:var(--z-tooltip)}.ath-nav-item__tooltip:before{content:\"\";position:absolute;left:-3px;top:50%;transform:translateY(-50%) rotate(45deg);width:6px;height:6px;background:inherit;border-radius:1px}.ath-nav-item__tooltip--visible{opacity:1;transform:translateY(-50%) translate(0)}@media(prefers-reduced-motion:reduce){.ath-nav-item,.ath-nav-item__icon-cell,.ath-nav-item__indicator,.ath-nav-item__tail,.ath-nav-item__tooltip{transition:none}}\n"]
		}]
	}],
	propDecorators: {
		label: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "label",
				required: true
			}]
		}],
		route: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "route",
				required: false
			}]
		}],
		exact: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "exact",
				required: false
			}]
		}],
		current: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "current",
				required: false
			}]
		}],
		icon: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "icon",
				required: false
			}]
		}],
		chip: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "chip",
				required: false
			}]
		}],
		badge: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "badge",
				required: false
			}]
		}],
		dot: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "dot",
				required: false
			}]
		}],
		muted: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "muted",
				required: false
			}]
		}],
		compact: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "compact",
				required: false
			}]
		}],
		indicator: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "indicator",
				required: false
			}]
		}],
		tooltip: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "tooltip",
				required: false
			}]
		}]
	}
});
function containScrollWhileOverflowing(el) {
	const sync = () => {
		el.style.overscrollBehaviorY = el.scrollHeight > el.clientHeight ? "contain" : "";
	};
	sync();
	if (typeof ResizeObserver === "undefined") return () => void 0;
	const observer = new ResizeObserver(sync);
	observer.observe(el);
	return () => observer.disconnect();
}
const SCROLLS = /^(auto|scroll|overlay)$/;
function wheelAt(el, deltaY) {
	const style = getComputedStyle(el);
	if (!SCROLLS.test(style.overflowY)) return "pass";
	const max = el.scrollHeight - el.clientHeight;
	if (deltaY < 0 ? el.scrollTop > 0 : max > 0 && el.scrollTop < max - 1) return "take";
	return style.overscrollBehaviorY === "auto" ? "pass" : "keep";
}
function scrollParent(el) {
	const root = el?.ownerDocument.scrollingElement;
	for (let node = el?.parentElement ?? null; node; node = node.parentElement) {
		if (node === root || node === el?.ownerDocument.body) return null;
		if (SCROLLS.test(getComputedStyle(node).overflowY) && node.scrollHeight > node.clientHeight) return node;
	}
	return null;
}
function pixels(event, page) {
	if (event.deltaMode === 1) return event.deltaY * 16;
	if (event.deltaMode === 2) return event.deltaY * page;
	return event.deltaY;
}
function chainWheelToAnchor(panel, anchor) {
	if (!anchor) return () => void 0;
	const onWheel = (event) => {
		if (event.defaultPrevented || event.ctrlKey || event.deltaY === 0) return;
		const start = event.target instanceof Element ? event.target : panel;
		for (let el = start; el; el = el.parentElement) {
			if (wheelAt(el, event.deltaY) !== "pass") return;
			if (el === panel) break;
		}
		const target = scrollParent(anchor);
		if (target) target.scrollBy({ top: pixels(event, target.clientHeight) });
	};
	panel.addEventListener("wheel", onWheel, { passive: true });
	return () => panel.removeEventListener("wheel", onWheel);
}
function isVirtualAnchor(target) {
	return !!target && typeof target === "object" && !(typeof Element !== "undefined" && target instanceof Element) && typeof target.getBoundingClientRect === "function";
}
const MARGIN = 8;
const MIN_ROOM = 120;
const ARROW_INSET = 12;
function floatPanel(panel, anchor, options = {}) {
	const anchorEl = isVirtualAnchor(anchor) ? anchor.contextElement ?? null : anchor;
	const style = panel.style;
	style.position = "fixed";
	style.top = "0";
	style.left = "0";
	style.right = "auto";
	style.bottom = "auto";
	style.margin = "0";
	style.zIndex = "var(--z-popover)";
	style.visibility = "hidden";
	panel.setAttribute("data-ath-floating", "");
	const inTopLayer = (options.topLayer ?? true) && promote(panel);
	const commit = (left, top, placement) => {
		const origin = inTopLayer ? {
			x: 0,
			y: 0
		} : fixedOrigin(panel);
		style.left = `${Math.round(left - origin.x)}px`;
		style.top = `${Math.round(top - origin.y)}px`;
		style.maxWidth = `${document.documentElement.clientWidth - 16}px`;
		style.visibility = "";
		panel.dataset["placement"] = placement;
	};
	let frame = 0;
	const place = () => {
		if (anchorEl && !anchorEl.isConnected || !panel.isConnected) return;
		const a = anchor.getBoundingClientRect();
		const vw = document.documentElement.clientWidth;
		const vh = window.innerHeight;
		const gap = options.offset ?? 4;
		if (options.matchWidth) style.minWidth = `${Math.round(a.width)}px`;
		style.maxHeight = "";
		style.overflowY = "";
		style.overscrollBehaviorY = "";
		const width = Math.min(panel.offsetWidth, vw - 16);
		const natural = panel.offsetHeight;
		if (options.side === "left" || options.side === "right") {
			const right = vw - a.right - gap - MARGIN;
			const leftRoom = a.left - gap - MARGIN;
			const toRight = options.side === "right" ? width <= right || right >= leftRoom : !(width <= leftRoom || leftRoom >= right);
			const x = toRight ? a.right + gap : a.left - gap - width;
			const y = a.top + a.height / 2 - natural / 2;
			commit(Math.max(MARGIN, Math.min(x, vw - width - MARGIN)), Math.max(MARGIN, Math.min(y, vh - natural - MARGIN)), toRight ? "right" : "left");
			return;
		}
		const below = vh - a.bottom - gap - MARGIN;
		const above = a.top - gap - MARGIN;
		const down = options.side === "top" ? !(natural <= above || above >= below) : natural <= below || below >= above;
		let room = Math.max(down ? below : above, MIN_ROOM);
		if (options.maxHeight) room = Math.min(room, options.maxHeight);
		const height = Math.min(natural, room);
		if (natural > room) {
			style.maxHeight = `${Math.floor(room)}px`;
			style.overflowY = "auto";
			style.overscrollBehaviorY = "contain";
		}
		const rtl = getComputedStyle(anchorEl ?? panel).direction === "rtl";
		const leftEdge = a.left;
		const rightEdge = a.right - width;
		const fromStart = rtl ? rightEdge : leftEdge;
		const fromEnd = rtl ? leftEdge : rightEdge;
		const fits = (x) => x >= MARGIN && x + width <= vw - MARGIN;
		const align = options.align ?? "start";
		let left = align === "center" ? a.left + a.width / 2 - width / 2 : align === "end" ? fromEnd : align === "auto" && !fits(fromStart) ? fromEnd : fromStart;
		left = Math.max(MARGIN, Math.min(left, vw - width - MARGIN));
		const top = Math.max(MARGIN, down ? a.bottom + gap : a.top - gap - height);
		commit(left, top, down ? "bottom" : "top");
		if (options.arrow) {
			const x = a.left + a.width / 2 - left;
			const clamped = Math.max(ARROW_INSET, Math.min(x, width - ARROW_INSET));
			options.arrow.style.left = `${Math.round(clamped)}px`;
		}
	};
	const schedule = (event) => {
		if (event?.type === "scroll" && event.target instanceof Node && panel.contains(event.target)) return;
		cancelAnimationFrame(frame);
		frame = requestAnimationFrame(place);
	};
	window.addEventListener("resize", schedule);
	const unchain = chainWheelToAnchor(panel, anchorEl);
	document.addEventListener("scroll", schedule, true);
	const resize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(() => schedule());
	resize?.observe(panel);
	if (anchorEl) resize?.observe(anchorEl);
	place();
	const stop = () => {
		cancelAnimationFrame(frame);
		window.removeEventListener("resize", schedule);
		document.removeEventListener("scroll", schedule, true);
		resize?.disconnect();
		unchain();
		if (inTopLayer) demote(panel);
	};
	return Object.assign(stop, { update: place });
}
function supportsTopLayer() {
	return typeof HTMLElement !== "undefined" && "showPopover" in HTMLElement.prototype;
}
function promote(panel) {
	if (!supportsTopLayer() || !panel.isConnected) return false;
	installTopLayerStyles();
	if (!panel.hasAttribute("popover")) panel.setAttribute("popover", "manual");
	try {
		if (!panel.matches(":popover-open")) panel.showPopover();
		return true;
	} catch {
		panel.removeAttribute("popover");
		return false;
	}
}
function demote(panel) {
	try {
		if (panel.matches(":popover-open")) panel.hidePopover();
	} catch {}
}
let baseStylesInstalled = false;
const BASE_STYLES = ":where([data-ath-floating][popover],[data-ath-top-layer][popover]){inset:auto;margin:0;border:0;padding:0;background:none;color:inherit;overflow:visible}";
function installTopLayerStyles() {
	if (baseStylesInstalled) return;
	baseStylesInstalled = true;
	try {
		const sheet = new CSSStyleSheet();
		sheet.replaceSync(BASE_STYLES);
		document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
	} catch {
		const el = document.createElement("style");
		el.textContent = BASE_STYLES;
		document.head.appendChild(el);
	}
}
function fixedOrigin(el) {
	const parent = el.parentElement;
	if (!parent) return {
		x: 0,
		y: 0
	};
	const probe = document.createElement("div");
	probe.style.cssText = "position:fixed;left:0;top:0;width:0;height:0;visibility:hidden;pointer-events:none";
	parent.appendChild(probe);
	const box = probe.getBoundingClientRect();
	probe.remove();
	return {
		x: box.left,
		y: box.top
	};
}
function resolveAnchor(anchor) {
	if (!anchor) return null;
	if (anchor instanceof ElementRef) return anchor.nativeElement;
	if (isVirtualAnchor(anchor)) {
		const ctx = anchor.contextElement;
		return ctx instanceof HTMLElement ? ctx : null;
	}
	return anchor;
}
function resolveFloatingTarget(anchor) {
	if (!anchor) return null;
	return anchor instanceof ElementRef ? anchor.nativeElement : anchor;
}
var AthFloatingDirective = class AthFloatingDirective {
	constructor() {
		this.anchor = input.required({
			...ngDevMode ? { debugName: "anchor" } : /* istanbul ignore next */ {},
			alias: "athFloating"
		});
		this.align = input("start", ...ngDevMode ? [{ debugName: "align" }] : /* istanbul ignore next */ []);
		this.side = input("bottom", ...ngDevMode ? [{ debugName: "side" }] : /* istanbul ignore next */ []);
		this.offset = input(4, ...ngDevMode ? [{ debugName: "offset" }] : /* istanbul ignore next */ []);
		this.matchWidth = input(false, {
			...ngDevMode ? { debugName: "matchWidth" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.maxHeight = input(null, ...ngDevMode ? [{ debugName: "maxHeight" }] : /* istanbul ignore next */ []);
		this.topLayer = input(true, {
			...ngDevMode ? { debugName: "topLayer" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.arrow = input(null, ...ngDevMode ? [{ debugName: "arrow" }] : /* istanbul ignore next */ []);
		this.el = inject(ElementRef).nativeElement;
		this.cleanup = null;
		this.viewReady = false;
	}
	ngAfterViewInit() {
		this.viewReady = true;
		this.attach();
	}
	ngOnChanges() {
		if (this.viewReady) this.attach();
	}
	ngOnDestroy() {
		this.cleanup?.();
		this.cleanup = null;
	}
	update() {
		this.cleanup?.update();
	}
	attach() {
		this.cleanup?.();
		this.cleanup = null;
		const anchor = resolveFloatingTarget(this.anchor());
		if (!anchor) return;
		this.cleanup = floatPanel(this.el, anchor, {
			align: this.align(),
			side: this.side(),
			offset: this.offset(),
			matchWidth: this.matchWidth(),
			maxHeight: this.maxHeight(),
			topLayer: this.topLayer(),
			arrow: this.arrow()
		});
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthFloatingDirective,
			deps: [],
			target: i0.ɵɵFactoryTarget.Directive
		});
	}
	static {
		this.ɵdir = i0.ɵɵngDeclareDirective({
			minVersion: "17.1.0",
			version: "22.2.2",
			type: AthFloatingDirective,
			isStandalone: true,
			selector: "[athFloating]",
			inputs: {
				anchor: {
					classPropertyName: "anchor",
					publicName: "athFloating",
					isSignal: true,
					isRequired: true,
					transformFunction: null
				},
				align: {
					classPropertyName: "align",
					publicName: "align",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				side: {
					classPropertyName: "side",
					publicName: "side",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				offset: {
					classPropertyName: "offset",
					publicName: "offset",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				matchWidth: {
					classPropertyName: "matchWidth",
					publicName: "matchWidth",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				maxHeight: {
					classPropertyName: "maxHeight",
					publicName: "maxHeight",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				topLayer: {
					classPropertyName: "topLayer",
					publicName: "topLayer",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				arrow: {
					classPropertyName: "arrow",
					publicName: "arrow",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			exportAs: ["athFloating"],
			usesOnChanges: true,
			ngImport: i0
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthFloatingDirective,
	decorators: [{
		type: Directive,
		args: [{
			selector: "[athFloating]",
			exportAs: "athFloating"
		}]
	}],
	propDecorators: {
		anchor: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "athFloating",
				required: true
			}]
		}],
		align: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "align",
				required: false
			}]
		}],
		side: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "side",
				required: false
			}]
		}],
		offset: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "offset",
				required: false
			}]
		}],
		matchWidth: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "matchWidth",
				required: false
			}]
		}],
		maxHeight: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "maxHeight",
				required: false
			}]
		}],
		topLayer: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "topLayer",
				required: false
			}]
		}],
		arrow: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "arrow",
				required: false
			}]
		}]
	}
});
var AthOverlayStack = class AthOverlayStack {
	constructor() {
		this.doc = inject(DOCUMENT);
		this.entries = [];
		this.listening = false;
		this.escapeTask = 0;
		this.locks = 0;
		this.savedScroll = null;
		this.onKeydown = (event) => {
			if (event.key !== "Escape" || event.defaultPrevented) return;
			const top = this.entries[this.entries.length - 1];
			if (!top || top.modal) return;
			event.preventDefault();
			this.markEscape();
			if (top.closeOnEscape()) top.dismiss("escape");
		};
		this.onPointerDown = (event) => {
			const path = event.composedPath();
			for (let i = this.entries.length - 1; i >= 0; i--) {
				const entry = this.entries[i];
				if (entry.modal) return;
				const panel = entry.panel();
				const anchor = entry.anchor();
				if (panel && path.includes(panel) || anchor && path.includes(anchor)) return;
				if (!entry.closeOnOutsideClick()) return;
				entry.dismiss("outside");
			}
		};
	}
	open(entry) {
		this.remove(entry);
		this.entries.push(entry);
		this.listen();
	}
	close(entry) {
		this.remove(entry);
		if (this.entries.length === 0) this.unlisten();
	}
	isTop(entry) {
		return this.entries[this.entries.length - 1] === entry;
	}
	get size() {
		return this.entries.length;
	}
	escapeConsumed() {
		return this.escapeTask !== 0;
	}
	raiseTopLayer() {
		if (!supportsTopLayer()) return;
		installTopLayerStyles();
		for (const el of Array.from(this.doc.querySelectorAll("[data-ath-top-layer]"))) try {
			if (!el.hasAttribute("popover")) el.setAttribute("popover", "manual");
			if (el.matches(":popover-open")) el.hidePopover();
			el.showPopover();
		} catch {}
	}
	lockScroll() {
		if (this.locks++ > 0) return;
		const root = this.doc.documentElement;
		const body = this.doc.body;
		const view = this.doc.defaultView;
		const scrollbar = view ? view.innerWidth - root.clientWidth : 0;
		this.savedScroll = {
			overflow: root.style.overflow,
			paddingRight: body.style.paddingRight
		};
		root.style.overflow = "hidden";
		if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
	}
	unlockScroll() {
		if (this.locks === 0 || --this.locks > 0) return;
		if (this.savedScroll) {
			this.doc.documentElement.style.overflow = this.savedScroll.overflow;
			this.doc.body.style.paddingRight = this.savedScroll.paddingRight;
		}
		this.savedScroll = null;
	}
	remove(entry) {
		const i = this.entries.indexOf(entry);
		if (i >= 0) this.entries.splice(i, 1);
	}
	markEscape() {
		const view = this.doc.defaultView;
		if (!view) return;
		view.clearTimeout(this.escapeTask);
		this.escapeTask = view.setTimeout(() => this.escapeTask = 0);
	}
	listen() {
		if (this.listening) return;
		this.listening = true;
		this.doc.addEventListener("keydown", this.onKeydown);
		this.doc.addEventListener("pointerdown", this.onPointerDown, true);
	}
	unlisten() {
		if (!this.listening) return;
		this.listening = false;
		this.doc.removeEventListener("keydown", this.onKeydown);
		this.doc.removeEventListener("pointerdown", this.onPointerDown, true);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthOverlayStack,
			deps: [],
			target: i0.ɵɵFactoryTarget.Injectable
		});
	}
	static {
		this.ɵprov = i0.ɵɵngDeclareInjectable({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthOverlayStack,
			providedIn: "root"
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthOverlayStack,
	decorators: [{
		type: Injectable,
		args: [{ providedIn: "root" }]
	}]
});
const FOCUSABLE = [
	"a[href]",
	"area[href]",
	"button:not([disabled])",
	"input:not([disabled]):not([type=\"hidden\"])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"iframe",
	"[contenteditable]:not([contenteditable=\"false\"])",
	"[tabindex]"
].join(",");
function tabbables(root) {
	return Array.from(root.querySelectorAll(FOCUSABLE)).filter((el) => el.tabIndex >= 0 && !el.closest("[inert]") && el.getClientRects().length > 0);
}
function trapTab(event, root) {
	if (event.key !== "Tab") return false;
	const items = tabbables(root);
	if (items.length === 0) {
		event.preventDefault();
		root.focus();
		return true;
	}
	const first = items[0];
	const last = items[items.length - 1];
	const active = root.ownerDocument.activeElement;
	if (event.shiftKey && (active === first || active === root)) {
		event.preventDefault();
		last.focus();
		return true;
	}
	if (!event.shiftKey && active === last) {
		event.preventDefault();
		first.focus();
		return true;
	}
	return false;
}
function focusSafely(el) {
	if (!el || !el.isConnected) return false;
	el.focus({ preventScroll: true });
	return el.ownerDocument.activeElement === el;
}
function focusTarget(host) {
	if (host.matches("button, a[href], input, select, textarea, [tabindex]")) return host;
	return host.querySelector("button, a[href], [tabindex]") ?? host;
}
let nextPopoverId = 0;
var AthPopoverContentDirective = class AthPopoverContentDirective {
	constructor() {
		this.template = inject(TemplateRef);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthPopoverContentDirective,
			deps: [],
			target: i0.ɵɵFactoryTarget.Directive
		});
	}
	static {
		this.ɵdir = i0.ɵɵngDeclareDirective({
			minVersion: "14.0.0",
			version: "22.2.2",
			type: AthPopoverContentDirective,
			isStandalone: true,
			selector: "ng-template[athPopoverContent]",
			ngImport: i0
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthPopoverContentDirective,
	decorators: [{
		type: Directive,
		args: [{ selector: "ng-template[athPopoverContent]" }]
	}]
});
var AthPopoverComponent = class AthPopoverComponent {
	get panel() {
		return this.panelRef()?.nativeElement ?? null;
	}
	constructor() {
		this.stack = inject(AthOverlayStack);
		this.open = model(false, ...ngDevMode ? [{ debugName: "open" }] : /* istanbul ignore next */ []);
		this.anchor = input(null, ...ngDevMode ? [{ debugName: "anchor" }] : /* istanbul ignore next */ []);
		this.size = input("md", ...ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []);
		this.padding = input("md", ...ngDevMode ? [{ debugName: "padding" }] : /* istanbul ignore next */ []);
		this.align = input("start", ...ngDevMode ? [{ debugName: "align" }] : /* istanbul ignore next */ []);
		this.side = input("bottom", ...ngDevMode ? [{ debugName: "side" }] : /* istanbul ignore next */ []);
		this.offset = input(6, ...ngDevMode ? [{ debugName: "offset" }] : /* istanbul ignore next */ []);
		this.matchWidth = input(false, {
			...ngDevMode ? { debugName: "matchWidth" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.maxHeight = input(null, ...ngDevMode ? [{ debugName: "maxHeight" }] : /* istanbul ignore next */ []);
		this.arrow = input(false, {
			...ngDevMode ? { debugName: "arrow" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.trapFocus = input(false, {
			...ngDevMode ? { debugName: "trapFocus" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.autoFocus = input("first", ...ngDevMode ? [{ debugName: "autoFocus" }] : /* istanbul ignore next */ []);
		this.restoreFocus = input(true, {
			...ngDevMode ? { debugName: "restoreFocus" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.closeOnEscape = input(true, {
			...ngDevMode ? { debugName: "closeOnEscape" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.closeOnOutsideClick = input(true, {
			...ngDevMode ? { debugName: "closeOnOutsideClick" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.panelRole = input("dialog", ...ngDevMode ? [{ debugName: "panelRole" }] : /* istanbul ignore next */ []);
		this.ariaLabel = input(null, ...ngDevMode ? [{ debugName: "ariaLabel" }] : /* istanbul ignore next */ []);
		this.ariaLabelledby = input(null, ...ngDevMode ? [{ debugName: "ariaLabelledby" }] : /* istanbul ignore next */ []);
		this.panelClass = input("", ...ngDevMode ? [{ debugName: "panelClass" }] : /* istanbul ignore next */ []);
		this.opened = output();
		this.closed = output();
		this.panelId = input(`ath-popover-${++nextPopoverId}`, ...ngDevMode ? [{ debugName: "panelId" }] : /* istanbul ignore next */ []);
		this.lazyContent = contentChild(AthPopoverContentDirective, {
			...ngDevMode ? { debugName: "lazyContent" } : /* istanbul ignore next */ {},
			descendants: false
		});
		this.panelRef = viewChild("panel", ...ngDevMode ? [{ debugName: "panelRef" }] : /* istanbul ignore next */ []);
		this.triggerAnchor = signal(null, ...ngDevMode ? [{ debugName: "triggerAnchor" }] : /* istanbul ignore next */ []);
		this.anchorElement = computed(() => resolveAnchor(this.anchor()) ?? this.triggerAnchor(), ...ngDevMode ? [{ debugName: "anchorElement" }] : /* istanbul ignore next */ []);
		this.floatTarget = computed(() => resolveFloatingTarget(this.anchor()) ?? this.triggerAnchor(), ...ngDevMode ? [{ debugName: "floatTarget" }] : /* istanbul ignore next */ []);
		this.panelClasses = computed(() => [
			`ath-popover__panel--${this.size()}`,
			`ath-popover__panel--pad-${this.padding()}`,
			this.panelClass()
		].filter(Boolean).join(" "), ...ngDevMode ? [{ debugName: "panelClasses" }] : /* istanbul ignore next */ []);
		this.registered = false;
		this.returnFocus = null;
		this.panelJobs = [];
		this.entry = {
			panel: () => this.panel,
			anchor: () => this.anchorElement(),
			closeOnEscape: () => this.closeOnEscape(),
			closeOnOutsideClick: () => this.closeOnOutsideClick(),
			dismiss: (reason) => this.hide(reason)
		};
		effect(() => {
			if (this.panelRef()) untracked(() => this.runPanelJobs());
		});
	}
	whenPanelReady(fn) {
		if (!this.open()) return;
		this.panelJobs.push(fn);
		if (this.panel) this.runPanelJobs();
	}
	ngOnChanges(changes) {
		if (!changes["open"]) return;
		if (this.open() && !this.registered) this.afterOpen();
		else if (!this.open() && this.registered) this.afterClose("programmatic");
	}
	ngOnDestroy() {
		this.panelJobs = [];
		if (this.registered) this.stack.close(this.entry);
	}
	show(anchor) {
		if (anchor) this.triggerAnchor.set(anchor);
		if (this.open()) return;
		this.open.set(true);
		this.afterOpen();
	}
	hide(reason = "programmatic", restore) {
		if (!this.open()) return;
		this.open.set(false);
		this.afterClose(reason, restore);
	}
	toggle(anchor) {
		if (this.open()) this.hide();
		else this.show(anchor);
	}
	focusPanel(mode = this.autoFocus()) {
		const panel = this.panel;
		if (!panel || mode === "none") return;
		const active = panel.ownerDocument.activeElement;
		if (active && panel.contains(active) && active !== panel) return;
		focusSafely(mode === "first" ? tabbables(panel)[0] ?? panel : panel);
	}
	onKeydown(event) {
		const panel = this.panel;
		if (panel && this.trapFocus()) trapTab(event, panel);
	}
	onFocusOut(event) {
		if (this.trapFocus() || !this.open()) return;
		const next = event.relatedTarget;
		const panel = this.panel;
		const anchor = this.anchorElement();
		if (!(next instanceof Node) || !panel) return;
		if (panel.contains(next) || anchor?.contains(next)) return;
		this.hide("tab", false);
	}
	afterOpen() {
		this.registered = true;
		const doc = this.anchorElement()?.ownerDocument ?? document;
		const active = doc.activeElement;
		const anchor = this.anchorElement();
		this.returnFocus = anchor ? focusTarget(anchor) : active instanceof HTMLElement && active !== doc.body ? active : null;
		this.stack.open(this.entry);
		this.opened.emit();
		this.whenPanelReady(() => this.focusPanel());
	}
	runPanelJobs() {
		if (!this.open() || !this.panel) return;
		const jobs = this.panelJobs;
		this.panelJobs = [];
		for (const job of jobs) job();
	}
	afterClose(reason, restore) {
		this.registered = false;
		this.panelJobs = [];
		this.stack.close(this.entry);
		const panel = this.panel;
		const doc = panel?.ownerDocument ?? document;
		const focusInside = !!panel && panel.contains(doc.activeElement);
		const back = this.returnFocus;
		this.returnFocus = null;
		if ((restore ?? (this.restoreFocus() && (reason === "escape" || reason === "select" || reason !== "tab" && focusInside))) && reason !== "outside") focusSafely(back);
		else if (reason === "outside" && focusInside && this.restoreFocus()) setTimeout(() => {
			if (doc.activeElement === doc.body || !doc.activeElement) focusSafely(back);
		});
		this.closed.emit(reason);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthPopoverComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthPopoverComponent,
			isStandalone: true,
			selector: "ath-popover",
			inputs: {
				open: {
					classPropertyName: "open",
					publicName: "open",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				anchor: {
					classPropertyName: "anchor",
					publicName: "anchor",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				size: {
					classPropertyName: "size",
					publicName: "size",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				padding: {
					classPropertyName: "padding",
					publicName: "padding",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				align: {
					classPropertyName: "align",
					publicName: "align",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				side: {
					classPropertyName: "side",
					publicName: "side",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				offset: {
					classPropertyName: "offset",
					publicName: "offset",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				matchWidth: {
					classPropertyName: "matchWidth",
					publicName: "matchWidth",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				maxHeight: {
					classPropertyName: "maxHeight",
					publicName: "maxHeight",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				arrow: {
					classPropertyName: "arrow",
					publicName: "arrow",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				trapFocus: {
					classPropertyName: "trapFocus",
					publicName: "trapFocus",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				autoFocus: {
					classPropertyName: "autoFocus",
					publicName: "autoFocus",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				restoreFocus: {
					classPropertyName: "restoreFocus",
					publicName: "restoreFocus",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				closeOnEscape: {
					classPropertyName: "closeOnEscape",
					publicName: "closeOnEscape",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				closeOnOutsideClick: {
					classPropertyName: "closeOnOutsideClick",
					publicName: "closeOnOutsideClick",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				panelRole: {
					classPropertyName: "panelRole",
					publicName: "panelRole",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				ariaLabel: {
					classPropertyName: "ariaLabel",
					publicName: "ariaLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				ariaLabelledby: {
					classPropertyName: "ariaLabelledby",
					publicName: "ariaLabelledby",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				panelClass: {
					classPropertyName: "panelClass",
					publicName: "panelClass",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				panelId: {
					classPropertyName: "panelId",
					publicName: "panelId",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			outputs: {
				open: "openChange",
				opened: "opened",
				closed: "closed"
			},
			queries: [{
				propertyName: "lazyContent",
				first: true,
				predicate: AthPopoverContentDirective,
				isSignal: true
			}],
			viewQueries: [{
				propertyName: "panelRef",
				first: true,
				predicate: ["panel"],
				descendants: true,
				isSignal: true
			}],
			exportAs: ["athPopover"],
			usesOnChanges: true,
			ngImport: i0,
			template: "@if (open()) {\n  <div\n    #panel\n    class=\"ath-popover__panel\"\n    [class]=\"panelClasses()\"\n    [id]=\"panelId()\"\n    [attr.role]=\"panelRole()\"\n    [attr.aria-label]=\"ariaLabel()\"\n    [attr.aria-labelledby]=\"ariaLabelledby()\"\n    [attr.aria-modal]=\"trapFocus() && panelRole() === 'dialog' ? 'true' : null\"\n    tabindex=\"-1\"\n    [athFloating]=\"floatTarget()\"\n    [align]=\"align()\"\n    [side]=\"side()\"\n    [offset]=\"offset()\"\n    [matchWidth]=\"matchWidth()\"\n    [maxHeight]=\"maxHeight()\"\n    [arrow]=\"arrow() ? arrowEl : null\"\n    (keydown)=\"onKeydown($event)\"\n    (focusout)=\"onFocusOut($event)\"\n  >\n    <span #arrowEl class=\"ath-popover__arrow\" [hidden]=\"!arrow()\" aria-hidden=\"true\"></span>\n    @if (lazyContent(); as lazy) {\n      <ng-container [ngTemplateOutlet]=\"lazy.template\" />\n    } @else {\n      <ng-content />\n    }\n  </div>\n}\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:contents}.ath-popover__panel{box-sizing:border-box;max-width:calc(100vw - var(--space-4));font-family:var(--font-sans);font-size:var(--text-base);font-style:normal;font-weight:var(--weight-normal);text-align:start;text-transform:none;white-space:normal;color:var(--fg);background:var(--surface-raised);border:1px solid var(--border-raised);border-radius:var(--r-lg);box-shadow:var(--shadow-raised);animation:ath-popover-in var(--t-base)}.ath-popover__panel:focus{outline:none}.ath-popover__panel:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-popover__panel--sm{width:220px}.ath-popover__panel--md{width:280px}.ath-popover__panel--lg{width:360px}.ath-popover__panel--auto{width:max-content;min-width:180px}.ath-popover__panel--pad-md{padding:var(--space-3)}.ath-popover__panel--pad-sm{padding:var(--space-1)}.ath-popover__panel--pad-none{padding:0}.ath-popover__panel[data-placement=top]{animation-name:ath-popover-in-up}.ath-popover__arrow{position:absolute;top:-6px;width:10px;height:10px;background:var(--surface-raised);border-top:1px solid var(--border-raised);border-left:1px solid var(--border-raised);transform:translate(-50%) rotate(45deg);pointer-events:none}[data-placement=top]>.ath-popover__arrow{top:auto;bottom:-6px;transform:translate(-50%) rotate(225deg)}@keyframes ath-popover-in{0%{opacity:0;transform:translateY(-4px)}}@keyframes ath-popover-in-up{0%{opacity:0;transform:translateY(4px)}}\n"],
			dependencies: [{
				kind: "directive",
				type: AthFloatingDirective,
				selector: "[athFloating]",
				inputs: [
					"athFloating",
					"align",
					"side",
					"offset",
					"matchWidth",
					"maxHeight",
					"topLayer",
					"arrow"
				],
				exportAs: ["athFloating"]
			}, {
				kind: "directive",
				type: NgTemplateOutlet,
				selector: "[ngTemplateOutlet]",
				inputs: [
					"ngTemplateOutletContext",
					"ngTemplateOutlet",
					"ngTemplateOutletInjector"
				]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthPopoverComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-popover",
			imports: [AthFloatingDirective, NgTemplateOutlet],
			changeDetection: ChangeDetectionStrategy.OnPush,
			exportAs: "athPopover",
			template: "@if (open()) {\n  <div\n    #panel\n    class=\"ath-popover__panel\"\n    [class]=\"panelClasses()\"\n    [id]=\"panelId()\"\n    [attr.role]=\"panelRole()\"\n    [attr.aria-label]=\"ariaLabel()\"\n    [attr.aria-labelledby]=\"ariaLabelledby()\"\n    [attr.aria-modal]=\"trapFocus() && panelRole() === 'dialog' ? 'true' : null\"\n    tabindex=\"-1\"\n    [athFloating]=\"floatTarget()\"\n    [align]=\"align()\"\n    [side]=\"side()\"\n    [offset]=\"offset()\"\n    [matchWidth]=\"matchWidth()\"\n    [maxHeight]=\"maxHeight()\"\n    [arrow]=\"arrow() ? arrowEl : null\"\n    (keydown)=\"onKeydown($event)\"\n    (focusout)=\"onFocusOut($event)\"\n  >\n    <span #arrowEl class=\"ath-popover__arrow\" [hidden]=\"!arrow()\" aria-hidden=\"true\"></span>\n    @if (lazyContent(); as lazy) {\n      <ng-container [ngTemplateOutlet]=\"lazy.template\" />\n    } @else {\n      <ng-content />\n    }\n  </div>\n}\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:contents}.ath-popover__panel{box-sizing:border-box;max-width:calc(100vw - var(--space-4));font-family:var(--font-sans);font-size:var(--text-base);font-style:normal;font-weight:var(--weight-normal);text-align:start;text-transform:none;white-space:normal;color:var(--fg);background:var(--surface-raised);border:1px solid var(--border-raised);border-radius:var(--r-lg);box-shadow:var(--shadow-raised);animation:ath-popover-in var(--t-base)}.ath-popover__panel:focus{outline:none}.ath-popover__panel:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-popover__panel--sm{width:220px}.ath-popover__panel--md{width:280px}.ath-popover__panel--lg{width:360px}.ath-popover__panel--auto{width:max-content;min-width:180px}.ath-popover__panel--pad-md{padding:var(--space-3)}.ath-popover__panel--pad-sm{padding:var(--space-1)}.ath-popover__panel--pad-none{padding:0}.ath-popover__panel[data-placement=top]{animation-name:ath-popover-in-up}.ath-popover__arrow{position:absolute;top:-6px;width:10px;height:10px;background:var(--surface-raised);border-top:1px solid var(--border-raised);border-left:1px solid var(--border-raised);transform:translate(-50%) rotate(45deg);pointer-events:none}[data-placement=top]>.ath-popover__arrow{top:auto;bottom:-6px;transform:translate(-50%) rotate(225deg)}@keyframes ath-popover-in{0%{opacity:0;transform:translateY(-4px)}}@keyframes ath-popover-in-up{0%{opacity:0;transform:translateY(4px)}}\n"]
		}]
	}],
	ctorParameters: () => [],
	propDecorators: {
		open: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "open",
				required: false
			}]
		}, {
			type: i0.Output,
			args: ["openChange"]
		}],
		anchor: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "anchor",
				required: false
			}]
		}],
		size: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "size",
				required: false
			}]
		}],
		padding: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "padding",
				required: false
			}]
		}],
		align: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "align",
				required: false
			}]
		}],
		side: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "side",
				required: false
			}]
		}],
		offset: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "offset",
				required: false
			}]
		}],
		matchWidth: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "matchWidth",
				required: false
			}]
		}],
		maxHeight: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "maxHeight",
				required: false
			}]
		}],
		arrow: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "arrow",
				required: false
			}]
		}],
		trapFocus: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "trapFocus",
				required: false
			}]
		}],
		autoFocus: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "autoFocus",
				required: false
			}]
		}],
		restoreFocus: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "restoreFocus",
				required: false
			}]
		}],
		closeOnEscape: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "closeOnEscape",
				required: false
			}]
		}],
		closeOnOutsideClick: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "closeOnOutsideClick",
				required: false
			}]
		}],
		panelRole: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "panelRole",
				required: false
			}]
		}],
		ariaLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "ariaLabel",
				required: false
			}]
		}],
		ariaLabelledby: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "ariaLabelledby",
				required: false
			}]
		}],
		panelClass: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "panelClass",
				required: false
			}]
		}],
		opened: [{
			type: i0.Output,
			args: ["opened"]
		}],
		closed: [{
			type: i0.Output,
			args: ["closed"]
		}],
		panelId: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "panelId",
				required: false
			}]
		}],
		lazyContent: [{
			type: i0.ContentChild,
			args: [i0.forwardRef(() => AthPopoverContentDirective), {
				descendants: false,
				isSignal: true
			}]
		}],
		panelRef: [{
			type: i0.ViewChild,
			args: ["panel", { isSignal: true }]
		}]
	}
});
function isTypeaheadKey(event) {
	return event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;
}
var Typeahead = class {
	constructor(delay = 500) {
		this.delay = delay;
		this.buffer = "";
		this.last = 0;
	}
	next(char, labels, from) {
		const now = Date.now();
		if (now - this.last > this.delay) this.buffer = "";
		this.last = now;
		const c = char.toLocaleLowerCase();
		const cycling = this.buffer.length > 0 && [...this.buffer].every((x) => x === c);
		this.buffer += c;
		const prefix = cycling ? c : this.buffer;
		const n = labels.length;
		const start = cycling || this.buffer.length === 1 ? from + 1 : from;
		for (let k = 0; k < n; k++) {
			const i = ((start + k) % n + n) % n;
			if (labels[i].trim().toLocaleLowerCase().startsWith(prefix)) return i;
		}
		return -1;
	}
	reset() {
		this.buffer = "";
	}
};
function stepIndex(count, from, step, usable, wrap) {
	for (let k = 1; k <= count; k++) {
		let i = from + step * k;
		if (wrap) i = (i % count + count) % count;
		else if (i < 0 || i >= count) break;
		if (usable(i)) return i;
	}
	return from;
}
function edgeIndex(count, usable, last = false) {
	for (let k = 0; k < count; k++) {
		const i = last ? count - 1 - k : k;
		if (usable(i)) return i;
	}
	return -1;
}
const ATH_MENU_PARENT = new InjectionToken("ATH_MENU_PARENT");
let nextReasonId = 0;
var AthMenuItemComponent = class AthMenuItemComponent {
	constructor() {
		this.menu = inject(ATH_MENU_PARENT, { optional: true });
		this.element = inject(ElementRef).nativeElement;
		this.isButton = this.element.tagName === "BUTTON";
		this.checkIcon = Check;
		this.reasonId = `ath-menu-item-reason-${++nextReasonId}`;
		this.icon = input(null, ...ngDevMode ? [{ debugName: "icon" }] : /* istanbul ignore next */ []);
		this.shortcut = input(null, ...ngDevMode ? [{ debugName: "shortcut" }] : /* istanbul ignore next */ []);
		this.keyshortcuts = input(null, ...ngDevMode ? [{ debugName: "keyshortcuts" }] : /* istanbul ignore next */ []);
		this.variant = input("default", ...ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []);
		this.disabled = input(false, {
			...ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.disabledReason = input(null, ...ngDevMode ? [{ debugName: "disabledReason" }] : /* istanbul ignore next */ []);
		this.tooltip = input(null, ...ngDevMode ? [{ debugName: "tooltip" }] : /* istanbul ignore next */ []);
		this.checked = input(null, ...ngDevMode ? [{ debugName: "checked" }] : /* istanbul ignore next */ []);
		this.selected = input(null, ...ngDevMode ? [{ debugName: "selected" }] : /* istanbul ignore next */ []);
		this.keepOpen = input(false, {
			...ngDevMode ? { debugName: "keepOpen" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.triggered = output();
		this.role = computed(() => this.checked() !== null ? "menuitemcheckbox" : this.selected() !== null ? "menuitemradio" : "menuitem", ...ngDevMode ? [{ debugName: "role" }] : /* istanbul ignore next */ []);
	}
	label() {
		return (this.element.querySelector(".ath-menu-item__label")?.textContent ?? "").trim();
	}
	focus() {
		focusSafely(this.element);
	}
	onClick(event) {
		if (this.disabled()) {
			event.preventDefault();
			return;
		}
		this.triggered.emit();
		this.menu?.itemActivated(this);
	}
	onKeydown(event) {
		const isLink = this.element.tagName === "A";
		if (event.key === " " && !this.isButton || event.key === "Enter" && !this.isButton && !isLink) {
			event.preventDefault();
			this.element.click();
		}
	}
	onHover() {
		if (this.menu?.isOpen()) this.focus();
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthMenuItemComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthMenuItemComponent,
			isStandalone: true,
			selector: "ath-menu-item, button[athMenuItem], a[athMenuItem]",
			inputs: {
				icon: {
					classPropertyName: "icon",
					publicName: "icon",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				shortcut: {
					classPropertyName: "shortcut",
					publicName: "shortcut",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				keyshortcuts: {
					classPropertyName: "keyshortcuts",
					publicName: "keyshortcuts",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				variant: {
					classPropertyName: "variant",
					publicName: "variant",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				disabled: {
					classPropertyName: "disabled",
					publicName: "disabled",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				disabledReason: {
					classPropertyName: "disabledReason",
					publicName: "disabledReason",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				tooltip: {
					classPropertyName: "tooltip",
					publicName: "tooltip",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				checked: {
					classPropertyName: "checked",
					publicName: "checked",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				selected: {
					classPropertyName: "selected",
					publicName: "selected",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				keepOpen: {
					classPropertyName: "keepOpen",
					publicName: "keepOpen",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			outputs: { triggered: "triggered" },
			host: {
				attributes: { "tabindex": "-1" },
				listeners: {
					"click": "onClick($event)",
					"keydown": "onKeydown($event)",
					"mouseenter": "onHover()"
				},
				properties: {
					"attr.disabled": "null",
					"attr.type": "isButton ? 'button' : null",
					"attr.role": "role()",
					"attr.aria-checked": "checked() ?? selected()",
					"attr.aria-disabled": "disabled() || null",
					"attr.aria-describedby": "disabled() && disabledReason() ? reasonId : null",
					"attr.aria-keyshortcuts": "keyshortcuts()",
					"attr.title": "(disabled() && disabledReason()) || tooltip() || null",
					"class.ath-menu-item--danger": "variant() === 'danger'",
					"class.ath-menu-item--disabled": "disabled()"
				},
				classAttribute: "ath-menu-item"
			},
			exportAs: ["athMenuItem"],
			ngImport: i0,
			template: `
    @if (icon(); as img) {
      <ath-icon class="ath-menu-item__icon" [img]="img" [size]="16" aria-hidden="true" />
    } @else if (checked() !== null) {
      <span class="ath-menu-item__icon" aria-hidden="true">
        @if (checked()) {
          <ath-icon [img]="checkIcon" [size]="16" />
        }
      </span>
    }
    <span class="ath-menu-item__label"><ng-content /></span>
    @if (selected()) {
      <ath-icon class="ath-menu-item__current" [img]="checkIcon" [size]="16" aria-hidden="true" />
    }
    @if (shortcut()) {
      <kbd class="ath-menu-item__shortcut" aria-hidden="true">{{ shortcut() }}</kbd>
    }
    @if (disabled() && disabledReason()) {
      <span class="ath-menu-item__reason" [id]="reasonId" aria-hidden="true">{{
        disabledReason()
      }}</span>
    }
  `,
			isInline: true,
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host(.ath-menu-item){box-sizing:border-box;display:flex;align-items:center;gap:var(--space-2);width:100%;min-height:var(--space-8);margin:0;padding:var(--space-1) var(--space-2);font:inherit;font-size:var(--text-base);color:var(--fg-2);text-align:start;text-decoration:none;background:none;border:0;border-radius:var(--r-sm);cursor:pointer;-webkit-user-select:none;user-select:none;transition:background-color var(--t-fast)}:host(.ath-menu-item:hover),:host(.ath-menu-item:focus){color:var(--fg);background:var(--menu-item-hover);outline:none}:host(.ath-menu-item:focus-visible){outline:none;box-shadow:inset 0 0 0 2px var(--focus-ring-color)}:host(.ath-menu-item--danger){color:var(--red-text)}:host(.ath-menu-item--danger:hover),:host(.ath-menu-item--danger:focus){color:var(--red-text);background:var(--red-tint)}:host(.ath-menu-item--disabled){color:var(--fg-4);cursor:not-allowed}:host(.ath-menu-item--disabled:hover),:host(.ath-menu-item--disabled:focus){color:var(--fg-4);background:var(--hover)}.ath-menu-item__icon{display:inline-flex;flex-shrink:0;width:16px;color:inherit}.ath-menu-item__label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ath-menu-item__current{flex-shrink:0;margin-inline-start:var(--space-3);color:var(--accent-text)}.ath-menu-item__shortcut{flex-shrink:0;margin-inline-start:var(--space-4);font-family:var(--font-sans);font-size:var(--text-xs);color:var(--fg-4)}.ath-menu-item__reason{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}:host(.ath-menu-separator){display:block;height:1px;margin:var(--space-1) calc(var(--space-1) * -1);background:var(--border-raised)}\n"],
			dependencies: [{
				kind: "component",
				type: AthIconComponent,
				selector: "ath-icon",
				inputs: [
					"img",
					"size",
					"strokeWidth",
					"color",
					"absoluteStrokeWidth",
					"class"
				]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthMenuItemComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-menu-item, button[athMenuItem], a[athMenuItem]",
			imports: [AthIconComponent],
			changeDetection: ChangeDetectionStrategy.OnPush,
			exportAs: "athMenuItem",
			template: `
    @if (icon(); as img) {
      <ath-icon class="ath-menu-item__icon" [img]="img" [size]="16" aria-hidden="true" />
    } @else if (checked() !== null) {
      <span class="ath-menu-item__icon" aria-hidden="true">
        @if (checked()) {
          <ath-icon [img]="checkIcon" [size]="16" />
        }
      </span>
    }
    <span class="ath-menu-item__label"><ng-content /></span>
    @if (selected()) {
      <ath-icon class="ath-menu-item__current" [img]="checkIcon" [size]="16" aria-hidden="true" />
    }
    @if (shortcut()) {
      <kbd class="ath-menu-item__shortcut" aria-hidden="true">{{ shortcut() }}</kbd>
    }
    @if (disabled() && disabledReason()) {
      <span class="ath-menu-item__reason" [id]="reasonId" aria-hidden="true">{{
        disabledReason()
      }}</span>
    }
  `,
			host: {
				class: "ath-menu-item",
				tabindex: "-1",
				"[attr.disabled]": "null",
				"[attr.type]": "isButton ? 'button' : null",
				"[attr.role]": "role()",
				"[attr.aria-checked]": "checked() ?? selected()",
				"[attr.aria-disabled]": "disabled() || null",
				"[attr.aria-describedby]": "disabled() && disabledReason() ? reasonId : null",
				"[attr.aria-keyshortcuts]": "keyshortcuts()",
				"[attr.title]": "(disabled() && disabledReason()) || tooltip() || null",
				"[class.ath-menu-item--danger]": "variant() === 'danger'",
				"[class.ath-menu-item--disabled]": "disabled()",
				"(click)": "onClick($event)",
				"(keydown)": "onKeydown($event)",
				"(mouseenter)": "onHover()"
			},
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host(.ath-menu-item){box-sizing:border-box;display:flex;align-items:center;gap:var(--space-2);width:100%;min-height:var(--space-8);margin:0;padding:var(--space-1) var(--space-2);font:inherit;font-size:var(--text-base);color:var(--fg-2);text-align:start;text-decoration:none;background:none;border:0;border-radius:var(--r-sm);cursor:pointer;-webkit-user-select:none;user-select:none;transition:background-color var(--t-fast)}:host(.ath-menu-item:hover),:host(.ath-menu-item:focus){color:var(--fg);background:var(--menu-item-hover);outline:none}:host(.ath-menu-item:focus-visible){outline:none;box-shadow:inset 0 0 0 2px var(--focus-ring-color)}:host(.ath-menu-item--danger){color:var(--red-text)}:host(.ath-menu-item--danger:hover),:host(.ath-menu-item--danger:focus){color:var(--red-text);background:var(--red-tint)}:host(.ath-menu-item--disabled){color:var(--fg-4);cursor:not-allowed}:host(.ath-menu-item--disabled:hover),:host(.ath-menu-item--disabled:focus){color:var(--fg-4);background:var(--hover)}.ath-menu-item__icon{display:inline-flex;flex-shrink:0;width:16px;color:inherit}.ath-menu-item__label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ath-menu-item__current{flex-shrink:0;margin-inline-start:var(--space-3);color:var(--accent-text)}.ath-menu-item__shortcut{flex-shrink:0;margin-inline-start:var(--space-4);font-family:var(--font-sans);font-size:var(--text-xs);color:var(--fg-4)}.ath-menu-item__reason{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}:host(.ath-menu-separator){display:block;height:1px;margin:var(--space-1) calc(var(--space-1) * -1);background:var(--border-raised)}\n"]
		}]
	}],
	propDecorators: {
		icon: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "icon",
				required: false
			}]
		}],
		shortcut: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "shortcut",
				required: false
			}]
		}],
		keyshortcuts: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "keyshortcuts",
				required: false
			}]
		}],
		variant: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "variant",
				required: false
			}]
		}],
		disabled: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "disabled",
				required: false
			}]
		}],
		disabledReason: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "disabledReason",
				required: false
			}]
		}],
		tooltip: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "tooltip",
				required: false
			}]
		}],
		checked: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "checked",
				required: false
			}]
		}],
		selected: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "selected",
				required: false
			}]
		}],
		keepOpen: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "keepOpen",
				required: false
			}]
		}],
		triggered: [{
			type: i0.Output,
			args: ["triggered"]
		}]
	}
});
var AthMenuSeparatorComponent = class AthMenuSeparatorComponent {
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthMenuSeparatorComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "14.0.0",
			version: "22.2.2",
			type: AthMenuSeparatorComponent,
			isStandalone: true,
			selector: "ath-menu-separator",
			host: {
				attributes: { "role": "separator" },
				classAttribute: "ath-menu-separator"
			},
			ngImport: i0,
			template: "",
			isInline: true,
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host(.ath-menu-item){box-sizing:border-box;display:flex;align-items:center;gap:var(--space-2);width:100%;min-height:var(--space-8);margin:0;padding:var(--space-1) var(--space-2);font:inherit;font-size:var(--text-base);color:var(--fg-2);text-align:start;text-decoration:none;background:none;border:0;border-radius:var(--r-sm);cursor:pointer;-webkit-user-select:none;user-select:none;transition:background-color var(--t-fast)}:host(.ath-menu-item:hover),:host(.ath-menu-item:focus){color:var(--fg);background:var(--menu-item-hover);outline:none}:host(.ath-menu-item:focus-visible){outline:none;box-shadow:inset 0 0 0 2px var(--focus-ring-color)}:host(.ath-menu-item--danger){color:var(--red-text)}:host(.ath-menu-item--danger:hover),:host(.ath-menu-item--danger:focus){color:var(--red-text);background:var(--red-tint)}:host(.ath-menu-item--disabled){color:var(--fg-4);cursor:not-allowed}:host(.ath-menu-item--disabled:hover),:host(.ath-menu-item--disabled:focus){color:var(--fg-4);background:var(--hover)}.ath-menu-item__icon{display:inline-flex;flex-shrink:0;width:16px;color:inherit}.ath-menu-item__label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ath-menu-item__current{flex-shrink:0;margin-inline-start:var(--space-3);color:var(--accent-text)}.ath-menu-item__shortcut{flex-shrink:0;margin-inline-start:var(--space-4);font-family:var(--font-sans);font-size:var(--text-xs);color:var(--fg-4)}.ath-menu-item__reason{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}:host(.ath-menu-separator){display:block;height:1px;margin:var(--space-1) calc(var(--space-1) * -1);background:var(--border-raised)}\n"],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthMenuSeparatorComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-menu-separator",
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: "",
			host: {
				class: "ath-menu-separator",
				role: "separator"
			},
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host(.ath-menu-item){box-sizing:border-box;display:flex;align-items:center;gap:var(--space-2);width:100%;min-height:var(--space-8);margin:0;padding:var(--space-1) var(--space-2);font:inherit;font-size:var(--text-base);color:var(--fg-2);text-align:start;text-decoration:none;background:none;border:0;border-radius:var(--r-sm);cursor:pointer;-webkit-user-select:none;user-select:none;transition:background-color var(--t-fast)}:host(.ath-menu-item:hover),:host(.ath-menu-item:focus){color:var(--fg);background:var(--menu-item-hover);outline:none}:host(.ath-menu-item:focus-visible){outline:none;box-shadow:inset 0 0 0 2px var(--focus-ring-color)}:host(.ath-menu-item--danger){color:var(--red-text)}:host(.ath-menu-item--danger:hover),:host(.ath-menu-item--danger:focus){color:var(--red-text);background:var(--red-tint)}:host(.ath-menu-item--disabled){color:var(--fg-4);cursor:not-allowed}:host(.ath-menu-item--disabled:hover),:host(.ath-menu-item--disabled:focus){color:var(--fg-4);background:var(--hover)}.ath-menu-item__icon{display:inline-flex;flex-shrink:0;width:16px;color:inherit}.ath-menu-item__label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ath-menu-item__current{flex-shrink:0;margin-inline-start:var(--space-3);color:var(--accent-text)}.ath-menu-item__shortcut{flex-shrink:0;margin-inline-start:var(--space-4);font-family:var(--font-sans);font-size:var(--text-xs);color:var(--fg-4)}.ath-menu-item__reason{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}:host(.ath-menu-separator){display:block;height:1px;margin:var(--space-1) calc(var(--space-1) * -1);background:var(--border-raised)}\n"]
		}]
	}]
});
let nextMenuId = 0;
var AthMenuComponent = class AthMenuComponent {
	constructor() {
		this.open = model(false, ...ngDevMode ? [{ debugName: "open" }] : /* istanbul ignore next */ []);
		this.anchor = input(null, ...ngDevMode ? [{ debugName: "anchor" }] : /* istanbul ignore next */ []);
		this.align = input("start", ...ngDevMode ? [{ debugName: "align" }] : /* istanbul ignore next */ []);
		this.side = input("bottom", ...ngDevMode ? [{ debugName: "side" }] : /* istanbul ignore next */ []);
		this.maxHeight = input(null, ...ngDevMode ? [{ debugName: "maxHeight" }] : /* istanbul ignore next */ []);
		this.ariaLabel = input(null, ...ngDevMode ? [{ debugName: "ariaLabel" }] : /* istanbul ignore next */ []);
		this.panelClass = input("", ...ngDevMode ? [{ debugName: "panelClass" }] : /* istanbul ignore next */ []);
		this.opened = output();
		this.closed = output();
		this.panelId = `ath-menu-${++nextMenuId}`;
		this.labelledBy = signal(null, ...ngDevMode ? [{ debugName: "labelledBy" }] : /* istanbul ignore next */ []);
		this.popover = viewChild.required(AthPopoverComponent, ...ngDevMode ? [{ debugName: "popover" }] : /* istanbul ignore next */ []);
		this.lazyContent = contentChild(AthPopoverContentDirective, {
			...ngDevMode ? { debugName: "lazyContent" } : /* istanbul ignore next */ {},
			descendants: false
		});
		this.items = contentChildren(AthMenuItemComponent, {
			...ngDevMode ? { debugName: "items" } : /* istanbul ignore next */ {},
			descendants: true
		});
		this.typeahead = new Typeahead();
		this.pendingFocus = "first";
	}
	isOpen() {
		return this.open();
	}
	show(anchor, focus = "first") {
		this.pendingFocus = focus;
		if (this.open()) {
			this.focusEdge(focus);
			return;
		}
		this.popover().show(resolveAnchor(anchor));
	}
	hide(restoreFocus = true) {
		this.popover().hide("programmatic", restoreFocus);
	}
	toggle(anchor, focus = "first") {
		if (this.open()) this.hide();
		else this.show(anchor, focus);
	}
	labelFrom(triggerId) {
		this.labelledBy.set(triggerId);
	}
	itemActivated(item) {
		if (!item.keepOpen()) this.popover().hide("select", true);
	}
	onOpened() {
		this.typeahead.reset();
		this.opened.emit();
		const focus = this.pendingFocus;
		this.pendingFocus = "first";
		this.popover().whenPanelReady(() => this.focusEdge(focus));
	}
	onKeydown(event) {
		if (!this.open()) return;
		const items = this.items();
		const count = items.length;
		if (count === 0) return;
		const active = items.findIndex((i) => i.element === document.activeElement);
		const any = () => true;
		let next = -1;
		switch (event.key) {
			case "ArrowDown":
				next = active < 0 ? 0 : stepIndex(count, active, 1, any, true);
				break;
			case "ArrowUp":
				next = active < 0 ? count - 1 : stepIndex(count, active, -1, any, true);
				break;
			case "Home":
			case "PageUp":
				next = 0;
				break;
			case "End":
			case "PageDown":
				next = count - 1;
				break;
			case "Tab":
				this.popover().hide("tab", true);
				return;
			default: if (isTypeaheadKey(event) && event.key !== " ") {
				next = this.typeahead.next(event.key, items.map((i) => i.label()), Math.max(active, 0));
				if (next < 0) return;
			} else return;
		}
		event.preventDefault();
		items[next]?.focus();
	}
	focusEdge(focus) {
		if (focus === "none" || !this.open()) return;
		const items = this.items();
		const enabled = (i) => !items[i].disabled();
		const current = items.findIndex((item, i) => item.selected() === true && enabled(i));
		let index = focus === "first" && current >= 0 ? current : edgeIndex(items.length, enabled, focus === "last");
		if (index < 0) index = focus === "last" ? items.length - 1 : 0;
		if (items[index]) items[index].focus();
		else this.popover().focusPanel("panel");
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthMenuComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthMenuComponent,
			isStandalone: true,
			selector: "ath-menu",
			inputs: {
				open: {
					classPropertyName: "open",
					publicName: "open",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				anchor: {
					classPropertyName: "anchor",
					publicName: "anchor",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				align: {
					classPropertyName: "align",
					publicName: "align",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				side: {
					classPropertyName: "side",
					publicName: "side",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				maxHeight: {
					classPropertyName: "maxHeight",
					publicName: "maxHeight",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				ariaLabel: {
					classPropertyName: "ariaLabel",
					publicName: "ariaLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				panelClass: {
					classPropertyName: "panelClass",
					publicName: "panelClass",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			outputs: {
				open: "openChange",
				opened: "opened",
				closed: "closed"
			},
			host: { listeners: { "keydown": "onKeydown($event)" } },
			providers: [{
				provide: ATH_MENU_PARENT,
				useExisting: forwardRef(() => AthMenuComponent)
			}],
			queries: [{
				propertyName: "lazyContent",
				first: true,
				predicate: AthPopoverContentDirective,
				isSignal: true
			}, {
				propertyName: "items",
				predicate: AthMenuItemComponent,
				descendants: true,
				isSignal: true
			}],
			viewQueries: [{
				propertyName: "popover",
				first: true,
				predicate: AthPopoverComponent,
				descendants: true,
				isSignal: true
			}],
			exportAs: ["athMenu"],
			ngImport: i0,
			template: `
    <ath-popover
      [open]="open()"
      (openChange)="open.set($event)"
      [anchor]="anchor()"
      [panelId]="panelId"
      size="auto"
      padding="sm"
      panelRole="menu"
      autoFocus="none"
      [align]="align()"
      [side]="side()"
      [maxHeight]="maxHeight()"
      [ariaLabel]="ariaLabel()"
      [ariaLabelledby]="ariaLabel() ? null : labelledBy()"
      [panelClass]="panelClass()"
      (opened)="onOpened()"
      (closed)="closed.emit($event)"
    >
      @if (lazyContent(); as lazy) {
        @if (open()) {
          <ng-container [ngTemplateOutlet]="lazy.template" />
        }
      } @else {
        <ng-content />
      }
    </ath-popover>
  `,
			isInline: true,
			styles: [":host{display:contents}\n"],
			dependencies: [{
				kind: "component",
				type: AthPopoverComponent,
				selector: "ath-popover",
				inputs: [
					"open",
					"anchor",
					"size",
					"padding",
					"align",
					"side",
					"offset",
					"matchWidth",
					"maxHeight",
					"arrow",
					"trapFocus",
					"autoFocus",
					"restoreFocus",
					"closeOnEscape",
					"closeOnOutsideClick",
					"panelRole",
					"ariaLabel",
					"ariaLabelledby",
					"panelClass",
					"panelId"
				],
				outputs: [
					"openChange",
					"opened",
					"closed"
				],
				exportAs: ["athPopover"]
			}, {
				kind: "directive",
				type: NgTemplateOutlet,
				selector: "[ngTemplateOutlet]",
				inputs: [
					"ngTemplateOutletContext",
					"ngTemplateOutlet",
					"ngTemplateOutletInjector"
				]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthMenuComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-menu",
			imports: [AthPopoverComponent, NgTemplateOutlet],
			changeDetection: ChangeDetectionStrategy.OnPush,
			exportAs: "athMenu",
			providers: [{
				provide: ATH_MENU_PARENT,
				useExisting: forwardRef(() => AthMenuComponent)
			}],
			template: `
    <ath-popover
      [open]="open()"
      (openChange)="open.set($event)"
      [anchor]="anchor()"
      [panelId]="panelId"
      size="auto"
      padding="sm"
      panelRole="menu"
      autoFocus="none"
      [align]="align()"
      [side]="side()"
      [maxHeight]="maxHeight()"
      [ariaLabel]="ariaLabel()"
      [ariaLabelledby]="ariaLabel() ? null : labelledBy()"
      [panelClass]="panelClass()"
      (opened)="onOpened()"
      (closed)="closed.emit($event)"
    >
      @if (lazyContent(); as lazy) {
        @if (open()) {
          <ng-container [ngTemplateOutlet]="lazy.template" />
        }
      } @else {
        <ng-content />
      }
    </ath-popover>
  `,
			host: { "(keydown)": "onKeydown($event)" },
			styles: [":host{display:contents}\n"]
		}]
	}],
	propDecorators: {
		open: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "open",
				required: false
			}]
		}, {
			type: i0.Output,
			args: ["openChange"]
		}],
		anchor: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "anchor",
				required: false
			}]
		}],
		align: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "align",
				required: false
			}]
		}],
		side: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "side",
				required: false
			}]
		}],
		maxHeight: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "maxHeight",
				required: false
			}]
		}],
		ariaLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "ariaLabel",
				required: false
			}]
		}],
		panelClass: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "panelClass",
				required: false
			}]
		}],
		opened: [{
			type: i0.Output,
			args: ["opened"]
		}],
		closed: [{
			type: i0.Output,
			args: ["closed"]
		}],
		popover: [{
			type: i0.ViewChild,
			args: [i0.forwardRef(() => AthPopoverComponent), { isSignal: true }]
		}],
		lazyContent: [{
			type: i0.ContentChild,
			args: [i0.forwardRef(() => AthPopoverContentDirective), {
				descendants: false,
				isSignal: true
			}]
		}],
		items: [{
			type: i0.ContentChildren,
			args: [i0.forwardRef(() => AthMenuItemComponent), {
				descendants: true,
				isSignal: true
			}]
		}]
	}
});
const DROPDOWN_SEPARATOR = Object.freeze({ separator: true });
function isDropdownSeparator(item) {
	return "separator" in item && item.separator === true;
}
var AthDropdownHeaderDirective = class AthDropdownHeaderDirective {
	constructor() {
		this.template = inject(TemplateRef);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthDropdownHeaderDirective,
			deps: [],
			target: i0.ɵɵFactoryTarget.Directive
		});
	}
	static {
		this.ɵdir = i0.ɵɵngDeclareDirective({
			minVersion: "14.0.0",
			version: "22.2.2",
			type: AthDropdownHeaderDirective,
			isStandalone: true,
			selector: "ng-template[athDropdownHeader]",
			ngImport: i0
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthDropdownHeaderDirective,
	decorators: [{
		type: Directive,
		args: [{ selector: "ng-template[athDropdownHeader]" }]
	}]
});
const ALIGN = {
	left: "start",
	right: "end",
	auto: "auto"
};
const CONTROL = "button, a[href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])";
var AthDropdownComponent = class AthDropdownComponent {
	selectedOf(item) {
		const active = this.activeId();
		return active === null || active === void 0 ? null : item.id === active;
	}
	constructor() {
		this.items = input([], ...ngDevMode ? [{ debugName: "items" }] : /* istanbul ignore next */ []);
		this.activeId = input(null, ...ngDevMode ? [{ debugName: "activeId" }] : /* istanbul ignore next */ []);
		this.header = contentChild(AthDropdownHeaderDirective, ...ngDevMode ? [{ debugName: "header" }] : /* istanbul ignore next */ []);
		this.entries = computed(() => this.items().map((item, i) => isDropdownSeparator(item) ? {
			key: `separator-${i}`,
			action: null
		} : {
			key: item.id,
			action: item
		}), ...ngDevMode ? [{ debugName: "entries" }] : /* istanbul ignore next */ []);
		this.align = input("auto", ...ngDevMode ? [{ debugName: "align" }] : /* istanbul ignore next */ []);
		this.itemClicked = output();
		this.openChange = output();
		this.menuAlign = () => ALIGN[this.align()];
		this.menu = viewChild.required(AthMenuComponent, ...ngDevMode ? [{ debugName: "menu" }] : /* istanbul ignore next */ []);
		this.triggerRef = viewChild.required("trigger", ...ngDevMode ? [{ debugName: "triggerRef" }] : /* istanbul ignore next */ []);
		this.menuQuery = viewChild(AthMenuComponent, ...ngDevMode ? [{ debugName: "menuQuery" }] : /* istanbul ignore next */ []);
		this.viewReady = false;
		effect(() => {
			const open = this.menuQuery()?.open() ?? false;
			if (this.viewReady) this.syncAria(open);
		});
	}
	ngAfterViewInit() {
		this.viewReady = true;
		this.syncAria(this.menu().open());
	}
	toggle() {
		this.menu().toggle(this.triggerRef().nativeElement, "first");
	}
	selectItem(item) {
		if (item.disabled) return;
		this.itemClicked.emit(item.id);
		this.menu().hide();
	}
	onOpenChange(open) {
		this.openChange.emit(open);
	}
	onHostClick(event) {
		if (this.inTrigger(event)) this.toggle();
	}
	onHostKeydown(event) {
		if (!this.inTrigger(event)) return;
		const wrapperIsControl = this.control() === this.triggerRef().nativeElement;
		const key = event.key;
		if (key === "ArrowDown" || key === "ArrowUp") {
			event.preventDefault();
			this.menu().show(this.triggerRef().nativeElement, key === "ArrowUp" ? "last" : "first");
		} else if (wrapperIsControl && (key === "Enter" || key === " ")) {
			event.preventDefault();
			this.toggle();
		}
	}
	control() {
		const wrapper = this.triggerRef().nativeElement;
		return wrapper.querySelector(CONTROL) ?? wrapper;
	}
	inTrigger(event) {
		return event.target instanceof Node && this.triggerRef().nativeElement.contains(event.target);
	}
	syncAria(open) {
		const wrapper = this.triggerRef().nativeElement;
		const control = this.control();
		if (control === wrapper) {
			wrapper.setAttribute("role", "button");
			wrapper.tabIndex = 0;
		} else {
			wrapper.removeAttribute("role");
			wrapper.removeAttribute("tabindex");
		}
		control.setAttribute("aria-haspopup", "menu");
		control.setAttribute("aria-expanded", String(open));
		if (open) control.setAttribute("aria-controls", this.menu().panelId);
		else control.removeAttribute("aria-controls");
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthDropdownComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthDropdownComponent,
			isStandalone: true,
			selector: "ath-dropdown",
			inputs: {
				items: {
					classPropertyName: "items",
					publicName: "items",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				activeId: {
					classPropertyName: "activeId",
					publicName: "activeId",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				align: {
					classPropertyName: "align",
					publicName: "align",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			outputs: {
				itemClicked: "itemClicked",
				openChange: "openChange"
			},
			host: { listeners: {
				"click": "onHostClick($event)",
				"keydown": "onHostKeydown($event)"
			} },
			queries: [{
				propertyName: "header",
				first: true,
				predicate: AthDropdownHeaderDirective,
				descendants: true,
				isSignal: true
			}],
			viewQueries: [
				{
					propertyName: "menu",
					first: true,
					predicate: AthMenuComponent,
					descendants: true,
					isSignal: true
				},
				{
					propertyName: "triggerRef",
					first: true,
					predicate: ["trigger"],
					descendants: true,
					isSignal: true
				},
				{
					propertyName: "menuQuery",
					first: true,
					predicate: AthMenuComponent,
					descendants: true,
					isSignal: true
				}
			],
			ngImport: i0,
			template: "<span #trigger class=\"ath-dropdown__trigger\">\n  <ng-content />\n</span>\n\n<!-- ath-dropdown__menu: app code checks for an open dropdown by this class. -->\n<ath-menu\n  panelClass=\"ath-dropdown__menu\"\n  [anchor]=\"trigger\"\n  [align]=\"menuAlign()\"\n  (openChange)=\"onOpenChange($event)\"\n>\n  <!-- Built only while open: a closed row menu holds no items. -->\n  <ng-template athPopoverContent>\n    @if (header(); as h) {\n      <div class=\"ath-dropdown__header\" role=\"none\">\n        <ng-container [ngTemplateOutlet]=\"h.template\" />\n      </div>\n      <ath-menu-separator />\n    }\n    @for (entry of entries(); track entry.key) {\n      @if (entry.action; as item) {\n        <button\n          athMenuItem\n          role=\"menuitem\"\n          class=\"ath-dropdown__item\"\n          [class.ath-dropdown__item--danger]=\"item.variant === 'danger'\"\n          [icon]=\"item.icon\"\n          [variant]=\"item.variant ?? 'default'\"\n          [disabled]=\"!!item.disabled\"\n          [disabledReason]=\"item.title\"\n          [tooltip]=\"item.title\"\n          [shortcut]=\"item.shortcut ?? null\"\n          [selected]=\"selectedOf(item)\"\n          (triggered)=\"itemClicked.emit(item.id)\"\n        >\n          {{ item.label }}\n        </button>\n      } @else {\n        <ath-menu-separator />\n      }\n    }\n  </ng-template>\n</ath-menu>\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:inline-flex}.ath-dropdown__trigger{display:inline-flex;cursor:pointer}.ath-dropdown__trigger[role=button]:focus-visible{border-radius:var(--r-sm);outline:none;box-shadow:var(--focus-ring-shadow)}.ath-dropdown__header{padding:var(--space-2) var(--space-2) var(--space-1);color:var(--fg);font-size:var(--text-sm)}\n"],
			dependencies: [
				{
					kind: "directive",
					type: NgTemplateOutlet,
					selector: "[ngTemplateOutlet]",
					inputs: [
						"ngTemplateOutletContext",
						"ngTemplateOutlet",
						"ngTemplateOutletInjector"
					]
				},
				{
					kind: "component",
					type: AthMenuComponent,
					selector: "ath-menu",
					inputs: [
						"open",
						"anchor",
						"align",
						"side",
						"maxHeight",
						"ariaLabel",
						"panelClass"
					],
					outputs: [
						"openChange",
						"opened",
						"closed"
					],
					exportAs: ["athMenu"]
				},
				{
					kind: "component",
					type: AthMenuItemComponent,
					selector: "ath-menu-item, button[athMenuItem], a[athMenuItem]",
					inputs: [
						"icon",
						"shortcut",
						"keyshortcuts",
						"variant",
						"disabled",
						"disabledReason",
						"tooltip",
						"checked",
						"selected",
						"keepOpen"
					],
					outputs: ["triggered"],
					exportAs: ["athMenuItem"]
				},
				{
					kind: "component",
					type: AthMenuSeparatorComponent,
					selector: "ath-menu-separator"
				},
				{
					kind: "directive",
					type: AthPopoverContentDirective,
					selector: "ng-template[athPopoverContent]"
				}
			],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthDropdownComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-dropdown",
			imports: [
				NgTemplateOutlet,
				AthMenuComponent,
				AthMenuItemComponent,
				AthMenuSeparatorComponent,
				AthPopoverContentDirective
			],
			changeDetection: ChangeDetectionStrategy.OnPush,
			host: {
				"(click)": "onHostClick($event)",
				"(keydown)": "onHostKeydown($event)"
			},
			template: "<span #trigger class=\"ath-dropdown__trigger\">\n  <ng-content />\n</span>\n\n<!-- ath-dropdown__menu: app code checks for an open dropdown by this class. -->\n<ath-menu\n  panelClass=\"ath-dropdown__menu\"\n  [anchor]=\"trigger\"\n  [align]=\"menuAlign()\"\n  (openChange)=\"onOpenChange($event)\"\n>\n  <!-- Built only while open: a closed row menu holds no items. -->\n  <ng-template athPopoverContent>\n    @if (header(); as h) {\n      <div class=\"ath-dropdown__header\" role=\"none\">\n        <ng-container [ngTemplateOutlet]=\"h.template\" />\n      </div>\n      <ath-menu-separator />\n    }\n    @for (entry of entries(); track entry.key) {\n      @if (entry.action; as item) {\n        <button\n          athMenuItem\n          role=\"menuitem\"\n          class=\"ath-dropdown__item\"\n          [class.ath-dropdown__item--danger]=\"item.variant === 'danger'\"\n          [icon]=\"item.icon\"\n          [variant]=\"item.variant ?? 'default'\"\n          [disabled]=\"!!item.disabled\"\n          [disabledReason]=\"item.title\"\n          [tooltip]=\"item.title\"\n          [shortcut]=\"item.shortcut ?? null\"\n          [selected]=\"selectedOf(item)\"\n          (triggered)=\"itemClicked.emit(item.id)\"\n        >\n          {{ item.label }}\n        </button>\n      } @else {\n        <ath-menu-separator />\n      }\n    }\n  </ng-template>\n</ath-menu>\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:inline-flex}.ath-dropdown__trigger{display:inline-flex;cursor:pointer}.ath-dropdown__trigger[role=button]:focus-visible{border-radius:var(--r-sm);outline:none;box-shadow:var(--focus-ring-shadow)}.ath-dropdown__header{padding:var(--space-2) var(--space-2) var(--space-1);color:var(--fg);font-size:var(--text-sm)}\n"]
		}]
	}],
	ctorParameters: () => [],
	propDecorators: {
		items: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "items",
				required: false
			}]
		}],
		activeId: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "activeId",
				required: false
			}]
		}],
		header: [{
			type: i0.ContentChild,
			args: [i0.forwardRef(() => AthDropdownHeaderDirective), { isSignal: true }]
		}],
		align: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "align",
				required: false
			}]
		}],
		itemClicked: [{
			type: i0.Output,
			args: ["itemClicked"]
		}],
		openChange: [{
			type: i0.Output,
			args: ["openChange"]
		}],
		menu: [{
			type: i0.ViewChild,
			args: [i0.forwardRef(() => AthMenuComponent), { isSignal: true }]
		}],
		triggerRef: [{
			type: i0.ViewChild,
			args: ["trigger", { isSignal: true }]
		}],
		menuQuery: [{
			type: i0.ViewChild,
			args: [i0.forwardRef(() => AthMenuComponent), { isSignal: true }]
		}]
	}
});
const NARROW_QUERY = "(max-width: 640px)";
var AthBreadcrumbComponent = class AthBreadcrumbComponent {
	constructor() {
		this.labels = injectAthLabels();
		this.router = inject(Router);
		this.items = input([], ...ngDevMode ? [{ debugName: "items" }] : /* istanbul ignore next */ []);
		this.ariaLabel = input(null, ...ngDevMode ? [{ debugName: "ariaLabel" }] : /* istanbul ignore next */ []);
		this.maxVisible = input(4, ...ngDevMode ? [{ debugName: "maxVisible" }] : /* istanbul ignore next */ []);
		this.navLabel = computed(() => this.ariaLabel() ?? this.labels.breadcrumb(), ...ngDevMode ? [{ debugName: "navLabel" }] : /* istanbul ignore next */ []);
		this.moreLabel = computed(() => this.labels.breadcrumbMore(), ...ngDevMode ? [{ debugName: "moreLabel" }] : /* istanbul ignore next */ []);
		this.separatorIcon = ChevronRight;
		this.narrow = signal(false, ...ngDevMode ? [{ debugName: "narrow" }] : /* istanbul ignore next */ []);
		this.shown = computed(() => {
			const all = this.items();
			const lastIndex = all.length - 1;
			const asCrumb = (crumb, i) => ({
				kind: "crumb",
				crumb,
				last: i === lastIndex
			});
			if (this.narrow()) return all.slice(-2).map((c, i, arr) => asCrumb(c, i === arr.length - 1 ? lastIndex : -1));
			if (all.length <= this.maxVisible()) return all.map(asCrumb);
			const hidden = all.slice(1, -2);
			return [
				asCrumb(all[0], 0),
				{
					kind: "more",
					hidden,
					items: hidden.map((c, i) => ({
						id: String(i),
						label: c.key ? `${c.key} · ${c.label}` : c.label
					}))
				},
				asCrumb(all[lastIndex - 1], lastIndex - 1),
				asCrumb(all[lastIndex], lastIndex)
			];
		}, ...ngDevMode ? [{ debugName: "shown" }] : /* istanbul ignore next */ []);
		if (typeof window === "undefined" || !window.matchMedia) return;
		const query = window.matchMedia(NARROW_QUERY);
		this.narrow.set(query.matches);
		const onChange = (e) => this.narrow.set(e.matches);
		query.addEventListener("change", onChange);
		inject(DestroyRef).onDestroy(() => query.removeEventListener("change", onChange));
	}
	target(crumb) {
		return crumb.route ?? null;
	}
	openHidden(hidden, id) {
		const crumb = hidden[Number(id)];
		const route = crumb ? this.target(crumb) : null;
		if (route) this.router.navigate([route], { queryParams: crumb?.queryParams ?? {} });
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthBreadcrumbComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthBreadcrumbComponent,
			isStandalone: true,
			selector: "ath-breadcrumb",
			inputs: {
				items: {
					classPropertyName: "items",
					publicName: "items",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				ariaLabel: {
					classPropertyName: "ariaLabel",
					publicName: "ariaLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				maxVisible: {
					classPropertyName: "maxVisible",
					publicName: "maxVisible",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			ngImport: i0,
			template: "@if (items().length > 0) {\n  <nav class=\"ath-breadcrumb\" [attr.aria-label]=\"navLabel()\">\n    <ol class=\"ath-breadcrumb__list\">\n      @for (s of shown(); track $index; let lastItem = $last) {\n        <li class=\"ath-breadcrumb__item\">\n          @if (s.kind === 'more') {\n            <ath-dropdown\n              [items]=\"s.items\"\n              align=\"left\"\n              (itemClicked)=\"openHidden(s.hidden, $event)\"\n            >\n              <span class=\"ath-breadcrumb__more\" [attr.title]=\"moreLabel()\">…</span>\n            </ath-dropdown>\n          } @else if (s.last || !target(s.crumb)) {\n            <span\n              class=\"ath-breadcrumb__current\"\n              [class.ath-breadcrumb__current--quiet]=\"!s.last\"\n              [attr.aria-current]=\"s.last ? 'page' : null\"\n              [attr.title]=\"s.crumb.title ?? s.crumb.label\"\n            >\n              @if (s.crumb.key) {\n                <span class=\"ath-breadcrumb__key\">{{ s.crumb.key }}</span>\n              }\n              <span class=\"ath-breadcrumb__text\">{{ s.crumb.label }}</span>\n            </span>\n          } @else {\n            <a\n              class=\"ath-breadcrumb__link\"\n              [routerLink]=\"target(s.crumb)\"\n              [queryParams]=\"s.crumb.queryParams ?? null\"\n              [attr.title]=\"s.crumb.title ?? s.crumb.label\"\n            >\n              @if (s.crumb.key) {\n                <span class=\"ath-breadcrumb__key\">{{ s.crumb.key }}</span>\n              }\n              <span class=\"ath-breadcrumb__text\">{{ s.crumb.label }}</span>\n            </a>\n          }\n          @if (!lastItem) {\n            <ath-icon\n              class=\"ath-breadcrumb__separator\"\n              [img]=\"separatorIcon\"\n              [size]=\"10\"\n              aria-hidden=\"true\"\n            />\n          }\n        </li>\n      }\n    </ol>\n  </nav>\n}\n",
			styles: [".ath-breadcrumb{display:inline-flex;align-items:center;min-width:0;font-family:var(--font-sans)}.ath-breadcrumb__list{display:flex;align-items:center;gap:4px;min-width:0;margin:0;padding:0;list-style:none}.ath-breadcrumb__item{display:inline-flex;align-items:center;gap:4px;min-width:0;flex:0 1 auto}.ath-breadcrumb__item:last-child{flex-shrink:.3}.ath-breadcrumb__text{min-width:0;max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ath-breadcrumb__item:last-child .ath-breadcrumb__text{max-width:360px}.ath-breadcrumb__more{display:inline-grid;place-items:center;min-width:24px;height:22px;padding:0 4px;border-radius:var(--r-xs);color:var(--fg-3);font-size:13px;cursor:pointer}.ath-breadcrumb__more:hover{color:var(--fg);background:var(--bg-2)}.ath-breadcrumb__current--quiet{font-weight:500;color:var(--fg-3)}.ath-breadcrumb__link{display:inline-flex;align-items:center;gap:6px;min-width:0;font-size:13px;font-weight:500;color:var(--fg-3);padding:4px 6px;margin:0 -2px;border-radius:var(--r-xs);text-decoration:none;white-space:nowrap;transition:background .1s ease,color .1s ease}.ath-breadcrumb__link:hover{color:var(--fg);background:var(--bg-2)}.ath-breadcrumb__link:focus-visible{outline:none;box-shadow:0 0 0 2px var(--focus-ring-color)}.ath-breadcrumb__separator{color:var(--fg-4);flex-shrink:0}.ath-breadcrumb__current{display:inline-flex;align-items:center;gap:8px;min-width:0;font-size:13px;font-weight:600;letter-spacing:-.01em;color:var(--fg);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:0 4px}.ath-breadcrumb__key{flex-shrink:0;padding:1px 6px;border-radius:var(--r-xs);background:var(--bg-2);color:var(--fg-2);font-family:var(--font-mono);font-size:11px;font-weight:600;letter-spacing:.02em}\n"],
			dependencies: [
				{
					kind: "directive",
					type: RouterLink,
					selector: "[routerLink]",
					inputs: [
						"target",
						"queryParams",
						"fragment",
						"queryParamsHandling",
						"state",
						"info",
						"relativeTo",
						"preserveFragment",
						"skipLocationChange",
						"replaceUrl",
						"browserUrl",
						"routerLink"
					]
				},
				{
					kind: "component",
					type: AthIconComponent,
					selector: "ath-icon",
					inputs: [
						"img",
						"size",
						"strokeWidth",
						"color",
						"absoluteStrokeWidth",
						"class"
					]
				},
				{
					kind: "component",
					type: AthDropdownComponent,
					selector: "ath-dropdown",
					inputs: [
						"items",
						"activeId",
						"align"
					],
					outputs: ["itemClicked", "openChange"]
				}
			],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthBreadcrumbComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-breadcrumb",
			imports: [
				RouterLink,
				AthIconComponent,
				AthDropdownComponent
			],
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: "@if (items().length > 0) {\n  <nav class=\"ath-breadcrumb\" [attr.aria-label]=\"navLabel()\">\n    <ol class=\"ath-breadcrumb__list\">\n      @for (s of shown(); track $index; let lastItem = $last) {\n        <li class=\"ath-breadcrumb__item\">\n          @if (s.kind === 'more') {\n            <ath-dropdown\n              [items]=\"s.items\"\n              align=\"left\"\n              (itemClicked)=\"openHidden(s.hidden, $event)\"\n            >\n              <span class=\"ath-breadcrumb__more\" [attr.title]=\"moreLabel()\">…</span>\n            </ath-dropdown>\n          } @else if (s.last || !target(s.crumb)) {\n            <span\n              class=\"ath-breadcrumb__current\"\n              [class.ath-breadcrumb__current--quiet]=\"!s.last\"\n              [attr.aria-current]=\"s.last ? 'page' : null\"\n              [attr.title]=\"s.crumb.title ?? s.crumb.label\"\n            >\n              @if (s.crumb.key) {\n                <span class=\"ath-breadcrumb__key\">{{ s.crumb.key }}</span>\n              }\n              <span class=\"ath-breadcrumb__text\">{{ s.crumb.label }}</span>\n            </span>\n          } @else {\n            <a\n              class=\"ath-breadcrumb__link\"\n              [routerLink]=\"target(s.crumb)\"\n              [queryParams]=\"s.crumb.queryParams ?? null\"\n              [attr.title]=\"s.crumb.title ?? s.crumb.label\"\n            >\n              @if (s.crumb.key) {\n                <span class=\"ath-breadcrumb__key\">{{ s.crumb.key }}</span>\n              }\n              <span class=\"ath-breadcrumb__text\">{{ s.crumb.label }}</span>\n            </a>\n          }\n          @if (!lastItem) {\n            <ath-icon\n              class=\"ath-breadcrumb__separator\"\n              [img]=\"separatorIcon\"\n              [size]=\"10\"\n              aria-hidden=\"true\"\n            />\n          }\n        </li>\n      }\n    </ol>\n  </nav>\n}\n",
			styles: [".ath-breadcrumb{display:inline-flex;align-items:center;min-width:0;font-family:var(--font-sans)}.ath-breadcrumb__list{display:flex;align-items:center;gap:4px;min-width:0;margin:0;padding:0;list-style:none}.ath-breadcrumb__item{display:inline-flex;align-items:center;gap:4px;min-width:0;flex:0 1 auto}.ath-breadcrumb__item:last-child{flex-shrink:.3}.ath-breadcrumb__text{min-width:0;max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ath-breadcrumb__item:last-child .ath-breadcrumb__text{max-width:360px}.ath-breadcrumb__more{display:inline-grid;place-items:center;min-width:24px;height:22px;padding:0 4px;border-radius:var(--r-xs);color:var(--fg-3);font-size:13px;cursor:pointer}.ath-breadcrumb__more:hover{color:var(--fg);background:var(--bg-2)}.ath-breadcrumb__current--quiet{font-weight:500;color:var(--fg-3)}.ath-breadcrumb__link{display:inline-flex;align-items:center;gap:6px;min-width:0;font-size:13px;font-weight:500;color:var(--fg-3);padding:4px 6px;margin:0 -2px;border-radius:var(--r-xs);text-decoration:none;white-space:nowrap;transition:background .1s ease,color .1s ease}.ath-breadcrumb__link:hover{color:var(--fg);background:var(--bg-2)}.ath-breadcrumb__link:focus-visible{outline:none;box-shadow:0 0 0 2px var(--focus-ring-color)}.ath-breadcrumb__separator{color:var(--fg-4);flex-shrink:0}.ath-breadcrumb__current{display:inline-flex;align-items:center;gap:8px;min-width:0;font-size:13px;font-weight:600;letter-spacing:-.01em;color:var(--fg);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:0 4px}.ath-breadcrumb__key{flex-shrink:0;padding:1px 6px;border-radius:var(--r-xs);background:var(--bg-2);color:var(--fg-2);font-family:var(--font-mono);font-size:11px;font-weight:600;letter-spacing:.02em}\n"]
		}]
	}],
	ctorParameters: () => [],
	propDecorators: {
		items: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "items",
				required: false
			}]
		}],
		ariaLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "ariaLabel",
				required: false
			}]
		}],
		maxVisible: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "maxVisible",
				required: false
			}]
		}]
	}
});
var AthDividerComponent = class AthDividerComponent {
	constructor() {
		this.orientation = input("horizontal", ...ngDevMode ? [{ debugName: "orientation" }] : /* istanbul ignore next */ []);
		this.spacing = input("md", ...ngDevMode ? [{ debugName: "spacing" }] : /* istanbul ignore next */ []);
		this.dividerClasses = computed(() => [
			"ath-divider",
			`ath-divider--${this.orientation()}`,
			`ath-divider--spacing-${this.spacing()}`
		].join(" "), ...ngDevMode ? [{ debugName: "dividerClasses" }] : /* istanbul ignore next */ []);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthDividerComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.1.0",
			version: "22.2.2",
			type: AthDividerComponent,
			isStandalone: true,
			selector: "ath-divider",
			inputs: {
				orientation: {
					classPropertyName: "orientation",
					publicName: "orientation",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				spacing: {
					classPropertyName: "spacing",
					publicName: "spacing",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			ngImport: i0,
			template: "<div [class]=\"dividerClasses()\" role=\"separator\"></div>\n",
			styles: [".ath-divider{flex-shrink:0;background-color:var(--border)}.ath-divider--horizontal{width:100%;height:1px}.ath-divider--vertical{width:1px;align-self:stretch}.ath-divider--spacing-none{margin:0}.ath-divider--spacing-sm.ath-divider--horizontal{margin:var(--space-2) 0}.ath-divider--spacing-sm.ath-divider--vertical{margin:0 var(--space-2)}.ath-divider--spacing-md.ath-divider--horizontal{margin:var(--space-4) 0}.ath-divider--spacing-md.ath-divider--vertical{margin:0 var(--space-4)}.ath-divider--spacing-lg.ath-divider--horizontal{margin:var(--space-6) 0}.ath-divider--spacing-lg.ath-divider--vertical{margin:0 var(--space-6)}\n"],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthDividerComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-divider",
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: "<div [class]=\"dividerClasses()\" role=\"separator\"></div>\n",
			styles: [".ath-divider{flex-shrink:0;background-color:var(--border)}.ath-divider--horizontal{width:100%;height:1px}.ath-divider--vertical{width:1px;align-self:stretch}.ath-divider--spacing-none{margin:0}.ath-divider--spacing-sm.ath-divider--horizontal{margin:var(--space-2) 0}.ath-divider--spacing-sm.ath-divider--vertical{margin:0 var(--space-2)}.ath-divider--spacing-md.ath-divider--horizontal{margin:var(--space-4) 0}.ath-divider--spacing-md.ath-divider--vertical{margin:0 var(--space-4)}.ath-divider--spacing-lg.ath-divider--horizontal{margin:var(--space-6) 0}.ath-divider--spacing-lg.ath-divider--vertical{margin:0 var(--space-6)}\n"]
		}]
	}],
	propDecorators: {
		orientation: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "orientation",
				required: false
			}]
		}],
		spacing: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "spacing",
				required: false
			}]
		}]
	}
});
function tabStopIndex(activeIndex, disabled) {
	return activeIndex >= 0 && !disabled[activeIndex] ? activeIndex : disabled.indexOf(false);
}
function nextTabIndex(event, index, disabled, host) {
	const count = disabled.length;
	let start = index;
	let step;
	switch (event.key) {
		case "ArrowRight":
		case "ArrowLeft": {
			const rtl = getComputedStyle(host).direction === "rtl";
			step = event.key === "ArrowRight" !== rtl ? 1 : -1;
			break;
		}
		case "Home":
			start = -1;
			step = 1;
			break;
		case "End":
			start = count;
			step = -1;
			break;
		default: return null;
	}
	for (let i = 1; i <= count; i++) {
		const next = ((start + step * i) % count + count) % count;
		if (!disabled[next]) return next;
	}
	return null;
}
const EDGE = 24;
var AthTabsComponent = class AthTabsComponent {
	constructor() {
		this.tabs = input([], ...ngDevMode ? [{ debugName: "tabs" }] : /* istanbul ignore next */ []);
		this.activeTab = input("", ...ngDevMode ? [{ debugName: "activeTab" }] : /* istanbul ignore next */ []);
		this.tabChanged = output();
		this.host = inject(ElementRef);
		this.list = viewChild("list", ...ngDevMode ? [{ debugName: "list" }] : /* istanbul ignore next */ []);
		this.fadeLeft = signal(false, ...ngDevMode ? [{ debugName: "fadeLeft" }] : /* istanbul ignore next */ []);
		this.fadeRight = signal(false, ...ngDevMode ? [{ debugName: "fadeRight" }] : /* istanbul ignore next */ []);
		this.tabStop = computed(() => {
			const tabs = this.tabs();
			return tabStopIndex(tabs.findIndex((tab) => tab.id === this.activeTab()), tabs.map((tab) => !!tab.disabled));
		}, ...ngDevMode ? [{ debugName: "tabStop" }] : /* istanbul ignore next */ []);
		effect((onCleanup) => {
			const el = this.list()?.nativeElement;
			if (!el || typeof ResizeObserver === "undefined") return;
			const observer = untracked(() => new ResizeObserver(() => this.syncFade()));
			observer.observe(el);
			onCleanup(() => observer.disconnect());
		});
		effect((onCleanup) => {
			const el = this.list()?.nativeElement;
			const index = this.tabs().findIndex((tab) => tab.id === this.activeTab());
			if (!el || index < 0 || typeof requestAnimationFrame === "undefined") return;
			const frame = requestAnimationFrame(() => this.reveal(el, index));
			onCleanup(() => cancelAnimationFrame(frame));
		});
	}
	syncFade() {
		const el = this.list()?.nativeElement;
		if (!el) return;
		const max = el.scrollWidth - el.clientWidth;
		const x = Math.abs(el.scrollLeft);
		const rtl = el.scrollLeft < 0 || getComputedStyle(el).direction === "rtl";
		const startHidden = max > 1 && x > 1;
		const endHidden = max > 1 && x < max - 1;
		this.fadeLeft.set(rtl ? endHidden : startHidden);
		this.fadeRight.set(rtl ? startHidden : endHidden);
	}
	reveal(el, index) {
		const tab = el.querySelectorAll("[role=\"tab\"]")[index];
		if (tab && el.scrollWidth > el.clientWidth) {
			const bar = el.getBoundingClientRect();
			const r = tab.getBoundingClientRect();
			if (r.left < bar.left + EDGE) el.scrollLeft += r.left - bar.left - EDGE;
			else if (r.right > bar.right - EDGE) el.scrollLeft += r.right - bar.right + EDGE;
		}
		this.syncFade();
	}
	selectTab(tab) {
		if (!tab.disabled && tab.id !== this.activeTab()) this.tabChanged.emit(tab.id);
	}
	onKey(event, index) {
		const tabs = this.tabs();
		const next = nextTabIndex(event, index, tabs.map((tab) => !!tab.disabled), this.host.nativeElement);
		if (next === null) return;
		event.preventDefault();
		this.selectTab(tabs[next]);
		this.host.nativeElement.querySelectorAll("[role=\"tab\"]")[next]?.focus();
	}
	getTabClasses(tab) {
		return [
			"ath-tabs__tab",
			tab.id === this.activeTab() ? "ath-tabs__tab--active" : "",
			tab.disabled ? "ath-tabs__tab--disabled" : ""
		].filter(Boolean).join(" ");
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthTabsComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthTabsComponent,
			isStandalone: true,
			selector: "ath-tabs",
			inputs: {
				tabs: {
					classPropertyName: "tabs",
					publicName: "tabs",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				activeTab: {
					classPropertyName: "activeTab",
					publicName: "activeTab",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			outputs: { tabChanged: "tabChanged" },
			viewQueries: [{
				propertyName: "list",
				first: true,
				predicate: ["list"],
				descendants: true,
				isSignal: true
			}],
			ngImport: i0,
			template: "<div\n  #list\n  class=\"ath-tabs\"\n  role=\"tablist\"\n  [class.ath-tabs--fade-left]=\"fadeLeft()\"\n  [class.ath-tabs--fade-right]=\"fadeRight()\"\n  (scroll)=\"syncFade()\"\n>\n  @for (tab of tabs(); track tab.id; let i = $index) {\n    <button\n      type=\"button\"\n      role=\"tab\"\n      [class]=\"getTabClasses(tab)\"\n      [attr.aria-selected]=\"tab.id === activeTab()\"\n      [attr.tabindex]=\"i === tabStop() ? 0 : -1\"\n      [disabled]=\"tab.disabled\"\n      (click)=\"selectTab(tab)\"\n      (keydown)=\"onKey($event, i)\"\n    >\n      <span class=\"ath-tabs__label\">{{ tab.label }}</span>\n      @if (tab.count != null && tab.count !== 0 && tab.count !== '') {\n        <span class=\"ath-tabs__count\">{{ tab.count }}</span>\n      }\n    </button>\n  }\n</div>\n",
			styles: [":host{display:block;min-width:0;box-shadow:inset 0 -1px 0 var(--border)}.ath-tabs{--_fade-l: 0px;--_fade-r: 0px;display:flex;gap:0;overflow-x:auto;overscroll-behavior-x:contain;scrollbar-width:none}.ath-tabs::-webkit-scrollbar{display:none}.ath-tabs--fade-left,.ath-tabs--fade-right{-webkit-mask-image:linear-gradient(to right,transparent,var(--fg) var(--_fade-l),var(--fg) calc(100% - var(--_fade-r)),transparent);mask-image:linear-gradient(to right,transparent,var(--fg) var(--_fade-l),var(--fg) calc(100% - var(--_fade-r)),transparent)}.ath-tabs--fade-left{--_fade-l: 24px}.ath-tabs--fade-right{--_fade-r: 32px}.ath-tabs__tab{position:relative;display:inline-flex;align-items:center;padding:var(--space-3) var(--space-4);font-family:var(--font-sans);font-size:var(--text-sm);font-weight:var(--weight-medium);color:var(--fg-3);background:none;border:none;border-bottom:2px solid transparent;cursor:pointer;transition:all var(--t-fast);white-space:nowrap}.ath-tabs__tab:hover:not(:disabled){color:var(--fg)}.ath-tabs__tab--active{color:var(--tab-active-fg);border-bottom-color:var(--tab-active-indicator)}.ath-tabs__tab--active:hover:not(:disabled){color:var(--tab-active-fg)}.ath-tabs__tab--disabled{opacity:.4;cursor:not-allowed}.ath-tabs__tab:focus-visible{outline:none;box-shadow:inset 0 0 0 2px var(--accent);border-radius:var(--r-sm) var(--r-sm) 0 0}.ath-tabs__label{display:inline-flex;align-items:center}.ath-tabs__count{display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:16px;margin-left:6px;padding:0 5px;font-family:var(--font-mono);font-size:10.5px;font-weight:500;line-height:1;color:var(--fg-3);background:var(--bg-2);border-radius:999px;transition:color var(--t-fast),background var(--t-fast)}.ath-tabs__tab--active .ath-tabs__count{color:var(--segment-count-active-fg);background:var(--segment-count-active-bg)}\n"],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthTabsComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-tabs",
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: "<div\n  #list\n  class=\"ath-tabs\"\n  role=\"tablist\"\n  [class.ath-tabs--fade-left]=\"fadeLeft()\"\n  [class.ath-tabs--fade-right]=\"fadeRight()\"\n  (scroll)=\"syncFade()\"\n>\n  @for (tab of tabs(); track tab.id; let i = $index) {\n    <button\n      type=\"button\"\n      role=\"tab\"\n      [class]=\"getTabClasses(tab)\"\n      [attr.aria-selected]=\"tab.id === activeTab()\"\n      [attr.tabindex]=\"i === tabStop() ? 0 : -1\"\n      [disabled]=\"tab.disabled\"\n      (click)=\"selectTab(tab)\"\n      (keydown)=\"onKey($event, i)\"\n    >\n      <span class=\"ath-tabs__label\">{{ tab.label }}</span>\n      @if (tab.count != null && tab.count !== 0 && tab.count !== '') {\n        <span class=\"ath-tabs__count\">{{ tab.count }}</span>\n      }\n    </button>\n  }\n</div>\n",
			styles: [":host{display:block;min-width:0;box-shadow:inset 0 -1px 0 var(--border)}.ath-tabs{--_fade-l: 0px;--_fade-r: 0px;display:flex;gap:0;overflow-x:auto;overscroll-behavior-x:contain;scrollbar-width:none}.ath-tabs::-webkit-scrollbar{display:none}.ath-tabs--fade-left,.ath-tabs--fade-right{-webkit-mask-image:linear-gradient(to right,transparent,var(--fg) var(--_fade-l),var(--fg) calc(100% - var(--_fade-r)),transparent);mask-image:linear-gradient(to right,transparent,var(--fg) var(--_fade-l),var(--fg) calc(100% - var(--_fade-r)),transparent)}.ath-tabs--fade-left{--_fade-l: 24px}.ath-tabs--fade-right{--_fade-r: 32px}.ath-tabs__tab{position:relative;display:inline-flex;align-items:center;padding:var(--space-3) var(--space-4);font-family:var(--font-sans);font-size:var(--text-sm);font-weight:var(--weight-medium);color:var(--fg-3);background:none;border:none;border-bottom:2px solid transparent;cursor:pointer;transition:all var(--t-fast);white-space:nowrap}.ath-tabs__tab:hover:not(:disabled){color:var(--fg)}.ath-tabs__tab--active{color:var(--tab-active-fg);border-bottom-color:var(--tab-active-indicator)}.ath-tabs__tab--active:hover:not(:disabled){color:var(--tab-active-fg)}.ath-tabs__tab--disabled{opacity:.4;cursor:not-allowed}.ath-tabs__tab:focus-visible{outline:none;box-shadow:inset 0 0 0 2px var(--accent);border-radius:var(--r-sm) var(--r-sm) 0 0}.ath-tabs__label{display:inline-flex;align-items:center}.ath-tabs__count{display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:16px;margin-left:6px;padding:0 5px;font-family:var(--font-mono);font-size:10.5px;font-weight:500;line-height:1;color:var(--fg-3);background:var(--bg-2);border-radius:999px;transition:color var(--t-fast),background var(--t-fast)}.ath-tabs__tab--active .ath-tabs__count{color:var(--segment-count-active-fg);background:var(--segment-count-active-bg)}\n"]
		}]
	}],
	ctorParameters: () => [],
	propDecorators: {
		tabs: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "tabs",
				required: false
			}]
		}],
		activeTab: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "activeTab",
				required: false
			}]
		}],
		tabChanged: [{
			type: i0.Output,
			args: ["tabChanged"]
		}],
		list: [{
			type: i0.ViewChild,
			args: ["list", { isSignal: true }]
		}]
	}
});
var AthTimelineComponent = class AthTimelineComponent {
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthTimelineComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "14.0.0",
			version: "22.2.2",
			type: AthTimelineComponent,
			isStandalone: true,
			selector: "ath-timeline",
			ngImport: i0,
			template: "<ng-content />\n",
			styles: [":host{display:block;position:relative}:host:before{content:\"\";position:absolute;left:12px;top:8px;bottom:8px;width:1px;background:var(--border-faint);pointer-events:none}::ng-deep ath-timeline-entry,::ng-deep ath-timeline-event{display:block;position:relative}::ng-deep ath-timeline-entry+ath-timeline-entry,::ng-deep ath-timeline-entry+ath-timeline-event,::ng-deep ath-timeline-event+ath-timeline-entry,::ng-deep ath-timeline-event+ath-timeline-event{margin-top:12px}\n"],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthTimelineComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-timeline",
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: "<ng-content />\n",
			styles: [":host{display:block;position:relative}:host:before{content:\"\";position:absolute;left:12px;top:8px;bottom:8px;width:1px;background:var(--border-faint);pointer-events:none}::ng-deep ath-timeline-entry,::ng-deep ath-timeline-event{display:block;position:relative}::ng-deep ath-timeline-entry+ath-timeline-entry,::ng-deep ath-timeline-entry+ath-timeline-event,::ng-deep ath-timeline-event+ath-timeline-entry,::ng-deep ath-timeline-event+ath-timeline-event{margin-top:12px}\n"]
		}]
	}]
});
const ATH_DECO_COLORS = [
	"neutral",
	"blue",
	"green",
	"amber",
	"red",
	"purple",
	"pink"
];
function isAthDecoColor(value) {
	return typeof value === "string" && ATH_DECO_COLORS.includes(value);
}
function athDecoColorLabel(labels, color) {
	switch (color) {
		case "neutral": return labels.colorNeutral();
		case "blue": return labels.colorBlue();
		case "green": return labels.colorGreen();
		case "amber": return labels.colorAmber();
		case "red": return labels.colorRed();
		case "purple": return labels.colorPurple();
		case "pink": return labels.colorPink();
	}
}
const AVATAR_TONE_COUNT = 8;
function avatarInitials(name) {
	const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return "?";
	if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
	return parts[0].substring(0, 2).toUpperCase();
}
function toneOfKey(key) {
	let hash = 2166136261;
	for (let i = 0; i < key.length; i++) {
		hash ^= key.charCodeAt(i);
		hash = Math.imul(hash, 16777619);
	}
	hash ^= hash >>> 16;
	hash = Math.imul(hash, 2246822507);
	hash ^= hash >>> 13;
	hash = Math.imul(hash, 3266489909);
	hash ^= hash >>> 16;
	return (hash >>> 0) % 8 + 1;
}
function avatarToneFor(person) {
	const id = person.id?.trim();
	if (id) return toneOfKey(id);
	return person.name?.trim() ? toneOfKey(avatarInitials(person.name)) : null;
}
const ICON_SIZE = {
	xs: 12,
	sm: 13,
	md: 18,
	lg: 22,
	xl: 28
};
var AthAvatarComponent = class AthAvatarComponent {
	constructor() {
		this.labels = injectAthLabels();
		this.person = input(void 0, ...ngDevMode ? [{ debugName: "person" }] : /* istanbul ignore next */ []);
		this.name = input("", ...ngDevMode ? [{ debugName: "name" }] : /* istanbul ignore next */ []);
		this.src = input("", ...ngDevMode ? [{ debugName: "src" }] : /* istanbul ignore next */ []);
		this.id = input(null, ...ngDevMode ? [{ debugName: "id" }] : /* istanbul ignore next */ []);
		this.size = input("md", ...ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []);
		this.unassigned = input(false, ...ngDevMode ? [{ debugName: "unassigned" }] : /* istanbul ignore next */ []);
		this.label = input(null, ...ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []);
		this.ring = input(null, ...ngDevMode ? [{ debugName: "ring" }] : /* istanbul ignore next */ []);
		this.userIcon = User;
		this.failedSrc = signal(null, ...ngDevMode ? [{ debugName: "failedSrc" }] : /* istanbul ignore next */ []);
		this.who = computed(() => {
			return this.person() ?? {
				id: this.id(),
				name: this.name(),
				src: this.src()
			};
		}, ...ngDevMode ? [{ debugName: "who" }] : /* istanbul ignore next */ []);
		this.empty = computed(() => this.unassigned() || this.person() === null, ...ngDevMode ? [{ debugName: "empty" }] : /* istanbul ignore next */ []);
		this.initials = computed(() => avatarInitials(this.who().name), ...ngDevMode ? [{ debugName: "initials" }] : /* istanbul ignore next */ []);
		this.tone = computed(() => this.empty() ? null : avatarToneFor(this.who()), ...ngDevMode ? [{ debugName: "tone" }] : /* istanbul ignore next */ []);
		this.image = computed(() => {
			const src = this.who().src;
			return src && src !== this.failedSrc() ? src : null;
		}, ...ngDevMode ? [{ debugName: "image" }] : /* istanbul ignore next */ []);
		this.ringColor = computed(() => {
			const ring = this.ring();
			return isAthDecoColor(ring) ? ring : null;
		}, ...ngDevMode ? [{ debugName: "ringColor" }] : /* istanbul ignore next */ []);
		this.iconSize = computed(() => ICON_SIZE[this.size()], ...ngDevMode ? [{ debugName: "iconSize" }] : /* istanbul ignore next */ []);
		this.accessibleName = computed(() => {
			const explicit = this.label();
			if (explicit) return explicit;
			if (this.empty()) return this.labels.unassigned();
			return this.who().name?.trim() || null;
		}, ...ngDevMode ? [{ debugName: "accessibleName" }] : /* istanbul ignore next */ []);
		this.tooltip = computed(() => this.label() || this.empty() || this.person() ? this.accessibleName() : null, ...ngDevMode ? [{ debugName: "tooltip" }] : /* istanbul ignore next */ []);
	}
	onImageError() {
		this.failedSrc.set(this.who().src ?? null);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthAvatarComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthAvatarComponent,
			isStandalone: true,
			selector: "ath-avatar",
			inputs: {
				person: {
					classPropertyName: "person",
					publicName: "person",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				name: {
					classPropertyName: "name",
					publicName: "name",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				src: {
					classPropertyName: "src",
					publicName: "src",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				id: {
					classPropertyName: "id",
					publicName: "id",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				size: {
					classPropertyName: "size",
					publicName: "size",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				unassigned: {
					classPropertyName: "unassigned",
					publicName: "unassigned",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				label: {
					classPropertyName: "label",
					publicName: "label",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				ring: {
					classPropertyName: "ring",
					publicName: "ring",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			ngImport: i0,
			template: "@if (empty()) {\n  <span\n    class=\"ath-avatar ath-avatar--empty\"\n    [attr.data-size]=\"size()\"\n    [attr.data-ring]=\"ringColor()\"\n    role=\"img\"\n    [attr.aria-label]=\"accessibleName()\"\n    [attr.title]=\"tooltip()\"\n  >\n    <ath-icon [img]=\"userIcon\" [size]=\"iconSize()\" aria-hidden=\"true\" />\n  </span>\n} @else {\n  <span\n    class=\"ath-avatar\"\n    [attr.data-size]=\"size()\"\n    [attr.data-ring]=\"ringColor()\"\n    [attr.data-tone]=\"tone()\"\n    role=\"img\"\n    [attr.aria-label]=\"accessibleName()\"\n    [attr.title]=\"tooltip()\"\n  >\n    @if (image(); as url) {\n      <img [src]=\"url\" alt=\"\" class=\"ath-avatar__image\" (error)=\"onImageError()\" />\n    }\n    <span class=\"ath-avatar__initials\" aria-hidden=\"true\">{{ initials() }}</span>\n  </span>\n}\n",
			styles: [":host{display:inline-flex;flex:none;vertical-align:middle}.ath-avatar{--_size: var(--avatar-md);--_font: var(--avatar-font-md);position:relative;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;width:var(--_size);height:var(--_size);border-radius:var(--r-full);background:var(--avatar-neutral-bg);color:var(--avatar-neutral-fg);font-size:var(--_font);font-weight:var(--weight-semibold);overflow:hidden;-webkit-user-select:none;user-select:none}.ath-avatar[data-size=xs]{--_size: var(--avatar-xs);--_font: var(--avatar-font-xs)}.ath-avatar[data-size=sm]{--_size: var(--avatar-sm);--_font: var(--avatar-font-sm)}.ath-avatar[data-size=lg]{--_size: var(--avatar-lg);--_font: var(--avatar-font-lg)}.ath-avatar[data-size=xl]{--_size: var(--avatar-xl);--_font: var(--avatar-font-xl)}.ath-avatar[data-tone=\"1\"]{background:var(--avatar-1-bg);color:var(--avatar-1-fg)}.ath-avatar[data-tone=\"2\"]{background:var(--avatar-2-bg);color:var(--avatar-2-fg)}.ath-avatar[data-tone=\"3\"]{background:var(--avatar-3-bg);color:var(--avatar-3-fg)}.ath-avatar[data-tone=\"4\"]{background:var(--avatar-4-bg);color:var(--avatar-4-fg)}.ath-avatar[data-tone=\"5\"]{background:var(--avatar-5-bg);color:var(--avatar-5-fg)}.ath-avatar[data-tone=\"6\"]{background:var(--avatar-6-bg);color:var(--avatar-6-fg)}.ath-avatar[data-tone=\"7\"]{background:var(--avatar-7-bg);color:var(--avatar-7-fg)}.ath-avatar[data-tone=\"8\"]{background:var(--avatar-8-bg);color:var(--avatar-8-fg)}.ath-avatar--empty{background:var(--bg-2);color:var(--fg-3)}.ath-avatar__image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:var(--z-raised)}.ath-avatar__initials{position:relative;letter-spacing:.5px}.ath-avatar[data-ring=neutral]{box-shadow:0 0 0 1.5px var(--surface),0 0 0 3px var(--grey-muted)}.ath-avatar[data-ring=blue]{box-shadow:0 0 0 1.5px var(--surface),0 0 0 3px var(--blue-muted)}.ath-avatar[data-ring=green]{box-shadow:0 0 0 1.5px var(--surface),0 0 0 3px var(--green-muted)}.ath-avatar[data-ring=amber]{box-shadow:0 0 0 1.5px var(--surface),0 0 0 3px var(--amber-muted)}.ath-avatar[data-ring=red]{box-shadow:0 0 0 1.5px var(--surface),0 0 0 3px var(--red-muted)}.ath-avatar[data-ring=purple]{box-shadow:0 0 0 1.5px var(--surface),0 0 0 3px var(--purple-muted)}.ath-avatar[data-ring=pink]{box-shadow:0 0 0 1.5px var(--surface),0 0 0 3px var(--pink-muted)}\n"],
			dependencies: [{
				kind: "component",
				type: AthIconComponent,
				selector: "ath-icon",
				inputs: [
					"img",
					"size",
					"strokeWidth",
					"color",
					"absoluteStrokeWidth",
					"class"
				]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthAvatarComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-avatar",
			imports: [AthIconComponent],
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: "@if (empty()) {\n  <span\n    class=\"ath-avatar ath-avatar--empty\"\n    [attr.data-size]=\"size()\"\n    [attr.data-ring]=\"ringColor()\"\n    role=\"img\"\n    [attr.aria-label]=\"accessibleName()\"\n    [attr.title]=\"tooltip()\"\n  >\n    <ath-icon [img]=\"userIcon\" [size]=\"iconSize()\" aria-hidden=\"true\" />\n  </span>\n} @else {\n  <span\n    class=\"ath-avatar\"\n    [attr.data-size]=\"size()\"\n    [attr.data-ring]=\"ringColor()\"\n    [attr.data-tone]=\"tone()\"\n    role=\"img\"\n    [attr.aria-label]=\"accessibleName()\"\n    [attr.title]=\"tooltip()\"\n  >\n    @if (image(); as url) {\n      <img [src]=\"url\" alt=\"\" class=\"ath-avatar__image\" (error)=\"onImageError()\" />\n    }\n    <span class=\"ath-avatar__initials\" aria-hidden=\"true\">{{ initials() }}</span>\n  </span>\n}\n",
			styles: [":host{display:inline-flex;flex:none;vertical-align:middle}.ath-avatar{--_size: var(--avatar-md);--_font: var(--avatar-font-md);position:relative;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;width:var(--_size);height:var(--_size);border-radius:var(--r-full);background:var(--avatar-neutral-bg);color:var(--avatar-neutral-fg);font-size:var(--_font);font-weight:var(--weight-semibold);overflow:hidden;-webkit-user-select:none;user-select:none}.ath-avatar[data-size=xs]{--_size: var(--avatar-xs);--_font: var(--avatar-font-xs)}.ath-avatar[data-size=sm]{--_size: var(--avatar-sm);--_font: var(--avatar-font-sm)}.ath-avatar[data-size=lg]{--_size: var(--avatar-lg);--_font: var(--avatar-font-lg)}.ath-avatar[data-size=xl]{--_size: var(--avatar-xl);--_font: var(--avatar-font-xl)}.ath-avatar[data-tone=\"1\"]{background:var(--avatar-1-bg);color:var(--avatar-1-fg)}.ath-avatar[data-tone=\"2\"]{background:var(--avatar-2-bg);color:var(--avatar-2-fg)}.ath-avatar[data-tone=\"3\"]{background:var(--avatar-3-bg);color:var(--avatar-3-fg)}.ath-avatar[data-tone=\"4\"]{background:var(--avatar-4-bg);color:var(--avatar-4-fg)}.ath-avatar[data-tone=\"5\"]{background:var(--avatar-5-bg);color:var(--avatar-5-fg)}.ath-avatar[data-tone=\"6\"]{background:var(--avatar-6-bg);color:var(--avatar-6-fg)}.ath-avatar[data-tone=\"7\"]{background:var(--avatar-7-bg);color:var(--avatar-7-fg)}.ath-avatar[data-tone=\"8\"]{background:var(--avatar-8-bg);color:var(--avatar-8-fg)}.ath-avatar--empty{background:var(--bg-2);color:var(--fg-3)}.ath-avatar__image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:var(--z-raised)}.ath-avatar__initials{position:relative;letter-spacing:.5px}.ath-avatar[data-ring=neutral]{box-shadow:0 0 0 1.5px var(--surface),0 0 0 3px var(--grey-muted)}.ath-avatar[data-ring=blue]{box-shadow:0 0 0 1.5px var(--surface),0 0 0 3px var(--blue-muted)}.ath-avatar[data-ring=green]{box-shadow:0 0 0 1.5px var(--surface),0 0 0 3px var(--green-muted)}.ath-avatar[data-ring=amber]{box-shadow:0 0 0 1.5px var(--surface),0 0 0 3px var(--amber-muted)}.ath-avatar[data-ring=red]{box-shadow:0 0 0 1.5px var(--surface),0 0 0 3px var(--red-muted)}.ath-avatar[data-ring=purple]{box-shadow:0 0 0 1.5px var(--surface),0 0 0 3px var(--purple-muted)}.ath-avatar[data-ring=pink]{box-shadow:0 0 0 1.5px var(--surface),0 0 0 3px var(--pink-muted)}\n"]
		}]
	}],
	propDecorators: {
		person: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "person",
				required: false
			}]
		}],
		name: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "name",
				required: false
			}]
		}],
		src: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "src",
				required: false
			}]
		}],
		id: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "id",
				required: false
			}]
		}],
		size: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "size",
				required: false
			}]
		}],
		unassigned: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "unassigned",
				required: false
			}]
		}],
		label: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "label",
				required: false
			}]
		}],
		ring: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "ring",
				required: false
			}]
		}]
	}
});
var AthTimelineEntryComponent = class AthTimelineEntryComponent {
	constructor() {
		this.labels = injectAthLabels();
		this.author = input.required(...ngDevMode ? [{ debugName: "author" }] : /* istanbul ignore next */ []);
		this.avatarName = input(null, ...ngDevMode ? [{ debugName: "avatarName" }] : /* istanbul ignore next */ []);
		this.avatarSrc = input("", ...ngDevMode ? [{ debugName: "avatarSrc" }] : /* istanbul ignore next */ []);
		this.timeLabel = input("", ...ngDevMode ? [{ debugName: "timeLabel" }] : /* istanbul ignore next */ []);
		this.internal = input(false, {
			...ngDevMode ? { debugName: "internal" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.effectiveAvatarName = computed(() => this.avatarName() ?? this.author(), ...ngDevMode ? [{ debugName: "effectiveAvatarName" }] : /* istanbul ignore next */ []);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthTimelineEntryComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthTimelineEntryComponent,
			isStandalone: true,
			selector: "ath-timeline-entry",
			inputs: {
				author: {
					classPropertyName: "author",
					publicName: "author",
					isSignal: true,
					isRequired: true,
					transformFunction: null
				},
				avatarName: {
					classPropertyName: "avatarName",
					publicName: "avatarName",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				avatarSrc: {
					classPropertyName: "avatarSrc",
					publicName: "avatarSrc",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				timeLabel: {
					classPropertyName: "timeLabel",
					publicName: "timeLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				internal: {
					classPropertyName: "internal",
					publicName: "internal",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			host: { properties: { "attr.data-internal": "internal() ? 'true' : null" } },
			ngImport: i0,
			template: "<div class=\"ath-tl-entry__avatar\">\n  <ath-avatar [name]=\"effectiveAvatarName()\" [src]=\"avatarSrc()\" size=\"sm\" />\n</div>\n<div class=\"ath-tl-entry__body\">\n  <div class=\"ath-tl-entry__meta\">\n    <b class=\"ath-tl-entry__author\">{{ author() }}</b>\n    @if (internal()) {\n      <span class=\"ath-tl-entry__internal\" [title]=\"labels.internalNote()\">{{\n        labels.internal()\n      }}</span>\n    }\n    @if (timeLabel()) {\n      <span class=\"ath-tl-entry__when\">{{ timeLabel() }}</span>\n    }\n  </div>\n  <div class=\"ath-tl-entry__content\">\n    <ng-content />\n  </div>\n</div>\n",
			styles: [":host{display:grid;grid-template-columns:24px 1fr;gap:10px;position:relative;padding:6px 0}.ath-tl-entry__avatar{position:relative;z-index:var(--z-raised)}.ath-tl-entry__avatar ath-avatar{box-shadow:0 0 0 2px var(--bg-0);border-radius:999px;display:inline-flex}.ath-tl-entry__body{min-width:0}.ath-tl-entry__meta{display:flex;align-items:baseline;gap:8px;margin-bottom:4px;font-family:var(--font-sans);font-size:12.5px;line-height:1.4}.ath-tl-entry__author{color:var(--fg);font-weight:600}.ath-tl-entry__internal{display:inline-flex;align-items:center;padding:1px 6px;font-size:10.5px;font-weight:500;color:var(--amber-text);background:var(--amber-tint);border-radius:var(--r-xs);text-transform:lowercase;letter-spacing:.02em}.ath-tl-entry__when{color:var(--fg-3);font-family:var(--font-mono);font-size:11px}.ath-tl-entry__content{color:var(--fg-2);font-size:13px;line-height:1.55}.ath-tl-entry__content ::ng-deep p{margin:0 0 6px}.ath-tl-entry__content ::ng-deep p:last-child{margin-bottom:0}.ath-tl-entry__content ::ng-deep code{font-family:var(--font-mono);font-size:12px;padding:1px 5px;background:var(--surface-3);border-radius:var(--r-xs);color:var(--fg)}:host([data-internal=true]){padding:8px 10px;background:var(--amber-tint);border-radius:var(--r);margin-left:-10px;margin-right:-10px}\n"],
			dependencies: [{
				kind: "component",
				type: AthAvatarComponent,
				selector: "ath-avatar",
				inputs: [
					"person",
					"name",
					"src",
					"id",
					"size",
					"unassigned",
					"label",
					"ring"
				]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthTimelineEntryComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-timeline-entry",
			imports: [AthAvatarComponent],
			changeDetection: ChangeDetectionStrategy.OnPush,
			host: { "[attr.data-internal]": "internal() ? 'true' : null" },
			template: "<div class=\"ath-tl-entry__avatar\">\n  <ath-avatar [name]=\"effectiveAvatarName()\" [src]=\"avatarSrc()\" size=\"sm\" />\n</div>\n<div class=\"ath-tl-entry__body\">\n  <div class=\"ath-tl-entry__meta\">\n    <b class=\"ath-tl-entry__author\">{{ author() }}</b>\n    @if (internal()) {\n      <span class=\"ath-tl-entry__internal\" [title]=\"labels.internalNote()\">{{\n        labels.internal()\n      }}</span>\n    }\n    @if (timeLabel()) {\n      <span class=\"ath-tl-entry__when\">{{ timeLabel() }}</span>\n    }\n  </div>\n  <div class=\"ath-tl-entry__content\">\n    <ng-content />\n  </div>\n</div>\n",
			styles: [":host{display:grid;grid-template-columns:24px 1fr;gap:10px;position:relative;padding:6px 0}.ath-tl-entry__avatar{position:relative;z-index:var(--z-raised)}.ath-tl-entry__avatar ath-avatar{box-shadow:0 0 0 2px var(--bg-0);border-radius:999px;display:inline-flex}.ath-tl-entry__body{min-width:0}.ath-tl-entry__meta{display:flex;align-items:baseline;gap:8px;margin-bottom:4px;font-family:var(--font-sans);font-size:12.5px;line-height:1.4}.ath-tl-entry__author{color:var(--fg);font-weight:600}.ath-tl-entry__internal{display:inline-flex;align-items:center;padding:1px 6px;font-size:10.5px;font-weight:500;color:var(--amber-text);background:var(--amber-tint);border-radius:var(--r-xs);text-transform:lowercase;letter-spacing:.02em}.ath-tl-entry__when{color:var(--fg-3);font-family:var(--font-mono);font-size:11px}.ath-tl-entry__content{color:var(--fg-2);font-size:13px;line-height:1.55}.ath-tl-entry__content ::ng-deep p{margin:0 0 6px}.ath-tl-entry__content ::ng-deep p:last-child{margin-bottom:0}.ath-tl-entry__content ::ng-deep code{font-family:var(--font-mono);font-size:12px;padding:1px 5px;background:var(--surface-3);border-radius:var(--r-xs);color:var(--fg)}:host([data-internal=true]){padding:8px 10px;background:var(--amber-tint);border-radius:var(--r);margin-left:-10px;margin-right:-10px}\n"]
		}]
	}],
	propDecorators: {
		author: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "author",
				required: true
			}]
		}],
		avatarName: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "avatarName",
				required: false
			}]
		}],
		avatarSrc: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "avatarSrc",
				required: false
			}]
		}],
		timeLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "timeLabel",
				required: false
			}]
		}],
		internal: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "internal",
				required: false
			}]
		}]
	}
});
var AthTimelineEventComponent = class AthTimelineEventComponent {
	constructor() {
		this.statusColor = input("var(--fg-4)", ...ngDevMode ? [{ debugName: "statusColor" }] : /* istanbul ignore next */ []);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthTimelineEventComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.1.0",
			version: "22.2.2",
			type: AthTimelineEventComponent,
			isStandalone: true,
			selector: "ath-timeline-event",
			inputs: { statusColor: {
				classPropertyName: "statusColor",
				publicName: "statusColor",
				isSignal: true,
				isRequired: false,
				transformFunction: null
			} },
			ngImport: i0,
			template: "<div class=\"ath-tl-event__dot-wrap\">\n  <span class=\"ath-tl-event__dot\" [style.background]=\"statusColor()\"></span>\n</div>\n<div class=\"ath-tl-event__text\">\n  <ng-content />\n</div>\n",
			styles: [":host{display:grid;grid-template-columns:24px 1fr;gap:10px;align-items:center;padding:4px 0;font-family:var(--font-sans);font-size:12.5px;color:var(--fg-3);line-height:1.4}.ath-tl-event__dot-wrap{display:flex;align-items:center;justify-content:center;position:relative;z-index:var(--z-raised)}.ath-tl-event__dot{width:8px;height:8px;border-radius:999px;box-shadow:0 0 0 3px var(--bg-0)}.ath-tl-event__text{min-width:0}.ath-tl-event__text ::ng-deep b{color:var(--fg);font-weight:600}\n"],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthTimelineEventComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-timeline-event",
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: "<div class=\"ath-tl-event__dot-wrap\">\n  <span class=\"ath-tl-event__dot\" [style.background]=\"statusColor()\"></span>\n</div>\n<div class=\"ath-tl-event__text\">\n  <ng-content />\n</div>\n",
			styles: [":host{display:grid;grid-template-columns:24px 1fr;gap:10px;align-items:center;padding:4px 0;font-family:var(--font-sans);font-size:12.5px;color:var(--fg-3);line-height:1.4}.ath-tl-event__dot-wrap{display:flex;align-items:center;justify-content:center;position:relative;z-index:var(--z-raised)}.ath-tl-event__dot{width:8px;height:8px;border-radius:999px;box-shadow:0 0 0 3px var(--bg-0)}.ath-tl-event__text{min-width:0}.ath-tl-event__text ::ng-deep b{color:var(--fg);font-weight:600}\n"]
		}]
	}],
	propDecorators: { statusColor: [{
		type: i0.Input,
		args: [{
			isSignal: true,
			alias: "statusColor",
			required: false
		}]
	}] }
});
const BODY = "M10.5 4.5Q12 2.2 13.5 4.5L20.25 18.55Q21.45 21 18.75 21H15.1Q14.6 21 14.3 20.6L12 17.3 9.7 20.6Q9.4 21 8.9 21H5.25Q2.55 21 3.75 18.55Z";
const n = (v) => +v.toFixed(2);
function eye(cx, cy, r) {
	return `M${n(cx)} ${n(cy + r)}a${n(r)} ${n(r)} 0 1 0 0-${n(2 * r)}a${n(r)} ${n(r)} 0 0 0 0 ${n(2 * r)}Z`;
}
function spark(cx, cy, rx, ry, c) {
	return `M${n(cx)} ${n(cy - ry)}Q${n(cx + c)} ${n(cy - c)} ${n(cx + rx)} ${n(cy)}Q${n(cx + c)} ${n(cy + c)} ${n(cx)} ${n(cy + ry)}Q${n(cx - c)} ${n(cy + c)} ${n(cx - rx)} ${n(cy)}Q${n(cx - c)} ${n(cy - c)} ${n(cx)} ${n(cy - ry)}Z`;
}
const AI_MARK_REGULAR = {
	body: BODY + eye(9.5, 13.5, 1.95) + eye(14.5, 13.5, 1.95),
	spark: spark(18.9, 5.1, 2, 2.75, .4)
};
const AI_MARK_SMALL = {
	body: BODY + eye(9.3, 13.7, 1.7) + eye(14.7, 13.7, 1.7),
	spark: spark(18.9, 5, 2.4, 3.2, .5)
};
const AI_MARK_SMALL_MAX = 20;
let nextId$1 = 0;
var AthAiMarkComponent = class AthAiMarkComponent {
	constructor() {
		this.size = input(16, ...ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []);
		this.variant = input("color", ...ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []);
		this.label = input("", ...ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []);
		this.wordmark = input(false, {
			...ngDevMode ? { debugName: "wordmark" } : /* istanbul ignore next */ {},
			transform: (v) => v === "" || !!v
		});
		this.gradientId = `ath-ai-mark-g${++nextId$1}`;
		this.fillUrl = `url(#${this.gradientId})`;
		this.shape = computed(() => this.size() <= 20 ? AI_MARK_SMALL : AI_MARK_REGULAR, ...ngDevMode ? [{ debugName: "shape" }] : /* istanbul ignore next */ []);
		this.imageName = computed(() => this.wordmark() ? "" : this.label().trim(), ...ngDevMode ? [{ debugName: "imageName" }] : /* istanbul ignore next */ []);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthAiMarkComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthAiMarkComponent,
			isStandalone: true,
			selector: "ath-ai-mark",
			inputs: {
				size: {
					classPropertyName: "size",
					publicName: "size",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				variant: {
					classPropertyName: "variant",
					publicName: "variant",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				label: {
					classPropertyName: "label",
					publicName: "label",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				wordmark: {
					classPropertyName: "wordmark",
					publicName: "wordmark",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			host: {
				properties: {
					"attr.data-variant": "variant()",
					"style.--ai-mark-size": "size() + \"px\""
				},
				classAttribute: "ath-ai-mark"
			},
			ngImport: i0,
			template: "<svg\n  class=\"ath-ai-mark__svg\"\n  viewBox=\"0 0 24 24\"\n  [attr.width]=\"size()\"\n  [attr.height]=\"size()\"\n  [attr.role]=\"imageName() ? 'img' : null\"\n  [attr.aria-label]=\"imageName() || null\"\n  [attr.aria-hidden]=\"imageName() ? null : 'true'\"\n  focusable=\"false\"\n>\n  @if (variant() === 'gradient') {\n    <defs>\n      <linearGradient\n        [attr.id]=\"gradientId\"\n        x1=\"4\"\n        y1=\"3\"\n        x2=\"20\"\n        y2=\"21\"\n        gradientUnits=\"userSpaceOnUse\"\n      >\n        <stop class=\"ath-ai-mark__from\" offset=\"0\" />\n        <stop class=\"ath-ai-mark__to\" offset=\"1\" />\n      </linearGradient>\n    </defs>\n  }\n  <path\n    class=\"ath-ai-mark__body\"\n    fill-rule=\"evenodd\"\n    [attr.d]=\"shape().body\"\n    [attr.fill]=\"variant() === 'gradient' ? fillUrl : null\"\n  />\n  <path\n    class=\"ath-ai-mark__spark\"\n    [attr.d]=\"shape().spark\"\n    [attr.fill]=\"variant() === 'gradient' ? fillUrl : null\"\n  />\n</svg>\n@if (wordmark()) {\n  <span class=\"ath-ai-mark__word\">Athenos <span class=\"ath-ai-mark__ai\">AI</span></span>\n}\n",
			styles: [":host{--ai-mark-size: 16px;display:inline-flex;align-items:center;gap:calc(var(--ai-mark-size) * .4);flex-shrink:0;color:inherit;line-height:1;vertical-align:middle}.ath-ai-mark__svg{display:block;flex-shrink:0;overflow:visible}:host(:not([data-variant=gradient])) .ath-ai-mark__body,:host(:not([data-variant=gradient])) .ath-ai-mark__spark{fill:currentcolor}:host([data-variant=color]) .ath-ai-mark__spark{fill:var(--accent)}.ath-ai-mark__from{stop-color:var(--ai-from)}.ath-ai-mark__to{stop-color:var(--ai-to)}.ath-ai-mark__word{font-family:var(--font-sans);font-size:calc(var(--ai-mark-size) * .82);font-weight:var(--weight-semibold);letter-spacing:-.015em;color:var(--fg);white-space:nowrap}.ath-ai-mark__ai{color:var(--accent-text)}\n"],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthAiMarkComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-ai-mark",
			changeDetection: ChangeDetectionStrategy.OnPush,
			host: {
				class: "ath-ai-mark",
				"[attr.data-variant]": "variant()",
				"[style.--ai-mark-size]": "size() + \"px\""
			},
			template: "<svg\n  class=\"ath-ai-mark__svg\"\n  viewBox=\"0 0 24 24\"\n  [attr.width]=\"size()\"\n  [attr.height]=\"size()\"\n  [attr.role]=\"imageName() ? 'img' : null\"\n  [attr.aria-label]=\"imageName() || null\"\n  [attr.aria-hidden]=\"imageName() ? null : 'true'\"\n  focusable=\"false\"\n>\n  @if (variant() === 'gradient') {\n    <defs>\n      <linearGradient\n        [attr.id]=\"gradientId\"\n        x1=\"4\"\n        y1=\"3\"\n        x2=\"20\"\n        y2=\"21\"\n        gradientUnits=\"userSpaceOnUse\"\n      >\n        <stop class=\"ath-ai-mark__from\" offset=\"0\" />\n        <stop class=\"ath-ai-mark__to\" offset=\"1\" />\n      </linearGradient>\n    </defs>\n  }\n  <path\n    class=\"ath-ai-mark__body\"\n    fill-rule=\"evenodd\"\n    [attr.d]=\"shape().body\"\n    [attr.fill]=\"variant() === 'gradient' ? fillUrl : null\"\n  />\n  <path\n    class=\"ath-ai-mark__spark\"\n    [attr.d]=\"shape().spark\"\n    [attr.fill]=\"variant() === 'gradient' ? fillUrl : null\"\n  />\n</svg>\n@if (wordmark()) {\n  <span class=\"ath-ai-mark__word\">Athenos <span class=\"ath-ai-mark__ai\">AI</span></span>\n}\n",
			styles: [":host{--ai-mark-size: 16px;display:inline-flex;align-items:center;gap:calc(var(--ai-mark-size) * .4);flex-shrink:0;color:inherit;line-height:1;vertical-align:middle}.ath-ai-mark__svg{display:block;flex-shrink:0;overflow:visible}:host(:not([data-variant=gradient])) .ath-ai-mark__body,:host(:not([data-variant=gradient])) .ath-ai-mark__spark{fill:currentcolor}:host([data-variant=color]) .ath-ai-mark__spark{fill:var(--accent)}.ath-ai-mark__from{stop-color:var(--ai-from)}.ath-ai-mark__to{stop-color:var(--ai-to)}.ath-ai-mark__word{font-family:var(--font-sans);font-size:calc(var(--ai-mark-size) * .82);font-weight:var(--weight-semibold);letter-spacing:-.015em;color:var(--fg);white-space:nowrap}.ath-ai-mark__ai{color:var(--accent-text)}\n"]
		}]
	}],
	propDecorators: {
		size: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "size",
				required: false
			}]
		}],
		variant: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "variant",
				required: false
			}]
		}],
		label: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "label",
				required: false
			}]
		}],
		wordmark: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "wordmark",
				required: false
			}]
		}]
	}
});
var AthTableComponent = class AthTableComponent {
	constructor() {
		this.flush = input(false, {
			...ngDevMode ? { debugName: "flush" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthTableComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.1.0",
			version: "22.2.2",
			type: AthTableComponent,
			isStandalone: true,
			selector: "ath-table",
			inputs: { flush: {
				classPropertyName: "flush",
				publicName: "flush",
				isSignal: true,
				isRequired: false,
				transformFunction: null
			} },
			ngImport: i0,
			template: "<div class=\"ath-table\" [class.ath-table--flush]=\"flush()\">\n  <table class=\"ath-table__table\">\n    <ng-content />\n  </table>\n</div>\n",
			styles: [".ath-table{width:100%;overflow-x:auto;border:1px solid var(--border);border-radius:var(--panel-radius);background:var(--surface)}.ath-table__table{width:100%;border-collapse:collapse;font-size:var(--text-base);table-layout:auto}.ath-table__table thead th{text-align:left;height:var(--table-head-h);padding:0 var(--panel-pad-x);color:var(--fg-3);font-weight:var(--weight-normal);font-size:var(--table-head-size);letter-spacing:0;border-bottom:1px solid var(--border-faint);white-space:nowrap;background:var(--table-head-bg)}.ath-table__table thead th:first-child{padding-left:var(--panel-pad-x)}.ath-table__table thead th:last-child{padding-right:var(--panel-pad-x);text-align:right}.ath-table__table tbody tr{border-bottom:1px solid var(--border-faint);transition:background-color .15s ease}.ath-table__table tbody tr:last-child{border-bottom:none}.ath-table__table tbody tr:hover{background-color:var(--hover)}.ath-table__table tbody td{height:var(--row-h);padding:0 var(--panel-pad-x);color:var(--fg);vertical-align:middle;line-height:1.4}.ath-table__table tbody td:first-child{padding-left:var(--panel-pad-x)}.ath-table__table tbody td:last-child{padding-right:var(--panel-pad-x);text-align:right}.ath-table__table tbody td code{font-family:var(--font-mono);font-size:var(--text-xs);color:var(--fg-2)}.ath-table--flush{border:0;border-block:1px solid var(--border-faint);border-radius:0;background:transparent}.ath-table--flush .ath-table__table thead th{background:transparent}.ath-table--flush .ath-table__table :is(thead th,tbody td){padding-inline:var(--space-3)}.ath-table--flush .ath-table__table :is(thead th,tbody td):first-child{padding-left:var(--space-1)}.ath-table--flush .ath-table__table :is(thead th,tbody td):last-child{padding-right:var(--space-1)}.ath-table__table td .ath-toggle{width:auto;padding:0;border:none;background:transparent;gap:0}.ath-table__table td .ath-toggle:hover:not(.ath-toggle--disabled){background:transparent;border:none}.ath-table__table td .ath-toggle.ath-toggle--checked{background:transparent;border:none}.ath-table__table td .ath-toggle .ath-toggle__content{display:none}\n"],
			changeDetection: i0.ChangeDetectionStrategy.OnPush,
			encapsulation: i0.ViewEncapsulation.None
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthTableComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-table",
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None,
			template: "<div class=\"ath-table\" [class.ath-table--flush]=\"flush()\">\n  <table class=\"ath-table__table\">\n    <ng-content />\n  </table>\n</div>\n",
			styles: [".ath-table{width:100%;overflow-x:auto;border:1px solid var(--border);border-radius:var(--panel-radius);background:var(--surface)}.ath-table__table{width:100%;border-collapse:collapse;font-size:var(--text-base);table-layout:auto}.ath-table__table thead th{text-align:left;height:var(--table-head-h);padding:0 var(--panel-pad-x);color:var(--fg-3);font-weight:var(--weight-normal);font-size:var(--table-head-size);letter-spacing:0;border-bottom:1px solid var(--border-faint);white-space:nowrap;background:var(--table-head-bg)}.ath-table__table thead th:first-child{padding-left:var(--panel-pad-x)}.ath-table__table thead th:last-child{padding-right:var(--panel-pad-x);text-align:right}.ath-table__table tbody tr{border-bottom:1px solid var(--border-faint);transition:background-color .15s ease}.ath-table__table tbody tr:last-child{border-bottom:none}.ath-table__table tbody tr:hover{background-color:var(--hover)}.ath-table__table tbody td{height:var(--row-h);padding:0 var(--panel-pad-x);color:var(--fg);vertical-align:middle;line-height:1.4}.ath-table__table tbody td:first-child{padding-left:var(--panel-pad-x)}.ath-table__table tbody td:last-child{padding-right:var(--panel-pad-x);text-align:right}.ath-table__table tbody td code{font-family:var(--font-mono);font-size:var(--text-xs);color:var(--fg-2)}.ath-table--flush{border:0;border-block:1px solid var(--border-faint);border-radius:0;background:transparent}.ath-table--flush .ath-table__table thead th{background:transparent}.ath-table--flush .ath-table__table :is(thead th,tbody td){padding-inline:var(--space-3)}.ath-table--flush .ath-table__table :is(thead th,tbody td):first-child{padding-left:var(--space-1)}.ath-table--flush .ath-table__table :is(thead th,tbody td):last-child{padding-right:var(--space-1)}.ath-table__table td .ath-toggle{width:auto;padding:0;border:none;background:transparent;gap:0}.ath-table__table td .ath-toggle:hover:not(.ath-toggle--disabled){background:transparent;border:none}.ath-table__table td .ath-toggle.ath-toggle--checked{background:transparent;border:none}.ath-table__table td .ath-toggle .ath-toggle__content{display:none}\n"]
		}]
	}],
	propDecorators: { flush: [{
		type: i0.Input,
		args: [{
			isSignal: true,
			alias: "flush",
			required: false
		}]
	}] }
});
var AthBadgeComponent = class AthBadgeComponent {
	constructor() {
		this.variant = input("default", ...ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []);
		this.dot = input(false, {
			...ngDevMode ? { debugName: "dot" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.badgeClasses = computed(() => [
			"ath-badge",
			`ath-badge--${this.variant()}`,
			this.dot() ? "ath-badge--dot" : ""
		].filter(Boolean).join(" "), ...ngDevMode ? [{ debugName: "badgeClasses" }] : /* istanbul ignore next */ []);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthBadgeComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthBadgeComponent,
			isStandalone: true,
			selector: "ath-badge",
			inputs: {
				variant: {
					classPropertyName: "variant",
					publicName: "variant",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				dot: {
					classPropertyName: "dot",
					publicName: "dot",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			ngImport: i0,
			template: "<span [class]=\"badgeClasses()\">\n  @if (dot()) {\n    <span class=\"ath-badge__dot\"></span>\n  }\n  <ng-content />\n</span>\n",
			styles: [".ath-badge{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:var(--weight-semibold);line-height:1;white-space:nowrap;padding:4px 10px;border-radius:var(--r-full);letter-spacing:.2px}.ath-badge__dot{width:6px;height:6px;border-radius:var(--r-full);flex-shrink:0}.ath-badge--default{color:var(--fg-2);background:var(--bg-2)}.ath-badge--default .ath-badge__dot{background:var(--fg-3)}.ath-badge--success{color:var(--green-text);background:var(--green-tint)}.ath-badge--success .ath-badge__dot{background:var(--green)}.ath-badge--warning{color:var(--amber-text);background:var(--amber-tint)}.ath-badge--warning .ath-badge__dot{background:var(--amber)}.ath-badge--error{color:var(--red-text);background:var(--red-tint)}.ath-badge--error .ath-badge__dot{background:var(--red)}.ath-badge--info{color:var(--blue-text);background:var(--blue-tint)}.ath-badge--info .ath-badge__dot{background:var(--blue)}.ath-badge--muted{color:var(--fg-3);background:var(--hover)}.ath-badge--muted .ath-badge__dot{background:var(--fg-4)}\n"],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthBadgeComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-badge",
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: "<span [class]=\"badgeClasses()\">\n  @if (dot()) {\n    <span class=\"ath-badge__dot\"></span>\n  }\n  <ng-content />\n</span>\n",
			styles: [".ath-badge{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:var(--weight-semibold);line-height:1;white-space:nowrap;padding:4px 10px;border-radius:var(--r-full);letter-spacing:.2px}.ath-badge__dot{width:6px;height:6px;border-radius:var(--r-full);flex-shrink:0}.ath-badge--default{color:var(--fg-2);background:var(--bg-2)}.ath-badge--default .ath-badge__dot{background:var(--fg-3)}.ath-badge--success{color:var(--green-text);background:var(--green-tint)}.ath-badge--success .ath-badge__dot{background:var(--green)}.ath-badge--warning{color:var(--amber-text);background:var(--amber-tint)}.ath-badge--warning .ath-badge__dot{background:var(--amber)}.ath-badge--error{color:var(--red-text);background:var(--red-tint)}.ath-badge--error .ath-badge__dot{background:var(--red)}.ath-badge--info{color:var(--blue-text);background:var(--blue-tint)}.ath-badge--info .ath-badge__dot{background:var(--blue)}.ath-badge--muted{color:var(--fg-3);background:var(--hover)}.ath-badge--muted .ath-badge__dot{background:var(--fg-4)}\n"]
		}]
	}],
	propDecorators: {
		variant: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "variant",
				required: false
			}]
		}],
		dot: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "dot",
				required: false
			}]
		}]
	}
});
const SHOW_DELAY = 300;
const HIDE_DELAY = 100;
let nextTooltipId = 0;
var AthTooltipDirective = class AthTooltipDirective {
	constructor() {
		this.text = input("", {
			...ngDevMode ? { debugName: "text" } : /* istanbul ignore next */ {},
			alias: "athTooltip"
		});
		this.tooltipPosition = input("top", ...ngDevMode ? [{ debugName: "tooltipPosition" }] : /* istanbul ignore next */ []);
		this.el = inject(ElementRef);
		this.renderer = inject(Renderer2);
		this.tooltipId = `ath-tooltip-${++nextTooltipId}`;
		this.tooltipElement = null;
		this.float = null;
		this.showTimeout = null;
		this.hideTimeout = null;
		this.hovered = false;
		this.focused = false;
		this.listeners = [];
		this.unlistenEscape = null;
		const host = this.el.nativeElement;
		const on = (type, fn) => {
			this.listeners.push(this.renderer.listen(host, type, fn));
		};
		on("mouseenter", () => {
			this.hovered = true;
			this.show(SHOW_DELAY);
		});
		on("mouseleave", () => {
			this.hovered = false;
			this.hide();
		});
		on("focusin", (event) => {
			if (!isKeyboardFocus(event.target)) return;
			this.focused = true;
			this.show(0);
		});
		on("focusout", (event) => {
			const next = event.relatedTarget;
			if (next instanceof Node && host.contains(next)) return;
			this.focused = false;
			this.hide();
		});
		effect(() => {
			const text = this.text();
			untracked(() => {
				if (!this.tooltipElement) return;
				if (!text) {
					this.removeTooltip();
					return;
				}
				this.tooltipElement.textContent = text;
				this.float?.update();
			});
		});
	}
	ngOnDestroy() {
		this.clearTimers();
		this.removeTooltip();
		for (const off of this.listeners.splice(0)) off();
	}
	show(delay) {
		if (!this.text()) return;
		if (this.hideTimeout) {
			clearTimeout(this.hideTimeout);
			this.hideTimeout = null;
		}
		if (this.tooltipElement) return;
		if (delay === 0) {
			this.clearTimers();
			this.createTooltip();
			return;
		}
		if (this.showTimeout) return;
		this.showTimeout = setTimeout(() => {
			this.showTimeout = null;
			this.createTooltip();
		}, delay);
	}
	hide() {
		if (this.hovered || this.focused) return;
		if (this.showTimeout) {
			clearTimeout(this.showTimeout);
			this.showTimeout = null;
		}
		if (!this.tooltipElement || this.hideTimeout) return;
		this.hideTimeout = setTimeout(() => {
			this.hideTimeout = null;
			this.removeTooltip();
		}, HIDE_DELAY);
	}
	clearTimers() {
		if (this.showTimeout) clearTimeout(this.showTimeout);
		if (this.hideTimeout) clearTimeout(this.hideTimeout);
		this.showTimeout = null;
		this.hideTimeout = null;
	}
	createTooltip() {
		const host = this.el.nativeElement;
		if (this.tooltipElement || !this.text() || !host.isConnected) return;
		const tooltip = this.renderer.createElement("div");
		this.tooltipElement = tooltip;
		this.renderer.addClass(tooltip, "ath-tooltip");
		this.renderer.addClass(tooltip, `ath-tooltip--${this.tooltipPosition()}`);
		this.renderer.setAttribute(tooltip, "role", "tooltip");
		this.renderer.setAttribute(tooltip, "id", this.tooltipId);
		tooltip.textContent = this.text();
		const container = host.closest("dialog") ?? host.ownerDocument.body;
		this.renderer.appendChild(container, tooltip);
		const position = this.tooltipPosition();
		this.float = floatPanel(tooltip, host, {
			side: position,
			align: "center",
			offset: 8
		});
		tooltip.style.zIndex = "";
		this.setDescribedBy(true);
		this.unlistenEscape = this.renderer.listen(host.ownerDocument, "keydown", (event) => {
			if (event.key !== "Escape") return;
			this.clearTimers();
			this.removeTooltip();
		});
		requestAnimationFrame(() => {
			if (this.tooltipElement === tooltip) this.renderer.addClass(tooltip, "ath-tooltip--visible");
		});
	}
	removeTooltip() {
		this.unlistenEscape?.();
		this.unlistenEscape = null;
		this.float?.();
		this.float = null;
		if (this.tooltipElement) {
			this.tooltipElement.remove();
			this.tooltipElement = null;
			this.setDescribedBy(false);
		}
	}
	setDescribedBy(on) {
		const host = this.el.nativeElement;
		const ids = (host.getAttribute("aria-describedby") ?? "").split(/\s+/).filter((id) => id && id !== this.tooltipId);
		if (on) ids.push(this.tooltipId);
		if (ids.length) host.setAttribute("aria-describedby", ids.join(" "));
		else host.removeAttribute("aria-describedby");
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthTooltipDirective,
			deps: [],
			target: i0.ɵɵFactoryTarget.Directive
		});
	}
	static {
		this.ɵdir = i0.ɵɵngDeclareDirective({
			minVersion: "17.1.0",
			version: "22.2.2",
			type: AthTooltipDirective,
			isStandalone: true,
			selector: "[athTooltip]",
			inputs: {
				text: {
					classPropertyName: "text",
					publicName: "athTooltip",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				tooltipPosition: {
					classPropertyName: "tooltipPosition",
					publicName: "tooltipPosition",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			ngImport: i0
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthTooltipDirective,
	decorators: [{
		type: Directive,
		args: [{ selector: "[athTooltip]" }]
	}],
	ctorParameters: () => [],
	propDecorators: {
		text: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "athTooltip",
				required: false
			}]
		}],
		tooltipPosition: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "tooltipPosition",
				required: false
			}]
		}]
	}
});
function isKeyboardFocus(target) {
	if (!(target instanceof Element)) return false;
	try {
		return target.matches(":focus-visible");
	} catch {
		return true;
	}
}
var AthChipComponent = class AthChipComponent {
	constructor() {
		this.labels = injectAthLabels();
		this.kind = input("tag", ...ngDevMode ? [{ debugName: "kind" }] : /* istanbul ignore next */ []);
		this.variant = input("default", ...ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []);
		this.shape = input("pill", ...ngDevMode ? [{ debugName: "shape" }] : /* istanbul ignore next */ []);
		this.color = input(null, ...ngDevMode ? [{ debugName: "color" }] : /* istanbul ignore next */ []);
		this.icon = input(null, ...ngDevMode ? [{ debugName: "icon" }] : /* istanbul ignore next */ []);
		this.count = input(null, ...ngDevMode ? [{ debugName: "count" }] : /* istanbul ignore next */ []);
		this.tooltip = input(null, ...ngDevMode ? [{ debugName: "tooltip" }] : /* istanbul ignore next */ []);
		this.muted = input(false, ...ngDevMode ? [{ debugName: "muted" }] : /* istanbul ignore next */ []);
		this.removable = input(false, ...ngDevMode ? [{ debugName: "removable" }] : /* istanbul ignore next */ []);
		this.removeLabel = input(null, ...ngDevMode ? [{ debugName: "removeLabel" }] : /* istanbul ignore next */ []);
		this.name = input(null, ...ngDevMode ? [{ debugName: "name" }] : /* istanbul ignore next */ []);
		this.removed = output();
		this.removeIcon = X;
		this.glyph = computed(() => {
			const icon = this.icon();
			if (icon) return icon;
			return this.kind() === "epic" ? Zap : null;
		}, ...ngDevMode ? [{ debugName: "glyph" }] : /* istanbul ignore next */ []);
		this.countText = computed(() => `+${Math.max(0, this.count() ?? 0)}`, ...ngDevMode ? [{ debugName: "countText" }] : /* istanbul ignore next */ []);
		this.countLabel = computed(() => {
			const more = formatAthLabel(this.labels.moreCount(), { count: Math.max(0, this.count() ?? 0) });
			const names = this.tooltip();
			return names ? `${more}: ${names}` : more;
		}, ...ngDevMode ? [{ debugName: "countLabel" }] : /* istanbul ignore next */ []);
		this.resolvedRemoveLabel = computed(() => this.removeLabel() ?? formatAthLabel(this.labels.removeItem(), { name: this.name() ?? this.tooltip() ?? "" }).trim(), ...ngDevMode ? [{ debugName: "resolvedRemoveLabel" }] : /* istanbul ignore next */ []);
	}
	remove(event) {
		event.stopPropagation();
		this.removed.emit();
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthChipComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthChipComponent,
			isStandalone: true,
			selector: "ath-chip",
			inputs: {
				kind: {
					classPropertyName: "kind",
					publicName: "kind",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				variant: {
					classPropertyName: "variant",
					publicName: "variant",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				shape: {
					classPropertyName: "shape",
					publicName: "shape",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				color: {
					classPropertyName: "color",
					publicName: "color",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				icon: {
					classPropertyName: "icon",
					publicName: "icon",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				count: {
					classPropertyName: "count",
					publicName: "count",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				tooltip: {
					classPropertyName: "tooltip",
					publicName: "tooltip",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				muted: {
					classPropertyName: "muted",
					publicName: "muted",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				removable: {
					classPropertyName: "removable",
					publicName: "removable",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				removeLabel: {
					classPropertyName: "removeLabel",
					publicName: "removeLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				name: {
					classPropertyName: "name",
					publicName: "name",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			outputs: { removed: "removed" },
			ngImport: i0,
			template: "@switch (kind()) {\n  @case ('count') {\n    <span\n      class=\"ath-chip\"\n      data-kind=\"count\"\n      role=\"img\"\n      [attr.aria-label]=\"countLabel()\"\n      [athTooltip]=\"tooltip() ?? ''\"\n      >{{ countText() }}</span\n    >\n  }\n  @default {\n    <span\n      class=\"ath-chip\"\n      [attr.data-kind]=\"kind()\"\n      [attr.data-variant]=\"variant()\"\n      [attr.data-shape]=\"kind() === 'tag' && shape() === 'square' ? 'square' : null\"\n      [attr.data-muted]=\"muted() ? 'true' : null\"\n      [style.--_tint]=\"color() || null\"\n      [athTooltip]=\"tooltip() ?? ''\"\n    >\n      @if (kind() === 'type') {\n        <span class=\"ath-chip__square\" aria-hidden=\"true\">\n          @if (glyph()) {\n            <ath-icon [img]=\"glyph()!\" [size]=\"11\" [strokeWidth]=\"2.4\" />\n          }\n        </span>\n        @if (tooltip()) {\n          <span class=\"ath-chip__sr\">{{ tooltip() }}</span>\n        }\n      } @else if (glyph()) {\n        <ath-icon\n          class=\"ath-chip__glyph\"\n          [img]=\"glyph()!\"\n          [size]=\"11\"\n          [strokeWidth]=\"2.4\"\n          aria-hidden=\"true\"\n        />\n      } @else if (kind() === 'label' || kind() === 'status') {\n        <span class=\"ath-chip__dot\" aria-hidden=\"true\"></span>\n      }\n      <span class=\"ath-chip__text\"><ng-content /></span>\n      @if (removable()) {\n        <button\n          type=\"button\"\n          class=\"ath-chip__remove\"\n          [attr.aria-label]=\"resolvedRemoveLabel()\"\n          (click)=\"remove($event)\"\n        >\n          <ath-icon [img]=\"removeIcon\" [size]=\"11\" aria-hidden=\"true\" />\n        </button>\n      }\n    </span>\n  }\n}\n",
			styles: [":host{display:inline-flex;max-width:100%;min-width:0;vertical-align:middle}.ath-chip{--_tint: var(--fg-3);display:inline-flex;align-items:center;gap:var(--space-1);box-sizing:border-box;height:var(--chip-h);min-width:0;padding:0 var(--space-2);border:1px solid var(--border);border-radius:var(--r-full);background:var(--surface-2);color:var(--fg-2);font-size:var(--chip-font);font-weight:var(--weight-normal);line-height:1;white-space:nowrap}.ath-chip[data-kind=tag]{font-weight:var(--weight-medium)}.ath-chip[data-kind=tag][data-variant=primary]{border-color:var(--chip-primary-border);background:var(--chip-primary-bg);color:var(--chip-primary-fg)}.ath-chip[data-kind=tag][data-shape=square]{border-color:var(--border-faint);border-radius:var(--r-xs);background:var(--bg-2)}.ath-chip[data-kind=tag][data-variant=success],.ath-chip[data-kind=status][data-variant=success]{--_tint: var(--green);border-color:color-mix(in srgb,var(--green) 30%,transparent);background:var(--green-tint);color:var(--green-text)}.ath-chip[data-kind=tag][data-variant=warning],.ath-chip[data-kind=status][data-variant=warning]{--_tint: var(--amber);border-color:color-mix(in srgb,var(--amber) 30%,transparent);background:var(--amber-tint);color:var(--amber-text)}.ath-chip[data-kind=tag][data-variant=error],.ath-chip[data-kind=status][data-variant=error]{--_tint: var(--red);border-color:color-mix(in srgb,var(--red) 30%,transparent);background:var(--red-tint);color:var(--red-text)}.ath-chip[data-kind=tag][data-variant=info],.ath-chip[data-kind=status][data-variant=info]{--_tint: var(--blue);border-color:color-mix(in srgb,var(--blue) 30%,transparent);background:var(--blue-tint);color:var(--blue-text)}.ath-chip[data-kind=epic]{--_tint: var(--purple);max-width:180px;border-radius:var(--r-sm);background:transparent;font-weight:var(--weight-medium)}.ath-chip[data-kind=type]{padding:0 var(--space-2) 0 2px;border-radius:var(--r-sm);background:transparent}.ath-chip[data-kind=type]:has(.ath-chip__text:empty){padding:0;border:0}.ath-chip[data-kind=count]{padding:0 6px;border-color:transparent;background:var(--bg-2);color:var(--fg-3);font-family:var(--font-mono);font-variant-numeric:tabular-nums;cursor:default}.ath-chip__dot{flex-shrink:0;width:6px;height:6px;border-radius:var(--r-full);background:var(--_tint)}.ath-chip__glyph{flex-shrink:0;color:var(--_tint)}.ath-chip__square{display:inline-grid;flex-shrink:0;place-items:center;width:16px;height:16px;border-radius:var(--r-xs);background:var(--_tint);color:var(--chip-type-fg)}.ath-chip[data-muted=true] .ath-chip__square{background:transparent;color:var(--fg-4)}.ath-chip__text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ath-chip__text:empty{display:none}.ath-chip__sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.ath-chip__remove{display:inline-flex;align-items:center;justify-content:center;margin-right:-3px;padding:0;border:0;border-radius:var(--r-full);background:none;color:var(--fg-4);cursor:pointer;transition:color var(--t-fast)}.ath-chip__remove:hover,.ath-chip__remove:focus-visible{color:var(--red)}.ath-chip__remove:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}\n"],
			dependencies: [{
				kind: "component",
				type: AthIconComponent,
				selector: "ath-icon",
				inputs: [
					"img",
					"size",
					"strokeWidth",
					"color",
					"absoluteStrokeWidth",
					"class"
				]
			}, {
				kind: "directive",
				type: AthTooltipDirective,
				selector: "[athTooltip]",
				inputs: ["athTooltip", "tooltipPosition"]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthChipComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-chip",
			imports: [AthIconComponent, AthTooltipDirective],
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: "@switch (kind()) {\n  @case ('count') {\n    <span\n      class=\"ath-chip\"\n      data-kind=\"count\"\n      role=\"img\"\n      [attr.aria-label]=\"countLabel()\"\n      [athTooltip]=\"tooltip() ?? ''\"\n      >{{ countText() }}</span\n    >\n  }\n  @default {\n    <span\n      class=\"ath-chip\"\n      [attr.data-kind]=\"kind()\"\n      [attr.data-variant]=\"variant()\"\n      [attr.data-shape]=\"kind() === 'tag' && shape() === 'square' ? 'square' : null\"\n      [attr.data-muted]=\"muted() ? 'true' : null\"\n      [style.--_tint]=\"color() || null\"\n      [athTooltip]=\"tooltip() ?? ''\"\n    >\n      @if (kind() === 'type') {\n        <span class=\"ath-chip__square\" aria-hidden=\"true\">\n          @if (glyph()) {\n            <ath-icon [img]=\"glyph()!\" [size]=\"11\" [strokeWidth]=\"2.4\" />\n          }\n        </span>\n        @if (tooltip()) {\n          <span class=\"ath-chip__sr\">{{ tooltip() }}</span>\n        }\n      } @else if (glyph()) {\n        <ath-icon\n          class=\"ath-chip__glyph\"\n          [img]=\"glyph()!\"\n          [size]=\"11\"\n          [strokeWidth]=\"2.4\"\n          aria-hidden=\"true\"\n        />\n      } @else if (kind() === 'label' || kind() === 'status') {\n        <span class=\"ath-chip__dot\" aria-hidden=\"true\"></span>\n      }\n      <span class=\"ath-chip__text\"><ng-content /></span>\n      @if (removable()) {\n        <button\n          type=\"button\"\n          class=\"ath-chip__remove\"\n          [attr.aria-label]=\"resolvedRemoveLabel()\"\n          (click)=\"remove($event)\"\n        >\n          <ath-icon [img]=\"removeIcon\" [size]=\"11\" aria-hidden=\"true\" />\n        </button>\n      }\n    </span>\n  }\n}\n",
			styles: [":host{display:inline-flex;max-width:100%;min-width:0;vertical-align:middle}.ath-chip{--_tint: var(--fg-3);display:inline-flex;align-items:center;gap:var(--space-1);box-sizing:border-box;height:var(--chip-h);min-width:0;padding:0 var(--space-2);border:1px solid var(--border);border-radius:var(--r-full);background:var(--surface-2);color:var(--fg-2);font-size:var(--chip-font);font-weight:var(--weight-normal);line-height:1;white-space:nowrap}.ath-chip[data-kind=tag]{font-weight:var(--weight-medium)}.ath-chip[data-kind=tag][data-variant=primary]{border-color:var(--chip-primary-border);background:var(--chip-primary-bg);color:var(--chip-primary-fg)}.ath-chip[data-kind=tag][data-shape=square]{border-color:var(--border-faint);border-radius:var(--r-xs);background:var(--bg-2)}.ath-chip[data-kind=tag][data-variant=success],.ath-chip[data-kind=status][data-variant=success]{--_tint: var(--green);border-color:color-mix(in srgb,var(--green) 30%,transparent);background:var(--green-tint);color:var(--green-text)}.ath-chip[data-kind=tag][data-variant=warning],.ath-chip[data-kind=status][data-variant=warning]{--_tint: var(--amber);border-color:color-mix(in srgb,var(--amber) 30%,transparent);background:var(--amber-tint);color:var(--amber-text)}.ath-chip[data-kind=tag][data-variant=error],.ath-chip[data-kind=status][data-variant=error]{--_tint: var(--red);border-color:color-mix(in srgb,var(--red) 30%,transparent);background:var(--red-tint);color:var(--red-text)}.ath-chip[data-kind=tag][data-variant=info],.ath-chip[data-kind=status][data-variant=info]{--_tint: var(--blue);border-color:color-mix(in srgb,var(--blue) 30%,transparent);background:var(--blue-tint);color:var(--blue-text)}.ath-chip[data-kind=epic]{--_tint: var(--purple);max-width:180px;border-radius:var(--r-sm);background:transparent;font-weight:var(--weight-medium)}.ath-chip[data-kind=type]{padding:0 var(--space-2) 0 2px;border-radius:var(--r-sm);background:transparent}.ath-chip[data-kind=type]:has(.ath-chip__text:empty){padding:0;border:0}.ath-chip[data-kind=count]{padding:0 6px;border-color:transparent;background:var(--bg-2);color:var(--fg-3);font-family:var(--font-mono);font-variant-numeric:tabular-nums;cursor:default}.ath-chip__dot{flex-shrink:0;width:6px;height:6px;border-radius:var(--r-full);background:var(--_tint)}.ath-chip__glyph{flex-shrink:0;color:var(--_tint)}.ath-chip__square{display:inline-grid;flex-shrink:0;place-items:center;width:16px;height:16px;border-radius:var(--r-xs);background:var(--_tint);color:var(--chip-type-fg)}.ath-chip[data-muted=true] .ath-chip__square{background:transparent;color:var(--fg-4)}.ath-chip__text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ath-chip__text:empty{display:none}.ath-chip__sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.ath-chip__remove{display:inline-flex;align-items:center;justify-content:center;margin-right:-3px;padding:0;border:0;border-radius:var(--r-full);background:none;color:var(--fg-4);cursor:pointer;transition:color var(--t-fast)}.ath-chip__remove:hover,.ath-chip__remove:focus-visible{color:var(--red)}.ath-chip__remove:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}\n"]
		}]
	}],
	propDecorators: {
		kind: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "kind",
				required: false
			}]
		}],
		variant: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "variant",
				required: false
			}]
		}],
		shape: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "shape",
				required: false
			}]
		}],
		color: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "color",
				required: false
			}]
		}],
		icon: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "icon",
				required: false
			}]
		}],
		count: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "count",
				required: false
			}]
		}],
		tooltip: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "tooltip",
				required: false
			}]
		}],
		muted: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "muted",
				required: false
			}]
		}],
		removable: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "removable",
				required: false
			}]
		}],
		removeLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "removeLabel",
				required: false
			}]
		}],
		name: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "name",
				required: false
			}]
		}],
		removed: [{
			type: i0.Output,
			args: ["removed"]
		}]
	}
});
var AthAvatarStackComponent = class AthAvatarStackComponent {
	constructor() {
		this.users = input([], {
			...ngDevMode ? { debugName: "users" } : /* istanbul ignore next */ {},
			transform: (value) => value ?? []
		});
		this.max = input(4, {
			...ngDevMode ? { debugName: "max" } : /* istanbul ignore next */ {},
			transform: numberAttribute
		});
		this.size = input("sm", ...ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []);
		this.visible = computed(() => this.users().slice(0, this.max()), ...ngDevMode ? [{ debugName: "visible" }] : /* istanbul ignore next */ []);
		this.overflowCount = computed(() => {
			const total = this.users().length;
			const max = this.max();
			return total > max ? total - max : 0;
		}, ...ngDevMode ? [{ debugName: "overflowCount" }] : /* istanbul ignore next */ []);
		this.trackById = (_, user) => user.id;
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthAvatarStackComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthAvatarStackComponent,
			isStandalone: true,
			selector: "ath-avatar-stack",
			inputs: {
				users: {
					classPropertyName: "users",
					publicName: "users",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				max: {
					classPropertyName: "max",
					publicName: "max",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				size: {
					classPropertyName: "size",
					publicName: "size",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			host: { properties: { "attr.data-size": "size()" } },
			ngImport: i0,
			template: "@for (user of visible(); track trackById($index, user)) {\n  <ath-avatar\n    [id]=\"user.id\"\n    [name]=\"user.name\"\n    [src]=\"user.src ?? ''\"\n    [size]=\"size()\"\n    class=\"ath-stack__item\"\n  />\n}\n@if (overflowCount() > 0) {\n  <span class=\"ath-stack__more\">+{{ overflowCount() }}</span>\n}\n",
			styles: [":host{display:inline-flex;align-items:center;--_overlap: -6px}:host([data-size=xs]),:host([data-size=sm]){--_overlap: -4px}.ath-stack__item{display:inline-flex}.ath-stack__item+.ath-stack__item,.ath-stack__item+.ath-stack__more{margin-inline-start:var(--_overlap)}:host ath-avatar,.ath-stack__more{position:relative;z-index:0}:host ath-avatar{border-radius:999px;box-shadow:0 0 0 2px var(--avatar-stack-ring)}.ath-stack__more{display:inline-flex;align-items:center;justify-content:center;margin-inline-start:var(--_overlap);border-radius:999px;background:var(--bg-3);color:var(--fg-2);font-family:var(--font-sans);font-weight:600;box-shadow:0 0 0 2px var(--avatar-stack-ring);letter-spacing:0}:host([data-size=sm]) .ath-stack__more{width:20px;height:20px;font-size:9px}:host([data-size=md]) .ath-stack__more{width:24px;height:24px;font-size:10px}:host([data-size=lg]) .ath-stack__more{width:36px;height:36px;font-size:12px}:host([data-size=xl]) .ath-stack__more{width:48px;height:48px;font-size:14px}\n"],
			dependencies: [{
				kind: "component",
				type: AthAvatarComponent,
				selector: "ath-avatar",
				inputs: [
					"person",
					"name",
					"src",
					"id",
					"size",
					"unassigned",
					"label",
					"ring"
				]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthAvatarStackComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-avatar-stack",
			imports: [AthAvatarComponent],
			changeDetection: ChangeDetectionStrategy.OnPush,
			host: { "[attr.data-size]": "size()" },
			template: "@for (user of visible(); track trackById($index, user)) {\n  <ath-avatar\n    [id]=\"user.id\"\n    [name]=\"user.name\"\n    [src]=\"user.src ?? ''\"\n    [size]=\"size()\"\n    class=\"ath-stack__item\"\n  />\n}\n@if (overflowCount() > 0) {\n  <span class=\"ath-stack__more\">+{{ overflowCount() }}</span>\n}\n",
			styles: [":host{display:inline-flex;align-items:center;--_overlap: -6px}:host([data-size=xs]),:host([data-size=sm]){--_overlap: -4px}.ath-stack__item{display:inline-flex}.ath-stack__item+.ath-stack__item,.ath-stack__item+.ath-stack__more{margin-inline-start:var(--_overlap)}:host ath-avatar,.ath-stack__more{position:relative;z-index:0}:host ath-avatar{border-radius:999px;box-shadow:0 0 0 2px var(--avatar-stack-ring)}.ath-stack__more{display:inline-flex;align-items:center;justify-content:center;margin-inline-start:var(--_overlap);border-radius:999px;background:var(--bg-3);color:var(--fg-2);font-family:var(--font-sans);font-weight:600;box-shadow:0 0 0 2px var(--avatar-stack-ring);letter-spacing:0}:host([data-size=sm]) .ath-stack__more{width:20px;height:20px;font-size:9px}:host([data-size=md]) .ath-stack__more{width:24px;height:24px;font-size:10px}:host([data-size=lg]) .ath-stack__more{width:36px;height:36px;font-size:12px}:host([data-size=xl]) .ath-stack__more{width:48px;height:48px;font-size:14px}\n"]
		}]
	}],
	propDecorators: {
		users: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "users",
				required: false
			}]
		}],
		max: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "max",
				required: false
			}]
		}],
		size: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "size",
				required: false
			}]
		}]
	}
});
function runAthAction(action) {
	return new Promise((resolve) => {
		const result = action();
		resolve(isObservable(result) ? firstValueFrom(result, { defaultValue: void 0 }) : result);
	});
}
var AthButtonComponent = class AthButtonComponent {
	constructor() {
		this.errorHandler = inject(ErrorHandler);
		this.destroyed = false;
		this.variant = input("primary", ...ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []);
		this.size = input("md", ...ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []);
		this.type = input("button", ...ngDevMode ? [{ debugName: "type" }] : /* istanbul ignore next */ []);
		this.disabled = input(false, ...ngDevMode ? [{ debugName: "disabled" }] : /* istanbul ignore next */ []);
		this.loading = input(false, ...ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []);
		this.fullWidth = input(false, ...ngDevMode ? [{ debugName: "fullWidth" }] : /* istanbul ignore next */ []);
		this.pressed = input(null, ...ngDevMode ? [{ debugName: "pressed" }] : /* istanbul ignore next */ []);
		this.expanded = input(null, ...ngDevMode ? [{ debugName: "expanded" }] : /* istanbul ignore next */ []);
		this.controls = input(null, ...ngDevMode ? [{ debugName: "controls" }] : /* istanbul ignore next */ []);
		this.ariaLabel = input(null, ...ngDevMode ? [{ debugName: "ariaLabel" }] : /* istanbul ignore next */ []);
		this.action = input(null, ...ngDevMode ? [{ debugName: "action" }] : /* istanbul ignore next */ []);
		this.clicked = output();
		this.done = output();
		this.failed = output();
		this.running = signal(false, ...ngDevMode ? [{ debugName: "running" }] : /* istanbul ignore next */ []);
		this.busy = computed(() => this.running() || this.loading(), ...ngDevMode ? [{ debugName: "busy" }] : /* istanbul ignore next */ []);
		this.loaderIcon = Loader2;
		this.buttonClasses = computed(() => [
			"ath-button",
			`ath-button--${this.variant()}`,
			`ath-button--${this.size()}`,
			this.fullWidth() ? "ath-button--full-width" : "",
			this.busy() ? "ath-button--loading" : "",
			this.pressed() ? "ath-button--pressed" : ""
		].filter(Boolean).join(" "), ...ngDevMode ? [{ debugName: "buttonClasses" }] : /* istanbul ignore next */ []);
		inject(DestroyRef).onDestroy(() => this.destroyed = true);
	}
	handleClick(event) {
		if (this.disabled() || this.busy()) {
			event.preventDefault();
			event.stopImmediatePropagation();
			return;
		}
		this.clicked.emit(event);
		const action = this.action();
		if (!action) return;
		this.running.set(true);
		runAthAction(action).then((value) => {
			if (this.destroyed) return;
			this.running.set(false);
			this.done.emit(value);
		}, (err) => {
			if (!this.destroyed) {
				this.running.set(false);
				this.failed.emit(err);
			}
			this.errorHandler.handleError(err);
		});
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthButtonComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthButtonComponent,
			isStandalone: true,
			selector: "ath-button",
			inputs: {
				variant: {
					classPropertyName: "variant",
					publicName: "variant",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				size: {
					classPropertyName: "size",
					publicName: "size",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				type: {
					classPropertyName: "type",
					publicName: "type",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				disabled: {
					classPropertyName: "disabled",
					publicName: "disabled",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				loading: {
					classPropertyName: "loading",
					publicName: "loading",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				fullWidth: {
					classPropertyName: "fullWidth",
					publicName: "fullWidth",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				pressed: {
					classPropertyName: "pressed",
					publicName: "pressed",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				expanded: {
					classPropertyName: "expanded",
					publicName: "expanded",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				controls: {
					classPropertyName: "controls",
					publicName: "controls",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				ariaLabel: {
					classPropertyName: "ariaLabel",
					publicName: "ariaLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				action: {
					classPropertyName: "action",
					publicName: "action",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			outputs: {
				clicked: "clicked",
				done: "done",
				failed: "failed"
			},
			ngImport: i0,
			template: "<button\n  [type]=\"type()\"\n  [disabled]=\"disabled()\"\n  [attr.aria-disabled]=\"busy() && !disabled() ? 'true' : null\"\n  [class]=\"buttonClasses()\"\n  [attr.aria-label]=\"ariaLabel()\"\n  [attr.aria-busy]=\"busy()\"\n  [attr.aria-pressed]=\"pressed()\"\n  [attr.aria-expanded]=\"expanded()\"\n  [attr.aria-controls]=\"controls()\"\n  (click)=\"handleClick($event)\"\n>\n  @if (busy()) {\n    <span class=\"ath-button__loader-wrap\">\n      <ath-icon [img]=\"loaderIcon\" class=\"ath-button__loader\" [size]=\"18\" aria-hidden=\"true\" />\n    </span>\n  }\n  <span class=\"ath-button__content\" [class.ath-button__content--hidden]=\"busy()\">\n    <ng-content />\n  </span>\n</button>\n",
			styles: [".ath-button{display:inline-grid;place-items:center;position:relative;grid-template-columns:1fr;grid-template-rows:1fr;font-family:var(--font-sans);font-weight:var(--weight-medium);border-radius:var(--r);border:1px solid transparent;cursor:pointer;white-space:nowrap;letter-spacing:0;transition:background-color .15s ease,border-color .15s ease,color .15s ease,box-shadow .15s ease,opacity .15s ease}.ath-button:focus-visible{outline:none;box-shadow:0 0 0 2px var(--bg-0),0 0 0 4px var(--accent)}.ath-button:disabled,.ath-button[aria-disabled=true]{opacity:.5;cursor:not-allowed}.ath-button--xs{height:var(--control-h-xs);padding:0 10px;font-size:var(--control-font);border-radius:var(--r-sm)}.ath-button--xs .ath-button__content{gap:5px}.ath-button--sm{height:var(--control-h-sm);padding:0 8px;font-size:var(--control-font);border-radius:var(--r-sm)}.ath-button--md{height:var(--control-h);padding:0 var(--space-3);font-size:var(--control-font)}.ath-button--lg{height:var(--control-h-lg);padding:0 var(--space-5);font-size:var(--text-md)}.ath-button--primary{background:var(--action-primary-bg);color:var(--action-primary-fg);border-color:var(--action-primary-bg);font-weight:var(--weight-medium)}.ath-button--primary:disabled:not(.ath-button--loading){background:var(--action-primary-disabled-bg);border-color:var(--action-primary-disabled-border);color:var(--action-primary-disabled-fg);opacity:var(--action-primary-disabled-opacity)}.ath-button--primary:hover:not(:disabled){background:var(--action-primary-bg-hover);border-color:var(--action-primary-bg-hover)}.ath-button--primary:active:not(:disabled){background:var(--action-primary-bg-active);border-color:var(--action-primary-bg-active)}.ath-button--primary .ath-button__loader-wrap{color:var(--action-primary-fg)}.ath-button--create{background:var(--action-create-bg);color:var(--action-create-fg);border-color:var(--action-create-border)}.ath-button--create:hover:not(:disabled){background:var(--action-create-bg-hover)}.ath-button--create:active:not(:disabled){background:var(--action-create-bg-active)}.ath-button--create .ath-button__loader-wrap{color:var(--action-create-fg)}.ath-button--secondary{background-color:var(--bg-1);color:var(--fg);border-color:var(--action-outline-border)}.ath-button--secondary:hover:not(:disabled){border-color:var(--border-strong);background-color:var(--bg-2)}.ath-button--outline{background-color:transparent;border-color:var(--action-outline-border);color:var(--action-outline-fg)}.ath-button--outline:disabled,.ath-button--outline[aria-disabled=true]{color:var(--fg-3);border-color:var(--border)}.ath-button--outline:hover:not(:disabled){background-color:var(--action-outline-hover-bg);border-color:var(--action-outline-hover-border)}.ath-button--ghost{background-color:transparent;color:var(--fg)}.ath-button--ghost:hover:not(:disabled){background-color:var(--hover)}.ath-button--danger{background-color:var(--action-danger-bg);color:var(--action-danger-fg);border-color:var(--action-danger-bg)}.ath-button--danger:hover:not(:disabled){background-color:var(--action-danger-bg-hover);border-color:var(--action-danger-bg-hover)}.ath-button--danger-ghost{background-color:transparent;color:var(--fg-3);border-color:transparent}.ath-button--danger-ghost:hover:not(:disabled){background-color:var(--red-tint);color:var(--red-text)}.ath-button--danger-ghost:active:not(:disabled){background-color:color-mix(in srgb,var(--red) 16%,transparent)}.ath-button--danger-ghost:focus-visible{box-shadow:0 0 0 2px var(--bg-0),0 0 0 4px var(--red)}.ath-button--full-width{width:100%}.ath-button--pressed:not(.ath-button--primary):not(.ath-button--create){background-color:var(--hover-strong);border-color:var(--action-outline-hover-border)}.ath-button--loading{pointer-events:none}.ath-button__loader-wrap{display:inline-flex;align-items:center;justify-content:center;grid-area:1/1}.ath-button__loader{animation:ath-spin 1s linear infinite}.ath-button__content{display:inline-flex;grid-area:1/1;align-items:center;gap:6px}.ath-button__content--hidden{opacity:0}@keyframes ath-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"],
			dependencies: [{
				kind: "component",
				type: AthIconComponent,
				selector: "ath-icon",
				inputs: [
					"img",
					"size",
					"strokeWidth",
					"color",
					"absoluteStrokeWidth",
					"class"
				]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthButtonComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-button",
			imports: [AthIconComponent],
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: "<button\n  [type]=\"type()\"\n  [disabled]=\"disabled()\"\n  [attr.aria-disabled]=\"busy() && !disabled() ? 'true' : null\"\n  [class]=\"buttonClasses()\"\n  [attr.aria-label]=\"ariaLabel()\"\n  [attr.aria-busy]=\"busy()\"\n  [attr.aria-pressed]=\"pressed()\"\n  [attr.aria-expanded]=\"expanded()\"\n  [attr.aria-controls]=\"controls()\"\n  (click)=\"handleClick($event)\"\n>\n  @if (busy()) {\n    <span class=\"ath-button__loader-wrap\">\n      <ath-icon [img]=\"loaderIcon\" class=\"ath-button__loader\" [size]=\"18\" aria-hidden=\"true\" />\n    </span>\n  }\n  <span class=\"ath-button__content\" [class.ath-button__content--hidden]=\"busy()\">\n    <ng-content />\n  </span>\n</button>\n",
			styles: [".ath-button{display:inline-grid;place-items:center;position:relative;grid-template-columns:1fr;grid-template-rows:1fr;font-family:var(--font-sans);font-weight:var(--weight-medium);border-radius:var(--r);border:1px solid transparent;cursor:pointer;white-space:nowrap;letter-spacing:0;transition:background-color .15s ease,border-color .15s ease,color .15s ease,box-shadow .15s ease,opacity .15s ease}.ath-button:focus-visible{outline:none;box-shadow:0 0 0 2px var(--bg-0),0 0 0 4px var(--accent)}.ath-button:disabled,.ath-button[aria-disabled=true]{opacity:.5;cursor:not-allowed}.ath-button--xs{height:var(--control-h-xs);padding:0 10px;font-size:var(--control-font);border-radius:var(--r-sm)}.ath-button--xs .ath-button__content{gap:5px}.ath-button--sm{height:var(--control-h-sm);padding:0 8px;font-size:var(--control-font);border-radius:var(--r-sm)}.ath-button--md{height:var(--control-h);padding:0 var(--space-3);font-size:var(--control-font)}.ath-button--lg{height:var(--control-h-lg);padding:0 var(--space-5);font-size:var(--text-md)}.ath-button--primary{background:var(--action-primary-bg);color:var(--action-primary-fg);border-color:var(--action-primary-bg);font-weight:var(--weight-medium)}.ath-button--primary:disabled:not(.ath-button--loading){background:var(--action-primary-disabled-bg);border-color:var(--action-primary-disabled-border);color:var(--action-primary-disabled-fg);opacity:var(--action-primary-disabled-opacity)}.ath-button--primary:hover:not(:disabled){background:var(--action-primary-bg-hover);border-color:var(--action-primary-bg-hover)}.ath-button--primary:active:not(:disabled){background:var(--action-primary-bg-active);border-color:var(--action-primary-bg-active)}.ath-button--primary .ath-button__loader-wrap{color:var(--action-primary-fg)}.ath-button--create{background:var(--action-create-bg);color:var(--action-create-fg);border-color:var(--action-create-border)}.ath-button--create:hover:not(:disabled){background:var(--action-create-bg-hover)}.ath-button--create:active:not(:disabled){background:var(--action-create-bg-active)}.ath-button--create .ath-button__loader-wrap{color:var(--action-create-fg)}.ath-button--secondary{background-color:var(--bg-1);color:var(--fg);border-color:var(--action-outline-border)}.ath-button--secondary:hover:not(:disabled){border-color:var(--border-strong);background-color:var(--bg-2)}.ath-button--outline{background-color:transparent;border-color:var(--action-outline-border);color:var(--action-outline-fg)}.ath-button--outline:disabled,.ath-button--outline[aria-disabled=true]{color:var(--fg-3);border-color:var(--border)}.ath-button--outline:hover:not(:disabled){background-color:var(--action-outline-hover-bg);border-color:var(--action-outline-hover-border)}.ath-button--ghost{background-color:transparent;color:var(--fg)}.ath-button--ghost:hover:not(:disabled){background-color:var(--hover)}.ath-button--danger{background-color:var(--action-danger-bg);color:var(--action-danger-fg);border-color:var(--action-danger-bg)}.ath-button--danger:hover:not(:disabled){background-color:var(--action-danger-bg-hover);border-color:var(--action-danger-bg-hover)}.ath-button--danger-ghost{background-color:transparent;color:var(--fg-3);border-color:transparent}.ath-button--danger-ghost:hover:not(:disabled){background-color:var(--red-tint);color:var(--red-text)}.ath-button--danger-ghost:active:not(:disabled){background-color:color-mix(in srgb,var(--red) 16%,transparent)}.ath-button--danger-ghost:focus-visible{box-shadow:0 0 0 2px var(--bg-0),0 0 0 4px var(--red)}.ath-button--full-width{width:100%}.ath-button--pressed:not(.ath-button--primary):not(.ath-button--create){background-color:var(--hover-strong);border-color:var(--action-outline-hover-border)}.ath-button--loading{pointer-events:none}.ath-button__loader-wrap{display:inline-flex;align-items:center;justify-content:center;grid-area:1/1}.ath-button__loader{animation:ath-spin 1s linear infinite}.ath-button__content{display:inline-flex;grid-area:1/1;align-items:center;gap:6px}.ath-button__content--hidden{opacity:0}@keyframes ath-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"]
		}]
	}],
	ctorParameters: () => [],
	propDecorators: {
		variant: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "variant",
				required: false
			}]
		}],
		size: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "size",
				required: false
			}]
		}],
		type: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "type",
				required: false
			}]
		}],
		disabled: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "disabled",
				required: false
			}]
		}],
		loading: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "loading",
				required: false
			}]
		}],
		fullWidth: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "fullWidth",
				required: false
			}]
		}],
		pressed: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "pressed",
				required: false
			}]
		}],
		expanded: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "expanded",
				required: false
			}]
		}],
		controls: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "controls",
				required: false
			}]
		}],
		ariaLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "ariaLabel",
				required: false
			}]
		}],
		action: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "action",
				required: false
			}]
		}],
		clicked: [{
			type: i0.Output,
			args: ["clicked"]
		}],
		done: [{
			type: i0.Output,
			args: ["done"]
		}],
		failed: [{
			type: i0.Output,
			args: ["failed"]
		}]
	}
});
var AthEmptyStateComponent = class AthEmptyStateComponent {
	constructor() {
		this.message = input.required(...ngDevMode ? [{ debugName: "message" }] : /* istanbul ignore next */ []);
		this.subMessage = input("", ...ngDevMode ? [{ debugName: "subMessage" }] : /* istanbul ignore next */ []);
		this.icon = input(null, ...ngDevMode ? [{ debugName: "icon" }] : /* istanbul ignore next */ []);
		this.bare = input(false, {
			...ngDevMode ? { debugName: "bare" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.size = input("default", ...ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []);
		this.hints = input([], ...ngDevMode ? [{ debugName: "hints" }] : /* istanbul ignore next */ []);
		this.actionLabel = input("", ...ngDevMode ? [{ debugName: "actionLabel" }] : /* istanbul ignore next */ []);
		this.actionIcon = input(null, ...ngDevMode ? [{ debugName: "actionIcon" }] : /* istanbul ignore next */ []);
		this.secondaryActionLabel = input("", ...ngDevMode ? [{ debugName: "secondaryActionLabel" }] : /* istanbul ignore next */ []);
		this.action = output();
		this.secondaryAction = output();
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthEmptyStateComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthEmptyStateComponent,
			isStandalone: true,
			selector: "ath-empty-state",
			inputs: {
				message: {
					classPropertyName: "message",
					publicName: "message",
					isSignal: true,
					isRequired: true,
					transformFunction: null
				},
				subMessage: {
					classPropertyName: "subMessage",
					publicName: "subMessage",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				icon: {
					classPropertyName: "icon",
					publicName: "icon",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				bare: {
					classPropertyName: "bare",
					publicName: "bare",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				size: {
					classPropertyName: "size",
					publicName: "size",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				hints: {
					classPropertyName: "hints",
					publicName: "hints",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				actionLabel: {
					classPropertyName: "actionLabel",
					publicName: "actionLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				actionIcon: {
					classPropertyName: "actionIcon",
					publicName: "actionIcon",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				secondaryActionLabel: {
					classPropertyName: "secondaryActionLabel",
					publicName: "secondaryActionLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			outputs: {
				action: "action",
				secondaryAction: "secondaryAction"
			},
			ngImport: i0,
			template: "@if (size() === 'compact') {\n  <div class=\"ath-empty-state ath-empty-state--compact\" [class.ath-empty-state--bare]=\"bare()\">\n    <div class=\"ath-empty-state__lead\">\n      @if (icon(); as icon) {\n        <span class=\"ath-empty-state__tile\" aria-hidden=\"true\">\n          <ath-icon [img]=\"icon\" [size]=\"16\" />\n        </span>\n      }\n      <div class=\"ath-empty-state__text\">\n        <p class=\"ath-empty-state__message\">{{ message() }}</p>\n        @if (subMessage()) {\n          <p class=\"ath-empty-state__sub\">{{ subMessage() }}</p>\n        }\n      </div>\n      @if (actionLabel() || secondaryActionLabel()) {\n        <div class=\"ath-empty-state__actions\">\n          @if (secondaryActionLabel()) {\n            <ath-button variant=\"secondary\" size=\"sm\" (clicked)=\"secondaryAction.emit()\">\n              {{ secondaryActionLabel() }}\n            </ath-button>\n          }\n          @if (actionLabel()) {\n            <ath-button variant=\"primary\" size=\"sm\" (clicked)=\"action.emit()\">\n              @if (actionIcon(); as actionIcon) {\n                <ath-icon [img]=\"actionIcon\" [size]=\"13\" />\n              }\n              {{ actionLabel() }}\n            </ath-button>\n          }\n        </div>\n      }\n    </div>\n    @if (hints().length > 0) {\n      <ul class=\"ath-empty-state__hints\">\n        @for (hint of hints(); track hint.label) {\n          <li class=\"ath-empty-state__hint\">\n            <span class=\"ath-empty-state__hint-icon\" aria-hidden=\"true\">\n              @if (hint.icon) {\n                <ath-icon [img]=\"hint.icon\" [size]=\"14\" />\n              }\n            </span>\n            <span class=\"ath-empty-state__hint-text\">\n              <span class=\"ath-empty-state__hint-label\">{{ hint.label }}</span>\n              @if (hint.sub) {\n                <span class=\"ath-empty-state__hint-sub\">{{ hint.sub }}</span>\n              }\n            </span>\n          </li>\n        }\n      </ul>\n    }\n    <ng-content />\n  </div>\n} @else {\n  <div class=\"ath-empty-state\" [class.ath-empty-state--bare]=\"bare()\">\n    @if (icon(); as icon) {\n      <span class=\"ath-empty-state__icon\">\n        <ath-icon [img]=\"icon\" [size]=\"18\" />\n      </span>\n    }\n    <p class=\"ath-empty-state__message\">{{ message() }}</p>\n    @if (subMessage()) {\n      <p class=\"ath-empty-state__sub\">{{ subMessage() }}</p>\n    }\n    @if (actionLabel() || secondaryActionLabel()) {\n      <div class=\"ath-empty-state__actions ath-empty-state__actions--center\">\n        @if (secondaryActionLabel()) {\n          <ath-button variant=\"secondary\" size=\"sm\" (clicked)=\"secondaryAction.emit()\">\n            {{ secondaryActionLabel() }}\n          </ath-button>\n        }\n        @if (actionLabel()) {\n          <ath-button variant=\"primary\" size=\"sm\" (clicked)=\"action.emit()\">\n            {{ actionLabel() }}\n          </ath-button>\n        }\n      </div>\n    }\n    <ng-content />\n  </div>\n}\n",
			styles: [".ath-empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--space-2);padding:var(--space-10) var(--space-6);text-align:center;border:1px dashed var(--border);border-radius:var(--r-lg);background:var(--surface)}.ath-empty-state--bare{border:0;background:transparent}.ath-empty-state__icon{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;margin-bottom:var(--space-1);border-radius:var(--r-full);background:var(--surface-3);color:var(--fg-3)}.ath-empty-state__message{margin:0;font-size:var(--text-md);font-weight:var(--weight-medium);color:var(--fg)}.ath-empty-state__sub{margin:0;max-width:44ch;font-size:var(--text-base);line-height:var(--line-normal);color:var(--fg-3)}.ath-empty-state--compact{display:flex;flex-direction:column;align-items:stretch;justify-content:flex-start;gap:var(--space-3);padding:var(--space-4);text-align:left}.ath-empty-state--compact .ath-empty-state__lead{display:flex;align-items:flex-start;gap:var(--space-3)}.ath-empty-state--compact .ath-empty-state__text{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:2px}.ath-empty-state--compact .ath-empty-state__message{font-size:var(--panel-title-size);font-weight:var(--weight-semibold)}.ath-empty-state--compact .ath-empty-state__sub{max-width:64ch;font-size:var(--control-font)}.ath-empty-state__tile{flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border:1px solid var(--border-faint);border-radius:var(--r);background:var(--bg-2);color:var(--fg-3)}.ath-empty-state__actions{flex-shrink:0;display:flex;align-items:center;gap:var(--space-2)}.ath-empty-state__actions--center{justify-content:center;margin-top:var(--space-2)}.ath-empty-state__hints{display:flex;flex-direction:column;margin:0;padding:0;list-style:none;border-top:1px solid var(--border-faint)}.ath-empty-state__hint{display:flex;align-items:center;gap:var(--space-3);min-height:var(--row-h-compact);padding:var(--space-2) 0;border-bottom:1px solid var(--border-faint)}.ath-empty-state__hint:last-child{border-bottom:0;padding-bottom:0}.ath-empty-state__hint-icon{flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;color:var(--fg-4)}.ath-empty-state__hint-text{display:flex;flex-direction:column;min-width:0;line-height:1.35}.ath-empty-state__hint-label{font-size:var(--control-font);font-weight:var(--weight-medium);color:var(--fg)}.ath-empty-state__hint-sub{font-size:var(--text-sm);color:var(--fg-3)}@media(max-width:640px){.ath-empty-state--compact .ath-empty-state__lead{flex-wrap:wrap}.ath-empty-state--compact .ath-empty-state__actions{flex-basis:100%;padding-left:48px}}\n"],
			dependencies: [{
				kind: "component",
				type: AthIconComponent,
				selector: "ath-icon",
				inputs: [
					"img",
					"size",
					"strokeWidth",
					"color",
					"absoluteStrokeWidth",
					"class"
				]
			}, {
				kind: "component",
				type: AthButtonComponent,
				selector: "ath-button",
				inputs: [
					"variant",
					"size",
					"type",
					"disabled",
					"loading",
					"fullWidth",
					"pressed",
					"expanded",
					"controls",
					"ariaLabel",
					"action"
				],
				outputs: [
					"clicked",
					"done",
					"failed"
				]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthEmptyStateComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-empty-state",
			imports: [AthIconComponent, AthButtonComponent],
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: "@if (size() === 'compact') {\n  <div class=\"ath-empty-state ath-empty-state--compact\" [class.ath-empty-state--bare]=\"bare()\">\n    <div class=\"ath-empty-state__lead\">\n      @if (icon(); as icon) {\n        <span class=\"ath-empty-state__tile\" aria-hidden=\"true\">\n          <ath-icon [img]=\"icon\" [size]=\"16\" />\n        </span>\n      }\n      <div class=\"ath-empty-state__text\">\n        <p class=\"ath-empty-state__message\">{{ message() }}</p>\n        @if (subMessage()) {\n          <p class=\"ath-empty-state__sub\">{{ subMessage() }}</p>\n        }\n      </div>\n      @if (actionLabel() || secondaryActionLabel()) {\n        <div class=\"ath-empty-state__actions\">\n          @if (secondaryActionLabel()) {\n            <ath-button variant=\"secondary\" size=\"sm\" (clicked)=\"secondaryAction.emit()\">\n              {{ secondaryActionLabel() }}\n            </ath-button>\n          }\n          @if (actionLabel()) {\n            <ath-button variant=\"primary\" size=\"sm\" (clicked)=\"action.emit()\">\n              @if (actionIcon(); as actionIcon) {\n                <ath-icon [img]=\"actionIcon\" [size]=\"13\" />\n              }\n              {{ actionLabel() }}\n            </ath-button>\n          }\n        </div>\n      }\n    </div>\n    @if (hints().length > 0) {\n      <ul class=\"ath-empty-state__hints\">\n        @for (hint of hints(); track hint.label) {\n          <li class=\"ath-empty-state__hint\">\n            <span class=\"ath-empty-state__hint-icon\" aria-hidden=\"true\">\n              @if (hint.icon) {\n                <ath-icon [img]=\"hint.icon\" [size]=\"14\" />\n              }\n            </span>\n            <span class=\"ath-empty-state__hint-text\">\n              <span class=\"ath-empty-state__hint-label\">{{ hint.label }}</span>\n              @if (hint.sub) {\n                <span class=\"ath-empty-state__hint-sub\">{{ hint.sub }}</span>\n              }\n            </span>\n          </li>\n        }\n      </ul>\n    }\n    <ng-content />\n  </div>\n} @else {\n  <div class=\"ath-empty-state\" [class.ath-empty-state--bare]=\"bare()\">\n    @if (icon(); as icon) {\n      <span class=\"ath-empty-state__icon\">\n        <ath-icon [img]=\"icon\" [size]=\"18\" />\n      </span>\n    }\n    <p class=\"ath-empty-state__message\">{{ message() }}</p>\n    @if (subMessage()) {\n      <p class=\"ath-empty-state__sub\">{{ subMessage() }}</p>\n    }\n    @if (actionLabel() || secondaryActionLabel()) {\n      <div class=\"ath-empty-state__actions ath-empty-state__actions--center\">\n        @if (secondaryActionLabel()) {\n          <ath-button variant=\"secondary\" size=\"sm\" (clicked)=\"secondaryAction.emit()\">\n            {{ secondaryActionLabel() }}\n          </ath-button>\n        }\n        @if (actionLabel()) {\n          <ath-button variant=\"primary\" size=\"sm\" (clicked)=\"action.emit()\">\n            {{ actionLabel() }}\n          </ath-button>\n        }\n      </div>\n    }\n    <ng-content />\n  </div>\n}\n",
			styles: [".ath-empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--space-2);padding:var(--space-10) var(--space-6);text-align:center;border:1px dashed var(--border);border-radius:var(--r-lg);background:var(--surface)}.ath-empty-state--bare{border:0;background:transparent}.ath-empty-state__icon{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;margin-bottom:var(--space-1);border-radius:var(--r-full);background:var(--surface-3);color:var(--fg-3)}.ath-empty-state__message{margin:0;font-size:var(--text-md);font-weight:var(--weight-medium);color:var(--fg)}.ath-empty-state__sub{margin:0;max-width:44ch;font-size:var(--text-base);line-height:var(--line-normal);color:var(--fg-3)}.ath-empty-state--compact{display:flex;flex-direction:column;align-items:stretch;justify-content:flex-start;gap:var(--space-3);padding:var(--space-4);text-align:left}.ath-empty-state--compact .ath-empty-state__lead{display:flex;align-items:flex-start;gap:var(--space-3)}.ath-empty-state--compact .ath-empty-state__text{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:2px}.ath-empty-state--compact .ath-empty-state__message{font-size:var(--panel-title-size);font-weight:var(--weight-semibold)}.ath-empty-state--compact .ath-empty-state__sub{max-width:64ch;font-size:var(--control-font)}.ath-empty-state__tile{flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border:1px solid var(--border-faint);border-radius:var(--r);background:var(--bg-2);color:var(--fg-3)}.ath-empty-state__actions{flex-shrink:0;display:flex;align-items:center;gap:var(--space-2)}.ath-empty-state__actions--center{justify-content:center;margin-top:var(--space-2)}.ath-empty-state__hints{display:flex;flex-direction:column;margin:0;padding:0;list-style:none;border-top:1px solid var(--border-faint)}.ath-empty-state__hint{display:flex;align-items:center;gap:var(--space-3);min-height:var(--row-h-compact);padding:var(--space-2) 0;border-bottom:1px solid var(--border-faint)}.ath-empty-state__hint:last-child{border-bottom:0;padding-bottom:0}.ath-empty-state__hint-icon{flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;color:var(--fg-4)}.ath-empty-state__hint-text{display:flex;flex-direction:column;min-width:0;line-height:1.35}.ath-empty-state__hint-label{font-size:var(--control-font);font-weight:var(--weight-medium);color:var(--fg)}.ath-empty-state__hint-sub{font-size:var(--text-sm);color:var(--fg-3)}@media(max-width:640px){.ath-empty-state--compact .ath-empty-state__lead{flex-wrap:wrap}.ath-empty-state--compact .ath-empty-state__actions{flex-basis:100%;padding-left:48px}}\n"]
		}]
	}],
	propDecorators: {
		message: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "message",
				required: true
			}]
		}],
		subMessage: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "subMessage",
				required: false
			}]
		}],
		icon: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "icon",
				required: false
			}]
		}],
		bare: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "bare",
				required: false
			}]
		}],
		size: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "size",
				required: false
			}]
		}],
		hints: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "hints",
				required: false
			}]
		}],
		actionLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "actionLabel",
				required: false
			}]
		}],
		actionIcon: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "actionIcon",
				required: false
			}]
		}],
		secondaryActionLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "secondaryActionLabel",
				required: false
			}]
		}],
		action: [{
			type: i0.Output,
			args: ["action"]
		}],
		secondaryAction: [{
			type: i0.Output,
			args: ["secondaryAction"]
		}]
	}
});
function sparklineGeometry(values, width, height) {
	if (values.length < 2) return null;
	const min = Math.min(...values);
	const range = Math.max(...values) - min || 1;
	const points = values.map((v, i) => {
		return [i / (values.length - 1) * (width - 2) + 1, height - 2 - (v - min) / range * (height - 4)];
	});
	const linePath = points.map((p, i) => (i === 0 ? "M" : "L") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
	const areaPath = `${linePath} L ${width - 1},${height - 1} L 1,${height - 1} Z`;
	const last = points[points.length - 1];
	return {
		linePath,
		areaPath,
		lastX: last[0],
		lastY: last[1]
	};
}
var AthSparklineComponent = class AthSparklineComponent {
	constructor() {
		this.data = input([], ...ngDevMode ? [{ debugName: "data" }] : /* istanbul ignore next */ []);
		this.width = input(70, ...ngDevMode ? [{ debugName: "width" }] : /* istanbul ignore next */ []);
		this.height = input(22, ...ngDevMode ? [{ debugName: "height" }] : /* istanbul ignore next */ []);
		this.color = input("var(--accent)", ...ngDevMode ? [{ debugName: "color" }] : /* istanbul ignore next */ []);
		this.showDot = input(true, ...ngDevMode ? [{ debugName: "showDot" }] : /* istanbul ignore next */ []);
		this.showArea = input(true, ...ngDevMode ? [{ debugName: "showArea" }] : /* istanbul ignore next */ []);
		this.strokeWidth = input(1.2, ...ngDevMode ? [{ debugName: "strokeWidth" }] : /* istanbul ignore next */ []);
		this.geometry = computed(() => sparklineGeometry(this.data() ?? [], this.width(), this.height()), ...ngDevMode ? [{ debugName: "geometry" }] : /* istanbul ignore next */ []);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthSparklineComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthSparklineComponent,
			isStandalone: true,
			selector: "ath-sparkline",
			inputs: {
				data: {
					classPropertyName: "data",
					publicName: "data",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				width: {
					classPropertyName: "width",
					publicName: "width",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				height: {
					classPropertyName: "height",
					publicName: "height",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				color: {
					classPropertyName: "color",
					publicName: "color",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				showDot: {
					classPropertyName: "showDot",
					publicName: "showDot",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				showArea: {
					classPropertyName: "showArea",
					publicName: "showArea",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				strokeWidth: {
					classPropertyName: "strokeWidth",
					publicName: "strokeWidth",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			ngImport: i0,
			template: "@if (geometry(); as g) {\n  <svg\n    class=\"ath-sparkline\"\n    [attr.width]=\"width()\"\n    [attr.height]=\"height()\"\n    [attr.viewBox]=\"'0 0 ' + width() + ' ' + height()\"\n    aria-hidden=\"true\"\n    focusable=\"false\"\n  >\n    @if (showArea()) {\n      <path class=\"ath-sparkline__area\" [attr.d]=\"g.areaPath\" [attr.fill]=\"color()\" />\n    }\n    <path\n      class=\"ath-sparkline__line\"\n      [attr.d]=\"g.linePath\"\n      [attr.stroke]=\"color()\"\n      [attr.stroke-width]=\"strokeWidth()\"\n    />\n    @if (showDot()) {\n      <circle\n        class=\"ath-sparkline__dot\"\n        [attr.cx]=\"g.lastX\"\n        [attr.cy]=\"g.lastY\"\n        r=\"2\"\n        [attr.fill]=\"color()\"\n      />\n    }\n  </svg>\n}\n",
			styles: [":host{display:inline-flex;line-height:0}.ath-sparkline{display:block;overflow:visible}.ath-sparkline__area{opacity:.15;stroke:none}.ath-sparkline__line{fill:none;stroke-linecap:round;stroke-linejoin:round}.ath-sparkline__dot{opacity:.95}\n"],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthSparklineComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-sparkline",
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: "@if (geometry(); as g) {\n  <svg\n    class=\"ath-sparkline\"\n    [attr.width]=\"width()\"\n    [attr.height]=\"height()\"\n    [attr.viewBox]=\"'0 0 ' + width() + ' ' + height()\"\n    aria-hidden=\"true\"\n    focusable=\"false\"\n  >\n    @if (showArea()) {\n      <path class=\"ath-sparkline__area\" [attr.d]=\"g.areaPath\" [attr.fill]=\"color()\" />\n    }\n    <path\n      class=\"ath-sparkline__line\"\n      [attr.d]=\"g.linePath\"\n      [attr.stroke]=\"color()\"\n      [attr.stroke-width]=\"strokeWidth()\"\n    />\n    @if (showDot()) {\n      <circle\n        class=\"ath-sparkline__dot\"\n        [attr.cx]=\"g.lastX\"\n        [attr.cy]=\"g.lastY\"\n        r=\"2\"\n        [attr.fill]=\"color()\"\n      />\n    }\n  </svg>\n}\n",
			styles: [":host{display:inline-flex;line-height:0}.ath-sparkline{display:block;overflow:visible}.ath-sparkline__area{opacity:.15;stroke:none}.ath-sparkline__line{fill:none;stroke-linecap:round;stroke-linejoin:round}.ath-sparkline__dot{opacity:.95}\n"]
		}]
	}],
	propDecorators: {
		data: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "data",
				required: false
			}]
		}],
		width: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "width",
				required: false
			}]
		}],
		height: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "height",
				required: false
			}]
		}],
		color: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "color",
				required: false
			}]
		}],
		showDot: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "showDot",
				required: false
			}]
		}],
		showArea: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "showArea",
				required: false
			}]
		}],
		strokeWidth: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "strokeWidth",
				required: false
			}]
		}]
	}
});
const LABELS$1 = {
	open: "Open",
	prog: "In Progress",
	in_progress: "In Progress",
	review: "In Review",
	in_review: "In Review",
	done: "Done",
	blocked: "Blocked",
	closed: "Closed"
};
var AthStatusPillComponent = class AthStatusPillComponent {
	constructor() {
		this.status = input("open", ...ngDevMode ? [{ debugName: "status" }] : /* istanbul ignore next */ []);
		this.showDot = input(true, {
			...ngDevMode ? { debugName: "showDot" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.showLabel = input(true, {
			...ngDevMode ? { debugName: "showLabel" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.size = input("md", ...ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []);
		this.label = input(null, ...ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []);
		this.tone = input(null, ...ngDevMode ? [{ debugName: "tone" }] : /* istanbul ignore next */ []);
		this.resolveLabel = inject(ATH_STATUS_LABELS$1, { optional: true });
		this.resolveTone = inject(ATH_STATUS_TONES$1, { optional: true });
		this.computedLabel = computed(() => {
			const status = this.status();
			return this.label() ?? this.resolveLabel?.(status) ?? LABELS$1[status] ?? status;
		}, ...ngDevMode ? [{ debugName: "computedLabel" }] : /* istanbul ignore next */ []);
		this.computedTone = computed(() => {
			const tone = this.tone() ?? this.resolveTone?.(this.status()) ?? null;
			return isAthDecoColor(tone) ? tone : null;
		}, ...ngDevMode ? [{ debugName: "computedTone" }] : /* istanbul ignore next */ []);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthStatusPillComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthStatusPillComponent,
			isStandalone: true,
			selector: "ath-status-pill",
			inputs: {
				status: {
					classPropertyName: "status",
					publicName: "status",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				showDot: {
					classPropertyName: "showDot",
					publicName: "showDot",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				showLabel: {
					classPropertyName: "showLabel",
					publicName: "showLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				size: {
					classPropertyName: "size",
					publicName: "size",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				label: {
					classPropertyName: "label",
					publicName: "label",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				tone: {
					classPropertyName: "tone",
					publicName: "tone",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			host: { properties: {
				"attr.data-status": "status()",
				"attr.data-tone": "computedTone()",
				"attr.data-size": "size()"
			} },
			ngImport: i0,
			template: "@if (showDot()) {\n  <i class=\"ath-status-pill__dot\" aria-hidden=\"true\"></i>\n}\n@if (showLabel()) {\n  <span class=\"ath-status-pill__label\">{{ computedLabel() }}</span>\n}\n",
			styles: [":host{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:500;color:var(--fg-2);white-space:nowrap;line-height:1;letter-spacing:0}:host([data-size=sm]){font-size:11.5px;gap:5px}:host([data-size=sm]) .ath-status-pill__dot{width:6px;height:6px}.ath-status-pill__dot{width:8px;height:8px;border-radius:999px;flex-shrink:0;background:var(--fg-4);box-shadow:inset 0 0 0 2px var(--bg-1),0 0 0 1px currentColor;color:var(--fg-4)}.ath-status-pill__label{font-family:var(--font-sans)}:host([data-status=open]) .ath-status-pill__dot{background:var(--status-open);color:var(--status-open)}:host([data-status=prog]) .ath-status-pill__dot,:host([data-status=in_progress]) .ath-status-pill__dot{background:var(--amber);color:var(--amber)}:host([data-status=review]) .ath-status-pill__dot,:host([data-status=in_review]) .ath-status-pill__dot{background:var(--blue);color:var(--blue)}:host([data-status=done]) .ath-status-pill__dot{background:var(--green);color:var(--green)}:host([data-status=blocked]) .ath-status-pill__dot{background:var(--red);color:var(--red)}:host([data-status=closed]){color:var(--fg-3)}:host([data-status=closed]) .ath-status-pill__dot{background:var(--fg-4);color:var(--fg-4)}:host([data-tone=neutral]){color:var(--fg-2)}:host([data-tone=neutral]) .ath-status-pill__dot{background:var(--status-open);color:var(--status-open)}:host([data-tone=blue]){color:var(--fg-2)}:host([data-tone=blue]) .ath-status-pill__dot{background:var(--blue);color:var(--blue)}:host([data-tone=green]){color:var(--fg-2)}:host([data-tone=green]) .ath-status-pill__dot{background:var(--green);color:var(--green)}:host([data-tone=amber]){color:var(--fg-2)}:host([data-tone=amber]) .ath-status-pill__dot{background:var(--amber);color:var(--amber)}:host([data-tone=red]){color:var(--fg-2)}:host([data-tone=red]) .ath-status-pill__dot{background:var(--red);color:var(--red)}:host([data-tone=purple]){color:var(--fg-2)}:host([data-tone=purple]) .ath-status-pill__dot{background:var(--purple);color:var(--purple)}:host([data-tone=pink]){color:var(--fg-2)}:host([data-tone=pink]) .ath-status-pill__dot{background:var(--pink);color:var(--pink)}\n"],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthStatusPillComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-status-pill",
			changeDetection: ChangeDetectionStrategy.OnPush,
			host: {
				"[attr.data-status]": "status()",
				"[attr.data-tone]": "computedTone()",
				"[attr.data-size]": "size()"
			},
			template: "@if (showDot()) {\n  <i class=\"ath-status-pill__dot\" aria-hidden=\"true\"></i>\n}\n@if (showLabel()) {\n  <span class=\"ath-status-pill__label\">{{ computedLabel() }}</span>\n}\n",
			styles: [":host{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:500;color:var(--fg-2);white-space:nowrap;line-height:1;letter-spacing:0}:host([data-size=sm]){font-size:11.5px;gap:5px}:host([data-size=sm]) .ath-status-pill__dot{width:6px;height:6px}.ath-status-pill__dot{width:8px;height:8px;border-radius:999px;flex-shrink:0;background:var(--fg-4);box-shadow:inset 0 0 0 2px var(--bg-1),0 0 0 1px currentColor;color:var(--fg-4)}.ath-status-pill__label{font-family:var(--font-sans)}:host([data-status=open]) .ath-status-pill__dot{background:var(--status-open);color:var(--status-open)}:host([data-status=prog]) .ath-status-pill__dot,:host([data-status=in_progress]) .ath-status-pill__dot{background:var(--amber);color:var(--amber)}:host([data-status=review]) .ath-status-pill__dot,:host([data-status=in_review]) .ath-status-pill__dot{background:var(--blue);color:var(--blue)}:host([data-status=done]) .ath-status-pill__dot{background:var(--green);color:var(--green)}:host([data-status=blocked]) .ath-status-pill__dot{background:var(--red);color:var(--red)}:host([data-status=closed]){color:var(--fg-3)}:host([data-status=closed]) .ath-status-pill__dot{background:var(--fg-4);color:var(--fg-4)}:host([data-tone=neutral]){color:var(--fg-2)}:host([data-tone=neutral]) .ath-status-pill__dot{background:var(--status-open);color:var(--status-open)}:host([data-tone=blue]){color:var(--fg-2)}:host([data-tone=blue]) .ath-status-pill__dot{background:var(--blue);color:var(--blue)}:host([data-tone=green]){color:var(--fg-2)}:host([data-tone=green]) .ath-status-pill__dot{background:var(--green);color:var(--green)}:host([data-tone=amber]){color:var(--fg-2)}:host([data-tone=amber]) .ath-status-pill__dot{background:var(--amber);color:var(--amber)}:host([data-tone=red]){color:var(--fg-2)}:host([data-tone=red]) .ath-status-pill__dot{background:var(--red);color:var(--red)}:host([data-tone=purple]){color:var(--fg-2)}:host([data-tone=purple]) .ath-status-pill__dot{background:var(--purple);color:var(--purple)}:host([data-tone=pink]){color:var(--fg-2)}:host([data-tone=pink]) .ath-status-pill__dot{background:var(--pink);color:var(--pink)}\n"]
		}]
	}],
	propDecorators: {
		status: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "status",
				required: false
			}]
		}],
		showDot: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "showDot",
				required: false
			}]
		}],
		showLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "showLabel",
				required: false
			}]
		}],
		size: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "size",
				required: false
			}]
		}],
		label: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "label",
				required: false
			}]
		}],
		tone: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "tone",
				required: false
			}]
		}]
	}
});
const LABELS = {
	low: "Low",
	medium: "Medium",
	high: "High",
	crit: "Critical"
};
var AthPriorityComponent = class AthPriorityComponent {
	constructor() {
		this.resolveLabel = inject(ATH_PRIORITY_LABELS$1, { optional: true });
		this.priority = input("medium", ...ngDevMode ? [{ debugName: "priority" }] : /* istanbul ignore next */ []);
		this.showLabel = input(true, {
			...ngDevMode ? { debugName: "showLabel" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.label = input(null, ...ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []);
		this.computedLabel = computed(() => {
			const priority = this.priority();
			return this.label() ?? this.resolveLabel?.(priority) ?? LABELS[priority] ?? priority;
		}, ...ngDevMode ? [{ debugName: "computedLabel" }] : /* istanbul ignore next */ []);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthPriorityComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthPriorityComponent,
			isStandalone: true,
			selector: "ath-priority",
			inputs: {
				priority: {
					classPropertyName: "priority",
					publicName: "priority",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				showLabel: {
					classPropertyName: "showLabel",
					publicName: "showLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				label: {
					classPropertyName: "label",
					publicName: "label",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			host: { properties: { "attr.data-priority": "priority()" } },
			ngImport: i0,
			template: "<span class=\"ath-priority__bars\" aria-hidden=\"true\">\n  <i></i>\n  <i></i>\n  <i></i>\n</span>\n@if (showLabel()) {\n  <span class=\"ath-priority__label\">{{ computedLabel() }}</span>\n}\n",
			styles: [":host{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:500;color:var(--fg-3);line-height:1}.ath-priority__bars{display:inline-flex;align-items:flex-end;gap:1.5px;height:11px}.ath-priority__bars i{display:block;width:2.5px;background:var(--fg-disabled);border-radius:1px}.ath-priority__bars i:nth-child(1){height:4px}.ath-priority__bars i:nth-child(2){height:7px}.ath-priority__bars i:nth-child(3){height:11px}.ath-priority__label{color:var(--fg-2);font-family:var(--font-sans)}:host([data-priority=low]) .ath-priority__bars i:nth-child(1){background:var(--fg-3)}:host([data-priority=medium]) .ath-priority__bars i:nth-child(-n+2){background:var(--fg-2)}:host([data-priority=high]) .ath-priority__bars i{background:var(--amber)}:host([data-priority=crit]) .ath-priority__bars i{background:var(--red)}:host([data-priority=crit]) .ath-priority__label{color:var(--red-text);font-weight:600}\n"],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthPriorityComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-priority",
			changeDetection: ChangeDetectionStrategy.OnPush,
			host: { "[attr.data-priority]": "priority()" },
			template: "<span class=\"ath-priority__bars\" aria-hidden=\"true\">\n  <i></i>\n  <i></i>\n  <i></i>\n</span>\n@if (showLabel()) {\n  <span class=\"ath-priority__label\">{{ computedLabel() }}</span>\n}\n",
			styles: [":host{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:500;color:var(--fg-3);line-height:1}.ath-priority__bars{display:inline-flex;align-items:flex-end;gap:1.5px;height:11px}.ath-priority__bars i{display:block;width:2.5px;background:var(--fg-disabled);border-radius:1px}.ath-priority__bars i:nth-child(1){height:4px}.ath-priority__bars i:nth-child(2){height:7px}.ath-priority__bars i:nth-child(3){height:11px}.ath-priority__label{color:var(--fg-2);font-family:var(--font-sans)}:host([data-priority=low]) .ath-priority__bars i:nth-child(1){background:var(--fg-3)}:host([data-priority=medium]) .ath-priority__bars i:nth-child(-n+2){background:var(--fg-2)}:host([data-priority=high]) .ath-priority__bars i{background:var(--amber)}:host([data-priority=crit]) .ath-priority__bars i{background:var(--red)}:host([data-priority=crit]) .ath-priority__label{color:var(--red-text);font-weight:600}\n"]
		}]
	}],
	propDecorators: {
		priority: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "priority",
				required: false
			}]
		}],
		showLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "showLabel",
				required: false
			}]
		}],
		label: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "label",
				required: false
			}]
		}]
	}
});
var AthSkeletonComponent = class AthSkeletonComponent {
	constructor() {
		this.variant = input("text", ...ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []);
		this.width = input("100%", ...ngDevMode ? [{ debugName: "width" }] : /* istanbul ignore next */ []);
		this.height = input("", ...ngDevMode ? [{ debugName: "height" }] : /* istanbul ignore next */ []);
		this.animated = input(true, {
			...ngDevMode ? { debugName: "animated" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthSkeletonComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.1.0",
			version: "22.2.2",
			type: AthSkeletonComponent,
			isStandalone: true,
			selector: "ath-skeleton",
			inputs: {
				variant: {
					classPropertyName: "variant",
					publicName: "variant",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				width: {
					classPropertyName: "width",
					publicName: "width",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				height: {
					classPropertyName: "height",
					publicName: "height",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				animated: {
					classPropertyName: "animated",
					publicName: "animated",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			host: {
				attributes: { "aria-hidden": "true" },
				properties: {
					"attr.data-variant": "variant()",
					"class.ath-skeleton--animated": "animated()",
					"style.width": "width()",
					"style.height": "height() || null"
				},
				classAttribute: "ath-skeleton"
			},
			ngImport: i0,
			template: "",
			isInline: true,
			styles: [":host{display:block;background:var(--bg-2);border-radius:var(--r-xs)}:host([data-variant=line]){height:.8em;margin-block:.35em}:host([data-variant=text]){height:1em}:host([data-variant=row]){height:var(--row-h);border-radius:0;border-bottom:1px solid var(--border)}:host([data-variant=card]){height:64px;border-radius:var(--r)}:host([data-variant=circular]){border-radius:var(--r-full)}:host([data-variant=rectangular]){border-radius:var(--r)}:host(.ath-skeleton--animated){animation:ath-skeleton-pulse 1.6s ease-in-out infinite}@keyframes ath-skeleton-pulse{0%,to{opacity:.45}50%{opacity:.85}}@media(prefers-reduced-motion:reduce){:host(.ath-skeleton--animated){animation:none;opacity:.65}}\n"],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthSkeletonComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-skeleton",
			changeDetection: ChangeDetectionStrategy.OnPush,
			host: {
				"aria-hidden": "true",
				class: "ath-skeleton",
				"[attr.data-variant]": "variant()",
				"[class.ath-skeleton--animated]": "animated()",
				"[style.width]": "width()",
				"[style.height]": "height() || null"
			},
			template: "",
			styles: [":host{display:block;background:var(--bg-2);border-radius:var(--r-xs)}:host([data-variant=line]){height:.8em;margin-block:.35em}:host([data-variant=text]){height:1em}:host([data-variant=row]){height:var(--row-h);border-radius:0;border-bottom:1px solid var(--border)}:host([data-variant=card]){height:64px;border-radius:var(--r)}:host([data-variant=circular]){border-radius:var(--r-full)}:host([data-variant=rectangular]){border-radius:var(--r)}:host(.ath-skeleton--animated){animation:ath-skeleton-pulse 1.6s ease-in-out infinite}@keyframes ath-skeleton-pulse{0%,to{opacity:.45}50%{opacity:.85}}@media(prefers-reduced-motion:reduce){:host(.ath-skeleton--animated){animation:none;opacity:.65}}\n"]
		}]
	}],
	propDecorators: {
		variant: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "variant",
				required: false
			}]
		}],
		width: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "width",
				required: false
			}]
		}],
		height: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "height",
				required: false
			}]
		}],
		animated: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "animated",
				required: false
			}]
		}]
	}
});
var AthSkeletonListComponent = class AthSkeletonListComponent {
	constructor() {
		this.labels = injectAthLabels();
		this.variant = input("row", ...ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []);
		this.count = input(6, {
			...ngDevMode ? { debugName: "count" } : /* istanbul ignore next */ {},
			transform: numberAttribute
		});
		this.label = input(null, ...ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []);
		this.indexes = computed(() => Array.from({ length: Math.max(1, Math.floor(this.count() || 0)) }, (_, i) => i), ...ngDevMode ? [{ debugName: "indexes" }] : /* istanbul ignore next */ []);
		this.loadingLabel = computed(() => this.label() ?? this.labels.loading(), ...ngDevMode ? [{ debugName: "loadingLabel" }] : /* istanbul ignore next */ []);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthSkeletonListComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthSkeletonListComponent,
			isStandalone: true,
			selector: "ath-skeleton-list",
			inputs: {
				variant: {
					classPropertyName: "variant",
					publicName: "variant",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				count: {
					classPropertyName: "count",
					publicName: "count",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				label: {
					classPropertyName: "label",
					publicName: "label",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			ngImport: i0,
			template: `
    <div class="ath-skeleton-list" [attr.data-variant]="variant()" role="status">
      <span class="ath-skeleton-list__sr">{{ loadingLabel() }}</span>
      @for (i of indexes(); track i) {
        <div class="ath-skeleton-list__cell" aria-hidden="true"></div>
      }
    </div>
  `,
			isInline: true,
			styles: [":host{display:block}.ath-skeleton-list{overflow:hidden;border:1px solid var(--border);border-radius:var(--r-lg);background:var(--surface)}.ath-skeleton-list__cell{background:var(--bg-2);animation:ath-skeleton-list-pulse 1.6s ease-in-out infinite}.ath-skeleton-list[data-variant=row]{display:flex;flex-direction:column}.ath-skeleton-list[data-variant=row] .ath-skeleton-list__cell{height:var(--row-h);border-bottom:1px solid var(--border)}.ath-skeleton-list[data-variant=row] .ath-skeleton-list__cell:last-child{border-bottom:none}.ath-skeleton-list[data-variant=card]{display:flex;flex-direction:column;gap:var(--space-2);padding:10px}.ath-skeleton-list[data-variant=card] .ath-skeleton-list__cell{height:64px;border-radius:var(--r)}.ath-skeleton-list[data-variant=card-grid]{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:var(--space-3);padding:var(--space-3);border:none;background:transparent}.ath-skeleton-list[data-variant=card-grid] .ath-skeleton-list__cell{height:168px;border:1px solid var(--border);border-radius:var(--r-lg);background:var(--surface)}.ath-skeleton-list__sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}@keyframes ath-skeleton-list-pulse{0%,to{opacity:.45}50%{opacity:.85}}@media(prefers-reduced-motion:reduce){.ath-skeleton-list__cell{animation:none;opacity:.65}}\n"],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthSkeletonListComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-skeleton-list",
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: `
    <div class="ath-skeleton-list" [attr.data-variant]="variant()" role="status">
      <span class="ath-skeleton-list__sr">{{ loadingLabel() }}</span>
      @for (i of indexes(); track i) {
        <div class="ath-skeleton-list__cell" aria-hidden="true"></div>
      }
    </div>
  `,
			styles: [":host{display:block}.ath-skeleton-list{overflow:hidden;border:1px solid var(--border);border-radius:var(--r-lg);background:var(--surface)}.ath-skeleton-list__cell{background:var(--bg-2);animation:ath-skeleton-list-pulse 1.6s ease-in-out infinite}.ath-skeleton-list[data-variant=row]{display:flex;flex-direction:column}.ath-skeleton-list[data-variant=row] .ath-skeleton-list__cell{height:var(--row-h);border-bottom:1px solid var(--border)}.ath-skeleton-list[data-variant=row] .ath-skeleton-list__cell:last-child{border-bottom:none}.ath-skeleton-list[data-variant=card]{display:flex;flex-direction:column;gap:var(--space-2);padding:10px}.ath-skeleton-list[data-variant=card] .ath-skeleton-list__cell{height:64px;border-radius:var(--r)}.ath-skeleton-list[data-variant=card-grid]{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:var(--space-3);padding:var(--space-3);border:none;background:transparent}.ath-skeleton-list[data-variant=card-grid] .ath-skeleton-list__cell{height:168px;border:1px solid var(--border);border-radius:var(--r-lg);background:var(--surface)}.ath-skeleton-list__sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}@keyframes ath-skeleton-list-pulse{0%,to{opacity:.45}50%{opacity:.85}}@media(prefers-reduced-motion:reduce){.ath-skeleton-list__cell{animation:none;opacity:.65}}\n"]
		}]
	}],
	propDecorators: {
		variant: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "variant",
				required: false
			}]
		}],
		count: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "count",
				required: false
			}]
		}],
		label: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "label",
				required: false
			}]
		}]
	}
});
var AthSkeletonTableComponent = class AthSkeletonTableComponent {
	constructor() {
		this.rows = input(5, {
			...ngDevMode ? { debugName: "rows" } : /* istanbul ignore next */ {},
			transform: numberAttribute
		});
		this.columns = input([
			20,
			30,
			25,
			25
		], ...ngDevMode ? [{ debugName: "columns" }] : /* istanbul ignore next */ []);
		this.rowsArray = computed(() => Array.from({ length: this.rows() }, (_, i) => i), ...ngDevMode ? [{ debugName: "rowsArray" }] : /* istanbul ignore next */ []);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthSkeletonTableComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthSkeletonTableComponent,
			isStandalone: true,
			selector: "ath-skeleton-table",
			inputs: {
				rows: {
					classPropertyName: "rows",
					publicName: "rows",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				columns: {
					classPropertyName: "columns",
					publicName: "columns",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			ngImport: i0,
			template: "<div class=\"ath-skeleton-table\">\n  <!-- Header -->\n  <div class=\"ath-skeleton-table__header\">\n    @for (col of columns(); track col) {\n      <ath-skeleton variant=\"text\" [width]=\"col + '%'\" height=\"20px\" />\n    }\n  </div>\n\n  <!-- Rows -->\n  @for (row of rowsArray(); track row) {\n    <div class=\"ath-skeleton-table__row\">\n      @for (col of columns(); track col) {\n        <ath-skeleton variant=\"text\" [width]=\"col + '%'\" height=\"16px\" />\n      }\n    </div>\n  }\n</div>\n",
			styles: [".ath-skeleton-table{display:flex;flex-direction:column;gap:var(--space-3)}.ath-skeleton-table__header{display:flex;gap:var(--space-4);padding-bottom:var(--space-3);border-bottom:1px solid var(--border)}.ath-skeleton-table__row{display:flex;gap:var(--space-4);padding:var(--space-2) 0}\n"],
			dependencies: [{
				kind: "component",
				type: AthSkeletonComponent,
				selector: "ath-skeleton",
				inputs: [
					"variant",
					"width",
					"height",
					"animated"
				]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthSkeletonTableComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-skeleton-table",
			imports: [AthSkeletonComponent],
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: "<div class=\"ath-skeleton-table\">\n  <!-- Header -->\n  <div class=\"ath-skeleton-table__header\">\n    @for (col of columns(); track col) {\n      <ath-skeleton variant=\"text\" [width]=\"col + '%'\" height=\"20px\" />\n    }\n  </div>\n\n  <!-- Rows -->\n  @for (row of rowsArray(); track row) {\n    <div class=\"ath-skeleton-table__row\">\n      @for (col of columns(); track col) {\n        <ath-skeleton variant=\"text\" [width]=\"col + '%'\" height=\"16px\" />\n      }\n    </div>\n  }\n</div>\n",
			styles: [".ath-skeleton-table{display:flex;flex-direction:column;gap:var(--space-3)}.ath-skeleton-table__header{display:flex;gap:var(--space-4);padding-bottom:var(--space-3);border-bottom:1px solid var(--border)}.ath-skeleton-table__row{display:flex;gap:var(--space-4);padding:var(--space-2) 0}\n"]
		}]
	}],
	propDecorators: {
		rows: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "rows",
				required: false
			}]
		}],
		columns: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "columns",
				required: false
			}]
		}]
	}
});
var AthSkeletonCardComponent = class AthSkeletonCardComponent {
	constructor() {
		this.showImage = input(true, {
			...ngDevMode ? { debugName: "showImage" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.showActions = input(true, {
			...ngDevMode ? { debugName: "showActions" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthSkeletonCardComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthSkeletonCardComponent,
			isStandalone: true,
			selector: "ath-skeleton-card",
			inputs: {
				showImage: {
					classPropertyName: "showImage",
					publicName: "showImage",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				showActions: {
					classPropertyName: "showActions",
					publicName: "showActions",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			ngImport: i0,
			template: "<div class=\"ath-skeleton-card\">\n  @if (showImage()) {\n    <ath-skeleton variant=\"rectangular\" height=\"160px\" />\n  }\n  <div class=\"ath-skeleton-card__content\">\n    <ath-skeleton variant=\"text\" width=\"70%\" height=\"24px\" />\n    <ath-skeleton variant=\"text\" width=\"100%\" height=\"16px\" />\n    <ath-skeleton variant=\"text\" width=\"90%\" height=\"16px\" />\n    @if (showActions()) {\n      <div class=\"ath-skeleton-card__actions\">\n        <ath-skeleton variant=\"rectangular\" width=\"80px\" height=\"32px\" />\n        <ath-skeleton variant=\"rectangular\" width=\"80px\" height=\"32px\" />\n      </div>\n    }\n  </div>\n</div>\n",
			styles: [""],
			dependencies: [{
				kind: "component",
				type: AthSkeletonComponent,
				selector: "ath-skeleton",
				inputs: [
					"variant",
					"width",
					"height",
					"animated"
				]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthSkeletonCardComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-skeleton-card",
			imports: [AthSkeletonComponent],
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: "<div class=\"ath-skeleton-card\">\n  @if (showImage()) {\n    <ath-skeleton variant=\"rectangular\" height=\"160px\" />\n  }\n  <div class=\"ath-skeleton-card__content\">\n    <ath-skeleton variant=\"text\" width=\"70%\" height=\"24px\" />\n    <ath-skeleton variant=\"text\" width=\"100%\" height=\"16px\" />\n    <ath-skeleton variant=\"text\" width=\"90%\" height=\"16px\" />\n    @if (showActions()) {\n      <div class=\"ath-skeleton-card__actions\">\n        <ath-skeleton variant=\"rectangular\" width=\"80px\" height=\"32px\" />\n        <ath-skeleton variant=\"rectangular\" width=\"80px\" height=\"32px\" />\n      </div>\n    }\n  </div>\n</div>\n"
		}]
	}],
	propDecorators: {
		showImage: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "showImage",
				required: false
			}]
		}],
		showActions: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "showActions",
				required: false
			}]
		}]
	}
});
const SPARK_COLOR = {
	neutral: "var(--fg-3)",
	amber: "var(--amber)",
	blue: "var(--blue)",
	green: "var(--green)",
	red: "var(--red)"
};
function hasKpiTrend(spark) {
	return !!spark && spark.length >= 2 && spark.some((n) => n !== 0);
}
var AthKpiTileComponent = class AthKpiTileComponent {
	constructor() {
		this.labels = injectAthLabels();
		this.label = input.required(...ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []);
		this.value = input(0, ...ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []);
		this.delta = input(null, ...ngDevMode ? [{ debugName: "delta" }] : /* istanbul ignore next */ []);
		this.deltaDirection = input(null, ...ngDevMode ? [{ debugName: "deltaDirection" }] : /* istanbul ignore next */ []);
		this.deltaTitle = input(null, ...ngDevMode ? [{ debugName: "deltaTitle" }] : /* istanbul ignore next */ []);
		this.tone = input("neutral", ...ngDevMode ? [{ debugName: "tone" }] : /* istanbul ignore next */ []);
		this.spark = input(null, ...ngDevMode ? [{ debugName: "spark" }] : /* istanbul ignore next */ []);
		this.sparkColor = input(null, ...ngDevMode ? [{ debugName: "sparkColor" }] : /* istanbul ignore next */ []);
		this.note = input(null, ...ngDevMode ? [{ debugName: "note" }] : /* istanbul ignore next */ []);
		this.noteTitle = input(null, ...ngDevMode ? [{ debugName: "noteTitle" }] : /* istanbul ignore next */ []);
		this.alert = input(false, ...ngDevMode ? [{ debugName: "alert" }] : /* istanbul ignore next */ []);
		this.valueTone = input(null, ...ngDevMode ? [{ debugName: "valueTone" }] : /* istanbul ignore next */ []);
		this.dot = input(null, ...ngDevMode ? [{ debugName: "dot" }] : /* istanbul ignore next */ []);
		this.muted = input(false, ...ngDevMode ? [{ debugName: "muted" }] : /* istanbul ignore next */ []);
		this.link = input(null, ...ngDevMode ? [{ debugName: "link" }] : /* istanbul ignore next */ []);
		this.linkParams = input(null, ...ngDevMode ? [{ debugName: "linkParams" }] : /* istanbul ignore next */ []);
		this.linkLabel = input(null, ...ngDevMode ? [{ debugName: "linkLabel" }] : /* istanbul ignore next */ []);
		this.loading = computed(() => this.value() == null, ...ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []);
		this.loadingLabel = computed(() => this.labels.loading(), ...ngDevMode ? [{ debugName: "loadingLabel" }] : /* istanbul ignore next */ []);
		this.samples = computed(() => this.spark() ?? null, ...ngDevMode ? [{ debugName: "samples" }] : /* istanbul ignore next */ []);
		this.showTrend = computed(() => !this.muted() && !this.loading() && hasKpiTrend(this.samples()), ...ngDevMode ? [{ debugName: "showTrend" }] : /* istanbul ignore next */ []);
		this.trendColor = computed(() => this.sparkColor() ?? SPARK_COLOR[this.tone()], ...ngDevMode ? [{ debugName: "trendColor" }] : /* istanbul ignore next */ []);
		this.routerLink = computed(() => this.link(), ...ngDevMode ? [{ debugName: "routerLink" }] : /* istanbul ignore next */ []);
		this.figureTone = computed(() => this.alert() || this.muted() ? null : this.valueTone() ?? null, ...ngDevMode ? [{ debugName: "figureTone" }] : /* istanbul ignore next */ []);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthKpiTileComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthKpiTileComponent,
			isStandalone: true,
			selector: "ath-kpi-tile",
			inputs: {
				label: {
					classPropertyName: "label",
					publicName: "label",
					isSignal: true,
					isRequired: true,
					transformFunction: null
				},
				value: {
					classPropertyName: "value",
					publicName: "value",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				delta: {
					classPropertyName: "delta",
					publicName: "delta",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				deltaDirection: {
					classPropertyName: "deltaDirection",
					publicName: "deltaDirection",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				deltaTitle: {
					classPropertyName: "deltaTitle",
					publicName: "deltaTitle",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				tone: {
					classPropertyName: "tone",
					publicName: "tone",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				spark: {
					classPropertyName: "spark",
					publicName: "spark",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				sparkColor: {
					classPropertyName: "sparkColor",
					publicName: "sparkColor",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				note: {
					classPropertyName: "note",
					publicName: "note",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				noteTitle: {
					classPropertyName: "noteTitle",
					publicName: "noteTitle",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				alert: {
					classPropertyName: "alert",
					publicName: "alert",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				valueTone: {
					classPropertyName: "valueTone",
					publicName: "valueTone",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				dot: {
					classPropertyName: "dot",
					publicName: "dot",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				muted: {
					classPropertyName: "muted",
					publicName: "muted",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				link: {
					classPropertyName: "link",
					publicName: "link",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				linkParams: {
					classPropertyName: "linkParams",
					publicName: "linkParams",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				linkLabel: {
					classPropertyName: "linkLabel",
					publicName: "linkLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			host: { properties: {
				"attr.data-tone": "tone()",
				"class.ath-kpi--link": "link() !== null"
			} },
			ngImport: i0,
			template: "<div class=\"ath-kpi__row\">\n  @if (link() !== null) {\n    <a\n      class=\"ath-kpi__label ath-kpi__link\"\n      [routerLink]=\"routerLink()\"\n      [queryParams]=\"linkParams()\"\n      [attr.aria-label]=\"linkLabel() ?? label()\"\n    >\n      @if (dot()) {\n        <span class=\"ath-kpi__dot\" [style.background]=\"dot()\" aria-hidden=\"true\"></span>\n      }\n      {{ label() }}</a\n    >\n  } @else {\n    <span class=\"ath-kpi__label\">\n      @if (dot()) {\n        <span class=\"ath-kpi__dot\" [style.background]=\"dot()\" aria-hidden=\"true\"></span>\n      }\n      {{ label() }}</span\n    >\n  }\n  @if (delta() !== null && delta() !== undefined) {\n    <span\n      class=\"ath-kpi__delta\"\n      [attr.data-direction]=\"deltaDirection() ?? 'neutral'\"\n      [attr.title]=\"deltaTitle()\"\n      [attr.aria-label]=\"deltaTitle()\"\n      >{{ delta() }}</span\n    >\n  }\n</div>\n\n<div class=\"ath-kpi__bottom\" [class.ath-kpi__bottom--note]=\"!!note()\">\n  @if (loading()) {\n    <!-- The figure is not there yet: a skeleton the size of a number, not\n         a fake \"–\" or 0. -->\n    <span class=\"ath-kpi__value ath-kpi__value--loading\">\n      <ath-skeleton variant=\"rectangular\" width=\"48px\" height=\"22px\" />\n      <span class=\"ath-kpi__sr\">{{ loadingLabel() }}</span>\n    </span>\n  } @else {\n    <span\n      class=\"ath-kpi__value\"\n      [attr.data-tone]=\"figureTone()\"\n      [class.ath-kpi__value--alert]=\"alert()\"\n      [class.ath-kpi__value--muted]=\"muted()\"\n      >{{ value() }}</span\n    >\n  }\n  @if (note()) {\n    <!-- Under the figure; a narrow tile ends it in an ellipsis, the full\n         text is the tooltip. -->\n    <span class=\"ath-kpi__note\" [attr.title]=\"noteTitle() ?? note()\">{{ note() }}</span>\n  } @else if (showTrend()) {\n    <ath-sparkline [data]=\"samples()\" [color]=\"trendColor()\" />\n  } @else {\n    <!-- No trend: the slot keeps the sparkline's footprint so tiles line up. -->\n    <span class=\"ath-kpi__spark-slot\" aria-hidden=\"true\"></span>\n  }\n</div>\n\n<!-- Under the figure: a progress bar or a short line; nothing when empty. -->\n<div class=\"ath-kpi__extra\"><ng-content /></div>\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:flex;flex-direction:column;justify-content:flex-start;gap:10px;min-width:0;padding:11px var(--space-4);border-left:1px solid var(--border-faint);background:var(--surface)}:host(:first-child){border-left:none}@container ath-kpi-strip (max-width: 920px){:host(:nth-child(odd)){border-left:none}:host(:nth-child(n+3)){border-top:1px solid var(--border-faint)}}.ath-kpi__row{display:flex;align-items:center;justify-content:space-between;gap:var(--space-2)}.ath-kpi__label{overflow:hidden;color:var(--fg-3);font-size:var(--text-sm);font-weight:var(--weight-medium);letter-spacing:-.003em;text-overflow:ellipsis;white-space:nowrap}.ath-kpi__dot{display:inline-block;width:7px;height:7px;margin-inline-end:3px;border-radius:var(--r-full);vertical-align:.05em}.ath-kpi__delta{position:relative;z-index:var(--z-raised);padding:0 var(--space-1);border-radius:var(--r-xs);background:var(--bg-2);color:var(--fg-3);font-family:var(--font-mono);font-size:10.5px;font-feature-settings:\"tnum\";font-weight:var(--weight-medium);line-height:14px;white-space:nowrap}.ath-kpi__delta[data-direction=up]{background:color-mix(in srgb,var(--green) 14%,transparent);color:var(--green-text)}.ath-kpi__delta[data-direction=down]{background:color-mix(in srgb,var(--red) 14%,transparent);color:var(--red-text)}.ath-kpi__bottom{display:flex;align-items:flex-end;justify-content:space-between;gap:10px}.ath-kpi__value{color:var(--fg);font-family:var(--font-sans);font-size:var(--text-2xl);font-variant-numeric:tabular-nums;font-weight:var(--weight-semibold);letter-spacing:-.02em;line-height:1}.ath-kpi__value[data-tone=amber]{color:var(--amber-text)}.ath-kpi__value[data-tone=blue]{color:var(--blue-text)}.ath-kpi__value[data-tone=green]{color:var(--green-text)}.ath-kpi__value[data-tone=red]{color:var(--red-text)}.ath-kpi__value[data-tone=purple]{color:var(--purple-text)}.ath-kpi__value--alert{color:var(--red-text)}.ath-kpi__value--muted{color:var(--fg-4);font-weight:var(--weight-medium)}.ath-kpi__value--loading{display:inline-flex;align-items:center;height:1em}.ath-kpi__bottom--note{flex-direction:column;align-items:stretch;gap:6px}.ath-kpi__note{overflow:hidden;min-width:0;color:var(--fg-3);font-family:var(--font-sans);font-size:var(--text-xs);line-height:16px;text-overflow:ellipsis;white-space:nowrap}.ath-kpi__sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}.ath-kpi__extra{margin-top:-4px}.ath-kpi__extra:empty{display:none}.ath-kpi__spark-slot{display:inline-block;width:70px;height:22px}:host(.ath-kpi--link){position:relative;transition:background var(--t-fast)}:host(.ath-kpi--link):hover{background:var(--bg-2)}:host(.ath-kpi--link):has(.ath-kpi__link:focus-visible){box-shadow:inset 0 0 0 2px var(--focus-ring-color)}.ath-kpi__link{text-decoration:none}.ath-kpi__link:after{content:\"\";position:absolute;inset:0}.ath-kpi__link:focus-visible{outline:none}:host(.ath-kpi--link:hover) .ath-kpi__link{color:var(--fg)}\n"],
			dependencies: [
				{
					kind: "directive",
					type: RouterLink,
					selector: "[routerLink]",
					inputs: [
						"target",
						"queryParams",
						"fragment",
						"queryParamsHandling",
						"state",
						"info",
						"relativeTo",
						"preserveFragment",
						"skipLocationChange",
						"replaceUrl",
						"browserUrl",
						"routerLink"
					]
				},
				{
					kind: "component",
					type: AthSkeletonComponent,
					selector: "ath-skeleton",
					inputs: [
						"variant",
						"width",
						"height",
						"animated"
					]
				},
				{
					kind: "component",
					type: AthSparklineComponent,
					selector: "ath-sparkline",
					inputs: [
						"data",
						"width",
						"height",
						"color",
						"showDot",
						"showArea",
						"strokeWidth"
					]
				}
			],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthKpiTileComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-kpi-tile",
			imports: [
				RouterLink,
				AthSkeletonComponent,
				AthSparklineComponent
			],
			changeDetection: ChangeDetectionStrategy.OnPush,
			host: {
				"[attr.data-tone]": "tone()",
				"[class.ath-kpi--link]": "link() !== null"
			},
			template: "<div class=\"ath-kpi__row\">\n  @if (link() !== null) {\n    <a\n      class=\"ath-kpi__label ath-kpi__link\"\n      [routerLink]=\"routerLink()\"\n      [queryParams]=\"linkParams()\"\n      [attr.aria-label]=\"linkLabel() ?? label()\"\n    >\n      @if (dot()) {\n        <span class=\"ath-kpi__dot\" [style.background]=\"dot()\" aria-hidden=\"true\"></span>\n      }\n      {{ label() }}</a\n    >\n  } @else {\n    <span class=\"ath-kpi__label\">\n      @if (dot()) {\n        <span class=\"ath-kpi__dot\" [style.background]=\"dot()\" aria-hidden=\"true\"></span>\n      }\n      {{ label() }}</span\n    >\n  }\n  @if (delta() !== null && delta() !== undefined) {\n    <span\n      class=\"ath-kpi__delta\"\n      [attr.data-direction]=\"deltaDirection() ?? 'neutral'\"\n      [attr.title]=\"deltaTitle()\"\n      [attr.aria-label]=\"deltaTitle()\"\n      >{{ delta() }}</span\n    >\n  }\n</div>\n\n<div class=\"ath-kpi__bottom\" [class.ath-kpi__bottom--note]=\"!!note()\">\n  @if (loading()) {\n    <!-- The figure is not there yet: a skeleton the size of a number, not\n         a fake \"–\" or 0. -->\n    <span class=\"ath-kpi__value ath-kpi__value--loading\">\n      <ath-skeleton variant=\"rectangular\" width=\"48px\" height=\"22px\" />\n      <span class=\"ath-kpi__sr\">{{ loadingLabel() }}</span>\n    </span>\n  } @else {\n    <span\n      class=\"ath-kpi__value\"\n      [attr.data-tone]=\"figureTone()\"\n      [class.ath-kpi__value--alert]=\"alert()\"\n      [class.ath-kpi__value--muted]=\"muted()\"\n      >{{ value() }}</span\n    >\n  }\n  @if (note()) {\n    <!-- Under the figure; a narrow tile ends it in an ellipsis, the full\n         text is the tooltip. -->\n    <span class=\"ath-kpi__note\" [attr.title]=\"noteTitle() ?? note()\">{{ note() }}</span>\n  } @else if (showTrend()) {\n    <ath-sparkline [data]=\"samples()\" [color]=\"trendColor()\" />\n  } @else {\n    <!-- No trend: the slot keeps the sparkline's footprint so tiles line up. -->\n    <span class=\"ath-kpi__spark-slot\" aria-hidden=\"true\"></span>\n  }\n</div>\n\n<!-- Under the figure: a progress bar or a short line; nothing when empty. -->\n<div class=\"ath-kpi__extra\"><ng-content /></div>\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:flex;flex-direction:column;justify-content:flex-start;gap:10px;min-width:0;padding:11px var(--space-4);border-left:1px solid var(--border-faint);background:var(--surface)}:host(:first-child){border-left:none}@container ath-kpi-strip (max-width: 920px){:host(:nth-child(odd)){border-left:none}:host(:nth-child(n+3)){border-top:1px solid var(--border-faint)}}.ath-kpi__row{display:flex;align-items:center;justify-content:space-between;gap:var(--space-2)}.ath-kpi__label{overflow:hidden;color:var(--fg-3);font-size:var(--text-sm);font-weight:var(--weight-medium);letter-spacing:-.003em;text-overflow:ellipsis;white-space:nowrap}.ath-kpi__dot{display:inline-block;width:7px;height:7px;margin-inline-end:3px;border-radius:var(--r-full);vertical-align:.05em}.ath-kpi__delta{position:relative;z-index:var(--z-raised);padding:0 var(--space-1);border-radius:var(--r-xs);background:var(--bg-2);color:var(--fg-3);font-family:var(--font-mono);font-size:10.5px;font-feature-settings:\"tnum\";font-weight:var(--weight-medium);line-height:14px;white-space:nowrap}.ath-kpi__delta[data-direction=up]{background:color-mix(in srgb,var(--green) 14%,transparent);color:var(--green-text)}.ath-kpi__delta[data-direction=down]{background:color-mix(in srgb,var(--red) 14%,transparent);color:var(--red-text)}.ath-kpi__bottom{display:flex;align-items:flex-end;justify-content:space-between;gap:10px}.ath-kpi__value{color:var(--fg);font-family:var(--font-sans);font-size:var(--text-2xl);font-variant-numeric:tabular-nums;font-weight:var(--weight-semibold);letter-spacing:-.02em;line-height:1}.ath-kpi__value[data-tone=amber]{color:var(--amber-text)}.ath-kpi__value[data-tone=blue]{color:var(--blue-text)}.ath-kpi__value[data-tone=green]{color:var(--green-text)}.ath-kpi__value[data-tone=red]{color:var(--red-text)}.ath-kpi__value[data-tone=purple]{color:var(--purple-text)}.ath-kpi__value--alert{color:var(--red-text)}.ath-kpi__value--muted{color:var(--fg-4);font-weight:var(--weight-medium)}.ath-kpi__value--loading{display:inline-flex;align-items:center;height:1em}.ath-kpi__bottom--note{flex-direction:column;align-items:stretch;gap:6px}.ath-kpi__note{overflow:hidden;min-width:0;color:var(--fg-3);font-family:var(--font-sans);font-size:var(--text-xs);line-height:16px;text-overflow:ellipsis;white-space:nowrap}.ath-kpi__sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}.ath-kpi__extra{margin-top:-4px}.ath-kpi__extra:empty{display:none}.ath-kpi__spark-slot{display:inline-block;width:70px;height:22px}:host(.ath-kpi--link){position:relative;transition:background var(--t-fast)}:host(.ath-kpi--link):hover{background:var(--bg-2)}:host(.ath-kpi--link):has(.ath-kpi__link:focus-visible){box-shadow:inset 0 0 0 2px var(--focus-ring-color)}.ath-kpi__link{text-decoration:none}.ath-kpi__link:after{content:\"\";position:absolute;inset:0}.ath-kpi__link:focus-visible{outline:none}:host(.ath-kpi--link:hover) .ath-kpi__link{color:var(--fg)}\n"]
		}]
	}],
	propDecorators: {
		label: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "label",
				required: true
			}]
		}],
		value: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "value",
				required: false
			}]
		}],
		delta: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "delta",
				required: false
			}]
		}],
		deltaDirection: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "deltaDirection",
				required: false
			}]
		}],
		deltaTitle: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "deltaTitle",
				required: false
			}]
		}],
		tone: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "tone",
				required: false
			}]
		}],
		spark: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "spark",
				required: false
			}]
		}],
		sparkColor: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "sparkColor",
				required: false
			}]
		}],
		note: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "note",
				required: false
			}]
		}],
		noteTitle: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "noteTitle",
				required: false
			}]
		}],
		alert: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "alert",
				required: false
			}]
		}],
		valueTone: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "valueTone",
				required: false
			}]
		}],
		dot: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "dot",
				required: false
			}]
		}],
		muted: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "muted",
				required: false
			}]
		}],
		link: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "link",
				required: false
			}]
		}],
		linkParams: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "linkParams",
				required: false
			}]
		}],
		linkLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "linkLabel",
				required: false
			}]
		}]
	}
});
var AthKpiStripComponent = class AthKpiStripComponent {
	constructor() {
		this.columns = input(4, ...ngDevMode ? [{ debugName: "columns" }] : /* istanbul ignore next */ []);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthKpiStripComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.1.0",
			version: "22.2.2",
			type: AthKpiStripComponent,
			isStandalone: true,
			selector: "ath-kpi-strip",
			inputs: { columns: {
				classPropertyName: "columns",
				publicName: "columns",
				isSignal: true,
				isRequired: false,
				transformFunction: null
			} },
			host: { attributes: { "role": "group" } },
			ngImport: i0,
			template: `<div class="ath-kpi-strip" [style.--_kpi-cols]="columns()"><ng-content /></div>`,
			isInline: true,
			styles: [":host{display:block;min-width:0;container:ath-kpi-strip/inline-size}.ath-kpi-strip{--_kpi-cols: 4;display:grid;grid-template-columns:repeat(var(--_kpi-cols),minmax(0,1fr));overflow:hidden;border:1px solid var(--border);border-radius:var(--panel-radius);background:var(--surface);box-shadow:var(--shadow-1)}@container ath-kpi-strip (max-width: 920px){.ath-kpi-strip{grid-template-columns:repeat(2,minmax(0,1fr))}}\n"],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthKpiStripComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-kpi-strip",
			changeDetection: ChangeDetectionStrategy.OnPush,
			host: { role: "group" },
			template: `<div class="ath-kpi-strip" [style.--_kpi-cols]="columns()"><ng-content /></div>`,
			styles: [":host{display:block;min-width:0;container:ath-kpi-strip/inline-size}.ath-kpi-strip{--_kpi-cols: 4;display:grid;grid-template-columns:repeat(var(--_kpi-cols),minmax(0,1fr));overflow:hidden;border:1px solid var(--border);border-radius:var(--panel-radius);background:var(--surface);box-shadow:var(--shadow-1)}@container ath-kpi-strip (max-width: 920px){.ath-kpi-strip{grid-template-columns:repeat(2,minmax(0,1fr))}}\n"]
		}]
	}],
	propDecorators: { columns: [{
		type: i0.Input,
		args: [{
			isSignal: true,
			alias: "columns",
			required: false
		}]
	}] }
});
var AthSlaBarComponent = class AthSlaBarComponent {
	constructor() {
		this.response = input(null, ...ngDevMode ? [{ debugName: "response" }] : /* istanbul ignore next */ []);
		this.resolution = input(null, ...ngDevMode ? [{ debugName: "resolution" }] : /* istanbul ignore next */ []);
		this.progressPct = input(0, {
			...ngDevMode ? { debugName: "progressPct" } : /* istanbul ignore next */ {},
			transform: (value) => Math.max(0, Math.min(100, numberAttribute(value, 0)))
		});
		this.severity = computed(() => {
			const r = this.resolution()?.status;
			const rs = this.response()?.status;
			const progress = this.progressPct();
			if (r === "breached" || rs === "breached") return "breached";
			if (progress >= 95) return "breached";
			if (progress >= 80) return "pending";
			if (r === "met" && rs === "met") return "met";
			return "pending";
		}, ...ngDevMode ? [{ debugName: "severity" }] : /* istanbul ignore next */ []);
		this.barTarget = computed(() => this.resolution() ?? this.response(), ...ngDevMode ? [{ debugName: "barTarget" }] : /* istanbul ignore next */ []);
	}
	statusColor(s) {
		switch (s) {
			case "met": return "var(--green-text)";
			case "breached": return "var(--red-text)";
			default: return "var(--amber-text)";
		}
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthSlaBarComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthSlaBarComponent,
			isStandalone: true,
			selector: "ath-sla-bar",
			inputs: {
				response: {
					classPropertyName: "response",
					publicName: "response",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				resolution: {
					classPropertyName: "resolution",
					publicName: "resolution",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				progressPct: {
					classPropertyName: "progressPct",
					publicName: "progressPct",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			host: { properties: { "attr.data-severity": "severity()" } },
			ngImport: i0,
			template: "@if (response(); as response) {\n  <div class=\"ath-sla__row\">\n    <span class=\"ath-sla__name\">{{ response.label }}</span>\n    <span class=\"ath-sla__text\" [style.color]=\"statusColor(response.status)\">{{\n      response.text\n    }}</span>\n  </div>\n}\n@if (resolution(); as resolution) {\n  <div class=\"ath-sla__row\">\n    <span class=\"ath-sla__name\">{{ resolution.label }}</span>\n    <span class=\"ath-sla__text\" [style.color]=\"statusColor(resolution.status)\">{{\n      resolution.text\n    }}</span>\n  </div>\n}\n<div\n  class=\"ath-sla__track\"\n  role=\"progressbar\"\n  [attr.aria-label]=\"barTarget()?.label ?? null\"\n  [attr.aria-valuetext]=\"barTarget()?.text ?? null\"\n  [attr.aria-valuenow]=\"progressPct()\"\n  aria-valuemin=\"0\"\n  aria-valuemax=\"100\"\n>\n  <div class=\"ath-sla__fill\" [style.width.%]=\"progressPct()\"></div>\n</div>\n",
			styles: [":host{display:flex;flex-direction:column;gap:6px}.ath-sla__row{display:flex;align-items:baseline;justify-content:space-between;gap:8px;font-family:var(--font-sans);font-size:12px}.ath-sla__name{color:var(--fg-3);font-weight:500}.ath-sla__text{font-family:var(--font-mono);font-size:11.5px;font-weight:500;letter-spacing:0;font-feature-settings:\"tnum\"}.ath-sla__track{margin-top:4px;height:4px;background:var(--bg-2);border-radius:999px;overflow:hidden}.ath-sla__fill{height:100%;border-radius:999px;background:var(--green);transition:width var(--t-slow),background-color var(--t-base)}:host([data-severity=met]) .ath-sla__fill{background:var(--green)}:host([data-severity=pending]) .ath-sla__fill{background:var(--amber)}:host([data-severity=breached]) .ath-sla__fill{background:var(--red)}\n"],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthSlaBarComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-sla-bar",
			changeDetection: ChangeDetectionStrategy.OnPush,
			host: { "[attr.data-severity]": "severity()" },
			template: "@if (response(); as response) {\n  <div class=\"ath-sla__row\">\n    <span class=\"ath-sla__name\">{{ response.label }}</span>\n    <span class=\"ath-sla__text\" [style.color]=\"statusColor(response.status)\">{{\n      response.text\n    }}</span>\n  </div>\n}\n@if (resolution(); as resolution) {\n  <div class=\"ath-sla__row\">\n    <span class=\"ath-sla__name\">{{ resolution.label }}</span>\n    <span class=\"ath-sla__text\" [style.color]=\"statusColor(resolution.status)\">{{\n      resolution.text\n    }}</span>\n  </div>\n}\n<div\n  class=\"ath-sla__track\"\n  role=\"progressbar\"\n  [attr.aria-label]=\"barTarget()?.label ?? null\"\n  [attr.aria-valuetext]=\"barTarget()?.text ?? null\"\n  [attr.aria-valuenow]=\"progressPct()\"\n  aria-valuemin=\"0\"\n  aria-valuemax=\"100\"\n>\n  <div class=\"ath-sla__fill\" [style.width.%]=\"progressPct()\"></div>\n</div>\n",
			styles: [":host{display:flex;flex-direction:column;gap:6px}.ath-sla__row{display:flex;align-items:baseline;justify-content:space-between;gap:8px;font-family:var(--font-sans);font-size:12px}.ath-sla__name{color:var(--fg-3);font-weight:500}.ath-sla__text{font-family:var(--font-mono);font-size:11.5px;font-weight:500;letter-spacing:0;font-feature-settings:\"tnum\"}.ath-sla__track{margin-top:4px;height:4px;background:var(--bg-2);border-radius:999px;overflow:hidden}.ath-sla__fill{height:100%;border-radius:999px;background:var(--green);transition:width var(--t-slow),background-color var(--t-base)}:host([data-severity=met]) .ath-sla__fill{background:var(--green)}:host([data-severity=pending]) .ath-sla__fill{background:var(--amber)}:host([data-severity=breached]) .ath-sla__fill{background:var(--red)}\n"]
		}]
	}],
	propDecorators: {
		response: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "response",
				required: false
			}]
		}],
		resolution: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "resolution",
				required: false
			}]
		}],
		progressPct: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "progressPct",
				required: false
			}]
		}]
	}
});
var AthProgressComponent = class AthProgressComponent {
	constructor() {
		this.value = input(0, {
			...ngDevMode ? { debugName: "value" } : /* istanbul ignore next */ {},
			transform: (v) => Math.max(0, numberAttribute(v, 0))
		});
		this.total = input(null, ...ngDevMode ? [{ debugName: "total" }] : /* istanbul ignore next */ []);
		this.tone = input("accent", ...ngDevMode ? [{ debugName: "tone" }] : /* istanbul ignore next */ []);
		this.size = input("sm", ...ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []);
		this.showLabel = input(false, {
			...ngDevMode ? { debugName: "showLabel" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.ariaLabel = input(null, ...ngDevMode ? [{ debugName: "ariaLabel" }] : /* istanbul ignore next */ []);
		this.pct = computed(() => {
			const v = this.value();
			const total = this.total();
			if (total != null && total > 0) return Math.min(100, v / total * 100);
			return Math.min(100, v);
		}, ...ngDevMode ? [{ debugName: "pct" }] : /* istanbul ignore next */ []);
		this.label = computed(() => {
			const total = this.total();
			if (total != null) return `${Math.round(this.value())} / ${total}`;
			return `${Math.round(this.pct())}%`;
		}, ...ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthProgressComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthProgressComponent,
			isStandalone: true,
			selector: "ath-progress",
			inputs: {
				value: {
					classPropertyName: "value",
					publicName: "value",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				total: {
					classPropertyName: "total",
					publicName: "total",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				tone: {
					classPropertyName: "tone",
					publicName: "tone",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				size: {
					classPropertyName: "size",
					publicName: "size",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				showLabel: {
					classPropertyName: "showLabel",
					publicName: "showLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				ariaLabel: {
					classPropertyName: "ariaLabel",
					publicName: "ariaLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			host: { properties: {
				"attr.data-tone": "tone()",
				"attr.data-size": "size()"
			} },
			ngImport: i0,
			template: "<div\n  class=\"ath-progress__track\"\n  role=\"progressbar\"\n  [attr.aria-label]=\"ariaLabel()\"\n  [attr.aria-valuenow]=\"pct()\"\n  aria-valuemin=\"0\"\n  aria-valuemax=\"100\"\n>\n  <div class=\"ath-progress__fill\" [style.width.%]=\"pct()\"></div>\n</div>\n@if (showLabel()) {\n  <span class=\"ath-progress__label\">{{ label() }}</span>\n}\n",
			styles: [":host{display:inline-flex;align-items:center;gap:8px;width:100%}.ath-progress__track{flex:1;background:var(--progress-track);border-radius:999px;overflow:hidden;min-width:40px}.ath-progress__fill{height:100%;border-radius:999px;background:var(--progress-fill);transition:width var(--t-slow),background-color var(--t-base)}.ath-progress__label{font-family:var(--font-mono);font-feature-settings:\"tnum\";font-size:11.5px;color:var(--fg-3);white-space:nowrap;flex-shrink:0}:host([data-size=xs]) .ath-progress__track{height:3px}:host([data-size=sm]) .ath-progress__track{height:4px}:host([data-size=md]) .ath-progress__track{height:6px}:host([data-tone=accent]) .ath-progress__fill{background:var(--accent)}:host([data-tone=success]) .ath-progress__fill{background:var(--green)}:host([data-tone=warning]) .ath-progress__fill{background:var(--amber)}:host([data-tone=danger]) .ath-progress__fill{background:var(--red)}:host([data-tone=neutral]) .ath-progress__fill{background:var(--fg-3)}\n"],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthProgressComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-progress",
			changeDetection: ChangeDetectionStrategy.OnPush,
			host: {
				"[attr.data-tone]": "tone()",
				"[attr.data-size]": "size()"
			},
			template: "<div\n  class=\"ath-progress__track\"\n  role=\"progressbar\"\n  [attr.aria-label]=\"ariaLabel()\"\n  [attr.aria-valuenow]=\"pct()\"\n  aria-valuemin=\"0\"\n  aria-valuemax=\"100\"\n>\n  <div class=\"ath-progress__fill\" [style.width.%]=\"pct()\"></div>\n</div>\n@if (showLabel()) {\n  <span class=\"ath-progress__label\">{{ label() }}</span>\n}\n",
			styles: [":host{display:inline-flex;align-items:center;gap:8px;width:100%}.ath-progress__track{flex:1;background:var(--progress-track);border-radius:999px;overflow:hidden;min-width:40px}.ath-progress__fill{height:100%;border-radius:999px;background:var(--progress-fill);transition:width var(--t-slow),background-color var(--t-base)}.ath-progress__label{font-family:var(--font-mono);font-feature-settings:\"tnum\";font-size:11.5px;color:var(--fg-3);white-space:nowrap;flex-shrink:0}:host([data-size=xs]) .ath-progress__track{height:3px}:host([data-size=sm]) .ath-progress__track{height:4px}:host([data-size=md]) .ath-progress__track{height:6px}:host([data-tone=accent]) .ath-progress__fill{background:var(--accent)}:host([data-tone=success]) .ath-progress__fill{background:var(--green)}:host([data-tone=warning]) .ath-progress__fill{background:var(--amber)}:host([data-tone=danger]) .ath-progress__fill{background:var(--red)}:host([data-tone=neutral]) .ath-progress__fill{background:var(--fg-3)}\n"]
		}]
	}],
	propDecorators: {
		value: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "value",
				required: false
			}]
		}],
		total: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "total",
				required: false
			}]
		}],
		tone: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "tone",
				required: false
			}]
		}],
		size: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "size",
				required: false
			}]
		}],
		showLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "showLabel",
				required: false
			}]
		}],
		ariaLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "ariaLabel",
				required: false
			}]
		}]
	}
});
async function copyText(text, doc = document) {
	try {
		await doc.defaultView.navigator.clipboard.writeText(text);
		return true;
	} catch {
		return copyWithSelection(text, doc);
	}
}
function copyWithSelection(text, doc) {
	const previous = doc.activeElement;
	const textarea = doc.createElement("textarea");
	textarea.value = text;
	textarea.setAttribute("readonly", "");
	textarea.style.position = "fixed";
	textarea.style.opacity = "0";
	doc.body.appendChild(textarea);
	textarea.select();
	try {
		return doc.execCommand("copy");
	} catch {
		return false;
	} finally {
		textarea.remove();
		previous?.focus?.();
	}
}
var AthCodeBlockComponent = class AthCodeBlockComponent {
	constructor() {
		this.labels = injectAthLabels();
		this.code = input.required(...ngDevMode ? [{ debugName: "code" }] : /* istanbul ignore next */ []);
		this.language = input(null, ...ngDevMode ? [{ debugName: "language" }] : /* istanbul ignore next */ []);
		this.filename = input(null, ...ngDevMode ? [{ debugName: "filename" }] : /* istanbul ignore next */ []);
		this.showLineNumbers = input(false, {
			...ngDevMode ? { debugName: "showLineNumbers" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.copyable = input(true, {
			...ngDevMode ? { debugName: "copyable" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.copyIcon = Copy;
		this.checkIcon = Check;
		this.copied = signal(false, ...ngDevMode ? [{ debugName: "copied" }] : /* istanbul ignore next */ []);
		this.host = inject(ElementRef);
		this.lines = computed(() => this.code().split("\n"), ...ngDevMode ? [{ debugName: "lines" }] : /* istanbul ignore next */ []);
		inject(DestroyRef).onDestroy(() => clearTimeout(this.resetTimer));
	}
	async copy() {
		if (!await copyText(this.code())) {
			this.selectCode();
			return;
		}
		this.copied.set(true);
		clearTimeout(this.resetTimer);
		this.resetTimer = setTimeout(() => this.copied.set(false), 1500);
	}
	selectCode() {
		const body = this.host.nativeElement.querySelector(".ath-code__body");
		const selection = body?.ownerDocument.getSelection();
		if (!body || !selection) return;
		selection.selectAllChildren(body);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthCodeBlockComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthCodeBlockComponent,
			isStandalone: true,
			selector: "ath-code-block",
			inputs: {
				code: {
					classPropertyName: "code",
					publicName: "code",
					isSignal: true,
					isRequired: true,
					transformFunction: null
				},
				language: {
					classPropertyName: "language",
					publicName: "language",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				filename: {
					classPropertyName: "filename",
					publicName: "filename",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				showLineNumbers: {
					classPropertyName: "showLineNumbers",
					publicName: "showLineNumbers",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				copyable: {
					classPropertyName: "copyable",
					publicName: "copyable",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			host: { properties: { "attr.data-language": "language()" } },
			ngImport: i0,
			template: "@if (language() || filename() || copyable()) {\n  <div class=\"ath-code__head\">\n    <div class=\"ath-code__meta\">\n      @if (language()) {\n        <span class=\"ath-code__lang\">{{ language() }}</span>\n      }\n      @if (filename()) {\n        <span class=\"ath-code__filename\">{{ filename() }}</span>\n      }\n    </div>\n    @if (copyable()) {\n      <button\n        type=\"button\"\n        class=\"ath-code__copy\"\n        [class.ath-code__copy--copied]=\"copied()\"\n        [attr.aria-label]=\"copied() ? labels.copied() : labels.copyCode()\"\n        (click)=\"copy()\"\n      >\n        @if (copied()) {\n          <ath-icon [img]=\"checkIcon\" [size]=\"12\" />\n          <span>{{ labels.copied() }}</span>\n        } @else {\n          <ath-icon [img]=\"copyIcon\" [size]=\"12\" />\n          <span>{{ labels.copy() }}</span>\n        }\n      </button>\n    }\n  </div>\n}\n<pre class=\"ath-code__pre\" tabindex=\"0\"><code class=\"ath-code__code\"><!--\n  -->@if (showLineNumbers()) {<!--\n    --><span class=\"ath-code__gutter\" aria-hidden=\"true\"><!--\n      -->@for (line of lines(); track $index) {<!--\n        --><span class=\"ath-code__lineno\">{{ $index + 1 }}</span><!--\n      -->}<!--\n    --></span><!--\n  -->}<!--\n  --><span class=\"ath-code__body\">{{ code() }}</span><!--\n--></code></pre>\n",
			styles: [":host{display:block;background:var(--surface-2);border:1px solid var(--border);border-radius:var(--r);overflow:hidden;font-family:var(--font-mono)}.ath-code__head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:6px 10px 6px 12px;background:var(--bg-2);border-bottom:1px solid var(--border);font-family:var(--font-sans)}.ath-code__meta{display:inline-flex;align-items:center;gap:8px;min-width:0}.ath-code__lang{font-size:11px;font-weight:500;color:var(--fg-3);text-transform:lowercase;letter-spacing:0}.ath-code__filename{font-family:var(--font-mono);font-size:11.5px;color:var(--fg-2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ath-code__copy{display:inline-flex;align-items:center;gap:5px;padding:3px 8px;background:transparent;border:0;border-radius:var(--r-xs);font-family:var(--font-sans);font-size:11.5px;font-weight:500;color:var(--fg-3);cursor:pointer;transition:background var(--t-fast),color var(--t-fast)}.ath-code__copy:hover{background:var(--hover);color:var(--fg)}.ath-code__copy--copied{color:var(--green-text)}.ath-code__pre{margin:0;padding:12px 14px;overflow-x:auto;font-family:var(--font-mono);font-size:12.5px;line-height:1.6;color:var(--fg);background:var(--surface-2)}.ath-code__code{display:block;font-family:inherit;white-space:pre}.ath-code__gutter{display:inline-flex;flex-direction:column;-webkit-user-select:none;user-select:none;margin-right:14px;padding-right:10px;border-right:1px solid var(--border-faint);color:var(--fg-4);font-size:11.5px;text-align:right;vertical-align:top;float:left}.ath-code__lineno{display:block;line-height:1.6}.ath-code__body{display:inline}\n"],
			dependencies: [{
				kind: "component",
				type: AthIconComponent,
				selector: "ath-icon",
				inputs: [
					"img",
					"size",
					"strokeWidth",
					"color",
					"absoluteStrokeWidth",
					"class"
				]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthCodeBlockComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-code-block",
			imports: [AthIconComponent],
			changeDetection: ChangeDetectionStrategy.OnPush,
			host: { "[attr.data-language]": "language()" },
			template: "@if (language() || filename() || copyable()) {\n  <div class=\"ath-code__head\">\n    <div class=\"ath-code__meta\">\n      @if (language()) {\n        <span class=\"ath-code__lang\">{{ language() }}</span>\n      }\n      @if (filename()) {\n        <span class=\"ath-code__filename\">{{ filename() }}</span>\n      }\n    </div>\n    @if (copyable()) {\n      <button\n        type=\"button\"\n        class=\"ath-code__copy\"\n        [class.ath-code__copy--copied]=\"copied()\"\n        [attr.aria-label]=\"copied() ? labels.copied() : labels.copyCode()\"\n        (click)=\"copy()\"\n      >\n        @if (copied()) {\n          <ath-icon [img]=\"checkIcon\" [size]=\"12\" />\n          <span>{{ labels.copied() }}</span>\n        } @else {\n          <ath-icon [img]=\"copyIcon\" [size]=\"12\" />\n          <span>{{ labels.copy() }}</span>\n        }\n      </button>\n    }\n  </div>\n}\n<pre class=\"ath-code__pre\" tabindex=\"0\"><code class=\"ath-code__code\"><!--\n  -->@if (showLineNumbers()) {<!--\n    --><span class=\"ath-code__gutter\" aria-hidden=\"true\"><!--\n      -->@for (line of lines(); track $index) {<!--\n        --><span class=\"ath-code__lineno\">{{ $index + 1 }}</span><!--\n      -->}<!--\n    --></span><!--\n  -->}<!--\n  --><span class=\"ath-code__body\">{{ code() }}</span><!--\n--></code></pre>\n",
			styles: [":host{display:block;background:var(--surface-2);border:1px solid var(--border);border-radius:var(--r);overflow:hidden;font-family:var(--font-mono)}.ath-code__head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:6px 10px 6px 12px;background:var(--bg-2);border-bottom:1px solid var(--border);font-family:var(--font-sans)}.ath-code__meta{display:inline-flex;align-items:center;gap:8px;min-width:0}.ath-code__lang{font-size:11px;font-weight:500;color:var(--fg-3);text-transform:lowercase;letter-spacing:0}.ath-code__filename{font-family:var(--font-mono);font-size:11.5px;color:var(--fg-2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ath-code__copy{display:inline-flex;align-items:center;gap:5px;padding:3px 8px;background:transparent;border:0;border-radius:var(--r-xs);font-family:var(--font-sans);font-size:11.5px;font-weight:500;color:var(--fg-3);cursor:pointer;transition:background var(--t-fast),color var(--t-fast)}.ath-code__copy:hover{background:var(--hover);color:var(--fg)}.ath-code__copy--copied{color:var(--green-text)}.ath-code__pre{margin:0;padding:12px 14px;overflow-x:auto;font-family:var(--font-mono);font-size:12.5px;line-height:1.6;color:var(--fg);background:var(--surface-2)}.ath-code__code{display:block;font-family:inherit;white-space:pre}.ath-code__gutter{display:inline-flex;flex-direction:column;-webkit-user-select:none;user-select:none;margin-right:14px;padding-right:10px;border-right:1px solid var(--border-faint);color:var(--fg-4);font-size:11.5px;text-align:right;vertical-align:top;float:left}.ath-code__lineno{display:block;line-height:1.6}.ath-code__body{display:inline}\n"]
		}]
	}],
	ctorParameters: () => [],
	propDecorators: {
		code: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "code",
				required: true
			}]
		}],
		language: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "language",
				required: false
			}]
		}],
		filename: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "filename",
				required: false
			}]
		}],
		showLineNumbers: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "showLineNumbers",
				required: false
			}]
		}],
		copyable: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "copyable",
				required: false
			}]
		}]
	}
});
function athEscapeHtml(text) {
	return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function athPlainTextHtml(text) {
	return text.replace(/\r\n?/g, "\n").split(/\n{2,}/).map((p) => p.trim()).filter(Boolean).map((p) => `<p>${athEscapeHtml(p).replace(/\n/g, "<br>")}</p>`).join("");
}
var AthMarkdownComponent = class AthMarkdownComponent {
	constructor() {
		this.sanitizer = inject(DomSanitizer);
		this.defaultParser = inject(ATH_MARKDOWN_PARSER$1, { optional: true });
		this.text = input("", ...ngDevMode ? [{ debugName: "text" }] : /* istanbul ignore next */ []);
		this.parse = input(null, ...ngDevMode ? [{ debugName: "parse" }] : /* istanbul ignore next */ []);
		this.html = input("", ...ngDevMode ? [{ debugName: "html" }] : /* istanbul ignore next */ []);
		this.renderedHtml = computed(() => {
			const direct = this.html();
			if (direct) return this.clean(direct);
			const src = this.text() || "";
			if (!src.trim()) return "";
			const parser = this.parse() ?? this.defaultParser;
			if (!parser) return this.clean(athPlainTextHtml(src));
			try {
				return this.clean(parser(src));
			} catch (err) {
				console.warn("[ath-markdown] parser threw, showing plain text", err);
				return this.clean(athPlainTextHtml(src));
			}
		}, ...ngDevMode ? [{ debugName: "renderedHtml" }] : /* istanbul ignore next */ []);
	}
	clean(html) {
		return this.sanitizer.sanitize(SecurityContext.HTML, html) ?? "";
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthMarkdownComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.1.0",
			version: "22.2.2",
			type: AthMarkdownComponent,
			isStandalone: true,
			selector: "ath-markdown",
			inputs: {
				text: {
					classPropertyName: "text",
					publicName: "text",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				parse: {
					classPropertyName: "parse",
					publicName: "parse",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				html: {
					classPropertyName: "html",
					publicName: "html",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			host: { classAttribute: "ath-markdown" },
			ngImport: i0,
			template: `<div class="ath-md" [innerHTML]="renderedHtml()"></div>`,
			isInline: true,
			styles: [".ath-markdown{display:block;min-width:0}.ath-markdown .ath-md{font-size:inherit;line-height:1.6;color:inherit;overflow-wrap:anywhere}.ath-markdown .ath-md>:first-child{margin-top:0}.ath-markdown .ath-md>:last-child{margin-bottom:0}.ath-markdown .ath-md p,.ath-markdown .ath-md ul,.ath-markdown .ath-md ol,.ath-markdown .ath-md blockquote,.ath-markdown .ath-md pre{margin:0 0 .7em}.ath-markdown .ath-md h1,.ath-markdown .ath-md h2,.ath-markdown .ath-md h3,.ath-markdown .ath-md h4,.ath-markdown .ath-md h5,.ath-markdown .ath-md h6{margin:1.1em 0 .35em;font-weight:600;line-height:1.3;letter-spacing:-.005em;color:var(--fg)}.ath-markdown .ath-md h1,.ath-markdown .ath-md .ath-md__h1{font-size:var(--text-2xl);letter-spacing:-.01em}.ath-markdown .ath-md h2,.ath-markdown .ath-md .ath-md__h2{font-size:var(--text-xl)}.ath-markdown .ath-md h3,.ath-markdown .ath-md h4,.ath-markdown .ath-md h5,.ath-markdown .ath-md h6,.ath-markdown .ath-md .ath-md__h3{font-size:15px}.ath-markdown .ath-md ul,.ath-markdown .ath-md ol{padding-left:1.4em}.ath-markdown .ath-md ul{list-style:disc}.ath-markdown .ath-md ol{list-style:decimal}.ath-markdown .ath-md li{display:list-item}.ath-markdown .ath-md li+li{margin-top:.2em}.ath-markdown .ath-md li>ul,.ath-markdown .ath-md li>ol{margin:.2em 0 0}.ath-markdown .ath-md li>p,.ath-markdown .ath-md li>div>p{margin:0}.ath-markdown .ath-md .ath-md__tasks{padding-left:0;list-style:none}.ath-markdown .ath-md .ath-md__task{display:flex;align-items:flex-start;gap:8px}.ath-markdown .ath-md .ath-md__box{flex:0 0 auto;width:15px;height:15px;margin-top:calc((1.6em - 15px)/2);border:1.5px solid var(--border-strong);border-radius:4px;background:var(--surface)}.ath-markdown .ath-md .ath-md__task--done>.ath-md__box{border-color:var(--control-mark);position:relative;background:var(--control-mark)}.ath-markdown .ath-md .ath-md__task--done>.ath-md__box:after{content:\"\";position:absolute;left:4px;top:1px;width:4px;height:8px;border:solid var(--surface);border-width:0 2px 2px 0;transform:rotate(45deg)}.ath-markdown .ath-md .ath-md__task--done>.ath-md__task-body{color:var(--fg-3);text-decoration:line-through;text-decoration-color:var(--border-strong)}.ath-markdown .ath-md .ath-md__task-body{flex:1 1 auto;min-width:0}.ath-markdown .ath-md .ath-md__table{margin:0 0 .8em;overflow-x:auto}.ath-markdown .ath-md table{width:100%;border-collapse:collapse;font-size:.93em}.ath-markdown .ath-md th,.ath-markdown .ath-md td{min-width:60px;padding:6px 10px;border:1px solid var(--border);text-align:left;vertical-align:top}.ath-markdown .ath-md th>p,.ath-markdown .ath-md td>p{margin:0}.ath-markdown .ath-md th{background:var(--table-head-bg);color:var(--fg-2);font-weight:600}.ath-markdown .ath-md .ath-md__center{text-align:center}.ath-markdown .ath-md .ath-md__right{text-align:right}.ath-markdown .ath-md strong{font-weight:600;color:var(--fg)}.ath-markdown .ath-md del{color:var(--fg-3)}.ath-markdown .ath-md a{color:var(--accent-text);text-decoration:underline;text-decoration-color:color-mix(in srgb,var(--accent) 40%,transparent);text-underline-offset:2px}.ath-markdown .ath-md a:hover{text-decoration-color:var(--accent)}.ath-markdown .ath-md code{padding:.1em .35em;border-radius:var(--r-xs);background:var(--surface-3);font-family:var(--font-mono);font-size:.88em}.ath-markdown .ath-md pre{padding:10px 12px;border:1px solid var(--border);border-radius:var(--r-sm);background:var(--bg-1);overflow-x:auto}.ath-markdown .ath-md pre code{padding:0;background:none;font-size:.85em;line-height:1.5}.ath-markdown .ath-md blockquote{padding:.1em 0 .1em .9em;border-left:3px solid var(--border-strong);color:var(--fg-2)}.ath-markdown .ath-md hr{height:1px;margin:1em 0;border:0;background:var(--border)}.ath-markdown .ath-md .ath-md__mention{padding:0 4px;border-radius:var(--r-xs);background:color-mix(in srgb,var(--accent) 16%,transparent);color:var(--accent-text);font-weight:500}\n"],
			changeDetection: i0.ChangeDetectionStrategy.OnPush,
			encapsulation: i0.ViewEncapsulation.None
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthMarkdownComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-markdown",
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None,
			host: { class: "ath-markdown" },
			template: `<div class="ath-md" [innerHTML]="renderedHtml()"></div>`,
			styles: [".ath-markdown{display:block;min-width:0}.ath-markdown .ath-md{font-size:inherit;line-height:1.6;color:inherit;overflow-wrap:anywhere}.ath-markdown .ath-md>:first-child{margin-top:0}.ath-markdown .ath-md>:last-child{margin-bottom:0}.ath-markdown .ath-md p,.ath-markdown .ath-md ul,.ath-markdown .ath-md ol,.ath-markdown .ath-md blockquote,.ath-markdown .ath-md pre{margin:0 0 .7em}.ath-markdown .ath-md h1,.ath-markdown .ath-md h2,.ath-markdown .ath-md h3,.ath-markdown .ath-md h4,.ath-markdown .ath-md h5,.ath-markdown .ath-md h6{margin:1.1em 0 .35em;font-weight:600;line-height:1.3;letter-spacing:-.005em;color:var(--fg)}.ath-markdown .ath-md h1,.ath-markdown .ath-md .ath-md__h1{font-size:var(--text-2xl);letter-spacing:-.01em}.ath-markdown .ath-md h2,.ath-markdown .ath-md .ath-md__h2{font-size:var(--text-xl)}.ath-markdown .ath-md h3,.ath-markdown .ath-md h4,.ath-markdown .ath-md h5,.ath-markdown .ath-md h6,.ath-markdown .ath-md .ath-md__h3{font-size:15px}.ath-markdown .ath-md ul,.ath-markdown .ath-md ol{padding-left:1.4em}.ath-markdown .ath-md ul{list-style:disc}.ath-markdown .ath-md ol{list-style:decimal}.ath-markdown .ath-md li{display:list-item}.ath-markdown .ath-md li+li{margin-top:.2em}.ath-markdown .ath-md li>ul,.ath-markdown .ath-md li>ol{margin:.2em 0 0}.ath-markdown .ath-md li>p,.ath-markdown .ath-md li>div>p{margin:0}.ath-markdown .ath-md .ath-md__tasks{padding-left:0;list-style:none}.ath-markdown .ath-md .ath-md__task{display:flex;align-items:flex-start;gap:8px}.ath-markdown .ath-md .ath-md__box{flex:0 0 auto;width:15px;height:15px;margin-top:calc((1.6em - 15px)/2);border:1.5px solid var(--border-strong);border-radius:4px;background:var(--surface)}.ath-markdown .ath-md .ath-md__task--done>.ath-md__box{border-color:var(--control-mark);position:relative;background:var(--control-mark)}.ath-markdown .ath-md .ath-md__task--done>.ath-md__box:after{content:\"\";position:absolute;left:4px;top:1px;width:4px;height:8px;border:solid var(--surface);border-width:0 2px 2px 0;transform:rotate(45deg)}.ath-markdown .ath-md .ath-md__task--done>.ath-md__task-body{color:var(--fg-3);text-decoration:line-through;text-decoration-color:var(--border-strong)}.ath-markdown .ath-md .ath-md__task-body{flex:1 1 auto;min-width:0}.ath-markdown .ath-md .ath-md__table{margin:0 0 .8em;overflow-x:auto}.ath-markdown .ath-md table{width:100%;border-collapse:collapse;font-size:.93em}.ath-markdown .ath-md th,.ath-markdown .ath-md td{min-width:60px;padding:6px 10px;border:1px solid var(--border);text-align:left;vertical-align:top}.ath-markdown .ath-md th>p,.ath-markdown .ath-md td>p{margin:0}.ath-markdown .ath-md th{background:var(--table-head-bg);color:var(--fg-2);font-weight:600}.ath-markdown .ath-md .ath-md__center{text-align:center}.ath-markdown .ath-md .ath-md__right{text-align:right}.ath-markdown .ath-md strong{font-weight:600;color:var(--fg)}.ath-markdown .ath-md del{color:var(--fg-3)}.ath-markdown .ath-md a{color:var(--accent-text);text-decoration:underline;text-decoration-color:color-mix(in srgb,var(--accent) 40%,transparent);text-underline-offset:2px}.ath-markdown .ath-md a:hover{text-decoration-color:var(--accent)}.ath-markdown .ath-md code{padding:.1em .35em;border-radius:var(--r-xs);background:var(--surface-3);font-family:var(--font-mono);font-size:.88em}.ath-markdown .ath-md pre{padding:10px 12px;border:1px solid var(--border);border-radius:var(--r-sm);background:var(--bg-1);overflow-x:auto}.ath-markdown .ath-md pre code{padding:0;background:none;font-size:.85em;line-height:1.5}.ath-markdown .ath-md blockquote{padding:.1em 0 .1em .9em;border-left:3px solid var(--border-strong);color:var(--fg-2)}.ath-markdown .ath-md hr{height:1px;margin:1em 0;border:0;background:var(--border)}.ath-markdown .ath-md .ath-md__mention{padding:0 4px;border-radius:var(--r-xs);background:color-mix(in srgb,var(--accent) 16%,transparent);color:var(--accent-text);font-weight:500}\n"]
		}]
	}],
	propDecorators: {
		text: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "text",
				required: false
			}]
		}],
		parse: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "parse",
				required: false
			}]
		}],
		html: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "html",
				required: false
			}]
		}]
	}
});
var AthInputComponent = class AthInputComponent {
	constructor() {
		this.labels = injectAthLabels();
		this.size = input("md", ...ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []);
		this.showPasswordLabel = input(null, ...ngDevMode ? [{ debugName: "showPasswordLabel" }] : /* istanbul ignore next */ []);
		this.hidePasswordLabel = input(null, ...ngDevMode ? [{ debugName: "hidePasswordLabel" }] : /* istanbul ignore next */ []);
		this.label = input("", ...ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []);
		this.type = input("text", ...ngDevMode ? [{ debugName: "type" }] : /* istanbul ignore next */ []);
		this.placeholder = input("", ...ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []);
		this.error = input("", ...ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []);
		this.hint = input("", ...ngDevMode ? [{ debugName: "hint" }] : /* istanbul ignore next */ []);
		this.disabled = input(false, {
			...ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.readonly = input(false, {
			...ngDevMode ? { debugName: "readonly" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.required = input(false, {
			...ngDevMode ? { debugName: "required" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.autocomplete = input("off", ...ngDevMode ? [{ debugName: "autocomplete" }] : /* istanbul ignore next */ []);
		this.inputId = input(`ath-input-${Math.random().toString(36).substr(2, 9)}`, ...ngDevMode ? [{ debugName: "inputId" }] : /* istanbul ignore next */ []);
		this.errorId = computed(() => `${this.inputId()}-error`, ...ngDevMode ? [{ debugName: "errorId" }] : /* istanbul ignore next */ []);
		this.hintId = computed(() => `${this.inputId()}-hint`, ...ngDevMode ? [{ debugName: "hintId" }] : /* istanbul ignore next */ []);
		this.describedBy = computed(() => this.error() ? this.errorId() : this.hint() ? this.hintId() : null, ...ngDevMode ? [{ debugName: "describedBy" }] : /* istanbul ignore next */ []);
		this.fieldValue = signal("", ...ngDevMode ? [{ debugName: "fieldValue" }] : /* istanbul ignore next */ []);
		this.formDisabled = signal(false, ...ngDevMode ? [{ debugName: "formDisabled" }] : /* istanbul ignore next */ []);
		this.isDisabled = computed(() => this.disabled() || this.formDisabled(), ...ngDevMode ? [{ debugName: "isDisabled" }] : /* istanbul ignore next */ []);
		this.showPassword = signal(false, ...ngDevMode ? [{ debugName: "showPassword" }] : /* istanbul ignore next */ []);
		this.showPasswordText = computed(() => this.showPasswordLabel() ?? this.labels.showPassword(), ...ngDevMode ? [{ debugName: "showPasswordText" }] : /* istanbul ignore next */ []);
		this.hidePasswordText = computed(() => this.hidePasswordLabel() ?? this.labels.hidePassword(), ...ngDevMode ? [{ debugName: "hidePasswordText" }] : /* istanbul ignore next */ []);
		this.eyeIcon = Eye;
		this.eyeOffIcon = EyeOff;
		this.alertIcon = AlertCircle;
		this.onChange = () => {};
		this.onTouched = () => {};
	}
	writeValue(value) {
		this.fieldValue.set(value ?? "");
	}
	registerOnChange(fn) {
		this.onChange = fn;
	}
	registerOnTouched(fn) {
		this.onTouched = fn;
	}
	setDisabledState(isDisabled) {
		this.formDisabled.set(isDisabled);
	}
	onInput(event) {
		const target = event.target;
		this.fieldValue.set(target.value);
		this.onChange(target.value);
	}
	togglePassword() {
		this.showPassword.update((shown) => !shown);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthInputComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthInputComponent,
			isStandalone: true,
			selector: "ath-input",
			inputs: {
				size: {
					classPropertyName: "size",
					publicName: "size",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				showPasswordLabel: {
					classPropertyName: "showPasswordLabel",
					publicName: "showPasswordLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				hidePasswordLabel: {
					classPropertyName: "hidePasswordLabel",
					publicName: "hidePasswordLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				label: {
					classPropertyName: "label",
					publicName: "label",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				type: {
					classPropertyName: "type",
					publicName: "type",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				placeholder: {
					classPropertyName: "placeholder",
					publicName: "placeholder",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				error: {
					classPropertyName: "error",
					publicName: "error",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				hint: {
					classPropertyName: "hint",
					publicName: "hint",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				disabled: {
					classPropertyName: "disabled",
					publicName: "disabled",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				readonly: {
					classPropertyName: "readonly",
					publicName: "readonly",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				required: {
					classPropertyName: "required",
					publicName: "required",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				autocomplete: {
					classPropertyName: "autocomplete",
					publicName: "autocomplete",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				inputId: {
					classPropertyName: "inputId",
					publicName: "inputId",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			providers: [{
				provide: NG_VALUE_ACCESSOR,
				useExisting: forwardRef(() => AthInputComponent),
				multi: true
			}],
			ngImport: i0,
			template: "<div\n  class=\"ath-input\"\n  [class.ath-input--sm]=\"size() === 'sm'\"\n  [class.ath-input--error]=\"error()\"\n  [class.ath-input--disabled]=\"isDisabled()\"\n>\n  @if (label()) {\n    <label class=\"ath-input__label\" [for]=\"inputId()\">\n      {{ label() }}\n      @if (required()) {\n        <span class=\"ath-input__required\">*</span>\n      }\n    </label>\n  }\n\n  <div class=\"ath-input__wrapper\">\n    <input\n      [id]=\"inputId()\"\n      [type]=\"showPassword() ? 'text' : type()\"\n      [placeholder]=\"placeholder()\"\n      [disabled]=\"isDisabled()\"\n      [readonly]=\"readonly()\"\n      [attr.aria-required]=\"required() || null\"\n      [attr.aria-invalid]=\"error() ? 'true' : null\"\n      [attr.aria-describedby]=\"describedBy()\"\n      [autocomplete]=\"autocomplete()\"\n      [value]=\"fieldValue()\"\n      (input)=\"onInput($event)\"\n      (blur)=\"onTouched()\"\n      class=\"ath-input__field\"\n    />\n\n    @if (type() === 'password') {\n      <button\n        type=\"button\"\n        class=\"ath-input__toggle\"\n        (click)=\"togglePassword()\"\n        [attr.aria-label]=\"showPassword() ? hidePasswordText() : showPasswordText()\"\n        [attr.aria-pressed]=\"showPassword()\"\n        [attr.aria-controls]=\"inputId()\"\n      >\n        <ath-icon [img]=\"showPassword() ? eyeOffIcon : eyeIcon\" [size]=\"18\" />\n      </button>\n    }\n  </div>\n\n  @if (error()) {\n    <div class=\"ath-input__error\" [id]=\"errorId()\">\n      <ath-icon [img]=\"alertIcon\" [size]=\"14\" />\n      {{ error() }}\n    </div>\n  }\n\n  @if (hint() && !error()) {\n    <div class=\"ath-input__hint\" [id]=\"hintId()\">{{ hint() }}</div>\n  }\n</div>\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}.ath-input{display:flex;flex-direction:column;gap:var(--space-1)}.ath-input__label{font-size:var(--text-sm);font-weight:var(--weight-medium);color:var(--fg)}.ath-input__required{color:var(--red-text);margin-left:2px}.ath-input__wrapper{position:relative;display:flex;align-items:center}.ath-input__field{width:100%;height:44px;padding:0 var(--space-4);font-family:var(--font-sans);font-size:var(--text-md);color:var(--fg);background-color:var(--bg-1);border:1px solid var(--border);border-radius:var(--r);transition:border-color var(--t-fast),box-shadow var(--t-fast),background-color var(--t-fast)}.ath-input__field::placeholder{color:var(--fg-3)}.ath-input__field:hover:not(:disabled):not(:focus){border-color:var(--border-strong)}.ath-input__field:focus-visible{outline:none;border-color:var(--focus-ring-color);box-shadow:var(--field-focus-shadow)}.ath-input__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--bg-2)}.ath-input__toggle{position:absolute;right:var(--space-2);display:flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;color:var(--fg-3);background:none;border:none;border-radius:var(--r-sm);cursor:pointer;transition:color var(--t-fast),background-color var(--t-fast)}.ath-input__toggle:hover{color:var(--fg-2);background-color:var(--bg-2)}.ath-input__toggle:focus-visible{outline:none;box-shadow:inset 0 0 0 2px var(--focus-ring-color)}.ath-input__error{display:flex;align-items:flex-start;gap:var(--space-1);font-size:var(--text-sm);line-height:1.4;color:var(--red-text)}.ath-input__error ath-icon{flex:none;margin-top:2px}.ath-input__hint{font-size:var(--text-sm);color:var(--fg-3)}.ath-input--error .ath-input__field{border-color:var(--red)}.ath-input--error .ath-input__field:focus-visible{outline:none;border-color:var(--red);box-shadow:0 0 0 3px color-mix(in srgb,var(--red) 20%,transparent)}.ath-input--disabled .ath-input__label{opacity:.5}.ath-input--sm .ath-input__field{height:var(--field-h-sm);padding-left:10px;padding-right:10px;font-size:13.5px}@media(pointer:coarse){.ath-input__field,.ath-input--sm .ath-input__field{font-size:max(16px,var(--text-md))}}\n"],
			dependencies: [{
				kind: "ngmodule",
				type: FormsModule
			}, {
				kind: "component",
				type: AthIconComponent,
				selector: "ath-icon",
				inputs: [
					"img",
					"size",
					"strokeWidth",
					"color",
					"absoluteStrokeWidth",
					"class"
				]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthInputComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-input",
			imports: [FormsModule, AthIconComponent],
			changeDetection: ChangeDetectionStrategy.OnPush,
			providers: [{
				provide: NG_VALUE_ACCESSOR,
				useExisting: forwardRef(() => AthInputComponent),
				multi: true
			}],
			template: "<div\n  class=\"ath-input\"\n  [class.ath-input--sm]=\"size() === 'sm'\"\n  [class.ath-input--error]=\"error()\"\n  [class.ath-input--disabled]=\"isDisabled()\"\n>\n  @if (label()) {\n    <label class=\"ath-input__label\" [for]=\"inputId()\">\n      {{ label() }}\n      @if (required()) {\n        <span class=\"ath-input__required\">*</span>\n      }\n    </label>\n  }\n\n  <div class=\"ath-input__wrapper\">\n    <input\n      [id]=\"inputId()\"\n      [type]=\"showPassword() ? 'text' : type()\"\n      [placeholder]=\"placeholder()\"\n      [disabled]=\"isDisabled()\"\n      [readonly]=\"readonly()\"\n      [attr.aria-required]=\"required() || null\"\n      [attr.aria-invalid]=\"error() ? 'true' : null\"\n      [attr.aria-describedby]=\"describedBy()\"\n      [autocomplete]=\"autocomplete()\"\n      [value]=\"fieldValue()\"\n      (input)=\"onInput($event)\"\n      (blur)=\"onTouched()\"\n      class=\"ath-input__field\"\n    />\n\n    @if (type() === 'password') {\n      <button\n        type=\"button\"\n        class=\"ath-input__toggle\"\n        (click)=\"togglePassword()\"\n        [attr.aria-label]=\"showPassword() ? hidePasswordText() : showPasswordText()\"\n        [attr.aria-pressed]=\"showPassword()\"\n        [attr.aria-controls]=\"inputId()\"\n      >\n        <ath-icon [img]=\"showPassword() ? eyeOffIcon : eyeIcon\" [size]=\"18\" />\n      </button>\n    }\n  </div>\n\n  @if (error()) {\n    <div class=\"ath-input__error\" [id]=\"errorId()\">\n      <ath-icon [img]=\"alertIcon\" [size]=\"14\" />\n      {{ error() }}\n    </div>\n  }\n\n  @if (hint() && !error()) {\n    <div class=\"ath-input__hint\" [id]=\"hintId()\">{{ hint() }}</div>\n  }\n</div>\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}.ath-input{display:flex;flex-direction:column;gap:var(--space-1)}.ath-input__label{font-size:var(--text-sm);font-weight:var(--weight-medium);color:var(--fg)}.ath-input__required{color:var(--red-text);margin-left:2px}.ath-input__wrapper{position:relative;display:flex;align-items:center}.ath-input__field{width:100%;height:44px;padding:0 var(--space-4);font-family:var(--font-sans);font-size:var(--text-md);color:var(--fg);background-color:var(--bg-1);border:1px solid var(--border);border-radius:var(--r);transition:border-color var(--t-fast),box-shadow var(--t-fast),background-color var(--t-fast)}.ath-input__field::placeholder{color:var(--fg-3)}.ath-input__field:hover:not(:disabled):not(:focus){border-color:var(--border-strong)}.ath-input__field:focus-visible{outline:none;border-color:var(--focus-ring-color);box-shadow:var(--field-focus-shadow)}.ath-input__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--bg-2)}.ath-input__toggle{position:absolute;right:var(--space-2);display:flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;color:var(--fg-3);background:none;border:none;border-radius:var(--r-sm);cursor:pointer;transition:color var(--t-fast),background-color var(--t-fast)}.ath-input__toggle:hover{color:var(--fg-2);background-color:var(--bg-2)}.ath-input__toggle:focus-visible{outline:none;box-shadow:inset 0 0 0 2px var(--focus-ring-color)}.ath-input__error{display:flex;align-items:flex-start;gap:var(--space-1);font-size:var(--text-sm);line-height:1.4;color:var(--red-text)}.ath-input__error ath-icon{flex:none;margin-top:2px}.ath-input__hint{font-size:var(--text-sm);color:var(--fg-3)}.ath-input--error .ath-input__field{border-color:var(--red)}.ath-input--error .ath-input__field:focus-visible{outline:none;border-color:var(--red);box-shadow:0 0 0 3px color-mix(in srgb,var(--red) 20%,transparent)}.ath-input--disabled .ath-input__label{opacity:.5}.ath-input--sm .ath-input__field{height:var(--field-h-sm);padding-left:10px;padding-right:10px;font-size:13.5px}@media(pointer:coarse){.ath-input__field,.ath-input--sm .ath-input__field{font-size:max(16px,var(--text-md))}}\n"]
		}]
	}],
	propDecorators: {
		size: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "size",
				required: false
			}]
		}],
		showPasswordLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "showPasswordLabel",
				required: false
			}]
		}],
		hidePasswordLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "hidePasswordLabel",
				required: false
			}]
		}],
		label: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "label",
				required: false
			}]
		}],
		type: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "type",
				required: false
			}]
		}],
		placeholder: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "placeholder",
				required: false
			}]
		}],
		error: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "error",
				required: false
			}]
		}],
		hint: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "hint",
				required: false
			}]
		}],
		disabled: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "disabled",
				required: false
			}]
		}],
		readonly: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "readonly",
				required: false
			}]
		}],
		required: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "required",
				required: false
			}]
		}],
		autocomplete: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "autocomplete",
				required: false
			}]
		}],
		inputId: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "inputId",
				required: false
			}]
		}]
	}
});
var AthSelectComponent = class AthSelectComponent {
	constructor() {
		this.size = input("md", ...ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []);
		this.label = input("", ...ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []);
		this.labels = injectAthLabels();
		this.placeholder = input(void 0, ...ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []);
		this.placeholderText = computed(() => this.placeholder() ?? this.labels.selectPlaceholder(), ...ngDevMode ? [{ debugName: "placeholderText" }] : /* istanbul ignore next */ []);
		this.options = input([], ...ngDevMode ? [{ debugName: "options" }] : /* istanbul ignore next */ []);
		this.error = input("", ...ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []);
		this.hint = input("", ...ngDevMode ? [{ debugName: "hint" }] : /* istanbul ignore next */ []);
		this.disabled = input(false, {
			...ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.required = input(false, {
			...ngDevMode ? { debugName: "required" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.ariaLabel = input("", ...ngDevMode ? [{ debugName: "ariaLabel" }] : /* istanbul ignore next */ []);
		this.selectId = input(`ath-select-${Math.random().toString(36).substr(2, 9)}`, ...ngDevMode ? [{ debugName: "selectId" }] : /* istanbul ignore next */ []);
		this.errorId = computed(() => `${this.selectId()}-error`, ...ngDevMode ? [{ debugName: "errorId" }] : /* istanbul ignore next */ []);
		this.hintId = computed(() => `${this.selectId()}-hint`, ...ngDevMode ? [{ debugName: "hintId" }] : /* istanbul ignore next */ []);
		this.describedBy = computed(() => this.error() ? this.errorId() : this.hint() ? this.hintId() : null, ...ngDevMode ? [{ debugName: "describedBy" }] : /* istanbul ignore next */ []);
		this.fieldValue = signal("", ...ngDevMode ? [{ debugName: "fieldValue" }] : /* istanbul ignore next */ []);
		this.formDisabled = signal(false, ...ngDevMode ? [{ debugName: "formDisabled" }] : /* istanbul ignore next */ []);
		this.isDisabled = computed(() => this.disabled() || this.formDisabled(), ...ngDevMode ? [{ debugName: "isDisabled" }] : /* istanbul ignore next */ []);
		this.chevronIcon = ChevronDown;
		this.alertIcon = AlertCircle;
		this.onChange = () => {};
		this.onTouched = () => {};
	}
	writeValue(value) {
		this.fieldValue.set(value ?? "");
	}
	registerOnChange(fn) {
		this.onChange = fn;
	}
	registerOnTouched(fn) {
		this.onTouched = fn;
	}
	setDisabledState(isDisabled) {
		this.formDisabled.set(isDisabled);
	}
	onSelectionChange(event) {
		const target = event.target;
		this.fieldValue.set(target.value);
		this.onChange(target.value);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthSelectComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthSelectComponent,
			isStandalone: true,
			selector: "ath-select",
			inputs: {
				size: {
					classPropertyName: "size",
					publicName: "size",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				label: {
					classPropertyName: "label",
					publicName: "label",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				placeholder: {
					classPropertyName: "placeholder",
					publicName: "placeholder",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				options: {
					classPropertyName: "options",
					publicName: "options",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				error: {
					classPropertyName: "error",
					publicName: "error",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				hint: {
					classPropertyName: "hint",
					publicName: "hint",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				disabled: {
					classPropertyName: "disabled",
					publicName: "disabled",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				required: {
					classPropertyName: "required",
					publicName: "required",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				ariaLabel: {
					classPropertyName: "ariaLabel",
					publicName: "ariaLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				selectId: {
					classPropertyName: "selectId",
					publicName: "selectId",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			providers: [{
				provide: NG_VALUE_ACCESSOR,
				useExisting: forwardRef(() => AthSelectComponent),
				multi: true
			}],
			ngImport: i0,
			template: "<div\n  class=\"ath-select\"\n  [class.ath-select--sm]=\"size() === 'sm'\"\n  [class.ath-select--error]=\"error()\"\n  [class.ath-select--disabled]=\"isDisabled()\"\n>\n  @if (label()) {\n    <label class=\"ath-select__label\" [for]=\"selectId()\">\n      {{ label() }}\n      @if (required()) {\n        <span class=\"ath-select__required\">*</span>\n      }\n    </label>\n  }\n\n  <div class=\"ath-select__wrapper\">\n    <select\n      [id]=\"selectId()\"\n      [attr.aria-label]=\"ariaLabel() || null\"\n      [disabled]=\"isDisabled()\"\n      [attr.aria-required]=\"required() || null\"\n      [attr.aria-invalid]=\"error() ? 'true' : null\"\n      [attr.aria-describedby]=\"describedBy()\"\n      [value]=\"fieldValue()\"\n      (change)=\"onSelectionChange($event)\"\n      (blur)=\"onTouched()\"\n      class=\"ath-select__field\"\n    >\n      @if (placeholderText()) {\n        <option value=\"\" disabled [selected]=\"!fieldValue()\">{{ placeholderText() }}</option>\n      }\n      @for (option of options(); track option.value) {\n        <!-- [selected] as well as the select's [value]: options that arrive after\n             the value (loaded later) must still show it. -->\n        <option\n          [value]=\"option.value\"\n          [disabled]=\"option.disabled\"\n          [selected]=\"option.value === fieldValue()\"\n        >\n          {{ option.label }}\n        </option>\n      }\n    </select>\n    <ath-icon [img]=\"chevronIcon\" [size]=\"16\" class=\"ath-select__chevron\" />\n  </div>\n\n  @if (error()) {\n    <div class=\"ath-select__error\" [id]=\"errorId()\">\n      <ath-icon [img]=\"alertIcon\" [size]=\"14\" />\n      {{ error() }}\n    </div>\n  }\n\n  @if (hint() && !error()) {\n    <div class=\"ath-select__hint\" [id]=\"hintId()\">{{ hint() }}</div>\n  }\n</div>\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}.ath-select{display:flex;flex-direction:column;gap:var(--space-1)}.ath-select__label{font-size:var(--text-sm);font-weight:var(--weight-medium);color:var(--fg)}.ath-select__required{color:var(--red-text);margin-left:2px}.ath-select__wrapper{position:relative;display:flex;align-items:center}.ath-select__field{width:100%;height:44px;padding:0 var(--space-10) 0 var(--space-4);font-family:var(--font-sans);font-size:var(--text-md);color:var(--fg);background-color:var(--bg-1);border:1px solid var(--border);border-radius:var(--r);appearance:none;cursor:pointer;transition:border-color var(--t-fast),box-shadow var(--t-fast)}.ath-select__field:hover:not(:disabled):not(:focus){border-color:var(--border-strong)}.ath-select__field:focus-visible{outline:none;border-color:var(--focus-ring-color);box-shadow:var(--field-focus-shadow)}.ath-select__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--bg-2)}.ath-select__field option{background-color:var(--bg-1);color:var(--fg)}.ath-select__chevron{position:absolute;right:var(--space-3);color:var(--fg-3);pointer-events:none}.ath-select__error{display:flex;align-items:flex-start;gap:var(--space-1);font-size:var(--text-sm);line-height:1.4;color:var(--red-text)}.ath-select__error ath-icon{flex:none;margin-top:2px}.ath-select__hint{font-size:var(--text-sm);color:var(--fg-3)}.ath-select--error .ath-select__field{border-color:var(--red)}.ath-select--error .ath-select__field:focus-visible{outline:none;border-color:var(--red);box-shadow:0 0 0 3px color-mix(in srgb,var(--red) 20%,transparent)}.ath-select--disabled .ath-select__label{opacity:.5}.ath-select--sm .ath-select__field{height:var(--field-h-sm);padding-left:10px;padding-right:32px;font-size:13.5px}\n"],
			dependencies: [
				{
					kind: "ngmodule",
					type: FormsModule
				},
				{
					kind: "directive",
					type: i1.NgSelectOption,
					selector: "option",
					inputs: ["ngValue", "value"]
				},
				{
					kind: "directive",
					type: i1.ɵNgSelectMultipleOption,
					selector: "option",
					inputs: ["ngValue", "value"]
				},
				{
					kind: "component",
					type: AthIconComponent,
					selector: "ath-icon",
					inputs: [
						"img",
						"size",
						"strokeWidth",
						"color",
						"absoluteStrokeWidth",
						"class"
					]
				}
			],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthSelectComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-select",
			imports: [FormsModule, AthIconComponent],
			changeDetection: ChangeDetectionStrategy.OnPush,
			providers: [{
				provide: NG_VALUE_ACCESSOR,
				useExisting: forwardRef(() => AthSelectComponent),
				multi: true
			}],
			template: "<div\n  class=\"ath-select\"\n  [class.ath-select--sm]=\"size() === 'sm'\"\n  [class.ath-select--error]=\"error()\"\n  [class.ath-select--disabled]=\"isDisabled()\"\n>\n  @if (label()) {\n    <label class=\"ath-select__label\" [for]=\"selectId()\">\n      {{ label() }}\n      @if (required()) {\n        <span class=\"ath-select__required\">*</span>\n      }\n    </label>\n  }\n\n  <div class=\"ath-select__wrapper\">\n    <select\n      [id]=\"selectId()\"\n      [attr.aria-label]=\"ariaLabel() || null\"\n      [disabled]=\"isDisabled()\"\n      [attr.aria-required]=\"required() || null\"\n      [attr.aria-invalid]=\"error() ? 'true' : null\"\n      [attr.aria-describedby]=\"describedBy()\"\n      [value]=\"fieldValue()\"\n      (change)=\"onSelectionChange($event)\"\n      (blur)=\"onTouched()\"\n      class=\"ath-select__field\"\n    >\n      @if (placeholderText()) {\n        <option value=\"\" disabled [selected]=\"!fieldValue()\">{{ placeholderText() }}</option>\n      }\n      @for (option of options(); track option.value) {\n        <!-- [selected] as well as the select's [value]: options that arrive after\n             the value (loaded later) must still show it. -->\n        <option\n          [value]=\"option.value\"\n          [disabled]=\"option.disabled\"\n          [selected]=\"option.value === fieldValue()\"\n        >\n          {{ option.label }}\n        </option>\n      }\n    </select>\n    <ath-icon [img]=\"chevronIcon\" [size]=\"16\" class=\"ath-select__chevron\" />\n  </div>\n\n  @if (error()) {\n    <div class=\"ath-select__error\" [id]=\"errorId()\">\n      <ath-icon [img]=\"alertIcon\" [size]=\"14\" />\n      {{ error() }}\n    </div>\n  }\n\n  @if (hint() && !error()) {\n    <div class=\"ath-select__hint\" [id]=\"hintId()\">{{ hint() }}</div>\n  }\n</div>\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}.ath-select{display:flex;flex-direction:column;gap:var(--space-1)}.ath-select__label{font-size:var(--text-sm);font-weight:var(--weight-medium);color:var(--fg)}.ath-select__required{color:var(--red-text);margin-left:2px}.ath-select__wrapper{position:relative;display:flex;align-items:center}.ath-select__field{width:100%;height:44px;padding:0 var(--space-10) 0 var(--space-4);font-family:var(--font-sans);font-size:var(--text-md);color:var(--fg);background-color:var(--bg-1);border:1px solid var(--border);border-radius:var(--r);appearance:none;cursor:pointer;transition:border-color var(--t-fast),box-shadow var(--t-fast)}.ath-select__field:hover:not(:disabled):not(:focus){border-color:var(--border-strong)}.ath-select__field:focus-visible{outline:none;border-color:var(--focus-ring-color);box-shadow:var(--field-focus-shadow)}.ath-select__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--bg-2)}.ath-select__field option{background-color:var(--bg-1);color:var(--fg)}.ath-select__chevron{position:absolute;right:var(--space-3);color:var(--fg-3);pointer-events:none}.ath-select__error{display:flex;align-items:flex-start;gap:var(--space-1);font-size:var(--text-sm);line-height:1.4;color:var(--red-text)}.ath-select__error ath-icon{flex:none;margin-top:2px}.ath-select__hint{font-size:var(--text-sm);color:var(--fg-3)}.ath-select--error .ath-select__field{border-color:var(--red)}.ath-select--error .ath-select__field:focus-visible{outline:none;border-color:var(--red);box-shadow:0 0 0 3px color-mix(in srgb,var(--red) 20%,transparent)}.ath-select--disabled .ath-select__label{opacity:.5}.ath-select--sm .ath-select__field{height:var(--field-h-sm);padding-left:10px;padding-right:32px;font-size:13.5px}\n"]
		}]
	}],
	propDecorators: {
		size: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "size",
				required: false
			}]
		}],
		label: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "label",
				required: false
			}]
		}],
		placeholder: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "placeholder",
				required: false
			}]
		}],
		options: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "options",
				required: false
			}]
		}],
		error: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "error",
				required: false
			}]
		}],
		hint: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "hint",
				required: false
			}]
		}],
		disabled: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "disabled",
				required: false
			}]
		}],
		required: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "required",
				required: false
			}]
		}],
		ariaLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "ariaLabel",
				required: false
			}]
		}],
		selectId: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "selectId",
				required: false
			}]
		}]
	}
});
var AthTextareaComponent = class AthTextareaComponent {
	constructor() {
		this.label = input("", ...ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []);
		this.placeholder = input("", ...ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []);
		this.rows = input(4, {
			...ngDevMode ? { debugName: "rows" } : /* istanbul ignore next */ {},
			transform: numberAttribute
		});
		this.error = input("", ...ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []);
		this.hint = input("", ...ngDevMode ? [{ debugName: "hint" }] : /* istanbul ignore next */ []);
		this.disabled = input(false, {
			...ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.required = input(false, {
			...ngDevMode ? { debugName: "required" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.resize = input("vertical", ...ngDevMode ? [{ debugName: "resize" }] : /* istanbul ignore next */ []);
		this.maxLength = input(null, ...ngDevMode ? [{ debugName: "maxLength" }] : /* istanbul ignore next */ []);
		this.textareaId = input(`ath-textarea-${Math.random().toString(36).substr(2, 9)}`, ...ngDevMode ? [{ debugName: "textareaId" }] : /* istanbul ignore next */ []);
		this.errorId = computed(() => `${this.textareaId()}-error`, ...ngDevMode ? [{ debugName: "errorId" }] : /* istanbul ignore next */ []);
		this.hintId = computed(() => `${this.textareaId()}-hint`, ...ngDevMode ? [{ debugName: "hintId" }] : /* istanbul ignore next */ []);
		this.describedBy = computed(() => this.error() ? this.errorId() : this.hint() ? this.hintId() : null, ...ngDevMode ? [{ debugName: "describedBy" }] : /* istanbul ignore next */ []);
		this.fieldValue = signal("", ...ngDevMode ? [{ debugName: "fieldValue" }] : /* istanbul ignore next */ []);
		this.formDisabled = signal(false, ...ngDevMode ? [{ debugName: "formDisabled" }] : /* istanbul ignore next */ []);
		this.isDisabled = computed(() => this.disabled() || this.formDisabled(), ...ngDevMode ? [{ debugName: "isDisabled" }] : /* istanbul ignore next */ []);
		this.alertIcon = AlertCircle;
		this.onChange = () => {};
		this.onTouched = () => {};
		this.characterCount = computed(() => this.fieldValue().length, ...ngDevMode ? [{ debugName: "characterCount" }] : /* istanbul ignore next */ []);
		this.nearLimit = computed(() => {
			const max = this.maxLength();
			return max != null && this.characterCount() > max * .9;
		}, ...ngDevMode ? [{ debugName: "nearLimit" }] : /* istanbul ignore next */ []);
	}
	writeValue(value) {
		this.fieldValue.set(value ?? "");
	}
	registerOnChange(fn) {
		this.onChange = fn;
	}
	registerOnTouched(fn) {
		this.onTouched = fn;
	}
	setDisabledState(isDisabled) {
		this.formDisabled.set(isDisabled);
	}
	onInput(event) {
		const target = event.target;
		this.fieldValue.set(target.value);
		this.onChange(target.value);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthTextareaComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthTextareaComponent,
			isStandalone: true,
			selector: "ath-textarea",
			inputs: {
				label: {
					classPropertyName: "label",
					publicName: "label",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				placeholder: {
					classPropertyName: "placeholder",
					publicName: "placeholder",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				rows: {
					classPropertyName: "rows",
					publicName: "rows",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				error: {
					classPropertyName: "error",
					publicName: "error",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				hint: {
					classPropertyName: "hint",
					publicName: "hint",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				disabled: {
					classPropertyName: "disabled",
					publicName: "disabled",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				required: {
					classPropertyName: "required",
					publicName: "required",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				resize: {
					classPropertyName: "resize",
					publicName: "resize",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				maxLength: {
					classPropertyName: "maxLength",
					publicName: "maxLength",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				textareaId: {
					classPropertyName: "textareaId",
					publicName: "textareaId",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			providers: [{
				provide: NG_VALUE_ACCESSOR,
				useExisting: forwardRef(() => AthTextareaComponent),
				multi: true
			}],
			ngImport: i0,
			template: "<div\n  class=\"ath-textarea\"\n  [class.ath-textarea--error]=\"error()\"\n  [class.ath-textarea--disabled]=\"isDisabled()\"\n>\n  @if (label()) {\n    <label class=\"ath-textarea__label\" [for]=\"textareaId()\">\n      {{ label() }}\n      @if (required()) {\n        <span class=\"ath-textarea__required\">*</span>\n      }\n    </label>\n  }\n\n  <textarea\n    [id]=\"textareaId()\"\n    [rows]=\"rows()\"\n    [placeholder]=\"placeholder()\"\n    [disabled]=\"isDisabled()\"\n    [attr.aria-required]=\"required() || null\"\n    [attr.aria-invalid]=\"error() ? 'true' : null\"\n    [attr.aria-describedby]=\"describedBy()\"\n    [value]=\"fieldValue()\"\n    [attr.maxlength]=\"maxLength()\"\n    [style.resize]=\"resize()\"\n    (input)=\"onInput($event)\"\n    (blur)=\"onTouched()\"\n    class=\"ath-textarea__field\"\n  ></textarea>\n\n  <div class=\"ath-textarea__meta\">\n    @if (error()) {\n      <div class=\"ath-textarea__error\" [id]=\"errorId()\">\n        <ath-icon [img]=\"alertIcon\" [size]=\"14\" />\n        {{ error() }}\n      </div>\n    } @else if (hint()) {\n      <div class=\"ath-textarea__hint\" [id]=\"hintId()\">{{ hint() }}</div>\n    } @else {\n      <div></div>\n    }\n\n    @if (maxLength()) {\n      <div class=\"ath-textarea__count\" [class.ath-textarea__count--near-limit]=\"nearLimit()\">\n        {{ characterCount() }}/{{ maxLength() }}\n      </div>\n    }\n  </div>\n</div>\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}.ath-textarea{display:flex;flex-direction:column;gap:var(--space-1)}.ath-textarea__label{font-size:var(--text-sm);font-weight:var(--weight-medium);color:var(--fg)}.ath-textarea__required{color:var(--red-text);margin-left:2px}.ath-textarea__field{width:100%;padding:var(--space-3) var(--space-4);font-family:var(--font-sans);font-size:var(--text-md);color:var(--fg);background-color:var(--bg-1);border:1px solid var(--border);border-radius:var(--r);line-height:var(--line-normal);transition:border-color var(--t-fast),box-shadow var(--t-fast)}.ath-textarea__field::placeholder{color:var(--fg-3)}.ath-textarea__field:hover:not(:disabled):not(:focus){border-color:var(--border-strong)}.ath-textarea__field:focus-visible{outline:none;border-color:var(--focus-ring-color);box-shadow:var(--field-focus-shadow)}.ath-textarea__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--bg-2)}.ath-textarea__meta{display:flex;align-items:center;justify-content:space-between;gap:var(--space-2)}.ath-textarea__error{display:flex;align-items:flex-start;gap:var(--space-1);font-size:var(--text-sm);line-height:1.4;color:var(--red-text)}.ath-textarea__error ath-icon{flex:none;margin-top:2px}.ath-textarea__hint{font-size:var(--text-sm);color:var(--fg-3)}.ath-textarea__count{font-size:var(--text-xs);color:var(--fg-3)}.ath-textarea__count--near-limit{color:var(--amber-text)}.ath-textarea--error .ath-textarea__field{border-color:var(--red)}.ath-textarea--error .ath-textarea__field:focus-visible{outline:none;border-color:var(--red);box-shadow:0 0 0 3px color-mix(in srgb,var(--red) 20%,transparent)}.ath-textarea--disabled .ath-textarea__label{opacity:.5}@media(pointer:coarse){.ath-textarea__field{font-size:max(16px,var(--text-md))}}\n"],
			dependencies: [{
				kind: "ngmodule",
				type: FormsModule
			}, {
				kind: "component",
				type: AthIconComponent,
				selector: "ath-icon",
				inputs: [
					"img",
					"size",
					"strokeWidth",
					"color",
					"absoluteStrokeWidth",
					"class"
				]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthTextareaComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-textarea",
			imports: [FormsModule, AthIconComponent],
			changeDetection: ChangeDetectionStrategy.OnPush,
			providers: [{
				provide: NG_VALUE_ACCESSOR,
				useExisting: forwardRef(() => AthTextareaComponent),
				multi: true
			}],
			template: "<div\n  class=\"ath-textarea\"\n  [class.ath-textarea--error]=\"error()\"\n  [class.ath-textarea--disabled]=\"isDisabled()\"\n>\n  @if (label()) {\n    <label class=\"ath-textarea__label\" [for]=\"textareaId()\">\n      {{ label() }}\n      @if (required()) {\n        <span class=\"ath-textarea__required\">*</span>\n      }\n    </label>\n  }\n\n  <textarea\n    [id]=\"textareaId()\"\n    [rows]=\"rows()\"\n    [placeholder]=\"placeholder()\"\n    [disabled]=\"isDisabled()\"\n    [attr.aria-required]=\"required() || null\"\n    [attr.aria-invalid]=\"error() ? 'true' : null\"\n    [attr.aria-describedby]=\"describedBy()\"\n    [value]=\"fieldValue()\"\n    [attr.maxlength]=\"maxLength()\"\n    [style.resize]=\"resize()\"\n    (input)=\"onInput($event)\"\n    (blur)=\"onTouched()\"\n    class=\"ath-textarea__field\"\n  ></textarea>\n\n  <div class=\"ath-textarea__meta\">\n    @if (error()) {\n      <div class=\"ath-textarea__error\" [id]=\"errorId()\">\n        <ath-icon [img]=\"alertIcon\" [size]=\"14\" />\n        {{ error() }}\n      </div>\n    } @else if (hint()) {\n      <div class=\"ath-textarea__hint\" [id]=\"hintId()\">{{ hint() }}</div>\n    } @else {\n      <div></div>\n    }\n\n    @if (maxLength()) {\n      <div class=\"ath-textarea__count\" [class.ath-textarea__count--near-limit]=\"nearLimit()\">\n        {{ characterCount() }}/{{ maxLength() }}\n      </div>\n    }\n  </div>\n</div>\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}.ath-textarea{display:flex;flex-direction:column;gap:var(--space-1)}.ath-textarea__label{font-size:var(--text-sm);font-weight:var(--weight-medium);color:var(--fg)}.ath-textarea__required{color:var(--red-text);margin-left:2px}.ath-textarea__field{width:100%;padding:var(--space-3) var(--space-4);font-family:var(--font-sans);font-size:var(--text-md);color:var(--fg);background-color:var(--bg-1);border:1px solid var(--border);border-radius:var(--r);line-height:var(--line-normal);transition:border-color var(--t-fast),box-shadow var(--t-fast)}.ath-textarea__field::placeholder{color:var(--fg-3)}.ath-textarea__field:hover:not(:disabled):not(:focus){border-color:var(--border-strong)}.ath-textarea__field:focus-visible{outline:none;border-color:var(--focus-ring-color);box-shadow:var(--field-focus-shadow)}.ath-textarea__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--bg-2)}.ath-textarea__meta{display:flex;align-items:center;justify-content:space-between;gap:var(--space-2)}.ath-textarea__error{display:flex;align-items:flex-start;gap:var(--space-1);font-size:var(--text-sm);line-height:1.4;color:var(--red-text)}.ath-textarea__error ath-icon{flex:none;margin-top:2px}.ath-textarea__hint{font-size:var(--text-sm);color:var(--fg-3)}.ath-textarea__count{font-size:var(--text-xs);color:var(--fg-3)}.ath-textarea__count--near-limit{color:var(--amber-text)}.ath-textarea--error .ath-textarea__field{border-color:var(--red)}.ath-textarea--error .ath-textarea__field:focus-visible{outline:none;border-color:var(--red);box-shadow:0 0 0 3px color-mix(in srgb,var(--red) 20%,transparent)}.ath-textarea--disabled .ath-textarea__label{opacity:.5}@media(pointer:coarse){.ath-textarea__field{font-size:max(16px,var(--text-md))}}\n"]
		}]
	}],
	propDecorators: {
		label: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "label",
				required: false
			}]
		}],
		placeholder: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "placeholder",
				required: false
			}]
		}],
		rows: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "rows",
				required: false
			}]
		}],
		error: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "error",
				required: false
			}]
		}],
		hint: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "hint",
				required: false
			}]
		}],
		disabled: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "disabled",
				required: false
			}]
		}],
		required: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "required",
				required: false
			}]
		}],
		resize: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "resize",
				required: false
			}]
		}],
		maxLength: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "maxLength",
				required: false
			}]
		}],
		textareaId: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "textareaId",
				required: false
			}]
		}]
	}
});
var AthToggleComponent = class AthToggleComponent {
	constructor() {
		this.checked = input(false, {
			...ngDevMode ? { debugName: "checked" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.disabled = input(false, {
			...ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.label = input("", ...ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []);
		this.description = input("", ...ngDevMode ? [{ debugName: "description" }] : /* istanbul ignore next */ []);
		this.ariaLabel = input("", ...ngDevMode ? [{ debugName: "ariaLabel" }] : /* istanbul ignore next */ []);
		this.toggled = output();
	}
	toggle() {
		if (!this.disabled()) this.toggled.emit(!this.checked());
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthToggleComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthToggleComponent,
			isStandalone: true,
			selector: "ath-toggle",
			inputs: {
				checked: {
					classPropertyName: "checked",
					publicName: "checked",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				disabled: {
					classPropertyName: "disabled",
					publicName: "disabled",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				label: {
					classPropertyName: "label",
					publicName: "label",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				description: {
					classPropertyName: "description",
					publicName: "description",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				ariaLabel: {
					classPropertyName: "ariaLabel",
					publicName: "ariaLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			outputs: { toggled: "toggled" },
			host: { properties: { "attr.data-bare": "label() || description() ? null : ''" } },
			ngImport: i0,
			template: "<button\n  type=\"button\"\n  class=\"ath-toggle\"\n  [class.ath-toggle--boxed]=\"label() || description()\"\n  [class.ath-toggle--checked]=\"checked()\"\n  [class.ath-toggle--disabled]=\"disabled()\"\n  role=\"switch\"\n  [attr.aria-checked]=\"checked()\"\n  [attr.aria-label]=\"ariaLabel() || null\"\n  [disabled]=\"disabled()\"\n  (click)=\"toggle()\"\n>\n  <span class=\"ath-toggle__track\">\n    <span class=\"ath-toggle__thumb\"></span>\n  </span>\n  @if (label() || description()) {\n    <span class=\"ath-toggle__content\">\n      @if (label()) {\n        <span class=\"ath-toggle__label\">{{ label() }}</span>\n      }\n      @if (description()) {\n        <span class=\"ath-toggle__description\">{{ description() }}</span>\n      }\n    </span>\n  }\n</button>\n",
			styles: [":host([data-bare]){display:inline-flex;vertical-align:top}.ath-toggle{position:relative;display:inline-flex;align-items:center;gap:var(--space-3);padding:0;border:0;background:none;color:var(--fg);text-align:left;cursor:pointer;transition:border-color var(--t-fast),background-color var(--t-fast)}.ath-toggle:focus-visible{outline:none}.ath-toggle:focus-visible .ath-toggle__track{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-ring)}.ath-toggle--boxed{display:flex;width:100%;padding:var(--space-3) var(--space-4);border-radius:var(--r);border:1px solid var(--border);background:var(--surface)}.ath-toggle--boxed:hover:not(.ath-toggle--disabled){border-color:var(--border-strong);background:var(--hover)}.ath-toggle__track{position:relative;flex-shrink:0;width:36px;height:20px;border-radius:var(--r-full);background:var(--control-off-bg);border:1px solid transparent;transition:background-color var(--t-fast),border-color var(--t-fast)}.ath-toggle__thumb{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:var(--r-full);background:var(--control-off-thumb);box-shadow:var(--control-thumb-shadow);transition:transform var(--t-fast),background-color var(--t-fast)}.ath-toggle__content{display:flex;flex-direction:column;gap:2px}.ath-toggle__label{font-size:var(--text-sm);font-weight:var(--weight-medium);color:var(--fg)}.ath-toggle__description{font-size:var(--text-xs);color:var(--fg-3)}.ath-toggle--checked .ath-toggle__track{background:var(--action-primary-bg);border-color:var(--action-primary-bg)}.ath-toggle--checked .ath-toggle__thumb{transform:translate(16px);background:var(--action-primary-fg)}@media(pointer:coarse){.ath-toggle:not(.ath-toggle--boxed):before{content:\"\";position:absolute;inset:-12px -4px}}.ath-toggle--disabled{opacity:.5;cursor:not-allowed}\n"],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthToggleComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-toggle",
			changeDetection: ChangeDetectionStrategy.OnPush,
			host: { "[attr.data-bare]": "label() || description() ? null : ''" },
			template: "<button\n  type=\"button\"\n  class=\"ath-toggle\"\n  [class.ath-toggle--boxed]=\"label() || description()\"\n  [class.ath-toggle--checked]=\"checked()\"\n  [class.ath-toggle--disabled]=\"disabled()\"\n  role=\"switch\"\n  [attr.aria-checked]=\"checked()\"\n  [attr.aria-label]=\"ariaLabel() || null\"\n  [disabled]=\"disabled()\"\n  (click)=\"toggle()\"\n>\n  <span class=\"ath-toggle__track\">\n    <span class=\"ath-toggle__thumb\"></span>\n  </span>\n  @if (label() || description()) {\n    <span class=\"ath-toggle__content\">\n      @if (label()) {\n        <span class=\"ath-toggle__label\">{{ label() }}</span>\n      }\n      @if (description()) {\n        <span class=\"ath-toggle__description\">{{ description() }}</span>\n      }\n    </span>\n  }\n</button>\n",
			styles: [":host([data-bare]){display:inline-flex;vertical-align:top}.ath-toggle{position:relative;display:inline-flex;align-items:center;gap:var(--space-3);padding:0;border:0;background:none;color:var(--fg);text-align:left;cursor:pointer;transition:border-color var(--t-fast),background-color var(--t-fast)}.ath-toggle:focus-visible{outline:none}.ath-toggle:focus-visible .ath-toggle__track{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-ring)}.ath-toggle--boxed{display:flex;width:100%;padding:var(--space-3) var(--space-4);border-radius:var(--r);border:1px solid var(--border);background:var(--surface)}.ath-toggle--boxed:hover:not(.ath-toggle--disabled){border-color:var(--border-strong);background:var(--hover)}.ath-toggle__track{position:relative;flex-shrink:0;width:36px;height:20px;border-radius:var(--r-full);background:var(--control-off-bg);border:1px solid transparent;transition:background-color var(--t-fast),border-color var(--t-fast)}.ath-toggle__thumb{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:var(--r-full);background:var(--control-off-thumb);box-shadow:var(--control-thumb-shadow);transition:transform var(--t-fast),background-color var(--t-fast)}.ath-toggle__content{display:flex;flex-direction:column;gap:2px}.ath-toggle__label{font-size:var(--text-sm);font-weight:var(--weight-medium);color:var(--fg)}.ath-toggle__description{font-size:var(--text-xs);color:var(--fg-3)}.ath-toggle--checked .ath-toggle__track{background:var(--action-primary-bg);border-color:var(--action-primary-bg)}.ath-toggle--checked .ath-toggle__thumb{transform:translate(16px);background:var(--action-primary-fg)}@media(pointer:coarse){.ath-toggle:not(.ath-toggle--boxed):before{content:\"\";position:absolute;inset:-12px -4px}}.ath-toggle--disabled{opacity:.5;cursor:not-allowed}\n"]
		}]
	}],
	propDecorators: {
		checked: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "checked",
				required: false
			}]
		}],
		disabled: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "disabled",
				required: false
			}]
		}],
		label: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "label",
				required: false
			}]
		}],
		description: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "description",
				required: false
			}]
		}],
		ariaLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "ariaLabel",
				required: false
			}]
		}],
		toggled: [{
			type: i0.Output,
			args: ["toggled"]
		}]
	}
});
var AthSearchInputComponent = class AthSearchInputComponent {
	constructor() {
		this.labels = injectAthLabels();
		this.placeholder = input(void 0, ...ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []);
		this.placeholderText = computed(() => this.placeholder() ?? this.labels.searchPlaceholder(), ...ngDevMode ? [{ debugName: "placeholderText" }] : /* istanbul ignore next */ []);
		this.debounce = input(300, {
			...ngDevMode ? { debugName: "debounce" } : /* istanbul ignore next */ {},
			transform: numberAttribute
		});
		this.searched = output();
		this.value = signal("", ...ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []);
		this.searchIcon = Search;
		this.clearIcon = X;
		this.query$ = new Subject();
		this.query$.pipe(debounce(() => timer(this.debounce())), distinctUntilChanged(), takeUntilDestroyed()).subscribe((value) => this.searched.emit(value));
	}
	onInput(event) {
		const target = event.target;
		this.value.set(target.value);
		this.query$.next(target.value);
	}
	clear() {
		this.value.set("");
		this.query$.next("");
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthSearchInputComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthSearchInputComponent,
			isStandalone: true,
			selector: "ath-search-input",
			inputs: {
				placeholder: {
					classPropertyName: "placeholder",
					publicName: "placeholder",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				debounce: {
					classPropertyName: "debounce",
					publicName: "debounce",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			outputs: { searched: "searched" },
			ngImport: i0,
			template: "<div class=\"ath-search-input\">\n  <ath-icon [img]=\"searchIcon\" [size]=\"18\" class=\"ath-search-input__icon\" />\n  <input\n    type=\"text\"\n    class=\"ath-search-input__field\"\n    [placeholder]=\"placeholderText()\"\n    [value]=\"value()\"\n    (input)=\"onInput($event)\"\n  />\n  @if (value()) {\n    <button\n      type=\"button\"\n      class=\"ath-search-input__clear\"\n      [attr.aria-label]=\"labels.clearSearch()\"\n      (click)=\"clear()\"\n    >\n      <ath-icon [img]=\"clearIcon\" [size]=\"16\" />\n    </button>\n  }\n</div>\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}.ath-search-input{position:relative;display:flex;align-items:center}.ath-search-input__icon{position:absolute;left:var(--space-4);color:var(--fg-3);pointer-events:none;transition:color .15s ease}.ath-search-input__field{width:100%;height:42px;padding:0 var(--space-10) 0 42px;font-family:var(--font-sans);font-size:var(--text-sm);color:var(--fg);background-color:var(--bg-1);border:1px solid var(--border);border-radius:var(--r-lg);transition:border-color .15s ease,box-shadow .15s ease,background-color .15s ease}.ath-search-input__field::placeholder{color:var(--fg-3)}.ath-search-input__field:hover:not(:focus){border-color:var(--border-strong);background-color:#ffffff08}.ath-search-input__field:focus-visible{outline:none;border-color:var(--focus-ring-color);box-shadow:var(--field-focus-shadow);background-color:var(--bg-1)}.ath-search-input__field:focus~.ath-search-input__icon{color:var(--accent)}.ath-search-input:focus-within .ath-search-input__icon{color:var(--accent)}.ath-search-input__clear{position:absolute;right:var(--space-2);display:flex;align-items:center;justify-content:center;width:28px;height:28px;padding:0;color:var(--fg-3);background:none;border:none;border-radius:var(--r-sm);cursor:pointer;transition:color .15s ease,background-color .15s ease}.ath-search-input__clear:hover{color:var(--fg-2);background-color:#ffffff0f}\n"],
			dependencies: [{
				kind: "ngmodule",
				type: FormsModule
			}, {
				kind: "component",
				type: AthIconComponent,
				selector: "ath-icon",
				inputs: [
					"img",
					"size",
					"strokeWidth",
					"color",
					"absoluteStrokeWidth",
					"class"
				]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthSearchInputComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-search-input",
			imports: [FormsModule, AthIconComponent],
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: "<div class=\"ath-search-input\">\n  <ath-icon [img]=\"searchIcon\" [size]=\"18\" class=\"ath-search-input__icon\" />\n  <input\n    type=\"text\"\n    class=\"ath-search-input__field\"\n    [placeholder]=\"placeholderText()\"\n    [value]=\"value()\"\n    (input)=\"onInput($event)\"\n  />\n  @if (value()) {\n    <button\n      type=\"button\"\n      class=\"ath-search-input__clear\"\n      [attr.aria-label]=\"labels.clearSearch()\"\n      (click)=\"clear()\"\n    >\n      <ath-icon [img]=\"clearIcon\" [size]=\"16\" />\n    </button>\n  }\n</div>\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}.ath-search-input{position:relative;display:flex;align-items:center}.ath-search-input__icon{position:absolute;left:var(--space-4);color:var(--fg-3);pointer-events:none;transition:color .15s ease}.ath-search-input__field{width:100%;height:42px;padding:0 var(--space-10) 0 42px;font-family:var(--font-sans);font-size:var(--text-sm);color:var(--fg);background-color:var(--bg-1);border:1px solid var(--border);border-radius:var(--r-lg);transition:border-color .15s ease,box-shadow .15s ease,background-color .15s ease}.ath-search-input__field::placeholder{color:var(--fg-3)}.ath-search-input__field:hover:not(:focus){border-color:var(--border-strong);background-color:#ffffff08}.ath-search-input__field:focus-visible{outline:none;border-color:var(--focus-ring-color);box-shadow:var(--field-focus-shadow);background-color:var(--bg-1)}.ath-search-input__field:focus~.ath-search-input__icon{color:var(--accent)}.ath-search-input:focus-within .ath-search-input__icon{color:var(--accent)}.ath-search-input__clear{position:absolute;right:var(--space-2);display:flex;align-items:center;justify-content:center;width:28px;height:28px;padding:0;color:var(--fg-3);background:none;border:none;border-radius:var(--r-sm);cursor:pointer;transition:color .15s ease,background-color .15s ease}.ath-search-input__clear:hover{color:var(--fg-2);background-color:#ffffff0f}\n"]
		}]
	}],
	ctorParameters: () => [],
	propDecorators: {
		placeholder: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "placeholder",
				required: false
			}]
		}],
		debounce: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "debounce",
				required: false
			}]
		}],
		searched: [{
			type: i0.Output,
			args: ["searched"]
		}]
	}
});
var AthSegmentComponent = class AthSegmentComponent {
	constructor() {
		this.options = input.required(...ngDevMode ? [{ debugName: "options" }] : /* istanbul ignore next */ []);
		this.value = input.required(...ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []);
		this.size = input("md", ...ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []);
		this.ariaLabel = input(null, ...ngDevMode ? [{ debugName: "ariaLabel" }] : /* istanbul ignore next */ []);
		this.valueChange = output();
		this.host = inject(ElementRef);
		this.tabStop = computed(() => {
			const options = this.options();
			return tabStopIndex(options.findIndex((option) => option.value === this.value()), options.map((option) => !!option.disabled));
		}, ...ngDevMode ? [{ debugName: "tabStop" }] : /* istanbul ignore next */ []);
		this.trackByValue = (_, item) => item.value;
	}
	select(option) {
		if (option.disabled) return;
		if (option.value !== this.value()) this.valueChange.emit(option.value);
	}
	onKey(event, index) {
		const options = this.options();
		const next = nextTabIndex(event, index, options.map((option) => !!option.disabled), this.host.nativeElement);
		if (next === null) return;
		event.preventDefault();
		this.select(options[next]);
		this.host.nativeElement.querySelectorAll("[role=\"tab\"]")[next]?.focus();
	}
	isActive(option) {
		return option.value === this.value();
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthSegmentComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthSegmentComponent,
			isStandalone: true,
			selector: "ath-segment",
			inputs: {
				options: {
					classPropertyName: "options",
					publicName: "options",
					isSignal: true,
					isRequired: true,
					transformFunction: null
				},
				value: {
					classPropertyName: "value",
					publicName: "value",
					isSignal: true,
					isRequired: true,
					transformFunction: null
				},
				size: {
					classPropertyName: "size",
					publicName: "size",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				ariaLabel: {
					classPropertyName: "ariaLabel",
					publicName: "ariaLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			outputs: { valueChange: "valueChange" },
			host: {
				attributes: { "role": "tablist" },
				properties: {
					"attr.aria-label": "ariaLabel()",
					"attr.data-size": "size()"
				}
			},
			ngImport: i0,
			template: "@for (option of options(); track trackByValue($index, option); let i = $index) {\n  <button\n    type=\"button\"\n    role=\"tab\"\n    class=\"ath-seg__item\"\n    [class.ath-seg__item--active]=\"isActive(option)\"\n    [class.ath-seg__item--disabled]=\"option.disabled\"\n    [attr.aria-selected]=\"isActive(option)\"\n    [attr.aria-disabled]=\"option.disabled || null\"\n    [attr.tabindex]=\"i === tabStop() ? 0 : -1\"\n    [disabled]=\"option.disabled\"\n    (click)=\"select(option)\"\n    (keydown)=\"onKey($event, i)\"\n  >\n    <span class=\"ath-seg__label\">{{ option.label }}</span>\n    @if (option.count != null) {\n      <span class=\"ath-seg__count\">{{ option.count }}</span>\n    }\n  </button>\n}\n",
			styles: [":host{display:inline-flex;align-items:center;gap:2px;padding:2px;background:var(--segment-track-bg);border-radius:var(--r);border:1px solid var(--border)}.ath-seg__item{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:calc(var(--control-h) - 6px);padding:0 10px;background:transparent;border:0;border-radius:var(--r-sm);font-family:var(--font-sans);font-size:var(--control-font);font-weight:500;color:var(--fg-3);cursor:pointer;transition:background var(--t-fast),color var(--t-fast),box-shadow var(--t-fast);white-space:nowrap;letter-spacing:-.005em}.ath-seg__item:hover:not(.ath-seg__item--active):not(.ath-seg__item--disabled){color:var(--fg);background:var(--hover)}.ath-seg__item:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-seg__item--active{background:var(--segment-active-bg);color:var(--segment-active-fg);box-shadow:var(--segment-active-shadow)}.ath-seg__item--disabled{opacity:.5;cursor:not-allowed}.ath-seg__count{display:inline-flex;align-items:center;justify-content:center;min-width:18px;padding:0 5px;height:16px;font-family:var(--font-mono);font-size:10.5px;font-weight:500;border-radius:999px;background:var(--bg-2);color:var(--fg-3);line-height:1}.ath-seg__item--active .ath-seg__count{background:var(--segment-count-active-bg);color:var(--segment-count-active-fg)}:host([data-size=sm]) .ath-seg__item,body.compact :host .ath-seg__item{height:calc(var(--control-h-sm) - 6px);padding:0 9px;font-size:12.5px}@media(pointer:coarse),(max-width:639px){:host .ath-seg__item,:host([data-size=sm]) .ath-seg__item{min-height:32px;padding:0 12px}}\n"],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthSegmentComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-segment",
			changeDetection: ChangeDetectionStrategy.OnPush,
			host: {
				role: "tablist",
				"[attr.aria-label]": "ariaLabel()",
				"[attr.data-size]": "size()"
			},
			template: "@for (option of options(); track trackByValue($index, option); let i = $index) {\n  <button\n    type=\"button\"\n    role=\"tab\"\n    class=\"ath-seg__item\"\n    [class.ath-seg__item--active]=\"isActive(option)\"\n    [class.ath-seg__item--disabled]=\"option.disabled\"\n    [attr.aria-selected]=\"isActive(option)\"\n    [attr.aria-disabled]=\"option.disabled || null\"\n    [attr.tabindex]=\"i === tabStop() ? 0 : -1\"\n    [disabled]=\"option.disabled\"\n    (click)=\"select(option)\"\n    (keydown)=\"onKey($event, i)\"\n  >\n    <span class=\"ath-seg__label\">{{ option.label }}</span>\n    @if (option.count != null) {\n      <span class=\"ath-seg__count\">{{ option.count }}</span>\n    }\n  </button>\n}\n",
			styles: [":host{display:inline-flex;align-items:center;gap:2px;padding:2px;background:var(--segment-track-bg);border-radius:var(--r);border:1px solid var(--border)}.ath-seg__item{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:calc(var(--control-h) - 6px);padding:0 10px;background:transparent;border:0;border-radius:var(--r-sm);font-family:var(--font-sans);font-size:var(--control-font);font-weight:500;color:var(--fg-3);cursor:pointer;transition:background var(--t-fast),color var(--t-fast),box-shadow var(--t-fast);white-space:nowrap;letter-spacing:-.005em}.ath-seg__item:hover:not(.ath-seg__item--active):not(.ath-seg__item--disabled){color:var(--fg);background:var(--hover)}.ath-seg__item:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-seg__item--active{background:var(--segment-active-bg);color:var(--segment-active-fg);box-shadow:var(--segment-active-shadow)}.ath-seg__item--disabled{opacity:.5;cursor:not-allowed}.ath-seg__count{display:inline-flex;align-items:center;justify-content:center;min-width:18px;padding:0 5px;height:16px;font-family:var(--font-mono);font-size:10.5px;font-weight:500;border-radius:999px;background:var(--bg-2);color:var(--fg-3);line-height:1}.ath-seg__item--active .ath-seg__count{background:var(--segment-count-active-bg);color:var(--segment-count-active-fg)}:host([data-size=sm]) .ath-seg__item,body.compact :host .ath-seg__item{height:calc(var(--control-h-sm) - 6px);padding:0 9px;font-size:12.5px}@media(pointer:coarse),(max-width:639px){:host .ath-seg__item,:host([data-size=sm]) .ath-seg__item{min-height:32px;padding:0 12px}}\n"]
		}]
	}],
	propDecorators: {
		options: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "options",
				required: true
			}]
		}],
		value: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "value",
				required: true
			}]
		}],
		size: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "size",
				required: false
			}]
		}],
		ariaLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "ariaLabel",
				required: false
			}]
		}],
		valueChange: [{
			type: i0.Output,
			args: ["valueChange"]
		}]
	}
});
var AthFilterChipComponent = class AthFilterChipComponent {
	constructor() {
		this.labels = injectAthLabels();
		this.label = input.required(...ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []);
		this.value = input("", ...ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []);
		this.active = input(false, {
			...ngDevMode ? { debugName: "active" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.clearable = input(false, {
			...ngDevMode ? { debugName: "clearable" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.disabled = input(false, {
			...ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.clicked = output();
		this.cleared = output();
		this.chevronIcon = ChevronDown;
		this.clearIcon = X;
	}
	clearLabel() {
		return formatAthLabel(this.labels.clearFilter(), { name: this.label() });
	}
	onClick() {
		if (!this.disabled()) this.clicked.emit();
	}
	onClear(event) {
		event.stopPropagation();
		if (!this.disabled()) this.cleared.emit();
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthFilterChipComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthFilterChipComponent,
			isStandalone: true,
			selector: "ath-filter-chip",
			inputs: {
				label: {
					classPropertyName: "label",
					publicName: "label",
					isSignal: true,
					isRequired: true,
					transformFunction: null
				},
				value: {
					classPropertyName: "value",
					publicName: "value",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				active: {
					classPropertyName: "active",
					publicName: "active",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				clearable: {
					classPropertyName: "clearable",
					publicName: "clearable",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				disabled: {
					classPropertyName: "disabled",
					publicName: "disabled",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			outputs: {
				clicked: "clicked",
				cleared: "cleared"
			},
			host: { properties: {
				"attr.data-active": "active() ? 'true' : null",
				"attr.data-disabled": "disabled() ? 'true' : null"
			} },
			ngImport: i0,
			template: "<!-- The pill holds two sibling buttons (open, clear): a button inside a button is invalid and unreachable for AT. -->\n<span class=\"ath-fchip\">\n  <button type=\"button\" class=\"ath-fchip__main\" [disabled]=\"disabled()\" (click)=\"onClick()\">\n    <span class=\"ath-fchip__label\">{{ label() }}</span>\n    <span class=\"ath-fchip__value\">{{ value() }}</span>\n    @if (!(clearable() && active())) {\n      <ath-icon [img]=\"chevronIcon\" [size]=\"11\" class=\"ath-fchip__chevron\" />\n    }\n  </button>\n\n  @if (clearable() && active()) {\n    <button\n      type=\"button\"\n      class=\"ath-fchip__clear\"\n      [disabled]=\"disabled()\"\n      [attr.aria-label]=\"clearLabel()\"\n      (click)=\"onClear($event)\"\n    >\n      <ath-icon [img]=\"clearIcon\" [size]=\"11\" />\n    </button>\n  }\n</span>\n",
			styles: [":host{display:inline-flex}.ath-fchip{display:inline-flex;align-items:center;gap:5px;height:28px;padding:0;background:var(--bg-2);border:1px solid transparent;border-radius:var(--r);font-family:var(--font-sans);font-size:var(--text-sm);font-weight:var(--weight-normal);color:var(--fg-2);cursor:pointer;white-space:nowrap;transition:background var(--t-fast),border-color var(--t-fast),color var(--t-fast),box-shadow var(--t-fast);letter-spacing:-.005em}.ath-fchip:hover:not(:has(:disabled)){background:var(--hover-strong);color:var(--fg)}.ath-fchip:has(.ath-fchip__main:focus-visible){box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-fchip:has(.ath-fchip__main:disabled){opacity:.5;cursor:not-allowed}.ath-fchip__main{display:inline-flex;align-items:center;gap:inherit;height:100%;padding:0 10px;margin:0;background:transparent;border:0;font:inherit;letter-spacing:inherit;color:inherit;cursor:inherit;white-space:inherit}.ath-fchip__main:focus-visible{outline:none}.ath-fchip__main:disabled{cursor:not-allowed}.ath-fchip__main:not(:last-child){padding-inline-end:0}.ath-fchip__label{color:var(--fg-3);font-weight:var(--weight-normal)}.ath-fchip__value{color:var(--fg);font-weight:var(--weight-semibold)}.ath-fchip__chevron{color:var(--fg-4);margin-left:2px}.ath-fchip__clear{display:inline-flex;align-items:center;justify-content:center;margin-inline:2px 8px;width:16px;height:16px;padding:0;background:transparent;border:0;border-radius:999px;color:var(--fg-3);cursor:pointer;transition:background var(--t-fast),color var(--t-fast)}.ath-fchip__clear:hover{background:var(--hover-strong);color:var(--fg)}:host([data-active=true]) .ath-fchip{border-color:var(--chip-active-border)}:host([data-active=true]) .ath-fchip .ath-fchip__label{color:var(--fg-2)}body.compact .ath-fchip{height:22px;font-size:11.5px}body.compact .ath-fchip__main{padding:0 7px}\n"],
			dependencies: [{
				kind: "component",
				type: AthIconComponent,
				selector: "ath-icon",
				inputs: [
					"img",
					"size",
					"strokeWidth",
					"color",
					"absoluteStrokeWidth",
					"class"
				]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthFilterChipComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-filter-chip",
			imports: [AthIconComponent],
			changeDetection: ChangeDetectionStrategy.OnPush,
			host: {
				"[attr.data-active]": "active() ? 'true' : null",
				"[attr.data-disabled]": "disabled() ? 'true' : null"
			},
			template: "<!-- The pill holds two sibling buttons (open, clear): a button inside a button is invalid and unreachable for AT. -->\n<span class=\"ath-fchip\">\n  <button type=\"button\" class=\"ath-fchip__main\" [disabled]=\"disabled()\" (click)=\"onClick()\">\n    <span class=\"ath-fchip__label\">{{ label() }}</span>\n    <span class=\"ath-fchip__value\">{{ value() }}</span>\n    @if (!(clearable() && active())) {\n      <ath-icon [img]=\"chevronIcon\" [size]=\"11\" class=\"ath-fchip__chevron\" />\n    }\n  </button>\n\n  @if (clearable() && active()) {\n    <button\n      type=\"button\"\n      class=\"ath-fchip__clear\"\n      [disabled]=\"disabled()\"\n      [attr.aria-label]=\"clearLabel()\"\n      (click)=\"onClear($event)\"\n    >\n      <ath-icon [img]=\"clearIcon\" [size]=\"11\" />\n    </button>\n  }\n</span>\n",
			styles: [":host{display:inline-flex}.ath-fchip{display:inline-flex;align-items:center;gap:5px;height:28px;padding:0;background:var(--bg-2);border:1px solid transparent;border-radius:var(--r);font-family:var(--font-sans);font-size:var(--text-sm);font-weight:var(--weight-normal);color:var(--fg-2);cursor:pointer;white-space:nowrap;transition:background var(--t-fast),border-color var(--t-fast),color var(--t-fast),box-shadow var(--t-fast);letter-spacing:-.005em}.ath-fchip:hover:not(:has(:disabled)){background:var(--hover-strong);color:var(--fg)}.ath-fchip:has(.ath-fchip__main:focus-visible){box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-fchip:has(.ath-fchip__main:disabled){opacity:.5;cursor:not-allowed}.ath-fchip__main{display:inline-flex;align-items:center;gap:inherit;height:100%;padding:0 10px;margin:0;background:transparent;border:0;font:inherit;letter-spacing:inherit;color:inherit;cursor:inherit;white-space:inherit}.ath-fchip__main:focus-visible{outline:none}.ath-fchip__main:disabled{cursor:not-allowed}.ath-fchip__main:not(:last-child){padding-inline-end:0}.ath-fchip__label{color:var(--fg-3);font-weight:var(--weight-normal)}.ath-fchip__value{color:var(--fg);font-weight:var(--weight-semibold)}.ath-fchip__chevron{color:var(--fg-4);margin-left:2px}.ath-fchip__clear{display:inline-flex;align-items:center;justify-content:center;margin-inline:2px 8px;width:16px;height:16px;padding:0;background:transparent;border:0;border-radius:999px;color:var(--fg-3);cursor:pointer;transition:background var(--t-fast),color var(--t-fast)}.ath-fchip__clear:hover{background:var(--hover-strong);color:var(--fg)}:host([data-active=true]) .ath-fchip{border-color:var(--chip-active-border)}:host([data-active=true]) .ath-fchip .ath-fchip__label{color:var(--fg-2)}body.compact .ath-fchip{height:22px;font-size:11.5px}body.compact .ath-fchip__main{padding:0 7px}\n"]
		}]
	}],
	propDecorators: {
		label: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "label",
				required: true
			}]
		}],
		value: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "value",
				required: false
			}]
		}],
		active: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "active",
				required: false
			}]
		}],
		clearable: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "clearable",
				required: false
			}]
		}],
		disabled: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "disabled",
				required: false
			}]
		}],
		clicked: [{
			type: i0.Output,
			args: ["clicked"]
		}],
		cleared: [{
			type: i0.Output,
			args: ["cleared"]
		}]
	}
});
let nextTriggerId = 0;
var AthOverlayTriggerBase = class AthOverlayTriggerBase {
	constructor() {
		this.host = inject(ElementRef).nativeElement;
		effect(() => this.syncAria(this.isOpen()));
	}
	get control() {
		return focusTarget(this.host);
	}
	controlId() {
		const el = this.control;
		if (!el.id) el.id = `ath-trigger-${++nextTriggerId}`;
		return el.id;
	}
	syncAria(open) {
		const el = this.control;
		el.setAttribute("aria-haspopup", this.popupKind());
		el.setAttribute("aria-expanded", String(open));
		if (open) el.setAttribute("aria-controls", this.popupId());
		else el.removeAttribute("aria-controls");
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthOverlayTriggerBase,
			deps: [],
			target: i0.ɵɵFactoryTarget.Directive
		});
	}
	static {
		this.ɵdir = i0.ɵɵngDeclareDirective({
			minVersion: "14.0.0",
			version: "22.2.2",
			type: AthOverlayTriggerBase,
			isStandalone: true,
			ngImport: i0
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthOverlayTriggerBase,
	decorators: [{ type: Directive }],
	ctorParameters: () => []
});
var AthPopoverTriggerDirective = class AthPopoverTriggerDirective extends AthOverlayTriggerBase {
	constructor() {
		super(...arguments);
		this.popover = input.required({
			...ngDevMode ? { debugName: "popover" } : /* istanbul ignore next */ {},
			alias: "athPopoverTrigger"
		});
		this.popupType = input("dialog", ...ngDevMode ? [{ debugName: "popupType" }] : /* istanbul ignore next */ []);
	}
	popupKind() {
		return this.popupType();
	}
	isOpen() {
		return this.popover().open();
	}
	popupId() {
		return this.popover().panelId();
	}
	onClick() {
		this.popover().toggle(this.host);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthPopoverTriggerDirective,
			deps: null,
			target: i0.ɵɵFactoryTarget.Directive
		});
	}
	static {
		this.ɵdir = i0.ɵɵngDeclareDirective({
			minVersion: "17.1.0",
			version: "22.2.2",
			type: AthPopoverTriggerDirective,
			isStandalone: true,
			selector: "[athPopoverTrigger]",
			inputs: {
				popover: {
					classPropertyName: "popover",
					publicName: "athPopoverTrigger",
					isSignal: true,
					isRequired: true,
					transformFunction: null
				},
				popupType: {
					classPropertyName: "popupType",
					publicName: "popupType",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			host: { listeners: { "click": "onClick()" } },
			exportAs: ["athPopoverTrigger"],
			usesInheritance: true,
			ngImport: i0
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthPopoverTriggerDirective,
	decorators: [{
		type: Directive,
		args: [{
			selector: "[athPopoverTrigger]",
			exportAs: "athPopoverTrigger",
			host: { "(click)": "onClick()" }
		}]
	}],
	propDecorators: {
		popover: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "athPopoverTrigger",
				required: true
			}]
		}],
		popupType: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "popupType",
				required: false
			}]
		}]
	}
});
let nextListboxId = 0;
function foldText(text) {
	return text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLocaleLowerCase();
}
var AthListboxComponent = class AthListboxComponent {
	constructor() {
		this.labels = injectAthLabels();
		this.options = input([], ...ngDevMode ? [{ debugName: "options" }] : /* istanbul ignore next */ []);
		this.multiple = input(false, {
			...ngDevMode ? { debugName: "multiple" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.value = model(null, ...ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []);
		this.values = model([], ...ngDevMode ? [{ debugName: "values" }] : /* istanbul ignore next */ []);
		this.searchable = input(false, {
			...ngDevMode ? { debugName: "searchable" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.query = model("", ...ngDevMode ? [{ debugName: "query" }] : /* istanbul ignore next */ []);
		this.localFilter = input(true, {
			...ngDevMode ? { debugName: "localFilter" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.creatable = input(false, {
			...ngDevMode ? { debugName: "creatable" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.loading = input(false, {
			...ngDevMode ? { debugName: "loading" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.searchPlaceholder = input(null, ...ngDevMode ? [{ debugName: "searchPlaceholder" }] : /* istanbul ignore next */ []);
		this.emptyLabel = input(null, ...ngDevMode ? [{ debugName: "emptyLabel" }] : /* istanbul ignore next */ []);
		this.ariaLabel = input(null, ...ngDevMode ? [{ debugName: "ariaLabel" }] : /* istanbul ignore next */ []);
		this.ariaLabelledby = input(null, ...ngDevMode ? [{ debugName: "ariaLabelledby" }] : /* istanbul ignore next */ []);
		this.optionTemplate = input(null, ...ngDevMode ? [{ debugName: "optionTemplate" }] : /* istanbul ignore next */ []);
		this.maxHeight = input(320, ...ngDevMode ? [{ debugName: "maxHeight" }] : /* istanbul ignore next */ []);
		this.compareWith = input(null, ...ngDevMode ? [{ debugName: "compareWith" }] : /* istanbul ignore next */ []);
		this.autoActivate = input(false, {
			...ngDevMode ? { debugName: "autoActivate" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.picked = output();
		this.create = output();
		this.listId = `ath-listbox-${++nextListboxId}`;
		this.checkIcon = Check;
		this.plusIcon = Plus;
		this.searchIcon = Search;
		this.searchRef = viewChild("search", ...ngDevMode ? [{ debugName: "searchRef" }] : /* istanbul ignore next */ []);
		this.listRef = viewChild.required("list", ...ngDevMode ? [{ debugName: "listRef" }] : /* istanbul ignore next */ []);
		this.activeRaw = signal(-1, ...ngDevMode ? [{ debugName: "activeRaw" }] : /* istanbul ignore next */ []);
		this.highlight = signal("soft", ...ngDevMode ? [{ debugName: "highlight" }] : /* istanbul ignore next */ []);
		this.typeahead = new Typeahead();
		this.searchText = computed(() => this.searchPlaceholder() ?? this.labels.listboxSearch(), ...ngDevMode ? [{ debugName: "searchText" }] : /* istanbul ignore next */ []);
		this.emptyText = computed(() => this.emptyLabel() ?? this.labels.listboxNoMatches(), ...ngDevMode ? [{ debugName: "emptyText" }] : /* istanbul ignore next */ []);
		this.folded = computed(() => this.options().map((o) => foldText(`${o.label} ${o.sublabel ?? ""} ${o.keywords ?? ""}`)), ...ngDevMode ? [{ debugName: "folded" }] : /* istanbul ignore next */ []);
		this.filtered = computed(() => {
			const q = foldText(this.query().trim());
			const options = this.options();
			if (!q || !this.localFilter()) return options;
			const folded = this.folded();
			return options.filter((_, i) => folded[i].includes(q));
		}, ...ngDevMode ? [{ debugName: "filtered" }] : /* istanbul ignore next */ []);
		this.showCreate = computed(() => {
			const q = this.query().trim();
			if (!this.creatable() || !q) return false;
			const fq = foldText(q);
			return !this.options().some((o) => foldText(o.label) === fq);
		}, ...ngDevMode ? [{ debugName: "showCreate" }] : /* istanbul ignore next */ []);
		this.isSelected = computed(() => {
			const eq = this.compareWith();
			const chosen = this.multiple() ? this.values() : this.value() === null ? [] : [this.value()];
			if (eq) return (v) => chosen.some((c) => eq(c, v));
			const set = new Set(chosen);
			return (v) => set.has(v);
		}, ...ngDevMode ? [{ debugName: "isSelected" }] : /* istanbul ignore next */ []);
		this.sections = computed(() => {
			const items = this.filtered();
			const selected = this.isSelected();
			const groups = /* @__PURE__ */ new Map();
			const loose = [];
			for (const o of items) if (o.group) {
				const list = groups.get(o.group);
				if (list) list.push(o);
				else groups.set(o.group, [o]);
			} else loose.push(o);
			const sections = [];
			let index = 0;
			const toRows = (list) => list.map((option) => {
				const i = index++;
				return {
					kind: "option",
					option,
					index: i,
					id: `${this.listId}-opt-${i}`,
					selected: selected(option.value)
				};
			});
			for (const [label, list] of groups) sections.push({
				key: `g:${label}`,
				label,
				labelId: "",
				rows: toRows(list)
			});
			if (loose.length) {
				const label = groups.size > 0 ? this.labels.listboxOtherGroup() : null;
				sections.push({
					key: "g:",
					label,
					labelId: "",
					rows: toRows(loose)
				});
			}
			if (this.showCreate()) {
				const i = index++;
				sections.push({
					key: "create",
					label: null,
					labelId: "",
					rows: [{
						kind: "create",
						index: i,
						id: `${this.listId}-create`,
						label: formatAthLabel(this.labels.listboxCreate(), { query: this.query().trim() })
					}]
				});
			}
			sections.forEach((s, k) => s.labelId = `${this.listId}-group-${k}`);
			return sections;
		}, ...ngDevMode ? [{ debugName: "sections" }] : /* istanbul ignore next */ []);
		this.rows = computed(() => this.sections().flatMap((s) => s.rows), ...ngDevMode ? [{ debugName: "rows" }] : /* istanbul ignore next */ []);
		this.activeIndex = computed(() => {
			const i = this.activeRaw();
			const count = this.rows().length;
			if (i >= 0 && i < count) return i;
			return this.autoActivate() ? edgeIndex(count, this.usable) : -1;
		}, ...ngDevMode ? [{ debugName: "activeIndex" }] : /* istanbul ignore next */ []);
		this.activeId = computed(() => this.rows()[this.activeIndex()]?.id ?? null, ...ngDevMode ? [{ debugName: "activeId" }] : /* istanbul ignore next */ []);
		this.usable = (i) => {
			const row = this.rows()[i];
			return !!row && (row.kind === "create" || !row.option.disabled);
		};
		effect((onCleanup) => {
			const list = this.listRef().nativeElement;
			onCleanup(untracked(() => containScrollWhileOverflowing(list)));
		});
	}
	focus() {
		focusSafely(this.searchRef()?.nativeElement ?? this.listRef().nativeElement);
	}
	resetActive() {
		const rows = this.rows();
		const selected = rows.findIndex((r) => r.kind === "option" && r.selected);
		this.activeRaw.set(selected >= 0 ? selected : edgeIndex(rows.length, this.usable));
		this.highlight.set(selected >= 0 ? "none" : "soft");
		this.scrollToActive();
	}
	choose(index) {
		const row = this.rows()[index];
		if (!row) return;
		this.activeRaw.set(index);
		if (row.kind === "create") {
			this.create.emit(this.query().trim());
			return;
		}
		const { option } = row;
		if (option.disabled) return;
		if (this.multiple()) {
			const eq = this.compareWith() ?? Object.is;
			const current = this.values();
			this.values.set(row.selected ? current.filter((v) => !eq(v, option.value)) : [...current, option.value]);
		} else this.value.set(option.value);
		this.picked.emit(option);
	}
	optionIcon(option) {
		return typeof option.icon === "object" ? option.icon : null;
	}
	onQueryInput(event) {
		this.query.set(event.target.value);
		this.activeRaw.set(edgeIndex(this.rows().length, this.usable));
		this.highlight.set("soft");
		this.listRef().nativeElement.scrollTop = 0;
	}
	handleKeydown(event) {
		const count = this.rows().length;
		const searchable = this.searchable();
		const active = this.activeIndex();
		let next;
		switch (event.key) {
			case "ArrowDown":
				next = active < 0 ? edgeIndex(count, this.usable) : stepIndex(count, active, 1, this.usable, false);
				break;
			case "ArrowUp":
				next = active < 0 ? edgeIndex(count, this.usable, true) : stepIndex(count, active, -1, this.usable, false);
				break;
			case "PageDown":
				next = this.jump(active, 10);
				break;
			case "PageUp":
				next = this.jump(active, -10);
				break;
			case "Home":
			case "End":
				if (searchable) return;
				next = edgeIndex(count, this.usable, event.key === "End");
				break;
			case "Enter":
				if (active < 0) return;
				event.preventDefault();
				this.choose(active);
				return;
			case " ":
				if (searchable || active < 0) return;
				event.preventDefault();
				this.choose(active);
				return;
			default:
				if (searchable || !isTypeaheadKey(event)) return;
				next = this.typeahead.next(event.key, this.rowLabels(), Math.max(active, 0));
				if (next < 0) return;
		}
		event.preventDefault();
		if (next >= 0) {
			this.activeRaw.set(next);
			this.highlight.set("ring");
			this.scrollToActive();
		}
	}
	onListClick(event) {
		const index = this.rowIndexAt(event);
		if (index >= 0) this.choose(index);
	}
	onListMousedown(event) {
		if (this.searchable() && this.rowIndexAt(event) >= 0) event.preventDefault();
	}
	onListHover(event) {
		const index = this.rowIndexAt(event);
		if (index < 0 || !this.usable(index)) return;
		if (index !== this.activeRaw()) this.activeRaw.set(index);
		this.highlight.set("soft");
	}
	jump(from, delta) {
		const count = this.rows().length;
		let i = Math.max(0, Math.min(count - 1, (from < 0 ? 0 : from) + delta));
		const step = delta > 0 ? -1 : 1;
		while (i >= 0 && i < count && !this.usable(i)) i += step;
		return i >= 0 && i < count ? i : from;
	}
	rowLabels() {
		return this.rows().map((r) => r.kind === "option" ? r.option.label : r.label);
	}
	rowIndexAt(event) {
		const el = (event.target instanceof Element ? event.target : null)?.closest("[data-index]");
		if (!el || !this.listRef().nativeElement.contains(el)) return -1;
		return Number(el.dataset["index"]);
	}
	scrollToActive() {
		const id = this.activeId();
		if (!id) return;
		this.listRef().nativeElement.ownerDocument.getElementById(id)?.scrollIntoView({ block: "nearest" });
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthListboxComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthListboxComponent,
			isStandalone: true,
			selector: "ath-listbox",
			inputs: {
				options: {
					classPropertyName: "options",
					publicName: "options",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				multiple: {
					classPropertyName: "multiple",
					publicName: "multiple",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				value: {
					classPropertyName: "value",
					publicName: "value",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				values: {
					classPropertyName: "values",
					publicName: "values",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				searchable: {
					classPropertyName: "searchable",
					publicName: "searchable",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				query: {
					classPropertyName: "query",
					publicName: "query",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				localFilter: {
					classPropertyName: "localFilter",
					publicName: "localFilter",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				creatable: {
					classPropertyName: "creatable",
					publicName: "creatable",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				loading: {
					classPropertyName: "loading",
					publicName: "loading",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				searchPlaceholder: {
					classPropertyName: "searchPlaceholder",
					publicName: "searchPlaceholder",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				emptyLabel: {
					classPropertyName: "emptyLabel",
					publicName: "emptyLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				ariaLabel: {
					classPropertyName: "ariaLabel",
					publicName: "ariaLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				ariaLabelledby: {
					classPropertyName: "ariaLabelledby",
					publicName: "ariaLabelledby",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				optionTemplate: {
					classPropertyName: "optionTemplate",
					publicName: "optionTemplate",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				maxHeight: {
					classPropertyName: "maxHeight",
					publicName: "maxHeight",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				compareWith: {
					classPropertyName: "compareWith",
					publicName: "compareWith",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				autoActivate: {
					classPropertyName: "autoActivate",
					publicName: "autoActivate",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			outputs: {
				value: "valueChange",
				values: "valuesChange",
				query: "queryChange",
				picked: "picked",
				create: "create"
			},
			viewQueries: [{
				propertyName: "searchRef",
				first: true,
				predicate: ["search"],
				descendants: true,
				isSignal: true
			}, {
				propertyName: "listRef",
				first: true,
				predicate: ["list"],
				descendants: true,
				isSignal: true
			}],
			exportAs: ["athListbox"],
			ngImport: i0,
			template: "@if (searchable()) {\n  <div class=\"ath-listbox__search\">\n    <ath-icon class=\"ath-listbox__search-icon\" [img]=\"searchIcon\" [size]=\"14\" aria-hidden=\"true\" />\n    <input\n      #search\n      class=\"ath-listbox__search-input\"\n      type=\"text\"\n      role=\"combobox\"\n      aria-autocomplete=\"list\"\n      aria-expanded=\"true\"\n      autocomplete=\"off\"\n      spellcheck=\"false\"\n      [attr.aria-controls]=\"listId\"\n      [attr.aria-activedescendant]=\"activeId()\"\n      [attr.aria-label]=\"searchText()\"\n      [placeholder]=\"searchText()\"\n      [value]=\"query()\"\n      (input)=\"onQueryInput($event)\"\n      (keydown)=\"handleKeydown($event)\"\n    />\n  </div>\n}\n\n@if (loading()) {\n  <div class=\"ath-listbox__status\" role=\"status\">{{ labels.loading() }}</div>\n} @else if (rows().length === 0) {\n  <div class=\"ath-listbox__status\" role=\"status\">{{ emptyText() }}</div>\n}\n\n<ul\n  #list\n  class=\"ath-listbox__list\"\n  role=\"listbox\"\n  [id]=\"listId\"\n  [attr.tabindex]=\"searchable() ? -1 : 0\"\n  [attr.aria-multiselectable]=\"multiple() || null\"\n  [attr.aria-label]=\"ariaLabel()\"\n  [attr.aria-labelledby]=\"ariaLabelledby()\"\n  [attr.aria-busy]=\"loading() || null\"\n  [attr.aria-activedescendant]=\"searchable() ? null : activeId()\"\n  [attr.data-highlight]=\"highlight()\"\n  [style.max-height.px]=\"maxHeight()\"\n  (keydown)=\"handleKeydown($event)\"\n  (click)=\"onListClick($event)\"\n  (mousedown)=\"onListMousedown($event)\"\n  (mousemove)=\"onListHover($event)\"\n>\n  @for (section of sections(); track section.key) {\n    @if (section.label) {\n      <li class=\"ath-listbox__section\" role=\"presentation\">\n        <div class=\"ath-listbox__group-label\" [id]=\"section.labelId\">{{ section.label }}</div>\n        <ul class=\"ath-listbox__group\" role=\"group\" [attr.aria-labelledby]=\"section.labelId\">\n          @for (row of section.rows; track row.id) {\n            <ng-container\n              [ngTemplateOutlet]=\"rowTpl\"\n              [ngTemplateOutletContext]=\"{ $implicit: row }\"\n            />\n          }\n        </ul>\n      </li>\n    } @else {\n      @for (row of section.rows; track row.id) {\n        <ng-container [ngTemplateOutlet]=\"rowTpl\" [ngTemplateOutletContext]=\"{ $implicit: row }\" />\n      }\n    }\n  }\n</ul>\n\n<ng-template #rowTpl let-row>\n  @if (row.kind === 'option') {\n    <li\n      class=\"ath-listbox__option\"\n      role=\"option\"\n      [id]=\"row.id\"\n      [attr.data-index]=\"row.index\"\n      [attr.aria-selected]=\"row.selected\"\n      [attr.aria-disabled]=\"row.option.disabled || null\"\n      [class.ath-listbox__option--active]=\"row.index === activeIndex()\"\n      [class.ath-listbox__option--selected]=\"row.selected\"\n      [class.ath-listbox__option--disabled]=\"row.option.disabled\"\n    >\n      @if (multiple()) {\n        <span\n          class=\"ath-listbox__check\"\n          [class.ath-listbox__check--on]=\"row.selected\"\n          aria-hidden=\"true\"\n        >\n          @if (row.selected) {\n            <ath-icon [img]=\"checkIcon\" [size]=\"12\" />\n          }\n        </span>\n      }\n      @if (optionTemplate(); as tpl) {\n        <ng-container\n          [ngTemplateOutlet]=\"tpl\"\n          [ngTemplateOutletContext]=\"{\n            $implicit: row.option,\n            selected: row.selected,\n            active: row.index === activeIndex(),\n          }\"\n        />\n      } @else {\n        @if (optionIcon(row.option); as icon) {\n          <ath-icon class=\"ath-listbox__icon\" [img]=\"icon\" [size]=\"14\" aria-hidden=\"true\" />\n        }\n        <span class=\"ath-listbox__text\">\n          <span class=\"ath-listbox__label\">{{ row.option.label }}</span>\n          @if (row.option.sublabel) {\n            <span class=\"ath-listbox__sub\">{{ row.option.sublabel }}</span>\n          }\n        </span>\n        @if (!multiple() && row.selected) {\n          <ath-icon class=\"ath-listbox__tick\" [img]=\"checkIcon\" [size]=\"14\" aria-hidden=\"true\" />\n        }\n      }\n    </li>\n  } @else {\n    <li\n      class=\"ath-listbox__option ath-listbox__option--create\"\n      role=\"option\"\n      aria-selected=\"false\"\n      [id]=\"row.id\"\n      [attr.data-index]=\"row.index\"\n      [class.ath-listbox__option--active]=\"row.index === activeIndex()\"\n    >\n      <ath-icon class=\"ath-listbox__icon\" [img]=\"plusIcon\" [size]=\"14\" aria-hidden=\"true\" />\n      <span class=\"ath-listbox__label\">{{ row.label }}</span>\n    </li>\n  }\n</ng-template>\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:flex;flex-direction:column;min-width:0;font-family:var(--font-sans);font-size:var(--text-base);color:var(--fg-2)}.ath-listbox__search{display:flex;align-items:center;gap:var(--space-2);margin:0 0 var(--space-1);padding:0 var(--space-2);background:var(--surface-3);border:1px solid transparent;border-radius:var(--r);transition:background-color var(--t-fast),border-color var(--t-fast)}.ath-listbox__search:focus-within{background:var(--surface);border-color:var(--border-strong)}.ath-listbox__search-icon{flex-shrink:0;color:var(--fg-4)}.ath-listbox__search-input{flex:1;min-width:0;height:var(--space-8);padding:0;font:inherit;color:var(--fg);background:transparent;border:0}.ath-listbox__search-input:focus{outline:none}.ath-listbox__search-input::placeholder{color:var(--fg-4)}.ath-listbox__list{margin:0;padding:0;overflow-y:auto;list-style:none}.ath-listbox__list:focus{outline:none}.ath-listbox__list:focus-visible{border-radius:var(--r-sm);outline:none;box-shadow:inset 0 0 0 2px var(--focus-ring-color)}.ath-listbox__section{display:block}.ath-listbox__group{margin:0;padding:0;list-style:none}.ath-listbox__group-label{padding:var(--space-2) var(--space-2) var(--space-1);font-size:var(--text-xs);font-weight:var(--weight-medium);letter-spacing:.04em;text-transform:uppercase;color:var(--fg-label)}.ath-listbox__option{display:flex;align-items:center;gap:var(--space-2);min-height:var(--space-8);padding:var(--space-1) var(--space-2);border-radius:var(--r-sm);cursor:pointer;-webkit-user-select:none;user-select:none;content-visibility:auto;contain-intrinsic-size:auto var(--space-8)}.ath-listbox__option--disabled{color:var(--fg-4);cursor:not-allowed}.ath-listbox__option--create{color:var(--fg)}.ath-listbox__list:is([data-highlight=soft],[data-highlight=ring]) .ath-listbox__option--active:not(.ath-listbox__option--disabled){color:var(--fg);background:var(--hover-strong)}:host(:has(:focus-visible)) .ath-listbox__list[data-highlight=ring] .ath-listbox__option--active{outline:none;box-shadow:inset 0 0 0 2px var(--focus-ring-color)}.ath-listbox__check{display:inline-flex;flex-shrink:0;align-items:center;justify-content:center;width:16px;height:16px;color:var(--surface);border:1px solid var(--border-strong);border-radius:var(--r-sm)}.ath-listbox__check--on{background:var(--control-checked);border-color:var(--control-checked)}.ath-listbox__icon{flex-shrink:0;color:var(--fg-3)}.ath-listbox__text{display:flex;flex:1;flex-direction:column;min-width:0}.ath-listbox__label,.ath-listbox__sub{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ath-listbox__label{flex:1;min-width:0}.ath-listbox__sub{font-size:var(--text-xs);color:var(--fg-3)}.ath-listbox__tick{flex-shrink:0;color:var(--accent)}.ath-listbox__status{padding:var(--space-3) var(--space-2);font-size:var(--text-sm);color:var(--fg-3);text-align:center}\n"],
			dependencies: [{
				kind: "directive",
				type: NgTemplateOutlet,
				selector: "[ngTemplateOutlet]",
				inputs: [
					"ngTemplateOutletContext",
					"ngTemplateOutlet",
					"ngTemplateOutletInjector"
				]
			}, {
				kind: "component",
				type: AthIconComponent,
				selector: "ath-icon",
				inputs: [
					"img",
					"size",
					"strokeWidth",
					"color",
					"absoluteStrokeWidth",
					"class"
				]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthListboxComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-listbox",
			imports: [NgTemplateOutlet, AthIconComponent],
			changeDetection: ChangeDetectionStrategy.OnPush,
			exportAs: "athListbox",
			template: "@if (searchable()) {\n  <div class=\"ath-listbox__search\">\n    <ath-icon class=\"ath-listbox__search-icon\" [img]=\"searchIcon\" [size]=\"14\" aria-hidden=\"true\" />\n    <input\n      #search\n      class=\"ath-listbox__search-input\"\n      type=\"text\"\n      role=\"combobox\"\n      aria-autocomplete=\"list\"\n      aria-expanded=\"true\"\n      autocomplete=\"off\"\n      spellcheck=\"false\"\n      [attr.aria-controls]=\"listId\"\n      [attr.aria-activedescendant]=\"activeId()\"\n      [attr.aria-label]=\"searchText()\"\n      [placeholder]=\"searchText()\"\n      [value]=\"query()\"\n      (input)=\"onQueryInput($event)\"\n      (keydown)=\"handleKeydown($event)\"\n    />\n  </div>\n}\n\n@if (loading()) {\n  <div class=\"ath-listbox__status\" role=\"status\">{{ labels.loading() }}</div>\n} @else if (rows().length === 0) {\n  <div class=\"ath-listbox__status\" role=\"status\">{{ emptyText() }}</div>\n}\n\n<ul\n  #list\n  class=\"ath-listbox__list\"\n  role=\"listbox\"\n  [id]=\"listId\"\n  [attr.tabindex]=\"searchable() ? -1 : 0\"\n  [attr.aria-multiselectable]=\"multiple() || null\"\n  [attr.aria-label]=\"ariaLabel()\"\n  [attr.aria-labelledby]=\"ariaLabelledby()\"\n  [attr.aria-busy]=\"loading() || null\"\n  [attr.aria-activedescendant]=\"searchable() ? null : activeId()\"\n  [attr.data-highlight]=\"highlight()\"\n  [style.max-height.px]=\"maxHeight()\"\n  (keydown)=\"handleKeydown($event)\"\n  (click)=\"onListClick($event)\"\n  (mousedown)=\"onListMousedown($event)\"\n  (mousemove)=\"onListHover($event)\"\n>\n  @for (section of sections(); track section.key) {\n    @if (section.label) {\n      <li class=\"ath-listbox__section\" role=\"presentation\">\n        <div class=\"ath-listbox__group-label\" [id]=\"section.labelId\">{{ section.label }}</div>\n        <ul class=\"ath-listbox__group\" role=\"group\" [attr.aria-labelledby]=\"section.labelId\">\n          @for (row of section.rows; track row.id) {\n            <ng-container\n              [ngTemplateOutlet]=\"rowTpl\"\n              [ngTemplateOutletContext]=\"{ $implicit: row }\"\n            />\n          }\n        </ul>\n      </li>\n    } @else {\n      @for (row of section.rows; track row.id) {\n        <ng-container [ngTemplateOutlet]=\"rowTpl\" [ngTemplateOutletContext]=\"{ $implicit: row }\" />\n      }\n    }\n  }\n</ul>\n\n<ng-template #rowTpl let-row>\n  @if (row.kind === 'option') {\n    <li\n      class=\"ath-listbox__option\"\n      role=\"option\"\n      [id]=\"row.id\"\n      [attr.data-index]=\"row.index\"\n      [attr.aria-selected]=\"row.selected\"\n      [attr.aria-disabled]=\"row.option.disabled || null\"\n      [class.ath-listbox__option--active]=\"row.index === activeIndex()\"\n      [class.ath-listbox__option--selected]=\"row.selected\"\n      [class.ath-listbox__option--disabled]=\"row.option.disabled\"\n    >\n      @if (multiple()) {\n        <span\n          class=\"ath-listbox__check\"\n          [class.ath-listbox__check--on]=\"row.selected\"\n          aria-hidden=\"true\"\n        >\n          @if (row.selected) {\n            <ath-icon [img]=\"checkIcon\" [size]=\"12\" />\n          }\n        </span>\n      }\n      @if (optionTemplate(); as tpl) {\n        <ng-container\n          [ngTemplateOutlet]=\"tpl\"\n          [ngTemplateOutletContext]=\"{\n            $implicit: row.option,\n            selected: row.selected,\n            active: row.index === activeIndex(),\n          }\"\n        />\n      } @else {\n        @if (optionIcon(row.option); as icon) {\n          <ath-icon class=\"ath-listbox__icon\" [img]=\"icon\" [size]=\"14\" aria-hidden=\"true\" />\n        }\n        <span class=\"ath-listbox__text\">\n          <span class=\"ath-listbox__label\">{{ row.option.label }}</span>\n          @if (row.option.sublabel) {\n            <span class=\"ath-listbox__sub\">{{ row.option.sublabel }}</span>\n          }\n        </span>\n        @if (!multiple() && row.selected) {\n          <ath-icon class=\"ath-listbox__tick\" [img]=\"checkIcon\" [size]=\"14\" aria-hidden=\"true\" />\n        }\n      }\n    </li>\n  } @else {\n    <li\n      class=\"ath-listbox__option ath-listbox__option--create\"\n      role=\"option\"\n      aria-selected=\"false\"\n      [id]=\"row.id\"\n      [attr.data-index]=\"row.index\"\n      [class.ath-listbox__option--active]=\"row.index === activeIndex()\"\n    >\n      <ath-icon class=\"ath-listbox__icon\" [img]=\"plusIcon\" [size]=\"14\" aria-hidden=\"true\" />\n      <span class=\"ath-listbox__label\">{{ row.label }}</span>\n    </li>\n  }\n</ng-template>\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:flex;flex-direction:column;min-width:0;font-family:var(--font-sans);font-size:var(--text-base);color:var(--fg-2)}.ath-listbox__search{display:flex;align-items:center;gap:var(--space-2);margin:0 0 var(--space-1);padding:0 var(--space-2);background:var(--surface-3);border:1px solid transparent;border-radius:var(--r);transition:background-color var(--t-fast),border-color var(--t-fast)}.ath-listbox__search:focus-within{background:var(--surface);border-color:var(--border-strong)}.ath-listbox__search-icon{flex-shrink:0;color:var(--fg-4)}.ath-listbox__search-input{flex:1;min-width:0;height:var(--space-8);padding:0;font:inherit;color:var(--fg);background:transparent;border:0}.ath-listbox__search-input:focus{outline:none}.ath-listbox__search-input::placeholder{color:var(--fg-4)}.ath-listbox__list{margin:0;padding:0;overflow-y:auto;list-style:none}.ath-listbox__list:focus{outline:none}.ath-listbox__list:focus-visible{border-radius:var(--r-sm);outline:none;box-shadow:inset 0 0 0 2px var(--focus-ring-color)}.ath-listbox__section{display:block}.ath-listbox__group{margin:0;padding:0;list-style:none}.ath-listbox__group-label{padding:var(--space-2) var(--space-2) var(--space-1);font-size:var(--text-xs);font-weight:var(--weight-medium);letter-spacing:.04em;text-transform:uppercase;color:var(--fg-label)}.ath-listbox__option{display:flex;align-items:center;gap:var(--space-2);min-height:var(--space-8);padding:var(--space-1) var(--space-2);border-radius:var(--r-sm);cursor:pointer;-webkit-user-select:none;user-select:none;content-visibility:auto;contain-intrinsic-size:auto var(--space-8)}.ath-listbox__option--disabled{color:var(--fg-4);cursor:not-allowed}.ath-listbox__option--create{color:var(--fg)}.ath-listbox__list:is([data-highlight=soft],[data-highlight=ring]) .ath-listbox__option--active:not(.ath-listbox__option--disabled){color:var(--fg);background:var(--hover-strong)}:host(:has(:focus-visible)) .ath-listbox__list[data-highlight=ring] .ath-listbox__option--active{outline:none;box-shadow:inset 0 0 0 2px var(--focus-ring-color)}.ath-listbox__check{display:inline-flex;flex-shrink:0;align-items:center;justify-content:center;width:16px;height:16px;color:var(--surface);border:1px solid var(--border-strong);border-radius:var(--r-sm)}.ath-listbox__check--on{background:var(--control-checked);border-color:var(--control-checked)}.ath-listbox__icon{flex-shrink:0;color:var(--fg-3)}.ath-listbox__text{display:flex;flex:1;flex-direction:column;min-width:0}.ath-listbox__label,.ath-listbox__sub{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ath-listbox__label{flex:1;min-width:0}.ath-listbox__sub{font-size:var(--text-xs);color:var(--fg-3)}.ath-listbox__tick{flex-shrink:0;color:var(--accent)}.ath-listbox__status{padding:var(--space-3) var(--space-2);font-size:var(--text-sm);color:var(--fg-3);text-align:center}\n"]
		}]
	}],
	ctorParameters: () => [],
	propDecorators: {
		options: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "options",
				required: false
			}]
		}],
		multiple: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "multiple",
				required: false
			}]
		}],
		value: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "value",
				required: false
			}]
		}, {
			type: i0.Output,
			args: ["valueChange"]
		}],
		values: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "values",
				required: false
			}]
		}, {
			type: i0.Output,
			args: ["valuesChange"]
		}],
		searchable: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "searchable",
				required: false
			}]
		}],
		query: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "query",
				required: false
			}]
		}, {
			type: i0.Output,
			args: ["queryChange"]
		}],
		localFilter: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "localFilter",
				required: false
			}]
		}],
		creatable: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "creatable",
				required: false
			}]
		}],
		loading: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "loading",
				required: false
			}]
		}],
		searchPlaceholder: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "searchPlaceholder",
				required: false
			}]
		}],
		emptyLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "emptyLabel",
				required: false
			}]
		}],
		ariaLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "ariaLabel",
				required: false
			}]
		}],
		ariaLabelledby: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "ariaLabelledby",
				required: false
			}]
		}],
		optionTemplate: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "optionTemplate",
				required: false
			}]
		}],
		maxHeight: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "maxHeight",
				required: false
			}]
		}],
		compareWith: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "compareWith",
				required: false
			}]
		}],
		autoActivate: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "autoActivate",
				required: false
			}]
		}],
		picked: [{
			type: i0.Output,
			args: ["picked"]
		}],
		create: [{
			type: i0.Output,
			args: ["create"]
		}],
		searchRef: [{
			type: i0.ViewChild,
			args: ["search", { isSignal: true }]
		}],
		listRef: [{
			type: i0.ViewChild,
			args: ["list", { isSignal: true }]
		}]
	}
});
let nextPickerId = 0;
var AthOptionPickerComponent = class AthOptionPickerComponent {
	constructor() {
		this.labels = injectAthLabels();
		this.host = inject(ElementRef).nativeElement;
		this.options = input([], ...ngDevMode ? [{ debugName: "options" }] : /* istanbul ignore next */ []);
		this.multiple = input(false, {
			...ngDevMode ? { debugName: "multiple" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.value = model(null, ...ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []);
		this.values = model([], ...ngDevMode ? [{ debugName: "values" }] : /* istanbul ignore next */ []);
		this.query = model("", ...ngDevMode ? [{ debugName: "query" }] : /* istanbul ignore next */ []);
		this.searchable = input(true, {
			...ngDevMode ? { debugName: "searchable" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.localFilter = input(true, {
			...ngDevMode ? { debugName: "localFilter" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.creatable = input(false, {
			...ngDevMode ? { debugName: "creatable" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.loading = input(false, {
			...ngDevMode ? { debugName: "loading" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.searchPlaceholder = input(null, ...ngDevMode ? [{ debugName: "searchPlaceholder" }] : /* istanbul ignore next */ []);
		this.emptyLabel = input(null, ...ngDevMode ? [{ debugName: "emptyLabel" }] : /* istanbul ignore next */ []);
		this.optionTemplate = input(null, ...ngDevMode ? [{ debugName: "optionTemplate" }] : /* istanbul ignore next */ []);
		this.compareWith = input(null, ...ngDevMode ? [{ debugName: "compareWith" }] : /* istanbul ignore next */ []);
		this.maxHeight = input(320, ...ngDevMode ? [{ debugName: "maxHeight" }] : /* istanbul ignore next */ []);
		this.trigger = input("button", ...ngDevMode ? [{ debugName: "trigger" }] : /* istanbul ignore next */ []);
		this.placeholder = input(null, ...ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []);
		this.disabled = input(false, {
			...ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.clearable = input(false, {
			...ngDevMode ? { debugName: "clearable" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.ariaLabel = input(null, ...ngDevMode ? [{ debugName: "ariaLabel" }] : /* istanbul ignore next */ []);
		this.open = model(false, ...ngDevMode ? [{ debugName: "open" }] : /* istanbul ignore next */ []);
		this.anchor = input(null, ...ngDevMode ? [{ debugName: "anchor" }] : /* istanbul ignore next */ []);
		this.size = input("md", ...ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []);
		this.align = input("start", ...ngDevMode ? [{ debugName: "align" }] : /* istanbul ignore next */ []);
		this.matchWidth = input(false, {
			...ngDevMode ? { debugName: "matchWidth" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.closeOnPick = input(null, ...ngDevMode ? [{ debugName: "closeOnPick" }] : /* istanbul ignore next */ []);
		this.resetQueryOnOpen = input(true, {
			...ngDevMode ? { debugName: "resetQueryOnOpen" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.picked = output();
		this.create = output();
		this.opened = output();
		this.closed = output();
		this.chevronIcon = ChevronDown;
		this.clearIcon = X;
		this.labelId = `ath-picker-label-${++nextPickerId}`;
		this.valueId = `ath-picker-value-${nextPickerId}`;
		this.popover = viewChild.required(AthPopoverComponent, ...ngDevMode ? [{ debugName: "popover" }] : /* istanbul ignore next */ []);
		this.triggerButton = viewChild("triggerBtn", ...ngDevMode ? [{ debugName: "triggerButton" }] : /* istanbul ignore next */ []);
		this.listbox = viewChild(AthListboxComponent, ...ngDevMode ? [{ debugName: "listbox" }] : /* istanbul ignore next */ []);
		this.popupAnchor = computed(() => resolveAnchor(this.anchor()) ?? (this.trigger() === "none" ? this.host : this.triggerButton()?.nativeElement ?? null), ...ngDevMode ? [{ debugName: "popupAnchor" }] : /* istanbul ignore next */ []);
		this.placeholderText = computed(() => this.placeholder() ?? this.labels.pickerPlaceholder(), ...ngDevMode ? [{ debugName: "placeholderText" }] : /* istanbul ignore next */ []);
		this.selectedOptions = computed(() => {
			const eq = this.compareWith() ?? Object.is;
			const options = this.options();
			if (this.multiple()) return this.values().map((v) => options.find((o) => eq(o.value, v))).filter((o) => !!o);
			const v = this.value();
			const hit = v === null ? void 0 : options.find((o) => eq(o.value, v));
			return hit ? [hit] : [];
		}, ...ngDevMode ? [{ debugName: "selectedOptions" }] : /* istanbul ignore next */ []);
		this.hasValue = computed(() => this.selectedOptions().length > 0, ...ngDevMode ? [{ debugName: "hasValue" }] : /* istanbul ignore next */ []);
		this.summary = computed(() => {
			const selected = this.selectedOptions();
			if (selected.length === 0) return this.placeholderText();
			if (selected.length <= 2) return selected.map((o) => o.label).join(", ");
			return formatAthLabel(this.labels.pickerSelected(), { count: selected.length });
		}, ...ngDevMode ? [{ debugName: "summary" }] : /* istanbul ignore next */ []);
	}
	show() {
		if (this.disabled()) return;
		this.popover().show(this.popupAnchor());
	}
	hide() {
		this.popover().hide();
	}
	toggle() {
		if (this.open()) this.hide();
		else this.show();
	}
	clear() {
		if (this.multiple()) this.values.set([]);
		else this.value.set(null);
	}
	onOpened() {
		if (this.resetQueryOnOpen()) this.query.set("");
		this.opened.emit();
		this.popover().whenPanelReady(() => this.listbox()?.resetActive());
	}
	onPicked(option) {
		this.picked.emit(option);
		if (this.closeOnPick() ?? !this.multiple()) this.popover().hide("select", true);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthOptionPickerComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthOptionPickerComponent,
			isStandalone: true,
			selector: "ath-option-picker",
			inputs: {
				options: {
					classPropertyName: "options",
					publicName: "options",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				multiple: {
					classPropertyName: "multiple",
					publicName: "multiple",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				value: {
					classPropertyName: "value",
					publicName: "value",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				values: {
					classPropertyName: "values",
					publicName: "values",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				query: {
					classPropertyName: "query",
					publicName: "query",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				searchable: {
					classPropertyName: "searchable",
					publicName: "searchable",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				localFilter: {
					classPropertyName: "localFilter",
					publicName: "localFilter",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				creatable: {
					classPropertyName: "creatable",
					publicName: "creatable",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				loading: {
					classPropertyName: "loading",
					publicName: "loading",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				searchPlaceholder: {
					classPropertyName: "searchPlaceholder",
					publicName: "searchPlaceholder",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				emptyLabel: {
					classPropertyName: "emptyLabel",
					publicName: "emptyLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				optionTemplate: {
					classPropertyName: "optionTemplate",
					publicName: "optionTemplate",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				compareWith: {
					classPropertyName: "compareWith",
					publicName: "compareWith",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				maxHeight: {
					classPropertyName: "maxHeight",
					publicName: "maxHeight",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				trigger: {
					classPropertyName: "trigger",
					publicName: "trigger",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				placeholder: {
					classPropertyName: "placeholder",
					publicName: "placeholder",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				disabled: {
					classPropertyName: "disabled",
					publicName: "disabled",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				clearable: {
					classPropertyName: "clearable",
					publicName: "clearable",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				ariaLabel: {
					classPropertyName: "ariaLabel",
					publicName: "ariaLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				open: {
					classPropertyName: "open",
					publicName: "open",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				anchor: {
					classPropertyName: "anchor",
					publicName: "anchor",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				size: {
					classPropertyName: "size",
					publicName: "size",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				align: {
					classPropertyName: "align",
					publicName: "align",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				matchWidth: {
					classPropertyName: "matchWidth",
					publicName: "matchWidth",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				closeOnPick: {
					classPropertyName: "closeOnPick",
					publicName: "closeOnPick",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				resetQueryOnOpen: {
					classPropertyName: "resetQueryOnOpen",
					publicName: "resetQueryOnOpen",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			outputs: {
				value: "valueChange",
				values: "valuesChange",
				query: "queryChange",
				open: "openChange",
				picked: "picked",
				create: "create",
				opened: "opened",
				closed: "closed"
			},
			viewQueries: [
				{
					propertyName: "popover",
					first: true,
					predicate: AthPopoverComponent,
					descendants: true,
					isSignal: true
				},
				{
					propertyName: "triggerButton",
					first: true,
					predicate: ["triggerBtn"],
					descendants: true,
					isSignal: true
				},
				{
					propertyName: "listbox",
					first: true,
					predicate: AthListboxComponent,
					descendants: true,
					isSignal: true
				}
			],
			exportAs: ["athOptionPicker"],
			ngImport: i0,
			template: "@if (trigger() === 'button') {\n  <div\n    class=\"ath-picker__control\"\n    [class.ath-picker__control--open]=\"open()\"\n    [class.ath-picker__control--clearable]=\"clearable() && hasValue() && !disabled()\"\n  >\n    @if (ariaLabel()) {\n      <span class=\"ath-picker__label\" [id]=\"labelId\" hidden>{{ ariaLabel() }}</span>\n    }\n    <button\n      #triggerBtn\n      type=\"button\"\n      class=\"ath-picker__trigger\"\n      [disabled]=\"disabled()\"\n      [attr.aria-labelledby]=\"ariaLabel() ? labelId + ' ' + valueId : null\"\n      [athPopoverTrigger]=\"pop\"\n      [popupType]=\"searchable() ? 'dialog' : 'listbox'\"\n    >\n      <span\n        class=\"ath-picker__value\"\n        [id]=\"valueId\"\n        [class.ath-picker__value--placeholder]=\"!hasValue()\"\n        >{{ summary() }}</span\n      >\n      <ath-icon class=\"ath-picker__chevron\" [img]=\"chevronIcon\" [size]=\"14\" aria-hidden=\"true\" />\n    </button>\n    @if (clearable() && hasValue() && !disabled()) {\n      <button\n        type=\"button\"\n        class=\"ath-picker__clear\"\n        [attr.aria-label]=\"labels.pickerClear()\"\n        (click)=\"clear()\"\n      >\n        <ath-icon [img]=\"clearIcon\" [size]=\"12\" aria-hidden=\"true\" />\n      </button>\n    }\n  </div>\n}\n\n<ath-popover\n  #pop\n  [(open)]=\"open\"\n  [anchor]=\"popupAnchor()\"\n  [size]=\"size()\"\n  padding=\"sm\"\n  [align]=\"align()\"\n  [matchWidth]=\"matchWidth()\"\n  [panelRole]=\"searchable() ? 'dialog' : null\"\n  [ariaLabel]=\"ariaLabel() ?? placeholderText()\"\n  (opened)=\"onOpened()\"\n  (closed)=\"closed.emit($event)\"\n>\n  <!-- Built only while open: a closed picker per table cell holds no options. -->\n  <ng-template athPopoverContent>\n    <ath-listbox\n      [options]=\"options()\"\n      [multiple]=\"multiple()\"\n      [(value)]=\"value\"\n      [(values)]=\"values\"\n      [(query)]=\"query\"\n      [searchable]=\"searchable()\"\n      [localFilter]=\"localFilter()\"\n      [creatable]=\"creatable()\"\n      [loading]=\"loading()\"\n      [searchPlaceholder]=\"searchPlaceholder()\"\n      [emptyLabel]=\"emptyLabel()\"\n      [optionTemplate]=\"optionTemplate()\"\n      [compareWith]=\"compareWith()\"\n      [maxHeight]=\"maxHeight()\"\n      [ariaLabel]=\"ariaLabel() ?? placeholderText()\"\n      (picked)=\"onPicked($event)\"\n      (create)=\"create.emit($event)\"\n    />\n  </ng-template>\n</ath-popover>\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:inline-block;max-width:100%;font-family:var(--font-sans)}.ath-picker__control{position:relative;display:flex}.ath-picker__trigger{display:inline-flex;flex:1;align-items:center;gap:var(--space-2);min-width:140px;height:var(--space-8);padding:0 var(--space-2) 0 var(--space-3);font:inherit;font-size:var(--text-base);font-weight:var(--weight-medium);color:var(--fg);background:var(--bg-1);border:1px solid var(--border-strong);border-radius:var(--r);cursor:pointer;transition:border-color var(--t-fast),box-shadow var(--t-fast)}.ath-picker__trigger:hover:not(:disabled){border-color:var(--accent-dim)}.ath-picker__trigger:focus-visible{outline:none;border-color:var(--focus-ring-color);box-shadow:var(--field-focus-shadow)}.ath-picker__trigger:disabled{cursor:not-allowed;opacity:.5}.ath-picker__control--open>.ath-picker__trigger{border-color:var(--accent)}.ath-picker__control--clearable>.ath-picker__trigger{padding-inline-end:calc(var(--space-8) + var(--space-2))}.ath-picker__value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:start}.ath-picker__value--placeholder{font-weight:var(--weight-normal);color:var(--fg-4)}.ath-picker__chevron{flex-shrink:0;color:var(--fg-3)}.ath-picker__clear{position:absolute;inset-block:0;inset-inline-end:calc(var(--space-6) + var(--space-1));display:inline-flex;align-items:center;justify-content:center;width:var(--space-5);height:var(--space-5);margin-block:auto;padding:0;color:var(--fg-3);background:transparent;border:0;border-radius:var(--r-sm);cursor:pointer}.ath-picker__clear:hover{color:var(--fg);background:var(--hover-strong)}.ath-picker__clear:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}\n"],
			dependencies: [
				{
					kind: "component",
					type: AthPopoverComponent,
					selector: "ath-popover",
					inputs: [
						"open",
						"anchor",
						"size",
						"padding",
						"align",
						"side",
						"offset",
						"matchWidth",
						"maxHeight",
						"arrow",
						"trapFocus",
						"autoFocus",
						"restoreFocus",
						"closeOnEscape",
						"closeOnOutsideClick",
						"panelRole",
						"ariaLabel",
						"ariaLabelledby",
						"panelClass",
						"panelId"
					],
					outputs: [
						"openChange",
						"opened",
						"closed"
					],
					exportAs: ["athPopover"]
				},
				{
					kind: "directive",
					type: AthPopoverContentDirective,
					selector: "ng-template[athPopoverContent]"
				},
				{
					kind: "directive",
					type: AthPopoverTriggerDirective,
					selector: "[athPopoverTrigger]",
					inputs: ["athPopoverTrigger", "popupType"],
					exportAs: ["athPopoverTrigger"]
				},
				{
					kind: "component",
					type: AthListboxComponent,
					selector: "ath-listbox",
					inputs: [
						"options",
						"multiple",
						"value",
						"values",
						"searchable",
						"query",
						"localFilter",
						"creatable",
						"loading",
						"searchPlaceholder",
						"emptyLabel",
						"ariaLabel",
						"ariaLabelledby",
						"optionTemplate",
						"maxHeight",
						"compareWith",
						"autoActivate"
					],
					outputs: [
						"valueChange",
						"valuesChange",
						"queryChange",
						"picked",
						"create"
					],
					exportAs: ["athListbox"]
				},
				{
					kind: "component",
					type: AthIconComponent,
					selector: "ath-icon",
					inputs: [
						"img",
						"size",
						"strokeWidth",
						"color",
						"absoluteStrokeWidth",
						"class"
					]
				}
			],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthOptionPickerComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-option-picker",
			imports: [
				AthPopoverComponent,
				AthPopoverContentDirective,
				AthPopoverTriggerDirective,
				AthListboxComponent,
				AthIconComponent
			],
			changeDetection: ChangeDetectionStrategy.OnPush,
			exportAs: "athOptionPicker",
			template: "@if (trigger() === 'button') {\n  <div\n    class=\"ath-picker__control\"\n    [class.ath-picker__control--open]=\"open()\"\n    [class.ath-picker__control--clearable]=\"clearable() && hasValue() && !disabled()\"\n  >\n    @if (ariaLabel()) {\n      <span class=\"ath-picker__label\" [id]=\"labelId\" hidden>{{ ariaLabel() }}</span>\n    }\n    <button\n      #triggerBtn\n      type=\"button\"\n      class=\"ath-picker__trigger\"\n      [disabled]=\"disabled()\"\n      [attr.aria-labelledby]=\"ariaLabel() ? labelId + ' ' + valueId : null\"\n      [athPopoverTrigger]=\"pop\"\n      [popupType]=\"searchable() ? 'dialog' : 'listbox'\"\n    >\n      <span\n        class=\"ath-picker__value\"\n        [id]=\"valueId\"\n        [class.ath-picker__value--placeholder]=\"!hasValue()\"\n        >{{ summary() }}</span\n      >\n      <ath-icon class=\"ath-picker__chevron\" [img]=\"chevronIcon\" [size]=\"14\" aria-hidden=\"true\" />\n    </button>\n    @if (clearable() && hasValue() && !disabled()) {\n      <button\n        type=\"button\"\n        class=\"ath-picker__clear\"\n        [attr.aria-label]=\"labels.pickerClear()\"\n        (click)=\"clear()\"\n      >\n        <ath-icon [img]=\"clearIcon\" [size]=\"12\" aria-hidden=\"true\" />\n      </button>\n    }\n  </div>\n}\n\n<ath-popover\n  #pop\n  [(open)]=\"open\"\n  [anchor]=\"popupAnchor()\"\n  [size]=\"size()\"\n  padding=\"sm\"\n  [align]=\"align()\"\n  [matchWidth]=\"matchWidth()\"\n  [panelRole]=\"searchable() ? 'dialog' : null\"\n  [ariaLabel]=\"ariaLabel() ?? placeholderText()\"\n  (opened)=\"onOpened()\"\n  (closed)=\"closed.emit($event)\"\n>\n  <!-- Built only while open: a closed picker per table cell holds no options. -->\n  <ng-template athPopoverContent>\n    <ath-listbox\n      [options]=\"options()\"\n      [multiple]=\"multiple()\"\n      [(value)]=\"value\"\n      [(values)]=\"values\"\n      [(query)]=\"query\"\n      [searchable]=\"searchable()\"\n      [localFilter]=\"localFilter()\"\n      [creatable]=\"creatable()\"\n      [loading]=\"loading()\"\n      [searchPlaceholder]=\"searchPlaceholder()\"\n      [emptyLabel]=\"emptyLabel()\"\n      [optionTemplate]=\"optionTemplate()\"\n      [compareWith]=\"compareWith()\"\n      [maxHeight]=\"maxHeight()\"\n      [ariaLabel]=\"ariaLabel() ?? placeholderText()\"\n      (picked)=\"onPicked($event)\"\n      (create)=\"create.emit($event)\"\n    />\n  </ng-template>\n</ath-popover>\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:inline-block;max-width:100%;font-family:var(--font-sans)}.ath-picker__control{position:relative;display:flex}.ath-picker__trigger{display:inline-flex;flex:1;align-items:center;gap:var(--space-2);min-width:140px;height:var(--space-8);padding:0 var(--space-2) 0 var(--space-3);font:inherit;font-size:var(--text-base);font-weight:var(--weight-medium);color:var(--fg);background:var(--bg-1);border:1px solid var(--border-strong);border-radius:var(--r);cursor:pointer;transition:border-color var(--t-fast),box-shadow var(--t-fast)}.ath-picker__trigger:hover:not(:disabled){border-color:var(--accent-dim)}.ath-picker__trigger:focus-visible{outline:none;border-color:var(--focus-ring-color);box-shadow:var(--field-focus-shadow)}.ath-picker__trigger:disabled{cursor:not-allowed;opacity:.5}.ath-picker__control--open>.ath-picker__trigger{border-color:var(--accent)}.ath-picker__control--clearable>.ath-picker__trigger{padding-inline-end:calc(var(--space-8) + var(--space-2))}.ath-picker__value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:start}.ath-picker__value--placeholder{font-weight:var(--weight-normal);color:var(--fg-4)}.ath-picker__chevron{flex-shrink:0;color:var(--fg-3)}.ath-picker__clear{position:absolute;inset-block:0;inset-inline-end:calc(var(--space-6) + var(--space-1));display:inline-flex;align-items:center;justify-content:center;width:var(--space-5);height:var(--space-5);margin-block:auto;padding:0;color:var(--fg-3);background:transparent;border:0;border-radius:var(--r-sm);cursor:pointer}.ath-picker__clear:hover{color:var(--fg);background:var(--hover-strong)}.ath-picker__clear:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}\n"]
		}]
	}],
	propDecorators: {
		options: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "options",
				required: false
			}]
		}],
		multiple: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "multiple",
				required: false
			}]
		}],
		value: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "value",
				required: false
			}]
		}, {
			type: i0.Output,
			args: ["valueChange"]
		}],
		values: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "values",
				required: false
			}]
		}, {
			type: i0.Output,
			args: ["valuesChange"]
		}],
		query: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "query",
				required: false
			}]
		}, {
			type: i0.Output,
			args: ["queryChange"]
		}],
		searchable: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "searchable",
				required: false
			}]
		}],
		localFilter: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "localFilter",
				required: false
			}]
		}],
		creatable: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "creatable",
				required: false
			}]
		}],
		loading: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "loading",
				required: false
			}]
		}],
		searchPlaceholder: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "searchPlaceholder",
				required: false
			}]
		}],
		emptyLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "emptyLabel",
				required: false
			}]
		}],
		optionTemplate: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "optionTemplate",
				required: false
			}]
		}],
		compareWith: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "compareWith",
				required: false
			}]
		}],
		maxHeight: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "maxHeight",
				required: false
			}]
		}],
		trigger: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "trigger",
				required: false
			}]
		}],
		placeholder: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "placeholder",
				required: false
			}]
		}],
		disabled: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "disabled",
				required: false
			}]
		}],
		clearable: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "clearable",
				required: false
			}]
		}],
		ariaLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "ariaLabel",
				required: false
			}]
		}],
		open: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "open",
				required: false
			}]
		}, {
			type: i0.Output,
			args: ["openChange"]
		}],
		anchor: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "anchor",
				required: false
			}]
		}],
		size: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "size",
				required: false
			}]
		}],
		align: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "align",
				required: false
			}]
		}],
		matchWidth: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "matchWidth",
				required: false
			}]
		}],
		closeOnPick: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "closeOnPick",
				required: false
			}]
		}],
		resetQueryOnOpen: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "resetQueryOnOpen",
				required: false
			}]
		}],
		picked: [{
			type: i0.Output,
			args: ["picked"]
		}],
		create: [{
			type: i0.Output,
			args: ["create"]
		}],
		opened: [{
			type: i0.Output,
			args: ["opened"]
		}],
		closed: [{
			type: i0.Output,
			args: ["closed"]
		}],
		popover: [{
			type: i0.ViewChild,
			args: [i0.forwardRef(() => AthPopoverComponent), { isSignal: true }]
		}],
		triggerButton: [{
			type: i0.ViewChild,
			args: ["triggerBtn", { isSignal: true }]
		}],
		listbox: [{
			type: i0.ViewChild,
			args: [i0.forwardRef(() => AthListboxComponent), { isSignal: true }]
		}]
	}
});
var AthComboboxComponent = class AthComboboxComponent {
	constructor() {
		this.host = inject(ElementRef).nativeElement;
		this.options = input([], ...ngDevMode ? [{ debugName: "options" }] : /* istanbul ignore next */ []);
		this.value = model(null, ...ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []);
		this.placeholder = input(null, ...ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []);
		this.searchPlaceholder = input(null, ...ngDevMode ? [{ debugName: "searchPlaceholder" }] : /* istanbul ignore next */ []);
		this.disabled = input(false, {
			...ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.clearable = input(false, {
			...ngDevMode ? { debugName: "clearable" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.loading = input(false, {
			...ngDevMode ? { debugName: "loading" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.bare = input(false, {
			...ngDevMode ? { debugName: "bare" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.optionTpl = input(null, ...ngDevMode ? [{ debugName: "optionTpl" }] : /* istanbul ignore next */ []);
		this.queryChange = output();
		this.opened = output();
		this.closed = output();
		this.picker = viewChild.required(AthOptionPickerComponent, ...ngDevMode ? [{ debugName: "picker" }] : /* istanbul ignore next */ []);
	}
	toggle() {
		this.picker().toggle();
	}
	openPanel() {
		this.picker().show();
	}
	close() {
		this.picker().hide();
	}
	select(option) {
		if (option.disabled) return;
		this.value.set(option.value);
		this.close();
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthComboboxComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.2.0",
			version: "22.2.2",
			type: AthComboboxComponent,
			isStandalone: true,
			selector: "ath-combobox",
			inputs: {
				options: {
					classPropertyName: "options",
					publicName: "options",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				value: {
					classPropertyName: "value",
					publicName: "value",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				placeholder: {
					classPropertyName: "placeholder",
					publicName: "placeholder",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				searchPlaceholder: {
					classPropertyName: "searchPlaceholder",
					publicName: "searchPlaceholder",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				disabled: {
					classPropertyName: "disabled",
					publicName: "disabled",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				clearable: {
					classPropertyName: "clearable",
					publicName: "clearable",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				loading: {
					classPropertyName: "loading",
					publicName: "loading",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				bare: {
					classPropertyName: "bare",
					publicName: "bare",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				optionTpl: {
					classPropertyName: "optionTpl",
					publicName: "optionTpl",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			outputs: {
				value: "valueChange",
				queryChange: "queryChange",
				opened: "opened",
				closed: "closed"
			},
			viewQueries: [{
				propertyName: "picker",
				first: true,
				predicate: AthOptionPickerComponent,
				descendants: true,
				isSignal: true
			}],
			ngImport: i0,
			template: "<ath-option-picker\n  [options]=\"options()\"\n  [(value)]=\"value\"\n  [placeholder]=\"placeholder()\"\n  [searchPlaceholder]=\"searchPlaceholder()\"\n  [disabled]=\"disabled()\"\n  [clearable]=\"clearable()\"\n  [loading]=\"loading()\"\n  [optionTemplate]=\"optionTpl()\"\n  [trigger]=\"bare() ? 'none' : 'button'\"\n  [anchor]=\"bare() ? host : null\"\n  [matchWidth]=\"!bare()\"\n  size=\"md\"\n  align=\"auto\"\n  (queryChange)=\"queryChange.emit($event)\"\n  (opened)=\"opened.emit()\"\n  (closed)=\"closed.emit()\"\n/>\n",
			styles: [":host{display:inline-block;position:relative;max-width:100%}:host>ath-option-picker{display:block}\n"],
			dependencies: [{
				kind: "component",
				type: AthOptionPickerComponent,
				selector: "ath-option-picker",
				inputs: [
					"options",
					"multiple",
					"value",
					"values",
					"query",
					"searchable",
					"localFilter",
					"creatable",
					"loading",
					"searchPlaceholder",
					"emptyLabel",
					"optionTemplate",
					"compareWith",
					"maxHeight",
					"trigger",
					"placeholder",
					"disabled",
					"clearable",
					"ariaLabel",
					"open",
					"anchor",
					"size",
					"align",
					"matchWidth",
					"closeOnPick",
					"resetQueryOnOpen"
				],
				outputs: [
					"valueChange",
					"valuesChange",
					"queryChange",
					"openChange",
					"picked",
					"create",
					"opened",
					"closed"
				],
				exportAs: ["athOptionPicker"]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthComboboxComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-combobox",
			imports: [AthOptionPickerComponent],
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: "<ath-option-picker\n  [options]=\"options()\"\n  [(value)]=\"value\"\n  [placeholder]=\"placeholder()\"\n  [searchPlaceholder]=\"searchPlaceholder()\"\n  [disabled]=\"disabled()\"\n  [clearable]=\"clearable()\"\n  [loading]=\"loading()\"\n  [optionTemplate]=\"optionTpl()\"\n  [trigger]=\"bare() ? 'none' : 'button'\"\n  [anchor]=\"bare() ? host : null\"\n  [matchWidth]=\"!bare()\"\n  size=\"md\"\n  align=\"auto\"\n  (queryChange)=\"queryChange.emit($event)\"\n  (opened)=\"opened.emit()\"\n  (closed)=\"closed.emit()\"\n/>\n",
			styles: [":host{display:inline-block;position:relative;max-width:100%}:host>ath-option-picker{display:block}\n"]
		}]
	}],
	propDecorators: {
		options: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "options",
				required: false
			}]
		}],
		value: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "value",
				required: false
			}]
		}, {
			type: i0.Output,
			args: ["valueChange"]
		}],
		placeholder: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "placeholder",
				required: false
			}]
		}],
		searchPlaceholder: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "searchPlaceholder",
				required: false
			}]
		}],
		disabled: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "disabled",
				required: false
			}]
		}],
		clearable: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "clearable",
				required: false
			}]
		}],
		loading: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "loading",
				required: false
			}]
		}],
		bare: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "bare",
				required: false
			}]
		}],
		optionTpl: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "optionTpl",
				required: false
			}]
		}],
		queryChange: [{
			type: i0.Output,
			args: ["queryChange"]
		}],
		opened: [{
			type: i0.Output,
			args: ["opened"]
		}],
		closed: [{
			type: i0.Output,
			args: ["closed"]
		}],
		picker: [{
			type: i0.ViewChild,
			args: [i0.forwardRef(() => AthOptionPickerComponent), { isSignal: true }]
		}]
	}
});
var AthUserPickerComponent = class AthUserPickerComponent {
	constructor() {
		this.labels = injectAthLabels();
		this.users = input([], {
			...ngDevMode ? { debugName: "users" } : /* istanbul ignore next */ {},
			transform: (value) => value ?? []
		});
		this.value = model(null, ...ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []);
		this.placeholder = input(null, ...ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []);
		this.searchPlaceholder = input(null, ...ngDevMode ? [{ debugName: "searchPlaceholder" }] : /* istanbul ignore next */ []);
		this.disabled = input(false, {
			...ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.clearable = input(true, {
			...ngDevMode ? { debugName: "clearable" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.allowUnassigned = input(true, {
			...ngDevMode ? { debugName: "allowUnassigned" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.showEmail = input(true, {
			...ngDevMode ? { debugName: "showEmail" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.options = computed(() => {
			const showEmail = this.showEmail();
			return this.users().map((u) => ({
				value: u.id,
				label: u.name,
				sublabel: showEmail ? u.email : void 0
			}));
		}, ...ngDevMode ? [{ debugName: "options" }] : /* istanbul ignore next */ []);
		this.selectedUser = computed(() => this.users().find((u) => u.id === this.value()) ?? null, ...ngDevMode ? [{ debugName: "selectedUser" }] : /* istanbul ignore next */ []);
		this.triggerLabel = computed(() => {
			const selected = this.selectedUser();
			if (selected) return selected.name;
			return this.allowUnassigned() ? this.placeholder() ?? this.labels.userPickerPlaceholder() : "—";
		}, ...ngDevMode ? [{ debugName: "triggerLabel" }] : /* istanbul ignore next */ []);
	}
	onValueChange(v) {
		this.value.set(v);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthUserPickerComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.1.0",
			version: "22.2.2",
			type: AthUserPickerComponent,
			isStandalone: true,
			selector: "ath-user-picker",
			inputs: {
				users: {
					classPropertyName: "users",
					publicName: "users",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				value: {
					classPropertyName: "value",
					publicName: "value",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				placeholder: {
					classPropertyName: "placeholder",
					publicName: "placeholder",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				searchPlaceholder: {
					classPropertyName: "searchPlaceholder",
					publicName: "searchPlaceholder",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				disabled: {
					classPropertyName: "disabled",
					publicName: "disabled",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				clearable: {
					classPropertyName: "clearable",
					publicName: "clearable",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				allowUnassigned: {
					classPropertyName: "allowUnassigned",
					publicName: "allowUnassigned",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				showEmail: {
					classPropertyName: "showEmail",
					publicName: "showEmail",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			outputs: { value: "valueChange" },
			ngImport: i0,
			template: "<ath-combobox\n  [options]=\"options()\"\n  [value]=\"value()\"\n  [placeholder]=\"placeholder() ?? labels.userPickerPlaceholder()\"\n  [searchPlaceholder]=\"searchPlaceholder() ?? labels.userPickerSearch()\"\n  [disabled]=\"disabled()\"\n  [clearable]=\"clearable() && allowUnassigned()\"\n  (valueChange)=\"onValueChange($event)\"\n/>\n",
			styles: [":host{display:inline-block}\n"],
			dependencies: [{
				kind: "component",
				type: AthComboboxComponent,
				selector: "ath-combobox",
				inputs: [
					"options",
					"value",
					"placeholder",
					"searchPlaceholder",
					"disabled",
					"clearable",
					"loading",
					"bare",
					"optionTpl"
				],
				outputs: [
					"valueChange",
					"queryChange",
					"opened",
					"closed"
				]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthUserPickerComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-user-picker",
			imports: [AthComboboxComponent],
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: "<ath-combobox\n  [options]=\"options()\"\n  [value]=\"value()\"\n  [placeholder]=\"placeholder() ?? labels.userPickerPlaceholder()\"\n  [searchPlaceholder]=\"searchPlaceholder() ?? labels.userPickerSearch()\"\n  [disabled]=\"disabled()\"\n  [clearable]=\"clearable() && allowUnassigned()\"\n  (valueChange)=\"onValueChange($event)\"\n/>\n",
			styles: [":host{display:inline-block}\n"]
		}]
	}],
	propDecorators: {
		users: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "users",
				required: false
			}]
		}],
		value: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "value",
				required: false
			}]
		}, {
			type: i0.Output,
			args: ["valueChange"]
		}],
		placeholder: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "placeholder",
				required: false
			}]
		}],
		searchPlaceholder: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "searchPlaceholder",
				required: false
			}]
		}],
		disabled: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "disabled",
				required: false
			}]
		}],
		clearable: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "clearable",
				required: false
			}]
		}],
		allowUnassigned: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "allowUnassigned",
				required: false
			}]
		}],
		showEmail: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "showEmail",
				required: false
			}]
		}]
	}
});
var AthFileDropComponent = class AthFileDropComponent {
	constructor() {
		this.labels = injectAthLabels();
		this.accept = input(null, ...ngDevMode ? [{ debugName: "accept" }] : /* istanbul ignore next */ []);
		this.multiple = input(true, {
			...ngDevMode ? { debugName: "multiple" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.maxSizeMb = input(0, {
			...ngDevMode ? { debugName: "maxSizeMb" } : /* istanbul ignore next */ {},
			transform: numberAttribute
		});
		this.disabled = input(false, {
			...ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.prompt = input(null, ...ngDevMode ? [{ debugName: "prompt" }] : /* istanbul ignore next */ []);
		this.filesPicked = output();
		this.rejected = output();
		this.uploadIcon = Upload;
		this.dragging = signal(false, ...ngDevMode ? [{ debugName: "dragging" }] : /* istanbul ignore next */ []);
		this.fileInput = viewChild.required("fileInput", ...ngDevMode ? [{ debugName: "fileInput" }] : /* istanbul ignore next */ []);
	}
	onDragOver(event) {
		if (this.disabled()) return;
		event.preventDefault();
		event.stopPropagation();
		if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
		this.dragging.set(true);
	}
	onDragLeave(event) {
		if (this.disabled()) return;
		event.preventDefault();
		event.stopPropagation();
		if (!event.currentTarget.contains(event.relatedTarget)) this.dragging.set(false);
	}
	onDrop(event) {
		if (this.disabled()) return;
		event.preventDefault();
		event.stopPropagation();
		this.dragging.set(false);
		const files = Array.from(event.dataTransfer?.files ?? []);
		this.handle(files);
	}
	openPicker() {
		if (this.disabled()) return;
		this.fileInput().nativeElement.click();
	}
	onPickerChange(event) {
		const input = event.target;
		const files = Array.from(input.files ?? []);
		this.handle(files);
		input.value = "";
	}
	handle(files) {
		if (files.length === 0) return;
		const accepted = [];
		const rejected = [];
		const maxSizeMb = this.maxSizeMb();
		for (const file of files) {
			if (maxSizeMb > 0 && file.size > maxSizeMb * 1024 * 1024) {
				rejected.push({
					file,
					reason: "size"
				});
				continue;
			}
			if (this.accept() && !this.matchesAccept(file)) {
				rejected.push({
					file,
					reason: "type"
				});
				continue;
			}
			accepted.push(file);
		}
		if (rejected.length > 0) this.rejected.emit(rejected);
		if (accepted.length > 0) this.filesPicked.emit(this.multiple() ? accepted : [accepted[0]]);
	}
	matchesAccept(file) {
		const accept = this.accept();
		if (!accept) return true;
		const patterns = accept.split(",").map((p) => p.trim().toLowerCase());
		const type = file.type.toLowerCase();
		const name = file.name.toLowerCase();
		return patterns.some((p) => {
			if (p.startsWith(".")) return name.endsWith(p);
			if (p.endsWith("/*")) return type.startsWith(p.slice(0, -1));
			return type === p;
		});
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthFileDropComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthFileDropComponent,
			isStandalone: true,
			selector: "ath-file-drop",
			inputs: {
				accept: {
					classPropertyName: "accept",
					publicName: "accept",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				multiple: {
					classPropertyName: "multiple",
					publicName: "multiple",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				maxSizeMb: {
					classPropertyName: "maxSizeMb",
					publicName: "maxSizeMb",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				disabled: {
					classPropertyName: "disabled",
					publicName: "disabled",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				prompt: {
					classPropertyName: "prompt",
					publicName: "prompt",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			outputs: {
				filesPicked: "filesPicked",
				rejected: "rejected"
			},
			host: { listeners: {
				"dragover": "onDragOver($event)",
				"dragleave": "onDragLeave($event)",
				"drop": "onDrop($event)"
			} },
			viewQueries: [{
				propertyName: "fileInput",
				first: true,
				predicate: ["fileInput"],
				descendants: true,
				isSignal: true
			}],
			ngImport: i0,
			template: "<button\n  type=\"button\"\n  class=\"ath-fdrop\"\n  [class.ath-fdrop--dragging]=\"dragging()\"\n  [disabled]=\"disabled()\"\n  (click)=\"openPicker()\"\n>\n  <span class=\"ath-fdrop__icon\" aria-hidden=\"true\">\n    <ath-icon [img]=\"uploadIcon\" [size]=\"20\" />\n  </span>\n  <span class=\"ath-fdrop__prompt\">\n    <ng-content>{{ prompt() ?? labels.fileDropPrompt() }}</ng-content>\n  </span>\n  @if (accept() || maxSizeMb() > 0) {\n    <span class=\"ath-fdrop__hint\">\n      @if (accept()) {\n        <span>{{ accept() }}</span>\n      }\n      @if (accept() && maxSizeMb() > 0) {\n        <span aria-hidden=\"true\">·</span>\n      }\n      @if (maxSizeMb() > 0) {\n        <span>max {{ maxSizeMb() }} MB</span>\n      }\n    </span>\n  }\n</button>\n<input\n  #fileInput\n  type=\"file\"\n  class=\"ath-fdrop__input\"\n  [accept]=\"accept() ?? ''\"\n  [multiple]=\"multiple()\"\n  (change)=\"onPickerChange($event)\"\n  hidden\n/>\n",
			styles: [":host{display:block}.ath-fdrop{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;width:100%;min-height:120px;padding:20px 16px;background:var(--bg-1);border:1.5px dashed var(--border-strong);border-radius:var(--r-lg);color:var(--fg-3);cursor:pointer;transition:background var(--t-base),border-color var(--t-base),color var(--t-base)}.ath-fdrop:hover:not(:disabled){background:var(--bg-2);border-color:var(--accent-dim);color:var(--fg-2)}.ath-fdrop--dragging{background:var(--accent-faint);border-color:var(--accent);border-style:solid;color:var(--accent-text)}.ath-fdrop:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-fdrop:disabled{opacity:.5;cursor:not-allowed}.ath-fdrop__icon{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:999px;background:var(--bg-2);color:inherit}.ath-fdrop--dragging .ath-fdrop__icon{background:var(--accent-faint);color:var(--accent)}.ath-fdrop__prompt{font-family:var(--font-sans);font-size:13px;font-weight:500;text-align:center}.ath-fdrop__hint{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;color:var(--fg-4)}\n"],
			dependencies: [{
				kind: "component",
				type: AthIconComponent,
				selector: "ath-icon",
				inputs: [
					"img",
					"size",
					"strokeWidth",
					"color",
					"absoluteStrokeWidth",
					"class"
				]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthFileDropComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-file-drop",
			imports: [AthIconComponent],
			changeDetection: ChangeDetectionStrategy.OnPush,
			host: {
				"(dragover)": "onDragOver($event)",
				"(dragleave)": "onDragLeave($event)",
				"(drop)": "onDrop($event)"
			},
			template: "<button\n  type=\"button\"\n  class=\"ath-fdrop\"\n  [class.ath-fdrop--dragging]=\"dragging()\"\n  [disabled]=\"disabled()\"\n  (click)=\"openPicker()\"\n>\n  <span class=\"ath-fdrop__icon\" aria-hidden=\"true\">\n    <ath-icon [img]=\"uploadIcon\" [size]=\"20\" />\n  </span>\n  <span class=\"ath-fdrop__prompt\">\n    <ng-content>{{ prompt() ?? labels.fileDropPrompt() }}</ng-content>\n  </span>\n  @if (accept() || maxSizeMb() > 0) {\n    <span class=\"ath-fdrop__hint\">\n      @if (accept()) {\n        <span>{{ accept() }}</span>\n      }\n      @if (accept() && maxSizeMb() > 0) {\n        <span aria-hidden=\"true\">·</span>\n      }\n      @if (maxSizeMb() > 0) {\n        <span>max {{ maxSizeMb() }} MB</span>\n      }\n    </span>\n  }\n</button>\n<input\n  #fileInput\n  type=\"file\"\n  class=\"ath-fdrop__input\"\n  [accept]=\"accept() ?? ''\"\n  [multiple]=\"multiple()\"\n  (change)=\"onPickerChange($event)\"\n  hidden\n/>\n",
			styles: [":host{display:block}.ath-fdrop{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;width:100%;min-height:120px;padding:20px 16px;background:var(--bg-1);border:1.5px dashed var(--border-strong);border-radius:var(--r-lg);color:var(--fg-3);cursor:pointer;transition:background var(--t-base),border-color var(--t-base),color var(--t-base)}.ath-fdrop:hover:not(:disabled){background:var(--bg-2);border-color:var(--accent-dim);color:var(--fg-2)}.ath-fdrop--dragging{background:var(--accent-faint);border-color:var(--accent);border-style:solid;color:var(--accent-text)}.ath-fdrop:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-fdrop:disabled{opacity:.5;cursor:not-allowed}.ath-fdrop__icon{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:999px;background:var(--bg-2);color:inherit}.ath-fdrop--dragging .ath-fdrop__icon{background:var(--accent-faint);color:var(--accent)}.ath-fdrop__prompt{font-family:var(--font-sans);font-size:13px;font-weight:500;text-align:center}.ath-fdrop__hint{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;color:var(--fg-4)}\n"]
		}]
	}],
	propDecorators: {
		accept: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "accept",
				required: false
			}]
		}],
		multiple: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "multiple",
				required: false
			}]
		}],
		maxSizeMb: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "maxSizeMb",
				required: false
			}]
		}],
		disabled: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "disabled",
				required: false
			}]
		}],
		prompt: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "prompt",
				required: false
			}]
		}],
		filesPicked: [{
			type: i0.Output,
			args: ["filesPicked"]
		}],
		rejected: [{
			type: i0.Output,
			args: ["rejected"]
		}],
		fileInput: [{
			type: i0.ViewChild,
			args: ["fileInput", { isSignal: true }]
		}]
	}
});
var AthColorSwatchComponent = class AthColorSwatchComponent {
	constructor() {
		this.labels = injectAthLabels();
		this.host = inject(ElementRef);
		this.value = model(null, ...ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []);
		this.label = input(null, ...ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []);
		this.disabled = input(false, {
			...ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.tone = input("muted", ...ngDevMode ? [{ debugName: "tone" }] : /* istanbul ignore next */ []);
		this.colors = input(ATH_DECO_COLORS, ...ngDevMode ? [{ debugName: "colors" }] : /* istanbul ignore next */ []);
		this.checkIcon = Check;
		this.groupLabel = computed(() => this.label() || this.labels.colorPicker(), ...ngDevMode ? [{ debugName: "groupLabel" }] : /* istanbul ignore next */ []);
		this.options = computed(() => this.colors().map((color) => ({
			color,
			name: athDecoColorLabel(this.labels, color)
		})), ...ngDevMode ? [{ debugName: "options" }] : /* istanbul ignore next */ []);
		this.stop = computed(() => Math.max(0, this.colors().findIndex((c) => c === this.value())), ...ngDevMode ? [{ debugName: "stop" }] : /* istanbul ignore next */ []);
	}
	pick(color) {
		if (!this.disabled()) this.value.set(color);
	}
	onKey(event, index) {
		if (this.disabled()) return;
		const count = this.colors().length;
		const rtl = getComputedStyle(this.host.nativeElement).direction === "rtl";
		let next;
		switch (event.key) {
			case "ArrowRight":
				next = index + (rtl ? -1 : 1);
				break;
			case "ArrowLeft":
				next = index + (rtl ? 1 : -1);
				break;
			case "ArrowDown":
				next = index + 1;
				break;
			case "ArrowUp":
				next = index - 1;
				break;
			case "Home":
				next = 0;
				break;
			case "End":
				next = count - 1;
				break;
			case " ":
			case "Enter":
				event.preventDefault();
				this.pick(this.colors()[index]);
				return;
			default: return;
		}
		event.preventDefault();
		next = (next + count) % count;
		this.pick(this.colors()[next]);
		this.focusAt(next);
	}
	focusAt(index) {
		this.host.nativeElement.querySelectorAll("[role=\"radio\"]")[index]?.focus();
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthColorSwatchComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthColorSwatchComponent,
			isStandalone: true,
			selector: "ath-color-swatch",
			inputs: {
				value: {
					classPropertyName: "value",
					publicName: "value",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				label: {
					classPropertyName: "label",
					publicName: "label",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				disabled: {
					classPropertyName: "disabled",
					publicName: "disabled",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				tone: {
					classPropertyName: "tone",
					publicName: "tone",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				colors: {
					classPropertyName: "colors",
					publicName: "colors",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			outputs: { value: "valueChange" },
			ngImport: i0,
			template: "<div\n  class=\"ath-swatch\"\n  [class.ath-swatch--solid]=\"tone() === 'solid'\"\n  role=\"radiogroup\"\n  [attr.aria-label]=\"groupLabel()\"\n  [attr.aria-disabled]=\"disabled() || null\"\n>\n  @for (option of options(); track option.color; let i = $index) {\n    <button\n      type=\"button\"\n      role=\"radio\"\n      class=\"ath-swatch__item\"\n      [attr.data-color]=\"option.color\"\n      [attr.aria-checked]=\"value() === option.color\"\n      [attr.aria-label]=\"option.name\"\n      [attr.title]=\"option.name\"\n      [attr.tabindex]=\"i === stop() ? 0 : -1\"\n      [disabled]=\"disabled()\"\n      (click)=\"pick(option.color)\"\n      (keydown)=\"onKey($event, i)\"\n    >\n      @if (value() === option.color) {\n        <ath-icon [img]=\"checkIcon\" [size]=\"14\" aria-hidden=\"true\" />\n      }\n    </button>\n  }\n</div>\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:inline-flex}.ath-swatch{display:inline-flex;flex-wrap:wrap;gap:var(--space-2)}.ath-swatch[aria-disabled=true]{opacity:.5}.ath-swatch__item{border:none;background:none;padding:0;margin:0;font:inherit;color:inherit;cursor:pointer}.ath-swatch__item{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:var(--r-full);border:1px solid var(--border);color:var(--mark-on-color);transition:transform var(--t-fast),box-shadow var(--t-fast)}.ath-swatch__item[data-color=neutral]{background:var(--grey-muted)}.ath-swatch__item[data-color=blue]{background:var(--blue-muted)}.ath-swatch__item[data-color=green]{background:var(--green-muted)}.ath-swatch__item[data-color=amber]{background:var(--amber-muted)}.ath-swatch__item[data-color=red]{background:var(--red-muted)}.ath-swatch__item[data-color=purple]{background:var(--purple-muted)}.ath-swatch__item[data-color=pink]{background:var(--pink-muted)}.ath-swatch__item ath-icon{filter:drop-shadow(var(--mark-shadow))}.ath-swatch__item:hover:not(:disabled){transform:scale(1.08)}.ath-swatch__item[aria-checked=true]{box-shadow:0 0 0 2px var(--surface),0 0 0 4px var(--fg)}.ath-swatch__item:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-swatch__item:disabled{cursor:not-allowed}.ath-swatch--solid .ath-swatch__item{border-color:transparent}.ath-swatch--solid .ath-swatch__item[data-color=neutral]{background:var(--fg-4)}.ath-swatch--solid .ath-swatch__item[data-color=blue]{background:var(--blue)}.ath-swatch--solid .ath-swatch__item[data-color=green]{background:var(--green)}.ath-swatch--solid .ath-swatch__item[data-color=amber]{background:var(--amber)}.ath-swatch--solid .ath-swatch__item[data-color=red]{background:var(--red)}.ath-swatch--solid .ath-swatch__item[data-color=purple]{background:var(--purple)}.ath-swatch--solid .ath-swatch__item[data-color=pink]{background:var(--pink)}\n"],
			dependencies: [{
				kind: "component",
				type: AthIconComponent,
				selector: "ath-icon",
				inputs: [
					"img",
					"size",
					"strokeWidth",
					"color",
					"absoluteStrokeWidth",
					"class"
				]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthColorSwatchComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-color-swatch",
			imports: [AthIconComponent],
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: "<div\n  class=\"ath-swatch\"\n  [class.ath-swatch--solid]=\"tone() === 'solid'\"\n  role=\"radiogroup\"\n  [attr.aria-label]=\"groupLabel()\"\n  [attr.aria-disabled]=\"disabled() || null\"\n>\n  @for (option of options(); track option.color; let i = $index) {\n    <button\n      type=\"button\"\n      role=\"radio\"\n      class=\"ath-swatch__item\"\n      [attr.data-color]=\"option.color\"\n      [attr.aria-checked]=\"value() === option.color\"\n      [attr.aria-label]=\"option.name\"\n      [attr.title]=\"option.name\"\n      [attr.tabindex]=\"i === stop() ? 0 : -1\"\n      [disabled]=\"disabled()\"\n      (click)=\"pick(option.color)\"\n      (keydown)=\"onKey($event, i)\"\n    >\n      @if (value() === option.color) {\n        <ath-icon [img]=\"checkIcon\" [size]=\"14\" aria-hidden=\"true\" />\n      }\n    </button>\n  }\n</div>\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:inline-flex}.ath-swatch{display:inline-flex;flex-wrap:wrap;gap:var(--space-2)}.ath-swatch[aria-disabled=true]{opacity:.5}.ath-swatch__item{border:none;background:none;padding:0;margin:0;font:inherit;color:inherit;cursor:pointer}.ath-swatch__item{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:var(--r-full);border:1px solid var(--border);color:var(--mark-on-color);transition:transform var(--t-fast),box-shadow var(--t-fast)}.ath-swatch__item[data-color=neutral]{background:var(--grey-muted)}.ath-swatch__item[data-color=blue]{background:var(--blue-muted)}.ath-swatch__item[data-color=green]{background:var(--green-muted)}.ath-swatch__item[data-color=amber]{background:var(--amber-muted)}.ath-swatch__item[data-color=red]{background:var(--red-muted)}.ath-swatch__item[data-color=purple]{background:var(--purple-muted)}.ath-swatch__item[data-color=pink]{background:var(--pink-muted)}.ath-swatch__item ath-icon{filter:drop-shadow(var(--mark-shadow))}.ath-swatch__item:hover:not(:disabled){transform:scale(1.08)}.ath-swatch__item[aria-checked=true]{box-shadow:0 0 0 2px var(--surface),0 0 0 4px var(--fg)}.ath-swatch__item:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-swatch__item:disabled{cursor:not-allowed}.ath-swatch--solid .ath-swatch__item{border-color:transparent}.ath-swatch--solid .ath-swatch__item[data-color=neutral]{background:var(--fg-4)}.ath-swatch--solid .ath-swatch__item[data-color=blue]{background:var(--blue)}.ath-swatch--solid .ath-swatch__item[data-color=green]{background:var(--green)}.ath-swatch--solid .ath-swatch__item[data-color=amber]{background:var(--amber)}.ath-swatch--solid .ath-swatch__item[data-color=red]{background:var(--red)}.ath-swatch--solid .ath-swatch__item[data-color=purple]{background:var(--purple)}.ath-swatch--solid .ath-swatch__item[data-color=pink]{background:var(--pink)}\n"]
		}]
	}],
	propDecorators: {
		value: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "value",
				required: false
			}]
		}, {
			type: i0.Output,
			args: ["valueChange"]
		}],
		label: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "label",
				required: false
			}]
		}],
		disabled: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "disabled",
				required: false
			}]
		}],
		tone: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "tone",
				required: false
			}]
		}],
		colors: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "colors",
				required: false
			}]
		}]
	}
});
const ORDER = [
	"deny",
	"inherit",
	"allow"
];
const ICONS = {
	deny: X,
	inherit: Slash,
	allow: Check
};
var AthTriStateComponent = class AthTriStateComponent {
	constructor() {
		this.labels = injectAthLabels();
		this.host = inject(ElementRef);
		this.value = model("inherit", ...ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []);
		this.inherited = input(null, ...ngDevMode ? [{ debugName: "inherited" }] : /* istanbul ignore next */ []);
		this.disabled = input(false, {
			...ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.label = input.required(...ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []);
		this.compact = input(false, {
			...ngDevMode ? { debugName: "compact" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.segments = computed(() => {
			const inherited = this.inherited();
			return ORDER.map((state) => ({
				state,
				icon: ICONS[state],
				text: this.textOf(state),
				name: state === "inherit" && inherited !== null ? inherited ? this.labels.triStateInheritAllowed() : this.labels.triStateInheritDenied() : this.textOf(state)
			}));
		}, ...ngDevMode ? [{ debugName: "segments" }] : /* istanbul ignore next */ []);
	}
	select(state) {
		if (!this.disabled() && state !== this.value()) this.value.set(state);
	}
	onKey(event, index) {
		if (this.disabled()) return;
		const count = ORDER.length;
		const rtl = getComputedStyle(this.host.nativeElement).direction === "rtl";
		let next;
		switch (event.key) {
			case "ArrowRight":
				next = index + (rtl ? -1 : 1);
				break;
			case "ArrowLeft":
				next = index + (rtl ? 1 : -1);
				break;
			case "ArrowDown":
				next = index + 1;
				break;
			case "ArrowUp":
				next = index - 1;
				break;
			case "Home":
				next = 0;
				break;
			case "End":
				next = count - 1;
				break;
			case " ":
			case "Enter":
				event.preventDefault();
				this.select(ORDER[index]);
				return;
			default: return;
		}
		event.preventDefault();
		next = (next + count) % count;
		this.select(ORDER[next]);
		this.host.nativeElement.querySelectorAll("[role=\"radio\"]")[next]?.focus();
	}
	textOf(state) {
		switch (state) {
			case "deny": return this.labels.triStateDeny();
			case "inherit": return this.labels.triStateInherit();
			case "allow": return this.labels.triStateAllow();
		}
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthTriStateComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthTriStateComponent,
			isStandalone: true,
			selector: "ath-tri-state",
			inputs: {
				value: {
					classPropertyName: "value",
					publicName: "value",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				inherited: {
					classPropertyName: "inherited",
					publicName: "inherited",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				disabled: {
					classPropertyName: "disabled",
					publicName: "disabled",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				label: {
					classPropertyName: "label",
					publicName: "label",
					isSignal: true,
					isRequired: true,
					transformFunction: null
				},
				compact: {
					classPropertyName: "compact",
					publicName: "compact",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			outputs: { value: "valueChange" },
			host: { properties: { "attr.data-compact": "compact() ? '' : null" } },
			ngImport: i0,
			template: "<div\n  class=\"ath-tri\"\n  role=\"radiogroup\"\n  [attr.aria-label]=\"label()\"\n  [attr.aria-disabled]=\"disabled() || null\"\n>\n  @for (segment of segments(); track segment.state; let i = $index) {\n    <button\n      type=\"button\"\n      role=\"radio\"\n      class=\"ath-tri__item\"\n      [attr.data-state]=\"segment.state\"\n      [attr.aria-checked]=\"value() === segment.state\"\n      [attr.aria-label]=\"segment.name\"\n      [attr.title]=\"segment.name\"\n      [attr.tabindex]=\"value() === segment.state ? 0 : -1\"\n      [disabled]=\"disabled()\"\n      (click)=\"select(segment.state)\"\n      (keydown)=\"onKey($event, i)\"\n    >\n      <ath-icon [img]=\"segment.icon\" [size]=\"14\" aria-hidden=\"true\" />\n      <span class=\"ath-tri__text\" aria-hidden=\"true\">{{ segment.text }}</span>\n    </button>\n  }\n</div>\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:inline-flex;vertical-align:middle}.ath-tri{display:inline-flex;padding:2px;gap:2px;border:1px solid var(--border);border-radius:var(--r);background:var(--bg-2)}.ath-tri[aria-disabled=true]{opacity:.5}.ath-tri__item{border:none;background:none;padding:0;margin:0;font:inherit;color:inherit;cursor:pointer}.ath-tri__item{display:inline-flex;align-items:center;gap:var(--space-1);height:calc(var(--control-h-sm) - 6px);padding:0 var(--space-2);border-radius:calc(var(--r) - 2px);font-size:var(--text-xs);font-weight:var(--weight-medium);color:var(--fg-3);white-space:nowrap;transition:background-color var(--t-fast),color var(--t-fast)}.ath-tri__item:hover:not(:disabled){color:var(--fg);background:var(--hover)}.ath-tri__item:disabled{cursor:not-allowed}.ath-tri__item[aria-checked=true]{color:var(--fg);background:var(--surface);box-shadow:var(--shadow-1)}.ath-tri__item[data-state=deny][aria-checked=true]{color:var(--red-text);background:var(--red-tint)}.ath-tri__item[data-state=allow][aria-checked=true]{color:var(--green-text);background:var(--green-tint)}.ath-tri__item:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}:host([data-compact]) .ath-tri__text{display:none}@media(max-width:479px){.ath-tri__text{display:none}}\n"],
			dependencies: [{
				kind: "component",
				type: AthIconComponent,
				selector: "ath-icon",
				inputs: [
					"img",
					"size",
					"strokeWidth",
					"color",
					"absoluteStrokeWidth",
					"class"
				]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthTriStateComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-tri-state",
			imports: [AthIconComponent],
			changeDetection: ChangeDetectionStrategy.OnPush,
			host: { "[attr.data-compact]": "compact() ? '' : null" },
			template: "<div\n  class=\"ath-tri\"\n  role=\"radiogroup\"\n  [attr.aria-label]=\"label()\"\n  [attr.aria-disabled]=\"disabled() || null\"\n>\n  @for (segment of segments(); track segment.state; let i = $index) {\n    <button\n      type=\"button\"\n      role=\"radio\"\n      class=\"ath-tri__item\"\n      [attr.data-state]=\"segment.state\"\n      [attr.aria-checked]=\"value() === segment.state\"\n      [attr.aria-label]=\"segment.name\"\n      [attr.title]=\"segment.name\"\n      [attr.tabindex]=\"value() === segment.state ? 0 : -1\"\n      [disabled]=\"disabled()\"\n      (click)=\"select(segment.state)\"\n      (keydown)=\"onKey($event, i)\"\n    >\n      <ath-icon [img]=\"segment.icon\" [size]=\"14\" aria-hidden=\"true\" />\n      <span class=\"ath-tri__text\" aria-hidden=\"true\">{{ segment.text }}</span>\n    </button>\n  }\n</div>\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:inline-flex;vertical-align:middle}.ath-tri{display:inline-flex;padding:2px;gap:2px;border:1px solid var(--border);border-radius:var(--r);background:var(--bg-2)}.ath-tri[aria-disabled=true]{opacity:.5}.ath-tri__item{border:none;background:none;padding:0;margin:0;font:inherit;color:inherit;cursor:pointer}.ath-tri__item{display:inline-flex;align-items:center;gap:var(--space-1);height:calc(var(--control-h-sm) - 6px);padding:0 var(--space-2);border-radius:calc(var(--r) - 2px);font-size:var(--text-xs);font-weight:var(--weight-medium);color:var(--fg-3);white-space:nowrap;transition:background-color var(--t-fast),color var(--t-fast)}.ath-tri__item:hover:not(:disabled){color:var(--fg);background:var(--hover)}.ath-tri__item:disabled{cursor:not-allowed}.ath-tri__item[aria-checked=true]{color:var(--fg);background:var(--surface);box-shadow:var(--shadow-1)}.ath-tri__item[data-state=deny][aria-checked=true]{color:var(--red-text);background:var(--red-tint)}.ath-tri__item[data-state=allow][aria-checked=true]{color:var(--green-text);background:var(--green-tint)}.ath-tri__item:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}:host([data-compact]) .ath-tri__text{display:none}@media(max-width:479px){.ath-tri__text{display:none}}\n"]
		}]
	}],
	propDecorators: {
		value: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "value",
				required: false
			}]
		}, {
			type: i0.Output,
			args: ["valueChange"]
		}],
		inherited: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "inherited",
				required: false
			}]
		}],
		disabled: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "disabled",
				required: false
			}]
		}],
		label: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "label",
				required: true
			}]
		}],
		compact: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "compact",
				required: false
			}]
		}]
	}
});
let nextId = 0;
var AthPermissionRowComponent = class AthPermissionRowComponent {
	constructor() {
		this.icon = input(null, ...ngDevMode ? [{ debugName: "icon" }] : /* istanbul ignore next */ []);
		this.label = input.required(...ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []);
		this.description = input(null, ...ngDevMode ? [{ debugName: "description" }] : /* istanbul ignore next */ []);
		this.inheritedHint = input(null, ...ngDevMode ? [{ debugName: "inheritedHint" }] : /* istanbul ignore next */ []);
		this.disabled = input(false, {
			...ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.disabledReason = input(null, ...ngDevMode ? [{ debugName: "disabledReason" }] : /* istanbul ignore next */ []);
		this.interactive = input(false, {
			...ngDevMode ? { debugName: "interactive" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.activate = output();
		this.labelId = `ath-perm-${++nextId}-label`;
		this.descriptionId = `ath-perm-${nextId}-desc`;
		this.control = viewChild.required("control", ...ngDevMode ? [{ debugName: "control" }] : /* istanbul ignore next */ []);
	}
	onClick(event) {
		if (!this.interactive() || this.disabled()) return;
		const target = event.target;
		if (target && this.control().nativeElement.contains(target)) return;
		this.activate.emit();
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthPermissionRowComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthPermissionRowComponent,
			isStandalone: true,
			selector: "ath-permission-row",
			inputs: {
				icon: {
					classPropertyName: "icon",
					publicName: "icon",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				label: {
					classPropertyName: "label",
					publicName: "label",
					isSignal: true,
					isRequired: true,
					transformFunction: null
				},
				description: {
					classPropertyName: "description",
					publicName: "description",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				inheritedHint: {
					classPropertyName: "inheritedHint",
					publicName: "inheritedHint",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				disabled: {
					classPropertyName: "disabled",
					publicName: "disabled",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				disabledReason: {
					classPropertyName: "disabledReason",
					publicName: "disabledReason",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				interactive: {
					classPropertyName: "interactive",
					publicName: "interactive",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			outputs: { activate: "activate" },
			host: {
				listeners: { "click": "onClick($event)" },
				properties: {
					"class.ath-perm--interactive": "interactive() && !disabled()",
					"class.ath-perm--disabled": "disabled()"
				}
			},
			viewQueries: [{
				propertyName: "control",
				first: true,
				predicate: ["control"],
				descendants: true,
				isSignal: true
			}],
			ngImport: i0,
			template: "<span class=\"ath-perm__icon\" aria-hidden=\"true\">\n  @if (icon(); as glyph) {\n    <ath-icon [img]=\"glyph\" [size]=\"16\" />\n  }\n</span>\n<span class=\"ath-perm__text\">\n  <span class=\"ath-perm__label\" [id]=\"labelId\">{{ label() }}</span>\n  @if (description() || inheritedHint() || (disabled() && disabledReason())) {\n    <span class=\"ath-perm__desc\" [id]=\"descriptionId\">\n      @if (description(); as text) {\n        <span class=\"ath-perm__explain\" [attr.title]=\"text\">{{ text }}</span>\n      }\n      @if (inheritedHint(); as hint) {\n        <span class=\"ath-perm__hint\">{{ hint }}</span>\n      }\n      @if (disabled() && disabledReason()) {\n        <span class=\"ath-perm__sr\">{{ disabledReason() }}</span>\n      }\n    </span>\n  }\n</span>\n<span class=\"ath-perm__control\" #control [athTooltip]=\"disabled() ? disabledReason() || '' : ''\">\n  <ng-content />\n</span>\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:flex;align-items:center;gap:var(--space-3);min-height:var(--row-h);padding:var(--space-2) var(--space-3);border-radius:var(--r);transition:background-color var(--t-fast)}:host(.ath-perm--interactive){cursor:pointer}:host(.ath-perm--interactive):hover{background:var(--hover)}:host(.ath-perm--disabled) .ath-perm__label,:host(.ath-perm--disabled) .ath-perm__icon{color:var(--fg-disabled)}.ath-perm__icon{display:inline-flex;flex:none;align-items:center;justify-content:center;width:20px;color:var(--fg-3)}.ath-perm__text{display:flex;flex:1;flex-direction:column;gap:1px;min-width:0}.ath-perm__label{font-size:var(--text-sm);font-weight:var(--weight-medium);color:var(--fg)}.ath-perm__desc{display:flex;flex-wrap:wrap;gap:0 var(--space-2);min-width:0;font-size:var(--text-xs);color:var(--fg-3)}.ath-perm__explain{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0;max-width:100%}.ath-perm__hint{color:var(--fg-3);font-style:italic}.ath-perm__sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}.ath-perm__control{display:inline-flex;flex:none;align-items:center}@media(max-width:479px){:host{flex-wrap:wrap}.ath-perm__text{flex-basis:calc(100% - 20px - var(--space-3))}.ath-perm__control{margin-inline-start:calc(20px + var(--space-3))}}\n"],
			dependencies: [{
				kind: "component",
				type: AthIconComponent,
				selector: "ath-icon",
				inputs: [
					"img",
					"size",
					"strokeWidth",
					"color",
					"absoluteStrokeWidth",
					"class"
				]
			}, {
				kind: "directive",
				type: AthTooltipDirective,
				selector: "[athTooltip]",
				inputs: ["athTooltip", "tooltipPosition"]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthPermissionRowComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-permission-row",
			imports: [AthIconComponent, AthTooltipDirective],
			changeDetection: ChangeDetectionStrategy.OnPush,
			host: {
				"[class.ath-perm--interactive]": "interactive() && !disabled()",
				"[class.ath-perm--disabled]": "disabled()",
				"(click)": "onClick($event)"
			},
			template: "<span class=\"ath-perm__icon\" aria-hidden=\"true\">\n  @if (icon(); as glyph) {\n    <ath-icon [img]=\"glyph\" [size]=\"16\" />\n  }\n</span>\n<span class=\"ath-perm__text\">\n  <span class=\"ath-perm__label\" [id]=\"labelId\">{{ label() }}</span>\n  @if (description() || inheritedHint() || (disabled() && disabledReason())) {\n    <span class=\"ath-perm__desc\" [id]=\"descriptionId\">\n      @if (description(); as text) {\n        <span class=\"ath-perm__explain\" [attr.title]=\"text\">{{ text }}</span>\n      }\n      @if (inheritedHint(); as hint) {\n        <span class=\"ath-perm__hint\">{{ hint }}</span>\n      }\n      @if (disabled() && disabledReason()) {\n        <span class=\"ath-perm__sr\">{{ disabledReason() }}</span>\n      }\n    </span>\n  }\n</span>\n<span class=\"ath-perm__control\" #control [athTooltip]=\"disabled() ? disabledReason() || '' : ''\">\n  <ng-content />\n</span>\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:flex;align-items:center;gap:var(--space-3);min-height:var(--row-h);padding:var(--space-2) var(--space-3);border-radius:var(--r);transition:background-color var(--t-fast)}:host(.ath-perm--interactive){cursor:pointer}:host(.ath-perm--interactive):hover{background:var(--hover)}:host(.ath-perm--disabled) .ath-perm__label,:host(.ath-perm--disabled) .ath-perm__icon{color:var(--fg-disabled)}.ath-perm__icon{display:inline-flex;flex:none;align-items:center;justify-content:center;width:20px;color:var(--fg-3)}.ath-perm__text{display:flex;flex:1;flex-direction:column;gap:1px;min-width:0}.ath-perm__label{font-size:var(--text-sm);font-weight:var(--weight-medium);color:var(--fg)}.ath-perm__desc{display:flex;flex-wrap:wrap;gap:0 var(--space-2);min-width:0;font-size:var(--text-xs);color:var(--fg-3)}.ath-perm__explain{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0;max-width:100%}.ath-perm__hint{color:var(--fg-3);font-style:italic}.ath-perm__sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}.ath-perm__control{display:inline-flex;flex:none;align-items:center}@media(max-width:479px){:host{flex-wrap:wrap}.ath-perm__text{flex-basis:calc(100% - 20px - var(--space-3))}.ath-perm__control{margin-inline-start:calc(20px + var(--space-3))}}\n"]
		}]
	}],
	propDecorators: {
		icon: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "icon",
				required: false
			}]
		}],
		label: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "label",
				required: true
			}]
		}],
		description: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "description",
				required: false
			}]
		}],
		inheritedHint: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "inheritedHint",
				required: false
			}]
		}],
		disabled: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "disabled",
				required: false
			}]
		}],
		disabledReason: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "disabledReason",
				required: false
			}]
		}],
		interactive: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "interactive",
				required: false
			}]
		}],
		activate: [{
			type: i0.Output,
			args: ["activate"]
		}],
		control: [{
			type: i0.ViewChild,
			args: ["control", { isSignal: true }]
		}]
	}
});
var AthSaveBarComponent = class AthSaveBarComponent {
	constructor() {
		this.labels = injectAthLabels();
		this.host = inject(ElementRef);
		this.stack = inject(AthOverlayStack);
		this.injector = inject(Injector);
		this.open = input(false, {
			...ngDevMode ? { debugName: "open" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.message = input(null, ...ngDevMode ? [{ debugName: "message" }] : /* istanbul ignore next */ []);
		this.saving = input(false, {
			...ngDevMode ? { debugName: "saving" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.saveLabel = input(null, ...ngDevMode ? [{ debugName: "saveLabel" }] : /* istanbul ignore next */ []);
		this.discardLabel = input(null, ...ngDevMode ? [{ debugName: "discardLabel" }] : /* istanbul ignore next */ []);
		this.confirmDiscard = input(false, {
			...ngDevMode ? { debugName: "confirmDiscard" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.save = output();
		this.discard = output();
		this.confirming = signal(false, ...ngDevMode ? [{ debugName: "confirming" }] : /* istanbul ignore next */ []);
		this.announcement = computed(() => this.open() ? this.text() : "", ...ngDevMode ? [{ debugName: "announcement" }] : /* istanbul ignore next */ []);
		this.text = computed(() => this.message() || this.labels.saveBarMessage(), ...ngDevMode ? [{ debugName: "text" }] : /* istanbul ignore next */ []);
		this.saveText = computed(() => this.saveLabel() || this.labels.saveBarSave(), ...ngDevMode ? [{ debugName: "saveText" }] : /* istanbul ignore next */ []);
		this.discardText = computed(() => this.confirming() ? this.labels.saveBarConfirmDiscard() : this.discardLabel() || this.labels.saveBarDiscard(), ...ngDevMode ? [{ debugName: "discardText" }] : /* istanbul ignore next */ []);
		effect(() => {
			if (!this.open()) untracked(() => this.confirming.set(false));
		});
	}
	onSave() {
		if (this.saving()) return;
		this.confirming.set(false);
		this.save.emit();
	}
	onDiscard() {
		if (this.saving()) return;
		if (this.confirmDiscard() && !this.confirming()) {
			this.confirming.set(true);
			return;
		}
		this.confirming.set(false);
		this.discard.emit();
	}
	onDocumentKey(event) {
		if (event.key !== "Escape" || !this.open() || this.saving() || event.defaultPrevented) return;
		if (this.stack.size > 0 || this.stack.escapeConsumed()) return;
		if (!this.confirmDiscard()) return;
		event.preventDefault();
		if (this.confirming()) {
			this.confirming.set(false);
			return;
		}
		this.confirming.set(true);
		afterNextRender(() => this.host.nativeElement.querySelector(".ath-save-bar__discard button")?.focus(), { injector: this.injector });
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthSaveBarComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthSaveBarComponent,
			isStandalone: true,
			selector: "ath-save-bar",
			inputs: {
				open: {
					classPropertyName: "open",
					publicName: "open",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				message: {
					classPropertyName: "message",
					publicName: "message",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				saving: {
					classPropertyName: "saving",
					publicName: "saving",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				saveLabel: {
					classPropertyName: "saveLabel",
					publicName: "saveLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				discardLabel: {
					classPropertyName: "discardLabel",
					publicName: "discardLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				confirmDiscard: {
					classPropertyName: "confirmDiscard",
					publicName: "confirmDiscard",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			outputs: {
				save: "save",
				discard: "discard"
			},
			host: {
				listeners: { "document:keydown": "onDocumentKey($event)" },
				properties: { "class.ath-save-bar--open": "open()" }
			},
			ngImport: i0,
			template: "<span class=\"ath-save-bar__live\" aria-live=\"polite\">{{ announcement() }}</span>\n@if (open()) {\n  <div class=\"ath-save-bar\" role=\"region\" [attr.aria-label]=\"text()\">\n    <span class=\"ath-save-bar__message\" aria-hidden=\"true\">{{ text() }}</span>\n    <span class=\"ath-save-bar__actions\">\n      <ath-button\n        class=\"ath-save-bar__discard\"\n        [variant]=\"confirming() ? 'danger' : 'ghost'\"\n        size=\"sm\"\n        [disabled]=\"saving()\"\n        (clicked)=\"onDiscard()\"\n        >{{ discardText() }}</ath-button\n      >\n      <ath-button variant=\"primary\" size=\"sm\" [loading]=\"saving()\" (clicked)=\"onSave()\">{{\n        saveText()\n      }}</ath-button>\n    </span>\n  </div>\n}\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{position:sticky;bottom:0;z-index:var(--z-sticky);display:block;pointer-events:none}:host(.ath-save-bar--open){padding:var(--space-3) 0}.ath-save-bar{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:var(--space-3);max-width:100%;padding:var(--space-2) var(--space-2) var(--space-2) var(--space-4);border:1px solid var(--selection-bar-border);border-radius:var(--r-lg);background:var(--selection-bar-bg);color:var(--selection-bar-fg);box-shadow:var(--shadow-2);pointer-events:auto;animation:ath-save-bar-in var(--t-base)}.ath-save-bar__live{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}.ath-save-bar__message{font-size:var(--text-sm);font-weight:var(--weight-medium)}.ath-save-bar__actions{display:inline-flex;gap:var(--space-2);margin-inline-start:auto}@keyframes ath-save-bar-in{0%{opacity:0;transform:translateY(8px)}}@media(prefers-reduced-motion:reduce){.ath-save-bar{animation:none}}@media(max-width:479px){:host(.ath-save-bar--open){padding:0}.ath-save-bar{border-radius:0;border-inline:0;padding:var(--space-3) var(--space-4)}.ath-save-bar__actions{width:100%}.ath-save-bar__actions>*{flex:1}}\n"],
			dependencies: [{
				kind: "component",
				type: AthButtonComponent,
				selector: "ath-button",
				inputs: [
					"variant",
					"size",
					"type",
					"disabled",
					"loading",
					"fullWidth",
					"pressed",
					"expanded",
					"controls",
					"ariaLabel",
					"action"
				],
				outputs: [
					"clicked",
					"done",
					"failed"
				]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthSaveBarComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-save-bar",
			imports: [AthButtonComponent],
			changeDetection: ChangeDetectionStrategy.OnPush,
			host: {
				"[class.ath-save-bar--open]": "open()",
				"(document:keydown)": "onDocumentKey($event)"
			},
			template: "<span class=\"ath-save-bar__live\" aria-live=\"polite\">{{ announcement() }}</span>\n@if (open()) {\n  <div class=\"ath-save-bar\" role=\"region\" [attr.aria-label]=\"text()\">\n    <span class=\"ath-save-bar__message\" aria-hidden=\"true\">{{ text() }}</span>\n    <span class=\"ath-save-bar__actions\">\n      <ath-button\n        class=\"ath-save-bar__discard\"\n        [variant]=\"confirming() ? 'danger' : 'ghost'\"\n        size=\"sm\"\n        [disabled]=\"saving()\"\n        (clicked)=\"onDiscard()\"\n        >{{ discardText() }}</ath-button\n      >\n      <ath-button variant=\"primary\" size=\"sm\" [loading]=\"saving()\" (clicked)=\"onSave()\">{{\n        saveText()\n      }}</ath-button>\n    </span>\n  </div>\n}\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{position:sticky;bottom:0;z-index:var(--z-sticky);display:block;pointer-events:none}:host(.ath-save-bar--open){padding:var(--space-3) 0}.ath-save-bar{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:var(--space-3);max-width:100%;padding:var(--space-2) var(--space-2) var(--space-2) var(--space-4);border:1px solid var(--selection-bar-border);border-radius:var(--r-lg);background:var(--selection-bar-bg);color:var(--selection-bar-fg);box-shadow:var(--shadow-2);pointer-events:auto;animation:ath-save-bar-in var(--t-base)}.ath-save-bar__live{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}.ath-save-bar__message{font-size:var(--text-sm);font-weight:var(--weight-medium)}.ath-save-bar__actions{display:inline-flex;gap:var(--space-2);margin-inline-start:auto}@keyframes ath-save-bar-in{0%{opacity:0;transform:translateY(8px)}}@media(prefers-reduced-motion:reduce){.ath-save-bar{animation:none}}@media(max-width:479px){:host(.ath-save-bar--open){padding:0}.ath-save-bar{border-radius:0;border-inline:0;padding:var(--space-3) var(--space-4)}.ath-save-bar__actions{width:100%}.ath-save-bar__actions>*{flex:1}}\n"]
		}]
	}],
	ctorParameters: () => [],
	propDecorators: {
		open: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "open",
				required: false
			}]
		}],
		message: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "message",
				required: false
			}]
		}],
		saving: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "saving",
				required: false
			}]
		}],
		saveLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "saveLabel",
				required: false
			}]
		}],
		discardLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "discardLabel",
				required: false
			}]
		}],
		confirmDiscard: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "confirmDiscard",
				required: false
			}]
		}],
		save: [{
			type: i0.Output,
			args: ["save"]
		}],
		discard: [{
			type: i0.Output,
			args: ["discard"]
		}]
	}
});
const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;
var AthRoleBadgeComponent = class AthRoleBadgeComponent {
	constructor() {
		this.labels = injectAthLabels();
		this.name = input.required(...ngDevMode ? [{ debugName: "name" }] : /* istanbul ignore next */ []);
		this.color = input(null, ...ngDevMode ? [{ debugName: "color" }] : /* istanbul ignore next */ []);
		this.size = input("md", ...ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []);
		this.locked = input(false, {
			...ngDevMode ? { debugName: "locked" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.lockIcon = Lock;
		this.hex = computed(() => {
			const color = this.color();
			return typeof color === "string" && HEX_COLOR.test(color) ? color : null;
		}, ...ngDevMode ? [{ debugName: "hex" }] : /* istanbul ignore next */ []);
		this.tone = computed(() => {
			const color = this.color();
			if (this.hex()) return "custom";
			return isAthDecoColor(color) ? color : "neutral";
		}, ...ngDevMode ? [{ debugName: "tone" }] : /* istanbul ignore next */ []);
		this.lockedText = computed(() => this.labels.roleLocked(), ...ngDevMode ? [{ debugName: "lockedText" }] : /* istanbul ignore next */ []);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthRoleBadgeComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthRoleBadgeComponent,
			isStandalone: true,
			selector: "ath-role-badge",
			inputs: {
				name: {
					classPropertyName: "name",
					publicName: "name",
					isSignal: true,
					isRequired: true,
					transformFunction: null
				},
				color: {
					classPropertyName: "color",
					publicName: "color",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				size: {
					classPropertyName: "size",
					publicName: "size",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				locked: {
					classPropertyName: "locked",
					publicName: "locked",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			ngImport: i0,
			template: "<span\n  class=\"ath-role-badge\"\n  [attr.data-color]=\"tone()\"\n  [attr.data-size]=\"size()\"\n  [style.--_dot]=\"hex()\"\n>\n  <span class=\"ath-role-badge__dot\" aria-hidden=\"true\"></span>\n  @if (locked()) {\n    <ath-icon class=\"ath-role-badge__lock\" [img]=\"lockIcon\" [size]=\"11\" aria-hidden=\"true\" />\n    <span class=\"ath-role-badge__sr\">{{ lockedText() }}:</span>\n  }\n  <span class=\"ath-role-badge__name\">{{ name() }}</span>\n</span>\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:inline-flex;max-width:100%;vertical-align:middle}.ath-role-badge{--_dot: var(--grey-muted);display:inline-flex;align-items:center;gap:6px;max-width:100%;padding:3px 8px;border:1px solid var(--border);border-radius:var(--r-full);background:var(--surface);color:var(--fg-2);font-size:var(--text-xs);font-weight:var(--weight-medium);line-height:1.2;white-space:nowrap}.ath-role-badge[data-color=neutral]{--_dot: var(--grey-muted)}.ath-role-badge[data-color=blue]{--_dot: var(--blue-muted)}.ath-role-badge[data-color=green]{--_dot: var(--green-muted)}.ath-role-badge[data-color=amber]{--_dot: var(--amber-muted)}.ath-role-badge[data-color=red]{--_dot: var(--red-muted)}.ath-role-badge[data-color=purple]{--_dot: var(--purple-muted)}.ath-role-badge[data-color=pink]{--_dot: var(--pink-muted)}.ath-role-badge[data-size=sm]{gap:4px;padding:1px 6px}.ath-role-badge__dot{flex:none;width:8px;height:8px;border-radius:var(--r-full);background:var(--_dot)}.ath-role-badge__lock{flex:none;color:var(--fg-3)}.ath-role-badge__sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}.ath-role-badge__name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}\n"],
			dependencies: [{
				kind: "component",
				type: AthIconComponent,
				selector: "ath-icon",
				inputs: [
					"img",
					"size",
					"strokeWidth",
					"color",
					"absoluteStrokeWidth",
					"class"
				]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthRoleBadgeComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-role-badge",
			imports: [AthIconComponent],
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: "<span\n  class=\"ath-role-badge\"\n  [attr.data-color]=\"tone()\"\n  [attr.data-size]=\"size()\"\n  [style.--_dot]=\"hex()\"\n>\n  <span class=\"ath-role-badge__dot\" aria-hidden=\"true\"></span>\n  @if (locked()) {\n    <ath-icon class=\"ath-role-badge__lock\" [img]=\"lockIcon\" [size]=\"11\" aria-hidden=\"true\" />\n    <span class=\"ath-role-badge__sr\">{{ lockedText() }}:</span>\n  }\n  <span class=\"ath-role-badge__name\">{{ name() }}</span>\n</span>\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:inline-flex;max-width:100%;vertical-align:middle}.ath-role-badge{--_dot: var(--grey-muted);display:inline-flex;align-items:center;gap:6px;max-width:100%;padding:3px 8px;border:1px solid var(--border);border-radius:var(--r-full);background:var(--surface);color:var(--fg-2);font-size:var(--text-xs);font-weight:var(--weight-medium);line-height:1.2;white-space:nowrap}.ath-role-badge[data-color=neutral]{--_dot: var(--grey-muted)}.ath-role-badge[data-color=blue]{--_dot: var(--blue-muted)}.ath-role-badge[data-color=green]{--_dot: var(--green-muted)}.ath-role-badge[data-color=amber]{--_dot: var(--amber-muted)}.ath-role-badge[data-color=red]{--_dot: var(--red-muted)}.ath-role-badge[data-color=purple]{--_dot: var(--purple-muted)}.ath-role-badge[data-color=pink]{--_dot: var(--pink-muted)}.ath-role-badge[data-size=sm]{gap:4px;padding:1px 6px}.ath-role-badge__dot{flex:none;width:8px;height:8px;border-radius:var(--r-full);background:var(--_dot)}.ath-role-badge__lock{flex:none;color:var(--fg-3)}.ath-role-badge__sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}.ath-role-badge__name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}\n"]
		}]
	}],
	propDecorators: {
		name: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "name",
				required: true
			}]
		}],
		color: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "color",
				required: false
			}]
		}],
		size: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "size",
				required: false
			}]
		}],
		locked: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "locked",
				required: false
			}]
		}]
	}
});
var AthAlertComponent = class AthAlertComponent {
	constructor() {
		this.labels = injectAthLabels();
		this.variant = input("info", ...ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []);
		this.appearance = input("inline", ...ngDevMode ? [{ debugName: "appearance" }] : /* istanbul ignore next */ []);
		this.message = input("", ...ngDevMode ? [{ debugName: "message" }] : /* istanbul ignore next */ []);
		this.title = input(null, ...ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []);
		this.icon = input(null, ...ngDevMode ? [{ debugName: "icon" }] : /* istanbul ignore next */ []);
		this.dismissible = input(false, ...ngDevMode ? [{ debugName: "dismissible" }] : /* istanbul ignore next */ []);
		this.retry = input(null, ...ngDevMode ? [{ debugName: "retry" }] : /* istanbul ignore next */ []);
		this.retryLabel = input(null, ...ngDevMode ? [{ debugName: "retryLabel" }] : /* istanbul ignore next */ []);
		this.dismissLabel = input(null, ...ngDevMode ? [{ debugName: "dismissLabel" }] : /* istanbul ignore next */ []);
		this.dismissed = output();
		this.closeIcon = X;
		this.tone = computed(() => {
			const v = this.variant();
			return v === "warning" ? "warn" : v;
		}, ...ngDevMode ? [{ debugName: "tone" }] : /* istanbul ignore next */ []);
		this.role = computed(() => this.tone() === "error" || this.tone() === "warn" ? "alert" : "status", ...ngDevMode ? [{ debugName: "role" }] : /* istanbul ignore next */ []);
		this.showIcon = computed(() => this.icon() ?? this.appearance() === "banner", ...ngDevMode ? [{ debugName: "showIcon" }] : /* istanbul ignore next */ []);
		this.glyph = computed(() => {
			switch (this.tone()) {
				case "warn": return AlertTriangle;
				case "error": return AlertOctagon;
				case "success": return CheckCircle2;
				default: return Info;
			}
		}, ...ngDevMode ? [{ debugName: "glyph" }] : /* istanbul ignore next */ []);
		this.retryText = computed(() => this.retryLabel() ?? this.labels.retry(), ...ngDevMode ? [{ debugName: "retryText" }] : /* istanbul ignore next */ []);
		this.dismissText = computed(() => this.dismissLabel() ?? this.labels.dismiss(), ...ngDevMode ? [{ debugName: "dismissText" }] : /* istanbul ignore next */ []);
	}
	dismiss() {
		this.dismissed.emit();
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthAlertComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthAlertComponent,
			isStandalone: true,
			selector: "ath-alert",
			inputs: {
				variant: {
					classPropertyName: "variant",
					publicName: "variant",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				appearance: {
					classPropertyName: "appearance",
					publicName: "appearance",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				message: {
					classPropertyName: "message",
					publicName: "message",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				title: {
					classPropertyName: "title",
					publicName: "title",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				icon: {
					classPropertyName: "icon",
					publicName: "icon",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				dismissible: {
					classPropertyName: "dismissible",
					publicName: "dismissible",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				retry: {
					classPropertyName: "retry",
					publicName: "retry",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				retryLabel: {
					classPropertyName: "retryLabel",
					publicName: "retryLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				dismissLabel: {
					classPropertyName: "dismissLabel",
					publicName: "dismissLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			outputs: { dismissed: "dismissed" },
			host: { properties: { "class.ath-alert--empty": "!message() && !title()" } },
			ngImport: i0,
			template: "<div\n  class=\"ath-alert\"\n  [attr.data-tone]=\"tone()\"\n  [attr.data-appearance]=\"appearance()\"\n  [attr.role]=\"role()\"\n>\n  @if (showIcon()) {\n    <ath-icon class=\"ath-alert__icon\" [img]=\"glyph()\" [size]=\"16\" aria-hidden=\"true\" />\n  }\n  <span class=\"ath-alert__message\">\n    @if (title()) {\n      <strong class=\"ath-alert__title\">{{ title() }}</strong>\n    }\n    {{ message() }}\n    <span class=\"ath-alert__extra\"><ng-content /></span>\n  </span>\n  @if (retry(); as retryAction) {\n    <ath-button class=\"ath-alert__retry\" variant=\"secondary\" size=\"xs\" [action]=\"retryAction\">\n      {{ retryText() }}\n    </ath-button>\n  }\n  @if (dismissible()) {\n    <button\n      type=\"button\"\n      class=\"ath-alert__dismiss\"\n      [attr.aria-label]=\"dismissText()\"\n      (click)=\"dismiss()\"\n    >\n      <ath-icon [img]=\"closeIcon\" [size]=\"14\" aria-hidden=\"true\" />\n    </button>\n  }\n</div>\n",
			styles: [":host{display:block;min-width:0}:host(.ath-alert--empty):has(.ath-alert__extra:empty){display:none}.ath-alert{--_tone: var(--blue);--_text: var(--blue-text);--_tint: var(--blue-tint);display:flex;align-items:center;gap:var(--space-3);padding:10px 14px;border:1px solid color-mix(in srgb,var(--_tone) 30%,transparent);border-radius:var(--r);background:var(--_tint);color:var(--_text);font-size:var(--control-font);line-height:var(--line-normal)}.ath-alert[data-tone=success]{--_tone: var(--green);--_text: var(--green-text);--_tint: var(--green-tint)}.ath-alert[data-tone=warn]{--_tone: var(--amber);--_text: var(--amber-text);--_tint: var(--amber-tint)}.ath-alert[data-tone=error]{--_tone: var(--red);--_text: var(--red-text);--_tint: var(--red-tint)}.ath-alert[data-appearance=banner]{padding:var(--space-2) var(--content-pad-x);border-width:0 0 1px;border-radius:0}.ath-alert__icon{flex-shrink:0;color:var(--_tone)}.ath-alert__message{flex:1;min-width:0}.ath-alert__title{margin-right:var(--space-1);font-weight:var(--weight-semibold)}.ath-alert__retry{flex-shrink:0}.ath-alert__dismiss{display:inline-flex;flex-shrink:0;align-items:center;justify-content:center;width:20px;height:20px;padding:0;border:none;border-radius:var(--r-sm);background:transparent;color:inherit;cursor:pointer;opacity:.7;transition:opacity var(--t-fast)}.ath-alert__dismiss:hover{opacity:1}.ath-alert__dismiss:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow);opacity:1}\n"],
			dependencies: [{
				kind: "component",
				type: AthIconComponent,
				selector: "ath-icon",
				inputs: [
					"img",
					"size",
					"strokeWidth",
					"color",
					"absoluteStrokeWidth",
					"class"
				]
			}, {
				kind: "component",
				type: AthButtonComponent,
				selector: "ath-button",
				inputs: [
					"variant",
					"size",
					"type",
					"disabled",
					"loading",
					"fullWidth",
					"pressed",
					"expanded",
					"controls",
					"ariaLabel",
					"action"
				],
				outputs: [
					"clicked",
					"done",
					"failed"
				]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthAlertComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-alert",
			imports: [AthIconComponent, AthButtonComponent],
			changeDetection: ChangeDetectionStrategy.OnPush,
			host: { "[class.ath-alert--empty]": "!message() && !title()" },
			template: "<div\n  class=\"ath-alert\"\n  [attr.data-tone]=\"tone()\"\n  [attr.data-appearance]=\"appearance()\"\n  [attr.role]=\"role()\"\n>\n  @if (showIcon()) {\n    <ath-icon class=\"ath-alert__icon\" [img]=\"glyph()\" [size]=\"16\" aria-hidden=\"true\" />\n  }\n  <span class=\"ath-alert__message\">\n    @if (title()) {\n      <strong class=\"ath-alert__title\">{{ title() }}</strong>\n    }\n    {{ message() }}\n    <span class=\"ath-alert__extra\"><ng-content /></span>\n  </span>\n  @if (retry(); as retryAction) {\n    <ath-button class=\"ath-alert__retry\" variant=\"secondary\" size=\"xs\" [action]=\"retryAction\">\n      {{ retryText() }}\n    </ath-button>\n  }\n  @if (dismissible()) {\n    <button\n      type=\"button\"\n      class=\"ath-alert__dismiss\"\n      [attr.aria-label]=\"dismissText()\"\n      (click)=\"dismiss()\"\n    >\n      <ath-icon [img]=\"closeIcon\" [size]=\"14\" aria-hidden=\"true\" />\n    </button>\n  }\n</div>\n",
			styles: [":host{display:block;min-width:0}:host(.ath-alert--empty):has(.ath-alert__extra:empty){display:none}.ath-alert{--_tone: var(--blue);--_text: var(--blue-text);--_tint: var(--blue-tint);display:flex;align-items:center;gap:var(--space-3);padding:10px 14px;border:1px solid color-mix(in srgb,var(--_tone) 30%,transparent);border-radius:var(--r);background:var(--_tint);color:var(--_text);font-size:var(--control-font);line-height:var(--line-normal)}.ath-alert[data-tone=success]{--_tone: var(--green);--_text: var(--green-text);--_tint: var(--green-tint)}.ath-alert[data-tone=warn]{--_tone: var(--amber);--_text: var(--amber-text);--_tint: var(--amber-tint)}.ath-alert[data-tone=error]{--_tone: var(--red);--_text: var(--red-text);--_tint: var(--red-tint)}.ath-alert[data-appearance=banner]{padding:var(--space-2) var(--content-pad-x);border-width:0 0 1px;border-radius:0}.ath-alert__icon{flex-shrink:0;color:var(--_tone)}.ath-alert__message{flex:1;min-width:0}.ath-alert__title{margin-right:var(--space-1);font-weight:var(--weight-semibold)}.ath-alert__retry{flex-shrink:0}.ath-alert__dismiss{display:inline-flex;flex-shrink:0;align-items:center;justify-content:center;width:20px;height:20px;padding:0;border:none;border-radius:var(--r-sm);background:transparent;color:inherit;cursor:pointer;opacity:.7;transition:opacity var(--t-fast)}.ath-alert__dismiss:hover{opacity:1}.ath-alert__dismiss:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow);opacity:1}\n"]
		}]
	}],
	propDecorators: {
		variant: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "variant",
				required: false
			}]
		}],
		appearance: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "appearance",
				required: false
			}]
		}],
		message: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "message",
				required: false
			}]
		}],
		title: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "title",
				required: false
			}]
		}],
		icon: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "icon",
				required: false
			}]
		}],
		dismissible: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "dismissible",
				required: false
			}]
		}],
		retry: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "retry",
				required: false
			}]
		}],
		retryLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "retryLabel",
				required: false
			}]
		}],
		dismissLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "dismissLabel",
				required: false
			}]
		}],
		dismissed: [{
			type: i0.Output,
			args: ["dismissed"]
		}]
	}
});
let nextDialogId = 0;
var AthDialogComponent = class AthDialogComponent {
	constructor() {
		this.stack = inject(AthOverlayStack);
		this.labels = injectAthLabels();
		this.titleId = `ath-dialog-title-${++nextDialogId}`;
		this.descriptionId = `ath-dialog-desc-${nextDialogId}`;
		this.open = input(false, {
			...ngDevMode ? { debugName: "open" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.title = input("", ...ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []);
		this.description = input("", ...ngDevMode ? [{ debugName: "description" }] : /* istanbul ignore next */ []);
		this.size = input("md", ...ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []);
		this.closeOnBackdrop = input(true, {
			...ngDevMode ? { debugName: "closeOnBackdrop" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.closeOnEscape = input(true, {
			...ngDevMode ? { debugName: "closeOnEscape" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.showClose = input(true, {
			...ngDevMode ? { debugName: "showClose" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.closeLabel = input(null, ...ngDevMode ? [{ debugName: "closeLabel" }] : /* istanbul ignore next */ []);
		this.ariaLabel = input(null, ...ngDevMode ? [{ debugName: "ariaLabel" }] : /* istanbul ignore next */ []);
		this.role = input("dialog", ...ngDevMode ? [{ debugName: "role" }] : /* istanbul ignore next */ []);
		this.bare = input(false, {
			...ngDevMode ? { debugName: "bare" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.uncover = input(null, ...ngDevMode ? [{ debugName: "uncover" }] : /* istanbul ignore next */ []);
		this.uncovered = computed(() => this.bare() && !!this.uncover(), ...ngDevMode ? [{ debugName: "uncovered" }] : /* istanbul ignore next */ []);
		this.closed = output();
		this.openChange = output();
		this.opened = output();
		this.closeIcon = X;
		this.closeText = computed(() => this.closeLabel() ?? this.labels.closeDialog(), ...ngDevMode ? [{ debugName: "closeText" }] : /* istanbul ignore next */ []);
		this.dialogEl = null;
		this.returnFocus = null;
		this.pressedOnBackdrop = false;
		this.locked = false;
		this.entry = {
			modal: true,
			panel: () => this.dialogEl,
			anchor: () => null,
			closeOnEscape: () => this.closeOnEscape(),
			closeOnOutsideClick: () => false,
			dismiss: () => this.requestClose()
		};
		this.dialogRef = viewChild("dialog", ...ngDevMode ? [{ debugName: "dialogRef" }] : /* istanbul ignore next */ []);
		effect(() => {
			const el = this.dialogRef()?.nativeElement ?? null;
			untracked(() => this.attach(el));
		});
	}
	ngOnChanges(changes) {
		if (changes["open"] && this.open() && !this.dialogEl) {
			const active = document.activeElement;
			this.returnFocus = active instanceof HTMLElement && active !== document.body ? active : null;
		}
	}
	ngOnDestroy() {
		if (this.dialogEl) this.teardown();
	}
	attach(el) {
		if (el === this.dialogEl) return;
		if (this.dialogEl) this.teardown();
		this.dialogEl = el;
		if (el) this.present(el);
	}
	close() {
		this.requestClose();
	}
	onKeydown(event) {
		if (this.dialogEl) trapTab(event, this.dialogEl);
	}
	onCancel(event) {
		event.preventDefault();
		if (!this.closeOnEscape() || this.stack.escapeConsumed() || !this.stack.isTop(this.entry)) return;
		this.requestClose();
	}
	onNativeClose() {
		const el = this.dialogEl;
		if (!this.open() || !el || el.open) return;
		this.showNative(el);
		this.stack.raiseTopLayer();
		this.focusInitial(el);
		if (this.closeOnEscape()) this.requestClose();
	}
	onPointerDown(event) {
		this.pressedOnBackdrop = this.isBackdropEvent(event);
	}
	onClick(event) {
		const onBackdrop = this.pressedOnBackdrop && this.isBackdropEvent(event);
		this.pressedOnBackdrop = false;
		if (onBackdrop && this.closeOnBackdrop() && this.stack.isTop(this.entry)) this.requestClose();
	}
	requestClose() {
		this.closed.emit();
		this.openChange.emit(false);
	}
	isBackdropEvent(event) {
		const el = this.dialogEl;
		if (!el || event.target !== el) return false;
		if (this.bare()) return true;
		const r = el.getBoundingClientRect();
		return event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom;
	}
	present(el) {
		this.entry.modal = !this.uncovered();
		this.stack.open(this.entry);
		this.stack.lockScroll();
		this.locked = true;
		this.showNative(el);
		this.stack.raiseTopLayer();
		this.focusInitial(el);
		this.opened.emit();
	}
	showNative(el) {
		try {
			if (el.open) {} else if (this.uncovered()) el.show();
			else el.showModal();
		} catch {
			el.setAttribute("open", "");
		}
	}
	focusInitial(el) {
		const auto = el.querySelector("[autofocus]");
		if (auto && focusSafely(auto)) return;
		const parts = el.querySelectorAll(".ath-dialog__bare, .ath-dialog__body, .ath-dialog__footer");
		for (const part of Array.from(parts)) {
			const first = tabbables(part)[0];
			if (first && focusSafely(first)) return;
		}
		if (!focusSafely(tabbables(el)[0])) focusSafely(el);
	}
	teardown() {
		const el = this.dialogEl;
		this.dialogEl = null;
		this.stack.close(this.entry);
		if (this.locked) this.stack.unlockScroll();
		this.locked = false;
		try {
			if (el?.open) el.close();
		} catch {}
		const back = this.returnFocus;
		this.returnFocus = null;
		focusSafely(back);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthDialogComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthDialogComponent,
			isStandalone: true,
			selector: "ath-dialog",
			inputs: {
				open: {
					classPropertyName: "open",
					publicName: "open",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				title: {
					classPropertyName: "title",
					publicName: "title",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				description: {
					classPropertyName: "description",
					publicName: "description",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				size: {
					classPropertyName: "size",
					publicName: "size",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				closeOnBackdrop: {
					classPropertyName: "closeOnBackdrop",
					publicName: "closeOnBackdrop",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				closeOnEscape: {
					classPropertyName: "closeOnEscape",
					publicName: "closeOnEscape",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				showClose: {
					classPropertyName: "showClose",
					publicName: "showClose",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				closeLabel: {
					classPropertyName: "closeLabel",
					publicName: "closeLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				ariaLabel: {
					classPropertyName: "ariaLabel",
					publicName: "ariaLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				role: {
					classPropertyName: "role",
					publicName: "role",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				bare: {
					classPropertyName: "bare",
					publicName: "bare",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				uncover: {
					classPropertyName: "uncover",
					publicName: "uncover",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			outputs: {
				closed: "closed",
				openChange: "openChange",
				opened: "opened"
			},
			host: { listeners: {
				"pointerdown": "onPointerDown($event)",
				"click": "onClick($event)"
			} },
			viewQueries: [{
				propertyName: "dialogRef",
				first: true,
				predicate: ["dialog"],
				descendants: true,
				isSignal: true
			}],
			usesOnChanges: true,
			ngImport: i0,
			template: "<!-- One default slot, shown in the body or, when bare, on its own. -->\n<ng-template #content><ng-content /></ng-template>\n\n@if (open()) {\n  <dialog\n    #dialog\n    class=\"ath-dialog\"\n    tabindex=\"-1\"\n    [class]=\"\n      (bare() ? 'ath-dialog--bare' : 'ath-dialog--' + size()) +\n      (uncovered() ? ' ath-dialog--uncover' : '')\n    \"\n    [style.--_dialog-uncover]=\"uncovered() ? uncover() : null\"\n    [attr.aria-modal]=\"uncovered() ? 'true' : null\"\n    [attr.role]=\"role() === 'alertdialog' ? 'alertdialog' : null\"\n    [attr.aria-labelledby]=\"title() && !bare() ? titleId : null\"\n    [attr.aria-label]=\"title() && !bare() ? null : ariaLabel()\"\n    [attr.aria-describedby]=\"description() && !bare() ? descriptionId : null\"\n    (keydown)=\"onKeydown($event)\"\n    (cancel)=\"onCancel($event)\"\n    (close)=\"onNativeClose()\"\n  >\n    @if (bare()) {\n      <div class=\"ath-dialog__bare\">\n        <ng-container [ngTemplateOutlet]=\"content\" />\n      </div>\n    } @else {\n      <div class=\"ath-dialog__surface\">\n        <header class=\"ath-dialog__header\">\n          <div class=\"ath-dialog__header-text\">\n            @if (title()) {\n              <h2 class=\"ath-dialog__title\" [id]=\"titleId\">{{ title() }}</h2>\n            }\n            @if (description()) {\n              <p class=\"ath-dialog__description\" [id]=\"descriptionId\">{{ description() }}</p>\n            }\n            <ng-content select=\"[slot=header],[athDialogHeader]\" />\n          </div>\n          @if (showClose()) {\n            <button\n              class=\"ath-dialog__close\"\n              type=\"button\"\n              [attr.aria-label]=\"closeText()\"\n              (click)=\"close()\"\n            >\n              <ath-icon [img]=\"closeIcon\" [size]=\"18\" aria-hidden=\"true\" />\n            </button>\n          }\n        </header>\n\n        <div class=\"ath-dialog__body\">\n          <ng-container [ngTemplateOutlet]=\"content\" />\n        </div>\n\n        <footer class=\"ath-dialog__footer\">\n          <ng-content select=\"[slot=footer],[athDialogFooter]\" />\n        </footer>\n      </div>\n    }\n  </dialog>\n}\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}.ath-dialog{box-sizing:border-box;width:calc(100vw - var(--space-8));max-height:calc(100dvh - var(--space-16));margin:auto;padding:0;overflow:hidden;font-family:var(--font-sans);font-style:normal;font-weight:var(--weight-normal);text-align:start;text-transform:none;white-space:normal;color:var(--fg);background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--shadow-3)}.ath-dialog[open]{display:flex;animation:ath-dialog-in var(--t-slow)}.ath-dialog::backdrop{background:var(--scrim);animation:ath-dialog-backdrop-in var(--t-slow)}.ath-dialog:focus{outline:none}.ath-dialog--sm{max-width:400px}.ath-dialog--md{max-width:520px}.ath-dialog--lg{max-width:680px}.ath-dialog--xl{max-width:860px}.ath-dialog--full{max-width:none;height:calc(100dvh - var(--space-16))}.ath-dialog--bare{width:100%;height:100%;max-width:none;max-height:none;margin:0;overflow:hidden;background:transparent;border:0;border-radius:0;box-shadow:none}.ath-dialog--bare[open]{display:block;animation:none}.ath-dialog--bare.ath-dialog--uncover{--_dialog-uncover: 0px;position:fixed;inset:var(--_dialog-uncover) 0 0;z-index:var(--z-modal);width:auto;height:auto;background:var(--scrim)}.ath-dialog--bare.ath-dialog--uncover[open]{animation:ath-dialog-backdrop-in var(--t-slow)}.ath-dialog__bare{display:contents}.ath-dialog__surface{display:flex;flex:1;flex-direction:column;min-width:0;min-height:0}.ath-dialog__header{display:flex;flex-shrink:0;align-items:flex-start;justify-content:space-between;gap:var(--space-4);padding:var(--space-6) var(--space-6) 0}.ath-dialog__header-text{display:flex;flex:1;flex-direction:column;gap:var(--space-1);min-width:0}.ath-dialog__title{margin:0;font-size:var(--text-lg);font-weight:var(--weight-semibold);line-height:1.3;color:var(--fg)}.ath-dialog__description{margin:0;font-size:var(--text-sm);line-height:1.5;color:var(--fg-3)}.ath-dialog__close{display:flex;flex-shrink:0;align-items:center;justify-content:center;width:var(--space-8);height:var(--space-8);padding:0;color:var(--fg-3);background:none;border:0;border-radius:var(--r-sm);cursor:pointer;transition:color var(--t-fast),background-color var(--t-fast)}.ath-dialog__close:hover{color:var(--fg);background:var(--hover-strong)}.ath-dialog__close:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-dialog__body{flex:1;min-height:0;padding:var(--space-6);overflow-y:auto;overscroll-behavior-y:contain}.ath-dialog__footer{display:flex;flex-shrink:0;align-items:center;justify-content:flex-end;gap:var(--space-3);padding:var(--space-4) var(--space-6);border-top:1px solid var(--border)}.ath-dialog__footer:empty{display:none}@keyframes ath-dialog-backdrop-in{0%{opacity:0}}@keyframes ath-dialog-in{0%{opacity:0;transform:scale(.96) translateY(8px)}}\n"],
			dependencies: [{
				kind: "component",
				type: AthIconComponent,
				selector: "ath-icon",
				inputs: [
					"img",
					"size",
					"strokeWidth",
					"color",
					"absoluteStrokeWidth",
					"class"
				]
			}, {
				kind: "directive",
				type: NgTemplateOutlet,
				selector: "[ngTemplateOutlet]",
				inputs: [
					"ngTemplateOutletContext",
					"ngTemplateOutlet",
					"ngTemplateOutletInjector"
				]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthDialogComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-dialog",
			imports: [AthIconComponent, NgTemplateOutlet],
			changeDetection: ChangeDetectionStrategy.OnPush,
			host: {
				"(pointerdown)": "onPointerDown($event)",
				"(click)": "onClick($event)"
			},
			template: "<!-- One default slot, shown in the body or, when bare, on its own. -->\n<ng-template #content><ng-content /></ng-template>\n\n@if (open()) {\n  <dialog\n    #dialog\n    class=\"ath-dialog\"\n    tabindex=\"-1\"\n    [class]=\"\n      (bare() ? 'ath-dialog--bare' : 'ath-dialog--' + size()) +\n      (uncovered() ? ' ath-dialog--uncover' : '')\n    \"\n    [style.--_dialog-uncover]=\"uncovered() ? uncover() : null\"\n    [attr.aria-modal]=\"uncovered() ? 'true' : null\"\n    [attr.role]=\"role() === 'alertdialog' ? 'alertdialog' : null\"\n    [attr.aria-labelledby]=\"title() && !bare() ? titleId : null\"\n    [attr.aria-label]=\"title() && !bare() ? null : ariaLabel()\"\n    [attr.aria-describedby]=\"description() && !bare() ? descriptionId : null\"\n    (keydown)=\"onKeydown($event)\"\n    (cancel)=\"onCancel($event)\"\n    (close)=\"onNativeClose()\"\n  >\n    @if (bare()) {\n      <div class=\"ath-dialog__bare\">\n        <ng-container [ngTemplateOutlet]=\"content\" />\n      </div>\n    } @else {\n      <div class=\"ath-dialog__surface\">\n        <header class=\"ath-dialog__header\">\n          <div class=\"ath-dialog__header-text\">\n            @if (title()) {\n              <h2 class=\"ath-dialog__title\" [id]=\"titleId\">{{ title() }}</h2>\n            }\n            @if (description()) {\n              <p class=\"ath-dialog__description\" [id]=\"descriptionId\">{{ description() }}</p>\n            }\n            <ng-content select=\"[slot=header],[athDialogHeader]\" />\n          </div>\n          @if (showClose()) {\n            <button\n              class=\"ath-dialog__close\"\n              type=\"button\"\n              [attr.aria-label]=\"closeText()\"\n              (click)=\"close()\"\n            >\n              <ath-icon [img]=\"closeIcon\" [size]=\"18\" aria-hidden=\"true\" />\n            </button>\n          }\n        </header>\n\n        <div class=\"ath-dialog__body\">\n          <ng-container [ngTemplateOutlet]=\"content\" />\n        </div>\n\n        <footer class=\"ath-dialog__footer\">\n          <ng-content select=\"[slot=footer],[athDialogFooter]\" />\n        </footer>\n      </div>\n    }\n  </dialog>\n}\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}.ath-dialog{box-sizing:border-box;width:calc(100vw - var(--space-8));max-height:calc(100dvh - var(--space-16));margin:auto;padding:0;overflow:hidden;font-family:var(--font-sans);font-style:normal;font-weight:var(--weight-normal);text-align:start;text-transform:none;white-space:normal;color:var(--fg);background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--shadow-3)}.ath-dialog[open]{display:flex;animation:ath-dialog-in var(--t-slow)}.ath-dialog::backdrop{background:var(--scrim);animation:ath-dialog-backdrop-in var(--t-slow)}.ath-dialog:focus{outline:none}.ath-dialog--sm{max-width:400px}.ath-dialog--md{max-width:520px}.ath-dialog--lg{max-width:680px}.ath-dialog--xl{max-width:860px}.ath-dialog--full{max-width:none;height:calc(100dvh - var(--space-16))}.ath-dialog--bare{width:100%;height:100%;max-width:none;max-height:none;margin:0;overflow:hidden;background:transparent;border:0;border-radius:0;box-shadow:none}.ath-dialog--bare[open]{display:block;animation:none}.ath-dialog--bare.ath-dialog--uncover{--_dialog-uncover: 0px;position:fixed;inset:var(--_dialog-uncover) 0 0;z-index:var(--z-modal);width:auto;height:auto;background:var(--scrim)}.ath-dialog--bare.ath-dialog--uncover[open]{animation:ath-dialog-backdrop-in var(--t-slow)}.ath-dialog__bare{display:contents}.ath-dialog__surface{display:flex;flex:1;flex-direction:column;min-width:0;min-height:0}.ath-dialog__header{display:flex;flex-shrink:0;align-items:flex-start;justify-content:space-between;gap:var(--space-4);padding:var(--space-6) var(--space-6) 0}.ath-dialog__header-text{display:flex;flex:1;flex-direction:column;gap:var(--space-1);min-width:0}.ath-dialog__title{margin:0;font-size:var(--text-lg);font-weight:var(--weight-semibold);line-height:1.3;color:var(--fg)}.ath-dialog__description{margin:0;font-size:var(--text-sm);line-height:1.5;color:var(--fg-3)}.ath-dialog__close{display:flex;flex-shrink:0;align-items:center;justify-content:center;width:var(--space-8);height:var(--space-8);padding:0;color:var(--fg-3);background:none;border:0;border-radius:var(--r-sm);cursor:pointer;transition:color var(--t-fast),background-color var(--t-fast)}.ath-dialog__close:hover{color:var(--fg);background:var(--hover-strong)}.ath-dialog__close:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-dialog__body{flex:1;min-height:0;padding:var(--space-6);overflow-y:auto;overscroll-behavior-y:contain}.ath-dialog__footer{display:flex;flex-shrink:0;align-items:center;justify-content:flex-end;gap:var(--space-3);padding:var(--space-4) var(--space-6);border-top:1px solid var(--border)}.ath-dialog__footer:empty{display:none}@keyframes ath-dialog-backdrop-in{0%{opacity:0}}@keyframes ath-dialog-in{0%{opacity:0;transform:scale(.96) translateY(8px)}}\n"]
		}]
	}],
	ctorParameters: () => [],
	propDecorators: {
		open: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "open",
				required: false
			}]
		}],
		title: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "title",
				required: false
			}]
		}],
		description: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "description",
				required: false
			}]
		}],
		size: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "size",
				required: false
			}]
		}],
		closeOnBackdrop: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "closeOnBackdrop",
				required: false
			}]
		}],
		closeOnEscape: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "closeOnEscape",
				required: false
			}]
		}],
		showClose: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "showClose",
				required: false
			}]
		}],
		closeLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "closeLabel",
				required: false
			}]
		}],
		ariaLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "ariaLabel",
				required: false
			}]
		}],
		role: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "role",
				required: false
			}]
		}],
		bare: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "bare",
				required: false
			}]
		}],
		uncover: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "uncover",
				required: false
			}]
		}],
		closed: [{
			type: i0.Output,
			args: ["closed"]
		}],
		openChange: [{
			type: i0.Output,
			args: ["openChange"]
		}],
		opened: [{
			type: i0.Output,
			args: ["opened"]
		}],
		dialogRef: [{
			type: i0.ViewChild,
			args: ["dialog", { isSignal: true }]
		}]
	}
});
var AthToastTimerDirective = class AthToastTimerDirective {
	constructor() {
		this.id = input.required({
			...ngDevMode ? { debugName: "id" } : /* istanbul ignore next */ {},
			alias: "athToastTimer"
		});
		this.running = input(true, ...ngDevMode ? [{ debugName: "running" }] : /* istanbul ignore next */ []);
		const bar = inject(ElementRef).nativeElement;
		const service = inject(AthToastService$1);
		let anim = null;
		effect(() => {
			const id = this.id();
			const running = this.running();
			untracked(() => {
				if (!running && anim) {
					anim.pause();
					return;
				}
				const total = service.toasts().find((t) => t.id === id)?.duration ?? 0;
				const remaining = service.remaining(id);
				anim?.cancel();
				anim = null;
				if (remaining === null || total <= 0 || typeof bar.animate !== "function") return;
				const from = Math.min(1, remaining / total);
				anim = bar.animate([{ transform: `scaleX(${from})` }, { transform: "scaleX(0)" }], {
					duration: Math.max(1, remaining),
					easing: "linear",
					fill: "forwards"
				});
				if (!running) anim.pause();
			});
		});
		inject(DestroyRef).onDestroy(() => anim?.cancel());
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthToastTimerDirective,
			deps: [],
			target: i0.ɵɵFactoryTarget.Directive
		});
	}
	static {
		this.ɵdir = i0.ɵɵngDeclareDirective({
			minVersion: "17.1.0",
			version: "22.2.2",
			type: AthToastTimerDirective,
			isStandalone: true,
			selector: "[athToastTimer]",
			inputs: {
				id: {
					classPropertyName: "id",
					publicName: "athToastTimer",
					isSignal: true,
					isRequired: true,
					transformFunction: null
				},
				running: {
					classPropertyName: "running",
					publicName: "running",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			ngImport: i0
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthToastTimerDirective,
	decorators: [{
		type: Directive,
		args: [{ selector: "[athToastTimer]" }]
	}],
	ctorParameters: () => [],
	propDecorators: {
		id: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "athToastTimer",
				required: true
			}]
		}],
		running: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "running",
				required: false
			}]
		}]
	}
});
const INFO_GLYPH = {
	name: "toast-info",
	node: [["path", { d: "M12 10.5v7" }], ["path", { d: "M12 6.5h.01" }]]
};
const ALERT_GLYPH = {
	name: "toast-alert",
	node: [["path", { d: "M12 6v8" }], ["path", { d: "M12 18h.01" }]]
};
const HOVER = "ath-toast:hover";
const FOCUS = "ath-toast:focus";
const HIDDEN = "ath-toast:hidden";
const ANNOUNCE_DELAY = 100;
const LEAVE_MS = 300;
var AthToastContainerComponent = class AthToastContainerComponent {
	constructor() {
		this.successIcon = Check;
		this.errorIcon = X;
		this.warningIcon = ALERT_GLYPH;
		this.infoIcon = INFO_GLYPH;
		this.closeIcon = X;
		this.moreIcon = ChevronUp;
		this.toastService = inject(AthToastService$1);
		this.labels = injectAthLabels();
		this.host = inject(ElementRef);
		this.doc = inject(DOCUMENT);
		this.maxVisible = input(3, ...ngDevMode ? [{ debugName: "maxVisible" }] : /* istanbul ignore next */ []);
		this.placement = input("bottom", ...ngDevMode ? [{ debugName: "placement" }] : /* istanbul ignore next */ []);
		this.dismissLabel = input(null, ...ngDevMode ? [{ debugName: "dismissLabel" }] : /* istanbul ignore next */ []);
		this.regionLabel = input(null, ...ngDevMode ? [{ debugName: "regionLabel" }] : /* istanbul ignore next */ []);
		this.hovered = signal(false, ...ngDevMode ? [{ debugName: "hovered" }] : /* istanbul ignore next */ []);
		this.focused = signal(false, ...ngDevMode ? [{ debugName: "focused" }] : /* istanbul ignore next */ []);
		this.pinned = signal(false, ...ngDevMode ? [{ debugName: "pinned" }] : /* istanbul ignore next */ []);
		this.returnFocus = null;
		this.paused = this.toastService.paused;
		this.expanded = computed(() => this.hovered() || this.focused() || this.pinned(), ...ngDevMode ? [{ debugName: "expanded" }] : /* istanbul ignore next */ []);
		this.collapsed = computed(() => {
			const list = this.toastService.toasts();
			const max = Math.max(1, this.maxVisible());
			if (this.expanded() || list.length <= max) return /* @__PURE__ */ new Set();
			return new Set(list.slice(0, list.length - max).map((t) => t.id));
		}, ...ngDevMode ? [{ debugName: "collapsed" }] : /* istanbul ignore next */ []);
		this.moreText = computed(() => formatAthLabel(this.labels.moreCount(), { count: this.collapsed().size }), ...ngDevMode ? [{ debugName: "moreText" }] : /* istanbul ignore next */ []);
		this.regionText = computed(() => this.regionLabel() ?? this.labels.toastRegion(), ...ngDevMode ? [{ debugName: "regionText" }] : /* istanbul ignore next */ []);
		this.politeText = signal("", ...ngDevMode ? [{ debugName: "politeText" }] : /* istanbul ignore next */ []);
		this.assertiveText = signal("", ...ngDevMode ? [{ debugName: "assertiveText" }] : /* istanbul ignore next */ []);
		this.announced = /* @__PURE__ */ new Set();
		this.held = /* @__PURE__ */ new Set();
		this.leaving = signal(/* @__PURE__ */ new Map(), ...ngDevMode ? [{ debugName: "leaving" }] : /* istanbul ignore next */ []);
		this.previous = [];
		this.rows = computed(() => {
			const list = this.toastService.toasts();
			const rows = list.map((toast) => ({
				toast,
				leaving: false
			}));
			for (const { toast, at } of this.leaving().values()) {
				if (list.some((t) => t.id === toast.id)) continue;
				rows.splice(Math.min(at, rows.length), 0, {
					toast,
					leaving: true
				});
			}
			return rows;
		}, ...ngDevMode ? [{ debugName: "rows" }] : /* istanbul ignore next */ []);
		this.announceTask = 0;
		const destroyRef = inject(DestroyRef);
		effect(() => {
			const collapsed = this.collapsed();
			untracked(() => {
				for (const id of collapsed) {
					if (!this.held.has(id)) this.toastService.hold(id);
					this.held.add(id);
				}
				for (const id of [...this.held]) {
					if (collapsed.has(id)) continue;
					this.held.delete(id);
					this.toastService.release(id);
				}
			});
		});
		effect(() => {
			const list = this.toastService.toasts();
			untracked(() => {
				this.announce(list);
				this.doc.defaultView?.requestAnimationFrame(() => {
					if (this.focused() && !this.host.nativeElement.contains(this.doc.activeElement)) this.leaveFocus();
				});
			});
		});
		const leaveTimers = /* @__PURE__ */ new Set();
		effect(() => {
			const list = this.toastService.toasts();
			untracked(() => {
				const gone = this.previous.map((toast, at) => ({
					toast,
					at
				})).filter(({ toast }) => !list.some((t) => t.id === toast.id));
				this.previous = list;
				if (gone.length === 0) return;
				this.leaving.update((map) => {
					const next = new Map(map);
					for (const g of gone) next.set(g.toast.id, g);
					return next;
				});
				const timer = setTimeout(() => {
					leaveTimers.delete(timer);
					this.leaving.update((map) => {
						const next = new Map(map);
						for (const g of gone) next.delete(g.toast.id);
						return next;
					});
				}, LEAVE_MS);
				leaveTimers.add(timer);
			});
		});
		const view = this.doc.defaultView;
		const onVisibility = () => this.syncVisibility();
		this.doc.addEventListener("visibilitychange", onVisibility);
		this.syncVisibility();
		destroyRef.onDestroy(() => {
			this.doc.removeEventListener("visibilitychange", onVisibility);
			for (const reason of [
				HOVER,
				FOCUS,
				HIDDEN
			]) this.toastService.resume(reason);
			for (const id of this.held) this.toastService.release(id);
			view?.clearTimeout(this.announceTask);
			for (const timer of leaveTimers) clearTimeout(timer);
		});
	}
	getIcon(variant) {
		switch (variant) {
			case "success": return this.successIcon;
			case "error": return this.errorIcon;
			case "warning": return this.warningIcon;
			case "info": return this.infoIcon;
		}
	}
	dismiss(id) {
		this.moveFocusFrom(id);
		this.toastService.remove(id);
	}
	runAction(id) {
		this.moveFocusFrom(id);
		this.toastService.runAction(id);
	}
	closeLabel(toast) {
		const text = toast.title ? `${toast.title}: ${toast.message}` : toast.message;
		return formatAthLabel(this.dismissLabel() ?? this.labels.toastDismiss(), { message: text });
	}
	timed(toast) {
		return (toast.duration ?? 0) > 0;
	}
	onPointerEnter() {
		this.hovered.set(true);
		this.toastService.pause(HOVER);
	}
	onPointerLeave() {
		this.hovered.set(false);
		this.toastService.resume(HOVER);
		if (!this.focused()) this.pinned.set(false);
	}
	onFocusIn(event) {
		if (!this.focused()) {
			const from = event.relatedTarget;
			this.returnFocus = from instanceof HTMLElement && !this.host.nativeElement.contains(from) ? from : null;
		}
		this.focused.set(true);
		this.toastService.pause(FOCUS);
	}
	onFocusOut(event) {
		const to = event.relatedTarget;
		if (to instanceof Node && this.host.nativeElement.contains(to)) return;
		this.leaveFocus();
	}
	onKeydown(event, id) {
		if (event.key !== "Escape" || event.defaultPrevented) return;
		event.preventDefault();
		this.dismiss(id);
	}
	expand() {
		this.pinned.set(true);
		const first = this.toastService.toasts()[0];
		const slot = first ? this.toastElement(first.id)?.closest("li") : null;
		if (first && slot) {
			slot.removeAttribute("inert");
			slot.classList.remove("ath-toast-slot--collapsed");
			this.focusToast(first.id);
		}
	}
	leaveFocus() {
		this.focused.set(false);
		this.toastService.resume(FOCUS);
		if (!this.hovered()) this.pinned.set(false);
	}
	moveFocusFrom(id) {
		const el = this.toastElement(id);
		const active = this.doc.activeElement;
		if (!el || !active || !el.contains(active)) return;
		const list = this.toastService.toasts();
		const i = list.findIndex((t) => t.id === id);
		const next = list[i + 1] ?? list[i - 1];
		if (next && this.focusToast(next.id)) return;
		const back = this.returnFocus;
		this.returnFocus = null;
		if (back?.isConnected) back.focus();
		else active.blur();
		if (!this.host.nativeElement.contains(this.doc.activeElement)) this.leaveFocus();
	}
	focusToast(id) {
		const el = this.toastElement(id);
		if (!el) return false;
		el.focus();
		return this.doc.activeElement === el;
	}
	toastElement(id) {
		return this.host.nativeElement.querySelector(`.ath-toast[data-toast-id="${CSS.escape(id)}"]`);
	}
	syncVisibility() {
		if (this.doc.visibilityState === "hidden") this.toastService.pause(HIDDEN);
		else this.toastService.resume(HIDDEN);
	}
	announce(list) {
		const fresh = list.filter((t) => !this.announced.has(t.id));
		const ids = new Set(list.map((t) => t.id));
		for (const id of [...this.announced]) if (!ids.has(id)) this.announced.delete(id);
		if (fresh.length === 0) return;
		for (const t of fresh) this.announced.add(t.id);
		const view = this.doc.defaultView;
		if (!view) return;
		const text = (t) => t.title ? `${t.title}: ${t.message}` : t.message;
		const errors = fresh.filter((t) => t.variant === "error").map(text);
		const others = fresh.filter((t) => t.variant !== "error").map(text);
		if (errors.length) this.assertiveText.set("");
		if (others.length) this.politeText.set("");
		view.clearTimeout(this.announceTask);
		this.announceTask = view.setTimeout(() => {
			if (errors.length) this.assertiveText.set(errors.join(". "));
			if (others.length) this.politeText.set(others.join(". "));
		}, ANNOUNCE_DELAY);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthToastContainerComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthToastContainerComponent,
			isStandalone: true,
			selector: "ath-toast-container",
			inputs: {
				maxVisible: {
					classPropertyName: "maxVisible",
					publicName: "maxVisible",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				placement: {
					classPropertyName: "placement",
					publicName: "placement",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				dismissLabel: {
					classPropertyName: "dismissLabel",
					publicName: "dismissLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				regionLabel: {
					classPropertyName: "regionLabel",
					publicName: "regionLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			ngImport: i0,
			template: "<!--\n  data-ath-top-layer: kept above modal dialogs (AthOverlayStack.raiseTopLayer).\n  The stack is a labelled region; new toasts are read out by the two live\n  regions at its end (the stack itself is not live, so nothing is read twice).\n-->\n<section\n  class=\"ath-toast-container\"\n  [class.ath-toast-container--top]=\"placement() === 'top'\"\n  [class.ath-toast-container--expanded]=\"expanded()\"\n  [attr.aria-label]=\"regionText()\"\n  data-ath-top-layer\n  (focusin)=\"onFocusIn($event)\"\n  (focusout)=\"onFocusOut($event)\"\n>\n  @if (collapsed().size > 0) {\n    <button type=\"button\" class=\"ath-toast-more\" (click)=\"expand()\">\n      <ath-icon [img]=\"moreIcon\" [size]=\"12\" [strokeWidth]=\"2.25\" />\n      {{ moreText() }}\n    </button>\n  }\n  <ol class=\"ath-toast-list\" (pointerenter)=\"onPointerEnter()\" (pointerleave)=\"onPointerLeave()\">\n    @for (row of rows(); track row.toast.id) {\n      @let toast = row.toast;\n      <li\n        class=\"ath-toast-slot\"\n        [class.ath-toast-slot--collapsed]=\"collapsed().has(toast.id)\"\n        [class.ath-toast-slot--leave]=\"row.leaving\"\n        [attr.inert]=\"row.leaving || collapsed().has(toast.id) ? '' : null\"\n      >\n        <div class=\"ath-toast-sizer\">\n          <div\n            class=\"ath-toast\"\n            [class]=\"'ath-toast ath-toast--' + toast.variant\"\n            [class.ath-toast--titled]=\"!!toast.title\"\n            [attr.data-toast-id]=\"toast.id\"\n            tabindex=\"-1\"\n            (keydown)=\"onKeydown($event, toast.id)\"\n          >\n            <span class=\"ath-toast__icon\" aria-hidden=\"true\">\n              <ath-icon [img]=\"getIcon(toast.variant)\" [size]=\"15\" [strokeWidth]=\"2.5\" />\n            </span>\n            <div class=\"ath-toast__body\">\n              @if (toast.title) {\n                <p class=\"ath-toast__title\">{{ toast.title }}</p>\n              }\n              <p class=\"ath-toast__message\">{{ toast.message }}</p>\n            </div>\n            @if (toast.action; as action) {\n              <button type=\"button\" class=\"ath-toast__action\" (click)=\"runAction(toast.id)\">\n                {{ action.label }}\n              </button>\n            }\n            <button\n              type=\"button\"\n              class=\"ath-toast__close\"\n              [attr.aria-label]=\"closeLabel(toast)\"\n              (click)=\"dismiss(toast.id)\"\n            >\n              <ath-icon [img]=\"closeIcon\" [size]=\"12\" [strokeWidth]=\"2.25\" />\n            </button>\n            @if (timed(toast)) {\n              <span\n                class=\"ath-toast__timer\"\n                aria-hidden=\"true\"\n                [athToastTimer]=\"toast.id\"\n                [running]=\"!paused() && !row.leaving && !collapsed().has(toast.id)\"\n              ></span>\n            }\n          </div>\n        </div>\n      </li>\n    }\n  </ol>\n  <div class=\"ath-toast-live\" aria-live=\"polite\" role=\"status\">{{ politeText() }}</div>\n  <div class=\"ath-toast-live\" aria-live=\"assertive\" role=\"alert\">{{ assertiveText() }}</div>\n</section>\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}.ath-toast-container{--_enter-y: 16px;position:fixed;inset-block:var(--toast-offset-top) var(--toast-offset-bottom);inset-inline-end:var(--toast-offset-right);z-index:var(--z-toast);display:flex;flex-direction:column-reverse;box-sizing:content-box;width:min(var(--toast-width),100vw - 2 * var(--toast-offset-right));max-height:calc(100dvh - 2 * var(--toast-offset-bottom));margin:-24px;padding:24px;overflow:hidden auto;scrollbar-width:none;pointer-events:none}.ath-toast-container--top{--_enter-y: -16px;inset-block:var(--toast-offset-bottom) auto;flex-direction:column}.ath-toast-list{display:flex;flex-direction:column;margin:0;padding:0;list-style:none;pointer-events:auto}.ath-toast-container--top .ath-toast-list{flex-direction:column-reverse}.ath-toast-slot{display:grid;grid-template-rows:1fr;padding-block:4px;animation:ath-toast-open .26s cubic-bezier(0,0,.2,1),ath-toast-in .46s cubic-bezier(.16,1,.3,1);animation:ath-toast-open .26s cubic-bezier(0,0,.2,1),ath-toast-in .46s linear(0,.206,.405,.578,.718,.824,.901,.953,.986,1.006,1.015,1.019,1.019,1.017,1.014,1.01,1.008,1.005,1.003,1.002,1);transition:grid-template-rows .28s cubic-bezier(.4,0,.2,1),padding .28s cubic-bezier(.4,0,.2,1),opacity .2s cubic-bezier(0,0,.2,1),transform .28s cubic-bezier(.4,0,.2,1),visibility 0s}.ath-toast-slot>.ath-toast-sizer{display:flex;flex-direction:column;justify-content:flex-end;min-height:0}.ath-toast-container--top .ath-toast-slot>.ath-toast-sizer{justify-content:flex-start}.ath-toast-slot--collapsed{grid-template-rows:0fr;padding-block:0;opacity:0;transform:translateY(calc(var(--_enter-y) * -.5)) scale(.96);visibility:hidden;pointer-events:none;transition:grid-template-rows .28s cubic-bezier(.4,0,.2,1),padding .28s cubic-bezier(.4,0,.2,1),opacity .16s cubic-bezier(.4,0,1,1),transform .28s cubic-bezier(.4,0,.2,1),visibility 0s .28s}.ath-toast-slot--leave{pointer-events:none;animation:ath-toast-out .18s cubic-bezier(.4,0,1,1) forwards,ath-toast-close .22s 60ms cubic-bezier(.4,0,.2,1) forwards}@keyframes ath-toast-open{0%{grid-template-rows:0fr;padding-block:0}}@keyframes ath-toast-in{0%{opacity:0;transform:translateY(var(--_enter-y)) scale(.96)}}@keyframes ath-toast-out{to{opacity:0;transform:scale(.96)}}@keyframes ath-toast-close{to{grid-template-rows:0fr;padding-block:0}}@keyframes ath-toast-fade-in{0%{opacity:0}}@keyframes ath-toast-fade-out{to{opacity:0}}.ath-toast{--_tone: var(--fg-3);--_glyph: var(--fg-2);position:relative;display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;column-gap:var(--space-3);padding:10px 12px;border:1px solid var(--toast-border);border-radius:var(--r-xl);background:var(--toast-bg);box-shadow:var(--toast-shadow);-webkit-backdrop-filter:blur(16px) saturate(1.6);backdrop-filter:blur(16px) saturate(1.6);color:var(--fg);font-family:var(--font-sans);outline:none}.ath-toast:focus-visible{box-shadow:var(--toast-shadow),var(--focus-ring-shadow)}.ath-toast--success{--_tone: var(--green);--_glyph: var(--green-text)}.ath-toast--error{--_tone: var(--red);--_glyph: var(--red-text)}.ath-toast--warning{--_tone: var(--amber);--_glyph: var(--amber-text)}.ath-toast--titled{align-items:start;padding-block:12px}.ath-toast--titled .ath-toast__action{align-self:center}.ath-toast__icon{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:var(--r-full);background:color-mix(in srgb,var(--_tone) var(--toast-tint-mix),transparent);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--_tone) 14%,transparent);color:var(--_glyph)}.ath-toast__body{display:flex;flex-direction:column;gap:2px;min-width:0;padding-block:3px}.ath-toast__title,.ath-toast__message{margin:0;overflow-wrap:anywhere}.ath-toast__title{color:var(--fg);font-size:var(--control-font);font-weight:var(--weight-semibold);line-height:1.35;letter-spacing:-.005em}.ath-toast__message{color:var(--fg);font-size:var(--control-font);font-weight:var(--weight-medium);line-height:1.4;letter-spacing:-.003em}.ath-toast--titled .ath-toast__message{color:var(--fg-3);font-size:var(--text-sm);font-weight:var(--weight-normal);line-height:var(--line-normal);letter-spacing:0}.ath-toast__action{border:none;background:none;padding:0;margin:0;font:inherit;color:inherit;cursor:pointer}.ath-toast__action:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-toast__action{height:26px;padding:0 10px;border-radius:var(--r-sm);background:var(--hover-strong);color:var(--fg);font-size:var(--control-font);font-weight:var(--weight-semibold);line-height:26px;white-space:nowrap;transition:background-color var(--t-fast),transform var(--t-fast)}.ath-toast__action:hover{background:color-mix(in srgb,var(--fg) 13%,transparent)}.ath-toast__action:active{transform:scale(.97)}.ath-toast__close{border:none;background:none;padding:0;margin:0;font:inherit;color:inherit;cursor:pointer}.ath-toast__close:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-toast__close{position:absolute;top:-7px;inset-inline-end:-7px;display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border:1px solid var(--border);border-radius:var(--r-full);background:var(--surface);box-shadow:var(--shadow-1);color:var(--fg-3);opacity:0;transform:scale(.85);transition:opacity var(--t-base),transform var(--t-base),color var(--t-fast)}.ath-toast__close:before{content:\"\";position:absolute;inset:-5px;border-radius:inherit}.ath-toast__close:hover{color:var(--fg)}.ath-toast__close:focus-visible{opacity:1;transform:none}.ath-toast:hover .ath-toast__close,.ath-toast:focus-within .ath-toast__close{opacity:1;transform:none}@media(hover:none){.ath-toast__close{opacity:1;transform:none}}.ath-toast__timer{position:absolute;inset-inline:12px;bottom:0;height:2px;border-radius:var(--r-full);background:color-mix(in srgb,var(--_tone) 55%,transparent);transform-origin:left center;pointer-events:none}.ath-toast__timer:dir(rtl){transform-origin:right center}.ath-toast-more{border:none;background:none;padding:0;margin:0;font:inherit;color:inherit;cursor:pointer}.ath-toast-more:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-toast-more{display:inline-flex;align-items:center;align-self:flex-end;order:1;gap:var(--space-1);height:24px;margin-block:2px;padding:0 10px;border:1px solid var(--toast-border);border-radius:var(--r-full);background:var(--toast-bg);box-shadow:var(--shadow-1);-webkit-backdrop-filter:blur(16px) saturate(1.6);backdrop-filter:blur(16px) saturate(1.6);color:var(--fg-3);font-size:var(--text-sm);font-weight:var(--weight-medium);pointer-events:auto;transition:color var(--t-fast)}.ath-toast-more:hover{color:var(--fg)}.ath-toast-container--top .ath-toast-more ath-icon{transform:rotate(180deg)}.ath-toast-more{animation:ath-toast-fade-in .2s cubic-bezier(0,0,.2,1)}.ath-toast-live{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}@media(max-width:599px){.ath-toast-container{inset-block:auto max(var(--space-2),env(safe-area-inset-bottom));inset-inline:max(var(--space-2),env(safe-area-inset-left)) max(var(--space-2),env(safe-area-inset-right));width:auto;max-height:calc(100dvh - 2 * var(--space-2))}.ath-toast-container--top{inset-block:max(var(--space-2),env(safe-area-inset-top)) auto}.ath-toast{padding-block:12px}}@media(prefers-reduced-motion:reduce){.ath-toast-slot{animation:ath-toast-fade-in .12s linear;transition:opacity .12s linear,visibility 0s}.ath-toast-slot--collapsed{transform:none;transition:opacity .12s linear,visibility 0s .12s}.ath-toast-slot--leave{animation:ath-toast-fade-out .12s linear forwards}.ath-toast__action:active{transform:none}}\n"],
			dependencies: [{
				kind: "component",
				type: AthIconComponent,
				selector: "ath-icon",
				inputs: [
					"img",
					"size",
					"strokeWidth",
					"color",
					"absoluteStrokeWidth",
					"class"
				]
			}, {
				kind: "directive",
				type: AthToastTimerDirective,
				selector: "[athToastTimer]",
				inputs: ["athToastTimer", "running"]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthToastContainerComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-toast-container",
			imports: [AthIconComponent, AthToastTimerDirective],
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: "<!--\n  data-ath-top-layer: kept above modal dialogs (AthOverlayStack.raiseTopLayer).\n  The stack is a labelled region; new toasts are read out by the two live\n  regions at its end (the stack itself is not live, so nothing is read twice).\n-->\n<section\n  class=\"ath-toast-container\"\n  [class.ath-toast-container--top]=\"placement() === 'top'\"\n  [class.ath-toast-container--expanded]=\"expanded()\"\n  [attr.aria-label]=\"regionText()\"\n  data-ath-top-layer\n  (focusin)=\"onFocusIn($event)\"\n  (focusout)=\"onFocusOut($event)\"\n>\n  @if (collapsed().size > 0) {\n    <button type=\"button\" class=\"ath-toast-more\" (click)=\"expand()\">\n      <ath-icon [img]=\"moreIcon\" [size]=\"12\" [strokeWidth]=\"2.25\" />\n      {{ moreText() }}\n    </button>\n  }\n  <ol class=\"ath-toast-list\" (pointerenter)=\"onPointerEnter()\" (pointerleave)=\"onPointerLeave()\">\n    @for (row of rows(); track row.toast.id) {\n      @let toast = row.toast;\n      <li\n        class=\"ath-toast-slot\"\n        [class.ath-toast-slot--collapsed]=\"collapsed().has(toast.id)\"\n        [class.ath-toast-slot--leave]=\"row.leaving\"\n        [attr.inert]=\"row.leaving || collapsed().has(toast.id) ? '' : null\"\n      >\n        <div class=\"ath-toast-sizer\">\n          <div\n            class=\"ath-toast\"\n            [class]=\"'ath-toast ath-toast--' + toast.variant\"\n            [class.ath-toast--titled]=\"!!toast.title\"\n            [attr.data-toast-id]=\"toast.id\"\n            tabindex=\"-1\"\n            (keydown)=\"onKeydown($event, toast.id)\"\n          >\n            <span class=\"ath-toast__icon\" aria-hidden=\"true\">\n              <ath-icon [img]=\"getIcon(toast.variant)\" [size]=\"15\" [strokeWidth]=\"2.5\" />\n            </span>\n            <div class=\"ath-toast__body\">\n              @if (toast.title) {\n                <p class=\"ath-toast__title\">{{ toast.title }}</p>\n              }\n              <p class=\"ath-toast__message\">{{ toast.message }}</p>\n            </div>\n            @if (toast.action; as action) {\n              <button type=\"button\" class=\"ath-toast__action\" (click)=\"runAction(toast.id)\">\n                {{ action.label }}\n              </button>\n            }\n            <button\n              type=\"button\"\n              class=\"ath-toast__close\"\n              [attr.aria-label]=\"closeLabel(toast)\"\n              (click)=\"dismiss(toast.id)\"\n            >\n              <ath-icon [img]=\"closeIcon\" [size]=\"12\" [strokeWidth]=\"2.25\" />\n            </button>\n            @if (timed(toast)) {\n              <span\n                class=\"ath-toast__timer\"\n                aria-hidden=\"true\"\n                [athToastTimer]=\"toast.id\"\n                [running]=\"!paused() && !row.leaving && !collapsed().has(toast.id)\"\n              ></span>\n            }\n          </div>\n        </div>\n      </li>\n    }\n  </ol>\n  <div class=\"ath-toast-live\" aria-live=\"polite\" role=\"status\">{{ politeText() }}</div>\n  <div class=\"ath-toast-live\" aria-live=\"assertive\" role=\"alert\">{{ assertiveText() }}</div>\n</section>\n",
			styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}.ath-toast-container{--_enter-y: 16px;position:fixed;inset-block:var(--toast-offset-top) var(--toast-offset-bottom);inset-inline-end:var(--toast-offset-right);z-index:var(--z-toast);display:flex;flex-direction:column-reverse;box-sizing:content-box;width:min(var(--toast-width),100vw - 2 * var(--toast-offset-right));max-height:calc(100dvh - 2 * var(--toast-offset-bottom));margin:-24px;padding:24px;overflow:hidden auto;scrollbar-width:none;pointer-events:none}.ath-toast-container--top{--_enter-y: -16px;inset-block:var(--toast-offset-bottom) auto;flex-direction:column}.ath-toast-list{display:flex;flex-direction:column;margin:0;padding:0;list-style:none;pointer-events:auto}.ath-toast-container--top .ath-toast-list{flex-direction:column-reverse}.ath-toast-slot{display:grid;grid-template-rows:1fr;padding-block:4px;animation:ath-toast-open .26s cubic-bezier(0,0,.2,1),ath-toast-in .46s cubic-bezier(.16,1,.3,1);animation:ath-toast-open .26s cubic-bezier(0,0,.2,1),ath-toast-in .46s linear(0,.206,.405,.578,.718,.824,.901,.953,.986,1.006,1.015,1.019,1.019,1.017,1.014,1.01,1.008,1.005,1.003,1.002,1);transition:grid-template-rows .28s cubic-bezier(.4,0,.2,1),padding .28s cubic-bezier(.4,0,.2,1),opacity .2s cubic-bezier(0,0,.2,1),transform .28s cubic-bezier(.4,0,.2,1),visibility 0s}.ath-toast-slot>.ath-toast-sizer{display:flex;flex-direction:column;justify-content:flex-end;min-height:0}.ath-toast-container--top .ath-toast-slot>.ath-toast-sizer{justify-content:flex-start}.ath-toast-slot--collapsed{grid-template-rows:0fr;padding-block:0;opacity:0;transform:translateY(calc(var(--_enter-y) * -.5)) scale(.96);visibility:hidden;pointer-events:none;transition:grid-template-rows .28s cubic-bezier(.4,0,.2,1),padding .28s cubic-bezier(.4,0,.2,1),opacity .16s cubic-bezier(.4,0,1,1),transform .28s cubic-bezier(.4,0,.2,1),visibility 0s .28s}.ath-toast-slot--leave{pointer-events:none;animation:ath-toast-out .18s cubic-bezier(.4,0,1,1) forwards,ath-toast-close .22s 60ms cubic-bezier(.4,0,.2,1) forwards}@keyframes ath-toast-open{0%{grid-template-rows:0fr;padding-block:0}}@keyframes ath-toast-in{0%{opacity:0;transform:translateY(var(--_enter-y)) scale(.96)}}@keyframes ath-toast-out{to{opacity:0;transform:scale(.96)}}@keyframes ath-toast-close{to{grid-template-rows:0fr;padding-block:0}}@keyframes ath-toast-fade-in{0%{opacity:0}}@keyframes ath-toast-fade-out{to{opacity:0}}.ath-toast{--_tone: var(--fg-3);--_glyph: var(--fg-2);position:relative;display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;column-gap:var(--space-3);padding:10px 12px;border:1px solid var(--toast-border);border-radius:var(--r-xl);background:var(--toast-bg);box-shadow:var(--toast-shadow);-webkit-backdrop-filter:blur(16px) saturate(1.6);backdrop-filter:blur(16px) saturate(1.6);color:var(--fg);font-family:var(--font-sans);outline:none}.ath-toast:focus-visible{box-shadow:var(--toast-shadow),var(--focus-ring-shadow)}.ath-toast--success{--_tone: var(--green);--_glyph: var(--green-text)}.ath-toast--error{--_tone: var(--red);--_glyph: var(--red-text)}.ath-toast--warning{--_tone: var(--amber);--_glyph: var(--amber-text)}.ath-toast--titled{align-items:start;padding-block:12px}.ath-toast--titled .ath-toast__action{align-self:center}.ath-toast__icon{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:var(--r-full);background:color-mix(in srgb,var(--_tone) var(--toast-tint-mix),transparent);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--_tone) 14%,transparent);color:var(--_glyph)}.ath-toast__body{display:flex;flex-direction:column;gap:2px;min-width:0;padding-block:3px}.ath-toast__title,.ath-toast__message{margin:0;overflow-wrap:anywhere}.ath-toast__title{color:var(--fg);font-size:var(--control-font);font-weight:var(--weight-semibold);line-height:1.35;letter-spacing:-.005em}.ath-toast__message{color:var(--fg);font-size:var(--control-font);font-weight:var(--weight-medium);line-height:1.4;letter-spacing:-.003em}.ath-toast--titled .ath-toast__message{color:var(--fg-3);font-size:var(--text-sm);font-weight:var(--weight-normal);line-height:var(--line-normal);letter-spacing:0}.ath-toast__action{border:none;background:none;padding:0;margin:0;font:inherit;color:inherit;cursor:pointer}.ath-toast__action:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-toast__action{height:26px;padding:0 10px;border-radius:var(--r-sm);background:var(--hover-strong);color:var(--fg);font-size:var(--control-font);font-weight:var(--weight-semibold);line-height:26px;white-space:nowrap;transition:background-color var(--t-fast),transform var(--t-fast)}.ath-toast__action:hover{background:color-mix(in srgb,var(--fg) 13%,transparent)}.ath-toast__action:active{transform:scale(.97)}.ath-toast__close{border:none;background:none;padding:0;margin:0;font:inherit;color:inherit;cursor:pointer}.ath-toast__close:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-toast__close{position:absolute;top:-7px;inset-inline-end:-7px;display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border:1px solid var(--border);border-radius:var(--r-full);background:var(--surface);box-shadow:var(--shadow-1);color:var(--fg-3);opacity:0;transform:scale(.85);transition:opacity var(--t-base),transform var(--t-base),color var(--t-fast)}.ath-toast__close:before{content:\"\";position:absolute;inset:-5px;border-radius:inherit}.ath-toast__close:hover{color:var(--fg)}.ath-toast__close:focus-visible{opacity:1;transform:none}.ath-toast:hover .ath-toast__close,.ath-toast:focus-within .ath-toast__close{opacity:1;transform:none}@media(hover:none){.ath-toast__close{opacity:1;transform:none}}.ath-toast__timer{position:absolute;inset-inline:12px;bottom:0;height:2px;border-radius:var(--r-full);background:color-mix(in srgb,var(--_tone) 55%,transparent);transform-origin:left center;pointer-events:none}.ath-toast__timer:dir(rtl){transform-origin:right center}.ath-toast-more{border:none;background:none;padding:0;margin:0;font:inherit;color:inherit;cursor:pointer}.ath-toast-more:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-toast-more{display:inline-flex;align-items:center;align-self:flex-end;order:1;gap:var(--space-1);height:24px;margin-block:2px;padding:0 10px;border:1px solid var(--toast-border);border-radius:var(--r-full);background:var(--toast-bg);box-shadow:var(--shadow-1);-webkit-backdrop-filter:blur(16px) saturate(1.6);backdrop-filter:blur(16px) saturate(1.6);color:var(--fg-3);font-size:var(--text-sm);font-weight:var(--weight-medium);pointer-events:auto;transition:color var(--t-fast)}.ath-toast-more:hover{color:var(--fg)}.ath-toast-container--top .ath-toast-more ath-icon{transform:rotate(180deg)}.ath-toast-more{animation:ath-toast-fade-in .2s cubic-bezier(0,0,.2,1)}.ath-toast-live{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}@media(max-width:599px){.ath-toast-container{inset-block:auto max(var(--space-2),env(safe-area-inset-bottom));inset-inline:max(var(--space-2),env(safe-area-inset-left)) max(var(--space-2),env(safe-area-inset-right));width:auto;max-height:calc(100dvh - 2 * var(--space-2))}.ath-toast-container--top{inset-block:max(var(--space-2),env(safe-area-inset-top)) auto}.ath-toast{padding-block:12px}}@media(prefers-reduced-motion:reduce){.ath-toast-slot{animation:ath-toast-fade-in .12s linear;transition:opacity .12s linear,visibility 0s}.ath-toast-slot--collapsed{transform:none;transition:opacity .12s linear,visibility 0s .12s}.ath-toast-slot--leave{animation:ath-toast-fade-out .12s linear forwards}.ath-toast__action:active{transform:none}}\n"]
		}]
	}],
	ctorParameters: () => [],
	propDecorators: {
		maxVisible: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "maxVisible",
				required: false
			}]
		}],
		placement: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "placement",
				required: false
			}]
		}],
		dismissLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "dismissLabel",
				required: false
			}]
		}],
		regionLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "regionLabel",
				required: false
			}]
		}]
	}
});
var AthSpinnerComponent = class AthSpinnerComponent {
	constructor() {
		this.labels = injectAthLabels();
		this.size = input("md", ...ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []);
		this.spinnerClasses = computed(() => `ath-spinner ath-spinner--${this.size()}`, ...ngDevMode ? [{ debugName: "spinnerClasses" }] : /* istanbul ignore next */ []);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthSpinnerComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.1.0",
			version: "22.2.2",
			type: AthSpinnerComponent,
			isStandalone: true,
			selector: "ath-spinner",
			inputs: { size: {
				classPropertyName: "size",
				publicName: "size",
				isSignal: true,
				isRequired: false,
				transformFunction: null
			} },
			ngImport: i0,
			template: "<div [class]=\"spinnerClasses()\" role=\"status\" [attr.aria-label]=\"labels.loading()\">\n  <svg viewBox=\"0 0 24 24\" fill=\"none\" class=\"ath-spinner__svg\">\n    <circle\n      cx=\"12\"\n      cy=\"12\"\n      r=\"10\"\n      stroke=\"currentColor\"\n      stroke-width=\"3\"\n      class=\"ath-spinner__track\"\n    />\n    <path\n      d=\"M12 2a10 10 0 0 1 10 10\"\n      stroke=\"currentColor\"\n      stroke-width=\"3\"\n      stroke-linecap=\"round\"\n      class=\"ath-spinner__arc\"\n    />\n  </svg>\n</div>\n",
			styles: [".ath-spinner{display:inline-flex;align-items:center;justify-content:center;color:var(--accent)}.ath-spinner--sm{width:16px;height:16px}.ath-spinner--md{width:24px;height:24px}.ath-spinner--lg{width:36px;height:36px}.ath-spinner__svg{width:100%;height:100%;animation:ath-spinner-rotate 1s linear infinite}.ath-spinner__track{opacity:.15}.ath-spinner__arc{opacity:1}@keyframes ath-spinner-rotate{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthSpinnerComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-spinner",
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: "<div [class]=\"spinnerClasses()\" role=\"status\" [attr.aria-label]=\"labels.loading()\">\n  <svg viewBox=\"0 0 24 24\" fill=\"none\" class=\"ath-spinner__svg\">\n    <circle\n      cx=\"12\"\n      cy=\"12\"\n      r=\"10\"\n      stroke=\"currentColor\"\n      stroke-width=\"3\"\n      class=\"ath-spinner__track\"\n    />\n    <path\n      d=\"M12 2a10 10 0 0 1 10 10\"\n      stroke=\"currentColor\"\n      stroke-width=\"3\"\n      stroke-linecap=\"round\"\n      class=\"ath-spinner__arc\"\n    />\n  </svg>\n</div>\n",
			styles: [".ath-spinner{display:inline-flex;align-items:center;justify-content:center;color:var(--accent)}.ath-spinner--sm{width:16px;height:16px}.ath-spinner--md{width:24px;height:24px}.ath-spinner--lg{width:36px;height:36px}.ath-spinner__svg{width:100%;height:100%;animation:ath-spinner-rotate 1s linear infinite}.ath-spinner__track{opacity:.15}.ath-spinner__arc{opacity:1}@keyframes ath-spinner-rotate{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"]
		}]
	}],
	propDecorators: { size: [{
		type: i0.Input,
		args: [{
			isSignal: true,
			alias: "size",
			required: false
		}]
	}] }
});
var AthKbdComponent = class AthKbdComponent {
	constructor() {
		this.size = input("md", ...ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []);
		this.label = input("", ...ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []);
		this.kbdClasses = computed(() => `ath-kbd ath-kbd--${this.size()}`, ...ngDevMode ? [{ debugName: "kbdClasses" }] : /* istanbul ignore next */ []);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthKbdComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthKbdComponent,
			isStandalone: true,
			selector: "ath-kbd",
			inputs: {
				size: {
					classPropertyName: "size",
					publicName: "size",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				label: {
					classPropertyName: "label",
					publicName: "label",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			ngImport: i0,
			template: "<kbd [class]=\"kbdClasses()\">\n  @if (label()) {\n    {{ label() }}\n  }\n  <ng-content />\n</kbd>\n",
			styles: [".ath-kbd{display:inline-flex;align-items:center;justify-content:center;gap:1px;min-width:1.5em;font-family:var(--font-mono);font-weight:var(--weight-medium);line-height:1;color:var(--fg-2);background-color:var(--surface);border:1px solid var(--border);border-radius:var(--r-xs);box-shadow:0 1px 0 var(--border);white-space:nowrap}.ath-kbd--sm{font-size:10.5px;height:18px;padding:0 5px}.ath-kbd--md{font-size:var(--text-xs);height:20px;padding:0 6px}.ath-kbd--lg{font-size:var(--text-sm);height:24px;padding:0 var(--space-2)}\n"],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthKbdComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-kbd",
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: "<kbd [class]=\"kbdClasses()\">\n  @if (label()) {\n    {{ label() }}\n  }\n  <ng-content />\n</kbd>\n",
			styles: [".ath-kbd{display:inline-flex;align-items:center;justify-content:center;gap:1px;min-width:1.5em;font-family:var(--font-mono);font-weight:var(--weight-medium);line-height:1;color:var(--fg-2);background-color:var(--surface);border:1px solid var(--border);border-radius:var(--r-xs);box-shadow:0 1px 0 var(--border);white-space:nowrap}.ath-kbd--sm{font-size:10.5px;height:18px;padding:0 5px}.ath-kbd--md{font-size:var(--text-xs);height:20px;padding:0 6px}.ath-kbd--lg{font-size:var(--text-sm);height:24px;padding:0 var(--space-2)}\n"]
		}]
	}],
	propDecorators: {
		size: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "size",
				required: false
			}]
		}],
		label: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "label",
				required: false
			}]
		}]
	}
});
var AthCopyButtonComponent = class AthCopyButtonComponent {
	constructor() {
		this.labels = injectAthLabels();
		this.value = input.required(...ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []);
		this.label = input(null, ...ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []);
		this.copied = signal(false, ...ngDevMode ? [{ debugName: "copied" }] : /* istanbul ignore next */ []);
		this.copyIcon = Copy;
		this.checkIcon = Check;
		inject(DestroyRef).onDestroy(() => clearTimeout(this.resetTimeout));
	}
	async copy() {
		if (!await copyText(this.value())) return;
		this.copied.set(true);
		clearTimeout(this.resetTimeout);
		this.resetTimeout = setTimeout(() => this.copied.set(false), 2e3);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthCopyButtonComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.1.0",
			version: "22.2.2",
			type: AthCopyButtonComponent,
			isStandalone: true,
			selector: "ath-copy-button",
			inputs: {
				value: {
					classPropertyName: "value",
					publicName: "value",
					isSignal: true,
					isRequired: true,
					transformFunction: null
				},
				label: {
					classPropertyName: "label",
					publicName: "label",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			ngImport: i0,
			template: "<button\n  type=\"button\"\n  class=\"ath-copy-button\"\n  [class.ath-copy-button--copied]=\"copied()\"\n  [attr.aria-label]=\"copied() ? labels.copied() : (label() ?? labels.copy())\"\n  (click)=\"copy()\"\n>\n  <ath-icon [img]=\"copied() ? checkIcon : copyIcon\" [size]=\"16\" />\n</button>\n",
			styles: [".ath-copy-button{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;color:var(--fg-3);background:none;border:1px solid var(--border);border-radius:var(--r-sm);cursor:pointer;transition:all var(--t-fast)}.ath-copy-button:hover{color:var(--fg);border-color:var(--border-strong);background-color:var(--bg-2)}.ath-copy-button:focus-visible{outline:none;box-shadow:0 0 0 2px var(--accent)}.ath-copy-button--copied{color:var(--green);border-color:var(--green)}.ath-copy-button--copied:hover{color:var(--green)}\n"],
			dependencies: [{
				kind: "component",
				type: AthIconComponent,
				selector: "ath-icon",
				inputs: [
					"img",
					"size",
					"strokeWidth",
					"color",
					"absoluteStrokeWidth",
					"class"
				]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthCopyButtonComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-copy-button",
			imports: [AthIconComponent],
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: "<button\n  type=\"button\"\n  class=\"ath-copy-button\"\n  [class.ath-copy-button--copied]=\"copied()\"\n  [attr.aria-label]=\"copied() ? labels.copied() : (label() ?? labels.copy())\"\n  (click)=\"copy()\"\n>\n  <ath-icon [img]=\"copied() ? checkIcon : copyIcon\" [size]=\"16\" />\n</button>\n",
			styles: [".ath-copy-button{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;color:var(--fg-3);background:none;border:1px solid var(--border);border-radius:var(--r-sm);cursor:pointer;transition:all var(--t-fast)}.ath-copy-button:hover{color:var(--fg);border-color:var(--border-strong);background-color:var(--bg-2)}.ath-copy-button:focus-visible{outline:none;box-shadow:0 0 0 2px var(--accent)}.ath-copy-button--copied{color:var(--green);border-color:var(--green)}.ath-copy-button--copied:hover{color:var(--green)}\n"]
		}]
	}],
	ctorParameters: () => [],
	propDecorators: {
		value: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "value",
				required: true
			}]
		}],
		label: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "label",
				required: false
			}]
		}]
	}
});
var AthTimerPillComponent = class AthTimerPillComponent {
	constructor() {
		this.active = input(false, {
			...ngDevMode ? { debugName: "active" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.seconds = input(0, {
			...ngDevMode ? { debugName: "seconds" } : /* istanbul ignore next */ {},
			transform: (value) => Math.max(0, Math.floor(numberAttribute(value, 0)))
		});
		this.ticketKey = input(null, ...ngDevMode ? [{ debugName: "ticketKey" }] : /* istanbul ignore next */ []);
		this.tooltip = input(null, ...ngDevMode ? [{ debugName: "tooltip" }] : /* istanbul ignore next */ []);
		this.toggled = output();
		this.warning = computed(() => {
			const s = this.seconds();
			return s >= 86400 ? "alert" : s >= 28800 ? "warn" : null;
		}, ...ngDevMode ? [{ debugName: "warning" }] : /* istanbul ignore next */ []);
		this.time = computed(() => {
			const total = this.seconds();
			const hours = Math.floor(total / 3600);
			const minutes = Math.floor(total % 3600 / 60);
			const seconds = total % 60;
			const mm = String(minutes).padStart(2, "0");
			const ss = String(seconds).padStart(2, "0");
			if (hours > 0) return `${hours}:${mm}:${ss}`;
			return `${mm}:${ss}`;
		}, ...ngDevMode ? [{ debugName: "time" }] : /* istanbul ignore next */ []);
		this.effectiveTooltip = computed(() => {
			const tooltip = this.tooltip();
			if (tooltip) return tooltip;
			if (!this.active()) return "Click to resume timer";
			const ticketKey = this.ticketKey();
			if (ticketKey) return `Tracking ${ticketKey} · click to pause`;
			return "Click to pause timer";
		}, ...ngDevMode ? [{ debugName: "effectiveTooltip" }] : /* istanbul ignore next */ []);
	}
	onToggle() {
		this.toggled.emit();
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthTimerPillComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthTimerPillComponent,
			isStandalone: true,
			selector: "ath-timer-pill",
			inputs: {
				active: {
					classPropertyName: "active",
					publicName: "active",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				seconds: {
					classPropertyName: "seconds",
					publicName: "seconds",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				ticketKey: {
					classPropertyName: "ticketKey",
					publicName: "ticketKey",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				tooltip: {
					classPropertyName: "tooltip",
					publicName: "tooltip",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			outputs: { toggled: "toggled" },
			host: { properties: {
				"attr.data-active": "active() ? 'true' : 'false'",
				"attr.data-warning": "warning()"
			} },
			ngImport: i0,
			template: "<button type=\"button\" class=\"ath-tpill\" [title]=\"effectiveTooltip()\" (click)=\"onToggle()\">\n  <span class=\"ath-tpill__dot\" aria-hidden=\"true\"></span>\n  <span class=\"ath-tpill__time\">{{ time() }}</span>\n  @if (ticketKey()) {\n    <span class=\"ath-tpill__sep\" aria-hidden=\"true\">·</span>\n    <span class=\"ath-tpill__key\">{{ ticketKey() }}</span>\n  }\n</button>\n",
			styles: [":host{display:inline-block}.ath-tpill{display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 10px;background:var(--bg-1);border:1px solid var(--border);border-radius:var(--r-sm);font-family:var(--font-mono);font-feature-settings:\"tnum\";cursor:pointer;transition:background var(--t-fast),border-color var(--t-fast),color var(--t-fast),box-shadow var(--t-fast);color:var(--fg-2);font-size:12px;font-weight:500;letter-spacing:0}.ath-tpill:hover{background:var(--bg-2);border-color:var(--border-strong);color:var(--fg)}.ath-tpill:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-tpill__dot{width:6px;height:6px;border-radius:999px;background:var(--fg-4);flex-shrink:0}.ath-tpill__time{font-size:12px;font-weight:400;color:var(--fg);letter-spacing:0}.ath-tpill__sep{color:var(--fg-4);margin:0 -1px}.ath-tpill__key{font-size:11.5px;font-weight:400;color:var(--fg-3);letter-spacing:0}:host([data-active=true]) .ath-tpill__dot{background:var(--red);animation:ath-tpill-rec 2s ease-in-out infinite}@media(prefers-reduced-motion:reduce){:host([data-active=true]) .ath-tpill__dot{animation:none}}:host([data-warning=warn]) .ath-tpill{background:var(--amber-tint);border-color:color-mix(in srgb,var(--amber) 30%,transparent);color:var(--fg)}:host([data-warning=warn]) .ath-tpill__dot{background:var(--amber)}:host([data-warning=alert]) .ath-tpill{background:var(--red-tint);border-color:color-mix(in srgb,var(--red) 35%,transparent);color:var(--fg);animation:ath-tpill-alert 1.2s ease-in-out infinite}:host([data-warning=alert]) .ath-tpill__dot{background:var(--red)}@keyframes ath-tpill-rec{0%,to{opacity:1}50%{opacity:.35}}@keyframes ath-tpill-alert{0%,to{transform:scale(1)}50%{transform:scale(1.02)}}\n"],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthTimerPillComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-timer-pill",
			changeDetection: ChangeDetectionStrategy.OnPush,
			host: {
				"[attr.data-active]": "active() ? 'true' : 'false'",
				"[attr.data-warning]": "warning()"
			},
			template: "<button type=\"button\" class=\"ath-tpill\" [title]=\"effectiveTooltip()\" (click)=\"onToggle()\">\n  <span class=\"ath-tpill__dot\" aria-hidden=\"true\"></span>\n  <span class=\"ath-tpill__time\">{{ time() }}</span>\n  @if (ticketKey()) {\n    <span class=\"ath-tpill__sep\" aria-hidden=\"true\">·</span>\n    <span class=\"ath-tpill__key\">{{ ticketKey() }}</span>\n  }\n</button>\n",
			styles: [":host{display:inline-block}.ath-tpill{display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 10px;background:var(--bg-1);border:1px solid var(--border);border-radius:var(--r-sm);font-family:var(--font-mono);font-feature-settings:\"tnum\";cursor:pointer;transition:background var(--t-fast),border-color var(--t-fast),color var(--t-fast),box-shadow var(--t-fast);color:var(--fg-2);font-size:12px;font-weight:500;letter-spacing:0}.ath-tpill:hover{background:var(--bg-2);border-color:var(--border-strong);color:var(--fg)}.ath-tpill:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-tpill__dot{width:6px;height:6px;border-radius:999px;background:var(--fg-4);flex-shrink:0}.ath-tpill__time{font-size:12px;font-weight:400;color:var(--fg);letter-spacing:0}.ath-tpill__sep{color:var(--fg-4);margin:0 -1px}.ath-tpill__key{font-size:11.5px;font-weight:400;color:var(--fg-3);letter-spacing:0}:host([data-active=true]) .ath-tpill__dot{background:var(--red);animation:ath-tpill-rec 2s ease-in-out infinite}@media(prefers-reduced-motion:reduce){:host([data-active=true]) .ath-tpill__dot{animation:none}}:host([data-warning=warn]) .ath-tpill{background:var(--amber-tint);border-color:color-mix(in srgb,var(--amber) 30%,transparent);color:var(--fg)}:host([data-warning=warn]) .ath-tpill__dot{background:var(--amber)}:host([data-warning=alert]) .ath-tpill{background:var(--red-tint);border-color:color-mix(in srgb,var(--red) 35%,transparent);color:var(--fg);animation:ath-tpill-alert 1.2s ease-in-out infinite}:host([data-warning=alert]) .ath-tpill__dot{background:var(--red)}@keyframes ath-tpill-rec{0%,to{opacity:1}50%{opacity:.35}}@keyframes ath-tpill-alert{0%,to{transform:scale(1)}50%{transform:scale(1.02)}}\n"]
		}]
	}],
	propDecorators: {
		active: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "active",
				required: false
			}]
		}],
		seconds: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "seconds",
				required: false
			}]
		}],
		ticketKey: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "ticketKey",
				required: false
			}]
		}],
		tooltip: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "tooltip",
				required: false
			}]
		}],
		toggled: [{
			type: i0.Output,
			args: ["toggled"]
		}]
	}
});
var AthPaginationComponent = class AthPaginationComponent {
	constructor() {
		this.labels = injectAthLabels();
		this.mode = input("numbered", ...ngDevMode ? [{ debugName: "mode" }] : /* istanbul ignore next */ []);
		this.page = input(1, {
			...ngDevMode ? { debugName: "page" } : /* istanbul ignore next */ {},
			transform: (v) => Math.max(1, numberAttribute(v, 1))
		});
		this.totalPages = input(1, {
			...ngDevMode ? { debugName: "totalPages" } : /* istanbul ignore next */ {},
			transform: numberAttribute
		});
		this.siblingCount = input(1, {
			...ngDevMode ? { debugName: "siblingCount" } : /* istanbul ignore next */ {},
			transform: numberAttribute
		});
		this.pageChange = output();
		this.hasPrev = input(false, {
			...ngDevMode ? { debugName: "hasPrev" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.hasNext = input(false, {
			...ngDevMode ? { debugName: "hasNext" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.summary = input("", ...ngDevMode ? [{ debugName: "summary" }] : /* istanbul ignore next */ []);
		this.previous = output();
		this.next = output();
		this.prevIcon = ChevronLeft;
		this.nextIcon = ChevronRight;
		this.firstIcon = ChevronsLeft;
		this.lastIcon = ChevronsRight;
		this.ellipsisIcon = MoreHorizontal;
		this.pages = computed(() => {
			const total = Math.max(1, this.totalPages());
			const current = this.page();
			const siblings = Math.max(0, this.siblingCount());
			if (total <= 5 + siblings * 2) return range(1, total);
			const leftSibling = Math.max(current - siblings, 2);
			const rightSibling = Math.min(current + siblings, total - 1);
			const showLeftEllipsis = leftSibling > 3;
			const showRightEllipsis = rightSibling < total - 2;
			const result = [1];
			if (showLeftEllipsis) result.push("ellipsis");
			else for (let i = 2; i < leftSibling; i++) result.push(i);
			for (let i = leftSibling; i <= rightSibling; i++) result.push(i);
			if (showRightEllipsis) result.push("ellipsis");
			else for (let i = rightSibling + 1; i < total; i++) result.push(i);
			result.push(total);
			return result;
		}, ...ngDevMode ? [{ debugName: "pages" }] : /* istanbul ignore next */ []);
	}
	pageLabel(page) {
		return formatAthLabel(this.labels.pageNumber(), { page });
	}
	goTo(page) {
		if (page < 1 || page > this.totalPages() || page === this.page()) return;
		this.pageChange.emit(page);
	}
	goPrev() {
		if (this.mode() === "cursor") {
			if (this.hasPrev()) this.previous.emit();
		} else this.goTo(this.page() - 1);
	}
	goNext() {
		if (this.mode() === "cursor") {
			if (this.hasNext()) this.next.emit();
		} else this.goTo(this.page() + 1);
	}
	goFirst() {
		this.goTo(1);
	}
	goLast() {
		this.goTo(this.totalPages());
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthPaginationComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthPaginationComponent,
			isStandalone: true,
			selector: "ath-pagination",
			inputs: {
				mode: {
					classPropertyName: "mode",
					publicName: "mode",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				page: {
					classPropertyName: "page",
					publicName: "page",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				totalPages: {
					classPropertyName: "totalPages",
					publicName: "totalPages",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				siblingCount: {
					classPropertyName: "siblingCount",
					publicName: "siblingCount",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				hasPrev: {
					classPropertyName: "hasPrev",
					publicName: "hasPrev",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				hasNext: {
					classPropertyName: "hasNext",
					publicName: "hasNext",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				summary: {
					classPropertyName: "summary",
					publicName: "summary",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			outputs: {
				pageChange: "pageChange",
				previous: "previous",
				next: "next"
			},
			ngImport: i0,
			template: "@if (mode() === 'numbered') {\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page() <= 1\"\n    [attr.aria-label]=\"labels.pageFirst()\"\n    (click)=\"goFirst()\"\n  >\n    <ath-icon [img]=\"firstIcon\" [size]=\"14\" />\n  </button>\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page() <= 1\"\n    [attr.aria-label]=\"labels.pagePrevious()\"\n    (click)=\"goPrev()\"\n  >\n    <ath-icon [img]=\"prevIcon\" [size]=\"14\" />\n  </button>\n\n  @for (item of pages(); track $index) {\n    @if (item === 'ellipsis') {\n      <span class=\"ath-page__ellipsis\" aria-hidden=\"true\">\n        <ath-icon [img]=\"ellipsisIcon\" [size]=\"12\" />\n      </span>\n    } @else {\n      <button\n        type=\"button\"\n        class=\"ath-page__btn\"\n        [class.ath-page__btn--active]=\"item === page()\"\n        [attr.aria-current]=\"item === page() ? 'page' : null\"\n        [attr.aria-label]=\"pageLabel(item)\"\n        (click)=\"goTo(item)\"\n      >\n        {{ item }}\n      </button>\n    }\n  }\n\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page() >= totalPages()\"\n    [attr.aria-label]=\"labels.pageNext()\"\n    (click)=\"goNext()\"\n  >\n    <ath-icon [img]=\"nextIcon\" [size]=\"14\" />\n  </button>\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page() >= totalPages()\"\n    [attr.aria-label]=\"labels.pageLast()\"\n    (click)=\"goLast()\"\n  >\n    <ath-icon [img]=\"lastIcon\" [size]=\"14\" />\n  </button>\n} @else {\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--cursor\"\n    [disabled]=\"!hasPrev()\"\n    (click)=\"goPrev()\"\n  >\n    <ath-icon [img]=\"prevIcon\" [size]=\"14\" />\n    <span>{{ labels.previous() }}</span>\n  </button>\n  @if (summary()) {\n    <span class=\"ath-page__summary\">{{ summary() }}</span>\n  }\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--cursor\"\n    [disabled]=\"!hasNext()\"\n    (click)=\"goNext()\"\n  >\n    <span>{{ labels.next() }}</span>\n    <ath-icon [img]=\"nextIcon\" [size]=\"14\" />\n  </button>\n}\n",
			styles: [":host{display:inline-flex;align-items:center;gap:4px;font-family:var(--font-sans)}.ath-page__btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-width:28px;height:28px;padding:0 8px;background:var(--bg-1);border:1px solid var(--border);border-radius:var(--r-sm);font-family:var(--font-sans);font-size:12.5px;font-weight:500;font-feature-settings:\"tnum\";color:var(--fg-2);cursor:pointer;transition:background var(--t-fast),border-color var(--t-fast),color var(--t-fast),box-shadow var(--t-fast)}.ath-page__btn:hover:not(:disabled):not(.ath-page__btn--active){background:var(--bg-2);border-color:var(--border-strong);color:var(--fg)}.ath-page__btn:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-page__btn:disabled{opacity:.4;cursor:not-allowed}.ath-page__btn--nav{padding:0;width:28px;color:var(--fg-3)}.ath-page__btn--cursor{padding:0 10px}.ath-page__btn--active{background:var(--action-primary-bg);border-color:var(--action-primary-bg);color:var(--action-primary-fg);cursor:default}.ath-page__ellipsis{display:inline-flex;align-items:center;justify-content:center;width:20px;color:var(--fg-4)}.ath-page__summary{margin:0 8px;font-size:12px;color:var(--fg-3);font-feature-settings:\"tnum\"}\n"],
			dependencies: [{
				kind: "component",
				type: AthIconComponent,
				selector: "ath-icon",
				inputs: [
					"img",
					"size",
					"strokeWidth",
					"color",
					"absoluteStrokeWidth",
					"class"
				]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthPaginationComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-pagination",
			imports: [AthIconComponent],
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: "@if (mode() === 'numbered') {\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page() <= 1\"\n    [attr.aria-label]=\"labels.pageFirst()\"\n    (click)=\"goFirst()\"\n  >\n    <ath-icon [img]=\"firstIcon\" [size]=\"14\" />\n  </button>\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page() <= 1\"\n    [attr.aria-label]=\"labels.pagePrevious()\"\n    (click)=\"goPrev()\"\n  >\n    <ath-icon [img]=\"prevIcon\" [size]=\"14\" />\n  </button>\n\n  @for (item of pages(); track $index) {\n    @if (item === 'ellipsis') {\n      <span class=\"ath-page__ellipsis\" aria-hidden=\"true\">\n        <ath-icon [img]=\"ellipsisIcon\" [size]=\"12\" />\n      </span>\n    } @else {\n      <button\n        type=\"button\"\n        class=\"ath-page__btn\"\n        [class.ath-page__btn--active]=\"item === page()\"\n        [attr.aria-current]=\"item === page() ? 'page' : null\"\n        [attr.aria-label]=\"pageLabel(item)\"\n        (click)=\"goTo(item)\"\n      >\n        {{ item }}\n      </button>\n    }\n  }\n\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page() >= totalPages()\"\n    [attr.aria-label]=\"labels.pageNext()\"\n    (click)=\"goNext()\"\n  >\n    <ath-icon [img]=\"nextIcon\" [size]=\"14\" />\n  </button>\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page() >= totalPages()\"\n    [attr.aria-label]=\"labels.pageLast()\"\n    (click)=\"goLast()\"\n  >\n    <ath-icon [img]=\"lastIcon\" [size]=\"14\" />\n  </button>\n} @else {\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--cursor\"\n    [disabled]=\"!hasPrev()\"\n    (click)=\"goPrev()\"\n  >\n    <ath-icon [img]=\"prevIcon\" [size]=\"14\" />\n    <span>{{ labels.previous() }}</span>\n  </button>\n  @if (summary()) {\n    <span class=\"ath-page__summary\">{{ summary() }}</span>\n  }\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--cursor\"\n    [disabled]=\"!hasNext()\"\n    (click)=\"goNext()\"\n  >\n    <span>{{ labels.next() }}</span>\n    <ath-icon [img]=\"nextIcon\" [size]=\"14\" />\n  </button>\n}\n",
			styles: [":host{display:inline-flex;align-items:center;gap:4px;font-family:var(--font-sans)}.ath-page__btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-width:28px;height:28px;padding:0 8px;background:var(--bg-1);border:1px solid var(--border);border-radius:var(--r-sm);font-family:var(--font-sans);font-size:12.5px;font-weight:500;font-feature-settings:\"tnum\";color:var(--fg-2);cursor:pointer;transition:background var(--t-fast),border-color var(--t-fast),color var(--t-fast),box-shadow var(--t-fast)}.ath-page__btn:hover:not(:disabled):not(.ath-page__btn--active){background:var(--bg-2);border-color:var(--border-strong);color:var(--fg)}.ath-page__btn:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-page__btn:disabled{opacity:.4;cursor:not-allowed}.ath-page__btn--nav{padding:0;width:28px;color:var(--fg-3)}.ath-page__btn--cursor{padding:0 10px}.ath-page__btn--active{background:var(--action-primary-bg);border-color:var(--action-primary-bg);color:var(--action-primary-fg);cursor:default}.ath-page__ellipsis{display:inline-flex;align-items:center;justify-content:center;width:20px;color:var(--fg-4)}.ath-page__summary{margin:0 8px;font-size:12px;color:var(--fg-3);font-feature-settings:\"tnum\"}\n"]
		}]
	}],
	propDecorators: {
		mode: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "mode",
				required: false
			}]
		}],
		page: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "page",
				required: false
			}]
		}],
		totalPages: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "totalPages",
				required: false
			}]
		}],
		siblingCount: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "siblingCount",
				required: false
			}]
		}],
		pageChange: [{
			type: i0.Output,
			args: ["pageChange"]
		}],
		hasPrev: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "hasPrev",
				required: false
			}]
		}],
		hasNext: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "hasNext",
				required: false
			}]
		}],
		summary: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "summary",
				required: false
			}]
		}],
		previous: [{
			type: i0.Output,
			args: ["previous"]
		}],
		next: [{
			type: i0.Output,
			args: ["next"]
		}]
	}
});
function range(from, to) {
	const out = [];
	for (let i = from; i <= to; i++) out.push(i);
	return out;
}
const DAY_MS = 864e5;
const wallClockFormats = /* @__PURE__ */ new Map();
function wallClockFormat(timeZone) {
	let format = wallClockFormats.get(timeZone);
	if (!format) {
		format = new Intl.DateTimeFormat("en-US", {
			timeZone,
			hourCycle: "h23",
			year: "numeric",
			month: "numeric",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			second: "numeric"
		});
		wallClockFormats.set(timeZone, format);
	}
	return format;
}
function zonedWallClock(date, timeZone) {
	if (!timeZone) return new Date(date);
	const parts = wallClockFormat(timeZone).formatToParts(date);
	const get = (t) => Number(parts.find((p) => p.type === t)?.value ?? 0);
	return new Date(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
}
function calendarDayOf(value, timeZone) {
	const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
	if (!m) return null;
	if (isDayOnly(value)) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 12);
	const wall = zonedWallClock(new Date(value), timeZone);
	return new Date(wall.getFullYear(), wall.getMonth(), wall.getDate(), 12);
}
function isDayOnly(value) {
	const at = new Date(value);
	return value.length === 10 || Number.isNaN(at.getTime()) || at.getUTCMinutes() === 0 && at.getUTCSeconds() === 0 && (at.getUTCHours() === 0 || at.getUTCHours() === 12);
}
function calendarDaysUntil(day, now, timeZone) {
	const today = zonedWallClock(now, timeZone);
	const midnight = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
	return Math.round((midnight(day) - midnight(today)) / DAY_MS);
}
function dueToneOf(days, done = false) {
	if (done) return "done";
	if (days === null) return "later";
	if (days < 0) return "overdue";
	if (days === 0) return "today";
	if (days <= 2) return "soon";
	return "later";
}
function shortDay(day, ctx = {}) {
	const y = day.getFullYear();
	const m = day.getMonth() + 1;
	const d = day.getDate();
	switch (ctx.dateFormat) {
		case "dmy": return `${d}.${m}.`;
		case "mdy": return `${m}/${d}`;
		case "iso": return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
		default: return day.toLocaleDateString(ctx.locale || void 0, {
			month: "short",
			day: "numeric"
		});
	}
}
function fullDueDate(value, day, ctx = {}) {
	const locale = ctx.locale || void 0;
	const date = ctx.dateFormat === "iso" ? `${day.toLocaleDateString(locale, { weekday: "long" })}, ${shortDay(day, ctx)}` : day.toLocaleDateString(locale, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	});
	if (isDayOnly(value)) return date;
	return `${date}, ${new Date(value).toLocaleTimeString(locale, {
		hour: "2-digit",
		minute: "2-digit",
		...ctx.hour12 === void 0 ? {} : { hour12: ctx.hour12 },
		...ctx.timeZone ? { timeZone: ctx.timeZone } : {}
	})}`;
}
function fill(template, count) {
	return template.replace(/\{count\}/g, String(count));
}
function compactDueText(days, day, labels, ctx = {}) {
	if (days === -1 && labels.overdueOne) return fill(labels.overdueOne, 1);
	if (days < 0) return fill(labels.overdue, -days);
	if (days === 0) return labels.today;
	if (days === 1) return labels.tomorrow;
	if (days < 7) return fill(labels.inDays, days);
	return shortDay(day, ctx);
}
function describeDue(input, labels, ctx = {}) {
	if (!input.date) return null;
	const day = calendarDayOf(input.date, ctx.timeZone);
	if (!day) return null;
	const days = calendarDaysUntil(day, input.now ?? /* @__PURE__ */ new Date(), ctx.timeZone);
	const done = !!input.done;
	const plain = done || input.source === "sprint";
	const short = shortDay(day, ctx);
	return {
		tone: dueToneOf(days, done),
		text: plain ? short : compactDueText(days, day, labels, ctx),
		days,
		day: short,
		full: fullDueDate(input.date, day, ctx)
	};
}
const HOUR_MS = 36e5;
var AthToday = class AthToday {
	constructor() {
		this.version = signal(0, ...ngDevMode ? [{ debugName: "version" }] : /* istanbul ignore next */ []);
		this.tick = this.version.asReadonly();
		this.dateContext = inject(ATH_DATE_CONTEXT, { optional: true });
		if (!isPlatformBrowser(inject(PLATFORM_ID))) return;
		this.schedule();
		inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
	}
	schedule() {
		const now = /* @__PURE__ */ new Date();
		const delay = Math.min(untilMidnight(now), untilMidnight(zonedWallClock(now, this.dateContext?.().timeZone)), HOUR_MS);
		this.timer = setTimeout(() => {
			this.version.update((v) => v + 1);
			this.schedule();
		}, delay);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthToday,
			deps: [],
			target: i0.ɵɵFactoryTarget.Injectable
		});
	}
	static {
		this.ɵprov = i0.ɵɵngDeclareInjectable({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthToday,
			providedIn: "root"
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthToday,
	decorators: [{
		type: Injectable,
		args: [{ providedIn: "root" }]
	}],
	ctorParameters: () => []
});
function untilMidnight(now) {
	return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();
}
var AthDueLabelComponent = class AthDueLabelComponent {
	constructor() {
		this.labels = injectAthLabels();
		this.localeId = inject(LOCALE_ID);
		this.dateContext = inject(ATH_DATE_CONTEXT, { optional: true });
		this.today = inject(AthToday);
		this.date = input(null, ...ngDevMode ? [{ debugName: "date" }] : /* istanbul ignore next */ []);
		this.done = input(false, ...ngDevMode ? [{ debugName: "done" }] : /* istanbul ignore next */ []);
		this.source = input("own", ...ngDevMode ? [{ debugName: "source" }] : /* istanbul ignore next */ []);
		this.sprintName = input(null, ...ngDevMode ? [{ debugName: "sprintName" }] : /* istanbul ignore next */ []);
		this.afterSprintEnd = input(false, ...ngDevMode ? [{ debugName: "afterSprintEnd" }] : /* istanbul ignore next */ []);
		this.placeholder = input(null, ...ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []);
		this.compact = input(false, ...ngDevMode ? [{ debugName: "compact" }] : /* istanbul ignore next */ []);
		this.now = input(null, ...ngDevMode ? [{ debugName: "now" }] : /* istanbul ignore next */ []);
		this.ic = {
			sprint: Zap,
			warn: AlertTriangle
		};
		this.ctx = computed(() => ({
			locale: this.localeId,
			...this.dateContext?.() ?? {}
		}), ...ngDevMode ? [{ debugName: "ctx" }] : /* istanbul ignore next */ []);
		this.view = computed(() => describeDue({
			date: this.date(),
			done: this.done(),
			source: this.source(),
			now: this.now() ?? this.currentTime()
		}, {
			overdue: this.labels.dueOverdue(),
			overdueOne: this.labels.dueOverdueOne(),
			today: this.labels.dueToday(),
			tomorrow: this.labels.dueTomorrow(),
			inDays: this.labels.dueInDays()
		}, this.ctx()), ...ngDevMode ? [{ debugName: "view" }] : /* istanbul ignore next */ []);
		this.isSprint = computed(() => this.source() === "sprint", ...ngDevMode ? [{ debugName: "isSprint" }] : /* istanbul ignore next */ []);
		this.sprintEndText = computed(() => this.labels.dueSprintEnd(), ...ngDevMode ? [{ debugName: "sprintEndText" }] : /* istanbul ignore next */ []);
		this.dueOnText = computed(() => {
			const v = this.view();
			return v ? formatAthLabel(this.labels.dueOn(), { date: v.full }) : null;
		}, ...ngDevMode ? [{ debugName: "dueOnText" }] : /* istanbul ignore next */ []);
		this.title = computed(() => {
			const on = this.dueOnText();
			if (!this.isSprint()) return on;
			const sprint = this.sprintName();
			const source = sprint ? formatAthLabel(this.labels.dueSprintTooltip(), { sprint }) : this.sprintEndText();
			return on ? `${source} · ${on}` : source;
		}, ...ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []);
		this.showWarn = computed(() => this.afterSprintEnd() && !this.done(), ...ngDevMode ? [{ debugName: "showWarn" }] : /* istanbul ignore next */ []);
		this.warnText = computed(() => this.labels.dueAfterSprint(), ...ngDevMode ? [{ debugName: "warnText" }] : /* istanbul ignore next */ []);
		this.warnTitle = computed(() => {
			const sprint = this.sprintName();
			return sprint ? `${this.warnText()} · ${sprint}` : this.warnText();
		}, ...ngDevMode ? [{ debugName: "warnTitle" }] : /* istanbul ignore next */ []);
	}
	currentTime() {
		this.today.tick();
		return /* @__PURE__ */ new Date();
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthDueLabelComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthDueLabelComponent,
			isStandalone: true,
			selector: "ath-due-label",
			inputs: {
				date: {
					classPropertyName: "date",
					publicName: "date",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				done: {
					classPropertyName: "done",
					publicName: "done",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				source: {
					classPropertyName: "source",
					publicName: "source",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				sprintName: {
					classPropertyName: "sprintName",
					publicName: "sprintName",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				afterSprintEnd: {
					classPropertyName: "afterSprintEnd",
					publicName: "afterSprintEnd",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				placeholder: {
					classPropertyName: "placeholder",
					publicName: "placeholder",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				compact: {
					classPropertyName: "compact",
					publicName: "compact",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				now: {
					classPropertyName: "now",
					publicName: "now",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			ngImport: i0,
			template: "@if (view(); as v) {\n  <span class=\"ath-due\" [attr.data-tone]=\"v.tone\" [attr.title]=\"title()\">\n    @if (isSprint()) {\n      <ath-icon class=\"ath-due__icon\" [img]=\"ic.sprint\" [size]=\"11\" aria-hidden=\"true\" />\n      @if (compact()) {\n        <span class=\"ath-due__sr\">{{ sprintEndText() }}</span>\n      } @else {\n        <span class=\"ath-due__source\">{{ sprintEndText() }} · </span>\n      }\n    }\n    <span class=\"ath-due__text\">{{ v.text }}</span>\n    <span class=\"ath-due__sr\">, {{ dueOnText() }}</span>\n    @if (showWarn()) {\n      <ath-icon\n        class=\"ath-due__warn\"\n        [img]=\"ic.warn\"\n        [size]=\"11\"\n        role=\"img\"\n        [attr.aria-label]=\"warnText()\"\n        [attr.title]=\"warnTitle()\"\n      />\n    }\n  </span>\n} @else if (placeholder()) {\n  <span class=\"ath-due ath-due--none\">{{ placeholder() }}</span>\n}\n",
			styles: [":host{display:inline-flex;min-width:0}.ath-due{display:inline-flex;align-items:center;gap:var(--space-1);min-width:0;font-family:var(--font-sans);font-size:var(--text-sm);font-variant-numeric:tabular-nums;white-space:nowrap;color:var(--due-later)}.ath-due[data-tone=overdue]{color:var(--due-overdue)}.ath-due[data-tone=today]{color:var(--due-today)}.ath-due[data-tone=soon]{color:var(--due-soon)}.ath-due--none{color:var(--due-none)}.ath-due__text{overflow:hidden;text-overflow:ellipsis}.ath-due__icon,.ath-due__source{flex:none;color:var(--fg-3)}.ath-due__warn{flex:none;color:var(--amber)}.ath-due__sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}\n"],
			dependencies: [{
				kind: "component",
				type: AthIconComponent,
				selector: "ath-icon",
				inputs: [
					"img",
					"size",
					"strokeWidth",
					"color",
					"absoluteStrokeWidth",
					"class"
				]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthDueLabelComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-due-label",
			imports: [AthIconComponent],
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: "@if (view(); as v) {\n  <span class=\"ath-due\" [attr.data-tone]=\"v.tone\" [attr.title]=\"title()\">\n    @if (isSprint()) {\n      <ath-icon class=\"ath-due__icon\" [img]=\"ic.sprint\" [size]=\"11\" aria-hidden=\"true\" />\n      @if (compact()) {\n        <span class=\"ath-due__sr\">{{ sprintEndText() }}</span>\n      } @else {\n        <span class=\"ath-due__source\">{{ sprintEndText() }} · </span>\n      }\n    }\n    <span class=\"ath-due__text\">{{ v.text }}</span>\n    <span class=\"ath-due__sr\">, {{ dueOnText() }}</span>\n    @if (showWarn()) {\n      <ath-icon\n        class=\"ath-due__warn\"\n        [img]=\"ic.warn\"\n        [size]=\"11\"\n        role=\"img\"\n        [attr.aria-label]=\"warnText()\"\n        [attr.title]=\"warnTitle()\"\n      />\n    }\n  </span>\n} @else if (placeholder()) {\n  <span class=\"ath-due ath-due--none\">{{ placeholder() }}</span>\n}\n",
			styles: [":host{display:inline-flex;min-width:0}.ath-due{display:inline-flex;align-items:center;gap:var(--space-1);min-width:0;font-family:var(--font-sans);font-size:var(--text-sm);font-variant-numeric:tabular-nums;white-space:nowrap;color:var(--due-later)}.ath-due[data-tone=overdue]{color:var(--due-overdue)}.ath-due[data-tone=today]{color:var(--due-today)}.ath-due[data-tone=soon]{color:var(--due-soon)}.ath-due--none{color:var(--due-none)}.ath-due__text{overflow:hidden;text-overflow:ellipsis}.ath-due__icon,.ath-due__source{flex:none;color:var(--fg-3)}.ath-due__warn{flex:none;color:var(--amber)}.ath-due__sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}\n"]
		}]
	}],
	propDecorators: {
		date: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "date",
				required: false
			}]
		}],
		done: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "done",
				required: false
			}]
		}],
		source: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "source",
				required: false
			}]
		}],
		sprintName: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "sprintName",
				required: false
			}]
		}],
		afterSprintEnd: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "afterSprintEnd",
				required: false
			}]
		}],
		placeholder: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "placeholder",
				required: false
			}]
		}],
		compact: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "compact",
				required: false
			}]
		}],
		now: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "now",
				required: false
			}]
		}]
	}
});
var AthPageComponent = class AthPageComponent {
	constructor() {
		this.mode = input("scroll", ...ngDevMode ? [{ debugName: "mode" }] : /* istanbul ignore next */ []);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthPageComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.1.0",
			version: "22.2.2",
			type: AthPageComponent,
			isStandalone: true,
			selector: "ath-page",
			inputs: { mode: {
				classPropertyName: "mode",
				publicName: "mode",
				isSignal: true,
				isRequired: false,
				transformFunction: null
			} },
			host: { properties: { "attr.data-mode": "mode()" } },
			ngImport: i0,
			template: `
    <ng-content select="ath-page-header, [athPageHead]" />
    <div class="ath-page__body"><ng-content /></div>
  `,
			isInline: true,
			styles: ["ath-page{display:flex;flex-direction:column;gap:var(--section-gap);box-sizing:border-box;width:100%;min-width:0;max-width:var(--page-max-w);margin-inline:auto;flex:1 0 auto}ath-page[data-mode=fill]{flex:1 1 0;min-height:0}ath-page{margin-bottom:calc(var(--content-pad-top) - var(--content-pad-bottom))}ath-page>ath-page-header,ath-page>[athPageHead]{flex:none}.ath-page__body{display:flex;flex-direction:column;gap:var(--section-gap);flex:1 0 auto;min-width:0;min-height:0}.ath-page__body>*{flex:none;min-width:0}.ath-page__body>:is(ath-panel-grid,ath-panel,[athPageFill]){flex:1 0 auto}ath-page[data-mode=fill]>.ath-page__body{flex:1 1 0}ath-page[data-mode=fill]>.ath-page__body>:is(ath-panel-grid,ath-panel,[athPageFill]){flex:1 1 0;min-height:0}@container ath-stage (max-width: 720px){ath-page[data-mode=fill]{flex:1 0 auto;min-height:auto}ath-page[data-mode=fill]>.ath-page__body{flex:1 0 auto}ath-page[data-mode=fill]>.ath-page__body>:is(ath-panel-grid,ath-panel,[athPageFill]){flex:1 0 auto;min-height:auto}}\n"],
			changeDetection: i0.ChangeDetectionStrategy.OnPush,
			encapsulation: i0.ViewEncapsulation.None
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthPageComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-page",
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None,
			host: { "[attr.data-mode]": "mode()" },
			template: `
    <ng-content select="ath-page-header, [athPageHead]" />
    <div class="ath-page__body"><ng-content /></div>
  `,
			styles: ["ath-page{display:flex;flex-direction:column;gap:var(--section-gap);box-sizing:border-box;width:100%;min-width:0;max-width:var(--page-max-w);margin-inline:auto;flex:1 0 auto}ath-page[data-mode=fill]{flex:1 1 0;min-height:0}ath-page{margin-bottom:calc(var(--content-pad-top) - var(--content-pad-bottom))}ath-page>ath-page-header,ath-page>[athPageHead]{flex:none}.ath-page__body{display:flex;flex-direction:column;gap:var(--section-gap);flex:1 0 auto;min-width:0;min-height:0}.ath-page__body>*{flex:none;min-width:0}.ath-page__body>:is(ath-panel-grid,ath-panel,[athPageFill]){flex:1 0 auto}ath-page[data-mode=fill]>.ath-page__body{flex:1 1 0}ath-page[data-mode=fill]>.ath-page__body>:is(ath-panel-grid,ath-panel,[athPageFill]){flex:1 1 0;min-height:0}@container ath-stage (max-width: 720px){ath-page[data-mode=fill]{flex:1 0 auto;min-height:auto}ath-page[data-mode=fill]>.ath-page__body{flex:1 0 auto}ath-page[data-mode=fill]>.ath-page__body>:is(ath-panel-grid,ath-panel,[athPageFill]){flex:1 0 auto;min-height:auto}}\n"]
		}]
	}],
	propDecorators: { mode: [{
		type: i0.Input,
		args: [{
			isSignal: true,
			alias: "mode",
			required: false
		}]
	}] }
});
var AthPanelComponent = class AthPanelComponent {
	constructor() {
		this.title = input(null, ...ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []);
		this.level = input(2, ...ngDevMode ? [{ debugName: "level" }] : /* istanbul ignore next */ []);
		this.count = input(null, ...ngDevMode ? [{ debugName: "count" }] : /* istanbul ignore next */ []);
		this.padded = input(false, ...ngDevMode ? [{ debugName: "padded" }] : /* istanbul ignore next */ []);
		this.scroll = input(true, ...ngDevMode ? [{ debugName: "scroll" }] : /* istanbul ignore next */ []);
		this.overflow = input("hidden", ...ngDevMode ? [{ debugName: "overflow" }] : /* istanbul ignore next */ []);
		this.loading = input(false, ...ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []);
		this.skeletonRows = input(5, ...ngDevMode ? [{ debugName: "skeletonRows" }] : /* istanbul ignore next */ []);
		this.colSpan = input(1, ...ngDevMode ? [{ debugName: "colSpan" }] : /* istanbul ignore next */ []);
		this.rowSpan = input(1, ...ngDevMode ? [{ debugName: "rowSpan" }] : /* istanbul ignore next */ []);
		this.rows = computed(() => Array.from({ length: Math.max(1, Math.floor(this.skeletonRows())) }, (_, i) => i), ...ngDevMode ? [{ debugName: "rows" }] : /* istanbul ignore next */ []);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthPanelComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthPanelComponent,
			isStandalone: true,
			selector: "ath-panel",
			inputs: {
				title: {
					classPropertyName: "title",
					publicName: "title",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				level: {
					classPropertyName: "level",
					publicName: "level",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				count: {
					classPropertyName: "count",
					publicName: "count",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				padded: {
					classPropertyName: "padded",
					publicName: "padded",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				scroll: {
					classPropertyName: "scroll",
					publicName: "scroll",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				overflow: {
					classPropertyName: "overflow",
					publicName: "overflow",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				loading: {
					classPropertyName: "loading",
					publicName: "loading",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				skeletonRows: {
					classPropertyName: "skeletonRows",
					publicName: "skeletonRows",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				colSpan: {
					classPropertyName: "colSpan",
					publicName: "colSpan",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				rowSpan: {
					classPropertyName: "rowSpan",
					publicName: "rowSpan",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			host: { properties: {
				"attr.data-col-span": "colSpan() > 1 ? colSpan() : null",
				"attr.data-row-span": "rowSpan() > 1 ? rowSpan() : null",
				"attr.aria-busy": "loading() || null",
				"attr.data-overflow": "overflow() === 'clip' ? 'clip' : null"
			} },
			ngImport: i0,
			template: "<header class=\"ath-panel__head\">\n  @if (title()) {\n    @if (level() === 3) {\n      <h3 class=\"ath-panel__title\">{{ title() }}</h3>\n    } @else {\n      <h2 class=\"ath-panel__title\">{{ title() }}</h2>\n    }\n  }\n  <ng-content select=\"[athPanelHead]\" />\n  <span class=\"ath-panel__spring\"></span>\n  @if (count() !== null && count() !== undefined) {\n    <span class=\"ath-panel__count\">{{ count() }}</span>\n  }\n  <ng-content select=\"[athPanelActions]\" />\n</header>\n<div\n  class=\"ath-panel__body\"\n  [class.ath-panel__body--padded]=\"padded()\"\n  [class.ath-panel__body--scroll]=\"scroll()\"\n>\n  @if (loading()) {\n    @for (i of rows(); track i) {\n      <ath-skeleton variant=\"row\" />\n    }\n  } @else {\n    <ng-content />\n  }\n</div>\n<ng-content select=\"[athPanelFoot]\" />\n",
			styles: [":host{display:flex;flex-direction:column;box-sizing:border-box;min-width:0;min-height:0;overflow:hidden;border:1px solid var(--border);border-radius:var(--panel-radius);background:var(--surface)}:host([data-overflow=clip]){overflow:clip}.ath-panel__head{display:flex;flex:none;flex-wrap:wrap;align-items:center;gap:10px var(--space-4);box-sizing:border-box;min-height:var(--panel-head-h);padding:var(--space-1) 14px var(--space-1) var(--panel-pad-x);border-bottom:1px solid var(--border)}.ath-panel__head:has(>.ath-panel__spring:only-child){display:none}.ath-panel__title{margin:0;color:var(--fg);font-size:var(--panel-title-size);font-weight:var(--weight-semibold);line-height:var(--line-tight)}.ath-panel__spring{flex:1}.ath-panel__count{color:var(--fg-3);font-size:var(--control-font);font-variant-numeric:tabular-nums}.ath-panel__body{flex:1 1 auto;min-width:0;min-height:0}.ath-panel__body--scroll{overflow:auto}.ath-panel__body--padded{padding:var(--panel-pad-y) var(--panel-pad-x)}\n"],
			dependencies: [{
				kind: "component",
				type: AthSkeletonComponent,
				selector: "ath-skeleton",
				inputs: [
					"variant",
					"width",
					"height",
					"animated"
				]
			}],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthPanelComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-panel",
			imports: [AthSkeletonComponent],
			changeDetection: ChangeDetectionStrategy.OnPush,
			host: {
				"[attr.data-col-span]": "colSpan() > 1 ? colSpan() : null",
				"[attr.data-row-span]": "rowSpan() > 1 ? rowSpan() : null",
				"[attr.aria-busy]": "loading() || null",
				"[attr.data-overflow]": "overflow() === 'clip' ? 'clip' : null"
			},
			template: "<header class=\"ath-panel__head\">\n  @if (title()) {\n    @if (level() === 3) {\n      <h3 class=\"ath-panel__title\">{{ title() }}</h3>\n    } @else {\n      <h2 class=\"ath-panel__title\">{{ title() }}</h2>\n    }\n  }\n  <ng-content select=\"[athPanelHead]\" />\n  <span class=\"ath-panel__spring\"></span>\n  @if (count() !== null && count() !== undefined) {\n    <span class=\"ath-panel__count\">{{ count() }}</span>\n  }\n  <ng-content select=\"[athPanelActions]\" />\n</header>\n<div\n  class=\"ath-panel__body\"\n  [class.ath-panel__body--padded]=\"padded()\"\n  [class.ath-panel__body--scroll]=\"scroll()\"\n>\n  @if (loading()) {\n    @for (i of rows(); track i) {\n      <ath-skeleton variant=\"row\" />\n    }\n  } @else {\n    <ng-content />\n  }\n</div>\n<ng-content select=\"[athPanelFoot]\" />\n",
			styles: [":host{display:flex;flex-direction:column;box-sizing:border-box;min-width:0;min-height:0;overflow:hidden;border:1px solid var(--border);border-radius:var(--panel-radius);background:var(--surface)}:host([data-overflow=clip]){overflow:clip}.ath-panel__head{display:flex;flex:none;flex-wrap:wrap;align-items:center;gap:10px var(--space-4);box-sizing:border-box;min-height:var(--panel-head-h);padding:var(--space-1) 14px var(--space-1) var(--panel-pad-x);border-bottom:1px solid var(--border)}.ath-panel__head:has(>.ath-panel__spring:only-child){display:none}.ath-panel__title{margin:0;color:var(--fg);font-size:var(--panel-title-size);font-weight:var(--weight-semibold);line-height:var(--line-tight)}.ath-panel__spring{flex:1}.ath-panel__count{color:var(--fg-3);font-size:var(--control-font);font-variant-numeric:tabular-nums}.ath-panel__body{flex:1 1 auto;min-width:0;min-height:0}.ath-panel__body--scroll{overflow:auto}.ath-panel__body--padded{padding:var(--panel-pad-y) var(--panel-pad-x)}\n"]
		}]
	}],
	propDecorators: {
		title: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "title",
				required: false
			}]
		}],
		level: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "level",
				required: false
			}]
		}],
		count: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "count",
				required: false
			}]
		}],
		padded: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "padded",
				required: false
			}]
		}],
		scroll: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "scroll",
				required: false
			}]
		}],
		overflow: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "overflow",
				required: false
			}]
		}],
		loading: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "loading",
				required: false
			}]
		}],
		skeletonRows: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "skeletonRows",
				required: false
			}]
		}],
		colSpan: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "colSpan",
				required: false
			}]
		}],
		rowSpan: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "rowSpan",
				required: false
			}]
		}]
	}
});
const PRESETS = {
	"1": "minmax(0, 1fr)",
	"2": "repeat(2, minmax(0, 1fr))",
	"3": "repeat(3, minmax(0, 1fr))",
	"4": "repeat(4, minmax(0, 1fr))",
	"main-side": "minmax(0, 1fr) minmax(280px, 360px)",
	"side-main": "minmax(220px, 280px) minmax(0, 1fr)"
};
function panelGridColumns(columns) {
	return PRESETS[columns] ?? columns;
}
var AthPanelGridComponent = class AthPanelGridComponent {
	constructor() {
		this.columns = input("2", ...ngDevMode ? [{ debugName: "columns" }] : /* istanbul ignore next */ []);
		this.rows = input("fill", ...ngDevMode ? [{ debugName: "rows" }] : /* istanbul ignore next */ []);
		this.templateColumns = computed(() => panelGridColumns(this.columns()), ...ngDevMode ? [{ debugName: "templateColumns" }] : /* istanbul ignore next */ []);
		this.rowsMode = computed(() => {
			const rows = this.rows();
			return rows === "fill" || rows === "auto" ? rows : "custom";
		}, ...ngDevMode ? [{ debugName: "rowsMode" }] : /* istanbul ignore next */ []);
		this.templateRows = computed(() => this.rowsMode() === "custom" ? this.rows() : null, ...ngDevMode ? [{ debugName: "templateRows" }] : /* istanbul ignore next */ []);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthPanelGridComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.1.0",
			version: "22.2.2",
			type: AthPanelGridComponent,
			isStandalone: true,
			selector: "ath-panel-grid",
			inputs: {
				columns: {
					classPropertyName: "columns",
					publicName: "columns",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				rows: {
					classPropertyName: "rows",
					publicName: "rows",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			host: { properties: { "attr.data-rows": "rowsMode()" } },
			ngImport: i0,
			template: `
    <div
      class="ath-panel-grid__track"
      [style.--panel-grid-columns]="templateColumns()"
      [style.grid-template-rows]="templateRows()"
    >
      <ng-content />
    </div>
  `,
			isInline: true,
			styles: ["ath-panel-grid{display:flex;flex-direction:column;min-width:0;min-height:0;container:ath-panel-grid/inline-size}.ath-panel-grid__track{--panel-grid-columns: minmax(0, 1fr);display:grid;flex:1 1 auto;min-height:0;gap:var(--section-gap);grid-template-columns:var(--panel-grid-columns);grid-auto-rows:auto;align-content:stretch;align-items:stretch}.ath-panel-grid__track>*{min-width:0;min-height:0}.ath-panel-grid__track>[data-col-span=\"2\"]{grid-column:span 2}.ath-panel-grid__track>[data-col-span=\"3\"]{grid-column:span 3}.ath-panel-grid__track>[data-col-span=\"4\"]{grid-column:span 4}.ath-panel-grid__track>[data-row-span=\"2\"]{grid-row:span 2}.ath-panel-grid__track>[data-row-span=\"3\"]{grid-row:span 3}ath-panel-grid[data-rows=auto]>.ath-panel-grid__track{align-content:start}ath-page[data-mode=fill]>.ath-page__body>ath-panel-grid[data-rows=fill]>.ath-panel-grid__track{grid-auto-rows:minmax(0,1fr)}@container ath-panel-grid (max-width: 720px){.ath-panel-grid__track{grid-template-columns:minmax(0,1fr);grid-template-rows:none!important;grid-auto-rows:auto!important;align-content:start}.ath-panel-grid__track>[data-col-span],.ath-panel-grid__track>[data-row-span]{grid-column:auto;grid-row:auto}}\n"],
			changeDetection: i0.ChangeDetectionStrategy.OnPush,
			encapsulation: i0.ViewEncapsulation.None
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthPanelGridComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-panel-grid",
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None,
			host: { "[attr.data-rows]": "rowsMode()" },
			template: `
    <div
      class="ath-panel-grid__track"
      [style.--panel-grid-columns]="templateColumns()"
      [style.grid-template-rows]="templateRows()"
    >
      <ng-content />
    </div>
  `,
			styles: ["ath-panel-grid{display:flex;flex-direction:column;min-width:0;min-height:0;container:ath-panel-grid/inline-size}.ath-panel-grid__track{--panel-grid-columns: minmax(0, 1fr);display:grid;flex:1 1 auto;min-height:0;gap:var(--section-gap);grid-template-columns:var(--panel-grid-columns);grid-auto-rows:auto;align-content:stretch;align-items:stretch}.ath-panel-grid__track>*{min-width:0;min-height:0}.ath-panel-grid__track>[data-col-span=\"2\"]{grid-column:span 2}.ath-panel-grid__track>[data-col-span=\"3\"]{grid-column:span 3}.ath-panel-grid__track>[data-col-span=\"4\"]{grid-column:span 4}.ath-panel-grid__track>[data-row-span=\"2\"]{grid-row:span 2}.ath-panel-grid__track>[data-row-span=\"3\"]{grid-row:span 3}ath-panel-grid[data-rows=auto]>.ath-panel-grid__track{align-content:start}ath-page[data-mode=fill]>.ath-page__body>ath-panel-grid[data-rows=fill]>.ath-panel-grid__track{grid-auto-rows:minmax(0,1fr)}@container ath-panel-grid (max-width: 720px){.ath-panel-grid__track{grid-template-columns:minmax(0,1fr);grid-template-rows:none!important;grid-auto-rows:auto!important;align-content:start}.ath-panel-grid__track>[data-col-span],.ath-panel-grid__track>[data-row-span]{grid-column:auto;grid-row:auto}}\n"]
		}]
	}],
	propDecorators: {
		columns: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "columns",
				required: false
			}]
		}],
		rows: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "rows",
				required: false
			}]
		}]
	}
});
var AthMenuTriggerDirective = class AthMenuTriggerDirective extends AthOverlayTriggerBase {
	constructor() {
		super(...arguments);
		this.menu = input.required({
			...ngDevMode ? { debugName: "menu" } : /* istanbul ignore next */ {},
			alias: "athMenuTrigger"
		});
	}
	popupKind() {
		return "menu";
	}
	isOpen() {
		return this.menu().open();
	}
	popupId() {
		return this.menu().panelId;
	}
	onClick() {
		const menu = this.menu();
		menu.labelFrom(this.controlId());
		menu.toggle(this.host, "first");
	}
	onKeydown(event) {
		if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
		event.preventDefault();
		const menu = this.menu();
		menu.labelFrom(this.controlId());
		menu.show(this.host, event.key === "ArrowUp" ? "last" : "first");
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthMenuTriggerDirective,
			deps: null,
			target: i0.ɵɵFactoryTarget.Directive
		});
	}
	static {
		this.ɵdir = i0.ɵɵngDeclareDirective({
			minVersion: "17.1.0",
			version: "22.2.2",
			type: AthMenuTriggerDirective,
			isStandalone: true,
			selector: "[athMenuTrigger]",
			inputs: { menu: {
				classPropertyName: "menu",
				publicName: "athMenuTrigger",
				isSignal: true,
				isRequired: true,
				transformFunction: null
			} },
			host: { listeners: {
				"click": "onClick()",
				"keydown": "onKeydown($event)"
			} },
			exportAs: ["athMenuTrigger"],
			usesInheritance: true,
			ngImport: i0
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthMenuTriggerDirective,
	decorators: [{
		type: Directive,
		args: [{
			selector: "[athMenuTrigger]",
			exportAs: "athMenuTrigger",
			host: {
				"(click)": "onClick()",
				"(keydown)": "onKeydown($event)"
			}
		}]
	}],
	propDecorators: { menu: [{
		type: i0.Input,
		args: [{
			isSignal: true,
			alias: "athMenuTrigger",
			required: true
		}]
	}] }
});
let nextSheetId = 0;
var AthSheetComponent = class AthSheetComponent {
	get panel() {
		return this.panelEl;
	}
	constructor() {
		this.stack = inject(AthOverlayStack);
		this.open = input(false, {
			...ngDevMode ? { debugName: "open" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.width = input(null, ...ngDevMode ? [{ debugName: "width" }] : /* istanbul ignore next */ []);
		this.top = input(null, ...ngDevMode ? [{ debugName: "top" }] : /* istanbul ignore next */ []);
		this.ariaLabel = input(null, ...ngDevMode ? [{ debugName: "ariaLabel" }] : /* istanbul ignore next */ []);
		this.ariaLabelledby = input(null, ...ngDevMode ? [{ debugName: "ariaLabelledby" }] : /* istanbul ignore next */ []);
		this.autoFocus = input("panel", ...ngDevMode ? [{ debugName: "autoFocus" }] : /* istanbul ignore next */ []);
		this.restoreFocus = input(true, {
			...ngDevMode ? { debugName: "restoreFocus" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.closeOnEscape = input(true, {
			...ngDevMode ? { debugName: "closeOnEscape" } : /* istanbul ignore next */ {},
			transform: booleanAttribute
		});
		this.panelClass = input("", ...ngDevMode ? [{ debugName: "panelClass" }] : /* istanbul ignore next */ []);
		this.panelId = input(`ath-sheet-${++nextSheetId}`, ...ngDevMode ? [{ debugName: "panelId" }] : /* istanbul ignore next */ []);
		this.closed = output();
		this.openChange = output();
		this.opened = output();
		this.panelEl = null;
		this.returnFocus = null;
		this.entry = {
			panel: () => this.panelEl,
			anchor: () => null,
			closeOnEscape: () => this.closeOnEscape(),
			closeOnOutsideClick: () => false,
			dismiss: () => this.requestClose()
		};
		this.panelRef = viewChild("panel", ...ngDevMode ? [{ debugName: "panelRef" }] : /* istanbul ignore next */ []);
		effect(() => {
			const el = this.panelRef()?.nativeElement ?? null;
			untracked(() => this.attach(el));
		});
	}
	attach(el) {
		if (el === this.panelEl) return;
		if (this.panelEl) this.teardown();
		this.panelEl = el;
		if (el) this.present(el);
	}
	ngOnChanges(changes) {
		if (changes["open"] && this.open() && !this.panelEl) {
			const active = document.activeElement;
			this.returnFocus = active instanceof HTMLElement && active !== document.body ? active : null;
		}
	}
	ngOnDestroy() {
		if (this.panelEl) this.teardown();
	}
	close() {
		this.requestClose();
	}
	requestClose() {
		this.closed.emit();
		this.openChange.emit(false);
	}
	present(el) {
		this.stack.open(this.entry);
		if (supportsTopLayer()) {
			el.setAttribute("popover", "manual");
			try {
				el.showPopover();
			} catch {
				el.removeAttribute("popover");
			}
		}
		this.stack.raiseTopLayer();
		this.focusInitial(el);
		this.opened.emit();
	}
	focusInitial(el) {
		const mode = this.autoFocus();
		if (mode === "none") return;
		const active = el.ownerDocument.activeElement;
		if (active && active !== el && el.contains(active)) return;
		if (mode === "first" && focusSafely(tabbables(el)[0])) return;
		focusSafely(el);
	}
	teardown() {
		const el = this.panelEl;
		this.panelEl = null;
		this.stack.close(this.entry);
		if (!el) return;
		const doc = el.ownerDocument;
		const lost = !doc.activeElement || doc.activeElement === doc.body || el.contains(doc.activeElement);
		try {
			if (el.matches(":popover-open")) el.hidePopover();
		} catch {}
		const back = this.returnFocus;
		this.returnFocus = null;
		if (this.restoreFocus() && lost) focusSafely(back);
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthSheetComponent,
			deps: [],
			target: i0.ɵɵFactoryTarget.Component
		});
	}
	static {
		this.ɵcmp = i0.ɵɵngDeclareComponent({
			minVersion: "17.0.0",
			version: "22.2.2",
			type: AthSheetComponent,
			isStandalone: true,
			selector: "ath-sheet",
			inputs: {
				open: {
					classPropertyName: "open",
					publicName: "open",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				width: {
					classPropertyName: "width",
					publicName: "width",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				top: {
					classPropertyName: "top",
					publicName: "top",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				ariaLabel: {
					classPropertyName: "ariaLabel",
					publicName: "ariaLabel",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				ariaLabelledby: {
					classPropertyName: "ariaLabelledby",
					publicName: "ariaLabelledby",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				autoFocus: {
					classPropertyName: "autoFocus",
					publicName: "autoFocus",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				restoreFocus: {
					classPropertyName: "restoreFocus",
					publicName: "restoreFocus",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				closeOnEscape: {
					classPropertyName: "closeOnEscape",
					publicName: "closeOnEscape",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				panelClass: {
					classPropertyName: "panelClass",
					publicName: "panelClass",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				},
				panelId: {
					classPropertyName: "panelId",
					publicName: "panelId",
					isSignal: true,
					isRequired: false,
					transformFunction: null
				}
			},
			outputs: {
				closed: "closed",
				openChange: "openChange",
				opened: "opened"
			},
			viewQueries: [{
				propertyName: "panelRef",
				first: true,
				predicate: ["panel"],
				descendants: true,
				isSignal: true
			}],
			usesOnChanges: true,
			ngImport: i0,
			template: "@if (open()) {\n  <section\n    #panel\n    class=\"ath-sheet\"\n    [class]=\"panelClass()\"\n    [id]=\"panelId()\"\n    role=\"dialog\"\n    aria-modal=\"false\"\n    [attr.aria-label]=\"ariaLabel()\"\n    [attr.aria-labelledby]=\"ariaLabelledby()\"\n    tabindex=\"-1\"\n    [style.--sheet-width]=\"width()\"\n    [style.--sheet-top]=\"top()\"\n  >\n    <ng-content />\n  </section>\n}\n",
			styles: [":host{display:contents}.ath-sheet{--sheet-width: 480px;--sheet-top: 0px;--sheet-shadow-x: -12px;--sheet-enter-x: 24px;position:fixed;inset-block:var(--sheet-top) 0;inset-inline:auto 0;z-index:var(--z-fixed);display:flex;flex-direction:column;box-sizing:border-box;width:min(var(--sheet-width),100vw);height:auto;max-width:none;max-height:none;margin:0;padding:0;overflow:hidden;color:var(--fg);background:var(--surface);border:0;border-inline-start:1px solid var(--border);box-shadow:var(--sheet-shadow-x) 0 32px -20px color-mix(in srgb,var(--scrim) 55%,transparent);outline:none;animation:ath-sheet-in .22s cubic-bezier(.16,1,.3,1)}.ath-sheet:dir(rtl){--sheet-shadow-x: 12px;--sheet-enter-x: -24px}@media(prefers-reduced-motion:reduce){.ath-sheet{animation:ath-sheet-fade .12s ease-out}}@keyframes ath-sheet-in{0%{opacity:0;transform:translate(var(--sheet-enter-x))}}@keyframes ath-sheet-fade{0%{opacity:0}}\n"],
			changeDetection: i0.ChangeDetectionStrategy.OnPush
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthSheetComponent,
	decorators: [{
		type: Component,
		args: [{
			selector: "ath-sheet",
			changeDetection: ChangeDetectionStrategy.OnPush,
			template: "@if (open()) {\n  <section\n    #panel\n    class=\"ath-sheet\"\n    [class]=\"panelClass()\"\n    [id]=\"panelId()\"\n    role=\"dialog\"\n    aria-modal=\"false\"\n    [attr.aria-label]=\"ariaLabel()\"\n    [attr.aria-labelledby]=\"ariaLabelledby()\"\n    tabindex=\"-1\"\n    [style.--sheet-width]=\"width()\"\n    [style.--sheet-top]=\"top()\"\n  >\n    <ng-content />\n  </section>\n}\n",
			styles: [":host{display:contents}.ath-sheet{--sheet-width: 480px;--sheet-top: 0px;--sheet-shadow-x: -12px;--sheet-enter-x: 24px;position:fixed;inset-block:var(--sheet-top) 0;inset-inline:auto 0;z-index:var(--z-fixed);display:flex;flex-direction:column;box-sizing:border-box;width:min(var(--sheet-width),100vw);height:auto;max-width:none;max-height:none;margin:0;padding:0;overflow:hidden;color:var(--fg);background:var(--surface);border:0;border-inline-start:1px solid var(--border);box-shadow:var(--sheet-shadow-x) 0 32px -20px color-mix(in srgb,var(--scrim) 55%,transparent);outline:none;animation:ath-sheet-in .22s cubic-bezier(.16,1,.3,1)}.ath-sheet:dir(rtl){--sheet-shadow-x: 12px;--sheet-enter-x: -24px}@media(prefers-reduced-motion:reduce){.ath-sheet{animation:ath-sheet-fade .12s ease-out}}@keyframes ath-sheet-in{0%{opacity:0;transform:translate(var(--sheet-enter-x))}}@keyframes ath-sheet-fade{0%{opacity:0}}\n"]
		}]
	}],
	ctorParameters: () => [],
	propDecorators: {
		open: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "open",
				required: false
			}]
		}],
		width: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "width",
				required: false
			}]
		}],
		top: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "top",
				required: false
			}]
		}],
		ariaLabel: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "ariaLabel",
				required: false
			}]
		}],
		ariaLabelledby: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "ariaLabelledby",
				required: false
			}]
		}],
		autoFocus: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "autoFocus",
				required: false
			}]
		}],
		restoreFocus: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "restoreFocus",
				required: false
			}]
		}],
		closeOnEscape: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "closeOnEscape",
				required: false
			}]
		}],
		panelClass: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "panelClass",
				required: false
			}]
		}],
		panelId: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "panelId",
				required: false
			}]
		}],
		closed: [{
			type: i0.Output,
			args: ["closed"]
		}],
		openChange: [{
			type: i0.Output,
			args: ["openChange"]
		}],
		opened: [{
			type: i0.Output,
			args: ["opened"]
		}],
		panelRef: [{
			type: i0.ViewChild,
			args: ["panel", { isSignal: true }]
		}]
	}
});
export { AI_MARK_REGULAR, AI_MARK_SMALL, AI_MARK_SMALL_MAX, ATH_DATE_CONTEXT, ATH_DECO_COLORS, ATH_DEFAULT_LABELS, ATH_LABELS, ATH_MARKDOWN_PARSER, ATH_PRIORITY_LABELS, ATH_STATUS_LABELS, ATH_STATUS_TONES, AVATAR_TONE_COUNT, AthAiMarkComponent, AthAlertComponent, AthAvatarComponent, AthAvatarStackComponent, AthBadgeComponent, AthBreadcrumbComponent, AthButtonComponent, AthChipComponent, AthCodeBlockComponent, AthColorSwatchComponent, AthComboboxComponent, AthCopyButtonComponent, AthDialogComponent, AthDividerComponent, AthDropdownComponent, AthDropdownHeaderDirective, AthDueLabelComponent, AthEmptyStateComponent, AthFileDropComponent, AthFilterChipComponent, AthFloatingDirective, AthIconComponent, AthInputComponent, AthKbdComponent, AthKpiStripComponent, AthKpiTileComponent, AthListboxComponent, AthMarkdownComponent, AthMenuComponent, AthMenuItemComponent, AthMenuSeparatorComponent, AthMenuTriggerDirective, AthNavItemComponent, AthOptionPickerComponent, AthOverlayStack, AthPageComponent, AthPageHeaderComponent, AthPaginationComponent, AthPanelComponent, AthPanelGridComponent, AthPermissionRowComponent, AthPopoverComponent, AthPopoverContentDirective, AthPopoverTriggerDirective, AthPriorityComponent, AthProgressComponent, AthRoleBadgeComponent, AthSaveBarComponent, AthSearchInputComponent, AthSegmentComponent, AthSelectComponent, AthSheetComponent, AthSidebarComponent, AthSkeletonCardComponent, AthSkeletonComponent, AthSkeletonListComponent, AthSkeletonTableComponent, AthSlaBarComponent, AthSparklineComponent, AthSpinnerComponent, AthStatusPillComponent, AthTableComponent, AthTabsComponent, AthTextareaComponent, AthTimelineComponent, AthTimelineEntryComponent, AthTimelineEventComponent, AthTimerPillComponent, AthToastContainerComponent, AthToastService, AthToggleComponent, AthTooltipDirective, AthTriStateComponent, AthUserPickerComponent, DROPDOWN_SEPARATOR, athDecoColorLabel, athEscapeHtml, athPlainTextHtml, avatarInitials, avatarToneFor, calendarDayOf, calendarDaysUntil, compactDueText, describeDue, dueToneOf, floatPanel, formatAthLabel, fullDueDate, hasKpiTrend, injectAthLabels, installTopLayerStyles, isAthDecoColor, isDayOnly, isDropdownSeparator, isVirtualAnchor, panelGridColumns, resolveAnchor, resolveFloatingTarget, runAthAction, shortDay, sparklineGeometry, supportsTopLayer, toneOfKey, zonedWallClock };

//# sourceMappingURL=athenos-webcomponents.mjs.map