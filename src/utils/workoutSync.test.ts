import { describe, expect, it } from 'vitest';
import { canRetryWorkoutSync, getSessionPersonalRecords, getWorkoutSyncStatusCopy } from './workoutSync';

const makeSession = (syncStatus?: 'saved_on_device' | 'syncing' | 'synced' | 'needs_attention') => ({
  id: 'session-1',
  programId: 'prog-1',
  trainingDayIndex: 0,
  startedAt: '2026-03-11T00:00:00Z',
  exercises: [],
  totalVolumeKg: 0,
  syncStatus,
});

describe('getWorkoutSyncStatusCopy', () => {
  it('returns sync copy for syncing sessions', () => {
    expect(getWorkoutSyncStatusCopy('syncing')).toEqual({
      label: 'Syncing',
      description: 'We are syncing this workout to your account now.',
      tone: 'blue',
    });
  });

  it('returns saved-on-device copy for guest sessions', () => {
    expect(getWorkoutSyncStatusCopy('saved_on_device')?.label).toBe('Saved on device');
  });

  it('returns null when no sync state exists', () => {
    expect(getWorkoutSyncStatusCopy(undefined)).toBeNull();
  });

  it('returns only personal records for the requested session', () => {
    expect(
      getSessionPersonalRecords('session-1', [
        { exerciseId: 'bench', weight: 100, reps: 5, achievedAt: '2026-03-11', sessionId: 'session-1' },
        { exerciseId: 'squat', weight: 140, reps: 3, achievedAt: '2026-03-11', sessionId: 'session-2' },
      ]),
    ).toHaveLength(1);
  });

  it('allows retry only for authenticated needs-attention sessions', () => {
    expect(canRetryWorkoutSync(makeSession('needs_attention'), true)).toBe(true);
    expect(canRetryWorkoutSync(makeSession('synced'), true)).toBe(false);
    expect(canRetryWorkoutSync(makeSession('needs_attention'), false)).toBe(false);
  });
});