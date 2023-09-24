import { Text } from '@react-pdf/renderer';

import BaseElement from './pdf-base-element';
import Div from './pdf-div';

import ListItemBullet from '../icons/pdf-list-item-bullet';

import type { PdfComponentProps } from '@/types/pdf';

type ListItemProps = PdfComponentProps;

export default function ListItem({ children, className, style = {} }: ListItemProps) {
  return (
    <Div className="flex flex-row align-center">
      <ListItemBullet style={{ marginLeft: -6 }} />
      <BaseElement
        element="li"
        Element={Text}
        // this is a work around because li items extend past the width of the text bounding box
        style={{ ...style, marginLeft: 2, whiteSpace: 'normal' }}
        className={className}
      >
        {children}
      </BaseElement>
    </Div>
  );
}
