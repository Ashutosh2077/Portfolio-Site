// Prefix for files in /public, so the site also works when hosted in a sub-folder
// (GitHub Pages serves it at /Portfolio-Site/). Empty locally.
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const asset = (path: string) => BASE + path;

// Hero name image: a 760px file for phones, the full 1468px one for wider screens.
// Shared by the <img> and the <link rel="preload"> so both pick the same file.
export const HERO_NAME_SRCSET = `${asset('/images/hero-name-760.webp')} 760w, ${asset('/images/hero-name.webp')} 1468w`;
export const HERO_NAME_SIZES = '(max-width: 900px) 92vw, 58vw';
