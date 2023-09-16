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

export type DropResult = {
  dropEffect: string;
  layoutType: keyof typeof LAYOUTS;
  layoutId: string;
};

export type LayoutItem = {
  layoutId: string;
  layoutType: ContentItem['layoutType'];
  props?: any[];
};

type HeadingJsonRequired = {
  name: string;
  email: string;
};

type HeadingJsonOptional = {
  title: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
};

export type HeadingJson = HeadingJsonRequired & Partial<HeadingJsonOptional>;
