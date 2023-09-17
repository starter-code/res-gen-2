import { useMemo } from 'react';
import { object, string, union, undefined as _undefined, null as _null } from 'zod';

import EXAMPLE_HEADING from '@/__example-json/heading.json';
import { CONTENT_TYPES } from '@/constants';

import BaseEditor from './base-editor';

type HeadingEditorProps = {
  //
};

const schema = object({
  name: string(),
  email: string(),
  title: union([string(), _undefined(), _null()]),
  phone: union([string(), _undefined()]),
  location: union([string(), _undefined()]),
  github: union([string(), _undefined()]),
  linkedin: union([string(), _undefined()]),
});

export default function HeadingEditor({}: HeadingEditorProps) {
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
      type={CONTENT_TYPES.HEADING}
      macro="Heading"
      style={style}
      json={EXAMPLE_HEADING}
      schema={schema}
    />
  );
}
