export type CmsFaq = { question: string; answer: string };
export type PageContent = {
  h1Heading?: string | null;
  heroSubheading?: string | null;
  faqs?: CmsFaq[];
};

export function getFaqs(content?: PageContent): CmsFaq[] {
  return content?.faqs?.filter(faq => faq.question?.trim() && faq.answer?.trim()) ?? [];
}

export function safeHref(value: unknown): string | undefined {
  if (typeof value !== 'string') return;
  const href = value.trim();
  if (/^(\/(?!\/)|#|https?:\/\/|mailto:|tel:)/i.test(href)) return href;
}

export function parseStructuredData(raw?: string | null): Record<string, unknown> | Record<string, unknown>[] | null {
  if (!raw?.trim()) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (Array.isArray(value)) return value.every(item => item && typeof item === 'object' && !Array.isArray(item)) ? value : null;
    return value && typeof value === 'object' ? value as Record<string, unknown> : null;
  } catch { return null; }
}

export const coreRoutes = ['/', '/about', '/web-design', '/marketing', '/ai-automation', '/pricing', '/works', '/contact', '/blog'] as const;

export function siteUrl(path = '/') {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.truedgedigital.co.uk';
  return new URL(path, origin).toString();
}
