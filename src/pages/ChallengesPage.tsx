import { useCallback, useEffect, useRef, useState } from 'react';
import { useApp } from '../store/AppContext';
import { supabase } from '../lib/supabase';
import { getChallenges, joinChallenge, createChallenge } from '../lib/db';
import type { Challenge } from '../types';
import { AppShell } from '../components/layout/AppShell';
import { TopBar } from '../components/layout/TopBar';
import { CommunityTabs } from '../components/community/CommunityTabs';
import { ChallengeCard } from '../components/community/ChallengeCard';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Trophy, Plus, X, ChevronDown } from 'lucide-react';

interface CreateForm {
  name: string;
  description: string;
  type: Challenge['type'];
  targetValue: string;
  startDate: string;
  endDate: string;
}

const today = () => new Date().toISOString().split('T')[0];
const nextMonth = () => {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split('T')[0];
};

export function ChallengesPage() {
  const { state } = useApp();
  const userId = state.user?.id ?? '';

  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<CreateForm>({
    name: '',
    description: '',
    type: 'volume',
    targetValue: '',
    startDate: today(),
    endDate: nextMonth(),
  });
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  const load = useCallback(async () => {
    const data = await getChallenges(userId);
    setChallenges(data);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    load();

    channelRef.current = supabase
      .channel('challenges_rt')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'challenge_participants' },
        () => { load(); },
      )
      .subscribe();

    return () => {
      channelRef.current?.unsubscribe();
    };
  }, [load]);

  async function handleJoin(id: string) {
    await joinChallenge(id, userId);
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, isJoined: true, participantCount: c.participantCount + 1, userProgress: 0 } : c,
      ),
    );
  }

  async function handleCreate() {
    if (!form.name.trim()) return;
    setCreating(true);
    try {
      await createChallenge(
        {
          name: form.name.trim(),
          description: form.description.trim() || undefined,
          type: form.type,
          targetValue: form.targetValue ? Number(form.targetValue) : undefined,
          startDate: form.startDate,
          endDate: form.endDate,
        },
        userId,
      );
      setShowCreate(false);
      setForm({ name: '', description: '', type: 'volume', targetValue: '', startDate: today(), endDate: nextMonth() });
      await load();
    } finally {
      setCreating(false);
    }
  }

  const mine = challenges.filter((c) => c.isJoined);
  const browse = challenges.filter((c) => !c.isJoined);

  return (
    <AppShell>
      <TopBar title="Community" />
      <CommunityTabs />

      <div className="px-4 pb-6 mt-4 space-y-5">
        <Button onClick={() => setShowCreate((v) => !v)} fullWidth variant="ghost">
          {showCreate ? <X size={16} /> : <Plus size={16} />}
          {showCreate ? 'Cancel' : 'Create Challenge'}
        </Button>

        {/* Create form */}
        {showCreate && (
          <Card className="space-y-4">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">New Challenge</p>

            <Input
              label="Challenge name"
              placeholder="e.g. March Volume Beast"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />

            <Input
              label="Description (optional)"
              placeholder="What's this challenge about?"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Type</label>
              <div className="relative">
                <select
                  value={form.type}
                  onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as Challenge['type'] }))}
                  className="w-full appearance-none rounded-xl border border-slate-600 bg-slate-800 px-3 py-2.5 text-sm text-white focus:border-brand-500 focus:outline-none pr-8"
                >
                  <option value="volume">Total Volume (kg)</option>
                  <option value="sessions">Workout Count</option>
                  <option value="streak">Training Streak (days)</option>
                </select>
                <ChevronDown size={16} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <Input
              label="Target (optional)"
              type="number"
              placeholder={form.type === 'volume' ? 'e.g. 10000' : form.type === 'sessions' ? 'e.g. 12' : 'e.g. 30'}
              value={form.targetValue}
              onChange={(e) => setForm((f) => ({ ...f, targetValue: e.target.value }))}
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Start date"
                type="date"
                value={form.startDate}
                onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
              />
              <Input
                label="End date"
                type="date"
                value={form.endDate}
                onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
              />
            </div>

            <Button
              onClick={handleCreate}
              fullWidth
              disabled={!form.name.trim() || creating}
            >
              {creating ? 'Creating…' : 'Create & Join'}
            </Button>
          </Card>
        )}

        {loading && (
          <div className="flex justify-center py-12">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-700 border-t-brand-500" />
          </div>
        )}

        {/* Active (joined) challenges */}
        {mine.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Your Challenges
            </p>
            <div className="space-y-3">
              {mine.map((c) => (
                <ChallengeCard key={c.id} challenge={c} onJoin={handleJoin} />
              ))}
            </div>
          </div>
        )}

        {/* Browse public */}
        {browse.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Browse
            </p>
            <div className="space-y-3">
              {browse.map((c) => (
                <ChallengeCard key={c.id} challenge={c} onJoin={handleJoin} />
              ))}
            </div>
          </div>
        )}

        {!loading && challenges.length === 0 && !showCreate && (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <Trophy size={32} className="text-slate-500" />
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              No challenges yet. Be the first to create one!
            </p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
