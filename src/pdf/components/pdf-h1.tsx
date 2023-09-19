import { Text } from '@react-pdf/renderer';

import { usePdfDocumentContext } from '@/context/pdf-document-context';
import { PdfComponentProps } from '@/types/pdf';
import { useMemo } from 'react';

type Header1Props = PdfComponentProps;

export default function H1({ children, className }: Header1Props) {
  const { computeStyle } = usePdfDocumentContext();

  const style = useMemo(
    () => computeStyle(className, 'h1'),
    [className, computeStyle], //
  );

  return <Text style={style}>{children}</Text>;
}
