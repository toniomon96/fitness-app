# Omnexus — Architecture

## Overview

Omnexus is a **mobile-first SPA** with no traditional backend. All user data lives in `localStorage`. AI features are proxied through Vercel serverless functions to keep the API key server-side.

```
┌─────────────────────────────────────────────────────────┐
│                        Browser                          │
│                                                         │
│   React 19 SPA  ←→  localStorage (all user data)       │
│        │                                                │
│        │  fetch()                                       │
└────────┼────────────────────────────────────────────────┘
         │ HTTPS
┌────────┼────────────────────────────────────────────────┐
│        │         Vercel Edge                            │
│        │                                                │
│   ┌────▼──────┐   ┌─────────────┐   ┌───────────────┐  │
│   │ /api/ask  │   │/api/insights│   │/api/articles  │  │
│   └────┬──────┘   └──────┬──────┘   └───────┬───────┘  │
│        │                 │                   │          │
└────────┼─────────────────┼───────────────────┼──────────┘
         │                 │                   │
    ┌────▼─────────────────▼┐          ┌───────▼────────┐
    │   Anthropic Claude    │          │  PubMed NCBI   │
    │  claude-sonnet-4-6    │          │  E-utilities   │
    └───────────────────────┘          └────────────────┘
```

---

## Request Flow

### AI Q&A (`/ask` page)

```
User types question
       │
AskPage.tsx
       │  askOmnexus()
claudeService.ts ──→ POST /api/ask ──→ Anthropic API
                                              │
                                        claude-sonnet-4-6
                                              │
                                       ←── answer (markdown)
       │
MarkdownText.tsx renders answer
       │
appendInsightSession() → localStorage [omnexus_insight_sessions]
```

### AI Insights (`/insights` page)

```
User clicks "Analyze My Training"
       │
InsightsPage.tsx
       │
insightsService.ts
  buildInsightRequest()
  ├── reads state.history.sessions
  ├── filters last 28 days (max 20 sessions)
  └── formats plain-text workout summary
       │
claudeService.ts ──→ POST /api/insights ──→ Anthropic API
                                                   │
                                             claude-sonnet-4-6
                                                   │
                                            ←── insight (markdown)
       │
MarkdownText.tsx renders insight
```

### Research Feed (`/insights` page)

```
ArticleFeed mounts (initialCategory from user.goal)
       │
pubmedService.ts
  fetchArticlesByCategory()
  ├── check localStorage [omnexus_article_cache]
  │   └── if fresh (< 6 h) → return cached articles
  └── if stale/empty → GET /api/articles?category=&limit=5
                              │
                         api/articles.ts
                         ├── PubMed esearch  (get PMIDs)
                         ├── PubMed esummary (get metadata, JSON)
                         └── PubMed efetch   (get abstracts, XML)
                              │
                         ←── HealthArticle[]
       │
setArticleCache() → localStorage [omnexus_article_cache]
       │
ArticleCard.tsx renders each article
```

---

## State Management

Global state is managed with **Context API + `useReducer`** in [`src/store/AppContext.tsx`](../src/store/AppContext.tsx). All state changes go through typed actions.

```
AppContext (AppProvider wraps entire app)
│
├── state.user              User profile + goal + experience level
├── state.history           WorkoutSession[] + PersonalRecord[]
├── state.learningProgress  completedLessons/modules/courses, quizScores
└── state.activeSession     In-progress workout (null when idle)

Dispatch actions:
  SET_USER | UPDATE_USER
  START_SESSION | UPDATE_SESSION | COMPLETE_SESSION | CLEAR_SESSION
  COMPLETE_LESSON | COMPLETE_MODULE | COMPLETE_COURSE | RECORD_QUIZ_ATTEMPT
```

State is **hydrated from localStorage on mount** and **written back on every relevant action**.

---

## Routing

All routes are protected by `AuthGuard` (redirects to `/onboarding` if no user). The onboarding route is protected by `OnboardingGuard` (redirects to `/` if user already exists).

```
/onboarding              OnboardingPage      (public)
/                        DashboardPage       (auth)
/programs                ProgramsPage        (auth)
/programs/:programId     ProgramDetailPage   (auth)
/library                 ExerciseLibraryPage (auth)
/library/:exerciseId     ExerciseDetailPage  (auth)
/workout/active          ActiveWorkoutPage   (auth)
/history                 HistoryPage         (auth)
/learn                   LearnPage           (auth)
/learn/:courseId         CourseDetailPage    (auth)
/learn/:courseId/:moduleId  LessonPage       (auth)
/insights                InsightsPage        (auth)
/ask                     AskPage             (auth)
*                        → /                 (redirect)
```

Bottom navigation: **Home · Learn · Insights · Library · History**

---

## Component Tree

```
App
└── AppProvider (global state)
    └── RouterProvider
        ├── OnboardingGuard → OnboardingPage
        └── AuthGuard
            └── AppShell
                ├── TopBar
                ├── <page content>          (outlet)
                └── BottomNav
```

Key shared UI primitives (all in `src/components/ui/`):

| Component | Purpose |
|---|---|
| `Button` | Primary / secondary / ghost variants |
| `Card` | Surface container with optional padding |
| `Badge` | Pill labels |
| `Input` | Controlled text input |
| `Modal` | Portal-based overlay |
| `EmptyState` | Zero-state placeholder |
| `MarkdownText` | Renders AI markdown (bold, bullets, numbered lists) |

---

## Data Models

### Core Entities

```
User
├── id, name, theme
├── goal: "hypertrophy" | "fat-loss" | "general-fitness"
├── experienceLevel: "beginner" | "intermediate" | "advanced"
└── activeProgramId

WorkoutSession
├── id, programId, trainingDayIndex
├── startedAt, completedAt, durationSeconds
├── exercises: LoggedExercise[]
└── totalVolumeKg

LoggedExercise
├── exerciseId
└── sets: LoggedSet[]
    ├── setNumber, weight, reps, completed
    ├── isPersonalRecord
    └── timestamp
```

### Learning System

```
Course
├── id, title, description, coverEmoji
├── category: LearningCategory
├── difficulty: ExperienceLevel
├── relatedGoals: Goal[]
└── modules: CourseModule[]
    └── lessons: Lesson[]
        ├── content (Markdown prose)
        ├── keyPoints: string[]
        └── references: ContentReference[]
    └── quiz?: Quiz
        └── questions: QuizQuestion[]

LearningProgress (localStorage)
├── completedLessons: string[]
├── completedModules: string[]
├── completedCourses: string[]
└── quizScores: Record<moduleId, QuizAttempt>
```

### AI & Articles

```
InsightSession (localStorage, last 50)
├── id, category, createdAt
└── messages: InsightMessage[]
    ├── role: "user" | "assistant"
    └── content: string

HealthArticle (localStorage cache, 6 h TTL)
├── id (PubMed PMID)
├── title, summary, source, sourceUrl
├── publishedDate, category
└── cachedAt

ArticleCache
├── articles: HealthArticle[]
└── lastFetchedAt: Record<LearningCategory, ISO string>
```

---

## localStorage Layout

```
fit_user                      → User
fit_history                   → WorkoutHistory { sessions[], personalRecords[] }
fit_active_session            → WorkoutSession | null
fit_theme                     → "dark" | "light"
fit_program_week_cursor       → Record<programId, number>
fit_program_day_cursor        → Record<programId, number>
omnexus_learning_progress     → LearningProgress
omnexus_insight_sessions      → InsightSession[] (max 50)
omnexus_article_cache         → ArticleCache
```

---

## Personalization Logic

### Course Recommendations (Dashboard)

Courses are scored and ranked for each user:

```
score = 0
if course.relatedGoals.includes(user.goal)        → +2
if course.difficulty === user.experienceLevel      → +1

→ sort descending, take top 3, exclude completed courses
```

### Article Feed Default Category

The article feed opens on the category most relevant to the user's goal:

```
hypertrophy    → strength-training
fat-loss       → nutrition
general-fitness → strength-training
```

The user can switch tabs freely at any time.

---

## Vercel Configuration

```jsonc
// vercel.json
{
  "routes": [
    { "src": "^/api/(.*)", "dest": "/api/$1" },       // serverless functions
    { "src": "^/@(.*)",    "dest": "/@$1" },           // Vite HMR internals
    { "src": "^/src/(.*)", "dest": "/src/$1" },        // source modules (dev)
    { "src": "^/node_modules/(.*)", "dest": "/node_modules/$1" }, // deps (dev)
    { "src": "/(.*)",      "dest": "/index.html" }    // SPA fallback
  ]
}
```

The first four routes prevent Vite's internal module requests from being swallowed by the SPA fallback during `vercel dev`. In production, static assets are served directly by Vercel's CDN before routes are evaluated.

---

## Feature Roadmap

All 7 phases shipped:

| Phase | Feature | Status |
|---|---|---|
| 1 | Rebrand + Navigation | ✅ |
| 2 | Learning System (courses, quizzes, progress) | ✅ |
| 3 | Vercel Setup + Serverless scaffolding | ✅ |
| 4 | Ask Omnexus (Claude Q&A) | ✅ |
| 5 | AI Insights (workout analysis) | ✅ |
| 6 | Health Articles (PubMed feed) | ✅ |
| 7 | Personalization (recommendations) | ✅ |
