import { View } from '@react-pdf/renderer';

import { PdfComponentProps } from '@/types/pdf';
import BaseElement from './pdf-base-element';

type DivProps = PdfComponentProps;

export default function Div({ children, className, style = {} }: DivProps) {
  return (
    <BaseElement element="div" Element={View} style={style} className={className}>
      {children}
    </BaseElement>
  );
}
