import { expect, test, type Page } from '@playwright/test';

const publicationCases = [
  {
    route: '/articles/trust-in-the-age-of-ready-made-answers/',
    offerHref: '/consulting/',
    contactHref: '/contact/',
    title: 'Does your team use AI at work?'
  },
  {
    route: '/notes/youre-right-said-the-ai/',
    offerHref: '/consulting/',
    contactHref: '/contact/',
    title: 'Does your team use AI at work?'
  },
  {
    route: '/pl/articles/zaufanie-w-epoce-gotowych-odpowiedzi/',
    offerHref: '/pl/consulting/',
    contactHref: '/pl/contact/',
    title: 'Korzystacie z AI w pracy zespołowej?'
  },
  {
    route: '/pl/notes/masz-racje-powiedzialo-ai/',
    offerHref: '/pl/consulting/',
    contactHref: '/pl/contact/',
    title: 'Korzystacie z AI w pracy zespołowej?'
  }
] as const;

async function expectNoHorizontalOverflow(page: Page) {
  const result = await page.evaluate(() => {
    const offenders = Array.from(document.body.querySelectorAll('*'))
      .flatMap((node) => {
        const element = node as HTMLElement;
        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        let ancestor = element.parentElement;
        let hasScrollableAncestor = false;

        while (ancestor && ancestor !== document.body) {
          const ancestorStyle = window.getComputedStyle(ancestor);
          if (['auto', 'scroll', 'hidden', 'clip'].includes(ancestorStyle.overflowX)) {
            hasScrollableAncestor = true;
            break;
          }
          ancestor = ancestor.parentElement;
        }

        if (
          style.display === 'none' ||
          style.visibility === 'hidden' ||
          hasScrollableAncestor ||
          rect.width === 0 ||
          rect.height === 0 ||
          (rect.left >= -1 && rect.right <= window.innerWidth + 1)
        ) {
          return [];
        }

        return [{
          tag: element.tagName.toLowerCase(),
          className: typeof element.className === 'string' ? element.className : '',
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          text: (element.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 80)
        }];
      })
      .slice(0, 10);

    return {
      documentScrollWidth: document.documentElement.scrollWidth,
      documentClientWidth: document.documentElement.clientWidth,
      bodyScrollWidth: document.body.scrollWidth,
      innerWidth: window.innerWidth,
      offenders
    };
  });

  expect(result.offenders, JSON.stringify(result, null, 2)).toEqual([]);
  expect(result.documentScrollWidth).toBeLessThanOrEqual(result.documentClientWidth + 1);
  expect(result.bodyScrollWidth).toBeLessThanOrEqual(result.innerWidth + 1);
}

test.describe('consulting conversion path', () => {
  for (const publicationCase of publicationCases) {
    test(`shows one consulting CTA after ${publicationCase.route}`, async ({ page }) => {
      await page.goto(publicationCase.route);

      const cta = page.locator('[data-qa="consulting-cta"]');
      await expect(cta).toHaveCount(1);
      await expect(cta.getByRole('heading', { name: publicationCase.title })).toBeVisible();
      await expect(cta.locator('[data-qa="consulting-cta-offer"]')).toHaveAttribute(
        'href',
        publicationCase.offerHref
      );
      await expect(cta.locator('[data-qa="consulting-cta-contact"]')).toHaveAttribute(
        'href',
        publicationCase.contactHref
      );

      const placement = await page.evaluate(() => {
        const consultingCta = document.querySelector('[data-qa="consulting-cta"]');
        const citation = document.querySelector('[data-qa="suggested-citation"]');
        const rights = document.querySelector('[data-qa="rights-notice"]');

        return {
          beforeCitation: Boolean(
            consultingCta &&
              citation &&
              consultingCta.compareDocumentPosition(citation) & Node.DOCUMENT_POSITION_FOLLOWING
          ),
          beforeRights: Boolean(
            consultingCta &&
              rights &&
              consultingCta.compareDocumentPosition(rights) & Node.DOCUMENT_POSITION_FOLLOWING
          )
        };
      });

      expect(placement).toEqual({ beforeCitation: true, beforeRights: true });
    });
  }

  test('does not add the consulting CTA to Concepts or Practice', async ({ page }) => {
    for (const route of [
      '/concepts/sycophancy/',
      '/pl/concepts/potakiwanie-modelu/',
      '/practice/how-to-ask-ai-for-a-counterargument/',
      '/pl/practice/jak-poprosic-ai-o-kontrargument/'
    ]) {
      await page.goto(route);
      await expect(page.locator('[data-qa="consulting-cta"]')).toHaveCount(0);
    }
  });

  test('uses three verified public entries in Start here', async ({ page }) => {
    const homepageCases = [
      {
        route: '/',
        links: [
          '/notes/youre-right-said-the-ai/',
          '/articles/dont-ask-whether-ai-makes-us-dumber/',
          '/articles/trust-in-the-age-of-ready-made-answers/'
        ]
      },
      {
        route: '/pl/',
        links: [
          '/pl/notes/masz-racje-powiedzialo-ai/',
          '/pl/articles/nie-pytaj-czy-ai-nas-oglupia/',
          '/pl/articles/zaufanie-w-epoce-gotowych-odpowiedzi/'
        ]
      }
    ] as const;

    for (const homepageCase of homepageCases) {
      await page.goto(homepageCase.route);
      const entries = page.locator('[data-qa="start-here-entry"]');
      await expect(entries).toHaveCount(3);

      for (let index = 0; index < homepageCase.links.length; index += 1) {
        await expect(entries.nth(index).locator('a')).toHaveAttribute('href', homepageCase.links[index]);
      }
    }
  });

  test('keeps changed internal destinations available', async ({ request }) => {
    const destinations = [
      '/consulting/',
      '/pl/consulting/',
      '/contact/',
      '/pl/contact/',
      '/notes/youre-right-said-the-ai/',
      '/pl/notes/masz-racje-powiedzialo-ai/',
      '/articles/dont-ask-whether-ai-makes-us-dumber/',
      '/pl/articles/nie-pytaj-czy-ai-nas-oglupia/'
    ];

    for (const destination of destinations) {
      const response = await request.get(destination);
      expect(response.ok(), `${destination} should return a successful response`).toBeTruthy();
    }
  });

  test('keeps EN and PL alternates paired on changed pages', async ({ page }) => {
    const pairs = [
      ['/', '/pl/'],
      ['/consulting/', '/pl/consulting/'],
      ['/contact/', '/pl/contact/']
    ] as const;

    for (const [enPath, plPath] of pairs) {
      await page.goto(enPath);
      await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
        'href',
        `https://promptedpsyche.com${enPath}`
      );
      await expect(page.locator('link[rel="alternate"][hreflang="pl"]')).toHaveAttribute(
        'href',
        `https://promptedpsyche.com${plPath}`
      );

      await page.goto(plPath);
      await expect(page.locator('[data-qa="language-switcher"] a').first()).toHaveAttribute(
        'href',
        enPath
      );
    }
  });

  test('keeps Consulting visibly available in both navigation languages', async ({ page }) => {
    for (const [route, href] of [
      ['/', '/consulting/'],
      ['/pl/', '/pl/consulting/']
    ] as const) {
      await page.goto(route);
      const link = page.locator('[data-qa="consulting-nav-link"]');
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', href);
      await expect(link).toHaveClass(/site-nav__consulting/);
    }
  });

  for (const width of [390, 320]) {
    test(`keeps changed conversion routes within ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });

      for (const route of [
        '/',
        '/pl/',
        '/consulting/',
        '/pl/consulting/',
        '/articles/trust-in-the-age-of-ready-made-answers/',
        '/pl/notes/masz-racje-powiedzialo-ai/'
      ]) {
        await page.goto(route);
        await expectNoHorizontalOverflow(page);
      }
    });
  }
});
