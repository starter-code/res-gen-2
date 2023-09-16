import { HeadingJson } from '@/types/heading-macro-types';

type HeadingMacroProps = HeadingJson;

export default function HeadingMacro({
  name,
  title,
  phone,
  email,
  github,
  linkedin,
}: HeadingMacroProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold">{name}</h1>
      {title && <h2>{title}</h2>}
      <div>
        {phone && <span className="mr-2">{phone}</span>}
        {email && <span className="mr-2">{email}</span>}
        {github && <span className="mr-2">{github}</span>}
        {linkedin && <span className="mr-2">{linkedin}</span>}
      </div>
    </div>
  );
}
