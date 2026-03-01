import type {
  WorkoutSession,
  PersonalRecord,
  WorkoutHistory,
  MuscleGroup,
} from '../types';
import { exercises as exerciseData } from '../data/exercises';

export function calculateTotalVolume(session: WorkoutSession): number {
  return session.exercises.reduce((total, ex) => {
    return (
      total +
      ex.sets.reduce((setTotal, set) => {
        if (!set.completed) return setTotal;
        return setTotal + set.weight * set.reps;
      }, 0)
    );
  }, 0);
}

/** Epley 1RM estimate */
export function estimate1RM(weight: number, reps: number): number {
  if (reps === 1) return weight;
  return weight * (1 + reps / 30);
}

export function detectPersonalRecords(
  session: WorkoutSession,
  history: WorkoutHistory,
): PersonalRecord[] {
  // Precompute best estimated 1RM per exercise across all history in a single pass — O(S × E).
  // Avoids the previous O(E² × S) pattern of re-scanning history for every exercise in the session.
  const best1RMMap = new Map<string, number>();
  for (const s of history.sessions) {
    for (const ex of s.exercises) {
      let best = best1RMMap.get(ex.exerciseId) ?? 0;
      for (const set of ex.sets) {
        if (!set.completed) continue;
        best = Math.max(best, estimate1RM(set.weight, set.reps));
      }
      best1RMMap.set(ex.exerciseId, best);
    }
  }

  const newPRs: PersonalRecord[] = [];

  for (const loggedEx of session.exercises) {
    const bestPast1RM = best1RMMap.get(loggedEx.exerciseId) ?? 0;

    let bestSet = { weight: 0, reps: 0, oneRM: 0 };
    for (const set of loggedEx.sets) {
      if (!set.completed) continue;
      const oneRM = estimate1RM(set.weight, set.reps);
      if (oneRM > bestSet.oneRM) {
        bestSet = { weight: set.weight, reps: set.reps, oneRM };
      }
    }

    if (bestSet.oneRM > bestPast1RM && bestSet.weight > 0) {
      newPRs.push({
        exerciseId: loggedEx.exerciseId,
        weight: bestSet.weight,
        reps: bestSet.reps,
        achievedAt: session.completedAt ?? new Date().toISOString(),
        sessionId: session.id,
      });
    }
  }

  return newPRs;
}

export interface ExerciseDataPoint {
  date: string;
  maxWeightKg: number;
  estimated1RM: number;
  totalSets: number;
}

export function getExerciseProgressionData(
  exerciseId: string,
  history: WorkoutHistory,
  maxPoints = 12,
): ExerciseDataPoint[] {
  const relevantSessions = history.sessions
    .filter((s) =>
      s.completedAt && s.exercises.some((e) => e.exerciseId === exerciseId),
    )
    .sort(
      (a, b) =>
        new Date(a.completedAt!).getTime() - new Date(b.completedAt!).getTime(),
    )
    .slice(-maxPoints);

  return relevantSessions.map((s) => {
    const loggedEx = s.exercises.find((e) => e.exerciseId === exerciseId)!;
    const completedSets = loggedEx.sets.filter((set) => set.completed && set.weight > 0);
    const maxWeight = completedSets.reduce(
      (max, set) => Math.max(max, set.weight),
      0,
    );
    const best1RM = completedSets.reduce(
      (max, set) => Math.max(max, estimate1RM(set.weight, set.reps)),
      0,
    );
    return {
      date: s.completedAt!,
      maxWeightKg: maxWeight,
      estimated1RM: Math.round(best1RM * 10) / 10,
      totalSets: completedSets.length,
    };
  });
}

export function getWeeklyVolumeByMuscle(
  history: WorkoutHistory,
  weeks = 4,
): Record<MuscleGroup, number[]> {
  const result: Record<MuscleGroup, number[]> = {
    chest: [],
    back: [],
    shoulders: [],
    biceps: [],
    triceps: [],
    quads: [],
    hamstrings: [],
    glutes: [],
    calves: [],
    core: [],
    cardio: [],
  };

  const now = new Date();
  for (let w = weeks - 1; w >= 0; w--) {
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - (w + 1) * 7);
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);

    const weekSessions = history.sessions.filter((s) => {
      const t = new Date(s.startedAt).getTime();
      return t >= weekStart.getTime() && t < weekEnd.getTime();
    });

    const muscleVolume: Record<string, number> = {};
    for (const session of weekSessions) {
      for (const loggedEx of session.exercises) {
        const exerciseDef = exerciseData.find(
          (e) => e.id === loggedEx.exerciseId,
        );
        if (!exerciseDef) continue;
        const vol = loggedEx.sets.reduce(
          (t, s) => t + (s.completed ? s.weight * s.reps : 0),
          0,
        );
        for (const muscle of exerciseDef.primaryMuscles) {
          muscleVolume[muscle] = (muscleVolume[muscle] ?? 0) + vol;
        }
      }
    }

    for (const muscle of Object.keys(result) as MuscleGroup[]) {
      result[muscle].push(muscleVolume[muscle] ?? 0);
    }
  }

  return result;
}
