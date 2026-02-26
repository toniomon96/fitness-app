import { Modal } from './Modal';
import { Button } from './Button';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  variant?: 'danger' | 'default';
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Delete',
  variant = 'danger',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onCancel} title={title}>
      <p className="text-sm text-slate-400 mb-5">{description}</p>
      <div className="flex gap-3">
        <Button variant="ghost" onClick={onCancel} fullWidth>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          fullWidth
          className={
            variant === 'danger'
              ? 'bg-red-600 hover:bg-red-700 text-white border-red-600'
              : undefined
          }
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
