import { NavLink } from 'react-router-dom';
import { Home, Dumbbell, BookOpen, Clock } from 'lucide-react';

const links = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/programs', icon: Dumbbell, label: 'Programs' },
  { to: '/library', icon: BookOpen, label: 'Library' },
  { to: '/history', icon: Clock, label: 'History' },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/90 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/90 pb-safe">
      <div className="flex items-stretch">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              [
                'flex flex-1 flex-col items-center justify-center gap-1 py-3 text-xs font-medium transition-colors',
                isActive
                  ? 'text-brand-500'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300',
              ].join(' ')
            }
          >
            <Icon size={22} strokeWidth={1.8} />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
