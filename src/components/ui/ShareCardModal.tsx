import { useEffect, useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Download, Share2, Loader } from 'lucide-react';
import { shareOrDownload } from '../../utils/shareCard';

interface ShareCardModalProps {
  open: boolean;
  onClose: () => void;
  /** Async function that generates and returns the PNG blob */
  generate: () => Promise<Blob>;
  filename: string;
  title?: string;
}

export function ShareCardModal({
  open,
  onClose,
  generate,
  filename,
  title = 'Share your achievement',
}: ShareCardModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setError('');
    setPreviewUrl(null);

    generate()
      .then((b) => {
        setBlob(b);
        setPreviewUrl(URL.createObjectURL(b));
      })
      .catch(() => setError('Failed to generate card. Please try again.'))
      .finally(() => setLoading(false));

    return () => {
      // Revoke on unmount / next open
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
    };
  }, [open]);

  async function handleShare() {
    if (!blob) return;
    setSharing(true);
    try {
      await shareOrDownload(blob, filename);
    } catch {
      // User cancelled share dialog — not an error
    } finally {
      setSharing(false);
    }
  }

  const canNativeShare =
    typeof navigator.canShare === 'function' &&
    blob !== null &&
    navigator.canShare({ files: [new File([blob], filename, { type: 'image/png' })] });

  return (
    <Modal open={open} title={title} onClose={onClose}>
      <div className="space-y-4">
        {/* Preview */}
        <div className="relative overflow-hidden rounded-xl bg-slate-800 aspect-square w-full flex items-center justify-center">
          {loading && (
            <div className="flex flex-col items-center gap-2 text-slate-500">
              <Loader size={24} className="animate-spin" />
              <span className="text-xs">Generating card…</span>
            </div>
          )}
          {!loading && previewUrl && (
            <img
              src={previewUrl}
              alt="Shareable card preview"
              className="w-full h-full object-cover rounded-xl"
            />
          )}
          {!loading && error && (
            <p className="text-red-400 text-sm px-4 text-center">{error}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {canNativeShare ? (
            <Button
              onClick={handleShare}
              disabled={sharing || loading || !blob}
              fullWidth
              size="lg"
            >
              <Share2 size={16} />
              {sharing ? 'Sharing…' : 'Share'}
            </Button>
          ) : (
            <Button
              onClick={handleShare}
              disabled={sharing || loading || !blob}
              fullWidth
              size="lg"
            >
              <Download size={16} />
              {sharing ? 'Saving…' : 'Download PNG'}
            </Button>
          )}
          <Button
            variant="ghost"
            size="lg"
            onClick={onClose}
            className="shrink-0 px-4"
          >
            Close
          </Button>
        </div>

        <p className="text-center text-xs text-slate-500">
          1080×1080 PNG · perfect for Instagram, Twitter, WhatsApp
        </p>
      </div>
    </Modal>
  );
}
