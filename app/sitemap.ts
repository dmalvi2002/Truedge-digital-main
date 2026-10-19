import type { MetadataRoute } from 'next';
import { getBlogSlugs, getPageSitemap, getBlogCategories } from '@/lib/sanity/data';
import { coreRoutes, siteUrl } from '@/lib/sanity/content';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [postResult, pageResult, categoryResult] = await Promise.allSettled([getBlogSlugs(), getPageSitemap(), getBlogCategories()]);
  const pages = pageResult.status === 'fulfilled' ? pageResult.value : [];
  const posts = postResult.status === 'fulfilled' ? postResult.value : [];
  if (postResult.status === 'rejected' || pageResult.status === 'rejected') console.warn('[Sanity] Sitemap is using available routes; CMS could not be fully fetched.');
  const staticPages: MetadataRoute.Sitemap = coreRoutes.filter(route => !pages.some(page => page.routePath === route && page.noIndex)).map(route => {
    const page = pages.find(page => page.routePath === route);
    return { url: siteUrl(route), ...(page?._updatedAt ? { lastModified: page._updatedAt } : {}), changeFrequency: 'weekly', priority: route === '/' ? 1 : .7 };
  });
  const categories = categoryResult.status === 'fulfilled' && !pages.some(page => page.routePath === '/blog' && page.noIndex) ? categoryResult.value.filter(category => category.slug && category.postCount > 0).map(category => ({ url: siteUrl(`/blog/category/${encodeURIComponent(category.slug!)}`), changeFrequency: 'weekly' as const, priority: .5 })) : [];
  return [...staticPages, ...categories, ...posts.filter(post => post.slug).map(post => ({ url: siteUrl(`/blog/${post.slug}`), lastModified: post.updatedAt || post._updatedAt || post.publishedAt || undefined, changeFrequency: 'monthly' as const, priority: .6 }))];
}
