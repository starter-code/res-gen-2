import { Text } from '@react-pdf/renderer';

import { usePdfDocumentContext } from '@/context/pdf-document-context';
import { PdfComponentProps } from '@/types/pdf';
import { useMemo } from 'react';

type ParagraphProps = PdfComponentProps;

export default function P({ children, className }: ParagraphProps) {
  const { computeStyle } = usePdfDocumentContext();

  const style = useMemo(
    () => computeStyle(className, 'p'),
    [className, computeStyle], //
  );

  return <Text style={style}>{children}</Text>;
}
