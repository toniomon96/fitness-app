# Omnexus

A science-backed health and fitness platform built as a mobile-first progressive web app. Omnexus combines structured workout tracking, AI-powered coaching, evidence-based learning, real-time research from PubMed, community features, push notifications, and GDPR-compliant data management — all backed by Supabase and deployed on Vercel.

---

## Features

| Feature | Description |
|---|---|
| **Workout Tracking** | Log sessions, track sets/reps/weight/RPE, auto-detect personal records with PR celebration |
| **Training Programs** | Pre-built and custom programs with week/day progression |
| **Exercise Library** | 50+ exercises with instructions, muscle groups, and SVG progression charts |
| **Learn** | Structured courses with lessons, quizzes, and animated answer reveal |
| **Ask Omnexus** | AI Q&A powered by Claude — multi-turn conversation, follow-up chips, citation rendering |
| **AI Insights** | Claude analyzes your last 4 weeks of training and gives personalized recommendations |
| **Research Feed** | Live PubMed articles filtered by category, 6-hour client-side cache |
| **Personalization** | Course recommendations and article defaults based on your goal |
| **Community** | Friends, weekly leaderboard, challenges, real-time activity feed with emoji reactions |
| **Nutrition Tracking** | Daily macro logging with progress bars, date navigator, and goal management |
| **Measurements** | Track body metrics over time |
| **Push Notifications** | Friend workout alerts + daily/weekly reminders via Web Push (VAPID) |
| **Shareable Cards** | Canvas-generated 1080×1080 PNG cards for PRs and weekly recaps |
| **Guest Mode** | Try the app instantly — no account required |
| **Cloud Sync** | All data synced to Supabase — accessible across devices |
| **GDPR** | Cookie consent, data export (JSON), account deletion |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript 5.7, Vite 6 |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Auth & Database | Supabase (Auth, PostgreSQL, Realtime, RLS) |
| AI | Anthropic Claude (`claude-sonnet-4-6`) via `@anthropic-ai/sdk` |
| Push Notifications | Web Push API + VAPID via `web-push` |
| Serverless | Vercel Functions (Node.js 20) + Cron Jobs |
| External API | PubMed E-utilities (free, no key required) |
| Storage | Supabase PostgreSQL (source of truth) + `localStorage` (session cache) |
| Testing | Vitest (28 unit tests) |
| CI/CD | GitHub Actions (lint + tsc + test on every push/PR) |
| Deployment | Vercel |

---

## Prerequisites

- Node.js 20+
- [Vercel CLI](https://vercel.com/docs/cli): `npm i -g vercel`
- An Anthropic API key from [console.anthropic.com](https://console.anthropic.com)
- A free [Supabase](https://supabase.com) project
- VAPID keys for push notifications: `npx web-push generate-vapid-keys`

---

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create `.env.local` in the project root:

```
# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# Supabase — client-side (safe to expose)
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...

# Supabase — server-side only (never in client bundle)
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Web Push / VAPID
VITE_VAPID_PUBLIC_KEY=BM...
VAPID_PUBLIC_KEY=BM...
VAPID_PRIVATE_KEY=...
VAPID_EMAIL=mailto:you@example.com
```

> `.env.local` is gitignored. Never commit API keys or service role keys.

Generate VAPID keys:
```bash
npx web-push generate-vapid-keys
```

### 3. Run the Supabase SQL migrations

In the Supabase SQL editor, run the migrations from [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) in order:
1. Profiles
2. Cloud Sync (workout_sessions, personal_records, custom_programs, learning_progress)
3. Community (friendships, reactions, challenges, challenge_participants)
4. Push Notifications (push_subscriptions)
5. Nutrition & Measurements (nutrition_logs, measurements)

### 4. Run the dev server

```bash
vercel dev
```

This starts both the Vite frontend and Vercel serverless functions (`/api/*`) on a single local port (default `http://localhost:3000`).

> **Do not use `npm run dev`** — it runs Vite only. AI features, articles, and push notification endpoints require the Vercel serverless runtime.

---

## Testing

```bash
npm test
```

Runs Vitest. All 28 unit tests must pass.

Test files:
- `src/lib/db.test.ts` — Supabase write/read helper error propagation
- `src/utils/volumeUtils.test.ts` — 1RM estimation, volume calculation, weekly muscle volume
- `src/utils/programUtils.test.ts` — program recommendation logic

---

## Project Structure

```
fitness-app/
├── api/                          Vercel serverless functions
│   ├── ask.ts                    POST   /api/ask              → Claude Q&A
│   ├── insights.ts               POST   /api/insights          → Claude analysis
│   ├── articles.ts               GET    /api/articles          → PubMed proxy
│   ├── setup-profile.ts          POST   /api/setup-profile     → Create profile (admin)
│   ├── notify-friends.ts         POST   /api/notify-friends    → Web Push to friends
│   ├── daily-reminder.ts         GET    /api/daily-reminder    → Cron: push all (9am UTC)
│   ├── weekly-digest.ts          GET    /api/weekly-digest     → Cron: volume summary (Mon 8am)
│   ├── export-data.ts            GET    /api/export-data       → GDPR data export
│   ├── delete-account.ts         DELETE /api/delete-account    → GDPR account deletion
│   └── _sendPush.ts              Shared helper: sendPushToUser / sendPushToUsers
│
├── public/
│   └── sw.js                     Service worker (Web Push handler)
│
├── src/
│   ├── components/
│   │   ├── community/            FriendCard, ChallengeCard, ActivityItem, LeaderboardRow
│   │   ├── dashboard/            WelcomeBanner, TodayCard, StreakDisplay, WeeklyRecapCard, MuscleHeatMap
│   │   ├── exercise-library/     ExerciseCard (React.memo), ExerciseProgressChart
│   │   ├── history/              LogCard, HeatmapCalendar
│   │   ├── layout/               AppShell, BottomNav (5 tabs), TopBar
│   │   ├── learn/                CourseCard, LessonReader, QuizBlock (200ms reveal animation)
│   │   ├── onboarding/           OnboardingForm, GoalCard
│   │   ├── programs/             ProgramCard, DaySchedule
│   │   ├── ui/                   Button, Card (gradient prop), Badge, Input, Modal,
│   │   │                         ConfirmDialog, Skeleton, Toast+ToastContainer,
│   │   │                         MarkdownText, CookieConsent
│   │   └── workout/              ExerciseBlock, SetRow (RPE tap-buttons), RestTimer,
│   │                             WorkoutCompleteModal, PRCelebration, AddExerciseDrawer
│   │
│   ├── contexts/
│   │   ├── AuthContext.tsx        Supabase auth state (session, loading, signOut)
│   │   └── ToastContext.tsx       In-app toast notifications (useToast hook)
│   │
│   ├── data/
│   │   ├── courses.ts             Static course/lesson/quiz content
│   │   ├── exercises.ts           50+ exercise definitions
│   │   └── programs.ts            Pre-built training programs
│   │
│   ├── hooks/
│   │   ├── useLearningProgress.ts
│   │   ├── useRestTimer.ts
│   │   └── useWorkoutSession.ts
│   │
│   ├── lib/
│   │   ├── supabase.ts            Supabase client singleton
│   │   ├── db.ts                  Typed async helpers for all Supabase tables
│   │   ├── dataMigration.ts       One-time localStorage → Supabase migration
│   │   └── pushSubscription.ts    VAPID subscription management
│   │
│   ├── pages/                     One file per route (24 pages total)
│   │
│   ├── services/
│   │   ├── claudeService.ts       fetch() wrappers for /api/ask and /api/insights
│   │   ├── insightsService.ts     Builds workout summary from session history
│   │   └── pubmedService.ts       PubMed client + localStorage cache
│   │
│   ├── store/
│   │   └── AppContext.tsx         Global state (Context API + useReducer)
│   │
│   ├── types/
│   │   └── index.ts               All TypeScript interfaces
│   │
│   └── utils/
│       ├── dateUtils.ts
│       ├── localStorage.ts        Typed read/write helpers
│       ├── programUtils.ts        Recommendation + cursor logic
│       ├── shareCard.ts           Canvas PNG generation (PRCard, WeeklyCard)
│       └── volumeUtils.ts         Volume, 1RM, muscle group breakdown
│
├── docs/
│   ├── API.md                     All serverless endpoint reference
│   ├── ARCHITECTURE.md            System diagram, data models, Supabase schema
│   ├── PROJECT_BRIEF.md           Complete app description (LLM context doc)
│   └── REVIEW.md                  Current state, code quality, security, roadmap
│
├── .github/workflows/ci.yml       GitHub Actions: lint + tsc + test
├── eslint.config.js               Flat config (TypeScript rules + sw.js globals)
├── vitest.config.ts               Test config (node env)
├── vercel.json                    Routes + cron jobs
├── vite.config.ts
└── tsconfig.json
```

---

## Deployment

### Deploy to Vercel

```bash
vercel deploy --prod
```

### Set environment variables in Vercel

In Vercel Dashboard → Project → Settings → Environment Variables, set all keys for **Production**, **Preview**, and **Development**:

| Key | Used by |
|---|---|
| `ANTHROPIC_API_KEY` | `/api/ask`, `/api/insights` |
| `VITE_SUPABASE_URL` | Client + all API routes |
| `VITE_SUPABASE_ANON_KEY` | Browser Supabase client |
| `SUPABASE_SERVICE_ROLE_KEY` | `/api/setup-profile`, `/api/export-data`, `/api/delete-account`, cron jobs |
| `VITE_VAPID_PUBLIC_KEY` | Browser push subscription |
| `VAPID_PUBLIC_KEY` | `/api/notify-friends`, `/api/daily-reminder`, `/api/weekly-digest` |
| `VAPID_PRIVATE_KEY` | Same as above |
| `VAPID_EMAIL` | VAPID contact email (`mailto:...`) |

### Supabase URL Configuration

In Supabase Dashboard → Authentication → URL Configuration:
- **Site URL**: your production Vercel URL (e.g. `https://your-app.vercel.app`)
- **Redirect URLs**: `https://your-app.vercel.app/**` and `http://localhost:3000/**`

### Cron Jobs

`vercel.json` schedules two cron jobs (requires Vercel Pro or higher):
- `GET /api/daily-reminder` — 9am UTC daily
- `GET /api/weekly-digest` — Monday 8am UTC

---

## localStorage Keys

| Key | Contents |
|---|---|
| `fit_user` | User profile (Supabase is source of truth) |
| `fit_history` | Workout sessions (session cache) |
| `fit_active_session` | In-progress workout |
| `fit_theme` | `"dark"` or `"light"` |
| `fit_program_week_cursor` | Week progress per program |
| `fit_program_day_cursor` | Day progress per program |
| `omnexus_learning_progress` | Completed lessons, modules, courses, quiz scores |
| `omnexus_insight_sessions` | Ask Omnexus Q&A history (last 50) |
| `omnexus_article_cache` | PubMed articles per category (6h TTL) |
| `omnexus_custom_programs` | User-built programs (session cache) |
| `omnexus_nutrition_goals` | Daily macro targets |
| `omnexus_guest` | Guest mode flag |
| `omnexus_cookie_consent` | `"accepted"` or `"declined"` |
| `omnexus_migrated_v1` | One-time localStorage → Supabase migration flag |

---

## AI Disclaimer

Omnexus provides **educational information only**. AI-generated content is not medical advice. Users should consult a qualified healthcare professional for personal health concerns.
