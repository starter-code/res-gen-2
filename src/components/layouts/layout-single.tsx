import React, { useMemo } from 'react';
import { useDrop } from 'react-dnd';

import MacroManager from '@/managers/macro-manager';
import { ITEM_TYPES } from '@/constants';
import { useAppContext } from '@/context/app-context';

import type { ContentItem } from '@/types/content-item';

interface LayoutSingleProps {
  layoutType: ContentItem['layoutType'];
  className?: string;
  layoutId?: string;
}

const LayoutSingle: React.FC<LayoutSingleProps> = ({ className, layoutType, layoutId }) => {
  const { items: allItems } = useAppContext();
  const [{ isOver }, drop] = useDrop({
    accept: [...Object.values(ITEM_TYPES)],
    drop: () => ({ layoutType, layoutId }),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const items = useMemo(() => {
    const filteredItems = allItems.filter(item => item.layoutType === layoutType && item.layoutId === layoutId);

    return filteredItems;
  }, [allItems, layoutType, layoutId]);

  const backgroundColor = isOver ? '#e0e0e0' : 'transparent';

  return (
    <div
      className={className}
      ref={drop}
      style={{
        border: '2px dashed #ccc',
        borderRadius: '5px',
        padding: '16px',
        backgroundColor,
      }}
    >
      <MacroManager items={items} />
    </div>
  );
};

export default LayoutSingle;
