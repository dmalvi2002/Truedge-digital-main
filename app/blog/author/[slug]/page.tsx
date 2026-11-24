import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/sanity/JsonLd';
import SanityImage from '@/components/blog/SanityImage';
import { getBlogAuthor } from '@/lib/sanity/data';
import { mergeSeoMetadata } from '@/lib/sanity/metadata';
import { siteUrl } from '@/lib/sanity/content';
import styles from '../../blog.module.css';

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const author = await getBlogAuthor(slug);
  if (!author) notFound();
  return mergeSeoMetadata(undefined, {
    title: `${author.name} | Truedge Digital`,
    description: author.bio || `Articles by ${author.name} for the Truedge Digital journal.`,
  }, `/blog/author/${encodeURIComponent(slug)}`);
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = await getBlogAuthor(slug);
  if (!author) notFound();
  const url = siteUrl(`/blog/author/${encodeURIComponent(slug)}`);

  return <article className={`${styles.container} ${styles.article}`}>
    <JsonLd data={{
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      url,
      mainEntity: {
        '@type': 'Person', '@id': `${url}#person`, name: author.name, url,
        jobTitle: author.role || undefined, description: author.bio || undefined,
        image: author.avatar?.asset?.url || undefined,
      },
    }} />
    <Link href="/blog" className={styles.back}>All articles</Link>
    <header className={styles.articleHeader}>
      <SanityImage image={author.avatar} width={112} sizes="112px" className="mx-auto mb-6 aspect-square rounded-full object-cover" />
      <h1>{author.name}</h1>
      {author.role && <p className={styles.excerpt}>{author.role}</p>}
      {author.bio && <p className={styles.excerpt}>{author.bio}</p>}
    </header>
    {author.posts.length > 0 && <section className={styles.related} aria-labelledby="author-articles">
      <h2 id="author-articles">Articles by {author.name}</h2>
      <ul className="space-y-4">
        {author.posts.map(post => <li key={post.slug}><Link className="underline underline-offset-4" href={`/blog/${encodeURIComponent(post.slug)}`}>{post.title}</Link></li>)}
      </ul>
    </section>}
  </article>;
}
