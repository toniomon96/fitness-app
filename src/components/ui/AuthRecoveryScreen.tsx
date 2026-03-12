import { AlertTriangle, ArrowRight, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface AuthRecoveryScreenProps {
  title: string;
  message: string;
  primaryActionLabel: string;
  onPrimaryAction: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
}

export function AuthRecoveryScreen({
  title,
  message,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
}: AuthRecoveryScreenProps) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-slate-50 px-6 text-center dark:bg-slate-950">
      <div className="max-w-sm space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
          <AlertTriangle size={24} />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{message}</p>
        </div>
        <div className="space-y-2">
          <Button fullWidth onClick={onPrimaryAction}>
            <ArrowRight size={16} />
            {primaryActionLabel}
          </Button>
          {secondaryActionLabel && onSecondaryAction && (
            <Button fullWidth variant="ghost" onClick={onSecondaryAction}>
              <RefreshCw size={16} />
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}