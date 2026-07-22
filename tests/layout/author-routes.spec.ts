import { expect, test, type Page } from '@playwright/test';

const publicProfileUrls = [
  'https://orcid.org/0009-0001-0715-0517',
  'https://felixmamczur.com/',
  'https://www.europeanfilmawards.eu/talent/feliks-mamczur/',
  'https://www.filmpolski.pl/fp/index.php/1199894',
  'https://www.imdb.com/name/nm7644647/',
  'https://www.filmweb.pl/person/Feliks%2BMamczur-3134395',
  'https://github.com/felixo01'
];

const selectedPublicationUrls = {
  en: [
    '/articles/when-search-becomes-an-answer/',
    '/articles/dont-ask-whether-ai-makes-us-dumber/',
    '/articles/what-changes-when-ai-has-a-body/',
    '/articles/are-we-afraid-of-ai-or-of-ourselves/',
    '/articles/trust-in-the-age-of-ready-made-answers/'
  ],
  pl: [
    '/pl/articles/wyszukiwarka-odpowiada-co-zostaje-uczniowi/',
    '/pl/articles/nie-pytaj-czy-ai-nas-oglupia/',
    '/pl/articles/co-sie-zmienia-kiedy-ai-ma-cialo/',
    '/pl/articles/czy-boimy-sie-ai-czy-boimy-sie-samych-siebie/',
    '/pl/articles/zaufanie-w-epoce-gotowych-odpowiedzi/'
  ]
} as const;

async function expectNoHorizontalOverflow(page: Page) {
  const result = await page.evaluate(() => ({
    documentScrollWidth: document.documentElement.scrollWidth,
    documentClientWidth: document.documentElement.clientWidth,
    bodyScrollWidth: document.body.scrollWidth,
    innerWidth: window.innerWidth
  }));

  expect(result.documentScrollWidth).toBeLessThanOrEqual(result.documentClientWidth + 1);
  expect(result.bodyScrollWidth).toBeLessThanOrEqual(result.innerWidth + 1);
}

async function expectStructuredAuthorIdentity(page: Page) {
  const structuredData = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
    scripts.map((script) => script.textContent ?? '').join('\n')
  );

  expect(structuredData).toContain('Feliks Mamczur');
}

async function expectSelectedPublications(
  page: Page,
  expectedUrls: readonly string[]
) {
  const links = page.locator('[data-qa="selected-publication"] h4 a');
  await expect(links).toHaveCount(expectedUrls.length);
  expect(await links.evaluateAll((items) => items.map((item) => item.getAttribute('href'))))
    .toEqual(expectedUrls);

  for (const url of expectedUrls) {
    const response = await page.request.get(url);
    expect(response.status(), url).toBe(200);
  }
}

test.describe('author and about routes', () => {
  test('keeps English About as the canonical author route', async ({ page }) => {
    await page.goto('/about/');

    await page.keyboard.press('Tab');
    await expect(page.locator('.skip-link')).toBeFocused();
    await expect(page.locator('.skip-link')).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)');
    await expect(page).toHaveURL(/\/about\/$/);
    await expect(page).toHaveTitle('Feliks Mamczur - author of Prompted Psyche');
    await expect(page.getByRole('heading', { level: 1, name: 'Feliks Mamczur' })).toBeVisible();
    await expect(page.locator('.about-hero .eyebrow')).toHaveText('Author of Prompted Psyche');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://promptedpsyche.com/about/'
    );
    await expect(page.locator('link[rel="alternate"][hreflang="pl"]')).toHaveAttribute(
      'href',
      'https://promptedpsyche.com/pl/about/'
    );
    await expect(page.locator('[data-qa="site-nav"]').getByRole('link', { name: 'Author' })).toHaveAttribute(
      'href',
      '/about/'
    );
    await expect(page.locator('[data-qa="language-switcher"]').getByRole('link', { name: 'PL' })).toHaveAttribute(
      'href',
      '/pl/about/'
    );
    await expect(page.locator('body')).toContainText('My name is Feliks Mamczur');
    await expect(page.locator('body')).toContainText(
      'I am the author and founder of Prompted Psyche'
    );
    await expectStructuredAuthorIdentity(page);
    await expect(page.locator('body')).toContainText('Cyberpsychology and Human-AI Interaction');
    await expect(page.locator('body')).toContainText('intelligent systems');
    await expect(page.locator('body')).toContainText('Cyberpsychology remains the core');
    await expect(page.locator('body')).toContainText('Human-Machine Interaction');
    await expect(page.locator('body')).toContainText('My background includes directing, editing and production');
    await expect(page.locator('body')).toContainText('member of the European Film Academy');
    await expect(page.locator('body')).toContainText(
      'Some earlier film credits and industry databases list my name as Feliks Mirosław Mamczur, Mirosław Mamczur or Felix Mamczur. These records refer to the same person.'
    );
    await expect(page.locator('body')).toContainText(
      'My work focuses on how AI shapes cognition, trust, social presence'
    );
    await expect(page.locator('body')).toContainText(
      'I keep analysis and consulting clearly separate from clinical assessment'
    );
    await expect(page.locator('a.inline-text-link[href="https://www.europeanfilmawards.eu/talent/feliks-mamczur/"]')).toHaveAttribute(
      'href',
      'https://www.europeanfilmawards.eu/talent/feliks-mamczur/'
    );
    await expect(page.getByRole('link', { name: 'Visual and film projects' })).toHaveAttribute(
      'href',
      'https://felixmamczur.com/'
    );
    await expect(page.getByRole('link', { name: 'Visual and film projects' })).toHaveAttribute(
      'title',
      'Feliks Mamczur - visual and film projects'
    );
    await expect(page.getByRole('link', { name: 'ORCID profile' })).toHaveAttribute(
      'href',
      'https://orcid.org/0009-0001-0715-0517'
    );
    await expect(page.getByRole('heading', { level: 3, name: 'Selected publications' })).toBeVisible();
    await expectSelectedPublications(page, selectedPublicationUrls.en);
    await expect(page.getByRole('heading', { level: 3, name: 'Public profiles' })).toBeVisible();
    await expect(page.locator('[data-qa="author-public-profiles"] a')).toHaveCount(7);
    expect(await page.locator('[data-qa="author-public-profiles"] a').evaluateAll((links) =>
      links.map((link) => link.getAttribute('href'))
    )).toEqual(publicProfileUrls);
    for (const link of await page.locator('[data-qa="author-public-profiles"] a').all()) {
      await expect(link).toHaveAttribute('rel', 'me noopener');
    }
    await expect(page.getByRole('link', { name: 'felixmamczur.com' })).toHaveCount(0);
    await expect(page.locator('body')).not.toContainText('film director portfolio and earlier projects');
    await expect(page.locator('body')).not.toContainText('I am a psychologist');
    await expect(page.locator('body')).not.toContainText('I am currently studying psychology');
    await expect(page.locator('body')).not.toContainText('psychology student');
    await expect(page.locator('body')).not.toContainText('ongoing study');
    await expect(page.locator('body')).not.toContainText('completed professional qualification');
    await expect(page.locator('body')).not.toContainText('AI engineer');
    await expect(page.locator('body')).not.toContainText('cybersecurity expert');
    await expect(page.locator('body')).not.toContainText('clinical psychologist');
    await expect(page.locator('[data-qa="site-nav"]').getByRole('link', { name: 'Practice' })).toHaveAttribute(
      'href',
      '/practice/'
    );
    await expectNoHorizontalOverflow(page);
  });

  test('keeps Polish About as the canonical author route', async ({ page }) => {
    await page.goto('/pl/about/');

    await page.keyboard.press('Tab');
    await expect(page.locator('.skip-link')).toBeFocused();
    await expect(page.locator('.skip-link')).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)');
    await expect(page).toHaveURL(/\/pl\/about\/$/);
    await expect(page).toHaveTitle('Feliks Mamczur - autor Prompted Psyche');
    await expect(page.getByRole('heading', { level: 1, name: 'Feliks Mamczur' })).toBeVisible();
    await expect(page.locator('.about-hero .eyebrow')).toHaveText('Autor Prompted Psyche');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://promptedpsyche.com/pl/about/'
    );
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
      'href',
      'https://promptedpsyche.com/about/'
    );
    await expect(page.locator('[data-qa="site-nav"]').getByRole('link', { name: 'Kim jestem' })).toHaveAttribute(
      'href',
      '/pl/about/'
    );
    await expect(page.locator('[data-qa="language-switcher"]').getByRole('link', { name: 'EN' })).toHaveAttribute(
      'href',
      '/about/'
    );
    await expect(page.locator('body')).toContainText('Nazywam się Feliks Mamczur');
    await expect(page.locator('body')).toContainText('Jestem autorem i twórcą Prompted Psyche');
    await expectStructuredAuthorIdentity(page);
    await expect(page.locator('body')).toContainText('cyberpsychologii, Human-AI Interaction');
    await expect(page.locator('body')).toContainText('inteligentnymi systemami');
    await expect(page.locator('body')).toContainText('Cyberpsychologia pozostaje rdzeniem');
    await expect(page.locator('body')).toContainText('Human-Machine Interaction');
    await expect(page.locator('body')).toContainText('Moje doświadczenie obejmuje reżyserię, montaż i produkcję');
    await expect(page.locator('body')).toContainText('członkostwo w European Film Academy');
    await expect(page.locator('body')).toContainText(
      'W części wcześniejszych napisów filmowych i baz branżowych moje nazwisko występuje jako Feliks Mirosław Mamczur, Mirosław Mamczur albo Felix Mamczur. Wszystkie te zapisy dotyczą tej samej osoby.'
    );
    await expect(page.locator('body')).toContainText(
      'Moja praca koncentruje się na tym, jak AI wpływa na poznanie, zaufanie, obecność społeczną'
    );
    await expect(page.locator('body')).toContainText(
      'Zachowuję przy tym jasną granicę między analizą i konsultingiem'
    );
    await expect(page.locator('a.inline-text-link[href="https://www.europeanfilmawards.eu/talent/feliks-mamczur/"]')).toHaveAttribute(
      'href',
      'https://www.europeanfilmawards.eu/talent/feliks-mamczur/'
    );
    await expect(page.getByRole('link', { name: 'projekty wizualne i filmowe' })).toHaveAttribute(
      'href',
      'https://felixmamczur.com/'
    );
    await expect(page.getByRole('link', { name: 'projekty wizualne i filmowe' })).toHaveAttribute(
      'title',
      'Feliks Mamczur - projekty wizualne i filmowe'
    );
    await expect(page.getByRole('link', { name: 'profil ORCID' })).toHaveAttribute(
      'href',
      'https://orcid.org/0009-0001-0715-0517'
    );
    await expect(page.getByRole('heading', { level: 3, name: 'Wybrane publikacje' })).toBeVisible();
    await expectSelectedPublications(page, selectedPublicationUrls.pl);
    await expect(page.getByRole('heading', { level: 3, name: 'Profile publiczne' })).toBeVisible();
    await expect(page.locator('[data-qa="author-public-profiles"] a')).toHaveCount(7);
    expect(await page.locator('[data-qa="author-public-profiles"] a').evaluateAll((links) =>
      links.map((link) => link.getAttribute('href'))
    )).toEqual(publicProfileUrls);
    for (const link of await page.locator('[data-qa="author-public-profiles"] a').all()) {
      await expect(link).toHaveAttribute('rel', 'me noopener');
    }
    await expect(page.getByRole('link', { name: 'felixmamczur.com' })).toHaveCount(0);
    await expect(page.locator('body')).not.toContainText('portfolio filmowe i wcześniejsze projekty');
    await expect(page.locator('body')).not.toContainText('Jestem psychologiem');
    await expect(page.locator('body')).not.toContainText('Obecnie studiuję psychologię');
    await expect(page.locator('body')).not.toContainText('studiuję psychologię');
    await expect(page.locator('body')).not.toContainText('trwającą edukację');
    await expect(page.locator('body')).not.toContainText('ukończoną kwalifikację zawodową');
    await expect(page.locator('body')).not.toContainText('inżynier AI');
    await expect(page.locator('body')).not.toContainText('ekspert cyberbezpieczeństwa');
    await expect(page.locator('body')).not.toContainText('psychologiem');
    await expect(page.locator('[data-qa="site-nav"]').getByRole('link', { name: 'Praktyka' })).toHaveAttribute(
      'href',
      '/pl/practice/'
    );
    await expectNoHorizontalOverflow(page);
  });

  test('redirects the English author alias to canonical About', async ({ page }) => {
    await page.goto('/author/');

    await expect(page).toHaveURL(/\/about\/$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Feliks Mamczur' })).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test('redirects the Polish author alias to canonical About', async ({ page }) => {
    await page.goto('/pl/author/');

    await expect(page).toHaveURL(/\/pl\/about\/$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Feliks Mamczur' })).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });
});
