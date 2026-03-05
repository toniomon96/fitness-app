import { test, expect } from './helpers/fixtures';
import { enterAsGuest } from './helpers/auth';

test.describe('Dashboard — guest', () => {
  test.beforeEach(async ({ page }) => {
    await enterAsGuest(page);
  });

  test('shows greeting on dashboard', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByText(/good (morning|afternoon|evening)/i),
    ).toBeVisible({ timeout: 5_000 });
  });

  test('displays streak section', async ({ page }) => {
    await page.goto('/');
    // StreakDisplay renders even at 0 — look for the streak area or day dots
    await expect(
      page.getByText(/streak|day/i).first(),
    ).toBeVisible({ timeout: 5_000 });
  });

  test('AI Insights card links to /insights', async ({ page }) => {
    await page.goto('/');
    const insightsCard = page.getByText('AI Insights');
    await expect(insightsCard).toBeVisible();
    await insightsCard.click();
    await expect(page).toHaveURL('/insights');
  });

  test('profile button navigates to /profile', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /profile/i }).click();
    await expect(page).toHaveURL('/profile');
  });

  test('no-program card shows Get Started button', async ({ page }) => {
    // A fresh guest has no active program, so the prompt card should appear
    await page.goto('/');
    await expect(
      page.getByRole('button', { name: /get started/i }),
    ).toBeVisible({ timeout: 5_000 });
  });

  test('Get Started button navigates to /train', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /get started/i }).click();
    await expect(page).toHaveURL('/train');
  });
});
