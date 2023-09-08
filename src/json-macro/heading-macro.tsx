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
        <span>{phone}</span>
        <span>{email}</span>
        <span>{github}</span>
        <span>{linkedin}</span>
      </div>
    </div>
  );
}
