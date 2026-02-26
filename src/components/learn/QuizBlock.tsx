import { useState } from 'react';
import type { Quiz, QuizAttempt } from '../../types';
import { Button } from '../ui/Button';
import { CheckCircle, XCircle, Trophy } from 'lucide-react';

interface QuizBlockProps {
  quiz: Quiz;
  /** Called immediately when the user finishes the last question. Use to persist the attempt. */
  onComplete: (attempt: QuizAttempt) => void;
  /** Called when the user taps "Continue" on the score screen. Use to navigate away. */
  onContinue: () => void;
}

type Phase = 'answering' | 'explained';
type Screen = 'quiz' | 'score' | 'review';

export function QuizBlock({ quiz, onComplete, onContinue }: QuizBlockProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('answering');
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [completedAttempt, setCompletedAttempt] = useState<QuizAttempt | null>(null);
  const [screen, setScreen] = useState<Screen>('quiz');

  const question = quiz.questions[questionIndex];
  const isCorrect = selected !== null && selected === question?.correctIndex;

  function handleSelect(optionIndex: number) {
    if (phase !== 'answering') return;
    setSelected(optionIndex);
    setPhase('explained');
  }

  function handleNext() {
    const newAnswers = [...answers, selected!];
    if (questionIndex + 1 >= quiz.questions.length) {
      const correctCount = newAnswers.filter(
        (ans, i) => ans === quiz.questions[i].correctIndex,
      ).length;
      const score = Math.round((correctCount / quiz.questions.length) * 100);
      const attempt: QuizAttempt = {
        score,
        correctCount,
        totalQuestions: quiz.questions.length,
        attemptedAt: new Date().toISOString(),
      };
      setAnswers(newAnswers);
      setCompletedAttempt(attempt);
      setScreen('score');
      onComplete(attempt);
    } else {
      setAnswers(newAnswers);
      setQuestionIndex(questionIndex + 1);
      setSelected(null);
      setPhase('answering');
    }
  }

  // ── Review screen ───────────────────────────────────────────────────────────
  if (screen === 'review' && completedAttempt) {
    return (
      <div className="space-y-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Answer Review</p>
        {quiz.questions.map((q, qi) => {
          const userAns = answers[qi] ?? -1;
          const isRight = userAns === q.correctIndex;
          return (
            <div key={q.id} className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/60">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{qi + 1}. {q.question}</p>
              </div>
              <div className="px-4 py-3 space-y-1.5">
                {q.options.map((opt, oi) => {
                  const isCorrectOpt = oi === q.correctIndex;
                  const isUserOpt = oi === userAns;
                  return (
                    <div
                      key={oi}
                      className={[
                        'flex items-center gap-2 text-sm px-3 py-2 rounded-lg',
                        isCorrectOpt ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' :
                        isUserOpt && !isCorrectOpt ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300' :
                        'text-slate-500 dark:text-slate-500',
                      ].join(' ')}
                    >
                      {isCorrectOpt ? <CheckCircle size={14} className="text-green-500 shrink-0" /> :
                       isUserOpt ? <XCircle size={14} className="text-red-500 shrink-0" /> :
                       <span className="w-3.5 h-3.5 shrink-0" />}
                      {opt}
                    </div>
                  );
                })}
                <div className={`mt-2 p-2 rounded-lg text-xs ${isRight ? 'bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-300' : 'bg-blue-50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-300'}`}>
                  <strong>Explanation:</strong> {q.explanation}
                </div>
              </div>
            </div>
          );
        })}
        <Button fullWidth onClick={onContinue}>Back to Course</Button>
      </div>
    );
  }

  // ── Score screen ────────────────────────────────────────────────────────────
  if (screen === 'score' && completedAttempt) {
    const passed = completedAttempt.score >= 70;
    return (
      <div className="flex flex-col items-center text-center py-6 space-y-4">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-3xl ${
            passed
              ? 'bg-green-100 dark:bg-green-900/30'
              : 'bg-amber-100 dark:bg-amber-900/30'
          }`}
        >
          <Trophy
            size={30}
            className={
              passed
                ? 'text-green-600 dark:text-green-400'
                : 'text-amber-600 dark:text-amber-400'
            }
          />
        </div>
        <div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {completedAttempt.score}%
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {completedAttempt.correctCount} of {completedAttempt.totalQuestions}{' '}
            correct
          </p>
        </div>
        <p
          className={`text-sm font-semibold ${
            passed
              ? 'text-green-600 dark:text-green-400'
              : 'text-amber-600 dark:text-amber-400'
          }`}
        >
          {passed ? '🎉 Module complete!' : "Keep it up — review the lessons and try again."}
        </p>
        <Button variant="secondary" fullWidth onClick={() => setScreen('review')}>
          Review Answers
        </Button>
        <Button fullWidth onClick={onContinue}>
          Back to Course
        </Button>
      </div>
    );
  }

  // ── Question screen ─────────────────────────────────────────────────────────
  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
          Quiz · Question {questionIndex + 1} of {quiz.questions.length}
        </p>
        {/* Progress dots */}
        <div className="flex gap-1 mb-4">
          {quiz.questions.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i < questionIndex
                  ? 'bg-brand-500'
                  : i === questionIndex
                    ? 'bg-brand-300'
                    : 'bg-slate-200 dark:bg-slate-700'
              }`}
            />
          ))}
        </div>
        <p className="text-base font-semibold text-slate-900 dark:text-white leading-snug">
          {question.question}
        </p>
      </div>

      {/* Answer options */}
      <div className="space-y-2">
        {question.options.map((option, i) => {
          let cls =
            'w-full text-left px-4 py-3 rounded-xl border text-sm transition-colors flex items-start gap-2.5 ';

          if (phase === 'answering') {
            cls +=
              'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-brand-400 dark:hover:border-brand-600 cursor-pointer';
          } else if (i === question.correctIndex) {
            cls +=
              'border-green-400 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 font-medium cursor-default';
          } else if (i === selected) {
            cls +=
              'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 cursor-default';
          } else {
            cls +=
              'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-default';
          }

          return (
            <button
              key={i}
              className={cls}
              onClick={() => handleSelect(i)}
              disabled={phase !== 'answering'}
            >
              {phase !== 'answering' ? (
                i === question.correctIndex ? (
                  <CheckCircle
                    size={16}
                    className="shrink-0 mt-0.5 text-green-500"
                  />
                ) : i === selected ? (
                  <XCircle size={16} className="shrink-0 mt-0.5 text-red-500" />
                ) : (
                  <span className="w-4 h-4 shrink-0" />
                )
              ) : (
                <span className="w-4 h-4 shrink-0 rounded-full border-2 border-slate-300 dark:border-slate-600 mt-0.5" />
              )}
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation (shown after answering) */}
      {phase === 'explained' && (
        <div className="rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-4 space-y-3">
          <div className="flex items-center gap-2">
            {isCorrect ? (
              <CheckCircle size={16} className="text-green-500 shrink-0" />
            ) : (
              <XCircle size={16} className="text-red-500 shrink-0" />
            )}
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {isCorrect ? 'Correct!' : 'Not quite'}
            </p>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {question.explanation}
          </p>
          <Button fullWidth onClick={handleNext}>
            {questionIndex + 1 >= quiz.questions.length
              ? 'See Results'
              : 'Next Question'}
          </Button>
        </div>
      )}
    </div>
  );
}
