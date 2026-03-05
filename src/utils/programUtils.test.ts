import { describe, it, expect, vi, beforeEach } from 'vitest';
import { recommendProgram, getNextWorkout, advanceProgramCursor, getWeeklyCompletionCount } from './programUtils';
import type { Program, TrainingDay } from '../types';

// ─── localStorage mock (Node env) ────────────────────────────────────────────

const store: Record<string, string> = {};
vi.stubGlobal('localStorage', {
  getItem: vi.fn((key: string) => store[key] ?? null),
  setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
  removeItem: vi.fn((key: string) => { delete store[key]; }),
  clear: vi.fn(() => { for (const k of Object.keys(store)) delete store[k]; }),
});
vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false })));

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeDay(label: string): TrainingDay {
  return { label, type: 'full-body', exercises: [] };
}

function makeProgram(id: string, goal: Program['goal'], level: Program['experienceLevel'], schedule?: TrainingDay[]): Program {
  return {
    id,
    name: `Test ${id}`,
    goal,
    experienceLevel: level,
    description: '',
    daysPerWeek: 3,
    estimatedDurationWeeks: 12,
    schedule: schedule ?? [],
    tags: [],
  };
}

const testPrograms: Program[] = [
  makeProgram('hyp-beg', 'hypertrophy',    'beginner'),
  makeProgram('hyp-int', 'hypertrophy',    'intermediate'),
  makeProgram('fat-beg', 'fat-loss',       'beginner'),
  makeProgram('fat-int', 'fat-loss',       'intermediate'),
  makeProgram('gen-beg', 'general-fitness','beginner'),
  makeProgram('gen-int', 'general-fitness','intermediate'),
];

// ── recommendProgram ──────────────────────────────────────────────────────────
describe('recommendProgram', () => {
  it('returns a program matching the goal', () => {
    const result = recommendProgram('fat-loss', 'beginner', testPrograms);
    expect(result?.goal).toBe('fat-loss');
  });

  it('returns a program matching the experience level', () => {
    const result = recommendProgram('hypertrophy', 'intermediate', testPrograms);
    expect(result?.experienceLevel).toBe('intermediate');
  });

  it('returns the exact match for a goal + level combination', () => {
    const result = recommendProgram('hypertrophy', 'beginner', testPrograms);
    expect(result?.id).toBe('hyp-beg');
  });

  it('returns the correct program for fat-loss + intermediate', () => {
    const result = recommendProgram('fat-loss', 'intermediate', testPrograms);
    expect(result?.id).toBe('fat-int');
  });

  it('returns undefined when no program matches the experience level', () => {
    const result = recommendProgram('hypertrophy', 'advanced', testPrograms);
    expect(result).toBeUndefined();
  });

  it('returns undefined for an empty program list', () => {
    const result = recommendProgram('hypertrophy', 'beginner', []);
    expect(result).toBeUndefined();
  });
});

// ── getNextWorkout ────────────────────────────────────────────────────────────

describe('getNextWorkout', () => {
  beforeEach(() => {
    for (const k of Object.keys(store)) delete store[k];
    vi.clearAllMocks();
  });

  it('returns the first day when no cursor is stored', () => {
    const program = makeProgram('p1', 'hypertrophy', 'beginner', [makeDay('Day A'), makeDay('Day B')]);
    const result = getNextWorkout(program);
    expect(result.dayIndex).toBe(0);
    expect(result.day.label).toBe('Day A');
    expect(result.week).toBe(1);
  });

  it('clamps cursor to schedule length', () => {
    const program = makeProgram('p1', 'hypertrophy', 'beginner', [makeDay('Day A')]);
    // Manually set cursor beyond schedule length
    store['fit_program_day_cursor'] = JSON.stringify({ p1: 5 });
    const result = getNextWorkout(program);
    expect(result.dayIndex).toBe(0); // clamped to last valid index
  });
});

// ── advanceProgramCursor ──────────────────────────────────────────────────────

describe('advanceProgramCursor', () => {
  beforeEach(() => {
    for (const k of Object.keys(store)) delete store[k];
    vi.clearAllMocks();
  });

  it('advances day cursor by 1', () => {
    const program = makeProgram('p1', 'hypertrophy', 'beginner', [makeDay('A'), makeDay('B'), makeDay('C')]);
    advanceProgramCursor(program);
    const next = getNextWorkout(program);
    expect(next.dayIndex).toBe(1);
  });

  it('wraps to day 0 and increments week at end of schedule', () => {
    const program = makeProgram('p1', 'hypertrophy', 'beginner', [makeDay('A'), makeDay('B')]);
    advanceProgramCursor(program); // day 0 → 1
    advanceProgramCursor(program); // day 1 → 0, week 1 → 2
    const next = getNextWorkout(program);
    expect(next.dayIndex).toBe(0);
    expect(next.week).toBe(2);
  });
});

// ── getWeeklyCompletionCount ──────────────────────────────────────────────────

describe('getWeeklyCompletionCount', () => {
  const program = makeProgram('p1', 'hypertrophy', 'beginner');

  it('counts sessions within the week window', () => {
    const weekStart = '2025-03-03T00:00:00Z'; // Monday
    const dates = [
      '2025-03-03T10:00:00Z',
      '2025-03-05T10:00:00Z',
      '2025-03-07T10:00:00Z',
    ];
    expect(getWeeklyCompletionCount(program, [], weekStart, dates)).toBe(3);
  });

  it('excludes sessions outside the week', () => {
    const weekStart = '2025-03-03T00:00:00Z';
    const dates = [
      '2025-02-28T10:00:00Z', // before
      '2025-03-05T10:00:00Z', // within
      '2025-03-11T10:00:00Z', // after
    ];
    expect(getWeeklyCompletionCount(program, [], weekStart, dates)).toBe(1);
  });

  it('returns 0 for no sessions', () => {
    expect(getWeeklyCompletionCount(program, [], '2025-03-03T00:00:00Z', [])).toBe(0);
  });
});
