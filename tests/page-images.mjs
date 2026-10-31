import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import ts from 'typescript';
const code=ts.transpileModule(await fs.readFile('lib/sanity/page-images.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText;
const {imageSettingKey,resolveImageAlt}=await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
const catalog=JSON.parse(await fs.readFile('sanity-admin/page-image-catalog.json','utf8'));
for(const [route,entries] of Object.entries(catalog)){
  assert(entries.length,route);
  const sources=new Set();
  for(const entry of entries){assert.equal(imageSettingKey(entry.source),entry.key);assert(!sources.has(entry.source));sources.add(entry.source);if(entry.source.startsWith('/')){assert(entry.bytes>0,entry.source);assert(entry.width>0&&entry.height>0,entry.source);}}
}
const source='/assets/works/sanchez-arsenal.webp',key=imageSettingKey(source);
const settings=[{routePath:'/about',imageAlt:{[key]:{alt:'  Context for about  '}}},{routePath:'/pricing',imageAlt:{[key]:{decorative:true}}}];
assert.equal(resolveImageAlt(settings,'/about',source,'Original'),'Context for about');
assert.equal(resolveImageAlt(settings,'/pricing',source,'Original'),'');
assert.equal(resolveImageAlt(settings,'/works',source,'Original'),'Original');
assert.equal(resolveImageAlt([{routePath:'/about',imageAlt:{[key]:{alt:' '}}}],'/about',source,'Original'),'Original');
assert.equal(resolveImageAlt([{routePath:'/about',imageAlt:{[key]:'bad data'}}],'/about',source,'Original'),'Original');
assert.equal(resolveImageAlt([], '/about',source,''),'');
console.log('PASS: catalog coverage, stable keys, file facts, page isolation, decorative overrides, blank and malformed fallbacks.');
