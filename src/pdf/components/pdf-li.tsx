import { Text } from '@react-pdf/renderer';
import { ReactNode } from 'react';

import { usePdfDocumentContext } from '@/context/pdf-document-context';

type ListItemProps = {
  children: ReactNode;
  className?: string;
};

export default function LI({ children, className }: ListItemProps) {
  const { computeStyle } = usePdfDocumentContext();

  return <Text style={computeStyle(className, 'li')}>{children}</Text>;
}
