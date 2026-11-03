import { defineConfig } from '@playwright/test';

// Catalogue checks over the built Storybook (quality step 1.8b): axe on every
// story and screenshot comparison in light and dark at three widths, plus
// pixel and geometry probes (paint.spec.ts). Run with
// `npm run test:storybook` after `npm run build-storybook`.
const port = Number(process.env['STORYBOOK_PORT'] ?? 6007);
const ci = !!process.env['CI'];

export default defineConfig({
  testDir: '.',
  testMatch: ['catalogue.spec.ts', 'paint.spec.ts'],
  globalTeardown: './global-teardown.ts',
  fullyParallel: true,
  forbidOnly: ci,
  retries: 0,
  workers: ci ? 3 : 6,
  timeout: 60_000,
  reporter: ci
    ? [['list'], ['html', { open: 'never', outputFolder: '../../test-results/storybook-report' }]]
    : [['list']],
  outputDir: '../../test-results/storybook',
  // Baselines live next to the spec, one folder per platform: font
  // rasterisation differs between macOS and Linux (see README).
  snapshotPathTemplate: '{testDir}/__screenshots__/{platform}/{arg}{ext}',
  expect: {
    toHaveScreenshot: {
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
      // Anti-aliasing noise only; a changed colour, border or text fails.
      threshold: 0.2,
      maxDiffPixelRatio: 0.002,
    },
  },
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    browserName: 'chromium',
    locale: 'en-GB',
    timezoneId: 'UTC',
    colorScheme: 'light',
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
    trace: 'off',
  },
  webServer: {
    command: `node tests/storybook/serve.mjs ${port}`,
    cwd: '../..',
    url: `http://127.0.0.1:${port}/index.json`,
    reuseExistingServer: !ci,
    timeout: 30_000,
  },
});
