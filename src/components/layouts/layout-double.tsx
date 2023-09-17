import React from 'react';

import LayoutSingle from './layout-single';
import { LAYOUTS } from '@/constants';

interface LayoutDoubleProps {
  layoutId: string;
  layoutLeftId: string;
  layoutRightId: string;
}

export default function LayoutDouble({ layoutLeftId, layoutRightId, layoutId }: LayoutDoubleProps) {
  return (
    <div className="flex" data-layout-id={layoutId}>
      <LayoutSingle
        className="w-max grow max-w-[50%]"
        layoutParentId={layoutId}
        layoutType={LAYOUTS.DOUBLE_LEFT}
        layoutId={layoutLeftId}
      />
      <LayoutSingle
        className="w-max grow max-w-[50%]"
        layoutParentId={layoutId}
        layoutType={LAYOUTS.DOUBLE_RIGHT}
        layoutId={layoutRightId}
      />
    </div>
  );
}
