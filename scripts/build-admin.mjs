import { access, readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Studio source and dependencies stay in the standalone sibling application.
// Commit the resulting public/admin files so Vercel needs only this repository.
const website = fileURLToPath(new URL('../', import.meta.url));
const studio = path.resolve(process.env.SANITY_STUDIO_SOURCE || path.join(website, '..', 'studio-truedge-website-main'));
const cli = path.join(studio, 'node_modules', 'sanity', 'bin', 'sanity');
await access(cli).catch(() => {
  throw new Error(`Install dependencies in the standalone Studio first: ${studio}`);
});
const output = path.join(website, 'public', 'admin');
const inventory = spawnSync(process.execPath, [path.join(website, 'scripts', 'image-catalog.mjs')], { cwd: website, stdio: 'inherit' });
if (inventory.error) throw inventory.error;
if (inventory.status !== 0) process.exit(inventory.status || 1);
// Keep the small website-specific Studio inputs versioned with this repository.
const extensions = path.join(studio, 'website-images');
await mkdir(extensions, { recursive: true });
for (const file of ['PageImagesInput.tsx', 'ImageDetailsInput.tsx', 'pageImageFields.ts', 'page-image-catalog.json']) {
  await copyFile(path.join(website, 'sanity-admin', file), path.join(extensions, file));
}
async function registerInput(file, transform) {
  const target = path.join(studio, 'schemaTypes', file);
  const original = await readFile(target, 'utf8');
  const updated = transform(original);
  if (updated !== original) await writeFile(target, updated);
}
await registerInput('documents/pageSeo.ts', source => {
  if (source.includes('imageAltField,')) return source;
  const fields = 'fields:[';
  const groups = "{name:'faqs',title:'FAQs'}";
  if (!source.includes(fields) || !source.includes(groups)) throw new Error('Page schema changed: review image input registration.');
  return "import {imageAltField} from '../../website-images/pageImageFields';\n" + source
    .replace(groups, groups + ",{name:'images',title:'Images'}")
    .replace(fields, fields + '\n imageAltField,');
});
for (const file of ['documents/blogPost.ts', 'documents/author.ts', 'objects/seo.ts']) {
  await registerInput(file, source => {
    if (source.includes('ImageDetailsInput')) return source;
    const marker = "type:'image',options:{hotspot:true}";
    if (!source.includes(marker)) throw new Error(`Image schema changed: review ${file}.`);
    return "import {ImageDetailsInput} from '../../website-images/ImageDetailsInput';\n" + source
      .replaceAll(marker, "type:'image',components:{input:ImageDetailsInput},options:{hotspot:true}");
  });
}
const result = spawnSync(process.execPath, [cli, 'build', output, '--yes'], {
  cwd: studio,
  env: { ...process.env, SANITY_STUDIO_BASEPATH: '/admin' },
  stdio: 'inherit',
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status || 1);
const index = path.join(output, 'index.html');
const html = await readFile(index, 'utf8');
if (!html.includes('/admin/static/')) throw new Error('Studio assets must use /admin/static/.');
await writeFile(index, html
  .replaceAll('href="/static/', 'href="/admin/static/')
  .replace('<meta content="noindex" name="robots"/>', '<meta name="robots" content="noindex,nofollow"/>'));
console.log('Standalone Studio ready at /admin. Commit public/admin with the website.');
