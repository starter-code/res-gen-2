import React from 'react';
import { useDrop } from 'react-dnd';

import { ItemTypes } from './item-types';
import type { Item } from './item-types';

interface DroppableAreaProps {
  dropZone: string;
}

const DroppableArea: React.FC<DroppableAreaProps> = ({ dropZone }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop: () => ({ dropZone }),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const backgroundColor = isOver ? '#e0e0e0' : 'transparent';

  return (
    <div
      ref={drop}
      style={{
        border: '2px dashed #ccc',
        padding: '16px',
        backgroundColor,
      }}
    >
      Drop here
    </div>
  );
};

export default DroppableArea;
