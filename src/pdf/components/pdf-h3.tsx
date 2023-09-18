import { Text } from '@react-pdf/renderer';
import { ReactNode } from 'react';

import { usePdfDocumentContext } from '@/context/pdf-document-context';

type Header3Props = {
  children: ReactNode;
  className?: string;
};

export default function H3({ children, className }: Header3Props) {
  const { computeStyle } = usePdfDocumentContext();

  return <Text style={computeStyle(className, 'h3')}>{children}</Text>;
}
