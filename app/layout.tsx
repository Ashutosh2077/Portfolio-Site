import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Ashutosh Singh — Game Developer',
  description: 'Ashutosh Singh makes games. Unity Game Developer: open worlds, mobile games, AR and VR. See the projects and get in touch.',
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><head>
    <meta name="theme-color" content="#FFDE6A"/>
    <link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
    <link rel="preload" href="/images/hero-name.webp" as="image" type="image/webp" fetchPriority="high"/>
    <link rel="preload" href="/images/me-cutout.webp" as="image" type="image/webp" fetchPriority="high"/>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@500;600;700;800&display=swap"/>
  </head><body>{children}</body></html>;
}
