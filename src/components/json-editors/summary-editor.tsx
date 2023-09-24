import c from 'classnames';
import { object, string } from 'zod';

import EXAMPLE_SUMMARY from '@/__example-json/summary.json';
import { CONTENT_TYPES } from '@/constants';
import type { ContentSummary, SummaryJson } from '@/types/content-summary';
import type { NeverProps } from '@/types/generics';

import BaseEditor from './base-editor';

type SummaryEditorProps =
  | NeverProps
  | (ContentSummary & {
      content?: SummaryJson;
    });

const schema = object({
  heading: string(),
  summary: string(),
});

export default function SummaryEditor(props: SummaryEditorProps) {
  const { content = EXAMPLE_SUMMARY } = props;

  const className = c('summary-editor');

  return (
    <BaseEditor
      {...props}
      className={className}
      contentType={CONTENT_TYPES.SUMMARY}
      macro="Summary"
      content={content}
      schema={schema}
    />
  );
}
