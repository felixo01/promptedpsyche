# DOI / Zenodo Title Protection Audit

Audit date: 2026-07-29  
Repository: `felixo01/promptedpsyche`  
Branch audited: `main`

## Decision and scope

This audit establishes a permanent editorial distinction:

- an English publication with its own direct `doi` is title-protected;
- a Polish companion with only `relatedDoi` links to the English record and does not own that DOI, so its Polish title may be edited on the author's request;
- a Polish title edit must never be propagated automatically to the protected English title.

For a protected English publication, `title`, visible H1, title-derived slug, `citation_title`, HTML title, structured-data headline and other identifying metadata must not be changed without an explicit author decision. Suspected inconsistencies are reported rather than automatically corrected.

The audit covers all files in `src/content/articles` and `src/content/notes`, including drafts. It checks frontmatter, direct and related DOI fields, Zenodo metadata, deposited PDFs, title rendering, metadata propagation, slugs and recent title history.

## Implementation check

The article and note templates use the frontmatter `title` as the shared source for the visible H1, page title and structured-data headline. Eligible Scholar pages also use it for `citation_title`. No publication contains a separate Markdown H1 that could diverge from frontmatter. The audited slugs remain stable and identify the corresponding publication.

## Direct DOI and Zenodo records

| Repository file | Repository title | Zenodo metadata and PDF title | DOI | Record and PDF | Status |
| --- | --- | --- | --- | --- | --- |
| `src/content/articles/what-changes-when-ai-has-a-body.md` | What changes when AI has a body? | What changes when AI has a body? | `10.5281/zenodo.21296384` | Public record; PDF present; version 1.0 | OK |
| `src/content/articles/trust-in-the-age-of-ready-made-answers.md` | Trust in the age of ready-made answers | Trust in the age of ready-made answers | `10.5281/zenodo.21301650` | Public record; PDF present; version 1.0 | OK |
| `src/content/articles/dont-ask-whether-ai-makes-us-dumber.md` | Don't Ask Whether AI Makes Us Dumber. Ask What Kind of Thinking We Stop Practicing | Don't Ask Whether AI Makes Us Dumber. Ask What Kind of Thinking We Stop Practicing | `10.5281/zenodo.21358687` | Public record; PDF present | OK |
| `src/content/articles/when-search-becomes-an-answer.mdx` | When Search Becomes an Answer: What Generative AI Changes About Learning | When Search Becomes an Answer: What Generative AI Changes About Learning | `10.5281/zenodo.21491639` | Public record; PDF present; version 1.7 | OK |

Official records:

- <https://zenodo.org/records/21296384>
- <https://zenodo.org/records/21301650>
- <https://zenodo.org/records/21358687>
- <https://zenodo.org/records/21491639>

## Full publication inventory

`Related EN DOI` means that the Polish publication links to the English record but does not claim the DOI as its own. For publications without a direct DOI, `OK` means that no DOI-title comparison applies and the repository title is propagated consistently to H1 and title metadata.

| File | Repository title | DOI / Zenodo title | DOI | Status |
| --- | --- | --- | --- | --- |
| `src/content/articles/ai-as-a-mirror-why-it-can-feel-so-easy-to-talk-to.md` | AI as a mirror: why it can feel so easy to talk to | Not applicable | - | OK |
| `src/content/articles/ai-does-not-read-people-it-helps-make-sense-of-the-situation.md` | AI does not read people. It helps make sense of the situation. | Not applicable | - | OK |
| `src/content/articles/ai-jako-lustro-dlaczego-tak-latwo-sie-z-nim-dogadujemy.md` | AI jako lustro. Dlaczego tak łatwo mu ufamy? | Not applicable | - | OK |
| `src/content/articles/ai-literacy-is-not-prompt-engineering.mdx` | AI Literacy Is Not Prompt Engineering | Not applicable | - | OK |
| `src/content/articles/ai-nie-czyta-ludzi-pomaga-uporzadkowac-sytuacje.md` | AI nie czyta ludzi. Pomaga uporządkować sytuację. | Not applicable | - | OK |
| `src/content/articles/are-we-afraid-of-ai-or-of-ourselves.md` | Are we afraid of AI, or of ourselves? | Not applicable | - | OK |
| `src/content/articles/co-sie-zmienia-kiedy-ai-ma-cialo.md` | Co się zmienia, kiedy AI ma ciało? | Related EN DOI: What changes when AI has a body? | `10.5281/zenodo.21296384` (related) | OK |
| `src/content/articles/czy-boimy-sie-ai-czy-boimy-sie-samych-siebie.md` | Czy boimy się AI, czy boimy się samych siebie? | Not applicable | - | OK |
| `src/content/articles/dont-ask-whether-ai-makes-us-dumber.md` | Don't Ask Whether AI Makes Us Dumber. Ask What Kind of Thinking We Stop Practicing | Don't Ask Whether AI Makes Us Dumber. Ask What Kind of Thinking We Stop Practicing | `10.5281/zenodo.21358687` | OK |
| `src/content/articles/it-is-not-just-about-the-prompt.md` | It is not just about the prompt | Not applicable | - | OK |
| `src/content/articles/nie-chodzi-tylko-o-prompt.md` | Nie chodzi tylko o prompt | Not applicable | - | OK |
| `src/content/articles/nie-pytaj-czy-ai-nas-oglupia.md` | Gotowe odpowiedzi zmieniają sposób uczenia się. Co mówi o tym nauka? | Related EN DOI: Don't Ask Whether AI Makes Us Dumber. Ask What Kind of Thinking We Stop Practicing | `10.5281/zenodo.21358687` (related) | OK |
| `src/content/articles/trust-in-the-age-of-ready-made-answers.md` | Trust in the age of ready-made answers | Trust in the age of ready-made answers | `10.5281/zenodo.21301650` | OK |
| `src/content/articles/what-changes-when-ai-has-a-body.md` | What changes when AI has a body? | What changes when AI has a body? | `10.5281/zenodo.21296384` | OK |
| `src/content/articles/when-search-becomes-an-answer.mdx` | When Search Becomes an Answer: What Generative AI Changes About Learning | When Search Becomes an Answer: What Generative AI Changes About Learning | `10.5281/zenodo.21491639` | OK |
| `src/content/articles/why-people-trust-ai-even-when-they-shouldnt.mdx` | Why People Trust AI Even When They Shouldn't | Not applicable | - | OK |
| `src/content/articles/wyszukiwarka-odpowiada-co-zostaje-uczniowi.mdx` | Gdy odpowiada wyszukiwarka. Jak zmienia się proces uczenia się? | Related EN DOI: When Search Becomes an Answer: What Generative AI Changes About Learning | `10.5281/zenodo.21491639` (related) | OK |
| `src/content/articles/zaufanie-w-epoce-gotowych-odpowiedzi.md` | Zaufanie do nauki w erze gotowych odpowiedzi | Related EN DOI: Trust in the age of ready-made answers | `10.5281/zenodo.21301650` (related) | OK |
| `src/content/notes/a-good-summary-is-not-the-same-as-a-good-decision.md` | A good summary is not the same as a good decision | Not applicable | - | OK |
| `src/content/notes/brzmi-dobrze-nie-znaczy-ze-jest-prawdziwe.md` | Brzmi dobrze, ale to nie znaczy, że jest prawdziwe | Not applicable | - | OK |
| `src/content/notes/dobre-streszczenie-to-jeszcze-nie-dobra-decyzja.md` | Dobre streszczenie to jeszcze nie dobra decyzja | Not applicable | - | OK |
| `src/content/notes/do-not-diagnose-people-from-emails.md` | Do not diagnose people from emails | Not applicable | - | OK |
| `src/content/notes/fluent-does-not-mean-true.md` | Fluent does not mean true | Not applicable | - | OK |
| `src/content/notes/masz-racje-powiedzialo-ai.md` | „Masz rację” — powiedziało AI. Problem w tym, że znało tylko twoją wersję | Not applicable | - | OK |
| `src/content/notes/model-nie-pamieta-model-ma-kontekst.mdx` | Model nie pamięta. Model ma kontekst. | Not applicable | - | OK |
| `src/content/notes/model-widzi-tekst-nie-cala-relacje.md` | Model widzi tekst, a nie całą relację | Not applicable | - | OK |
| `src/content/notes/nie-diagnozuj-ludzi-z-maili.md` | Nie diagnozuj ludzi z maili | Not applicable | - | OK |
| `src/content/notes/openai-chatgpt-gpt-llm-czym-sie-roznia.mdx` | OpenAI, ChatGPT, GPT i LLM - czym się różnią? | Not applicable | - | OK |
| `src/content/notes/openai-chatgpt-gpt-llm-difference.mdx` | OpenAI, ChatGPT, GPT and LLM: What Is the Difference? | Not applicable | - | OK |
| `src/content/notes/the-model-does-not-remember-it-works-with-context.mdx` | The model does not remember. It works with context. | Not applicable | - | OK |
| `src/content/notes/the-model-sees-text-not-the-whole-relationship.md` | The model sees text, not the whole relationship | Not applicable | - | OK |
| `src/content/notes/we-prompt-machines-machines-prompt-us-back.mdx` | We Prompt Machines. Machines Prompt Us Back | Not applicable | - | OK |
| `src/content/notes/youre-right-said-the-ai.md` | “You’re Right,” Said the AI. But It Only Knew Your Side of the Story | Not applicable | - | OK |

## Recent title-history check

No English direct-DOI title was changed after its corresponding Zenodo record was created.

- Commit `840efbe` changed the English trust-article title on 2026-07-03, before the Zenodo record was created on 2026-07-10. The current repository title matches the record and PDF exactly.
- Commits `322c19f`, `480d2fa` and `74e2894` changed Polish titles that carry only `relatedDoi`. Under the clarified policy, these are permitted editorial changes and are not DOI-title violations.
- Earlier Polish title changes associated with commit `845f6c7` likewise concern companion pages rather than owners of direct DOI records.

No historical item requires an automatic correction or an author decision.

## Result

- Publications audited: 33 (18 articles and 15 notes)
- Public publications: 30
- Drafts included: 3
- English publications with a direct DOI: 4
- Publications with their own Zenodo record and deposited PDF: 4
- Polish companion publications with `relatedDoi`: 4
- Status `OK`: 33
- Status `MISMATCH`: 0
- Files requiring an author decision: none
