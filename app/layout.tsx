import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Ashutosh Singh — Unity Game Developer',
  description: 'Turning imaginative ideas into immersive gaming experiences. Explore Ashutosh Singh’s Unity games, augmented reality and virtual reality projects.',
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
