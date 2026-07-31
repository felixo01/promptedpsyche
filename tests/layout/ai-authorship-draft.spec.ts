import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, test } from '@playwright/test';

const files = {
  en: resolve('src/content/articles/who-had-the-final-say-ai-authorship.mdx'),
  pl: resolve('src/content/articles/kto-mial-ostatnie-slowo-autorstwo-ai.mdx'),
  materials: resolve('src/components/ResearchMaterials.astro'),
  workflow: resolve('src/components/AiAuthorshipWorkflowComparison.astro'),
  chart: resolve('src/components/AiAuthorshipVignetteChart.astro')
} as const;

const routes = {
  en: '/articles/who-had-the-final-say-ai-authorship/',
  pl: '/pl/articles/kto-mial-ostatnie-slowo-autorstwo-ai/'
} as const;

const titles = {
  en: 'Who Had the Final Say? Authorship in AI-Assisted Creative Work',
  pl: 'Kto miał ostatnie słowo? O autorstwie w twórczości wspieranej przez AI'
} as const;

function read(path: string) {
  return readFileSync(path, 'utf8');
}

function frontmatter(path: string) {
  const source = read(path);
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  expect(match, `${path} must contain frontmatter`).not.toBeNull();
  return match?.[1] ?? '';
}

test.describe('bilingual AI authorship draft', () => {
  test('keeps both localized entries paired, non-scholarly and asset-free', () => {
    for (const [lang, path] of Object.entries({ en: files.en, pl: files.pl })) {
      const metadata = frontmatter(path);

      expect(metadata).toMatch(/^draft: true$/m);
      expect(metadata).toMatch(/^scholarPrimary: false$/m);
      expect(metadata).toMatch(/^translationKey: "ai-authorship-final-say"$/m);
      expect(metadata).toMatch(new RegExp(`^lang: "${lang}"$`, 'm'));
      expect(metadata).not.toMatch(/^(?:doi|doiUrl|relatedDoi|relatedDoiUrl|version):/m);
      expect(metadata).not.toMatch(/^(?:image|imageAlt|imageCaption|socialImage):/m);
    }
  });

  test('keeps both draft routes out of every public surface', async ({ request }) => {
    const responses = await Promise.all([
      request.get(routes.en),
      request.get(routes.pl),
      request.get('/articles/'),
      request.get('/pl/articles/'),
      request.get('/search-index.en.json'),
      request.get('/search-index.pl.json'),
      request.get('/rss.xml'),
      request.get('/topics/human-agency-and-responsibility/'),
      request.get('/pl/topics/sprawczosc-i-odpowiedzialnosc/')
    ]);

    expect(responses[0].status()).toBe(404);
    expect(responses[1].status()).toBe(404);

    const publicText = (await Promise.all(responses.slice(2).map((response) => response.text()))).join('\n');
    for (const title of Object.values(titles)) {
      expect(publicText).not.toContain(title);
    }
    for (const route of Object.values(routes)) {
      expect(publicText).not.toContain(route);
    }
  });

  test('preserves the four canonical research links in crawlable markup', () => {
    const source = read(files.materials);
    const urls = [
      'https://doi.org/10.5281/zenodo.21705721',
      'https://zenodo.org/api/records/21705721/files/Beyond_AI_Share_Preprint_v1.0.pdf/content',
      'https://zenodo.org/api/records/21705721/files/Beyond_AI_Share_Appendix_A_v1.0.pdf/content',
      'https://doi.org/10.17605/OSF.IO/GSWN3'
    ];

    for (const url of urls) {
      expect(source).toContain(`'${url}'`);
    }
    expect(source).toContain('<a href={doiUrl}>');
    expect(source).toContain('<a href={preprintUrl}>');
    expect(source).toContain('<a href={appendixUrl}>');
    expect(source).toContain('<a href={osfUrl}>');
    expect(source).not.toContain('nofollow');
  });

  test('locks the workflow labels and all reported vignette values', () => {
    const workflow = read(files.workflow);
    const chart = read(files.chart);

    for (const label of [
      'Human-directed workflow',
      'Near-final AI output',
      'Proces kierowany przez człowieka',
      'Niemal gotowy wynik AI',
      'Supplementary Appendix A, section A8',
      'Supplementary Appendix A, sekcja A8'
    ]) {
      expect(workflow).toContain(label);
    }

    const rows = [
      ['3.430', '1.208', '2.570', '1.235', '.860', '.610'],
      ['3.507', '1.172', '2.706', '1.253', '.801', '.559'],
      ['3.565', '1.196', '2.720', '1.255', '.846', '.597'],
      ['3.501', '1.081', '2.665', '1.132', '.836', '.659']
    ];

    for (const row of rows) {
      for (const value of row) {
        expect(chart).toContain(`'${value}'`);
      }
    }

    for (const statistic of ['n = 428', '95% CI [.715, .956]', 't(427) = 13.628', 'p < .001', 'd_z = .659']) {
      expect(chart).toContain(statistic);
    }
  });
});
