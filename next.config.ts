import type { NextConfig } from 'next';

// GitHub Pages build: `STATIC_EXPORT=1 PAGES_BASE_PATH=/Portfolio-Site npm run build`
// exports plain static files. Image paths get the sub-folder prefix through NEXT_PUBLIC_BASE_PATH (see app/asset.ts);
// framework files are re-pointed by scripts/pages-postbuild.mjs. (vinext's own `basePath` breaks its prerenderer.)
const staticExport = process.env.STATIC_EXPORT === '1';
const basePath = process.env.PAGES_BASE_PATH || '';

const nextConfig: NextConfig = {
  ...(staticExport ? { output: 'export' as const } : {}),
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
