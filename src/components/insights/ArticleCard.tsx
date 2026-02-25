import { ExternalLink } from 'lucide-react';
import { Card } from '../ui/Card';
import type { HealthArticle } from '../../types';

interface ArticleCardProps {
  article: HealthArticle;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card padding="sm">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-slate-900 dark:text-white leading-snug line-clamp-2">
          {article.title}
        </p>
        {article.source && (
          <p className="text-xs text-brand-500 dark:text-brand-400 font-medium truncate">
            {article.source}
          </p>
        )}
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
          {article.summary}
        </p>
        <div className="flex items-center justify-between pt-0.5">
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {article.publishedDate}
          </span>
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-brand-500 hover:underline"
          >
            PubMed
            <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </Card>
  );
}
