# Omnexus v1.0 — Final Testing Plan

Pre-ship validation covering bugs, performance, regression, and functional acceptance.
Run this end-to-end before submitting to the App Store / Play Store.

---

## 1. Automated Test Suite

Run first. All must pass before proceeding.

```bash
# Unit tests (must be 29/29 passing)
npm test

# TypeScript — must be 0 errors
npx tsc --noEmit

# ESLint — must be 0 errors
npx eslint src --ext ts,tsx

# E2E tests (requires vercel dev running + .env.test)
npm run test:e2e
```

**Acceptance criteria:** 0 failures in all four commands.

---

## 2. Regression — Core Flows

These are the critical user paths. Test on both web (Chrome) and native (Simulator/emulator) if applicable.

### 2-A · Authentication

| # | Action | Expected |
|---|---|---|
| 1 | Sign up with new email | Account created, lands on / |
| 2 | Sign up with existing email | Clear error message, no crash |
| 3 | Sign in with correct credentials | Lands on / with profile loaded |
| 4 | Sign in with wrong password | Error shown |
| 5 | Sign out | Redirected to /login, session cleared |
| 6 | Refresh page after sign-in | Session restored, no redirect to login |
| 7 | Access /feed as guest | Upgrade prompt shown |
| 8 | Guest setup → enter name + goal | Lands on / as guest |

### 2-B · Workout (highest-risk path)

| # | Action | Expected |
|---|---|---|
| 9 | Start workout from TodayCard | /workout/active opens with correct exercises |
| 10 | Log a set (weight + reps) | Set marked complete, volume updates |
| 11 | Complete workout | Summary modal shown, session saved |
| 12 | PR detected | Gold PR banner + confetti fires |
| 13 | Discard workout | ConfirmDialog appears; cancel keeps session |
| 14 | Refresh mid-workout | Session restored from localStorage |
| 15 | Complete workout offline | Saves locally; syncs when connection returns |
| 16 | RPE input on set | Tap-button row appears, value saved |

### 2-C · Programs

| # | Action | Expected |
|---|---|---|
| 17 | Browse pre-built programs | List renders, goal filter works |
| 18 | Activate a program | Active program updated on dashboard |
| 19 | Program detail — 8-week roadmap | Collapsible section expands/collapses |
| 20 | AI program in custom programs | "AI" badge visible on card + detail header |
| 21 | Custom program builder — save | Program saved, appears in list |

### 2-D · Community

| # | Action | Expected |
|---|---|---|
| 22 | View activity feed | Feed loads, friend sessions visible |
| 23 | React to a session | Emoji added optimistically, persists on refresh |
| 24 | Send friend request | Request appears in recipient's Friends page |
| 25 | Accept friend request | Status changes to "Friends" for both |
| 26 | Leaderboard loads | Rankings show with your own row highlighted |
| 27 | Create challenge (competitive) | Challenge appears in Browse section |
| 28 | Create challenge (Team mode ON) | Purple "Team" badge on card |
| 29 | Join challenge | Card shows "Joined" + moves to "Your Challenges" |
| 30 | Invite friend to challenge | FriendPicker shows; "Invited" state after send |
| 31 | Receive invitation (Realtime) | Banner appears without page refresh |
| 32 | Accept invitation | Joins challenge, banner clears |
| 33 | Decline invitation | Banner clears, status = declined in DB |
| 34 | Expand leaderboard | Rankings load (skeleton → rows); no refetch on reopen |

### 2-E · AI Features

| # | Action | Expected |
|---|---|---|
| 35 | Ask Omnexus — question submitted | Answer appears with medical disclaimer |
| 36 | Ask with OpenAI RAG configured | "Sources used" section appears |
| 37 | Follow-up question | Answer continues conversation context |
| 38 | "Start fresh" resets conversation | New question starts fresh context |
| 39 | AI Insights page | Analysis renders for last 28 days |
| 40 | Pre-workout briefing | Briefing appears when starting workout |
| 41 | Meal plan generator | Plan generated and displayed |

### 2-F · Learn

| # | Action | Expected |
|---|---|---|
| 42 | Browse courses | Course cards render, sorted by goal |
| 43 | Open lesson | Prose renders correctly |
| 44 | Complete quiz | Animated reveal, explanations shown |
| 45 | Progress persists on refresh | Completed lessons still marked |
| 46 | Semantic search (AI-powered) | Results are contextually relevant |

### 2-G · Nutrition + Measurements

| # | Action | Expected |
|---|---|---|
| 47 | Log a meal | Entry appears, macros update |
| 48 | Navigate previous/next day | Date changes, correct logs shown |
| 49 | Set goals | Macro bars reflect new targets |
| 50 | Log body weight | Entry saved, trend chart updates |
| 51 | Delete measurement | ConfirmDialog shown; removes after confirm |

---

## 3. Performance Checks

### 3-A · Page load times (web, cold start)

Target: meaningful paint < 2 seconds on a standard connection.

| Page | Target |
|---|---|
| / (Dashboard) | < 1.5 s |
| /workout/active | < 1 s (resumes immediately from localStorage) |
| /challenges | < 2 s (waits for Supabase) |
| /insights | < 1 s (AI call is on demand) |

**How to measure:** Open DevTools → Network tab → disable cache → reload each page. Check "DOMContentLoaded" and "Finish" times.

### 3-B · Bundle size

```bash
npm run build
# Check dist/assets/*.js — main bundle should be < 500 KB gzipped
ls -lh dist/assets/*.js
```

### 3-C · React renders (no jank)

- Log 10 sets rapidly → no lag, no missed taps
- Scroll through 50+ workout history sessions → no jank
- Search exercise library with fast typing → results appear within 100 ms

### 3-D · Supabase query counts

On `/challenges` page load, open Network tab and verify:
- Exactly 4 parallel queries (challenges, ai_challenges, friendships, invitations) — not sequential
- No N+1 queries on leaderboard expand (single batch, not per-user)

---

## 4. Mobile Device Testing

### 4-A · Native (Capacitor) — iOS Simulator

```bash
npm run build
npx cap sync
npx cap open ios   # opens Xcode
# Run on iPhone 15 simulator (iOS 17)
```

Checklist:
- [ ] App launches without crash
- [ ] Safe area insets correct (no content hidden under notch/home indicator)
- [ ] Status bar visible in dark slate color
- [ ] Splash screen dismisses cleanly
- [ ] Back gesture (swipe from left) works
- [ ] Haptics fire on set completion + PR
- [ ] Keyboard dismisses properly in forms
- [ ] Health widget shows (if HealthKit permission granted)

### 4-B · Native (Capacitor) — Android Emulator

```bash
npx cap open android   # opens Android Studio
# Run on Pixel 7 API 34 emulator
```

Checklist:
- [ ] App launches without crash
- [ ] System back button navigates correctly (not exits app)
- [ ] Status bar overlay correct
- [ ] Safe area respects navigation bar at bottom

### 4-C · Web responsive (375px viewport)

Open Chrome DevTools → toggle device toolbar → iPhone 14 Pro preset (390×844).

- [ ] All 5 bottom nav tabs visible without text truncation
- [ ] Challenge create form usable (not overflowing)
- [ ] Workout set row fits on one line
- [ ] No horizontal scroll anywhere

---

## 5. Edge Cases + Boundary Tests

| Scenario | Expected behavior |
|---|---|
| No internet connection | App loads from localStorage cache; AI features show graceful error |
| Supabase is down | Workout saved locally; toast warns about sync failure |
| AI endpoint times out (> 9s) | Error shown; no infinite spinner |
| Rate limit hit (21st request in 10 min) | 429 error displayed to user |
| CORS mismatch (wrong ALLOWED_ORIGIN) | API returns 403, client shows error toast |
| Guest accesses /friends | Upgrade prompt shown, no crash |
| Challenge with no participants | "No participants yet" shown in leaderboard |
| Invite same friend twice | Second invite silently ignored (no error toast) |
| Challenge past end date | Join button hidden; card shows as inactive |
| Program with 0 exercises in a day | Empty day shown gracefully |
| 0 workout history | History page shows empty state (not crash) |

---

## 6. Security Smoke Tests

| Check | How to verify |
|---|---|
| API keys not in browser | DevTools → Sources → search for "sk-" or "phc_" or "service_role" — should find nothing |
| Rate limiting active | Make 21 rapid POST /api/ask requests → 21st returns HTTP 429 |
| Bearer token required | curl -X DELETE /api/delete-account (no auth header) → 401 |
| SQL injection in challenge name | Create challenge named `'; DROP TABLE challenges; --` → stored literally, no error |
| XSS in challenge name | Create challenge named `<script>alert(1)</script>` → rendered as text, not executed |
| CORS headers correct | curl -H "Origin: https://evil.com" /api/ask → response should NOT have Access-Control-Allow-Origin: https://evil.com |

---

## 7. Final Pre-Ship Checklist

- [ ] All automated tests pass (unit + TSC + lint + E2E)
- [ ] Regression matrix complete (sections 2-A through 2-G)
- [ ] Performance targets met
- [ ] Both Supabase SQL migrations for Sprint 6 run in production
- [ ] All env vars set in Vercel: ANTHROPIC_API_KEY, OPENAI_API_KEY, SUPABASE_SERVICE_ROLE_KEY, ALLOWED_ORIGIN, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN, SEED_SECRET
- [ ] PostHog: VITE_POSTHOG_KEY set if analytics enabled
- [ ] Privacy Policy page accessible at /privacy
- [ ] Cookie consent banner fires on first visit
- [ ] "Export my data" and "Delete account" tested in production (not just locally)
- [ ] Push notifications tested on a physical device
- [ ] App Store / Play Store metadata and screenshots prepared (see STORE-SUBMISSION.md)
