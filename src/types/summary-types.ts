type SummaryJsonRequired = {
  summary: string;
};

type SummaryJsonOptional = {
  heading: string;
};

export type SummaryJson = SummaryJsonRequired & Partial<SummaryJsonOptional>;
