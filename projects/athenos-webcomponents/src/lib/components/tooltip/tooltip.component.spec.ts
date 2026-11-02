import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AthDialogComponent } from '../dialog/dialog.component';
import { AthTooltipDirective, type TooltipPosition } from './tooltip.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthTooltipDirective, AthDialogComponent],
  template: `
    @if (shown()) {
      <button
        type="button"
        class="host"
        aria-describedby="own-hint"
        [athTooltip]="text()"
        [tooltipPosition]="position()"
        [style]="hostStyle()"
      >
        Save
      </button>
    }
    <span id="own-hint">Saves a draft</span>
    <ath-dialog [open]="dialogOpen()" title="Secret" ariaLabel="Secret">
      <button type="button" class="in-dialog" athTooltip="Copy the secret">Copy</button>
    </ath-dialog>
  `,
})
class TooltipHostComponent {
  readonly shown = signal(true);
  readonly text = signal('Saves a draft; nothing is sent');
  readonly position = signal<TooltipPosition>('top');
  readonly hostStyle = signal('position:fixed;top:200px;left:200px');
  readonly dialogOpen = signal(false);
}

const wait = (ms = 0): Promise<void> => new Promise((r) => setTimeout(r, ms));

describe('AthTooltipDirective', () => {
  let fixture: ComponentFixture<TooltipHostComponent>;
  let host: TooltipHostComponent;
  let root: HTMLElement;
  const button = (): HTMLButtonElement => root.querySelector<HTMLButtonElement>('.host')!;
  const tooltips = (): HTMLElement[] =>
    Array.from(document.querySelectorAll<HTMLElement>('.ath-tooltip'));

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipHostComponent);
    host = fixture.componentInstance;
    root = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    tooltips().forEach((t) => t.remove());
  });

  it('shows on hover after the delay as role=tooltip described by the host, hides on leave', async () => {
    const el = button();
    el.dispatchEvent(new MouseEvent('mouseenter'));
    expect(tooltips().length).toBe(0);
    await wait(350);
    const [tip] = tooltips();
    expect(tip.getAttribute('role')).toBe('tooltip');
    expect(tip.textContent).toBe('Saves a draft; nothing is sent');
    expect(el.getAttribute('aria-describedby')).toBe(`own-hint ${tip.id}`);

    el.dispatchEvent(new MouseEvent('mouseleave'));
    await wait(150);
    expect(tooltips().length).toBe(0);
    expect(el.getAttribute('aria-describedby')).toBe('own-hint');
  });

  it('shows right away on keyboard focus and hides on Escape and blur (R-52)', () => {
    const el = button();
    el.focus();
    expect(el.matches(':focus-visible')).toBe(true);
    expect(tooltips().length).toBe(1);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(tooltips().length).toBe(0);
    expect(el.getAttribute('aria-describedby')).toBe('own-hint');

    el.blur();
    el.focus();
    expect(tooltips().length).toBe(1);
    el.blur();
    // The hide delay; a re-focus within it would keep it.
    return wait(150).then(() => expect(tooltips().length).toBe(0));
  });

  it('lies above an open modal dialog, inside it (R-52)', () => {
    host.dialogOpen.set(true);
    fixture.detectChanges();
    const dialog = document.querySelector('dialog')!;
    const inDialog = root.querySelector<HTMLElement>('.in-dialog')!;
    inDialog.focus();
    const [tip] = tooltips();
    expect(tip).toBeDefined();
    expect(dialog.contains(tip)).toBe(true);
    if ('showPopover' in HTMLElement.prototype) {
      expect(tip.matches(':popover-open')).toBe(true);
    }
  });

  it('flips and stays inside the viewport at its edge', () => {
    host.hostStyle.set('position:fixed;top:0;left:0');
    fixture.detectChanges();
    button().focus();
    const [tip] = tooltips();
    const r = tip.getBoundingClientRect();
    expect(tip.dataset['placement']).toBe('bottom');
    expect(r.top).toBeGreaterThanOrEqual(button().getBoundingClientRect().bottom);
    expect(r.left).toBeGreaterThanOrEqual(8);
  });

  it('places left and right beside the host', () => {
    host.position.set('right');
    fixture.detectChanges();
    button().focus();
    const [tip] = tooltips();
    const b = button().getBoundingClientRect();
    expect(tip.dataset['placement']).toBe('right');
    expect(Math.round(tip.getBoundingClientRect().left)).toBe(Math.round(b.right + 8));
  });

  it('leaves no tooltip behind when destroyed during the show delay (R-62)', async () => {
    button().dispatchEvent(new MouseEvent('mouseenter'));
    host.shown.set(false);
    fixture.detectChanges();
    await wait(350);
    expect(tooltips().length).toBe(0);
  });

  it('follows a text change and hides when the text empties', () => {
    button().focus();
    host.text.set('Saved');
    fixture.detectChanges();
    expect(tooltips()[0].textContent).toBe('Saved');
    host.text.set('');
    fixture.detectChanges();
    expect(tooltips().length).toBe(0);
  });
});
