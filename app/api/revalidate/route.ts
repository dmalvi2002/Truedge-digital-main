import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ error: 'Revalidation is not configured.' }, { status: 503 });
  try {
    // Sanity signs the raw JSON body with the webhook's configured secret.
    // The delay prevents a fresh Next.js fetch from racing Sanity's CDN update.
    const { isValidSignature } = await parseBody(request, secret, true);
    if (!isValidSignature) return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 });
    for (const tag of ['pageSeo', 'blogPost', 'author', 'category']) revalidateTag(tag, { expire: 0 });
    revalidatePath('/sitemap.xml');
    return NextResponse.json({ revalidated: true });
  } catch {
    return NextResponse.json({ error: 'Invalid webhook request.' }, { status: 400 });
  }
}
