# Lobby Obywatelskie — strona

Statyczna strona w Astro. Opublikowana za darmo na **GitHub Pages**:
**https://kierepka.github.io/lobby-obywatelskie/**

## Rozwój lokalny
- `npm install`
- `npm run dev` — podgląd na http://localhost:4321

## Dodawanie aktualności
Dodaj plik `.md` w `src/content/aktualnosci/` z frontmatter:
`title`, `date` (RRRR-MM-DD), `description`. Po `git push` strona zaktualizuje się sama.

## Publikacja (GitHub Pages)
Automatyczna: każdy push do gałęzi `main` uruchamia workflow
`.github/workflows/deploy.yml` (build + deploy). Strona działa w podkatalogu
`/lobby-obywatelskie`, dlatego w `astro.config.mjs` ustawiony jest `base`.

## Wdrożenie pod własną domeną (np. OVH, w korzeniu)
Zbuduj bez podkatalogu i wgraj `dist/` na hosting:
```
BASE=/ SITE=https://lobbyobywatelskie.pl npm run build
```
Następnie wgraj zawartość `dist/` do `www/` przez FTP/SFTP.

## Obrazek hero
Hero używa `public/img/hero.png` (ilustracja obywateli na tle Warszawy).
Jeśli pliku brak, sekcja hero pokazuje sam tekst (obrazek chowa się automatycznie).
