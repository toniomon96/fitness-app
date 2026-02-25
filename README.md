# Omnexus

A science-backed health and fitness platform built as a mobile-first progressive web app. Omnexus combines structured workout tracking with AI-powered coaching, evidence-based learning, and real-time research from PubMed.

---

## Features

| Feature | Description |
|---|---|
| **Workout Tracking** | Log sessions, track sets/reps/weight, auto-detect personal records |
| **Training Programs** | Pre-built strength and fitness programs with week/day progression |
| **Exercise Library** | 50+ exercises with instructions, muscle groups, and equipment filters |
| **Learn** | Structured courses with lessons, quizzes, and progress tracking |
| **Ask Omnexus** | AI Q&A powered by Claude — evidence-based answers with citations |
| **AI Insights** | Claude analyzes your last 4 weeks of training and gives recommendations |
| **Research Feed** | Live PubMed articles filtered by category, cached for 6 hours |
| **Personalization** | Course recommendations and article defaults based on your goal |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript 5.7, Vite 6 |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| AI | Anthropic Claude (`claude-sonnet-4-6`) via `@anthropic-ai/sdk` |
| Serverless | Vercel Functions (Node.js 20) |
| External API | PubMed E-utilities (free, no key required) |
| Storage | `localStorage` only — no database |
| Deployment | Vercel |

---

## Prerequisites

- Node.js 20+
- [Vercel CLI](https://vercel.com/docs/cli): `npm i -g vercel`
- An Anthropic API key from [console.anthropic.com](https://console.anthropic.com)

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
```

> `.env.local` is gitignored. Never commit API keys.

### 3. Run the dev server

```bash
vercel dev
```

This starts both the Vite frontend and the Vercel serverless functions (`/api/*`) on a single local port (default `http://localhost:3000`).

> **Do not use `npm run dev`** for local development — it runs Vite only and the AI/articles features will not work without the serverless functions.

---

## Project Structure

```
fitness-app/
├── api/                        # Vercel serverless functions
│   ├── ask.ts                  # POST /api/ask    → Claude Q&A
│   ├── insights.ts             # POST /api/insights → Claude analysis
│   └── articles.ts             # GET  /api/articles → PubMed proxy
│
├── src/
│   ├── components/
│   │   ├── dashboard/          # WelcomeBanner, StreakDisplay, etc.
│   │   ├── insights/           # ArticleCard, ArticleFeed
│   │   ├── layout/             # AppShell, BottomNav, TopBar, ThemeToggle
│   │   ├── learn/              # CourseCard, LessonReader, QuizBlock, CourseRecommendations
│   │   ├── programs/           # ProgramCard, DaySchedule
│   │   ├── ui/                 # Button, Card, Badge, Input, Modal, MarkdownText, etc.
│   │   └── workout/            # ExerciseBlock, SetRow, RestTimer, etc.
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
│   ├── pages/
│   │   ├── DashboardPage.tsx
│   │   ├── ProgramsPage.tsx / ProgramDetailPage.tsx
│   │   ├── ExerciseLibraryPage.tsx / ExerciseDetailPage.tsx
│   │   ├── ActiveWorkoutPage.tsx
│   │   ├── HistoryPage.tsx
│   │   ├── LearnPage.tsx / CourseDetailPage.tsx / LessonPage.tsx
│   │   ├── InsightsPage.tsx
│   │   ├── AskPage.tsx
│   │   └── OnboardingPage.tsx
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
│       ├── localStorage.ts     # Typed read/write helpers
│       ├── programUtils.ts
│       └── volumeUtils.ts
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

| Key | Value |
|---|---|
| `ANTHROPIC_API_KEY` | Your Anthropic API key |

The key must be set for **Production**, **Preview**, and **Development** environments.

---

## localStorage Keys

| Key | Contents |
|---|---|
| `fit_user` | User profile |
| `fit_history` | Workout sessions + personal records |
| `fit_active_session` | In-progress workout |
| `fit_theme` | `"dark"` or `"light"` |
| `fit_program_week_cursor` | Week progress per program |
| `fit_program_day_cursor` | Day progress per program |
| `omnexus_learning_progress` | Completed lessons, modules, courses, quiz scores |
| `omnexus_insight_sessions` | Ask Omnexus Q&A history (last 50) |
| `omnexus_article_cache` | PubMed article cache per category |

---

## AI Disclaimer

Omnexus provides **educational information only**. AI-generated content is not medical advice. Users should consult a qualified healthcare professional for personal health concerns.
