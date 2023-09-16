import { useMemo } from 'react';

import { ITEM_TYPES } from '@/constants';
import HeadingMacro from '@/components/json-macros/heading-macro';

import type { ContentItem } from '@/types/item-types';

type MacroManagerProps = {
  items: ContentItem[];
};

export default function MacroManager({ items }: MacroManagerProps) {
  const elements = useMemo(() => {
    const components = items.map(item => {
      switch (item.contentType) {
        case ITEM_TYPES.HEADING: {
          return (
            <HeadingMacro key={item.contentId} {...JSON.parse(item.content)} />
          );
        }
        default:
          throw new Error(`Invalid item. ${JSON.stringify(item)}`);
      }
    });

    return components;
  }, [items]);

  return <div>{elements}</div>;
}
