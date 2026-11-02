import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ATH_LABELS } from '../../i18n/labels';
import { AthSelectComponent, type SelectOption } from './select.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthSelectComponent, FormsModule],
  template: `
    <ath-select
      placeholder=""
      [options]="options()"
      [ngModel]="value()"
      (ngModelChange)="value.set($event)"
    />
  `,
})
class SelectHostComponent {
  readonly options = signal<SelectOption[]>([]);
  readonly value = signal('');
}

const PROJECTS: SelectOption[] = [
  { value: '', label: 'None' },
  { value: 'p1', label: 'Atlas' },
  { value: 'p2', label: 'Website' },
];

describe('AthSelectComponent', () => {
  async function setup() {
    const fixture = TestBed.createComponent(SelectHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const select = (): HTMLSelectElement =>
      (fixture.nativeElement as HTMLElement).querySelector('select')!;
    return { fixture, host: fixture.componentInstance, select };
  }

  it('shows the value once the options arrive after it (default project after a reload)', async () => {
    const { fixture, host, select } = await setup();
    // The setting is known before the project list has loaded.
    host.value.set('p2');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    host.options.set(PROJECTS);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(select().value).toBe('p2');
    expect(select().selectedOptions[0]?.textContent?.trim()).toBe('Website');
  });

  it('keeps the value when the options are replaced', async () => {
    const { fixture, host, select } = await setup();
    host.options.set(PROJECTS);
    host.value.set('p1');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(select().value).toBe('p1');
    host.options.set([...PROJECTS, { value: 'p3', label: 'Mobile' }]);
    fixture.detectChanges();
    expect(select().value).toBe('p1');
  });

  it('reports a user change through the forms API', async () => {
    const { fixture, host, select } = await setup();
    host.options.set(PROJECTS);
    fixture.detectChanges();
    select().value = 'p1';
    select().dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(host.value()).toBe('p1');
  });

  it('names the native select with ariaLabel when there is no visible label', () => {
    const fixture = TestBed.createComponent(AthSelectComponent);
    fixture.componentRef.setInput('options', PROJECTS);
    fixture.componentRef.setInput('ariaLabel', 'Role for Mira');
    fixture.detectChanges();
    const select = (fixture.nativeElement as HTMLElement).querySelector('select')!;
    expect(select.getAttribute('aria-label')).toBe('Role for Mira');
    expect((fixture.nativeElement as HTMLElement).querySelector('label')).toBeNull();
    fixture.componentRef.setInput('ariaLabel', '');
    fixture.detectChanges();
    expect(select.hasAttribute('aria-label')).toBe(false);
  });

  /** UX-041 / UX-031: "Select an option" stood English on German pages. */
  describe('placeholder', () => {
    function bare(labels?: { selectPlaceholder: () => string }) {
      if (labels) {
        TestBed.configureTestingModule({ providers: [{ provide: ATH_LABELS, useValue: labels }] });
      }
      const fixture = TestBed.createComponent(AthSelectComponent);
      fixture.componentRef.setInput('options', PROJECTS.slice(1));
      fixture.detectChanges();
      return (fixture.nativeElement as HTMLElement).querySelector('select')!;
    }

    it('takes the app’s word from ATH_LABELS when none is given', () => {
      const select = bare({ selectPlaceholder: () => 'Bitte wählen' });
      expect(select.options[0].textContent?.trim()).toBe('Bitte wählen');
    });

    it('falls back to the English default', () => {
      expect(bare().options[0].textContent?.trim()).toBe('Select an option');
    });

    it('an empty placeholder means none: the select always shows a value', () => {
      TestBed.configureTestingModule({});
      const fixture = TestBed.createComponent(AthSelectComponent);
      fixture.componentRef.setInput('options', PROJECTS.slice(1));
      fixture.componentRef.setInput('placeholder', '');
      fixture.detectChanges();
      const select = (fixture.nativeElement as HTMLElement).querySelector('select')!;
      expect(select.options.length).toBe(2);
      expect(select.options[0].textContent?.trim()).toBe('Atlas');
    });
  });

  /** R-53: hint, error and required reached sighted users only. */
  it('exposes error, hint and required to assistive tech', () => {
    const fixture = TestBed.createComponent(AthSelectComponent);
    fixture.componentRef.setInput('options', PROJECTS);
    fixture.componentRef.setInput('selectId', 'proj');
    fixture.componentRef.setInput('hint', 'Where new tickets land');
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const select = root.querySelector('select')!;
    expect(select.getAttribute('aria-required')).toBe('true');
    expect(select.hasAttribute('aria-invalid')).toBe(false);
    expect(root.querySelector('#' + select.getAttribute('aria-describedby'))?.textContent).toBe(
      'Where new tickets land'
    );

    fixture.componentRef.setInput('error', 'Pick a project');
    fixture.detectChanges();
    expect(select.getAttribute('aria-invalid')).toBe('true');
    expect(select.getAttribute('aria-describedby')).toBe('proj-error');
    expect(root.querySelector('#proj-error')?.textContent).toContain('Pick a project');
  });
});
