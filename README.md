# Omnexus

A science-backed health and fitness platform built as a mobile-first progressive web app. Omnexus combines structured workout tracking, AI-powered coaching, evidence-based learning, real-time research from PubMed, community features, and GDPR-compliant data management — all backed by Supabase and deployed on Vercel.

---

## Features

| Feature | Description |
|---|---|
| **Workout Tracking** | Log sessions, track sets/reps/weight/RPE, auto-detect personal records |
| **Training Programs** | Pre-built and custom programs with week/day progression |
| **Exercise Library** | 50+ exercises with instructions, muscle groups, and progression charts |
| **Learn** | Structured courses with lessons, quizzes, and progress tracking |
| **Ask Omnexus** | AI Q&A powered by Claude — evidence-based answers with citations |
| **AI Insights** | Claude analyzes your last 4 weeks of training and gives recommendations |
| **Research Feed** | Live PubMed articles filtered by category, cached for 6 hours |
| **Personalization** | Course recommendations and article defaults based on your goal |
| **Community** | Friends, weekly leaderboard, challenges, real-time activity feed |
| **Cloud Sync** | All data synced to Supabase — accessible across devices |
| **GDPR Compliance** | Cookie consent, data export (JSON), account deletion |

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
| Serverless | Vercel Functions (Node.js 20) |
| External API | PubMed E-utilities (free, no key required) |
| Storage | Supabase PostgreSQL (source of truth) + `localStorage` (session cache) |
| Deployment | Vercel |

---

## Prerequisites

- Node.js 20+
- [Vercel CLI](https://vercel.com/docs/cli): `npm i -g vercel`
- An Anthropic API key from [console.anthropic.com](https://console.anthropic.com)
- A free [Supabase](https://supabase.com) project

---

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create `.env.local` in the project root:

```
ANTHROPIC_API_KEY=sk-ant-...
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

> `.env.local` is gitignored. Never commit API keys or service role keys.

### 3. Run the Supabase SQL migrations

In the Supabase SQL editor, run the migrations from [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) in order (profiles → workout tables → community tables).

### 4. Run the dev server

```bash
vercel dev
```

This starts both the Vite frontend and the Vercel serverless functions (`/api/*`) on a single local port (default `http://localhost:3000`).

> **Do not use `npm run dev`** — it runs Vite only and AI/articles features will not work without the serverless functions.

---

## Project Structure

```
fitness-app/
├── api/                        # Vercel serverless functions
│   ├── ask.ts                  # POST   /api/ask            → Claude Q&A
│   ├── insights.ts             # POST   /api/insights        → Claude analysis
│   ├── articles.ts             # GET    /api/articles        → PubMed proxy
│   ├── setup-profile.ts        # POST   /api/setup-profile   → Create profile (admin)
│   ├── export-data.ts          # GET    /api/export-data     → GDPR data export
│   └── delete-account.ts       # DELETE /api/delete-account  → GDPR account deletion
│
├── src/
│   ├── components/
│   │   ├── community/          # FriendCard, ChallengeCard, ActivityItem, LeaderboardRow, CommunityTabs
│   │   ├── dashboard/          # WelcomeBanner, StreakDisplay, etc.
│   │   ├── insights/           # ArticleCard, ArticleFeed
│   │   ├── layout/             # AppShell, BottomNav, TopBar, ThemeToggle
│   │   ├── learn/              # CourseCard, LessonReader, QuizBlock, CourseRecommendations
│   │   ├── onboarding/         # OnboardingForm, GoalCard, ExperienceSelector
│   │   ├── programs/           # ProgramCard, DaySchedule
│   │   ├── ui/                 # Button, Card, Badge, Input, Modal, MarkdownText, CookieConsent
│   │   └── workout/            # ExerciseBlock, SetRow, RestTimer, etc.
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx     # Supabase auth state (session, user, loading, signOut)
│   │
│   ├── data/
│   │   ├── courses.ts          # Static course/lesson/quiz content
│   │   ├── exercises.ts        # 50+ exercise definitions
│   │   └── programs.ts         # Pre-built training programs
│   │
│   ├── hooks/
│   │   ├── useLearningProgress.ts
│   │   ├── useRestTimer.ts
│   │   └── useWorkoutSession.ts
│   │
│   ├── lib/
│   │   ├── supabase.ts         # Supabase client singleton
│   │   ├── db.ts               # Typed async helpers for all Supabase tables
│   │   └── dataMigration.ts    # One-time localStorage → Supabase migration
│   │
│   ├── pages/
│   │   ├── DashboardPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── OnboardingPage.tsx
│   │   ├── ProfilePage.tsx     # Edit profile, export data, delete account
│   │   ├── PrivacyPolicyPage.tsx
│   │   ├── ProgramsPage.tsx / ProgramDetailPage.tsx / ProgramBuilderPage.tsx
│   │   ├── ExerciseLibraryPage.tsx / ExerciseDetailPage.tsx
│   │   ├── ActiveWorkoutPage.tsx
│   │   ├── HistoryPage.tsx
│   │   ├── LearnPage.tsx / CourseDetailPage.tsx / LessonPage.tsx
│   │   ├── InsightsPage.tsx / AskPage.tsx
│   │   ├── ActivityFeedPage.tsx    # Community: real-time friend feed
│   │   ├── FriendsPage.tsx         # Community: search, send/accept requests
│   │   ├── LeaderboardPage.tsx     # Community: weekly volume standings
│   │   └── ChallengesPage.tsx      # Community: browse + create + join challenges
│   │
│   ├── services/
│   │   ├── claudeService.ts    # fetch() wrappers for /api/ask and /api/insights
│   │   ├── insightsService.ts  # Builds workout summary prompt from session history
│   │   └── pubmedService.ts    # PubMed client with localStorage cache
│   │
│   ├── store/
│   │   └── AppContext.tsx       # Global state (Context API + useReducer)
│   │
│   ├── types/
│   │   └── index.ts            # All TypeScript interfaces
│   │
│   └── utils/
│       ├── dateUtils.ts
│       ├── localStorage.ts     # Typed read/write helpers (session cache)
│       ├── programUtils.ts
│       └── volumeUtils.ts
│
├── docs/
│   ├── ARCHITECTURE.md         # System diagram, data models, Supabase schema
│   ├── API.md                  # All serverless endpoint reference
│   └── REVIEW.md               # Code review notes
│
├── vercel.json                 # Routes config (SPA + API)
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

In the Vercel dashboard → Project → Settings → Environment Variables:

| Key | Used by |
|---|---|
| `ANTHROPIC_API_KEY` | `/api/ask`, `/api/insights` |
| `VITE_SUPABASE_URL` | Client + all API routes |
| `VITE_SUPABASE_ANON_KEY` | Browser client |
| `SUPABASE_SERVICE_ROLE_KEY` | `/api/setup-profile`, `/api/export-data`, `/api/delete-account` |

Set all keys for **Production**, **Preview**, and **Development** environments.

### Supabase URL Configuration

In Supabase Dashboard → Authentication → URL Configuration:
- **Site URL**: your production Vercel URL (e.g. `https://your-app.vercel.app`)
- **Redirect URLs**: `https://your-app.vercel.app/**` and `http://localhost:3000/**`

---

## localStorage Keys

| Key | Contents |
|---|---|
| `fit_user` | User profile (session cache — Supabase is source of truth) |
| `fit_history` | Workout sessions (session cache) |
| `fit_active_session` | In-progress workout |
| `fit_theme` | `"dark"` or `"light"` |
| `fit_program_week_cursor` | Week progress per program |
| `fit_program_day_cursor` | Day progress per program |
| `omnexus_learning_progress` | Completed lessons, modules, courses, quiz scores |
| `omnexus_insight_sessions` | Ask Omnexus Q&A history (last 50) |
| `omnexus_article_cache` | PubMed article cache per category (6 h TTL) |
| `omnexus_custom_programs` | User-built programs (session cache) |
| `omnexus_cookie_consent` | `"accepted"` or `"declined"` |
| `omnexus_migrated_v1` | Flag: one-time localStorage → Supabase migration complete |

---

## AI Disclaimer

Omnexus provides **educational information only**. AI-generated content is not medical advice. Users should consult a qualified healthcare professional for personal health concerns.
