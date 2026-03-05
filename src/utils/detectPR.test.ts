import { describe, it, expect } from 'vitest';
import { detectPersonalRecords } from './volumeUtils';
import type { WorkoutSession, WorkoutHistory } from '../types';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeSession(
  id: string,
  exercises: Array<{
    exerciseId: string;
    sets: Array<{ weight: number; reps: number; completed: boolean }>;
  }>,
  completedAt = '2025-03-01T11:00:00Z',
): WorkoutSession {
  return {
    id,
    programId: 'prog',
    trainingDayIndex: 0,
    startedAt: '2025-03-01T10:00:00Z',
    completedAt,
    exercises: exercises.map((ex) => ({
      exerciseId: ex.exerciseId,
      sets: ex.sets.map((s, i) => ({
        setNumber: i + 1,
        weight: s.weight,
        reps: s.reps,
        completed: s.completed,
        timestamp: '',
      })),
    })),
    totalVolumeKg: 0,
  };
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('detectPersonalRecords', () => {
  it('detects a PR when no prior history exists', () => {
    const session = makeSession('s1', [
      { exerciseId: 'bench', sets: [{ weight: 80, reps: 5, completed: true }] },
    ]);
    const history: WorkoutHistory = { sessions: [], personalRecords: [] };
    const prs = detectPersonalRecords(session, history);
    expect(prs).toHaveLength(1);
    expect(prs[0].exerciseId).toBe('bench');
    expect(prs[0].weight).toBe(80);
  });

  it('detects a PR when new 1RM exceeds history', () => {
    const oldSession = makeSession('s0', [
      { exerciseId: 'bench', sets: [{ weight: 80, reps: 5, completed: true }] },
    ]);
    const newSession = makeSession('s1', [
      { exerciseId: 'bench', sets: [{ weight: 100, reps: 5, completed: true }] },
    ]);
    const history: WorkoutHistory = { sessions: [oldSession], personalRecords: [] };
    const prs = detectPersonalRecords(newSession, history);
    expect(prs).toHaveLength(1);
    expect(prs[0].weight).toBe(100);
  });

  it('returns empty when no improvement over history', () => {
    const oldSession = makeSession('s0', [
      { exerciseId: 'bench', sets: [{ weight: 100, reps: 5, completed: true }] },
    ]);
    const newSession = makeSession('s1', [
      { exerciseId: 'bench', sets: [{ weight: 80, reps: 5, completed: true }] },
    ]);
    const history: WorkoutHistory = { sessions: [oldSession], personalRecords: [] };
    const prs = detectPersonalRecords(newSession, history);
    expect(prs).toHaveLength(0);
  });

  it('ignores incomplete sets', () => {
    const session = makeSession('s1', [
      {
        exerciseId: 'bench',
        sets: [
          { weight: 200, reps: 1, completed: false },
          { weight: 60, reps: 10, completed: true },
        ],
      },
    ]);
    const history: WorkoutHistory = { sessions: [], personalRecords: [] };
    const prs = detectPersonalRecords(session, history);
    expect(prs).toHaveLength(1);
    expect(prs[0].weight).toBe(60); // only the completed set counts
  });

  it('handles multiple exercises with mixed PR results', () => {
    const oldSession = makeSession('s0', [
      { exerciseId: 'bench', sets: [{ weight: 100, reps: 5, completed: true }] },
      { exerciseId: 'squat', sets: [{ weight: 80, reps: 5, completed: true }] },
    ]);
    const newSession = makeSession('s1', [
      { exerciseId: 'bench', sets: [{ weight: 80, reps: 5, completed: true }] }, // no PR
      { exerciseId: 'squat', sets: [{ weight: 120, reps: 5, completed: true }] }, // PR
    ]);
    const history: WorkoutHistory = { sessions: [oldSession], personalRecords: [] };
    const prs = detectPersonalRecords(newSession, history);
    expect(prs).toHaveLength(1);
    expect(prs[0].exerciseId).toBe('squat');
  });

  it('does not flag PR for 0-weight sets', () => {
    const session = makeSession('s1', [
      { exerciseId: 'bench', sets: [{ weight: 0, reps: 5, completed: true }] },
    ]);
    const history: WorkoutHistory = { sessions: [], personalRecords: [] };
    const prs = detectPersonalRecords(session, history);
    expect(prs).toHaveLength(0);
  });

  it('picks the best set from multiple sets in the session', () => {
    const session = makeSession('s1', [
      {
        exerciseId: 'bench',
        sets: [
          { weight: 80, reps: 5, completed: true },
          { weight: 100, reps: 3, completed: true },
          { weight: 90, reps: 4, completed: true },
        ],
      },
    ]);
    const history: WorkoutHistory = { sessions: [], personalRecords: [] };
    const prs = detectPersonalRecords(session, history);
    expect(prs).toHaveLength(1);
    // 100kg × 3 reps → 1RM via Epley = 100 * (1 + 3/30) = 110
    expect(prs[0].weight).toBe(100);
    expect(prs[0].reps).toBe(3);
  });

  it('uses Epley formula so higher reps can beat heavier singles', () => {
    // Old session: 100kg × 1 rep → 1RM = 100
    const oldSession = makeSession('s0', [
      { exerciseId: 'bench', sets: [{ weight: 100, reps: 1, completed: true }] },
    ]);
    // New session: 90kg × 5 reps → 1RM = 90 * (1 + 5/30) = 105 > 100
    const newSession = makeSession('s1', [
      { exerciseId: 'bench', sets: [{ weight: 90, reps: 5, completed: true }] },
    ]);
    const history: WorkoutHistory = { sessions: [oldSession], personalRecords: [] };
    const prs = detectPersonalRecords(newSession, history);
    expect(prs).toHaveLength(1);
  });
});
