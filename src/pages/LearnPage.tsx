import { AppShell } from '../components/layout/AppShell';
import { TopBar } from '../components/layout/TopBar';
import { GraduationCap } from 'lucide-react';
import { courses } from '../data/courses';
import { CourseCard } from '../components/learn/CourseCard';
import { useLearningProgress } from '../hooks/useLearningProgress';

export function LearnPage() {
  const { progress } = useLearningProgress();
  const hasActivity = progress.lastActivityAt !== '';

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

        {/* Course list */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Courses
          </p>
          <div className="space-y-3">
            {courses.map((course) => (
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
