import type { Achievement } from '../types';

// ─── Achievement Definitions ──────────────────────────────────────────────────
//
// 18 total: 6 Bronze / 6 Silver / 6 Gold
// XP rewards: Bronze = 25 XP, Silver = 75 XP, Gold = 200 XP

export const ACHIEVEMENTS: Achievement[] = [
  // ─── Bronze (6) ────────────────────────────────────────────────────────────

  {
    id: 'first-workout',
    title: 'First Step',
    description: 'Completed your very first workout.',
    tier: 'bronze',
    icon: '👟',
    xpReward: 25,
    conditionSummary: 'Complete 1 workout',
  },
  {
    id: 'first-pr',
    title: 'New Record',
    description: 'Hit your first personal record.',
    tier: 'bronze',
    icon: '🏆',
    xpReward: 25,
    conditionSummary: 'Achieve 1 personal record',
  },
  {
    id: 'first-lesson',
    title: 'Knowledge Seeker',
    description: 'Completed your first lesson.',
    tier: 'bronze',
    icon: '📖',
    xpReward: 25,
    conditionSummary: 'Complete 1 lesson',
  },
  {
    id: 'streak-3',
    title: 'On a Roll',
    description: 'Trained 3 days in a row.',
    tier: 'bronze',
    icon: '🔥',
    xpReward: 25,
    conditionSummary: 'Reach a 3-day streak',
  },
  {
    id: 'workouts-5',
    title: 'Dedicated',
    description: 'Completed 5 workouts.',
    tier: 'bronze',
    icon: '💪',
    xpReward: 25,
    conditionSummary: 'Complete 5 workouts',
  },
  {
    id: 'lessons-5',
    title: 'Student of the Game',
    description: 'Completed 5 lessons.',
    tier: 'bronze',
    icon: '🎓',
    xpReward: 25,
    conditionSummary: 'Complete 5 lessons',
  },

  // ─── Silver (6) ────────────────────────────────────────────────────────────

  {
    id: 'streak-7',
    title: 'Week Warrior',
    description: 'Trained 7 days in a row.',
    tier: 'silver',
    icon: '⚡',
    xpReward: 75,
    conditionSummary: 'Reach a 7-day streak',
  },
  {
    id: 'workouts-25',
    title: 'Regular',
    description: 'Completed 25 workouts.',
    tier: 'silver',
    icon: '🏋️',
    xpReward: 75,
    conditionSummary: 'Complete 25 workouts',
  },
  {
    id: 'prs-10',
    title: 'Record Breaker',
    description: 'Achieved 10 personal records.',
    tier: 'silver',
    icon: '🎯',
    xpReward: 75,
    conditionSummary: 'Achieve 10 personal records',
  },
  {
    id: 'first-course',
    title: 'Course Complete',
    description: 'Completed an entire course.',
    tier: 'silver',
    icon: '🎖️',
    xpReward: 75,
    conditionSummary: 'Complete 1 course',
  },
  {
    id: 'xp-500',
    title: 'Rising Star',
    description: 'Earned 500 total XP.',
    tier: 'silver',
    icon: '🌟',
    xpReward: 75,
    conditionSummary: 'Earn 500 XP',
  },
  {
    id: 'lessons-20',
    title: 'Scholar',
    description: 'Completed 20 lessons.',
    tier: 'silver',
    icon: '📚',
    xpReward: 75,
    conditionSummary: 'Complete 20 lessons',
  },

  // ─── Gold (6) ──────────────────────────────────────────────────────────────

  {
    id: 'streak-30',
    title: 'Iron Will',
    description: 'Trained 30 days in a row.',
    tier: 'gold',
    icon: '🔱',
    xpReward: 200,
    conditionSummary: 'Reach a 30-day streak',
  },
  {
    id: 'workouts-100',
    title: 'Century Club',
    description: 'Completed 100 workouts.',
    tier: 'gold',
    icon: '💯',
    xpReward: 200,
    conditionSummary: 'Complete 100 workouts',
  },
  {
    id: 'prs-50',
    title: 'Personal Best Machine',
    description: 'Achieved 50 personal records.',
    tier: 'gold',
    icon: '👑',
    xpReward: 200,
    conditionSummary: 'Achieve 50 personal records',
  },
  {
    id: 'courses-5',
    title: 'Master Learner',
    description: 'Completed 5 courses.',
    tier: 'gold',
    icon: '🏅',
    xpReward: 200,
    conditionSummary: 'Complete 5 courses',
  },
  {
    id: 'xp-5000',
    title: 'Elite',
    description: 'Earned 5000 total XP.',
    tier: 'gold',
    icon: '💎',
    xpReward: 200,
    conditionSummary: 'Earn 5000 XP',
  },
  {
    id: 'streak-100',
    title: 'Unstoppable',
    description: 'Trained 100 days in a row.',
    tier: 'gold',
    icon: '🚀',
    xpReward: 200,
    conditionSummary: 'Reach a 100-day streak',
  },
];

export const ACHIEVEMENT_MAP = new Map<string, Achievement>(
  ACHIEVEMENTS.map((a) => [a.id, a]),
);

/** Evaluate which achievement IDs should be newly unlocked given the current user state. */
export function evaluateAchievements(params: {
  totalXp: number;
  streak: number;
  workoutCount: number;
  prCount: number;
  completedLessons: number;
  completedCourses: number;
  alreadyUnlocked: string[];
}): Achievement[] {
  const {
    totalXp, streak, workoutCount, prCount,
    completedLessons, completedCourses, alreadyUnlocked,
  } = params;
  const unlocked = new Set(alreadyUnlocked);

  const newUnlocks: Achievement[] = [];

  function check(achievement: Achievement, condition: boolean) {
    if (!unlocked.has(achievement.id) && condition) {
      newUnlocks.push(achievement);
    }
  }

  check(ACHIEVEMENT_MAP.get('first-workout')!,  workoutCount >= 1);
  check(ACHIEVEMENT_MAP.get('first-pr')!,       prCount >= 1);
  check(ACHIEVEMENT_MAP.get('first-lesson')!,   completedLessons >= 1);
  check(ACHIEVEMENT_MAP.get('streak-3')!,        streak >= 3);
  check(ACHIEVEMENT_MAP.get('workouts-5')!,      workoutCount >= 5);
  check(ACHIEVEMENT_MAP.get('lessons-5')!,       completedLessons >= 5);
  check(ACHIEVEMENT_MAP.get('streak-7')!,        streak >= 7);
  check(ACHIEVEMENT_MAP.get('workouts-25')!,     workoutCount >= 25);
  check(ACHIEVEMENT_MAP.get('prs-10')!,          prCount >= 10);
  check(ACHIEVEMENT_MAP.get('first-course')!,    completedCourses >= 1);
  check(ACHIEVEMENT_MAP.get('xp-500')!,          totalXp >= 500);
  check(ACHIEVEMENT_MAP.get('lessons-20')!,      completedLessons >= 20);
  check(ACHIEVEMENT_MAP.get('streak-30')!,       streak >= 30);
  check(ACHIEVEMENT_MAP.get('workouts-100')!,    workoutCount >= 100);
  check(ACHIEVEMENT_MAP.get('prs-50')!,          prCount >= 50);
  check(ACHIEVEMENT_MAP.get('courses-5')!,       completedCourses >= 5);
  check(ACHIEVEMENT_MAP.get('xp-5000')!,         totalXp >= 5000);
  check(ACHIEVEMENT_MAP.get('streak-100')!,      streak >= 100);

  return newUnlocks;
}
