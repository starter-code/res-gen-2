import { v4 as uuidv4 } from 'uuid';

import EXPERIENCE_1 from '@/__example-json/experience-1.json';
import EXPERIENCE_2 from '@/__example-json/experience-2.json';
import HEADING from '@/__example-json/heading.json';
import SUMMARY from '@/__example-json/summary.json';
import { CONTENT_TYPES, LAYOUTS } from '@/constants';
import { ContentAll } from '@/types/content-all';
import { LayoutItem } from '@/types/layouts';

const LAYOUT_ID = uuidv4();

export class PrepopulateUtil {
  get items(): ContentAll[] {
    return [
      {
        content: HEADING,
        contentId: uuidv4(),
        contentType: CONTENT_TYPES.HEADING,
        layoutId: LAYOUT_ID,
        layoutType: LAYOUTS.SINGLE,
      },
      {
        content: SUMMARY,
        contentId: uuidv4(),
        contentType: CONTENT_TYPES.SUMMARY,
        layoutId: LAYOUT_ID,
        layoutType: LAYOUTS.SINGLE,
      },
      {
        content: EXPERIENCE_1,
        contentId: uuidv4(),
        contentType: CONTENT_TYPES.EXPERIENCE,
        layoutId: LAYOUT_ID,
        layoutType: LAYOUTS.SINGLE,
      },
      {
        content: EXPERIENCE_2,
        contentId: uuidv4(),
        contentType: CONTENT_TYPES.EXPERIENCE,
        layoutId: LAYOUT_ID,
        layoutType: LAYOUTS.SINGLE,
      },
    ];
  }

  get layouts(): LayoutItem[] {
    return [{ layoutId: LAYOUT_ID, layoutType: LAYOUTS.SINGLE }];
  }
}

export const prepopulateUtil = new PrepopulateUtil();
