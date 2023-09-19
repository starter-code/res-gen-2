import { Text } from '@react-pdf/renderer';

import { usePdfDocumentContext } from '@/context/pdf-document-context';
import { PdfComponentProps } from '@/types/pdf';
import { useMemo } from 'react';

type Header4Props = PdfComponentProps;

export default function H4({ children, className }: Header4Props) {
  const { computeStyle } = usePdfDocumentContext();

  const style = useMemo(
    () => computeStyle(className, 'h4'),
    [className, computeStyle], //
  );

  return <Text style={style}>{children}</Text>;
}
