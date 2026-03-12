import type { PersonalRecord, WorkoutSession, WorkoutSyncStatus } from '../types';

export interface WorkoutSyncStatusCopy {
  label: string;
  description: string;
  tone: 'slate' | 'blue' | 'green' | 'orange';
}

const STATUS_COPY: Record<WorkoutSyncStatus, WorkoutSyncStatusCopy> = {
  saved_on_device: {
    label: 'Saved on device',
    description: 'This workout is stored locally on this device.',
    tone: 'slate',
  },
  syncing: {
    label: 'Syncing',
    description: 'We are syncing this workout to your account now.',
    tone: 'blue',
  },
  synced: {
    label: 'Synced',
    description: 'This workout is saved to your account and available across devices.',
    tone: 'green',
  },
  needs_attention: {
    label: 'Needs attention',
    description: 'This workout is safe on this device, but cloud sync did not finish.',
    tone: 'orange',
  },
};

export function getWorkoutSyncStatusCopy(status?: WorkoutSyncStatus): WorkoutSyncStatusCopy | null {
  if (!status) return null;
  return STATUS_COPY[status];
}

export function getSessionPersonalRecords(
  sessionId: string,
  personalRecords: PersonalRecord[],
): PersonalRecord[] {
  return personalRecords.filter((record) => record.sessionId === sessionId);
}

export function canRetryWorkoutSync(session: WorkoutSession, isAuthenticated: boolean): boolean {
  return isAuthenticated && session.syncStatus === 'needs_attention';
}