import React from 'react';
import { useDrag } from 'react-dnd';

import { DropResult, Item, ItemTypes } from './item-types';

interface DraggableItemProps {
  content: string;
  name: string;
  onDrop: (item: Partial<Item>) => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  content,
  name,
  onDrop,
}) => {
  const [{ isDragging }, ref] = useDrag({
    type: ItemTypes.BOX,
    item: { name },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      onDrop(item);
    },
  });

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        border: '1px solid #ccc',
        padding: '8px',
        marginBottom: '8px',
      }}
    >
      {content}
    </div>
  );
};

export default DraggableItem;
