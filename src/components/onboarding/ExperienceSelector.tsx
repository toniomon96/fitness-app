import type { ExperienceLevel } from '../../types';

interface ExperienceSelectorProps {
  value: ExperienceLevel;
  onChange: (level: ExperienceLevel) => void;
}

const levels: { value: ExperienceLevel; label: string; description: string }[] = [
  {
    value: 'beginner',
    label: 'Beginner',
    description: 'Less than 1 year of consistent training',
  },
  {
    value: 'intermediate',
    label: 'Intermediate',
    description: '1–3 years, familiar with compound lifts',
  },
  {
    value: 'advanced',
    label: 'Advanced',
    description: '3+ years, training close to your potential',
  },
];

export function ExperienceSelector({ value, onChange }: ExperienceSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      {levels.map((lvl) => (
        <button
          key={lvl.value}
          onClick={() => onChange(lvl.value)}
          className={[
            'w-full text-left rounded-2xl border-2 p-4 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
            value === lvl.value
              ? 'border-brand-400 bg-brand-50 dark:bg-brand-900/20'
              : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800/60 hover:border-slate-300',
          ].join(' ')}
        >
          <div className="flex items-center gap-3">
            <div
              className={[
                'h-5 w-5 shrink-0 rounded-full border-2 transition-colors',
                value === lvl.value
                  ? 'border-brand-500 bg-brand-500'
                  : 'border-slate-300 dark:border-slate-600',
              ].join(' ')}
            >
              {value === lvl.value && (
                <svg viewBox="0 0 20 20" fill="white" className="h-full w-full">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                {lvl.label}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {lvl.description}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
