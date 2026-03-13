import type { ExperienceLevel } from '../../types';

const LEVELS: Array<{ id: ExperienceLevel; label: string; stars: number; color: string; description: string }> = [
  {
    id: 'beginner',
    label: 'Beginner',
    stars: 1,
    color: 'text-green-500',
    description: 'Learning form, building base',
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    stars: 3,
    color: 'text-yellow-500',
    description: 'Comfortable with the basics',
  },
  {
    id: 'advanced',
    label: 'Advanced',
    stars: 5,
    color: 'text-red-500',
    description: 'Experienced lifter, complex movements',
  },
];

interface DifficultyFilterProps {
  selected: ExperienceLevel | null;
  onChange: (level: ExperienceLevel | null) => void;
}

export function DifficultyFilter({ selected, onChange }: DifficultyFilterProps) {
  return (
    <div className="flex flex-col gap-2">
      {LEVELS.map((level) => {
        const isSelected = selected === level.id;
        return (
          <button
            key={level.id}
            type="button"
            onClick={() => onChange(isSelected ? null : level.id)}
            className={[
              'flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition-colors',
              isSelected
                ? 'bg-brand-500 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700',
            ].join(' ')}
          >
            <div className="flex shrink-0 gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={[
                    'text-sm leading-none',
                    isSelected
                      ? i < level.stars
                        ? 'text-white'
                        : 'text-white/30'
                      : i < level.stars
                        ? level.color
                        : 'text-slate-200 dark:text-slate-700',
                  ].join(' ')}
                >
                  ★
                </span>
              ))}
            </div>
            <div className="min-w-0 flex-1">
              <p className={['text-sm font-semibold', isSelected ? 'text-white' : ''].join(' ')}>
                {level.label}
              </p>
              <p
                className={[
                  'text-xs',
                  isSelected ? 'text-white/75' : 'text-slate-400 dark:text-slate-500',
                ].join(' ')}
              >
                {level.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
