import type { CONTENT_TYPES, LAYOUTS } from '../constants';
import type { ContentBaseItem } from './content-base-item';

type SummaryJsonRequired = {
  summary: string;
};

type SummaryJsonOptional = {
  heading: string;
};

export type SummaryJson = SummaryJsonRequired & Partial<SummaryJsonOptional>;

export type ContentSummary = ContentBaseItem<(typeof CONTENT_TYPES)['SUMMARY'], SummaryJson>;
