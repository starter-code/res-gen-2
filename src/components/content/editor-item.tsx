import { CONTENT_TYPES, EDITOR_MODES } from '@/constants';

import HeadingEditor from '../json-editors/heading-editor';
import SummaryEditor from '../json-editors/summary-editor';
import ExperienceEditor from '../json-editors/experience-editor';

import type { ContentAll } from '@/types/content-all';

type EditorItemProps = ContentAll & {
  mode: keyof typeof EDITOR_MODES;
};

export default function EditorItem(props: EditorItemProps) {
  const { contentType, contentId } = props;

  switch (contentType) {
    case CONTENT_TYPES.HEADING: {
      return <HeadingEditor key={contentId} {...props} />;
    }
    case CONTENT_TYPES.SUMMARY: {
      return <SummaryEditor key={contentId} {...props} />;
    }
    case CONTENT_TYPES.EXPERIENCE: {
      return <ExperienceEditor key={contentId} {...props} />;
    }
    default: {
      throw new Error(`Unsupported contentType ${contentType}`);
    }
  }
}
