import { useState } from 'react';
import type { Goal } from '../types';
import { useApp } from '../store/AppContext';
import { AppShell } from '../components/layout/AppShell';
import { TopBar } from '../components/layout/TopBar';
import { ProgramCard } from '../components/programs/ProgramCard';
import { programs } from '../data/programs';

const GOAL_TABS: { value: Goal | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'hypertrophy', label: 'Gain Muscle' },
  { value: 'fat-loss', label: 'Lose Weight' },
  { value: 'general-fitness', label: 'Maintain' },
];

export function ProgramsPage() {
  const { state } = useApp();
  const [activeGoal, setActiveGoal] = useState<Goal | 'all'>('all');

  const filtered =
    activeGoal === 'all'
      ? programs
      : programs.filter((p) => p.goal === activeGoal);

  const activeProgramId = state.user?.activeProgramId;

  return (
    <AppShell>
      <TopBar title="Programs" />
      <div className="px-4 pb-6">
        {/* Goal filter tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide py-3">
          {GOAL_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveGoal(tab.value)}
              className={[
                'shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                activeGoal === tab.value
                  ? 'bg-brand-500 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400',
              ].join(' ')}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((p) => (
            <ProgramCard
              key={p.id}
              program={p}
              isActive={p.id === activeProgramId}
            />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
