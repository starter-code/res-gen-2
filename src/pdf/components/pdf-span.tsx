import { Text } from '@react-pdf/renderer';
import { ReactNode } from 'react';

import { usePdfDocumentContext } from '@/context/pdf-document-context';

type SpanProps = {
  children: ReactNode;
  className?: string;
};

export default function Span({ children, className }: SpanProps) {
  const { computeStyle } = usePdfDocumentContext();

  return <Text style={computeStyle(className, 'span')}>{children}</Text>;
}
