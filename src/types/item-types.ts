import type { CSSProperties } from 'react';

/**
 * {@type} This 'Name' has a specific meaning to Drag and drop
 */
export type Name = string;

export type Item = {
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
