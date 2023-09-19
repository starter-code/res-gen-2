import { Text } from '@react-pdf/renderer';

import { usePdfDocumentContext } from '@/context/pdf-document-context';
import { PdfComponentProps } from '@/types/pdf';
import { useMemo } from 'react';

type Header5Props = PdfComponentProps;

export default function H5({ children, className }: Header5Props) {
  const { computeStyle } = usePdfDocumentContext();

  const style = useMemo(
    () => computeStyle(className, 'h5'),
    [className, computeStyle], //
  );

  return <Text style={style}>{children}</Text>;
}
