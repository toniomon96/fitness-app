import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
  updateUserMock,
  upsertSessionMock,
  upsertPersonalRecordsMock,
  upsertLearningProgressMock,
  upsertCustomProgramMock,
} = vi.hoisted(() => ({
  updateUserMock: vi.fn().mockResolvedValue({ data: {}, error: null }),
  upsertSessionMock: vi.fn().mockResolvedValue(undefined),
  upsertPersonalRecordsMock: vi.fn().mockResolvedValue(undefined),
  upsertLearningProgressMock: vi.fn().mockResolvedValue(undefined),
  upsertCustomProgramMock: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('./supabase', () => ({
  supabase: {
    auth: {
      updateUser: updateUserMock,
    },
  },
}));

vi.mock('./dbHydration', () => ({
  upsertSession: upsertSessionMock,
  upsertPersonalRecords: upsertPersonalRecordsMock,
  upsertLearningProgress: upsertLearningProgressMock,
  upsertCustomProgram: upsertCustomProgramMock,
}));

const store: Record<string, string> = {};
const localStorageMock = {
  getItem: vi.fn((key: string) => store[key] ?? null),
  setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
  removeItem: vi.fn((key: string) => { delete store[key]; }),
  clear: vi.fn(() => { for (const key of Object.keys(store)) delete store[key]; }),
  get length() { return Object.keys(store).length; },
  key: vi.fn((_i: number) => null),
};

vi.stubGlobal('localStorage', localStorageMock);
vi.stubGlobal('window', {
  matchMedia: vi.fn(() => ({ matches: false })),
  localStorage: localStorageMock,
});

import {
  appendSession,
  getExperienceMode,
  getGuestProfile,
  saveCustomProgram,
  setExperienceMode,
  setGuestProfile,
  setLearningProgress,
  setWeightUnit,
  updatePersonalRecords,
} from '../utils/localStorage';
import {
  clearGuestMigrationDismissal,
  dismissGuestMigrationPrompt,
  getGuestMigrationSummary,
  importGuestDataToAccount,
  isGuestMigrationDismissed,
} from './dataMigration';
import type { Program, User, WorkoutSession } from '../types';

function makeSession(id: string): WorkoutSession {
  return {
    id,
    programId: 'prog-1',
    trainingDayIndex: 0,
    startedAt: '2026-03-11T10:00:00Z',
    exercises: [],
    totalVolumeKg: 500,
  };
}

function makeProgram(id: string): Program {
  return {
    id,
    name: `Program ${id}`,
    goal: 'hypertrophy',
    experienceLevel: 'beginner',
    description: '',
    daysPerWeek: 3,
    estimatedDurationWeeks: 8,
    schedule: [],
    tags: [],
  };
}

const guestUser: User = {
  id: 'guest-1',
  name: 'Guest User',
  goal: 'hypertrophy',
  experienceLevel: 'beginner',
  onboardedAt: '2026-03-11T00:00:00Z',
  theme: 'dark',
  isGuest: true,
};

beforeEach(() => {
  localStorageMock.clear();
  vi.clearAllMocks();
});

describe('guest data migration', () => {
  it('builds a summary when guest data exists', () => {
    setGuestProfile(guestUser);
    appendSession(makeSession('session-1'));
    updatePersonalRecords([{ exerciseId: 'bench', weight: 100, reps: 5, achievedAt: '2026-03-11', sessionId: 'session-1' }]);
    setLearningProgress({ completedLessons: ['lesson-1'], completedModules: [], completedCourses: [], quizScores: {}, lastActivityAt: '2026-03-11' });
    saveCustomProgram(makeProgram('custom-1'));
    setWeightUnit('kg');
    setExperienceMode('guest-1', 'advanced');

    expect(getGuestMigrationSummary('user-1')).toEqual({
      guestId: 'guest-1',
      sessionCount: 1,
      personalRecordCount: 1,
      learningItemCount: 1,
      customProgramCount: 1,
      weightUnit: 'kg',
      experienceMode: 'advanced',
    });
  });

  it('tracks dismissed prompt state per authenticated user', () => {
    dismissGuestMigrationPrompt('user-1');
    expect(isGuestMigrationDismissed('user-1')).toBe(true);
    clearGuestMigrationDismissal('user-1');
    expect(isGuestMigrationDismissed('user-1')).toBe(false);
  });

  it('imports guest data into an account and marks it complete', async () => {
    setGuestProfile(guestUser);
    appendSession(makeSession('session-1'));
    updatePersonalRecords([{ exerciseId: 'bench', weight: 100, reps: 5, achievedAt: '2026-03-11', sessionId: 'session-1' }]);
    setLearningProgress({ completedLessons: ['lesson-1'], completedModules: [], completedCourses: [], quizScores: {}, lastActivityAt: '2026-03-11' });
    saveCustomProgram(makeProgram('custom-1'));
    setWeightUnit('kg');
    setExperienceMode('guest-1', 'advanced');

    const summary = await importGuestDataToAccount('user-1');

    expect(summary?.guestId).toBe('guest-1');
    expect(upsertSessionMock).toHaveBeenCalledTimes(1);
    expect(upsertPersonalRecordsMock).toHaveBeenCalledTimes(1);
    expect(upsertLearningProgressMock).toHaveBeenCalledTimes(1);
    expect(upsertCustomProgramMock).toHaveBeenCalledTimes(1);
    expect(updateUserMock).toHaveBeenCalledWith({ data: { weight_unit: 'kg' } });
    expect(getExperienceMode('user-1')).toBe('advanced');
    expect(getGuestProfile()).toBeNull();
    expect(getGuestMigrationSummary('user-1')).toBeNull();
  });
});