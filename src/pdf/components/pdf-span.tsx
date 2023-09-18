import { Text } from '@react-pdf/renderer';

import { usePdfDocumentContext } from '@/context/pdf-document-context';
import { PdfComponentProps } from '@/types/pdf';

type SpanProps = PdfComponentProps;

export default function Span({ children, className }: SpanProps) {
  const { computeStyle } = usePdfDocumentContext();

  return <Text style={computeStyle(className, 'span')}>{children}</Text>;
}
