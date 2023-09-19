import { Text } from '@react-pdf/renderer';

import { usePdfDocumentContext } from '@/context/pdf-document-context';
import { PdfComponentProps } from '@/types/pdf';
import { useMemo } from 'react';

type Header3Props = PdfComponentProps;

export default function H3({ children, className }: Header3Props) {
  const { computeStyle } = usePdfDocumentContext();

  const style = useMemo(
    () => computeStyle(className, 'h3'),
    [className, computeStyle], //
  );

  return <Text style={style}>{children}</Text>;
}
