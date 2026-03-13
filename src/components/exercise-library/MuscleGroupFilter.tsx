import type { MuscleGroup } from '../../types';

const ALL_MUSCLES: MuscleGroup[] = [
  // Broad legacy groups (shown in filter for existing exercises)
  'chest', 'back', 'shoulders', 'biceps', 'triceps',
  'quads', 'hamstrings', 'glutes', 'calves', 'core',
  // Granular lower body
  'adductors', 'abductors', 'hip-flexors',
  // Granular shoulders
  'front-deltoid', 'side-deltoid', 'rear-deltoid',
  // Granular back
  'lats', 'traps', 'rhomboids', 'erectors',
  // Granular arms
  'forearms',
  // Granular core
  'abs', 'obliques',
];

const labels: Record<MuscleGroup, string> = {
  // Legacy groups
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
  // Granular lower body
  adductors: 'Adductors',
  abductors: 'Abductors',
  'hip-flexors': 'Hip Flexors',
  tibialis: 'Tibialis',
  // Granular shoulders
  'front-deltoid': 'Front Delt',
  'side-deltoid': 'Side Delt',
  'rear-deltoid': 'Rear Delt',
  'rotator-cuff': 'Rotator Cuff',
  // Granular arms
  forearms: 'Forearms',
  // Granular back
  lats: 'Lats',
  traps: 'Traps',
  rhomboids: 'Rhomboids',
  serratus: 'Serratus',
  erectors: 'Erectors',
  // Granular core
  abs: 'Abs',
  obliques: 'Obliques',
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
