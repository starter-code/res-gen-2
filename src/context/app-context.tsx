import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { CONTENT_TYPES } from '@/constants';
import type { ContentAll } from '@/types/content-all';
import { ContentId } from '@/types/content-base-item';
import type { LayoutItem } from '@/types/layouts';
import localStorageUtil from '@/utils/localstorage-util';
import { toSlugCase, toYearMonthDayFormat } from '@/utils/string-transform-util';

export enum MOVE_ACTION {
  MACRO_UP = 'MACRO_UP',
  MACRO_DOWN = 'MACRO_DOWN',
  LAYOUT_NEXT = 'LAYOUT_NEXT',
  LAYOUT_PREV = 'LAYOUT_PREV',
}

export type AppContextType = {
  /**
   * title refers to the name of the PDF when a user downloads from browser
   */
  title: string;
  isEditorVisible: boolean;
  isModalOpen: boolean; // maybe move to pdf preview context
  items: ContentAll[]; // rename to contentItems
  layouts: LayoutItem[];
  addLayout: (newLayout: LayoutItem) => void;
  popLayout: () => void;
  onCreate: (item: ContentAll) => void;
  onUpdate: (item: ContentAll) => void;
  onDelete: (item: Pick<ContentAll, 'contentId'>) => void;
  onMove: (action: MOVE_ACTION, contentId: ContentId) => void;
  toggleEditor: () => void;
  togglePdfModal: (value?: boolean) => void;
};

const initialState: AppContextType = Object.freeze({
  title: '',
  isEditorVisible: true,
  isModalOpen: false,
  items: [],
  layouts: [],
  addLayout: () => {},
  popLayout: () => {},
  onCreate: () => {},
  onDelete: () => {},
  onUpdate: () => {},
  onMove: () => {},
  toggleEditor: () => {},
  togglePdfModal: () => {},
});

const AppContext = createContext<AppContextType>(initialState);

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [layouts, setLayouts] = useState<LayoutItem[]>(localStorageUtil.layouts);
  const [items, setItems] = useState<ContentAll[]>(localStorageUtil.items);
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Read data from local storage when the component mounts
  useEffect(() => {
    setIsEditorVisible(localStorageUtil.isEditorVisible);
  }, []);

  // Store data in local storage whenever it changes
  useEffect(() => {
    localStorageUtil.data = { items, layouts, isEditorVisible };
  }, [items, layouts, isEditorVisible]);

  useEffect(() => {
    setItems(prevItems => {
      return prevItems.filter(item => {
        return layouts.some(layout => {
          return layout.layoutId === item.layoutId;
        });
      });
    });
  }, [layouts]);

  const onMove = useCallback(
    (action: MOVE_ACTION, contentId: ContentId) => {
      switch (action) {
        case MOVE_ACTION.MACRO_UP: {
          const newItems = [...items];
          const foundIndex = newItems.findIndex(i => i.contentId === contentId);
          const [item] = newItems.splice(foundIndex, 1);
          newItems.splice(foundIndex - 1, 0, item);
          setItems(newItems);
          break;
        }
        case MOVE_ACTION.MACRO_DOWN: {
          const newItems = [...items];
          const foundIndex = newItems.findIndex(i => i.contentId === contentId);
          const [item] = newItems.splice(foundIndex, 1);
          newItems.splice(foundIndex + 1, 0, item);
          setItems(newItems);
          break;
        }
        default:
          throw new Error(`Unsupported move action ${action}`);
      }
    },
    [items],
  );

  /**
   * Add content items from JSON editors in left pane
   */
  const onCreate = useCallback(
    (item: ContentAll) => {
      const contentId = uuidv4() as ContentId;
      setItems([...items, { ...item, contentId }]);
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

  const addLayout = useCallback((newLayout: LayoutItem) => {
    setLayouts(prevLayouts => [...prevLayouts, newLayout]);
  }, []);

  const popLayout = useCallback(() => {
    setLayouts(prevLayouts => [...prevLayouts.slice(0, -1)]);
  }, []);

  const toggleEditor = useCallback(() => setIsEditorVisible(!isEditorVisible), [isEditorVisible]);

  const togglePdfModal = useCallback(
    (value?: boolean) => {
      setIsModalOpen(value === undefined ? !isModalOpen : value);
    },
    [isModalOpen],
  );

  const title = useMemo(() => {
    const date = toYearMonthDayFormat();
    const contact = items.find(item => item.contentType === CONTENT_TYPES['CONTACT']);

    if (contact?.contentType === CONTENT_TYPES['CONTACT']) {
      const name = toSlugCase(contact.content.name);

      return `${date}-${name}.pdf`;
    }

    return `${date}-your-name.pdf`;
  }, [items]);

  return (
    <AppContext.Provider
      value={{
        title,
        isModalOpen,
        isEditorVisible,
        items,
        layouts,
        addLayout,
        popLayout,
        onDelete,
        onUpdate,
        onCreate,
        onMove,
        toggleEditor,
        togglePdfModal,
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
