import type { CSSProperties } from 'react';

type Name = string;

export const ItemTypes = {
  HEADING: 'heading',
} as const;

export type Item = {
  id: string;
  content: string;
  name: Name;
  style: CSSProperties;
};

export type DropResult = {
  name: Name;
};
