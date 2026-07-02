---
title: "Context window"
description: "The amount of information a language model can reference in a given interaction, distinct from durable memory or understanding."
publishedAt: 2026-07-02
draft: false
lang: "en"
translationKey: "context-window"
routeSlug: "context-window"
tags: ["AI fundamentals", "context", "trust"]
---

A context window is the amount of text and other model-readable information that a language model can use in a given request or interaction. It can include the current prompt, earlier conversation, documents, tool results and generated output, depending on the system.

It is a technical constraint, not durable human-like memory. A larger context window can support longer work, but it does not automatically mean better judgment, complete recall or deeper understanding.

## Why it matters

People often experience AI as a continuous conversation. That can make it easy to assume that the system remembers everything in the way a person might. In practice, the model can only work with what is available in the current context and with how that context has been arranged.

For long documents, research tasks and organizational work, context window limits shape what the model can consider and what the user must still check.

## Human-AI angle

Context window changes trust because it affects what users believe the system has seen. If a person assumes that "the AI knows the whole conversation", they may miss what has been omitted, compressed or pushed out of scope.

The human task is not only to prompt. It is also to decide what context matters, what should be summarized and what needs independent verification.

## Related concepts

- [Token](/concepts/token/)
- [Model output](/concepts/model-output/)
- [AI literacy](/concepts/ai-literacy/)
- [Cognitive offloading](/concepts/cognitive-offloading/)
- [Mental model](/concepts/mental-model/)

## Sources and context

- Anthropic. (n.d.). *Context windows*. Claude Platform Docs. Retrieved July 2, 2026, from https://platform.claude.com/docs/en/build-with-claude/context-windows
- OpenAI. (n.d.). *Key concepts*. OpenAI API documentation. Retrieved July 2, 2026, from https://developers.openai.com/api/docs/concepts
