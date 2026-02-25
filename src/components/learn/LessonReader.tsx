import type { ReactNode } from 'react';
import type { Lesson } from '../../types';
import { Clock, ExternalLink } from 'lucide-react';

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

      {/* Body text */}
      <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
        {paragraphs.map((para, i) => (
          <p key={i}>{renderLine(para)}</p>
        ))}
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
