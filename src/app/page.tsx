'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

import DraggableItem from '../drag-and-drop/draggable-item';
import DroppableArea from '../drag-and-drop/droppable-area';

import type { Item } from '../drag-and-drop/item-types';

const App: React.FC = () => {
  const [droppedItems, setDroppedItems] = useState<Item[]>([]);

  const items: Item[] = useMemo(
    () => [
      {
        id: uuidv4(),
        content: 'Item 1',
        name: 'First Item',
      },
      {
        id: uuidv4(),
        content: 'Item 2',
        name: 'Second Item',
      },
      {
        id: uuidv4(),
        content: 'Item 3',
        name: 'Third Item',
      },
    ],
    [],
  );

  const handleDrop = useCallback(
    (item: Partial<Item>) => {
      const foundItem = items.find(itemToFind => itemToFind.name === item.name);

      if (foundItem) {
        setDroppedItems([...droppedItems, { ...foundItem, id: uuidv4() }]);
      }
    },
    [droppedItems, items],
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h1>React DnD Example</h1>
        <DroppableArea dropZone="DropArea" />
        <div>
          <h2>Draggable Items</h2>
          {items.map(item => (
            <DraggableItem
              key={item.id}
              content={item.content}
              name={item.name}
              onDrop={handleDrop}
            />
          ))}
        </div>
        <div>
          <h2>Dropped Items</h2>
          <ul>
            {droppedItems.map(item => (
              <li key={item.id}>{item.content}</li>
            ))}
          </ul>
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
