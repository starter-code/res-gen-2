import { useMemo } from 'react';

import { CONTENT_TYPES } from '@/constants';
import HeadingMacro from '@/components/json-macros/heading-macro';

import type { ContentItem } from '@/types/content-item';
import SummaryMacro from '@/components/json-macros/summary-macro';
import ExperienceMacro from '@/components/json-macros/experience-macro';

type MacroManagerProps = {
  items: ContentItem[];
};

export default function MacroManager({ items }: MacroManagerProps) {
  const elements = useMemo(() => {
    const components = items.map(item => {
      switch (item.contentType) {
        case CONTENT_TYPES.HEADING: {
          return <HeadingMacro key={item.contentId} {...JSON.parse(item.content)} />;
        }
        case CONTENT_TYPES.SUMMARY: {
          return <SummaryMacro key={item.contentId} {...JSON.parse(item.content)} />;
        }
        case CONTENT_TYPES.EXPERIENCE: {
          return <ExperienceMacro key={item.contentId} {...JSON.parse(item.content)} />;
        }
        default:
          throw new Error(`Invalid item. ${JSON.stringify(item)}`);
      }
    });

    return components;
  }, [items]);

  return <div>{elements}</div>;
}
