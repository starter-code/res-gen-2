type HeadingJsonRequired = {
  name: string;
  email: string;
};

type HeadingJsonOptional = {
  title: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
};

export type HeadingJson = HeadingJsonRequired & Partial<HeadingJsonOptional>;
