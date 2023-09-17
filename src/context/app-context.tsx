import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import type { ContentItem } from '@/types/content-item';
import type { LayoutItem } from '@/types/layout-types';

export type AppContextType = {
  items: ContentItem[];
  layouts: LayoutItem[];
  addLayout: (newLayout: LayoutItem) => void;
  onDrop: (item: ContentItem) => void;
};

const initialState: AppContextType = {
  items: [],
  layouts: [],
  addLayout: () => {},
  onDrop: () => {},
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

  return <AppContext.Provider value={{ items, layouts, addLayout, onDrop }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppProvider');
  }

  return context;
}
