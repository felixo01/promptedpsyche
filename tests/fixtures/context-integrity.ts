export type ContextIntegrityStatus = 'present' | 'missing' | 'distorted' | 'inferred';

export type ContextItem = {
  id: string;
  type: 'goal' | 'task' | 'constraint' | 'source' | 'decision' | 'rejected' | 'open-question' | 'do-not-assume';
  statement: string;
};

export const syntheticContextChecklist: readonly ContextItem[] = [
  { id: 'G-01', type: 'goal', statement: 'Prepare an accessible one-page guide for volunteer coordinators.' },
  { id: 'T-01', type: 'task', statement: 'Draft the first version of the guide.' },
  { id: 'C-01', type: 'constraint', statement: 'Keep the guide under 700 words.' },
  { id: 'C-02', type: 'constraint', statement: 'Use plain language suitable for first-time coordinators.' },
  { id: 'S-01', type: 'source', statement: 'Use the approved safeguarding policy dated 2026-06-30.' },
  { id: 'S-02', type: 'source', statement: 'Use the programme terminology sheet dated 2026-07-15.' },
  { id: 'D-01', type: 'decision', statement: 'Organise the guide as a checklist, not as an essay.' },
  { id: 'R-01', type: 'rejected', statement: 'Do not use a quiz format.' },
  { id: 'O-01', type: 'open-question', statement: 'Confirm whether an emergency contact box is required.' },
  { id: 'N-01', type: 'do-not-assume', statement: 'Do not assume that readers have completed prior training.' }
] as const;

export const controlledReconstructionCases = [
  {
    id: 'G-01',
    reconstruction: 'Prepare an accessible one-page guide for volunteer coordinators.',
    expected: 'present'
  },
  { id: 'C-02', reconstruction: null, expected: 'missing' },
  {
    id: 'D-01',
    reconstruction: 'Organise the guide as a short explanatory essay.',
    expected: 'distorted'
  },
  {
    id: 'S-03',
    reconstruction: 'Use the volunteer survey published in 2025.',
    expected: 'inferred'
  }
] as const satisfies readonly {
  id: string;
  reconstruction: string | null;
  expected: ContextIntegrityStatus;
}[];

export function classifyReconstruction(id: string, reconstruction: string | null): ContextIntegrityStatus {
  const sourceItem = syntheticContextChecklist.find((item) => item.id === id);

  if (!sourceItem) return 'inferred';
  if (reconstruction === null) return 'missing';
  if (reconstruction !== sourceItem.statement) return 'distorted';
  return 'present';
}
