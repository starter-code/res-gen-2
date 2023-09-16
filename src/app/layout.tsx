import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '../globals.css';

type RootLayoutProps = {
  children: React.ReactNode;
};

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ResGenie 2.0',
  description: 'Make a Resume',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
