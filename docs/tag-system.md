# Prompted Psyche tag system

Tags are functional publication navigation, not decorative labels.

## Rendering

- Visible tags on article and note indexes must be links.
- Visible tags on article and note detail pages must be links.
- Concept detail tags remain informational unless a separate concept tag route is intentionally added.
- Visible hashtags should be clickable when they belong to publication tags.

## Routes

- EN route: `/tags/[slug]/`
- PL route: `/pl/tags/[slug]/`

Tag pages include public articles and public notes with that tag. Draft content is excluded.

## Slugs

Tag slugs are generated from the visible tag label:

- lowercase
- no Polish diacritics
- spaces and punctuation become hyphens
- repeated separators are collapsed

Examples:

- `AI literacy` -> `ai-literacy`
- `Human-AI Interaction` -> `human-ai-interaction`
- `praca z AI` -> `praca-z-ai`
- `odpowiedzialność` -> `odpowiedzialnosc`
- `AI i człowiek` -> `ai-i-czlowiek`
- `AI and humans` -> `ai-and-humans`

## Language separation

EN tag pages show EN publications only.

PL tag pages show PL publications only.

When an equivalent tag slug exists in both languages, the language switcher may point to the matching tag archive. Otherwise it should point to a safe publication index, not to an unrelated tag page.

## Current publication check

The AI mirror article pair uses functional publication tags on index cards and detail pages. New tag archives include `/pl/tags/ai-i-czlowiek/` and `/tags/ai-and-humans/`, and they should not mix PL and EN publications.

The AI path to knowledge article pair uses functional publication tags on index cards and detail pages. New article tags include `/pl/tags/wiedza/`, `/pl/tags/nauka/`, `/tags/knowledge/` and `/tags/science/`; shared archive tags such as `/pl/tags/ai-literacy/` and `/tags/ai-literacy/` remain language-separated and exclude drafts.

## Concepts tags

- Concept index tags are clickable filters on `/concepts/` and `/pl/concepts/`.
- Concept detail tags remain informational and should not link to empty routes.
- Concepts wave 03 keeps this behavior for the 10 new EN concepts and 10 new PL concepts.
- Publication tag archive tests and concept filter tests should remain separate.
