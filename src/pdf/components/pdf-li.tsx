import { Text } from '@react-pdf/renderer';

import { usePdfDocumentContext } from '@/context/pdf-document-context';
import { PdfComponentProps } from '@/types/pdf';
import { useMemo } from 'react';

type ListItemProps = PdfComponentProps;

export default function LI({ children, className }: ListItemProps) {
  const { computeStyle } = usePdfDocumentContext();

  const style = useMemo(
    () => computeStyle(className, 'li'),
    [className, computeStyle], //
  );

  return <Text style={style}>&#8226; {children}</Text>;
}
