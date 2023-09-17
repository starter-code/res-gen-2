type ExperienceJsonRequired = {
  company: string;
  title: string;
};

type ExperienceJsonOptional = {
  dates: string;
  descriptions: string[];
  location: string;
  tags: string[];
};

export type ExperienceJson = ExperienceJsonRequired & Partial<ExperienceJsonOptional>;
