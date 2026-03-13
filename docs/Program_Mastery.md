# Omnexus — Program Mastery: Revolutionary Master Plan

*Version 1.0 | Created: 2026-03-13*

---

## Vision Statement

> Transform Omnexus from a workout tracking app into a **complete fitness mastery platform** — one where every session, every lesson, and every personal record feeds a visible, motivating progression journey that keeps users engaged for years, not weeks.

The Program Mastery system introduces three interconnected pillars:

1. **Exercise Mastery** — Track how proficient a user becomes at each exercise over time, from novice to expert.
2. **Achievement System** — Celebrate milestones with badges that span workouts, programs, learning, nutrition, and streaks.
3. **Expanded Content Library** — More exercises covering every movement pattern and fitness level, plus new evidence-based learning courses.

---

## Pillar 1: Exercise Mastery

### Concept

Every exercise a user performs contributes to their mastery level for that movement. Mastery is calculated from:
- Number of workout sessions featuring the exercise
- Total sets logged
- Personal record progression over time

### Mastery Levels

| Level | Sessions Required | Badge |
|---|---|---|
| Novice | 0 | 🔘 |
| Beginner | 3+ | 🥉 |
| Intermediate | 10+ | 🥈 |
| Advanced | 25+ | 🥇 |
| Expert | 50+ | 🏆 |

### UI Surface

- **Exercise Detail Page** (`/library/:id`) — Show the user's mastery badge and session count.
- **Achievements Page** (`/achievements`) — List all exercises with mastery levels, sortable by level and muscle group.

---

## Pillar 2: Achievement System

Achievements reward users for real behaviors across the app. They are organized into five categories:

### Workout Achievements

| ID | Title | Description | Trigger |
|---|---|---|---|
| `first-workout` | First Blood | Complete your very first workout | 1 workout session saved |
| `workout-5` | Getting Serious | Complete 5 workouts | 5 total sessions |
| `workout-25` | Dedicated Athlete | Complete 25 workouts | 25 total sessions |
| `workout-100` | Century Club | Complete 100 workouts | 100 total sessions |
| `first-pr` | Personal Record | Set your first personal record | 1 PR logged |
| `pr-10` | Record Breaker | Set 10 personal records | 10 PRs logged |
| `heavy-day` | Going Heavy | Log a set over 100 kg / 220 lbs | Single set ≥ 100 kg |

### Program Achievements

| ID | Title | Description | Trigger |
|---|---|---|---|
| `first-program` | Program Starter | Start your first training program | Program activated |
| `program-complete` | Program Finisher | Complete all sessions in a program | Program 100% complete |
| `ai-program` | AI Coached | Generate your first AI program | AI program generated |

### Learning Achievements

| ID | Title | Description | Trigger |
|---|---|---|---|
| `first-lesson` | Student Athlete | Complete your first lesson | 1 lesson completed |
| `course-complete` | Course Graduate | Complete an entire course | All lessons in a course done |
| `quiz-perfect` | Quiz Master | Score 100% on a quiz | 3/3 on any quiz |
| `lessons-10` | Knowledge Builder | Complete 10 lessons | 10 lessons done |

### Streak Achievements

| ID | Title | Description | Trigger |
|---|---|---|---|
| `streak-3` | On a Roll | Maintain a 3-day workout streak | 3 consecutive training days |
| `streak-7` | Week Warrior | Maintain a 7-day workout streak | 7 consecutive training days |
| `streak-30` | Monthly Grind | Maintain a 30-day workout streak | 30 consecutive training days |

### Nutrition Achievements

| ID | Title | Description | Trigger |
|---|---|---|---|
| `log-meal` | Fuel Tracker | Log your first meal | 1 nutrition log entry |
| `log-7-days` | Consistency Counts | Log nutrition for 7 consecutive days | 7-day nutrition logging streak |

---

## Pillar 3: Expanded Content Library

### Exercise Library Expansion

The existing 45-exercise library is expanded with 25+ new movements covering mobility, Olympic lifting accessory work, unilateral strength, and additional cardio patterns.

**New Movement Categories Added:**
- Mobility & Flexibility (hip mobility, thoracic rotation, ankle work)
- Olympic Accessory (snatch grip deadlift, hang power clean, power clean)
- Unilateral Lower Body (single-leg RDL, pistol squat, step-up variants)
- Core Stability (Pallof press, dead bug, bird dog, Copenhagen plank)
- Upper Body Accessories (face pull variants, meadows row, chest-supported row)
- Cardio Conditioning (battle ropes, sled push, farmer's carry)

### New Learning Courses

**Course: Mobility & Movement Quality**
- Module 1: Why Mobility Matters for Strength Athletes
- Module 2: Hip Mobility Fundamentals
- Module 3: Thoracic Spine Mobilization
- Module 4: Ankle Mobility for Squatting
- Module 5: A Daily Mobility Practice

**Course: Body Composition Fundamentals**
- Module 1: Understanding Body Composition
- Module 2: Muscle Hypertrophy Science
- Module 3: Fat Loss Principles
- Module 4: Recomposition — Simultaneous Gain and Loss
- Module 5: Measurement and Progress Tracking

---

## Implementation Sprint Schedule

### Sprint A — Content & Types (2 days)

**Deliverables:**
- [ ] Expand `src/data/exercises.ts` with 25+ new exercises
- [ ] Add 2 new courses to `src/data/courses.ts`
- [ ] Add `Achievement` and `ExerciseMastery` types to `src/types/index.ts`
- [ ] Create `src/data/achievements.ts` with all achievement definitions

### Sprint B — Logic & Utilities (1 day)

**Deliverables:**
- [ ] Create `src/utils/achievementUtils.ts` — evaluation logic for all achievements
- [ ] Create `src/utils/masteryUtils.ts` — exercise mastery calculation from workout history
- [ ] Unit tests for both utilities

### Sprint C — UI Surface (2 days)

**Deliverables:**
- [ ] Create `src/pages/AchievementsPage.tsx` — badge grid, progress bars, mastery view
- [ ] Update `src/router.tsx` — register `/achievements` route
- [ ] Update `src/pages/ProfilePage.tsx` — link to Achievements page
- [ ] Update `src/pages/ExerciseDetailPage.tsx` — show mastery badge inline

### Sprint D — Integration (1 day)

**Deliverables:**
- [ ] Wire achievement checks into workout completion flow (WorkoutCompleteModal)
- [ ] Wire achievement checks into lesson completion flow (LessonPage)
- [ ] Store earned achievements in localStorage with Supabase sync

---

## Success Metrics

| Metric | Target |
|---|---|
| Users who view Achievements page in first session | > 40% |
| Users who earn at least 1 achievement in first week | > 70% |
| Average achievements earned per active user (30-day) | > 5 |
| Exercise library utilization (% of exercises used) | > 60% |
| Course completion rate | > 30% per started course |

---

## Technical Architecture

### Data Storage

Achievements are stored in localStorage with the key `omnexus_achievements`:
```json
[
  {
    "id": "first-workout",
    "earnedAt": "2026-03-01T10:00:00Z"
  }
]
```

For authenticated users, achievements are synced to Supabase in the `user_achievements` table.

### Achievement Evaluation

Achievements are evaluated reactively after key user actions:
- **After workout completion** → check workout achievements + streak achievements
- **After lesson completion** → check learning achievements  
- **After nutrition log entry** → check nutrition achievements
- **After program activation** → check program achievements

Evaluation runs client-side and is idempotent — already-earned achievements are never re-awarded.

### Exercise Mastery Calculation

Mastery is derived from the user's workout history:
```typescript
function calculateMasteryLevel(sessionsCount: number): MasteryLevel {
  if (sessionsCount >= 50) return 'expert';
  if (sessionsCount >= 25) return 'advanced';
  if (sessionsCount >= 10) return 'intermediate';
  if (sessionsCount >= 3)  return 'beginner';
  return 'novice';
}
```

---

## Acceptance Criteria

A feature slice is done when:
1. TypeScript compiles with zero errors
2. All existing 347 unit tests still pass
3. New utility functions have unit test coverage
4. The `/achievements` page is accessible and renders all badges correctly
5. Achievement earning is demonstrated in manual QA (complete a workout → see badge appear)
6. No regression in build size > +5%
