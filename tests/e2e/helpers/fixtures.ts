import { test as base, type Page } from '@playwright/test';

/**
 * Extended Playwright test fixtures for Omnexus E2E tests.
 *
 * Automatically pre-accepts the cookie consent banner by setting
 * `omnexus_cookie_consent` in localStorage before each page load via
 * addInitScript — so no test has to manually dismiss the banner.
 */
export const test = base.extend<{ page: Page }>({
  page: async ({ page }, use) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('omnexus_cookie_consent', 'accepted');
    });
    await use(page);
  },
});

export { expect } from '@playwright/test';
