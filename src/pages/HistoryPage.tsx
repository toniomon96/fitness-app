import { useApp } from '../store/AppContext';
import { AppShell } from '../components/layout/AppShell';
import { TopBar } from '../components/layout/TopBar';
import { Card } from '../components/ui/Card';
import { EmptyState } from '../components/ui/EmptyState';
import { LogCard } from '../components/history/LogCard';
import { VolumeChart } from '../components/history/VolumeChart';
import { getWeeklyVolumeByMuscle } from '../utils/volumeUtils';
import { getExerciseById } from '../data/exercises';
import { Clock } from 'lucide-react';

export function HistoryPage() {
  const { state } = useApp();
  const sessions = [...state.history.sessions].reverse();
  const weeklyVolume = getWeeklyVolumeByMuscle(state.history, 4);
  const totalSessions = state.history.sessions.length;
  const totalVolume = state.history.sessions.reduce(
    (t, s) => t + s.totalVolumeKg,
    0,
  );

  return (
    <AppShell>
      <TopBar title="History" />
      <div className="px-4 pb-6 mt-2 space-y-4">
        {totalSessions > 0 ? (
          <>
            {/* Summary stats */}
            <div className="grid grid-cols-2 gap-3">
              <Card padding="sm" className="text-center">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {totalSessions}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Total Workouts</p>
              </Card>
              <Card padding="sm" className="text-center">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {(totalVolume / 1000).toFixed(1)}t
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Total Volume</p>
              </Card>
            </div>

            {/* PRs */}
            {state.history.personalRecords.length > 0 && (
              <Card>
                <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  🏆 Personal Records
                </h2>
                <div className="space-y-2">
                  {state.history.personalRecords.slice(0, 5).map((pr) => {
                    const ex = getExerciseById(pr.exerciseId);
                    return (
                      <div
                        key={pr.exerciseId}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-slate-700 dark:text-slate-300 truncate">
                          {ex?.name ?? pr.exerciseId}
                        </span>
                        <span className="font-bold text-yellow-600 dark:text-yellow-400 ml-2 shrink-0">
                          {pr.weight}kg × {pr.reps}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}

            {/* Volume chart */}
            {sessions.length >= 2 && (
              <Card>
                <VolumeChart weeklyVolume={weeklyVolume} weeks={4} />
              </Card>
            )}

            {/* Session list */}
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Workout Log
            </h2>
            <div className="space-y-2">
              {sessions.map((session) => (
                <LogCard key={session.id} session={session} />
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            icon={<Clock size={40} />}
            title="No workouts yet"
            description="Complete your first workout to see your history here."
          />
        )}
      </div>
    </AppShell>
  );
}
