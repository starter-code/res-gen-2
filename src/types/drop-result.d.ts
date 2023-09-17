import type { LAYOUTS } from '@/constants';

export type DropResultSingle = {
  dropEffect: string;
  layoutType: (typeof LAYOUTS)['SINGLE'];
  layoutId: string;
  layoutParentId: null;
  layoutLeftId?: never;
  layoutRightId?: never;
};

export type DropResultDouble = {
  dropEffect: string;
  layoutType: (typeof LAYOUTS)['DOUBLE'];
  layoutParentId: string;
  layoutLeftId: string;
  layoutRightId: string;
  layoutId: string;
};

export type DropResult = DropResultSingle | DropResultDouble;
