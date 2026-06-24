import { defineConfig } from 'astro/config';

// Publikacja na GitHub Pages w podkatalogu /lobby-obywatelskie.
// Aby zbudować pod własną domenę (np. OVH) w korzeniu, ustaw BASE=/ :
//   BASE=/ SITE=https://lobbyobywatelskie.pl npm run build
const base = process.env.BASE ?? '/lobby-obywatelskie';
const site = process.env.SITE ?? 'https://kierepka.github.io';

export default defineConfig({
  output: 'static',
  site,
  base,
  trailingSlash: 'always',
});
