import { ReactNode, useMemo, ElementType } from 'react';

import { usePdfDocumentContext } from '@/context/pdf-document-context';

type BaseElementProps = {
  children: ReactNode;
  Element: ElementType;
  className?: string;
};

export default function BaseElement({ children, className, Element }: BaseElementProps) {
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

  const props = useMemo(() => {
    if (!className) return {};
    return { style };
  }, [className, style]);

  return <Element {...props}>{children}</Element>;
}
