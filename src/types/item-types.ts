import type { CSSProperties } from 'react';

/**
 * {@type} This 'Name' has a specific meaning to Drag and Drop
 */
export type Name = string;

export type ContentItem = {
  id: string;
  content: string;
  name: Name;
  style: CSSProperties;
};

export type DropResult = {
  name: Name;
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
