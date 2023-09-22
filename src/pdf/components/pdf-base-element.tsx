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
  const { computeStyle } = usePdfDocumentContext();

  const styles = useMemo(
    () => computeStyle(className, element, style),
    [computeStyle, className, element, style], //
  );

  return <Element style={styles}>{children}</Element>;
}
