import { useNavigate } from 'react-router-dom';
import type { Program } from '../../types';
import { Card } from '../ui/Card';
import { GoalBadge, LevelBadge } from '../ui/Badge';
import { ChevronRight, Calendar } from 'lucide-react';

interface CurrentProgramCardProps {
  program: Program;
  week: number;
  completedThisWeek: number;
}

export function CurrentProgramCard({
  program,
  week,
  completedThisWeek,
}: CurrentProgramCardProps) {
  const navigate = useNavigate();
  const pct = Math.min(
    (completedThisWeek / program.daysPerWeek) * 100,
    100,
  );

  return (
    <Card
      hover
      onClick={() => navigate(`/programs/${program.id}`)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">
            Current Program
          </p>
          <p className="font-bold text-slate-900 dark:text-white text-lg leading-snug truncate">
            {program.name}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <GoalBadge goal={program.goal} />
            <LevelBadge level={program.experienceLevel} />
          </div>
        </div>
        <ChevronRight
          size={18}
          className="shrink-0 mt-1 text-slate-400"
        />
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            <Calendar size={14} />
            <span>Week {week}</span>
          </div>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {completedThisWeek}/{program.daysPerWeek} sessions
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <div
            className="h-full rounded-full bg-brand-500 transition-all duration-500"
            style={{ width: `${pct}%` }}
            role="progressbar"
            aria-valuenow={completedThisWeek}
            aria-valuemax={program.daysPerWeek}
          />
        </div>
      </div>
    </Card>
  );
}
