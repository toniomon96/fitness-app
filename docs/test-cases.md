# Omnexus — E2E Test Cases

This document is the human-readable registry of all Playwright E2E tests.
Keep this in sync with the test files as you add or change tests.

---

## How to run

```bash
npm run test:e2e            # headless (CI-style)
npm run test:e2e:headed     # watch the browser live
npm run test:e2e:ui         # interactive UI with time-travel debugger
npm run test:e2e:report     # open last HTML report
```

## How to read a failure report

When a test fails, Playwright captures evidence automatically:

| Evidence | Where to find it | What it shows |
|----------|-----------------|---------------|
| Screenshot | `test-results/<test-name>/` | Exact state of the screen at failure |
| Video | `test-results/<test-name>/` | Full recording of the test run |
| Trace | `test-results/<test-name>/` | Every network request + DOM snapshot, replayable in the trace viewer |

**Open the trace viewer:**
```bash
npx playwright show-trace test-results/<test-name>/trace.zip
```
This gives you a full timeline of every click, navigation, and network call.

**Open the HTML report:**
```bash
npm run test:e2e:report
```

**On GitHub Actions:** if a test fails, go to the workflow run → expand the
`e2e` job → the "E2E Test Results" check shows a per-test pass/fail table.
Download the `playwright-report-<run-id>` artifact for the full report + traces.

---

## Annotating a test

Every test should have at minimum a `feature` annotation.
Add a `severity` annotation for anything that would block a release if broken.
Add a `description` annotation for non-obvious behaviour being tested.

```typescript
test('my test', async ({ page }) => {
  test.info().annotations.push({ type: 'feature', description: 'Auth' });
  test.info().annotations.push({ type: 'severity', description: 'critical' }); // critical | high | medium | low
  test.info().annotations.push({ type: 'description', description: 'Why this behaviour matters' });

  await test.step('step name shown in report', async () => {
    // test code
  });
});
```

Severity levels:
- **critical** — app is unusable if this breaks (login, start workout, complete workout)
- **high** — significant feature broken (session restore, program activate)
- **medium** — noticeable but workaround exists (filter, search)
- **low** — minor UI or edge case

---

## Test inventory

### auth.spec.ts — Feature: Auth / Guest

| Test | Severity | What it verifies |
|------|----------|-----------------|
| shows login page at /login | — | Email + password fields render |
| shows error for wrong credentials | critical | Invalid login shows error, not crash |
| redirects unauthenticated users from / to /login | critical | Route guard works |
| signs in and lands on dashboard | critical | Happy-path login end-to-end |
| sign out clears session and redirects to login | — | Session is fully cleared on sign out |
| shows guest setup page at /guest | — | Guest entry point renders |
| guest user lands on dashboard after setup | critical | Guest flow end-to-end |
| guest user data persists on refresh | high | localStorage guest state survives reload |

---

### navigation.spec.ts — Feature: Navigation

| Test | Severity | What it verifies |
|------|----------|-----------------|
| Home tab navigates to / | — | Bottom nav Home tab works |
| Learn tab navigates to /learn | — | Bottom nav Learn tab works |
| Insights tab navigates to /insights | — | Bottom nav Insights tab works |
| Library tab navigates to /library | — | Bottom nav Library tab works |
| History tab navigates to /history | — | Bottom nav History tab works |
| back button on program detail returns to /programs | — | TopBar back navigation works |
| back button on exercise detail returns to /library | — | TopBar back navigation works |

---

### programs.spec.ts — Feature: Programs

| Test | Severity | What it verifies |
|------|----------|-----------------|
| shows programs list | — | /programs page renders with content |
| opens program detail page | — | Clicking a program navigates to detail |
| can activate a program | critical | Activation sets active program + redirects |
| program detail shows weekly schedule | — | Schedule section renders |
| program detail shows 8-week roadmap for AI programs | — | weeklyProgressionNotes section renders |

---

### workout.spec.ts — Feature: Workout / History

| Test | Severity | What it verifies |
|------|----------|-----------------|
| start workout from dashboard | critical | Start workout button navigates to active workout |
| active workout shows exercises | critical | Exercises from the program appear in the workout |
| can discard workout with confirmation dialog | high | Discard requires confirmation (no accidental loss) |
| active session restores on page refresh | critical | localStorage session survives hard refresh |
| history page loads for new users | — | /history renders without errors when empty |

---

### library.spec.ts — Feature: Library

| Test | Severity | What it verifies |
|------|----------|-----------------|
| shows exercise list at /library | — | /library renders with content |
| search filters exercises | — | Search input filters the exercise list |
| exercise detail page shows instructions | — | Clicking an exercise navigates to detail |
| can filter by muscle group | — | Muscle group chips filter the list |

---

### learn.spec.ts — Feature: Learn

| Test | Severity | What it verifies |
|------|----------|-----------------|
| shows learn page with courses | — | /learn renders with course cards |
| can open a course | — | Clicking a course navigates to it |
| semantic search returns results | — | Search input returns AI-relevant results |

---

## How to add a new test

1. Find the relevant `*.spec.ts` file (or create a new one for a new feature area)
2. Add the test with `test.step()` blocks and annotations
3. Add a row to the table in this document
4. Run `npm run test:e2e:headed` locally to verify it passes

## How to investigate a failure

1. Run `npm run test:e2e:headed` — watch the browser execute the failing test
2. If the failure is intermittent, run `npm run test:e2e:ui` — the Playwright UI
   lets you step through each action and inspect the DOM at any point
3. Check the screenshot: `test-results/<test-name>/<browser>/test-failed-1.png`
4. Open the trace: `npx playwright show-trace test-results/<test-name>/trace.zip`
5. Add a `console.log` or `await page.pause()` inside the test to halt execution
   and inspect the page manually (only works with `--headed` or `--ui`)
