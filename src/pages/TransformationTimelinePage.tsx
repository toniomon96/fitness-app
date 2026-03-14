import { useMemo, useState } from 'react';
import { TrendingDown, TrendingUp, Minus, Dumbbell, Flame, Trophy, Activity } from 'lucide-react';
import { AppShell } from '../components/layout/AppShell';
import { TopBar } from '../components/layout/TopBar';
import { Card } from '../components/ui/Card';
import MeasurementChart from '../components/measurements/MeasurementChart';
import { useApp } from '../store/AppContext';
import { getMeasurements, getWorkoutHistory, getGamificationData } from '../utils/localStorage';
import { buildXpProfile } from '../lib/xpEngine';
import { toDisplayWeight } from '../utils/weightUnits';
import { useWeightUnit } from '../hooks/useWeightUnit';
import type { MeasurementMetric } from '../types';

// ─── Constants ────────────────────────────────────────────────────────────────

const BODY_METRIC_DEFS: { key: MeasurementMetric; label: string }[] = [
  { key: 'weight',    label: 'Weight' },
  { key: 'body-fat',  label: 'Body Fat' },
  { key: 'waist',     label: 'Waist' },
  { key: 'chest',     label: 'Chest' },
  { key: 'left-arm',  label: 'Left Arm' },
  { key: 'right-arm', label: 'Right Arm' },
];

function metricUnit(key: MeasurementMetric, weightUnit: string): string {
  if (key === 'weight') return weightUnit;
  if (key === 'body-fat') return '%';
  return 'cm';
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Range = '4w' | '12w' | 'all';

const RANGE_OPTIONS: { value: Range; label: string }[] = [
  { value: '4w', label: '4 Weeks' },
  { value: '12w', label: '12 Weeks' },
  { value: 'all', label: 'All Time' },
];

function cutoffDate(range: Range): Date | null {
  if (range === 'all') return null;
  const days = range === '4w' ? 28 : 84;
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
}

function trendIcon(first: number, last: number, metric: MeasurementMetric) {
  const delta = last - first;
  const isPositiveGood = metric !== 'weight' && metric !== 'body-fat' && metric !== 'waist';
  if (Math.abs(delta) < 0.01) return <Minus size={14} className="text-slate-400" />;
  if (delta > 0) {
    return isPositiveGood
      ? <TrendingUp size={14} className="text-green-500" />
      : <TrendingDown size={14} className="text-red-400" style={{ transform: 'scaleY(-1)' }} />;
  }
  return isPositiveGood
    ? <TrendingDown size={14} className="text-red-400" />
    : <TrendingUp size={14} className="text-green-500" style={{ transform: 'scaleY(-1)' }} />;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TransformationTimelinePage() {
  const { state } = useApp();
  const weightUnit = useWeightUnit();
  const [range, setRange] = useState<Range>('12w');

  const userId = state.user?.id ?? '';

  const cutoff = useMemo(() => cutoffDate(range), [range]);

  // ── Measurements ──────────────────────────────────────────────────────────

  const weightData = useMemo(() => {
    const raw = getMeasurements(userId, 'weight')
      .filter(m => !cutoff || new Date(m.measuredAt) >= cutoff)
      .sort((a, b) => a.measuredAt.localeCompare(b.measuredAt));
    return raw.map(m => ({
      date: m.measuredAt.slice(0, 10),
      value: parseFloat(toDisplayWeight(m.value, weightUnit).toFixed(1)),
    }));
  }, [userId, cutoff, weightUnit]);

  const bodyFatData = useMemo(() => {
    return getMeasurements(userId, 'body-fat')
      .filter(m => !cutoff || new Date(m.measuredAt) >= cutoff)
      .sort((a, b) => a.measuredAt.localeCompare(b.measuredAt))
      .map(m => ({ date: m.measuredAt.slice(0, 10), value: m.value }));
  }, [userId, cutoff]);

  const latestMeasurements = useMemo(() => {
    return BODY_METRIC_DEFS.map(({ key, label }) => {
      const unit = metricUnit(key, weightUnit);
      const entries = getMeasurements(userId, key)
        .sort((a, b) => b.measuredAt.localeCompare(a.measuredAt));
      const latest = entries[0];
      const earliest = [...entries].reverse()[0];
      const displayValue = latest
        ? (key === 'weight' ? toDisplayWeight(latest.value, weightUnit) : latest.value)
        : null;
      const displayFirst = earliest && earliest.id !== latest?.id
        ? (key === 'weight' ? toDisplayWeight(earliest.value, weightUnit) : earliest.value)
        : null;
      return { key, label, unit, value: displayValue, firstValue: displayFirst };
    }).filter(m => m.value !== null);
  }, [userId, weightUnit]);

  // ── Workout stats ──────────────────────────────────────────────────────────

  const workoutStats = useMemo(() => {
    const sessions = getWorkoutHistory()
      .filter(s => !cutoff || new Date(s.completedAt ?? s.startedAt) >= cutoff);
    const totalSessions = sessions.length;
    const totalVolumeKg = sessions.reduce((sum, s) => sum + (s.totalVolumeKg ?? 0), 0);
    const displayVolume = weightUnit === 'kg' ? totalVolumeKg : totalVolumeKg * 2.205;
    return { totalSessions, totalVolume: Math.round(displayVolume), volumeUnit: weightUnit };
  }, [cutoff, weightUnit]);

  // ── Gamification ───────────────────────────────────────────────────────────

  const gamification = useMemo(() => getGamificationData(), []);
  const xpProfile = useMemo(
    () => buildXpProfile(userId, gamification.totalXp),
    [userId, gamification.totalXp],
  );
  const xpProgress = Math.round((xpProfile.xpInCurrentLevel / xpProfile.xpToNextLevel) * 100);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <AppShell>
      <TopBar title="Transformation Timeline" showBack />
      <div className="px-4 pb-8 mt-2 space-y-5">

        {/* Range selector */}
        <div className="flex gap-2">
          {RANGE_OPTIONS.map(o => (
            <button
              key={o.value}
              type="button"
              onClick={() => setRange(o.value)}
              className={[
                'flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors',
                range === o.value
                  ? 'bg-brand-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400',
              ].join(' ')}
            >
              {o.label}
            </button>
          ))}
        </div>

        {/* Workout summary */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="text-center !py-3">
            <Dumbbell size={18} className="mx-auto text-brand-500 mb-1" />
            <p className="text-xl font-bold text-slate-900 dark:text-white">{workoutStats.totalSessions}</p>
            <p className="text-[11px] text-slate-400">Sessions</p>
          </Card>
          <Card className="text-center !py-3">
            <Activity size={18} className="mx-auto text-blue-500 mb-1" />
            <p className="text-xl font-bold text-slate-900 dark:text-white">
              {workoutStats.totalVolume.toLocaleString()}
            </p>
            <p className="text-[11px] text-slate-400">Vol. ({workoutStats.volumeUnit})</p>
          </Card>
          <Card className="text-center !py-3">
            <Flame size={18} className="mx-auto text-orange-500 mb-1" />
            <p className="text-xl font-bold text-slate-900 dark:text-white">{gamification.streak}</p>
            <p className="text-[11px] text-slate-400">Day Streak</p>
          </Card>
        </div>

        {/* XP / Level */}
        <Card>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Trophy size={16} className="text-brand-500" />
              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                {xpProfile.rankLabel} · Level {xpProfile.level}
              </span>
            </div>
            <span className="text-xs text-slate-400">{gamification.totalXp.toLocaleString()} XP</span>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-500 rounded-full transition-all duration-500"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
          <p className="mt-1.5 text-[11px] text-slate-400 text-right">
            {xpProfile.xpInCurrentLevel} / {xpProfile.xpToNextLevel} XP to Level {xpProfile.level + 1}
          </p>
        </Card>

        {/* Weight trend */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Weight Trend
            </p>
            {weightData.length >= 2 && (
              <div className="flex items-center gap-1 text-xs text-slate-400">
                {trendIcon(weightData[0].value, weightData[weightData.length - 1].value, 'weight')}
                <span>
                  {Math.abs(weightData[weightData.length - 1].value - weightData[0].value).toFixed(1)}{' '}
                  {weightUnit}
                </span>
              </div>
            )}
          </div>
          <MeasurementChart data={weightData} unit={weightUnit} />
        </Card>

        {/* Body fat trend */}
        {bodyFatData.length > 0 && (
          <Card>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Body Fat Trend
              </p>
              {bodyFatData.length >= 2 && (
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  {trendIcon(bodyFatData[0].value, bodyFatData[bodyFatData.length - 1].value, 'body-fat')}
                  <span>
                    {Math.abs(bodyFatData[bodyFatData.length - 1].value - bodyFatData[0].value).toFixed(1)} %
                  </span>
                </div>
              )}
            </div>
            <MeasurementChart data={bodyFatData} unit="%" />
          </Card>
        )}

        {/* Body composition snapshot */}
        {latestMeasurements.length > 0 && (
          <Card>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Body Composition Snapshot
            </p>
            <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {latestMeasurements.map(m => (
                <div key={m.key} className="flex items-center justify-between py-2.5">
                  <span className="text-sm text-slate-600 dark:text-slate-400">{m.label}</span>
                  <div className="flex items-center gap-2">
                    {m.firstValue !== null && m.value !== null && (
                      <span className="flex items-center gap-0.5 text-xs text-slate-400">
                        {trendIcon(m.firstValue, m.value, m.key)}
                        {Math.abs(m.value - m.firstValue).toFixed(1)} {m.unit}
                      </span>
                    )}
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {typeof m.value === 'number' ? m.value.toFixed(1) : m.value} {m.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Empty state */}
        {weightData.length === 0 && bodyFatData.length === 0 && latestMeasurements.length === 0 && (
          <Card>
            <div className="text-center py-6 space-y-2">
              <Activity size={32} className="mx-auto text-slate-300 dark:text-slate-600" />
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                No measurements logged yet
              </p>
              <p className="text-xs text-slate-400">
                Start logging your weight and body measurements to see your transformation over time.
              </p>
            </div>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
