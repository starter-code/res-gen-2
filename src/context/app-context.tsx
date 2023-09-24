import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { LAYOUTS } from '@/constants';

import type { LayoutItem } from '@/types/layouts';
import type { ContentAll } from '@/types/content-all';

export type AppContextType = {
  isModalOpen: boolean; // maybe move to pdf preview context
  items: ContentAll[];
  layouts: LayoutItem[];
  addLayout: (newLayout: LayoutItem) => void;
  onCreate: (item: ContentAll) => void;
  onUpdate: (item: ContentAll) => void;
  onDelete: (item: Pick<ContentAll, 'contentId'>) => void;
  setIsModalOpen: (value: boolean) => void;
};

const initialState: AppContextType = {
  isModalOpen: false,
  items: [],
  layouts: [{ layoutId: uuidv4(), layoutType: LAYOUTS.SINGLE }],
  addLayout: () => {},
  onCreate: () => {},
  onDelete: () => {},
  onUpdate: () => {},
  setIsModalOpen: () => {},
};

const AppContext = createContext<AppContextType>(initialState);

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [layouts, setLayouts] = useState<LayoutItem[]>(initialState.layouts);
  const [items, setItems] = useState<ContentAll[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Add content items from JSON editors in left pane
   */
  const onCreate = useCallback(
    (item: ContentAll) => {
      setItems([...items, { ...item, contentId: uuidv4() }]);
    },
    [items],
  );

  /**
   * Update content items inside of the WYSIWYG editor
   */
  const onUpdate = useCallback(
    (newItem: ContentAll) => {
      const newItems = items.map(oldItem => (oldItem.contentId === newItem.contentId ? newItem : oldItem));
      setItems(newItems);
    },
    [items],
  );

  const onDelete = useCallback(
    (newItem: Pick<ContentAll, 'contentId'>) => {
      const newItems = items.filter(oldItem => oldItem.contentId !== newItem.contentId);
      setItems(newItems);
    },
    [items],
  );

  const addLayout = (newLayout: LayoutItem) => {
    setLayouts(prevLayout => [...prevLayout, newLayout]);
  };

  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        items,
        layouts,
        addLayout,
        onDelete,
        onUpdate,
        onCreate,
        setIsModalOpen,
      }}
    >
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
