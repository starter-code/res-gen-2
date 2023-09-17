import React from 'react';
import { useDrop } from 'react-dnd';

import LayoutSingle from './layout-single';
import { LAYOUTS } from '@/constants';

interface LayoutDoubleProps {
  layoutLeftId: string;
  layoutRightId: string;
}

const LayoutDouble: React.FC<LayoutDoubleProps> = ({ layoutLeftId, layoutRightId }) => {
  return (
    <div className="flex">
      <LayoutSingle className="w-max grow max-w-[50%]" layoutType={LAYOUTS.DOUBLE_LEFT} layoutId={layoutLeftId} />
      <LayoutSingle className="w-max grow max-w-[50%]" layoutType={LAYOUTS.DOUBLE_RIGHT} layoutId={layoutRightId} />
    </div>
  );
};

export default LayoutDouble;
