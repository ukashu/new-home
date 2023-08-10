[![eng](https://img.shields.io/badge/lang-eng-blue.svg)](https://github.com/ukashu/new-home/blob/main/README.md)

<div align="center">
  <img src="./nh_banner_rounded.svg" alt="New Home" width="60%" height="auto"/>
</div>

## Opis

Rozszerzenie Chromium zastępujące domyślną nową kartę przeglądarki niestandardową kartą skoncentrowaną na produktywności.

## Funkcje

<ul>
  <li>monitorowanie nawyków</li>
  <li>monitorowanie zadań</li>
  <li>integracja Spotify API -> obecnie odtwarzany utwór</li>
  <li>integracja Google Calendar API -> obecne zadanie</li>
  <li>codzienna stoicka fraza ze <a href="https://github.com/benhoneywill/stoic-quotes">stoic quotes API</a></li>
  <li>własne skróty stron</li>
  <li>monitorowanie czasu używania stron</li>
</ul>

## Tech stack

To jest projekt napisany za pomocą [Plasmo](https://docs.plasmo.com/) i [`plasmo init`](https://www.npmjs.com/package/plasmo).

<ul>
  <li>TypeScript</li>
  <li>React</li>
  <li><a href="https://docs.plasmo.com/">Plasmo</a></li>
  <li>Tailwind</li>
  <li>Google Calendar API</li>
  <li>Spotify Web API</li>
</ul>

## Wymagania

<ul>
  <li>Node >= 18</li>
  <li>npm</li>
  <li>przeglądarka Chromium</li>
  <li>Aplikacja zarejestrowana w Google Console z aktywowanym dostępem do API Kalendarza Google</li>
  <li>Aplikacja zarejestrowana w <a href="https://developer.spotify.com/">Spotify for Developers</a></li>
</ul>

Możesz uruchomić rozszerzenie bez rejestracji w Google Console i Spotify for Developers – będzie wtedy działać bez funkcji Kalendarza Google i Spotify API.

## Instalacja

1. Sklonuj to repozytorium

2. Zainstaluj zależności projektu:

```bash
pnpm install
# or
npm install
```

3. Utwórz zmienne środowiskowe:

```bash
# .env
PLASMO_PUBLIC_GOOGLE_API_KEY='[Twój klucz Google API]'
PLASMO_PUBLIC_SPOTIFY_CLIENT_ID='[CLIENT ID aplikacji Spotify]'
```

4. Wygeneruj build produkcyjny:

```bash
pnpm build
# or
npm run build
```

Lub uruchom serwer deweloperski jeżeli chcesz edytować kod aplikacji:

```bash
pnpm dev
# or
npm run dev
```

Otwórz przeglądarkę i włącz tryb developera w ustawieniach rozszerzeń Chrome. Załaduj odpowiedni build. Na przykład, jeśli tworzysz dla przeglądarki Chrome, używając manifestu v3, użyj: `build/chrome-mv3-dev`.

Aby uzyskać dalsze wskazówki, odwiedź [dokumentację Plasmo](https://docs.plasmo.com/)

## Używanie

Rozszerzenie zastąpi domyślną nową kartę przeglądarki niestandardową stroną. Rozpocznie obliczanie czasu spędzonego na różnych domenach i pokaże dzisiejszą stoicką frazę. Aby dodać nawyki i zadania do monitorowania, przejdź do opcji rozszerzenia. Możesz także dodać skróty, które pojawią się na nowej karcie. Aby wyświetlić favicon stron internetowych trzeba wybrać odpowiedni format adresu URL (w większości przypadków jest to `https://www.website.com` lub `https://website.com`). Możesz dodawać zadania do trybu `WORK` lub `LIFE` i zmieniać tryby w oknie popup rozszerzenia.
