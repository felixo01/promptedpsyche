---
title: "Grounding"
description: "Connecting an AI answer to specific sources, data or context that can be checked."
publishedAt: 2026-07-03
draft: false
tags: ["sources", "verification", "model output", "AI literacy"]
lang: "en"
translationKey: "grounding"
routeSlug: "grounding"
---

Grounding is the practice of connecting an AI answer to specific sources, documents, data or retrieved context. A grounded answer should be easier to inspect because it can point back to the material that shaped it.

Grounding is often discussed in relation to retrieval-augmented generation, where a model uses retrieved passages or external data instead of relying only on information encoded in its parameters. In practice, grounding can also mean asking the model to work only with a supplied document, to quote relevant passages, to separate evidence from interpretation or to state when the provided context is insufficient.

## Why it matters

Grounding helps reduce some risks of hallucination, but it does not remove them. A model can cite the wrong passage, overread a source, miss a limitation or combine evidence too freely. The presence of sources is a starting point for verification, not a guarantee of truth.

For organizations, grounding is important because it changes the quality of the conversation. Instead of asking "Does this sound right?", the team can ask "What is this based on, and can we inspect it?"

## Human-AI angle

Grounding supports human judgment when it keeps attention on evidence. It weakens judgment when citations become decorative signals of credibility. The important question is not only whether sources are present, but whether people know how to read them against the claim.

## Related concepts

- [Hallucination](/concepts/hallucination/)
- [Context window](/concepts/context-window/)
- [Model output](/concepts/model-output/)

## Sources and context

- Lewis, P., Perez, E., Piktus, A., Petroni, F., Karpukhin, V., Goyal, N., Kuttler, H., Lewis, M., Yih, W., Rocktaschel, T., Riedel, S., & Kiela, D. (2020). Retrieval-augmented generation for knowledge-intensive NLP tasks. *Advances in Neural Information Processing Systems.* https://arxiv.org/abs/2005.11401
- Google. (n.d.). *Grounding with Google Search.* https://firebase.google.com/docs/ai-logic/grounding-google-search
