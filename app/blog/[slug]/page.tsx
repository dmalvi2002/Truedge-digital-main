import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { client } from '@/lib/sanity/client';
import { BLOG_STATIC_PARAMS_QUERY } from '@/lib/sanity/queries';
import { getBlogPost, getRelatedBlogPosts } from '@/lib/sanity/data';
import { headingId } from '@/lib/blog';
import ArticleCard from '@/components/blog/ArticleCard';
import { mergeSeoMetadata } from '@/lib/sanity/metadata';
import { parseStructuredData, siteUrl } from '@/lib/sanity/content';
import { urlFor } from '@/lib/sanity/image';
import JsonLd from '@/components/sanity/JsonLd';
import SanityImage from '@/components/blog/SanityImage';
import PortableTextBody from '@/components/blog/PortableTextBody';
import type { BLOG_STATIC_PARAMS_QUERY_RESULT } from '@/sanity.types';
import styles from '../blog.module.css';

export const revalidate = 3600;
export const dynamicParams = true;
type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  // All published posts (including noindex posts) may be visited; sitemap exclusions are separate.
  const slugs = await client.withConfig({ useCdn: false }).fetch<BLOG_STATIC_PARAMS_QUERY_RESULT>(BLOG_STATIC_PARAMS_QUERY, {}, { next: { revalidate: 3600, tags: ['blogPost'] } });
  return slugs.filter(post => post.slug).map(post => ({ slug: post.slug! }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: 'Article not found | Truedge Digital', robots: { index: false } };
  const seo = { ...post.seo, ogImage: post.seo?.ogImage || post.mainImage };
  return mergeSeoMetadata(seo, {
    title: post.title || 'Insights | Truedge Digital', description: post.excerpt,
    openGraph: { type: 'article', publishedTime: post.publishedAt || undefined, modifiedTime: post.updatedAt || post._updatedAt, authors: post.author?.name ? [post.author.name] : undefined },
  }, `/blog/${slug}`);
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();
  const related = await getRelatedBlogPosts(post._id, post.categories?.flatMap(category => category ? [category._id] : []) || []).catch(() => []);
  const headings = post.body?.flatMap(block => block._type === 'block' && block.style === 'h2' ? [{ id: headingId(block._key), title: block.children?.map(child => child.text).join('') || '' }] : []) || [];
  const words = post.body?.flatMap(block => block._type === 'block' ? block.children?.map(child => child.text) : []).join(' ').split(/\s+/).length || 0;
  const custom = parseStructuredData(post.seo?.structuredData);
  const articleData = {
    '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, description: post.excerpt,
    url: post.seo?.canonicalUrl || siteUrl(`/blog/${slug}`), mainEntityOfPage: post.seo?.canonicalUrl || siteUrl(`/blog/${slug}`),
    datePublished: post.publishedAt, dateModified: post.updatedAt || post._updatedAt || post.publishedAt,
    ...(post.mainImage?.asset ? { image: [urlFor(post.mainImage).width(1600).url()] } : {}),
    author: post.author?.name ? { '@type': 'Person', name: post.author.name } : { '@type': 'Organization', name: 'Truedge Digital', url: siteUrl() },
    publisher: { '@type': 'Organization', name: 'Truedge Digital', url: siteUrl() },
  };
  return <article className={`${styles.container} ${styles.article}`}>
    <JsonLd data={custom || articleData} />
    <Link href="/blog" className={styles.back}><ArrowLeft size={17} aria-hidden="true" /> All articles</Link>
    <header className={styles.articleHeader}><div className={styles.categories}>{post.categories?.map(category => category && (category.slug ? <Link key={category._id} href={`/blog/category/${encodeURIComponent(category.slug)}`}>{category.title}</Link> : <span key={category._id}>{category.title}</span>))}</div><h1>{post.title}</h1><p className={styles.excerpt}>{post.excerpt}</p>
      <div className={styles.articleMeta}>{post.author?.name && <span>{post.author.name}{post.author.role && ` · ${post.author.role}`}</span>}{post.publishedAt && <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}</time>}<span>{Math.max(1, Math.ceil(words / 220))} min read</span></div>
    </header>
    {post.mainImage?.asset && <figure className={styles.featureImage}><SanityImage image={post.mainImage} priority />{post.mainImage?.caption && <figcaption>{post.mainImage.caption}</figcaption>}</figure>}
    <div className={styles.readingLayout}>
    <nav className={styles.contents} aria-label="On this page"><h2>On this page</h2>{headings.map(heading => <a key={heading.id} href={`#${heading.id}`}>{heading.title}</a>)}<Link href="/blog">Explore all insights ↗</Link></nav>
    <div className={styles.prose}><PortableTextBody body={post.body} />
      {post.author?.name && <aside className={styles.author}>{post.author.avatar?.asset && <SanityImage image={post.author.avatar} width={100} />}<div><h2>{post.author.name}</h2>{post.author.role && <span>{post.author.role}</span>}{post.author.bio && <p>{post.author.bio}</p>}</div></aside>}
      <div className={styles.articleCta}><h2>Let’s put your next idea to work.</h2><p>Talk to our team about what this could mean for your business.</p><Link href="/contact" className={styles.primary}>Book a free strategy call <ArrowUpRight size={19} aria-hidden="true" /></Link></div>
    </div>
    </div>
    {related.length > 0 && <section className={styles.related} aria-labelledby="related-title"><h2 id="related-title">Keep the ideas flowing.</h2><div className={styles.grid}>{related.map((item, index) => <ArticleCard key={item._id} post={{ ...item, author: item.author ? { ...item.author, avatar: null } : null }} index={index} />)}</div></section>}
  </article>;
}
