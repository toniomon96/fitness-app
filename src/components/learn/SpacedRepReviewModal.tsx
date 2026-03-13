import { useState } from 'react';
import type { SpacedRepCard } from '../../types';
import { Brain, CheckCircle, XCircle, ChevronRight, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { getLessonById } from '../../data/courses';
import { useLearningProgress } from '../../hooks/useLearningProgress';
import type { SpacedRepQuality } from '../../types';

interface SpacedRepReviewModalProps {
  cards: SpacedRepCard[];
  onClose: () => void;
}

type Phase = 'front' | 'rating' | 'done';

const QUALITY_LABELS: { quality: SpacedRepQuality; label: string; hint: string; cls: string }[] = [
  { quality: 1, label: 'Forgot', hint: "Didn't remember", cls: 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300' },
  { quality: 3, label: 'Hard', hint: 'Recalled with effort', cls: 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300' },
  { quality: 4, label: 'Good', hint: 'Recalled correctly', cls: 'border-brand-300 dark:border-brand-700 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300' },
  { quality: 5, label: 'Easy', hint: 'Effortless recall', cls: 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' },
];

export function SpacedRepReviewModal({ cards, onClose }: SpacedRepReviewModalProps) {
  const { reviewSpacedRepCard } = useLearningProgress();
  const [cardIndex, setCardIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('front');
  const [reviewed, setReviewed] = useState(0);

  const card = cards[cardIndex];
  const lessonData = card ? getLessonById(card.cardId) : undefined;

  function handleReveal() {
    setPhase('rating');
  }

  function handleRate(quality: SpacedRepQuality) {
    reviewSpacedRepCard(card.cardId, quality);
    const nextIndex = cardIndex + 1;
    setReviewed((r) => r + 1);
    if (nextIndex >= cards.length) {
      setPhase('done');
    } else {
      setCardIndex(nextIndex);
      setPhase('front');
    }
  }

  // ── Done screen ──────────────────────────────────────────────────────────────
  if (phase === 'done' || cards.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 p-6 space-y-5 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-500/10 mx-auto">
            <Brain size={30} className="text-brand-500" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">Review Complete!</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              You reviewed {reviewed} {reviewed === 1 ? 'card' : 'cards'}. Cards are scheduled based on your ratings.
            </p>
          </div>
          <Button fullWidth onClick={onClose}>Done</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Brain size={18} className="text-brand-500" />
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Review · {cardIndex + 1} / {cards.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close review"
          >
            <X size={18} className="text-slate-400" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full bg-brand-500 transition-all duration-300"
            style={{ width: `${(reviewed / cards.length) * 100}%` }}
          />
        </div>

        <div className="p-5 space-y-5">

          {/* Card front — lesson title + source */}
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-5 min-h-[120px] flex flex-col justify-center gap-2">
            {lessonData ? (
              <>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-500 mb-1">
                  {lessonData.courseTitle}
                </p>
                <p className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {lessonData.lesson.title}
                </p>
                {phase === 'front' && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Can you recall the key points from this lesson?
                  </p>
                )}
              </>
            ) : (
              <p className="text-sm text-slate-400">Lesson not found</p>
            )}
          </div>

          {/* Card back — key points (revealed after tap) */}
          {phase === 'rating' && lessonData && (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Key Points</p>
              <ul className="space-y-1.5">
                {lessonData.lesson.keyPoints.map((kp, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle size={14} className="text-brand-500 shrink-0 mt-0.5" />
                    <span>{kp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          {phase === 'front' ? (
            <Button fullWidth onClick={handleReveal}>
              <ChevronRight size={16} />
              Reveal Key Points
            </Button>
          ) : (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-center text-slate-400 uppercase tracking-wider">
                How well did you recall this?
              </p>
              <div className="grid grid-cols-2 gap-2">
                {QUALITY_LABELS.map(({ quality, label, hint, cls }) => (
                  <button
                    key={quality}
                    onClick={() => handleRate(quality)}
                    className={`flex flex-col items-center py-3 px-2 rounded-xl border text-sm font-semibold transition-all hover:opacity-90 active:scale-95 ${cls}`}
                  >
                    {quality <= 1 ? (
                      <XCircle size={16} className="mb-1" />
                    ) : (
                      <CheckCircle size={16} className="mb-1" />
                    )}
                    <span>{label}</span>
                    <span className="text-xs font-normal opacity-70">{hint}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
