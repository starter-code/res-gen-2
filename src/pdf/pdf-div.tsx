import { View } from '@react-pdf/renderer';
import { ReactNode, useMemo } from 'react';

import { usePdfDocumentContext } from '@/context/pdf-document-context';

type DivProps = {
  children: ReactNode;
  className?: string;
};

export default function Div({ children, className }: DivProps) {
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

  return <View style={style}>{children}</View>;
}
