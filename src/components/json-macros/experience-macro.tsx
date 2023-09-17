import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ExperienceJson } from '@/types/json-experience';

type ExperienceMacroProps = ExperienceJson;

export default function ExperienceMacro(props: ExperienceMacroProps) {
  const {
    company, //
    location,
    title,
    dates,
    tags: rawTags,
    descriptions: rawDescriptions,
  } = props;

  const tags = useMemo(() => rawTags?.map(tag => ({ id: uuidv4(), text: tag })), [rawTags]);
  const descriptions = useMemo(() => rawDescriptions?.map(tag => ({ id: uuidv4(), text: tag })), [rawDescriptions]);

  return (
    <div>
      <div className="flex">
        <p className="mr-1 font-bold">{company}</p>
        {location && (
          <p className="grow">
            | <span>{location}</span>
          </p>
        )}
        <p>{dates}</p>
      </div>
      <p className="italic">{title}</p>
      <div>
        {tags?.map(tag => {
          return (
            <span key={tag.id} className="bg-black text-white font-bold py-1 px-1 mr-1 rounded text-xs">
              {tag.text}
            </span>
          );
        })}
      </div>
      {descriptions && (
        <ul>
          {descriptions?.map(description => {
            return (
              <li key={description.id} className="list-disc ml-4">
                {description.text}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
