import LostLevel from '../lost-level';

// Static copy of the 404 page. The GitHub Pages build turns this into /404.html (see scripts/pages-postbuild.mjs).
export const dynamic = 'force-static';
export const metadata = { title: 'Level not found — Ashutosh Singh', robots: { index: false } };

export default function Lost() {
  return <LostLevel />;
}
