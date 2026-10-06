import { readFileSync, readdirSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { SitemapItem } from '@astrojs/sitemap';
import { beyondAiShareRecord } from './beyondAiShare';

type ContentCollection = 'articles' | 'notes' | 'concepts' | 'practice';

const CONTENT_ROOT = fileURLToPath(new URL('../content/', import.meta.url));
const COLLECTION_PATHS: Record<ContentCollection, string> = {
  articles: 'articles',
  notes: 'notes',
  concepts: 'concepts',
  practice: 'practice'
};

function readContentFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const entryPath = join(directory, entry.name);

      if (entry.isDirectory()) return readContentFiles(entryPath);
      if (!entry.isFile() || !['.md', '.mdx'].includes(extname(entry.name))) return [];

      return [entryPath];
    })
    .sort();
}

function readFrontmatter(source: string): string | undefined {
  return source.match(/^\uFEFF?---\s*\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/u)?.[1];
}

function readScalar(frontmatter: string, key: string): string | undefined {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
  const rawValue = frontmatter.match(new RegExp(`^${escapedKey}:\\s*(.*?)\\s*$`, 'mu'))?.[1]?.trim();

  if (!rawValue) return undefined;
  const value = rawValue.replace(/\s+#.*$/u, '').trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1).trim();
  }

  return value || undefined;
}

function normalizeLastmod(value: string | undefined): string | undefined {
  if (!value) return undefined;

  if (/^\d{4}-\d{2}-\d{2}$/u.test(value)) {
    const parsed = new Date(`${value}T00:00:00.000Z`);
    if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value) {
      return undefined;
    }

    return parsed.toISOString();
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
}

function normalizePathname(pathname: string): string {
  if (pathname === '/') return pathname;
  return `/${pathname.replace(/^\/+|\/+$/gu, '')}/`;
}

function getContentRoute(
  collection: ContentCollection,
  id: string,
  frontmatter: string
): string {
  const language = readScalar(frontmatter, 'lang') === 'pl' ? 'pl' : 'en';
  const prefix = language === 'pl' ? '/pl' : '';
  const slug = collection === 'concepts' ? (readScalar(frontmatter, 'routeSlug') ?? id) : id;

  return normalizePathname(`${prefix}/${COLLECTION_PATHS[collection]}/${slug}`);
}

export function createContentLastmodMap(): ReadonlyMap<string, string> {
  const lastmodByPath = new Map<string, string>();

  for (const collection of Object.keys(COLLECTION_PATHS) as ContentCollection[]) {
    const collectionDirectory = join(CONTENT_ROOT, collection);

    for (const filePath of readContentFiles(collectionDirectory)) {
      const frontmatter = readFrontmatter(readFileSync(filePath, 'utf8'));
      if (!frontmatter || readScalar(frontmatter, 'draft')?.toLowerCase() !== 'false') continue;

      const publishedAt = normalizeLastmod(readScalar(frontmatter, 'publishedAt'));
      const updatedAt = normalizeLastmod(readScalar(frontmatter, 'updatedAt'));
      const lastmod = updatedAt ?? publishedAt;
      if (!lastmod) continue;

      const id = relative(collectionDirectory, filePath)
        .replaceAll('\\', '/')
        .replace(/\.(?:md|mdx)$/u, '');
      const route = getContentRoute(collection, id, frontmatter);
      lastmodByPath.set(route, lastmod);
    }
  }

  return lastmodByPath;
}

const contentLastmodByPath = createContentLastmodMap();
const reliablePageLastmodByPath = new Map<string, string>();
const beyondAiShareLastmod = normalizeLastmod(beyondAiShareRecord.dateModified);

if (beyondAiShareLastmod) {
  for (const pathname of Object.values(beyondAiShareRecord.paths)) {
    reliablePageLastmodByPath.set(normalizePathname(pathname), beyondAiShareLastmod);
  }
}

export function addReliableLastmod(item: SitemapItem): SitemapItem {
  const pathname = normalizePathname(new URL(item.url).pathname);
  const lastmod = contentLastmodByPath.get(pathname) ?? reliablePageLastmodByPath.get(pathname);

  return lastmod ? { ...item, lastmod } : item;
}
