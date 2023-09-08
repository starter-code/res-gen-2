import React from 'react';
import { useDrop } from 'react-dnd';

import { ItemTypes } from './item-types';

interface DropAreaProps {
  dropZone: string;
}

const DropArea: React.FC<DropAreaProps> = ({ dropZone }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.HEADING,
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
        borderRadius: '5px',
        padding: '16px',
        backgroundColor,
      }}
    >
      Drop here
    </div>
  );
};

export default DropArea;
