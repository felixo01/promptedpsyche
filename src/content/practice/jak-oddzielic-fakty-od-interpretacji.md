---
title: "Jak oddzielić fakty od interpretacji"
description: "Praktyka rozdzielania tego, co widać w materiale, od interpretacji, założeń i pytań, zanim powstanie wniosek albo decyzja."
publishedAt: 2026-07-03
draft: true
tags:
  - decyzje
  - interpretacja
  - AI literacy
  - odpowiedzialność
author: "Feliks Mamczur"
readingTime: "5 min czytania"
lang: "pl"
translationKey: "separate-facts-from-interpretations"
type: "practice"
category: "Praktyka"
---

W pracy z AI uporządkowane streszczenie może wyglądać jak gotowy wniosek. W jednym akapicie łatwo mieszają się fakty, interpretacje, założenia i rekomendacje. Ta praktyka pomaga zatrzymać ten skrót, zanim pierwsze odczytanie sytuacji zamieni się w decyzję.

Celem jest mapa materiału przed decyzją, nie decyzja podjęta przez model. AI może pomóc rozdzielić warstwy informacji, ale człowiek nadal odpowiada za ocenę, kontekst i dalszy krok. Emocje też są informacją o sytuacji, ale nie są tym samym co fakt widoczny w materiale.

## Kiedy to pomaga

- Przed decyzją opartą na mailach, notatkach, raportach albo rozmowach.
- Gdy materiał jest chaotyczny, emocjonalny albo obciąża poznawczo.
- Gdy chcesz przygotować pytania do zespołu, klienta albo eksperta.
- Gdy odpowiedź AI zawiera wnioski, ale nie pokazuje drogi dojścia.

## O co poprosić model

Poproś model o tabelę albo listę warstw. Najważniejsze rozróżnienie: co można wskazać w materiale, co jest odczytaniem, co jest założeniem i jakie pytanie trzeba zadać przed decyzją.

```text
Pomóż mi uporządkować poniższy materiał przed podjęciem decyzji.

Nie podejmuj decyzji za mnie. Nie diagnozuj ludzi i nie zgaduj ukrytych intencji.

Podziel materiał na 5 kolumn:

1. Fakt: co można zacytować, zaobserwować albo wskazać w materiale.
2. Interpretacja: co myślę, że to może znaczyć.
3. Założenie: co dodaję bez wystarczającego potwierdzenia.
4. Alternatywne odczytanie: jaka inna interpretacja też pasuje do tego samego faktu.
5. Pytanie: czego trzeba się dowiedzieć przed dalszym krokiem.

Następnie wskaż, które wnioski byłyby przedwczesne na podstawie tego materiału. Jeśli zaproponujesz możliwe kierunki działania, opisz je jako opcje, nie jako decyzję. Nie pomijaj informacji, które nie pasują do najwygodniejszego wniosku.

Materiał:
[wklej materiał]
```

## Co sprawdzić samodzielnie

- Czy "fakt" naprawdę da się wskazać w materiale.
- Czy ta sama informacja może wspierać więcej niż jedną interpretację.
- Czy założenia nie pochodzą głównie z napięcia, zmęczenia albo wcześniejszej historii.
- Czy brakuje głosu osoby, zespołu albo źródła, którego dotyczy sprawa.
- Czy emocja pomaga zauważyć stawkę, ale nie zastępuje sprawdzenia sytuacji.

## Co może pójść źle

- Model może błędnie uznać interpretację za fakt.
- Uporządkowana tabela może stworzyć wrażenie większej pewności niż istnieje.
- Użytkownik może użyć ćwiczenia do obrony decyzji podjętej wcześniej.
- Emocje mogą zostać zignorowane zamiast nazwane i oddzielone od faktów.
- W sprawach prawnych, HR, zdrowia, bezpieczeństwa, przemocy albo wysokiego ryzyka potrzebne są właściwe osoby, procedury i źródła.

## Lepszy sposób użycia odpowiedzi

W notatce pojawia się zdanie: "Klient jest niezadowolony i projekt jest zagrożony". Lepsza analiza nie zaczyna od decyzji, ale od rozdzielenia warstw. Fakt może brzmieć: klient nie odpowiedział od pięciu dni albo napisał, że brakuje mu materiałów. Interpretacja: klient jest niezadowolony. Założenie: brak odpowiedzi oznacza ryzyko projektu. Pytanie: czy klient zgłosił problem, czego oczekuje i jaki termin jest teraz kluczowy?

Ten prompt wspiera [wspomaganie decyzji](/pl/concepts/wspomaganie-decyzji/) bez przenoszenia decyzji na model. Użytkownik dostaje uporządkowanie materiału, a nie gotowy wyrok. Pomaga też utrzymać [skalibrowane zaufanie](/pl/concepts/calibrated-trust/): [odpowiedź modelu](/pl/concepts/model-output/) może być użyteczną mapą, ale nie zastępuje sprawdzenia faktów, pytań do ludzi ani odpowiedzialności za dalszy krok.

## Krótka zasada

Najpierw oddziel to, co widać, od tego, co to może znaczyć. Dopiero potem decyduj, jakie pytanie albo działanie ma sens.

## Powiązane pojęcia

- [Wspomaganie decyzji](/pl/concepts/wspomaganie-decyzji/)
- [Skalibrowane zaufanie](/pl/concepts/calibrated-trust/)
- [Sprawczość człowieka](/pl/concepts/sprawczosc-czlowieka/)
- [Epistemic vigilance (czujność epistemiczna)](/pl/concepts/epistemic-vigilance/)
- [Odpowiedź modelu](/pl/concepts/model-output/)

## Dalsza lektura

- [AI nie czyta ludzi. Pomaga uporządkować sytuację.](/pl/articles/ai-nie-czyta-ludzi-pomaga-uporzadkowac-sytuacje/)
- [Dobre streszczenie to jeszcze nie dobra decyzja](/pl/notes/dobre-streszczenie-to-jeszcze-nie-dobra-decyzja/)
- [Model widzi tekst, a nie całą relację](/pl/notes/model-widzi-tekst-nie-cala-relacje/)
