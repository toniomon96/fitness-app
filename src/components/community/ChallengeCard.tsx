import { Trophy, Users, Calendar } from 'lucide-react';
import type { Challenge } from '../../types';
import { Button } from '../ui/Button';

interface ChallengeCardProps {
  challenge: Challenge;
  onJoin: (id: string) => void;
}

const TYPE_LABELS: Record<Challenge['type'], string> = {
  volume: 'Total Volume',
  streak: 'Training Streak',
  sessions: 'Workout Count',
};

const TYPE_UNIT: Record<Challenge['type'], string> = {
  volume: 'kg',
  streak: 'days',
  sessions: 'sessions',
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function ChallengeCard({ challenge, onJoin }: ChallengeCardProps) {
  const progressPct =
    challenge.isJoined && challenge.targetValue && (challenge.userProgress ?? 0) > 0
      ? Math.min(100, Math.round(((challenge.userProgress ?? 0) / challenge.targetValue) * 100))
      : 0;

  const isActive = new Date(challenge.endDate) >= new Date();

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 p-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Trophy size={16} className="text-brand-400 shrink-0 mt-0.5" />
          <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">
            {challenge.name}
          </p>
        </div>
        {isActive && !challenge.isJoined && (
          <Button size="sm" onClick={() => onJoin(challenge.id)} className="shrink-0">
            Join
          </Button>
        )}
        {challenge.isJoined && (
          <span className="text-xs font-medium text-green-400 bg-green-900/20 border border-green-800/40 px-2 py-0.5 rounded-full shrink-0">
            Joined
          </span>
        )}
      </div>

      {challenge.description && (
        <p className="text-xs text-slate-400 leading-relaxed">{challenge.description}</p>
      )}

      <div className="flex flex-wrap gap-3 text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <Trophy size={12} />
          {TYPE_LABELS[challenge.type]}
          {challenge.targetValue && ` · ${challenge.targetValue} ${TYPE_UNIT[challenge.type]}`}
        </span>
        <span className="flex items-center gap-1">
          <Calendar size={12} />
          {formatDate(challenge.startDate)} – {formatDate(challenge.endDate)}
        </span>
        <span className="flex items-center gap-1">
          <Users size={12} />
          {challenge.participantCount} joined
        </span>
      </div>

      {challenge.isJoined && challenge.targetValue !== null && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Progress</span>
            <span>
              {challenge.userProgress ?? 0} / {challenge.targetValue} {TYPE_UNIT[challenge.type]}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
            <div
              className="h-full rounded-full bg-brand-500 transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
