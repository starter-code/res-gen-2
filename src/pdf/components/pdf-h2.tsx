import { Text } from '@react-pdf/renderer';

import { usePdfDocumentContext } from '@/context/pdf-document-context';
import { PdfComponentProps } from '@/types/pdf';
import { useMemo } from 'react';

type Header2Props = PdfComponentProps;

export default function H2({ children, className }: Header2Props) {
  const { computeStyle } = usePdfDocumentContext();

  const style = useMemo(
    () => computeStyle(className, 'h2'),
    [className, computeStyle], //
  );

  return <Text style={style}>{children}</Text>;
}
