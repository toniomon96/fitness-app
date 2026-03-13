// ─── Exercise Library — Re-export shim ───────────────────────────────────────
// This file preserves backward compatibility for all existing imports:
//
//   import { exercises } from '../data/exercises'
//   import { getExerciseById } from '../data/exercises'
//   import { getExerciseYouTubeId } from '../data/exercises'
//
// The full merged library (150+ exercises) now lives in:
//   src/data/exercises/index.ts
//
// All new code should import directly from the index or a specific category file.

export {
  EXERCISE_LIBRARY,
  exercises,
  getExerciseById,
  getExerciseYouTubeId,
} from './exercises/index';
