import React from 'react';
import { useDrop } from 'react-dnd';

import { ItemTypes } from '@/constants';

interface DropAreaProps {
  name: string;
}

const DropArea: React.FC<DropAreaProps> = ({ name }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.HEADING,
    drop: () => ({ name }),
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
      Single Column Layout
    </div>
  );
};

export default DropArea;
