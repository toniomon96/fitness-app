import type { Program, TrainingDay, Goal, ExperienceLevel } from '../types';
import {
  getProgramDayCursor,
  setProgramDayCursor,
  getProgramWeekCursor,
  setProgramWeekCursor,
} from './localStorage';

export function getNextWorkout(program: Program): {
  day: TrainingDay;
  dayIndex: number;
  week: number;
} {
  const cursor = getProgramDayCursor(program.id);
  const week = getProgramWeekCursor(program.id);
  const idx = Math.min(cursor, program.schedule.length - 1);
  return { day: program.schedule[idx]!, dayIndex: idx, week };
}

export function advanceProgramCursor(program: Program): void {
  const cursor = getProgramDayCursor(program.id);
  const next = cursor + 1;
  if (next >= program.schedule.length) {
    setProgramDayCursor(program.id, 0);
    const week = getProgramWeekCursor(program.id);
    setProgramWeekCursor(program.id, week + 1);
  } else {
    setProgramDayCursor(program.id, next);
  }
}

export function getWeeklyCompletionCount(
  _program: Program,
  _sessionDayIndices: number[],
  weekStart: string,
  sessionDates: string[],
): number {
  const ws = new Date(weekStart).getTime();
  const we = ws + 7 * 24 * 60 * 60 * 1000;
  return sessionDates.filter((d) => {
    const t = new Date(d).getTime();
    return t >= ws && t < we;
  }).length;
}

export function recommendProgram(
  goal: Goal,
  level: ExperienceLevel,
  programs: Program[],
): Program | undefined {
  return programs.find((p) => p.goal === goal && p.experienceLevel === level);
}
