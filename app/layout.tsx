import type { Metadata } from 'next';
// Self-hosted fonts (latin only, just the weights the site uses): no render-blocking request to Google Fonts.
import '@fontsource/baloo-2/latin-600.css';
import '@fontsource/baloo-2/latin-700.css';
import '@fontsource/baloo-2/latin-800.css';
import '@fontsource/nunito/latin-600.css';
import '@fontsource/nunito/latin-700.css';
import '@fontsource/nunito/latin-800.css';
import './globals.css';
import { asset, HERO_NAME_SIZES, HERO_NAME_SRCSET } from './asset';

export const metadata: Metadata = {
  title: 'Ashutosh Singh — Game Developer',
  description: 'Ashutosh Singh makes games. Unity Game Developer: open worlds, mobile games, AR and VR. See the projects and get in touch.',
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en" suppressHydrationWarning><head>
    <meta name="theme-color" content="#FFDE6A"/>
    {/* skip the loading screen on repeat visits in the same session, before anything paints */}
    <script dangerouslySetInnerHTML={{ __html: "try{if(sessionStorage.getItem('as-loader-seen'))document.documentElement.classList.add('skip-loader')}catch(e){}" }}/>
    <link rel="icon" href={asset('/favicon.svg')} type="image/svg+xml"/>
    <link rel="preload" as="image" type="image/webp" fetchPriority="high" imageSrcSet={HERO_NAME_SRCSET} imageSizes={HERO_NAME_SIZES}/>
    <link rel="preload" href={asset('/images/me-cutout.webp')} as="image" type="image/webp" fetchPriority="high"/>
  </head><body>{children}</body></html>;
}
