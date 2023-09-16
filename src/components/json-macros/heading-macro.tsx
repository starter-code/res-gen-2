import { HeadingJson } from '@/types/heading-macro-types';

import { GmailSvg } from '@/icons/gmail-svg';
import { GithubSvg } from '@/icons/github-svg';
import { LinkedinSvg } from '@/icons/linkedin-svg';
import { WebsiteSvg } from '@/icons/website-svg';

type HeadingMacroProps = HeadingJson;

export default function HeadingMacro(props: HeadingMacroProps) {
  const { name, title, phone, email, github, linkedin, website } = props;

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">{name}</h1>
      {title && <h2 className="text-center">{title}</h2>}
      <div className="text-center">
        {phone && <span className="mr-2">📞 {phone}</span>}
        {email && (
          <span className="mr-2">
            <GmailSvg />
            {email}
          </span>
        )}
        {github && (
          <span className="mr-2">
            <GithubSvg />
            {github}
          </span>
        )}
        {linkedin && (
          <span className="mr-2">
            <LinkedinSvg />
            {linkedin}
          </span>
        )}
        {website && (
          <span className="mr-2">
            <WebsiteSvg />
            {website}
          </span>
        )}
      </div>
    </div>
  );
}
