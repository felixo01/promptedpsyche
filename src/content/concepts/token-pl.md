---
title: "Token"
description: "Jednostka, na której model operuje podczas przetwarzania tekstu, ważna dla długości wejścia, kosztu, kontekstu i oczekiwań wobec pamięci modelu."
publishedAt: 2026-07-02
draft: false
lang: "pl"
translationKey: "token"
routeSlug: "token"
tags: ["AI fundamentals", "kontekst", "Human-AI Interaction"]
---

Token to jednostka tekstu, na której model operuje podczas przetwarzania i generowania języka. Może być słowem, częścią słowa, znakiem interpunkcyjnym albo innym wzorcem znaków, zależnie od tokenizera i modelu. Nie jest tym samym co słowo, zdanie ani jednostka znaczenia w ludzkim sensie.

To pojęcie pomaga zobaczyć ukryte ograniczenie rozmowy z AI. Długie prompty, dokumenty i rozmowy są obsługiwane przez limity tokenów, a nie przez ludzkie czytanie albo pamięć.

## Dlaczego to ważne

Tokeny wpływają na to, ile informacji można umieścić w żądaniu, jaki może być koszt odpowiedzi i jak szybko rozmowa zbliża się do limitu kontekstu. Wpływają też na oczekiwania użytkownika. Człowiek może mieć poczucie, że system czyta cały dokument w zwykłym sensie, podczas gdy model działa na technicznej reprezentacji wejścia.

Rozumienie tokenów pomaga lepiej organizować pracę z AI: dzielić dokumenty, streszczać materiał, ustawiać punkty kontroli i sprawdzać odpowiedzi.

## Perspektywa człowiek-AI

Token łączy warstwę techniczną z doświadczeniem psychologicznym. Interfejs może przypominać rozmowę, ale system działa w granicach jednostek, których użytkownik zwykle nie widzi. Ta różnica może prowadzić do błędnej pewności, że model uwzględnił wszystko, co zostało podane.

Dla Prompted Psyche token jest pojęciem podstawowym, bo pomaga mówić o kontekście, kosztach, odpowiedzi modelu i granicach tego, co użytkownicy nazywają "pamięcią".

## Powiązane pojęcia

- [AI literacy](/pl/concepts/ai-literacy/)
- [LLM (duży model językowy)](/pl/concepts/llm/)
- [Context window](/pl/concepts/context-window/)
- [Model output](/pl/concepts/model-output/)
- [Human-AI Interaction](/pl/concepts/human-ai-interaction/)

## Źródła i kontekst

- OpenAI. (n.d.). *Key concepts*. OpenAI API documentation. Retrieved July 2, 2026, from https://developers.openai.com/api/docs/concepts
- OpenAI. (n.d.). *What are tokens and how to count them?* OpenAI Help Center. Retrieved July 2, 2026, from https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them
