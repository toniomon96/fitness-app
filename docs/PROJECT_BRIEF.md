# Omnexus — Project Brief

> This document is a complete, self-contained description of the Omnexus app.
> It is intended to be pasted into an LLM prompt as context.

---

## What Is Omnexus?

Omnexus is a **mobile-first health and fitness web app** built for people who want to train smarter, not just harder. It combines structured workout tracking with AI-powered coaching, evidence-based education, and live research from peer-reviewed journals. The entire app runs in the browser — there is no user account system, no server-side database, and no login. All data is stored locally in the user's browser (`localStorage`).

---

## Target User

- Age 18–40, fitness-conscious, tech-comfortable
- Has a specific goal: build muscle (hypertrophy), lose fat, or improve general fitness
- Wants science-backed guidance, not bro-science
- Primarily uses the app on a smartphone

---

## Tech Stack (Summary)

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4
- **Routing:** React Router v7 (SPA, client-side only)
- **State:** Context API + useReducer, persisted to localStorage
- **AI:** Anthropic Claude (`claude-sonnet-4-6`) via Vercel serverless functions
- **External data:** PubMed E-utilities API (free, no key required)
- **Deployment:** Vercel (serverless functions in `/api/`)
- **No backend, no database, no authentication**

---

## User Onboarding

When a user first opens the app they go through a short onboarding flow:
1. Enter their name
2. Choose a goal: **Hypertrophy**, **Fat Loss**, or **General Fitness**
3. Choose experience level: **Beginner**, **Intermediate**, or **Advanced**
4. Select an active training program from the pre-built list

This profile is saved to localStorage and used to personalize content throughout the app.

---

## Current Features

### 1. Dashboard (Home)
- Personalized welcome banner with user's name and goal
- Resume banner if a workout is in progress
- Workout streak display (consecutive days trained)
- Current program card (name, week, days completed this week)
- Next workout card (day name, exercise list preview, start button)
- **Personalized course recommendations** — top 3 courses scored by goal match + difficulty match, with progress bars for in-progress courses

### 2. Training Programs
- Browse pre-built programs filtered by goal and experience level
- Program detail page: description, schedule overview, days per week
- Each program has a weekly schedule with named training days (Push, Pull, Legs, Upper, Lower, Full Body, Rest, Cardio)
- Users can set any program as their active program

### 3. Active Workout
- Start a workout from the Dashboard or Program Detail page
- Log sets with weight and reps for each exercise
- Mark sets as complete; personal records are auto-detected and highlighted
- Add exercises from the library mid-workout
- Rest timer with configurable duration
- End workout — calculates total volume (kg), saves session to history
- Workout complete modal with session summary

### 4. Exercise Library
- 50+ exercises with search and muscle group filtering
- Each exercise: name, category, primary/secondary muscles, equipment, step-by-step instructions, coaching tips

### 5. History
- List of all completed workout sessions
- Each session: date, program, duration, total volume, exercises logged
- Volume chart showing weekly training volume trend

### 6. Learn (Education)
- Course catalog with cover emoji, title, category, difficulty, estimated time
- Courses are filtered/sorted by the user's goal and experience level
- Course detail: module list with lesson count and completion status
- Lesson reader: Markdown prose content, key points summary, scientific references with links
- Quizzes at the end of each module: multiple choice, immediate feedback, explanation per answer
- Progress tracking: completed lessons/modules/courses stored in localStorage
- Badge shown on completed courses

### 7. Ask Omnexus (AI Q&A)
- Free-text question input (max 1000 chars)
- 5 suggested starter questions
- Sends question + user context (goal, experience level) to Claude via `/api/ask`
- Claude responds with evidence-based answer including inline citations (`[Author et al., Year — Journal]`)
- Markdown-rendered answer (bold headings, bullet lists, numbered lists)
- Every answer ends with a medical disclaimer
- Last 5 questions and answers shown in a collapsible history list
- Link to pre-fill a question on the Insights page

### 8. AI Insights (Workout Analysis)
- One-click workout analysis: reads last 28 days of sessions (max 20), builds a plain-text summary, sends to Claude via `/api/insights`
- Claude returns a structured analysis: Training Overview, Observations (bullet list), Recommendations (numbered list)
- Markdown rendered result
- Quick-question shortcuts that pre-fill a question in the Ask page
- **Personalized article feed** below the analysis — defaults to the category matching the user's goal

### 9. Research Feed (PubMed Articles)
- Live articles fetched from PubMed E-utilities, proxied through `/api/articles`
- Category tabs: Strength, Nutrition, Recovery, Sleep, Cardio
- Each card: article title, first author + journal, abstract excerpt (truncated to 400 chars), publication date, direct PubMed link
- Results cached in localStorage per category for 6 hours to avoid hammering PubMed
- Error state with retry button
- Default category is set from the user's goal (hypertrophy → Strength, fat-loss → Nutrition, general-fitness → Strength)

---

## Navigation

Five-item bottom navigation bar:
**Home · Learn · Insights · Library · History**

Programs are accessible from the Dashboard (Next Workout card) and from within Learn. There is no standalone Programs tab in the nav.

---

## AI System Prompt (Shared Persona)

Both `/api/ask` and `/api/insights` use the same base persona:

> You are Omnexus AI, a health and fitness education assistant. You provide evidence-based, science-backed information about training, nutrition, recovery, sleep, and performance.
> Always cite peer-reviewed research. Explain the mechanism behind recommendations. Acknowledge uncertainty. Never diagnose or prescribe.

Every response ends with:
> ⚠️ This is educational information only, not medical advice.

---

## Data Stored in localStorage

| Key | What it holds |
|---|---|
| `fit_user` | Name, goal, experience level, active program ID, theme |
| `fit_history` | All workout sessions + personal records |
| `fit_active_session` | In-progress workout (null when idle) |
| `fit_theme` | `"dark"` or `"light"` |
| `fit_program_week_cursor` | Week number per program |
| `fit_program_day_cursor` | Day index per program |
| `omnexus_learning_progress` | Completed lessons/modules/courses, quiz scores |
| `omnexus_insight_sessions` | Last 50 Ask Omnexus Q&A sessions |
| `omnexus_article_cache` | PubMed articles per category (6 h TTL) |

---

## Static Data (Pre-Built Content)

Everything below is hardcoded in the app — it does not come from an API or database:

- **50+ exercises** with full metadata (muscles, equipment, instructions)
- **Pre-built training programs** (e.g. 3-day full body, 4-day upper/lower, 5-day PPL)
- **Structured courses** with lesson prose, key points, scientific references, and quizzes covering: Strength Training, Nutrition, Recovery, Sleep, Metabolic Health, Cardio, Mobility

---

## Known Limitations / Current Gaps

- **No user accounts** — data is tied to one browser/device. Clearing browser data wipes everything.
- **No cloud sync** — cannot use the app across multiple devices.
- **No social features** — no sharing, no community, no leaderboards.
- **No nutrition tracking** — the app does not log food, calories, or macros.
- **No body measurements** — no weight tracking, body fat %, or progress photos.
- **No wearable integration** — no connection to Apple Health, Google Fit, Garmin, Whoop, etc.
- **No notifications** — no reminders to train, no rest day alerts.
- **No video demos** — exercises have text instructions only, no embedded video.
- **AI articles have no key takeaways** — the `keyTakeaways` field on articles is reserved but empty; currently only the abstract is shown.
- **No program builder** — users cannot create custom programs; they choose from the pre-built list only.
- **No exercise progression tracking** — there is no graph or table showing strength progress on a specific exercise over time (e.g. squat 1RM over 12 weeks).
- **No RPE/RIR input** — sets are logged by weight and reps only; no perceived exertion tracking.
- **No rest day or deload scheduling** — programs do not adapt based on fatigue or missed sessions.
- **Article feed is read-only** — users cannot save, bookmark, or annotate articles.
- **Courses are static** — course content never changes; there is no admin CMS or dynamic content system.
- **No offline support** — the app requires a network connection for AI features and PubMed; there is no service worker or PWA manifest.

---

## Design Principles

- Mobile-first, card-based UI
- Dark and light mode (user-toggleable, defaults to system preference)
- Brand colour: a single accent colour (`brand-500`) used for interactive elements
- Minimal animations — only loading spinners and smooth transitions
- Safety-first AI — every AI response carries a medical disclaimer

---

## What Has Been Built (Phase Summary)

| Phase | Delivered |
|---|---|
| 1 | App rebrand to Omnexus, 5-item bottom nav, dark/light theme |
| 2 | Full learning system: courses, lessons, quizzes, progress tracking |
| 3 | Vercel serverless setup, environment variable config |
| 4 | Ask Omnexus: Claude Q&A with citation rendering and session history |
| 5 | AI Insights: workout analysis with Claude, markdown rendering |
| 6 | Health article feed: PubMed proxy, caching, category filtering |
| 7 | Personalization: course recommendations scored by goal + difficulty, goal-aware article defaults |
