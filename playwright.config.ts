import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [
        // In CI: machine-readable JUnit (for GitHub Actions test summary) + HTML archive
        ['junit', { outputFile: 'test-results/junit.xml' }],
        ['html', { open: 'never', outputFolder: 'playwright-report' }],
        ['list'],  // prints each test result to the Actions log in real time
      ]
    : [
        // Locally: interactive HTML report that auto-opens on failure
        ['html', { open: 'on-failure', outputFolder: 'playwright-report' }],
        ['list'],
      ],

  use: {
    baseURL: process.env.E2E_BASE_URL ?? 'http://localhost:4173',
    // Capture a full trace on first retry — lets you replay every action
    trace: 'on-first-retry',
    // Always capture a screenshot on failure
    screenshot: 'only-on-failure',
    // Record a video on first retry so you can watch what happened
    video: 'on-first-retry',
    // Add the test name to each action in the trace viewer
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  // Serve the production build locally for E2E tests using `vite preview`.
  // This avoids issues with vercel dev's rewrite rules intercepting Vite's
  // internal module routes (/@vite/client, /@react-refresh, etc.).
  // `npm run test:e2e` builds the app first, then this server serves dist/.
  // If E2E_BASE_URL points to a remote deployment (CI Vercel preview), no
  // local server is started.
  webServer: (() => {
    const base = process.env.E2E_BASE_URL ?? '';
    const isRemote = base.startsWith('https://') || (base.startsWith('http://') && !base.includes('localhost'));
    if (isRemote) return undefined;
    return {
      command: 'npx vite preview',
      url: 'http://localhost:4173',
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
    };
  })(),
});
