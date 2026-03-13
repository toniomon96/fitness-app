import type { XpProfile } from '../../types';

const TIER_COLORS: Record<string, string> = {
  Rookie:     'text-slate-500 dark:text-slate-400',
  Athlete:    'text-blue-500',
  Contender:  'text-violet-500',
  Competitor: 'text-orange-500',
  Elite:      'text-yellow-500',
};

const TIER_BG: Record<string, string> = {
  Rookie:     'bg-slate-100 dark:bg-slate-800',
  Athlete:    'bg-blue-50 dark:bg-blue-900/30',
  Contender:  'bg-violet-50 dark:bg-violet-900/30',
  Competitor: 'bg-orange-50 dark:bg-orange-900/30',
  Elite:      'bg-yellow-50 dark:bg-yellow-900/30',
};

const TIER_PROGRESS: Record<string, string> = {
  Rookie:     'bg-slate-400',
  Athlete:    'bg-blue-500',
  Contender:  'bg-violet-500',
  Competitor: 'bg-orange-500',
  Elite:      'bg-yellow-500',
};

interface RankBadgeProps {
  xpProfile: XpProfile;
  /** When true, render a compact inline pill instead of the full card */
  compact?: boolean;
}

export function RankBadge({ xpProfile, compact = false }: RankBadgeProps) {
  const { level, rankLabel, xpInCurrentLevel, xpToNextLevel, totalXp } = xpProfile;
  const progressPct = Math.min(100, Math.round((xpInCurrentLevel / xpToNextLevel) * 100));
  const labelColor = TIER_COLORS[rankLabel] ?? 'text-slate-500';
  const bgColor = TIER_BG[rankLabel] ?? 'bg-slate-100 dark:bg-slate-800';
  const barColor = TIER_PROGRESS[rankLabel] ?? 'bg-slate-400';

  if (compact) {
    return (
      <span
        className={[
          'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
          bgColor, labelColor,
        ].join(' ')}
      >
        Lv {level} · {rankLabel}
      </span>
    );
  }

  return (
    <div className={['rounded-2xl p-4', bgColor].join(' ')}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className={['text-lg font-bold', labelColor].join(' ')}>
            {rankLabel}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Level {level} · {totalXp.toLocaleString()} XP total
          </p>
        </div>
        <div className={['flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold', bgColor, labelColor].join(' ')}>
          {level}
        </div>
      </div>

      {/* XP progress bar */}
      <div>
        <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 mb-1.5">
          <span>{xpInCurrentLevel} XP</span>
          <span>{xpToNextLevel} XP to next level</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
          <div
            className={['h-full rounded-full transition-all', barColor].join(' ')}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
