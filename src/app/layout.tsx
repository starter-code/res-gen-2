import classNames from 'classnames';

import '@/css/index.css';

import type { Metadata } from 'next';

type RootLayoutProps = {
  children: React.ReactNode;
};

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
      <body>
        {/* This div is for classNames that will be converted to PDF */}
        <div id="pdf-tailwind-bootstrapper" className={className} style={{ display: 'none' }} />
        {children}
      </body>
    </html>
  );
}
