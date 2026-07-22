import { expect, test } from '@playwright/test';

const routes = [
  '/',
  '/pl/',
  '/articles/',
  '/pl/articles/',
  '/articles/it-is-not-just-about-the-prompt/',
  '/articles/the-model-does-not-remember-it-works-with-context/',
  '/articles/ai-does-not-read-people-it-helps-make-sense-of-the-situation/',
  '/articles/ai-as-a-mirror-why-it-can-feel-so-easy-to-talk-to/',
  '/articles/trust-in-the-age-of-ready-made-answers/',
  '/articles/are-we-afraid-of-ai-or-of-ourselves/',
  '/articles/openai-chatgpt-gpt-llm-difference/',
  '/pl/articles/nie-chodzi-tylko-o-prompt/',
  '/pl/articles/model-nie-pamieta-model-ma-kontekst/',
  '/pl/articles/ai-nie-czyta-ludzi-pomaga-uporzadkowac-sytuacje/',
  '/pl/articles/ai-jako-lustro-dlaczego-tak-latwo-sie-z-nim-dogadujemy/',
  '/pl/articles/zaufanie-w-epoce-gotowych-odpowiedzi/',
  '/pl/articles/czy-boimy-sie-ai-czy-boimy-sie-samych-siebie/',
  '/pl/articles/openai-chatgpt-gpt-llm-czym-sie-roznia/',
  '/notes/',
  '/pl/notes/',
  '/notes/fluent-does-not-mean-true/',
  '/notes/the-model-sees-text-not-the-whole-relationship/',
  '/notes/do-not-diagnose-people-from-emails/',
  '/notes/a-good-summary-is-not-the-same-as-a-good-decision/',
  '/pl/notes/brzmi-dobrze-nie-znaczy-ze-jest-prawdziwe/',
  '/pl/notes/model-widzi-tekst-nie-cala-relacje/',
  '/pl/notes/nie-diagnozuj-ludzi-z-maili/',
  '/pl/notes/dobre-streszczenie-to-jeszcze-nie-dobra-decyzja/',
  '/concepts/',
  '/pl/concepts/',
  '/concepts/epistemic-vigilance/',
  '/pl/concepts/epistemic-vigilance/',
  '/concepts/context-window/',
  '/concepts/llm/',
  '/pl/concepts/context-window/',
  '/pl/concepts/llm/',
  '/concepts/hallucination/',
  '/concepts/grounding/',
  '/concepts/sycophancy/',
  '/concepts/overreliance/',
  '/concepts/algorithmic-authority/',
  '/concepts/social-presence/',
  '/concepts/parasocial-relationship/',
  '/concepts/human-agency/',
  '/concepts/deskilling/',
  '/concepts/decision-support/',
  '/pl/concepts/halucynacja-modelu/',
  '/pl/concepts/oparcie-odpowiedzi-na-zrodlach/',
  '/pl/concepts/potakiwanie-modelu/',
  '/pl/concepts/nadmierne-poleganie-na-ai/',
  '/pl/concepts/autorytet-algorytmiczny/',
  '/pl/concepts/poczucie-obecnosci-spolecznej/',
  '/pl/concepts/relacja-paraspoleczna/',
  '/pl/concepts/sprawczosc-czlowieka/',
  '/pl/concepts/erozja-kompetencji/',
  '/pl/concepts/wspomaganie-decyzji/',
  '/tags/ai-literacy/',
  '/pl/tags/ai-literacy/',
  '/tags/ai-and-humans/',
  '/pl/tags/ai-i-czlowiek/',
  '/tags/knowledge/',
  '/pl/tags/wiedza/',
  '/projects/',
  '/pl/projects/',
  '/search/',
  '/pl/search/',
  '/about/',
  '/pl/about/',
  '/contact/',
  '/pl/contact/',
  '/consulting/',
  '/pl/consulting/'
];

const packageRoutes = [
  '/concepts/',
  '/pl/concepts/',
  '/concepts/llm/',
  '/pl/concepts/llm/',
  '/articles/openai-chatgpt-gpt-llm-difference/',
  '/pl/articles/openai-chatgpt-gpt-llm-czym-sie-roznia/',
  '/topics/ai-and-cognition/',
  '/pl/topics/ai-i-myslenie/'
];

test.describe('layout overflow', () => {
  for (const route of routes) {
    test(`has no horizontal overflow on ${route}`, async ({ page }) => {
      await page.goto(route);

      const result = await page.evaluate(() => {
        const documentElement = document.documentElement;
        const offenders = Array.from(document.body.querySelectorAll('*'))
          .flatMap((node) => {
            const element = node as HTMLElement;
            const style = window.getComputedStyle(element);
            if (style.display === 'none' || style.visibility === 'hidden') {
              return [];
            }

            const rect = element.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) {
              return [];
            }

            if (rect.left >= -1 && rect.right <= window.innerWidth + 1) {
              return [];
            }

            return [
              {
                tag: element.tagName.toLowerCase(),
                id: element.id,
                className: typeof element.className === 'string' ? element.className : '',
                left: Math.round(rect.left),
                right: Math.round(rect.right),
                width: Math.round(rect.width),
                text: (element.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 90)
              }
            ];
          })
          .slice(0, 12);
        const pseudoOffenders = Array.from(
          document.body.querySelectorAll('.topic-section, .tinted-section')
        )
          .flatMap((node) => {
            const element = node as HTMLElement;
            const style = window.getComputedStyle(element, '::before');
            if (style.content === 'none') {
              return [];
            }

            const rect = element.getBoundingClientRect();
            const left = Number.parseFloat(style.left);
            const right = Number.parseFloat(style.right);
            const width = Number.parseFloat(style.width);

            if (
              Number.isFinite(left) &&
              Number.isFinite(right) &&
              Number.isFinite(width) &&
              left >= -1 &&
              right >= -1 &&
              width <= rect.width + 1
            ) {
              return [];
            }

            return [
              {
                tag: element.tagName.toLowerCase(),
                className: typeof element.className === 'string' ? element.className : '',
                left: Math.round(left),
                right: Math.round(right),
                width: Math.round(width),
                parentWidth: Math.round(rect.width)
              }
            ];
          })
          .slice(0, 12);

        return {
          documentScrollWidth: documentElement.scrollWidth,
          documentClientWidth: documentElement.clientWidth,
          bodyScrollWidth: document.body.scrollWidth,
          innerWidth: window.innerWidth,
          offenders,
          pseudoOffenders
        };
      });

      expect(result, JSON.stringify(result, null, 2)).toMatchObject({
        offenders: [],
        pseudoOffenders: []
      });
      expect(result.documentScrollWidth).toBeLessThanOrEqual(result.documentClientWidth + 1);
      expect(result.bodyScrollWidth).toBeLessThanOrEqual(result.innerWidth + 1);
    });
  }

  test('keeps the LLM package within a 320px viewport', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-390');
    await page.setViewportSize({ width: 320, height: 720 });

    for (const route of packageRoutes) {
      await page.goto(route);
      const result = await page.evaluate(() => ({
        documentScrollWidth: document.documentElement.scrollWidth,
        documentClientWidth: document.documentElement.clientWidth,
        bodyScrollWidth: document.body.scrollWidth,
        innerWidth: window.innerWidth
      }));

      expect(
        result.documentScrollWidth,
        `${route}\n${JSON.stringify(result, null, 2)}`
      ).toBeLessThanOrEqual(result.documentClientWidth + 1);
      expect(
        result.bodyScrollWidth,
        `${route}\n${JSON.stringify(result, null, 2)}`
      ).toBeLessThanOrEqual(result.innerWidth + 1);
    }
  });
});
