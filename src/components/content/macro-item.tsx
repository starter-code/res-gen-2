import { CONTENT_TYPES } from '@/constants';
import type { ContentAll } from '@/types/content-all';

import ContactMacro from '../json-macros/contact-macro';
import ExperienceMacro from '../json-macros/experience-macro';
import SummaryMacro from '../json-macros/summary-macro';

type MacroItemProps = ContentAll;

export default function MacroItem(props: MacroItemProps) {
  const { contentType, contentId } = props;

  switch (contentType) {
    case CONTENT_TYPES.CONTACT: {
      return <ContactMacro key={contentId} {...props} />;
    }
    case CONTENT_TYPES.SUMMARY: {
      return <SummaryMacro key={contentId} {...props} />;
    }
    case CONTENT_TYPES.EXPERIENCE: {
      return <ExperienceMacro key={contentId} {...props} />;
    }
    default: {
      throw new Error(`Unsupported contentType ${contentType}`);
    }
  }
}
