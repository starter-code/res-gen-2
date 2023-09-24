import c from 'classnames';
import { null as _null, object, string, undefined as _undefined, union } from 'zod';

import EXAMPLE_HEADING from '@/__example-json/heading.json';
import { CONTENT_TYPES } from '@/constants';
import type { ContentHeading, HeadingJson } from '@/types/content-heading';
import type { NeverProps } from '@/types/generics';

import BaseEditor from './base-editor';

type HeadingEditorProps =
  | NeverProps
  | (ContentHeading & {
      content?: HeadingJson;
    });

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

  const className = c('heading-editor');

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
