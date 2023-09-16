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

export type DropResultSingle = {
  dropEffect: string;
  layoutType: (typeof LAYOUTS)['SINGLE'];
  layoutId: string;
  layoutLeftId?: never;
  layoutRightId?: never;
};

export type DropResultDouble = {
  dropEffect: string;
  layoutType: (typeof LAYOUTS)['DOUBLE'];
  layoutLeftId: string;
  layoutRightId: string;
  layoutId: string;
};

export type DropResult = DropResultSingle | DropResultDouble;

export type LayoutSingle = {
  layoutId: string;
  layoutLeftId?: never;
  layoutRightId?: never;
  layoutType: ContentItem['layoutType'];
  props?: any[];
};

export type LayoutDouble = {
  layoutId: string;
  layoutLeftId: string;
  layoutRightId: string;
  layoutType: ContentItem['layoutType'];
  props?: any[];
};

export type LayoutItem = LayoutSingle | LayoutDouble;
