import classnames from 'classnames';
import { useMemo } from 'react';
import { object, string } from 'zod';

import EXAMPLE_SUMMARY from '@/__example-json/summary.json';
import { CONTENT_TYPES } from '@/constants';

import BaseEditor from './base-editor';

import type { ContentSummary, SummaryJson } from '@/types/content-summary';

type SummaryEditorProps = ContentSummary & {
  content?: SummaryJson;
};

const schema = object({
  heading: string(),
  summary: string(),
});

export default function SummaryEditor(props: SummaryEditorProps) {
  const { content = EXAMPLE_SUMMARY } = props;

  const className = classnames('summary-editor');

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
