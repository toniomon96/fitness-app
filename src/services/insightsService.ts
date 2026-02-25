import type { WorkoutSession, User } from '../types';
import type { InsightRequest } from './claudeService';
import { exercises as exerciseLibrary } from '../data/exercises';

/** Builds a compact, plain-text workout summary for the Claude prompt. */
export function buildInsightRequest(
  sessions: WorkoutSession[],
  user: User,
): InsightRequest | null {
  // Limit to last 28 days, most recent first, max 20 sessions
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 28);

  const recent = sessions
    .filter((s) => s.completedAt && new Date(s.startedAt) >= cutoff)
    .sort(
      (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
    )
    .slice(0, 20);

  if (recent.length === 0) return null;

  // Build an ID → name lookup from the static exercise library
  const nameOf = Object.fromEntries(
    exerciseLibrary.map((e) => [e.id, e.name]),
  );

  const totalVolume = recent.reduce((sum, s) => sum + s.totalVolumeKg, 0);
  const avgVolume = Math.round(totalVolume / recent.length);

  const sessionLines = recent.map((s) => {
    const date = new Date(s.startedAt).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    const duration = s.durationSeconds
      ? `${Math.round(s.durationSeconds / 60)} min`
      : 'unknown duration';
    const volume = `${Math.round(s.totalVolumeKg)} kg`;
    const topExercises = s.exercises
      .slice(0, 3)
      .map((e) => nameOf[e.exerciseId] ?? e.exerciseId)
      .join(', ');
    return `${date}: ${volume} volume, ${duration} — ${topExercises}`;
  });

  const summary = [
    `Sessions in last 4 weeks: ${recent.length}`,
    `Average session volume: ${avgVolume} kg`,
    '',
    'Session log (most recent first):',
    ...sessionLines,
  ].join('\n');

  return {
    userGoal: user.goal,
    userExperience: user.experienceLevel,
    workoutSummary: summary,
  };
}
