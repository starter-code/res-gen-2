import { View } from '@react-pdf/renderer';

import { usePdfDocumentContext } from '@/context/pdf-document-context';
import { PdfComponentProps } from '@/types/pdf';
import { useMemo } from 'react';

type UnorderedListProps = PdfComponentProps;

export default function UL({ children, className }: UnorderedListProps) {
  const { computeStyle } = usePdfDocumentContext();

  const style = useMemo(
    () => computeStyle(className, 'ul'),
    [className, computeStyle], //
  );

  return <View style={style}>{children}</View>;
}
