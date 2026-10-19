# Sanity CMS handover

## Layout and project

- Website: `D:\Projects\Truedge-digital-main`
- Standalone Studio: `D:\Projects\studio-truedge-website-main`
- Sanity project: `truedge-website-main` (`w5f40uwq`)
- Dataset: `production` (public published-content reads)
- Hosted Studio: https://truedge-website-main.sanity.studio/
- Website admin (verified live 20 October 2026): https://www.truedgedigital.co.uk/admin
- Deployed Studio application ID: `p3o38znrtb14kdnfqcf30o6p`
- Canonical website: `https://www.truedgedigital.co.uk` (the non-www site redirects here)

The Studio is a sibling application. It is **not included in commits made in the website repository**. Keep its source in a separate Git repository, or in a parent repository containing both folders. Do not move it into the Next.js app.

## Admin on your own domain

The editor now uses familiar **Pages / Posts / Categories / Authors** menus, **Content / SEO settings / FAQs** page tabs and **Post content / Post settings / SEO settings** post tabs. Plain-English helper text explains each field. Canonical URLs, noindex and custom structured data live in a collapsed Advanced SEO fieldset. Stored field names and document IDs were not changed. The developer query tool is labeled **Developer tools**.

The detailed editor handbook is `docs/seo-editor-guide.html`; a copy is delivered to `C:\Users\ABU BAKAR\Desktop\my father doc\Truedge Digital - SEO Editor Guide.html`. It includes WordPress comparisons, illustrated workflows, exact field meanings, article creation, FAQ replacement rules, publication/cache checks, a practice search preview, a checklist and troubleshooting. It is self-contained and printable.

`/admin` serves a static build of the standalone Studio from `public/admin`. Its source and dependencies remain in the sibling Studio folder; Next.js does not import or bundle the editor. The website repository intentionally tracks these generated static files, so a normal Vercel website deployment serves the dashboard without a second Vercel project or build-time Sanity token.

The editor uses the same project, dataset, content and Sanity accounts as the hosted Studio. `/admin` and all editor deep links serve the Studio HTML directly, without the marketing website's layout. Assets use `/admin/static/`. Robots rules, the HTML and HTTP headers prevent indexing. Authentication and project roles protect editing access.

Credential-enabled CORS origins have already been added for `https://www.truedgedigital.co.uk`, `https://truedgedigital.co.uk`, and `http://localhost:3000`. Preview deployment domains are not automatically authorized.

### Deploy now

1. Commit and push the website changes, including **all of `public/admin`** and the routing configuration.
2. Redeploy the existing website project in Vercel. No additional domain, DNS record, hosting project or admin environment variable is required.
3. Open `https://www.truedgedigital.co.uk/admin` and sign in with a Sanity account that has access to `w5f40uwq`. Invite other editors through Sanity Manage's project members screen.
4. Retain the CMS environment variables described below and enable the existing publish webhook after deployment.

The existing `sanity.studio` URL remains available. Once `/admin` is live, register the external Studio URL in Sanity if you use Dashboard, Canvas or other features that discover a Studio; registration is separate from serving the editor and does not affect ordinary editing.

### Update the admin build after schema or Studio changes

From the website folder:

```powershell
npm run admin:build
npm run build
```

Then commit the refreshed `public/admin` files and deploy the website. This local command requires the sibling Studio and its installed dependencies. If it is stored elsewhere, set `SANITY_STUDIO_SOURCE` to its absolute folder path. Normal Vercel builds use the committed files and do not run `admin:build`. Routine content edits and blog publishing require neither command nor a website redeployment.

## Run locally

Website terminal:

```powershell
cd "D:\Projects\Truedge-digital-main"
npm install
npm run dev
```

Website: `http://localhost:3000`.

Studio terminal:

```powershell
cd "D:\Projects\studio-truedge-website-main"
npm install
npx sanity login
npm run dev
```

Studio: `http://localhost:3333`. Sign in with an account that has access to `w5f40uwq`. The Studio and schema were successfully deployed after authentication. No replacement Sanity project or sample published content was created.

## Publish the Studio

From the Studio folder, after logging in:

```powershell
npx sanity schemas deploy
npx sanity deploy
```

The Studio is already hosted at https://truedge-website-main.sanity.studio/. Its application ID is saved in `sanity.cli.ts`, so future deployments update that same Studio. Give the URL to the SEO specialist and invite their account to this Sanity project with the appropriate editor role. Publishing the Studio does not publish any draft articles.

## Website environment variables in Vercel

Add these to Production (and Preview if you want to test the CMS there), then redeploy:

```env
NEXT_PUBLIC_SITE_URL=https://www.truedgedigital.co.uk
NEXT_PUBLIC_SANITY_PROJECT_ID=w5f40uwq
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-02-19
SANITY_REVALIDATE_SECRET=<copy-the-generated-value-from-your-local-.env.local>
```

The random webhook secret already exists in local `.env.local`. Keep it server-only; never give it a `NEXT_PUBLIC_` prefix. `.env.local` is ignored by Git. `.env.example` is a safe, committed reference with placeholders. Preserve the existing Turnstile and Google Apps Script variables for the contact form.

Published content uses the Sanity CDN and Next.js cache tags with a one-hour fallback refresh. A signed webhook invalidates the cache after publishing so editors do not have to redeploy the website. New post slugs work on demand after the website's initial build.

## Configure the publish webhook

**Verified live, 20 October 2026:** the deployed endpoint accepted a correctly signed request with HTTP **200** and rejected an unsigned request with **401**. The existing publishing webhook (`ikeC7JscuMdZYA7e`) is now **enabled**, with its signing secret matched to the deployed server. All 10 public routes, `/admin`, editor deep links, robots.txt and sitemap return 200. The live favicon matches the supplied icon. No test content was published. At this check the dataset had no published blog posts or page overrides, so the website correctly retains its existing fallback content.

The earlier missing Vercel environment variable has been resolved. The steps below are retained for future setup or recovery; no additional setup is currently required.

Add the existing local `SANITY_REVALIDATE_SECRET` value to **Vercel → this website project → Settings → Environment Variables → Production**, then redeploy. Do not paste the secret into chat or commit `.env.local`. The variable is server-only, without a `NEXT_PUBLIC_` prefix.

After deployment, run this from the sibling Studio folder (with an authorized Sanity login):

```powershell
npx sanity exec "D:\Projects\Truedge-digital-main\scripts\enable-sanity-webhook.ts" --with-user-token
```

The helper verifies a signed cache refresh against the real production endpoint first. Only if that succeeds does it enable the one existing production webhook and ensure its signing secret matches. It does not publish or change CMS content. If production still returns 503 or rejects the signature, the hook stays disabled and the script explains the missing step. A read-only audit is available via `sanity exec "D:\Projects\Truedge-digital-main\scripts\audit-sanity.ts" --with-user-token`.

The webhook **already exists and is enabled** in Sanity (ID `ikeC7JscuMdZYA7e`). If rebuilding this integration in another environment, keep the hook disabled until that environment's secret is deployed. Use the verified helper above to activate it, or ensure the same secret is configured before enabling it manually in Sanity Manage → API → Webhooks → **Truedge website revalidation**.

Its saved configuration is:

- Name: `Truedge website revalidation`
- URL: `https://www.truedgedigital.co.uk/api/revalidate`
- Dataset: `production`
- Method: `POST`
- Filter/projection API version: `v2025-02-19`
- Triggers: Create, Update, Delete
- Drafts: disabled
- Filter:

```groq
_type in ["pageSeo", "blogPost", "author", "category", "sanity.imageAsset"] && !(_id in path("drafts.**"))
```

- Projection:

```groq
{_id, _type}
```

- Secret: the **same value** as `SANITY_REVALIDATE_SECRET` in Vercel.

Use Sanity's Secret field so it signs the request. The endpoint does not accept an unauthenticated request or a secret in a query string. It clears `pageSeo`, `blogPost`, `author`, and `category` tags and refreshes the sitemap. A short propagation delay avoids refetching the CDN before Sanity has updated it.

If you ever need to prepare the webhook again, `npx sanity exec scripts/prepare-webhook.ts --with-user-token` from the Studio folder preserves an existing matching webhook instead of creating duplicates. Do not rotate the local secret without updating Vercel and the webhook together.

For local Studio access, add `http://localhost:3333` to the project's CORS origins if Sanity prompts. The hosted Studio's own origin must also be allowed (the deploy flow normally handles this). The website reads published data on the server; it does not send read tokens to visitors. Visual Editing and draft previews are outside this integration.

## Connected pages

All use `getRouteMetadata()` with existing metadata as fallback. Optional H1 and hero introduction overrides are wired into the actual hero component.

| Studio page | Route | FAQs |
| --- | --- | --- |
| Home page | `/` | Replace existing FAQs when provided |
| About us | `/about` | Add a FAQ section when provided |
| Web design | `/web-design` | Replace existing FAQs |
| Marketing | `/marketing` | Replace existing FAQs |
| AI automation | `/ai-automation` | Replace existing FAQs |
| Pricing | `/pricing` | Replace existing FAQs |
| Our work | `/works` | Add a FAQ section |
| Contact | `/contact` | Add a FAQ section |
| Services | `/services` | Replace existing FAQs |
| Blog index | `/blog` | Add a FAQ section |

Core pages are controlled singleton entries in the Studio's **Core Website Pages (SEO)** list. The initial document fills its name, route, and SEO object automatically. Publishing a new SEO document with blank H1/introduction keeps the designed copy. Leaving the FAQ list empty keeps the existing list. If no document exists, or the CMS cannot be reached, the existing static page continues to render.

The contact page renders on the server per request to preserve its enquiry query parameters and expose the real H1 in the initial HTML. Its CMS fetch still uses the same one-hour tagged cache.

## Editor workflow

1. **Core page SEO:** open its sidebar entry, edit Search & social fields and optional Page content / FAQs, then Publish.
2. Titles over 60 characters and descriptions over 160 show warnings rather than blocking publication.
3. **No index** hides the URL from search and removes it from the generated sitemap.
4. The focus keyword is internal tracking, not a meta keywords tag.
5. Canonical URLs normally generate automatically; set the override only intentionally.
6. **JSON-LD override** is advanced: valid JSON only, without `<script>` tags. It replaces automatic FAQ/BlogPosting structured data for that document.
7. **Blog:** create an author and categories, then a Blog Post. Add title, slug, excerpt, featured image with alt text, and body. Publish the author/categories before the post if you want them visible. The body supports H2–H4, quotes, lists, inline images/captions and link controls; the title supplies the only H1.
8. Only published posts whose publish date has arrived appear on the website. A future date is checked on the next refresh; it is not a Sanity scheduled-publishing job.

## Sitemap and Google

After deploying the website, submit `https://www.truedgedigital.co.uk/sitemap.xml` in Search Console. The sitemap combines core routes and published posts, excluding entries marked noindex. `robots.txt` points to it. The existing Google verification tag and Analytics measurement ID remain configured in the root layout.

## Developer verification

Website:

```powershell
npm run lint
npm run typecheck
npm run build
```

Studio:

```powershell
npm run typegen
npm run lint
npm run typecheck
npm run build
```

TypeGen reads `../Truedge-digital-main/lib/sanity/queries.ts` and writes `../Truedge-digital-main/sanity.types.ts`. Commit generated types with the frontend; rerun TypeGen after changing queries or schemas.

### Isolated publishing smoke test

Terminal 1, from the website folder:

```powershell
$env:SANITY_TEST_MODE='1'
$env:SANITY_REVALIDATE_SECRET='local-sanity-test-secret'
$env:NODE_OPTIONS='--require=D:/Projects/Truedge-digital-main/tests/fixtures/sanity.cjs'
npm run dev -- --port 3011
```

Terminal 2:

```powershell
node tests/sanity-smoke.mjs
```

These fixtures replace Sanity **query responses in the test process only** and use a separate `.next-sanity-test` build directory. They never write to Sanity or overwrite `.env.local`. Their artificial image asset tests generated image markup/URLs rather than a real uploaded asset. Stop Terminal 1 after testing and use a fresh terminal for normal development so test environment overrides are not retained.

Tests cover CMS metadata and hero copy, FAQ JSON-LD, safe escaping of custom JSON-LD, server-rendered contact headings, original metadata fallback, blog rendering, safe links and rel attributes, image alt text, one H1, missing articles, noindex sitemap exclusions, and unsigned/signed webhooks. Real published-content smoke checks also verify the empty dataset and successful production build.

## Versions

The integration updated Next.js and its matching ESLint configuration from 16.1.6 to 16.4.2 after the package audit identified critical advisories in the old version. React and React DOM are aligned to 19.2.8 for the Sanity peer requirements. Smaller existing transitive dependency advisories may remain; no forced major-version audit fixes were applied.
