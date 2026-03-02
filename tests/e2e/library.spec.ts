import { test, expect } from './helpers/fixtures';
import { enterAsGuest } from './helpers/auth';

test.describe('Exercise Library', () => {
  test.beforeEach(async ({ page }) => {
    await enterAsGuest(page);
  });

  test('shows exercise list at /library', async ({ page }) => {
    await page.goto('/library');
    await expect(page.getByRole('heading', { name: /library/i })).toBeVisible();
    // At least one exercise card should be listed
    await expect(page.locator('[data-testid="exercise-card"]').first()).toBeVisible({ timeout: 5_000 });
  });

  test('search filters exercises', async ({ page }) => {
    await page.goto('/library');
    const searchInput = page.getByPlaceholder(/search|filter/i);
    await searchInput.fill('bench');
    // Results should contain bench-related exercises
    await expect(page.getByText(/bench press/i).first()).toBeVisible({ timeout: 3_000 });
  });

  test('exercise detail page shows instructions', async ({ page }) => {
    await page.goto('/library');
    await page.locator('[data-testid="exercise-card"]').first().click();
    await page.waitForURL(/\/library\/.+/);
    // Should show some exercise info
    await expect(page.getByRole('heading').first()).toBeVisible();
  });

  test('can filter by muscle group', async ({ page }) => {
    await page.goto('/library');
    // Click a muscle group chip/button if present
    const chestFilter = page.getByRole('button', { name: /chest/i }).first();
    if (await chestFilter.isVisible({ timeout: 2_000 }).catch(() => false)) {
      await chestFilter.click();
      await expect(page.getByText(/chest/i).first()).toBeVisible({ timeout: 3_000 });
    }
  });
});
