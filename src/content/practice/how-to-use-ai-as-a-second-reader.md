---
title: "How to use AI as a second reader"
description: "A practice for using AI as an editorial reader without handing over authorship, voice or responsibility for the text."
publishedAt: 2026-07-03
draft: true
tags:
  - editing
  - writing
  - AI literacy
  - responsibility
author: "Feliks Mamczur"
readingTime: "5 min read"
lang: "en"
translationKey: "ai-as-second-reader"
type: "practice"
category: "Practice"
---

Writers usually know what they meant. That is exactly why unclear transitions, missing context or sentences that readers may misunderstand can be hard to see. AI can help as a second reader, but it should not take over authorship.

This practice treats the model as a source of editorial distance. It helps reveal possible reader reactions without automatically smoothing the text into something generic.

## When to use it

- Before publishing an article, note, email or presentation.
- When the text is clear to the author but may be unclear to the reader.
- When you want to check whether the argument guides the reader step by step.
- When the text may sound too certain, too sharp or too broad.

## What not to do

- Do not ask the model to rewrite the text in someone else's style.
- Do not hand over the thesis, tone or final version to the model.
- Do not accept every suggestion just because it sounds professional.
- Do not turn an authored text into a neutral, polished text with no character.

## Prompt

```text
Read my text as a second reader, not as the author.

Do not rewrite the whole text. Help me see how it may be received.

List:

1. The main claim of the text as you understand it.
2. Places where a reader may get lost.
3. Sentences that sound too certain for the available argument.
4. Missing context a reader may need.
5. Parts that may be read differently than I intend.
6. Three concrete editorial questions I should ask myself.

Do not make the tone more marketing-oriented. Do not automatically smooth the text. Do not take over authorship. If you suggest an edit, explain what reader problem it solves.

Text:
[paste text]
```

## Short example

An author writes a short text about AI in an organization and assumes the reader understands the difference between automation and decision support. The prompt can show that this shortcut is clear to the author but not necessarily to the reader. The model suggests editorial questions and places that need context instead of taking over the voice. The final decision about changes stays with the author.

## Why this helps

This prompt treats [model output](/concepts/model-output/) as feedback, not as finished copy. The model can show where a reader may pause, but it does not know which voice, rhythm and meaning the author wants to keep.

The practice supports [human agency](/concepts/human-agency/). AI may reduce [cognitive load](/concepts/cognitive-load/) in editing, but it does not replace the author's judgment.

## Risk and limitations

- The model may reward smoothness over precision.
- Suggestions may weaken the author's voice.
- The model does not know the real audience or full publication context.
- The author still has to decide which comments are useful and what to change.

## Related Concepts

- [Model Output](/concepts/model-output/)
- [Mental model](/concepts/mental-model/)
- [Human agency](/concepts/human-agency/)
- [AI-mediated communication](/concepts/ai-mediated-communication/)
- [Cognitive load](/concepts/cognitive-load/)

## Further Reading

- [It is not just about the prompt](/articles/it-is-not-just-about-the-prompt/)
- [AI as a mirror: why it can feel so easy to talk to](/articles/ai-as-a-mirror-why-it-can-feel-so-easy-to-talk-to/)
- [A good summary is not the same as a good decision](/notes/a-good-summary-is-not-the-same-as-a-good-decision/)
