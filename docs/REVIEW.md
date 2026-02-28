# Omnexus — Current State & Architecture Reference

> **Updated:** February 2026
> **Scope:** Full codebase documentation — architecture, features, code quality, security, performance, deployment, and roadmap.

---

## Table of Contents

1. [Application Overview](#1-application-overview)
2. [Architecture](#2-architecture)
3. [Features & Routes](#3-features--routes)
4. [Code Quality](#4-code-quality)
5. [Security](#5-security)
6. [Performance](#6-performance)
7. [Deployment](#7-deployment)
8. [Known Gaps & Roadmap](#8-known-gaps--roadmap)

---

## 1. Application Overview

**Omnexus** is a mobile-first AI fitness platform. Users track workouts, follow structured training programs, get AI-powered coaching, read research, and connect with other athletes.

| Feature Area | Description |
|---|---|
| **Workout Tracking** | Logs sets, reps, weight, and RPE. Auto-detects PRs via Epley 1RM formula with confetti celebration. |
| **Training Programs** | Pre-built and custom-built programs with day-by-day scheduling, progression, and an in-app builder. |
| **AI Q&A** | Ask Omnexus any fitness question — powered by Claude. Maintains conversation context, shows follow-up chips, context limit indicator at 4 exchanges. |
| **AI Training Insights** | Analyzes last 4 weeks of workout data and returns personalized training observations and recommendations. |
| **Learning System** | Structured courses → modules → lessons with quiz scoring, completion tracking, and animated answer reveal. |
| **Research Feed** | Live PubMed articles across 7 categories with 6-hour client-side caching. |
| **Community** | Friends, activity feed with emoji reactions, weekly leaderboard, challenges. Supabase Realtime pushes live updates. |
| **Nutrition Tracking** | Daily macro logging with progress bars, date navigator, food search, and goal management. |
| **Measurements** | Track body metrics (weight, body fat, etc.) over time with confirm-on-delete. |
| **Push Notifications** | Opt-in Web Push via VAPID. Friend workout alerts + daily motivational reminders via Vercel cron. |
| **Shareable Cards** | Canvas-generated 1080×1080 PNG cards for PRs and weekly recaps. Web Share API + download fallback. |
| **Guest Mode** | Try the app without an account. Auth-only features show upgrade prompts. |
| **Dark Mode** | Full dark theme; persisted to localStorage. |

**Tech Stack:** React 19 · TypeScript 5.7 · Vite 6 · Tailwind CSS 4 · Supabase (Auth + PostgreSQL + Realtime) · Vercel Serverless + Crons · Claude API (`claude-sonnet-4-6`) · PubMed E-utilities

---

## 2. Architecture

```
┌──────────────────────────────────────────────────────┐
│                   Browser (Client)                   │
│                                                      │
│  React SPA                                           │
│  ├── Context API + useReducer  (AppContext)          │
│  ├── AuthContext               (Supabase session)    │
│  ├── ToastContext              (in-app notifications)│
│  ├── localStorage              (cache + guest data)  │
│  └── public/sw.js             (Web Push handler)    │
└──────────────────────┬───────────────────────────────┘
                       │ fetch()
         ┌─────────────┼─────────────────┐
         ▼             ▼                 ▼
┌─────────────┐  ┌──────────────┐  ┌────────────────┐
│   Vercel    │  │  Supabase    │  │   Supabase     │
│ Serverless  │  │  PostgreSQL  │  │   Realtime     │
│             │  │  + Auth      │  │ (feed/chall.)  │
│ /api/ask    │  │  + RLS       │  └────────────────┘
│ /api/insights│  └──────────────┘
│ /api/articles│
│ /api/notify-friends
│ /api/daily-reminder  (cron 9am UTC)
│ /api/weekly-digest   (cron Mon 8am UTC)
└─────────────┘
```

### Data Flow

1. **Auth** — `AuthContext` listens to `supabase.auth.onAuthStateChange`. On sign-in, `AuthGuard` runs a one-time localStorage → Supabase migration, then fetches history, learning progress, and custom programs to hydrate `AppContext`.
2. **Writes** — Workout completions sync to Supabase via `upsertSession` + `upsertPersonalRecords` (fire-and-forget). All write helpers throw descriptive errors on failure; callers display them via the toast system.
3. **Learning sync** — Learning progress is debounced 2 seconds before syncing to avoid excessive writes during quiz sessions.
4. **Reads** — App boots from localStorage immediately (instant startup), then reconciles with Supabase data in the background.
5. **Community** — Feed and challenges use Supabase Realtime subscriptions that refresh on INSERT events.

### Key Directories

```
src/
├── api/              Vercel serverless functions
├── components/       UI + feature components (by domain)
│   ├── community/
│   ├── dashboard/
│   ├── exercise-library/
│   ├── history/
│   ├── layout/         AppShell, TopBar, BottomNav
│   ├── learn/
│   ├── programs/
│   ├── ui/             Button, Card, Modal, Toast, Skeleton, ConfirmDialog, …
│   └── workout/
├── contexts/         ToastContext, AuthContext
├── data/             Static exercises + programs
├── hooks/            useWorkoutSession, useRestTimer, useLearningProgress
├── lib/              supabase.ts, db.ts, dataMigration.ts, pushSubscription.ts
├── pages/            One file per route
├── services/         claudeService.ts (AI calls)
├── store/            AppContext.tsx (global state + reducer)
├── types/            index.ts (all interfaces)
└── utils/            volumeUtils, programUtils, dateUtils, localStorage, shareCard
```

---

## 3. Features & Routes

### Route Table

| Path | Page | Guard |
|---|---|---|
| `/login` | LoginPage | Public (redirects if authed) |
| `/onboarding` | OnboardingPage | Public (redirects if authed) |
| `/guest` | GuestSetupPage | Public |
| `/` | DashboardPage | GuestOrAuthGuard |
| `/profile` | ProfilePage | GuestOrAuthGuard |
| `/programs` | ProgramsPage | GuestOrAuthGuard |
| `/programs/builder` | ProgramBuilderPage | GuestOrAuthGuard |
| `/programs/:id` | ProgramDetailPage | GuestOrAuthGuard |
| `/library` | ExerciseLibraryPage | GuestOrAuthGuard |
| `/library/:id` | ExerciseDetailPage | GuestOrAuthGuard |
| `/workout/active` | ActiveWorkoutPage | GuestOrAuthGuard |
| `/history` | HistoryPage | GuestOrAuthGuard |
| `/learn` | LearnPage | GuestOrAuthGuard |
| `/learn/:courseId` | CourseDetailPage | GuestOrAuthGuard |
| `/learn/:courseId/:moduleId` | ModuleDetailPage | GuestOrAuthGuard |
| `/insights` | InsightsPage | GuestOrAuthGuard |
| `/ask` | AskPage | GuestOrAuthGuard |
| `/nutrition` | NutritionPage | GuestOrAuthGuard |
| `/measurements` | MeasurementsPage | GuestOrAuthGuard |
| `/feed` | ActivityFeedPage | **AuthOnlyGuard** |
| `/friends` | FriendsPage | **AuthOnlyGuard** |
| `/leaderboard` | LeaderboardPage | **AuthOnlyGuard** |
| `/challenges` | ChallengesPage | **AuthOnlyGuard** |

### Bottom Nav (5 tabs)

Home · Learn · Insights · Library · History

Community (`/feed`) and Nutrition (`/nutrition`) are accessible via Dashboard quick-action grid.

### Supabase Tables

| Table | Purpose |
|---|---|
| `profiles` | User profile (name, goal, experience level) |
| `workout_sessions` | Completed sessions with exercises, sets, and volume |
| `personal_records` | Best lifts per exercise per user |
| `learning_progress` | Completed lessons/modules/courses + quiz scores |
| `custom_programs` | User-built training programs |
| `friendships` | Friend graph (pending / accepted) |
| `reactions` | Emoji reactions on feed sessions |
| `leaderboard_entries` | Weekly volume leaderboard |
| `challenges` | Challenge definitions + participants |
| `push_subscriptions` | Web Push VAPID endpoints |
| `nutrition_logs` | Daily food entries (calories + macros) |
| `measurements` | Body metric entries per user |

All tables have Row Level Security enabled with `auth.uid() = user_id` policies.

---

## 4. Code Quality

### Testing

**Framework:** Vitest · **Run:** `npm test` · **Result:** 3 test files, 28 passing tests, ~330ms

| Test File | Coverage |
|---|---|
| `src/lib/db.test.ts` | `upsertSession` success + error, `fetchHistory` null data + row mapping, `deleteCustomProgramDb` correct args + error propagation |
| `src/utils/volumeUtils.test.ts` | `estimate1RM`, `calculateTotalVolume`, `getExerciseProgressionData`, `getWeeklyVolumeByMuscle` (15 total) |
| `src/utils/programUtils.test.ts` | `recommendProgram` — goal match, level match, exact combo, no match, empty list |

### CI/CD

`.github/workflows/ci.yml` runs on every push and PR:

```
1. npm run lint         → ESLint, must exit 0
2. npx tsc -b --noEmit  → TypeScript, must exit 0
3. npm test             → Vitest, all tests must pass
```

### Linting (`eslint.config.js`)

- Base: `@eslint/js` recommended + `typescript-eslint` recommended
- Service worker globals declared for `public/sw.js` (`self`, `clients`)
- `@typescript-eslint/no-unused-vars` warns; `^_` prefix silences intentional ignores
- **Current status:** 0 errors, 0 warnings

### TypeScript

- **Current status:** `tsc -b --noEmit` exits clean (0 errors)
- `any` is used only in `db.ts` row mappers (marked with inline disable comments) and in legacy API handler signatures
- All data models are typed in `src/types/index.ts`

### Conventions

- Named function declarations (not `const` arrow) for React components
- Types centralized in `src/types/index.ts`
- Static data in `src/data/`; utilities grouped in `src/utils/`
- Program lookup always includes custom programs: `[...programs, ...getCustomPrograms()].find(p => p.id === id)`
- Supabase write helpers throw `Error('[fnName] ${error.message}')` on failure — callers catch and show toast

---

## 5. Security

### Authentication

- **Supabase Auth** (email + password). JWTs managed by the Supabase client SDK.
- `AuthContext` wraps `supabase.auth.onAuthStateChange` and exposes the session app-wide.
- `AuthOnlyGuard` redirects unauthenticated users to `/login` for community routes.
- `GuestOrAuthGuard` allows guest users (localStorage flag) but prompts upgrade for Supabase-only features.

### Database

- Row Level Security on all Supabase tables. Every policy is `auth.uid() = user_id`.
- Service role key used only server-side (Vercel functions) — never in client bundle.
- Anon key (client-side) is safe to expose — it can only read/write rows the authenticated user owns.

### API Endpoints

- All functions validate required env vars at startup and return `500` with a clear message if missing.
- `/api/ask` — 1,000-character question limit enforced.
- `/api/insights` — 10,000-character workout summary limit enforced.
- `/api/notify-friends` and `/api/weekly-digest` — require valid Supabase JWT in `Authorization` header.

### Known Gaps

- **No rate limiting** — A bug or malicious client could flood the Claude API. Add Upstash Redis rate limiting per user/IP.
- **No error tracking** — Production errors are invisible. Add Sentry for both client and serverless.

---

## 6. Performance

### Supabase Write Debouncing

Learning progress syncs with a 2-second debounce. A 5-question quiz session triggers **1 write** instead of 5–10.

### React Memoization

| Location | Optimization |
|---|---|
| `ExerciseCard` | `React.memo` — prevents re-render on every search keystroke |
| `HistoryPage` | `SessionList` memo component + `useMemo` for card list |
| `LeaderboardPage` | `LeaderboardList` memo component + `useMemo` for row list |

### Skeleton Loaders

Structured `Skeleton` component (`animate-pulse`, 4 variants: text / card / avatar / rect) replaces blank screens:

| Page | Skeleton Layout |
|---|---|
| `ActivityFeedPage` | 3 feed cards (avatar + 2 text lines) |
| `HistoryPage` | 2 stat cards + 3 session cards (first render only via `ready` state) |
| `LearnPage` | 3 course cards while computing recommendations |

### Not Yet Done

- No route-level code splitting. `React.lazy` + `Suspense` would reduce initial bundle for large pages (LearnPage, ChallengesPage).

---

## 7. Deployment

### Environment Variables

**Client (must be prefixed `VITE_`):**

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_VAPID_PUBLIC_KEY
```

**Server (Vercel — never in client bundle):**

```
ANTHROPIC_API_KEY
SUPABASE_SERVICE_ROLE_KEY
VAPID_PUBLIC_KEY
VAPID_PRIVATE_KEY
VAPID_EMAIL
```

Generate VAPID keys: `npx web-push generate-vapid-keys`

### Vercel Configuration (`vercel.json`)

- All non-API routes rewrite to `/index.html` for client-side routing.
- Cron jobs:
  - `GET /api/daily-reminder` — 9am UTC daily
  - `GET /api/weekly-digest` — Monday 8am UTC

### Local Development

Use `vercel dev` (not `npm run dev`). Serverless functions require the Vercel runtime to proxy the Claude and Supabase service-role calls.

### Supabase SQL (run once per environment)

```sql
-- Push subscriptions
create table push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles not null,
  endpoint text not null,
  p256dh text not null,
  auth text not null,
  created_at timestamptz default now()
);
alter table push_subscriptions enable row level security;
create policy "Users manage own push subs" on push_subscriptions
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Nutrition logs
create table nutrition_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles not null,
  logged_at date not null,
  meal_name text,
  calories int,
  protein_g numeric,
  carbs_g numeric,
  fat_g numeric,
  notes text,
  created_at timestamptz default now()
);
alter table nutrition_logs enable row level security;
create policy "Users manage own nutrition logs" on nutrition_logs
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

---

## 8. Known Gaps & Roadmap

### High Priority

| Gap | Detail | Recommendation |
|---|---|---|
| **API rate limiting** | No per-user or per-IP throttle on Claude endpoints | Upstash Redis + Vercel Edge Middleware |
| **Error tracking** | `console.error` only — no production visibility | Sentry for client + serverless |
| **Bundle splitting** | No route-level lazy loading | `React.lazy` + `Suspense` for large pages |

### Medium Priority

| Gap | Detail | Recommendation |
|---|---|---|
| **Component tests** | No tests for `Toast`, `QuizBlock`, `ExerciseBlock` | Install `@testing-library/react` + `jsdom`; add `*.test.tsx` to vitest config |
| **Offline caching** | Service worker only handles push — no asset or data caching | Add workbox or `vite-plugin-pwa` |
| **Accessibility** | No ARIA labels audit; no keyboard navigation test | Lighthouse accessibility audit; target WCAG 2.1 AA |
| **GDPR** | No data export for EU users | Add JSON/CSV export in ProfilePage |
| **Streak accuracy** | Counts calendar days — doesn't account for scheduled rest days in a program | Compare against program schedule rather than raw calendar |

### Feature Assessment

| Feature | Status | Notes |
|---|---|---|
| Workout tracking | ✅ Solid | Sets, reps, weight, RPE, volume, PR detection all correct |
| RPE entry | ✅ Improved | Tap-button row (6–10) below incomplete sets |
| Program progression | ✅ Good | Day/week cursor, custom programs fully supported |
| Learning system | ✅ Good | Quiz answer reveal has 200ms animation delay |
| AI Q&A | ✅ Good | Conversation history, context limit indicator, follow-up chips |
| AI Insights | ✅ Good | 28-day window, personalized observations |
| Community | ✅ Good | Real-time feed, emoji reactions, leaderboard, challenges |
| Push notifications | ✅ Implemented | VAPID, daily cron, friend workout alerts |
| Nutrition tracking | ✅ Good | Date nav, macro progress bars, add/delete with toast |
| Measurements | ✅ Good | Per-metric history, ConfirmDialog on delete |
| Toast feedback | ✅ Implemented | All mutations show success/error toasts (auto-dismiss, 3s) |
| Skeleton loaders | ✅ Implemented | Feed, History, Learn show structured skeletons |
| Confirm dialogs | ✅ Implemented | Discard workout, delete measurement, remove friend — no browser `confirm()` |
| Recovery score ring | ✅ Upgraded | SVG arc with animated `strokeDashoffset`, color-coded by score |
| Volume calculation | ✅ Correct | `weight × reps` for completed sets only |
| 1RM estimation | ✅ Correct | Epley formula: `weight × (1 + reps/30)` |

---

*The app has a complete, production-capable architecture with Supabase Auth, RLS, real-time features, push notifications, and a full CI pipeline. The primary outstanding items before a public launch are API rate limiting, error tracking (Sentry), and an accessibility audit.*
