import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import { v4 as uuid } from 'uuid';

export interface ToastItem {
  id: string;
  message: string;
  variant: 'success' | 'error' | 'info';
  duration: number;
}

interface ToastContextValue {
  toasts: ToastItem[];
  toast: (message: string, variant?: ToastItem['variant'], duration?: number) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    (message: string, variant: ToastItem['variant'] = 'info', duration = 3000) => {
      const id = uuid();
      const item: ToastItem = { id, message, variant, duration };
      setToasts((prev) => [...prev, item]);
      const timer = setTimeout(() => dismiss(id), duration);
      timers.current.set(id, timer);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}
