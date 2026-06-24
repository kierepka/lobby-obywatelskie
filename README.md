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
