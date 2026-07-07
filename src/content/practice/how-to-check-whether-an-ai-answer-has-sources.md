---
title: "How to check whether an AI answer has sources"
description: "A practice for breaking an AI answer into claims, sources and risk points before it enters an article, presentation, team note or decision."
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

A fluent AI answer can look like a finished explanation. The problem is that style does not show where the claims come from. A link, publication title or author name is not enough either until a person checks whether the source exists and whether it actually supports the claim.

This practice treats the answer as material to check, not as a finished basis. The aim is to separate source-dependent claims from interpretation, mark the riskiest passages and prepare the work that has to happen outside the conversation with the model.

It is most useful for article drafts, team notes, presentations and sentences that contain numbers, dates, names, studies or institutions.

## When this helps

- When the answer contains dates, numbers, names, regulations, studies, reports or institutions.
- When the text may enter an article, presentation, team note, proposal or decision.
- When the model gives links, citations or titles you have not checked yourself.
- When you need to know which parts are hypotheses, which are interpretations and which require actual source work.

## What to ask the model

Use the model to organize risk, not to confirm itself. Source checking happens outside the model, preferably as a separate step and in material you can actually open.

```text
Read your previous answer and help me check which parts require sources.

Divide the answer into 5 parts:

1. Claims that require a source.
2. Claims that are interpretation or general explanation.
3. Links, titles, names or citations that I need to check outside this conversation.
4. Places where a source must not only exist, but support this exact claim.
5. Information I should not use without current external verification.

Do not invent publications, links or authors. Do not pretend to check sources if you do not have access to them. If you cannot verify something, say that directly. At the end, identify the 3 riskiest parts of the answer if I use them without checking.
```

## What to check yourself

- Whether the source actually exists.
- Whether it is primary, credible and current enough for the topic.
- Whether it says exactly what the model claims it says.
- Whether numbers, dates, names and study scope match the source.
- Whether the answer combines several sources into one claim that is too strong.

## What can go wrong

- The model may provide a source that sounds plausible but does not exist.
- The model may point to a real source that does not support the claim.
- The model may confuse the author, year, scope or context.
- A citation may become a decoration of credibility instead of a checked basis.

## Better way to use the answer

The model says in a presentation draft that a method "increases team effectiveness by 30%" and that recent studies support it. The better move is not to ask the model to "add sources". First mark the number as a claim that requires verification. Then check whether the study exists and whether it applies to a similar team, method and context. Only then decide whether the sentence stays, becomes more cautious or disappears.

This moves attention from finished [model output](/concepts/model-output/) to what the information is based on. It is a simple exercise in [epistemic vigilance](/concepts/epistemic-vigilance/): not only "does this sound good?", but "what can be checked, where and by whom?".

## Short rule

Do not ask the model whether it is right. Ask it to show what needs checking outside the model.

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
