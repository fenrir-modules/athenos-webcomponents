import { Injector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ATH_DEFAULT_LABELS, ATH_LABELS } from '@athenos/webcomponents/core';
import { formatAthLabel, injectAthLabels } from './label-utils';

describe('injectAthLabels', () => {
  const read = (injector: Injector) => runInInjectionContext(injector, () => injectAthLabels());

  it('merges a provided object once and shares the result (P04: 15 ms on the board)', () => {
    const provided = { loading: () => 'Lädt' };
    const injector = Injector.create({
      providers: [{ provide: ATH_LABELS, useValue: provided }],
      parent: TestBed.inject(Injector),
    });
    const a = read(injector);
    const b = read(injector);
    expect(a).toBe(b);
    expect(a.loading()).toBe('Lädt');
    expect(a.colorPicker()).toBe(ATH_DEFAULT_LABELS.colorPicker());
    expect(provided).toEqual({ loading: provided.loading }); // the app's object is untouched
  });

  it('gives the defaults themselves without a provider, and a new merge for another provider', () => {
    expect(read(TestBed.inject(Injector))).toBe(ATH_DEFAULT_LABELS);
    const other = Injector.create({
      providers: [{ provide: ATH_LABELS, useValue: { loading: () => 'Chargement' } }],
      parent: TestBed.inject(Injector),
    });
    expect(read(other).loading()).toBe('Chargement');
  });
});

describe('formatAthLabel', () => {
  it('fills known placeholders and keeps unknown ones', () => {
    expect(formatAthLabel('{count} of {total} {x}', { count: 2, total: 5 })).toBe('2 of 5 {x}');
  });
});
