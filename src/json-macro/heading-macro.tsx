type HeadingMacroProps = {
  name: string;
  title: string;
  phone: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
};

export default function HeadingMacro({
  name,
  phone,
  email,
  github,
  linkedin,
}: HeadingMacroProps) {
  return (
    <div>
      <h1>{name}</h1>
      <div>
        {phone && <span>{phone}</span>}
        {email && <span>{email}</span>}
        {github && <span>{github}</span>}
        {linkedin && <span>{linkedin}</span>}
      </div>
    </div>
  );
}
