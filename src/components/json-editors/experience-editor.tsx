import { useMemo } from 'react';
import { object, string, array, undefined as _undefined, null as _null } from 'zod';

import EXAMPLE_EXPERIENCE from '@/__example-json/experience.json';
import { CONTENT_TYPES } from '@/constants';

import BaseEditor from './base-editor';

type ExperienceEditorProps = {
  //
};

const schema = object({
  title: string(),
  company: string(),
  location: string().optional(),
  dates: string().optional(),
  tags: array(string()).optional(),
  descriptions: array(string()).optional(),
});

export default function ExperienceEditor({}: ExperienceEditorProps) {
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
      contentType={CONTENT_TYPES.EXPERIENCE}
      macro="Experience"
      style={style}
      json={EXAMPLE_EXPERIENCE}
      schema={schema}
    />
  );
}
