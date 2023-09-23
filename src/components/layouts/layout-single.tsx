import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useDrop } from 'react-dnd';

import MacroManager from '@/managers/macro-manager';
import { CONTENT_TYPES } from '@/constants';
import { useAppContext } from '@/context/app-context';

import type { LAYOUTS } from '@/constants';

interface LayoutSingleProps {
  layoutType: keyof typeof LAYOUTS;
  className?: string;
  layoutId?: string;
  layoutParentId?: string;
}

export default function LayoutSingle(props: LayoutSingleProps) {
  const { className, layoutType, layoutId, layoutParentId = null } = props;

  const { items: allItems } = useAppContext();
  const [{ isOver }, drop] = useDrop({
    accept: [...Object.values(CONTENT_TYPES)],
    drop: () => ({ layoutType, layoutId, layoutParentId }),
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
      className={classNames('min-h-3', className)}
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
}
