// Turns the static export in dist/client into a folder GitHub Pages can serve from a sub-folder.
//   STATIC_EXPORT=1 PAGES_BASE_PATH=/Portfolio-Site npm run build && node scripts/pages-postbuild.mjs
// Output: ./site-out (upload this folder). Not named "pages": that name is reserved for routes.
import fs from 'node:fs';
import path from 'node:path';

const base = (process.env.PAGES_BASE_PATH || '').replace(/\/$/, '');
const src = 'dist/client';
const out = 'site-out';
if (!fs.existsSync(path.join(src, 'index.html'))) {
  console.error('dist/client/index.html not found. Run the static build first.');
  process.exit(1);
}

fs.rmSync(out, { recursive: true, force: true });
fs.cpSync(src, out, { recursive: true, filter: p => !/[\\/]\.vite$/.test(p) && !/_headers$|\.assetsignore$/.test(p) });

// 1) point framework files (/_next/...) at the sub-folder; images already carry the prefix
const textExt = new Set(['.html', '.rsc', '.js', '.css', '.json', '.txt']);
let rewritten = 0;
const walk = dir => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { walk(p); continue; }
    if (!textExt.has(path.extname(p)) || !base) continue;
    const s = fs.readFileSync(p, 'utf8');
    const t = s
      .replace(/(["'(`\s=])\/_next\//g, `$1${base}/_next/`)
      // vinext's page data tags chunk paths with a one-letter kind: "m/_next/..." (module), "p/_next/..." (preload)
      .replace(/(["'`])([a-z])\/_next\//g, `$1$2${base}/_next/`)
      // Vite's preload helper builds chunk URLs as "/" + "_next/static/..."; give it the sub-folder
      .replace(/function\((\w+)\)\{return`\/`\+\1\}/g, `function($1){return\`${base}/\`+$1}`)
      .replace(/function\((\w+)\)\{return"\/"\+\1\}/g, `function($1){return"${base}/"+$1}`);
    if (t !== s) { fs.writeFileSync(p, t); rewritten++; }
  }
};
walk(out);

// 2) 404.html from the /lost route, as a plain page (no scripts) so it works at any address
const lost = [path.join(out, 'lost', 'index.html'), path.join(out, 'lost.html')].find(p => fs.existsSync(p)) || '';
if (lost) {
  const html = fs.readFileSync(lost, 'utf8')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '')
    .replace(/<link[^>]+rel="modulepreload"[^>]*>/g, '');
  fs.writeFileSync(path.join(out, '404.html'), html);
  fs.rmSync(path.join(out, 'lost'), { recursive: true, force: true }); fs.rmSync(path.join(out, 'lost.html'), { force: true }); fs.rmSync(path.join(out, 'lost.rsc'), { force: true });
} else {
  console.warn('warning: no /lost page found, 404.html not created');
}

// 3) GitHub Pages runs Jekyll by default, which hides folders starting with "_" (like _next)
fs.writeFileSync(path.join(out, '.nojekyll'), '');

console.log(`site-out/ ready (base "${base || '/'}", ${rewritten} files re-pointed)`);
