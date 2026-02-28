# Omnexus — Architecture

## Overview

Omnexus is a **mobile-first SPA** backed by **Supabase** (auth + PostgreSQL + Realtime) and deployed on **Vercel** (static frontend + serverless API functions + cron jobs). The browser talks to Supabase directly for data and to Vercel functions for AI/PubMed features that require server-side API keys.

```
┌──────────────────────────────────────────────────────────────────────┐
│                              Browser                                  │
│                                                                       │
│  React 19 SPA                                                         │
│  ├── AppContext (useReducer — global state)                           │
│  ├── AuthContext (Supabase onAuthStateChange)                         │
│  ├── ToastContext (in-app success/error notifications)                │
│  ├── localStorage (read-through cache + guest data)                  │
│  └── public/sw.js (service worker — Web Push handler)               │
│                                                                       │
│  @supabase/supabase-js (anon key) ──────────────────────►            │
│  fetch() /api/* with Bearer JWT ────────────────────────►            │
└──────────────────────────────────────────────────────────────────────┘
                    │ HTTPS
┌───────────────────┼──────────────────────────────────────────────────┐
│                   │              Vercel Edge                          │
│                                                                       │
│  /api/ask              → Anthropic Claude (claude-sonnet-4-6)         │
│  /api/insights         → Anthropic Claude (claude-sonnet-4-6)         │
│  /api/onboard          → Anthropic Claude (multi-turn onboarding)     │
│  /api/generate-program → Anthropic Claude (mesocycle generation)      │
│  /api/articles         → PubMed E-utilities (NCBI)                    │
│  /api/setup-profile    → Supabase Admin SDK                           │
│  /api/notify-friends   → web-push (VAPID) → push_subscriptions        │
│  /api/export-data      → Supabase Admin SDK                           │
│  /api/delete-account   → Supabase Admin SDK                           │
│                                                                       │
│  Cron jobs (vercel.json):                                             │
│  /api/daily-reminder  [0 9 * * *]  → push all subscribers            │
│  /api/weekly-digest   [0 8 * * 1]  → push volume summary to all      │
└──────────────────────────────────────────────────────────────────────┘
                    │
┌───────────────────▼──────────────────────────────────────────────────┐
│                          Supabase                                     │
│                                                                       │
│  Auth (email+password)       PostgreSQL (RLS enabled)                 │
│  ├── supabase.auth.*         ├── profiles                            │
│  └── onAuthStateChange       ├── workout_sessions                    │
│                              ├── personal_records                    │
│  Realtime                    ├── learning_progress                   │
│  ├── workout_sessions INSERT ├── custom_programs                     │
│  └── challenge_participants  ├── training_profiles  ← NEW            │
│      UPDATE                  ├── friendships                         │
│                              ├── challenges                           │
│                              ├── challenge_participants              │
│                              ├── reactions                           │
│                              ├── push_subscriptions                  │
│                              ├── nutrition_logs                      │
│                              ├── measurements                        │
│                              ├── exercise_embeddings  ← Phase 2      │
│                              └── content_embeddings   ← Phase 2      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Auth Flow

```
New user (AI onboarding):
  /onboarding  →  Step 0: email + password input
               →  Step 1: name input
               →  Step 2: OnboardingChat (POST /api/onboard, multi-turn)
                          → AI gathers goals, training age, schedule, equipment, injuries
                          → profileComplete: true → UserTrainingProfile produced
               →  Step 3: ProfileSummaryCard
                          → POST /api/generate-program → Program JSON returned
                          → supabase.auth.signUp()
                          → saveAiGeneratedProgram() → custom_programs table
                          → POST /api/setup-profile (admin insert, sets activeProgramId)
                          → upsertTrainingProfile() → training_profiles table
               →  if email confirmation ON: show "check email" message
               →  if email confirmation OFF: dispatch SET_USER → navigate to /

Guest user:
  /guest  →  GuestSetupPage (name + goal)  →  localStorage omnexus_guest = true
          →  navigate to / with GuestOrAuthGuard allowing access
          →  AuthOnly routes (/feed, /friends, etc.) show upgrade prompt

Returning user:
  /login  →  supabase.auth.signInWithPassword()  →  fetch profile  →  dispatch SET_USER  →  /

Cross-device login:
  session restored by onAuthStateChange  →  AuthGuard.hydrate()
  → fetch profile from Supabase → dispatch SET_USER
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
  ├── runMigrationIfNeeded()     one-time: old localStorage data → Supabase
  ├── db.fetchHistory()          → dispatch SET_HISTORY
  ├── db.fetchLearningProgress() → dispatch SET_LEARNING_PROGRESS
  └── db.fetchCustomPrograms()   → setCustomPrograms(localStorage)

On every workout complete:
  completeWorkout() → localStorage (instant) + upsertSession() fire-and-forget
                    + POST /api/notify-friends (fire-and-forget)

On every learning action:
  AppContext reducer → localStorage (instant)
  + upsertLearningProgress() debounced 2s (prevents excessive writes during quizzes)

All Supabase write helpers throw Error('[fnName] message') on failure.
Callers catch and display via useToast().
```

---

## Request Flows

### AI Q&A (`/ask` page)

```
User types question
       │
AskPage.tsx — maintains conversationHistory[] (last 4 exchanges)
       │  askOmnexus({ question, userContext, conversationHistory })
claudeService.ts ──→ POST /api/ask ──→ Anthropic API
                                              │
                                        claude-sonnet-4-6
                                              │
                                       ←── answer (markdown)
       │
MarkdownText.tsx renders answer
Shows follow-up chip suggestions
Shows context limit indicator at 4+ exchanges
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
  │   └── if fresh (< 6h) → return cached articles
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
getFriendFeed(userId) → initial load (skeleton shown while loading)
       │
supabase.channel('feed_realtime')
  .on('postgres_changes', INSERT, 'workout_sessions')
  → getFriendFeed() reload on new insert
       │
ActivityItem.tsx renders each session with emoji reactions
onReact / onUnreact → optimistic update → addReaction / removeReaction
```

### Push Notifications

```
User enables notifications (ProfilePage)
       │
pushSubscription.ts
  getPushPermission() → browser Notification.requestPermission()
  subscribeToPush()   → navigator.serviceWorker.ready.pushManager.subscribe()
  → saves PushSubscription to Supabase push_subscriptions table

On workout complete:
  useWorkoutSession.completeWorkout()
  → POST /api/notify-friends (fire-and-forget)
  → server fetches friends' push_subscriptions → web-push.sendNotification()

public/sw.js handles:
  push event → self.registration.showNotification()
  notificationclick → clients.openWindow(targetUrl)
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
ProfilePage → "Delete Account" → ConfirmDialog
       │
DELETE /api/delete-account  Authorization: Bearer <token>
       │
api/delete-account.ts
  verify JWT
  delete in order: challenge_participants, friendships, push_subscriptions,
                   personal_records, workout_sessions, nutrition_logs,
                   measurements, learning_progress, custom_programs,
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
├── state.user              User profile (null until authenticated or guest)
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

ToastContext (ToastProvider wraps RouterProvider)
├── toast(message, variant, duration) → adds auto-dismissing notification
└── dismiss(id) → removes immediately
    Variants: 'success' | 'error' | 'info'
```

---

## Routing

```
/ (RootLayout)
├── /onboarding          OnboardingGuard → OnboardingPage     (public)
├── /login               LoginGuard → LoginPage               (public)
├── /guest               GuestSetupPage                       (public)
├── /privacy             PrivacyPolicyPage                    (public)
│
└── GuestOrAuthGuard (guest localStorage flag or Supabase session)
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
    ├── /nutrition       NutritionPage
    ├── /measurements    MeasurementsPage
    │
    └── AuthOnlyGuard (Supabase session required — guests see upgrade prompt)
        ├── /feed        ActivityFeedPage   (Community)
        ├── /friends     FriendsPage        (Community)
        ├── /leaderboard LeaderboardPage    (Community)
        └── /challenges  ChallengesPage     (Community)
```

**Bottom navigation: Home · Learn · Insights · Library · History (5 tabs)**

Community (`/feed`) and Nutrition (`/nutrition`) are accessible via Dashboard quick-action grid.

---

## Component Tree

```
App
└── ErrorBoundary
    └── AuthProvider (Supabase onAuthStateChange)
        └── AppProvider (global state + useReducer)
            └── ToastProvider (in-app notifications)
                └── RouterProvider
                    ├── ToastContainer (fixed overlay, above BottomNav)
                    └── RootLayout
                        ├── OnboardingGuard → OnboardingPage
                        ├── LoginGuard → LoginPage
                        ├── GuestSetupPage
                        ├── PrivacyPolicyPage
                        └── GuestOrAuthGuard → AppShell
                                              ├── TopBar
                                              ├── <page content> (Outlet)
                                              └── BottomNav (5 tabs)
```

**UI Primitives** (`src/components/ui/`):

| Component | Purpose |
|---|---|
| `Button` | Primary / secondary / ghost / success / danger variants |
| `Card` | Surface container; `gradient` prop for premium dark bg |
| `Badge` | Pill labels |
| `Input` | Controlled text input with label + error |
| `Modal` | Portal-based overlay |
| `ConfirmDialog` | Reusable confirm/cancel modal (replaces `window.confirm`) |
| `Skeleton` | Animated pulse placeholder (text / card / avatar / rect variants) |
| `Toast` + `ToastContainer` | Auto-dismissing notification overlay |
| `EmptyState` | Zero-state placeholder |
| `MarkdownText` | Renders AI markdown (bold, bullets, numbered lists) |
| `CookieConsent` | Fixed bottom banner; persists accept/decline to localStorage |

---

## Data Models

### AI Training Profile

```
UserTrainingProfile (Supabase training_profiles + passed through onboarding flow)
├── goals: Goal[]                  (e.g. ["hypertrophy", "fat-loss"])
├── trainingAgeYears: number       (0 = beginner)
├── daysPerWeek: number            (1–7)
├── sessionDurationMinutes: number
├── equipment: string[]            (e.g. ["barbell", "dumbbell"])
├── injuries: string[]             (e.g. ["lower back"])
└── aiSummary: string              (1–2 sentence Claude-generated summary)

Exercise (src/data/exercises.ts)
├── … (existing fields)
└── pattern?: MovementPattern       (squat | hinge | push-horizontal | push-vertical |
                                     pull-horizontal | pull-vertical | isolation | carry | cardio)

Program (Supabase custom_programs for AI-generated)
├── … (existing fields)
├── isCustom?: boolean
└── isAiGenerated?: boolean         (true for Claude-generated programs)
                                     → shown as "AI" badge in CurrentProgramCard + ProgramDetailPage
```

### Core Entities

```
User (localStorage + Supabase profiles)
├── id: uuid
├── name, theme
├── goal: "hypertrophy" | "fat-loss" | "general-fitness"
├── experienceLevel: "beginner" | "intermediate" | "advanced"
├── activeProgramId: string | undefined
└── isGuest?: boolean   (true for localStorage-only guest accounts)

WorkoutSession (Supabase workout_sessions)
├── id: uuid, programId, trainingDayIndex
├── startedAt, completedAt, durationSeconds
├── exercises: LoggedExercise[]
└── totalVolumeKg: number

LoggedExercise
├── exerciseId
└── sets: LoggedSet[]
    ├── setNumber, weight, reps, completed
    ├── isPersonalRecord?: boolean
    ├── rpe?: number        (1–10, optional; shown as tap-button row in UI)
    └── timestamp: string

PersonalRecord (Supabase personal_records)
├── exerciseId, weight, reps
├── achievedAt, sessionId
└── unique per (user_id, exercise_id)

NutritionLog (Supabase nutrition_logs)
├── id, userId, loggedAt (date)
├── mealName?, calories?, protein_g?, carbs_g?, fat_g?
└── notes?

Measurement (Supabase measurements)
├── id, userId, metric (e.g. "weight_kg", "body_fat_pct")
├── value: number
└── recordedAt: string
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

FeedSession (view over workout_sessions + profiles)
├── sessionId, userId, userName
├── programId, trainingDayIndex, startedAt
└── totalVolumeKg, exerciseCount

FeedReaction (Supabase reactions)
├── id, sessionId, userId
└── emoji: "💪" | "🔥" | "👏" | "⚡"

Challenge (Supabase challenges)
├── id, created_by, name, description
├── type: "volume" | "streak" | "sessions"
├── targetValue, startDate, endDate
└── is_public
```

---

## Supabase Schema

Run these in the Supabase SQL editor in order.

### AI Training Profiles

```sql
create table public.training_profiles (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  goals       text[] not null default '{}',
  training_age_years numeric not null default 0,
  days_per_week int not null default 3,
  session_duration_minutes int not null default 60,
  equipment   text[] not null default '{}',
  injuries    text[] not null default '{}',
  ai_summary  text,
  raw_profile jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique(user_id)
);
alter table public.training_profiles enable row level security;
create policy "Users can manage own profile"
  on public.training_profiles for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

### Profiles

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

### Cloud Sync

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

### Community

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

create table reactions (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references workout_sessions not null,
  user_id uuid references profiles not null,
  emoji text not null,
  created_at timestamptz default now(),
  unique (session_id, user_id)
);
alter table reactions enable row level security;
create policy "Reactions visible to authenticated users" on reactions
  for select using (auth.role() = 'authenticated');
create policy "Users manage own reactions" on reactions
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

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

### Push Notifications

```sql
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
```

### Nutrition & Measurements

```sql
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

create table measurements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles not null,
  metric text not null,
  value numeric not null,
  recorded_at date not null,
  created_at timestamptz default now()
);
alter table measurements enable row level security;
create policy "Users manage own measurements" on measurements
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

### Phase 2 — Embeddings (pgvector)

```sql
-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Exercise embeddings (1536-dim, text-embedding-3-small)
CREATE TABLE IF NOT EXISTS exercise_embeddings (
  id          text PRIMARY KEY,  -- Exercise.id
  embedding   vector(1536) NOT NULL,
  metadata    jsonb NOT NULL DEFAULT '{}',
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- Content embeddings (lessons + courses)
CREATE TABLE IF NOT EXISTS content_embeddings (
  id          text PRIMARY KEY,  -- lesson.id or course.id
  type        text NOT NULL,     -- 'lesson' | 'course'
  embedding   vector(1536) NOT NULL,
  metadata    jsonb NOT NULL DEFAULT '{}',
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- IVFFlat indexes for cosine similarity search
CREATE INDEX IF NOT EXISTS exercise_embeddings_embedding_idx
  ON exercise_embeddings USING ivfflat (embedding vector_cosine_ops) WITH (lists = 10);
CREATE INDEX IF NOT EXISTS content_embeddings_embedding_idx
  ON content_embeddings USING ivfflat (embedding vector_cosine_ops) WITH (lists = 10);

-- RPC: search exercises by semantic similarity
CREATE OR REPLACE FUNCTION match_exercises(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.5,
  match_count     int   DEFAULT 5
)
RETURNS TABLE (id text, metadata jsonb, similarity float)
LANGUAGE sql STABLE AS $$
  SELECT e.id, e.metadata, 1 - (e.embedding <=> query_embedding) AS similarity
  FROM exercise_embeddings e
  WHERE 1 - (e.embedding <=> query_embedding) >= match_threshold
  ORDER BY e.embedding <=> query_embedding
  LIMIT match_count;
$$;

-- RPC: search lessons/courses by semantic similarity
CREATE OR REPLACE FUNCTION match_content(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.5,
  match_count     int   DEFAULT 5
)
RETURNS TABLE (id text, type text, metadata jsonb, similarity float)
LANGUAGE sql STABLE AS $$
  SELECT c.id, c.type, c.metadata, 1 - (c.embedding <=> query_embedding) AS similarity
  FROM content_embeddings c
  WHERE 1 - (c.embedding <=> query_embedding) >= match_threshold
  ORDER BY c.embedding <=> query_embedding
  LIMIT match_count;
$$;

-- RLS: public read; service role writes only
ALTER TABLE exercise_embeddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_embeddings  ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read exercise_embeddings" ON exercise_embeddings FOR SELECT USING (true);
CREATE POLICY "Public read content_embeddings"  ON content_embeddings  FOR SELECT USING (true);
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
| Prod 2 | Supabase Auth (email+password, profile management) | ✅ |
| Prod 3 | Cloud Data Sync (Supabase source of truth, migration) | ✅ |
| Prod 5 | Community (friends, leaderboard, challenges, real-time feed) | ✅ |
| Prod 6 | GDPR (cookie consent, privacy policy, export, deletion) | ✅ |
| Expansion | Consumer-ready: PRs, streaks, heatmap, weekly recap, guest mode, share cards | ✅ |
| Expansion | Push Notifications (VAPID, service worker, daily cron, friend alerts) | ✅ |
| Expansion | Nutrition Tracking (macro logging, goals, date navigator) | ✅ |
| E1 | Toast system + Supabase write error propagation | ✅ |
| E2 | Performance: debounced learning sync, React.memo, memoized lists | ✅ |
| E3 | Mobile UX: 5-tab nav, RPE tap-buttons, ConfirmDialog | ✅ |
| E4 | Visual polish: Skeleton loaders, SVG ring, gradient cards, quiz animation | ✅ |
| E5 | Test coverage: db.test, volumeUtils, programUtils; lint fixes | ✅ |
| Capacitor | iOS + Android packaging (v8): status bar, splash, haptics, safe areas, `apiBase` abstraction | ✅ |
| Phase 1 AI | AI Onboarding Agent + Generative Mesocycle Engine + Exercise `MovementPattern` tags | ✅ |
| Phase 2 Learning | Supabase pgvector embeddings, semantic content retrieval, dynamic micro-lesson generation | ✅ |

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
  ],
  "crons": [
    { "path": "/api/daily-reminder", "schedule": "0 9 * * *" },
    { "path": "/api/weekly-digest",  "schedule": "0 8 * * 1" }
  ]
}
```

The first four routes prevent Vite's internal module requests from being swallowed by the SPA fallback during `vercel dev`. In production, static assets are served directly by Vercel's CDN. Cron jobs require a Vercel Pro plan or higher.
