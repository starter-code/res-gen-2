'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

import DropArea from '@/drag-and-drop/drop-area';
import MacroManager from '@/managers/macro-manager';
import HeadingEditor from '@/json-editors/heading-editor';

import type { Item } from '../types/item-types';

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  const handleDrop = useCallback(
    (item: Item) => {
      setItems([...items, { ...item, id: uuidv4() }]);
    },
    [items],
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h1>React DnD Example</h1>
        <DropArea name="drop-area" />
        <div>
          <h2>Draggable Items</h2>
          <HeadingEditor onDrop={handleDrop} />
        </div>
        <div>
          <h2>Dropped Items</h2>
          <MacroManager items={items} />
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
