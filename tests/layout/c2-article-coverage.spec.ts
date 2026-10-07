import { expect, test, type Locator, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';

type ArticleMetadata = {
  title: string;
  description: string;
  lang: 'en' | 'pl';
  inBrief: string[];
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
};

const articleCases = [
  { kind: 'trust', source: 'trust-in-the-age-of-ready-made-answers.md', route: '/articles/trust-in-the-age-of-ready-made-answers/' },
  { kind: 'trust', source: 'zaufanie-w-epoce-gotowych-odpowiedzi.md', route: '/pl/articles/zaufanie-w-epoce-gotowych-odpowiedzi/' },
  { kind: 'authorship', source: 'who-had-the-final-say-ai-authorship.mdx', route: '/articles/who-had-the-final-say-ai-authorship/' },
  { kind: 'authorship', source: 'kto-mial-ostatnie-slowo-autorstwo-ai.mdx', route: '/pl/articles/kto-mial-ostatnie-slowo-autorstwo-ai/' },
  { kind: 'learning', source: 'dont-ask-whether-ai-makes-us-dumber.md', route: '/articles/dont-ask-whether-ai-makes-us-dumber/' },
  { kind: 'learning', source: 'nie-pytaj-czy-ai-nas-oglupia.md', route: '/pl/articles/nie-pytaj-czy-ai-nas-oglupia/' },
  { kind: 'mirror', source: 'ai-as-a-mirror-why-it-can-feel-so-easy-to-talk-to.md', route: '/articles/ai-as-a-mirror-why-it-can-feel-so-easy-to-talk-to/' },
  { kind: 'mirror', source: 'ai-jako-lustro-dlaczego-tak-latwo-sie-z-nim-dogadujemy.md', route: '/pl/articles/ai-jako-lustro-dlaczego-tak-latwo-sie-z-nim-dogadujemy/' }
].map((entry) => {
  const source = readFileSync(new URL(`../../src/content/articles/${entry.source}`, import.meta.url), 'utf8');
  const parts = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!parts) throw new Error(`Missing frontmatter in ${entry.source}`);
  const metadata = parse(parts[1]) as ArticleMetadata;
  const body = parts[2];
  const references = [...body.matchAll(/^## (.+)$/gm)].at(-1);
  if (!references || references.index === undefined) throw new Error(`Missing references in ${entry.source}`);
  const referenceBody = body.slice(references.index).replace(/^##[^\n]+\n/, '').trim();
  const listReferenceCount = [...referenceBody.matchAll(/^(?:\d+\.|[-*])\s+/gm)].length;
  // The Polish learning article uses citation paragraphs; the other seven
  // articles use lists, including several separate lists in the authorship pair.
  const referencesFormat = listReferenceCount > 0 ? 'list' : 'paragraphs';
  const referenceCount = listReferenceCount || referenceBody.split(/\n\s*\n/).filter((block) => !block.startsWith('#')).length;
  const keyPassages = [...body.matchAll(/<aside\b[^>]*class="key-passage"[^>]*>([\s\S]*?)<\/aside>/g)]
    .map((match) => [...match[1].matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)]
      .map((paragraph) => paragraph[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()));
  const dataTableCount = [...body.matchAll(/data-qa="ai-thinking-data-table"/g)].length;
  return { ...entry, metadata, referencesHeading: references[1], referencesFormat, referenceCount, keyPassages, dataTableCount };
});

async function expectUnclippedText(locator: Locator, text: string) {
  await expect(locator).toHaveText(text);
  await expect(locator).toBeVisible();
  const metrics = await locator.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      textOverflow: style.textOverflow,
      lineClamp: style.webkitLineClamp,
      scrollWidth: element.scrollWidth,
      width: element.clientWidth,
      scrollHeight: element.scrollHeight,
      height: element.clientHeight
    };
  });
  expect(metrics.textOverflow).not.toBe('ellipsis');
  expect(['none', '', '0']).toContain(metrics.lineClamp);
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.width + 1);
  expect(metrics.scrollHeight).toBeLessThanOrEqual(metrics.height + 1);
}

async function expectContainedLayout(page: Page) {
  const metrics = await page.evaluate(() => ({
    viewport: innerWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
    figures: [...document.querySelectorAll('.article-shell figure, .research-materials')].map((element) => {
      const rect = element.getBoundingClientRect();
      return { name: element.getAttribute('data-qa') ?? element.className, left: rect.left, right: rect.right };
    })
  }));
  expect(metrics.document).toBeLessThanOrEqual(metrics.viewport + 1);
  expect(metrics.body).toBeLessThanOrEqual(metrics.viewport + 1);
  for (const figure of metrics.figures) {
    expect(figure.left, `${figure.name} left edge`).toBeGreaterThanOrEqual(-1);
    expect(figure.right, `${figure.name} right edge`).toBeLessThanOrEqual(metrics.viewport + 1);
  }
}

test.describe('C2 shared article layout across different content structures', () => {
  // These eight routes run in every standard Playwright project: 32 active cases.
  for (const article of articleCases) {
    test(`preserves the complete ${article.kind} article on ${article.route}`, async ({ page }) => {
      const response = await page.goto(article.route);
      expect(response?.ok()).toBe(true);
      await page.evaluate(() => document.fonts.ready);
      const viewport = page.viewportSize();
      if (!viewport) throw new Error('A viewport is required for article layout coverage');
      const { metadata } = article;
      const prose = page.locator('.article-shell--article .prose');

      await expectUnclippedText(page.locator('.content-header h1'), metadata.title);
      await expectUnclippedText(page.locator('.content-header .lede'), metadata.description);
      await expectContainedLayout(page);

      const reading = await prose.evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          width: element.getBoundingClientRect().width,
          fontSize: parseFloat(style.fontSize),
          ratio: parseFloat(style.lineHeight) / parseFloat(style.fontSize),
          family: style.fontFamily,
          align: style.textAlign
        };
      });
      expect(reading.family).toContain('Newsreader');
      expect(reading.align).toBe('left');
      expect(reading.ratio).toBeCloseTo(1.6, 2);
      expect(reading.fontSize).toBe(viewport.width < 768 ? 19 : 20);
      if (viewport.width >= 768) {
        expect(reading.width).toBeGreaterThanOrEqual(680);
        expect(reading.width).toBeLessThanOrEqual(720);
      } else {
        expect(reading.width).toBeGreaterThanOrEqual(viewport.width - 41);
        expect(reading.width).toBeLessThanOrEqual(viewport.width - 39);
      }
      await expect(page.locator('.article-grid > aside')).toHaveCount(0);

      const inBrief = page.locator('[data-qa="in-brief"]');
      await expect(inBrief).toHaveCount(metadata.inBrief.length > 0 ? 1 : 0);
      if (metadata.inBrief.length > 0) {
        await inBrief.locator('summary').focus();
        await page.keyboard.press('Enter');
        await expect(inBrief.locator('.in-brief__body')).toBeVisible();
        await expect(inBrief.locator('.in-brief__body p')).toHaveText(metadata.inBrief);
      }

      const keyPassages = prose.locator('.key-passage');
      await expect(keyPassages).toHaveCount(article.keyPassages.length);
      for (let index = 0; index < article.keyPassages.length; index += 1) {
        await expect(keyPassages.nth(index)).toBeVisible();
        // MD and MDX differ in whitespace between blocks. Verify each complete
        // paragraph and their count, not an invented space between adjacent <p>s.
        await expect(keyPassages.nth(index).locator(':scope > p')).toHaveText(article.keyPassages[index]);
      }

      if (metadata.image) {
        const originalImage = page.locator('[data-qa="article-hero-image"]');
        await expect(originalImage).toHaveAttribute('src', metadata.image);
        await expect(originalImage).toHaveAttribute('alt', metadata.imageAlt ?? metadata.title);
        await originalImage.scrollIntoViewIfNeeded();
        await expect.poll(() => originalImage.evaluate((element) => {
          const image = element as HTMLImageElement;
          return image.complete && image.naturalWidth > 0;
        })).toBe(true);
        if (metadata.imageCaption) {
          await expect(page.locator('[data-qa="article-hero-figure"] figcaption')).toHaveText(metadata.imageCaption);
        }
      }
      if (article.kind === 'authorship') {
        // This MDX pair has no frontmatter hero; its authored figures are components.
        await expect(prose.locator('[data-qa="research-materials"]')).toBeVisible();
        await expect(prose.locator('[data-qa="ai-authorship-workflow-comparison"]')).toBeVisible();
        await expect(prose.locator('[data-qa="ai-authorship-vignette-chart"]')).toBeVisible();
      }
      await expect(prose.locator('[data-qa="ai-thinking-data-table"]')).toHaveCount(article.dataTableCount);
      for (const table of await prose.locator('[data-qa="ai-thinking-data-table"]').all()) {
        await expect(table.locator('caption')).toBeVisible();
        expect(await table.locator('tbody tr').count()).toBeGreaterThan(0);
      }

      const contents = page.locator('[data-qa="article-contents"]');
      await expect(contents).toHaveCount(1);
      const links = contents.locator('nav a');
      expect(await links.count()).toBeGreaterThan(5);
      expect(await links.evaluateAll((anchors) => {
        const targets = anchors.map((anchor) => anchor.getAttribute('href')?.slice(1));
        return new Set(targets).size === targets.length && targets.every((id) =>
          id && document.getElementById(decodeURIComponent(id))?.tagName === 'H2');
      })).toBe(true);

      const references = prose.locator(':scope > h2').filter({ hasText: article.referencesHeading });
      await expect(references).toHaveText(article.referencesHeading);
      await references.scrollIntoViewIfNeeded();
      await expect(references).toBeInViewport();
      const bibliography = await references.evaluate((heading, format) => {
        const entries: Element[] = [];
        let node = heading.nextElementSibling;
        while (node && !node.matches('h2, .continue-exploring, .consulting-cta, .suggested-citation, .rights-notice')) {
          if (format === 'list' && node.matches('ol, ul')) entries.push(...node.querySelectorAll(':scope > li'));
          if (format === 'paragraphs' && node.matches('p')) entries.push(node);
          node = node.nextElementSibling;
        }
        return entries.map((entry) => ({
          text: entry.textContent?.trim(),
          fontSize: parseFloat(getComputedStyle(entry).fontSize),
          visible: entry.getBoundingClientRect().height > 0
        }));
      }, article.referencesFormat);
      expect(bibliography).toHaveLength(article.referenceCount);
      expect(article.referenceCount).toBeGreaterThan(0);
      for (const entry of bibliography) {
        expect(entry.text?.length).toBeGreaterThan(20);
        expect(entry.visible).toBe(true);
        expect(entry.fontSize).toBeGreaterThanOrEqual(18);
      }

      const prefix = metadata.lang === 'pl' ? '/pl' : '';
      const consulting = prose.locator('[data-qa="consulting-cta"]');
      await expect(consulting).toBeVisible();
      await expect(consulting.locator('[data-qa="consulting-cta-offer"]')).toHaveAttribute('href', `${prefix}/consulting/`);
      await expect(consulting.locator('[data-qa="consulting-cta-contact"]')).toHaveAttribute('href', `${prefix}/contact/`);
      const citation = prose.locator('[data-qa="suggested-citation"]');
      await expect(citation).toBeVisible();
      await expect(citation).toContainText(metadata.title);
      await expect(prose.locator('[data-qa="rights-notice"][data-variant="content"]')).toBeVisible();
      await expectContainedLayout(page);
    });
  }
});
