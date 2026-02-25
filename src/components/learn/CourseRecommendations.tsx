import { useNavigate } from 'react-router-dom';
import { ChevronRight, BookOpen } from 'lucide-react';
import { courses } from '../../data/courses';
import { useLearningProgress } from '../../hooks/useLearningProgress';
import { Card } from '../ui/Card';
import type { Course, Goal, ExperienceLevel } from '../../types';

interface CourseRecommendationsProps {
  goal: Goal;
  experienceLevel: ExperienceLevel;
}

function getRecommendations(
  goal: Goal,
  experienceLevel: ExperienceLevel,
  completedIds: string[],
): Course[] {
  const available = courses.filter((c) => !completedIds.includes(c.id));

  // Score each course: goal match (+2) + difficulty match (+1)
  const scored = available.map((c) => {
    let score = 0;
    if (c.relatedGoals.includes(goal)) score += 2;
    if (c.difficulty === experienceLevel) score += 1;
    return { course: c, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.course);
}

export function CourseRecommendations({ goal, experienceLevel }: CourseRecommendationsProps) {
  const navigate = useNavigate();
  const { progress } = useLearningProgress();

  const recommended = getRecommendations(goal, experienceLevel, progress.completedCourses);

  if (recommended.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <BookOpen size={16} className="text-slate-400" />
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Recommended for You
          </p>
        </div>
        <button
          onClick={() => navigate('/learn')}
          className="text-xs text-brand-500 hover:underline"
        >
          See all
        </button>
      </div>

      <div className="space-y-2">
        {recommended.map((course) => {
          const totalLessons = course.modules.flatMap((m) => m.lessons).length;
          const completedLessons = course.modules
            .flatMap((m) => m.lessons)
            .filter((l) => progress.completedLessons.includes(l.id)).length;
          const started = completedLessons > 0;

          return (
            <Card
              key={course.id}
              padding="sm"
              className="cursor-pointer hover:border-brand-400 dark:hover:border-brand-600 transition-colors"
              onClick={() => navigate(`/learn/${course.id}`)}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl shrink-0">{course.coverEmoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white leading-snug truncate">
                    {course.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {started
                      ? `${completedLessons}/${totalLessons} lessons done`
                      : `${totalLessons} lessons · ${course.estimatedMinutes} min`}
                  </p>
                  {started && (
                    <div className="mt-1.5 h-1 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-brand-500"
                        style={{ width: `${(completedLessons / totalLessons) * 100}%` }}
                      />
                    </div>
                  )}
                </div>
                <ChevronRight size={16} className="text-slate-400 shrink-0" />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
