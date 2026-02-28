import { useState } from 'react';
import { Sparkles, Dumbbell, Calendar, Wrench, AlertCircle } from 'lucide-react';
import type { UserTrainingProfile, Program } from '../../types';
import { apiBase } from '../../lib/api';
import { Button } from '../ui/Button';

interface Props {
  profile: UserTrainingProfile;
  onProgramReady: (program: Program) => void;
}

const GOAL_LABELS: Record<string, string> = {
  'hypertrophy': 'Muscle Building',
  'fat-loss': 'Fat Loss',
  'general-fitness': 'General Fitness',
};

export function ProfileSummaryCard({ profile, onProgramReady }: Props) {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  async function handleGenerate() {
    setGenerating(true);
    setError('');

    try {
      const res = await fetch(`${apiBase}/api/generate-program`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(data.error ?? `HTTP ${res.status}`);
      }

      const data = await res.json() as { program: Program };
      onProgramReady(data.program);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate program. Please try again.');
      setGenerating(false);
    }
  }

  const goalLabels = profile.goals
    .map((g) => GOAL_LABELS[g] ?? g)
    .join(' · ');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Your profile is ready</h1>
        <p className="mt-2 text-slate-400">
          Review your profile below, then generate your personalised 8-week program.
        </p>
      </div>

      {/* AI Summary card */}
      <div className="rounded-2xl border border-brand-500/30 bg-brand-900/20 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} className="text-brand-400" />
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-400">
            AI Profile Summary
          </p>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed">{profile.aiSummary}</p>
      </div>

      {/* Stats chips */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2.5 rounded-xl bg-slate-800 px-4 py-3">
          <Dumbbell size={16} className="text-brand-400 shrink-0" />
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wide">Goal</p>
            <p className="text-sm font-medium text-white leading-tight">{goalLabels}</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 rounded-xl bg-slate-800 px-4 py-3">
          <Calendar size={16} className="text-brand-400 shrink-0" />
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wide">Schedule</p>
            <p className="text-sm font-medium text-white leading-tight">
              {profile.daysPerWeek}×/week · {profile.sessionDurationMinutes} min
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 rounded-xl bg-slate-800 px-4 py-3">
          <Wrench size={16} className="text-brand-400 shrink-0" />
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wide">Equipment</p>
            <p className="text-sm font-medium text-white leading-tight truncate">
              {profile.equipment.length > 0 ? profile.equipment.slice(0, 2).join(', ') : 'Full gym'}
              {profile.equipment.length > 2 && ` +${profile.equipment.length - 2} more`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 rounded-xl bg-slate-800 px-4 py-3">
          <Dumbbell size={16} className="text-brand-400 shrink-0" />
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wide">Experience</p>
            <p className="text-sm font-medium text-white leading-tight">
              {profile.trainingAgeYears === 0
                ? 'Beginner'
                : profile.trainingAgeYears <= 2
                  ? `${profile.trainingAgeYears} yr(s) lifting`
                  : `${profile.trainingAgeYears} yrs lifting`}
            </p>
          </div>
        </div>
      </div>

      {profile.injuries.length > 0 && (
        <div className="flex items-start gap-2 rounded-xl bg-amber-900/20 border border-amber-800/40 px-4 py-3">
          <AlertCircle size={15} className="text-amber-400 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-300">
            Limitations noted: {profile.injuries.join(', ')}. Your program will be adjusted accordingly.
          </p>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-400 bg-red-900/20 border border-red-800 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <Button
        onClick={handleGenerate}
        disabled={generating}
        fullWidth
        size="lg"
      >
        {generating ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Building your program…
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Sparkles size={18} />
            Generate My 8-Week Program
          </span>
        )}
      </Button>

      <p className="text-center text-xs text-slate-500">
        Your program is generated by AI and can be edited at any time from the Programs tab.
      </p>
    </div>
  );
}
