import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Baseline is intentionally limited to the pre-C2 publication contract. CSS,
// scripts, body layout and generated asset names are not part of this snapshot.
// Usage after each build:
//   VERCEL_ENV=production npm run build
//   node scripts/check-c2-seo.mjs production
//   VERCEL_ENV=preview npm run build
//   node scripts/check-c2-seo.mjs preview
// Capture only against an untouched build of the verified pre-C2 commit:
//   node scripts/check-c2-seo.mjs capture /path/to/original/dist /path/to/original/repo
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const fixturePath = join(root, 'tests/fixtures/c2-seo-baseline.json');
const snapshotCommit = '2d971cbf81fe25f1e3e3a2ff05ceb83d6f544805';
const [mode, distArgument, sourceArgument] = process.argv.slice(2);
assert(['capture', 'production', 'preview'].includes(mode), 'Specify capture, production or preview.');
const dist = resolve(distArgument ?? join(root, 'dist'));
const source = resolve(sourceArgument ?? root);
const sha = (value) => createHash('sha256').update(value).digest('hex');
const read = (file) => readFileSync(file, 'utf8');
const sortObject = (value) => {
  if (Array.isArray(value)) return value.map(sortObject);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).sort(([a], [b]) => a.localeCompare(b)).map(([key, item]) => [key, sortObject(item)]));
  }
  return value;
};
const digest = (value) => sha(JSON.stringify(sortObject(value)));
const walk = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const file = join(directory, entry.name);
  return entry.isDirectory() ? walk(file) : [file];
}).sort();
const decode = (value) => value.replace(/&(?:amp|quot|apos|lt|gt|#(?:x[\da-f]+|\d+));/gi, (entity) => {
  const named = { '&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>' };
  if (named[entity]) return named[entity];
  const number = entity.slice(2, -1);
  return String.fromCodePoint(number[0].toLowerCase() === 'x' ? parseInt(number.slice(1), 16) : Number(number));
});
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map((match) => [match[1].toLowerCase(), decode(match[2] ?? match[3])]));

function metadata(html) {
  // Astro-generated redirect documents intentionally have no <head> wrapper.
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? html.split(/<body\b/i)[0];
  const metas = [...head.matchAll(/<meta\b[^>]*>/gi)].map(([tag]) => attributes(tag));
  const robots = metas.filter((meta) => ['robots', 'googlebot'].includes(meta.name));
  const links = [...head.matchAll(/<link\b[^>]*>/gi)].map(([tag]) => attributes(tag)).filter((link) => ['canonical', 'alternate'].includes(link.rel));
  const schema = [...head.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].filter((match) => attributes(match[1]).type === 'application/ld+json').map((match) => JSON.parse(match[2]));
  const seo = {
    lang: attributes(html.match(/<html\b[^>]*>/i)?.[0] ?? '').lang ?? null,
    title: decode(head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? ''),
    meta: metas.filter((meta) => !['robots', 'googlebot', 'generator'].includes(meta.name)).sort((a, b) => JSON.stringify(sortObject(a)).localeCompare(JSON.stringify(sortObject(b)))),
    links: links.sort((a, b) => JSON.stringify(sortObject(a)).localeCompare(JSON.stringify(sortObject(b))))
  };
  return { seo, robots, schema };
}

const pages = Object.fromEntries(walk(dist).filter((file) => file.endsWith('.html')).map((file) => {
  const path = relative(dist, file).replaceAll('\\', '/');
  const route = `/${path.replace(/index\.html$/, '')}`;
  const parsed = metadata(read(file));
  return [route, {
    head: digest(parsed.seo),
    schema: digest(parsed.schema),
    robots: parsed.robots,
    // Redirects have no layout and already carry Astro's own noindex policy.
    redirect: parsed.seo.meta.some((meta) => meta['http-equiv'] === 'refresh')
  }];
}));
const outputFiles = walk(dist).filter((file) => /(?:^|\/)(?:rss\.xml|sitemap[^/]*\.xml|robots\.txt|search-index\.[^/]+\.json)$/.test(file));
const outputs = Object.fromEntries(outputFiles.map((file) => [relative(dist, file), sha(readFileSync(file))]));
const contentFiles = walk(join(source, 'src/content'));
const content = { count: contentFiles.length, sha256: digest(contentFiles.map((file) => [relative(source, file), sha(readFileSync(file))])) };
const configuration = Object.fromEntries(['astro.config.mjs', 'vercel.json', 'src/content.config.ts', 'src/lib/publications.ts'].map((file) => [file, sha(readFileSync(join(source, file)))]));

if (mode === 'capture') {
  assert.equal(execFileSync('git', ['rev-parse', 'HEAD'], { cwd: source, encoding: 'utf8' }).trim(), snapshotCommit, 'Capture requires the verified pre-C2 commit.');
  assert.equal(execFileSync('git', ['status', '--porcelain', '--untracked-files=no'], { cwd: source, encoding: 'utf8' }).trim(), '', 'Capture requires an unchanged source checkout.');
  assert(!existsSync(fixturePath), 'Baseline already exists; do not silently replace the pre-C2 contract.');
  const representativeRoutes = ['/', '/pl/', '/articles/trust-in-the-age-of-ready-made-answers/', '/pl/articles/zaufanie-w-epoce-gotowych-odpowiedzi/', '/projects/beyond-ai-share/', '/pl/projects/beyond-ai-share/', '/search/', '/tags/ai/'];
  const representative = Object.fromEntries(representativeRoutes.filter((route) => pages[route]).map((route) => {
    const { seo, robots, schema } = metadata(read(join(dist, route.slice(1), 'index.html')));
    return [route, {
      title: seo.title,
      canonical: seo.links.find((link) => link.rel === 'canonical')?.href,
      alternates: seo.links.filter((link) => link.hreflang),
      description: seo.meta.find((meta) => meta.name === 'description')?.content,
      citation: seo.meta.filter((meta) => meta.name?.startsWith('citation_')),
      schemaTypes: schema.flatMap((item) => item['@graph'] ?? [item]).map((item) => item['@type']),
      robots
    }];
  }));
  const baseline = { snapshotCommit, representative, content, configuration, outputs, pages };
  writeFileSync(fixturePath, `${JSON.stringify(baseline, null, 2)}\n`);
  console.log(`Captured ${Object.keys(pages).length} routes, ${outputFiles.length} discovery outputs and ${content.count} content sources from ${snapshotCommit}.`);
} else {
  const baseline = JSON.parse(read(fixturePath));
  assert.equal(baseline.snapshotCommit, snapshotCommit);
  assert.deepEqual(Object.keys(pages).sort(), Object.keys(baseline.pages).sort(), 'Public route inventory / draft visibility changed.');
  for (const [route, page] of Object.entries(pages)) {
    const expected = baseline.pages[route];
    assert.equal(page.head, expected.head, `${route}: title, canonical, hreflang, social or citation metadata changed.`);
    assert.equal(page.schema, expected.schema, `${route}: structured data (including breadcrumbs, dates, identifiers) changed.`);
    const expectedRobots = mode === 'preview' && !expected.redirect
      ? [{ name: 'robots', content: 'noindex, nofollow' }, { name: 'googlebot', content: 'noindex, nofollow' }]
      : expected.robots;
    assert.deepEqual(page.robots, expectedRobots, `${route}: ${mode} robots policy is incorrect.`);
  }
  assert.deepEqual(outputs, baseline.outputs, 'RSS, sitemaps, search indexes or robots.txt changed.');
  assert.deepEqual(content, baseline.content, 'Publication source content, frontmatter or draft inventory changed.');
  assert.deepEqual(configuration, baseline.configuration, 'Routing, redirects, publication registry or content schema changed.');
  console.log(`PASS (${mode}): ${Object.keys(pages).length} routes preserve SEO and structured data; robots policy verified on every page; ${outputFiles.length} discovery outputs and ${content.count} content sources unchanged.`);
}
