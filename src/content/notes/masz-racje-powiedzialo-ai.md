---
title: "„Masz rację” — powiedziało AI. Problem w tym, że znało tylko twoją wersję"
description: "Gdy chatbot widzi tylko jedną stronę konfliktu, wspierająca odpowiedź może zabrzmieć jak niezależny werdykt. Co badania mówią o potakiwaniu AI, odpowiedzialności i naprawie relacji."
publishedAt: 2026-07-18
draft: false
tags:
  - AI i relacje
  - konflikt
  - potakiwanie modelu
  - cyberpsychologia
  - Human-AI Interaction
author: "Feliks Mamczur"
context: "Notatka badawcza"
lang: "pl"
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

**AI może pomóc uporządkować konflikt. Problem zaczyna się wtedy, gdy odpowiedź zbudowana z naszej wersji wydarzeń wraca do nas jak bezstronny werdykt.**

Wyobraź sobie prostą sytuację. Po trudnej rozmowie - albo jeszcze w jej trakcie - wklejasz do chatbota kolejne wiadomości i opisujesz, co się wydarzyło. Tak może wyglądać konflikt w parze prowadzony częściowo na komunikatorze: odpowiadasz drugiej osobie, a równolegle pytasz AI, jak rozumieć jej słowa. Piszesz, że zignorowała twoje argumenty, przekroczyła granicę i prawdopodobnie próbowała tobą manipulować. Pytasz: „Czy mam rację, że to było nie w porządku?”.

Odpowiedź jest spokojna, uporządkowana i wspierająca. Model nazywa zachowanie drugiej osoby, wyjaśnia możliwy mechanizm i podpowiada, co zrobić dalej. Czytasz ją jak opinię kogoś z zewnątrz. Chatbot staje się w praktyce niewidocznym konsultantem jednej strony sporu.

Tyle że ten „ktoś z zewnątrz” zna wyłącznie materiał, który mu podałeś.

## Model zna opis, nie konflikt

AI nie było świadkiem rozmowy. Nie zna wiadomości, których nie wkleiłeś, tonu głosu, wcześniejszych ustaleń ani tego, jak sytuację opisałaby druga osoba. Nie wie też, które szczegóły pominąłeś celowo, a których po prostu nie pamiętasz. Odpowiada na tekst i kontekst dostępny w rozmowie.

To nie znaczy, że twoja wersja jest fałszywa. W konflikcie ktoś może rzeczywiście kłamać, poniżać, grozić albo naruszać granice. Nie każda sytuacja wymaga symetrycznego rozłożenia winy. Chodzi o coś prostszego: model nie ma niezależnego dostępu do zdarzenia, więc jego pewność nie powinna być większa niż jakość i kompletność materiału.

Istniejąca notatka Prompted Psyche ujmuje tę granicę krótko: [model widzi tekst, a nie całą relację](/pl/notes/model-widzi-tekst-nie-cala-relacje/). W konflikcie ma to szczególne znaczenie, bo opis rzadko jest neutralnym protokołem. Jest wyborem faktów, wspomnień, ocen i słów dokonanym przez osobę, która nadal coś czuje i próbuje zrozumieć sytuację.

## Gdy konflikt dzieje się na ekranie

W relacji prowadzonej częściowo online luka informacyjna pojawia się jeszcze zanim do rozmowy dołączy AI. Tekst nie przenosi tonu głosu, mimiki ani gestu. Nadawca zna własną intencję, ale odbiorca musi odtworzyć ją z zapisu i może odczytać neutralne zdanie jako chłodne, ironiczne albo wrogie. Nie musi to wynikać ze złej woli. Badania nad komunikacją e-mailową pokazały, że ludzie przeceniają, jak skutecznie przekazują ton i emocje bez wskazówek takich jak intonacja czy gest; autorzy wiązali tę nadmierną pewność z trudnością wyjścia poza własną perspektywę (Kruger et al., 2005).

Nie znaczy to, że komunikacja tekstowa sama w sobie psuje relacje. W eksperymencie z 43 parami pozytywne zachowania podczas konfliktu były rzadsze w rozmowie tekstowej niż twarzą w twarz. Nie stwierdzono natomiast różnic w postępie rozwiązania konfliktu, negatywnych zachowaniach ani pozytywnych i negatywnych emocjach (Ruppel et al., 2021). Wniosek jest węższy: ekran zmienia zestaw dostępnych sygnałów i zostawia więcej miejsca na interpretację.

Kiedy wklejasz taki fragment do AI, model otrzymuje dwa poziomy selekcji naraz: ograniczony zapis rozmowy oraz twoją interpretację tego, co druga osoba czuła, chciała lub próbowała zrobić. Jeśli przejmie ramę pytania, może potwierdzić twoją ocenę, zinterpretować niejasność na twoją korzyść, przypisać drugiej stronie intencję, a później poprzeć decyzję, którą już rozważasz. Nie dzieje się tak w każdej rozmowie, ale badania wskazują, że potakiwanie pojawia się w wielu modelach i typach zadań (Perez et al., 2023; Sharma et al., 2024; Cheng et al., 2026a).

## Czym jest potakiwanie modelu

[Potakiwanie modelu](/pl/concepts/potakiwanie-modelu/) oznacza, że system nadmiernie dopasowuje odpowiedź do stanowiska, oczekiwań albo obrazu siebie przedstawionego przez użytkownika. Zamiast sprawdzić założenie, może je przyjąć. Zamiast zaznaczyć brak danych, rozwija dostarczoną interpretację. Nie dlatego, że chce zyskać aprobatę. Model nie ma takich intencji. Jest to wzorzec generowanej odpowiedzi związany między innymi z treningiem na ludzkich preferencjach, instrukcjami i projektem interakcji (Perez et al., 2023; Sharma et al., 2024).

Problem nie sprowadza się do pochlebstw. W otwartych rozmowach potakiwanie może polegać na przyjęciu bez sprawdzenia ramy pytania, moralnym poparciu stanowiska albo walidacji, która wykracza poza to, co wynika z danych (Cheng et al., 2026a). Oficjalne materiały OpenAI pokazują, że producenci rozpoznają ten problem także na poziomie produktu. W 2025 roku firma wycofała aktualizację GPT-4o, którą opisała jako nadmiernie wspierającą i ugodową, a później wskazała między innymi na podsycanie złości i zachęcanie do impulsywnych działań jako niepożądane zachowania tej wersji (OpenAI, 2025a, 2025b). To opis konkretnego incydentu, nie dowód na zachowanie wszystkich obecnych modeli.

## Co pokazało badanie w „Science”

Najbardziej bezpośrednich danych dostarcza badanie Myry Cheng i współpracowników opublikowane w 2026 roku w „Science”. Autorzy przeanalizowali 11 wiodących modeli. W badanych zbiorach odpowiedzi AI potwierdzały działania użytkowników średnio o 49% częściej niż odpowiedzi ludzi, także w przypadkach obejmujących oszustwo, działania nielegalne lub inne szkody (Cheng et al., 2026b).

Następnie badacze przeprowadzili trzy prerejestrowane eksperymenty z udziałem 2405 osób. Obejmowały one scenariusze oraz rozmowę na żywo o prawdziwym, wcześniejszym konflikcie uczestnika. Już pojedyncza interakcja z potakującym AI zwiększała przekonanie uczestników, że to oni mają rację. Jednocześnie zmniejszała deklarowaną gotowość do wzięcia odpowiedzialności i podjęcia działań naprawczych. Mimo tych skutków uczestnicy częściej ufali potakującym odpowiedziom i je preferowali.

Badania, które budują ten argument, można zestawić tak:

<figure class="research-table" data-qa="ai-sycophancy-research-table">
  <div class="research-table__scroll">
    <table>
      <caption>Najważniejsze wyniki i ich ograniczenia</caption>
      <thead>
        <tr><th scope="col">Badanie</th><th scope="col">Zakres</th><th scope="col">Najważniejszy wynik</th><th scope="col">Ważne ograniczenie</th></tr>
      </thead>
      <tbody>
        <tr><td>Kruger et al. (2005)</td><td>5 eksperymentów nad przekazywaniem tonu i emocji przez e-mail</td><td>Nadawcy przeceniali, jak dobrze odbiorcy odczytają zamierzony ton; nadmierną pewność powiązano z trudnością wyjścia poza własną perspektywę.</td><td>Badanie dotyczyło e-maila, nie AI ani konfliktów w parach.</td></tr>
        <tr><td>Ruppel et al. (2021)</td><td>43 pary losowo przydzielone do rozmowy konfliktowej twarzą w twarz albo przez komunikator tekstowy</td><td>W tekście było mniej pozytywnych zachowań podczas konfliktu; nie wykazano różnic w kilku innych miarach.</td><td>Mała próba i konkretny eksperyment; wynik nie oznacza, że tekst zawsze pogarsza konflikt.</td></tr>
        <tr><td>Cheng et al. (2026) - analiza modeli</td><td>11 wiodących modeli; odpowiedzi AI porównane z odpowiedziami ludzi</td><td>AI potwierdzało działania użytkowników średnio o 49% częściej.</td><td>Nie oznacza to 49% w każdej rozmowie ani identycznego zachowania wszystkich modeli.</td></tr>
        <tr><td>Cheng et al. (2026) - eksperymenty</td><td>3 prerejestrowane eksperymenty; łącznie N = 2405</td><td>Pojedyncza interakcja z potakującym AI zwiększała przekonanie o własnej racji i zmniejszała gotowość do odpowiedzialności oraz naprawy; potakujące modele budziły jednocześnie większe zaufanie i były preferowane.</td><td>Mierzono bezpośrednie oceny i intencje w określonych warunkach, nie trwałą zmianę relacji.</td></tr>
      </tbody>
    </table>
  </div>
  <figcaption>Tabela łączy badania nad komunikacją tekstową z bezpośrednimi badaniami potakiwania AI. Wyniki dotyczą odmiennych metod i nie tworzą jednego wspólnego efektu.</figcaption>
</figure>

To ważny wynik, ale wymaga precyzji. Badanie mierzyło oceny, intencje i preferencje w określonych warunkach. Nie pokazuje, że jedna rozmowa trwale zmienia relację ani że każdy użytkownik zareaguje tak samo. Nie dowodzi też, że każda odpowiedź wspierająca jest błędna. Pokazuje natomiast, że w badanych sytuacjach sposób odpowiedzi modelu wpływał na ocenę własnej racji i gotowość do naprawienia konfliktu.

## Kiedy własna wersja wraca jako „druga opinia”

Pętla może wyglądać tak:

konflikt -> w trakcie lub po nim wybierasz fragmenty i opisujesz własną perspektywę -> pytanie zawiera założenia o winie lub intencji -> model odpowiada na przygotowaną narrację -> potakująca odpowiedź brzmi jak niezależna druga opinia -> rośnie pewność własnej racji -> maleje gotowość do sprawdzenia alternatywy -> łatwiej o eskalację albo niepotrzebny ruch.

Określenie „niezależna druga opinia” jest tu interpretacją, nie nazwą zwalidowanego mechanizmu. Dobrze jednak opisuje poznawczą pułapkę: źródłem odpowiedzi nadal jest materiał wybrany przez użytkownika, ale płynny język, struktura argumentu i ton pewności mogą przesłonić ten fakt.

Psychologia zna zjawiska, które mogą wzmacniać taki efekt. Ludzie potrafią szukać i przyjmować informacje zgodne z wcześniejszym stanowiskiem, zwłaszcza gdy w grę wchodzi ochrona ważnego obrazu siebie. Jednocześnie nie jesteśmy skazani na potwierdzanie własnych przekonań. Motywacja do trafnej oceny może skłaniać do szukania informacji niewygodnych, a ludzie często także zbyt mocno trzymają się własnej opinii i odrzucają rady (Hart et al., 2009; Kunda, 1990; Yaniv, 2004). Chatbot nie tworzy tych tendencji od zera. Może jednak dostarczyć im wyjątkowo szybkiego i dobrze napisanego uzasadnienia.

## Cztery różne rzeczy w jednej odpowiedzi

Najważniejsze jest rozdzielenie czterech poziomów:

1. **Walidacja emocji:** „Rozumiem, dlaczego możesz czuć złość”.
2. **Potwierdzenie faktów:** „Ta osoba rzeczywiście zrobiła X”.
3. **Interpretacja intencji:** „Ta osoba chciała tobą manipulować”.
4. **Rekomendacja działania:** „Zerwij kontakt, postaw ultimatum albo zgłoś sprawę”.

Pierwsze zdanie może być rozsądne, nawet gdy model nie potrafi potwierdzić kolejnych. Emocja może być zrozumiała przy danym sposobie postrzegania sytuacji. To nie ustala jeszcze, co się wydarzyło, dlaczego druga osoba tak postąpiła ani które działanie będzie proporcjonalne.

Badania nad walidacją w relacjach pokazują, że zauważenie czyjegoś doświadczenia może obniżać negatywne emocje w niektórych kontekstach (Edlund et al., 2015). Wsparcie nie jest więc problemem samo w sobie. Ryzyko pojawia się wtedy, gdy rozmowa bez ostrzeżenia przesuwa się od „twoja reakcja jest zrozumiała” do „twoja interpretacja jest prawdziwa”, a potem do „powinieneś zrobić coś nieodwracalnego”.

## Kiedy poparcie pomaga, a kiedy eskaluje

AI może pomóc nazwać krzywdę, uporządkować chaotyczny opis, zobaczyć wzorzec albo przygotować spokojniejszą wiadomość. Osoba, która długo umniejszała znaczenie własnego doświadczenia, może potrzebować usłyszeć, że jej dyskomfort ma znaczenie. Czasem szybkie szukanie pomocy, przerwanie kontaktu lub uruchomienie procedury jest uzasadnione. Pytanie o inne perspektywy nie może służyć tworzeniu fałszywej równowagi w sytuacji przemocy, groźby, przymusu, dyskryminacji czy bezpośredniego zagrożenia.

Jest też drugi kontrargument: użytkownik może świadomie chcieć potwierdzenia, a nie analizy. Wtedy model nie jest jedynym źródłem problemu. Tyle że dobry system nie powinien przedstawiać poparcia jako pewnego osądu, jeśli materiał jest niepełny. Powinien umieć powiedzieć: „Na podstawie tego opisu twoja reakcja jest zrozumiała, ale nie mogę ustalić intencji drugiej osoby”.

Przeciwieństwem potakiwania nie jest automatyczne zaprzeczanie. Model, który zawsze szuka winy użytkownika albo na siłę wyrównuje racje, byłby równie mało użyteczny. Wsparcie powinno być proporcjonalne do tego, co rzeczywiście wiadomo, do stawki sytuacji i odwracalności decyzji.

## Zanim potraktujesz odpowiedź AI jako werdykt

- Jakie fakty rzeczywiście podałem?
- Czy wkleiłem pełną sekwencję, czy tylko wybrane fragmenty?
- Co jest moją interpretacją tonu, emocji lub intencji?
- Jakich informacji model nie ma?
- Czy poprosiłem o alternatywne wyjaśnienia?
- Czy proponowane działanie jest proporcjonalne?
- Czy jest odwracalne?
- Co model odpowiedziałby, gdyby dostał opis drugiej strony?
- Czy potrzebuję potwierdzenia, czy analizy?

Pomocne mogą być też wpisy Practice: [Jak oddzielić fakty od interpretacji](/pl/practice/jak-oddzielic-fakty-od-interpretacji/), [Jak poprosić AI o kontrargument](/pl/practice/jak-poprosic-ai-o-kontrargument/) i [Jak analizować wiadomość bez diagnozowania człowieka](/pl/practice/jak-analizowac-wiadomosc-bez-diagnozowania-czlowieka/).

AI może być dobrym narzędziem do uporządkowania konfliktu, ale nie staje się przez to jego bezstronnym świadkiem. Odpowiedź zbudowana z jednej narracji może pomóc ją zobaczyć wyraźniej. Nie powinna jednak udawać dowodu, że ta narracja jest kompletna. Zanim użyjemy płynnego poparcia jako podstawy decyzji, warto sprawdzić, czy model naprawdę wniósł nową informację, czy tylko oddał nam naszą wersję w bardziej przekonującej formie.

## Bibliografia

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
