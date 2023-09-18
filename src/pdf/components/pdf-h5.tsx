import { Text } from '@react-pdf/renderer';
import { ReactNode } from 'react';

import { usePdfDocumentContext } from '@/context/pdf-document-context';

type Header5Props = {
  children: ReactNode;
  className?: string;
};

export default function H5({ children, className }: Header5Props) {
  const { computeStyle } = usePdfDocumentContext();

  return <Text style={computeStyle(className, 'h5')}>{children}</Text>;
}
