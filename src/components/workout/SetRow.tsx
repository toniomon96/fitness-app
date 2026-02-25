import type { LoggedSet } from '../../types';
import { Check, Trash2 } from 'lucide-react';

interface SetRowProps {
  set: LoggedSet;
  prevSet?: { weight: number; reps: number } | null;
  onUpdate: (data: Partial<LoggedSet>) => void;
  onRemove?: () => void;
  restSeconds: number;
  onStartRest: () => void;
}

export function SetRow({
  set,
  prevSet,
  onUpdate,
  onRemove,
  restSeconds,
  onStartRest,
}: SetRowProps) {
  function handleComplete() {
    const nowCompleted = !set.completed;
    onUpdate({ completed: nowCompleted });
    if (nowCompleted && restSeconds > 0) {
      onStartRest();
    }
  }

  return (
    <div
      className={[
        'flex items-center gap-2 rounded-xl px-3 py-2.5 transition-colors',
        set.completed
          ? 'bg-green-50 dark:bg-green-900/20'
          : 'bg-slate-50 dark:bg-slate-800/60',
      ].join(' ')}
    >
      {/* Set number */}
      <span className="w-6 shrink-0 text-center text-xs font-bold text-slate-400">
        {set.setNumber}
      </span>

      {/* Previous best */}
      <span className="w-16 shrink-0 text-center text-xs text-slate-400 tabular-nums hidden sm:block">
        {prevSet ? `${prevSet.weight}kg×${prevSet.reps}` : '—'}
      </span>

      {/* Weight input */}
      <div className="flex flex-1 items-center gap-1">
        <input
          type="number"
          inputMode="decimal"
          min={0}
          step={0.5}
          value={set.weight || ''}
          onChange={(e) => onUpdate({ weight: parseFloat(e.target.value) || 0 })}
          placeholder={prevSet ? String(prevSet.weight) : '0'}
          className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-center text-sm font-medium tabular-nums focus:outline-none focus:ring-2 focus:ring-brand-400 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          aria-label={`Set ${set.setNumber} weight in kg`}
        />
        <span className="text-xs text-slate-400 shrink-0">kg</span>
      </div>

      {/* Reps input */}
      <div className="flex flex-1 items-center gap-1">
        <input
          type="number"
          inputMode="numeric"
          min={0}
          value={set.reps || ''}
          onChange={(e) => onUpdate({ reps: parseInt(e.target.value) || 0 })}
          placeholder={prevSet ? String(prevSet.reps) : '0'}
          className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-center text-sm font-medium tabular-nums focus:outline-none focus:ring-2 focus:ring-brand-400 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          aria-label={`Set ${set.setNumber} reps`}
        />
        <span className="text-xs text-slate-400 shrink-0">reps</span>
      </div>

      {/* Complete button */}
      <button
        onClick={handleComplete}
        className={[
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all',
          set.completed
            ? 'bg-green-500 text-white'
            : 'border-2 border-slate-300 text-slate-300 hover:border-green-400 hover:text-green-400 dark:border-slate-600',
        ].join(' ')}
        aria-label={set.completed ? 'Mark set incomplete' : 'Mark set complete'}
      >
        <Check size={16} strokeWidth={2.5} />
      </button>

      {/* Remove button */}
      {onRemove && (
        <button
          onClick={onRemove}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-300 hover:bg-red-50 hover:text-red-400 dark:hover:bg-red-900/20 transition-colors"
          aria-label="Remove set"
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
}
