import { expect, test } from '@playwright/test';

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
const thirdEnglishArticleTitle =
  'AI does not read people. It helps make sense of the situation.';
const thirdPolishArticleTitle = 'AI nie czyta ludzi. Pomaga uporządkować sytuację.';
const mirrorPolishArticleTitle = 'AI jako lustro. Dlaczego tak łatwo się z nim dogadujemy?';
const mirrorEnglishArticleTitle = 'AI as a mirror: why it can feel so easy to talk to';

test.describe('published articles', () => {
  test('shows the English article on the English articles index', async ({ page }) => {
    await page.goto('/articles/');

    await expect(page.locator('.entry-list article')).toHaveCount(4);
    await expect(page.locator('.entry-list')).toContainText('It is not just about the prompt');
    await expect(page.locator('.entry-list')).toContainText(
      'The model does not remember. It works with context.'
    );
    await expect(page.locator('.entry-list')).toContainText(thirdEnglishArticleTitle);
    await expect(page.locator('.entry-list')).toContainText(mirrorEnglishArticleTitle);
    await expect(page.locator('.entry-list')).not.toContainText(
      'AI does not read people. It helps read context.'
    );
    const titles = await page.locator('.entry-title-link').allTextContents();
    expect(titles).toHaveLength(4);
    expect(titles).toEqual(expect.arrayContaining([
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
  });

  test('shows the Polish article on the Polish articles index', async ({ page }) => {
    await page.goto('/pl/articles/');

    await expect(page.locator('.entry-list article')).toHaveCount(4);
    await expect(page.locator('.entry-list')).toContainText('Nie chodzi tylko o prompt');
    await expect(page.locator('.entry-list')).toContainText(mirrorPolishArticleTitle);
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
  });

  test('shows the third Polish article on the Polish articles index', async ({ page }) => {
    await page.goto('/pl/articles/');

    const titles = await page.locator('.entry-title-link').allTextContents();
    expect(titles).toHaveLength(4);
    expect(titles).toEqual(expect.arrayContaining([
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
      'Mamczur, F. (2026). It is not just about the prompt. Prompted Psyche. https://promptedpsyche.com/articles/it-is-not-just-about-the-prompt/'
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
      'Mamczur, F. (2026). Nie chodzi tylko o prompt. Prompted Psyche. https://promptedpsyche.com/pl/articles/nie-chodzi-tylko-o-prompt/'
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
      'Mamczur, F. (2026). Model nie pamięta. Model ma kontekst. Prompted Psyche. https://promptedpsyche.com/pl/articles/model-nie-pamieta-model-ma-kontekst/'
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
      'Mamczur, F. (2026). AI does not read people. It helps make sense of the situation. Prompted Psyche. https://promptedpsyche.com/articles/ai-does-not-read-people-it-helps-make-sense-of-the-situation/'
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
    await expect(inBrief.locator('summary.in-brief__summary')).toHaveText('In brief');
    await inBrief.locator('summary').click();
    await expect(inBrief.locator('.in-brief__body')).toBeVisible();
    await expect(inBrief).toContainText('AI works more like a linguistic mirror');
    await expect(page.locator('body')).not.toContainText('TL;DR');
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
      'Mamczur, F. (2026). The model does not remember. It works with context. Prompted Psyche. https://promptedpsyche.com/articles/the-model-does-not-remember-it-works-with-context/'
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

  test('keeps other article drafts hidden', async ({ page, request }) => {
    await page.goto('/articles/');

    await expect(page.locator('body')).not.toContainText('AI Literacy Is Not Prompt Engineering');
    await expect(page.locator('body')).not.toContainText("Why People Trust AI Even When They Shouldn't");

    const aiLiteracyDraft = await request.get('/articles/ai-literacy-is-not-prompt-engineering/');
    const trustDraft = await request.get('/articles/why-people-trust-ai-even-when-they-shouldnt/');

    expect(aiLiteracyDraft.ok()).toBe(false);
    expect(trustDraft.ok()).toBe(false);
  });
});
