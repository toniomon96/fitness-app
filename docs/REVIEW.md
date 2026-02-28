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
| **Training Programs** | Pre-built and custom-built programs with day-by-day scheduling, progression, and an in-app builder. AI-generated programs display an "AI" badge (sparkle icon). |
| **AI Onboarding** | Multi-turn Claude conversation that collects goals, training age, schedule, equipment, and injuries. Outputs a `UserTrainingProfile` + natural-language `aiSummary`. |
| **Generative Mesocycle Engine** | Claude generates a complete 8-week `Program` JSON tailored to the user's profile. All exercise IDs validated server-side; hardcoded fallback returned on Claude failure. |
| **AI Q&A** | Ask Omnexus any fitness question — powered by Claude. Maintains conversation context, shows follow-up chips, context limit indicator at 4 exchanges. |
| **AI Training Insights** | Analyzes last 4 weeks of workout data and returns personalized training observations and recommendations. AdaptationCard (last session suggestions) and PeerInsightsCard (aggregate benchmarking) shown below the analysis. |
| **Adaptation Engine** | After each workout, `/api/adapt` fetches last 3 sessions per exercise and returns per-exercise adjustment recommendations. Displayed in a "Next Session" tab in WorkoutCompleteModal and persisted to `omnexus_last_adaptation` in localStorage. |
| **Block Missions** | When a training program is activated, Claude generates 4–5 program-scoped missions (PR, consistency, volume, RPE). Progress is auto-tracked on every workout completion. Displayed as a card on ProgramDetailPage. |
| **AI Challenges** | Personalized 7-day challenges generated on demand. A shared community challenge is generated every Monday 6am UTC via Vercel cron and shown to all users on ChallengesPage. Stored in the `ai_challenges` Supabase table. |
| **Peer Insights** | Aggregate cross-user benchmarking: volume and session frequency of peers with the same goal + experience level. Claude generates a 2–3 sentence narrative. Requires at least 3 peers to display. |
| **Learning System** | Structured courses → modules → lessons with quiz scoring, completion tracking, and animated answer reveal. Semantic search powered by pgvector (OpenAI embeddings). Dynamic micro-lesson generation for content gaps via Claude. |
| **Semantic Content Search** | Debounced search input on LearnPage queries `/api/recommend-content` (pgvector cosine similarity). Results show exercises and lessons ranked by relevance score. Content gap CTA triggers `MicroLessonModal`. |
| **Research Feed** | Live PubMed articles across 7 categories with 6-hour client-side caching. |
| **Community** | Friends, activity feed with emoji reactions, weekly leaderboard, challenges. Supabase Realtime pushes live updates. |
| **Nutrition Tracking** | Daily macro logging with progress bars, date navigator, food search, and goal management. |
| **Measurements** | Track body metrics (weight, body fat, etc.) over time with confirm-on-delete. |
| **Push Notifications** | Opt-in Web Push via VAPID. Friend workout alerts + daily motivational reminders via Vercel cron. |
| **Shareable Cards** | Canvas-generated 1080×1080 PNG cards for PRs and weekly recaps. Web Share API + download fallback. |
| **Native Mobile** | Capacitor v8 packages the web app as a native iOS and Android app. Status bar, splash screen, haptics, and safe-area handling via Capacitor plugins. |
| **Guest Mode** | Try the app without an account. Auth-only features show upgrade prompts. |
| **Dark Mode** | Full dark theme; persisted to localStorage. |

**Tech Stack:** React 19 · TypeScript 5.7 · Vite 6 · Tailwind CSS 4 · Supabase (Auth + PostgreSQL + Realtime + pgvector) · Vercel Serverless + Crons · Claude API (`claude-sonnet-4-6`) · OpenAI (`text-embedding-3-small`) · PubMed E-utilities · Capacitor v8 (iOS + Android)

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
│ /api/onboard│
│ /api/generate-program
│ /api/notify-friends
│ /api/adapt
│ /api/generate-missions
│ /api/generate-personal-challenge
│ /api/generate-shared-challenge
│ /api/peer-insights
│ /api/daily-reminder          (cron 9am UTC)
│ /api/weekly-digest           (cron Mon 8am UTC)
│ /api/generate-shared-challenge (cron Mon 6am UTC)
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
├── api/              Vercel serverless functions (ask, insights, articles, onboard, generate-program, …)
├── components/       UI + feature components (by domain)
│   ├── community/
│   ├── dashboard/
│   ├── exercise-library/
│   ├── history/
│   ├── layout/         AppShell, TopBar, BottomNav
│   ├── learn/
│   ├── onboarding/     OnboardingChat.tsx, ProfileSummaryCard.tsx (AI onboarding)
│   ├── programs/
│   ├── ui/             Button, Card, Modal, Toast, Skeleton, ConfirmDialog, …
│   └── workout/
├── contexts/         ToastContext, AuthContext
├── data/             Static exercises (with MovementPattern tags) + programs
├── hooks/            useWorkoutSession, useRestTimer, useLearningProgress
├── lib/              supabase.ts, db.ts, dataMigration.ts, pushSubscription.ts, api.ts, capacitor.ts
├── pages/            One file per route
├── services/         claudeService.ts, adaptService.ts (AI calls + Phase 3 wrappers)
├── store/            AppContext.tsx (global state + reducer)
├── types/            index.ts (all interfaces incl. MovementPattern, UserTrainingProfile)
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
| `training_profiles` | AI-collected training data: goals array, trainingAge, daysPerWeek, sessionDuration, equipment, injuries, aiSummary. Unique per user. |
| `workout_sessions` | Completed sessions with exercises, sets, and volume |
| `personal_records` | Best lifts per exercise per user |
| `learning_progress` | Completed lessons/modules/courses + quiz scores |
| `custom_programs` | User-built and AI-generated training programs |
| `friendships` | Friend graph (pending / accepted) |
| `reactions` | Emoji reactions on feed sessions |
| `leaderboard_entries` | Weekly volume leaderboard |
| `challenges` | Challenge definitions + participants |
| `push_subscriptions` | Web Push VAPID endpoints |
| `nutrition_logs` | Daily food entries (calories + macros) |
| `measurements` | Body metric entries per user |
| `block_missions` | Program-scoped Claude-generated goals with progress tracking; RLS per user |
| `ai_challenges` | AI challenges — personal (`user_id = uid`) and shared/public (`user_id IS NULL`) |

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
- `/api/onboard` — conversation history capped at 12 turns server-side; no auth required (no user data persisted server-side).
- `/api/generate-program` — all exercise IDs validated against a server-side allowlist; invalid IDs and invalid enum values (`goal`, `experienceLevel`) cause fallback to a hardcoded program rather than returning an error. Always returns `HTTP 200`.

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
VITE_API_BASE_URL   # empty for web; set to production Vercel URL for Capacitor native builds
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

### Native Mobile (Capacitor)

Capacitor v8 wraps the Vite build as a native app for iOS and Android:

- **Config:** `capacitor.config.ts` — `appId: com.omnexus.app`, `webDir: dist`
- **Plugins:** `@capacitor/status-bar`, `splash-screen`, `haptics`, `app`
- **Platform utils:** `src/lib/capacitor.ts` — `isNative`, `isIOS`, `isAndroid`, `initStatusBar`, `hideSplashScreen`, `triggerHaptic`
- **API abstraction:** `src/lib/api.ts` exports `apiBase = import.meta.env.VITE_API_BASE_URL ?? ''`. All `fetch('/api/...')` calls use this prefix so native builds point to the production Vercel URL.
- **Build scripts:** `cap:sync`, `cap:ios`, `cap:android`, `cap:open:ios`, `cap:open:android`, `cap:run:ios`, `cap:run:android`

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

-- AI training profiles (Phase 1)
create table public.training_profiles (
  id                       uuid primary key default gen_random_uuid(),
  user_id                  uuid not null references auth.users(id) on delete cascade,
  goals                    text[] not null default '{}',
  training_age_years       numeric not null default 0,
  days_per_week            int not null default 3,
  session_duration_minutes int not null default 60,
  equipment                text[] not null default '{}',
  injuries                 text[] not null default '{}',
  ai_summary               text,
  raw_profile              jsonb,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now(),
  unique(user_id)
);
alter table public.training_profiles enable row level security;
create policy "Users can manage own training profile"
  on public.training_profiles for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
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
| AI Onboarding | ✅ Implemented | Multi-turn Claude chat; `[PROFILE_COMPLETE]` signal; chip quick-replies |
| AI Program Generation | ✅ Implemented | 8-week Program JSON from Claude; server-side ID validation; always-200 fallback |
| AI badge | ✅ Implemented | "AI" sparkle badge on `CurrentProgramCard` + `ProgramDetailPage` |
| Exercise pattern tags | ✅ Implemented | `MovementPattern` on all exercises; used in generate-program system prompt |
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
| Native mobile (Capacitor) | ✅ Implemented | iOS + Android packaging; status bar, haptics, splash, safe areas |
| Volume calculation | ✅ Correct | `weight × reps` for completed sets only |
| 1RM estimation | ✅ Correct | Epley formula: `weight × (1 + reps/30)` |
| Semantic content search | ✅ Implemented | pgvector cosine similarity, 400ms debounce, exercise + lesson results |
| Content gap detection | ✅ Implemented | `hasContentGap` when best similarity < 0.65 → triggers `MicroLessonModal` |
| Dynamic micro-lessons | ✅ Implemented | Claude generates JSON lesson on demand; fallback on parse failure |
| Exercise related learning | ✅ Implemented | `ExerciseDetailPage` fetches related lessons via pgvector on mount |
| Adaptation Engine | ✅ Implemented | `/api/adapt` → per-exercise action chips (increase/maintain/deload + confidence); Next Session tab in WorkoutCompleteModal; AdaptationCard on InsightsPage reads localStorage |
| Block Missions | ✅ Implemented | `/api/generate-missions` creates 4–5 missions on program activate; progress auto-tracked per session (pr/consistency/volume/rpe); BlockMissionsCard on ProgramDetailPage |
| AI Challenges (personal) | ✅ Implemented | `/api/generate-personal-challenge` → 7-day personal challenge stored in `ai_challenges`; PersonalChallengeCard on ChallengesPage with time-based progress bar |
| AI Challenges (shared) | ✅ Implemented | `/api/generate-shared-challenge` cron (Mon 6am UTC) → community-wide weekly challenge; highlighted banner on ChallengesPage for all authenticated users |
| Peer Insights | ✅ Implemented | `/api/peer-insights` aggregates peers' volume/sessions (service role) → Claude narrative; PeerInsightsCard hidden if fewer than 3 peers |

---

*The app has a complete, production-capable architecture with Supabase Auth, RLS, real-time features, push notifications, a full CI pipeline, Capacitor native packaging, an AI-native onboarding + mesocycle generation system, Phase 2 pgvector semantic learning layer, and Phase 3 intelligence layer (adaptation engine, block missions, AI challenges, and peer benchmarking). The primary outstanding items before a public launch are: running the Phase 3 SQL migrations (`block_missions`, `ai_challenges`) in Supabase, running the pgvector SQL migration and seeding embeddings via `POST /api/seed-embeddings`, adding `OPENAI_API_KEY` and `SEED_SECRET` to Vercel env, API rate limiting (Upstash Redis), error tracking (Sentry), and an accessibility audit.*
