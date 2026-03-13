import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { TopBar } from '../components/layout/TopBar';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { MarkdownText } from '../components/ui/MarkdownText';
import { getExerciseById, getExerciseYouTubeId, EXERCISE_LIBRARY } from '../data/exercises';
import { useApp } from '../store/AppContext';
import { getExerciseProgressionData } from '../utils/volumeUtils';
import { ExerciseProgressChart } from '../components/exercise-library/ExerciseProgressChart';
import { askOmnexus } from '../services/claudeService';
import { getContentRecommendations } from '../services/learningService';
import { useLearningProgress } from '../hooks/useLearningProgress';
import { courses } from '../data/courses';
import {
  CheckCircle2, TrendingUp, Sparkles, Loader2, BookOpen, ArrowRight, Play, MessageCircle,
  AlertTriangle, Repeat2, MessageSquare, List, Trophy, Dumbbell, Grid3X3, ChevronRight,
} from 'lucide-react';
import { YouTubeEmbed } from '../components/ui/YouTubeEmbed';
import type { ContentRecommendation, Exercise } from '../types';
import { useWeightUnit } from '../hooks/useWeightUnit';
import { formatWeightValue } from '../utils/weightUnits';

// ─── Types ────────────────────────────────────────────────────────────────────

type TabId = 'how-to' | 'mistakes' | 'variations' | 'cues';

// ─── Constants ────────────────────────────────────────────────────────────────

const equipEmoji: Record<string, string> = {
  barbell: '🏋️',
  dumbbell: '🪄',
  cable: '🔗',
  machine: '⚙️',
  bodyweight: '🧍',
  kettlebell: '🔔',
  'resistance-band': '🪢',
  'cardio-machine': '🚴',
  'ez-bar': '〽️',
  'suspension-trainer': '🔄',
  'smith-machine': '🏗️',
  'trap-bar': '⬡',
  'dip-bars': '⊥',
  rings: '⭕',
  bench: '🪑',
  'pull-up-bar': '⬆️',
  box: '📦',
};

const difficultyConfig: Record<string, { label: string; stars: number; color: string }> = {
  beginner:     { label: 'Beginner',     stars: 1, color: 'text-green-500' },
  intermediate: { label: 'Intermediate', stars: 3, color: 'text-yellow-500' },
  advanced:     { label: 'Advanced',     stars: 5, color: 'text-red-500' },
};

const TABS: { id: TabId; label: string; icon: React.FC<{ size: number; className?: string }> }[] = [
  { id: 'how-to',     label: 'How To',         icon: List },
  { id: 'mistakes',   label: 'Mistakes',        icon: AlertTriangle },
  { id: 'variations', label: 'Variations',      icon: Repeat2 },
  { id: 'cues',       label: 'Coach Cues',      icon: MessageSquare },
];

// ─── Subcomponents ────────────────────────────────────────────────────────────

function DifficultyBadge({ difficulty }: { difficulty?: string }) {
  if (!difficulty) return null;
  const cfg = difficultyConfig[difficulty] ?? { label: difficulty, stars: 2, color: 'text-slate-400' };
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Difficulty</span>
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={`text-base leading-none ${i < cfg.stars ? cfg.color : 'text-slate-200 dark:text-slate-700'}`}>★</span>
        ))}
      </div>
      <span className={`text-xs font-semibold capitalize ${cfg.color}`}>{cfg.label}</span>
    </div>
  );
}

function EquipmentSubstituteFinder({ exercise }: { exercise: Exercise }) {
  const [open, setOpen] = useState(false);
  const variants = (exercise.exerciseVariants ?? [])
    .map((id) => EXERCISE_LIBRARY.find((e) => e.id === id))
    .filter((e): e is Exercise => e !== undefined)
    .slice(0, 3);

  if (variants.length === 0) return null;

  const navigate = useNavigate();

  return (
    <Card>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-300"
      >
        <span className="flex items-center gap-2">
          <Dumbbell size={15} className="text-orange-500" />
          Can&apos;t do this exercise?
        </span>
        <ChevronRight
          size={15}
          className={`text-slate-400 transition-transform ${open ? 'rotate-90' : ''}`}
        />
      </button>
      {open && (
        <div className="mt-3 space-y-2">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
            Try one of these alternatives with similar muscles and pattern:
          </p>
          {variants.map((alt) => (
            <button
              key={alt.id}
              type="button"
              onClick={() => navigate(`/library/${alt.id}`)}
              className="w-full flex items-center justify-between gap-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 px-3 py-2.5 hover:border-brand-400 dark:hover:border-brand-600 transition-colors"
            >
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{alt.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 capitalize">
                  {(alt.equipment ?? []).join(', ')} · {alt.difficulty ?? ''}
                </p>
              </div>
              <ArrowRight size={14} className="shrink-0 text-brand-500" />
            </button>
          ))}
        </div>
      )}
    </Card>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function ExerciseDetailPage() {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const exercise = getExerciseById(exerciseId ?? '');
  const { state } = useApp();
  const { progress } = useLearningProgress();
  const navigate = useNavigate();
  const weightUnit = useWeightUnit();

  const [activeTab, setActiveTab] = useState<TabId>('how-to');

  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const [relatedLessons, setRelatedLessons] = useState<ContentRecommendation[] | null>(null);
  const [relatedLoading, setRelatedLoading] = useState(false);

  useEffect(() => {
    if (!exercise) return;
    let cancelled = false;

    async function fetchRelated() {
      if (!exercise) return;
      setRelatedLoading(true);
      try {
        const query = `${exercise.name} ${exercise.primaryMuscles.join(' ')}`;
        const res = await getContentRecommendations({
          query,
          completedLessons: progress.completedLessons,
          limit: 3,
        });
        const lessons = res.recommendations.filter((r) => r.type === 'lesson').slice(0, 2);
        if (!cancelled) setRelatedLessons(lessons);
      } catch {
        if (!cancelled) setRelatedLessons([]);
      } finally {
        if (!cancelled) setRelatedLoading(false);
      }
    }

    void fetchRelated();
    return () => { cancelled = true; };
  }, [exercise?.id]);

  function handleLessonClick(rec: ContentRecommendation) {
    if (!rec.courseId) return;
    const course = courses.find((c) => c.id === rec.courseId);
    const module = course?.modules.find((m) => m.lessons.some((l) => l.id === rec.id));
    if (course && module) navigate(`/learn/${course.id}/${module.id}`);
  }

  if (!exercise) {
    return (
      <AppShell>
        <TopBar title="Exercise" showBack backTo="/library" />
        <div className="flex items-center justify-center h-60">
          <p className="text-slate-400">Exercise not found.</p>
        </div>
      </AppShell>
    );
  }

  const progressionData = getExerciseProgressionData(exercise.id, state.history);
  const youtubeId = getExerciseYouTubeId(exercise.id);

  // Personal best from history
  const personalBest = progressionData.length > 0
    ? progressionData.reduce((best, pt) => pt.maxWeightKg > best.maxWeightKg ? pt : best)
    : null;

  // Related exercises — same movement pattern, different equipment
  const relatedExercises = exercise.pattern
    ? EXERCISE_LIBRARY
        .filter(
          (e) =>
            e.id !== exercise.id &&
            e.pattern === exercise.pattern &&
            e.equipment.some((eq) => !exercise.equipment.includes(eq)),
        )
        .slice(0, 3)
    : [];

  // Pattern alternatives — same pattern, not already in relatedExercises, up to 4
  const relatedIds = new Set([exercise.id, ...relatedExercises.map((e) => e.id)]);
  const patternAlternatives = exercise.pattern
    ? EXERCISE_LIBRARY
        .filter((e) => !relatedIds.has(e.id) && e.pattern === exercise.pattern)
        .slice(0, 4)
    : [];

  async function handleAiSuggestion() {
    if (!exercise) return;
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
                  `${new Date(pt.date).toLocaleDateString()}: max ${formatWeightValue(pt.maxWeightKg, weightUnit)}${weightUnit}, est. 1RM ${formatWeightValue(pt.estimated1RM, weightUnit)}${weightUnit} (${pt.totalSets} sets)`,
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
      <TopBar title={exercise.name} showBack backTo="/library" />
      <div className="px-4 pb-6 mt-2 space-y-5">

        {/* Header — Difficulty + Muscle Summary */}
        <Card>
          <DifficultyBadge difficulty={exercise.difficulty} />
          <div className="mt-3 space-y-2">
            <div>
              <p className="text-xs text-slate-400 mb-1.5">Primary muscles</p>
              <div className="flex flex-wrap gap-1.5">
                {exercise.primaryMuscles.map((m) => (
                  <Badge key={m} color="brand">{m}</Badge>
                ))}
              </div>
            </div>
            {exercise.secondaryMuscles.length > 0 && (
              <div>
                <p className="text-xs text-slate-400 mb-1.5">Secondary muscles</p>
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
                {e.replace(/-/g, ' ')}
              </div>
            ))}
          </div>
        </Card>

        {/* Watch Demo */}
        {youtubeId && (
          <Card>
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5">
              <Play size={15} className="text-brand-500" fill="currentColor" />
              Watch Demo
            </h2>
            <YouTubeEmbed videoId={youtubeId} title={exercise.name} />
            <p className="text-[11px] text-slate-400 mt-2">Tap to play · Tutorial from YouTube</p>
          </Card>
        )}

        {/* Four-Tab Section */}
        <Card padding="none">
          {/* Tab Row */}
          <div className="flex border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    'flex items-center gap-1.5 px-3 py-3 text-xs font-medium whitespace-nowrap transition-colors border-b-2 -mb-px',
                    active
                      ? 'text-brand-600 dark:text-brand-400 border-brand-500'
                      : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-700 dark:hover:text-slate-200',
                  ].join(' ')}
                >
                  <Icon size={13} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-4">
            {/* How To */}
            {activeTab === 'how-to' && (
              <ol className="space-y-3">
                {(exercise.steps ?? exercise.instructions).map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/40 text-xs font-bold text-brand-600 dark:text-brand-300 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-slate-700 dark:text-slate-300">{step}</p>
                  </li>
                ))}
              </ol>
            )}

            {/* Common Mistakes */}
            {activeTab === 'mistakes' && (
              <div className="space-y-3">
                {(exercise.commonMistakes ?? []).length === 0 ? (
                  <p className="text-sm text-slate-400">No common mistakes listed.</p>
                ) : (
                  (exercise.commonMistakes ?? []).map((m, i) => (
                    <div key={i} className="flex gap-3">
                      <AlertTriangle size={16} className="shrink-0 mt-0.5 text-orange-500" />
                      <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{m.mistake}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{m.why}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Variations */}
            {activeTab === 'variations' && (
              <div className="space-y-2">
                {/* Pro tips */}
                {(exercise.proTips ?? []).length > 0 && (
                  <div className="mb-3 space-y-2">
                    {(exercise.proTips ?? []).map((tip, i) => (
                      <div key={i} className="flex gap-2.5">
                        <CheckCircle2 size={15} className="shrink-0 mt-0.5 text-green-500" />
                        <p className="text-sm text-slate-600 dark:text-slate-400">{tip}</p>
                      </div>
                    ))}
                  </div>
                )}
                {/* Progression path */}
                {(exercise.progressionPath?.easier ?? exercise.progressionPath?.harder) && (
                  <div className="space-y-1.5 pt-1 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-slate-400 font-medium mt-2 mb-1">Progression path</p>
                    {exercise.progressionPath?.easier && (() => {
                      const e = getExerciseById(exercise.progressionPath!.easier!);
                      return e ? (
                        <button
                          type="button"
                          onClick={() => navigate(`/library/${e.id}`)}
                          className="w-full flex items-center justify-between gap-2 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/40 px-3 py-2 hover:border-green-400 transition-colors"
                        >
                          <span className="text-xs text-green-700 dark:text-green-300 font-medium">Easier · {e.name}</span>
                          <ArrowRight size={12} className="text-green-500 shrink-0" />
                        </button>
                      ) : null;
                    })()}
                    {exercise.progressionPath?.harder && (() => {
                      const e = getExerciseById(exercise.progressionPath!.harder!);
                      return e ? (
                        <button
                          type="button"
                          onClick={() => navigate(`/library/${e.id}`)}
                          className="w-full flex items-center justify-between gap-2 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 px-3 py-2 hover:border-red-400 transition-colors"
                        >
                          <span className="text-xs text-red-700 dark:text-red-300 font-medium">Harder · {e.name}</span>
                          <ArrowRight size={12} className="text-red-500 shrink-0" />
                        </button>
                      ) : null;
                    })()}
                  </div>
                )}
                {/* Tips */}
                {(exercise.tips ?? []).length > 0 && (
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 mt-2">
                    <p className="text-xs text-slate-400 font-medium mb-1">Pro tips</p>
                    {exercise.tips.map((tip, i) => (
                      <div key={i} className="flex gap-2.5">
                        <CheckCircle2 size={15} className="shrink-0 mt-0.5 text-brand-500" />
                        <p className="text-sm text-slate-600 dark:text-slate-400">{tip}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Coach Cues */}
            {activeTab === 'cues' && (
              <div className="space-y-2.5">
                {(exercise.coachingCues ?? []).length === 0 ? (
                  <p className="text-sm text-slate-400">No coaching cues listed.</p>
                ) : (
                  (exercise.coachingCues ?? []).map((cue, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 rounded-xl bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800/30 px-3 py-2.5"
                    >
                      <MessageSquare size={13} className="shrink-0 mt-0.5 text-brand-500" />
                      <p className="text-sm font-medium text-brand-800 dark:text-brand-200">&ldquo;{cue}&rdquo;</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </Card>

        {/* Equipment Substitute Finder */}
        <EquipmentSubstituteFinder exercise={exercise} />

        {/* Personal Best */}
        {personalBest && personalBest.maxWeightKg > 0 && (
          <Card>
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5">
              <Trophy size={15} className="text-yellow-500" />
              Personal Best
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex-1 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/40 px-4 py-3 text-center">
                <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
                  {formatWeightValue(personalBest.maxWeightKg, weightUnit)}<span className="text-base ml-1 font-normal">{weightUnit}</span>
                </p>
                <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-0.5">Best set weight</p>
              </div>
              <div className="flex-1 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 px-4 py-3 text-center">
                <p className="text-2xl font-bold text-slate-700 dark:text-slate-200">
                  {formatWeightValue(personalBest.estimated1RM, weightUnit)}<span className="text-base ml-1 font-normal">{weightUnit}</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Est. 1-rep max</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Achieved {new Date(personalBest.date).toLocaleDateString()}
            </p>
          </Card>
        )}

        {/* Your Progress Chart */}
        <Card>
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5">
            <TrendingUp size={15} className="text-brand-500" />
            Your Progress
          </h2>
          <ExerciseProgressChart data={progressionData} />
        </Card>

        {/* Related Exercises — same movement pattern */}
        {relatedExercises.length > 0 && (
          <Card>
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5">
              <Repeat2 size={15} className="text-brand-500" />
              Related Exercises
            </h2>
            <p className="text-xs text-slate-400 mb-2">Same movement pattern · different equipment</p>
            <ul className="space-y-2">
              {relatedExercises.map((rel) => (
                <li key={rel.id}>
                  <button
                    type="button"
                    onClick={() => navigate(`/library/${rel.id}`)}
                    className="w-full flex items-center justify-between gap-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 px-3 py-2.5 hover:border-brand-400 dark:hover:border-brand-600 transition-colors"
                  >
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-snug">{rel.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5 capitalize">
                        {(rel.equipment ?? []).join(', ')}
                      </p>
                    </div>
                    <ArrowRight size={14} className="shrink-0 text-brand-500" />
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Movement Pattern section */}
        {exercise.pattern && (
          <Card>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Grid3X3 size={15} className="text-brand-500" />
                Movement Pattern
              </h2>
              <span className="text-xs font-medium text-brand-500 bg-brand-500/10 px-2 py-0.5 rounded-full capitalize">
                {exercise.pattern.replace(/-/g, ' ')}
              </span>
            </div>
            {patternAlternatives.length > 0 && (
              <>
                <p className="text-xs text-slate-400 mb-2">More exercises in this pattern</p>
                <ul className="space-y-2 mb-3">
                  {patternAlternatives.map((alt) => (
                    <li key={alt.id}>
                      <button
                        type="button"
                        onClick={() => navigate(`/library/${alt.id}`)}
                        className="w-full flex items-center justify-between gap-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 px-3 py-2.5 hover:border-brand-400 dark:hover:border-brand-600 transition-colors"
                      >
                        <div className="flex-1 text-left min-w-0">
                          <p className="text-sm text-slate-700 dark:text-slate-300 leading-snug">{alt.name}</p>
                          <p className="text-xs text-slate-400 mt-0.5 capitalize">
                            {(alt.equipment ?? []).join(', ')} · {(alt.primaryMuscles ?? []).join(', ')}
                          </p>
                        </div>
                        <ArrowRight size={14} className="shrink-0 text-brand-500" />
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <button
              type="button"
              onClick={() => navigate('/library', { state: { filterPattern: exercise.pattern } })}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-brand-400 dark:hover:border-brand-600 transition-colors text-sm font-medium text-brand-500"
            >
              <span>Browse all {exercise.pattern.replace(/-/g, ' ')} exercises</span>
              <ArrowRight size={14} className="shrink-0" />
            </button>
          </Card>
        )}

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
              <MarkdownText text={aiSuggestion} />
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

        {/* Ask AI about this exercise */}
        <button
          type="button"
          onClick={() => navigate('/ask', {
            state: { prefill: `Tell me everything I need to know about the ${exercise.name}: form tips, common mistakes, programming, and how to progress.` },
          })}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-brand-400 dark:hover:border-brand-600 transition-colors"
        >
          <div className="w-8 h-8 rounded-xl bg-brand-500/10 flex items-center justify-center shrink-0">
            <MessageCircle size={15} className="text-brand-500" />
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="text-sm font-medium text-slate-900 dark:text-white">Ask Omnexus</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              Get AI coaching for {exercise.name}
            </p>
          </div>
          <ArrowRight size={15} className="text-slate-400 shrink-0" />
        </button>

        {/* Related Learning */}
        {(relatedLoading || (relatedLessons && relatedLessons.length > 0)) && (
          <Card>
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5">
              <BookOpen size={15} className="text-brand-500" />
              Related Learning
            </h2>
            {relatedLoading ? (
              <div className="space-y-2">
                <Skeleton variant="text" className="w-3/4" />
                <Skeleton variant="text" className="w-1/2" />
                <Skeleton variant="text" className="w-2/3" />
              </div>
            ) : (
              <ul className="space-y-2">
                {(relatedLessons ?? []).map((rec) => (
                  <li key={rec.id}>
                    <button
                      type="button"
                      onClick={() => handleLessonClick(rec)}
                      className="w-full text-left flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors"
                    >
                      <span className="text-sm text-slate-700 dark:text-slate-300 leading-snug">
                        {rec.title}
                      </span>
                      <ArrowRight size={14} className="shrink-0 text-brand-500" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        )}
      </div>
    </AppShell>
  );
}

