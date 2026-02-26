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

const RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ≈ 138.2

function scoreStroke(score: number) {
  if (score <= 4) return '#ef4444'; // red-500
  if (score <= 7) return '#f59e0b'; // amber-500
  return '#22c55e'; // green-500
}

function scoreTextColor(score: number) {
  if (score <= 4) return 'text-red-400';
  if (score <= 7) return 'text-amber-400';
  return 'text-green-400';
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
  const dashOffset = CIRCUMFERENCE * (1 - score / 10);

  return (
    <Card className="p-4 bg-gradient-to-br from-slate-800/80 to-slate-900/60 border-slate-700/50">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* SVG arc ring */}
          <div className="relative flex items-center justify-center shrink-0">
            <svg width={56} height={56} viewBox="0 0 56 56" className="-rotate-90" aria-hidden>
              <circle cx={28} cy={28} r={RADIUS} fill="none" stroke="rgba(100,116,139,0.2)" strokeWidth={5} />
              <circle
                cx={28} cy={28} r={RADIUS} fill="none"
                stroke={scoreStroke(score)}
                strokeWidth={5} strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                style={{ transition: 'stroke-dashoffset 0.6s ease, stroke 0.3s ease' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-sm font-bold leading-none tabular-nums ${scoreTextColor(score)}`}>
                {score.toFixed(score % 1 === 0 ? 0 : 1)}
              </span>
              <span className="text-[8px] text-slate-500 leading-none mt-0.5">/10</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-200">Recovery Score</p>
            <p className={`text-xs ${scoreTextColor(score)}`}>{scoreMessage(score)}</p>
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
