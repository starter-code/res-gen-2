// src/ItemTypes.ts
export const ItemTypes = {
  BOX: 'box',
} as const;

export type Item = {
  id: string;
  content: string;
  name: string;
};

export type DropResult = {
  name: string;
};
