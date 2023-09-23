import { useMemo } from 'react';
import { object, string, union, undefined as _undefined, null as _null } from 'zod';

import EXAMPLE_HEADING from '@/__example-json/heading.json';
import { CONTENT_TYPES } from '@/constants';

import BaseEditor from './base-editor';

import type { ContentHeading, HeadingJson } from '@/types/content-heading';
import classnames from 'classnames';

type HeadingEditorProps = ContentHeading & {
  content?: HeadingJson;
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

export default function HeadingEditor(props: HeadingEditorProps) {
  const { content = EXAMPLE_HEADING } = props;

  const className = classnames('heading-editor');

  return (
    <BaseEditor //
      {...props}
      className={className}
      contentType={CONTENT_TYPES.HEADING}
      macro="Heading"
      content={content}
      schema={schema}
    />
  );
}
