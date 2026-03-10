import { NavLink } from 'react-router-dom';

const TABS = [
  { to: '/feed', label: 'Feed' },
  { to: '/friends', label: 'Friends' },
  { to: '/leaderboard', label: 'Standings' },
  { to: '/challenges', label: 'Challenges' },
];

export function CommunityTabs() {
  return (
    <div className="sticky top-[calc(3.5rem+env(safe-area-inset-top,0px))] z-20 -mx-0 lg:-mx-6 border-b border-slate-200 bg-white/95 backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-900/95">
      <nav
        aria-label="Community sections"
        className="scrollbar-hide flex min-h-12 items-end gap-1 overflow-x-auto px-4"
      >
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              [
                'shrink-0 whitespace-nowrap rounded-t-lg border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors',
                isActive
                  ? 'border-brand-500 bg-brand-500/10 text-brand-600 dark:text-brand-400'
                  : 'border-transparent text-slate-500 hover:bg-slate-100/80 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200',
              ].join(' ')
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
