import { useState } from 'react';
import type { WorkoutSession } from '../../types';
import { Card } from '../ui/Card';
import { Star } from 'lucide-react';

interface RecoveryScoreCardProps {
  sessions: WorkoutSession[];
}

const LS_KEY_PREFIX = 'omnexus_sleep_quality_';

function todayKey() {
  return LS_KEY_PREFIX + new Date().toISOString().slice(0, 10);
}

function getSleepQuality(): number {
  try {
    return parseInt(localStorage.getItem(todayKey()) ?? '0', 10) || 0;
  } catch {
    return 0;
  }
}

function setSleepQuality(stars: number) {
  try {
    localStorage.setItem(todayKey(), String(stars));
  } catch { /* ignore */ }
}

function clamp(min: number, max: number, v: number) {
  return Math.max(min, Math.min(max, v));
}

function computeScore(sessions: WorkoutSession[], sleepStars: number): number {
  if (sessions.length === 0) return 10;

  const lastCompleted = sessions
    .filter((s) => s.completedAt)
    .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime())[0];

  if (!lastCompleted) return 10;

  const hoursSince = (Date.now() - new Date(lastCompleted.completedAt!).getTime()) / 3_600_000;
  const now = Date.now();
  const threeDaysAgo = now - 3 * 86_400_000;
  const consecutiveDays = sessions.filter((s) => s.completedAt && new Date(s.completedAt).getTime() >= threeDaysAgo).length;
  const lastVolume = lastCompleted.totalVolumeKg;

  let score = 10;
  if (hoursSince < 24) score -= 3;
  else if (hoursSince < 48) score -= 1;
  if (consecutiveDays >= 3) score -= 2;
  if (lastVolume > 10_000) score -= 1;
  score += sleepStars * 0.5;

  return clamp(1, 10, Math.round(score * 10) / 10);
}

function scoreColor(score: number) {
  if (score <= 4) return 'text-red-400';
  if (score <= 7) return 'text-amber-400';
  return 'text-green-400';
}

function scoreRing(score: number) {
  if (score <= 4) return 'bg-red-500/10 border-red-500/40';
  if (score <= 7) return 'bg-amber-500/10 border-amber-500/40';
  return 'bg-green-500/10 border-green-500/40';
}

function scoreMessage(score: number) {
  if (score <= 4) return 'High fatigue — consider rest';
  if (score <= 7) return 'Good to train';
  return 'Fully recovered';
}

export function RecoveryScoreCard({ sessions }: RecoveryScoreCardProps) {
  const [sleepStars, setSleepStars] = useState(() => getSleepQuality());

  function handleStar(stars: number) {
    setSleepStars(stars);
    setSleepQuality(stars);
  }

  const score = computeScore(sessions, sleepStars);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-14 h-14 rounded-full border-2 flex flex-col items-center justify-center flex-shrink-0 ${scoreRing(score)}`}>
            <span className={`text-xl font-bold leading-none ${scoreColor(score)}`}>{score.toFixed(score % 1 === 0 ? 0 : 1)}</span>
            <span className="text-xs text-slate-500">/10</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-200">Recovery Score</p>
            <p className={`text-xs ${scoreColor(score)}`}>{scoreMessage(score)}</p>
          </div>
        </div>

        {/* Sleep quality */}
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs text-slate-500">Sleep quality</span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onClick={() => handleStar(s === sleepStars ? 0 : s)}
                className="p-0.5"
                aria-label={`${s} star${s > 1 ? 's' : ''}`}
              >
                <Star
                  size={14}
                  className={s <= sleepStars ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
