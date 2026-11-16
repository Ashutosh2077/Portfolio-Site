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
  title: 'Ashutosh Singh — Unity Game Developer & Technical Artist',
  description: 'Portfolio of Ashutosh Singh, Unity Game Developer & Technical Artist specializing in mobile open-world optimization, gameplay systems, AR/VR experiences, and game feel.',
  keywords: [
    'Ashutosh Singh',
    'Game Developer',
    'Unity Developer',
    'Technical Artist',
    'Mobile Game Optimization',
    'Open World Game',
    'Laila Majnu Streets of Crime',
    'C# Game Development',
    'AR VR Developer',
    'VMS Techs',
    'Indie Game Developer',
  ],
  authors: [{ name: 'Ashutosh Singh', url: 'https://github.com/Ashutosh2077' }],
  creator: 'Ashutosh Singh',
  openGraph: {
    title: 'Ashutosh Singh — Unity Game Developer & Technical Artist',
    description: 'Designing, building, and optimising games. From open worlds running on low-end phones to immersive AR/VR experiences.',
    url: 'https://ashutoshsingh.dev',
    siteName: 'Ashutosh Singh Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: asset('/images/LailaMajnuStreetsOfCrime.webp'),
        width: 960,
        height: 960,
        alt: 'Laila Majnu: Streets of Crime — Ashutosh Singh',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashutosh Singh — Unity Game Developer & Technical Artist',
    description: 'Designing, building, and optimising games. From open worlds running on low-end phones to immersive AR/VR experiences.',
    images: [asset('/images/LailaMajnuStreetsOfCrime.webp')],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ashutosh Singh',
  jobTitle: 'Unity Game Developer & Technical Artist',
  url: 'https://ashutoshsingh.dev',
  sameAs: [
    'https://www.linkedin.com/in/ashutosh-singh-6709ab20b/',
    'https://github.com/Ashutosh2077',
    'https://ashutosh2077.itch.io',
    'https://play.google.com/store/apps/details?id=com.ItsAGameStudio.LailaMajnu&hl=en_IN',
  ],
  knowsAbout: [
    'Game Development',
    'Unity Engine',
    'C# Programming',
    'Draw Call Batching',
    'Mobile Performance Optimization',
    'Texture Atlasing',
    '3D Environment Design',
    'Augmented Reality (AR)',
    'Virtual Reality (VR)',
  ],
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en" suppressHydrationWarning><head>
    <meta name="theme-color" content="#FFDE6A"/>
    {/* skip the loading screen on repeat visits in the same session, before anything paints */}
    <script dangerouslySetInnerHTML={{ __html: "try{if(sessionStorage.getItem('as-loader-seen'))document.documentElement.classList.add('skip-loader')}catch(e){}" }}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <link rel="icon" href={asset('/favicon.svg')} type="image/svg+xml"/>
    <link rel="preload" as="image" type="image/webp" fetchPriority="high" imageSrcSet={HERO_NAME_SRCSET} imageSizes={HERO_NAME_SIZES}/>
    <link rel="preload" href={asset('/images/me-cutout.webp')} as="image" type="image/webp" fetchPriority="high"/>
  </head><body>{children}</body></html>;
}
