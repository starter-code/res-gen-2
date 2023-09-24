import c from 'classnames';
import { object, string, array } from 'zod';

import EXAMPLE_EXPERIENCE from '@/__example-json/experience.json';
import { CONTENT_TYPES } from '@/constants';

import BaseEditor from './base-editor';

import type { ContentExperience, ExperienceJson } from '@/types/content-experience';
import { NeverProps } from '@/types/generics';

type ExperienceEditorProps =
  | NeverProps
  | (ContentExperience & {
      content?: ExperienceJson;
    });

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

  const className = c('experience-editor');

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
