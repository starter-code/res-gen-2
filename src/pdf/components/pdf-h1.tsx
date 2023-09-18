import { Text } from '@react-pdf/renderer';
import { ReactNode } from 'react';

import { usePdfDocumentContext } from '@/context/pdf-document-context';

type Header1Props = {
  children: ReactNode;
  className?: string;
};

export default function H1({ children, className }: Header1Props) {
  const { computeStyle } = usePdfDocumentContext();

  return <Text style={computeStyle(className, 'h1')}>{children}</Text>;
}
