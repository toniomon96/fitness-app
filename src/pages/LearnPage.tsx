import { useApp } from '../store/AppContext';
import { AppShell } from '../components/layout/AppShell';
import { TopBar } from '../components/layout/TopBar';
import { GraduationCap, Sparkles } from 'lucide-react';
import { courses } from '../data/courses';
import { CourseCard } from '../components/learn/CourseCard';
import { useLearningProgress } from '../hooks/useLearningProgress';

const DIFFICULTY_ORDER: Record<string, number> = { beginner: 0, intermediate: 1, advanced: 2 };

export function LearnPage() {
  const { state } = useApp();
  const { progress } = useLearningProgress();
  const hasActivity = progress.lastActivityAt !== '';

  const goal = state.user?.goal;
  const level = state.user?.experienceLevel;

  // Recommended: matches goal, sorted by experience level proximity
  const recommended = goal
    ? courses
        .filter((c) => c.relatedGoals.includes(goal))
        .sort((a, b) => {
          const aDiff = Math.abs((DIFFICULTY_ORDER[a.difficulty] ?? 1) - (DIFFICULTY_ORDER[level ?? 'beginner'] ?? 0));
          const bDiff = Math.abs((DIFFICULTY_ORDER[b.difficulty] ?? 1) - (DIFFICULTY_ORDER[level ?? 'beginner'] ?? 0));
          return aDiff - bDiff;
        })
        .slice(0, 3)
    : [];

  const allCourses = courses;

  return (
    <AppShell>
      <TopBar title="Learn" />
      <div className="px-4 pb-8 pt-4 space-y-6">

        {/* Hero */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 shrink-0">
            <GraduationCap size={24} className="text-brand-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
              Evidence-Based Learning
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {hasActivity
                ? `${progress.completedLessons.length} lesson${progress.completedLessons.length !== 1 ? 's' : ''} complete`
                : 'Science-backed courses, lessons & quizzes'}
            </p>
          </div>
        </div>

        {/* Recommended for you */}
        {recommended.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <Sparkles size={13} className="text-brand-400" />
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Recommended for You
              </p>
            </div>
            <div className="space-y-3">
              {recommended.map((course) => (
                <div key={course.id} className="relative">
                  <div className="absolute -top-1 -right-1 z-10 bg-brand-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    Recommended
                  </div>
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Courses */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            {recommended.length > 0 ? 'All Courses' : 'Courses'}
          </p>
          <div className="space-y-3">
            {allCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-slate-400 dark:text-slate-500 text-center leading-relaxed px-2">
          All content cites peer-reviewed research. It is for educational
          purposes only and does not constitute medical advice.
        </p>

      </div>
    </AppShell>
  );
}
