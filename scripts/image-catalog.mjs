// Inventory the images reachable from each public page without uploading assets.
import fs from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';
import sharp from 'sharp';

const root = process.cwd();
const routes = ['/', '/about', '/web-design', '/marketing', '/ai-automation', '/pricing', '/works', '/contact', '/blog'];
const sections = { MainHeroThree: 'Hero', ClientLogosSection: 'Client ribbon', PasSection: 'Business challenges & services', ServicesListSection: 'Services', OurWorksSection: 'Selected work', WhyTruedgeSection: 'Why Truedge', ProcessSection: 'Our process', TestimonialSection: 'Reviews', AboutPage: 'Our story & client work', AboutScrollHero: 'Hero', ContactPage: 'Client credibility', MarketingPage: 'Marketing', AiAutomationPage: 'AI automation', WebDesignPage: 'Web design', WorksPage: 'Our work', PricingPage: 'Client showcase', Navbar: 'Navigation', Footer: 'Footer' };
const isImage = value => /^(\/|https:\/\/|@\/public\/).+\.(?:png|jpe?g|webp|svg|avif|gif)(?:\?.*)?$/i.test(value) || /^https:\/\/images\.unsplash\.com\/photo-/.test(value);
const nice = value => value.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
function key(source) { let hash = 2166136261; for (const char of source) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619); return `image_${(hash >>> 0).toString(16)}`; }
async function resolveImport(file, spec) {
  if (!spec.startsWith('.') && !spec.startsWith('@/')) return null;
  const base = spec.startsWith('@/') ? path.join(root, spec.slice(2)) : path.resolve(path.dirname(file), spec);
  for (const candidate of [base, `${base}.tsx`, `${base}.ts`, path.join(base, 'index.tsx'), path.join(base, 'index.ts')]) {
    if (!/\.tsx?$/.test(candidate)) continue;
    if (await fs.stat(candidate).then(s => s.isFile()).catch(() => false)) return candidate;
  }
  return null;
}
const catalog = {};
for (const route of routes) {
  const seen = new Set(), images = new Map();
  const queue = [path.join(root, 'app', route.slice(1), 'page.tsx'), path.join(root, 'components/Navbar.tsx'), path.join(root, 'components/Footer.tsx')];
  while (queue.length) {
    const file = queue.shift(); if (seen.has(file)) continue; seen.add(file);
    const code = await fs.readFile(file, 'utf8');
    const ast = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const component = path.basename(file).replace(/\.tsx?$/, '');
    const section = sections[component] || nice(component);
    const imported = new Map();
    for (const node of ast.statements) if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      const spec = node.moduleSpecifier.text;
      if (isImage(spec) && node.importClause?.name) imported.set(node.importClause.name.text, spec.replace('@' + '/public', ''));
      const dependency = await resolveImport(file, spec); if (dependency) queue.push(dependency);
    }
    function add(source, alt, label) {
      source = source.replace('@' + '/public', '');
      if (!isImage(source)) return;
      const existing = images.get(source);
      if (existing) { if (!existing.sections.includes(section)) existing.sections.push(section); if (alt && !existing.alt) existing.alt = alt; if (label) existing.label = label; return; }
      images.set(source, { key: key(source), source, label: label || nice(path.basename(source.split('?')[0])), sections: [section], alt: alt || '' });
    }
    function visit(node) {
      if (ts.isStringLiteral(node) && isImage(node.text)) add(node.text);
      if (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) {
        if (node.tagName.getText(ast) === 'Image') {
          const attrs = node.attributes.properties;
          const src = attrs.find(a => ts.isJsxAttribute(a) && a.name.getText(ast) === 'src')?.initializer;
          const alt = attrs.find(a => ts.isJsxAttribute(a) && a.name.getText(ast) === 'alt')?.initializer;
          let source = src && ts.isStringLiteral(src) ? src.text : undefined;
          if (src && ts.isJsxExpression(src) && src.expression && ts.isIdentifier(src.expression)) source = imported.get(src.expression.text);
          if (source) add(source, alt && ts.isStringLiteral(alt) ? alt.text : undefined);
        }
      }
      if (ts.isObjectLiteralExpression(node)) {
        const props = Object.fromEntries(node.properties.filter(ts.isPropertyAssignment).map(p => [p.name.getText(ast).replace(/['"]/g, ''), ts.isStringLiteral(p.initializer) ? p.initializer.text : undefined]));
        for (const name of ['src', 'logo', 'imageSrc', 'image']) if (props[name] && isImage(props[name])) add(props[name], props.imageAlt || props.name || props.company || props.title, props.name || props.company || props.title);
        if (component === 'works' && props.image && props.name) add(`/assets/works/${props.image}.webp`, `${props.name} website preview`, props.name);
        if (component === 'WebDesignPage' && props.file && props.name) add(`/assets/tech/${props.file}.svg`, '', props.name);
      }
      ts.forEachChild(node, visit);
    }
    visit(ast);
  }
  catalog[route] = [...images.values()];
}
const metadata = new Map();
for (const item of Object.values(catalog).flat()) {
  if (!metadata.has(item.source)) {
    let details = {};
    if (item.source.startsWith('/')) {
      const local = path.join(root, 'public', item.source.slice(1));
      try { const stat = await fs.stat(local); const data = await sharp(local).metadata(); details = { bytes: stat.size, width: data.width, height: data.height, format: data.format }; } catch { /* Broken/missing sources are reported by validation below. */ }
    }
    metadata.set(item.source, details);
  }
  Object.assign(item, metadata.get(item.source));
}
const keys = new Map();
for (const item of Object.values(catalog).flat()) { if (keys.has(item.key) && keys.get(item.key) !== item.source) throw new Error('Image key collision'); keys.set(item.key, item.source); }
await fs.mkdir(path.join(root, 'sanity-admin'), { recursive: true });
await fs.writeFile(path.join(root, 'sanity-admin/page-image-catalog.json'), `${JSON.stringify(catalog, null, 2)}\n`);
console.log(Object.fromEntries(Object.entries(catalog).map(([route, images]) => [route, images.length])));
