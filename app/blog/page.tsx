import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getBlogPosts, getPageSeo, toPageContent } from '@/lib/sanity/data';
import { getRouteMetadata } from '@/lib/sanity/metadata';
import PageSeoData from '@/components/sanity/PageSeoData';
import SanityImage from '@/components/blog/SanityImage';
import styles from './blog.module.css';

export const revalidate = 3600;
export async function generateMetadata(): Promise<Metadata> {
  return getRouteMetadata('/blog', { title: 'Ideas & Insights | Truedge Digital', description: 'Clear, practical ideas for your website, marketing and automation. Insights from the team at Truedge Digital.' });
}

export default async function Blog() {
  const [page, result] = await Promise.all([getPageSeo('/blog'), getBlogPosts().then(posts => ({ posts, unavailable: false })).catch(() => ({ posts: [], unavailable: true }))]);
  const content = toPageContent(page);
  return <>
    <section className={`${styles.container} ${styles.hero}`}><h1>{content.h1Heading || <>Fresh thinking.<br /><em>Practical next steps.</em></>}</h1><p>{content.heroSubheading || 'Ideas for business owners who want to understand what works, make confident decisions and keep moving forward.'}</p></section>
    <section className={`${styles.container} ${styles.posts}`} aria-label="Latest articles">
      {result.posts.length ? <div className={styles.grid}>{result.posts.map(post => <article key={post._id} className={styles.card}><Link href={`/blog/${post.slug}`}>
        <div className={styles.cardImage}><SanityImage image={post.mainImage} width={850} /></div><div className={styles.cardCopy}>
          <div className={styles.cardMeta}><span>{post.categories?.find(category => category?.title)?.title || 'Insights'}</span>{post.publishedAt && <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })}</time>}</div>
          <h2>{post.title}</h2><p>{post.excerpt}</p><span className={styles.readLink}>Read the article <ArrowUpRight size={20} aria-hidden="true" /></span>
        </div></Link></article>)}</div> : <div className={styles.empty}><h2>{result.unavailable ? 'Our articles will be back shortly.' : 'Good ideas are on their way.'}</h2><p>{result.unavailable ? 'Please try again in a little while.' : 'We’re preparing practical insights for your next chapter. In the meantime, tell us what you’re working on.'}</p><Link href="/contact" className={styles.primary}>Let’s talk about your business <ArrowUpRight size={20} aria-hidden="true" /></Link></div>}
    </section>
    <PageSeoData page={page} renderFaqs />
  </>;
}
