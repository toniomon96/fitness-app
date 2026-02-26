import { NavLink } from 'react-router-dom';

const TABS = [
  { to: '/feed', label: 'Feed' },
  { to: '/friends', label: 'Friends' },
  { to: '/leaderboard', label: 'Standings' },
  { to: '/challenges', label: 'Challenges' },
];

export function CommunityTabs() {
  return (
    <div className="flex overflow-x-auto scrollbar-hide border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 sticky top-14 z-20">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            [
              'flex-shrink-0 px-5 py-3 text-sm font-medium transition-colors border-b-2',
              isActive
                ? 'text-brand-500 border-brand-500'
                : 'text-slate-400 border-transparent hover:text-slate-600 dark:hover:text-slate-300',
            ].join(' ')
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
}
