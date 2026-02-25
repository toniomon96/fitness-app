import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  right?: ReactNode;
}

export function TopBar({ title, showBack, right }: TopBarProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/90 pt-safe">
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft size={22} />
        </button>
      )}
      {title && (
        <h1 className="flex-1 text-base font-semibold text-slate-900 dark:text-white truncate">
          {title}
        </h1>
      )}
      {right && <div className="ml-auto flex items-center gap-2">{right}</div>}
    </header>
  );
}
