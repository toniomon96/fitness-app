import { useNavigate } from 'react-router-dom';
import type { Exercise } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ChevronRight } from 'lucide-react';

const equipIcons: Record<string, string> = {
  barbell: '🏋️',
  dumbbell: '🪄',
  cable: '🔗',
  machine: '⚙️',
  bodyweight: '🧍',
  kettlebell: '🔔',
  'resistance-band': '🪢',
  'cardio-machine': '🚴',
};

interface ExerciseCardProps {
  exercise: Exercise;
  onSelect?: (id: string) => void;
}

export function ExerciseCard({ exercise, onSelect }: ExerciseCardProps) {
  const navigate = useNavigate();

  function handleClick() {
    if (onSelect) {
      onSelect(exercise.id);
    } else {
      navigate(`/library/${exercise.id}`);
    }
  }

  return (
    <Card hover onClick={handleClick} padding="sm">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-700 text-xl">
          {equipIcons[exercise.equipment[0] ?? ''] ?? '💪'}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-slate-900 dark:text-white text-sm truncate">
            {exercise.name}
          </p>
          <div className="mt-1 flex flex-wrap gap-1">
            {exercise.primaryMuscles.slice(0, 2).map((m) => (
              <Badge key={m} color="brand" size="sm" >
                {m}
              </Badge>
            ))}
            {exercise.equipment.slice(0, 1).map((e) => (
              <Badge key={e} color="slate" size="sm">
                {e}
              </Badge>
            ))}
          </div>
        </div>
        <ChevronRight size={16} className="shrink-0 text-slate-400" />
      </div>
    </Card>
  );
}
