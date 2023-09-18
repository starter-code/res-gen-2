import { SummaryJson } from '@/types/json-summary';

type SummaryMacroProps = SummaryJson;

export default function SummaryMacro(props: SummaryMacroProps) {
  const { heading, summary } = props;

  return (
    <div className="div">
      <h3 className="text-xl bg-gray-400 text-center border-b border-black">{heading}</h3>
      <p className="mt-1">{summary}</p>
    </div>
  );
}
