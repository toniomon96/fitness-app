import { useState } from 'react';
import type { WorkoutSession } from '../../types';
import { programs } from '../../data/programs';
import { getExerciseById } from '../../data/exercises';
import { getCustomPrograms } from '../../utils/localStorage';
import { formatDate, formatDuration } from '../../utils/dateUtils';
import { Card } from '../ui/Card';
import { ChevronDown, ChevronUp, Timer, Zap, Trophy, Gauge } from 'lucide-react';

interface LogCardProps {
  session: WorkoutSession;
}

export function LogCard({ session }: LogCardProps) {
  const [expanded, setExpanded] = useState(false);
  const program = [...programs, ...getCustomPrograms()].find((p) => p.id === session.programId);
  const day = program?.schedule[session.trainingDayIndex];
  const hasPRs = session.exercises.some((e) =>
    e.sets.some((s) => s.isPersonalRecord),
  );

  const rpeValues = session.exercises
    .flatMap((e) => e.sets)
    .filter((s) => s.completed && s.rpe != null)
    .map((s) => s.rpe as number);
  const avgRpe =
    rpeValues.length > 0
      ? Math.round((rpeValues.reduce((a, b) => a + b, 0) / rpeValues.length) * 10) / 10
      : null;

  return (
    <Card padding="none" className="overflow-hidden">
      <button
        className="w-full text-left px-4 py-3"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="font-semibold text-slate-900 dark:text-white text-sm truncate">
                {day?.label ?? 'Workout'}
              </p>
              {hasPRs && (
                <Trophy size={14} className="text-yellow-500 shrink-0" />
              )}
            </div>
            <p className="text-xs text-slate-400">{formatDate(session.startedAt)}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Timer size={12} />
              {formatDuration(session.durationSeconds ?? 0)}
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Zap size={12} />
              {session.totalVolumeKg.toFixed(0)}kg
            </div>
            {avgRpe !== null && (
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Gauge size={12} />
                {avgRpe} RPE
              </div>
            )}
            {expanded ? (
              <ChevronUp size={16} className="text-slate-400" />
            ) : (
              <ChevronDown size={16} className="text-slate-400" />
            )}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-slate-100 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700/60">
          {session.exercises.map((logEx) => {
            const ex = getExerciseById(logEx.exerciseId);
            const completedSets = logEx.sets.filter((s) => s.completed);
            if (completedSets.length === 0) return null;
            return (
              <div key={logEx.exerciseId} className="px-4 py-2.5">
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {ex?.name ?? logEx.exerciseId}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {completedSets.map((s, i) => (
                    <span
                      key={i}
                      className={[
                        'text-xs px-2 py-0.5 rounded-full',
                        s.isPersonalRecord
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 font-semibold'
                          : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
                      ].join(' ')}
                    >
                      {s.weight}kg×{s.reps}
                      {s.rpe != null && ` @${s.rpe}`}
                      {s.isPersonalRecord && ' 🏆'}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
