const conceptOrder = [
  'ai-literacy',
  'token',
  'context-window',
  'model-output',
  'human-ai-interaction',
  'calibrated-trust',
  'automation-bias',
  'cognitive-load',
  'mental-model',
  'metacognition',
  'epistemic-vigilance',
  'cognitive-offloading',
  'anthropomorphism',
  'ai-companions',
  'human-oversight',
  'ai-mediated-communication',
  'hallucination',
  'grounding',
  'sycophancy',
  'overreliance',
  'algorithmic-authority',
  'social-presence',
  'parasocial-relationship',
  'human-agency',
  'deskilling',
  'decision-support'
];

type OrderedConcept = {
  data: {
    title: string;
    translationKey?: string;
  };
};

function getConceptOrder(entry: OrderedConcept) {
  const key = entry.data.translationKey ?? entry.data.title;
  const index = conceptOrder.indexOf(key);

  return index === -1 ? conceptOrder.length : index;
}

export function sortConceptsForIndex<T extends OrderedConcept>(entries: T[]) {
  return [...entries].sort((a, b) => {
    const orderDifference = getConceptOrder(a) - getConceptOrder(b);

    if (orderDifference !== 0) {
      return orderDifference;
    }

    return a.data.title.localeCompare(b.data.title);
  });
}
