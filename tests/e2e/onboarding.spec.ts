import { test, expect } from './helpers/fixtures';

test.describe('Guest onboarding flow', () => {
  test('guest setup page renders with goal selection', async ({ page }) => {
    await page.goto('/guest');
    await expect(page.getByText('Quick setup')).toBeVisible();
    await expect(page.getByText("What's your main goal?")).toBeVisible();
    // All 3 goal buttons should be present
    await expect(page.getByRole('button', { name: /build muscle/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /lose fat/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /stay fit/i })).toBeVisible();
  });

  test('can navigate from goal to experience step', async ({ page }) => {
    await page.goto('/guest');
    await page.getByRole('button', { name: /lose fat/i }).first().click();
    await page.getByRole('button', { name: /^next$/i }).click();
    await expect(page.getByText('Your experience level?')).toBeVisible();
    await expect(page.getByRole('button', { name: /beginner/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /intermediate/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /advanced/i })).toBeVisible();
  });

  test('back button returns to goal step', async ({ page }) => {
    await page.goto('/guest');
    await page.getByRole('button', { name: /build muscle/i }).first().click();
    await page.getByRole('button', { name: /^next$/i }).click();
    await expect(page.getByText('Your experience level?')).toBeVisible();
    await page.getByRole('button', { name: /^back$/i }).click();
    await expect(page.getByText("What's your main goal?")).toBeVisible();
  });

  test('completing setup navigates to dashboard', async ({ page }) => {
    await page.goto('/guest');
    await page.getByRole('button', { name: /stay fit/i }).first().click();
    await page.getByRole('button', { name: /^next$/i }).click();
    await page.getByRole('button', { name: /advanced/i }).first().click();
    await page.getByRole('button', { name: /start training/i }).click();
    await page.waitForURL('/');
    await expect(page).toHaveURL('/');
  });

  test('create account link navigates to onboarding', async ({ page }) => {
    await page.goto('/guest');
    await page.getByRole('button', { name: /create an account/i }).click();
    await expect(page).toHaveURL('/onboarding');
  });
});
