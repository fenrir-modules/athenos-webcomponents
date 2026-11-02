import { inject } from '@angular/core';
import { ATH_DEFAULT_LABELS, ATH_LABELS, type AthLabels } from '@athenos/webcomponents/core';

/** The merged labels per provided object: one merge per provider, not per component. */
const merged = new WeakMap<object, AthLabels>();

/**
 * The labels a component reads: the app's `ATH_LABELS` where it provides
 * one, the English default otherwise. Call in an injection context; the
 * members stay functions, so a provider that reads a signal (the current
 * language) keeps a `computed` that calls them current.
 *
 * The result is shared by every component under the same provider (a board
 * built hundreds of 40-key copies): read it, never write to it.
 */
export function injectAthLabels(): Readonly<AthLabels> {
  const provided = inject(ATH_LABELS, { optional: true });
  if (!provided) return ATH_DEFAULT_LABELS;
  let labels = merged.get(provided);
  if (!labels) {
    labels = { ...ATH_DEFAULT_LABELS, ...provided };
    merged.set(provided, labels);
  }
  return labels;
}

/** Fills `{name}` placeholders of a label; unknown ones stay as written. */
export function formatAthLabel(
  template: string,
  params: Readonly<Record<string, string | number>>
): string {
  return template.replace(/\{(\w+)\}/g, (whole, key: string) =>
    key in params ? String(params[key]) : whole
  );
}
