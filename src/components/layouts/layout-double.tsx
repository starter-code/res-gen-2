import React from 'react';
import { useDrop } from 'react-dnd';

import LayoutSingle from './layout-single';
import { LAYOUTS } from '@/constants';

interface LayoutDoubleProps {
  // empty for now
}

const LayoutDouble: React.FC<LayoutDoubleProps> = () => {
  return (
    <div className="flex">
      <LayoutSingle className="w-max grow" layoutType={LAYOUTS.DOUBLE_LEFT} />
      <LayoutSingle className="w-max grow" layoutType={LAYOUTS.DOUBLE_RIGHT} />
    </div>
  );
};

export default LayoutDouble;
