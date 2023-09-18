import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/css/globals.css';
import '@/css/editor.css';
import '@/css/pdf.css';
import classNames from 'classnames';

type RootLayoutProps = {
  children: React.ReactNode;
};

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ResGenie 2.0',
  description: 'Make a Resume',
};

export default function RootLayout({ children }: RootLayoutProps) {
  const className = classNames({
    'ml-1': true,
    'ml-2': true,
    'ml-3': true,
    'ml-4': true,
    'ml-5': true,
    'color-blue': true,
    'border-black': true,
    'border-1': true,
  });

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* This div is for classNames that will be converted to PDF */}
        <div id="pdf-tailwind-bootstrapper" className={className} style={{ display: 'none' }} />
        {children}
      </body>
    </html>
  );
}
