import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import type { ContentItem } from '@/types/content-item-types';
import type { LayoutItem } from '@/types/layout-types';

export type AppContextType = {
  layouts: LayoutItem[];
  items: ContentItem[];
  onDrop: (item: ContentItem) => void;
  addLayout: (newLayout: LayoutItem) => void;
};

const initialState: AppContextType = {
  layouts: [],
  items: [],
  onDrop: () => {},
  addLayout: () => {},
};

const AppContext = createContext<AppContextType>(initialState);

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [layouts, setLayouts] = useState<LayoutItem[]>([]);
  const [items, setItems] = useState<ContentItem[]>([]);

  const onDrop = useCallback(
    (item: ContentItem) => {
      setItems([...items, { ...item, contentId: uuidv4() }]);
    },
    [items],
  );

  const addLayout = (newLayout: LayoutItem) => {
    setLayouts(prevLayout => [...prevLayout, newLayout]);
  };

  return <AppContext.Provider value={{ addLayout, onDrop, layouts, items }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppProvider');
  }

  return context;
}
