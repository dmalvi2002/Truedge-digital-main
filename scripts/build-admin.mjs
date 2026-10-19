import { access, readFile, writeFile } from 'node:fs/promises';
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
