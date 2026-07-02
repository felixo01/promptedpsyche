# Publication-first Homepage

This reset changes Prompted Psyche from a project-explanation homepage to a publication-first entry point.

## Navigation

The main menu starts with publication sections:

- Articles
- Notes
- Concepts
- Author
- Consulting
- Contact

The Polish menu follows the same hierarchy:

- Artykuły
- Notatki
- Pojęcia
- Kim jestem
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

The author note starts with Feliks Mamczur's perspective on AI, cyberpsychology, Human-AI Interaction and communication. His background in marketing, advertising agencies, brand communication, film, editing and post-production is presented as context for thinking about attention, narrative, image, emotion, decisions and communication.

This keeps the homepage publication-first, but not faceless. The reader can quickly understand who is writing, why the perspective matters and why the publication exists.

## Author Page

The existing About routes now work as author pages:

- `/about/` is titled `About the author`.
- `/pl/about/` is titled `Kim jestem`.

The homepage stays short and links to the author page for fuller context. The bio starts with Feliks Mamczur's work on the human side of AI, then explains the project, the fields that shape the perspective and the role of consulting.

Marketing, advertising agencies, brand communication, film, editing and post-production are presented as sources of the author's communication perspective. Film is not the only source of that perspective and it is not the main label of the project.

Cognitive psychology is used as a perspective and vocabulary. It is not presented as a formal professional title.

## Polish Author Copy

The Polish `Kim jestem` page was edited for a more natural public voice. Its communication experience section avoids defensive or stiff phrasing and presents film experience as part of a broader way of looking at communication, attention, image and emotion.

The Polish homepage author note was also tightened. The homepage remains publication-first.

## Communication Experience

Author framing now includes experience in marketing, advertising agencies and brand communication. This supports the site's interest in AI, attention, language, emotion and decisions without turning the page into a client list or CV.

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
