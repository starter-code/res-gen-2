import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ContentItem, LayoutItem } from '@/types/item-types';

export type AppContextType = {
  layouts: LayoutItem[];
  items: ContentItem[];
  handleDrop: (item: ContentItem) => void;
  addLayout: (newLayout: LayoutItem) => void;
};

const initialState: AppContextType = {
  layouts: [],
  items: [],
  handleDrop: () => {},
  addLayout: () => {},
};

const AppContext = createContext<AppContextType>(initialState);

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [layouts, setLayouts] = useState<LayoutItem[]>([]);
  const [items, setItems] = useState<ContentItem[]>([]);

  const handleDrop = useCallback(
    (item: ContentItem) => {
      setItems([...items, { ...item, contentId: uuidv4() }]);
    },
    [items],
  );

  const addLayout = (newLayout: LayoutItem) => {
    setLayouts(prevLayout => [...prevLayout, newLayout]);
  };

  return (
    <AppContext.Provider value={{ addLayout, handleDrop, layouts, items }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppProvider');
  }

  return context;
}
