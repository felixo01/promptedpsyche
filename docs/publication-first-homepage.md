# Publication-first Homepage

This reset changes Prompted Psyche from a project-explanation homepage to a publication-first entry point.

## Navigation

The main menu starts with publication sections:

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

The homepage uses five modules before the footer:

- Hero
- Writing
- Author note
- Concepts teaser
- Consulting teaser

Removed from the homepage:

- the full "Who Prompted Psyche is for" section
- the full "Areas of focus" section
- the process line teaser
- the standalone final CTA module
- repeated project-definition copy

The removed ideas remain available through About, Concepts and Consulting instead of competing with publication discovery on the homepage.

## Author Context

After the first publication-first reset, the homepage was clearer but too anonymous. This follow-up adds a stronger author context without returning to a large personal profile or a consulting landing page.

The author note starts with Feliks Mamczur's perspective on AI, cyberpsychology, Human-AI Interaction and communication. His film, editing and post-production background is presented as an interpretive lens: a way to think about attention, narrative, image, emotion, decisions and communication.

This keeps the homepage publication-first, but not faceless. The reader can quickly understand who is writing, why the perspective matters and why the publication exists.

## Cognitive Framing

Cognitive science and cognitive psychology are used as a perspective, not as a formal title for the author.

Public copy may talk about cognition, attention, decisions, trust, language, emotion and working with information. It should not present cognitive science as a formal credential or professional title.

Film experience remains an interpretive lens, not the main label of the project. Articles and notes remain the center of the homepage.

## Role Of Consulting

Consulting remains an extension of the editorial and expert perspective. It is not the main axis of the homepage.

The consulting teaser stays short and points to the consulting page for details. The process line remains only on Consulting pages.

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

Polish pages use separate H1 scaling because Polish headings and labels are often longer. The homepage H1 was reduced again after the author-context pass so that typography supports the explanation instead of replacing it.

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
