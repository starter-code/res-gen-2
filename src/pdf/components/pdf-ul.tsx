import { View } from '@react-pdf/renderer';

import { usePdfDocumentContext } from '@/context/pdf-document-context';
import { PdfComponentProps } from '@/types/pdf';

type UnorderedListProps = PdfComponentProps;

export default function UL({ children, className }: UnorderedListProps) {
  const { computeStyle } = usePdfDocumentContext();

  return <View style={computeStyle(className, 'ul')}>{children}</View>;
}
