import { Text } from '@react-pdf/renderer';
import { ReactNode } from 'react';

import { usePdfDocumentContext } from '@/context/pdf-document-context';

type Header2Props = {
  children: ReactNode;
  className?: string;
};

export default function H2({ children, className }: Header2Props) {
  const { computeStyle } = usePdfDocumentContext();

  return <Text style={computeStyle(className, 'h2')}>{children}</Text>;
}
