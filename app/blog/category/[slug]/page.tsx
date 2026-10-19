import type { Metadata } from 'next';
import Journal, { getJournal, journalMetadata } from '@/components/blog/Journal';
import { blogFilters, type BlogSearchParams } from '@/lib/blog';

export const revalidate = 3600;
type Props = { params: Promise<{ slug: string }>; searchParams: Promise<BlogSearchParams> };

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const filters = blogFilters(query);
  return journalMetadata(await getJournal(slug, filters.q, filters.sort, filters.page), filters);
}

export default async function CategoryArchive({ params, searchParams }: Props) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const filters = blogFilters(query);
  return <Journal data={await getJournal(slug, filters.q, filters.sort, filters.page)} filters={filters} />;
}
