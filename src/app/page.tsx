'use client';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { AppProvider } from '@/context/app-context';

import App from './app';

import type { ReactNode } from 'react';

type PageProps = {
  children: ReactNode;
};

export default function Page() {
  return (
    <AppProvider>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </AppProvider>
  );
}
