# Publication-first homepage

This reset changes Prompted Psyche from a project-explanation homepage to a publication-first entry point.

## Navigation

The main menu now starts with publication sections:

- Articles
- Notes
- Concepts
- About
- Consulting
- Contact

The Polish menu follows the same hierarchy:

- Artykuły
- Notatki
- Pojęcia
- O projekcie
- Konsulting
- Kontakt

BrandMark remains the homepage link, so Home and Start are not repeated in the menu.

## Homepage Structure

The homepage now uses five modules before the footer:

- Hero
- Writing
- Concepts teaser
- Short bio
- Consulting teaser

Removed from the homepage:

- the full "Who Prompted Psyche is for" section
- the full "Areas of focus" section
- the process line teaser
- the standalone final CTA module
- repeated project-definition copy

The removed ideas remain available through About, Concepts and Consulting instead of competing with publication discovery on the homepage.

## Typography

The global type scale was reduced by introducing shared tokens:

- `--fs-body`
- `--lh-body`
- `--fs-lede`
- `--fs-h2`
- `--fs-page-h1`
- `--fs-page-h1-pl`
- `--fs-home-h1`
- `--fs-home-h1-pl`

Polish pages use separate H1 scaling because Polish headings and labels are often longer.

## Playwright QA

Layout QA covers:

- publication-first menu order in EN and PL
- language switcher presence
- horizontal overflow on core public routes
- overlap checks for homepage and navigation elements
- H1 and H2 scale thresholds
- noninteractive concept tags
- working concept card links

Run:

```bash
npm run test:layout
```

## Safety Checklist

- Astro stack stays in place.
- Routing is unchanged.
- Draft filters stay in `src/lib/content.ts`.
- Article drafts remain drafts.
- Concept slugs and terminology are unchanged.
- Concept tags remain informational and noninteractive.
- `BaseLayout.astro` keeps site-wide `noindex`.
- `vercel.json` keeps `X-Robots-Tag`.
- RSS and sitemap must not expose draft articles.
