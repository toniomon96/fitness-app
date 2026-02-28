import type { HealthArticle, LearningCategory } from '../types';
import { getArticleCache, setArticleCache } from '../utils/localStorage';
import { apiBase } from '../lib/api';

const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

export async function fetchArticlesByCategory(
  category: LearningCategory,
  limit = 5,
): Promise<HealthArticle[]> {
  const cache = getArticleCache();
  const lastFetched = cache.lastFetchedAt[category];
  const cached = cache.articles.filter((a) => a.category === category);

  // Serve from cache if fresh
  if (lastFetched && cached.length > 0) {
    const age = Date.now() - new Date(lastFetched).getTime();
    if (age < CACHE_TTL_MS) return cached.slice(0, limit);
  }

  const res = await fetch(`${apiBase}/api/articles?category=${category}&limit=${limit}`);
  if (!res.ok) {
    const data = (await res.json().catch(() => ({ error: 'Request failed' }))) as {
      error?: string;
    };
    throw new Error(data.error ?? `HTTP ${res.status}`);
  }

  const { articles } = (await res.json()) as { articles: HealthArticle[] };

  // Merge into cache (replace this category's articles)
  setArticleCache({
    articles: [...cache.articles.filter((a) => a.category !== category), ...articles],
    lastFetchedAt: {
      ...cache.lastFetchedAt,
      [category]: new Date().toISOString(),
    },
  });

  return articles;
}
