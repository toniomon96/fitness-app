import type { Program } from '../types';

export const programs: Program[] = [
  // ════════════════════════════════════════════════════════════════════════════
  // HYPERTROPHY
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: 'hyp-beginner-3day',
    name: '3-Day Full Body Hypertrophy',
    goal: 'hypertrophy',
    experienceLevel: 'beginner',
    description:
      'A full-body program rotating three different workouts across the week. Perfect for new lifters — every session hits all major muscle groups with proven compound and isolation movements.',
    daysPerWeek: 3,
    estimatedDurationWeeks: 12,
    tags: ['full-body', 'beginner', 'compound-focus', 'progressive-overload'],
    schedule: [
      {
        label: 'Day A — Full Body',
        type: 'full-body',
        exercises: [
          { exerciseId: 'barbell-back-squat', scheme: { sets: 3, reps: '8-12', restSeconds: 90 } },
          { exerciseId: 'dumbbell-bench-press', scheme: { sets: 3, reps: '8-12', restSeconds: 90 } },
          { exerciseId: 'dumbbell-row', scheme: { sets: 3, reps: '8-12', restSeconds: 90 }, notes: 'Each side' },
          { exerciseId: 'dumbbell-shoulder-press', scheme: { sets: 3, reps: '10-12', restSeconds: 60 } },
          { exerciseId: 'romanian-deadlift', scheme: { sets: 3, reps: '10-12', restSeconds: 90 } },
          { exerciseId: 'plank', scheme: { sets: 3, reps: '30-45s', restSeconds: 45 } },
        ],
      },
      {
        label: 'Day B — Full Body',
        type: 'full-body',
        exercises: [
          { exerciseId: 'goblet-squat', scheme: { sets: 3, reps: '10-12', restSeconds: 90 } },
          { exerciseId: 'incline-dumbbell-press', scheme: { sets: 3, reps: '10-12', restSeconds: 90 } },
          { exerciseId: 'lat-pulldown', scheme: { sets: 3, reps: '10-12', restSeconds: 90 } },
          { exerciseId: 'dumbbell-lateral-raise', scheme: { sets: 3, reps: '12-15', restSeconds: 45 } },
          { exerciseId: 'leg-curl', scheme: { sets: 3, reps: '12-15', restSeconds: 60 } },
          { exerciseId: 'hanging-leg-raise', scheme: { sets: 3, reps: '12-15', restSeconds: 45 } },
        ],
      },
      {
        label: 'Day C — Full Body',
        type: 'full-body',
        exercises: [
          { exerciseId: 'leg-press', scheme: { sets: 3, reps: '10-15', restSeconds: 90 } },
          { exerciseId: 'cable-chest-fly', scheme: { sets: 3, reps: '12-15', restSeconds: 60 } },
          { exerciseId: 'seated-cable-row', scheme: { sets: 3, reps: '10-12', restSeconds: 90 } },
          { exerciseId: 'face-pull', scheme: { sets: 3, reps: '15', restSeconds: 45 } },
          { exerciseId: 'hip-thrust', scheme: { sets: 3, reps: '12-15', restSeconds: 90 } },
          { exerciseId: 'ab-wheel-rollout', scheme: { sets: 3, reps: '8-10', restSeconds: 60 } },
        ],
      },
    ],
  },

  {
    id: 'hyp-intermediate-4day',
    name: '4-Day Upper/Lower Hypertrophy',
    goal: 'hypertrophy',
    experienceLevel: 'intermediate',
    description:
      'An upper/lower split with a strength-biased first session and a volume-biased second session each week. Ideal for lifters who have mastered the basics and are ready for more weekly volume.',
    daysPerWeek: 4,
    estimatedDurationWeeks: 12,
    tags: ['upper-lower', 'intermediate', 'strength-volume', 'progressive-overload'],
    schedule: [
      {
        label: 'Upper A — Strength Bias',
        type: 'upper',
        exercises: [
          { exerciseId: 'barbell-bench-press', scheme: { sets: 4, reps: '6-8', restSeconds: 120 } },
          { exerciseId: 'barbell-row', scheme: { sets: 4, reps: '6-8', restSeconds: 120 } },
          { exerciseId: 'overhead-press', scheme: { sets: 3, reps: '8-10', restSeconds: 90 } },
          { exerciseId: 'pull-up', scheme: { sets: 3, reps: '6-10', restSeconds: 90 } },
          { exerciseId: 'barbell-curl', scheme: { sets: 3, reps: '10-12', restSeconds: 60 } },
          { exerciseId: 'tricep-pushdown', scheme: { sets: 3, reps: '10-12', restSeconds: 60 } },
        ],
      },
      {
        label: 'Lower A — Quad Focus',
        type: 'lower',
        exercises: [
          { exerciseId: 'barbell-back-squat', scheme: { sets: 4, reps: '6-8', restSeconds: 120 } },
          { exerciseId: 'romanian-deadlift', scheme: { sets: 3, reps: '8-10', restSeconds: 90 } },
          { exerciseId: 'leg-press', scheme: { sets: 3, reps: '10-12', restSeconds: 90 } },
          { exerciseId: 'leg-extension', scheme: { sets: 3, reps: '12-15', restSeconds: 60 } },
          { exerciseId: 'standing-calf-raise', scheme: { sets: 4, reps: '12-15', restSeconds: 60 } },
          { exerciseId: 'ab-wheel-rollout', scheme: { sets: 3, reps: '8-12', restSeconds: 45 } },
        ],
      },
      {
        label: 'Upper B — Volume Bias',
        type: 'upper',
        exercises: [
          { exerciseId: 'incline-dumbbell-press', scheme: { sets: 4, reps: '10-12', restSeconds: 90 } },
          { exerciseId: 'seated-cable-row', scheme: { sets: 4, reps: '10-12', restSeconds: 90 } },
          { exerciseId: 'dumbbell-lateral-raise', scheme: { sets: 4, reps: '12-15', restSeconds: 45 } },
          { exerciseId: 'dumbbell-row', scheme: { sets: 3, reps: '12-15', restSeconds: 60 }, notes: 'Each side' },
          { exerciseId: 'hammer-curl', scheme: { sets: 3, reps: '12-15', restSeconds: 45 } },
          { exerciseId: 'overhead-tricep-extension', scheme: { sets: 3, reps: '12-15', restSeconds: 45 } },
        ],
      },
      {
        label: 'Lower B — Hip Focus',
        type: 'lower',
        exercises: [
          { exerciseId: 'deadlift', scheme: { sets: 4, reps: '5-6', restSeconds: 150 } },
          { exerciseId: 'hip-thrust', scheme: { sets: 4, reps: '10-12', restSeconds: 90 } },
          { exerciseId: 'walking-lunge', scheme: { sets: 3, reps: '12', restSeconds: 90 } },
          { exerciseId: 'leg-curl', scheme: { sets: 4, reps: '12-15', restSeconds: 60 } },
          { exerciseId: 'standing-calf-raise', scheme: { sets: 4, reps: '15-20', restSeconds: 60 } },
          { exerciseId: 'hanging-leg-raise', scheme: { sets: 3, reps: '10-15', restSeconds: 45 } },
        ],
      },
    ],
  },

  {
    id: 'hyp-advanced-5day',
    name: '5-Day PPL Hypertrophy',
    goal: 'hypertrophy',
    experienceLevel: 'advanced',
    description:
      'A high-volume Push/Pull/Legs split with two upper body days added at the end of the week. Designed for advanced lifters who need high weekly volume and frequency to keep progressing.',
    daysPerWeek: 5,
    estimatedDurationWeeks: 16,
    tags: ['ppl', 'advanced', 'high-volume', 'rpe-based'],
    schedule: [
      {
        label: 'Push — Chest/Shoulders/Triceps',
        type: 'push',
        exercises: [
          { exerciseId: 'barbell-bench-press', scheme: { sets: 4, reps: '5-8', restSeconds: 120, rpe: 8 } },
          { exerciseId: 'incline-dumbbell-press', scheme: { sets: 3, reps: '10-12', restSeconds: 90 } },
          { exerciseId: 'cable-chest-fly', scheme: { sets: 3, reps: '12-15', restSeconds: 60 } },
          { exerciseId: 'overhead-press', scheme: { sets: 4, reps: '8-10', restSeconds: 90 } },
          { exerciseId: 'dumbbell-lateral-raise', scheme: { sets: 4, reps: '15-20', restSeconds: 30 } },
          { exerciseId: 'skull-crusher', scheme: { sets: 3, reps: '10-12', restSeconds: 60 } },
          { exerciseId: 'tricep-pushdown', scheme: { sets: 3, reps: '12-15', restSeconds: 45 } },
        ],
      },
      {
        label: 'Pull — Back/Biceps/Core',
        type: 'pull',
        exercises: [
          { exerciseId: 'deadlift', scheme: { sets: 4, reps: '4-6', restSeconds: 150, rpe: 8 } },
          { exerciseId: 'pull-up', scheme: { sets: 4, reps: '6-8', restSeconds: 120 } },
          { exerciseId: 'barbell-row', scheme: { sets: 4, reps: '8-10', restSeconds: 90 } },
          { exerciseId: 'face-pull', scheme: { sets: 3, reps: '15-20', restSeconds: 45 } },
          { exerciseId: 'hammer-curl', scheme: { sets: 3, reps: '12-15', restSeconds: 45 } },
          { exerciseId: 'barbell-curl', scheme: { sets: 3, reps: '10-12', restSeconds: 45 } },
          { exerciseId: 'hanging-leg-raise', scheme: { sets: 3, reps: '12-15', restSeconds: 45 } },
        ],
      },
      {
        label: 'Legs — Quads/Hamstrings/Glutes',
        type: 'legs',
        exercises: [
          { exerciseId: 'barbell-back-squat', scheme: { sets: 5, reps: '4-6', restSeconds: 150, rpe: 8 } },
          { exerciseId: 'romanian-deadlift', scheme: { sets: 4, reps: '8-12', restSeconds: 90 } },
          { exerciseId: 'leg-press', scheme: { sets: 4, reps: '10-15', restSeconds: 90 } },
          { exerciseId: 'leg-extension', scheme: { sets: 3, reps: '15-20', restSeconds: 45 } },
          { exerciseId: 'leg-curl', scheme: { sets: 4, reps: '12-15', restSeconds: 60 } },
          { exerciseId: 'hip-thrust', scheme: { sets: 4, reps: '10-12', restSeconds: 90 } },
          { exerciseId: 'standing-calf-raise', scheme: { sets: 5, reps: '12-15', restSeconds: 60 } },
        ],
      },
      {
        label: 'Upper A — Chest/Shoulder Focus',
        type: 'upper',
        exercises: [
          { exerciseId: 'dumbbell-shoulder-press', scheme: { sets: 4, reps: '10-12', restSeconds: 90 } },
          { exerciseId: 'cable-chest-fly', scheme: { sets: 4, reps: '12-15', restSeconds: 60 } },
          { exerciseId: 'dumbbell-lateral-raise', scheme: { sets: 4, reps: '15-20', restSeconds: 30 } },
          { exerciseId: 'incline-dumbbell-press', scheme: { sets: 3, reps: '10-12', restSeconds: 75 } },
          { exerciseId: 'overhead-tricep-extension', scheme: { sets: 3, reps: '12-15', restSeconds: 45 } },
          { exerciseId: 'skull-crusher', scheme: { sets: 3, reps: '10-12', restSeconds: 60 } },
        ],
      },
      {
        label: 'Upper B — Back/Bicep Focus',
        type: 'pull',
        exercises: [
          { exerciseId: 'lat-pulldown', scheme: { sets: 4, reps: '10-12', restSeconds: 90 } },
          { exerciseId: 'seated-cable-row', scheme: { sets: 4, reps: '10-12', restSeconds: 90 } },
          { exerciseId: 'dumbbell-row', scheme: { sets: 3, reps: '12-15', restSeconds: 60 }, notes: 'Each side' },
          { exerciseId: 'face-pull', scheme: { sets: 3, reps: '15-20', restSeconds: 45 } },
          { exerciseId: 'barbell-curl', scheme: { sets: 4, reps: '8-10', restSeconds: 60 } },
          { exerciseId: 'hammer-curl', scheme: { sets: 3, reps: '12-15', restSeconds: 45 } },
          { exerciseId: 'ab-wheel-rollout', scheme: { sets: 4, reps: '8-12', restSeconds: 45 } },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  // FAT LOSS
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: 'fat-beginner-3day',
    name: '3-Day Circuit Training',
    goal: 'fat-loss',
    experienceLevel: 'beginner',
    description:
      'Three full-body circuit sessions per week combining strength and cardio. Higher reps, shorter rest, and a cardio finisher each session maximize calorie burn while building lean muscle.',
    daysPerWeek: 3,
    estimatedDurationWeeks: 8,
    tags: ['circuit', 'beginner', 'cardio-finisher', 'full-body'],
    schedule: [
      {
        label: 'Circuit A',
        type: 'full-body',
        exercises: [
          { exerciseId: 'goblet-squat', scheme: { sets: 3, reps: '15', restSeconds: 30 } },
          { exerciseId: 'push-up', scheme: { sets: 3, reps: '12-15', restSeconds: 30 } },
          { exerciseId: 'dumbbell-row', scheme: { sets: 3, reps: '12', restSeconds: 30 }, notes: 'Each side' },
          { exerciseId: 'glute-bridge', scheme: { sets: 3, reps: '15', restSeconds: 30 } },
          { exerciseId: 'mountain-climbers', scheme: { sets: 3, reps: '30s', restSeconds: 90 }, notes: 'Rest 90s between full rounds' },
        ],
      },
      {
        label: 'Circuit B',
        type: 'full-body',
        exercises: [
          { exerciseId: 'walking-lunge', scheme: { sets: 3, reps: '12', restSeconds: 30 }, notes: 'Each leg' },
          { exerciseId: 'dumbbell-bench-press', scheme: { sets: 3, reps: '12-15', restSeconds: 30 } },
          { exerciseId: 'lat-pulldown', scheme: { sets: 3, reps: '12-15', restSeconds: 30 } },
          { exerciseId: 'dumbbell-lateral-raise', scheme: { sets: 3, reps: '15', restSeconds: 30 } },
          { exerciseId: 'kettlebell-swing', scheme: { sets: 3, reps: '15', restSeconds: 90 }, notes: 'Rest 90s between full rounds' },
        ],
      },
      {
        label: 'Circuit C',
        type: 'full-body',
        exercises: [
          { exerciseId: 'leg-press', scheme: { sets: 3, reps: '15', restSeconds: 30 } },
          { exerciseId: 'push-up', scheme: { sets: 3, reps: '12-15', restSeconds: 30 } },
          { exerciseId: 'seated-cable-row', scheme: { sets: 3, reps: '12-15', restSeconds: 30 } },
          { exerciseId: 'plank', scheme: { sets: 3, reps: '45s', restSeconds: 30 } },
          { exerciseId: 'box-jump', scheme: { sets: 3, reps: '8', restSeconds: 90 }, notes: 'Rest 90s between full rounds' },
        ],
      },
    ],
  },

  {
    id: 'fat-intermediate-4day',
    name: '4-Day Upper/Lower + HIIT',
    goal: 'fat-loss',
    experienceLevel: 'intermediate',
    description:
      'Alternates strength-focused upper/lower sessions with higher-intensity metabolic conditioning days. Builds and preserves muscle while maximizing fat loss.',
    daysPerWeek: 4,
    estimatedDurationWeeks: 10,
    tags: ['upper-lower', 'hiit', 'intermediate', 'metabolic'],
    schedule: [
      {
        label: 'Upper Strength',
        type: 'upper',
        exercises: [
          { exerciseId: 'dumbbell-bench-press', scheme: { sets: 4, reps: '10-15', restSeconds: 60 } },
          { exerciseId: 'dumbbell-row', scheme: { sets: 4, reps: '10-12', restSeconds: 60 }, notes: 'Each side' },
          { exerciseId: 'overhead-press', scheme: { sets: 3, reps: '12-15', restSeconds: 60 } },
          { exerciseId: 'seated-cable-row', scheme: { sets: 3, reps: '12-15', restSeconds: 60 } },
          { exerciseId: 'tricep-pushdown', scheme: { sets: 3, reps: '15-20', restSeconds: 45 } },
          { exerciseId: 'hammer-curl', scheme: { sets: 3, reps: '15-20', restSeconds: 45 } },
        ],
      },
      {
        label: 'Lower Strength',
        type: 'lower',
        exercises: [
          { exerciseId: 'goblet-squat', scheme: { sets: 4, reps: '12-15', restSeconds: 60 } },
          { exerciseId: 'romanian-deadlift', scheme: { sets: 4, reps: '12-15', restSeconds: 60 } },
          { exerciseId: 'walking-lunge', scheme: { sets: 3, reps: '12', restSeconds: 60 } },
          { exerciseId: 'leg-curl', scheme: { sets: 3, reps: '15', restSeconds: 60 } },
          { exerciseId: 'standing-calf-raise', scheme: { sets: 3, reps: '20', restSeconds: 45 } },
          { exerciseId: 'plank', scheme: { sets: 3, reps: '45s', restSeconds: 30 } },
        ],
      },
      {
        label: 'Upper HIIT',
        type: 'upper',
        exercises: [
          { exerciseId: 'kettlebell-swing', scheme: { sets: 4, reps: '15', restSeconds: 45 } },
          { exerciseId: 'push-up', scheme: { sets: 4, reps: '15', restSeconds: 30 } },
          { exerciseId: 'dumbbell-row', scheme: { sets: 4, reps: '12', restSeconds: 30 }, notes: 'Alternate sides' },
          { exerciseId: 'dumbbell-lateral-raise', scheme: { sets: 3, reps: '20', restSeconds: 30 } },
          { exerciseId: 'mountain-climbers', scheme: { sets: 3, reps: '30s', restSeconds: 45 } },
          { exerciseId: 'box-jump', scheme: { sets: 3, reps: '10', restSeconds: 45 } },
        ],
      },
      {
        label: 'Lower HIIT',
        type: 'lower',
        exercises: [
          { exerciseId: 'box-jump', scheme: { sets: 4, reps: '10', restSeconds: 45 } },
          { exerciseId: 'deadlift', scheme: { sets: 4, reps: '12', restSeconds: 60 }, notes: 'Use moderate weight' },
          { exerciseId: 'walking-lunge', scheme: { sets: 3, reps: '12', restSeconds: 45 }, notes: 'Each leg' },
          { exerciseId: 'hip-thrust', scheme: { sets: 4, reps: '15', restSeconds: 60 } },
          { exerciseId: 'mountain-climbers', scheme: { sets: 3, reps: '30s', restSeconds: 30 } },
          { exerciseId: 'hanging-leg-raise', scheme: { sets: 3, reps: '15', restSeconds: 30 } },
        ],
      },
    ],
  },

  {
    id: 'fat-advanced-5day',
    name: '5-Day PPL + Cardio Integration',
    goal: 'fat-loss',
    experienceLevel: 'advanced',
    description:
      'A demanding 5-day program combining heavy compound lifts with 20-minute cardio finishers each session. Preserves hard-earned muscle while aggressively burning fat.',
    daysPerWeek: 5,
    estimatedDurationWeeks: 12,
    tags: ['ppl', 'advanced', 'cardio-integration', 'high-frequency'],
    schedule: [
      {
        label: 'Push + Cardio',
        type: 'push',
        exercises: [
          { exerciseId: 'barbell-bench-press', scheme: { sets: 4, reps: '8-10', restSeconds: 90 } },
          { exerciseId: 'overhead-press', scheme: { sets: 3, reps: '10-12', restSeconds: 60 } },
          { exerciseId: 'cable-chest-fly', scheme: { sets: 3, reps: '15', restSeconds: 45 } },
          { exerciseId: 'dumbbell-lateral-raise', scheme: { sets: 4, reps: '15-20', restSeconds: 30 } },
          { exerciseId: 'tricep-pushdown', scheme: { sets: 3, reps: '15-20', restSeconds: 45 } },
        ],
      },
      {
        label: 'Pull + HIIT',
        type: 'pull',
        exercises: [
          { exerciseId: 'deadlift', scheme: { sets: 4, reps: '5', restSeconds: 120, rpe: 8 }, notes: '~80% 1RM' },
          { exerciseId: 'pull-up', scheme: { sets: 4, reps: '8-10', restSeconds: 90 } },
          { exerciseId: 'seated-cable-row', scheme: { sets: 3, reps: '12-15', restSeconds: 60 } },
          { exerciseId: 'face-pull', scheme: { sets: 3, reps: '20', restSeconds: 30 } },
          { exerciseId: 'hammer-curl', scheme: { sets: 3, reps: '12', restSeconds: 45 } },
        ],
      },
      {
        label: 'Legs — Strength',
        type: 'legs',
        exercises: [
          { exerciseId: 'barbell-back-squat', scheme: { sets: 5, reps: '5', restSeconds: 120, rpe: 8 } },
          { exerciseId: 'romanian-deadlift', scheme: { sets: 4, reps: '10', restSeconds: 90 } },
          { exerciseId: 'leg-press', scheme: { sets: 3, reps: '15', restSeconds: 60 } },
          { exerciseId: 'leg-curl', scheme: { sets: 4, reps: '15', restSeconds: 60 } },
          { exerciseId: 'hip-thrust', scheme: { sets: 4, reps: '12', restSeconds: 90 } },
          { exerciseId: 'standing-calf-raise', scheme: { sets: 4, reps: '20', restSeconds: 45 } },
        ],
      },
      {
        label: 'Push — Metabolic',
        type: 'push',
        exercises: [
          { exerciseId: 'dumbbell-shoulder-press', scheme: { sets: 4, reps: '15', restSeconds: 45 } },
          { exerciseId: 'cable-chest-fly', scheme: { sets: 4, reps: '15', restSeconds: 30 } },
          { exerciseId: 'dumbbell-lateral-raise', scheme: { sets: 4, reps: '15', restSeconds: 30 } },
          { exerciseId: 'overhead-tricep-extension', scheme: { sets: 4, reps: '15', restSeconds: 30 } },
          { exerciseId: 'push-up', scheme: { sets: 3, reps: 'AMRAP', restSeconds: 60 }, notes: 'Circuit style — 30s rest between exercises' },
        ],
      },
      {
        label: 'Pull — Metabolic',
        type: 'pull',
        exercises: [
          { exerciseId: 'kettlebell-swing', scheme: { sets: 5, reps: '20', restSeconds: 45 } },
          { exerciseId: 'dumbbell-row', scheme: { sets: 4, reps: '15', restSeconds: 30 }, notes: 'Each side' },
          { exerciseId: 'lat-pulldown', scheme: { sets: 4, reps: '15', restSeconds: 45 } },
          { exerciseId: 'face-pull', scheme: { sets: 3, reps: '20', restSeconds: 30 } },
          { exerciseId: 'barbell-curl', scheme: { sets: 3, reps: '12-15', restSeconds: 45 } },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  // GENERAL FITNESS / MAINTAIN
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: 'gf-beginner-3day',
    name: '3-Day Balanced Full Body',
    goal: 'general-fitness',
    experienceLevel: 'beginner',
    description:
      'A balanced three-day program mixing strength work with light cardio and mobility. Great for building a fitness habit and maintaining a healthy, functional body.',
    daysPerWeek: 3,
    estimatedDurationWeeks: 8,
    tags: ['full-body', 'beginner', 'balanced', 'mobility'],
    schedule: [
      {
        label: 'Day A',
        type: 'full-body',
        exercises: [
          { exerciseId: 'goblet-squat', scheme: { sets: 3, reps: '10', restSeconds: 75 } },
          { exerciseId: 'push-up', scheme: { sets: 3, reps: '10-12', restSeconds: 60 } },
          { exerciseId: 'dumbbell-row', scheme: { sets: 3, reps: '10', restSeconds: 60 }, notes: 'Each side' },
          { exerciseId: 'plank', scheme: { sets: 3, reps: '30s', restSeconds: 45 } },
          { exerciseId: 'glute-bridge', scheme: { sets: 3, reps: '12', restSeconds: 45 } },
        ],
      },
      {
        label: 'Day B',
        type: 'full-body',
        exercises: [
          { exerciseId: 'walking-lunge', scheme: { sets: 3, reps: '10', restSeconds: 75 }, notes: 'Each leg' },
          { exerciseId: 'dumbbell-bench-press', scheme: { sets: 3, reps: '10-12', restSeconds: 60 } },
          { exerciseId: 'lat-pulldown', scheme: { sets: 3, reps: '10-12', restSeconds: 60 } },
          { exerciseId: 'glute-bridge', scheme: { sets: 3, reps: '15', restSeconds: 60 } },
          { exerciseId: 'plank', scheme: { sets: 2, reps: '30s', restSeconds: 45 } },
        ],
      },
      {
        label: 'Day C',
        type: 'full-body',
        exercises: [
          { exerciseId: 'romanian-deadlift', scheme: { sets: 3, reps: '8', restSeconds: 90 }, notes: 'Light weight — focus on form' },
          { exerciseId: 'overhead-press', scheme: { sets: 3, reps: '10', restSeconds: 60 } },
          { exerciseId: 'seated-cable-row', scheme: { sets: 3, reps: '10-12', restSeconds: 60 } },
          { exerciseId: 'mountain-climbers', scheme: { sets: 3, reps: '20s', restSeconds: 45 } },
          { exerciseId: 'standing-calf-raise', scheme: { sets: 3, reps: '15', restSeconds: 45 } },
        ],
      },
    ],
  },

  {
    id: 'gf-intermediate-4day',
    name: '4-Day Athletic Split',
    goal: 'general-fitness',
    experienceLevel: 'intermediate',
    description:
      'Two strength days and two cardio/accessory days, building functional strength while improving cardiovascular fitness and athletic performance.',
    daysPerWeek: 4,
    estimatedDurationWeeks: 10,
    tags: ['athletic', 'intermediate', 'balanced', 'cardio-strength'],
    schedule: [
      {
        label: 'Strength Day 1',
        type: 'full-body',
        exercises: [
          { exerciseId: 'barbell-back-squat', scheme: { sets: 4, reps: '6-8', restSeconds: 120 } },
          { exerciseId: 'barbell-bench-press', scheme: { sets: 4, reps: '6-8', restSeconds: 120 } },
          { exerciseId: 'barbell-row', scheme: { sets: 4, reps: '6-8', restSeconds: 120 } },
          { exerciseId: 'plank', scheme: { sets: 3, reps: '45s', restSeconds: 30 } },
          { exerciseId: 'hanging-leg-raise', scheme: { sets: 3, reps: '10', restSeconds: 30 } },
        ],
      },
      {
        label: 'Cardio + Accessory',
        type: 'cardio',
        exercises: [
          { exerciseId: 'kettlebell-swing', scheme: { sets: 4, reps: '15', restSeconds: 60 }, notes: 'As part of cardio warm-up' },
          { exerciseId: 'dumbbell-lateral-raise', scheme: { sets: 3, reps: '15', restSeconds: 45 } },
          { exerciseId: 'hammer-curl', scheme: { sets: 3, reps: '12', restSeconds: 45 } },
          { exerciseId: 'tricep-pushdown', scheme: { sets: 3, reps: '15', restSeconds: 45 } },
          { exerciseId: 'standing-calf-raise', scheme: { sets: 4, reps: '20', restSeconds: 45 } },
        ],
      },
      {
        label: 'Strength Day 2',
        type: 'full-body',
        exercises: [
          { exerciseId: 'deadlift', scheme: { sets: 4, reps: '5', restSeconds: 150 } },
          { exerciseId: 'overhead-press', scheme: { sets: 4, reps: '6-8', restSeconds: 90 } },
          { exerciseId: 'pull-up', scheme: { sets: 4, reps: 'AMRAP', restSeconds: 90 } },
          { exerciseId: 'bulgarian-split-squat', scheme: { sets: 3, reps: '8', restSeconds: 90 }, notes: 'Each leg' },
          { exerciseId: 'face-pull', scheme: { sets: 3, reps: '15', restSeconds: 45 } },
        ],
      },
      {
        label: 'Active Recovery + Accessories',
        type: 'cardio',
        exercises: [
          { exerciseId: 'box-jump', scheme: { sets: 4, reps: '6', restSeconds: 60 }, notes: 'Explosive focus' },
          { exerciseId: 'kettlebell-swing', scheme: { sets: 4, reps: '15', restSeconds: 45 } },
          { exerciseId: 'barbell-curl', scheme: { sets: 3, reps: '12', restSeconds: 45 } },
          { exerciseId: 'overhead-tricep-extension', scheme: { sets: 3, reps: '12', restSeconds: 45 } },
          { exerciseId: 'plank', scheme: { sets: 3, reps: '45s', restSeconds: 30 } },
        ],
      },
    ],
  },

  {
    id: 'gf-advanced-5day',
    name: '5-Day Athletic Performance',
    goal: 'general-fitness',
    experienceLevel: 'advanced',
    description:
      'A balanced 5-day program combining powerlifting-style strength work, hypertrophy accessory training, and conditioning. For the athlete who wants to be strong, fit, and capable.',
    daysPerWeek: 5,
    estimatedDurationWeeks: 12,
    tags: ['athletic', 'advanced', 'powerbuilding', 'conditioning'],
    schedule: [
      {
        label: 'Lower Power',
        type: 'lower',
        exercises: [
          { exerciseId: 'barbell-back-squat', scheme: { sets: 5, reps: '3-5', restSeconds: 180, rpe: 8 } },
          { exerciseId: 'romanian-deadlift', scheme: { sets: 4, reps: '6-8', restSeconds: 120 } },
          { exerciseId: 'bulgarian-split-squat', scheme: { sets: 3, reps: '8', restSeconds: 90 }, notes: 'Each leg' },
          { exerciseId: 'leg-curl', scheme: { sets: 3, reps: '12', restSeconds: 60 } },
          { exerciseId: 'standing-calf-raise', scheme: { sets: 4, reps: '15', restSeconds: 60 } },
        ],
      },
      {
        label: 'Upper Power',
        type: 'upper',
        exercises: [
          { exerciseId: 'barbell-bench-press', scheme: { sets: 5, reps: '3-5', restSeconds: 180, rpe: 8 } },
          { exerciseId: 'barbell-row', scheme: { sets: 5, reps: '3-5', restSeconds: 180, rpe: 8 } },
          { exerciseId: 'pull-up', scheme: { sets: 4, reps: '6', restSeconds: 120 } },
          { exerciseId: 'overhead-press', scheme: { sets: 4, reps: '6-8', restSeconds: 90 } },
          { exerciseId: 'face-pull', scheme: { sets: 3, reps: '15', restSeconds: 45 } },
        ],
      },
      {
        label: 'Cardio & Mobility',
        type: 'cardio',
        exercises: [
          { exerciseId: 'kettlebell-swing', scheme: { sets: 5, reps: '15', restSeconds: 45 }, notes: '30-40 min cardio session' },
          { exerciseId: 'box-jump', scheme: { sets: 4, reps: '6', restSeconds: 60 }, notes: 'Explosive movement' },
          { exerciseId: 'mountain-climbers', scheme: { sets: 4, reps: '30s', restSeconds: 30 } },
          { exerciseId: 'plank', scheme: { sets: 3, reps: '60s', restSeconds: 30 } },
        ],
      },
      {
        label: 'Strength Accessory',
        type: 'upper',
        exercises: [
          { exerciseId: 'incline-dumbbell-press', scheme: { sets: 4, reps: '10-12', restSeconds: 60 } },
          { exerciseId: 'seated-cable-row', scheme: { sets: 4, reps: '10-12', restSeconds: 60 } },
          { exerciseId: 'dumbbell-lateral-raise', scheme: { sets: 4, reps: '15-20', restSeconds: 30 } },
          { exerciseId: 'barbell-curl', scheme: { sets: 3, reps: '10-12', restSeconds: 45 } },
          { exerciseId: 'tricep-pushdown', scheme: { sets: 3, reps: '12-15', restSeconds: 45 } },
          { exerciseId: 'hanging-leg-raise', scheme: { sets: 3, reps: '12', restSeconds: 45 } },
        ],
      },
      {
        label: 'HIIT & Conditioning',
        type: 'cardio',
        exercises: [
          { exerciseId: 'box-jump', scheme: { sets: 5, reps: '5', restSeconds: 90 } },
          { exerciseId: 'kettlebell-swing', scheme: { sets: 5, reps: '10', restSeconds: 90 } },
          { exerciseId: 'mountain-climbers', scheme: { sets: 5, reps: '20s', restSeconds: 90 }, notes: 'Rest 90s between full rounds' },
          { exerciseId: 'ab-wheel-rollout', scheme: { sets: 4, reps: '8', restSeconds: 60 } },
        ],
      },
    ],
  },
];

export function getProgramById(id: string): Program | undefined {
  return programs.find((p) => p.id === id);
}
