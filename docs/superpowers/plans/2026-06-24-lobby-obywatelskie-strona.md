# Lobby Obywatelskie — strona statyczna (Implementation Plan)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Zbudować szybką, statyczną stronę Lobby Obywatelskie w Astro + Markdown, gotową do wgrania na najtańszy hosting OVH.

**Architecture:** Astro w trybie `static` generuje czysty HTML/CSS do `dist/`. Treść aktualności w Markdown przez Content Collections. Brak backendu i bazy danych. Wdrożenie = wgranie `dist/` na OVH przez FTP.

**Tech Stack:** Astro 4+, Markdown (Content Collections), zwykły CSS (global.css), Node 18+ tylko lokalnie do builda.

## Global Constraints

- Output statyczny (`output: 'static'`) — żadnego runtime serwerowego ani Node na OVH.
- Minimum JS — JS tylko dla menu mobilnego.
- Język treści: polski. Domena docelowa: lobbyobywatelskie.pl.
- Dostępność WCAG AA: semantyczny HTML, kontrast, alt-y, nawigacja klawiaturą.
- Adresy e-mail kontaktowe (verbatim): kontakt@, wspolpraca@, media@, zgloszenia@, administracja@, pytania@ lobbyobywatelskie.pl.
- Formularz = wyłącznie linki `mailto:` (brak zależności zewnętrznych).
- Nawigacja: Strona główna (`/`), Manifest (`/manifest`), Aktualności (`/aktualnosci`), Kontakt (`/kontakt`).

---

### Task 1: Inicjalizacja projektu Astro

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`

**Interfaces:**
- Produces: działający projekt Astro z komendami `npm run dev` i `npm run build`.

- [ ] **Step 1: Utwórz projekt Astro (minimalny)**

```bash
cd /Users/mateusz/GitHub/lobbyObyw
npm create astro@latest -- --template minimal --no-install --no-git --yes .
```

- [ ] **Step 2: Ustaw tryb static i stronę w astro.config.mjs**

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://lobbyobywatelskie.pl',
});
```

- [ ] **Step 3: Zainstaluj zależności**

Run: `npm install`
Expected: instalacja bez błędów, powstaje `node_modules/`.

- [ ] **Step 4: Zweryfikuj build**

Run: `npm run build`
Expected: PASS — powstaje katalog `dist/` z `index.html`.

- [ ] **Step 5: Dodaj .gitignore i zainicjuj repo**

```bash
printf "node_modules/\ndist/\n.DS_Store\n.astro/\n" > .gitignore
git init && git add -A && git commit -m "chore: inicjalizacja projektu Astro"
```

---

### Task 2: BaseLayout, globalny CSS i nawigacja

**Files:**
- Create: `src/layouts/BaseLayout.astro`, `src/components/Header.astro`, `src/components/Footer.astro`, `src/styles/global.css`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Produces: `BaseLayout` z propsami `{ title: string; description?: string }`, renderujący `<slot/>` między Header a Footer. `Header` i `Footer` bez propsów.

- [ ] **Step 1: Utwórz global.css (zmienne, typografia, reset)**

```css
/* src/styles/global.css */
:root {
  --navy: #0b2545;
  --navy-light: #13315c;
  --accent: #c1121f;
  --bg: #ffffff;
  --text: #1a1a2e;
  --muted: #5b6472;
  --max: 72rem;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  color: var(--text);
  background: var(--bg);
  line-height: 1.6;
}
a { color: var(--accent); }
.container { max-width: var(--max); margin: 0 auto; padding: 0 1.25rem; }
h1, h2, h3 { line-height: 1.2; color: var(--navy); }
.btn {
  display: inline-block; background: var(--accent); color: #fff;
  padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none;
  font-weight: 600;
}
.btn:focus-visible, a:focus-visible { outline: 3px solid var(--navy); outline-offset: 2px; }
```

- [ ] **Step 2: Utwórz Header z nawigacją i menu mobilnym**

```astro
---
// src/components/Header.astro
const links = [
  { href: '/', label: 'Strona główna' },
  { href: '/manifest', label: 'Manifest' },
  { href: '/aktualnosci', label: 'Aktualności' },
  { href: '/kontakt', label: 'Kontakt' },
];
---
<header class="site-header">
  <div class="container header-inner">
    <a href="/" class="logo">Lobby&nbsp;Obywatelskie</a>
    <button class="nav-toggle" aria-label="Menu" aria-expanded="false">☰</button>
    <nav class="nav">
      {links.map((l) => <a href={l.href}>{l.label}</a>)}
    </nav>
  </div>
</header>
<style>
  .site-header { background: var(--navy); }
  .header-inner { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.25rem; }
  .logo { color: #fff; font-weight: 700; text-decoration: none; font-size: 1.15rem; }
  .nav { display: flex; gap: 1.25rem; }
  .nav a { color: #fff; text-decoration: none; }
  .nav a:hover { text-decoration: underline; }
  .nav-toggle { display: none; background: none; border: 0; color: #fff; font-size: 1.5rem; cursor: pointer; }
  @media (max-width: 640px) {
    .nav-toggle { display: block; }
    .nav { display: none; flex-direction: column; width: 100%; padding-top: 0.75rem; }
    .nav.open { display: flex; }
    .header-inner { flex-wrap: wrap; }
  }
</style>
<script>
  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  btn?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(!!open));
  });
</script>
```

- [ ] **Step 3: Utwórz Footer**

```astro
---
// src/components/Footer.astro
---
<footer class="site-footer">
  <div class="container">
    <p>Kontakt: <a href="mailto:kontakt@lobbyobywatelskie.pl">kontakt@lobbyobywatelskie.pl</a></p>
    <p>Spotkania: środy, godz. 21:00.</p>
    <p>&copy; {new Date().getFullYear()} Lobby Obywatelskie</p>
  </div>
</footer>
<style>
  .site-footer { background: var(--navy-light); color: #fff; padding: 2rem 0; margin-top: 3rem; }
  .site-footer a { color: #fff; }
</style>
```

- [ ] **Step 4: Utwórz BaseLayout**

```astro
---
// src/layouts/BaseLayout.astro
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';
interface Props { title: string; description?: string; }
const { title, description = 'Lobby Obywatelskie — demokracja bezpośrednia. Razem możemy więcej.' } = Astro.props;
---
<!doctype html>
<html lang="pl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
  </head>
  <body>
    <Header />
    <main class="container">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 5: Tymczasowo użyj BaseLayout w index.astro i zbuduj**

```astro
---
// src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Lobby Obywatelskie">
  <h1>Lobby Obywatelskie</h1>
</BaseLayout>
```

Run: `npm run build`
Expected: PASS — `dist/index.html` zawiera tekst „Lobby Obywatelskie" oraz linki nawigacji.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: BaseLayout, Header, Footer i globalny CSS"
```

---

### Task 3: Content Collection dla aktualności + przykładowe wpisy

**Files:**
- Create: `src/content/config.ts`, `src/content/aktualnosci/2026-06-24-witamy.md`, `src/content/aktualnosci/2026-06-20-spotkania.md`

**Interfaces:**
- Produces: kolekcja `aktualnosci` ze schematem `{ title: string; date: Date; description: string; draft?: boolean }`. Konsumowana w Task 5.

- [ ] **Step 1: Zdefiniuj schemat kolekcji**

```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const aktualnosci = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { aktualnosci };
```

- [ ] **Step 2: Dodaj dwa przykładowe wpisy**

```markdown
---
title: "Witamy na nowej stronie"
date: 2026-06-24
description: "Uruchomiliśmy nową, szybszą stronę Lobby Obywatelskie."
---

Cieszymy się, że jesteś z nami. Razem możemy więcej.
```

```markdown
---
title: "Cotygodniowe spotkania"
date: 2026-06-20
description: "Spotykamy się w każdą środę o godzinie 21:00."
---

Dołącz do nas w każdą środę o 21:00. Szczegóły w zakładce Kontakt.
```

(Pierwszy plik: `2026-06-24-witamy.md`, drugi: `2026-06-20-spotkania.md`.)

- [ ] **Step 3: Zweryfikuj build**

Run: `npm run build`
Expected: PASS — brak błędów walidacji frontmatter.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: kolekcja aktualności + przykładowe wpisy"
```

---

### Task 4: Strona główna i NewsCard

**Files:**
- Create: `src/components/Hero.astro`, `src/components/NewsCard.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Produces: `NewsCard` z propsami `{ title: string; date: Date; description: string; href: string }`. Konsumowany tu i w Task 5.
- Consumes: kolekcja `aktualnosci` (Task 3).

- [ ] **Step 1: Utwórz Hero**

```astro
---
// src/components/Hero.astro
---
<section class="hero">
  <h1>Razem możemy więcej</h1>
  <p>Demokracja bezpośrednia w praktyce — to obywatele mają ostatni głos.</p>
  <a class="btn" href="/kontakt">Dołącz do nas</a>
</section>
<style>
  .hero { padding: 4rem 0 2rem; text-align: center; }
  .hero h1 { font-size: clamp(2rem, 6vw, 3.5rem); }
  .hero p { font-size: 1.25rem; color: var(--muted); max-width: 40rem; margin: 1rem auto 2rem; }
</style>
```

- [ ] **Step 2: Utwórz NewsCard**

```astro
---
// src/components/NewsCard.astro
interface Props { title: string; date: Date; description: string; href: string; }
const { title, date, description, href } = Astro.props;
const formatted = date.toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' });
---
<article class="news-card">
  <time datetime={date.toISOString()}>{formatted}</time>
  <h3><a href={href}>{title}</a></h3>
  <p>{description}</p>
</article>
<style>
  .news-card { border: 1px solid #e2e6ec; border-radius: 10px; padding: 1.25rem; }
  .news-card time { color: var(--muted); font-size: 0.9rem; }
  .news-card h3 { margin: 0.25rem 0 0.5rem; }
  .news-card a { text-decoration: none; color: var(--navy); }
  .news-card a:hover { text-decoration: underline; }
</style>
```

- [ ] **Step 3: Zbuduj stronę główną z 3 najnowszymi wpisami**

```astro
---
// src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import NewsCard from '../components/NewsCard.astro';
import { getCollection } from 'astro:content';

const posts = (await getCollection('aktualnosci', ({ data }) => !data.draft))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
  .slice(0, 3);
---
<BaseLayout title="Lobby Obywatelskie — Razem możemy więcej">
  <Hero />
  <section>
    <h2>O nas</h2>
    <p>Lobby Obywatelskie to ruch demokracji bezpośredniej. Gdy politycy,
    korporacje i media nie działają w interesie ludzi — ostatni głos należy
    do obywateli. Jedna osoba, jeden równy głos.</p>
  </section>
  <section>
    <h2>Najnowsze aktualności</h2>
    <div class="news-grid">
      {posts.map((p) => (
        <NewsCard title={p.data.title} date={p.data.date} description={p.data.description} href={`/aktualnosci/${p.id.replace(/\.md$/, '')}`} />
      ))}
    </div>
    <p><a href="/aktualnosci">Zobacz wszystkie aktualności →</a></p>
  </section>
  <style>
    .news-grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); }
    section { margin: 2.5rem 0; }
  </style>
</BaseLayout>
```

- [ ] **Step 4: Zweryfikuj build**

Run: `npm run build`
Expected: PASS — `dist/index.html` zawiera „Razem możemy więcej" i tytuły wpisów.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: strona główna z Hero i listą najnowszych aktualności"
```

---

### Task 5: Lista i strony pojedynczych aktualności

**Files:**
- Create: `src/pages/aktualnosci/index.astro`, `src/pages/aktualnosci/[...slug].astro`

**Interfaces:**
- Consumes: kolekcja `aktualnosci` (Task 3), `NewsCard` (Task 4).

- [ ] **Step 1: Utwórz listę aktualności**

```astro
---
// src/pages/aktualnosci/index.astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import NewsCard from '../../components/NewsCard.astro';
import { getCollection } from 'astro:content';

const posts = (await getCollection('aktualnosci', ({ data }) => !data.draft))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---
<BaseLayout title="Aktualności — Lobby Obywatelskie">
  <h1>Aktualności</h1>
  <div class="news-grid">
    {posts.map((p) => (
      <NewsCard title={p.data.title} date={p.data.date} description={p.data.description} href={`/aktualnosci/${p.id.replace(/\.md$/, '')}`} />
    ))}
  </div>
  <style>
    .news-grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); margin-top: 1.5rem; }
  </style>
</BaseLayout>
```

- [ ] **Step 2: Utwórz stronę pojedynczego wpisu (getStaticPaths)**

```astro
---
// src/pages/aktualnosci/[...slug].astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('aktualnosci', ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { slug: post.id.replace(/\.md$/, '') },
    props: { post },
  }));
}
const { post } = Astro.props;
const { Content } = await post.render();
const formatted = post.data.date.toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' });
---
<BaseLayout title={`${post.data.title} — Lobby Obywatelskie`} description={post.data.description}>
  <article>
    <time datetime={post.data.date.toISOString()}>{formatted}</time>
    <h1>{post.data.title}</h1>
    <Content />
    <p><a href="/aktualnosci">← Wszystkie aktualności</a></p>
  </article>
</BaseLayout>
```

- [ ] **Step 3: Zweryfikuj build**

Run: `npm run build`
Expected: PASS — w `dist/aktualnosci/` powstają `index.html` oraz podstrony wpisów (np. `2026-06-24-witamy/index.html`).

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: lista i strony pojedynczych aktualności"
```

---

### Task 6: Strona Manifest

**Files:**
- Create: `src/pages/manifest.astro`

**Interfaces:**
- Consumes: `BaseLayout` (Task 2).

- [ ] **Step 1: Utwórz stronę Manifest z zasadami**

```astro
---
// src/pages/manifest.astro
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Manifest — Lobby Obywatelskie">
  <h1>Manifest</h1>
  <p>To obywatele mają ostatni głos. Działamy razem, bo razem możemy więcej.</p>

  <h2>Zasady działania</h2>
  <ul>
    <li>Wszystkie reguły ustalane są w demokratycznym głosowaniu.</li>
    <li>Jedna osoba — jeden równy głos.</li>
    <li>Decyzje zapadają zwykłą większością.</li>
  </ul>

  <h2>Członkostwo</h2>
  <ul>
    <li>Nowy członek dołącza z rekomendacją 4 obecnych członków.</li>
    <li>Roczna składka wynosi 12 zł i jest ustalana wspólnie.</li>
  </ul>

  <h2>Procedura głosowań</h2>
  <ul>
    <li>3 podpisy inicjują proces.</li>
    <li>90 dni na zebranie podpisów.</li>
    <li>7 dni dyskusji.</li>
    <li>3 dni referendum.</li>
    <li>Głosowanie tajne z możliwością weryfikacji.</li>
  </ul>

  <p class="note">Treść do uzupełnienia pełnym tekstem Manifestu z obecnej strony.</p>
  <style>.note { color: var(--muted); font-style: italic; }</style>
</BaseLayout>
```

- [ ] **Step 2: Zweryfikuj build**

Run: `npm run build`
Expected: PASS — `dist/manifest/index.html` zawiera „Procedura głosowań".

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: strona Manifest"
```

---

### Task 7: Strona Kontakt (mailto)

**Files:**
- Create: `src/pages/kontakt.astro`

**Interfaces:**
- Consumes: `BaseLayout` (Task 2).

- [ ] **Step 1: Utwórz stronę Kontakt z adresami mailto**

```astro
---
// src/pages/kontakt.astro
import BaseLayout from '../layouts/BaseLayout.astro';
const emaile = [
  { adres: 'kontakt@lobbyobywatelskie.pl', opis: 'Kontakt ogólny (główny kanał)' },
  { adres: 'wspolpraca@lobbyobywatelskie.pl', opis: 'Współpraca' },
  { adres: 'media@lobbyobywatelskie.pl', opis: 'Media' },
  { adres: 'zgloszenia@lobbyobywatelskie.pl', opis: 'Zgłoszenia' },
  { adres: 'administracja@lobbyobywatelskie.pl', opis: 'Administracja' },
  { adres: 'pytania@lobbyobywatelskie.pl', opis: 'Pytania' },
];
---
<BaseLayout title="Kontakt — Lobby Obywatelskie">
  <h1>Kontakt</h1>
  <p>Spotykamy się w każdą środę o godzinie 21:00. Napisz do nas:</p>
  <ul class="emaile">
    {emaile.map((e) => (
      <li><a href={`mailto:${e.adres}`}>{e.adres}</a> — {e.opis}</li>
    ))}
  </ul>
  <p><a class="btn" href="mailto:kontakt@lobbyobywatelskie.pl?subject=Chc%C4%99%20do%C5%82%C4%85czy%C4%87">Chcę dołączyć</a></p>
  <style>
    .emaile { list-style: none; padding: 0; }
    .emaile li { padding: 0.4rem 0; }
  </style>
</BaseLayout>
```

- [ ] **Step 2: Zweryfikuj build**

Run: `npm run build`
Expected: PASS — `dist/kontakt/index.html` zawiera wszystkie 6 adresów e-mail.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: strona Kontakt z linkami mailto"
```

---

### Task 8: Konfiguracja wdrożenia na OVH (.htaccess + README)

**Files:**
- Create: `public/.htaccess`, `README.md`

**Interfaces:**
- Consumes: cały zbudowany `dist/`.

- [ ] **Step 1: Dodaj .htaccess (HTTPS + strona błędu)**

```apache
# public/.htaccess — kopiowany do dist/ przy buildzie
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
ErrorDocument 404 /404.html
```

- [ ] **Step 2: Dodaj prostą stronę 404**

```astro
---
// src/pages/404.astro
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Nie znaleziono — Lobby Obywatelskie">
  <h1>404 — Nie znaleziono strony</h1>
  <p><a href="/">Wróć na stronę główną</a></p>
</BaseLayout>
```

- [ ] **Step 3: Napisz README z instrukcją wdrożenia**

```markdown
# Lobby Obywatelskie — strona

Statyczna strona w Astro. Hosting: najtańszy plan OVH (FTP).

## Rozwój lokalny
- `npm install`
- `npm run dev` — podgląd na http://localhost:4321

## Dodawanie aktualności
Dodaj plik `.md` w `src/content/aktualnosci/` z frontmatter:
`title`, `date` (RRRR-MM-DD), `description`.

## Wdrożenie na OVH
1. `npm run build` — generuje katalog `dist/`.
2. Wgraj CAŁĄ zawartość `dist/` do katalogu `www/` na OVH przez FTP/SFTP
   (np. FileZilla; dane z panelu OVH).
3. W panelu OVH skieruj domenę lobbyobywatelskie.pl na ten hosting.
```

- [ ] **Step 4: Zweryfikuj build i obecność plików**

Run: `npm run build && ls dist/.htaccess dist/404.html`
Expected: PASS — oba pliki istnieją w `dist/`.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "chore: konfiguracja wdrożenia OVH (.htaccess, 404, README)"
```

---

## Self-Review

- **Pokrycie spec:** zakres statyczny (✓ wszystkie taski), Astro+Markdown (Task 1,3), struktura stron `/`,`/manifest`,`/aktualnosci`,`/aktualnosci/[slug]`,`/kontakt` (Task 4–7), komponenty BaseLayout/Header/Footer/Hero/NewsCard (Task 2,4), mailto (Task 7), dostępność (kontrast, semantyka, focus-visible, lang=pl — Task 2), wdrożenie OVH (Task 8). Brak luk.
- **Placeholdery:** każdy krok ma pełny kod i komendę. Notka „treść do uzupełnienia" na Manifeście jest świadoma (pełny tekst niedostępny automatem) — szkielet jest kompletny.
- **Spójność typów:** `NewsCard` props `{title, date, description, href}` użyte identycznie w Task 4 i 5; kolekcja `aktualnosci` ze schematem z Task 3 konsumowana z `getCollection` w Task 4 i 5; `post.id.replace(/\.md$/,'')` dla slugów spójnie.
