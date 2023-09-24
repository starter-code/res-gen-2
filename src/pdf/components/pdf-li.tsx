import { Text } from '@react-pdf/renderer';

import BaseElement from './pdf-base-element';
import Div from './pdf-div';

import ListItemBullet from '../icons/pdf-list-item-bullet';

import type { PdfComponentProps } from '@/types/pdf';

type ListItemProps = PdfComponentProps;

export default function ListItem({ children, className, style = {} }: ListItemProps) {
  return (
    <Div className="flex flex-row align-center">
      <ListItemBullet style={{ marginLeft: 0, marginRight: 2 }} />
      <BaseElement element="li" Element={Text} style={{ style, margin: 0 }} className={className}>
        {children}
      </BaseElement>
    </Div>
  );
}
