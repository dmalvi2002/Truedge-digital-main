import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/sanity/content';

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/admin', '/admin/'] }, sitemap: siteUrl('/sitemap.xml') };
}
