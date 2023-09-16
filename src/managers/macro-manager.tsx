import { useMemo } from 'react';

import { ItemTypes } from '@/constants';
import HeadingMacro from '@/components/json-macros/heading-macro';

import type { ContentItem } from '@/types/item-types';

type MacroManagerProps = {
  items: ContentItem[];
};

export default function MacroManager({ items }: MacroManagerProps) {
  const elements = useMemo(() => {
    const components = items.map(item => {
      switch (item.name) {
        case ItemTypes.HEADING: {
          return <HeadingMacro key={item.id} {...JSON.parse(item.content)} />;
        }
        default:
          throw new Error(`Invalid item. ${JSON.stringify(item)}`);
      }
    });

    return components;
  }, [items]);

  return <div>{elements}</div>;
}
