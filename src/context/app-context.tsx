import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Item } from '@/types/item-types';

export type AppContextType = {
  layout: null;
  items: Item[];
  handleDrop: (item: Item) => void;
  addLayout: () => void;
};

const initialState: AppContextType = {
  layout: null,
  items: [],
  handleDrop: () => {},
  addLayout: () => {},
};

const AppContext = createContext<AppContextType>(initialState);

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [layout, setLayout] = useState(null);
  const [items, setItems] = useState<Item[]>([]);

  const handleDrop = useCallback(
    (item: Item) => {
      setItems([...items, { ...item, id: uuidv4() }]);
    },
    [items],
  );

  const addLayout = () => {
    setLayout(null);
  };

  return (
    <AppContext.Provider value={{ layout, addLayout, handleDrop, items }}>
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
