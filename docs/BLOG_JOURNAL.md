# Blog and journal

The website reads the existing Sanity `blogPost`, `category`, `author` and `/blog` page settings. No new content types or sample CMS records are needed.

## Publishing from /admin

1. Open **Categories**, enter a short name, generate its **Category URL**, add an introduction and publish. Its archive is `/blog/category/your-topic`.
2. Publish the author if they do not exist yet.
3. Open **Posts** and complete the title, excerpt, featured image/alt text and article body. Use Heading 2 for main sections; these automatically form the article navigation.
4. Generate the post permalink, choose a current/past publication date, and select an author and relevant categories.
5. Review SEO settings and publish. Existing publishing webhooks refresh the website. A future publication date still relies on a later cache refresh, rather than an exact scheduler.

The first selected category appears on the card; all assigned categories appear on the article. The latest article is the lead card on the unfiltered first page. Cards, reading time, related articles, topic counts and pagination are generated automatically.

Edit **Pages → Blog index** to change the main H1, introduction, SEO settings and optional FAQs. Card layouts and search behavior are controlled by the website.

## Search and indexing

- `/blog`: journal index; seven posts per page.
- `/blog?q=website`: search published titles, excerpts and article text.
- `/blog?sort=oldest`: oldest-first order; newest is the default.
- `/blog?page=2`: shareable, self-canonical pagination.
- `/blog/category/marketing`: category archive; supports the same search/sort/pagination controls.
- Search and oldest-first variants are noindex/follow. Non-empty category archives enter the sitemap unless the blog index is marked noindex.
- Drafts and future-dated articles are excluded. Published noindex articles remain readable and listed, but are excluded from the article sitemap.
- Ask the developer for redirects before changing a published post or category URL.

## Validation

`tests/fixtures/sanity.cjs` supplies isolated sample data only when `SANITY_TEST_MODE=1`; it never writes to Sanity. Build/start with that flag, `NODE_OPTIONS=--require=D:/Projects/Truedge-digital-main/tests/fixtures/sanity.cjs`, and the local test webhook secret. Run `node tests/sanity-smoke.mjs` and `node tests/journal-smoke.mjs` against port 3011.

The production build uses the real dataset. At implementation time it contained no published posts or categories, so the public journal intentionally shows its empty state until content is published.

## Studio source and deployment

Category descriptions and required archive slugs were updated in the existing sibling Studio at `D:/Projects/studio-truedge-website-main/schemaTypes/documents/`. The updated `/admin` bundle is included in `public/admin` by `npm run admin:build`. Preserve those source changes in the Studio project as well as deploying the website changes. No new Vercel environment variables are needed.
