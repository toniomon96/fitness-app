import { useNavigate } from 'react-router-dom';
import type { Course } from '../../types';
import { Card } from '../ui/Card';
import { Clock, ChevronRight, BookOpen } from 'lucide-react';
import { useLearningProgress } from '../../hooks/useLearningProgress';
import { getAllLessonIds } from '../../data/courses';

interface CourseCardProps {
  course: Course;
}

const DIFFICULTY_LABEL: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

const DIFFICULTY_CLASS: Record<string, string> = {
  beginner:
    'text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/20',
  intermediate:
    'text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/20',
  advanced:
    'text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/20',
};

export function CourseCard({ course }: CourseCardProps) {
  const navigate = useNavigate();
  const { countCompletedLessons, isCourseComplete } = useLearningProgress();

  const allLessonIds = getAllLessonIds(course.id);
  const completedCount = countCompletedLessons(allLessonIds);
  const totalCount = allLessonIds.length;
  const pct = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const isStarted = completedCount > 0;
  const isComplete = isCourseComplete(course.id);

  return (
    <Card hover onClick={() => navigate(`/learn/${course.id}`)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <span className="text-3xl leading-none shrink-0 mt-0.5">
            {course.coverEmoji}
          </span>
          <div className="min-w-0">
            <p className="font-bold text-slate-900 dark:text-white text-base leading-snug">
              {course.title}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed line-clamp-2">
              {course.description}
            </p>
          </div>
        </div>
        <ChevronRight size={18} className="shrink-0 mt-1 text-slate-400" />
      </div>

      <div className="mt-3 flex items-center gap-2 flex-wrap">
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${DIFFICULTY_CLASS[course.difficulty] ?? ''}`}
        >
          {DIFFICULTY_LABEL[course.difficulty] ?? course.difficulty}
        </span>
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <Clock size={12} />
          <span>{course.estimatedMinutes} min</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <BookOpen size={12} />
          <span>
            {course.modules.length} module
            {course.modules.length !== 1 ? 's' : ''}
          </span>
        </div>
        {isComplete && (
          <span className="text-xs font-semibold text-green-600 dark:text-green-400 ml-auto">
            ✓ Complete
          </span>
        )}
      </div>

      {isStarted && !isComplete && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-slate-400 mb-1.5">
            <span>
              {completedCount}/{totalCount} lessons
            </span>
            <span>{Math.round(pct)}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
            <div
              className="h-full rounded-full bg-brand-500 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}
    </Card>
  );
}
