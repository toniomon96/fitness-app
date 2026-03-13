import type { Exercise } from '../../types';
import { exercises as legacyExercises, getExerciseYouTubeId as legacyGetYouTubeId } from './legacy';
import { barbellExercises } from './barbell';
import { dumbbellExercises } from './dumbbell';
import { bodyweightExercises } from './bodyweight';
import { cableExercises } from './cable';
import { machineExercises } from './machine';
import { kettlebellExercises } from './kettlebell';
import { ezBarExercises } from './ez-bar';
import { resistanceBandExercises } from './resistance-band';
import { trxExercises } from './trx';
import { mobilityExercises } from './mobility';

// ─── Merged Exercise Library ──────────────────────────────────────────────────
// New files are placed first so that their richer schema takes precedence over
// any legacy exercises with the same ID. A single deduplication pass ensures no
// duplicates appear in the final library.

const rawCombined: Exercise[] = [
  ...barbellExercises,
  ...dumbbellExercises,
  ...bodyweightExercises,
  ...cableExercises,
  ...machineExercises,
  ...kettlebellExercises,
  ...ezBarExercises,
  ...resistanceBandExercises,
  ...trxExercises,
  ...mobilityExercises,
  ...legacyExercises,
];

const seenIds = new Set<string>();
export const EXERCISE_LIBRARY: Exercise[] = rawCombined.filter((exercise) => {
  if (seenIds.has(exercise.id)) return false;
  seenIds.add(exercise.id);
  return true;
});

// Backward-compatible alias — all existing imports of `exercises` keep working
export const exercises: Exercise[] = EXERCISE_LIBRARY;

// ─── Helper Functions ─────────────────────────────────────────────────────────

export function getExerciseById(id: string): Exercise | undefined {
  return EXERCISE_LIBRARY.find((e) => e.id === id);
}

export function getExerciseYouTubeId(id: string): string | undefined {
  return legacyGetYouTubeId(id);
}

// ─── Dev validation (stripped in production builds by tree-shaking) ───────────
if (import.meta.env.DEV) {
  console.log(`[ExerciseLibrary] Total exercises loaded: ${EXERCISE_LIBRARY.length}`);
}
