import React from 'react';
import { useDrop } from 'react-dnd';

import { ITEM_TYPES } from '@/constants';

interface DropAreaProps {
  name: string;
}

const DropAreaDouble: React.FC<DropAreaProps> = ({ name }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPES.HEADING,
    drop: () => ({ name }),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const backgroundColor = isOver ? '#e0e0e0' : 'transparent';

  return (
    <div className="flex">
      <div
        className="w-max grow"
        ref={drop}
        style={{
          border: '2px dashed #ccc',
          borderRadius: '5px',
          padding: '16px',
          backgroundColor,
        }}
      >
        Drop Here
      </div>
      <div
        className="w-max grow"
        ref={drop}
        style={{
          border: '2px dashed #ccc',
          borderRadius: '5px',
          padding: '16px',
          backgroundColor,
        }}
      >
        Drop Here
      </div>
    </div>
  );
};

export default DropAreaDouble;
