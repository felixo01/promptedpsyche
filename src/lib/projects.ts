import { beyondAiShareRecord } from './beyondAiShare';
import type { Locale } from './i18n';

export type ProjectSearchItem = {
  title: string;
  description: string;
  url: string;
  type: 'project';
  language: Locale;
  tags: string[];
};

const projectSearchItems: Record<Locale, ProjectSearchItem[]> = {
  en: [
    {
      title: beyondAiShareRecord.name,
      description:
        'A preregistered survey and paired vignette study of perceived control, authorship and authenticity in AI-assisted creative practice.',
      url: beyondAiShareRecord.paths.en,
      type: 'project',
      language: 'en',
      tags: [
        'AI-assisted creativity',
        'authorship',
        'perceived control',
        'authenticity',
        'Human-AI Interaction',
        'preregistered research'
      ]
    },
    {
      title: 'HumanAI Lab',
      description:
        'An archived research project on conversational AI, trust, emotional experience and everyday decision-making.',
      url: '/projects/humanai-lab/',
      type: 'project',
      language: 'en',
      tags: [
        'conversational AI',
        'trust in AI',
        'emotional experience',
        'decision-making',
        'Human-AI Interaction',
        'archived project'
      ]
    }
  ],
  pl: [
    {
      title: beyondAiShareRecord.name,
      description:
        'Prerejestrowane badanie ankietowe i porównanie dwóch winiet dotyczące postrzeganej kontroli, autorstwa i autentyczności w twórczości wspomaganej przez AI.',
      url: beyondAiShareRecord.paths.pl,
      type: 'project',
      language: 'pl',
      tags: [
        'twórczość wspomagana przez AI',
        'autorstwo',
        'postrzegana kontrola',
        'autentyczność',
        'Human-AI Interaction',
        'badanie prerejestrowane'
      ]
    },
    {
      title: 'HumanAI Lab',
      description:
        'Archiwalny projekt badawczy o konwersacyjnej AI, zaufaniu, doświadczeniach emocjonalnych i codziennym podejmowaniu decyzji.',
      url: '/pl/projects/humanai-lab/',
      type: 'project',
      language: 'pl',
      tags: [
        'konwersacyjna AI',
        'zaufanie do AI',
        'doświadczenia emocjonalne',
        'podejmowanie decyzji',
        'Human-AI Interaction',
        'projekt archiwalny'
      ]
    }
  ]
};

export function getProjectSearchItems(language: Locale): ProjectSearchItem[] {
  return projectSearchItems[language];
}
