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
      <body className={inter.className}>
        {/* This div is for classNames that will be converted to PDF */}
        <div id="pdf-tailwind-bootstrapper" className="ml-1 ml-2 ml-3 ml-4 ml-5" style={{ display: 'none' }} />
        {children}
      </body>
    </html>
  );
}
