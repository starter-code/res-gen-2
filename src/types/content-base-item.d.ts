import type { LAYOUTS, CONTENT_TYPES } from '@/constants';

export type ContentBaseItem<ContentType extends keyof typeof CONTENT_TYPES, ContentJson> = {
  content: ContentJson;
  contentId: string;
  contentType: ContentType;
  layoutId: string;
  layoutType: keyof typeof LAYOUTS;
  /**
   * `layoutParentId` is only available for non-single layouts
   */
  layoutParentId?: string;
};
