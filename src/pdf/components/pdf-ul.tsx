import { Text } from '@react-pdf/renderer';
import { ReactNode } from 'react';

import { usePdfDocumentContext } from '@/context/pdf-document-context';

type UnorderedListProps = {
  children: ReactNode;
  className?: string;
};

export default function UL({ children, className }: UnorderedListProps) {
  const { computeStyle } = usePdfDocumentContext();

  return <Text style={computeStyle(className, 'ul')}>{children}</Text>;
}
