# Long-form Reading Style

This document records the current reading standard for Prompted Psyche articles and notes.

## Scope

The long-form standard applies to article and note detail pages. It should not change the global UI, navigation, publication cards, metadata, tag chips or buttons.

## Measure

- Target desktop measure for article and note body copy: about `64ch`.
- Concept entries may keep their existing measure unless a separate concept readability pass changes them.
- Mobile body copy should fill the available content width without horizontal overflow.

## Line-height

- Article and note body paragraphs should use a larger long-form line-height than general UI.
- Current target: about `1.8` on mobile and about `1.86` on desktop.
- Prompt boxes keep their own monospace rhythm.

## Typography

- Long-form body copy can use the site serif stack when it improves reading.
- UI elements, metadata, tags, copy buttons, prompt labels and prompt bodies should not switch to serif.
- Prompt bodies remain monospace.
- Do not add external font files for this purpose.

## Heading Rhythm

- H2 headings should clearly divide longer articles.
- H2 headings can use larger editorial serif type, a thin top rule and more top spacing.
- H3 headings should be readable and calm, but should not dominate H2 headings.
- Avoid huge empty gaps between sections.

## Key Passage

Use the `key-passage` pattern to highlight the central claim of a flagship article.

Labels:

- PL: `Kluczowy fragment`
- EN: `Key passage`

Rules:

- It is an editorial highlight, not an alert.
- It should be short enough to scan.
- It should not introduce a claim that the article does not support.
- It should not be used on every short note by default.

## In Brief Summaries

Use the optional `inBrief` field for long articles when a short reading aid helps the reader enter the text.

Labels:

- PL: `W skrócie`
- EN: `In brief`

Rules:

- Keep the summary to 3-4 manually edited sentences.
- Summarize the central tension and thesis, not the full table of contents.
- Place it after the lead.
- Do not call it `TL;DR` in the public UI.
- Do not generate it on the frontend.
- Do not render the block when the field is missing or empty.
- Do not use it as a replacement for reading the article.

## Practice Section

Use the practice section when an article benefits from one concrete way of applying the argument.

Labels:

- PL: `Wypróbuj podejście`
- EN: `Try this approach`

Rules:

- This is not a prompt library.
- Use at most one main prompt and one mini-agent instruction unless a later editorial decision changes the standard.
- The example should show a way of thinking, not a magic formula.
- Copy buttons should copy only the prompt or mini-agent text.
- The section must remain readable on mobile.

## Prompt And Mini-agent Examples

- A prompt example is a concrete question or instruction for one use.
- A mini-agent instruction defines a temporary role and operating rule for a recurring task.
- Mini-agent examples should be rare.
- Both patterns must avoid claims that AI can diagnose people, infer hidden intentions or replace human responsibility.

## Audio Policy

- Do not render an audio player without a real audio file.
- Do not show `coming soon` audio UI.
- Optional article audio can be supported through `audioUrl`, but it should render only when a real file exists.
- First audio candidates: the AI mirror article and the future human redundancy article.
