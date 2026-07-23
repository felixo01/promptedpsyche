import { expect, test, type Page } from '@playwright/test';

const forbiddenPracticePhrases = [
  'Prompt library',
  'Prompt database',
  'Best prompts',
  'Prompt hacks',
  'Szukaj promptu'
];

const practiceEntries = [
  {
    title: 'Jak sprawdzić, czy odpowiedź AI ma źródła',
    route: '/pl/practice/jak-sprawdzic-czy-odpowiedz-ai-ma-zrodla/'
  },
  {
    title: 'Jak nie pomylić płynności z prawdą',
    route: '/pl/practice/jak-nie-pomylic-plynnosci-z-prawda/'
  },
  {
    title: 'Jak analizować wiadomość bez diagnozowania człowieka',
    route: '/pl/practice/jak-analizowac-wiadomosc-bez-diagnozowania-czlowieka/'
  },
  {
    title: 'Jak poprosić model o niepewność',
    route: '/pl/practice/jak-poprosic-model-o-niepewnosc/'
  },
  {
    title: 'Jak użyć AI jako drugiego czytelnika',
    route: '/pl/practice/jak-uzyc-ai-jako-drugiego-czytelnika/'
  },
  {
    title: 'Jak oddzielić fakty od interpretacji',
    route: '/pl/practice/jak-oddzielic-fakty-od-interpretacji/'
  },
  {
    title: 'Jak poprosić AI o kontrargument',
    route: '/pl/practice/jak-poprosic-ai-o-kontrargument/'
  },
  {
    title: 'Jak sprawdzić własne założenia z pomocą AI',
    route: '/pl/practice/jak-sprawdzic-wlasne-zalozenia-z-pomoca-ai/'
  },
  {
    title: 'Jak użyć AI bez oddawania mu decyzji',
    route: '/pl/practice/jak-uzyc-ai-bez-oddawania-mu-decyzji/'
  },
  {
    title: 'Jak sprawdzić, czy model ma potrzebny kontekst',
    route: '/pl/practice/jak-sprawdzic-czy-model-ma-wystarczajacy-kontekst/'
  },
  {
    title: 'How to check whether an AI answer has sources',
    route: '/practice/how-to-check-whether-an-ai-answer-has-sources/'
  },
  {
    title: 'How not to confuse fluency with truth',
    route: '/practice/how-not-to-confuse-fluency-with-truth/'
  },
  {
    title: 'How to analyze a message without diagnosing a person',
    route: '/practice/how-to-analyze-a-message-without-diagnosing-a-person/'
  },
  {
    title: 'How to ask a model about uncertainty',
    route: '/practice/how-to-ask-a-model-about-uncertainty/'
  },
  {
    title: 'How to use AI as a second reader',
    route: '/practice/how-to-use-ai-as-a-second-reader/'
  },
  {
    title: 'How to separate facts from interpretations',
    route: '/practice/how-to-separate-facts-from-interpretations/'
  },
  {
    title: 'How to ask AI for a counterargument',
    route: '/practice/how-to-ask-ai-for-a-counterargument/'
  },
  {
    title: 'How to check your assumptions with AI',
    route: '/practice/how-to-check-your-assumptions-with-ai/'
  },
  {
    title: 'How to use AI without handing over the decision',
    route: '/practice/how-to-use-ai-without-handing-over-the-decision/'
  },
  {
    title: 'How to Check Whether the Model Has the Context It Needs',
    route: '/practice/how-to-check-whether-the-model-has-enough-context/'
  }
];

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => ({
    documentScrollWidth: document.documentElement.scrollWidth,
    documentClientWidth: document.documentElement.clientWidth,
    bodyScrollWidth: document.body.scrollWidth,
    innerWidth: window.innerWidth
  }));

  expect(overflow.documentScrollWidth).toBeLessThanOrEqual(overflow.documentClientWidth + 1);
  expect(overflow.bodyScrollWidth).toBeLessThanOrEqual(overflow.innerWidth + 1);
}

test.describe('practice section', () => {
  test('renders public Practice routes in both languages', async ({ page, request }) => {
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

    const enIndexResponse = await request.get('/practice/');
    const plIndexResponse = await request.get('/pl/practice/');
    const enEntryResponse = await request.get('/practice/how-to-check-whether-an-ai-answer-has-sources/');
    const plEntryResponse = await request.get('/pl/practice/jak-sprawdzic-czy-odpowiedz-ai-ma-zrodla/');

    expect(enIndexResponse.ok()).toBe(true);
    expect(plIndexResponse.ok()).toBe(true);
    expect(enEntryResponse.ok()).toBe(true);
    expect(plEntryResponse.ok()).toBe(true);

    for (const entry of practiceEntries) {
      const response = await request.get(entry.route);
      expect(response.ok(), `${entry.title} should have a public route`).toBe(true);
    }

    await page.goto('/practice/');
    await expect(page.getByRole('heading', { name: 'Practice', level: 1 })).toBeVisible();
    await expect(page.locator('.practice-index')).toBeVisible();
    await expect(
      page.getByText(
        'Practice is a collection of short scenarios for working with AI more deliberately. Each entry combines an example instruction with checks, limits and questions to consider before using the result.'
      )
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Choose a situation', level: 2 })).toBeVisible();
    await expect(
      page.getByText(
        'Work through sources, uncertainty, assumptions, counterarguments, text and decisions without handing judgment or responsibility to the model.'
      )
    ).toBeVisible();
    await expect(page.locator('.entry-list article')).toHaveCount(10);
    await expect(page.locator('.entry-list article').first().locator('.entry-meta')).toContainText('Practice');
    await expect(page.locator('.entry-list article').first().locator('.tag-list li').first()).toBeVisible();
    await expect(
      page.locator('.entry-title-link', { hasText: 'How to check whether an AI answer has sources' })
    ).toBeVisible();
    await expect(page.locator('.entry-title-link', { hasText: 'How to ask AI for a counterargument' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Open scenario:/ })).toHaveCount(10);
    await expect(page.locator('[data-qa="site-nav"]').getByRole('link', { name: 'Practice' })).toHaveAttribute(
      'href',
      '/practice/'
    );
    await expect(page.locator('[data-qa="site-nav"]')).not.toContainText('Praktyka');
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    await expect(page.locator('[data-qa="language-switcher"]').getByRole('link', { name: 'PL' })).toHaveAttribute(
      'href',
      '/pl/practice/'
    );
    for (const phrase of forbiddenPracticePhrases) {
      await expect(page.locator('body')).not.toContainText(phrase);
    }
    await expectNoHorizontalOverflow(page);

    await page.goto('/practice/how-to-check-whether-an-ai-answer-has-sources/');
    await expect(page.getByRole('heading', { name: 'How to check whether an AI answer has sources' })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    await expect(page.locator('[data-qa="language-switcher"]').getByRole('link', { name: 'PL' })).toHaveAttribute(
      'href',
      '/pl/practice/jak-sprawdzic-czy-odpowiedz-ai-ma-zrodla/'
    );
    await expect(page.locator('.prompt-example')).toHaveCount(1);
    await expect(page.locator('.prompt-example')).toContainText('Example prompt');
    await expect(page.getByRole('button', { name: 'Copy example prompt' })).toBeVisible();
    await page.getByRole('button', { name: 'Copy example prompt' }).click();
    await expect(page.getByRole('button', { name: 'Copy example prompt' })).toContainText('Copied');
    const copiedEnglishPrompt = await page.evaluate(
      () => (window as Window & { __copiedPrompt?: string }).__copiedPrompt
    );
    expect(copiedEnglishPrompt).toContain('Read your previous answer and help me check which parts require sources.');
    await expectNoHorizontalOverflow(page);

    await page.goto('/pl/practice/');
    await expect(page.getByRole('heading', { name: 'Praktyka', level: 1 })).toBeVisible();
    await expect(page.locator('.practice-index')).toBeVisible();
    await expect(
      page.getByText(
        'Praktyka to zbiór krótkich scenariuszy uważnej pracy z AI. Każdy wpis łączy przykładowe polecenie z pytaniami kontrolnymi, ograniczeniami i wskazówkami, które warto rozważyć przed użyciem wyniku.'
      )
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Wybierz sytuację', level: 2 })).toBeVisible();
    await expect(
      page.getByText(
        'Pracuj ze źródłami, niepewnością, założeniami, kontrargumentami, tekstem i decyzjami bez oddawania modelowi osądu ani odpowiedzialności.'
      )
    ).toBeVisible();
    await expect(page.locator('.entry-list article')).toHaveCount(10);
    await expect(page.locator('.entry-list article').first().locator('.entry-meta')).toContainText('Praktyka');
    await expect(page.locator('.entry-list article').first().locator('.tag-list li').first()).toBeVisible();
    await expect(
      page.locator('.entry-title-link', { hasText: 'Jak sprawdzić, czy odpowiedź AI ma źródła' })
    ).toBeVisible();
    await expect(page.locator('.entry-title-link', { hasText: 'Jak poprosić AI o kontrargument' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Otwórz scenariusz:/ })).toHaveCount(10);
    await expect(page.locator('[data-qa="site-nav"]').getByRole('link', { name: 'Praktyka' })).toHaveAttribute(
      'href',
      '/pl/practice/'
    );
    await expect(page.locator('[data-qa="language-switcher"]').getByRole('link', { name: 'EN' })).toHaveAttribute(
      'href',
      '/practice/'
    );
    for (const phrase of forbiddenPracticePhrases) {
      await expect(page.locator('body')).not.toContainText(phrase);
    }
    await expectNoHorizontalOverflow(page);

    await page.goto('/pl/practice/jak-sprawdzic-wlasne-zalozenia-z-pomoca-ai/');
    await expect(
      page.getByRole('heading', { name: 'Jak sprawdzić własne założenia z pomocą AI' })
    ).toBeVisible();
    await expect(page.locator('.prompt-example')).toHaveCount(1);
    await expect(page.locator('.prompt-example')).toContainText('Przykładowy prompt');
    await expect(page.getByRole('button', { name: 'Kopiuj przykładowy prompt' })).toBeVisible();
    await page.getByRole('button', { name: 'Kopiuj przykładowy prompt' }).click();
    await expect(page.getByRole('button', { name: 'Kopiuj przykładowy prompt' })).toContainText('Skopiowano');
    const copiedPolishPrompt = await page.evaluate(
      () => (window as Window & { __copiedPrompt?: string }).__copiedPrompt
    );
    expect(copiedPolishPrompt).toContain('Przeczytaj poniższy opis i pomóż mi sprawdzić moje założenia.');
    await expectNoHorizontalOverflow(page);
  });
});
