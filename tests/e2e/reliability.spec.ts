import { test, expect } from './helpers/fixtures';
import { signIn, TEST_USER } from './helpers/auth';

const hasRealCredentials =
  !!process.env.E2E_TEST_EMAIL &&
  process.env.E2E_TEST_EMAIL !== 'e2e-test@your-domain.com' &&
  process.env.E2E_TEST_EMAIL !== 'e2e-test@omnexus.test';

test.describe('Reliability flows', () => {
  test('guest migration prompt can be dismissed and recovered from profile', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Authenticated desktop flow only');
    test.skip(!hasRealCredentials, 'Requires real E2E_TEST_EMAIL / E2E_TEST_PASSWORD credentials');

    const destination = await signIn(page);
    test.skip(destination === 'unavailable', 'Auth sign-in unavailable in this environment');
    test.skip(destination === 'onboarding', 'Test account still requires onboarding');

    await page.evaluate((email: string) => {
      const guest = {
        id: 'guest_migration_e2e',
        name: 'Guest Import',
        goal: 'hypertrophy',
        experienceLevel: 'intermediate',
        onboardedAt: new Date().toISOString(),
        theme: 'dark',
        isGuest: true,
      };

      const history = {
        sessions: [
          {
            id: 'guest-session-1',
            programId: 'quick-log',
            trainingDayIndex: 0,
            startedAt: new Date().toISOString(),
            completedAt: new Date().toISOString(),
            durationSeconds: 1200,
            exercises: [],
            totalVolumeKg: 600,
          },
        ],
        personalRecords: [
          {
            exerciseId: 'barbell-bench-press',
            weight: 100,
            reps: 5,
            achievedAt: new Date().toISOString(),
            sessionId: 'guest-session-1',
          },
        ],
      };

      localStorage.setItem('omnexus_guest', JSON.stringify(guest));
      localStorage.setItem('fit_history', JSON.stringify(history));
      localStorage.setItem('omnexus_learning_progress', JSON.stringify({
        completedLessons: ['lesson-1'],
        completedModules: [],
        completedCourses: [],
        quizScores: {},
        lastActivityAt: new Date().toISOString(),
      }));
      localStorage.setItem('omnexus_guest_migration_dismissed_v1', JSON.stringify({}));
      localStorage.setItem('omnexus_cookie_consent', 'accepted');

      const rawUser = localStorage.getItem('fit_user');
      if (rawUser) {
        const user = JSON.parse(rawUser) as { id?: string; email?: string };
        if (user?.id) {
          localStorage.setItem('omnexus_guest_migration_dismissed_v1', JSON.stringify({ [user.id]: undefined }));
        }
      }

      sessionStorage.setItem('e2e-seeded-email', email);
    }, TEST_USER.email);

    await page.goto('/');

    await expect(page.getByRole('heading', { name: /bring your guest progress with you/i })).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText(/training history/i)).toBeVisible();

    await page.getByRole('button', { name: /maybe later/i }).click();
    await expect(page.getByRole('heading', { name: /bring your guest progress with you/i })).not.toBeVisible();

    await page.goto('/profile');
    await expect(page.getByText(/guest progress found/i)).toBeVisible({ timeout: 10_000 });
    await expect(page.getByRole('button', { name: /import guest progress/i })).toBeVisible();
  });

  test('authenticated community hydration failure shows recovery screen', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Authenticated desktop flow only');
    test.skip(!hasRealCredentials, 'Requires real E2E_TEST_EMAIL / E2E_TEST_PASSWORD credentials');

    const destination = await signIn(page);
    test.skip(destination === 'unavailable', 'Auth sign-in unavailable in this environment');
    test.skip(destination === 'onboarding', 'Test account still requires onboarding');

    await page.evaluate(() => {
      localStorage.removeItem('fit_user');
    });

    await page.route('**/rest/v1/profiles*', async (route) => {
      await route.abort('failed');
    });

    await page.goto('/community');

    await expect(page.getByRole('heading', { name: /we could not load your community profile/i })).toBeVisible({ timeout: 10_000 });
    await expect(page.getByRole('button', { name: /retry loading/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /refresh app/i })).toBeVisible();
  });
});