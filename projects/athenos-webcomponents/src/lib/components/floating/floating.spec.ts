import { ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  floatPanel,
  isVirtualAnchor,
  supportsTopLayer,
  type FloatingCleanup,
  type FloatingVirtualAnchor,
} from './floating';
import { AthFloatingDirective, resolveAnchor, resolveFloatingTarget } from './floating.directive';

/** An anchor fixed at the given viewport position, and a panel of the given size. */
function setup(
  anchorStyle: string,
  panelSize: { w: number; h: number },
  container: HTMLElement = document.body
): { anchor: HTMLElement; panel: HTMLElement } {
  const anchor = document.createElement('button');
  anchor.textContent = 'anchor';
  anchor.style.cssText = `position:fixed;width:80px;height:24px;${anchorStyle}`;
  const panel = document.createElement('div');
  panel.style.width = `${panelSize.w}px`;
  panel.style.height = `${panelSize.h}px`;
  container.append(anchor, panel);
  return { anchor, panel };
}

describe('floatPanel', () => {
  let stop: FloatingCleanup | null = null;
  const cleanup: HTMLElement[] = [];

  afterEach(() => {
    stop?.();
    stop = null;
    cleanup.splice(0).forEach((el) => el.remove());
    document.querySelectorAll('[data-ath-floating]').forEach((el) => el.remove());
    document.querySelectorAll('button').forEach((el) => {
      if (el.textContent === 'anchor') el.remove();
    });
  });

  it('opens below the anchor when there is room', () => {
    const { anchor, panel } = setup('top:20px;left:20px', { w: 100, h: 60 });
    stop = floatPanel(panel, anchor, { offset: 4 });
    const a = anchor.getBoundingClientRect();
    const p = panel.getBoundingClientRect();
    expect(panel.dataset['placement']).toBe('bottom');
    expect(Math.round(p.top)).toBe(Math.round(a.bottom + 4));
    expect(Math.round(p.left)).toBe(Math.round(a.left));
  });

  it('hangs a side panel beside the anchor and flips it left at the right edge', () => {
    const { anchor, panel } = setup('top:100px;right:10px', { w: 100, h: 20 });
    stop = floatPanel(panel, anchor, { side: 'right', offset: 8 });
    const a = anchor.getBoundingClientRect();
    const p = panel.getBoundingClientRect();
    expect(panel.dataset['placement']).toBe('left');
    expect(Math.round(p.right)).toBe(Math.round(a.left - 8));
    expect(Math.round(p.top + p.height / 2)).toBe(Math.round(a.top + a.height / 2));
  });

  it('flips above the anchor at the bottom edge of the viewport', () => {
    const { anchor, panel } = setup('bottom:10px;left:20px', { w: 100, h: 80 });
    stop = floatPanel(panel, anchor, { offset: 4 });
    const a = anchor.getBoundingClientRect();
    const p = panel.getBoundingClientRect();
    expect(panel.dataset['placement']).toBe('top');
    expect(Math.round(p.bottom)).toBeLessThanOrEqual(Math.round(a.top - 4) + 1);
  });

  it('honours side="top" when it fits', () => {
    const { anchor, panel } = setup('top:150px;left:20px', { w: 100, h: 40 });
    stop = floatPanel(panel, anchor, { side: 'top' });
    expect(panel.dataset['placement']).toBe('top');
  });

  it('shifts left to stay inside the right edge', () => {
    const { anchor, panel } = setup('top:20px;right:0', { w: 220, h: 40 });
    stop = floatPanel(panel, anchor);
    const vw = document.documentElement.clientWidth;
    expect(panel.getBoundingClientRect().right).toBeLessThanOrEqual(vw - 8 + 0.5);
  });

  it('lines up end edges with align="end"', () => {
    const { anchor, panel } = setup('top:20px;left:200px', { w: 140, h: 40 });
    stop = floatPanel(panel, anchor, { align: 'end' });
    expect(Math.round(panel.getBoundingClientRect().right)).toBe(
      Math.round(anchor.getBoundingClientRect().right)
    );
  });

  it('caps the height and scrolls when neither side has room', () => {
    const { anchor, panel } = setup('top:40%;left:20px', { w: 100, h: 5000 });
    stop = floatPanel(panel, anchor);
    expect(panel.style.maxHeight).not.toBe('');
    expect(panel.style.overflowY).toBe('auto');
    // Capped, it scrolls: the wheel stays in it (W5-R).
    expect(panel.style.overscrollBehaviorY).toBe('contain');
    expect(panel.getBoundingClientRect().bottom).toBeLessThanOrEqual(window.innerHeight);
  });

  it('leaves the wheel to the page while it fits (W5-R)', () => {
    const { anchor, panel } = setup('top:10px;left:20px', { w: 100, h: 40 });
    stop = floatPanel(panel, anchor);
    expect(panel.style.overflowY).toBe('');
    expect(panel.style.overscrollBehaviorY).toBe('');
  });

  it('respects maxHeight', () => {
    const { anchor, panel } = setup('top:10px;left:20px', { w: 100, h: 400 });
    stop = floatPanel(panel, anchor, { maxHeight: 150 });
    expect(panel.style.maxHeight).toBe('150px');
  });

  it('is at least as wide as the anchor with matchWidth', () => {
    const { anchor, panel } = setup('top:10px;left:20px', { w: 10, h: 20 });
    panel.style.width = '';
    stop = floatPanel(panel, anchor, { matchWidth: true });
    expect(panel.getBoundingClientRect().width).toBeGreaterThanOrEqual(80);
  });

  it('points the arrow at the anchor centre', () => {
    const { anchor, panel } = setup('top:10px;left:100px', { w: 200, h: 40 });
    const arrow = document.createElement('span');
    panel.appendChild(arrow);
    stop = floatPanel(panel, anchor, { arrow });
    const centre = anchor.getBoundingClientRect().left + 40;
    const left = panel.getBoundingClientRect().left;
    expect(parseFloat(arrow.style.left)).toBeCloseTo(centre - left, 0);
  });

  it('promotes the panel into the top layer and leaves it on stop', ({ skip }) => {
    skip(!supportsTopLayer(), 'no Popover API in this browser');
    const { anchor, panel } = setup('top:10px;left:20px', { w: 100, h: 40 });
    stop = floatPanel(panel, anchor);
    expect(panel.matches(':popover-open')).toBe(true);
    stop();
    stop = null;
    expect(panel.matches(':popover-open')).toBe(false);
  });

  it('centres the panel on the anchor with align="center"', () => {
    const { anchor, panel } = setup('top:20px;left:200px', { w: 140, h: 40 });
    stop = floatPanel(panel, anchor, { align: 'center' });
    const a = anchor.getBoundingClientRect();
    const p = panel.getBoundingClientRect();
    expect(Math.round(p.left + p.width / 2)).toBe(Math.round(a.left + a.width / 2));
  });

  it('hangs from a virtual anchor (a caret rectangle) and follows its rectangle', () => {
    const context = document.createElement('div');
    document.body.appendChild(context);
    cleanup.push(context);
    const panel = document.createElement('div');
    panel.style.cssText = 'width:120px;height:40px';
    document.body.appendChild(panel);
    let rect = new DOMRect(150, 60, 2, 18);
    const caret: FloatingVirtualAnchor = {
      getBoundingClientRect: () => rect,
      contextElement: context,
    };
    stop = floatPanel(panel, caret, { offset: 6 });
    let p = panel.getBoundingClientRect();
    expect(Math.round(p.top)).toBe(60 + 18 + 6);
    expect(Math.round(p.left)).toBe(150);

    rect = new DOMRect(300, 100, 2, 18);
    stop.update();
    p = panel.getBoundingClientRect();
    expect(Math.round(p.top)).toBe(100 + 18 + 6);
    expect(Math.round(p.left)).toBe(300);
  });

  it("stops placing once the virtual anchor's context element is gone", () => {
    const context = document.createElement('div');
    document.body.appendChild(context);
    const panel = document.createElement('div');
    panel.style.cssText = 'width:120px;height:40px';
    document.body.appendChild(panel);
    let rect = new DOMRect(40, 40, 2, 18);
    stop = floatPanel(panel, { getBoundingClientRect: () => rect, contextElement: context });
    const before = panel.style.top;
    context.remove();
    rect = new DOMRect(400, 400, 2, 18);
    stop.update();
    expect(panel.style.top).toBe(before);
  });

  it('tells virtual anchors from elements, and resolves their element', () => {
    const el = document.createElement('div');
    const virtual: FloatingVirtualAnchor = {
      getBoundingClientRect: () => new DOMRect(),
      contextElement: el,
    };
    expect(isVirtualAnchor(virtual)).toBe(true);
    expect(isVirtualAnchor(el)).toBe(false);
    expect(isVirtualAnchor(null)).toBe(false);
    expect(resolveAnchor(virtual)).toBe(el);
    expect(resolveAnchor({ getBoundingClientRect: () => new DOMRect() })).toBeNull();
    expect(resolveFloatingTarget(virtual)).toBe(virtual);
    expect(resolveFloatingTarget(new ElementRef(el))).toBe(el);
  });

  it('corrects for a transformed container without the top layer', () => {
    const box = document.createElement('div');
    box.style.cssText =
      'position:fixed;left:60px;top:50px;width:300px;height:200px;transform:translateX(0)';
    document.body.appendChild(box);
    cleanup.push(box);
    const { anchor, panel } = setup('top:10px;left:10px', { w: 100, h: 40 }, box);
    stop = floatPanel(panel, anchor, { topLayer: false, offset: 4 });
    const a = anchor.getBoundingClientRect();
    const p = panel.getBoundingClientRect();
    expect(Math.round(p.top)).toBe(Math.round(a.bottom + 4));
    expect(Math.round(p.left)).toBe(Math.round(a.left));
    expect(panel.style.zIndex).toBe('var(--z-popover)');
  });
});

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthFloatingDirective],
  template: `
    <button #anchor type="button" style="position:fixed;top:10px;left:30px">anchor</button>
    @if (open()) {
      <div
        #panel
        class="panel"
        style="width:120px;height:40px"
        [athFloating]="anchor"
        align="start"
      ></div>
    }
  `,
})
class FloatingHostComponent {
  readonly open = signal(true);
  readonly panel = viewChild<ElementRef<HTMLElement>>('panel');
}

describe('AthFloatingDirective', () => {
  it('floats its host from the anchor and stops on destroy', () => {
    const fixture = TestBed.createComponent(FloatingHostComponent);
    fixture.detectChanges();
    const panel = fixture.componentInstance.panel()!.nativeElement;
    expect(panel.style.position).toBe('fixed');
    expect(panel.dataset['placement']).toBe('bottom');
    if (supportsTopLayer()) expect(panel.matches(':popover-open')).toBe(true);

    fixture.componentInstance.open.set(false);
    fixture.detectChanges();
    expect(fixture.componentInstance.panel()).toBeUndefined();
    fixture.destroy();
  });
});
