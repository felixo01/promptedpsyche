import { expect, test, type Page } from '@playwright/test';

const polishArticleRoute = '/pl/articles/nie-chodzi-tylko-o-prompt/';
const secondPolishArticleRoute = '/pl/articles/model-nie-pamieta-model-ma-kontekst/';
const thirdPolishArticleRoute = '/pl/articles/ai-nie-czyta-ludzi-pomaga-uporzadkowac-sytuacje/';
const englishArticleRoute = '/articles/it-is-not-just-about-the-prompt/';
const secondEnglishArticleRoute = '/articles/the-model-does-not-remember-it-works-with-context/';
const thirdEnglishArticleRoute =
  '/articles/ai-does-not-read-people-it-helps-make-sense-of-the-situation/';
const mirrorPolishArticleRoute =
  '/pl/articles/ai-jako-lustro-dlaczego-tak-latwo-sie-z-nim-dogadujemy/';
const mirrorEnglishArticleRoute =
  '/articles/ai-as-a-mirror-why-it-can-feel-so-easy-to-talk-to/';
const aiPathPolishArticleRoute = '/pl/articles/zaufanie-w-epoce-gotowych-odpowiedzi/';
const aiPathEnglishArticleRoute = '/articles/trust-in-the-age-of-ready-made-answers/';
const aiFearsPolishArticleRoute =
  '/pl/articles/czy-boimy-sie-ai-czy-boimy-sie-samych-siebie/';
const aiFearsEnglishArticleRoute = '/articles/are-we-afraid-of-ai-or-of-ourselves/';
const embodiedPolishArticleRoute = '/pl/articles/co-sie-zmienia-kiedy-ai-ma-cialo/';
const embodiedEnglishArticleRoute = '/articles/what-changes-when-ai-has-a-body/';
const aiThinkingPolishDraftRoute = '/pl/articles/nie-pytaj-czy-ai-nas-oglupia/';
const aiThinkingEnglishDraftRoute = '/articles/dont-ask-whether-ai-makes-us-dumber/';
const thirdEnglishArticleTitle =
  'AI does not read people. It helps make sense of the situation.';
const thirdPolishArticleTitle = 'AI nie czyta ludzi. Pomaga uporządkować sytuację.';
const mirrorPolishArticleTitle = 'AI jako lustro. Dlaczego tak łatwo się z nim dogadujemy?';
const mirrorEnglishArticleTitle = 'AI as a mirror: why it can feel so easy to talk to';
const oldAiPathPolishArticleTitle =
  'Od źródła do odpowiedzi. Jak AI zmienia drogę między człowiekiem a wiedzą';
const oldAiPathEnglishArticleTitle =
  'From sources to answers: how AI changes the path between people and knowledge';
const aiPathPolishArticleTitle = 'Zaufanie w epoce gotowych odpowiedzi';
const aiPathEnglishArticleTitle = 'Trust in the age of ready-made answers';
const aiFearsPolishArticleTitle = 'Czy boimy się AI, czy boimy się samych siebie?';
const aiFearsEnglishArticleTitle = 'Are we afraid of AI, or of ourselves?';
const embodiedPolishArticleTitle = 'Co się zmienia, kiedy AI ma ciało?';
const embodiedEnglishArticleTitle = 'What changes when AI has a body?';
const aiFearsHeroImage = '/images/articles/ai-fear-human-mirror.webp';
const aiFearsSocialImage = '/images/articles/ai-fear-human-mirror-social.webp';
const oldAiFearsHeroImage = '/images/articles/human-ai-workflow-judgment.webp';
const aiFearsInlineImages = [
  {
    id: 'amplifier-buffer-alibi',
    src: '/images/articles/ai-amplifier-buffer-alibi.webp',
    enAlt:
      'A three-part illustration of AI amplifying a goal, separating a person from consequences and becoming a visible target of blame.',
    plAlt:
      'Trzyczęściowa ilustracja AI wzmacniającej cel, oddalającej człowieka od konsekwencji i stającej się widocznym obiektem obwiniania.',
    enCaption:
      'AI may act as an amplifier, a moral buffer and a moral alibi. These are interpretive categories, not validated psychological constructs.',
    plCaption:
      'AI może pełnić rolę wzmacniacza, bufora moralnego i moralnego alibi. Są to kategorie interpretacyjne, a nie zwalidowane konstrukty psychologiczne.'
  },
  {
    id: 'decision-chain',
    src: '/images/articles/ai-decision-chain-behind-output.webp',
    enAlt:
      'A single AI recommendation in front of a hidden network of people, institutions and decision paths.',
    plAlt:
      'Pojedyncza rekomendacja AI na tle ukrytej sieci ludzi, instytucji i dróg prowadzących do decyzji.',
    enCaption:
      'A system output may look self-contained even though it rests on goals, data, procedures and approvals chosen by people.',
    plCaption:
      'Wynik systemu może wyglądać na samodzielny, choć opiera się na celach, danych, procedurach i zatwierdzeniach wybranych przez ludzi.'
  },
  {
    id: 'responsibility-tracing',
    src: '/images/articles/ai-responsibility-tracing.webp',
    enAlt:
      'A responsibility path linking human goals, AI mediation, human approval, real-world consequences and a route for appeal.',
    plAlt:
      'Droga odpowiedzialności łącząca ludzkie cele, pośrednictwo AI, zatwierdzenie przez człowieka, realne konsekwencje i możliwość odwołania.',
    enCaption:
      'Responsibility becomes clearer when the path from goal to consequence, intervention and repair can be reconstructed.',
    plCaption:
      'Odpowiedzialność staje się wyraźniejsza, gdy można odtworzyć drogę od celu do konsekwencji, interwencji i naprawy.'
  }
] as const;

async function expectAiFearsIllustrations(page: Page, lang: 'en' | 'pl') {
  const heroAlt =
    lang === 'pl'
      ? 'Człowiek stojący naprzeciw przezroczystej postaci AI i ludzkiego odbicia, symbolizujących lęk, sprawczość i odpowiedzialność.'
      : 'A person facing a translucent AI figure and a human reflection, symbolizing fear, agency and responsibility.';
  const heroCaption =
    lang === 'pl'
      ? 'Lęk może skupić się na maszynie, choć za interfejsem nadal pozostają ludzkie intencje i odpowiedzialność.'
      : 'Fear may settle on the machine even when human intentions and responsibility remain behind the interface.';
  const hero = page.locator('.article-hero-figure img');

  await expect(hero).toHaveAttribute('src', aiFearsHeroImage);
  await expect(hero).toHaveAttribute('alt', heroAlt);
  await expect(hero).toHaveAttribute('width', '1600');
  await expect(hero).toHaveAttribute('height', '900');
  await expect(page.locator('.article-hero-figure figcaption')).toHaveText(heroCaption);
  const heroRatio = await hero.evaluate((element: HTMLImageElement) => {
    const { width, height } = element.getBoundingClientRect();
    return width / height;
  });
  expect(heroRatio).toBeCloseTo(16 / 9, 2);

  const socialImageUrl = `https://promptedpsyche.com${aiFearsSocialImage}`;
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', socialImageUrl);
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute('content', '1200');
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute('content', '630');
  await expect(page.locator('meta[property="og:image:type"]')).toHaveAttribute('content', 'image/webp');
  await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute('content', heroAlt);
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', socialImageUrl);
  await expect(page.locator('meta[name="twitter:image:alt"]')).toHaveAttribute('content', heroAlt);

  const inlineFigures = page.locator('[data-qa="ai-fear-figure"]');
  await expect(inlineFigures).toHaveCount(3);

  for (const expected of aiFearsInlineImages) {
    const figure = page.locator(`[data-figure="${expected.id}"]`);
    const image = figure.locator('img');
    await expect(figure).toHaveCount(1);
    await expect(image).toHaveAttribute('src', expected.src);
    await expect(image).toHaveAttribute('alt', lang === 'pl' ? expected.plAlt : expected.enAlt);
    await expect(image).toHaveAttribute('width', '1600');
    await expect(image).toHaveAttribute('height', '900');
    await expect(image).toHaveAttribute('loading', 'lazy');
    await expect(image).toHaveAttribute('decoding', 'async');
    await expect(figure.locator('figcaption')).toHaveText(
      lang === 'pl' ? expected.plCaption : expected.enCaption
    );
  }
  await expect(page.locator(`img[src="${oldAiFearsHeroImage}"]`)).toHaveCount(0);
}

test.describe('published articles', () => {
  test('serves every AI fears article illustration as WebP', async ({ request }) => {
    const imagePaths = [
      aiFearsHeroImage,
      aiFearsSocialImage,
      ...aiFearsInlineImages.map((image) => image.src)
    ];

    for (const imagePath of imagePaths) {
      const response = await request.get(imagePath);
      expect(response.ok(), `${imagePath} should be available`).toBeTruthy();
      expect(response.headers()['content-type']).toContain('image/webp');
      expect((await response.body()).byteLength).toBeGreaterThan(0);
    }
  });

  test('shows the English article on the English articles index', async ({ page }) => {
    await page.goto('/articles/');

    await expect(page.locator('.entry-list article')).toHaveCount(7);
    await expect(page.locator('.entry-list')).toContainText('It is not just about the prompt');
    await expect(page.locator('.entry-list')).toContainText(
      'The model does not remember. It works with context.'
    );
    await expect(page.locator('.entry-list')).toContainText(thirdEnglishArticleTitle);
    await expect(page.locator('.entry-list')).toContainText(mirrorEnglishArticleTitle);
    await expect(page.locator('.entry-list')).toContainText(aiPathEnglishArticleTitle);
    await expect(page.locator('.entry-list')).toContainText(aiFearsEnglishArticleTitle);
    await expect(page.locator('.entry-list')).toContainText(embodiedEnglishArticleTitle);
    await expect(page.locator('.entry-list')).not.toContainText(oldAiPathEnglishArticleTitle);
    await expect(page.locator('.entry-list')).not.toContainText(
      'AI does not read people. It helps read context.'
    );
    const titles = await page.locator('.entry-title-link').allTextContents();
    expect(titles).toHaveLength(7);
    expect(titles).toEqual(expect.arrayContaining([
      embodiedEnglishArticleTitle,
      aiFearsEnglishArticleTitle,
      aiPathEnglishArticleTitle,
      mirrorEnglishArticleTitle,
      thirdEnglishArticleTitle,
      'The model does not remember. It works with context.',
      'It is not just about the prompt'
    ]));
    const titleLink = page.getByRole('link', {
      name: 'It is not just about the prompt',
      exact: true
    });
    const ctaLink = page.getByRole('link', {
      name: 'Read article: It is not just about the prompt'
    });

    await expect(titleLink).toHaveAttribute('href', englishArticleRoute);
    await expect(ctaLink).toHaveAttribute('href', englishArticleRoute);
    await expect(ctaLink).toContainText('Read article');
    await expect(ctaLink.locator('span[aria-hidden="true"]')).toHaveText('->');
    await expect(ctaLink).toBeVisible();
    await ctaLink.focus();
    await expect(ctaLink).toBeFocused();

    const secondTitleLink = page.getByRole('link', {
      name: 'The model does not remember. It works with context.',
      exact: true
    });
    const secondCtaLink = page.getByRole('link', {
      name: 'Read article: The model does not remember. It works with context.'
    });

    await expect(secondTitleLink).toHaveAttribute('href', secondEnglishArticleRoute);
    await expect(secondCtaLink).toHaveAttribute('href', secondEnglishArticleRoute);

    const thirdTitleLink = page.getByRole('link', {
      name: thirdEnglishArticleTitle,
      exact: true
    });
    const thirdCtaLink = page.getByRole('link', {
      name: `Read article: ${thirdEnglishArticleTitle}`
    });

    await expect(thirdTitleLink).toHaveAttribute('href', thirdEnglishArticleRoute);
    await expect(thirdCtaLink).toHaveAttribute('href', thirdEnglishArticleRoute);
    await expect(thirdCtaLink).toContainText('Read article');
    await expect(thirdCtaLink.locator('span[aria-hidden="true"]')).toHaveText('->');

    const mirrorTitleLink = page.getByRole('link', {
      name: mirrorEnglishArticleTitle,
      exact: true
    });
    const mirrorCtaLink = page.getByRole('link', {
      name: `Read article: ${mirrorEnglishArticleTitle}`
    });

    await expect(mirrorTitleLink).toHaveAttribute('href', mirrorEnglishArticleRoute);
    await expect(mirrorCtaLink).toHaveAttribute('href', mirrorEnglishArticleRoute);

    const aiPathTitleLink = page.getByRole('link', {
      name: aiPathEnglishArticleTitle,
      exact: true
    });
    const aiPathCtaLink = page.getByRole('link', {
      name: `Read article: ${aiPathEnglishArticleTitle}`
    });

    await expect(aiPathTitleLink).toHaveAttribute('href', aiPathEnglishArticleRoute);
    await expect(aiPathCtaLink).toHaveAttribute('href', aiPathEnglishArticleRoute);
    await expect(aiPathTitleLink.locator('xpath=ancestor::article').locator('time')).toHaveText(
      'July 2, 2026'
    );

    const aiFearsTitleLink = page.getByRole('link', {
      name: aiFearsEnglishArticleTitle,
      exact: true
    });
    const aiFearsCtaLink = page.getByRole('link', {
      name: `Read article: ${aiFearsEnglishArticleTitle}`
    });

    await expect(aiFearsTitleLink).toHaveAttribute('href', aiFearsEnglishArticleRoute);
    await expect(aiFearsCtaLink).toHaveAttribute('href', aiFearsEnglishArticleRoute);

    const embodiedTitleLink = page.getByRole('link', {
      name: embodiedEnglishArticleTitle,
      exact: true
    });
    const embodiedCtaLink = page.getByRole('link', {
      name: `Read article: ${embodiedEnglishArticleTitle}`
    });

    await expect(embodiedTitleLink).toHaveAttribute('href', embodiedEnglishArticleRoute);
    await expect(embodiedCtaLink).toHaveAttribute('href', embodiedEnglishArticleRoute);
  });

  test('shows the Polish article on the Polish articles index', async ({ page }) => {
    await page.goto('/pl/articles/');

    await expect(page.locator('.entry-list article')).toHaveCount(7);
    await expect(page.locator('.entry-list')).toContainText('Nie chodzi tylko o prompt');
    await expect(page.locator('.entry-list')).toContainText(mirrorPolishArticleTitle);
    await expect(page.locator('.entry-list')).toContainText(aiPathPolishArticleTitle);
    await expect(page.locator('.entry-list')).toContainText(aiFearsPolishArticleTitle);
    await expect(page.locator('.entry-list')).toContainText(embodiedPolishArticleTitle);
    await expect(page.locator('.entry-list')).not.toContainText(oldAiPathPolishArticleTitle);
    const titleLink = page.getByRole('link', {
      name: 'Nie chodzi tylko o prompt',
      exact: true
    });
    const ctaLink = page.getByRole('link', {
      name: 'Czytaj artykuł: Nie chodzi tylko o prompt'
    });

    await expect(titleLink).toHaveAttribute('href', polishArticleRoute);
    await expect(ctaLink).toHaveAttribute('href', polishArticleRoute);
    await expect(ctaLink).toContainText('Czytaj artykuł');
    await expect(ctaLink.locator('span[aria-hidden="true"]')).toHaveText('->');
    await expect(ctaLink).toBeVisible();
    await ctaLink.focus();
    await expect(ctaLink).toBeFocused();

    const mirrorTitleLink = page.getByRole('link', {
      name: mirrorPolishArticleTitle,
      exact: true
    });
    const mirrorCtaLink = page.getByRole('link', {
      name: `Czytaj artykuł: ${mirrorPolishArticleTitle}`
    });

    await expect(mirrorTitleLink).toHaveAttribute('href', mirrorPolishArticleRoute);
    await expect(mirrorCtaLink).toHaveAttribute('href', mirrorPolishArticleRoute);

    const aiPathTitleLink = page.getByRole('link', {
      name: aiPathPolishArticleTitle,
      exact: true
    });
    const aiPathCtaLink = page.getByRole('link', {
      name: `Czytaj artykuł: ${aiPathPolishArticleTitle}`
    });

    await expect(aiPathTitleLink).toHaveAttribute('href', aiPathPolishArticleRoute);
    await expect(aiPathCtaLink).toHaveAttribute('href', aiPathPolishArticleRoute);
    await expect(aiPathTitleLink.locator('xpath=ancestor::article').locator('time')).toHaveText(
      '2 lipca 2026'
    );

    const aiFearsTitleLink = page.getByRole('link', {
      name: aiFearsPolishArticleTitle,
      exact: true
    });
    const aiFearsCtaLink = page.getByRole('link', {
      name: `Czytaj artykuł: ${aiFearsPolishArticleTitle}`
    });

    await expect(aiFearsTitleLink).toHaveAttribute('href', aiFearsPolishArticleRoute);
    await expect(aiFearsCtaLink).toHaveAttribute('href', aiFearsPolishArticleRoute);

    const embodiedTitleLink = page.getByRole('link', {
      name: embodiedPolishArticleTitle,
      exact: true
    });
    const embodiedCtaLink = page.getByRole('link', {
      name: `Czytaj artykuł: ${embodiedPolishArticleTitle}`
    });

    await expect(embodiedTitleLink).toHaveAttribute('href', embodiedPolishArticleRoute);
    await expect(embodiedCtaLink).toHaveAttribute('href', embodiedPolishArticleRoute);
  });

  test('shows the third Polish article on the Polish articles index', async ({ page }) => {
    await page.goto('/pl/articles/');

    const titles = await page.locator('.entry-title-link').allTextContents();
    expect(titles).toHaveLength(7);
    expect(titles).toEqual(expect.arrayContaining([
      embodiedPolishArticleTitle,
      aiFearsPolishArticleTitle,
      aiPathPolishArticleTitle,
      mirrorPolishArticleTitle,
      thirdPolishArticleTitle,
      'Model nie pamięta. Model ma kontekst.',
      'Nie chodzi tylko o prompt'
    ]));
    await expect(page.locator('.entry-list')).not.toContainText(
      'AI nie czyta ludzi. Pomaga czytać kontekst.'
    );

    const titleLink = page.getByRole('link', {
      name: thirdPolishArticleTitle,
      exact: true
    });
    const ctaLink = page.getByRole('link', {
      name: `Czytaj artykuł: ${thirdPolishArticleTitle}`
    });

    await expect(titleLink).toHaveAttribute('href', thirdPolishArticleRoute);
    await expect(ctaLink).toHaveAttribute('href', thirdPolishArticleRoute);
    await expect(ctaLink).toBeVisible();
  });

  test('shows the second Polish article on the Polish articles index', async ({ page }) => {
    await page.goto('/pl/articles/');

    await expect(page.locator('.entry-list')).toContainText(
      'Model nie pamięta. Model ma kontekst.'
    );
    const titleLink = page.getByRole('link', {
      name: 'Model nie pamięta. Model ma kontekst.',
      exact: true
    });
    const ctaLink = page.getByRole('link', {
      name: 'Czytaj artykuł: Model nie pamięta. Model ma kontekst.'
    });

    await expect(titleLink).toHaveAttribute('href', secondPolishArticleRoute);
    await expect(ctaLink).toHaveAttribute('href', secondPolishArticleRoute);
    await expect(ctaLink).toBeVisible();
  });

  test('does not show the Polish article on the English articles index', async ({ page }) => {
    await page.goto('/articles/');

    await expect(page.locator('body')).not.toContainText('Nie chodzi tylko o prompt');
    await expect(page.locator('body')).not.toContainText('Model nie pamięta. Model ma kontekst.');
    await expect(page.locator('body')).not.toContainText(thirdPolishArticleTitle);
    await expect(page.locator('body')).not.toContainText(mirrorPolishArticleTitle);
    await expect(page.locator('body')).not.toContainText(aiPathPolishArticleTitle);
    await expect(page.locator('body')).not.toContainText(aiFearsPolishArticleTitle);
  });

  test('does not show the English article on the Polish articles index', async ({ page }) => {
    await page.goto('/pl/articles/');

    await expect(page.locator('body')).not.toContainText('It is not just about the prompt');
    await expect(page.locator('body')).not.toContainText(
      'The model does not remember. It works with context.'
    );
    await expect(page.locator('body')).not.toContainText(
      thirdEnglishArticleTitle
    );
    await expect(page.locator('body')).not.toContainText(mirrorEnglishArticleTitle);
    await expect(page.locator('body')).not.toContainText(aiPathEnglishArticleTitle);
    await expect(page.locator('body')).not.toContainText(aiFearsEnglishArticleTitle);
  });

  test('renders the English article detail page with byline, citation and rights notice', async ({ page }) => {
    await page.goto(englishArticleRoute);

    await expect(page.locator('.content-header h1')).toHaveText('It is not just about the prompt');
    await expect(page.locator('[data-qa="article-byline"]')).toContainText('By Feliks Mamczur');
    await expect(page.locator('[data-qa="article-byline"]')).toContainText('Prompted Psyche');
    await expect(page.locator('[data-qa="article-byline"]')).toContainText('Published:');
    await expect(page.locator('[data-qa="article-byline"] a[href="/about/"]')).toBeVisible();
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText('Suggested citation');
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
      'Mamczur, F. (2026, March 12). It is not just about the prompt. Prompted Psyche. https://promptedpsyche.com/articles/it-is-not-just-about-the-prompt/'
    );
    await expect(page.locator('[data-qa="suggested-citation"]')).not.toContainText('DOI');
    await expect(page.locator('[data-qa="rights-notice"][data-variant="content"]')).toContainText(
      'All rights reserved'
    );
    await expect(page.locator('.article-hero-figure img')).toHaveAttribute(
      'src',
      '/images/articles/human-ai-workflow-judgment.webp'
    );
    await expect(page.locator('.article-hero-figure img')).toHaveAttribute(
      'alt',
      'Diagram showing that the prompt is only one part of AI work, alongside context, attention, trust, verification, cognitive load and responsibility.'
    );
    await expect(page.locator('.article-hero-figure figcaption')).toContainText(
      'A prompt is only one point'
    );
    await expect(page.locator('.editorial-aside')).toContainText('Pause');
    await expect(page.locator('body')).not.toContainText(/PRZYGOTOWANE POD/i);
    await expect(page.locator('[data-qa="article-aside-label"]')).toHaveText('In this article');

    const conceptLinks = page.locator('.prose a[href^="/concepts/"]');
    await expect(conceptLinks).toHaveCount(11);
    await expect(page.locator('.prose a[href="/concepts/context-window/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/epistemic-vigilance/"]')).toBeVisible();
  });

  test('renders the Polish article detail page with byline, citation, rights notice and concept links', async ({ page }) => {
    await page.goto(polishArticleRoute);

    await expect(page.locator('.content-header h1')).toHaveText('Nie chodzi tylko o prompt');
    await expect(page.locator('[data-qa="article-byline"]')).toContainText('Autor: Feliks Mamczur');
    await expect(page.locator('[data-qa="article-byline"]')).toContainText('Prompted Psyche');
    await expect(page.locator('[data-qa="article-byline"]')).toContainText('Opublikowano:');
    await expect(page.locator('[data-qa="article-byline"] a[href="/pl/about/"]')).toBeVisible();
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText('Jak cytować');
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
      'Mamczur, F. (2026, 12 marca). Nie chodzi tylko o prompt. Prompted Psyche. https://promptedpsyche.com/pl/articles/nie-chodzi-tylko-o-prompt/'
    );
    await expect(page.locator('[data-qa="suggested-citation"]')).not.toContainText('DOI');
    await expect(page.locator('[data-qa="rights-notice"][data-variant="content"]')).toContainText(
      'Wszystkie prawa zastrzeżone'
    );
    await expect(page.locator('.article-hero-figure img')).toHaveAttribute(
      'src',
      '/images/articles/human-ai-workflow-judgment.webp'
    );
    await expect(page.locator('.article-hero-figure img')).toHaveAttribute(
      'alt',
      'Diagram pokazujący, że prompt jest tylko częścią pracy z AI: obok kontekstu, uwagi, zaufania, weryfikacji, obciążenia poznawczego i odpowiedzialności.'
    );
    await expect(page.locator('.article-hero-figure figcaption')).toContainText(
      'Prompt jest tylko jednym punktem'
    );
    await expect(page.locator('.editorial-aside')).toContainText('Zatrzymaj się');
    await expect(page.locator('body')).not.toContainText(/PRZYGOTOWANE POD/i);
    await expect(page.locator('[data-qa="article-aside-label"]')).toHaveText('W tekście');

    const conceptLinks = page.locator('.prose a[href^="/pl/concepts/"]');
    await expect(conceptLinks).toHaveCount(11);
    await expect(page.locator('.prose a[href="/pl/concepts/context-window/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/epistemic-vigilance/"]')).toBeVisible();
  });

  test('renders the second Polish article detail page with byline, citation, rights notice and concept links', async ({ page }) => {
    await page.goto(secondPolishArticleRoute);

    await expect(page.locator('.content-header h1')).toHaveText(
      'Model nie pamięta. Model ma kontekst.'
    );
    await expect(page.locator('[data-qa="article-byline"]')).toContainText('Autor: Feliks Mamczur');
    await expect(page.locator('[data-qa="article-byline"] a[href="/pl/about/"]')).toBeVisible();
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText('Jak cytować');
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
      'Mamczur, F. (2026, 28 marca). Model nie pamięta. Model ma kontekst. Prompted Psyche. https://promptedpsyche.com/pl/articles/model-nie-pamieta-model-ma-kontekst/'
    );
    await expect(page.locator('[data-qa="suggested-citation"]')).not.toContainText('DOI');
    await expect(page.locator('[data-qa="rights-notice"][data-variant="content"]')).toContainText(
      'Wszystkie prawa zastrzeżone'
    );
    await expect(page.locator('.article-hero-figure img')).toHaveAttribute(
      'src',
      '/images/articles/model-context-window-diagram.svg'
    );
    await expect(page.locator('.article-hero-figure figcaption')).toContainText(
      'dostępnym kontekście'
    );
    await expect(page.locator('.editorial-aside')).toContainText('W praktyce');

    const conceptLinks = page.locator('.prose a[href^="/pl/concepts/"]');
    await expect(conceptLinks).toHaveCount(10);
    await expect(page.locator('.prose a[href="/pl/concepts/context-window/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/token/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/mental-model/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/cognitive-load/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/epistemic-vigilance/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/human-ai-interaction/"]')).toBeVisible();
  });

  test('renders the third Polish article detail page with byline, citation, rights notice and concept links', async ({ page }) => {
    await page.goto(thirdPolishArticleRoute);

    await expect(page.locator('.content-header h1')).toHaveText(thirdPolishArticleTitle);
    await expect(page.locator('.prose')).toContainText(
      'Poniższy przykład jest kompozytowy i zanonimizowany'
    );
    await expect(page.locator('[data-qa="article-byline"]')).toContainText('Autor: Feliks Mamczur');
    await expect(page.locator('[data-qa="article-byline"] a[href="/pl/about/"]')).toBeVisible();
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText('Jak cytować');
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
      `${thirdPolishArticleTitle} Prompted Psyche. https://promptedpsyche.com/pl/articles/ai-nie-czyta-ludzi-pomaga-uporzadkowac-sytuacje/`
    );
    await expect(page.locator('[data-qa="suggested-citation"]')).not.toContainText('DOI');
    await expect(page.locator('[data-qa="suggested-citation"]')).not.toContainText('DOI');
    await expect(page.locator('[data-qa="rights-notice"][data-variant="content"]')).toContainText(
      'Wszystkie prawa zastrzeżone'
    );
    await expect(page.locator('.article-hero-figure img')).toHaveAttribute(
      'src',
      '/images/articles/communication-situation-map.svg'
    );
    await expect(page.locator('.article-hero-figure figcaption')).toContainText(
      'fakty, hipotezy'
    );
    await expect(page.locator('.editorial-aside')).toContainText('Granica');

    const conceptLinks = page.locator('.prose a[href^="/pl/concepts/"]');
    await expect(conceptLinks).toHaveCount(10);
    await expect(page.locator('.prose a[href="/pl/concepts/context-window/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/model-output/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/mental-model/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/epistemic-vigilance/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/ai-mediated-communication/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/calibrated-trust/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/metacognition/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/cognitive-load/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/nadzor-ze-strony-czlowieka/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/ai-literacy/"]')).toBeVisible();
    await expect(
      page.locator(
        '.language-switcher a[href="/articles/ai-does-not-read-people-it-helps-make-sense-of-the-situation/"]'
      )
    ).toBeVisible();
  });

  test('renders copyable prompt examples in the third Polish article', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: async (text: string) => {
            (window as Window & { __copiedPrompt?: string }).__copiedPrompt = text;
          }
        }
      });
    });
    await page.goto(thirdPolishArticleRoute);

    const promptBoxes = page.locator('.prompt-example');
    await expect(promptBoxes).toHaveCount(2);
    await expect(promptBoxes.nth(0)).toContainText('Nie pytaj tak');
    await expect(promptBoxes.nth(1)).toContainText('Lepsze pytanie');
    await expect(page.getByRole('button', { name: 'Kopiuj przykładowy prompt' })).toHaveCount(2);

    await page.locator('.prompt-example--better .prompt-example__copy').click();
    await expect(page.locator('.prompt-example--better .prompt-example__copy')).toContainText(
      'Skopiowano'
    );
    const copiedPrompt = await page.evaluate(
      () => (window as Window & { __copiedPrompt?: string }).__copiedPrompt
    );
    expect(copiedPrompt).toContain('Wypisz możliwe interpretacje');
  });

  test('renders the third English article detail page with byline, citation, rights notice and concept links', async ({ page }) => {
    await page.goto(thirdEnglishArticleRoute);

    await expect(page.locator('.content-header h1')).toHaveText(thirdEnglishArticleTitle);
    await expect(page.locator('.prose')).toContainText(
      'The example below is composite and anonymized'
    );
    await expect(page.locator('.prose')).toContainText(
      'AI did not solve the conflict. AI helped organize what was worth asking.'
    );
    await expect(page.locator('[data-qa="article-byline"]')).toContainText('By Feliks Mamczur');
    await expect(page.locator('[data-qa="article-byline"] a[href="/about/"]')).toBeVisible();
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText('Suggested citation');
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
      'Mamczur, F. (2026, April 17). AI does not read people. It helps make sense of the situation. Prompted Psyche. https://promptedpsyche.com/articles/ai-does-not-read-people-it-helps-make-sense-of-the-situation/'
    );
    await expect(page.locator('[data-qa="suggested-citation"]')).not.toContainText('DOI');
    await expect(page.locator('[data-qa="suggested-citation"]')).not.toContainText('DOI');
    await expect(page.locator('[data-qa="rights-notice"][data-variant="content"]')).toContainText(
      'All rights reserved'
    );
    await expect(page.locator('.article-hero-figure img')).toHaveAttribute(
      'src',
      '/images/articles/communication-situation-map.svg'
    );
    await expect(page.locator('.article-hero-figure figcaption')).toContainText(
      'facts, hypotheses'
    );
    await expect(page.locator('.editorial-aside')).toContainText('Boundary');

    const conceptLinks = page.locator('.prose a[href^="/concepts/"]');
    await expect(conceptLinks).toHaveCount(10);
    await expect(page.locator('.prose a[href="/concepts/context-window/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/model-output/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/mental-model/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/epistemic-vigilance/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/ai-mediated-communication/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/calibrated-trust/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/metacognition/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/cognitive-load/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/human-oversight/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/ai-literacy/"]')).toBeVisible();
    await expect(
      page.locator(
        '.language-switcher a[href="/pl/articles/ai-nie-czyta-ludzi-pomaga-uporzadkowac-sytuacje/"]'
      )
    ).toBeVisible();
  });

  test('renders copyable prompt examples in the third English article', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: async (text: string) => {
            (window as Window & { __copiedPrompt?: string }).__copiedPrompt = text;
          }
        }
      });
    });
    await page.goto(thirdEnglishArticleRoute);

    const promptBoxes = page.locator('.prompt-example');
    await expect(promptBoxes).toHaveCount(2);
    await expect(promptBoxes.nth(0)).toContainText('Do not ask this');
    await expect(promptBoxes.nth(1)).toContainText('Better question');
    await expect(page.getByRole('button', { name: 'Copy example prompt' })).toHaveCount(2);

    await page.locator('.prompt-example--better .prompt-example__copy').click();
    await expect(page.locator('.prompt-example--better .prompt-example__copy')).toContainText(
      'Copied'
    );
    const copiedPrompt = await page.evaluate(
      () => (window as Window & { __copiedPrompt?: string }).__copiedPrompt
    );
    expect(copiedPrompt).toContain('List possible readings');
  });

  test('renders the AI path Polish article with sources, tags, concepts and language alternate', async ({ page }) => {
    await page.goto(aiPathPolishArticleRoute);

    await expect(page.locator('.content-header h1')).toHaveText(aiPathPolishArticleTitle);
    const inBrief = page.locator('[data-qa="in-brief"]');
    await expect(inBrief).toHaveCount(1);
    await expect(inBrief.locator('summary.in-brief__summary')).toHaveText('W skrócie');
    await inBrief.locator('summary').click();
    await expect(inBrief.locator('.in-brief__body')).toBeVisible();
    await expect(inBrief).toContainText('Generatywna AI zmienia nie tylko dostęp do informacji');
    await expect(page.locator('body')).not.toContainText('TL;DR');
    await expect(page.locator('.prose')).toContainText('Abstrakt');
    await expect(page.locator('.prose')).toContainText('Zakres i metoda');
    await expect(page.locator('.prose')).toContainText('Gdy droga poznawcza ulega kompresji');
    await expect(page.locator('.prose')).toContainText('Odtwórz drogę od odpowiedzi do dowodów');
    await expect(page.locator('.prose')).toContainText('Ograniczenia argumentu');
    await expect(page.locator('.prose')).toContainText('kompresja drogi poznawczej');
    await expect(page.locator('.prose')).toContainText('Nature');
    await expect(page.locator('.prose')).toContainText('Pearson');
    await expect(page.locator('.content-header h1')).not.toHaveText(
      'Have people stopped trusting science? The data tell a surprising story'
    );
    const byline = page.locator('[data-qa="article-byline"]');
    await expect(byline).toContainText('Autor: Feliks Mamczur');
    await expect(byline).toContainText('Opublikowano: 2 lipca 2026');
    await expect(byline).toContainText('Aktualizacja: 10 lipca 2026');
    await expect(byline.locator('time[datetime^="2026-07-02"]')).toHaveCount(1);
    await expect(byline.locator('time[datetime^="2026-07-10"]')).toHaveCount(1);
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText('Jak cytować');
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
      `Mamczur, F. (2026, 2 lipca). ${aiPathPolishArticleTitle}. Prompted Psyche. https://promptedpsyche.com${aiPathPolishArticleRoute}`
    );
    await expect(page.locator('[data-qa="suggested-citation"]')).not.toContainText('DOI');
    await expect(page.locator('[data-qa="rights-notice"][data-variant="content"]')).toContainText(
      'Wszystkie prawa zastrzeżone'
    );
    await expect(page.locator('.article-hero-figure img')).toHaveAttribute(
      'src',
      '/images/articles/ai-path-to-knowledge.svg'
    );
    await expect(page.locator('.article-hero-figure img')).toHaveAttribute(
      'alt',
      'Diagram pokazujący, jak AI zmienia drogę między człowiekiem a wiedzą: model daje szybką odpowiedź, a pod spodem pozostają źródła, metoda, dane, spór i weryfikacja.'
    );
    await expect(page.locator('.article-hero-figure figcaption')).toContainText(
      'AI może skrócić drogę'
    );
    await expect(page.locator('[data-qa="key-passage"]')).toHaveCount(1);
    await expect(page.locator('[data-qa="practice-block"]')).toHaveCount(1);
    await expect(page.locator('.content-tags a[href="/pl/tags/ai-i-czlowiek/"]')).toBeVisible();
    await expect(page.locator('.content-tags a[href="/pl/tags/zaufanie-do-ai/"]')).toBeVisible();
    await expect(page.locator('.content-tags a[href="/pl/tags/wiedza/"]')).toBeVisible();
    await expect(page.locator('.content-tags a[href="/pl/tags/nauka/"]')).toBeVisible();
    await expect(page.locator('.content-tags a[href="/pl/tags/ai-literacy/"]')).toBeVisible();

    const conceptLinks = page.locator('.prose a[href^="/pl/concepts/"]');
    await expect(conceptLinks).toHaveCount(10);
    await expect(page.locator('.prose a[href="/pl/concepts/epistemic-vigilance/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/calibrated-trust/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/model-output/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/oparcie-odpowiedzi-na-zrodlach/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/halucynacja-modelu/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/nadmierne-poleganie-na-ai/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/human-ai-interaction/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/cognitive-offloading/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/ai-literacy/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/sprawczosc-czlowieka/"]')).toBeVisible();
    await expect(page.locator('.prose')).toContainText('Źródła i dalsza lektura');
    await expect(page.locator('h2:has-text("Źródła i dalsza lektura") + ul > li')).toHaveCount(18);
    await expect(
      page.locator(
        `.language-switcher a[href="${aiPathEnglishArticleRoute}"]`
      )
    ).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://promptedpsyche.com${aiPathPolishArticleRoute}`
    );
    const polishDoiUrl = 'https://doi.org/10.5281/zenodo.21301650';
    const polishByline = page.locator('[data-qa="article-byline"]');
    await expect(polishByline).toContainText('DOI wersji angielskiej (v1.0):');
    await expect(
      polishByline.getByRole('link', { name: 'DOI 10.5281/zenodo.21301650' })
    ).toHaveAttribute('href', polishDoiUrl);
    await expect(page.locator('meta[name="citation_doi"]')).toHaveCount(0);
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
      'https://promptedpsyche.com/pl/articles/zaufanie-w-epoce-gotowych-odpowiedzi/'
    );
    await expect(page.locator('[data-qa="rights-notice"][data-variant="content"]')).toContainText(
      'Wszystkie prawa'
    );
    const structuredDataText = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((scripts) => scripts.map((script) => script.textContent ?? '').join('\n'));
    expect(structuredDataText).toContain('"datePublished":"2026-07-02T');
    expect(structuredDataText).toContain('"dateModified":"2026-07-10T');
    expect(structuredDataText).not.toContain('"propertyID":"DOI"');
    expect(structuredDataText).not.toContain('"license":"https://creativecommons.org/licenses/by/4.0/"');
    await expect(page.locator('body')).not.toContainText('18 czerwca 2026');
    await expect(page.locator('body')).not.toContainText('Ten artykuł jest recenzowany');
    await expect(page.locator('body')).not.toContainText('10.0000/placeholder');
    await expect(page.locator('body')).not.toContainText('nauce nie należy ufać');
    await expect(page.locator('body')).not.toContainText('AI zastępuje ekspertów');
    await expect(page.locator('body')).not.toContainText('źródła są niepotrzebne');
    await expect(page.locator('body')).not.toContainText('automatyczna diagnoza');
  });

  test('renders copyable prompt examples in the AI path Polish article', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: async (text: string) => {
            (window as Window & { __copiedPrompt?: string }).__copiedPrompt = text;
          }
        }
      });
    });
    await page.goto(aiPathPolishArticleRoute);

    const promptBoxes = page.locator('.prompt-example');
    await expect(promptBoxes).toHaveCount(1);
    await expect(promptBoxes).toContainText('Przykładowy prompt');
    await expect(page.getByRole('button', { name: 'Kopiuj przykładowy prompt' })).toHaveCount(1);

    await page.locator('.prompt-example--better .prompt-example__copy').click();
    await expect(page.locator('.prompt-example--better .prompt-example__copy')).toContainText(
      'Skopiowano'
    );
    const copiedPrompt = await page.evaluate(
      () => (window as Window & { __copiedPrompt?: string }).__copiedPrompt
    );
    expect(copiedPrompt).toContain('Rozdziel tę odpowiedź na twierdzenia, źródła, dowody');

    const overflowingBoxes = await page.locator('.prompt-example').evaluateAll((boxes) =>
      boxes
        .map((box) => {
          const rect = box.getBoundingClientRect();
          return rect.left < -1 || rect.right > window.innerWidth + 1;
        })
        .filter(Boolean)
    );
    expect(overflowingBoxes).toEqual([]);
  });

  test('renders the revised AI fears Polish article with research boundaries and responsibility tracing', async ({ page }) => {
    await page.goto(aiFearsPolishArticleRoute);

    await expect(page.locator('.content-header h1')).toHaveText(aiFearsPolishArticleTitle);
    const inBrief = page.locator('[data-qa="in-brief"]');
    await expect(inBrief).toHaveCount(1);
    await expect(inBrief.locator('summary.in-brief__summary')).toHaveText('W skrócie');
    await inBrief.locator('summary').click();
    await expect(inBrief.locator('.in-brief__body')).toBeVisible();
    await expect(inBrief).toContainText('Opowieść o samodzielnie działającej, złej AI');
    await expect(inBrief).toContainText('W ograniczonych zadaniach eksperymentalnych');
    await expect(page.locator('body')).not.toContainText('TL;DR');
    await expect(page.locator('.prose')).toContainText('Abstrakt');
    await expect(page.locator('.prose')).toContainText('Zakres i metoda');
    await expect(page.locator('.prose')).toContainText(
      'AI jako wzmacniacz, bufor moralny i moralne alibi'
    );
    await expect(page.locator('.prose')).toContainText('Przypadek hipotetyczny: wskaźnik odejścia');
    await expect(page.locator('.prose')).toContainText('Protokół śledzenia odpowiedzialności');
    await expect(page.locator('.prose')).toContainText('Ograniczenia argumentu');
    await expect(page.locator('.prose')).toContainText('Źródła i dalsza lektura');
    await expect(page.locator('.prose')).toContainText('Köbis');
    await expect(page.locator('.prose')).toContainText('Bandura');
    await expect(page.locator('.prose')).toContainText('Elish');
    await expect(page.locator('.prose')).toContainText('National Institute of Standards and Technology');
    const sourcesHeading = page.getByRole('heading', { name: 'Źródła i dalsza lektura' });
    await expect(sourcesHeading.locator('xpath=following-sibling::ul[1]/li')).toHaveCount(28);
    await expect(page.locator('[data-qa="article-byline"]')).toContainText('Autor: Feliks Mamczur');
    await expect(page.locator('[data-qa="article-byline"] a[href="/pl/about/"]')).toBeVisible();
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText('Jak cytować');
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
      `${aiFearsPolishArticleTitle} Prompted Psyche. https://promptedpsyche.com${aiFearsPolishArticleRoute}`
    );
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
      'Mamczur, F. (2026, 4 lipca)'
    );
    await expect(page.locator('[data-qa="suggested-citation"]')).not.toContainText('DOI');
    await expect(page.locator('meta[name="citation_doi"]')).toHaveCount(0);
    await expect(page.locator('[data-qa="article-byline"]')).toContainText('Aktualizacja: 13 lipca 2026');
    await expect(page.locator('[data-qa="rights-notice"][data-variant="content"]')).toContainText(
      'Wszystkie prawa zastrzeżone'
    );
    await expectAiFearsIllustrations(page, 'pl');
    await expect(page.locator('[data-qa="article-audio"]')).toHaveCount(0);
    await expect(page.locator('audio')).toHaveCount(0);
    await expect(page.locator('[data-qa="practice-block"]')).toHaveCount(1);
    await expect(page.locator('.prompt-example')).toHaveCount(1);
    await expect(page.getByRole('button', { name: 'Kopiuj przykładowy prompt' })).toBeVisible();
    await expect(page.locator('.content-tags a[href="/pl/tags/ai-i-czlowiek/"]')).toBeVisible();
    await expect(page.locator('.content-tags a[href="/pl/tags/odpowiedzialnosc/"]')).toBeVisible();
    await expect(page.locator('.content-tags a[href="/pl/tags/psychologia-moralnosci/"]')).toBeVisible();
    await expect(page.locator('.content-tags a[href="/pl/tags/human-ai-interaction/"]')).toBeVisible();
    await expect(page.locator('.content-tags a[href="/pl/tags/podejmowanie-decyzji/"]')).toBeVisible();
    await expect(page.locator('.content-tags a[href="/pl/tags/zarzadzanie-ai/"]')).toBeVisible();

    const conceptLinks = page.locator('.prose a[href^="/pl/concepts/"]');
    await expect(conceptLinks).toHaveCount(6);
    await expect(page.locator('.prose a[href="/pl/concepts/sprawczosc-czlowieka/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/antropomorfizacja/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/nadzor-ze-strony-czlowieka/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/wspomaganie-decyzji/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/blad-automatyzacji/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/human-ai-interaction/"]')).toBeVisible();
    await expect(page.locator(`.language-switcher a[href="${aiFearsEnglishArticleRoute}"]`)).toBeVisible();
    await expect(page.locator('body')).not.toContainText('Working notes');
    await expect(page.locator('body')).not.toContainText('Source pack');
    await expect(page.locator('body')).not.toContainText('Final copyedit');
    await expect(page.locator('body')).not.toContainText('AI SPECIALIST');
    await expect(page.locator('body')).not.toContainText('ai-specialista');
    await expect(page.locator('body')).not.toContainText('AI ma świadomość');
    await expect(page.locator('body')).not.toContainText('terapia przez AI');
    await expect(page.locator('body')).not.toContainText('automatyczna diagnoza');
    await expect(page.locator('body')).not.toContainText('Samotność znajduje interfejs');
    await expect(page.locator('.prose')).toContainText(
      'Nie są to zwalidowane konstrukty, narzędzie diagnostyczne ani skala.'
    );
    await expect(page.locator('.prose')).toContainText('mechanizmy moralnego odłączenia');
    await expect(page.locator('.prose')).toContainText(
      'nie będąc podmiotami moralnymi w ludzkim sensie'
    );
    await expect(page.locator('.prose')).toContainText(
      'Powinniśmy bać się nie tylko tego, co AI może zrobić'
    );
    await expect(page.locator('.prose')).not.toContainText('ludzkiego życia moralnego');
    await expect(page.locator('.prose')).not.toContainText('Ten recenzowany esej');
  });

  test('renders the revised AI fears English article with research boundaries and responsibility tracing', async ({ page }) => {
    await page.goto(aiFearsEnglishArticleRoute);

    await expect(page.locator('.content-header h1')).toHaveText(aiFearsEnglishArticleTitle);
    const inBrief = page.locator('[data-qa="in-brief"]');
    await expect(inBrief).toHaveCount(1);
    await expect(inBrief.locator('summary.in-brief__summary')).toHaveText('TL;DR');
    await inBrief.locator('summary').click();
    await expect(inBrief.locator('.in-brief__body')).toBeVisible();
    await expect(inBrief).toContainText('The story of an independently evil AI');
    await expect(inBrief).toContainText('In bounded experimental tasks');
    await expect(page.locator('body')).not.toContainText('W skrócie');
    await expect(page.locator('.prose')).toContainText('Abstract');
    await expect(page.locator('.prose')).toContainText('Scope and method');
    await expect(page.locator('.prose')).toContainText(
      'AI as amplifier, moral buffer and moral alibi'
    );
    await expect(page.locator('.prose')).toContainText('Hypothetical case: the retention score');
    await expect(page.locator('.prose')).toContainText('A responsibility-tracing protocol');
    await expect(page.locator('.prose')).toContainText('Limits of the argument');
    await expect(page.locator('.prose')).toContainText('Sources and further reading');
    await expect(page.locator('.prose')).toContainText('Köbis');
    await expect(page.locator('.prose')).toContainText('Bandura');
    await expect(page.locator('.prose')).toContainText('Elish');
    await expect(page.locator('.prose')).toContainText('National Institute of Standards and Technology');
    const sourcesHeading = page.getByRole('heading', { name: 'Sources and further reading' });
    await expect(sourcesHeading.locator('xpath=following-sibling::ul[1]/li')).toHaveCount(28);
    await expect(page.locator('[data-qa="article-byline"]')).toContainText('By Feliks Mamczur');
    await expect(page.locator('[data-qa="article-byline"] a[href="/about/"]')).toBeVisible();
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText('Suggested citation');
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
      `${aiFearsEnglishArticleTitle} Prompted Psyche. https://promptedpsyche.com${aiFearsEnglishArticleRoute}`
    );
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
      'Mamczur, F. (2026, July 4)'
    );
    await expect(page.locator('[data-qa="suggested-citation"]')).not.toContainText('DOI');
    await expect(page.locator('meta[name="citation_doi"]')).toHaveCount(0);
    await expect(page.locator('[data-qa="article-byline"]')).toContainText('Updated: July 13, 2026');
    await expect(page.locator('[data-qa="rights-notice"][data-variant="content"]')).toContainText(
      'All rights reserved'
    );
    await expectAiFearsIllustrations(page, 'en');
    await expect(page.locator('[data-qa="article-audio"]')).toHaveCount(0);
    await expect(page.locator('audio')).toHaveCount(0);
    await expect(page.locator('[data-qa="practice-block"]')).toHaveCount(1);
    await expect(page.locator('.prompt-example')).toHaveCount(1);
    await expect(page.getByRole('button', { name: 'Copy example prompt' })).toBeVisible();
    await expect(page.locator('.content-tags a[href="/tags/ai-and-humans/"]')).toBeVisible();
    await expect(page.locator('.content-tags a[href="/tags/responsibility/"]')).toBeVisible();
    await expect(page.locator('.content-tags a[href="/tags/moral-psychology/"]')).toBeVisible();
    await expect(page.locator('.content-tags a[href="/tags/human-ai-interaction/"]')).toBeVisible();
    await expect(page.locator('.content-tags a[href="/tags/decision-making/"]')).toBeVisible();
    await expect(page.locator('.content-tags a[href="/tags/ai-governance/"]')).toBeVisible();

    const conceptLinks = page.locator('.prose a[href^="/concepts/"]');
    await expect(conceptLinks).toHaveCount(6);
    await expect(page.locator('.prose a[href="/concepts/human-agency/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/anthropomorphism/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/human-oversight/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/decision-support/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/automation-bias/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/human-ai-interaction/"]')).toBeVisible();
    await expect(
      page.locator(`.language-switcher a[href="${aiFearsPolishArticleRoute}"]`)
    ).toBeVisible();
    await expect(page.locator('body')).not.toContainText('Working notes');
    await expect(page.locator('body')).not.toContainText('Source pack');
    await expect(page.locator('body')).not.toContainText('Final copyedit');
    await expect(page.locator('body')).not.toContainText('AI SPECIALIST');
    await expect(page.locator('body')).not.toContainText('ai-specialista');
    await expect(page.locator('body')).not.toContainText('AI has consciousness');
    await expect(page.locator('body')).not.toContainText('AI therapy');
    await expect(page.locator('body')).not.toContainText('automatic diagnosis');
    await expect(page.locator('body')).not.toContainText('how to build');
    await expect(page.locator('body')).not.toContainText('how to attack');
    await expect(page.locator('body')).not.toContainText('Loneliness finds an interface');
    await expect(page.locator('.prose')).toContainText(
      'They are not validated constructs, a diagnostic taxonomy or a scale.'
    );
    await expect(page.locator('.prose')).toContainText(
      'without being moral agents in the human sense'
    );
    await expect(page.locator('.prose')).toContainText(
      'We should fear not only what AI may do'
    );
    await expect(page.locator('.prose')).not.toContainText('human moral life');
    await expect(page.locator('.prose')).not.toContainText('This peer-reviewed essay');
  });

  test('renders the AI path English article with sources, tags, concepts and language alternate', async ({ page }) => {
    await page.goto(aiPathEnglishArticleRoute);

    await expect(page.locator('.content-header h1')).toHaveText(aiPathEnglishArticleTitle);
    const inBrief = page.locator('[data-qa="in-brief"]');
    await expect(inBrief).toHaveCount(1);
    await expect(inBrief.locator('summary.in-brief__summary')).toHaveText('TL;DR');
    await inBrief.locator('summary').click();
    await expect(inBrief.locator('.in-brief__body')).toBeVisible();
    await expect(inBrief).toContainText('Generative AI changes not only access to information');
    await expect(page.locator('body')).not.toContainText('In brief');
    await expect(page.locator('.prose')).toContainText('Abstract');
    await expect(page.locator('.prose')).toContainText('Scope and method');
    await expect(page.locator('.prose')).toContainText('When the epistemic path is compressed');
    await expect(page.locator('.prose')).toContainText('Reconstruct the path from answer to evidence');
    await expect(page.locator('.prose')).toContainText('Limits of this argument');
    await expect(page.locator('.prose')).toContainText('compression of the epistemic path');
    await expect(page.locator('.prose')).toContainText('Nature');
    await expect(page.locator('.prose')).toContainText('Pearson');
    await expect(page.locator('.content-header h1')).not.toHaveText(
      'Have people stopped trusting science? The data tell a surprising story'
    );
    const byline = page.locator('[data-qa="article-byline"]');
    await expect(byline).toContainText('By Feliks Mamczur');
    await expect(byline).toContainText('Published: July 2, 2026');
    await expect(byline).toContainText('Updated: July 10, 2026');
    await expect(byline.locator('time[datetime^="2026-07-02"]')).toHaveCount(1);
    await expect(byline.locator('time[datetime^="2026-07-10"]')).toHaveCount(1);
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText('Suggested citation');
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
      `Mamczur, F. (2026, July 2). ${aiPathEnglishArticleTitle}. Prompted Psyche. https://doi.org/10.5281/zenodo.21301650`
    );
    await expect(page.locator('[data-qa="suggested-citation"]')).not.toContainText('DOI');
    await expect(page.locator('[data-qa="rights-notice"][data-variant="content"]')).toContainText(
      'This article is licensed under CC BY 4.0'
    );
    await expect(page.locator('.article-hero-figure img')).toHaveAttribute(
      'src',
      '/images/articles/ai-path-to-knowledge.svg'
    );
    await expect(page.locator('.article-hero-figure img')).toHaveAttribute(
      'alt',
      'Diagram showing how AI changes the path between people and knowledge: the model provides a fast answer, while sources, methods, data, disagreement and verification remain underneath.'
    );
    await expect(page.locator('.article-hero-figure figcaption')).toContainText(
      'AI can shorten the path'
    );
    await expect(page.locator('[data-qa="key-passage"]')).toHaveCount(1);
    await expect(page.locator('[data-qa="practice-block"]')).toHaveCount(1);
    await expect(page.locator('.content-tags a[href="/tags/ai-and-humans/"]')).toBeVisible();
    await expect(page.locator('.content-tags a[href="/tags/trust-in-ai/"]')).toBeVisible();
    await expect(page.locator('.content-tags a[href="/tags/knowledge/"]')).toBeVisible();
    await expect(page.locator('.content-tags a[href="/tags/science/"]')).toBeVisible();
    await expect(page.locator('.content-tags a[href="/tags/ai-literacy/"]')).toBeVisible();

    const conceptLinks = page.locator('.prose a[href^="/concepts/"]');
    await expect(conceptLinks).toHaveCount(10);
    await expect(page.locator('.prose a[href="/concepts/epistemic-vigilance/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/calibrated-trust/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/model-output/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/grounding/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/hallucination/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/overreliance/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/human-ai-interaction/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/cognitive-offloading/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/ai-literacy/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/human-agency/"]')).toBeVisible();
    await expect(page.locator('.prose')).toContainText('Sources and further reading');
    await expect(page.locator('h2:has-text("Sources and further reading") + ul > li')).toHaveCount(18);
    await expect(
      page.locator(
        `.language-switcher a[href="${aiPathPolishArticleRoute}"]`
      )
    ).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://promptedpsyche.com${aiPathEnglishArticleRoute}`
    );
    const doiUrl = 'https://doi.org/10.5281/zenodo.21301650';
    const trustDoiByline = page.locator('[data-qa="article-byline"]');
    await expect(trustDoiByline).toContainText('Citable version (v1.0):');
    await expect(
      trustDoiByline.getByRole('link', { name: 'DOI 10.5281/zenodo.21301650' })
    ).toHaveAttribute(
      'href',
      doiUrl
    );
    await expect(page.locator('meta[name="citation_doi"]')).toHaveAttribute(
      'content',
      '10.5281/zenodo.21301650'
    );
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
      'Mamczur, F. (2026, July 2). Trust in the age of ready-made answers. Prompted Psyche. https://doi.org/10.5281/zenodo.21301650'
    );
    await expect(page.locator('[data-qa="rights-notice"][data-variant="content"]')).toContainText(
      'This article is licensed under CC BY 4.0'
    );
    await expect(page.locator('[data-qa="rights-notice"][data-variant="content"] a')).toHaveAttribute(
      'href',
      'https://creativecommons.org/licenses/by/4.0/'
    );
    const structuredDataText = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((scripts) => scripts.map((script) => script.textContent ?? '').join('\n'));
    expect(structuredDataText).toContain('"datePublished":"2026-07-02T');
    expect(structuredDataText).toContain('"dateModified":"2026-07-10T');
    expect(structuredDataText).toContain('"propertyID":"DOI"');
    expect(structuredDataText).toContain('"value":"10.5281/zenodo.21301650"');
    expect(structuredDataText).toContain('"sameAs":"https://doi.org/10.5281/zenodo.21301650"');
    expect(structuredDataText).toContain('"license":"https://creativecommons.org/licenses/by/4.0/"');
    expect(structuredDataText).toContain('"version":"1.0"');
    await expect(page.locator('body')).not.toContainText('June 18, 2026');
    await expect(page.locator('body')).not.toContainText('This article is peer-reviewed');
    await expect(page.locator('body')).not.toContainText('10.0000/placeholder');
    await expect(page.locator('body')).not.toContainText('science should not be trusted');
    await expect(page.locator('body')).not.toContainText('AI replaces experts');
    await expect(page.locator('body')).not.toContainText('sources are unnecessary');
    await expect(page.locator('body')).not.toContainText('AI therapy');
    await expect(page.locator('body')).not.toContainText('automatic diagnosis');
  });

  test('renders copyable prompt examples in the AI path English article', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: async (text: string) => {
            (window as Window & { __copiedPrompt?: string }).__copiedPrompt = text;
          }
        }
      });
    });
    await page.goto(aiPathEnglishArticleRoute);

    const promptBoxes = page.locator('.prompt-example');
    await expect(promptBoxes).toHaveCount(1);
    await expect(promptBoxes).toContainText('Example prompt');
    await expect(page.getByRole('button', { name: 'Copy example prompt' })).toHaveCount(1);

    await page.locator('.prompt-example--better .prompt-example__copy').click();
    await expect(page.locator('.prompt-example--better .prompt-example__copy')).toContainText(
      'Copied'
    );
    const copiedPrompt = await page.evaluate(
      () => (window as Window & { __copiedPrompt?: string }).__copiedPrompt
    );
    expect(copiedPrompt).toContain('Separate this answer into claims, sources, evidence');

    const overflowingBoxes = await page.locator('.prompt-example').evaluateAll((boxes) =>
      boxes
        .map((box) => {
          const rect = box.getBoundingClientRect();
          return rect.left < -1 || rect.right > window.innerWidth + 1;
        })
        .filter(Boolean)
    );
    expect(overflowingBoxes).toEqual([]);
  });

  test('renders the AI mirror Polish article with citation, tags, concepts and language alternate', async ({ page }) => {
    await page.goto(mirrorPolishArticleRoute);

    await expect(page.locator('.content-header h1')).toHaveText(mirrorPolishArticleTitle);
    const inBrief = page.locator('[data-qa="in-brief"]');
    await expect(inBrief).toHaveCount(1);
    await expect(inBrief.locator('summary.in-brief__summary')).toHaveText('W skrócie');
    await inBrief.locator('summary').click();
    await expect(inBrief.locator('.in-brief__body')).toBeVisible();
    await expect(inBrief).toContainText('AI działa raczej jak lustro językowe');
    await expect(page.locator('body')).not.toContainText('TL;DR');
    await expect(page.locator('.prose')).toContainText('Lustro języka, nie lustro duszy');
    await expect(page.locator('.prose')).toContainText('Dopasowanie nie jest zrozumieniem');
    await expect(page.locator('.prose')).toContainText('Kluczowy fragment');
    await expect(page.locator('.prose')).toContainText('Wypróbuj podejście');
    await expect(page.locator('.prose')).toContainText('Lepsze pytanie');
    await expect(page.locator('.prose')).toContainText('Mini-agent');
    await expect(page.locator('.prose')).toContainText(
      'łatwo zaczynamy traktować to jak obecność społeczną'
    );
    await expect(page.locator('.prose')).not.toContainText(
      'Człowiek od dawna jest gotów czytać społeczność tam'
    );
    await expect(page.locator('[data-qa="article-byline"]')).toContainText('Autor: Feliks Mamczur');
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText('Jak cytować');
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
      `${mirrorPolishArticleTitle} Prompted Psyche. https://promptedpsyche.com/pl/articles/ai-jako-lustro-dlaczego-tak-latwo-sie-z-nim-dogadujemy/`
    );
    await expect(page.locator('[data-qa="suggested-citation"]')).not.toContainText('DOI');
    await expect(page.locator('[data-qa="rights-notice"][data-variant="content"]')).toContainText(
      'Wszystkie prawa zastrzeżone'
    );
    await expect(page.locator('.article-hero-figure img')).toHaveAttribute(
      'src',
      '/images/articles/ai-mirror-conversation-loop.svg'
    );
    await expect(page.locator('.article-hero-figure img')).toHaveAttribute(
      'alt',
      'Schemat pokazujący AI jako lustro rozmowy: użytkownik zadaje pytanie, model porządkuje odpowiedź, a człowiek musi wrócić do weryfikacji i kontekstu.'
    );
    await expect(page.locator('.article-hero-figure figcaption')).toContainText(
      'AI może odbijać język'
    );
    await expect(page.locator('.editorial-aside__label').filter({ hasText: 'Przykład' })).toBeVisible();
    await expect(page.locator('.editorial-aside__label').filter({ hasText: 'Granica' })).toBeVisible();
    await expect(page.locator('.editorial-aside__label').filter({ hasText: 'Zatrzymaj się' })).toBeVisible();
    await expect(page.locator('[data-qa="key-passage"]')).toHaveCount(1);
    await expect(page.locator('[data-qa="practice-block"]')).toHaveCount(1);
    await expect(page.locator('[data-qa="article-audio"]')).toHaveCount(0);
    await expect(page.locator('audio')).toHaveCount(0);
    await expect(page.locator('.content-tags a[href="/pl/tags/ai-i-czlowiek/"]')).toBeVisible();
    await expect(page.locator('.content-tags a[href="/pl/tags/zaufanie-do-ai/"]')).toBeVisible();

    await expect(page.locator('.prose a[href="/pl/concepts/model-output/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/antropomorfizacja/"]').first()).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/calibrated-trust/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/epistemic-vigilance/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/mental-model/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/ai-companions/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/cognitive-offloading/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/metacognition/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/human-ai-interaction/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/ai-mediated-communication/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/pl/concepts/nadzor-ze-strony-czlowieka/"]')).toBeVisible();
    await expect(page.locator('.prose')).toContainText('Źródła i dalsza lektura');
    await expect(
      page.locator(
        '.language-switcher a[href="/articles/ai-as-a-mirror-why-it-can-feel-so-easy-to-talk-to/"]'
      )
    ).toBeVisible();
    await expect(page.locator('[data-qa="suggested-citation"]')).not.toContainText('DOI');
    await expect(page.locator('body')).not.toContainText('automatyczna diagnoza');
    await expect(page.locator('body')).not.toContainText('terapia przez AI');
    await expect(page.locator('body')).not.toContainText('AI ma świadomość');
  });

  test('renders copyable prompt examples in the AI mirror Polish article', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: async (text: string) => {
            (window as Window & { __copiedPrompt?: string }).__copiedPrompt = text;
          }
        }
      });
    });
    await page.goto(mirrorPolishArticleRoute);

    const promptBoxes = page.locator('.prompt-example');
    await expect(promptBoxes).toHaveCount(2);
    await expect(promptBoxes.nth(0)).toContainText('Lepsze pytanie');
    await expect(promptBoxes.nth(1)).toContainText('Mini-agent');
    await expect(page.getByRole('button', { name: 'Kopiuj' })).toHaveCount(2);

    await page.locator('.prompt-example--better .prompt-example__copy').click();
    await expect(page.locator('.prompt-example--better .prompt-example__copy')).toContainText(
      'Skopiowano'
    );
    const copiedPrompt = await page.evaluate(
      () => (window as Window & { __copiedPrompt?: string }).__copiedPrompt
    );
    expect(copiedPrompt).toContain('Przeanalizuj tę wiadomość jako tekst');

    await page.locator('.prompt-example--agent .prompt-example__copy').click();
    const copiedAgent = await page.evaluate(
      () => (window as Window & { __copiedPrompt?: string }).__copiedPrompt
    );
    expect(copiedAgent).toContain('krytycznego czytelnika komunikacji');

    const overflowingBoxes = await page.locator('.prompt-example').evaluateAll((boxes) =>
      boxes
        .map((box) => {
          const rect = box.getBoundingClientRect();
          return rect.left < -1 || rect.right > window.innerWidth + 1;
        })
        .filter(Boolean)
    );
    expect(overflowingBoxes).toEqual([]);
  });

  test('renders the AI mirror English article with citation, tags, concepts and language alternate', async ({ page }) => {
    await page.goto(mirrorEnglishArticleRoute);

    await expect(page.locator('.content-header h1')).toHaveText(mirrorEnglishArticleTitle);
    const inBrief = page.locator('[data-qa="in-brief"]');
    await expect(inBrief).toHaveCount(1);
    await expect(inBrief.locator('summary.in-brief__summary')).toHaveText('TL;DR');
    await inBrief.locator('summary').click();
    await expect(inBrief.locator('.in-brief__body')).toBeVisible();
    await expect(inBrief).toContainText('AI works more like a linguistic mirror');
    await expect(page.locator('body')).not.toContainText('In brief');
    await expect(page.locator('.prose')).toContainText('A mirror of language, not a mirror of the soul');
    await expect(page.locator('.prose')).toContainText('Fit is not understanding');
    await expect(page.locator('.prose')).toContainText('Key passage');
    await expect(page.locator('.prose')).toContainText('Try this approach');
    await expect(page.locator('.prose')).toContainText('Better question');
    await expect(page.locator('.prose')).toContainText('Mini-agent');
    await expect(page.locator('.prose')).toContainText('a kind of social presence');
    await expect(page.locator('[data-qa="article-byline"]')).toContainText('By Feliks Mamczur');
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText('Suggested citation');
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
      `${mirrorEnglishArticleTitle}. Prompted Psyche. https://promptedpsyche.com/articles/ai-as-a-mirror-why-it-can-feel-so-easy-to-talk-to/`
    );
    await expect(page.locator('[data-qa="suggested-citation"]')).not.toContainText('DOI');
    await expect(page.locator('[data-qa="rights-notice"][data-variant="content"]')).toContainText(
      'All rights reserved'
    );
    await expect(page.locator('.article-hero-figure img')).toHaveAttribute(
      'src',
      '/images/articles/ai-mirror-conversation-loop.svg'
    );
    await expect(page.locator('.article-hero-figure img')).toHaveAttribute(
      'alt',
      "Diagram showing AI as a conversational mirror: the user asks, the model organizes a response, and the human returns to verification and context."
    );
    await expect(page.locator('.article-hero-figure figcaption')).toContainText(
      'AI can reflect the language'
    );
    await expect(page.locator('.editorial-aside__label').filter({ hasText: 'Example' })).toBeVisible();
    await expect(page.locator('.editorial-aside__label').filter({ hasText: 'Boundary' })).toBeVisible();
    await expect(page.locator('.editorial-aside__label').filter({ hasText: 'Pause' })).toBeVisible();
    await expect(page.locator('[data-qa="key-passage"]')).toHaveCount(1);
    await expect(page.locator('[data-qa="practice-block"]')).toHaveCount(1);
    await expect(page.locator('[data-qa="article-audio"]')).toHaveCount(0);
    await expect(page.locator('audio')).toHaveCount(0);
    await expect(page.locator('.content-tags a[href="/tags/ai-and-humans/"]')).toBeVisible();
    await expect(page.locator('.content-tags a[href="/tags/trust-in-ai/"]')).toBeVisible();

    await expect(page.locator('.prose a[href="/concepts/model-output/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/anthropomorphism/"]').first()).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/calibrated-trust/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/epistemic-vigilance/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/mental-model/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/ai-companions/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/cognitive-offloading/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/metacognition/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/human-ai-interaction/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/ai-mediated-communication/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/human-oversight/"]')).toBeVisible();
    await expect(page.locator('.prose')).toContainText('Sources and further reading');
    await expect(
      page.locator(
        '.language-switcher a[href="/pl/articles/ai-jako-lustro-dlaczego-tak-latwo-sie-z-nim-dogadujemy/"]'
      )
    ).toBeVisible();
    await expect(page.locator('[data-qa="suggested-citation"]')).not.toContainText('DOI');
    await expect(page.locator('body')).not.toContainText('AI therapy');
    await expect(page.locator('body')).not.toContainText('automatic diagnosis');
    await expect(page.locator('body')).not.toContainText('AI has consciousness');
  });

  test('renders copyable prompt examples in the AI mirror English article', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: async (text: string) => {
            (window as Window & { __copiedPrompt?: string }).__copiedPrompt = text;
          }
        }
      });
    });
    await page.goto(mirrorEnglishArticleRoute);

    const promptBoxes = page.locator('.prompt-example');
    await expect(promptBoxes).toHaveCount(2);
    await expect(promptBoxes.nth(0)).toContainText('Better question');
    await expect(promptBoxes.nth(1)).toContainText('Mini-agent');
    await expect(page.getByRole('button', { name: 'Copy' })).toHaveCount(2);

    await page.locator('.prompt-example--better .prompt-example__copy').click();
    await expect(page.locator('.prompt-example--better .prompt-example__copy')).toContainText(
      'Copied'
    );
    const copiedPrompt = await page.evaluate(
      () => (window as Window & { __copiedPrompt?: string }).__copiedPrompt
    );
    expect(copiedPrompt).toContain('Analyze this message as text');

    await page.locator('.prompt-example--agent .prompt-example__copy').click();
    const copiedAgent = await page.evaluate(
      () => (window as Window & { __copiedPrompt?: string }).__copiedPrompt
    );
    expect(copiedAgent).toContain('critical reader of communication');

    const overflowingBoxes = await page.locator('.prompt-example').evaluateAll((boxes) =>
      boxes
        .map((box) => {
          const rect = box.getBoundingClientRect();
          return rect.left < -1 || rect.right > window.innerWidth + 1;
        })
        .filter(Boolean)
    );
    expect(overflowingBoxes).toEqual([]);
  });

  test('keeps the in brief disclosure within the mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto(mirrorPolishArticleRoute);

    const overflows = await page.locator('[data-qa="in-brief"]').evaluateAll((blocks) =>
      blocks
        .map((block) => {
          const rect = block.getBoundingClientRect();
          return rect.left < -1 || rect.right > window.innerWidth + 1;
        })
        .filter(Boolean)
    );

    expect(overflows).toEqual([]);
  });

  test('renders the second English article detail page with byline, citation, rights notice and concept links', async ({ page }) => {
    await page.goto(secondEnglishArticleRoute);

    await expect(page.locator('.content-header h1')).toHaveText(
      'The model does not remember. It works with context.'
    );
    await expect(page.locator('[data-qa="article-byline"]')).toContainText('By Feliks Mamczur');
    await expect(page.locator('[data-qa="article-byline"] a[href="/about/"]')).toBeVisible();
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText('Suggested citation');
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
      'Mamczur, F. (2026, March 28). The model does not remember. It works with context. Prompted Psyche. https://promptedpsyche.com/articles/the-model-does-not-remember-it-works-with-context/'
    );
    await expect(page.locator('[data-qa="suggested-citation"]')).not.toContainText('DOI');
    await expect(page.locator('[data-qa="rights-notice"][data-variant="content"]')).toContainText(
      'All rights reserved'
    );
    await expect(page.locator('.article-hero-figure img')).toHaveAttribute(
      'src',
      '/images/articles/model-context-window-diagram.svg'
    );
    await expect(page.locator('.article-hero-figure figcaption')).toContainText(
      'available context'
    );
    await expect(page.locator('.editorial-aside')).toContainText('In practice');

    const conceptLinks = page.locator('.prose a[href^="/concepts/"]');
    await expect(conceptLinks).toHaveCount(10);
    await expect(page.locator('.prose a[href="/concepts/context-window/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/token/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/mental-model/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/cognitive-load/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/epistemic-vigilance/"]')).toBeVisible();
    await expect(page.locator('.prose a[href="/concepts/human-ai-interaction/"]')).toBeVisible();
  });

  test('shows DOI, citable version and CC BY metadata only for the embodied AI article', async ({ page }) => {
    await page.goto(embodiedEnglishArticleRoute);

    const doiUrl = 'https://doi.org/10.5281/zenodo.21296384';
    const byline = page.locator('[data-qa="article-byline"]');

    await expect(byline).toContainText('Citable version (v1.0):');
    await expect(byline.getByRole('link', { name: 'DOI 10.5281/zenodo.21296384' })).toHaveAttribute(
      'href',
      doiUrl
    );
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
      'Mamczur, F. (2026, July 10). What changes when AI has a body? Prompted Psyche. https://doi.org/10.5281/zenodo.21296384'
    );
    await expect(page.locator('[data-qa="rights-notice"][data-variant="content"]')).toContainText(
      'This article is licensed under CC BY 4.0'
    );
    await expect(page.locator('[data-qa="rights-notice"][data-variant="content"] a')).toHaveAttribute(
      'href',
      'https://creativecommons.org/licenses/by/4.0/'
    );
    await expect(page.locator('meta[name="citation_doi"]')).toHaveAttribute(
      'content',
      '10.5281/zenodo.21296384'
    );

    const structuredDataText = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((scripts) => scripts.map((script) => script.textContent ?? '').join('\n'));

    expect(structuredDataText).toContain('"propertyID":"DOI"');
    expect(structuredDataText).toContain('"value":"10.5281/zenodo.21296384"');
    expect(structuredDataText).toContain('"sameAs":"https://doi.org/10.5281/zenodo.21296384"');
    expect(structuredDataText).toContain('"license":"https://creativecommons.org/licenses/by/4.0/"');
    expect(structuredDataText).toContain('"version":"1.0"');

    await page.goto(secondEnglishArticleRoute);
    await expect(page.locator('meta[name="citation_doi"]')).toHaveCount(0);
    await expect(page.locator('[data-qa="rights-notice"][data-variant="content"]')).toContainText(
      'All rights reserved'
    );

    await page.goto(embodiedPolishArticleRoute);
    const polishByline = page.locator('[data-qa="article-byline"]');
    await expect(polishByline).toContainText('DOI wersji angielskiej (v1.0):');
    await expect(polishByline.getByRole('link', { name: 'DOI 10.5281/zenodo.21296384' })).toHaveAttribute(
      'href',
      doiUrl
    );
    await expect(page.locator('meta[name="citation_doi"]')).toHaveCount(0);

    const polishStructuredDataText = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((scripts) => scripts.map((script) => script.textContent ?? '').join('\n'));
    expect(polishStructuredDataText).not.toContain('"propertyID":"DOI"');
    await expect(page.locator('[data-qa="suggested-citation"]')).toContainText(
      'https://promptedpsyche.com/pl/articles/co-sie-zmienia-kiedy-ai-ma-cialo/'
    );
    await expect(page.locator('[data-qa="rights-notice"][data-variant="content"]')).toContainText(
      'Wszystkie prawa'
    );
  });

  test('keeps other article drafts hidden', async ({ page, request }) => {
    await page.goto('/articles/');

    await expect(page.locator('body')).not.toContainText('AI Literacy Is Not Prompt Engineering');
    await expect(page.locator('body')).not.toContainText("Why People Trust AI Even When They Shouldn't");
    await expect(page.locator('body')).not.toContainText(
      "Don't Ask Whether AI Makes Us Dumber. Ask What Kind of Thinking We Stop Practicing"
    );

    await page.goto('/pl/articles/');
    await expect(page.locator('body')).not.toContainText(
      'Nie pytaj, czy AI nas ogłupia. Zapytaj, jakiego myślenia przestajemy używać'
    );

    const aiLiteracyDraft = await request.get('/articles/ai-literacy-is-not-prompt-engineering/');
    const trustDraft = await request.get('/articles/why-people-trust-ai-even-when-they-shouldnt/');
    const aiThinkingEnglishDraft = await request.get(aiThinkingEnglishDraftRoute);
    const aiThinkingPolishDraft = await request.get(aiThinkingPolishDraftRoute);

    expect(aiLiteracyDraft.ok()).toBe(false);
    expect(trustDraft.ok()).toBe(false);
    expect(aiThinkingEnglishDraft.ok()).toBe(false);
    expect(aiThinkingPolishDraft.ok()).toBe(false);
  });
});
