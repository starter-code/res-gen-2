import { Text } from '@react-pdf/renderer';
import { ReactNode } from 'react';

import { usePdfDocumentContext } from '@/context/pdf-document-context';

type ParagraphProps = {
  children: ReactNode;
  className?: string;
};

export default function P({ children, className }: ParagraphProps) {
  const { computeStyle } = usePdfDocumentContext();

  return <Text style={computeStyle(className, 'p')}>{children}</Text>;
}
