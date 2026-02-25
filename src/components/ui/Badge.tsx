import type { ReactNode } from 'react';

type BadgeColor =
  | 'brand'
  | 'green'
  | 'red'
  | 'orange'
  | 'slate'
  | 'purple'
  | 'blue';

interface BadgeProps {
  children: ReactNode;
  color?: BadgeColor;
  size?: 'sm' | 'md';
}

const colorClasses: Record<BadgeColor, string> = {
  brand: 'bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300',
  green: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  red: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  slate: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
};

export function Badge({ children, color = 'slate', size = 'md' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${colorClasses[color]} ${sizeClasses[size]}`}
    >
      {children}
    </span>
  );
}

export function GoalBadge({ goal }: { goal: string }) {
  const map: Record<string, { label: string; color: BadgeColor }> = {
    hypertrophy: { label: 'Gain Muscle', color: 'brand' },
    'fat-loss': { label: 'Lose Weight', color: 'orange' },
    'general-fitness': { label: 'Maintain', color: 'green' },
  };
  const entry = map[goal] ?? { label: goal, color: 'slate' as BadgeColor };
  return <Badge color={entry.color}>{entry.label}</Badge>;
}

export function LevelBadge({ level }: { level: string }) {
  const map: Record<string, { label: string; color: BadgeColor }> = {
    beginner: { label: 'Beginner', color: 'green' },
    intermediate: { label: 'Intermediate', color: 'blue' },
    advanced: { label: 'Advanced', color: 'purple' },
  };
  const entry = map[level] ?? { label: level, color: 'slate' as BadgeColor };
  return <Badge color={entry.color}>{entry.label}</Badge>;
}
