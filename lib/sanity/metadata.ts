import 'server-only';
import type { Metadata } from 'next';
import { getPageSeo } from './data';
import { urlFor } from './image';
import { siteUrl } from './content';
import type { PAGE_SEO_BY_ROUTE_QUERY_RESULT } from '@/sanity.types';

type SeoFields = Partial<NonNullable<NonNullable<PAGE_SEO_BY_ROUTE_QUERY_RESULT>['seo']>>;

export function mergeSeoMetadata(seo: SeoFields | null | undefined, fallback: Metadata, routePath: string): Metadata {
  const title = seo?.metaTitle?.trim() || fallback.title;
  const description = seo?.metaDescription?.trim() || fallback.description;
  const canonical = seo?.canonicalUrl || fallback.alternates?.canonical || siteUrl(routePath);
  const canonicalUrl = typeof canonical === 'object' && !(canonical instanceof URL) ? canonical.url : canonical;
  let image: string | undefined;
  if (seo?.ogImage?.asset) image = urlFor(seo.ogImage).width(1200).height(630).url();
  return {
    ...fallback, title, description,
    alternates: { ...fallback.alternates, canonical },
    openGraph: {
      ...fallback.openGraph, url: canonicalUrl, siteName: 'Truedge Digital',
      ...(typeof title === 'string' ? { title } : {}), ...(description ? { description } : {}),
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: seo?.ogImage?.alt || '' }] } : {}),
    },
    twitter: {
      card: 'summary_large_image', ...fallback.twitter,
      ...(typeof title === 'string' ? { title } : {}), ...(description ? { description } : {}),
      ...(image ? { images: [image] } : {}),
    },
    ...(typeof seo?.noIndex === 'boolean' ? { robots: { index: !seo.noIndex, follow: true } } : {}),
  };
}

export async function getRouteMetadata(routePath: string, fallback: Metadata): Promise<Metadata> {
  const page = await getPageSeo(routePath);
  if (!page) return fallback;
  return mergeSeoMetadata(page.seo, fallback, routePath);
}
