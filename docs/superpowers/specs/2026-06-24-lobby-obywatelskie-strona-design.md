# Lobby Obywatelskie — nowa strona (design)

**Data:** 2026-06-24
**Status:** zatwierdzony do planowania

## Cel

Zastąpić obecną stronę WordPress + Kubio (lobbyobywatelskie.pl) nowoczesną,
szybką, statyczną stroną, którą da się hostować na **najtańszym planie OVH**
(hosting współdzielony „Perso"/„Start" — pliki statyczne + PHP/MySQL,
**bez Node.js**).

## Decyzje (zatwierdzone)

- **Zakres:** strona wyłącznie informacyjna (statyczna). Bez logowania,
  bez panelu członka, bez głosowań online, bez bazy danych.
- **Technologia:** **Astro** + **Markdown** (Content Collections).
  Build lokalny → statyczny `dist/` wgrywany na OVH przez FTP/SFTP.
- **Design:** świeży, nowoczesny, obywatelski — czysta typografia, wysoki
  kontrast, w pełni responsywny (mobile-first), dostępność (WCAG AA),
  cel Lighthouse ~100.
- **Treści:** przeniesione z obecnej strony jako punkt startowy
  (Manifest, zasady, kontakt). Dokładny tekst Manifestu do skopiowania
  z panelu WP na etapie wdrożenia (renderowany JS, nie da się pobrać automatem).
- **Formularz:** linki `mailto:` + lista adresów e-mail. Zero backendu,
  zero zależności zewnętrznych.

## Architektura

- Generator stron statycznych **Astro**, output `static`.
- Brak runtime serwerowego, brak bazy danych.
- Treść bloga/aktualności w plikach `.md` walidowanych przez Astro
  Content Collections (frontmatter: `title`, `date`, `description`, `draft`).
- Wdrożenie: `npm run build` → wgranie zawartości `dist/` do katalogu
  `www/` na OVH (FTP/SFTP).

## Struktura stron

| Ścieżka | Zawartość |
|---|---|
| `/` | Hero („Razem możemy więcej"), opis idei demokracji bezpośredniej, CTA „Dołącz", najnowsze aktualności, info o spotkaniach (środy 21:00) |
| `/manifest` | Manifest i zasady: zarządzanie (1 osoba = 1 głos, większość), członkostwo (rekomendacja 4 członków, składka 12 zł/rok), procedura głosowań (3 podpisy inicjują, 90 dni na zbiórkę, 7 dni dyskusji, 3 dni referendum, głosowanie tajne) |
| `/aktualnosci` | Lista wpisów z Markdown |
| `/aktualnosci/[slug]` | Pojedynczy wpis |
| `/kontakt` | Adresy e-mail (kontakt@, wspolpraca@, media@, zgloszenia@, administracja@, pytania@ lobbyobywatelskie.pl), kanały (YouTube, WhatsApp), CTA zapisu przez mailto |

## Struktura katalogów

```
src/
  pages/
    index.astro
    manifest.astro
    kontakt.astro
    aktualnosci/
      index.astro
      [...slug].astro
  content/
    aktualnosci/        (*.md — wpisy)
    config.ts           (schema Content Collections)
  layouts/
    BaseLayout.astro
  components/
    Header.astro
    Footer.astro
    Hero.astro
    NewsCard.astro
  styles/
    global.css
public/
  favicon, logo, obrazy
astro.config.mjs
package.json
```

## Komponenty (jednostki o jednej odpowiedzialności)

- **BaseLayout** — wspólny szkielet HTML, meta, `<head>`, Header + Footer.
- **Header** — logo + nawigacja (Strona główna, Manifest, Aktualności, Kontakt), responsywne menu.
- **Footer** — kontakt skrótowy, linki do kanałów, copyright.
- **Hero** — hasło + CTA na stronie głównej.
- **NewsCard** — kafelek wpisu (tytuł, data, zajawka, link).

## Dostępność i wydajność

- Semantyczny HTML, kontrast WCAG AA, nawigacja klawiaturą, alt-y.
- Minimum JS (tylko ewentualne menu mobilne).
- Obrazy zoptymalizowane (Astro `<Image>` / WebP).

## Poza zakresem (YAGNI)

- Logowanie, panel członka, głosowania online, składki online.
- Baza danych, backend PHP.
- CMS (treść edytowana w Markdown w repo).

## Wdrożenie na OVH

1. `npm install` && `npm run build` lokalnie.
2. Wgranie zawartości `dist/` do `www/` przez FTP/SFTP (FileZilla / OVH).
3. Domena lobbyobywatelskie.pl wskazana na hosting w panelu OVH.
4. (Opcjonalnie) plik `.htaccess` dla ładnych URL/przekierowań HTTPS.
