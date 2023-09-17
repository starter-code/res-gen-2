import type { ContentItem } from './content-item';

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
