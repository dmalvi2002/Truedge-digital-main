import { cache } from 'react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, SearchX } from 'lucide-react';
import { getBlogCategories, getBlogListing, getPageSeo, toPageContent } from '@/lib/sanity/data';
import { mergeSeoMetadata } from '@/lib/sanity/metadata';
import { BLOG_PAGE_SIZE, blogUrl, type BlogFilters } from '@/lib/blog';
import type { BLOG_CATEGORIES_QUERY_RESULT, BLOG_LIST_NEWEST_QUERY_RESULT, PAGE_SEO_BY_ROUTE_QUERY_RESULT } from '@/sanity.types';
import PageSeoData from '@/components/sanity/PageSeoData';
import JsonLd from '@/components/sanity/JsonLd';
import { siteUrl } from '@/lib/sanity/content';
import ArticleCard from './ArticleCard';
import BlogSearch from './BlogSearch';
import styles from '@/app/blog/blog.module.css';

type JournalData = {
  page: PAGE_SEO_BY_ROUTE_QUERY_RESULT;
  categories: BLOG_CATEGORIES_QUERY_RESULT;
  selected: BLOG_CATEGORIES_QUERY_RESULT[number] | null;
  posts: BLOG_LIST_NEWEST_QUERY_RESULT['posts'];
  total: number;
  unavailable: boolean;
  base: string;
};

export const getJournal = cache(async (category: string, q: string, sort: BlogFilters['sort'], pageNumber: number): Promise<JournalData> => {
  const [page, categoryResult] = await Promise.all([getPageSeo('/blog'), getBlogCategories().then(categories => ({ categories, failed: false })).catch(() => ({ categories: [], failed: true }))]);
  const base = category ? `/blog/category/${encodeURIComponent(category)}` : '/blog';
  const data: JournalData = { page, categories: categoryResult.categories, selected: null, posts: [], total: 0, unavailable: categoryResult.failed, base };
  if (categoryResult.failed) return data;
  data.selected = category ? data.categories.find(item => item.slug === category) || null : null;
  if (category && !data.selected) notFound();
  try {
    const result = await getBlogListing(data.selected?._id || '', q, sort, pageNumber);
    data.posts = result.posts;
    data.total = result.total;
  } catch {
    data.unavailable = true;
    return data;
  }
  const lastPage = Math.max(1, Math.ceil(data.total / BLOG_PAGE_SIZE));
  if (pageNumber > lastPage) redirect(blogUrl(base, { q, sort, page: lastPage }));
  return data;
});

export function journalMetadata(data: JournalData, filters: BlogFilters): Metadata {
  const category = data.selected;
  const fallback = {
    title: category ? `${category.title} insights | Truedge Digital` : 'Ideas & Insights | Truedge Digital',
    description: category?.description || 'Clear, practical ideas for your website, marketing and automation. Insights from the team at Truedge Digital.',
  };
  const metadata = mergeSeoMetadata(category ? { noIndex: data.page?.seo?.noIndex, ogImage: data.page?.seo?.ogImage } : data.page?.seo, fallback, data.base);
  if (filters.page > 1) {
    const title = typeof metadata.title === 'string' ? metadata.title : fallback.title;
    metadata.title = `${title} — Page ${filters.page}`;
    metadata.alternates = { canonical: siteUrl(blogUrl(data.base, { page: filters.page })) };
    metadata.openGraph = { ...metadata.openGraph, title: metadata.title, url: siteUrl(blogUrl(data.base, { page: filters.page })) };
    metadata.twitter = { ...metadata.twitter, title: metadata.title };
  }
  if (filters.q || filters.sort === 'oldest' || data.unavailable) metadata.robots = { index: false, follow: true };
  return metadata;
}

function Pagination({ base, filters, total }: { base: string; filters: BlogFilters; total: number }) {
  const pages = Math.ceil(total / BLOG_PAGE_SIZE);
  if (pages < 2) return null;
  const numbers = [...new Set([1, filters.page - 1, filters.page, filters.page + 1, pages])].filter(n => n > 0 && n <= pages).sort((a, b) => a - b);
  return <nav className={styles.pagination} aria-label="Article pages">
    {filters.page > 1 ? <Link rel="prev" prefetch={false} href={`${blogUrl(base, { ...filters, page: filters.page - 1 })}#journal`}><ArrowLeft size={18} />Previous</Link> : <span className={styles.disabledPage}><ArrowLeft size={18} />Previous</span>}
    <div className={styles.pageNumbers}>{numbers.map((number, index) => <span key={number}>{index > 0 && number - numbers[index - 1] > 1 && <span className={styles.ellipsis}>…</span>}<Link prefetch={false} href={`${blogUrl(base, { ...filters, page: number })}#journal`} aria-current={number === filters.page ? 'page' : undefined} aria-label={`Page ${number}`}>{number}</Link></span>)}</div>
    {filters.page < pages ? <Link rel="next" prefetch={false} href={`${blogUrl(base, { ...filters, page: filters.page + 1 })}#journal`}>Next<ArrowRight size={18} /></Link> : <span className={styles.disabledPage}>Next<ArrowRight size={18} /></span>}
  </nav>;
}

export default function Journal({ data, filters }: { data: JournalData; filters: BlogFilters }) {
  const content = toPageContent(data.page);
  const category = data.selected;
  const filtered = Boolean(category || filters.q);
  const start = (filters.page - 1) * BLOG_PAGE_SIZE + 1;
  return <>
    <section className={styles.heroSection}><div className={styles.container}>
      <div className={styles.heroTop}><span className={styles.journalLabel}>The Truedge journal</span><span className={styles.heroNote}>A little clarity.<br />A fresh perspective.</span></div>
      {category && <Link href="/blog" className={styles.archiveBack}><ArrowLeft size={16} />All insights</Link>}
      <div className={styles.hero}>
        <h1>{category ? <>Ideas on<br /><em>{category.title}.</em></> : content.h1Heading || <>Fresh thinking.<br /><em>Practical next steps.</em></>}</h1>
        <div className={styles.heroSide}><p>{category?.description || content.heroSubheading || 'Ideas for business owners who want to understand what works, make confident decisions and keep moving forward.'}</p><a href="#journal" className={styles.exploreLink}><span>Find your next idea</span><span className={styles.heroArrow}><ArrowDownRight size={25} aria-hidden="true" /></span></a></div>
      </div>
    </div></section>
    <section id="journal" className={styles.library} aria-labelledby="library-title"><div className={styles.container}>
      <div className={styles.libraryTop}><div><span className={styles.sectionLabel}>Worth a read</span><h2 id="library-title">{filters.q ? 'Let’s find your answer.' : category ? `${category.title} perspectives` : 'Ideas for your next chapter.'}</h2></div><span className={styles.libraryNote}>Less noise.<br />More useful thinking.</span></div>
      <BlogSearch base={data.base} filters={filters} />
      <nav className={styles.categoryNav} aria-label="Article categories"><Link prefetch={false} href={blogUrl('/blog', { q: filters.q, sort: filters.sort })} scroll={false} aria-current={!category ? 'page' : undefined}>All insights</Link>{data.categories.map(item => <Link key={item._id} prefetch={false} href={blogUrl(`/blog/category/${encodeURIComponent(item.slug || '')}`, { q: filters.q, sort: filters.sort })} scroll={false} aria-current={item._id === category?._id ? 'page' : undefined}>{item.title}<span>{item.postCount}</span></Link>)}</nav>
      <div className={styles.resultsLine}><p role="status">{data.unavailable ? 'Articles are temporarily unavailable' : data.total ? `${start}–${Math.min(filters.page * BLOG_PAGE_SIZE, data.total)} of ${data.total} ${data.total === 1 ? 'article' : 'articles'}${filters.q ? ` for “${filters.q}”` : ''}` : filters.q ? `No articles for “${filters.q}”` : 'A space for fresh perspectives'}</p>{filtered && <Link href="/blog" scroll={false}>Clear filters <ArrowUpRight size={15} /></Link>}</div>
      {data.posts.length ? <div className={styles.grid}>{data.posts.map((post, index) => <ArticleCard key={post._id} post={post} featured={!filtered && filters.sort === 'newest' && filters.page === 1 && index === 0} index={index} />)}</div> : <div className={styles.empty}>
        <span className={styles.emptyIcon} aria-hidden="true">{filtered ? <SearchX size={34} strokeWidth={1.3} /> : <BookOpen size={34} strokeWidth={1.3} />}</span>
        <div><h3>{data.unavailable ? 'A brief pause in the conversation.' : filtered ? 'A different angle might help.' : 'Good ideas take a little thought.'}</h3><p>{data.unavailable ? 'We couldn’t load the journal just now. Please try again in a moment.' : filtered ? 'Try a broader search, choose another topic, or explore all our insights.' : 'We’re putting together practical perspectives on websites, marketing and the way businesses work. Our first stories will be here soon.'}</p><Link href={data.unavailable ? data.base : filtered ? '/blog' : '/contact'} className={styles.darkButton}>{data.unavailable ? 'Try again' : filtered ? 'Explore all insights' : 'Ask us a question'}<ArrowUpRight size={19} /></Link></div>
      </div>}
      <Pagination base={data.base} filters={filters} total={data.total} />
    </div></section>
    <section className={styles.journalCta}><div className={`${styles.container} ${styles.journalCtaInner}`}><div><span className={styles.sectionLabel}>Take the next step</span><h2>Good questions.<br /><em>Better conversations.</em></h2></div><div><p>Have something specific in mind? Let’s talk about your business and work out what would actually help.</p><Link href="/contact" className={styles.primary}>Book a free strategy call <ArrowUpRight size={20} /></Link></div></div></section>
    {!category && <PageSeoData page={data.page} renderFaqs />}
    {category && <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl('/') }, { '@type': 'ListItem', position: 2, name: 'Journal', item: siteUrl('/blog') }, { '@type': 'ListItem', position: 3, name: category.title, item: siteUrl(data.base) }] }} />}
  </>;
}
