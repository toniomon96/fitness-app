import { test, expect } from './helpers/fixtures';
import { enterAsGuest } from './helpers/auth';

test.describe('Programs', () => {
  test.beforeEach(async ({ page }) => {
    await enterAsGuest(page);
  });

  test('shows programs list', async ({ page }) => {
    await page.goto('/programs');
    await expect(page.getByRole('heading', { name: /^programs$/i })).toBeVisible();
    // At least one program card should exist
    await expect(page.locator('[data-testid="program-card"]').first()).toBeVisible({ timeout: 5_000 });
  });

  test('opens program detail page', async ({ page }) => {
    await page.goto('/programs');
    await page.locator('[data-testid="program-card"]').first().click();
    await page.waitForURL(/\/programs\/.+/);
    // Should show activate button or "active program" badge
    await expect(page.getByRole('button', { name: /activate/i }).or(page.getByText(/active program/i))).toBeVisible({ timeout: 5_000 });
  });

  test('can activate a program', async ({ page }) => {
    await page.goto('/programs');
    await page.locator('[data-testid="program-card"]').first().click();
    await page.waitForURL(/\/programs\/.+/);

    const activateBtn = page.getByRole('button', { name: /activate program/i });
    const activeBadge = page.getByText(/this is your active program/i);
    // Wait for the page to fully render one of the two states
    await expect(activateBtn.or(activeBadge)).toBeVisible({ timeout: 5_000 });

    if (await activateBtn.isVisible()) {
      await activateBtn.click();
      await page.waitForURL('/');
    } else {
      await expect(activeBadge).toBeVisible();
    }
  });

  test('program detail shows weekly schedule', async ({ page }) => {
    await page.goto('/programs');
    await page.locator('[data-testid="program-card"]').first().click();
    await page.waitForURL(/\/programs\/.+/);
    await expect(page.getByRole('heading', { name: /weekly schedule/i })).toBeVisible();
  });

  test('program detail shows 8-week roadmap for AI programs', async ({ page }) => {
    await page.goto('/programs');
    // Check if any AI-generated program exists
    const aiTag = page.getByText(/ai-generated/i).first();
    if (await aiTag.isVisible({ timeout: 2_000 }).catch(() => false)) {
      await aiTag.click();
      await page.waitForURL(/\/programs\/.+/);
      await expect(page.getByText(/8-week roadmap/i)).toBeVisible();
    } else {
      test.skip(); // No AI programs yet — skip
    }
  });
});
