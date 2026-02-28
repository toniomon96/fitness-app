# Omnexus — Project Brief

> This document is a complete, self-contained description of the Omnexus app.
> It is intended to be pasted into an LLM prompt as context.

---

## What Is Omnexus?

Omnexus is a **mobile-first health and fitness web app** built for people who want to train smarter, not just harder. It combines structured workout tracking, AI-powered coaching, evidence-based education, live research from peer-reviewed journals, social/community features, and body metric tracking — all backed by Supabase and deployed on Vercel.

Users can sign up with an email + password, or try the app instantly in **Guest Mode** (no account required). Authenticated users get cloud sync, community features, and push notifications on top of everything guests can access.

---

## Target User

- Age 18–40, fitness-conscious, tech-comfortable
- Has a specific goal: build muscle (hypertrophy), lose fat, or improve general fitness
- Wants science-backed guidance, not bro-science
- Primarily uses the app on a smartphone

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript 5.7, Vite 6 |
| Routing | React Router v7 (SPA, client-side) |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Auth & Database | Supabase (Auth, PostgreSQL, Realtime, RLS) |
| AI | Anthropic Claude (`claude-sonnet-4-6`) via Vercel serverless functions |
| Embeddings | OpenAI `text-embedding-3-small` (1536 dims) via `/api/seed-embeddings` + `/api/recommend-content` |
| Vector Search | Supabase pgvector — `exercise_embeddings` + `content_embeddings` tables, IVFFlat cosine index |
| Push Notifications | Web Push API + VAPID via `web-push` npm package |
| External Data | PubMed E-utilities API (free, no key required) |
| State | Context API + useReducer; Supabase as source of truth; localStorage as read-through cache |
| Deployment | Vercel (SPA + serverless functions + cron jobs) |
| Native Mobile | Capacitor v8 — iOS + Android packaging (App Store / Play Store) |
| Testing | Vitest (28 unit tests) |
| CI/CD | GitHub Actions (lint + tsc + test on every push/PR) |

---

## User Onboarding

**Guest Mode:** Enter a name and choose a goal — no email required. All data stored locally. Community routes and push notifications prompt an upgrade.

**Full Account (AI-Native Flow):**
1. Enter email + password (Supabase Auth)
2. Enter name
3. **AI Onboarding Chat** — a multi-turn conversation with Claude that collects training history, goals, schedule, available equipment, and injury/limitation history. The AI dynamically asks follow-up questions and renders quick-reply chip buttons for common answers. When the AI has gathered sufficient data it outputs a `UserTrainingProfile` with a natural-language `aiSummary`.
4. **Profile Summary** — the user reviews their AI-generated summary (goal, days/week, equipment) and clicks "Generate My 8-Week Program"
5. The **Generative Mesocycle Engine** (`POST /api/generate-program`) calls Claude to produce a complete 8-week `Program` JSON tailored to the profile. All exercise IDs are validated server-side; a hardcoded fallback program is used if Claude fails.

The training profile is stored in Supabase `training_profiles` (with RLS) and the generated program is saved as a custom program. All subsequent data (workouts, learning progress, custom programs) syncs to Supabase and is accessible across devices.

---

## Current Features

### 1. Dashboard (Home)

- Personalized welcome with user name and goal
- Resume banner if a workout is in progress
- Workout streak display (7-day dot grid with weekday labels)
- Active program card (name, week, progress)
- TodayCard — unified next workout + next lesson card (one-tap start)
- Quick-action grid: Quick Log, Plates, Measure, Community, Nutrition
- Weekly recap card (sessions/volume/time, trend bars, share button)
- Muscle heat map (SVG front/back body diagram colored by frequency)
- Personalized course recommendations (scored by goal + difficulty)

### 2. Training Programs

- Browse pre-built programs filtered by goal and experience level
- Program detail page: description, schedule overview, days per week
- Set any program as the active program
- **Custom program builder** (`/programs/builder`): create programs from scratch, name training days, assign exercises, configure sets/reps/rest
- **AI-generated programs** display an "AI" badge (sparkle icon) on the active program card and program detail header
- **Block Missions** — when a program is activated, `/api/generate-missions` generates 4–5 Claude-tailored missions (PR, consistency, volume, RPE). Progress is auto-tracked on every workout completion; displayed as a progress card on ProgramDetailPage

### 3. Active Workout

- Start from Dashboard or Program Detail page
- Log sets with weight and reps per exercise
- **RPE entry** (optional): tap-button row (6–10) shown below each incomplete set
- Mark sets complete; PRs auto-detected using the Epley 1RM formula and highlighted
- Add exercises from the library mid-workout
- Rest timer with configurable duration
- Discard workout prompts a ConfirmDialog (no browser `confirm()`)
- End workout → calculates total volume (kg), saves to Supabase + localStorage
- **PR celebration**: canvas confetti + animated gold PR banner in the complete modal
- **Next Session tab** in WorkoutCompleteModal: calls `/api/adapt` to fetch per-exercise adjustment suggestions (increase weight/reps, maintain, deload); result persisted to `localStorage [omnexus_last_adaptation]`

### 4. Exercise Library

- 50+ exercises with search and muscle group filtering
- Exercise detail: name, category, primary/secondary muscles, equipment, instructions
- **Progression chart**: SVG line chart showing 1RM estimate over time (up to 12 sessions)
- **AI progression suggestion** button that asks Claude for a progressive overload recommendation
- `ExerciseCard` wrapped with `React.memo` for fast search rendering

### 5. History

- List of all completed workout sessions (memoized for performance)
- Each session: date, program, duration, total volume, exercises logged
- Heatmap calendar showing training frequency
- Volume chart showing weekly trends
- Skeleton loaders on first render

### 6. Learn (Education)

- Course catalog: cover emoji, title, category, difficulty, estimated time
- Courses scored and sorted by the user's goal and experience level
- Course detail: module list with lesson count and completion status
- Lesson reader: Markdown prose, key points, scientific references
- Quizzes: multiple choice with 200ms animated reveal, explanations per answer
- Progress tracking synced to Supabase (debounced 2 seconds)
- Badge shown on completed courses

### 7. Ask Omnexus (AI Q&A)

- Free-text question input (max 1000 chars)
- 5 suggested starter questions
- Question + user context (goal, experience) sent to Claude via `/api/ask`
- **Multi-turn conversation**: maintains history for follow-up questions
- Context limit indicator appears after 4 exchanges with "Start fresh" button
- Follow-up chip suggestions after each answer
- Markdown-rendered answer with inline citations
- Medical disclaimer on every response
- Last 5 Q&A sessions shown in collapsible history

### 8. AI Insights (Workout Analysis)

- One-click analysis: reads last 28 days (max 20 sessions), builds a plain-text summary, sends to Claude
- Returns structured analysis: Training Overview, Observations, Recommendations
- Quick-question shortcuts that pre-fill the Ask page
- Personalized PubMed article feed below the analysis
- **AdaptationCard** — shows per-exercise adjustment recommendations from the last completed session (reads `omnexus_last_adaptation` from localStorage)
- **PeerInsightsCard** — aggregate cross-user benchmarking narrative (hidden if fewer than 3 peers)

### 9. Research Feed (PubMed Articles)

- Live articles from PubMed, proxied through `/api/articles`
- 7 category tabs: Strength, Nutrition, Recovery, Sleep, Metabolic Health, Cardio, Mobility
- Each card: title, author + journal, abstract excerpt, date, direct PubMed link
- 6-hour client-side cache per category
- Default category driven by user's goal

### 10. Community

- **Activity Feed** (`/feed`): real-time friend workout feed via Supabase Realtime; emoji reactions (💪🔥👏⚡)
- **Friends** (`/friends`): search users, send/accept/remove friend requests; toast feedback on all actions
- **Leaderboard** (`/leaderboard`): weekly volume rankings among friends (memoized rows)
- **Challenges** (`/challenges`): browse + create + join challenges (volume, streak, sessions types)
- **AI Challenges** — personalized private challenge generated on demand via `/api/generate-personal-challenge`; shared community challenge generated every Monday 6am UTC via Vercel cron
- All community routes require a real Supabase account (guests see an upgrade prompt)

### 11. Nutrition Tracking

- Date navigator (previous/next day)
- Macro progress bars (calories, protein, carbs, fat)
- Add food modal + quick-add common meals
- Goals modal (default goals per fitness goal, stored in localStorage)
- Entry list with swipe-to-delete and toast confirmation
- Guests see an upgrade prompt

### 12. Measurements

- Log body metrics (weight, body fat %, arm circumference, etc.)
- Per-metric history with trend chart
- ConfirmDialog on delete

### 13. Notifications

- Web Push via VAPID (opt-in, toggle in ProfilePage)
- Friend workout alerts: fires when a friend completes a workout
- Daily motivational reminder: Vercel cron at 9am UTC
- Weekly digest: volume summary every Monday 8am UTC
- `public/sw.js` handles push events and notification clicks

### 14. Shareable Cards

- Canvas-generated 1080×1080 PNG cards
- PR card: exercise name, weight/reps, date
- Weekly recap card: sessions, volume, streak
- Web Share API (mobile native share); fallback to download

### 15. Guest Mode

- `GuestSetupPage` (`/guest`) — name + goal, no email
- `GuestOrAuthGuard` — allows access to all non-community routes
- `GuestBanner` — persistent prompt to create an account
- Community routes show a full-screen upgrade prompt
- `isGuest: true` on User type; localStorage key `omnexus_guest`

### 16. GDPR & Privacy

- Cookie consent banner (persistent; accept/decline stored in localStorage)
- Privacy Policy page (`/privacy`)
- Export my data: `/api/export-data` returns full JSON download
- Delete account: `/api/delete-account` wipes all Supabase rows + auth user

---

## Navigation

**5-tab bottom navigation bar:**
**Home · Learn · Insights · Library · History**

Community (`/feed`) and Nutrition (`/nutrition`) are accessible via quick-action buttons on the Dashboard. This keeps the nav usable on 375px viewports without truncation.

---

## Feedback System

All write actions show a toast notification via `ToastContext`:
- **Success** — green, 3 seconds (e.g. "Profile saved", "Meal logged", "Request sent")
- **Error** — red, 3 seconds (e.g. "Sync failed — check connection")
- **Info** — slate, 3 seconds

Supabase write helpers throw `Error('[fnName] ${message}')` on failure so errors always bubble to the UI.

---

## AI System Prompt (Shared Persona)

Both `/api/ask` and `/api/insights` use:

```
You are Omnexus AI, a health and fitness education assistant.
Always cite peer-reviewed research. Explain the mechanism behind recommendations.
Acknowledge uncertainty. Never diagnose or prescribe.
```

Every response ends with:
> ⚠️ This is educational information only, not medical advice.

---

## Data Storage

### Supabase (source of truth for authenticated users)

| Table | Contents |
|---|---|
| `profiles` | Name, goal, experience level, active program |
| `training_profiles` | AI-collected training data: goals, trainingAge, daysPerWeek, sessionDuration, equipment, injuries, aiSummary (unique per user) |
| `workout_sessions` | All completed sessions (exercises as JSONB) |
| `personal_records` | Best lift per exercise |
| `learning_progress` | Completed lessons/modules/courses, quiz scores |
| `custom_programs` | User-built and AI-generated programs |
| `friendships` | Friend graph |
| `reactions` | Emoji reactions on feed sessions |
| `challenges` / `challenge_participants` | Community challenges |
| `push_subscriptions` | VAPID endpoints |
| `nutrition_logs` | Daily food entries |
| `measurements` | Body metric entries |
| `block_missions` | Program-scoped AI goals (pr / consistency / volume / rpe); RLS per user |
| `ai_challenges` | AI-generated challenges — personal (`user_id = auth.uid()`) + shared (`user_id IS NULL`) |

### localStorage (cache + guest data)

| Key | Contents |
|---|---|
| `fit_user` | User profile |
| `fit_history` | Workout sessions + PRs |
| `fit_active_session` | In-progress workout |
| `fit_theme` | `"dark"` or `"light"` |
| `fit_program_week_cursor` | Week progress per program |
| `fit_program_day_cursor` | Day progress per program |
| `omnexus_learning_progress` | Completed lessons, quiz scores |
| `omnexus_insight_sessions` | Ask Omnexus Q&A history (last 50) |
| `omnexus_article_cache` | PubMed articles per category (6h TTL) |
| `omnexus_custom_programs` | User-built programs (cache) |
| `omnexus_nutrition_goals` | Daily macro targets |
| `omnexus_guest` | Guest mode flag |
| `omnexus_cookie_consent` | `"accepted"` or `"declined"` |
| `omnexus_migrated_v1` | One-time migration completion flag |
| `omnexus_last_adaptation` | Last `AdaptationResult` JSON — read by AdaptationCard on InsightsPage |

---

## Static Data (Pre-Built Content)

Everything below is hardcoded in the app — it does not come from an API or database:

- **50+ exercises** with full metadata (muscles, equipment, instructions, **movement pattern** tag: `squat`, `hinge`, `push-horizontal`, `push-vertical`, `pull-horizontal`, `pull-vertical`, `isolation`, `carry`, `cardio`)
- **Pre-built training programs** (3-day full body, 4-day upper/lower, 5-day PPL, etc.)
- **Structured courses** with lesson prose, key points, scientific references, and quizzes covering: Strength Training, Nutrition, Recovery, Sleep, Metabolic Health, Cardio, Mobility

---

## Design Principles

- Mobile-first, card-based UI with dark/light mode (defaults to system preference)
- Brand colour: `brand-500` used for all interactive/active elements
- Gradient cards (`bg-gradient-to-br from-slate-800/80 to-slate-900/60`) for premium feel
- Skeleton loaders instead of blank pages — pages never flash empty
- Micro-animations: quiz reveal delay, SVG ring animation, toast slide-in
- ConfirmDialog for all destructive actions (no `window.confirm()`)
- Safety-first AI — every AI response carries a medical disclaimer

---

## Build Phase Summary

| Phase | Delivered |
|---|---|
| 1–7 | Branding, learning system, Claude Q&A, AI Insights, PubMed feed, personalization |
| 8 | RPE input, exercise progression chart, custom program builder, CI pipeline |
| Prod 2 | Supabase Auth (email + password, multi-device profile management) |
| Prod 3 | Cloud sync (Supabase source of truth, one-time migration from localStorage) |
| Prod 5 | Community (friends, leaderboard, challenges, real-time activity feed + reactions) |
| Prod 6 | GDPR (cookie consent, privacy policy, data export, account deletion) |
| Expansion A | PR celebration (confetti), weekly recap card, muscle heat map, enhanced streak |
| Expansion B | Guest mode, shareable cards (canvas PNG), TodayCard, plate calculator |
| Expansion C | Push notifications (VAPID, service worker, daily cron, friend alerts) |
| Expansion D | Nutrition tracking (macro logging, goals, date navigator) |
| E1 | Toast notification system + Supabase write error propagation |
| E2 | Performance: debounced learning sync, React.memo, memoized list components |
| E3 | Mobile UX: 5-tab nav, RPE tap-buttons, ConfirmDialog, no `window.confirm()` |
| E4 | Visual polish: skeleton loaders, SVG recovery ring, gradient cards, quiz animation |
| E5 | Test coverage: 28 Vitest unit tests; ESLint and TypeScript both clean |
| Capacitor | iOS + Android native packaging (Capacitor v8): status bar, splash screen, haptics, safe areas, `apiBase` abstraction for native builds |
| Phase 1 AI | AI Onboarding Agent (multi-turn Claude chat), Generative Mesocycle Engine (8-week program JSON), Exercise `MovementPattern` tags, `training_profiles` Supabase table |
| Phase 2 Learning | Supabase pgvector (`exercise_embeddings`, `content_embeddings`), semantic content search (`/api/recommend-content`), dynamic micro-lesson generation (`/api/generate-lesson`), seed endpoint (`/api/seed-embeddings`), `MicroLessonModal`, content gap detection |
| Phase 3 Intelligence | Adaptation Engine (`/api/adapt` + `NextSessionTab` + `AdaptationCard`), Block Missions (`/api/generate-missions` + `BlockMissionsCard` + auto progress tracking), AI Challenges (`/api/generate-personal-challenge` + `/api/generate-shared-challenge` cron), Peer Insights (`/api/peer-insights` + `PeerInsightsCard`) |
