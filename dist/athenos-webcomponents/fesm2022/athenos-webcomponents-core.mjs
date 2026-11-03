import * as i0 from "@angular/core";
import { Injectable, InjectionToken, signal } from "@angular/core";
const ATH_DEFAULT_LABELS = {
	closeDialog: () => "Close dialog",
	showPassword: () => "Show password",
	hidePassword: () => "Hide password",
	breadcrumb: () => "Breadcrumb",
	breadcrumbMore: () => "Hidden steps",
	unassigned: () => "Unassigned",
	dismiss: () => "Dismiss",
	retry: () => "Retry",
	loading: () => "Loading",
	removeItem: () => "Remove {name}",
	moreCount: () => "{count} more",
	dueOverdue: () => "{count} days overdue",
	dueOverdueOne: () => "{count} day overdue",
	dueToday: () => "today",
	dueTomorrow: () => "tomorrow",
	dueInDays: () => "in {count} days",
	dueOn: () => "Due {date}",
	dueSprintEnd: () => "Sprint end",
	dueSprintTooltip: () => "Due with {sprint}",
	dueAfterSprint: () => "Due after the sprint ends",
	listboxSearch: () => "Search",
	listboxNoMatches: () => "No matches",
	listboxCreate: () => "Create “{query}”",
	listboxOtherGroup: () => "Other",
	pickerPlaceholder: () => "Select…",
	pickerClear: () => "Clear selection",
	pickerSelected: () => "{count} selected",
	clearSearch: () => "Clear search",
	clearFilter: () => "Clear {name} filter",
	sidebarExpand: () => "Expand sidebar",
	sidebarCollapse: () => "Collapse sidebar",
	pageFirst: () => "First page",
	pagePrevious: () => "Previous page",
	pageNext: () => "Next page",
	pageLast: () => "Last page",
	pageNumber: () => "Page {page}",
	previous: () => "Previous",
	next: () => "Next",
	copy: () => "Copy",
	copied: () => "Copied",
	copyCode: () => "Copy code",
	fileDropPrompt: () => "Drop files or click to browse",
	userPickerPlaceholder: () => "Pick user",
	userPickerSearch: () => "Search people",
	internal: () => "internal",
	internalNote: () => "Internal note",
	triStateDeny: () => "Deny",
	triStateInherit: () => "Inherit",
	triStateAllow: () => "Allow",
	triStateInheritAllowed: () => "Inherit (currently allowed)",
	triStateInheritDenied: () => "Inherit (currently denied)",
	saveBarMessage: () => "You have unsaved changes",
	saveBarSave: () => "Save",
	saveBarDiscard: () => "Discard",
	saveBarConfirmDiscard: () => "Really discard?",
	colorPicker: () => "Colour",
	colorNeutral: () => "Grey",
	colorBlue: () => "Blue",
	colorGreen: () => "Green",
	colorAmber: () => "Amber",
	colorRed: () => "Red",
	colorPurple: () => "Purple",
	colorPink: () => "Pink",
	roleLocked: () => "Fixed role",
	selectPlaceholder: () => "Select an option",
	searchPlaceholder: () => "Search…",
	toastDismiss: () => "Dismiss notification: {message}",
	toastRegion: () => "Notifications"
};
const ATH_LABELS = new InjectionToken("ATH_LABELS");
const ATH_STATUS_LABELS = new InjectionToken("ATH_STATUS_LABELS");
const ATH_STATUS_TONES = new InjectionToken("ATH_STATUS_TONES");
const ATH_PRIORITY_LABELS = new InjectionToken("ATH_PRIORITY_LABELS");
const ACTION_MIN_DURATION = 8e3;
var AthToastService = class AthToastService {
	constructor() {
		this.toastsSignal = signal([], ...ngDevMode ? [{ debugName: "toastsSignal" }] : /* istanbul ignore next */ []);
		this.toasts = this.toastsSignal.asReadonly();
		this.pausedSignal = signal(false, ...ngDevMode ? [{ debugName: "pausedSignal" }] : /* istanbul ignore next */ []);
		this.paused = this.pausedSignal.asReadonly();
		this.maxQueued = 10;
		this.clocks = /* @__PURE__ */ new Map();
		this.pauses = /* @__PURE__ */ new Set();
		this.holds = /* @__PURE__ */ new Set();
	}
	success(message, options = 4e3) {
		return this.add("success", message, options, 4e3);
	}
	error(message, options = 6e3) {
		return this.add("error", message, options, 6e3);
	}
	warning(message, options = 5e3) {
		return this.add("warning", message, options, 5e3);
	}
	info(message, options = 4e3) {
		return this.add("info", message, options, 4e3);
	}
	runAction(id) {
		const toast = this.toastsSignal().find((t) => t.id === id);
		this.remove(id);
		toast?.action?.run();
	}
	remove(id) {
		const clock = this.clocks.get(id);
		if (clock?.handle) clearTimeout(clock.handle);
		this.clocks.delete(id);
		this.holds.delete(id);
		this.toastsSignal.update((toasts) => toasts.filter((t) => t.id !== id));
	}
	clear() {
		for (const toast of this.toastsSignal()) this.remove(toast.id);
	}
	pause(reason = "api") {
		this.pauses.add(reason);
		if (this.pausedSignal()) return;
		this.pausedSignal.set(true);
		for (const id of this.clocks.keys()) this.stop(id);
	}
	resume(reason = "api") {
		if (!this.pauses.delete(reason) || this.pauses.size > 0) return;
		this.pausedSignal.set(false);
		for (const id of this.clocks.keys()) this.sync(id);
	}
	hold(id) {
		if (!this.toastsSignal().some((t) => t.id === id)) return;
		this.holds.add(id);
		this.stop(id);
	}
	release(id) {
		if (!this.holds.delete(id)) return;
		this.sync(id);
	}
	isRunning(id) {
		return !!this.clocks.get(id)?.handle;
	}
	remaining(id) {
		const clock = this.clocks.get(id);
		if (!clock) return null;
		if (clock.since === null) return clock.remaining;
		return Math.max(0, clock.remaining - (Date.now() - clock.since));
	}
	add(variant, message, options, fallback) {
		const opts = typeof options === "number" ? { duration: options } : options;
		const action = opts.action;
		const duration = opts.duration ?? (action ? Math.max(fallback, ACTION_MIN_DURATION) : fallback);
		const same = action ? void 0 : this.toastsSignal().find((t) => !t.action && t.variant === variant && t.message === message && (t.title ?? "") === (opts.title ?? ""));
		if (same) return this.repeat(same, duration);
		const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
		const toast = {
			id,
			variant,
			message,
			duration,
			action
		};
		if (opts.title) toast.title = opts.title;
		this.toastsSignal.update((toasts) => [...toasts, toast]);
		this.startClock(id, duration);
		const list = this.toastsSignal();
		for (const old of list.slice(0, Math.max(0, list.length - Math.max(1, this.maxQueued)))) this.remove(old.id);
		return id;
	}
	repeat(toast, duration) {
		const clock = this.clocks.get(toast.id);
		if (clock?.handle) clearTimeout(clock.handle);
		this.clocks.delete(toast.id);
		this.toastsSignal.update((toasts) => [...toasts.filter((t) => t.id !== toast.id), {
			...toast,
			duration
		}]);
		this.startClock(toast.id, duration);
		return toast.id;
	}
	startClock(id, duration) {
		if (duration <= 0) return;
		this.clocks.set(id, {
			remaining: duration,
			since: null,
			handle: null
		});
		this.sync(id);
	}
	sync(id) {
		if (this.pausedSignal() || this.holds.has(id)) this.stop(id);
		else this.start(id);
	}
	start(id) {
		const clock = this.clocks.get(id);
		if (!clock || clock.handle) return;
		clock.since = Date.now();
		clock.handle = setTimeout(() => this.remove(id), clock.remaining);
	}
	stop(id) {
		const clock = this.clocks.get(id);
		if (!clock?.handle) return;
		clearTimeout(clock.handle);
		clock.remaining = this.remaining(id) ?? 0;
		clock.since = null;
		clock.handle = null;
	}
	static {
		this.ɵfac = i0.ɵɵngDeclareFactory({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthToastService,
			deps: [],
			target: i0.ɵɵFactoryTarget.Injectable
		});
	}
	static {
		this.ɵprov = i0.ɵɵngDeclareInjectable({
			minVersion: "12.0.0",
			version: "22.2.2",
			ngImport: i0,
			type: AthToastService,
			providedIn: "root"
		});
	}
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.2",
	ngImport: i0,
	type: AthToastService,
	decorators: [{
		type: Injectable,
		args: [{ providedIn: "root" }]
	}]
});
const ATH_DATE_CONTEXT = new InjectionToken("ATH_DATE_CONTEXT");
const ATH_MARKDOWN_PARSER = new InjectionToken("ATH_MARKDOWN_PARSER");
export { ATH_DATE_CONTEXT, ATH_DEFAULT_LABELS, ATH_LABELS, ATH_MARKDOWN_PARSER, ATH_PRIORITY_LABELS, ATH_STATUS_LABELS, ATH_STATUS_TONES, AthToastService };

//# sourceMappingURL=athenos-webcomponents-core.mjs.map