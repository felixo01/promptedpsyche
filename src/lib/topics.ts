import type { Locale } from './i18n';

export type TopicId = 'trust' | 'cognition' | 'agency';
export type TopicResourceKind = 'article' | 'concept' | 'practice' | 'note' | 'topic';

export type TopicResource = {
  title: string;
  description: string;
  href: string;
  kind: TopicResourceKind;
};

export type TopicReadingStep = {
  resource: TopicResource;
  reason: string;
};

export type TopicHub = {
  id: TopicId;
  lang: Locale;
  path: string;
  alternatePath: string;
  title: string;
  description: string;
  eyebrow: string;
  summary: string;
  introduction: string[];
  definitionTitle: string;
  definition: string[];
  distinctionsTitle: string;
  distinctions: Array<{ term: string; explanation: string }>;
  questionsTitle: string;
  questions: string[];
  orientationTitle: string;
  orientation: string[];
  startTitle: string;
  startIntro: string;
  start: TopicResource;
  articlesTitle: string;
  articlesIntro: string;
  articles: TopicResource[];
  conceptsTitle: string;
  conceptsIntro: string;
  concepts: TopicResource[];
  practiceTitle: string;
  practiceIntro: string;
  practice: TopicResource[];
  notesTitle: string;
  notesIntro: string;
  notes: TopicResource[];
  readingPathTitle: string;
  readingPath: TopicReadingStep[];
  connectionTitle: string;
  connection: string[];
  authorLabel: string;
  authorText: string;
};

const resource = (
  kind: TopicResourceKind,
  title: string,
  description: string,
  href: string
): TopicResource => ({ kind, title, description, href });

const en = {
  articles: {
    trust: resource(
      'article',
      'Trust in the age of ready-made answers',
      'A research-informed essay on what disappears when a fluent answer compresses sources, uncertainty, disagreement and responsibility.',
      '/articles/trust-in-the-age-of-ready-made-answers/'
    ),
    cognition: resource(
      'article',
      "Don't Ask Whether AI Makes Us Dumber. Ask What Kind of Thinking We Stop Practicing",
      'A careful distinction between task performance, learning, retention and transfer when AI becomes part of the process.',
      '/articles/dont-ask-whether-ai-makes-us-dumber/'
    ),
    agency: resource(
      'article',
      'Are we afraid of AI, or of ourselves?',
      'An essay on causal contribution, moral agency, distributed responsibility and the institutional uses of AI as an alibi.',
      '/articles/are-we-afraid-of-ai-or-of-ourselves/'
    ),
    literacy: resource(
      'article',
      'It is not just about the prompt',
      'Why useful AI literacy begins after the first answer, with context, verification, judgment and responsibility.',
      '/articles/it-is-not-just-about-the-prompt/'
    ),
    context: resource(
      'article',
      'The model does not remember. It works with context',
      'A practical account of context windows, apparent memory and the limits of continuity in model interaction.',
      '/articles/the-model-does-not-remember-it-works-with-context/'
    ),
    terminology: resource(
      'article',
      'OpenAI, ChatGPT, GPT and LLM: What Is the Difference?',
      'A practical map of the organisation, product, model family and broader technology category.',
      '/articles/openai-chatgpt-gpt-llm-difference/'
    ),
    interpretation: resource(
      'article',
      'AI does not read people. It helps make sense of the situation',
      'How models can support interpretation without seeing a whole person, relationship or organizational context.',
      '/articles/ai-does-not-read-people-it-helps-make-sense-of-the-situation/'
    )
  },
  concepts: {
    calibratedTrust: resource('concept', 'Calibrated trust', 'Reliance adjusted to the task, evidence, limits and consequences.', '/concepts/calibrated-trust/'),
    vigilance: resource('concept', 'Epistemic vigilance', 'How people assess communicated information and the sources behind it.', '/concepts/epistemic-vigilance/'),
    grounding: resource('concept', 'Grounding', 'Connecting an answer to material that can be inspected and evaluated.', '/concepts/grounding/'),
    hallucination: resource('concept', 'Hallucination', 'Plausible model output that is unsupported, inaccurate or fabricated.', '/concepts/hallucination/'),
    overreliance: resource('concept', 'Overreliance', 'Relying on a system beyond what its performance or the situation warrants.', '/concepts/overreliance/'),
    automationBias: resource('concept', 'Automation bias', 'A tendency to favor automated suggestions and miss contradictory evidence.', '/concepts/automation-bias/'),
    aiLiteracy: resource('concept', 'AI literacy', 'Competence in understanding, evaluating and using AI with appropriate judgment.', '/concepts/ai-literacy/'),
    llm: resource('concept', 'Large Language Model (LLM)', 'A model that learns language patterns and generates from training and current context.', '/concepts/llm/'),
    modelOutput: resource('concept', 'Model output', 'A generated response that must be interpreted as an output, not as direct access to truth.', '/concepts/model-output/'),
    offloading: resource('concept', 'Cognitive offloading', 'Moving part of a cognitive task into an external tool or action.', '/concepts/cognitive-offloading/'),
    cognitiveLoad: resource('concept', 'Cognitive load', 'The demands a task places on limited working-memory resources.', '/concepts/cognitive-load/'),
    metacognition: resource('concept', 'Metacognition', 'Monitoring what we know, understand and can reproduce without assistance.', '/concepts/metacognition/'),
    deskilling: resource('concept', 'Deskilling', 'The weakening of practiced capabilities when work and learning conditions change.', '/concepts/deskilling/'),
    mentalModel: resource('concept', 'Mental model', 'A working representation of how a system behaves and where its limits are.', '/concepts/mental-model/'),
    humanAgency: resource('concept', 'Human agency', 'The capacity to choose, act and remain answerable for consequential decisions.', '/concepts/human-agency/'),
    humanOversight: resource('concept', 'Human oversight', 'Human review with the information, competence, time and authority to intervene.', '/concepts/human-oversight/'),
    decisionSupport: resource('concept', 'Decision support', 'Using a system to inform judgment without silently turning advice into a decision.', '/concepts/decision-support/'),
    algorithmicAuthority: resource('concept', 'Algorithmic authority', 'The credibility granted to computational outputs because they appear systematic or objective.', '/concepts/algorithmic-authority/')
  },
  practice: {
    sources: resource('practice', 'How to check whether an AI answer has sources', 'A repeatable source check for claims that arrive without a visible evidence trail.', '/practice/how-to-check-whether-an-ai-answer-has-sources/'),
    uncertainty: resource('practice', 'How to ask a model about uncertainty', 'A prompt and verification routine for surfacing assumptions, limits and unresolved questions.', '/practice/how-to-ask-a-model-about-uncertainty/'),
    fluency: resource('practice', 'How not to confuse fluency with truth', 'A short exercise for separating polished language from evidential strength.', '/practice/how-not-to-confuse-fluency-with-truth/'),
    assumptions: resource('practice', 'How to check your assumptions with AI', 'Use a model to expose interpretations that have been smuggled into a problem statement.', '/practice/how-to-check-your-assumptions-with-ai/'),
    counterargument: resource('practice', 'How to ask AI for a counterargument', 'Turn the system into structured resistance instead of a machine for agreement.', '/practice/how-to-ask-ai-for-a-counterargument/'),
    secondReader: resource('practice', 'How to use AI as a second reader', 'Keep authorship while using AI to test clarity, omissions and alternative readings.', '/practice/how-to-use-ai-as-a-second-reader/'),
    decisionOwnership: resource('practice', 'How to use AI without handing over the decision', 'Separate analysis from judgment and make the final responsibility visible.', '/practice/how-to-use-ai-without-handing-over-the-decision/'),
    factsInterpretations: resource('practice', 'How to separate facts from interpretations', 'A practical distinction for decisions built from incomplete or ambiguous material.', '/practice/how-to-separate-facts-from-interpretations/'),
    messageAnalysis: resource('practice', 'How to analyze a message without diagnosing a person', 'Use AI to organize textual evidence without turning an interpretation into a diagnosis.', '/practice/how-to-analyze-a-message-without-diagnosing-a-person/')
  },
  notes: {
    fluent: resource('note', 'Fluent does not mean true', 'A short note on why coherence and confidence are weak substitutes for verification.', '/notes/fluent-does-not-mean-true/'),
    summary: resource('note', 'A good summary is not the same as a good decision', 'Compression can support judgment, but it cannot carry the responsibility for a choice.', '/notes/a-good-summary-is-not-the-same-as-a-good-decision/'),
    text: resource('note', 'The model sees text, not the whole relationship', 'A reminder that language models work with the material provided, not with complete social reality.', '/notes/the-model-sees-text-not-the-whole-relationship/'),
    diagnosis: resource('note', 'Do not diagnose people from emails', 'A boundary for AI-assisted interpretation when evidence is partial and consequences are human.', '/notes/do-not-diagnose-people-from-emails/')
  }
};

const pl = {
  articles: {
    trust: resource(
      'article',
      'Zaufanie w epoce gotowych odpowiedzi',
      'Esej oparty na źródłach o tym, co znika, gdy płynna odpowiedź kompresuje źródła, niepewność, spór i odpowiedzialność.',
      '/pl/articles/zaufanie-w-epoce-gotowych-odpowiedzi/'
    ),
    cognition: resource(
      'article',
      'Nie pytaj, czy AI nas ogłupia. Zapytaj, jakiego myślenia przestajemy używać',
      'Ostrożne rozróżnienie między wynikiem zadania, uczeniem się, utrwaleniem wiedzy i transferem, gdy AI staje się częścią procesu.',
      '/pl/articles/nie-pytaj-czy-ai-nas-oglupia/'
    ),
    agency: resource(
      'article',
      'Czy boimy się AI, czy boimy się samych siebie?',
      'Esej o udziale przyczynowym, podmiotowości moralnej, rozproszonej odpowiedzialności i instytucjonalnym użyciu AI jako alibi.',
      '/pl/articles/czy-boimy-sie-ai-czy-boimy-sie-samych-siebie/'
    ),
    literacy: resource(
      'article',
      'Nie chodzi tylko o prompt',
      'Dlaczego kompetentna praca z AI zaczyna się po pierwszej odpowiedzi: od kontekstu, weryfikacji, osądu i odpowiedzialności.',
      '/pl/articles/nie-chodzi-tylko-o-prompt/'
    ),
    context: resource(
      'article',
      'Model nie pamięta. Model ma kontekst',
      'Praktyczne wyjaśnienie okna kontekstu, pozornej pamięci i granic ciągłości w rozmowie z modelem.',
      '/pl/articles/model-nie-pamieta-model-ma-kontekst/'
    ),
    terminology: resource(
      'article',
      'OpenAI, ChatGPT, GPT i LLM - czym się różnią?',
      'Praktyczna mapa organizacji, produktu, rodziny modeli i szerszej kategorii technologii.',
      '/pl/articles/openai-chatgpt-gpt-llm-czym-sie-roznia/'
    ),
    interpretation: resource(
      'article',
      'AI nie czyta ludzi. Pomaga uporządkować sytuację',
      'Jak model może wspierać interpretację, choć nie widzi całego człowieka, relacji ani kontekstu organizacyjnego.',
      '/pl/articles/ai-nie-czyta-ludzi-pomaga-uporzadkowac-sytuacje/'
    )
  },
  concepts: {
    calibratedTrust: resource('concept', 'Skalibrowane zaufanie', 'Poleganie dostosowane do zadania, dowodów, ograniczeń i konsekwencji.', '/pl/concepts/calibrated-trust/'),
    vigilance: resource('concept', 'Epistemic vigilance (czujność epistemiczna)', 'Sposoby oceny przekazywanej informacji i źródeł, które za nią stoją.', '/pl/concepts/epistemic-vigilance/'),
    grounding: resource('concept', 'Grounding: oparcie odpowiedzi na źródłach', 'Łączenie odpowiedzi z materiałem, który można sprawdzić i ocenić.', '/pl/concepts/oparcie-odpowiedzi-na-zrodlach/'),
    hallucination: resource('concept', 'Halucynacja modelu', 'Wiarygodnie brzmiąca odpowiedź, która jest niepoparta, błędna albo zmyślona.', '/pl/concepts/halucynacja-modelu/'),
    overreliance: resource('concept', 'Nadmierne poleganie na AI', 'Poleganie na systemie bardziej, niż uzasadniają jego możliwości lub sytuacja.', '/pl/concepts/nadmierne-poleganie-na-ai/'),
    automationBias: resource('concept', 'Błąd automatyzacji', 'Skłonność do faworyzowania sugestii systemu i pomijania sprzecznych informacji.', '/pl/concepts/blad-automatyzacji/'),
    aiLiteracy: resource('concept', 'AI literacy', 'Kompetencje rozumienia, oceny i używania AI z odpowiednim osądem.', '/pl/concepts/ai-literacy/'),
    llm: resource('concept', 'LLM (duży model językowy)', 'Model uczący się prawidłowości języka i generujący wynik z treningu oraz bieżącego kontekstu.', '/pl/concepts/llm/'),
    modelOutput: resource('concept', 'Odpowiedź modelu', 'Wygenerowany wynik, który trzeba interpretować jako efekt działania systemu, a nie bezpośredni dostęp do prawdy.', '/pl/concepts/model-output/'),
    offloading: resource('concept', 'Cognitive offloading', 'Przenoszenie części pracy poznawczej na zewnętrzne działanie albo narzędzie.', '/pl/concepts/cognitive-offloading/'),
    cognitiveLoad: resource('concept', 'Cognitive load (obciążenie poznawcze)', 'Wymagania, jakie zadanie stawia ograniczonym zasobom pamięci roboczej.', '/pl/concepts/cognitive-load/'),
    metacognition: resource('concept', 'Metacognition (metapoznanie)', 'Monitorowanie tego, co wiemy, rozumiemy i potrafimy odtworzyć bez pomocy.', '/pl/concepts/metacognition/'),
    deskilling: resource('concept', 'Deskilling: erozja kompetencji', 'Osłabienie ćwiczonych zdolności, gdy zmieniają się warunki pracy i uczenia się.', '/pl/concepts/erozja-kompetencji/'),
    mentalModel: resource('concept', 'Mental model (model mentalny)', 'Robocze wyobrażenie o działaniu systemu i granicach jego możliwości.', '/pl/concepts/mental-model/'),
    humanAgency: resource('concept', 'Sprawczość człowieka', 'Zdolność do wyboru, działania i ponoszenia odpowiedzialności za decyzje mające konsekwencje.', '/pl/concepts/sprawczosc-czlowieka/'),
    humanOversight: resource('concept', 'Nadzór ze strony człowieka', 'Kontrola wykonywana przez osobę, która ma informacje, kompetencje, czas i możliwość interwencji.', '/pl/concepts/nadzor-ze-strony-czlowieka/'),
    decisionSupport: resource('concept', 'Wspomaganie decyzji', 'Użycie systemu do wsparcia osądu bez cichego zamieniania rady w decyzję.', '/pl/concepts/wspomaganie-decyzji/'),
    algorithmicAuthority: resource('concept', 'Autorytet algorytmiczny', 'Wiarygodność przypisywana wynikom obliczeniowym dlatego, że wydają się systematyczne lub obiektywne.', '/pl/concepts/autorytet-algorytmiczny/')
  },
  practice: {
    sources: resource('practice', 'Jak sprawdzić, czy odpowiedź AI ma źródła', 'Powtarzalny sposób sprawdzania twierdzeń, które przychodzą bez widocznej drogi do dowodów.', '/pl/practice/jak-sprawdzic-czy-odpowiedz-ai-ma-zrodla/'),
    uncertainty: resource('practice', 'Jak poprosić model o niepewność', 'Prompt i procedura sprawdzania założeń, ograniczeń oraz nierozstrzygniętych pytań.', '/pl/practice/jak-poprosic-model-o-niepewnosc/'),
    fluency: resource('practice', 'Jak nie pomylić płynności z prawdą', 'Krótkie ćwiczenie oddzielające dopracowany język od siły dowodów.', '/pl/practice/jak-nie-pomylic-plynnosci-z-prawda/'),
    assumptions: resource('practice', 'Jak sprawdzić własne założenia z pomocą AI', 'Użyj modelu, aby ujawnić interpretacje ukryte w opisie problemu.', '/pl/practice/jak-sprawdzic-wlasne-zalozenia-z-pomoca-ai/'),
    counterargument: resource('practice', 'Jak poprosić AI o kontrargument', 'Zamień model w źródło uporządkowanego oporu zamiast w maszynę do przytakiwania.', '/pl/practice/jak-poprosic-ai-o-kontrargument/'),
    secondReader: resource('practice', 'Jak użyć AI jako drugiego czytelnika', 'Zachowaj autorstwo, używając AI do sprawdzania jasności, braków i alternatywnych odczytań.', '/pl/practice/jak-uzyc-ai-jako-drugiego-czytelnika/'),
    decisionOwnership: resource('practice', 'Jak użyć AI bez oddawania mu decyzji', 'Oddziel analizę od osądu i pozostaw widoczną odpowiedzialność za wybór.', '/pl/practice/jak-uzyc-ai-bez-oddawania-mu-decyzji/'),
    factsInterpretations: resource('practice', 'Jak oddzielić fakty od interpretacji', 'Praktyczne rozróżnienie dla decyzji opartych na niepełnym lub niejednoznacznym materiale.', '/pl/practice/jak-oddzielic-fakty-od-interpretacji/'),
    messageAnalysis: resource('practice', 'Jak analizować wiadomość bez diagnozowania człowieka', 'Użyj AI do uporządkowania tekstu bez zamieniania interpretacji w diagnozę.', '/pl/practice/jak-analizowac-wiadomosc-bez-diagnozowania-czlowieka/')
  },
  notes: {
    fluent: resource('note', 'Brzmi dobrze, ale to nie znaczy, że jest prawdziwe', 'Krótka notatka o tym, dlaczego spójność i pewny ton nie zastępują weryfikacji.', '/pl/notes/brzmi-dobrze-nie-znaczy-ze-jest-prawdziwe/'),
    summary: resource('note', 'Dobre streszczenie to jeszcze nie dobra decyzja', 'Kompresja może wspierać osąd, ale nie przejmuje odpowiedzialności za wybór.', '/pl/notes/dobre-streszczenie-to-jeszcze-nie-dobra-decyzja/'),
    text: resource('note', 'Model widzi tekst, a nie całą relację', 'Przypomnienie, że model pracuje na dostarczonym materiale, a nie na pełnej rzeczywistości społecznej.', '/pl/notes/model-widzi-tekst-nie-cala-relacje/'),
    diagnosis: resource('note', 'Nie diagnozuj ludzi z maili', 'Granica dla interpretacji wspieranej przez AI, gdy materiał jest niepełny, a konsekwencje dotyczą ludzi.', '/pl/notes/nie-diagnozuj-ludzi-z-maili/')
  }
};

const topicHubs: Record<Locale, TopicHub[]> = {
  en: [
    {
      id: 'trust',
      lang: 'en',
      path: '/topics/trust-in-ai/',
      alternatePath: '/pl/topics/zaufanie-do-ai/',
      title: 'Trust in AI',
      description: 'A guide to calibrated trust in AI: sources, uncertainty, hallucinations, verification and the difference between fluent output and reliable knowledge.',
      eyebrow: 'Topic guide',
      summary: 'How to distinguish fluent output from reliable knowledge, inspect sources and uncertainty, and decide when an AI answer is safe to use.',
      introduction: [
        'Trust in AI is not a choice between believing every answer and rejecting the technology. It is the practical problem of deciding what kind of reliance a task can support. A fluent response may be useful, inaccurate, incomplete or impossible to verify. Those possibilities can look almost identical on screen.',
        'This guide connects the Prompted Psyche materials that examine that gap. The central question is not whether a model sounds confident. It is whether a reader can recover enough of the route through sources, evidence, uncertainty and responsibility to use the answer well.'
      ],
      definitionTitle: 'What trust in AI means here',
      definition: [
        'Trust is a willingness to rely on a system under conditions of uncertainty. Correctness is a property of a particular claim or result. Confidence is often only a feature of the generated language. Verifiability concerns whether the claim can be checked, while provenance concerns where the supporting information came from. Correctability asks whether a person can challenge the output and change what happens next.',
        'These properties should not be collapsed. A correct answer can be poorly sourced. A cited answer can still rest on weak or mismatched evidence. A system can be useful in one task and unsafe to rely on in another. Calibrated trust means adjusting reliance to the quality of the evidence, the visibility of limits and the consequences of error.'
      ],
      distinctionsTitle: 'Distinctions that matter',
      distinctions: [
        { term: 'Fluency is not evidence', explanation: 'Clear language can reduce friction without increasing factual support.' },
        { term: 'A source is not a guarantee', explanation: 'A real reference can still be outdated, weak or unrelated to the exact claim.' },
        { term: 'Uncertainty is task-specific', explanation: 'The same level of uncertainty matters differently in brainstorming and in a consequential decision.' },
        { term: 'Verification needs an owner', explanation: 'A check only protects a decision when someone has time, competence and authority to act on it.' }
      ],
      questionsTitle: 'Key questions',
      questions: [
        'What exactly is the model claiming, and what would count as evidence for it?',
        'Can the answer be traced to identifiable, relevant and sufficiently current sources?',
        'What uncertainty, disagreement or missing context has been compressed into a smooth response?',
        'How serious and reversible would an error be in this situation?',
        'Who remains responsible for checking and using the result?'
      ],
      orientationTitle: 'A useful way to orient yourself',
      orientation: [
        'Begin with the stakes. Low-consequence exploration can tolerate more uncertainty than health, employment, legal or financial decisions. Then inspect the route. Ask what came from the model, what came from an external source and what was inferred by the user. Finally, preserve a correction path: a way to compare evidence, seek disagreement and revise the decision.',
        'AI literacy appears throughout this cluster because good prompting is only the opening move. The harder competence is knowing when the output is enough, when it needs verification and when the task should leave the model entirely.'
      ],
      startTitle: 'Where to start',
      startIntro: 'Start with the main essay, which introduces the idea that generative AI can compress the visible path between sources and a conclusion.',
      start: en.articles.trust,
      articlesTitle: 'Articles',
      articlesIntro: 'The main essay provides the framework. The related articles extend it toward AI literacy and the cognitive effects of ready-made answers.',
      articles: [en.articles.trust, en.articles.literacy, en.articles.cognition],
      conceptsTitle: 'Concepts',
      conceptsIntro: 'Use these entries to separate mechanisms that are often bundled together under the word trust.',
      concepts: [en.concepts.calibratedTrust, en.concepts.vigilance, en.concepts.grounding, en.concepts.hallucination, en.concepts.overreliance, en.concepts.aiLiteracy],
      practiceTitle: 'Practice',
      practiceIntro: 'These short scenarios turn the distinctions into repeatable checks.',
      practice: [en.practice.sources, en.practice.uncertainty, en.practice.fluency],
      notesTitle: 'Notes',
      notesIntro: 'The notes isolate two common mistakes in a compact form.',
      notes: [en.notes.fluent, en.notes.summary],
      readingPathTitle: 'Suggested reading path',
      readingPath: [
        { resource: en.articles.trust, reason: 'Build the overall model of provenance, uncertainty, disagreement and responsibility.' },
        { resource: en.concepts.calibratedTrust, reason: 'Clarify why reliance should change with the task and its consequences.' },
        { resource: en.notes.fluent, reason: 'Recognize the moment when polished language starts to stand in for evidence.' },
        { resource: en.practice.sources, reason: 'Apply a concrete source check to an answer you might otherwise accept.' },
        { resource: en.articles.cognition, reason: 'See how ready-made answers can also change the thinking a user continues to practise.' }
      ],
      connectionTitle: 'How the pieces connect',
      connection: [
        'The article explains the structural problem. Concepts give names to the mechanisms. Practice entries provide actions a reader can repeat, and notes keep the central warnings available in a shorter form. Together they move from understanding trust to calibrating it in use.',
        'This is not a promise that every answer can be made safe through checking. Some tasks require a qualified professional, primary evidence or a decision process outside the model. The purpose of the cluster is to make that boundary easier to see.'
      ],
      authorLabel: 'About the author',
      authorText: 'Feliks Mamczur writes about cognition, trust, communication and responsibility in Human-AI Interaction.'
    },
    {
      id: 'cognition',
      lang: 'en',
      path: '/topics/ai-and-cognition/',
      alternatePath: '/pl/topics/ai-i-myslenie/',
      title: 'AI and cognition',
      description: 'A guide to AI, thinking and learning: task performance, memory, transfer, cognitive offloading, metacognition, scaffolding and deskilling.',
      eyebrow: 'Topic guide',
      summary: 'What changes when AI supplies an answer, supports a process or removes the practice through which independent skill develops.',
      introduction: [
        'Public debate often asks whether AI makes people smarter or dumber. That question is memorable and usually too broad. A person can complete a task more quickly with AI while learning less from it. Another person can use the same class of system as feedback, a source of graduated hints or a second reader and preserve more of the work that builds independent skill.',
        'This guide organizes Prompted Psyche materials around a narrower question: what kind of thinking remains in the human part of the interaction? It separates immediate performance from learning, retention and transfer, then connects those distinctions to cognitive offloading, metacognition and the design of assistance.'
      ],
      definitionTitle: 'What AI and cognition means here',
      definition: [
        'Cognition includes processes such as attention, memory, comprehension, problem solving, monitoring and decision-making. AI can redistribute those processes between a person, an interface and a model. That redistribution is not automatically improvement or decline. Its effect depends on the goal, task, prior knowledge, timing of help and what is measured after the help disappears.',
        'A central distinction is between producing an acceptable result and developing a capability. The first can be measured while the tool is present. The second requires retention or transfer: whether the person can use what was learned later, in a changed problem or without the same support.'
      ],
      distinctionsTitle: 'Distinctions that matter',
      distinctions: [
        { term: 'Performance is not learning', explanation: 'A better result with assistance does not show what remains when assistance is removed.' },
        { term: 'Offloading is not decline', explanation: 'External tools can extend cognition; risk grows when essential practice disappears unnoticed.' },
        { term: 'Answering is not scaffolding', explanation: 'Support can preserve effort by asking, hinting, giving feedback and then withdrawing.' },
        { term: 'Recognition is not understanding', explanation: 'A fluent explanation can feel familiar before a learner can reproduce the reasoning.' }
      ],
      questionsTitle: 'Key questions',
      questions: [
        'Is the goal to finish the task, learn the skill or do both?',
        'Which cognitive steps does the person still perform before seeing the model output?',
        'Does the interaction require an attempt, retrieval, explanation or transfer?',
        'What happens when the support is reduced or removed?',
        'Which capabilities still need practice because responsibility remains with the user?'
      ],
      orientationTitle: 'A useful way to orient yourself',
      orientation: [
        'First identify the purpose. Direct generation may be appropriate when the aim is routine completion and the result can be checked. Learning requires a different interaction: an initial attempt, feedback calibrated to the error, opportunities for retrieval and a later test without the same support.',
        'The relevant unit is rarely the model alone. It is the whole arrangement of prompts, interface, task, incentives, prior knowledge and review. This is why the same model can function as a substitute in one workflow and as scaffolding in another.'
      ],
      startTitle: 'Where to start',
      startIntro: 'The main essay reviews what current evidence can and cannot support, without treating short-term studies as proof of a durable change in intelligence.',
      start: en.articles.cognition,
      articlesTitle: 'Articles',
      articlesIntro: 'Read the main synthesis first, then use the related essays to connect cognitive practice with context and trust.',
      articles: [en.articles.cognition, en.articles.terminology, en.articles.trust, en.articles.context],
      conceptsTitle: 'Concepts',
      conceptsIntro: 'These entries distinguish cognitive demand, external support, self-monitoring and the loss of practiced capability.',
      concepts: [en.concepts.offloading, en.concepts.cognitiveLoad, en.concepts.metacognition, en.concepts.deskilling, en.concepts.aiLiteracy, en.concepts.llm, en.concepts.mentalModel],
      practiceTitle: 'Practice',
      practiceIntro: 'Use these scenarios to keep interpretation, resistance and authorship in the human part of the process.',
      practice: [en.practice.assumptions, en.practice.counterargument, en.practice.secondReader],
      notesTitle: 'Notes',
      notesIntro: 'Two short reminders about compression and the limits of model context.',
      notes: [en.notes.summary, en.notes.text],
      readingPathTitle: 'Suggested reading path',
      readingPath: [
        { resource: en.articles.cognition, reason: 'Start with the evidence and the distinction between performance and learning.' },
        { resource: en.concepts.offloading, reason: 'Understand why moving work to a tool is not automatically cognitive decline.' },
        { resource: en.concepts.metacognition, reason: 'Focus on the ability to monitor understanding and independent capability.' },
        { resource: en.practice.counterargument, reason: 'Use AI in a way that introduces productive resistance instead of removing it.' },
        { resource: en.articles.trust, reason: 'Connect cognitive shortcuts to the compressed route between sources and conclusions.' }
      ],
      connectionTitle: 'How the pieces connect',
      connection: [
        'The main article sets the evidential boundaries. Concepts make the cognitive mechanisms easier to distinguish, while Practice turns them into choices about when the model answers, asks, hints or critiques. Notes preserve two constraints: a summary is not a decision, and textual context is not the whole situation.',
        'The cluster does not assume that using AI is harmful. It asks for a better description of the interaction. The useful question is which processes a person wants to delegate, which must remain practised and how to tell whether support has built capability or only improved the assisted result.'
      ],
      authorLabel: 'About the author',
      authorText: 'Feliks Mamczur examines how AI changes attention, learning, judgment and everyday cognitive work.'
    },
    {
      id: 'agency',
      lang: 'en',
      path: '/topics/human-agency-and-responsibility/',
      alternatePath: '/pl/topics/sprawczosc-i-odpowiedzialnosc/',
      title: 'Human agency and responsibility',
      description: 'A guide to human agency, AI-assisted decisions, moral and institutional responsibility, human oversight, delegation and meaningful control.',
      eyebrow: 'Topic guide',
      summary: 'How to trace goals, decisions and responsibility through AI-assisted systems without treating the machine as a moral agent or blaming the nearest operator.',
      introduction: [
        'When an AI-assisted decision causes harm, the sentence "the system decided" can hide more than it explains. A model may contribute causally to an outcome without choosing the goal, the acceptable risk, the training data, the deployment setting or the conditions under which a person can challenge its recommendation.',
        'This guide brings together Prompted Psyche materials on agency, delegation and responsibility. It focuses on the chain of human and institutional choices around a system. The aim is neither to deny the novelty of AI nor to assign every failure to one individual. It is to keep the authorship of goals, constraints and decisions visible.'
      ],
      definitionTitle: 'What agency and responsibility means here',
      definition: [
        'Human agency is the capacity to form intentions, make choices and act within real constraints. Responsibility concerns who can be answerable for a decision, process or outcome. In AI systems, both may be distributed across managers, product teams, vendors, operators, reviewers and institutions. Distribution does not mean disappearance.',
        'Causal contribution is different from moral agency. A system can alter what happens without possessing the kind of intentions, understanding or accountability normally required for moral responsibility. At the same time, responsibility should not automatically fall on the lowest-level person who touched the output. An operator can become a moral crumple zone when an institution gives them formal blame but little information, time or authority.'
      ],
      distinctionsTitle: 'Distinctions that matter',
      distinctions: [
        { term: 'Cause is not moral agency', explanation: 'A system can shape an outcome without becoming a blameworthy moral subject.' },
        { term: 'Delegation is not disappearance', explanation: 'Passing a task to a model does not erase the human choice to define and use it.' },
        { term: 'Oversight is not a signature', explanation: 'Meaningful review requires information, competence, time and power to intervene.' },
        { term: 'Responsibility can be distributed', explanation: 'Several actors can hold different duties without making the nearest operator the sole cause.' }
      ],
      questionsTitle: 'Key questions',
      questions: [
        'Who defined the objective and the acceptable trade-offs?',
        'Who selected the data, model, threshold and deployment context?',
        'What can a reviewer actually inspect, contest and change?',
        'Which incentives reward agreement with the automated recommendation?',
        'Who benefits, who bears the risk and who can provide a remedy?'
      ],
      orientationTitle: 'A useful way to orient yourself',
      orientation: [
        'Trace the decision rather than staring only at the output. Start with the goal, then follow the chain through procurement, data, model configuration, interface, policy and final use. At each stage, ask what alternatives existed and who had the authority to choose among them. This makes agency laundering - presenting a human decision as a machine necessity - harder to sustain.',
        'Then examine the reviewer. A human in the loop is not enough if the role is ceremonial. Meaningful control depends on whether the person understands the system, sees relevant evidence and uncertainty, has enough time and can change the result without being punished for disagreement.'
      ],
      startTitle: 'Where to start',
      startIntro: 'The main essay develops the difference between AI as an amplifier, a moral buffer and a moral alibi, while preserving real limits of human control.',
      start: en.articles.agency,
      articlesTitle: 'Articles',
      articlesIntro: 'The related essays extend responsibility from organizational decisions to interpretation and epistemic reliance.',
      articles: [en.articles.agency, en.articles.interpretation, en.articles.trust],
      conceptsTitle: 'Concepts',
      conceptsIntro: 'These entries clarify the roles of agency, oversight, decision support and misplaced computational authority.',
      concepts: [en.concepts.humanAgency, en.concepts.humanOversight, en.concepts.decisionSupport, en.concepts.algorithmicAuthority, en.concepts.automationBias, en.concepts.overreliance],
      practiceTitle: 'Practice',
      practiceIntro: 'These exercises keep factual analysis, interpretation and the final decision in distinct places.',
      practice: [en.practice.decisionOwnership, en.practice.factsInterpretations, en.practice.messageAnalysis],
      notesTitle: 'Notes',
      notesIntro: 'The notes show how responsibility can disappear inside summary and interpretation.',
      notes: [en.notes.summary, en.notes.diagnosis],
      readingPathTitle: 'Suggested reading path',
      readingPath: [
        { resource: en.articles.agency, reason: 'Build the responsibility-tracing framework and its moral limits.' },
        { resource: en.concepts.humanAgency, reason: 'Clarify what remains distinctly human in a constrained decision process.' },
        { resource: en.concepts.humanOversight, reason: 'Distinguish meaningful intervention from ceremonial review.' },
        { resource: en.practice.decisionOwnership, reason: 'Apply the distinction between model analysis and human judgment.' },
        { resource: en.articles.interpretation, reason: 'See the same boundary in everyday attempts to infer people from partial text.' }
      ],
      connectionTitle: 'How the pieces connect',
      connection: [
        'The main article provides a map of moral and institutional responsibility. Concepts identify the roles that can be confused in a workflow. Practice entries make the chain visible at the level of an individual decision, and notes show how quickly language can hide the shift from evidence to interpretation.',
        'The result is not a formula for legal liability, which depends on law, jurisdiction and facts. It is a way to ask better questions before a system is treated as the author of a decision or a frontline operator is made responsible for choices designed elsewhere.'
      ],
      authorLabel: 'About the author',
      authorText: 'Feliks Mamczur writes about human agency, oversight and responsibility in AI-assisted work and communication.'
    }
  ],
  pl: []
};

topicHubs.pl = [
  {
    id: 'trust',
    lang: 'pl',
    path: '/pl/topics/zaufanie-do-ai/',
    alternatePath: '/topics/trust-in-ai/',
    title: 'Zaufanie do AI',
    description: 'Przewodnik po zaufaniu do AI: źródłach, niepewności, halucynacjach, weryfikacji i różnicy między płynną odpowiedzią a wiarygodną wiedzą.',
    eyebrow: 'Przewodnik tematyczny',
    summary: 'Jak odróżniać płynną odpowiedź od wiarygodnej wiedzy, sprawdzać źródła i niepewność oraz oceniać, kiedy można polegać na wyniku AI.',
    introduction: [
      'Zaufanie do AI nie sprowadza się do wyboru między przyjmowaniem każdej odpowiedzi a odrzuceniem technologii. To praktyczny problem: na ile można polegać na systemie w konkretnym zadaniu. Płynna odpowiedź może być użyteczna, błędna, niepełna albo niemożliwa do zweryfikowania. Na ekranie wszystkie te warianty potrafią wyglądać niemal tak samo.',
      'Ten przewodnik łączy materiały Prompted Psyche poświęcone tej różnicy. Najważniejsze pytanie nie dotyczy pewnego tonu modelu. Dotyczy tego, czy czytelnik może odtworzyć wystarczającą część drogi przez źródła, dowody, niepewność i odpowiedzialność, aby rozsądnie użyć odpowiedzi.'
    ],
    definitionTitle: 'Co tutaj oznacza zaufanie do AI',
    definition: [
      'Zaufanie oznacza gotowość do polegania na systemie mimo niepewności. Poprawność jest cechą konkretnego twierdzenia albo wyniku. Wrażenie pewności często wynika tylko ze sposobu, w jaki model formułuje wypowiedź. Weryfikowalność mówi o tym, czy twierdzenie da się sprawdzić, a pochodzenie informacji - skąd wziął się materiał, który ma je wspierać. Możliwość korekty zależy od tego, czy człowiek może zakwestionować wynik i zmienić dalsze działanie.',
      'Nie należy zlewać tych właściwości w jedno. Poprawna odpowiedź może nie mieć dobrych źródeł. Odpowiedź z odwołaniami może opierać się na słabym albo niedopasowanym materiale. Ten sam system może być przydatny w jednym zadaniu i zbyt ryzykowny w innym. Skalibrowane zaufanie polega na dostosowaniu stopnia polegania do jakości dowodów, widoczności ograniczeń i konsekwencji błędu.'
    ],
    distinctionsTitle: 'Ważne rozróżnienia',
    distinctions: [
      { term: 'Płynność nie jest dowodem', explanation: 'Jasny język może zmniejszać opór, ale nie zwiększa automatycznie oparcia w faktach.' },
      { term: 'Źródło nie jest gwarancją', explanation: 'Prawdziwa publikacja nadal może być przestarzała, słaba albo niedopasowana do twierdzenia.' },
      { term: 'Znaczenie niepewności zależy od zadania', explanation: 'Taki sam brak pewności ma inne znaczenie w burzy mózgów i w decyzji o poważnych skutkach.' },
      { term: 'Za weryfikację ktoś musi odpowiadać', explanation: 'Sprawdzenie chroni decyzję tylko wtedy, gdy ktoś ma czas, kompetencje i możliwość reakcji.' }
    ],
    questionsTitle: 'Najważniejsze pytania',
    questions: [
      'Co dokładnie twierdzi model i jaki dowód mógłby to potwierdzić?',
      'Czy odpowiedź prowadzi do rozpoznawalnych, trafnych i wystarczająco aktualnych źródeł?',
      'Jaka niepewność, różnica zdań albo brak kontekstu zniknęły w płynnej syntezie?',
      'Jak poważny i odwracalny byłby błąd w tej sytuacji?',
      'Kto pozostaje odpowiedzialny za sprawdzenie i użycie wyniku?'
    ],
    orientationTitle: 'Jak się w tym obszarze poruszać',
    orientation: [
      'Zacznij od konsekwencji. Eksploracja o niewielkim ryzyku może tolerować więcej niepewności niż decyzje dotyczące zdrowia, zatrudnienia, prawa albo finansów. Następnie sprawdź drogę do odpowiedzi. Oddziel to, co wygenerował model, od tego, co pochodzi ze źródeł i co dopowiedział użytkownik. Na końcu zachowaj możliwość korekty: porównania dowodów, znalezienia sporu i zmiany decyzji.',
      'AI literacy pojawia się w całym klastrze, ponieważ dobry prompt jest dopiero początkiem. Trudniejsza kompetencja polega na rozpoznaniu, kiedy wynik wystarcza, kiedy wymaga sprawdzenia, a kiedy zadanie nie powinno być powierzane modelowi.'
    ],
    startTitle: 'Od czego zacząć',
    startIntro: 'Zacznij od głównego eseju, który pokazuje, jak generatywna AI może skrócić widoczną drogę między źródłami a wnioskiem.',
    start: pl.articles.trust,
    articlesTitle: 'Artykuły',
    articlesIntro: 'Główny tekst porządkuje problem. Kolejne łączą go z AI literacy i poznawczymi skutkami gotowych odpowiedzi.',
    articles: [pl.articles.trust, pl.articles.literacy, pl.articles.cognition],
    conceptsTitle: 'Pojęcia',
    conceptsIntro: 'Te hasła pozwalają rozdzielić mechanizmy, które często mieszczą się pod jednym słowem „zaufanie”.',
    concepts: [pl.concepts.calibratedTrust, pl.concepts.vigilance, pl.concepts.grounding, pl.concepts.hallucination, pl.concepts.overreliance, pl.concepts.aiLiteracy],
    practiceTitle: 'Praktyka',
    practiceIntro: 'Krótkie scenariusze zamieniają rozróżnienia w powtarzalne czynności kontrolne.',
    practice: [pl.practice.sources, pl.practice.uncertainty, pl.practice.fluency],
    notesTitle: 'Notatki',
    notesIntro: 'Notatki pokazują w zwartej formie dwa częste błędy.',
    notes: [pl.notes.fluent, pl.notes.summary],
    readingPathTitle: 'Sugerowana ścieżka czytania',
    readingPath: [
      { resource: pl.articles.trust, reason: 'Zbuduj ogólny model pochodzenia informacji, niepewności, sporu i odpowiedzialności.' },
      { resource: pl.concepts.calibratedTrust, reason: 'Zobacz, dlaczego stopień polegania powinien zmieniać się wraz z zadaniem i jego konsekwencjami.' },
      { resource: pl.notes.fluent, reason: 'Rozpoznaj moment, w którym dopracowany język zaczyna zastępować dowody.' },
      { resource: pl.practice.sources, reason: 'Zastosuj konkretną kontrolę źródeł do odpowiedzi, którą łatwo byłoby przyjąć bez sprawdzania.' },
      { resource: pl.articles.cognition, reason: 'Sprawdź, jak gotowe odpowiedzi mogą zmieniać również rodzaj myślenia, który nadal ćwiczymy.' }
    ],
    connectionTitle: 'Jak te materiały łączą się ze sobą',
    connection: [
      'Artykuł opisuje problem strukturalny. Pojęcia nazywają mechanizmy. Praktyka daje czynności, które można powtarzać, a notatki zachowują najważniejsze ostrzeżenia w krótszej formie. Razem prowadzą od rozumienia zaufania do jego kalibrowania w użyciu.',
      'Nie każdą odpowiedź da się uczynić bezpieczną przez samodzielne sprawdzanie. Niektóre zadania wymagają specjalisty, materiału pierwotnego albo procesu decyzyjnego poza modelem. Celem tego klastra jest ułatwienie rozpoznania tej granicy.'
    ],
    authorLabel: 'O autorze',
    authorText: 'Feliks Mamczur pisze o poznaniu, zaufaniu, komunikacji i odpowiedzialności w Human-AI Interaction.'
  },
  {
    id: 'cognition',
    lang: 'pl',
    path: '/pl/topics/ai-i-myslenie/',
    alternatePath: '/topics/ai-and-cognition/',
    title: 'AI i myślenie',
    description: 'Przewodnik po AI, myśleniu i uczeniu się: wykonaniu zadania, pamięci, przenoszeniu umiejętności na nowe zadania, cognitive offloading, metapoznaniu i erozji kompetencji.',
    eyebrow: 'Przewodnik tematyczny',
    summary: 'Co zmienia się, gdy AI podaje odpowiedź, wspiera proces albo usuwa ćwiczenie, dzięki któremu powstaje samodzielna umiejętność.',
    introduction: [
      'W debacie publicznej często powraca pytanie, czy AI czyni ludzi mądrzejszymi albo głupszymi. Jest chwytliwe i zwykle zbyt szerokie. Ktoś może szybciej ukończyć zadanie z AI, a jednocześnie mniej się z niego nauczyć. Inna osoba może użyć podobnego systemu jako źródła stopniowanych podpowiedzi, informacji zwrotnej albo drugiego czytelnika i zachować więcej pracy potrzebnej do rozwoju samodzielnej umiejętności.',
      'Ten przewodnik porządkuje materiały Prompted Psyche wokół węższego pytania: jaki rodzaj myślenia pozostaje po stronie człowieka? Oddziela bieżący wynik od uczenia się, utrwalenia wiedzy i transferu, a następnie łączy te różnice z cognitive offloading, metapoznaniem i projektowaniem pomocy.'
    ],
    definitionTitle: 'Co tutaj oznacza związek AI i myślenia',
    definition: [
      'Poznanie obejmuje między innymi uwagę, pamięć, rozumienie, rozwiązywanie problemów, monitorowanie i podejmowanie decyzji. AI może zmieniać podział tych procesów między człowieka, interfejs i model. Taka zmiana nie jest automatycznie poprawą ani pogorszeniem. Jej skutek zależy od celu, zadania, wcześniejszej wiedzy, momentu udzielenia pomocy i tego, co mierzymy po wycofaniu wsparcia.',
      'Najważniejsze rozróżnienie dotyczy wykonania zadania i rozwoju zdolności. Pierwsze można oceniać, gdy narzędzie pozostaje dostępne. Drugie wymaga sprawdzenia, co zostało utrwalone i czy nastąpił transfer: czy człowiek potrafi później użyć tego, czego się nauczył, w zmienionym problemie albo bez tej samej pomocy.'
    ],
    distinctionsTitle: 'Ważne rozróżnienia',
    distinctions: [
      { term: 'Wynik nie jest uczeniem się', explanation: 'Lepszy wynik uzyskany z pomocą nie pokazuje, co zostaje po jej wycofaniu.' },
      { term: 'Odciążenie nie jest degradacją', explanation: 'Narzędzia mogą rozszerzać poznanie; ryzyko rośnie, gdy potrzebna praktyka znika niezauważenie.' },
      { term: 'Odpowiedź nie jest rusztowaniem', explanation: 'Wsparcie może zachować wysiłek, jeśli pyta, podpowiada, daje informację zwrotną i stopniowo się wycofuje.' },
      { term: 'Rozpoznanie nie jest rozumieniem', explanation: 'Płynne wyjaśnienie może wydawać się znajome, zanim uczący się potrafi odtworzyć rozumowanie.' }
    ],
    questionsTitle: 'Najważniejsze pytania',
    questions: [
      'Czy celem jest ukończenie zadania, nauczenie się umiejętności, czy jedno i drugie?',
      'Które etapy poznawcze człowiek wykonuje przed zobaczeniem odpowiedzi modelu?',
      'Czy interakcja wymaga własnej próby, przypomnienia, wyjaśnienia albo użycia umiejętności w nowym zadaniu?',
      'Co dzieje się po ograniczeniu lub usunięciu wsparcia?',
      'Które zdolności nadal trzeba ćwiczyć, ponieważ odpowiedzialność pozostaje po stronie użytkownika?'
    ],
    orientationTitle: 'Jak się w tym obszarze poruszać',
    orientation: [
      'Najpierw nazwij cel. Bezpośrednie generowanie może być właściwe przy rutynowym wykonaniu, jeśli wynik da się sprawdzić. Uczenie się wymaga innej interakcji: własnej próby, informacji zwrotnej dopasowanej do błędu, możliwości przypominania i późniejszego testu bez tej samej pomocy. W twórczości dochodzi kolejne pytanie - czy wsparcie poprawia pojedynczy efekt, ale zmniejsza różnorodność całego zbioru.',
      'Właściwą jednostką analizy rzadko jest sam model. Jest nią cały układ: prompty, interfejs, zadanie, zachęty, wcześniejsza wiedza i sposób sprawdzania. Dlatego ten sam model w jednym procesie może zastępować pracę, a w innym służyć jako rusztowanie.'
    ],
    startTitle: 'Od czego zacząć',
    startIntro: 'Główny artykuł sprawdza, co obecne dowody pozwalają powiedzieć, a czego nie, bez traktowania krótkich badań jako dowodu trwałej zmiany inteligencji.',
    start: pl.articles.cognition,
    articlesTitle: 'Artykuły',
    articlesIntro: 'Najpierw przeczytaj główną syntezę, a później połącz praktykę poznawczą z kontekstem i zaufaniem.',
    articles: [pl.articles.cognition, pl.articles.terminology, pl.articles.trust, pl.articles.context],
    conceptsTitle: 'Pojęcia',
    conceptsIntro: 'Te hasła rozdzielają wymagania poznawcze, zewnętrzne wsparcie, samokontrolę i utratę ćwiczonej zdolności.',
    concepts: [pl.concepts.offloading, pl.concepts.cognitiveLoad, pl.concepts.metacognition, pl.concepts.deskilling, pl.concepts.aiLiteracy, pl.concepts.llm, pl.concepts.mentalModel],
    practiceTitle: 'Praktyka',
    practiceIntro: 'Te scenariusze pozostawiają interpretację, opór i autorstwo po stronie człowieka.',
    practice: [pl.practice.assumptions, pl.practice.counterargument, pl.practice.secondReader],
    notesTitle: 'Notatki',
    notesIntro: 'Dwa krótkie przypomnienia o kompresji i granicach kontekstu modelu.',
    notes: [pl.notes.summary, pl.notes.text],
    readingPathTitle: 'Sugerowana ścieżka czytania',
    readingPath: [
      { resource: pl.articles.cognition, reason: 'Zacznij od dowodów i różnicy między wykonaniem zadania a uczeniem się.' },
      { resource: pl.concepts.offloading, reason: 'Zrozum, dlaczego przeniesienie pracy na narzędzie nie jest automatycznie spadkiem zdolności poznawczych.' },
      { resource: pl.concepts.metacognition, reason: 'Skup się na monitorowaniu zrozumienia i samodzielnej zdolności.' },
      { resource: pl.practice.counterargument, reason: 'Użyj AI tak, aby wprowadzała użyteczny opór zamiast go usuwać.' },
      { resource: pl.articles.trust, reason: 'Połącz skróty poznawcze ze skróconą drogą między źródłami a wnioskiem.' }
    ],
    connectionTitle: 'Jak te materiały łączą się ze sobą',
    connection: [
      'Główny artykuł wyznacza granice dowodów. Pojęcia pomagają oddzielić mechanizmy poznawcze, a Praktyka zamienia je w decyzje o tym, kiedy model odpowiada, pyta, podpowiada albo krytykuje. Notatki przypominają o dwóch ograniczeniach: streszczenie nie jest decyzją, a tekstowy kontekst nie jest całą sytuacją.',
      'Ten klaster nie zakłada, że używanie AI jest szkodliwe. Domaga się dokładniejszego opisu interakcji. Warto pytać, które procesy chcemy delegować, które nadal trzeba ćwiczyć i po czym poznać, że wsparcie rozwinęło zdolność, a nie tylko poprawiło wynik uzyskany z pomocą.'
    ],
    authorLabel: 'O autorze',
    authorText: 'Feliks Mamczur analizuje, jak AI zmienia uwagę, uczenie się, osąd i codzienną pracę poznawczą.'
  },
  {
    id: 'agency',
    lang: 'pl',
    path: '/pl/topics/sprawczosc-i-odpowiedzialnosc/',
    alternatePath: '/topics/human-agency-and-responsibility/',
    title: 'Sprawczość i odpowiedzialność',
    description: 'Przewodnik po sprawczości człowieka, decyzjach wspieranych przez AI, odpowiedzialności moralnej i instytucjonalnej, nadzorze oraz delegowaniu.',
    eyebrow: 'Przewodnik tematyczny',
    summary: 'Jak śledzić cele, decyzje i odpowiedzialność w systemach z AI bez uznawania maszyny za podmiot moralny ani obwiniania najbliższego operatora.',
    introduction: [
      'Gdy decyzja wspierana przez AI wyrządza szkodę, zdanie „system zdecydował” może więcej ukrywać, niż wyjaśniać. Model może mieć udział przyczynowy w wyniku, ale nie wybiera celu, dopuszczalnego ryzyka, danych uczących, miejsca wdrożenia ani warunków, w których człowiek może zakwestionować rekomendację.',
      'Ten przewodnik łączy materiały Prompted Psyche o sprawczości, delegowaniu i odpowiedzialności. Skupia się na łańcuchu ludzkich oraz instytucjonalnych wyborów wokół systemu. Nie chodzi o pomijanie nowości AI ani o przypisanie każdego błędu jednej osobie. Chodzi o zachowanie widocznego autorstwa celów, ograniczeń i decyzji.'
    ],
    definitionTitle: 'Co tutaj oznaczają sprawczość i odpowiedzialność',
    definition: [
      'Sprawczość człowieka to zdolność do tworzenia zamiarów, dokonywania wyborów i działania w rzeczywistych ograniczeniach. Odpowiedzialność dotyczy tego, kto może odpowiadać za decyzję, proces albo skutek. W systemach z AI obie mogą być rozłożone między menedżerów, zespoły produktowe, dostawców, operatorów, osoby sprawdzające i instytucje. Rozproszenie nie oznacza zniknięcia.',
      'Udział przyczynowy nie jest tym samym co podmiotowość moralna. System może zmieniać bieg zdarzeń, nie mając intencji, rozumienia i zdolności do odpowiedzialności wymaganych zwykle od podmiotu moralnego. Jednocześnie nie należy automatycznie obciążać osoby najniżej w hierarchii, która zetknęła się z wynikiem. Operator staje się moralną strefą zgniotu, gdy instytucja przypisuje mu formalną winę, ale nie daje informacji, czasu ani uprawnień.'
    ],
    distinctionsTitle: 'Ważne rozróżnienia',
    distinctions: [
      { term: 'Przyczyna nie jest podmiotowością moralną', explanation: 'System może wpływać na wynik, nie stając się podmiotem zasługującym na moralną winę.' },
      { term: 'Delegowanie nie jest zniknięciem', explanation: 'Przekazanie zadania modelowi nie usuwa ludzkiej decyzji o jego określeniu i użyciu.' },
      { term: 'Nadzór nie jest podpisem', explanation: 'Realna kontrola wymaga informacji, kompetencji, czasu i możliwości interwencji.' },
      { term: 'Odpowiedzialność może być rozproszona', explanation: 'Kilku aktorów może mieć różne obowiązki bez czynienia najbliższego operatora jedynym sprawcą.' }
    ],
    questionsTitle: 'Najważniejsze pytania',
    questions: [
      'Kto zdefiniował cel i dopuszczalne kompromisy?',
      'Kto wybrał dane, model, próg i kontekst wdrożenia?',
      'Co osoba sprawdzająca może naprawdę zobaczyć, zakwestionować i zmienić?',
      'Jakie zachęty premiują zgodę z automatyczną rekomendacją?',
      'Kto odnosi korzyści, kto ponosi ryzyko i kto może naprawić szkodę?'
    ],
    orientationTitle: 'Jak się w tym obszarze poruszać',
    orientation: [
      'Śledź decyzję zamiast skupiać się wyłącznie na wyniku. Zacznij od celu, a później przejdź przez zakup, dane, konfigurację modelu, interfejs, procedurę i końcowe użycie. Na każdym etapie pytaj, jakie były alternatywy i kto miał prawo spośród nich wybierać. Utrudnia to agency laundering - przedstawianie ludzkiej decyzji jako konieczności narzuconej przez maszynę.',
      'Następnie przyjrzyj się osobie sprawdzającej. Sam człowiek w pętli nie wystarcza, jeśli jego rola jest ceremonialna. Znacząca kontrola zależy od tego, czy rozumie system, widzi właściwe dowody i niepewność, ma wystarczająco dużo czasu oraz może zmienić wynik bez kary za sprzeciw.'
    ],
    startTitle: 'Od czego zacząć',
    startIntro: 'Główny esej rozwija różnicę między AI jako wzmacniaczem, buforem moralnym i moralnym alibi, nie pomijając rzeczywistych granic ludzkiej kontroli.',
    start: pl.articles.agency,
    articlesTitle: 'Artykuły',
    articlesIntro: 'Powiązane teksty przenoszą problem odpowiedzialności z decyzji organizacyjnych na interpretację i poleganie poznawcze.',
    articles: [pl.articles.agency, pl.articles.interpretation, pl.articles.trust],
    conceptsTitle: 'Pojęcia',
    conceptsIntro: 'Te hasła wyjaśniają role sprawczości, nadzoru, wspomagania decyzji i niewłaściwie przypisywanego autorytetu obliczeniowego.',
    concepts: [pl.concepts.humanAgency, pl.concepts.humanOversight, pl.concepts.decisionSupport, pl.concepts.algorithmicAuthority, pl.concepts.automationBias, pl.concepts.overreliance],
    practiceTitle: 'Praktyka',
    practiceIntro: 'Te ćwiczenia utrzymują analizę faktów, interpretację i końcową decyzję w odrębnych miejscach.',
    practice: [pl.practice.decisionOwnership, pl.practice.factsInterpretations, pl.practice.messageAnalysis],
    notesTitle: 'Notatki',
    notesIntro: 'Notatki pokazują, jak odpowiedzialność może znikać wewnątrz streszczenia i interpretacji.',
    notes: [pl.notes.summary, pl.notes.diagnosis],
    readingPathTitle: 'Sugerowana ścieżka czytania',
    readingPath: [
      { resource: pl.articles.agency, reason: 'Zbuduj ramę śledzenia odpowiedzialności i poznaj jej moralne granice.' },
      { resource: pl.concepts.humanAgency, reason: 'Wyjaśnij, co pozostaje wyraźnie ludzkie w ograniczonym procesie decyzyjnym.' },
      { resource: pl.concepts.humanOversight, reason: 'Odróżnij możliwość realnej interwencji od ceremonialnego sprawdzania.' },
      { resource: pl.practice.decisionOwnership, reason: 'Zastosuj różnicę między analizą modelu a osądem człowieka.' },
      { resource: pl.articles.interpretation, reason: 'Zobacz tę samą granicę w codziennych próbach wnioskowania o ludziach z niepełnego tekstu.' }
    ],
    connectionTitle: 'Jak te materiały łączą się ze sobą',
    connection: [
      'Główny artykuł porządkuje odpowiedzialność moralną i instytucjonalną. Pojęcia wskazują role, które łatwo pomylić w procesie. Praktyka pokazuje łańcuch na poziomie pojedynczej decyzji, a notatki przypominają, jak szybko język może ukryć przejście od dowodów do interpretacji.',
      'Nie jest to wzór ustalania odpowiedzialności prawnej, która zależy od prawa, jurysdykcji i faktów. To sposób zadawania lepszych pytań, zanim system zostanie uznany za autora decyzji albo pracownik pierwszej linii odpowie za wybory zaprojektowane gdzie indziej.'
    ],
    authorLabel: 'O autorze',
    authorText: 'Feliks Mamczur pisze o sprawczości człowieka, nadzorze i odpowiedzialności w pracy oraz komunikacji wspieranej przez AI.'
  }
];

const topicResourceIndex: Record<Locale, Record<TopicId, {
  articleKey: string;
  hub: TopicResource;
  relatedArticle: TopicResource;
  featuredConcept: TopicResource;
  featuredPractice: TopicResource;
  concepts: Record<string, TopicResource>;
  practice: Record<string, TopicResource>;
}>> = {
  en: {
    trust: {
      articleKey: 'ai-path-to-knowledge',
      hub: resource('topic', 'Trust in AI', 'A guide to sources, uncertainty, verification and calibrated reliance.', '/topics/trust-in-ai/'),
      relatedArticle: en.articles.cognition,
      featuredConcept: en.concepts.calibratedTrust,
      featuredPractice: en.practice.sources,
      concepts: {
        'calibrated-trust': en.concepts.calibratedTrust,
        'epistemic-vigilance': en.concepts.vigilance,
        grounding: en.concepts.grounding,
        hallucination: en.concepts.hallucination,
        overreliance: en.concepts.overreliance,
        'ai-literacy': en.concepts.aiLiteracy,
        'model-output': en.concepts.modelOutput
      },
      practice: {
        'checking-ai-answer-sources': en.practice.sources,
        'ask-model-about-uncertainty': en.practice.uncertainty,
        'fluency-is-not-truth': en.practice.fluency
      }
    },
    cognition: {
      articleKey: 'ai-thinking-practice',
      hub: resource('topic', 'AI and cognition', 'A guide to performance, learning, transfer, offloading and cognitive practice.', '/topics/ai-and-cognition/'),
      relatedArticle: en.articles.trust,
      featuredConcept: en.concepts.offloading,
      featuredPractice: en.practice.counterargument,
      concepts: {
        'cognitive-offloading': en.concepts.offloading,
        'cognitive-load': en.concepts.cognitiveLoad,
        metacognition: en.concepts.metacognition,
        deskilling: en.concepts.deskilling,
        llm: en.concepts.llm,
        'mental-model': en.concepts.mentalModel
      },
      practice: {
        'practice-assumptions': en.practice.assumptions,
        'practice-counterargument': en.practice.counterargument,
        'ai-as-second-reader': en.practice.secondReader
      }
    },
    agency: {
      articleKey: 'ai-fears-human-self-fear',
      hub: resource('topic', 'Human agency and responsibility', 'A guide to delegation, oversight and responsibility in AI-assisted systems.', '/topics/human-agency-and-responsibility/'),
      relatedArticle: en.articles.interpretation,
      featuredConcept: en.concepts.humanAgency,
      featuredPractice: en.practice.decisionOwnership,
      concepts: {
        'human-agency': en.concepts.humanAgency,
        'human-oversight': en.concepts.humanOversight,
        'decision-support': en.concepts.decisionSupport,
        'algorithmic-authority': en.concepts.algorithmicAuthority,
        'automation-bias': en.concepts.automationBias
      },
      practice: {
        'practice-decision-ownership': en.practice.decisionOwnership,
        'separate-facts-from-interpretations': en.practice.factsInterpretations,
        'analyze-message-without-diagnosing': en.practice.messageAnalysis
      }
    }
  },
  pl: {
    trust: {
      articleKey: 'ai-path-to-knowledge',
      hub: resource('topic', 'Zaufanie do AI', 'Przewodnik po źródłach, niepewności, weryfikacji i skalibrowanym zaufaniu.', '/pl/topics/zaufanie-do-ai/'),
      relatedArticle: pl.articles.cognition,
      featuredConcept: pl.concepts.calibratedTrust,
      featuredPractice: pl.practice.sources,
      concepts: {
        'calibrated-trust': pl.concepts.calibratedTrust,
        'epistemic-vigilance': pl.concepts.vigilance,
        grounding: pl.concepts.grounding,
        hallucination: pl.concepts.hallucination,
        overreliance: pl.concepts.overreliance,
        'ai-literacy': pl.concepts.aiLiteracy,
        'model-output': pl.concepts.modelOutput
      },
      practice: {
        'checking-ai-answer-sources': pl.practice.sources,
        'ask-model-about-uncertainty': pl.practice.uncertainty,
        'fluency-is-not-truth': pl.practice.fluency
      }
    },
    cognition: {
      articleKey: 'ai-thinking-practice',
      hub: resource('topic', 'AI i myślenie', 'Przewodnik po wykonaniu zadań, uczeniu się, przenoszeniu umiejętności, odciążeniu i praktyce poznawczej.', '/pl/topics/ai-i-myslenie/'),
      relatedArticle: pl.articles.trust,
      featuredConcept: pl.concepts.offloading,
      featuredPractice: pl.practice.counterargument,
      concepts: {
        'cognitive-offloading': pl.concepts.offloading,
        'cognitive-load': pl.concepts.cognitiveLoad,
        metacognition: pl.concepts.metacognition,
        deskilling: pl.concepts.deskilling,
        llm: pl.concepts.llm,
        'mental-model': pl.concepts.mentalModel
      },
      practice: {
        'practice-assumptions': pl.practice.assumptions,
        'practice-counterargument': pl.practice.counterargument,
        'ai-as-second-reader': pl.practice.secondReader
      }
    },
    agency: {
      articleKey: 'ai-fears-human-self-fear',
      hub: resource('topic', 'Sprawczość i odpowiedzialność', 'Przewodnik po delegowaniu, nadzorze i odpowiedzialności w systemach wspieranych przez AI.', '/pl/topics/sprawczosc-i-odpowiedzialnosc/'),
      relatedArticle: pl.articles.interpretation,
      featuredConcept: pl.concepts.humanAgency,
      featuredPractice: pl.practice.decisionOwnership,
      concepts: {
        'human-agency': pl.concepts.humanAgency,
        'human-oversight': pl.concepts.humanOversight,
        'decision-support': pl.concepts.decisionSupport,
        'algorithmic-authority': pl.concepts.algorithmicAuthority,
        'automation-bias': pl.concepts.automationBias
      },
      practice: {
        'practice-decision-ownership': pl.practice.decisionOwnership,
        'separate-facts-from-interpretations': pl.practice.factsInterpretations,
        'analyze-message-without-diagnosing': pl.practice.messageAnalysis
      }
    }
  }
};

export function getTopicHubs(lang: Locale) {
  return topicHubs[lang];
}

export function getTopicHub(id: TopicId, lang: Locale) {
  const hub = topicHubs[lang].find((candidate) => candidate.id === id);

  if (!hub) {
    throw new Error(`Missing ${lang} topic hub for ${id}`);
  }

  return hub;
}

export function getTopicAlternateLinks(hub: TopicHub) {
  const enPath = hub.lang === 'en' ? hub.path : hub.alternatePath;
  const plPath = hub.lang === 'pl' ? hub.path : hub.alternatePath;

  return { en: enPath, pl: plPath, xDefault: enPath };
}

function uniqueResources(resources: TopicResource[]) {
  return resources.filter(
    (candidate, index) => resources.findIndex((resourceItem) => resourceItem.href === candidate.href) === index
  );
}

function getTopicForEntry(
  kind: 'article' | 'concept' | 'practice',
  key: string,
  lang: Locale
) {
  const entries = Object.entries(topicResourceIndex[lang]) as Array<
    [TopicId, (typeof topicResourceIndex)[Locale][TopicId]]
  >;

  return entries.find(([, topic]) => {
    if (kind === 'article') return topic.articleKey === key;
    if (kind === 'concept') return Boolean(topic.concepts[key]);
    return Boolean(topic.practice[key]);
  });
}

export function getExplorationLinks(
  kind: 'article' | 'concept' | 'practice',
  key: string | undefined,
  lang: Locale
): TopicResource[] {
  if (!key) return [];

  const match = getTopicForEntry(kind, key, lang);
  if (!match) return [];

  const [, topic] = match;

  if (kind === 'article') {
    return [topic.hub, topic.relatedArticle, topic.featuredConcept, topic.featuredPractice];
  }

  if (kind === 'practice') {
    return [topic.hub, getTopicHub(match[0], lang).start, topic.featuredConcept];
  }

  const conceptResources = Object.values(topic.concepts);
  const currentIndex = Math.max(0, conceptResources.findIndex((candidate) => candidate.href === topic.concepts[key]?.href));
  const adjacent = [
    conceptResources[(currentIndex + 1) % conceptResources.length],
    conceptResources[(currentIndex + 2) % conceptResources.length]
  ];
  const mainArticle = getTopicHub(match[0], lang).start;

  return uniqueResources([topic.hub, mainArticle, ...adjacent, topic.featuredPractice]);
}

export function getTopicSearchItems(lang: Locale) {
  return topicHubs[lang].map((hub) => ({
    title: hub.title,
    description: hub.description,
    url: hub.path,
    type: 'topic' as const,
    language: lang,
    tags: hub.concepts.slice(0, 6).map((concept) => concept.title)
  }));
}
