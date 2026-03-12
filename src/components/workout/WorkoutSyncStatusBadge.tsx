import { Badge } from '../ui/Badge';
import type { WorkoutSyncStatus } from '../../types';
import { getWorkoutSyncStatusCopy } from '../../utils/workoutSync';

interface WorkoutSyncStatusBadgeProps {
  status?: WorkoutSyncStatus;
  className?: string;
}

export function WorkoutSyncStatusBadge({ status, className = '' }: WorkoutSyncStatusBadgeProps) {
  const copy = getWorkoutSyncStatusCopy(status);
  if (!copy) return null;

  return (
    <span className={className} data-testid="workout-sync-status-badge">
      <Badge color={copy.tone} size="sm">{copy.label}</Badge>
    </span>
  );
}