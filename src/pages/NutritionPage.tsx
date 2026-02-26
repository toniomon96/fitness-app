import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { useAuth } from '../contexts/AuthContext';
import * as db from '../lib/db';
import type { NutritionLog, NutritionGoals } from '../types';
import { AppShell } from '../components/layout/AppShell';
import { TopBar } from '../components/layout/TopBar';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { today as todayStr } from '../utils/dateUtils';
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Flame,
  Beef,
  Wheat,
  Droplets,
  Settings2,
} from 'lucide-react';

// ─── Default goals by fitness goal ────────────────────────────────────────────

const GOAL_DEFAULTS: Record<string, NutritionGoals> = {
  hypertrophy:      { calories: 3000, proteinG: 220, carbsG: 320, fatG: 80 },
  'fat-loss':       { calories: 2000, proteinG: 180, carbsG: 160, fatG: 65 },
  'general-fitness':{ calories: 2400, proteinG: 160, carbsG: 270, fatG: 70 },
};

const LS_GOALS_KEY = 'omnexus_nutrition_goals';

function loadGoals(userGoal: string): NutritionGoals {
  try {
    const raw = localStorage.getItem(LS_GOALS_KEY);
    if (raw) return JSON.parse(raw) as NutritionGoals;
  } catch { /* ignore */ }
  return GOAL_DEFAULTS[userGoal] ?? GOAL_DEFAULTS['general-fitness'];
}

function saveGoals(goals: NutritionGoals) {
  localStorage.setItem(LS_GOALS_KEY, JSON.stringify(goals));
}

function shiftDate(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function formatDisplayDate(dateStr: string): string {
  const t = todayStr();
  if (dateStr === t) return 'Today';
  if (dateStr === shiftDate(t, -1)) return 'Yesterday';
  return new Date(dateStr + 'T00:00:00').toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

// ─── Macro bar ────────────────────────────────────────────────────────────────

interface MacroBarProps {
  icon: React.ReactNode;
  label: string;
  unit: string;
  current: number;
  goal: number;
  color: string;
}

function MacroBar({ icon, label, unit, current, goal, color }: MacroBarProps) {
  const pct = goal > 0 ? Math.min(100, (current / goal) * 100) : 0;
  const over = current > goal;
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          {icon}
          <span>{label}</span>
        </div>
        <span className={`text-xs font-semibold tabular-nums ${over ? 'text-red-400' : 'text-slate-700 dark:text-slate-200'}`}>
          {Math.round(current)}<span className="font-normal text-slate-400">/{goal}{unit}</span>
        </span>
      </div>
      <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${over ? 'bg-red-400' : color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function NutritionPage() {
  const { state } = useApp();
  const { session } = useAuth();
  const navigate = useNavigate();

  const user = state.user;
  const isGuest = !!user?.isGuest;

  const [date, setDate] = useState(todayStr());
  const [entries, setEntries] = useState<NutritionLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [goals, setGoals] = useState<NutritionGoals>(() =>
    loadGoals(user?.goal ?? 'general-fitness'),
  );
  const [showGoals, setShowGoals] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Add form state
  const [form, setForm] = useState({
    mealName: '',
    calories: '',
    proteinG: '',
    carbsG: '',
    fatG: '',
  });
  const [adding, setAdding] = useState(false);

  // Goal edit state
  const [goalDraft, setGoalDraft] = useState(goals);

  const load = useCallback(async () => {
    if (!user || isGuest || !session) return;
    setLoading(true);
    try {
      const logs = await db.fetchNutritionLogs(user.id, date);
      setEntries(logs);
    } finally {
      setLoading(false);
    }
  }, [user, date, session, isGuest]);

  useEffect(() => { load(); }, [load]);

  // Totals
  const totals = entries.reduce(
    (acc, e) => ({
      calories: acc.calories + (e.calories ?? 0),
      proteinG: acc.proteinG + (e.proteinG ?? 0),
      carbsG: acc.carbsG + (e.carbsG ?? 0),
      fatG: acc.fatG + (e.fatG ?? 0),
    }),
    { calories: 0, proteinG: 0, carbsG: 0, fatG: 0 },
  );

  async function handleAdd() {
    if (!user || isGuest || !session) return;
    const cal = parseFloat(form.calories) || undefined;
    const pro = parseFloat(form.proteinG) || undefined;
    const car = parseFloat(form.carbsG) || undefined;
    const fat = parseFloat(form.fatG) || undefined;
    if (!form.mealName.trim() && !cal && !pro && !car && !fat) return;

    setAdding(true);
    try {
      const log = await db.addNutritionLog({
        userId: user.id,
        loggedAt: date,
        mealName: form.mealName.trim() || undefined,
        calories: cal,
        proteinG: pro,
        carbsG: car,
        fatG: fat,
      });
      if (log) setEntries((prev) => [...prev, log]);
      setForm({ mealName: '', calories: '', proteinG: '', carbsG: '', fatG: '' });
      setShowAddModal(false);
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id: string) {
    await db.deleteNutritionLog(id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  function handleSaveGoals() {
    setGoals(goalDraft);
    saveGoals(goalDraft);
    setShowGoals(false);
  }

  if (isGuest) {
    return (
      <AppShell>
        <TopBar title="Nutrition" showBack />
        <div className="flex flex-col items-center justify-center px-6 text-center gap-4 py-24">
          <span className="text-5xl">🥗</span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Nutrition tracking requires an account
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs">
            Create a free account to log meals, track macros, and monitor your nutrition alongside your training.
          </p>
          <Button onClick={() => navigate('/onboarding')} size="lg">
            Create Free Account
          </Button>
        </div>
      </AppShell>
    );
  }

  const isToday = date === todayStr();

  return (
    <AppShell>
      <TopBar title="Nutrition" showBack />

      <div className="px-4 pb-6 space-y-4 mt-2">
        {/* Date navigator */}
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => setDate((d) => shiftDate(d, -1))}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Previous day"
          >
            <ChevronLeft size={20} />
          </button>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {formatDisplayDate(date)}
          </p>
          <button
            onClick={() => setDate((d) => shiftDate(d, 1))}
            disabled={isToday}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-30"
            aria-label="Next day"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Macro summary */}
        <Card className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Daily Macros
            </p>
            <button
              onClick={() => { setGoalDraft(goals); setShowGoals(true); }}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              <Settings2 size={13} />
              Goals
            </button>
          </div>

          <MacroBar
            icon={<Flame size={12} className="text-orange-400" />}
            label="Calories"
            unit=" kcal"
            current={totals.calories}
            goal={goals.calories}
            color="bg-orange-400"
          />
          <MacroBar
            icon={<Beef size={12} className="text-red-400" />}
            label="Protein"
            unit="g"
            current={totals.proteinG}
            goal={goals.proteinG}
            color="bg-red-400"
          />
          <MacroBar
            icon={<Wheat size={12} className="text-amber-400" />}
            label="Carbs"
            unit="g"
            current={totals.carbsG}
            goal={goals.carbsG}
            color="bg-amber-400"
          />
          <MacroBar
            icon={<Droplets size={12} className="text-blue-400" />}
            label="Fat"
            unit="g"
            current={totals.fatG}
            goal={goals.fatG}
            color="bg-blue-400"
          />

          {/* Calorie balance chip */}
          <div className="pt-1 border-t border-slate-100 dark:border-slate-700/50">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Remaining</span>
              <span className={`font-semibold tabular-nums ${
                goals.calories - totals.calories < 0
                  ? 'text-red-400'
                  : 'text-green-500'
              }`}>
                {Math.abs(goals.calories - totals.calories).toFixed(0)} kcal{' '}
                {goals.calories - totals.calories < 0 ? 'over' : 'left'}
              </span>
            </div>
          </div>
        </Card>

        {/* Add entry button */}
        <Button fullWidth onClick={() => setShowAddModal(true)}>
          <Plus size={16} />
          Log Food
        </Button>

        {/* Entries list */}
        {loading && (
          <div className="flex justify-center py-8">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-brand-500" />
          </div>
        )}

        {!loading && entries.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <span className="text-3xl">🥗</span>
            <p className="text-sm text-slate-400">
              No entries for {formatDisplayDate(date).toLowerCase()}.
            </p>
            <p className="text-xs text-slate-500">Tap "Log Food" to add your first meal.</p>
          </div>
        )}

        {!loading && entries.length > 0 && (
          <div className="space-y-2">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start justify-between rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 px-4 py-3 gap-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {entry.mealName || 'Entry'}
                  </p>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
                    {entry.calories != null && (
                      <span className="text-xs text-orange-500 tabular-nums">{entry.calories} kcal</span>
                    )}
                    {entry.proteinG != null && (
                      <span className="text-xs text-red-400 tabular-nums">{entry.proteinG}g protein</span>
                    )}
                    {entry.carbsG != null && (
                      <span className="text-xs text-amber-500 tabular-nums">{entry.carbsG}g carbs</span>
                    )}
                    {entry.fatG != null && (
                      <span className="text-xs text-blue-400 tabular-nums">{entry.fatG}g fat</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="shrink-0 text-slate-300 hover:text-red-400 dark:hover:text-red-400 transition-colors p-1"
                  aria-label="Delete entry"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─── Add Food Modal ───────────────────────────────────────────────────── */}
      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Log Food"
      >
        <div className="space-y-3">
          <Input
            label="Meal / Food name"
            value={form.mealName}
            onChange={(e) => setForm((f) => ({ ...f, mealName: e.target.value }))}
            placeholder="e.g. Chicken & rice, Breakfast…"
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Calories (kcal)"
              type="number"
              inputMode="numeric"
              min={0}
              value={form.calories}
              onChange={(e) => setForm((f) => ({ ...f, calories: e.target.value }))}
              placeholder="0"
            />
            <Input
              label="Protein (g)"
              type="number"
              inputMode="decimal"
              min={0}
              value={form.proteinG}
              onChange={(e) => setForm((f) => ({ ...f, proteinG: e.target.value }))}
              placeholder="0"
            />
            <Input
              label="Carbs (g)"
              type="number"
              inputMode="decimal"
              min={0}
              value={form.carbsG}
              onChange={(e) => setForm((f) => ({ ...f, carbsG: e.target.value }))}
              placeholder="0"
            />
            <Input
              label="Fat (g)"
              type="number"
              inputMode="decimal"
              min={0}
              value={form.fatG}
              onChange={(e) => setForm((f) => ({ ...f, fatG: e.target.value }))}
              placeholder="0"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <Button variant="ghost" onClick={() => setShowAddModal(false)} fullWidth>
              Cancel
            </Button>
            <Button onClick={handleAdd} disabled={adding} fullWidth>
              {adding ? 'Saving…' : 'Add Entry'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* ─── Goals Modal ─────────────────────────────────────────────────────── */}
      <Modal
        open={showGoals}
        onClose={() => setShowGoals(false)}
        title="Daily Goals"
      >
        <div className="space-y-3">
          <p className="text-xs text-slate-400">
            Set your daily nutrition targets. Defaults are based on your fitness goal.
          </p>
          <Input
            label="Calories (kcal)"
            type="number"
            inputMode="numeric"
            min={500}
            value={String(goalDraft.calories)}
            onChange={(e) =>
              setGoalDraft((g) => ({ ...g, calories: parseInt(e.target.value) || 0 }))
            }
          />
          <div className="grid grid-cols-3 gap-3">
            <Input
              label="Protein (g)"
              type="number"
              inputMode="decimal"
              min={0}
              value={String(goalDraft.proteinG)}
              onChange={(e) =>
                setGoalDraft((g) => ({ ...g, proteinG: parseFloat(e.target.value) || 0 }))
              }
            />
            <Input
              label="Carbs (g)"
              type="number"
              inputMode="decimal"
              min={0}
              value={String(goalDraft.carbsG)}
              onChange={(e) =>
                setGoalDraft((g) => ({ ...g, carbsG: parseFloat(e.target.value) || 0 }))
              }
            />
            <Input
              label="Fat (g)"
              type="number"
              inputMode="decimal"
              min={0}
              value={String(goalDraft.fatG)}
              onChange={(e) =>
                setGoalDraft((g) => ({ ...g, fatG: parseFloat(e.target.value) || 0 }))
              }
            />
          </div>
          <div className="flex gap-2 pt-1">
            <Button
              variant="ghost"
              onClick={() => {
                const defaults = GOAL_DEFAULTS[user?.goal ?? 'general-fitness'];
                setGoalDraft(defaults);
              }}
              fullWidth
            >
              Reset to defaults
            </Button>
            <Button onClick={handleSaveGoals} fullWidth>
              Save Goals
            </Button>
          </div>
        </div>
      </Modal>
    </AppShell>
  );
}
