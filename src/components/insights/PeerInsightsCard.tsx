import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { Card } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';
import { getPeerInsights } from '../../services/adaptService';

interface PeerInsightsCardProps {
  userId: string;
  goal: string;
  experienceLevel: string;
}

export function PeerInsightsCard({ userId, goal, experienceLevel }: PeerInsightsCardProps) {
  const [loading, setLoading] = useState(true);
  const [narrative, setNarrative] = useState<string | null>(null);
  const [peerCount, setPeerCount] = useState(0);
  const [hasEnoughPeers, setHasEnoughPeers] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function fetch() {
      try {
        const res = await getPeerInsights({ userId, goal, experienceLevel });
        if (cancelled) return;
        setNarrative(res.narrative);
        setPeerCount(res.peerCount);
        setHasEnoughPeers(res.hasEnoughPeers);
      } catch {
        // Silently hide if unavailable
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void fetch();
    return () => { cancelled = true; };
  }, [userId, goal, experienceLevel]);

  if (loading) {
    return (
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <Users size={16} className="text-slate-400" />
          <p className="text-sm font-semibold text-slate-500">Peer Insights</p>
        </div>
        <div className="space-y-2">
          <Skeleton variant="text" className="w-full" />
          <Skeleton variant="text" className="w-4/5" />
          <Skeleton variant="text" className="w-3/5" />
        </div>
      </Card>
    );
  }

  if (!hasEnoughPeers || !narrative) return null;

  return (
    <Card>
      <div className="flex items-start gap-3 mb-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/10 shrink-0">
          <Users size={18} className="text-brand-500" />
        </div>
        <div>
          <p className="font-semibold text-sm text-slate-900 dark:text-white">How You Compare</p>
          <p className="text-xs text-slate-400 mt-0.5">{peerCount} peers with your goal & level</p>
        </div>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{narrative}</p>
    </Card>
  );
}
