import type { LAYOUTS } from '@/constants';

export type LayoutSingle = {
  layoutId: string;
  layoutLeftId?: never;
  layoutRightId?: never;
  layoutType: keyof typeof LAYOUTS;
};

export type LayoutDouble = {
  layoutId: string;
  layoutLeftId: string;
  layoutRightId: string;
  layoutType: keyof typeof LAYOUTS;
};

export type LayoutItem = LayoutSingle | LayoutDouble;
