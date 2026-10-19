export const BLOG_PAGE_SIZE = 7;
export type BlogSearchParams = Record<string, string | string[] | undefined>;
export type BlogFilters = { q: string; sort: 'newest' | 'oldest'; page: number };

export function blogFilters(params: BlogSearchParams): BlogFilters {
  const value = (name: string) => typeof params[name] === 'string' ? params[name] as string : '';
  const requested = Number(value('page'));
  return {
    q: value('q').trim().replace(/\s+/g, ' ').slice(0, 120),
    sort: value('sort') === 'oldest' ? 'oldest' : 'newest',
    page: Number.isSafeInteger(requested) && requested > 0 ? Math.min(requested, 1000) : 1,
  };
}

export function searchPattern(search: string) {
  return (search.match(/[\p{L}\p{N}]+/gu) || []).map(word => `*${word}*`).join(' ') || '__no_search_terms__';
}

export function blogUrl(base: string, filters: Partial<BlogFilters> = {}) {
  const params = new URLSearchParams();
  if (filters.q) params.set('q', filters.q);
  if (filters.sort === 'oldest') params.set('sort', 'oldest');
  if (filters.page && filters.page > 1) params.set('page', String(filters.page));
  return base + (params.size ? `?${params}` : '');
}

export function articleDate(value?: string | null) {
  if (!value || !Number.isFinite(Date.parse(value))) return '';
  return new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}

export const headingId = (key: string) => `section-${key.replace(/[^a-zA-Z0-9_-]/g, '')}`;
