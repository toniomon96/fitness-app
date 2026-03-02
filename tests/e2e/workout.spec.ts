import { test, expect } from './helpers/fixtures';
import { enterAsGuest } from './helpers/auth';

test.describe('Workout flow', () => {
  test.beforeEach(async ({ page }) => {
    await enterAsGuest(page);
    await page.evaluate(() => localStorage.removeItem('fit_active_session'));
  });

  test('start workout from dashboard', async ({ page }) => {
    test.info().annotations.push({ type: 'feature', description: 'Workout' });
    test.info().annotations.push({ type: 'severity', description: 'critical' });

    await test.step('navigate to dashboard', () => page.goto('/'));

    await test.step('click start workout', async () => {
      const startBtn = page.getByRole('button', { name: /start workout|begin/i })
        .or(page.getByRole('link', { name: /start workout|begin/i }));
      await expect(startBtn.first()).toBeVisible({ timeout: 5_000 });
      await startBtn.first().click();
    });

    await test.step('verify landed on workout page', () =>
      page.waitForURL(/\/(workout\/active|briefing)/),
    );
  });

  test('active workout shows exercises', async ({ page }) => {
    test.info().annotations.push({ type: 'feature', description: 'Workout' });
    test.info().annotations.push({ type: 'severity', description: 'critical' });

    await test.step('navigate to dashboard and start workout', async () => {
      await page.goto('/');
      const startBtn = page.getByRole('button', { name: /start workout|begin/i })
        .or(page.getByRole('link', { name: /start workout|begin/i }));
      await startBtn.first().click();
      await page.waitForURL(/\/workout\/active/);
    });

    await test.step('verify at least one exercise is visible', async () => {
      await expect(
        page.locator('[data-testid="exercise-block"]').first(),
      ).toBeVisible({ timeout: 5_000 });
    });
  });

  test('can discard workout with confirmation dialog', async ({ page }) => {
    test.info().annotations.push({ type: 'feature', description: 'Workout' });
    test.info().annotations.push({ type: 'severity', description: 'high' });

    await test.step('start a workout', async () => {
      await page.goto('/');
      const startBtn = page.getByRole('button', { name: /start workout|begin/i })
        .or(page.getByRole('link', { name: /start workout|begin/i }));
      await startBtn.first().click();
      await page.waitForURL(/\/workout\/active/);
    });

    await test.step('click discard button', async () => {
      await page.getByRole('button', { name: /discard workout/i }).click();
    });

    await test.step('verify confirmation dialog appears', async () => {
      await expect(page.getByRole('dialog')).toBeVisible({ timeout: 3_000 });
    });

    await test.step('confirm discard', async () => {
      await page.getByRole('button', { name: /^discard$/i }).click();
    });

    await test.step('verify no longer on active workout page', () =>
      page.waitForURL(/^(?!.*workout\/active).*/),
    );
  });

  test('active session restores on page refresh', async ({ page }) => {
    test.info().annotations.push({ type: 'feature', description: 'Workout' });
    test.info().annotations.push({ type: 'severity', description: 'critical' });
    test.info().annotations.push({ type: 'description', description: 'localStorage-backed session must survive a hard refresh so users never lose work' });

    await test.step('start a workout', async () => {
      await page.goto('/');
      const startBtn = page.getByRole('button', { name: /start workout|begin/i })
        .or(page.getByRole('link', { name: /start workout|begin/i }));
      await startBtn.first().click();
      await page.waitForURL(/\/workout\/active/);
    });

    await test.step('reload the page', () => page.reload());

    await test.step('verify session was restored', () =>
      page.waitForURL(/\/workout\/active/, { timeout: 5_000 }),
    );
  });
});

test.describe('Workout history', () => {
  test.beforeEach(async ({ page }) => {
    await enterAsGuest(page);
  });

  test('history page loads for new users', async ({ page }) => {
    test.info().annotations.push({ type: 'feature', description: 'History' });

    await test.step('navigate to history', () => page.goto('/history'));

    await test.step('verify page renders (empty state or sessions)', async () => {
      await expect(
        page.getByText(/no workouts|start your first|workout history/i)
          .or(page.locator('[data-testid="session-card"]').first()),
      ).toBeVisible({ timeout: 5_000 });
    });
  });
});
