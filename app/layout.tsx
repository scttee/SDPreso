import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk, Caveat } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700'],
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-hand',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'I Still Call Myself a Designer',
  description: 'Presentation for the Young Professionals Network, City of Sydney.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
