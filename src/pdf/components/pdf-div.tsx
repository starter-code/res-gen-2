import { View } from '@react-pdf/renderer';
import { ReactNode } from 'react';

import { usePdfDocumentContext } from '@/context/pdf-document-context';

type DivProps = {
  children: ReactNode;
  className?: string;
};

export default function Div({ children, className }: DivProps) {
  const { computeStyle } = usePdfDocumentContext();

  return <View style={computeStyle(className, 'div')}>{children}</View>;
}
