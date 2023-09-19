import { Text } from '@react-pdf/renderer';

import { usePdfDocumentContext } from '@/context/pdf-document-context';
import { PdfComponentProps } from '@/types/pdf';
import { useMemo } from 'react';

type SpanProps = PdfComponentProps;

export default function Span({ children, className }: SpanProps) {
  const { computeStyle } = usePdfDocumentContext();

  const style = useMemo(
    () => computeStyle(className, 'span'),
    [className, computeStyle], //
  );

  return <Text style={style}>{children}</Text>;
}
