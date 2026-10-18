import 'server-only';
import { cache } from 'react';
import { sanityFetch } from './client';
import { PAGE_SEO_BY_ROUTE_QUERY, ALL_BLOG_POSTS_QUERY, BLOG_POST_BY_SLUG_QUERY, SITEMAP_SLUGS_QUERY, PAGE_SITEMAP_QUERY } from './queries';
import type { PAGE_SEO_BY_ROUTE_QUERY_RESULT, ALL_BLOG_POSTS_QUERY_RESULT, BLOG_POST_BY_SLUG_QUERY_RESULT, SITEMAP_SLUGS_QUERY_RESULT, PAGE_SITEMAP_QUERY_RESULT } from '@/sanity.types';
import type { PageContent } from './content';

export const getPageSeo = cache(async (routePath: string) => {
  try {
    return await sanityFetch<PAGE_SEO_BY_ROUTE_QUERY_RESULT>({ query: PAGE_SEO_BY_ROUTE_QUERY, params: { routePath }, tags: ['pageSeo'] });
  } catch (error) {
    console.warn(`[Sanity] Page SEO unavailable for ${routePath}; using existing content.`, error instanceof Error ? error.message : 'Fetch failed');
    return null;
  }
});

export function toPageContent(page: PAGE_SEO_BY_ROUTE_QUERY_RESULT): PageContent {
  return {
    h1Heading: page?.h1Heading?.trim() || undefined,
    heroSubheading: page?.heroSubheading?.trim() || undefined,
    faqs: page?.faqs?.filter((faq): faq is typeof faq & {question: string; answer: string} => Boolean(faq.question?.trim() && faq.answer?.trim())).map(({ question, answer }) => ({ question, answer })) ?? [],
  };
}

export const getBlogPosts = cache(async () => sanityFetch<ALL_BLOG_POSTS_QUERY_RESULT>({ query: ALL_BLOG_POSTS_QUERY, tags: ['blogPost', 'author', 'category'] }));
export const getBlogPost = cache(async (slug: string) => sanityFetch<BLOG_POST_BY_SLUG_QUERY_RESULT>({ query: BLOG_POST_BY_SLUG_QUERY, params: { slug }, tags: ['blogPost', 'author', 'category'] }));
export const getBlogSlugs = cache(async () => sanityFetch<SITEMAP_SLUGS_QUERY_RESULT>({ query: SITEMAP_SLUGS_QUERY, tags: ['blogPost'] }));
export const getPageSitemap = cache(async () => sanityFetch<PAGE_SITEMAP_QUERY_RESULT>({ query: PAGE_SITEMAP_QUERY, tags: ['pageSeo'] }));
