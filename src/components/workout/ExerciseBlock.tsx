import { Plus } from 'lucide-react';
import type { LoggedExercise, LoggedSet } from '../../types';
import { SetRow } from './SetRow';
import { getExerciseById } from '../../data/exercises';
import { Badge } from '../ui/Badge';

interface ExerciseBlockProps {
  loggedExercise: LoggedExercise;
  exerciseIndex: number;
  prevSets: { weight: number; reps: number }[];
  restSeconds: number;
  onUpdateSet: (setIdx: number, data: Partial<LoggedSet>) => void;
  onAddSet: () => void;
  onRemoveSet: (setIdx: number) => void;
  onStartRest: () => void;
}

export function ExerciseBlock({
  loggedExercise,
  exerciseIndex: _exerciseIndex,
  prevSets,
  restSeconds,
  onUpdateSet,
  onAddSet,
  onRemoveSet,
  onStartRest,
}: ExerciseBlockProps) {
  const exercise = getExerciseById(loggedExercise.exerciseId);
  const completedCount = loggedExercise.sets.filter((s) => s.completed).length;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Exercise header */}
      <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-bold text-slate-900 dark:text-white">
              {exercise?.name ?? loggedExercise.exerciseId}
            </p>
            {exercise && (
              <div className="mt-1 flex flex-wrap gap-1">
                {exercise.primaryMuscles.slice(0, 2).map((m) => (
                  <Badge key={m} color="brand" size="sm">
                    {m}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {completedCount}/{loggedExercise.sets.length}
          </span>
        </div>
      </div>

      {/* Column headers */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-700/60">
        <span className="w-6 shrink-0 text-center text-xs font-medium text-slate-400">Set</span>
        <span className="w-16 shrink-0 text-center text-xs font-medium text-slate-400 hidden sm:block">Previous</span>
        <span className="flex-1 text-center text-xs font-medium text-slate-400">Weight</span>
        <span className="flex-1 text-center text-xs font-medium text-slate-400">Reps</span>
        <span className="w-9 shrink-0" />
        <span className="w-9 shrink-0" />
      </div>

      {/* Sets */}
      <div className="px-2 py-2 space-y-1.5">
        {loggedExercise.sets.map((set, si) => (
          <SetRow
            key={si}
            set={set}
            prevSet={prevSets[si] ?? null}
            restSeconds={restSeconds}
            onUpdate={(data) => onUpdateSet(si, data)}
            onRemove={loggedExercise.sets.length > 1 ? () => onRemoveSet(si) : undefined}
            onStartRest={onStartRest}
          />
        ))}
      </div>

      {/* Add set button */}
      <div className="px-4 pb-3">
        <button
          onClick={onAddSet}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 py-2.5 text-sm font-medium text-slate-400 hover:border-brand-400 hover:text-brand-500 dark:hover:border-brand-600 dark:hover:text-brand-400 transition-colors"
        >
          <Plus size={16} />
          Add Set
        </button>
      </div>
    </div>
  );
}
