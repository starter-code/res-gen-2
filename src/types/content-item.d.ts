import type { CSSProperties } from 'react';

import type { LAYOUTS, CONTENT_TYPES } from '@/constants';

export type ContentItem = {
  content: string;
  contentId: string;
  contentType: keyof typeof CONTENT_TYPES;
  layoutId: string;
  layoutParentId: string | null;
  layoutType: keyof typeof LAYOUTS;
};
