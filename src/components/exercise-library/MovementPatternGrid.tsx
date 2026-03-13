import type { MovementPattern } from '../../types';

const PATTERNS: Array<{
  id: MovementPattern;
  label: string;
  emoji: string;
  description: string;
}> = [
  { id: 'squat',           label: 'Squat',            emoji: '🦵', description: 'Knee-dominant lower body' },
  { id: 'hinge',           label: 'Hip Hinge',        emoji: '🏋️', description: 'Deadlifts, RDLs, swings' },
  { id: 'push-horizontal', label: 'Horizontal Push',  emoji: '💪', description: 'Bench, push-up variations' },
  { id: 'push-vertical',   label: 'Vertical Push',    emoji: '🙌', description: 'Overhead press, pike push-up' },
  { id: 'pull-horizontal', label: 'Horizontal Pull',  emoji: '🔙', description: 'Rows, face pulls, inverted row' },
  { id: 'pull-vertical',   label: 'Vertical Pull',    emoji: '⬆️', description: 'Pull-ups, lat pulldown' },
  { id: 'isolation',       label: 'Isolation',        emoji: '🎯', description: 'Curls, extensions, flyes' },
  { id: 'carry',           label: 'Carry',            emoji: '🚶', description: 'Farmer carry, suitcase carry' },
  { id: 'cardio',          label: 'Cardio',           emoji: '🏃', description: 'Conditioning & endurance' },
];

interface MovementPatternGridProps {
  selected: MovementPattern | null;
  onChange: (pattern: MovementPattern | null) => void;
}

export function MovementPatternGrid({ selected, onChange }: MovementPatternGridProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {PATTERNS.map((p) => {
        const isSelected = selected === p.id;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onChange(isSelected ? null : p.id)}
            className={[
              'flex flex-col items-center gap-1.5 rounded-2xl p-3 text-center transition-colors',
              isSelected
                ? 'bg-brand-500 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700',
            ].join(' ')}
          >
            <span className="text-2xl leading-none">{p.emoji}</span>
            <span className="text-[11px] font-semibold leading-tight">{p.label}</span>
            <span
              className={[
                'text-[10px] leading-tight line-clamp-2',
                isSelected ? 'text-white/80' : 'text-slate-400 dark:text-slate-500',
              ].join(' ')}
            >
              {p.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export const PATTERN_LABELS: Record<MovementPattern, string> = Object.fromEntries(
  PATTERNS.map((p) => [p.id, p.label]),
) as Record<MovementPattern, string>;
