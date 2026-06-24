// Pomocniki URL — uwzględniają base (np. /lobby-obywatelskie na GitHub Pages),
// więc te same linki działają lokalnie (base '/') i po publikacji w podkatalogu.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Link do strony (z końcowym slashem — wymaganym przez GitHub Pages). */
export function url(p: string): string {
  if (p === '/' || p === '') return base + '/';
  const clean = '/' + p.replace(/^\//, '').replace(/\/$/, '');
  return base + clean + '/';
}

/** Ścieżka do pliku z katalogu public (bez końcowego slasha). */
export function asset(p: string): string {
  return base + '/' + p.replace(/^\//, '');
}
