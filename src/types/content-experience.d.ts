import type { CONTENT_TYPES, LAYOUTS } from '../constants';

import type { ContentBaseItem } from './content-base-item';

type ExperienceJsonRequired = {
  company: string;
  title: string;
};

type ExperienceJsonOptional = {
  dates: string;
  descriptions: string[];
  location: string;
  tags: string[];
};

export type ExperienceJson = ExperienceJsonRequired & Partial<ExperienceJsonOptional>;

export type ContentExperience = ContentBaseItem<(typeof CONTENT_TYPES)['EXPERIENCE'], ExperienceJson>;
