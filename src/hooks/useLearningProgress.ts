import { useApp } from '../store/AppContext';
import type { QuizAttempt } from '../types';

export function useLearningProgress() {
  const { state, dispatch } = useApp();
  const progress = state.learningProgress;

  function completeLesson(lessonId: string) {
    dispatch({ type: 'COMPLETE_LESSON', payload: lessonId });
  }

  function completeModule(moduleId: string) {
    dispatch({ type: 'COMPLETE_MODULE', payload: moduleId });
  }

  function completeCourse(courseId: string) {
    dispatch({ type: 'COMPLETE_COURSE', payload: courseId });
  }

  function recordQuizAttempt(moduleId: string, attempt: QuizAttempt) {
    dispatch({ type: 'RECORD_QUIZ_ATTEMPT', payload: { moduleId, attempt } });
  }

  function isLessonComplete(lessonId: string): boolean {
    return progress.completedLessons.includes(lessonId);
  }

  function isModuleComplete(moduleId: string): boolean {
    return progress.completedModules.includes(moduleId);
  }

  function isCourseComplete(courseId: string): boolean {
    return progress.completedCourses.includes(courseId);
  }

  /** Returns count of completed lessons out of the given lesson ID list. */
  function countCompletedLessons(lessonIds: string[]): number {
    return lessonIds.filter((id) => progress.completedLessons.includes(id)).length;
  }

  return {
    progress,
    completeLesson,
    completeModule,
    completeCourse,
    recordQuizAttempt,
    isLessonComplete,
    isModuleComplete,
    isCourseComplete,
    countCompletedLessons,
  };
}
