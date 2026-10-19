'use client';

import Form from 'next/form';
import Link from 'next/link';
import { ArrowUpRight, Search, X } from 'lucide-react';
import type { BlogFilters } from '@/lib/blog';
import styles from '@/app/blog/blog.module.css';

export default function BlogSearch({ base, filters }: { base: string; filters: BlogFilters }) {
  return <Form action={base} scroll={false} className={styles.searchForm}>
    <div className={styles.searchInput}>
      <Search size={20} aria-hidden="true" />
      <label htmlFor="journal-query" className={styles.srOnly}>Search articles</label>
      <input key={`${base}:${filters.q}`} id="journal-query" name="q" type="search" defaultValue={filters.q} maxLength={120} placeholder="What would you like to know?" />
      {filters.q && <Link href={base} scroll={false} className={styles.clearSearch} aria-label="Clear search and filters"><X size={17} /></Link>}
    </div>
    <div className={styles.sortField}>
      <label htmlFor="journal-sort">Sort by</label>
      <select key={`${base}:${filters.sort}`} id="journal-sort" name="sort" defaultValue={filters.sort} onChange={event => event.currentTarget.form?.requestSubmit()}>
        <option value="newest">Newest first</option><option value="oldest">Oldest first</option>
      </select>
    </div>
    <button type="submit" className={styles.searchButton}>Search <ArrowUpRight size={18} aria-hidden="true" /></button>
  </Form>;
}
