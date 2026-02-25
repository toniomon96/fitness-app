import type { MuscleGroup } from '../../types';

const ALL_MUSCLES: MuscleGroup[] = [
  'chest', 'back', 'shoulders', 'biceps', 'triceps',
  'quads', 'hamstrings', 'glutes', 'calves', 'core', 'cardio',
];

const labels: Record<MuscleGroup, string> = {
  chest: 'Chest',
  back: 'Back',
  shoulders: 'Shoulders',
  biceps: 'Biceps',
  triceps: 'Triceps',
  quads: 'Quads',
  hamstrings: 'Hamstrings',
  glutes: 'Glutes',
  calves: 'Calves',
  core: 'Core',
  cardio: 'Cardio',
};

interface MuscleGroupFilterProps {
  selected: MuscleGroup | null;
  onChange: (muscle: MuscleGroup | null) => void;
}

export function MuscleGroupFilter({ selected, onChange }: MuscleGroupFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
      <button
        onClick={() => onChange(null)}
        className={[
          'shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
          selected === null
            ? 'bg-brand-500 text-white'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700',
        ].join(' ')}
      >
        All
      </button>
      {ALL_MUSCLES.map((m) => (
        <button
          key={m}
          onClick={() => onChange(selected === m ? null : m)}
          className={[
            'shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors capitalize',
            selected === m
              ? 'bg-brand-500 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700',
          ].join(' ')}
        >
          {labels[m]}
        </button>
      ))}
    </div>
  );
}
