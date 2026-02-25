import { useNavigate } from 'react-router-dom';
import type { WorkoutSession, PersonalRecord } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { formatDuration } from '../../utils/dateUtils';
import { getExerciseById } from '../../data/exercises';
import { Trophy, Timer, Zap } from 'lucide-react';

interface WorkoutCompleteModalProps {
  open: boolean;
  session: WorkoutSession;
  prs: PersonalRecord[];
}

export function WorkoutCompleteModal({
  open,
  session,
  prs,
}: WorkoutCompleteModalProps) {
  const navigate = useNavigate();
  const totalSets = session.exercises.reduce(
    (t, e) => t + e.sets.filter((s) => s.completed).length,
    0,
  );

  return (
    <Modal open={open} title="Workout Complete! 🎉">
      <div className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              icon: <Timer size={18} className="text-brand-500" />,
              label: 'Duration',
              value: formatDuration(session.durationSeconds ?? 0),
            },
            {
              icon: <Zap size={18} className="text-orange-500" />,
              label: 'Volume',
              value: `${session.totalVolumeKg.toFixed(0)} kg`,
            },
            {
              icon: <Trophy size={18} className="text-yellow-500" />,
              label: 'Sets',
              value: String(totalSets),
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3"
            >
              {stat.icon}
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                {stat.value}
              </span>
              <span className="text-xs text-slate-400">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* PRs */}
        {prs.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
              <Trophy size={14} className="text-yellow-500" />
              Personal Records
            </p>
            <ul className="space-y-1.5">
              {prs.map((pr) => {
                const ex = getExerciseById(pr.exerciseId);
                return (
                  <li
                    key={pr.exerciseId}
                    className="flex items-center justify-between rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/40 px-3 py-2"
                  >
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                      {ex?.name ?? pr.exerciseId}
                    </span>
                    <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
                      {pr.weight}kg × {pr.reps}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <Button
          onClick={() => navigate('/')}
          fullWidth
          size="lg"
        >
          Back to Dashboard
        </Button>
      </div>
    </Modal>
  );
}
