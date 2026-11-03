import { expect, test, type Page } from '@playwright/test';

/**
 * What the computed style cannot show: pixels and geometry in the built
 * catalogue. A ring that is set but painted under the neighbour, or figures
 * that drift apart in a strip, pass every style assertion in the unit specs.
 */

const THEMES = ['light', 'dark'] as const;

test.use({ deviceScaleFactor: 2 });

async function open(page: Page, id: string, theme: string, width = 1280): Promise<void> {
  await page.setViewportSize({ width, height: 800 });
  await page.goto(`/iframe.html?id=${id}&viewMode=story&globals=theme:${theme}`);
  await page.locator('#storybook-root > *').first().waitFor();
  await page.evaluate(() => document.fonts.ready);
}

/** RGB of a CSS colour as the canvas paints it (any colour syntax). */
function rgbOf(page: Page, selector: string, value: string): Promise<number[]> {
  return page.evaluate(
    ([sel, val]) => {
      const probe = document.createElement('span');
      probe.style.color = val;
      document.querySelector(sel)!.append(probe);
      const colour = getComputedStyle(probe).color;
      probe.remove();
      const ctx = new OffscreenCanvas(1, 1).getContext('2d')!;
      ctx.fillStyle = colour;
      ctx.fillRect(0, 0, 1, 1);
      return Array.from(ctx.getImageData(0, 0, 1, 1).data.slice(0, 3));
    },
    [selector, value]
  );
}

/** RGB of device pixels in a page screenshot. */
async function pixels(page: Page, points: { x: number; y: number }[]): Promise<number[][]> {
  const png = (await page.screenshot({ scale: 'device' })).toString('base64');
  return page.evaluate(
    async ([data, pts]) => {
      const bitmap = await createImageBitmap(
        await (await fetch(`data:image/png;base64,${data}`)).blob()
      );
      const ctx = new OffscreenCanvas(bitmap.width, bitmap.height).getContext('2d')!;
      ctx.drawImage(bitmap, 0, 0);
      return pts.map(({ x, y }) => Array.from(ctx.getImageData(x, y, 1, 1).data.slice(0, 3)));
    },
    [png, points] as const
  );
}

const near = (a: number[], b: number[]) => a.every((v, i) => Math.abs(v - b[i]) <= 6);

for (const id of [
  'display-avatar-stack--small-similar-initials',
  'display-avatar-stack--overflow',
  'display-avatar-stack--right-to-left',
]) {
  for (const theme of THEMES) {
    test(`avatar stack ring is painted over the previous avatar: ${id} ${theme}`, async ({
      page,
    }) => {
      await open(page, id, theme);
      const ring = await rgbOf(page, 'ath-avatar-stack', 'var(--avatar-stack-ring)');
      const boxes = await page
        .locator('ath-avatar-stack .ath-stack__item, ath-avatar-stack .ath-stack__more')
        .evaluateAll((els) =>
          els.map((el) => {
            const r = el.getBoundingClientRect();
            return { left: r.left, right: r.right, mid: r.top + r.height / 2 };
          })
        );
      expect(boxes.length).toBeGreaterThan(2);
      const rtl = await page
        .locator('ath-avatar-stack')
        .evaluate((el) => getComputedStyle(el).direction === 'rtl');
      // 1 CSS px outside each later item's start edge: inside its 2px ring
      // and inside the earlier avatar's circle, so the ring colour only
      // shows if it is on top.
      const points = boxes.slice(1).map((b, i) => {
        const prev = boxes[i];
        const overlap = rtl ? b.right - prev.left : prev.right - b.left;
        expect(overlap, 'overlap wider than the ring').toBeGreaterThan(2);
        const x = rtl ? b.right + 1 : b.left - 1;
        return { x: Math.round(x * 2), y: Math.round(b.mid * 2) };
      });
      const seen = await pixels(page, points);
      for (const [i, rgb] of seen.entries()) {
        expect(near(rgb, ring), `item ${i + 1}: ${rgb} vs ring ${ring}`).toBe(true);
      }
    });
  }
}

for (const [id, width] of [
  ['display-kpi-tile--strip', 1280],
  ['display-kpi-tile--strip', 375],
  ['display-kpi-tile--notes-and-loading', 1280],
] as const) {
  test(`kpi figures share one line per row: ${id} ${width}`, async ({ page }) => {
    await open(page, id, 'light', width);
    for (const strip of await page.locator('ath-kpi-strip').all()) {
      // Grouped by row: a narrow strip wraps to two (and the second row's
      // hairline moves its figures down by 1px, which is fine).
      const rows = await strip.locator('ath-kpi-tile').evaluateAll((tiles) => {
        const byRow = new Map<number, number[]>();
        for (const t of tiles) {
          const row = Math.round(t.getBoundingClientRect().top);
          const top = t.querySelector('.ath-kpi__value')!.getBoundingClientRect().top;
          byRow.set(row, [...(byRow.get(row) ?? []), Math.round(top)]);
        }
        return [...byRow.values()];
      });
      for (const tops of rows) {
        expect(new Set(tops).size, `value tops ${tops.join(', ')}`).toBe(1);
      }
    }
  });
}
