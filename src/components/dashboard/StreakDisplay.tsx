import { toDateString } from '../../utils/dateUtils';

interface StreakDisplayProps {
  streak: number;
  sessionDates: string[];
}

export function StreakDisplay({ streak, sessionDates }: StreakDisplayProps) {
  // Build last-7-days array ending today
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    d.setHours(0, 0, 0, 0);
    return {
      dateStr: toDateString(d.toISOString()),
      label: d.toLocaleDateString(undefined, { weekday: 'narrow' }),
      isToday: i === 6,
    };
  });

  const trainedSet = new Set(sessionDates.map((d) => toDateString(d)));

  const streakLabel =
    streak === 0
      ? 'Start today!'
      : streak === 1
      ? 'day streak'
      : 'day streak';

  return (
    <div className="rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/40 px-4 py-3.5">
      <div className="flex items-center justify-between gap-3">
        {/* Left — flame + number */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="text-[1.6rem] leading-none" aria-hidden>
            {streak >= 7 ? '🔥' : streak >= 3 ? '🔥' : '⚡'}
          </span>
          <div>
            <p className="text-lg font-extrabold text-orange-600 dark:text-orange-400 leading-tight tabular-nums">
              {streak}
            </p>
            <p className="text-[10px] font-medium text-orange-500/80 dark:text-orange-500/60 leading-tight uppercase tracking-wide">
              {streakLabel}
            </p>
          </div>
        </div>

        {/* Right — 7-day dot grid */}
        <div className="flex items-end gap-[7px]">
          {days.map((day) => {
            const trained = trainedSet.has(day.dateStr);
            return (
              <div key={day.dateStr} className="flex flex-col items-center gap-[5px]">
                {/* Dot */}
                <div
                  className={[
                    'h-[18px] w-[18px] rounded-full transition-all duration-300',
                    trained
                      ? 'bg-orange-500 dark:bg-orange-400 shadow-[0_0_6px_rgba(249,115,22,0.5)]'
                      : day.isToday
                      ? 'border-2 border-orange-400 dark:border-orange-500 bg-orange-50 dark:bg-transparent'
                      : 'bg-orange-100 dark:bg-orange-900/30',
                  ].join(' ')}
                  title={trained ? 'Trained' : day.isToday ? 'Today' : 'Rest day'}
                />
                {/* Day label */}
                <span
                  className={[
                    'text-[9px] font-semibold leading-none select-none',
                    day.isToday
                      ? 'text-orange-600 dark:text-orange-400'
                      : trained
                      ? 'text-orange-500 dark:text-orange-500/80'
                      : 'text-orange-300 dark:text-orange-800',
                  ].join(' ')}
                >
                  {day.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
