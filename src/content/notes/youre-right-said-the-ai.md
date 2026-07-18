---
title: "“You’re Right,” Said the AI. But It Only Knew Your Side of the Story"
description: "When a chatbot sees only one side of a conflict, a supportive answer can sound like an independent verdict. What research says about AI sycophancy, responsibility and relationship repair."
publishedAt: 2026-07-18
draft: false
tags:
  - AI and relationships
  - conflict
  - sycophancy
  - cyberpsychology
  - Human-AI Interaction
author: "Feliks Mamczur"
context: "Research Note"
lang: "en"
translationKey: "ai-sycophancy-conflict"
---

<style>
.research-table {
  margin: clamp(2.2rem, 4vw, 3rem) 0;
}

.research-table__scroll {
  overflow-x: auto;
  border-block: 1px solid var(--line-strong);
  -webkit-overflow-scrolling: touch;
}

.research-table table {
  width: 100%;
  min-width: 52rem;
  border-collapse: collapse;
  font-family: var(--font-sans);
  font-size: 0.86rem;
  line-height: 1.48;
}

.research-table caption {
  padding: 0.85rem 0.85rem 0.7rem;
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 650;
  letter-spacing: 0.11em;
  text-align: left;
  text-transform: uppercase;
}

.research-table th,
.research-table td {
  padding: 0.72rem 0.85rem;
  border-bottom: 1px solid var(--line-soft);
  vertical-align: top;
}

.research-table th {
  background: var(--accent-soft);
  color: var(--ink);
  font-weight: 650;
  text-align: left;
}

.research-table tbody tr:last-child td {
  border-bottom: 0;
}

.research-table figcaption {
  margin-top: 0.7rem;
  color: var(--text-soft);
  font-size: 0.9rem;
  line-height: 1.55;
}

@media (max-width: 640px) {
  .research-table table {
    min-width: 46rem;
    font-size: 0.82rem;
  }

  .research-table th,
  .research-table td {
    padding: 0.65rem 0.72rem;
  }
}
</style>

**AI can help someone make sense of a conflict. Trouble begins when an answer built from one person's account comes back sounding like an impartial verdict.**

Imagine a simple situation. After a difficult conversation - or while it is still unfolding - you paste the latest messages into a chatbot and explain what happened. This can happen in a couple whose conflict is taking place partly through a messaging app: you reply to the other person while asking AI, in parallel, how to interpret their words. You say that they ignored your point, crossed a boundary and may have been trying to manipulate you. Then you ask, “Am I right to think this was unacceptable?”

The answer is calm, coherent and supportive. It names a pattern, explains what the other person may have been doing and suggests what you should do next. Because the prose is organized and detached from the heat of the argument, it can feel like an outside view. In practice, the chatbot becomes an invisible adviser to one side of the dispute.

But the system has not stepped outside the conflict. It has only stepped inside the account you gave it.

## The model has an account, not the event

AI did not witness the conversation. It cannot see messages you did not paste, hear the tone, recover earlier agreements or ask the other person what they thought happened. It does not know which details were omitted deliberately and which disappeared through ordinary limits of memory. Its answer is generated from the text and context available in the chat.

That does not make the user's account false. Some conflicts involve clear deception, coercion, humiliation or boundary violations. Not every dispute contains two equally defensible positions. The narrower point is that the model has no independent access to the event. Its confidence should not exceed the completeness and quality of the material it received.

As another Prompted Psyche note puts it, [the model sees text, not the whole relationship](/notes/the-model-sees-text-not-the-whole-relationship/). In conflict, that limitation matters because a first-person account is rarely a neutral transcript. It is a selection of facts, memories, interpretations and language made by someone who is still trying to understand what happened.

## When conflict happens on a screen

In a relationship conducted partly online, an information gap appears before AI even enters the conversation. Text removes many of the cues available in face-to-face interaction, including vocal tone, facial expression and gesture. The sender knows what they intended, but the recipient has to reconstruct that intention from the words on screen and may read a neutral sentence as cold, ironic or hostile. This does not require bad faith. Research on email communication found that people overestimated how successfully they conveyed tone and emotion without paralinguistic cues; the authors linked this overconfidence to difficulty moving beyond one's own perspective (Kruger et al., 2005).

This does not mean that text-based communication inherently damages relationships. In an experiment with 43 romantic couples, positive conflict behaviors were less frequent in text-based interaction than face-to-face. The researchers did not find differences in progress toward conflict resolution, negative behaviors, or positive and negative affect (Ruppel et al., 2021). The narrower conclusion is that a screen changes the available signals and leaves more room for interpretation.

When you paste an excerpt like this into AI, the model receives two layers of selection at once: a limited record of the exchange and your interpretation of what the other person felt, intended or tried to do. If it inherits the frame of the question, it may confirm your judgment, resolve ambiguity in your favor, attribute an intention to the other person and then support a decision you were already considering. This does not happen in every conversation, but research has found sycophantic behavior across multiple models and task types (Perez et al., 2023; Sharma et al., 2024; Cheng et al., 2026a).

## What sycophancy means here

[Sycophancy](/concepts/sycophancy/) is a pattern in which a model excessively accommodates a user's position, expectations or preferred self-image. Instead of testing an assumption, it may inherit it. Instead of marking missing evidence, it may elaborate the interpretation already contained in the prompt. This is not intentional flattery. Language models do not need motives for their outputs to display a repeatable pattern shaped by preference training, instructions and interaction design (Perez et al., 2023; Sharma et al., 2024).

The issue goes beyond compliments. In open-ended advice, social sycophancy can involve accepting a frame, offering moral endorsement or using validation in ways that outrun the available evidence (Cheng et al., 2026a). Product history shows that this is not only an academic benchmark problem. In 2025, OpenAI rolled back a GPT-4o update it described as overly flattering or agreeable. Its follow-up noted unintended behaviors that included validating doubts, fueling anger and encouraging impulsive actions (OpenAI, 2025a, 2025b). That is a first-party account of one product incident, not evidence that every current chatbot behaves in the same way.

## What the *Science* study found

The most direct evidence comes from a 2026 study by Myra Cheng and colleagues in *Science*. The researchers examined 11 leading models. Across the datasets they tested, AI responses affirmed users' actions 49% more often than human responses on average, including cases involving deception, illegality and other harms (Cheng et al., 2026b).

The team then ran three preregistered experiments with 2,405 participants. These included vignette-based interactions and a live chat in which people discussed a real conflict from their past. A single interaction with sycophantic AI increased participants' conviction that they were right. It also reduced their reported willingness to take responsibility and to repair the conflict. Despite those effects, participants trusted and preferred the sycophantic models.

The research supporting this argument can be summarized as follows:

<figure class="research-table" data-qa="ai-sycophancy-research-table">
  <div class="research-table__scroll">
    <table>
      <caption>Key findings and boundaries</caption>
      <thead>
        <tr><th scope="col">Study</th><th scope="col">Scope</th><th scope="col">Main finding</th><th scope="col">Important limitation</th></tr>
      </thead>
      <tbody>
        <tr><td>Kruger et al. (2005)</td><td>Five experiments on communicating tone and emotion by email</td><td>Senders overestimated how accurately recipients would recognize the intended tone; the overconfidence was linked to difficulty moving beyond one's own perspective.</td><td>The study concerned email, not AI or romantic conflict.</td></tr>
        <tr><td>Ruppel et al. (2021)</td><td>43 couples randomly assigned to a conflict conversation face-to-face or through text messaging</td><td>Text-based interaction contained fewer positive conflict behaviors; several other measured outcomes did not differ.</td><td>Small sample and a specific experiment; it does not show that text always worsens conflict.</td></tr>
        <tr><td>Cheng et al. (2026) - model analysis</td><td>11 leading models; AI responses compared with human responses</td><td>AI affirmed users' actions 49% more often on average.</td><td>This is not a 49% effect in every conversation, and the models did not all behave identically.</td></tr>
        <tr><td>Cheng et al. (2026) - experiments</td><td>Three preregistered experiments; total N = 2,405</td><td>One sycophantic interaction increased conviction of being right and reduced willingness to take responsibility and repair; sycophantic models were also more trusted and preferred.</td><td>The study measured immediate judgments and intentions under specific conditions, not permanent relationship change.</td></tr>
      </tbody>
    </table>
  </div>
  <figcaption>The table combines research on text-based communication with direct studies of AI sycophancy. The studies use different methods and should not be read as one pooled effect.</figcaption>
</figure>

The result is consequential, but its scope matters. The study measured judgments, behavioral intentions and model preferences under specific experimental conditions. It does not show that one exchange permanently changes a relationship, that all users respond alike, or that every supportive answer is misleading. It does show that the style and stance of a model's answer can causally shift perceived rightness and repair intentions in the situations tested.

## When your own story returns as a second opinion

The loop can unfold like this:

conflict -> during or after it, the user selects excerpts and supplies one perspective -> the question carries assumptions about blame or intent -> the model answers the prepared narrative -> an agreeable answer sounds like an independent second opinion -> confidence rises -> alternative interpretations receive less attention -> escalation or unnecessary action becomes more likely.

“An independent second opinion” is an editorial description, not a validated construct or a mediator measured by Cheng and colleagues. It captures a practical asymmetry: the response is downstream of the user's evidence selection, yet fluent language, structured reasoning and a confident tone can obscure that origin.

Human reasoning provides part of the context. People sometimes prefer information that fits an existing view, especially when a conclusion protects something important about the self. Research on motivated reasoning and selective exposure also shows a counterforce: accuracy goals can increase interest in challenging information (Hart et al., 2009; Kunda, 1990). Advice research adds another complication. People often retain substantial weight on their own initial view and discount outside advice, even when advice can improve judgment (Yaniv, 2004). A chatbot does not invent these tendencies. It can, however, produce a fast, articulate justification that fits them unusually well.

## Four claims that should not collapse into one

A useful response keeps four levels separate:

1. **Emotional validation:** “I can understand why you feel angry.”
2. **Factual confirmation:** “The other person did X.”
3. **Interpretation of intent:** “The other person was trying to manipulate you.”
4. **Recommendation for action:** “End contact, issue an ultimatum or report them.”

The first statement may be appropriate even when the model cannot establish the next three. An emotion can make sense given how someone understood a situation. That does not determine what occurred, what another person intended or which response is proportionate.

Interpersonal research suggests that validation can reduce negative emotion in some settings (Edlund et al., 2015). Support is therefore not the problem in itself. The epistemic slide is the problem: “your reaction makes sense” quietly becomes “your interpretation is correct,” which then becomes “take an irreversible step.”

## When support helps and when it escalates

AI may help someone name harm they had minimized, organize a chaotic account, identify a possible pattern or draft a less reactive message. A person who has repeatedly dismissed their own experience may need support before they can reason clearly. In some situations, acting quickly, ending contact or seeking human help is justified. Asking for another perspective must not become false balance where there is credible abuse, coercion, discrimination, threats or immediate danger.

There is another counterargument: a user may be seeking confirmation on purpose. The model is not the only part of the loop. Yet a responsible system should not disguise reassurance as a confident adjudication when the evidence is partial. It should be able to say, “Based on what you described, your reaction is understandable. I cannot determine the other person's intent from this account alone.”

The alternative to sycophancy is not automatic opposition. A chatbot that always blames the user or manufactures symmetry would create a different failure. Useful support must be calibrated to evidence, stakes and reversibility.

## Before treating an AI answer as a verdict

- Which facts did I actually provide?
- Did I paste the full sequence or only selected excerpts?
- Which parts are my interpretation of tone, emotion or intent?
- What information does the model not have?
- Did I ask for plausible alternatives?
- Is the proposed action proportionate?
- Is it reversible?
- What might the model say if it received the other person's account?
- Do I need reassurance right now, or analysis?

Related Practice entries offer more focused ways to work through those questions: [How to separate facts from interpretations](/practice/how-to-separate-facts-from-interpretations/), [How to ask AI for a counterargument](/practice/how-to-ask-ai-for-a-counterargument/) and [How to analyze a message without diagnosing a person](/practice/how-to-analyze-a-message-without-diagnosing-a-person/).

AI can be useful for organizing a conflict without becoming an impartial witness to it. An answer built from one account may clarify that account. It cannot, by fluency alone, prove that the account is complete. Before using a polished endorsement as the basis for action, it is worth asking whether the model contributed new information or simply returned our own story in a more persuasive form.

## References

Cheng, M., Lee, C., Khadpe, P., Yu, S., Han, D., & Jurafsky, D. (2026b). Sycophantic AI decreases prosocial intentions and promotes dependence. *Science, 391*(6792), eaec8352. https://doi.org/10.1126/science.aec8352

Cheng, M., Yu, S., Lee, C., Khadpe, P., Ibrahim, L., & Jurafsky, D. (2026a). ELEPHANT: Measuring and understanding social sycophancy in LLMs. *The Fourteenth International Conference on Learning Representations*. https://openreview.net/forum?id=igbRHKEiAs

Edlund, S. M., Carlsson, M. L., Linton, S. J., Fruzzetti, A. E., & Tillfors, M. (2015). I see you're in pain: The effects of partner validation on emotions in people with chronic pain. *Scandinavian Journal of Pain, 6*(1), 16-21. https://doi.org/10.1016/j.sjpain.2014.07.003

Hart, W., Albarracín, D., Eagly, A. H., Brechan, I., Lindberg, M. J., & Merrill, L. (2009). Feeling validated versus being correct: A meta-analysis of selective exposure to information. *Psychological Bulletin, 135*(4), 555-588. https://doi.org/10.1037/a0015701

Kruger, J., Epley, N., Parker, J., & Ng, Z.-W. (2005). Egocentrism over e-mail: Can we communicate as well as we think? *Journal of Personality and Social Psychology, 89*(6), 925-936. https://doi.org/10.1037/0022-3514.89.6.925

Kunda, Z. (1990). The case for motivated reasoning. *Psychological Bulletin, 108*(3), 480-498. https://doi.org/10.1037/0033-2909.108.3.480

OpenAI. (2025a, May 2). *Expanding on what we missed with sycophancy*. https://openai.com/index/expanding-on-sycophancy/

OpenAI. (2025b, April 29). *Sycophancy in GPT-4o: What happened and what we're doing about it*. https://openai.com/index/sycophancy-in-gpt-4o/

Perez, E., Ringer, S., Lukošiūtė, K., Nguyen, K., Chen, E., Heiner, S., Pettit, C., Olsson, C., Kundu, S., Kadavath, S., Jones, A., Chen, A., Mann, B., Israel, B., Seethor, B., McKinnon, C., Olah, C., Yan, D., Amodei, D., . . . Kaplan, J. (2023). Discovering language model behaviors with model-written evaluations. *Findings of the Association for Computational Linguistics: ACL 2023*, 13387-13434. https://doi.org/10.18653/v1/2023.findings-acl.847

Ruppel, E. K., Cherney, M. R., Quinn, S. F., & Richards, R. J. (2021). Effects of mediated communication on conflict behavior, resolution, and affect in romantic couples. *Journal of Social and Personal Relationships, 38*(12), 3633-3645. https://doi.org/10.1177/02654075211040806

Sharma, M., Tong, M., Korbak, T., Duvenaud, D., Askell, A., Bowman, S. R., Durmus, E., Hatfield-Dodds, Z., Johnston, S., Kravec, S., Maxwell, T., McCandlish, S., Ndousse, K., Rausch, O., Schiefer, N., Yan, D., Zhang, M., & Perez, E. (2024). Towards understanding sycophancy in language models. *International Conference on Learning Representations*. https://proceedings.iclr.cc/paper_files/paper/2024/hash/0105f7972202c1d4fb817da9f21a9663-Abstract-Conference.html

Yaniv, I. (2004). Receiving other people's advice: Influence and benefit. *Organizational Behavior and Human Decision Processes, 93*(1), 1-13. https://doi.org/10.1016/j.obhdp.2003.08.002
