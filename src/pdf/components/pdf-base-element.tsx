import { usePdfDocumentContext } from '@/context/pdf-document-context';
import { PdfComponentProps } from '@/types/pdf';
import { useMemo, ElementType } from 'react';

type BaseElementRequiredProps = {
  Element: ElementType;
  element: string;
  style: {};
};

type BaseElementProps = PdfComponentProps & BaseElementRequiredProps;

export default function BaseElement({ children, className, element, Element, style = {} }: BaseElementProps) {
  const { computeStyle, styles: styleSheet } = usePdfDocumentContext();

  const styles = useMemo(
    () => computeStyle(className, element, style),
    [computeStyle, className, element, style], //
  );

  const debug = useMemo(() => className?.includes('debug'), [className]);

  if (debug) {
    console.info('^^^ styleSheet', styleSheet);
    console.info('^^^ styles', styles);
    console.info('^^^ className', className);
  }

  return (
    <Element style={styles} debug={debug}>
      {children}
    </Element>
  );
}
