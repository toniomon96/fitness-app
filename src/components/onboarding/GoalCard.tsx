import type { Goal } from '../../types';
import { Dumbbell, Flame, Activity } from 'lucide-react';

interface GoalCardProps {
  goal: Goal;
  selected: boolean;
  onSelect: (goal: Goal) => void;
}

const goalConfig: Record<Goal, { label: string; description: string; icon: typeof Dumbbell; color: string }> = {
  hypertrophy: {
    label: 'Gain Muscle',
    description: 'Build size and strength with hypertrophy-focused training',
    icon: Dumbbell,
    color: 'brand',
  },
  'fat-loss': {
    label: 'Lose Weight',
    description: 'Burn fat and get lean with strength + cardio programs',
    icon: Flame,
    color: 'orange',
  },
  'general-fitness': {
    label: 'Maintain & Improve',
    description: 'Stay fit, balanced, and healthy with athletic programs',
    icon: Activity,
    color: 'green',
  },
};

const colorMap: Record<string, string> = {
  brand: 'border-brand-400 bg-brand-50 dark:bg-brand-900/20',
  orange: 'border-orange-400 bg-orange-50 dark:bg-orange-900/20',
  green: 'border-green-400 bg-green-50 dark:bg-green-900/20',
};

const iconColorMap: Record<string, string> = {
  brand: 'text-brand-500',
  orange: 'text-orange-500',
  green: 'text-green-500',
};

export function GoalCard({ goal, selected, onSelect }: GoalCardProps) {
  const cfg = goalConfig[goal];
  const Icon = cfg.icon;

  return (
    <button
      onClick={() => onSelect(goal)}
      className={[
        'w-full text-left rounded-2xl border-2 p-4 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
        selected
          ? colorMap[cfg.color]
          : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-600',
      ].join(' ')}
    >
      <div className="flex items-start gap-4">
        <div
          className={[
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
            selected
              ? iconColorMap[cfg.color] + ' bg-white dark:bg-slate-900/40'
              : 'bg-slate-100 text-slate-500 dark:bg-slate-700',
          ].join(' ')}
        >
          <Icon size={24} />
        </div>
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">
            {cfg.label}
          </p>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            {cfg.description}
          </p>
        </div>
        <div
          className={[
            'ml-auto mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 transition-colors',
            selected
              ? 'border-brand-500 bg-brand-500'
              : 'border-slate-300 dark:border-slate-600',
          ].join(' ')}
        >
          {selected && (
            <svg
              viewBox="0 0 20 20"
              fill="white"
              className="h-full w-full"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}
