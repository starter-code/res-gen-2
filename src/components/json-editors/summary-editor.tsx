import { useMemo } from 'react';
import { object, string } from 'zod';

import EXAMPLE_SUMMARY from '@/__example-json/summary.json';
import { CONTENT_TYPES } from '@/constants';

import BaseEditor from './base-editor';

import type { SummaryJson } from '@/types/content-summary';

type SummaryEditorProps = {
  content?: SummaryJson;
};

const schema = object({
  heading: string(),
  summary: string(),
});

export default function SummaryEditor({ content = EXAMPLE_SUMMARY }: SummaryEditorProps) {
  const style = useMemo(
    () => ({
      backgroundColor: 'aliceblue',
      color: 'black',
      height: '20ch',
      fontFamily: 'monospace',
      maxWidth: '100%',
      width: '60ch',
    }),
    [],
  );

  return (
    <BaseEditor //
      contentType={CONTENT_TYPES.SUMMARY}
      macro="Summary"
      style={style}
      content={content}
      schema={schema}
    />
  );
}
