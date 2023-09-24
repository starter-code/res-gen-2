import c from 'classnames';
import { useMemo } from 'react';

import ExperienceMacro from '@/components/json-macros/experience-macro';
import HeadingMacro from '@/components/json-macros/heading-macro';
import SummaryMacro from '@/components/json-macros/summary-macro';
import { CONTENT_TYPES } from '@/constants';
import type { ContentAll } from '@/types/content-all';

type MacroManagerProps = {
  items: ContentAll[];
};

export default function MacroManager({ items }: MacroManagerProps) {
  const elements = useMemo(() => {
    const components = items.map(item => {
      switch (item.contentType) {
        case CONTENT_TYPES.HEADING: {
          return <HeadingMacro key={item.contentId} {...item} />;
        }
        case CONTENT_TYPES.SUMMARY: {
          return <SummaryMacro key={item.contentId} {...item} />;
        }
        case CONTENT_TYPES.EXPERIENCE: {
          return <ExperienceMacro key={item.contentId} {...item} />;
        }
        default:
          throw new Error(`Invalid item. ${JSON.stringify(item)}`);
      }
    });

    return components;
  }, [items]);

  const className = useMemo(() => c({ 'macro-manager': true }), []);

  return <div className={className}>{elements}</div>;
}
