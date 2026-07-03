# Concepts system

Prompted Psyche concepts are a public working vocabulary for articles, notes and consulting language. They are not a generic AI glossary. Each concept should connect technical, cognitive, social or cultural language to the human side of AI.

## Current public state

- Public EN concepts before wave 03: 16.
- Public PL concepts before wave 03: 16.
- Concepts wave 03 adds 10 EN concepts and 10 PL counterparts.
- Expected public total after wave 03: 26 EN concepts and 26 PL concepts.
- Concepts are public in pre-launch mode, while site-wide `noindex` and the Vercel `X-Robots-Tag` remain active.

## Routing and language rules

- EN concepts live under `/concepts/[slug]/`.
- PL concepts live under `/pl/concepts/[slug]/`.
- Each translated pair uses a shared `translationKey`.
- Existing concept slugs should not be changed during wave additions.
- PL and EN concept indexes must stay language-scoped.
- Concept index tags are clickable filters.
- Concept detail tags remain informational unless a dedicated concept tag route is intentionally added.

## Polish Concepts title policy

Polish Concepts use controlled title patterns, not one forced translation rule.

Use a Polish title when:
- the Polish term is established, natural and precise;
- the term appears in Polish academic, public-sector, professional or strong public usage;
- the Polish title does not pretend to be more official than it is.

Use an English title when:
- the English term is the dominant working term in Polish AI, HCI, cognitive science or product discourse;
- a Polish translation would sound forced, misleading or too private;
- the first paragraph explains the term clearly in Polish.

Use a mixed EN/PL title when:
- the English term matters for recognition;
- the Polish equivalent is unstable or descriptive rather than official;
- the title can teach the term and explain it at once, for example `Grounding: oparcie odpowiedzi na źródłach`.

Slugs:
- Before public launch, slugs may change only when there is a strong editorial reason.
- After public launch, avoid slug changes unless redirects are added.
- A title may become more Polish-facing without changing the slug.
- Existing internal links, language alternates and tests must be checked whenever `routeSlug` changes.

Body wording:
- In Polish entries, define the concept plainly in the first paragraph.
- If the title keeps an English term, explain it immediately in Polish.
- Do not present descriptive Polish phrases as official terms without evidence.
- Do not use English terms to create fake expertise.
- Do not force Polish translations that reduce clarity or field recognition.

Editorial boundary:
- Concepts are a working vocabulary for the human side of AI, not a generic AI glossary.
- Titles should serve understanding, trust and responsible use, not branding, hype or academic inflation.

## Wave 03 concepts

| EN concept | PL public title | Category | Rationale |
| --- | --- | --- | --- |
| Hallucination | Halucynacja modelu | utrwalony polski termin | Polish public and sector texts use "halucynacje modeli AI" and "halucynacja modelu" for wrong but plausible AI outputs. |
| Grounding | Grounding: oparcie odpowiedzi na źródłach | termin angielski używany w polskim kontekście | Polish sources use "grounding" and descriptive phrases such as "odpowiedź oparta na źródłach informacji"; no single stable Polish term dominates. |
| Sycophancy | Sycophancy: potakiwanie modelu | brak stabilnego polskiego odpowiednika | Polish usage of "sycophancy" in AI is still limited; "potakiwanie modelu" is an explanatory phrase, not presented as an official term. |
| Overreliance | Nadmierne poleganie na AI | utrwalony polski termin | The phrase is natural in Polish AI and education/governance contexts and matches the meaning of relying on AI beyond justified confidence. |
| Algorithmic authority | Autorytet algorytmiczny | utrwalony polski termin | Polish academic and media studies sources use "autorytet algorytmiczny", including discussions of Shirky. |
| Social presence | Poczucie obecności społecznej | utrwalony polski termin | Polish academic abstracts and human-machine communication texts use this phrase for mediated social presence. |
| Parasocial relationship | Relacja paraspołeczna | utrwalony polski termin | Polish media and communication studies use "relacja paraspołeczna" and related terms such as "interakcja paraspołeczna". |
| Human agency | Sprawczość człowieka | utrwalony polski termin | The phrase is natural in Polish human-centered AI, education and social discussion, while the existing regulatory term remains "nadzór ze strony człowieka". |
| Deskilling | Deskilling: erozja kompetencji | termin angielski używany w polskim kontekście | Polish sources increasingly use "deskilling" with explanations such as "utrata kompetencji" or "erozja kompetencji"; the English term remains visible. |
| Decision support | Wspomaganie decyzji | utrwalony polski termin | Polish decision science and systems literature uses "wspomaganie decyzji"; the term is stable outside the AI hype context. |

## Source checks for Polish terminology

- Halucynacja modelu: AI.gov.pl and Polish public-sector guidance use "halucynacje modeli AI" and related phrases.
- Grounding: Google and Firebase PL docs use "Grounding z użyciem..." and "odpowiedź oparta na źródłach informacji"; Polish usage is mixed.
- Sycophancy: English term is established in current AI research; Polish use is not stable enough for a purely Polish title.
- Autorytet algorytmiczny: Jan Kreft and Polish media studies sources use the phrase in relation to Shirky.
- Poczucie obecności społecznej: Polish academic abstracts use the term in mediated interaction contexts.
- Relacja paraspołeczna: Polish communication studies sources use the term.
- Sprawczość człowieka: Polish AI and education policy discussions use the phrase; AI Act terminology should still be kept separate as "nadzór ze strony człowieka".
- Deskilling: Polish public and sector texts often keep the English term and explain it with "utrata kompetencji" or "erozja kompetencji".
- Wspomaganie decyzji: Polish decision support literature uses the phrase directly.

## Concept writing rules

- Define the concept plainly in the first paragraph.
- Distinguish technical behavior from human mental states.
- Do not imply that AI has consciousness, emotions, intentions or clinical understanding.
- Avoid forced Polish translations.
- Prefer natural Polish titles when the term is established.
- Use mixed titles when the English term is dominant and the Polish phrase is explanatory.
- Include related concepts manually in the body when useful.
- Include sources and context for every public concept.
