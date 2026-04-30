import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'I Still Call Myself a Designer',
  description: 'Presentation microsite for a live talk.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
