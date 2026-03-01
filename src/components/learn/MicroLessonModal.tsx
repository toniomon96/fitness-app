import { useEffect, useState } from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { useToast } from '../../contexts/ToastContext';
import { generateMicroLesson } from '../../services/learningService';
import { LessonReader } from './LessonReader';
import type { DynamicLesson } from '../../types';

interface MicroLessonModalProps {
  topic: string;
  onClose: () => void;
}

export function MicroLessonModal({ topic, onClose }: MicroLessonModalProps) {
  const { state } = useApp();
  const { toast } = useToast();

  const [lesson, setLesson] = useState<DynamicLesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchLesson() {
      setLoading(true);
      setError(null);
      try {
        const res = await generateMicroLesson({
          topic,
          userGoal: state.user?.goal,
          experienceLevel: state.user?.experienceLevel,
        });
        if (!cancelled) setLesson(res.lesson);
      } catch (err) {
        if (!cancelled) {
          const msg = err instanceof Error ? err.message : 'Failed to generate lesson';
          setError(msg);
          toast(msg, 'error');
          onClose();
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void fetchLesson();
    return () => { cancelled = true; };
  }, [topic]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-slate-950 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-brand-500" />
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            AI-Generated Lesson
          </span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-brand-500 text-white uppercase tracking-wide">
            AI
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        {loading && (
          <div className="flex flex-col items-center justify-center gap-4 min-h-[60vh]">
            <Loader2 size={32} className="animate-spin text-brand-500" />
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
              Generating your lesson on <span className="font-medium text-slate-700 dark:text-slate-200">"{topic}"</span>…
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        {!loading && lesson && (
          <LessonReader lesson={lesson} />
        )}
      </div>
    </div>
  );
}
