---
title: "Jak użyć AI jako drugiego czytelnika"
description: "Praktyka używania AI jako drugiego czytelnika: do sprawdzenia jasności, struktury, tonu i ryzyk odbioru bez oddawania modelowi autorstwa."
publishedAt: 2026-07-03
draft: true
tags:
  - redakcja
  - pisanie
  - AI literacy
  - odpowiedzialność
author: "Feliks Mamczur"
readingTime: "5 min czytania"
lang: "pl"
translationKey: "ai-as-second-reader"
type: "practice"
category: "Praktyka"
---

Autor tekstu zwykle wie, co chciał powiedzieć. Właśnie dlatego łatwo przeoczyć niejasne przejścia, brakujący kontekst albo zdania, które czytelnik może zrozumieć inaczej. AI może pomóc jako drugi czytelnik, ale nie powinno przejmować autorstwa, głosu ani decyzji o sensie tekstu.

Ta praktyka ustawia model jako narzędzie redakcyjnego dystansu. Ma pomóc zobaczyć możliwe reakcje czytelnika, ślepe punkty i miejsca ryzyka, a nie automatycznie wygładzić tekst do bezpiecznego stylu, który brzmi podobnie do wszystkiego.

## Kiedy to pomaga

- Przed publikacją artykułu, notatki, maila albo prezentacji.
- Gdy tekst jest zrozumiały dla autora, ale może być niejasny dla odbiorcy.
- Gdy chcesz sprawdzić, czy argument prowadzi czytelnika krok po kroku.
- Gdy potrzebujesz uwag, ale chcesz zachować własny głos i decyzję redakcyjną.
- Gdy tekst może brzmieć zbyt pewnie, zbyt ostro albo zbyt ogólnie.

## O co poprosić model

Poproś o feedback w warstwach. Najpierw odbiór czytelnika, potem jasność, argument, ton i ryzyka. Dopiero na końcu ewentualne poprawki.

```text
Przeczytaj mój tekst jak drugi czytelnik, nie jak autor.

Nie przepisuj całości. Pomóż mi zobaczyć, jak tekst może zostać odebrany i gdzie czytelnik może się zatrzymać.

Oceń tekst w 5 warstwach:

1. Główne twierdzenie tekstu, tak jak je rozumiesz.
2. Jasność: gdzie czytelnik może się zgubić albo potrzebować kontekstu.
3. Argument: gdzie przejście między zdaniami jest za szybkie.
4. Ton: co może brzmieć zbyt pewnie, zbyt ostro albo zbyt ogólnie.
5. Ryzyko odbioru: co można zrozumieć inaczej, niż zamierzam.

Na końcu zaproponuj maksymalnie 5 uwag redakcyjnych. Nie zmieniaj tonu na marketingowy. Nie wygładzaj tekstu automatycznie. Nie przejmuj autorstwa. Jeśli proponujesz poprawkę, wyjaśnij, jaki problem czytelniczy ona rozwiązuje i co może zostać utracone.

Tekst:
[wklej tekst]
```

## Co sprawdzić samodzielnie

- Czy model dobrze rozumie główną tezę.
- Czy proponowana poprawka rozwiązuje realny problem czytelniczy.
- Czy sugestia nie osłabia głosu, rytmu albo intencji tekstu.
- Czy tekst nie staje się bardziej gładki kosztem precyzji, charakteru albo odpowiedzialności za tezę.
- Które uwagi odrzucasz świadomie, bo nie pasują do celu tekstu.

## Co może pójść źle

- Model może premiować gładkość zamiast precyzji.
- Sugestie mogą osłabić autorski głos.
- Model może zamienić tekst w bezpieczną, ogólną wypowiedź bez charakteru.
- Autor może zaakceptować zmianę tylko dlatego, że brzmi profesjonalnie.
- Model nie zna realnego odbiorcy, celu publikacji ani momentu, w którym tekst ma zadziałać.

## Lepszy sposób użycia odpowiedzi

Autor pisze krótki tekst o AI w organizacji i zakłada, że czytelnik rozumie różnicę między automatyzacją a wsparciem decyzji. Model może wskazać, że ten skrót jest jasny dla autora, ale niekoniecznie dla odbiorcy. Dobra reakcja nie polega na przyjęciu całej redakcji modelu. Lepiej dopisać jedno zdanie kontekstu własnym głosem, a potem zdecydować, czy rytm tekstu nadal działa.

Ten prompt traktuje [odpowiedź modelu](/pl/concepts/model-output/) jako informację zwrotną, a nie gotowy tekst. Model może pokazać, gdzie czytelnik może się zatrzymać, ale nie wie, jaki głos, rytm i sens autor chce zachować. Praktyka wspiera [sprawczość człowieka](/pl/concepts/sprawczosc-czlowieka/): AI może zmniejszyć [cognitive load](/pl/concepts/cognitive-load/) w redakcji, ale nie zastępuje decyzji autora.

## Krótka zasada

Użyj AI, żeby zobaczyć tekst oczami drugiego czytelnika. Nie używaj AI, żeby oddać mu autorstwo.

## Powiązane pojęcia

- [Odpowiedź modelu](/pl/concepts/model-output/)
- [Mental model (model mentalny)](/pl/concepts/mental-model/)
- [Sprawczość człowieka](/pl/concepts/sprawczosc-czlowieka/)
- [Komunikacja zapośredniczona przez AI](/pl/concepts/ai-mediated-communication/)
- [Cognitive load (obciążenie poznawcze)](/pl/concepts/cognitive-load/)

## Dalsza lektura

- [Nie chodzi tylko o prompt](/pl/articles/nie-chodzi-tylko-o-prompt/)
- [AI jako lustro. Dlaczego tak łatwo się z nim dogadujemy?](/pl/articles/ai-jako-lustro-dlaczego-tak-latwo-sie-z-nim-dogadujemy/)
- [Dobre streszczenie to jeszcze nie dobra decyzja](/pl/notes/dobre-streszczenie-to-jeszcze-nie-dobra-decyzja/)
