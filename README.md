# Omnexus

[![CI](https://github.com/toniomon96/fitness-app/actions/workflows/ci.yml/badge.svg)](https://github.com/toniomon96/fitness-app/actions/workflows/ci.yml)
![Tests](https://img.shields.io/badge/tests-115%20passing-22c55e)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)
[![Live](https://img.shields.io/badge/Live%20App-omnexus.fit-6366f1?logo=vercel&logoColor=white)](https://fitness-app-ten-eta.vercel.app)

A science-backed fitness platform powered by AI. Track workouts, generate personalized training programs, get coaching from Claude, read peer-reviewed research, and compete with friends — all in a mobile-first PWA that also ships as a native iOS and Android app.

---

## Features

| Feature | Description |
|---|---|
| **AI Onboarding** | Multi-turn Claude conversation that builds your training profile and generates a custom 8-week periodized program |
| **Workout Tracking** | Log sets, reps, weight, RPE — auto-detects personal records with confetti celebration |
| **Exercise Library** | 51 exercises with instructions, muscle groups, YouTube demo embeds, and SVG progression charts |
| **Training Programs** | Pre-built + custom-built programs with week/day cursor, builder UI, and AI-generated mesocycles |
| **Ask Omnexus** | Claude-powered AI coach with multi-turn chat, follow-up chips, and RAG citations from PubMed |
| **AI Insights** | Analyzes your last 4 weeks of training — personalized volume, frequency, and recovery recommendations |
| **Adaptation Engine** | After every session, Claude suggests next-session adjustments per exercise based on recent RPE trends |
| **Learn** | Structured courses with modules, lessons, quizzes, semantic search (pgvector), and micro-lesson generation |
| **Research Feed** | Live PubMed articles across 7 categories with 6-hour client-side cache |
| **Community** | Friends, real-time activity feed with emoji reactions, weekly leaderboard, individual and team challenges |
| **Nutrition Tracking** | Daily macro logging with progress bars, date navigator, quick-add meals, and goal management |
| **Measurements** | Track body metrics over time with trend visualization |
| **Push Notifications** | Web Push (VAPID) — friend workout alerts, daily reminders, and weekly digest via Vercel cron |
| **Shareable Cards** | Canvas-generated 1080×1080 PNG cards for PRs and weekly recaps |
| **Premium Tier** | Stripe-powered subscriptions — unlimited AI + insights; free tier gated at 5 asks/day |
| **Guest Mode** | Try the full app instantly — no account required |
| **Cloud Sync** | All data in Supabase — accessible across devices |
| **GDPR** | Cookie consent, data export (JSON), account deletion |
| **Native Apps** | Capacitor v8 — iOS + Android, with haptics, status bar, and safe-area handling |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript 5.7, Vite 6 |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Auth & Database | Supabase (Auth, PostgreSQL, Realtime, RLS, pgvector) |
| AI Coach | Anthropic Claude `claude-sonnet-4-6` |
| Embeddings | OpenAI `text-embedding-3-small` (pgvector RAG) |
| Email | Resend (branded transactional email) |
| Payments | Stripe (subscriptions + webhooks) |
| Analytics | PostHog |
| Rate Limiting | Upstash Redis |
| Push Notifications | Web Push API + VAPID via `web-push` |
| Serverless | Vercel Functions (Node.js 20) + Cron Jobs |
| External API | PubMed E-utilities |
| Native | Capacitor v8 (iOS + Android) |
| Testing | Vitest (115 unit tests), Playwright (E2E) |
| CI/CD | GitHub Actions |
| Deployment | Vercel |

---

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create `.env.local`:

```bash
# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# Supabase (client-side — safe to expose)
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...

# Supabase (server-side only — never in client bundle)
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# OpenAI (server-side — pgvector embeddings)
OPENAI_API_KEY=sk-...

# Resend (transactional email)
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=Omnexus <no-reply@notifications.omnexus.fit>

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...
APP_URL=http://localhost:3000

# Web Push / VAPID
VITE_VAPID_PUBLIC_KEY=BM...
VAPID_PUBLIC_KEY=BM...
VAPID_PRIVATE_KEY=...
VAPID_EMAIL=mailto:you@example.com

# CORS (production only)
ALLOWED_ORIGIN=https://your-app.vercel.app

# Rate limiting (optional — disables gracefully if absent)
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...

# Analytics (optional — no-op if absent)
VITE_POSTHOG_KEY=phc_...
VITE_POSTHOG_HOST=https://app.posthog.com

# Native builds only
VITE_API_BASE_URL=https://your-app.vercel.app
```

> Generate VAPID keys: `npx web-push generate-vapid-keys`
>
> `.env.local` is gitignored — never commit secrets.

### 3. Run the dev server

```bash
vercel dev
```

> **Use `vercel dev`, not `npm run dev`.** The Vercel CLI runs both the Vite frontend and serverless functions together on port 3000. `npm run dev` only starts Vite — AI features, articles, email, and Stripe won't work.

### 4. Run tests

```bash
npm test          # Vitest unit tests (115 tests)
npm run test:e2e  # Playwright E2E tests (requires vercel dev running)
```

---

## Project Structure

```
fitness-app/
├── api/                    Vercel serverless functions
│   ├── ask.ts              POST /api/ask              Claude Q&A + pgvector RAG
│   ├── insights.ts         POST /api/insights          Claude training analysis
│   ├── onboard.ts          POST /api/onboard           Multi-turn onboarding agent
│   ├── generate-program.ts POST /api/generate-program  8-week mesocycle generation
│   ├── adapt.ts            POST /api/adapt             Per-exercise session adaptation
│   ├── generate-missions.ts POST /api/generate-missions Block missions
│   ├── signup.ts           POST /api/signup            Account creation + Resend email
│   ├── setup-profile.ts    POST /api/setup-profile     Profile creation (admin SDK)
│   ├── report-bug.ts       POST /api/report-bug        In-app bug reports
│   ├── articles.ts         GET  /api/articles          PubMed proxy
│   ├── export-data.ts      GET  /api/export-data       GDPR data export
│   ├── delete-account.ts   DELETE /api/delete-account  GDPR account deletion
│   ├── notify-friends.ts   POST /api/notify-friends    Web Push to friends
│   ├── create-checkout.ts  POST /api/create-checkout   Stripe checkout session
│   ├── webhook-stripe.ts   POST /api/webhook-stripe    Stripe events
│   ├── daily-reminder.ts   GET  /api/daily-reminder    Cron: push all (9am UTC)
│   ├── weekly-digest.ts    GET  /api/weekly-digest     Cron: volume summary (Mon 8am)
│   ├── _cors.ts            Shared CORS helper
│   └── _rateLimit.ts       Upstash rate limiting helper
│
├── public/
│   ├── sw.js               Service worker (Web Push handler)
│   ├── manifest.json       PWA manifest
│   └── icons/              PWA + apple-touch-icon PNGs
│
├── src/
│   ├── components/
│   │   ├── community/      FriendCard, ChallengeCard, ActivityItem, LeaderboardRow
│   │   ├── dashboard/      WelcomeBanner, TodayCard, StreakDisplay, WeeklyRecapCard, MuscleHeatMap
│   │   ├── history/        LogCard (with inline set editing), HeatmapCalendar
│   │   ├── layout/         AppShell, BottomNav, TopBar
│   │   ├── learn/          CourseCard, LessonReader, QuizBlock
│   │   ├── onboarding/     OnboardingForm, OnboardingChat, ProfileSummaryCard
│   │   ├── programs/       ProgramCard, DaySchedule
│   │   └── ui/             Button, Card, Badge, Input, Modal, ConfirmDialog,
│   │                       Skeleton, Toast, Avatar, YouTubeEmbed, CookieConsent
│   │
│   ├── contexts/
│   │   ├── AuthContext.tsx  Supabase auth state
│   │   └── ToastContext.tsx In-app toast notifications
│   │
│   ├── data/
│   │   ├── courses.ts      Course/lesson/quiz content
│   │   ├── exercises.ts    51 exercise definitions + YouTube IDs
│   │   └── programs.ts     Pre-built training programs
│   │
│   ├── hooks/              useLearningProgress, useRestTimer, useWorkoutSession, useSubscription
│   │
│   ├── lib/
│   │   ├── supabase.ts     Supabase client singleton
│   │   ├── db.ts           Typed async helpers for all Supabase tables
│   │   ├── api.ts          apiBase abstraction (web vs native)
│   │   ├── analytics.ts    PostHog wrapper
│   │   └── capacitor.ts    Native plugin wrappers
│   │
│   ├── pages/              One file per route (27 pages)
│   ├── services/           claudeService, insightsService, learningService, pubmedService
│   ├── store/AppContext.tsx Global state (Context API + useReducer)
│   ├── types/index.ts      All TypeScript interfaces
│   └── utils/              dateUtils, localStorage, programUtils, volumeUtils, formatUtils, shareCard
│
├── tests/e2e/              Playwright E2E tests
├── docs/                   Architecture, API reference, mobile guide, roadmap
├── .github/                CI workflow, issue templates, PR template
├── capacitor.config.ts     Capacitor app config
├── vercel.json             Routes + cron jobs
└── vite.config.ts
```

---

## Deployment

```bash
vercel deploy --prod
```

## Environments

Omnexus should move through `local -> dev -> preview -> prod`.

- Local: run `vercel dev` and `npm run verify:local` while building on a feature or bug branch.
- Dev: merge feature and bug branches into `dev`; CI runs `npm run verify:dev` and Vercel should publish the shared DEV environment.
- Preview: open a `dev -> main` PR; Vercel preview plus `npm run verify:preview` become the release candidate gate.
- Prod: merge to `main` only after preview validation and approvals; Vercel production should only track `main`.

See `docs/RELEASE_STRATEGY.md` for the full branching, CI, Vercel, and release checklist.
See `docs/RELEASE_CHECKLIST.md` for release-day execution.
See `docs/ENVIRONMENT_MATRIX.md` for environment-specific variables and service expectations.
See `docs/PLATFORM_SETUP_CHECKLIST.md` for the exact GitHub, Vercel, Supabase, and Stripe setup tasks that still need manual admin access.

## CI Gate Matrix

| Trigger | Gate | Command | Coverage |
|---|---|---|---|
| Push to `dev` | Dev Verification Gate | `npm run verify:dev` | `lint` + `typecheck` + `unit` + `build` + smoke E2E |
| PR into `dev` | Dev Verification Gate | `npm run verify:dev` | `lint` + `typecheck` + `unit` + `build` + smoke E2E |
| Push to `main` | Production Verification Gate | `npm run verify:prod` | `lint` + `typecheck` + `unit` + `build` + full E2E |
| PR into `main` | Production Verification Gate | `npm run verify:prod` | `lint` + `typecheck` + `unit` + `build` + full E2E |
| Manual release workflow (`target=preview`) | Manual Release Verification | `npm run verify:preview` | `lint` + `typecheck` + `unit` + `build` + full E2E |
| Manual release workflow (`target=production`) | Manual Release Verification | `npm run verify:prod` | `lint` + `typecheck` + `unit` + `build` + full E2E |

Required CI secrets for E2E:

| Secret | Purpose |
|---|---|
| `E2E_BASE_URL` | Environment URL under test (preview or deployed app) |
| `E2E_TEST_EMAIL` | Dedicated test account email for auth E2E flows |
| `E2E_TEST_PASSWORD` | Dedicated test account password for auth E2E flows |

### Required Vercel environment variables

| Variable | Used by |
|---|---|
| `ANTHROPIC_API_KEY` | All Claude endpoints |
| `VITE_SUPABASE_URL` | Client + all API routes |
| `VITE_SUPABASE_ANON_KEY` | Browser Supabase client |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin operations (signup, export, delete) |
| `OPENAI_API_KEY` | pgvector embeddings in `/api/ask` |
| `RESEND_API_KEY` | Transactional email via `/api/signup` |
| `RESEND_FROM_EMAIL` | Sender address (e.g. `Omnexus <no-reply@notifications.omnexus.fit>`) |
| `STRIPE_SECRET_KEY` | Stripe API calls |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook verification |
| `STRIPE_PRICE_ID` | Premium subscription price |
| `APP_URL` | Stripe redirect URLs |
| `VITE_VAPID_PUBLIC_KEY` | Browser push subscription |
| `VAPID_PUBLIC_KEY` | Push notification sending |
| `VAPID_PRIVATE_KEY` | Push notification signing |
| `VAPID_EMAIL` | VAPID contact email |
| `ALLOWED_ORIGIN` | Production CORS (set to your Vercel URL) |
| `UPSTASH_REDIS_REST_URL` | Rate limiting (optional) |
| `UPSTASH_REDIS_REST_TOKEN` | Rate limiting (optional) |
| `VITE_POSTHOG_KEY` | Analytics (optional) |
| `SEED_SECRET` | Protects `/api/seed-embeddings` |

### Supabase auth configuration

In Supabase Dashboard → Authentication → URL Configuration:
- **Site URL**: your production Vercel URL
- **Redirect URLs**: `https://your-app.vercel.app/**` and `http://localhost:3000/**`

---

## Documentation

| Doc | Description |
|---|---|
| `docs/RELEASE_STRATEGY.md` | Branching, VCS, testing, and environment promotion strategy |
| `docs/RELEASE_CHECKLIST.md` | Release-day execution checklist for `dev -> main` promotions |
| `docs/ENVIRONMENT_MATRIX.md` | Environment-specific variables, branch mapping, and external service behavior |
| `docs/PLATFORM_SETUP_CHECKLIST.md` | Exact manual admin steps for GitHub, Vercel, Supabase, and Stripe |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System diagram, data models, Supabase schema |
| [docs/API.md](docs/API.md) | All serverless endpoint reference |
| [docs/MOBILE.md](docs/MOBILE.md) | Capacitor iOS + Android build guide |
| [docs/ROADMAP.md](docs/ROADMAP.md) | Shipped features + post-v1.0 plans |
| [docs/setup-procedures.md](docs/setup-procedures.md) | Upstash, CORS, E2E, Supabase setup steps |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Disclaimer

Omnexus provides **educational information only**. AI-generated content is not medical advice. Consult a qualified healthcare professional for personal health concerns.
