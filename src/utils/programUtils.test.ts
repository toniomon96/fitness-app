import { describe, it, expect } from 'vitest';
import { recommendProgram } from './programUtils';
import type { Program } from '../types';

// ── Helpers ───────────────────────────────────────────────────────────────────
function makeProgram(id: string, goal: Program['goal'], level: Program['experienceLevel']): Program {
  return {
    id,
    name: `Test ${id}`,
    goal,
    experienceLevel: level,
    description: '',
    daysPerWeek: 3,
    estimatedDurationWeeks: 12,
    schedule: [],
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
