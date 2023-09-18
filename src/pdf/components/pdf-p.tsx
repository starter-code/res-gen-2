import { Text } from '@react-pdf/renderer';

import { usePdfDocumentContext } from '@/context/pdf-document-context';
import { PdfComponentProps } from '@/types/pdf';

type ParagraphProps = PdfComponentProps;

export default function P({ children, className }: ParagraphProps) {
  const { computeStyle } = usePdfDocumentContext();

  return <Text style={computeStyle(className, 'p')}>{children}</Text>;
}
