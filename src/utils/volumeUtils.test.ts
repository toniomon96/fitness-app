import { describe, it, expect } from 'vitest';
import { estimate1RM, calculateTotalVolume, getExerciseProgressionData } from './volumeUtils';
import type { WorkoutSession, WorkoutHistory } from '../types';

// ─── estimate1RM ─────────────────────────────────────────────────────────────

describe('estimate1RM', () => {
  it('returns weight directly for a single rep', () => {
    expect(estimate1RM(100, 1)).toBe(100);
  });

  it('calculates Epley formula for multiple reps', () => {
    // 100 * (1 + 5/30) = 100 * 1.1667 ≈ 116.67
    expect(estimate1RM(100, 5)).toBeCloseTo(116.67, 1);
  });

  it('returns higher 1RM for more reps at same weight', () => {
    expect(estimate1RM(80, 10)).toBeGreaterThan(estimate1RM(80, 5));
  });
});

// ─── calculateTotalVolume ────────────────────────────────────────────────────

function makeSession(sets: Array<{ weight: number; reps: number; completed: boolean }>): WorkoutSession {
  return {
    id: 'test',
    programId: 'prog',
    trainingDayIndex: 0,
    startedAt: new Date().toISOString(),
    exercises: [
      {
        exerciseId: 'ex1',
        sets: sets.map((s, i) => ({
          setNumber: i + 1,
          weight: s.weight,
          reps: s.reps,
          completed: s.completed,
          timestamp: '',
        })),
      },
    ],
    totalVolumeKg: 0,
  };
}

describe('calculateTotalVolume', () => {
  it('sums weight × reps for completed sets only', () => {
    const session = makeSession([
      { weight: 100, reps: 5, completed: true },   // 500
      { weight: 100, reps: 5, completed: true },   // 500
      { weight: 80, reps: 8, completed: false },   // 0 (not completed)
    ]);
    expect(calculateTotalVolume(session)).toBe(1000);
  });

  it('returns 0 for empty session', () => {
    const session = makeSession([]);
    expect(calculateTotalVolume(session)).toBe(0);
  });

  it('returns 0 if no sets are completed', () => {
    const session = makeSession([
      { weight: 100, reps: 5, completed: false },
    ]);
    expect(calculateTotalVolume(session)).toBe(0);
  });
});

// ─── getExerciseProgressionData ───────────────────────────────────────────────

describe('getExerciseProgressionData', () => {
  const history: WorkoutHistory = {
    sessions: [
      {
        id: 's1',
        programId: 'prog',
        trainingDayIndex: 0,
        startedAt: '2025-01-01T10:00:00Z',
        completedAt: '2025-01-01T11:00:00Z',
        exercises: [
          {
            exerciseId: 'bench',
            sets: [
              { setNumber: 1, weight: 80, reps: 8, completed: true, timestamp: '' },
              { setNumber: 2, weight: 80, reps: 6, completed: true, timestamp: '' },
            ],
          },
        ],
        totalVolumeKg: 1120,
      },
      {
        id: 's2',
        programId: 'prog',
        trainingDayIndex: 0,
        startedAt: '2025-01-08T10:00:00Z',
        completedAt: '2025-01-08T11:00:00Z',
        exercises: [
          {
            exerciseId: 'bench',
            sets: [
              { setNumber: 1, weight: 85, reps: 8, completed: true, timestamp: '' },
            ],
          },
        ],
        totalVolumeKg: 680,
      },
    ],
    personalRecords: [],
  };

  it('returns one data point per session that includes the exercise', () => {
    const data = getExerciseProgressionData('bench', history);
    expect(data).toHaveLength(2);
  });

  it('returns max weight for each session', () => {
    const data = getExerciseProgressionData('bench', history);
    expect(data[0].maxWeightKg).toBe(80);
    expect(data[1].maxWeightKg).toBe(85);
  });

  it('returns empty array for exercise with no history', () => {
    const data = getExerciseProgressionData('squat', history);
    expect(data).toHaveLength(0);
  });

  it('sorts data points chronologically', () => {
    const data = getExerciseProgressionData('bench', history);
    expect(new Date(data[0].date).getTime()).toBeLessThan(new Date(data[1].date).getTime());
  });
});
