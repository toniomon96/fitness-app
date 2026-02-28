import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle } from 'lucide-react';
import type { AdaptationAction, AdaptationResult } from '../../types';

interface NextSessionTabProps {
  result: AdaptationResult;
}

const ACTION_CONFIG: Record<
  AdaptationAction['action'],
  { icon: React.ReactNode; label: string; color: string }
> = {
  increase_weight: {
    icon: <TrendingUp size={13} />,
    label: 'Add weight',
    color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  },
  increase_reps: {
    icon: <TrendingUp size={13} />,
    label: 'More reps',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  },
  maintain: {
    icon: <Minus size={13} />,
    label: 'Maintain',
    color: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
  },
  decrease_weight: {
    icon: <TrendingDown size={13} />,
    label: 'Drop weight',
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  },
  deload: {
    icon: <AlertTriangle size={13} />,
    label: 'Deload',
    color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  },
};

const CONFIDENCE_DOT: Record<AdaptationAction['confidence'], string> = {
  high: 'bg-green-400',
  medium: 'bg-amber-400',
  low: 'bg-slate-400',
};

export function NextSessionTab({ result }: NextSessionTabProps) {
  const { summary, adaptations } = result;

  if (adaptations.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <CheckCircle size={28} className="text-green-500" />
        <p className="text-sm text-slate-500 dark:text-slate-400">{summary}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary */}
      <p className="text-sm italic text-slate-500 dark:text-slate-400 leading-relaxed">{summary}</p>

      {/* Per-exercise cards */}
      <div className="space-y-2">
        {adaptations.map((a) => {
          const config = ACTION_CONFIG[a.action];
          return (
            <div
              key={a.exerciseId}
              className="flex items-start gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-3"
            >
              {/* Confidence dot */}
              <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${CONFIDENCE_DOT[a.confidence]}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                  {a.exerciseName}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{a.suggestion}</p>
              </div>
              <span className={`inline-flex items-center gap-1 shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${config.color}`}>
                {config.icon}
                {config.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <p className="text-[10px] text-slate-400 text-center">
        Dot = confidence: <span className="text-green-400">●</span> high &nbsp;
        <span className="text-amber-400">●</span> medium &nbsp;
        <span className="text-slate-400">●</span> low &nbsp;·&nbsp; Saved to Insights
      </p>
    </div>
  );
}
