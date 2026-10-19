import Link from 'next/link';
import { ArrowUpRight, BookOpen, Clock3 } from 'lucide-react';
import type { BLOG_LIST_NEWEST_QUERY_RESULT } from '@/sanity.types';
import { articleDate } from '@/lib/blog';
import SanityImage from './SanityImage';
import styles from '@/app/blog/blog.module.css';

export type JournalPost = BLOG_LIST_NEWEST_QUERY_RESULT['posts'][number];

export default function ArticleCard({ post, featured = false, index = 0 }: { post: JournalPost; featured?: boolean; index?: number }) {
  const category = post.categories?.find(item => item?.title);
  const date = articleDate(post.publishedAt);
  return <article className={`${styles.card} ${featured ? styles.featuredCard : ''} ${styles[`tone${index % 3}`]}`}>
    <Link href={`/blog/${encodeURIComponent(post.slug || '')}`} className={styles.cardLink}>
      <div className={styles.cardImage}>
        {post.mainImage?.asset ? <SanityImage image={post.mainImage} width={featured ? 1200 : 750} priority={featured} sizes={featured ? '(max-width: 760px) 92vw, 55vw' : '(max-width: 700px) 92vw, (max-width: 1100px) 45vw, 30vw'} /> : <div className={styles.imageFallback} aria-hidden="true"><BookOpen strokeWidth={1} /><span>Truedge journal</span></div>}
        <span className={styles.imageArrow} aria-hidden="true"><ArrowUpRight size={23} /></span>
      </div>
      <div className={styles.cardCopy}>
        <div className={styles.cardMeta}><span className={styles.categoryLabel}>{category?.title || 'Perspectives'}</span>{featured && <span className={styles.latestLabel}>Latest insight</span>}</div>
        <h2>{post.title || 'An insight from Truedge'}</h2>
        <p>{post.excerpt}</p>
        <div className={styles.cardFooter}>
          <div className={styles.byline}>{post.author?.name && <span className={styles.authorName}>{post.author.name}</span>}{date && <time dateTime={post.publishedAt || undefined}>{date}</time>}</div>
          <span className={styles.readingTime}><Clock3 size={14} aria-hidden="true" />{Math.max(1, post.readingMinutes || 1)} min read</span>
        </div>
        {featured && <span className={styles.featuredAction}>Read the story <ArrowUpRight size={21} aria-hidden="true" /></span>}
      </div>
    </Link>
  </article>;
}
