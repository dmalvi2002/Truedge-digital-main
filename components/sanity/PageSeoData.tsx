import type { PAGE_SEO_BY_ROUTE_QUERY_RESULT } from '@/sanity.types';
import { getFaqs, parseStructuredData, type PageContent } from '@/lib/sanity/content';
import JsonLd from './JsonLd';
import FaqSection from '@/components/FaqSection';

export default function PageSeoData({ page, renderFaqs = false }: { page: PAGE_SEO_BY_ROUTE_QUERY_RESULT; renderFaqs?: boolean }) {
  const faqs = getFaqs(page as PageContent);
  const custom = parseStructuredData(page?.seo?.structuredData);
  const faqData = faqs.length ? {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  } : null;
  return <><JsonLd data={custom || faqData} />{renderFaqs && faqs.length > 0 && <FaqSection faqs={faqs} />}</>;
}
