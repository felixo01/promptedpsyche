---
title: "Large Language Model (LLM)"
description: "An LLM is a large language model. Learn how tokens, context and generation work, and why a model is not the same thing as an AI product."
publishedAt: 2026-07-22
draft: false
lang: "en"
translationKey: "llm"
routeSlug: "llm"
tags:
  - LLM
  - large language model
  - AI literacy
  - mental model
  - language model
---

A large language model, usually shortened to LLM, is a trained model that learns patterns in language and uses them to generate or transform text. It may answer questions, summarise, translate, classify, write code, or help organise an argument. None of this makes it a person, a search engine, or a database of documents. An LLM is a model: one component inside a larger system.[^1]

That distinction matters because people often encounter an LLM through a conversational product. What they see is a chat window, conversation history, a search control, or a place to attach a file. It is tempting to attribute everything the application does to the model. In practice, some behaviour may come from the model, some from the context assembled for the current response, and some from tools and product features.

## The three parts of the name

### Model

A model is a configuration of parameters and operations shaped during training. During that process, its parameters are adjusted so that the model becomes better at capturing patterns in data. When the model is later used, it does not simply look through a catalogue of prepared sentences. It computes an output from what training has encoded and from the information available at that moment.[^2]

The word `model` protects against two misleading pictures. One is a library from which the system retrieves the correct document. The other is a person with beliefs, intentions, and memories. An LLM can produce language that resembles human expression. Similarity in the output does not settle whether the underlying mechanism resembles human thought.

### Language

A language model works with representations of language. Text is divided into tokens, which may correspond to words, parts of words, characters, or punctuation. The model therefore does not encounter a sentence in quite the way a reader does. It receives a sequence of numerical representations and computes relationships among its elements.[^3]

`Language` no longer necessarily means `text only`. Some models can also receive images, audio, or other data. In those cases, the label `multimodal` tells us about additional forms of input and output. The label LLM alone does not tell us which modalities, tools, or product functions a particular system supports.[^4]

### Large

`Large` points to the scale of a model, its training data, and the computation involved. There is no timeless parameter threshold at which a language model officially becomes an LLM. The boundary has moved as the field has developed. Parameter count can describe one aspect of a model, but it is not a complete measure of quality, safety, or usefulness.[^5]

The word therefore does not imply that a model is more truthful, more current, or better at every task. Scale can support new capabilities, but outputs also depend on data, architecture, training methods, post-training, context, and how the model is used.

## Training and generation happen at different times

During pretraining, a model learns broad patterns from large collections of data. Further training can shape it to follow instructions, display preferred behaviours, or perform particular tasks. Research on instruction following shows that post-training can substantially change an assistant's behaviour even though language modelling remains its starting point.[^6]

Inference is the later use of the trained model. A user supplies an instruction, the system assembles context, and the model generates an output. Adding another message to a conversation is not the same as training the model again. The message may change the next response because it is now in context, not because it immediately altered the model's parameters.

This is also why a conversation should be separated from a product's data policy. A service may have distinct settings for history, memory, and the possible use of content to improve models. Those are product and training-process decisions, not one automatic property shared by every LLM.[^7]

## A response is built token by token

For autoregressive models such as the GPT family, `the model predicts the next token` is a useful technical shorthand. Given the context so far, the model calculates possible next tokens, selects one, adds it to the sequence, and repeats the process. Many such steps produce a paragraph, a piece of code, or an answer.[^8]

The shorthand becomes misleading when it is made to mean `the model merely guesses` or `the entire product is elaborate autocomplete`. Token prediction operates inside a system shaped by large-scale training, post-training, instructions, generation rules, and sometimes tools. A simple repeated objective can support complex behaviour, but it does not provide a guarantee of truth.

Tokenisation is explained in detail in the [Token](/concepts/token/) Concept. The important point here is that the model works with tokens and calculates the probabilities of possible next elements in the response. It is not selecting a prepared, verified fact from a catalogue.

## Where the Transformer fits

The Transformer is a neural-network architecture introduced in 2017. Its attention mechanism allows a model to calculate how elements in a sequence relate to one another. The GPT family uses this architectural lineage.[^9]

The terms are not interchangeable. Not every transformer is an LLM, because transformers are also used outside language. Not every LLM is a GPT, because GPT is one model family. A product name such as ChatGPT belongs to another layer again. The note [OpenAI, ChatGPT, GPT and LLM: What Is the Difference?](/notes/openai-chatgpt-gpt-llm-difference/) maps those levels directly.

## Context is not perfect memory

A model generates from the information available in context. That context may include the user's instruction, earlier turns in a conversation, system instructions, part of a file, or the result returned by a tool. A context window sets a limit on how much information can be considered when generating a response.

More room does not mean that every part will be used equally well. Research has found that the position of information inside a long context can affect performance. A memory feature in the product may supply selected information as context in later conversations. That mechanism differs both from model parameters and from the current context window.[^10] The [Context Window](/concepts/context-window/) Concept and [The Model Does Not Remember. It Works With Context.](/articles/the-model-does-not-remember-it-works-with-context/) develop this boundary in full.

## What an LLM does not do on its own

A model does not necessarily have access to the web, private documents, a calculator, or a current database. A product can add those capabilities through search, retrieval, and tools. External material can then enter the context and the model can help process it. This still does not guarantee that the synthesis is correct or that every linked source supports every sentence.[^11]

The LLM also does not set the product's purpose, retention rules, or safety policy by itself. Those elements belong to the wider system and to the organisation deploying it. Behaviour visible in an interface can therefore change without a simple replacement of one model by another.

## Fluency is not evidence of truth

A language model is trained to produce likely and useful sequences, not to attach a truth guarantee to each statement. Research on truthfulness and hallucination shows that a model can produce false content in a convincing form.[^12] Search, retrieval, and better post-training may reduce some errors, but they do not remove the need for judgement.

The practical question is not simply `Is an LLM reliable?` It is `What kind of task is this, and what would an error cost?` A title variation needs a different check from a quotation, a statistic, medical guidance, or a financial decision. The [Model Output](/concepts/model-output/) Concept clarifies the status of generated material, while [AI Literacy](/concepts/ai-literacy/) develops the wider practice of responsible use.

## A mental model that helps us predict

A useful [mental model](/concepts/mental-model/) does not need to reproduce all the mathematics of an LLM. It should help a user anticipate how the system may behave. The core is compact: the model generates from learned patterns and current context; the product may add memory and tools; fluent language can still contain an error; and the boundary of competence depends on the task.[^13]

This view avoids two opposite mistakes. The first is anthropomorphism: assuming that the system knows, remembers, and intends in the same way a person does. The second is dismissal: assuming that token prediction cannot produce complex and useful results. A more accurate view lies between them. An LLM can be a powerful language model while remaining one component of a system whose outputs must be interpreted in relation to the task, the evidence, and the stakes.

## Bibliography

1. OpenAI Academy. *AI fundamentals*. Accessed 2026-07-22. https://openai.com/academy/what-is-ai/
2. Stanford Institute for Human-Centered AI. *What is a Large Language Model (LLM)?* Accessed 2026-07-22. https://hai.stanford.edu/ai-definitions/what-is-a-llm
3. OpenAI Help Center. *What are tokens and how to count them?* Accessed 2026-07-22. https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them
4. OpenAI et al. *GPT-4 Technical Report*. 2023. https://arxiv.org/abs/2303.08774
5. Brown, T. B. et al. *Language Models are Few-Shot Learners*. NeurIPS, 2020. https://proceedings.neurips.cc/paper/2020/hash/1457c0d6bfcb4967418bfb8ac142f64a-Abstract.html
6. Ouyang, L. et al. *Training language models to follow instructions with human feedback*. NeurIPS, 2022. https://proceedings.neurips.cc/paper_files/paper/2022/hash/b1efde53be364a73914f58805a001731-Abstract-Conference.html
7. OpenAI Help Center. *Data Controls FAQ*. Accessed 2026-07-22. https://help.openai.com/en/articles/7730893-data-controls-faq
8. Radford, A. et al. *Improving Language Understanding by Generative Pre-Training*. OpenAI, 2018. https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf
9. Vaswani, A. et al. *Attention Is All You Need*. NeurIPS, 2017. https://proceedings.neurips.cc/paper_files/paper/2017/hash/3f5ee243547dee91fbd053c1c4a845aa-Abstract.html
10. Liu, N. F. et al. *Lost in the Middle: How Language Models Use Long Contexts*. TACL, 2024. https://doi.org/10.1162/tacl_a_00638
11. Lewis, P. et al. *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks*. NeurIPS, 2020. https://proceedings.neurips.cc/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html
12. Ji, Z. et al. *Survey of Hallucination in Natural Language Generation*. ACM Computing Surveys, 2023. https://doi.org/10.1145/3571730
13. Bansal, G. et al. *Beyond Accuracy: The Role of Mental Models in Human-AI Team Performance*. HCOMP, 2019. https://doi.org/10.1609/hcomp.v7i1.5285
14. Sennrich, R., Haddow, B., Birch, A. *Neural Machine Translation of Rare Words with Subword Units*. ACL, 2016. https://doi.org/10.18653/v1/P16-1162
15. OpenAI Developer Documentation. *Models*. Accessed 2026-07-22. https://developers.openai.com/api/docs/models
16. Bommasani, R. et al. *On the Opportunities and Risks of Foundation Models*. Stanford CRFM, 2021. https://arxiv.org/abs/2108.07258
17. OpenAI Developer Documentation. *Using tools*. Accessed 2026-07-22. https://developers.openai.com/api/docs/guides/tools
18. Lin, S., Hilton, J., Evans, O. *TruthfulQA: Measuring How Models Mimic Human Falsehoods*. ACL, 2022. https://doi.org/10.18653/v1/2022.acl-long.229
19. NIST. *Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile*. 2024. https://doi.org/10.6028/NIST.AI.600-1
20. Kulesza, T. et al. *Too Much, Too Little, or Just Right? Ways Explanations Impact End Users' Mental Models*. IEEE VL/HCC, 2013. https://doi.org/10.1109/VLHCC.2013.6645235
21. OpenAI Help Center. *Memory FAQ*. Accessed 2026-07-22. https://help.openai.com/en/articles/8590148-memory-faq

[^1]: OpenAI Academy; Stanford HAI.
[^2]: OpenAI Academy; Brown et al.
[^3]: OpenAI Help Center; Sennrich et al.
[^4]: OpenAI, *GPT-4 Technical Report*; OpenAI model documentation.
[^5]: Stanford HAI; Bommasani et al.; Brown et al.
[^6]: Ouyang et al.
[^7]: OpenAI, *Data Controls FAQ*.
[^8]: Radford et al.; OpenAI Academy.
[^9]: Vaswani et al.; Radford et al.; Brown et al.
[^10]: Liu et al.; OpenAI, *Memory FAQ*, checked 2026-07-22.
[^11]: Lewis et al.; OpenAI tool documentation.
[^12]: Ji et al.; Lin et al.; NIST.
[^13]: Bansal et al.; Kulesza et al.
