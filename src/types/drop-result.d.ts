import type { LAYOUTS } from '@/constants';

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
