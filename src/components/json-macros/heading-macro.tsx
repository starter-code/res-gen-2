import Image from 'next/image';

import { HeadingJson } from '@/types/json-heading';

type HeadingMacroProps = HeadingJson;

export default function HeadingMacro(props: HeadingMacroProps) {
  const { name, title, phone, email, github, linkedin, website } = props;

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">{name}</h1>
      {title && <h4 className="text-center">{title}</h4>}
      <div className="flex flex-row justify-center text-center">
        {phone && <span className="mr-1">📞 {phone}</span>}
        {email && (
          <span className="mr-2">
            <Image //
              src="./gmail.svg"
              className="gmail-icon inline mr-1"
              height="16"
              width="16"
              alt="gmail icon"
            />
            {email}
          </span>
        )}
        {github && (
          <span className="mr-2">
            <Image //
              src="./github.svg"
              className="github-icon inline mr-1"
              height="16"
              width="16"
              alt="github icon"
            />
            {github}
          </span>
        )}
        {linkedin && (
          <span className="mr-2">
            <Image
              src="./linkedin.svg"
              className="linkedin-icon inline mr-1"
              height="16"
              width="16"
              alt="linkedin icon"
            />
            {linkedin}
          </span>
        )}
        {website && (
          <span className="mr-2">
            <Image //
              src="./website.svg"
              className="website-icon inline mr-1"
              height="16"
              width="16"
              alt="website icon"
            />
            {website}
          </span>
        )}
      </div>
    </div>
  );
}
