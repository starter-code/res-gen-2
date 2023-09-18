import { Text } from '@react-pdf/renderer';

import { usePdfDocumentContext } from '@/context/pdf-document-context';
import { PdfComponentProps } from '@/types/pdf';

type ListItemProps = PdfComponentProps;

export default function LI({ children, className }: ListItemProps) {
  const { computeStyle } = usePdfDocumentContext();

  return <Text style={computeStyle(className, 'li')}>&#8226; {children}</Text>;
}
