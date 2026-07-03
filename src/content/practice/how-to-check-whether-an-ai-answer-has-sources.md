---
title: "How to check whether an AI answer has sources"
description: "A practice for separating source-dependent claims from interpretation and preparing external verification without asking the model to invent certainty."
publishedAt: 2026-07-03
draft: true
tags:
  - sources
  - verification
  - AI literacy
  - trust
author: "Feliks Mamczur"
readingTime: "5 min read"
lang: "en"
translationKey: "checking-ai-answer-sources"
type: "practice"
category: "Practice"
---

A fluent AI answer can look like a finished explanation, but form does not show where the claims come from. This practice treats the answer as material to inspect: facts, interpretations, source-dependent claims and places that should not be used before outside checking.

The goal is not to make the model "verify itself". The goal is to prepare the work that a person should do beyond the chat.

## When to use it

- When the answer contains dates, numbers, names, regulations, studies, reports or institutions.
- When the text may enter an article, presentation, team note, proposal or decision.
- When the model gives broad claims without links, source names or context.
- When you need to know which parts are hypotheses, which are interpretations and which require real source work.

## What not to do

- Do not ask the model to invent a bibliography for a finished text.
- Do not treat a confident tone as evidence.
- Do not assume that a link, title or citation exists because the model gave it.
- Do not use this practice as a replacement for checking sources yourself.

## Prompt

```text
Read your previous answer and help me inspect its source status.

Divide the answer into:

1. Claims that require a source.
2. Claims that are more like general explanation or interpretation.
3. Information you should not provide without current verification.
4. Types of sources I should look for outside this conversation in order to check it.

Do not invent specific publications, links or authors if you are not sure. If you cannot verify something, say so directly. At the end, identify the 3 riskiest parts of the answer if I use them without checking.
```

## Why this helps

This prompt moves attention from the finished answer to its knowledge status. It helps the user see that [model output](/concepts/model-output/) can be a draft, a map of questions or an interpretation, but not automatically a source of knowledge.

It is also a simple exercise in [epistemic vigilance](/concepts/epistemic-vigilance/). Instead of asking only "does this sound good?", the user asks: "what is this based on, what can I check and what do I still not know?".

## Risk and limitations

- The model may still misjudge which claims require sources.
- The model may not know current data or changes after its knowledge cutoff.
- Even useful source categories must be checked outside the model.
- A link, title or citation is not enough. You still need to check whether the source exists and whether it supports the specific claim.

## Related Concepts

- [Grounding](/concepts/grounding/)
- [Epistemic vigilance](/concepts/epistemic-vigilance/)
- [Calibrated trust](/concepts/calibrated-trust/)
- [Model Output](/concepts/model-output/)
- [Hallucination](/concepts/hallucination/)

## Further Reading

- [Trust in the age of ready-made answers](/articles/trust-in-the-age-of-ready-made-answers/)
- [Fluent does not mean true](/notes/fluent-does-not-mean-true/)
- [It is not just about the prompt](/articles/it-is-not-just-about-the-prompt/)
