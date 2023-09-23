import { useMemo } from 'react';
import { object, string, array, undefined as _undefined, null as _null } from 'zod';

import EXAMPLE_EXPERIENCE from '@/__example-json/experience.json';
import { CONTENT_TYPES } from '@/constants';

import BaseEditor from './base-editor';

import type { ContentExperience, ExperienceJson } from '@/types/content-experience';
import classnames from 'classnames';

type ExperienceEditorProps = ContentExperience & {
  content?: ExperienceJson;
};

const schema = object({
  title: string(),
  company: string(),
  location: string().optional(),
  dates: string().optional(),
  tags: array(string()).optional(),
  descriptions: array(string()).optional(),
});

export default function ExperienceEditor(props: ExperienceEditorProps) {
  const { content = EXAMPLE_EXPERIENCE } = props;

  const className = classnames('experience-editor');

  return (
    <BaseEditor //
      {...props}
      className={className}
      contentType={CONTENT_TYPES.EXPERIENCE}
      macro="Experience"
      content={content}
      schema={schema}
    />
  );
}
