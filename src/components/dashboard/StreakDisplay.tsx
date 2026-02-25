interface StreakDisplayProps {
  streak: number;
}

export function StreakDisplay({ streak }: StreakDisplayProps) {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/40 px-4 py-3">
      <span className="text-2xl">🔥</span>
      <div>
        <p className="font-bold text-orange-600 dark:text-orange-400">
          {streak} day{streak !== 1 ? 's' : ''} streak
        </p>
        <p className="text-xs text-orange-500/80 dark:text-orange-500/60">
          {streak === 0 ? 'Start your streak today!' : 'Keep it up!'}
        </p>
      </div>
    </div>
  );
}
