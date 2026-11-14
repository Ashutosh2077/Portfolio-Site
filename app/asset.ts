// Prefix for files in /public, so the site also works when hosted in a sub-folder
// (GitHub Pages serves it at /Portfolio-Site/). Empty locally.
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const asset = (path: string) => BASE + path;
