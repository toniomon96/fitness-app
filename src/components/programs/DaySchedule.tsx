import type { TrainingDay } from '../../types';
import { getExerciseById } from '../../data/exercises';
import { Badge } from '../ui/Badge';

interface DayScheduleProps {
  day: TrainingDay;
  index: number;
}

const dayTypeColor: Record<string, string> = {
  'full-body': 'green',
  upper: 'brand',
  lower: 'blue',
  push: 'orange',
  pull: 'purple',
  legs: 'red',
  cardio: 'green',
  rest: 'slate',
};

export function DaySchedule({ day, index }: DayScheduleProps) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Day header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/40 text-xs font-bold text-brand-600 dark:text-brand-300">
            {index + 1}
          </span>
          <span className="font-semibold text-slate-800 dark:text-white">
            {day.label}
          </span>
        </div>
        <Badge color={dayTypeColor[day.type] as 'brand' | 'green' | 'red' | 'orange' | 'slate' | 'purple' | 'blue'}>
          {day.type}
        </Badge>
      </div>

      {/* Exercise list */}
      <ul className="divide-y divide-slate-100 dark:divide-slate-700/60">
        {day.exercises.map((pe, i) => {
          const ex = getExerciseById(pe.exerciseId);
          return (
            <li
              key={`${pe.exerciseId}-${i}`}
              className="flex items-center justify-between px-4 py-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                  {ex?.name ?? pe.exerciseId}
                </p>
                {pe.notes && (
                  <p className="text-xs text-slate-400 mt-0.5">{pe.notes}</p>
                )}
              </div>
              <div className="text-right shrink-0 ml-4">
                <span className="text-sm font-mono text-brand-500 font-semibold">
                  {pe.scheme.sets}×{pe.scheme.reps}
                </span>
                <p className="text-xs text-slate-400 mt-0.5">
                  {pe.scheme.restSeconds}s rest
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
