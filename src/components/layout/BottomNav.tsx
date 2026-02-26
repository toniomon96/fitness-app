import { NavLink } from 'react-router-dom';
import { Home, GraduationCap, Sparkles, BookOpen, Clock, Users, Utensils } from 'lucide-react';

const links = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/learn', icon: GraduationCap, label: 'Learn' },
  { to: '/nutrition', icon: Utensils, label: 'Nutrition' },
  { to: '/insights', icon: Sparkles, label: 'Insights' },
  { to: '/library', icon: BookOpen, label: 'Library' },
  { to: '/history', icon: Clock, label: 'History' },
  { to: '/feed', icon: Users, label: 'Community' },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/90 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/90 pb-safe">
      <div className="flex w-full">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              [
                'flex flex-1 flex-col items-center justify-center gap-0.5 py-3 text-[10px] font-medium transition-colors min-w-0',
                isActive
                  ? 'text-brand-500'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300',
              ].join(' ')
            }
          >
            <Icon size={21} strokeWidth={1.8} />
            <span className="truncate w-full text-center leading-none">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
