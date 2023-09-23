import BaseMacro from './base-macro';

import type { ContentSummary } from '@/types/content-summary';

type SummaryMacroProps = ContentSummary;

export default function SummaryMacro(props: SummaryMacroProps) {
  const { content } = props;
  const { heading, summary } = content;

  return (
    <BaseMacro {...props}>
      <h3 className="text-xl text-center border-b border-black">{heading}</h3>
      <p className="mt-1">{summary}</p>
    </BaseMacro>
  );
}
