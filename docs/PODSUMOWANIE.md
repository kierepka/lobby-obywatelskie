# Podsumowanie wykonanych prac — strona Lobby Obywatelskie

**Adres na żywo:** https://kierepka.github.io/lobby-obywatelskie/
**Repozytorium:** https://github.com/kierepka/lobby-obywatelskie
**Data:** czerwiec 2026

## Cel
Zastąpienie starej strony WordPress (Kubio) nowoczesną, szybką, statyczną
witryną możliwą do hostowania za darmo (GitHub Pages) lub na najtańszym
hostingu OVH.

## Technologia
- **Astro** (statyczny output, brak backendu i bazy danych).
- Treści aktualności w **Markdown** (Astro Content Collections).
- Typografia: **Archivo** + **Source Serif 4** + **IBM Plex Mono**,
  **self-hostowane** lokalnie (woff2, subset latin-ext) — brak Google Fonts CDN.
- Czysty CSS, minimum JavaScript (tylko menu mobilne).

## Zrealizowane prace

### Budowa i projekt
- Pełna struktura strony: Start, Manifest, Aktualności (lista + wpisy),
  Kontakt, 404, Polityka prywatności, Deklaracja dostępności.
- Świeży, obywatelski design (paleta biało-błękitno-czerwona, sekcja hero,
  karty aktualności, sekcje „jak to działa", pasek z manifestem).
- Hero z dostarczoną ilustracją (obywatele z flagami + panorama Warszawy).
- Nagłówek z logo (znak + napis spójny z identyfikacją), sticky, responsywny.

### Prawdziwe dane
- Logo pobrane z oryginalnej strony (wycięty znak heksagonu na jasny nagłówek).
- Treści Manifestu i artykuł „Dlaczego tylko Szwajcaria…" pobrane z WordPress
  REST API starej strony; pełna, aktualna treść Manifestu.
- Linki: YouTube, WhatsApp oraz **otwarte spotkania**
  (https://rozmowy.wikikracja.pl/otwarte) w stopce, na stronie głównej i w Kontakcie.
- Adresy e-mail kontaktowe (kontakt@, współpraca@, media@, zgłoszenia@,
  administracja@, pytania@).

### Dostępność i zgodność (WCAG / UE)
- Łącze „Przejdź do treści", semantyczne landmarki, `aria-current`, opisy alt.
- Widoczny fokus klawiatury, poszanowanie `prefers-reduced-motion`.
- Kontrast tekstu na poziomie WCAG **AA/AAA** (zmierzony).
- **Self-hosting fontów** → brak przesyłania IP do Google (zgodność z RODO).
- Brak cookies i narzędzi śledzących → brak potrzeby banera cookie.
- Strony: Polityka prywatności (RODO) i Deklaracja dostępności.

### Publikacja
- Repozytorium GitHub + automatyczny deploy przez GitHub Actions
  (`.github/workflows/deploy.yml`) — każdy push do `main` aktualizuje stronę.
- Konfiguracja `base` dla podkatalogu; helper `src/lib/site.ts` (`url()`, `asset()`)
  zapewnia poprawne linki i zasoby.
- Build pod własną domenę/OVH: `BASE=/ SITE=https://lobbyobywatelskie.pl npm run build`.

### Poprawki
- Logo czytelne na jasnym nagłówku, napis spójny z logo (bez podkreślenia).
- Odstęp nad kartą aktualności (linia nagłówka nie nachodzi na ramkę).
- Korekta odmiany w Manifeście („jako podstawę relacji").

## Możliwe kolejne kroki
- Podpięcie domeny **lobbyobywatelskie.pl** (custom domain + DNS).
- Logo hero jako wektor (SVG) z prawdziwym tekstem zamiast grafiki rastrowej.
- Przełącznik języka PL/EN.
