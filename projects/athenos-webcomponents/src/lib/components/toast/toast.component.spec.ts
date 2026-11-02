import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { ATH_LABELS } from '@athenos/webcomponents/core';
import { AthToastContainerComponent, AthToastService } from './toast.component';

describe('AthToastService', () => {
  let service: AthToastService;

  beforeEach(() => {
    vi.useFakeTimers();
    service = TestBed.inject(AthToastService);
  });

  afterEach(() => vi.useRealTimers());

  it('keeps the old (message, duration) signature', () => {
    service.success('Saved', 1000);
    expect(service.toasts()[0].duration).toBe(1000);
    vi.advanceTimersByTime(1001);
    expect(service.toasts().length).toBe(0);
  });

  it('gives a toast with an action at least 8s by default', () => {
    service.success('ATH-9 created', { action: { label: 'Open', run: () => undefined } });
    expect(service.toasts()[0].duration).toBe(8000);
  });

  it('runs the action and closes the toast', () => {
    const run = vi.fn().mockName('run');
    service.info('ATH-9 created', { duration: 0, action: { label: 'Open', run } });
    service.runAction(service.toasts()[0].id);
    expect(run).toHaveBeenCalled();
    expect(service.toasts().length).toBe(0);
  });

  it('takes an optional title and returns the id', () => {
    const id = service.info('3 tickets moved', { title: 'Sprint 24' });
    expect(service.toasts()[0]).toEqual(
      expect.objectContaining({ id, title: 'Sprint 24', message: '3 tickets moved' })
    );
    service.info('No title');
    expect('title' in service.toasts()[1]).toBe(false);
  });

  it('stops every clock while paused and keeps the time left', () => {
    const id = service.success('Saved', 4000);
    vi.advanceTimersByTime(1000);
    service.pause('hover');
    expect(service.paused()).toBe(true);
    expect(service.isRunning(id)).toBe(false);
    vi.advanceTimersByTime(10_000);
    expect(service.toasts().length).toBe(1);
    expect(service.remaining(id)).toBe(3000);
    service.resume('hover');
    vi.advanceTimersByTime(2999);
    expect(service.toasts().length).toBe(1);
    vi.advanceTimersByTime(1);
    expect(service.toasts().length).toBe(0);
  });

  it('goes on only when the last pause reason is resumed', () => {
    service.success('Saved', 1000);
    service.pause('hover');
    service.pause('focus');
    service.resume('hover');
    vi.advanceTimersByTime(5000);
    expect(service.toasts().length).toBe(1);
    service.resume('focus');
    expect(service.paused()).toBe(false);
    vi.advanceTimersByTime(1000);
    expect(service.toasts().length).toBe(0);
  });

  it('holds one toast while the others run', () => {
    const held = service.info('Old', 1000);
    service.info('New', 1000);
    service.hold(held);
    vi.advanceTimersByTime(1000);
    expect(service.toasts().map((t) => t.message)).toEqual(['Old']);
    service.release(held);
    vi.advanceTimersByTime(1000);
    expect(service.toasts().length).toBe(0);
  });

  it('keeps a toast with duration 0 untimed', () => {
    const id = service.error('Offline', 0);
    expect(service.remaining(id)).toBeNull();
    vi.advanceTimersByTime(60_000);
    expect(service.toasts().length).toBe(1);
    service.clear();
    expect(service.toasts().length).toBe(0);
  });

  /** R-78: a retry loop stacked the same error without end. */
  it('merges an identical toast: one entry, moved to the newest place, clock restarted', () => {
    const first = service.error('Offline', 1000);
    service.info('Other', 0);
    vi.advanceTimersByTime(800);
    expect(service.error('Offline', 1000)).toBe(first);
    expect(service.toasts().map((t) => t.message)).toEqual(['Other', 'Offline']);
    vi.advanceTimersByTime(800);
    expect(service.toasts().length).toBe(2);
    vi.advanceTimersByTime(201);
    expect(service.toasts().map((t) => t.message)).toEqual(['Other']);
  });

  it('keeps toasts apart that differ in variant, title or action', () => {
    service.error('Offline', 0);
    service.warning('Offline', 0);
    service.error('Offline', { duration: 0, title: 'Sync' });
    const run = () => undefined;
    service.info('Deleted', { duration: 0, action: { label: 'Undo', run } });
    service.info('Deleted', { duration: 0, action: { label: 'Undo', run } });
    expect(service.toasts().length).toBe(5);
  });

  it('keeps at most maxQueued toasts, closing the oldest', () => {
    service.maxQueued = 3;
    for (const n of [1, 2, 3, 4, 5]) service.info(`Toast ${n}`, 1000);
    expect(service.toasts().map((t) => t.message)).toEqual(['Toast 3', 'Toast 4', 'Toast 5']);
    // The dropped ones leave no clock behind.
    vi.advanceTimersByTime(1001);
    expect(service.toasts().length).toBe(0);
  });
});

describe('AthToastContainerComponent', () => {
  let fixture: ComponentFixture<AthToastContainerComponent>;
  let service: AthToastService;
  const el = () => fixture.nativeElement as HTMLElement;
  // A closed toast stays a moment as a leaving row; these are the live ones.
  const toastEls = () =>
    Array.from(
      el().querySelectorAll<HTMLElement>('.ath-toast-slot:not(.ath-toast-slot--leave) .ath-toast')
    );
  const slots = () => Array.from(el().querySelectorAll<HTMLElement>('.ath-toast-slot'));

  function create(providers: unknown[] = [], animationsEnabled = false): void {
    TestBed.configureTestingModule({
      imports: [AthToastContainerComponent],
      providers: providers as never[],
      animationsEnabled,
    });
    fixture = TestBed.createComponent(AthToastContainerComponent);
    service = TestBed.inject(AthToastService);
    document.body.appendChild(fixture.nativeElement as HTMLElement);
  }

  afterEach(() => {
    fixture?.destroy();
    vi.useRealTimers();
  });

  it('renders the action as a keyboard-reachable button', () => {
    create();
    const run = vi.fn().mockName('run');
    service.success('ATH-9 created', { duration: 0, action: { label: 'Open', run } });
    fixture.detectChanges();
    const button = el().querySelector<HTMLButtonElement>('.ath-toast__action');
    expect(button?.tagName).toBe('BUTTON');
    expect(button?.textContent?.trim()).toBe('Open');
    button?.click();
    expect(run).toHaveBeenCalled();
    expect(service.toasts().length).toBe(0);
  });

  it('draws the title above the message, the variant in the icon disc', () => {
    create();
    service.info('Timer for TEST-1 discarded', { duration: 0, title: 'Discarded' });
    fixture.detectChanges();
    const toast = toastEls()[0];
    expect(toast.classList).toContain('ath-toast--info');
    expect(toast.classList).toContain('ath-toast--titled');
    expect(toast.querySelector('.ath-toast__title')?.textContent?.trim()).toBe('Discarded');
    expect(toast.querySelector('.ath-toast__message')?.textContent?.trim()).toBe(
      'Timer for TEST-1 discarded'
    );
    expect(getComputedStyle(toast).borderLeftWidth).toBe('1px');
  });

  describe('labels', () => {
    it('names the close button and the region from ATH_LABELS', () => {
      create([
        {
          provide: ATH_LABELS,
          useValue: {
            toastDismiss: () => 'Benachrichtigung schließen: {message}',
            toastRegion: () => 'Benachrichtigungen',
          },
        },
      ]);
      service.success('Gespeichert', 0);
      fixture.detectChanges();
      expect(el().querySelector('.ath-toast__close')?.getAttribute('aria-label')).toBe(
        'Benachrichtigung schließen: Gespeichert'
      );
      expect(el().querySelector('section')?.getAttribute('aria-label')).toBe('Benachrichtigungen');
    });

    it('lets the inputs win and defaults to English', () => {
      create();
      service.success('Saved', { duration: 0, title: 'Sprint 24' });
      fixture.detectChanges();
      const close = () => el().querySelector('.ath-toast__close')?.getAttribute('aria-label');
      expect(close()).toBe('Dismiss notification: Sprint 24: Saved');
      expect(el().querySelector('section')?.getAttribute('aria-label')).toBe('Notifications');
      fixture.componentRef.setInput('dismissLabel', 'Close “{message}”');
      fixture.componentRef.setInput('regionLabel', 'Alerts');
      fixture.detectChanges();
      expect(close()).toBe('Close “Sprint 24: Saved”');
      expect(el().querySelector('section')?.getAttribute('aria-label')).toBe('Alerts');
    });
  });

  describe('stacking', () => {
    it('shows the newest maxVisible, collapses the rest behind a counter', () => {
      create();
      for (const n of [1, 2, 3, 4, 5]) service.info(`Toast ${n}`, 0);
      fixture.detectChanges();
      const collapsed = slots().filter((s) => s.classList.contains('ath-toast-slot--collapsed'));
      expect(collapsed.map((s) => s.textContent?.trim())).toEqual(['Toast 1', 'Toast 2']);
      expect(collapsed.every((s) => s.hasAttribute('inert'))).toBe(true);
      expect(el().querySelector('.ath-toast-more')?.textContent?.trim()).toBe('2 more');

      fixture.componentRef.setInput('maxVisible', 4);
      fixture.detectChanges();
      expect(el().querySelector('.ath-toast-more')?.textContent?.trim()).toBe('1 more');
    });

    it('stops the clocks of collapsed toasts until they show', () => {
      vi.useFakeTimers();
      create();
      fixture.componentRef.setInput('maxVisible', 1);
      const old = service.info('Old', 1000);
      service.info('New', 0);
      fixture.detectChanges();
      expect(service.isRunning(old)).toBe(false);
      vi.advanceTimersByTime(5000);
      expect(service.toasts().length).toBe(2);
      service.remove(service.toasts()[1].id);
      fixture.detectChanges();
      expect(service.isRunning(old)).toBe(true);
      vi.advanceTimersByTime(1000);
      expect(service.toasts().length).toBe(0);
    });

    it('shows every toast while the pointer is on the stack', () => {
      create();
      for (const n of [1, 2, 3, 4]) service.info(`Toast ${n}`, 0);
      fixture.detectChanges();
      el().querySelector('ol')?.dispatchEvent(new PointerEvent('pointerenter'));
      fixture.detectChanges();
      expect(el().querySelectorAll('.ath-toast-slot--collapsed').length).toBe(0);
      expect(el().querySelector('.ath-toast-more')).toBeNull();
    });

    it('"N more" opens the stack and moves focus to the oldest toast', async () => {
      create();
      for (const n of [1, 2, 3, 4]) service.info(`Toast ${n}`, 0);
      fixture.detectChanges();
      el().querySelector<HTMLButtonElement>('.ath-toast-more')?.click();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(el().querySelectorAll('.ath-toast-slot--collapsed').length).toBe(0);
      expect(document.activeElement).toBe(toastEls()[0]);
    });
  });

  describe('pausing', () => {
    it('pauses on hover and goes on when the pointer leaves', () => {
      vi.useFakeTimers();
      create();
      service.success('Saved', 1000);
      fixture.detectChanges();
      const list = el().querySelector('ol') as HTMLElement;
      list.dispatchEvent(new PointerEvent('pointerenter'));
      expect(service.paused()).toBe(true);
      vi.advanceTimersByTime(5000);
      expect(service.toasts().length).toBe(1);
      list.dispatchEvent(new PointerEvent('pointerleave'));
      expect(service.paused()).toBe(false);
      vi.advanceTimersByTime(1000);
      expect(service.toasts().length).toBe(0);
    });

    it('pauses while focus is inside and while the page is hidden', () => {
      create();
      service.success('Saved', { duration: 4000, action: { label: 'Undo', run: () => undefined } });
      fixture.detectChanges();
      el().querySelector<HTMLButtonElement>('.ath-toast__action')?.focus();
      expect(service.paused()).toBe(true);
      el().querySelector<HTMLButtonElement>('.ath-toast__action')?.blur();
      expect(service.paused()).toBe(false);

      const state = vi.spyOn(document, 'visibilityState', 'get').mockReturnValue('hidden');
      document.dispatchEvent(new Event('visibilitychange'));
      expect(service.paused()).toBe(true);
      state.mockReturnValue('visible');
      document.dispatchEvent(new Event('visibilitychange'));
      expect(service.paused()).toBe(false);
    });

    it('freezes the time-left hairline while paused', () => {
      create();
      service.success('Saved', 4000);
      fixture.detectChanges();
      const bar = el().querySelector<HTMLElement>('.ath-toast__timer') as HTMLElement;
      expect(bar.getAnimations()[0]?.playState).toBe('running');
      service.pause();
      fixture.detectChanges();
      expect(bar.getAnimations()[0]?.playState).toBe('paused');
      service.resume();
      fixture.detectChanges();
      expect(bar.getAnimations()[0]?.playState).toBe('running');
    });

    it('draws no hairline on a toast that stays', () => {
      create();
      service.error('Offline', 0);
      fixture.detectChanges();
      expect(el().querySelector('.ath-toast__timer')).toBeNull();
    });

    it('resumes its pauses when destroyed', () => {
      create();
      service.success('Saved', 4000);
      fixture.detectChanges();
      el().querySelector('ol')?.dispatchEvent(new PointerEvent('pointerenter'));
      fixture.destroy();
      expect(service.paused()).toBe(false);
    });
  });

  describe('keyboard', () => {
    it('Escape closes the toast with focus; focus moves to the next one', () => {
      create();
      service.info('First', 0);
      service.info('Second', 0);
      fixture.detectChanges();
      const first = toastEls()[0];
      first.querySelector<HTMLButtonElement>('.ath-toast__close')?.focus();
      const press = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      });
      first.querySelector('.ath-toast__close')?.dispatchEvent(press);
      fixture.detectChanges();
      expect(press.defaultPrevented).toBe(true);
      expect(service.toasts().map((t) => t.message)).toEqual(['Second']);
      expect(document.activeElement).toBe(toastEls()[0]);
    });

    it('returns focus to where it came from when the last toast closes', () => {
      create();
      const before = document.createElement('button');
      document.body.appendChild(before);
      before.focus();
      service.info('Only', 0);
      fixture.detectChanges();
      el().querySelector<HTMLButtonElement>('.ath-toast__close')?.focus();
      el().querySelector<HTMLButtonElement>('.ath-toast__close')?.click();
      fixture.detectChanges();
      expect(document.activeElement).toBe(before);
      expect(service.paused()).toBe(false);
      before.remove();
    });

    it('never traps focus: the toasts are plain tab stops', () => {
      create();
      service.info('Only', { duration: 0, action: { label: 'Undo', run: () => undefined } });
      fixture.detectChanges();
      const tabbable = el().querySelectorAll('button:not([tabindex="-1"])');
      expect(tabbable.length).toBe(2);
      expect(el().querySelector('[aria-modal]')).toBeNull();
    });
  });

  describe('announcements', () => {
    it('reads errors assertively and everything else politely', () => {
      vi.useFakeTimers();
      create();
      service.success('Saved', 0);
      service.error('Could not save', { duration: 0, title: 'Sprint 24' });
      fixture.detectChanges();
      vi.advanceTimersByTime(100);
      fixture.detectChanges();
      const polite = el().querySelector('[aria-live="polite"]');
      const assertive = el().querySelector('[aria-live="assertive"]');
      expect(polite?.textContent?.trim()).toBe('Saved');
      expect(assertive?.textContent?.trim()).toBe('Sprint 24: Could not save');
      expect(el().querySelector('ol')?.hasAttribute('aria-live')).toBe(false);
    });
  });

  describe('exit', () => {
    it('keeps a closed toast for its exit animation, then removes it', async () => {
      create([], true);
      service.info('First', 0);
      service.info('Second', 0);
      fixture.detectChanges();
      await fixture.whenStable();
      service.remove(service.toasts()[0].id);
      fixture.detectChanges();
      const leaving = slots().find((s) => s.classList.contains('ath-toast-slot--leave'));
      expect(leaving?.textContent?.trim()).toBe('First');
      expect(getComputedStyle(leaving as HTMLElement).animationName).toContain('ath-toast-out');
      await vi.waitFor(
        () => {
          fixture.detectChanges();
          expect(slots().length).toBe(1);
        },
        { timeout: 2000 }
      );
      expect(slots()[0].textContent?.trim()).toBe('Second');
    });
  });

  it('fades only under prefers-reduced-motion', () => {
    create();
    service.info('Saved', 0);
    fixture.detectChanges();
    const reduced: Record<string, string> = {};
    for (const sheet of Array.from(document.styleSheets)) {
      for (const rule of Array.from(sheet.cssRules)) {
        if (
          !(rule instanceof CSSMediaRule) ||
          !rule.conditionText.includes('prefers-reduced-motion')
        )
          continue;
        for (const inner of Array.from(rule.cssRules)) {
          if (inner instanceof CSSStyleRule)
            reduced[inner.selectorText] = inner.style.animationName;
        }
      }
    }
    const pick = (cls: string) =>
      Object.entries(reduced).find(([selector]) => selector.includes(cls))?.[1];
    // The enter animation sits on the row itself (CSS on insertion, W5-C).
    const exact = (selector: string) =>
      Object.entries(reduced).find(
        ([s]) => s.replace(/\[_ngcontent[^\]]*\]/g, '').trim() === selector
      )?.[1];
    expect(exact('.ath-toast-slot')).toContain('ath-toast-fade-in');
    expect(pick('ath-toast-slot--leave')).toContain('ath-toast-fade-out');
  });
});
