import { TrendingUp, TrendingDown, Minus, AlertTriangle, Zap } from 'lucide-react';
import { Card } from '../ui/Card';
import type { AdaptationResult, AdaptationAction } from '../../types';

const ACTION_ICON: Record<AdaptationAction['action'], React.ReactNode> = {
  increase_weight: <TrendingUp size={12} className="text-green-500" />,
  increase_reps: <TrendingUp size={12} className="text-blue-500" />,
  maintain: <Minus size={12} className="text-slate-400" />,
  decrease_weight: <TrendingDown size={12} className="text-amber-500" />,
  deload: <AlertTriangle size={12} className="text-red-500" />,
};

export function AdaptationCard() {
  const raw = localStorage.getItem('omnexus_last_adaptation');
  if (!raw) return null;

  let result: AdaptationResult & { savedAt?: string };
  try {
    result = JSON.parse(raw) as AdaptationResult & { savedAt?: string };
    if (!result.summary) return null;
  } catch {
    return null;
  }

  const topAdaptations = result.adaptations.slice(0, 3);
  const savedAt = result.savedAt ? new Date(result.savedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : null;

  return (
    <Card>
      <div className="flex items-start gap-3 mb-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/10 shrink-0">
          <Zap size={18} className="text-brand-500" />
        </div>
        <div>
          <p className="font-semibold text-sm text-slate-900 dark:text-white">Next Session Plan</p>
          {savedAt && (
            <p className="text-xs text-slate-400 mt-0.5">From your session on {savedAt}</p>
          )}
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400 italic leading-relaxed mb-3">
        {result.summary}
      </p>

      {topAdaptations.length > 0 && (
        <div className="space-y-1.5">
          {topAdaptations.map((a) => (
            <div key={a.exerciseId} className="flex items-center gap-2">
              {ACTION_ICON[a.action]}
              <span className="text-xs text-slate-700 dark:text-slate-300 truncate">
                <span className="font-medium">{a.exerciseName}:</span> {a.suggestion}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
