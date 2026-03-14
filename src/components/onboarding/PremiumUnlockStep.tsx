import { useNavigate } from 'react-router-dom';
import { Check, Zap, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { apiBase } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { useState } from 'react';

const FREE_FEATURES = [
  'Workout tracking (unlimited)',
  'Training programs',
  'Exercise library (316 exercises)',
  'Learning courses (15)',
  'Community & challenges',
  'AI Q&A (5 questions/day)',
  'AI program drafts (1/month)',
];

const PREMIUM_ONLY_FEATURES = [
  'Unlimited AI Q&A',
  'AI program drafts (5/month)',
  'Priority AI responses (2× detail)',
];

const ANNUAL_DISCOUNT_PCT = 20;

interface Props {
  hasSession: boolean;
}

export function PremiumUnlockStep({ hasSession }: Props) {
  const navigate = useNavigate();
  const { session } = useAuth();
  const { toast } = useToast();
  const [cycle, setCycle] = useState<'monthly' | 'annual'>('annual');
  const [upgrading, setUpgrading] = useState(false);

  async function handleUpgrade() {
    if (!session && !hasSession) {
      // No session yet (email confirmation pending) — navigate to subscription page
      navigate('/subscription');
      return;
    }

    const accessToken = session?.access_token;
    if (!accessToken) {
      navigate('/subscription');
      return;
    }

    setUpgrading(true);
    try {
      const res = await fetch(`${apiBase}/api/create-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ cycle }),
      });
      const data = await res.json() as { sessionUrl?: string; error?: string; alreadyPremium?: boolean };
      if (res.status === 409 && data.alreadyPremium) {
        navigate('/');
        return;
      }
      if (!res.ok) throw new Error(data.error ?? 'Checkout failed');
      if (data.sessionUrl) window.location.href = data.sessionUrl;
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to start checkout', 'error');
    } finally {
      setUpgrading(false);
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-white">Your program is ready 🎉</h1>
        <p className="mt-2 text-slate-400">
          Here's what's waiting for you — and what Premium unlocks.
        </p>
      </div>

      {/* Billing cycle toggle */}
      <div className="flex items-center gap-2 bg-slate-800/60 rounded-xl p-1 w-fit">
        <button
          type="button"
          onClick={() => setCycle('monthly')}
          className={[
            'px-4 py-1.5 rounded-lg text-sm font-medium transition-colors',
            cycle === 'monthly'
              ? 'bg-slate-700 text-white'
              : 'text-slate-400 hover:text-slate-300',
          ].join(' ')}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => setCycle('annual')}
          className={[
            'flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors',
            cycle === 'annual'
              ? 'bg-brand-500 text-white'
              : 'text-slate-400 hover:text-slate-300',
          ].join(' ')}
        >
          Annual
          <span className="text-[10px] font-semibold bg-white/20 px-1.5 py-0.5 rounded-full">
            -{ANNUAL_DISCOUNT_PCT}%
          </span>
        </button>
      </div>

      {/* Feature comparison */}
      <div className="rounded-2xl border border-slate-700/60 bg-slate-900/50 overflow-hidden">
        {/* Free tier */}
        <div className="px-5 py-4 border-b border-slate-700/60">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
            Free — included
          </p>
          <div className="space-y-2">
            {FREE_FEATURES.map((f) => (
              <div key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                <Check size={14} className="text-green-500 shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Premium-only */}
        <div className="px-5 py-4 bg-brand-500/5">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={14} className="text-brand-400" fill="currentColor" />
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-400">
              Premium unlocks
            </p>
          </div>
          <div className="space-y-2">
            {PREMIUM_ONLY_FEATURES.map((f) => (
              <div key={f} className="flex items-center gap-2.5 text-sm text-white font-medium">
                <Check size={14} className="text-brand-400 shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="space-y-3">
        <Button fullWidth size="lg" onClick={handleUpgrade} disabled={upgrading}>
          {upgrading ? (
            'Redirecting to checkout…'
          ) : (
            <span className="flex items-center gap-2">
              <Zap size={16} fill="currentColor" />
              Upgrade to Premium
              {cycle === 'annual' && (
                <span className="text-xs font-normal opacity-80">· Save {ANNUAL_DISCOUNT_PCT}%</span>
              )}
            </span>
          )}
        </Button>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-full flex items-center justify-center gap-1.5 text-sm text-slate-400 hover:text-slate-300 py-2 transition-colors"
        >
          Start free
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
