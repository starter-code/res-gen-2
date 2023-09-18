import { View } from '@react-pdf/renderer';

import { usePdfDocumentContext } from '@/context/pdf-document-context';
import { PdfComponentProps } from '@/types/pdf';

type DivProps = PdfComponentProps;

export default function Div({ children, className }: DivProps) {
  const { computeStyle } = usePdfDocumentContext();

  return <View style={computeStyle(className, 'div')}>{children}</View>;
}
