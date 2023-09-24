import type { CONTENT_TYPES, LAYOUTS } from '../constants';
import type { ContentBaseItem } from './content-base-item';

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
  website: string;
};

export type HeadingJson = HeadingJsonRequired & Partial<HeadingJsonOptional>;

export type ContentHeading = ContentBaseItem<(typeof CONTENT_TYPES)['HEADING'], HeadingJson>;
