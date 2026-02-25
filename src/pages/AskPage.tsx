import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { TopBar } from '../components/layout/TopBar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MarkdownText } from '../components/ui/MarkdownText';
import { useApp } from '../store/AppContext';
import { askOmnexus } from '../services/claudeService';
import {
  appendInsightSession,
  getInsightSessions,
} from '../utils/localStorage';
import type { InsightSession } from '../types';
import { v4 as uuidv4 } from 'uuid';
import {
  MessageCircle,
  Send,
  Loader,
  Shield,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const SUGGESTED = [
  'How much protein do I need per day?',
  'Should I train if I\'m still sore?',
  'What rep range builds the most muscle?',
  'How does sleep affect muscle recovery?',
  'Is creatine safe and effective?',
];

export function AskPage() {
  const { state } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const user = state.user!;

  // Support pre-filling from the Insights page quick-question buttons
  const prefill = (location.state as { prefill?: string } | null)?.prefill ?? '';
  const [question, setQuestion] = useState(prefill);
  const [loading, setLoading] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sessions, setSessions] = useState<InsightSession[]>(() =>
    getInsightSessions().slice(0, 5),
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const answerRef = useRef<HTMLDivElement>(null);

  // Scroll to answer when it arrives
  useEffect(() => {
    if (currentAnswer && answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentAnswer]);

  async function handleSubmit() {
    const q = question.trim();
    if (!q || loading) return;

    setLoading(true);
    setCurrentAnswer(null);
    setCurrentQuestion(q);
    setError(null);

    try {
      const { answer } = await askOmnexus({
        question: q,
        userContext: { goal: user.goal, experienceLevel: user.experienceLevel },
      });

      setCurrentAnswer(answer);

      // Persist session
      const session: InsightSession = {
        id: uuidv4(),
        category: 'ask-anything',
        messages: [
          {
            id: uuidv4(),
            role: 'user',
            content: q,
            timestamp: new Date().toISOString(),
          },
          {
            id: uuidv4(),
            role: 'assistant',
            content: answer,
            timestamp: new Date().toISOString(),
          },
        ],
        createdAt: new Date().toISOString(),
      };
      appendInsightSession(session);
      setSessions(getInsightSessions().slice(0, 5));
      setQuestion('');
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : 'Something went wrong.';
      // Give a friendly hint if the API isn't running
      if (msg.includes('Failed to fetch') || msg.includes('NetworkError')) {
        setError(
          'Cannot reach the API. Make sure you are running `vercel dev` instead of `npm run dev`.',
        );
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <AppShell>
      <TopBar title="Ask Omnexus" showBack />
      <div className="px-4 pb-8 pt-4 space-y-5">

        {/* Hero */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 shrink-0">
            <MessageCircle size={24} className="text-brand-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
              Ask Anything
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Science-backed answers, with citations
            </p>
          </div>
        </div>

        {/* Input area */}
        <div className="space-y-3">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. How much protein do I need to build muscle?"
            rows={3}
            disabled={loading}
            className="w-full rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 resize-none focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors disabled:opacity-50"
          />
          <Button
            fullWidth
            onClick={handleSubmit}
            disabled={!question.trim() || loading}
          >
            {loading ? (
              <>
                <Loader size={16} className="animate-spin" />
                Thinking…
              </>
            ) : (
              <>
                <Send size={16} />
                Ask Omnexus
              </>
            )}
          </Button>
        </div>

        {/* Suggested questions (shown when idle) */}
        {!currentAnswer && !loading && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Try asking
            </p>
            <div className="space-y-2">
              {SUGGESTED.map((q) => (
                <button
                  key={q}
                  onClick={() => setQuestion(q)}
                  className="w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-brand-400 dark:hover:border-brand-600 transition-colors"
                >
                  <MessageCircle size={14} className="text-brand-500 shrink-0" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">{q}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </Card>
        )}

        {/* Current answer */}
        {currentAnswer && (
          <div ref={answerRef} className="space-y-3">
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-1">
              <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-700">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  You asked
                </p>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-0.5">
                  {currentQuestion}
                </p>
              </div>
              <div className="px-3 py-3">
                <MarkdownText text={currentAnswer} />
              </div>
            </div>
            <Button
              variant="secondary"
              fullWidth
              onClick={() => {
                setCurrentAnswer(null);
                setCurrentQuestion(null);
              }}
            >
              Ask another question
            </Button>
          </div>
        )}

        {/* Recent Q&A history */}
        {sessions.length > 0 && !currentAnswer && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Recent Questions
            </p>
            <div className="space-y-2">
              {sessions.map((session) => {
                const userMsg = session.messages.find((m) => m.role === 'user');
                const aiMsg = session.messages.find((m) => m.role === 'assistant');
                const isExpanded = expandedId === session.id;
                if (!userMsg || !aiMsg) return null;

                return (
                  <Card key={session.id} padding="sm">
                    <button
                      className="w-full text-left flex items-start justify-between gap-2"
                      onClick={() =>
                        setExpandedId(isExpanded ? null : session.id)
                      }
                    >
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug">
                        {userMsg.content}
                      </p>
                      {isExpanded ? (
                        <ChevronUp size={16} className="shrink-0 mt-0.5 text-slate-400" />
                      ) : (
                        <ChevronDown size={16} className="shrink-0 mt-0.5 text-slate-400" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                        <MarkdownText text={aiMsg.content} />
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Safety notice */}
        <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-3">
            <Shield size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
              Omnexus provides <strong>educational information only</strong>, not
              medical advice. Always consult a qualified healthcare professional
              for personal health concerns.
            </p>
          </div>
        </Card>

        {/* Link to insights */}
        <button
          onClick={() => navigate('/insights')}
          className="w-full text-center text-xs text-brand-500 hover:underline"
        >
          View AI insights on your workouts →
        </button>

      </div>
    </AppShell>
  );
}
