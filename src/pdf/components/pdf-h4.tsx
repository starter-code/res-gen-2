import { Text } from '@react-pdf/renderer';
import { ReactNode } from 'react';

import { usePdfDocumentContext } from '@/context/pdf-document-context';

type Header4Props = {
  children: ReactNode;
  className?: string;
};

export default function H4({ children, className }: Header4Props) {
  const { computeStyle } = usePdfDocumentContext();

  return <Text style={computeStyle(className, 'h4')}>{children}</Text>;
}
