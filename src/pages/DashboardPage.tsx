import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { AppShell } from '../components/layout/AppShell';
import { TopBar } from '../components/layout/TopBar';
import { ThemeToggle } from '../components/layout/ThemeToggle';
import { WelcomeBanner } from '../components/dashboard/WelcomeBanner';
import { CurrentProgramCard } from '../components/dashboard/CurrentProgramCard';
import { NextWorkoutCard } from '../components/dashboard/NextWorkoutCard';
import { StreakDisplay } from '../components/dashboard/StreakDisplay';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { programs } from '../data/programs';
import { getNextWorkout } from '../utils/programUtils';
import { getProgramWeekCursor, getCustomPrograms } from '../utils/localStorage';
import { calculateStreak, getWeekStart } from '../utils/dateUtils';
import { Play, AlertCircle, UserCircle } from 'lucide-react';
import { useWorkoutSession } from '../hooks/useWorkoutSession';
import { CourseRecommendations } from '../components/learn/CourseRecommendations';

export function DashboardPage() {
  const { state } = useApp();
  const navigate = useNavigate();

  const { session: activeSession } = useWorkoutSession();
  const user = state.user;
  if (!user) return null;

  const allPrograms = [...programs, ...getCustomPrograms()];
  const program = allPrograms.find((p) => p.id === user.activeProgramId);
  const nextWorkout = program ? getNextWorkout(program) : null;
  const week = program ? getProgramWeekCursor(program.id) : 1;

  const sessionDates = state.history.sessions.map((s) => s.startedAt);
  const streak = calculateStreak(sessionDates);
  const weekStart = getWeekStart();
  const completedThisWeek = state.history.sessions.filter(
    (s) => s.startedAt >= weekStart,
  ).length;

  return (
    <AppShell>
      <TopBar
        title="Omnexus"
        right={
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              onClick={() => navigate('/profile')}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Profile"
            >
              <UserCircle size={22} />
            </button>
          </div>
        }
      />
      <div className="px-4 pb-6 space-y-4 mt-2">
        <WelcomeBanner user={user} />

        {/* Resume banner */}
        {activeSession && (
          <Card className="border-brand-400 bg-brand-50 dark:bg-brand-900/20">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <AlertCircle size={18} className="text-brand-500 shrink-0" />
                <p className="text-sm font-medium text-brand-700 dark:text-brand-300">
                  Workout in progress
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => navigate('/workout/active')}
              >
                <Play size={14} />
                Resume
              </Button>
            </div>
          </Card>
        )}

        {/* Streak */}
        <StreakDisplay streak={streak} />

        {/* Current program */}
        {program && (
          <CurrentProgramCard
            program={program}
            week={week}
            completedThisWeek={completedThisWeek}
          />
        )}

        {/* Next workout */}
        {program && nextWorkout && !activeSession && (
          <NextWorkoutCard
            program={program}
            day={nextWorkout.day}
            dayIndex={nextWorkout.dayIndex}
          />
        )}

        {!program && (
          <Card className="text-center py-8">
            <p className="text-slate-500 dark:text-slate-400 mb-3">
              No active program selected
            </p>
            <Button onClick={() => navigate('/programs')}>
              Browse Programs
            </Button>
          </Card>
        )}

        {/* Personalized course recommendations */}
        <CourseRecommendations
          goal={user.goal}
          experienceLevel={user.experienceLevel}
        />
      </div>
    </AppShell>
  );
}
