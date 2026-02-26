import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/AppContext';
import type { Program, TrainingDay } from '../../types';
import { courses } from '../../data/courses';
import { getExerciseById } from '../../data/exercises';
import { useWorkoutSession } from '../../hooks/useWorkoutSession';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Play, BookOpen, ChevronRight, Calendar } from 'lucide-react';

interface TodayCardProps {
  program: Program | null;
  day: TrainingDay | null;
  dayIndex: number;
}

function findNextLesson(completedLessons: string[], completedCourses: string[]) {
  for (const course of courses) {
    if (completedCourses.includes(course.id)) continue;
    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        if (!completedLessons.includes(lesson.id)) {
          return { course, module, lesson };
        }
      }
    }
  }
  return null;
}

export function TodayCard({ program, day, dayIndex }: TodayCardProps) {
  const { state } = useApp();
  const { startWorkout } = useWorkoutSession();
  const navigate = useNavigate();

  const lp = state.learningProgress;
  const nextLesson = findNextLesson(lp.completedLessons, lp.completedCourses);

  // Don't render if there's nothing to show
  if (!day && !nextLesson) return null;

  function handleStartWorkout() {
    if (!program) return;
    startWorkout(program, dayIndex);
    navigate('/workout/active');
  }

  return (
    <Card className="overflow-hidden p-0">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-3 border-b border-slate-100 dark:border-slate-700/60">
        <Calendar size={13} className="text-slate-400" />
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Today's Plan
        </p>
      </div>

      <div className="px-4 py-3 space-y-0">
        {/* ─── Workout section ─────────────────────────────────────────────── */}
        {day && (
          <div className="py-1">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                  <Play size={14} className="text-brand-500" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide leading-tight">
                    Workout
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">
                    {day.label}
                  </p>
                </div>
              </div>
              <span className="text-xs text-slate-400 tabular-nums">
                {day.exercises.length} exercises
              </span>
            </div>

            {/* Exercise preview */}
            <ul className="mb-3 space-y-1.5 pl-[42px]">
              {day.exercises.slice(0, 3).map((pe) => {
                const ex = getExerciseById(pe.exerciseId);
                if (!ex) return null;
                return (
                  <li
                    key={pe.exerciseId}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-slate-600 dark:text-slate-300">{ex.name}</span>
                    <span className="text-slate-400 tabular-nums">
                      {pe.scheme.sets}×{pe.scheme.reps}
                    </span>
                  </li>
                );
              })}
              {day.exercises.length > 3 && (
                <li className="text-xs text-slate-400">
                  +{day.exercises.length - 3} more
                </li>
              )}
            </ul>

            <Button onClick={handleStartWorkout} fullWidth size="sm">
              <Play size={13} />
              Start Workout
            </Button>
          </div>
        )}

        {/* Divider between sections */}
        {day && nextLesson && (
          <div className="border-t border-slate-100 dark:border-slate-700/50 my-3" />
        )}

        {/* ─── Learning section ────────────────────────────────────────────── */}
        {nextLesson && (
          <button
            onClick={() =>
              navigate(`/learn/${nextLesson.course.id}/${nextLesson.module.id}`)
            }
            className="w-full flex items-center gap-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 active:bg-slate-100 dark:active:bg-slate-800 transition-colors px-2 py-2 -mx-2"
          >
            <div className="h-8 w-8 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
              <BookOpen size={14} className="text-purple-500" />
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-[10px] text-slate-400 uppercase tracking-wide leading-tight">
                Continue Learning
              </p>
              <p className="text-sm font-medium text-slate-900 dark:text-white leading-tight truncate">
                {nextLesson.lesson.title}
              </p>
              <p className="text-[11px] text-slate-400 leading-tight truncate">
                {nextLesson.course.title} · {nextLesson.lesson.estimatedMinutes} min
              </p>
            </div>
            <ChevronRight size={14} className="text-slate-400 shrink-0" />
          </button>
        )}
      </div>
    </Card>
  );
}
