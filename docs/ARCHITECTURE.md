# Omnexus — Architecture

## Overview

Omnexus is a **mobile-first SPA** backed by **Supabase** (auth + PostgreSQL + Realtime) and deployed on **Vercel** (static frontend + serverless API functions). The browser talks to Supabase directly for data and to Vercel functions for AI/PubMed features that require server-side API keys.

```
┌─────────────────────────────────────────────────────────────────────┐
│                              Browser                                 │
│                                                                      │
│  React 19 SPA  ←──────────────────────────────────────────────────  │
│       │                                                              │
│       │  @supabase/supabase-js (anon key)                           │
│       ├──────────────────────────────────────────────────────────►  │
│       │                                                   Supabase   │
│       │  fetch() /api/* with Bearer JWT                             │
│       │                                                              │
└───────┼──────────────────────────────────────────────────────────────┘
        │ HTTPS
┌───────┼──────────────────────────────────────────────────────────────┐
│       │                    Vercel Edge                               │
│       │                                                              │
│  ┌────▼──────┐  ┌──────────────┐  ┌───────────┐  ┌──────────────┐  │
│  │ /api/ask  │  │/api/insights │  │/api/articles│  │/api/setup-  │  │
│  │           │  │              │  │             │  │ profile      │  │
│  └────┬──────┘  └──────┬───────┘  └──────┬─────┘  └──────┬───────┘  │
│       │                │                 │                │          │
│  ┌────▼──────────────────▼┐         ┌────▼────┐    ┌──────▼───────┐  │
│  │   Anthropic Claude     │         │ PubMed  │    │   Supabase   │  │
│  │   claude-sonnet-4-6    │         │  NCBI   │    │  Admin SDK   │  │
│  └───────────────────────┘         └─────────┘    └──────────────┘  │
│                                                                      │
│  ┌────────────────────┐   ┌──────────────────────┐                  │
│  │ /api/export-data   │   │ /api/delete-account  │                  │
│  │ (GET, Bearer JWT)  │   │ (DELETE, Bearer JWT) │                  │
│  └────────┬───────────┘   └──────────┬───────────┘                  │
│           └──────────────────────────┘                               │
│                          Supabase Admin SDK                          │
└──────────────────────────────────────────────────────────────────────┘
                                  │
┌─────────────────────────────────▼──────────────────────────────────┐
│                            Supabase                                  │
│                                                                      │
│   Auth (email+password)     PostgreSQL (RLS enabled)                 │
│   ├── supabase.auth.*       ├── profiles                            │
│   └── onAuthStateChange     ├── workout_sessions                    │
│                             ├── personal_records                    │
│   Realtime                  ├── learning_progress                   │
│   ├── workout_sessions      ├── custom_programs                     │
│   └── challenge_participants├── friendships                         │
│                             ├── challenges                           │
│                             └── challenge_participants              │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Auth Flow

```
New user:
  /onboarding  →  supabase.auth.signUp()  →  POST /api/setup-profile (admin insert)
               →  if email confirmation ON: show "check email" message
               →  if email confirmation OFF: dispatch SET_USER → navigate to /

Returning user:
  /login  →  supabase.auth.signInWithPassword()  →  fetch profiles  →  dispatch SET_USER  →  /

Cross-device login:
  session restored by onAuthStateChange  →  AuthGuard.hydrate()
  → fetch profile from Supabase → setUser(localStorage) → dispatch SET_USER
  → fetch history + learning + customPrograms → dispatch SET_HISTORY / SET_LEARNING_PROGRESS
  → setCustomPrograms(localStorage)

Sign out:
  signOut()  →  onAuthStateChange(null)  →  AuthGuard dispatches CLEAR_USER  →  /login
```

---

## Data Hydration Pattern

```
App init (AppProvider):
  localStorage → initialState (optimistic, shows data immediately if cached)

onAuthStateChange → session present:
  AuthGuard.hydrate() fires once per session (hydratedRef prevents re-runs on navigation)
  ├── runMigrationIfNeeded()   one-time: old localStorage data → Supabase
  ├── db.fetchHistory()        → dispatch SET_HISTORY
  ├── db.fetchLearningProgress() → dispatch SET_LEARNING_PROGRESS
  └── db.fetchCustomPrograms() → setCustomPrograms(localStorage)

On every workout complete:
  completeWorkout() → localStorage (instant) + upsertSession() fire-and-forget

On every learning action:
  AppContext reducer → localStorage (instant) + upsertLearningProgress() (useEffect, fire-and-forget)
```

---

## Request Flows

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
```

### Research Feed

```
ArticleFeed mounts
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
```

### Community: Activity Feed (Realtime)

```
ActivityFeedPage mounts
       │
getFriendFeed(userId) → initial load
       │
supabase.channel('feed_realtime')
  .on('postgres_changes', INSERT, 'workout_sessions')
  → getFriendFeed() reload on new insert
       │
ActivityItem.tsx renders each session
```

### GDPR: Data Export

```
ProfilePage → "Export My Data"
       │
supabase.auth.getSession() → access_token
       │
GET /api/export-data  Authorization: Bearer <token>
       │
api/export-data.ts
  supabaseAdmin.auth.getUser(token)  → verify JWT
  Promise.all([profiles, sessions, PRs, learning, programs])
       │
  ←── JSON attachment: omnexus-data-YYYY-MM-DD.json
```

### GDPR: Account Deletion

```
ProfilePage → "Delete Account" → confirm
       │
DELETE /api/delete-account  Authorization: Bearer <token>
       │
api/delete-account.ts
  verify JWT
  delete: challenge_participants, friendships, personal_records,
          workout_sessions, learning_progress, custom_programs,
          challenges (created_by), profiles
  supabaseAdmin.auth.admin.deleteUser(userId)
       │
  ←── 200 ok
       │
client: localStorage.clear() → signOut() → /login
```

---

## State Management

Global state is managed with **Context API + `useReducer`** in [`src/store/AppContext.tsx`](../src/store/AppContext.tsx).

```
AppContext (AppProvider wraps entire app)
│
├── state.user              User profile (null until authenticated)
├── state.history           WorkoutSession[] + PersonalRecord[]
├── state.learningProgress  completedLessons/modules/courses, quizScores
├── state.activeSession     In-progress workout (null when idle)
└── state.theme             "dark" | "light"

Dispatch actions:
  SET_USER | CLEAR_USER
  SET_ACTIVE_SESSION | UPDATE_ACTIVE_SESSION | CLEAR_ACTIVE_SESSION
  APPEND_SESSION | SET_HISTORY
  TOGGLE_THEME | SET_THEME
  SET_LEARNING_PROGRESS
  COMPLETE_LESSON | COMPLETE_MODULE | COMPLETE_COURSE | RECORD_QUIZ_ATTEMPT
```

---

## Routing

```
/ (RootLayout — renders CookieConsent globally)
├── /onboarding          OnboardingGuard → OnboardingPage     (public; redirect → / if session)
├── /login               LoginGuard → LoginPage               (public; redirect → / if session)
├── /privacy             PrivacyPolicyPage                    (public)
└── AuthGuard (requires session + state.user)
    ├── /                DashboardPage
    ├── /profile         ProfilePage
    ├── /programs        ProgramsPage
    ├── /programs/builder ProgramBuilderPage
    ├── /programs/:id    ProgramDetailPage
    ├── /library         ExerciseLibraryPage
    ├── /library/:id     ExerciseDetailPage
    ├── /workout/active  ActiveWorkoutPage
    ├── /history         HistoryPage
    ├── /learn           LearnPage
    ├── /learn/:courseId CourseDetailPage
    ├── /learn/:courseId/:moduleId  LessonPage
    ├── /insights        InsightsPage
    ├── /ask             AskPage
    ├── /feed            ActivityFeedPage   (Community)
    ├── /friends         FriendsPage        (Community)
    ├── /leaderboard     LeaderboardPage    (Community)
    └── /challenges      ChallengesPage     (Community)
```

Bottom navigation: **Home · Learn · Insights · Library · History · Community**

---

## Component Tree

```
App
└── ErrorBoundary
    └── AuthProvider (Supabase onAuthStateChange)
        └── AppProvider (global state + useReducer)
            └── RouterProvider
                └── RootLayout (renders <CookieConsent /> globally)
                    ├── OnboardingGuard → OnboardingPage
                    ├── LoginGuard → LoginPage
                    ├── PrivacyPolicyPage
                    └── AuthGuard (session check + Supabase hydration)
                        └── AppShell
                            ├── TopBar
                            ├── <page content>   (Outlet)
                            └── BottomNav (6 tabs, evenly distributed)
```

Key shared UI primitives (all in `src/components/ui/`):

| Component | Purpose |
|---|---|
| `Button` | Primary / secondary / ghost / success variants |
| `Card` | Surface container with optional padding |
| `Badge` | Pill labels |
| `Input` | Controlled text input with label + error |
| `Modal` | Portal-based overlay |
| `EmptyState` | Zero-state placeholder |
| `MarkdownText` | Renders AI markdown (bold, bullets, numbered lists) |
| `CookieConsent` | Fixed bottom banner, persists accept/decline to `localStorage` |

---

## Data Models

### Core Entities

```
User (localStorage + Supabase profiles)
├── id: uuid
├── name, theme
├── goal: "hypertrophy" | "fat-loss" | "general-fitness"
├── experienceLevel: "beginner" | "intermediate" | "advanced"
└── activeProgramId: string | undefined

WorkoutSession (Supabase workout_sessions)
├── id: uuid, programId, trainingDayIndex
├── startedAt, completedAt, durationSeconds
├── exercises: LoggedExercise[]
└── totalVolumeKg: number

LoggedExercise
├── exerciseId
└── sets: LoggedSet[]
    ├── setNumber, weight, reps, completed
    ├── isPersonalRecord
    ├── rpe?: number        (1–10, optional)
    └── timestamp

PersonalRecord (Supabase personal_records)
├── exerciseId, weight, reps
├── achievedAt, sessionId
└── unique per (user_id, exercise_id)
```

### Learning System

```
LearningProgress (localStorage + Supabase learning_progress)
├── completedLessons: string[]
├── completedModules: string[]
├── completedCourses: string[]
├── quizScores: Record<moduleId, QuizAttempt>
└── lastActivityAt: ISO string
```

### Community

```
Friendship (Supabase friendships)
├── id, requester_id, addressee_id
├── status: "pending" | "accepted" | "blocked"
└── created_at

Challenge (Supabase challenges)
├── id, created_by, name, description
├── type: "volume" | "streak" | "sessions"
├── targetValue, startDate, endDate
└── is_public

ChallengeParticipant (Supabase challenge_participants)
├── challenge_id, user_id
├── progress: number
└── joined_at
```

---

## Supabase Schema

Run these in the Supabase SQL editor in order.

### Phase 2 — Profiles

```sql
create table profiles (
  id uuid references auth.users primary key,
  name text not null,
  goal text not null,
  experience_level text not null,
  active_program_id text,
  avatar_url text,
  is_public bool default true,
  created_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "Users manage own profile" on profiles
  using (auth.uid() = id) with check (auth.uid() = id);
create policy "Public profiles visible to authenticated users" on profiles
  for select using (is_public = true and auth.role() = 'authenticated');
```

### Phase 3 — Cloud Sync

```sql
create table workout_sessions (
  id uuid primary key,
  user_id uuid references profiles not null,
  program_id text not null,
  training_day_index int not null,
  started_at timestamptz not null,
  completed_at timestamptz,
  duration_seconds int,
  exercises jsonb not null default '[]',
  total_volume_kg numeric,
  notes text
);
alter table workout_sessions enable row level security;
create policy "Users manage own sessions" on workout_sessions
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table personal_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles not null,
  exercise_id text not null,
  weight numeric not null,
  reps int not null,
  achieved_at timestamptz not null,
  session_id uuid,
  unique (user_id, exercise_id)
);
alter table personal_records enable row level security;
create policy "Users manage own PRs" on personal_records
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table custom_programs (
  id uuid primary key,
  user_id uuid references profiles not null,
  data jsonb not null,
  created_at timestamptz default now()
);
alter table custom_programs enable row level security;
create policy "Users manage own programs" on custom_programs
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table learning_progress (
  user_id uuid references profiles primary key,
  completed_lessons text[] default '{}',
  completed_modules text[] default '{}',
  completed_courses text[] default '{}',
  quiz_scores jsonb default '{}',
  last_activity_at timestamptz
);
alter table learning_progress enable row level security;
create policy "Users manage own progress" on learning_progress
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

### Phase 5 — Community

```sql
create table friendships (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid references profiles not null,
  addressee_id uuid references profiles not null,
  status text check (status in ('pending', 'accepted', 'blocked')) default 'pending',
  created_at timestamptz default now(),
  unique (requester_id, addressee_id)
);
alter table friendships enable row level security;
create policy "Users see own friendships" on friendships
  using (auth.uid() = requester_id or auth.uid() = addressee_id);
create policy "Users manage requests they sent" on friendships
  with check (auth.uid() = requester_id);

create table challenges (
  id uuid primary key default gen_random_uuid(),
  created_by uuid references profiles not null,
  name text not null,
  description text,
  type text check (type in ('volume', 'streak', 'sessions')) not null,
  target_value numeric,
  start_date date not null,
  end_date date not null,
  is_public bool default true,
  created_at timestamptz default now()
);
alter table challenges enable row level security;
create policy "Public challenges readable" on challenges for select using (is_public = true);
create policy "Creators manage own challenges" on challenges
  using (auth.uid() = created_by) with check (auth.uid() = created_by);

create table challenge_participants (
  challenge_id uuid references challenges not null,
  user_id uuid references profiles not null,
  progress numeric default 0,
  joined_at timestamptz default now(),
  primary key (challenge_id, user_id)
);
alter table challenge_participants enable row level security;
create policy "Participants visible" on challenge_participants for select using (true);
create policy "Users manage own participation" on challenge_participants
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

---

## Personalization Logic

### Course Recommendations

```
score = 0
if course.relatedGoals.includes(user.goal)        → +2
if course.difficulty === user.experienceLevel      → +1

→ sort descending, take top 3, exclude completed courses
```

### Article Feed Default Category

```
hypertrophy     → strength-training
fat-loss        → nutrition
general-fitness → strength-training
```

---

## Phase Roadmap

| Phase | Feature | Status |
|---|---|---|
| 1 | Rebrand + Navigation (Omnexus branding) | ✅ |
| 2 | Learning System (courses, quizzes, progress) | ✅ |
| 3 | Vercel Setup + Serverless scaffolding | ✅ |
| 4 | Ask Omnexus (Claude Q&A) | ✅ |
| 5 | AI Insights (workout analysis) | ✅ |
| 6 | Health Articles (PubMed feed) | ✅ |
| 7 | Personalization (recommendations) | ✅ |
| 8 | Training Depth (RPE, progression chart, program builder, CI) | ✅ |
| Phase 2 (prod) | Supabase Auth (email+password, profile management) | ✅ |
| Phase 3 (prod) | Cloud Data Sync (Supabase source of truth, migration) | ✅ |
| Phase 5 (prod) | Community (friends, leaderboard, challenges, feed) | ✅ |
| Phase 6 (prod) | GDPR (cookie consent, privacy policy, export, deletion) | ✅ |

---

## Vercel Configuration

```jsonc
// vercel.json
{
  "routes": [
    { "src": "^/api/(.*)", "dest": "/api/$1" },
    { "src": "^/@(.*)",    "dest": "/@$1" },
    { "src": "^/src/(.*)", "dest": "/src/$1" },
    { "src": "^/node_modules/(.*)", "dest": "/node_modules/$1" },
    { "src": "/(.*)",      "dest": "/index.html" }
  ]
}
```

The first four routes prevent Vite's internal module requests from being swallowed by the SPA fallback during `vercel dev`. In production, static assets are served directly by Vercel's CDN.
