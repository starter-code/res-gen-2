import { useMemo } from 'react';

import { Item, ItemTypes } from '@/drag-and-drop/item-types';
import HeadingMacro from '@/json-macro/heading-macro';

type MacroManagerProps = {
  items: Item[];
};

export default function MacroManager({ items }: MacroManagerProps) {
  const elements = useMemo(() => {
    const elementsFromItems = items.map(item => {
      switch (item.name) {
        case ItemTypes.HEADING: {
          return <HeadingMacro key={item.id} {...JSON.parse(item.content)} />;
        }
        default:
          throw new Error(`Invalid item. ${JSON.stringify(item)}`);
      }
    });

    return elementsFromItems;
  }, [items]);

  return <div>{elements}</div>;
}
