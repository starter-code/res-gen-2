import { Text as PdfText } from '@react-pdf/renderer';
import { ReactNode, useMemo } from 'react';

import { usePdfDocumentContext } from '@/context/pdf-document-context';

type TextProps = {
  children: ReactNode;
  className?: string;
};

export default function Text({ children, className }: TextProps) {
  const { styles } = usePdfDocumentContext();

  const style = useMemo(() => {
    const selectors = className?.split(' ').map(selector => {
      if (!styles[selector]) {
        throw new Error(`Unsupported Selector ${selector}`);
      }

      return styles[selector];
    });

    return selectors;
  }, [className, styles]);

  return <PdfText style={style}>{children}</PdfText>;
}
