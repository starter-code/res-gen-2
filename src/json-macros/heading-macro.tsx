import { HeadingJson } from '@/types/item-types';

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
      <h1>{name}</h1>
      {title && <h2>{title}</h2>}
      <div>
        {phone && <span>{phone}</span>}
        {email && <span>{email}</span>}
        {github && <span>{github}</span>}
        {linkedin && <span>{linkedin}</span>}
      </div>
    </div>
  );
}
