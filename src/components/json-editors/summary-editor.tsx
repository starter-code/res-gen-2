import { useMemo } from 'react';
import { object, string } from 'zod';

import EXAMPLE_SUMMARY from '@/__example-json/summary.json';
import { ITEM_TYPES } from '@/constants';

import BaseEditor from './base-editor';

type SummaryEditorProps = {
  //
};

const schema = object({
  heading: string(),
  summary: string(),
});

export default function SummaryEditor({}: SummaryEditorProps) {
  const style = useMemo(
    () => ({
      backgroundColor: 'aliceblue',
      color: 'black',
      height: '20ch',
      fontFamily: 'monospace',
      maxWidth: '100%',
      width: '40ch',
    }),
    [],
  );

  return (
    <BaseEditor //
      type={ITEM_TYPES.SUMMARY}
      macro="Summary"
      style={style}
      json={EXAMPLE_SUMMARY}
      schema={schema}
    />
  );
}