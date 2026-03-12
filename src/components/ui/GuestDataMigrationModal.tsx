import { Database, GraduationCap, Scale, Sparkles } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';
import type { GuestMigrationSummary } from '../../lib/dataMigration';

interface GuestDataMigrationModalProps {
  open: boolean;
  summary: GuestMigrationSummary;
  importing: boolean;
  onImport: () => void;
  onDismiss: () => void;
}

export function GuestDataMigrationModal({
  open,
  summary,
  importing,
  onImport,
  onDismiss,
}: GuestDataMigrationModalProps) {
  return (
    <Modal open={open} onClose={onDismiss} title="Bring your guest progress with you">
      <div className="space-y-4">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          We found progress saved from guest mode on this device. Import it into your account so it stays with you across devices.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/70">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <Database size={15} className="text-brand-500" />
              <span className="text-xs font-semibold">Training history</span>
            </div>
            <p className="mt-2 text-lg font-bold text-slate-900 dark:text-white">{summary.sessionCount}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">workouts</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/70">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <Sparkles size={15} className="text-yellow-500" />
              <span className="text-xs font-semibold">Personal records</span>
            </div>
            <p className="mt-2 text-lg font-bold text-slate-900 dark:text-white">{summary.personalRecordCount}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">records</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/70">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <GraduationCap size={15} className="text-green-500" />
              <span className="text-xs font-semibold">Learning progress</span>
            </div>
            <p className="mt-2 text-lg font-bold text-slate-900 dark:text-white">{summary.learningItemCount}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">completed items</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/70">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <Scale size={15} className="text-orange-500" />
              <span className="text-xs font-semibold">Preferences</span>
            </div>
            <p className="mt-2 text-lg font-bold text-slate-900 dark:text-white">{summary.weightUnit.toUpperCase()}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">weight unit</p>
          </div>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          If you skip this for now, the data stays on this device and you can import it later from your profile.
        </p>

        <div className="flex gap-2">
          <Button variant="ghost" fullWidth onClick={onDismiss} disabled={importing}>
            Maybe later
          </Button>
          <Button fullWidth onClick={onImport} disabled={importing}>
            {importing ? 'Importing…' : 'Import my progress'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}