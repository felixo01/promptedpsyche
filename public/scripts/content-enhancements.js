(() => {
  const path = `${window.location.pathname.replace(/\/$/, '')}/`;

  const variants = {
    '/pl/notes/masz-racje-powiedzialo-ai/': {
      title: 'Pętla może wyglądać tak',
      caption:
        'Uproszczony przebieg sytuacji: odpowiedź modelu nadal powstaje z materiału wybranego przez jedną stronę konfliktu.',
      steps: [
        {
          label: 'Konflikt',
          copy: 'Rozmowa trwa albo właśnie się zakończyła.'
        },
        {
          label: 'Selekcja i rama',
          copy:
            'Wybierasz fragmenty, opisujesz własną perspektywę, a pytanie może zawierać założenia o winie lub intencji.'
        },
        {
          label: 'Odpowiedź modelu',
          copy:
            'AI odpowiada na przygotowaną narrację. Potakująca odpowiedź może zabrzmieć jak niezależna druga opinia.'
        },
        {
          label: 'Wzmocnienie',
          copy:
            'Rośnie pewność własnej racji, maleje gotowość do sprawdzenia alternatyw i łatwiej o eskalację albo niepotrzebny ruch.'
        }
      ]
    },
    '/notes/youre-right-said-the-ai/': {
      title: 'The loop can unfold like this',
      caption:
        'A simplified sequence: the model answer is still generated from material selected by one side of the conflict.',
      steps: [
        {
          label: 'Conflict',
          copy: 'The exchange is still unfolding or has just ended.'
        },
        {
          label: 'Selection and framing',
          copy:
            'You choose excerpts, describe your perspective, and the question may contain assumptions about blame or intent.'
        },
        {
          label: 'Model response',
          copy:
            'AI answers the prepared narrative. An agreeable response can sound like an independent second opinion.'
        },
        {
          label: 'Reinforcement',
          copy:
            'Confidence in your own position rises, alternatives receive less attention, and escalation or an unnecessary action becomes more likely.'
        }
      ]
    }
  };

  const variant = variants[path];
  if (!variant) return;

  const chainParagraph = [...document.querySelectorAll('.prose p')].find((paragraph) => {
    const text = paragraph.textContent?.trim() ?? '';
    return text.startsWith('konflikt ->') || text.startsWith('conflict ->');
  });

  if (!chainParagraph) return;

  const introParagraph =
    chainParagraph.previousElementSibling?.tagName === 'P'
      ? chainParagraph.previousElementSibling
      : null;

  const figure = document.createElement('figure');
  figure.className = 'conflict-loop';
  figure.dataset.qa = 'conflict-loop-diagram';

  const title = document.createElement('p');
  title.className = 'conflict-loop__title';
  title.textContent = variant.title;

  const list = document.createElement('ol');
  list.className = 'conflict-loop__steps';

  variant.steps.forEach((step) => {
    const item = document.createElement('li');
    item.className = 'conflict-loop__step';

    const label = document.createElement('strong');
    label.className = 'conflict-loop__label';
    label.textContent = step.label;

    const copy = document.createElement('span');
    copy.className = 'conflict-loop__copy';
    copy.textContent = step.copy;

    item.append(label, copy);
    list.append(item);
  });

  const caption = document.createElement('figcaption');
  caption.textContent = variant.caption;

  figure.append(title, list, caption);

  if (introParagraph) {
    introParagraph.replaceWith(figure);
  } else {
    chainParagraph.before(figure);
  }

  chainParagraph.remove();
})();
