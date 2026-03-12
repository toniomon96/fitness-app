import { beforeEach, describe, expect, it, vi } from 'vitest';

const { guestProfileState, weightUnitSpy } = vi.hoisted(() => ({
  guestProfileState: {
    current: null as null | {
      name?: string;
      goal?: 'hypertrophy' | 'fat-loss' | 'general-fitness';
      experienceLevel?: 'beginner' | 'intermediate' | 'advanced';
    },
  },
  weightUnitSpy: vi.fn(),
}));

vi.mock('./api', () => ({ apiBase: '' }));
vi.mock('./tutorial', () => ({ markTutorialSeen: vi.fn() }));
vi.mock('./dbHydration', () => ({ getProfileById: vi.fn() }));
vi.mock('../utils/localStorage', () => ({
  getGuestProfile: vi.fn(() => guestProfileState.current),
  getTheme: vi.fn(() => 'dark'),
  setWeightUnit: weightUnitSpy,
}));

import {
  fallbackExperienceLevel,
  fallbackGoal,
  fallbackName,
  mapProfileToUser,
  syncWeightUnitFromMetadata,
} from './profileRecovery';

beforeEach(() => {
  guestProfileState.current = null;
  vi.clearAllMocks();
});

describe('profileRecovery helpers', () => {
  it('prefers guest profile name for fallback name', () => {
    guestProfileState.current = { name: 'Guest Lifter' };
    const session = {
      user: {
        user_metadata: {},
        email: 'fallback@example.com',
      },
    } as never;

    expect(fallbackName(session)).toBe('Guest Lifter');
  });

  it('falls back to metadata name before email prefix', () => {
    const session = {
      user: {
        user_metadata: { full_name: 'Metadata Name' },
        email: 'fallback@example.com',
      },
    } as never;

    expect(fallbackName(session)).toBe('Metadata Name');
  });

  it('uses guest goal and experience defaults when available', () => {
    guestProfileState.current = {
      goal: 'fat-loss',
      experienceLevel: 'advanced',
    };

    expect(fallbackGoal()).toBe('fat-loss');
    expect(fallbackExperienceLevel()).toBe('advanced');
  });

  it('syncs weight unit from auth metadata when supported', () => {
    const session = {
      user: {
        user_metadata: { weight_unit: 'kg' },
      },
    } as never;

    syncWeightUnitFromMetadata(session);
    expect(weightUnitSpy).toHaveBeenCalledWith('kg');
  });

  it('maps profile records into app user objects', () => {
    expect(mapProfileToUser({
      id: 'user-1',
      name: 'Casey',
      goal: 'hypertrophy',
      experience_level: 'intermediate',
      active_program_id: 'program-1',
      created_at: '2026-03-11T00:00:00Z',
      avatar_url: 'https://example.com/avatar.png',
    })).toEqual({
      id: 'user-1',
      name: 'Casey',
      goal: 'hypertrophy',
      experienceLevel: 'intermediate',
      activeProgramId: 'program-1',
      onboardedAt: '2026-03-11T00:00:00Z',
      theme: 'dark',
      avatarUrl: 'https://example.com/avatar.png',
    });
  });
});