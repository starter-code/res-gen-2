import type { CSSProperties } from 'react';

import type { LAYOUTS, ITEM_TYPES } from '@/constants';

export type ContentItem = {
  content: string;
  contentId: string;
  contentType: keyof typeof ITEM_TYPES;
  layoutId: string;
  layoutType: keyof typeof LAYOUTS;
  style: CSSProperties;
};
