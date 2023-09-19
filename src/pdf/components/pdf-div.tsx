import { View } from '@react-pdf/renderer';

import { usePdfDocumentContext } from '@/context/pdf-document-context';
import { PdfComponentProps } from '@/types/pdf';
import { useMemo } from 'react';

type DivProps = PdfComponentProps;

export default function Div({ children, className }: DivProps) {
  const { computeStyle } = usePdfDocumentContext();

  const style = useMemo(
    () => computeStyle(className, 'svg'),
    [className, computeStyle], //
  );

  return <View style={style}>{children}</View>;
}
