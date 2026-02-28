import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { AppShell } from '../components/layout/AppShell';
import { TopBar } from '../components/layout/TopBar';
import { DaySchedule } from '../components/programs/DaySchedule';
import { BlockMissionsCard } from '../components/programs/BlockMissionsCard';
import { GoalBadge, LevelBadge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { programs } from '../data/programs';
import { setUser, resetProgramCursors, getCustomPrograms } from '../utils/localStorage';
import { generateMissions } from '../services/adaptService';
import { Calendar, Clock, CheckCircle2, Sparkles } from 'lucide-react';

export function ProgramDetailPage() {
  const { programId } = useParams<{ programId: string }>();
  const { state, dispatch } = useApp();
  const { user: authUser } = useAuth();
  const navigate = useNavigate();

  const allPrograms = [...programs, ...getCustomPrograms()];
  const program = allPrograms.find((p) => p.id === programId);
  if (!program) {
    return (
      <AppShell>
        <TopBar title="Program" showBack />
        <div className="flex items-center justify-center h-60">
          <p className="text-slate-400">Program not found.</p>
        </div>
      </AppShell>
    );
  }

  const isActive = state.user?.activeProgramId === program.id;

  function handleActivate() {
    if (!state.user || !program) return;
    const updated = { ...state.user, activeProgramId: program.id };
    setUser(updated);
    resetProgramCursors(program.id);
    dispatch({ type: 'SET_USER', payload: updated });

    // Fire-and-forget: generate block missions for this program
    if (authUser) {
      generateMissions({
        userId: authUser.id,
        programId: program.id,
        programName: program.name,
        goal: state.user.goal,
        experienceLevel: state.user.experienceLevel,
        daysPerWeek: program.daysPerWeek,
        durationWeeks: program.estimatedDurationWeeks,
      }).catch(() => {});
    }

    navigate('/');
  }

  return (
    <AppShell>
      <TopBar title={program.name} showBack />
      <div className="px-4 pb-6 space-y-5 mt-2">
        {/* Header info */}
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            <GoalBadge goal={program.goal} />
            <LevelBadge level={program.experienceLevel} />
            {program.isAiGenerated && (
              <span className="flex items-center gap-1 text-xs bg-brand-500/10 text-brand-600 dark:text-brand-400 px-2 py-0.5 rounded-full">
                <Sparkles size={10} />
                AI-Generated
              </span>
            )}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {program.description}
          </p>
          <div className="mt-3 flex gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {program.daysPerWeek} days/week
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {program.estimatedDurationWeeks} weeks
            </span>
          </div>
          {program.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {program.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400 capitalize"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Block Missions */}
        {authUser && (
          <BlockMissionsCard
            programId={program.id}
            programName={program.name}
            daysPerWeek={program.daysPerWeek}
            durationWeeks={program.estimatedDurationWeeks}
          />
        )}

        {/* Activate button */}
        {isActive ? (
          <div className="flex items-center gap-2 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/40 px-4 py-3">
            <CheckCircle2 size={18} className="text-green-500" />
            <p className="text-sm font-medium text-green-700 dark:text-green-300">
              This is your active program
            </p>
          </div>
        ) : (
          <Button onClick={handleActivate} fullWidth size="lg">
            Activate Program
          </Button>
        )}

        {/* Schedule */}
        <div>
          <h2 className="text-base font-semibold text-slate-800 dark:text-white mb-3">
            Weekly Schedule
          </h2>
          <div className="space-y-3">
            {program.schedule.map((day, i) => (
              <DaySchedule key={i} day={day} index={i} />
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
