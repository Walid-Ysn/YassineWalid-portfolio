import { motion } from 'framer-motion';
import { ExternalLink, MessageCircle, RefreshCw, Star } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface HackerNewsHit {
  objectID: string;
  title?: string;
  url?: string;
  story_url?: string;
  author?: string;
  created_at?: string;
  points?: number;
  num_comments?: number;
}

const NEWS_ENDPOINT =
  'https://hn.algolia.com/api/v1/search_by_date?query=data%20science&tags=story&hitsPerPage=6';

export default function News() {
  const { locale, t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true });
  const [articles, setArticles] = useState<HackerNewsHit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadNews = useCallback(async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      setError(false);
      const response = await fetch(NEWS_ENDPOINT, { signal });

      if (!response.ok) {
        throw new Error('Unable to fetch news');
      }

      const data = (await response.json()) as { hits?: HackerNewsHit[] };
      setArticles((data.hits ?? []).filter((article) => article.title));
    } catch (fetchError) {
      if (fetchError instanceof DOMException && fetchError.name === 'AbortError') {
        return;
      }
      console.error('Unable to load data-analysis news:', fetchError);
      setError(true);
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void loadNews(controller.signal);
    return () => controller.abort();
  }, [loadNews]);

  const dateLocale = useMemo(() => {
    if (locale === 'fr') return 'fr-FR';
    if (locale === 'ar') return 'ar-MA';
    return 'en-US';
  }, [locale]);

  const formatDate = (date?: string) => {
    if (!date) return '';
    return new Intl.DateTimeFormat(dateLocale, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(date));
  };

  const getStoryUrl = (article: HackerNewsHit) =>
    article.url || article.story_url || `https://news.ycombinator.com/item?id=${article.objectID}`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  return (
    <section id="news" className="bg-secondary/25 py-20 md:py-28">
      <div className="container max-w-6xl">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="accent-line mb-4" />
              <h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">{t('news.title')}</h2>
              <p className="max-w-2xl text-lg text-muted-foreground">{t('news.subtitle')}</p>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => void loadNews()}
              disabled={loading}
              className="w-fit border-primary text-primary hover:bg-primary/10"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
              {t('news.refresh')}
            </Button>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" aria-label={t('news.loading')}>
              {[0, 1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="rounded-lg border border-border bg-card p-6">
                  <div className="mb-5 h-4 w-28 animate-pulse rounded bg-muted" />
                  <div className="mb-3 h-6 animate-pulse rounded bg-muted" />
                  <div className="mb-2 h-4 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-8 text-center">
              <p className="mb-5 text-destructive">{t('news.error')}</p>
              <Button type="button" variant="outline" onClick={() => void loadNews()}>
                {t('news.retry')}
              </Button>
            </div>
          ) : articles.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-card p-8 text-center">
              <p className="mb-5 text-muted-foreground">{t('news.empty')}</p>
              <a
                href="https://hn.algolia.com/?q=data%20science"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                {t('news.openSource')}
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <motion.a
                  key={article.objectID}
                  variants={itemVariants}
                  href={getStoryUrl(article)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/60 hover:bg-card/80"
                >
                  <div className="mb-5 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    <span>Hacker News</span>
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h3 className="mb-4 line-clamp-3 text-xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
                    {article.title}
                  </h3>
                  <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
                    {article.created_at && <span>{formatDate(article.created_at)}</span>}
                    {typeof article.points === 'number' && (
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-3.5 w-3.5" aria-hidden="true" />
                        {article.points}
                      </span>
                    )}
                    {typeof article.num_comments === 'number' && (
                      <span className="inline-flex items-center gap-1">
                        <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        {article.num_comments}
                      </span>
                    )}
                  </div>
                </motion.a>
              ))}
            </div>
          )}

          <motion.p variants={itemVariants} className="mt-6 text-sm text-muted-foreground">
            {t('news.sourceNote')}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
