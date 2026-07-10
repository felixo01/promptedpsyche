---
title: "Trust in the age of ready-made answers"
description: "How generative AI compresses the path from sources to answers, and why trust must be calibrated through provenance, uncertainty, disagreement and human responsibility."
publishedAt: 2026-07-02
updatedAt: 2026-07-10
draft: false
tags:
  - AI and humans
  - trust in AI
  - knowledge
  - science
  - AI literacy
  - communication
author: "Feliks Mamczur"
readingTime: "18 min read"
doi: "10.5281/zenodo.21301650"
doiUrl: "https://doi.org/10.5281/zenodo.21301650"
version: "1.0"
licenseName: "CC BY 4.0"
licenseUrl: "https://creativecommons.org/licenses/by/4.0/"
inBrief:
  - "Generative AI changes not only access to information, but also the visible path between sources and conclusions."
  - "Fluent synthesis can improve access while hiding provenance, disagreement, uncertainty and the limits of evidence."
  - "Critical thinking does not simply disappear when AI is used; part of it moves toward verification, integration and task stewardship."
  - "Trust should be calibrated to the task, stakes, sources and possibility of correction, not to the confidence or fluency of the interface."
image: /images/articles/ai-path-to-knowledge.svg
imageAlt: "Diagram showing how AI changes the path between people and knowledge: the model provides a fast answer, while sources, methods, data, disagreement and verification remain underneath."
imageCaption: "AI can shorten the path from question to answer. Mature use begins when we can move back from the answer to sources, methods, data, uncertainty and verification."
lang: "en"
translationKey: "ai-path-to-knowledge"
---

You ask a difficult question and receive a complete answer before you have seen a single piece of evidence. The answer is calm. It distinguishes several possibilities, anticipates an objection and ends with a practical recommendation. Nothing about its form feels provisional. By the time the sources appear, if they appear at all, the main psychological work may already be done: confusion has become orientation, and orientation feels close to knowing.

Generative AI can genuinely help. It can lower the cost of entering an unfamiliar field, translate specialist language and reveal a structure that was difficult to see across many documents. Yet the same interface can hide what a conclusion normally carries with it: an author, a method, a date, a body of evidence, a dispute and someone accountable for how the claim is used.

The central problem is therefore larger than whether a model occasionally invents a fact. Even a factually correct answer may alter the user's relationship with knowledge when it removes the visible route by which the conclusion was produced. The answer arrives; the route recedes.

<aside class="key-passage" data-qa="key-passage">
  <p class="key-passage__label">Key passage</p>
  <p>Generative AI can shorten the path from a question to useful orientation. Trust becomes difficult to calibrate when that shorter path also hides provenance, evidential strength, uncertainty, disagreement and responsibility.</p>
</aside>

## Abstract

This research-informed conceptual essay examines how generative AI changes the relationship between questions, sources and the feeling of knowing. It is a narrative synthesis, not a systematic review. It connects research on trust, verifiability, automation and AI-assisted work to an analysis of how conversational interfaces present knowledge. The central argument is that generative AI acts as an epistemic intermediary: it can open access to complex material while compressing the epistemic path into one fluent answer. Provenance, evidential strength, uncertainty, disagreement and responsibility can become less visible in that compression. Evidence about citation support, self-reported critical-thinking effort and overreliance shows why fluent explanations do not guarantee appropriate reliance. The practical response is calibrated reliance rather than categorical trust or distrust. Match reliance to the task and its stakes, then reconstruct the path from a claim to its provenance, evidence, uncertainty, disagreement and responsible decision-maker when the consequences require it.

## Scope and method

The method is deliberately selective rather than exhaustive. It does not use a preregistered search strategy or provide a quantitative estimate of effects. Priority went to peer-reviewed research, official reports and directly relevant primary sources that could clarify a claim made in the article.

The evidence comes from several fields that ask related but different questions. Public-trust research shows how people evaluate scientists and institutions. Social epistemology examines how knowledge depends on testimony, experts and other people. Information retrieval and generative-search studies ask whether answers can be traced to supporting material. Research on [hallucination](/concepts/hallucination/) and factuality examines whether generated text remains faithful to its sources. Trust-in-automation and [Human-AI Interaction](/concepts/human-ai-interaction/) research focus on reliance, interface cues and human control. Work on [cognitive offloading](/concepts/cognitive-offloading/) and critical thinking helps explain how effort can be redistributed when a system performs part of a task.

These literatures do not combine into one settled theory of generative AI and knowledge. They provide constraints for a conceptual argument. Numerical claims below are tied to specific studies; interpretations about the interface are presented as interpretations. Helen Pearson's 2026 *Nature* feature is used as a journalistic starting point for the public debate, not as primary empirical evidence.

## Trust in science is not a single switch

Talk of a global crisis of trust in science is rhetorically powerful and empirically imprecise. A preregistered survey led by Viktoria Cologna and Niels Mede included 71,922 respondents in 68 countries. It found moderately high trust in scientists overall and no widespread global lack of trust, while also finding meaningful differences between countries and social groups. Its trust measure covered perceived competence, benevolence, integrity and openness. The study does not justify complacency, but it does rule out a simple story in which publics everywhere have stopped trusting scientists (Cologna et al., 2025).

The UK *Public Attitudes to Science 2025* report adds a more local and ambivalent picture. Ipsos surveyed 5,281 UK adults aged 16 or over between February and July 2025 for UK Research and Innovation, in partnership with the British Science Association. Large majorities still valued the contribution of science and scientists. At the same time, neutral or uncertain responses became more common, fewer people felt informed than in 2019, and AI emerged as a divisive subject. The methodology changed to predominantly push-to-web collection, so direct comparisons with 2019 require caution (Ipsos, 2026).

These findings point to several objects of trust that should not be collapsed. A person may trust scientists' competence but doubt a particular institution. They may value scientific methods while objecting to how a government or company applies the results. They may accept an expert consensus while finding the communication arrogant or incomplete. Trust in scientists, institutions, methods, applications, communication and the use of knowledge are connected, but they are not interchangeable.

Pearson's *Nature* feature usefully challenges the dramatic crisis narrative and shows where fractures remain (Pearson, 2026). The more important question for this essay begins one step later: what happens when a person encounters all those distinctions through an interface that speaks in one voice?

## AI becomes an epistemic intermediary

Human knowledge has never been a solitary achievement. We depend on testimony, instruments, records, institutions and specialists whose work we cannot reproduce. John Hardwig called attention to this epistemic dependence in scientific and everyday knowledge, while Alvin Goldman examined how non-experts might judge competing experts (Hardwig, 1985; Goldman, 2001). Dan Sperber and colleagues described [epistemic vigilance](/concepts/epistemic-vigilance/) as the set of processes through which people assess communicated information and its sources (Sperber et al., 2010).

Generative AI does not create dependence from nothing. It changes its presentation. When a researcher, institution or document is visible, a reader has at least some cues about competence, context and accountability. A model can gather language around many such sources and return a single [model output](/concepts/model-output/) whose voice belongs to none of them. The underlying dependencies remain, but their identities can become harder to see.

A language model is not a scientific institution, the author of the studies it describes, a research method, a primary source or an accountable expert. In a system with retrieval, it may select and organize documents. In other settings, it generates from patterns learned during training and from the material supplied in the conversation. Either way, the answer is an interface product. It can orient the user toward knowledge, but it should not be mistaken for the institutional and evidential processes behind that knowledge.

This is why calling AI an epistemic intermediary is more precise than calling it a new expert. An intermediary shapes what becomes visible, how claims are ordered and what level of uncertainty survives the transition into an answer. It can make access easier while changing the cues by which the user decides what deserves trust.

## When the epistemic path is compressed

I use the phrase **compression of the epistemic path** descriptively. It names an interface-level event: a complex route through documents, evidence and disagreement is rendered as one conversational answer. It is not a validated psychological construct, an established term in the literature or a theory attributed to this article.

Compression is not automatically distortion. Maps, abstracts, lectures and responsible journalism also shorten paths through knowledge. The question is which distinctions survive the shortening and whether the user can recover what was removed. Four kinds of compression are especially important.

### Provenance compression

A generated paragraph can combine a peer-reviewed paper, an institutional report, journalism, company documentation, commentary and old background material without preserving the differences among them. Their sentences acquire the same typography, tone and apparent status. A reader may see citations without seeing whether the decisive claim came from a primary study, a secondary synthesis or a source with a commercial interest.

[Grounding](/concepts/grounding/) can improve this situation by connecting an answer to retrieved material. It does not settle source quality, independence or relevance. A retrieved source may be real and still be too old, too broad or poorly matched to the claim. Provenance requires more than a link. It requires knowing what kind of source it is, who produced it, when and for what purpose.

### Uncertainty compression

Research rarely speaks in the register of a complete conversational answer. Findings come with sampling decisions, confidence intervals, model assumptions, measurement limits and conditions under which they may not generalize. Reviews separate consistent patterns from open questions. Experts often disagree about how much confidence the available evidence warrants.

During synthesis, these features can be converted into a smooth paragraph whose grammar implies more closure than the evidence supports. A phrase such as "research shows" can cover anything from a well-replicated effect to one observational study. The sentence may be technically defensible and still conceal how conditional it is.

### Disagreement compression

Specialists can agree on data while disputing definitions, methods, interpretation, generalizability or policy implications. A synthesis designed to be helpful often resolves this tension by choosing a central answer. That may be appropriate for orientation, but it can also erase the fact that a serious alternative exists.

The missing disagreement matters most when the user's decision depends on which interpretation is right. A model asked to explain a settled term and a model asked to interpret a contested social-science finding may use the same calm voice. Only the second task requires a map of competing positions, and the interface will not always volunteer one.

### Responsibility compression

Generated information often passes through a chain: a model produces text, a retrieval system selects sources, a user accepts or edits the result, an organization publishes it and another person acts on it. When the output fails, each part of the chain can point elsewhere.

The model does not carry professional, moral or institutional responsibility for how an answer is used. It cannot sign a clinical opinion, defend a legal interpretation, disclose an organizational conflict or answer to a person harmed by a recommendation. Responsibility remains with the people and institutions that design the workflow, approve the result and act on it. A convenient interface can hide that chain, but it cannot dissolve it.

## Fluency can imitate evidential strength

Psychological research gives reasons to treat fluency as a possible credibility cue, but not as a universal cause of persuasion. Experiments on perceptual fluency found that easier-to-process statements could receive higher truth judgments, and a meta-analysis of 51 studies found a reliable repetition-based truth effect (Reber & Schwarz, 1999; Dechêne et al., 2010). These studies did not test language-model interfaces. They establish a narrower point: features unrelated to evidential quality can influence felt truth.

Generative AI adds a distinctive form of ease. It can produce orderly prose, adapt an explanation to the reader and answer follow-up questions without the friction of opening a paper. Fluency may reduce the felt need to verify, especially when users lack time, subject expertise or direct access to the material. It does not automatically persuade everyone, and disfluency would not make an answer more truthful. The risk is that professional language and visible structure can stand in for evidence when evidence is hard to inspect.

Research on natural-language generation shows why form cannot carry that burden. A broad survey by Ji and colleagues documents how systems can generate fluent content that is unfaithful or unsupported across several tasks. Earlier work on abstractive summarization found substantial hallucinated content in summaries produced by the systems studied, even as pretrained models improved conventional quality measures (Ji et al., 2023; Maynez et al., 2020). These findings concern particular systems and tasks, not an immutable property of every current model. They still show that linguistic quality and evidential fidelity must be evaluated separately.

The same separation applies when an answer looks scholarly. Headings, caveats and a bibliography may increase confidence in the presentation. None of them proves that a sentence is supported.

## A citation is a route, not a certificate

In 2023, Nelson Liu, Tianyi Zhang and Percy Liang audited four generative search engines. Across the responses they evaluated, approximately 51.5% of generated sentences were fully supported by citations, while approximately 74.5% of citations supported the sentence with which they were associated (Liu et al., 2023). The audit involved specific systems at a specific point in time. It should not be recycled as a permanent performance score for all present-day products.

Its enduring lesson is conceptual: citation presence is not the same as evidential support. At least seven questions remain after a citation appears:

1. **Existence:** Is the cited source real and accessible?
2. **Relevance:** Does it address the subject of the claim?
3. **Quality:** Is its method and publication context adequate for the use?
4. **Accuracy:** Has the source been represented fairly?
5. **Claim-level support:** Does it support this precise sentence, not merely the general topic?
6. **Recency:** Is the source current enough for a changing field?
7. **Independence:** Do several citations represent independent evidence, or repeat the same origin?

A valid DOI proves that a registered object exists. It does not prove that the object supports the sentence beside it. A real study can be misrepresented, outdated, methodologically weak, irrelevant to the precise claim or secondary when a primary source is needed. Checking a citation therefore means moving from the visual sign of seriousness back to the actual argument, data and scope.

## Critical thinking may move rather than vanish

Claims that AI "destroys critical thinking" run ahead of the evidence. A CHI 2025 study by Hao-Ping Lee and colleagues surveyed 319 knowledge workers and collected 936 first-hand examples of GenAI use in work tasks. Greater confidence in GenAI was associated with less reported critical-thinking effort. Greater task-specific self-confidence was associated with more reported effort. Participants' descriptions also suggested a shift in critical work toward information verification, response integration and task stewardship (Lee et al., 2025).

The study is important precisely because its limits are clear. It measured self-reports and associations, not a causal decline in cognitive ability. It does not show that using AI makes people less intelligent. It suggests that the distribution of effort changes depending on confidence in the system, confidence in one's own competence and the task.

This connects to cognitive offloading, the use of external action or tools to reduce a task's internal cognitive demands. Notes, calculators, maps and search engines all support it. Offloading can free attention for higher-level work; it can also leave a gap if monitoring disappears. The relevant question is not whether a person offloads, but what they offload (Risko & Gilbert, 2016):

- memory or search;
- drafting or synthesis;
- source selection;
- interpretation;
- judgment;
- responsibility.

AI may reduce the effort required to produce an initial answer while increasing the importance of checking, comparing and integrating it. Task stewardship means remaining responsible for the whole process: defining what success means, noticing when the system exceeds its evidence, deciding what requires expert review and owning the consequences of use. That is critical thinking in a different location, not proof that it has vanished.

## Why explanations and citations are not enough

An explanation can help a user inspect a recommendation, but it can also become another sign that the system is competent. In an experiment with 199 participants, Zana Buçinca, Maja Barbara Malaya and Krzysztof Gajos compared three cognitive-forcing designs with simpler explainable-AI approaches and a no-AI baseline. Interventions that required more active engagement reduced [overreliance](/concepts/overreliance/) more effectively than the simpler explanation interfaces. The trade-off was experiential: participants gave the least favorable subjective ratings to the designs that reduced overreliance most (Buçinca et al., 2021).

One experiment does not establish a universal interface rule. It does challenge the assumption that adding a rationale automatically produces appropriate reliance. Users can treat an explanation as evidence about the system rather than as material to test. Designs that ask for an independent judgment, delay the recommendation or require comparison can create useful friction, but they may also feel less convenient.

Not every low-stakes task needs a verification ritual. Generating title ideas is different from recommending a treatment. Good design should add effort in proportion to consequences, uncertainty and the user's ability to recover from error.

## Calibrated trust is task-specific

Trust, reliance and appropriate reliance should be kept separate. Trust is an attitude or expectation about a system. Reliance is behavior: using its output in a decision or action. Appropriate reliance means that behavior is reasonably matched to what the system can do in that context. Classic automation research also warns about misuse through overreliance and disuse through excessive rejection; "trust more" and "trust less" are both inadequate general rules (Parasuraman & Riley, 1997; Lee & See, 2004).

[Calibrated trust](/concepts/calibrated-trust/) depends on five features:

1. **Stakes and reversibility.** What happens if the answer is wrong, and can the error be corrected before it causes lasting harm?
2. **Source visibility and quality.** Can the route to the underlying material be inspected, and are the sources primary, current, independent and suitable?
3. **User competence.** Can the person recognize a weak answer in this domain?
4. **Independent verification.** Is there another way to check the claim?
5. **Responsibility.** Who must justify and answer for the outcome?

Consider how these features change across tasks. Title ideas are low stakes and easily reversed, so fluency may be enough. A summary of a document already in front of the user is more checkable, although omissions still matter. An explanation of an unfamiliar scientific topic requires source inspection because the user has limited ability to detect a confident error. Interpreting a disputed finding requires comparison of definitions, methods and alternative readings. Advice about health, law, finance or public policy needs authoritative sources and qualified human judgment. A recommendation that affects another person adds an ethical and organizational duty that cannot be delegated to the model.

The generated tone may be almost identical in all six cases. The required level of verification is not. [AI literacy](/concepts/ai-literacy/) therefore includes more than knowing how to obtain a useful response. It includes recognizing the task, understanding the system's role, evaluating the output and preserving [human agency](/concepts/human-agency/) when the decision has consequences (Long & Magerko, 2020).

## Reconstruct the path

When an answer matters, the practical move is to rebuild the distinctions that synthesis compressed. The following six-part protocol is a reading aid, not a scientifically validated scale.

<section class="practice-block" data-qa="practice-block">
  <p class="practice-block__label">Path reconstruction protocol</p>
  <h2>Reconstruct the path from answer to evidence</h2>
  <ol>
    <li><strong>Claim:</strong> What exactly is being asserted? Separate factual statements, interpretations and recommendations.</li>
    <li><strong>Provenance:</strong> Where does each claim come from? Identify the author, institution, source type and date.</li>
    <li><strong>Evidence:</strong> What data, method or argument supports it? Check whether the source supports the precise wording.</li>
    <li><strong>Uncertainty:</strong> What is unknown, conditional, measured imprecisely or limited in scope?</li>
    <li><strong>Disagreement:</strong> What serious alternative interpretations exist, and why do informed people disagree?</li>
    <li><strong>Responsibility:</strong> Who checks, decides and answers for using the result in this situation?</li>
  </ol>
  <p>The model can help organize this work, but its own explanation is not independent verification. The final step must leave a named person or institution responsible for the decision.</p>

  <div class="prompt-example prompt-example--better" data-copyable-prompt>
    <div class="prompt-example__header">
      <p class="prompt-example__label">Example prompt</p>
      <button class="prompt-example__copy" type="button" aria-label="Copy example prompt" data-copy-label="Copy" data-copied-label="Copied">Copy</button>
    </div>
    <pre class="prompt-example__body"><code data-prompt-text>Separate this answer into claims, sources, evidence, assumptions, uncertainties and points of disagreement. For each factual claim, show what source would be needed to verify it. Do not treat the model's own explanation as verification.</code></pre>
  </div>
</section>

### Hypothetical worked example

Suppose an AI answer states: **"Research shows that AI increases employee productivity by 40%."** Before the number enters a proposal or policy, reconstruct its path:

- **Claim:** Does 40% mean faster task completion, more output, higher quality or a composite score?
- **Provenance:** Which study, authors, funder and publication date produced the figure?
- **Evidence:** Who was studied, what work was measured, what comparison group was used and how was productivity calculated?
- **Uncertainty:** Does the estimate include a range, and does it apply beyond the tested tasks, workers and tools?
- **Disagreement:** Could the gain reflect novelty, task selection or speed at the expense of quality?
- **Responsibility:** Who will verify the study and decide whether the number is suitable for this organization?

This example is hypothetical. The protocol does not validate the 40% claim; it turns an impressive number into questions that can be checked.

The protocol does not require reading every cited paper for every casual question. Its value is diagnostic. If a high-stakes claim has no recoverable provenance, if evidence and interpretation are mixed, or if no one accepts responsibility for checking the result, the answer is not ready for use.

## Implications for interface and organizational design

Individual vigilance cannot carry the whole burden. Systems that mediate knowledge should preserve claim-level citations, source type, publication date, uncertainty and version history. They should make it possible to contest an answer, inspect changes and route consequential outputs to qualified human review. Organizations need records of who reviewed what, under which policy and with what domain knowledge.

The NIST Generative AI Profile is voluntary risk-management guidance, not a legal requirement. Among its suggested actions, NIST recommends fact-checking generated information, reviewing and verifying sources and citations, tracing content provenance, documenting where human domain knowledge is used and evaluating whether operators and users understand content origin and lineage (National Institute of Standards and Technology, 2024). These measures shift part of the work from an isolated reader to the system and organization that make the answer actionable.

Good provenance does not guarantee truth. It makes error more inspectable and correction more possible. That is already a substantial improvement over an answer whose authority rests mainly on presentation.

## Limits of this argument

The evidence base on generative AI use is developing quickly. Retrieval mechanisms, citation interfaces and model behavior change over time. The cited studies use different methods and contexts, so their findings cannot be combined into a single estimate of how strongly AI changes judgment or performance.

Self-reported critical-thinking effort is not the same as directly measured reasoning performance. Classic studies of processing fluency and automation illuminate possible mechanisms without directly testing today's conversational systems. This essay does not measure user behavior, estimate the prevalence of overreliance or test whether the reconstruction protocol improves decisions.

The protocol may be unnecessary for low-stakes, reversible tasks and insufficient for professional decisions that require licensed expertise, formal review or institutional accountability.

Finally, compression can help. Generative AI can improve access to technical language, reveal useful questions and guide readers toward primary sources. The concern is not that every shorter route is false. It is that a route becomes hard to evaluate when the distinctions it removed cannot be recovered.

## Conclusion

Generative AI can shorten the path from a question to useful knowledge. A shorter path is not automatically a false path, and requiring every user to reproduce the full work of experts would defeat the purpose of communication and tools. The gain is real when an answer helps someone enter a field, understand a document or find the right evidence.

Convenience becomes risky when provenance, uncertainty, disagreement and responsibility disappear together. At that point, the user can possess a polished conclusion without knowing what kind of support stands behind it or who must answer for its use.

A model can give us the conclusion before we have seen the route. Mature AI literacy begins with knowing which conclusions are safe to use immediately and which require us to rebuild the path through sources, evidence, uncertainty and responsibility.

## Sources and further reading

- Buçinca, Z., Malaya, M. B., & Gajos, K. Z. (2021). To trust or to think: Cognitive forcing functions can reduce overreliance on AI in AI-assisted decision-making. *Proceedings of the ACM on Human-Computer Interaction, 5*(CSCW1), Article 188, 1-21. https://doi.org/10.1145/3449287
- Cologna, V., Mede, N. G., Berger, S., Besley, J., Brick, C., Joubert, M., Maibach, E. W., Mihelj, S., Oreskes, N., Schäfer, M. S., van der Linden, S., Abdul Aziz, N. I., Abdulsalam, S., Abu Shamsi, N., Aczel, B., Adinugroho, I., Alabrese, E., Aldoh, A., Alfano, M., ... Zwaan, R. A. (2025). Trust in scientists and their role in society across 68 countries. *Nature Human Behaviour, 9*(4), 713-730. https://doi.org/10.1038/s41562-024-02090-5
- Dechêne, A., Stahl, C., Hansen, J., & Wänke, M. (2010). The truth about the truth: A meta-analytic review of the truth effect. *Personality and Social Psychology Review, 14*(2), 238-257. https://doi.org/10.1177/1088868309352251
- Goldman, A. I. (2001). Experts: Which ones should you trust? *Philosophy and Phenomenological Research, 63*(1), 85-110. https://doi.org/10.1111/j.1933-1592.2001.tb00093.x
- Hardwig, J. (1985). Epistemic dependence. *The Journal of Philosophy, 82*(7), 335-349. https://doi.org/10.2307/2026523
- Ipsos. (2026). *Public Attitudes to Science 2025*. UK Research and Innovation. https://pas.ipsos.com/
- Ji, Z., Lee, N., Frieske, R., Yu, T., Su, D., Xu, Y., Ishii, E., Bang, Y., Chen, D., Dai, W., Chan, H. S., Madotto, A., & Fung, P. (2023). Survey of hallucination in natural language generation. *ACM Computing Surveys, 55*(12), Article 248, 1-38. https://doi.org/10.1145/3571730
- Lee, H.-P., Sarkar, A., Tankelevitch, L., Drosos, I., Rintel, S., Banks, R., & Wilson, N. (2025). The impact of generative AI on critical thinking: Self-reported reductions in cognitive effort and confidence effects from a survey of knowledge workers. In *Proceedings of the 2025 CHI Conference on Human Factors in Computing Systems* (Article 1121, pp. 1-22). Association for Computing Machinery. https://doi.org/10.1145/3706598.3713778
- Lee, J. D., & See, K. A. (2004). Trust in automation: Designing for appropriate reliance. *Human Factors, 46*(1), 50-80. https://doi.org/10.1518/hfes.46.1.50_30392
- Liu, N. F., Zhang, T., & Liang, P. (2023). Evaluating verifiability in generative search engines. In *Findings of the Association for Computational Linguistics: EMNLP 2023* (pp. 7001-7025). Association for Computational Linguistics. https://doi.org/10.18653/v1/2023.findings-emnlp.467
- Long, D., & Magerko, B. (2020). What is AI literacy? Competencies and design considerations. In *Proceedings of the 2020 CHI Conference on Human Factors in Computing Systems* (pp. 1-16). Association for Computing Machinery. https://doi.org/10.1145/3313831.3376727
- Maynez, J., Narayan, S., Bohnet, B., & McDonald, R. (2020). On faithfulness and factuality in abstractive summarization. In *Proceedings of the 58th Annual Meeting of the Association for Computational Linguistics* (pp. 1906-1919). Association for Computational Linguistics. https://doi.org/10.18653/v1/2020.acl-main.173
- National Institute of Standards and Technology. (2024). *Artificial intelligence risk management framework: Generative artificial intelligence profile* (NIST AI 600-1). https://doi.org/10.6028/NIST.AI.600-1
- Parasuraman, R., & Riley, V. (1997). Humans and automation: Use, misuse, disuse, abuse. *Human Factors, 39*(2), 230-253. https://doi.org/10.1518/001872097778543886
- Pearson, H. (2026, July 1). Have people stopped trusting science? The data tell a surprising story. *Nature, 655*, 22-25. https://doi.org/10.1038/d41586-026-01977-9
- Reber, R., & Schwarz, N. (1999). Effects of perceptual fluency on judgments of truth. *Consciousness and Cognition, 8*(3), 338-342. https://doi.org/10.1006/ccog.1999.0386
- Risko, E. F., & Gilbert, S. J. (2016). Cognitive offloading. *Trends in Cognitive Sciences, 20*(9), 676-688. https://doi.org/10.1016/j.tics.2016.07.002
- Sperber, D., Clément, F., Heintz, C., Mascaro, O., Mercier, H., Origgi, G., & Wilson, D. (2010). Epistemic vigilance. *Mind & Language, 25*(4), 359-393. https://doi.org/10.1111/j.1468-0017.2010.01394.x
