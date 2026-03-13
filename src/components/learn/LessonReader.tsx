import { useState } from 'react';
import type { ReactNode } from 'react';
import type { Lesson } from '../../types';
import { Clock, ExternalLink, CheckCircle, XCircle } from 'lucide-react';

interface LessonReaderProps {
  lesson: Lesson;
}

/** Converts **bold** markers within a line of text into <strong> elements. */
function renderLine(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-slate-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

interface CheckpointBlockProps {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

function CheckpointBlock({ question, options, correctIndex, explanation }: CheckpointBlockProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const isCorrect = selected === correctIndex;

  return (
    <div
      role="region"
      aria-label="Checkpoint question"
      className="rounded-xl border-2 border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-900/10 p-4 space-y-3"
    >
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-100 dark:bg-brand-900/30 px-2 py-0.5 rounded-full">
          Checkpoint
        </span>
      </div>
      <p className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">{question}</p>
      <div className="space-y-2" role="group" aria-label="Answer options">
        {options.map((opt, i) => {
          let cls = 'w-full text-left px-3 py-2.5 rounded-lg border text-sm transition-all duration-150 flex items-start gap-2 ';
          if (!answered) {
            cls += 'border-brand-200 dark:border-brand-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-brand-400 dark:hover:border-brand-500 cursor-pointer';
          } else if (i === correctIndex) {
            cls += 'border-green-400 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 cursor-default';
          } else if (i === selected) {
            cls += 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 cursor-default';
          } else {
            cls += 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-default';
          }
          return (
            <button
              key={i}
              className={cls}
              onClick={() => !answered && setSelected(i)}
              disabled={answered}
              aria-pressed={selected === i}
            >
              {answered ? (
                i === correctIndex ? (
                  <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
                ) : i === selected ? (
                  <XCircle size={14} className="text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
                ) : (
                  <span className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                )
              ) : (
                <span className="w-3.5 h-3.5 shrink-0 rounded-full border-2 border-brand-300 dark:border-brand-600 mt-0.5" aria-hidden="true" />
              )}
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div
          role="status"
          aria-live="polite"
          className={`text-xs rounded-lg p-2.5 leading-relaxed ${isCorrect ? 'bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-300' : 'bg-blue-50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-300'}`}
        >
          <strong>{isCorrect ? '✓ Correct! ' : 'Not quite. '}</strong>
          {explanation}
        </div>
      )}
    </div>
  );
}

export function LessonReader({ lesson }: LessonReaderProps) {
  const paragraphs = lesson.content.split('\n\n').filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Lesson header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-snug">
          {lesson.title}
        </h2>
        <div className="flex items-center gap-1.5 mt-1.5 text-sm text-slate-400">
          <Clock size={14} />
          <span>~{lesson.estimatedMinutes} min read</span>
        </div>
      </div>

      {/* Body text interleaved with checkpoint questions */}
      <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
        {paragraphs.map((para, i) => {
          const checkpoint = lesson.checkpoints?.find((cp) => cp.afterParagraphIndex === i);
          return (
            <div key={i} className="space-y-4">
              <p>{renderLine(para)}</p>
              {checkpoint && (
                <CheckpointBlock
                  question={checkpoint.question}
                  options={checkpoint.options}
                  correctIndex={checkpoint.correctIndex}
                  explanation={checkpoint.explanation}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Key takeaways */}
      <div className="rounded-xl bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-3">
          Key Takeaways
        </p>
        <ul className="space-y-2">
          {lesson.keyPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-brand-800 dark:text-brand-200">
              <span className="shrink-0 mt-0.5 text-brand-400">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* References */}
      {lesson.references.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Sources
          </p>
          <ul className="space-y-2">
            {lesson.references.map((ref, i) => (
              <li key={i} className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {ref.authors && <span>{ref.authors}. </span>}
                {ref.url ? (
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-brand-500 hover:underline"
                  >
                    {ref.title}
                    <ExternalLink size={10} />
                  </a>
                ) : (
                  <em>{ref.title}</em>
                )}
                {ref.journal && <span>. {ref.journal}</span>}
                {ref.year && <span> ({ref.year})</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
