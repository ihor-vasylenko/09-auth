import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { URL, GRAPH_URL } from '@/lib/constants'
import './globals.css';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';



const roboto = Roboto({
  variable: '--font-roboto',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'A simple platform to create, organize, and access personal notes.',
  openGraph: {
    title: 'Notes organizer',
    description: 'Create and manage your personal notes.',
    url: URL,
    images: [
      {
        url: GRAPH_URL,
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
