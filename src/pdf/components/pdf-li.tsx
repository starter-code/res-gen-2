import { Text } from '@react-pdf/renderer';

import { PdfComponentProps } from '@/types/pdf';
import BaseElement from './pdf-base-element';

type ListItemProps = PdfComponentProps;

export default function ListItem({ children, className, style = {} }: ListItemProps) {
  return (
    <BaseElement element="li" Element={Text} style={style} className={className}>
      &#8226; {children}
    </BaseElement>
  );
}
