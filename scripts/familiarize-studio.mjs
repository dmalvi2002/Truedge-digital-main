import {readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// Labels/help text only: stored field names, IDs and existing content are unchanged.
const root = path.resolve(fileURLToPath(new URL('../../studio-truedge-website-main/', import.meta.url)));
async function update(file, edits) {
  const target = path.join(root, file);
  let text = await readFile(target, 'utf8');
  for (const [before, after] of edits) {
    if (text.includes(after)) continue;
    if (!text.includes(before)) throw new Error(`Expected text not found in ${file}: ${before}`);
    text = text.replace(before, after);
  }
  await writeFile(target, text);
}
await update('structure.ts', [
  ["title('Truedge Digital')", "title('Website content')"],
  ["title('Core Website Pages (SEO)')", "title('Pages')"],
  ["S.list().title('Core Website Pages (SEO)')", "S.list().title('Pages')"],
  ["title('Blog Posts')", "title('Posts')"],
  ["S.documentTypeListItem('author').title('Authors'),S.documentTypeListItem('category').title('Categories')", "S.documentTypeListItem('category').title('Categories'),S.documentTypeListItem('author').title('Authors')"],
]);
await update('sanity.config.ts', [
  ["structureTool({structure}),visionTool()", "structureTool({structure,title:'Website editor'}),visionTool({title:'Developer tools'})"],
]);
await update('schemaTypes/documents/pageSeo.ts', [
  ["title:'Core page SEO'", "title:'Website page'"],
  ["title:'Page content'", "title:'Content'"],
  ["title:'Search & social'", "title:'SEO settings'"],
  ["name:'pageName',title:'Page name'", "name:'pageName',title:'Page name (in admin)',description:'An admin label only. Changing this does not change the heading visitors see.'"],
  ["title:'Website route'", "title:'Page URL (fixed)'"],
  ["title:'Main page heading (H1)'", "title:'Page heading (H1)'"],
  ["title:'Hero introduction'", "title:'Page introduction'"],
  ["Optional. Leave blank to preserve the current designed heading.", "The large heading visitors see. Leave empty to keep the website’s original heading. Use plain text; do not paste HTML."],
  ["Optional. Leave blank to preserve the current introduction.", "The short text below the main heading. Leave empty to keep the original introduction."],
  ["name:'seo',title:'Search & social'", "name:'seo',title:'SEO settings'"],
  ["Published items replace the page’s existing FAQ list, or add one if the page has none. Matching FAQ structured data is generated automatically.", "Add complete questions and answers. Publishing a non-empty list replaces ALL original FAQs on this page. An empty list keeps the original FAQs where available. Matching FAQ schema is automatic."],
]);
await update('schemaTypes/objects/seo.ts', [
  ["title:'Search & social settings',type:'object',fields:[", "title:'SEO settings',type:'object',fieldsets:[{name:'advanced',title:'Advanced SEO — change only when needed',options:{collapsible:true,collapsed:true}}],fields:["],
  ["title:'Meta title'", "title:'SEO title (Google)'"],
  ["Search result title. Aim for 60 characters or fewer.", "Like the SEO title in Yoast or Rank Math. Write a unique, useful title. Around 60 characters is a guide, not a Google limit. Leave empty to use the existing page title (or post title)."],
  ["title:'Meta description',type:'text',rows:3", "title:'Meta description',type:'text',rows:3,description:'A short summary for search results. Aim for about 150–160 characters. Google may choose different text. Leave empty to use existing page copy or the post excerpt.'"],
  ["title:'Focus keyword (internal)'", "title:'Focus keyword (planning only)'"],
  ["For your planning only. Not rendered as an obsolete meta keywords tag.", "Your main search phrase for planning. This does not create a score, guarantee rankings or add a keywords meta tag."],
  ["title:'Canonical URL override',type:'url'", "title:'Canonical URL override',type:'url',fieldset:'advanced'"],
  ["title:'Social sharing image'", "title:'Social sharing image (Facebook / LinkedIn)'"],
  ["Recommended: 1200 × 630 pixels.", "Recommended: 1200 × 630 pixels. This changes the shared-link image, not the page hero. Posts use their featured image when this is empty."],
  ["title:'Hide from search engines',type:'boolean'", "title:'Hide from Google (noindex)',type:'boolean',fieldset:'advanced'"],
  ["Also removes this URL from the sitemap.", "Normally leave OFF for public pages. ON asks search engines not to index this URL and removes it from the sitemap. It does not make the page private or remove it from the blog list."],
  ["title:'Custom JSON-LD override',type:'text'", "title:'Custom structured data (JSON-LD)',type:'text',fieldset:'advanced'"],
  ["Advanced: valid JSON only, without script tags. Replaces automatic structured data on this page.", "For an SEO specialist/developer only. Leave empty for automatic FAQ or blog schema. Valid JSON only, without script tags. This REPLACES automatic schema for this document."],
]);
await update('schemaTypes/documents/blogPost.ts', [
  ["title:'Blog post'", "title:'Post'"],
  ["title:'Article',default:true", "title:'Post content',default:true"],
  ["title:'Publishing'", "title:'Post settings'"],
  ["title:'Search & social'", "title:'SEO settings'"],
  ["name:'title',type:'string'", "name:'title',title:'Post title (H1)',description:'The main heading of the article. Do not add another H1 in the body.',type:'string'"],
  ["name:'slug',type:'slug'", "name:'slug',title:'URL slug (permalink)',description:'Use Generate after writing the title. Example: local-seo-for-salons. Avoid changing after publishing: a redirect needs a developer.',type:'slug'"],
  ["title:'Publish date'", "title:'Publication date & time'"],
  ["A future date keeps the article off the website until that time and the next refresh.", "For publishing now, choose now or a past time. A future date hides this post until that time AND a later website cache refresh; this is not an exact-time scheduler."],
  ["title:'Significant update date'", "title:'Last major update (optional)'"],
  ["name:'excerpt',type:'text'", "name:'excerpt',title:'Excerpt (short summary)',description:'Shown on the blog card and below the post title. Also used as the meta description when no SEO description is entered.',type:'text'"],
  ["title:'Featured image',type:'image'", "title:'Featured image',description:'The main article image, also used on blog cards. Add an accurate image description (alt text).',type:'image'"],
  ["name:'author',type:'reference'", "name:'author',title:'Author',description:'Select an existing author. Publish a new author before linking it to a post.',type:'reference'"],
  ["name:'categories',type:'array'", "name:'categories',title:'Categories',description:'Choose relevant topics. These display as labels; category archive pages are not currently available.',type:'array'"],
  ["title:'Article body'", "title:'Post body'"],
  ["title:'SEO overrides'", "title:'SEO settings'"],
]);
console.log('Updated familiar Studio labels and help text; no content was edited.');
