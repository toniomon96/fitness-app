import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { TopBar } from '../components/layout/TopBar';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MarkdownText } from '../components/ui/MarkdownText';
import { getExerciseById } from '../data/exercises';
import { useApp } from '../store/AppContext';
import { getExerciseProgressionData } from '../utils/volumeUtils';
import { ExerciseProgressChart } from '../components/exercise-library/ExerciseProgressChart';
import { askOmnexus } from '../services/claudeService';
import { CheckCircle2, TrendingUp, Sparkles, Loader2 } from 'lucide-react';

const equipEmoji: Record<string, string> = {
  barbell: '🏋️',
  dumbbell: '🪄',
  cable: '🔗',
  machine: '⚙️',
  bodyweight: '🧍',
  kettlebell: '🔔',
  'resistance-band': '🪢',
  'cardio-machine': '🚴',
};

export function ExerciseDetailPage() {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const exercise = getExerciseById(exerciseId ?? '');
  const { state } = useApp();

  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  if (!exercise) {
    return (
      <AppShell>
        <TopBar title="Exercise" showBack />
        <div className="flex items-center justify-center h-60">
          <p className="text-slate-400">Exercise not found.</p>
        </div>
      </AppShell>
    );
  }

  const progressionData = getExerciseProgressionData(exercise.id, state.history);

  async function handleAiSuggestion() {
    setAiLoading(true);
    setAiError(null);
    try {
      const recentSummary =
        progressionData.length === 0
          ? 'No sessions logged yet.'
          : progressionData
              .slice(-5)
              .map(
                (pt) =>
                  `${new Date(pt.date).toLocaleDateString()}: max ${pt.maxWeightKg}kg, est. 1RM ${pt.estimated1RM.toFixed(1)}kg (${pt.totalSets} sets)`,
              )
              .join('\n');

      const question = `Based on my recent ${exercise.name} history:\n${recentSummary}\n\nWhat weight should I target in my next session for optimal progressive overload? Be specific.`;

      const res = await askOmnexus({
        question,
        userContext: state.user
          ? { goal: state.user.goal, experienceLevel: state.user.experienceLevel }
          : undefined,
      });
      setAiSuggestion(res.answer);
    } catch (err) {
      setAiError(err instanceof Error ? err.message : 'Request failed. Try again.');
    } finally {
      setAiLoading(false);
    }
  }

  return (
    <AppShell>
      <TopBar title={exercise.name} showBack />
      <div className="px-4 pb-6 mt-2 space-y-5">
        {/* Muscles */}
        <Card>
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            Muscles Worked
          </h2>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-slate-400 mb-1.5">Primary</p>
              <div className="flex flex-wrap gap-1.5">
                {exercise.primaryMuscles.map((m) => (
                  <Badge key={m} color="brand">{m}</Badge>
                ))}
              </div>
            </div>
            {exercise.secondaryMuscles.length > 0 && (
              <div>
                <p className="text-xs text-slate-400 mb-1.5">Secondary</p>
                <div className="flex flex-wrap gap-1.5">
                  {exercise.secondaryMuscles.map((m) => (
                    <Badge key={m} color="slate">{m}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Equipment */}
        <Card>
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            Equipment
          </h2>
          <div className="flex flex-wrap gap-2">
            {exercise.equipment.map((e) => (
              <div
                key={e}
                className="flex items-center gap-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-sm capitalize text-slate-700 dark:text-slate-300"
              >
                <span>{equipEmoji[e] ?? '🏋️'}</span>
                {e.replace('-', ' ')}
              </div>
            ))}
          </div>
        </Card>

        {/* Your Progress */}
        <Card>
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5">
            <TrendingUp size={15} className="text-brand-500" />
            Your Progress
          </h2>
          <ExerciseProgressChart data={progressionData} />
        </Card>

        {/* AI Progression Suggestion */}
        <Card>
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5">
            <Sparkles size={15} className="text-brand-500" />
            AI Progression Suggestion
          </h2>
          {!aiSuggestion && (
            <Button
              onClick={handleAiSuggestion}
              disabled={aiLoading}
              variant="secondary"
              fullWidth
            >
              {aiLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin" />
                  Thinking…
                </span>
              ) : (
                'Get Next Session Target'
              )}
            </Button>
          )}
          {aiError && (
            <p className="text-xs text-red-500 mt-2">{aiError}</p>
          )}
          {aiSuggestion && (
            <div className="space-y-3">
              <MarkdownText content={aiSuggestion} />
              <Button
                onClick={() => { setAiSuggestion(null); setAiError(null); }}
                variant="ghost"
                size="sm"
                fullWidth
              >
                Ask again
              </Button>
            </div>
          )}
        </Card>

        {/* Instructions */}
        <Card>
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            How To
          </h2>
          <ol className="space-y-3">
            {exercise.instructions.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/40 text-xs font-bold text-brand-600 dark:text-brand-300 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-slate-700 dark:text-slate-300">{step}</p>
              </li>
            ))}
          </ol>
        </Card>

        {/* Tips */}
        {exercise.tips.length > 0 && (
          <Card>
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Pro Tips
            </h2>
            <ul className="space-y-2">
              {exercise.tips.map((tip, i) => (
                <li key={i} className="flex gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="shrink-0 mt-0.5 text-green-500"
                  />
                  <p className="text-sm text-slate-600 dark:text-slate-400">{tip}</p>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
