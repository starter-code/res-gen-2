import { Text } from '@react-pdf/renderer';
import { ReactNode } from 'react';

import BaseElement from './pdf-base-element';
import classNames from 'classnames';

type UnorderedListProps = {
  children: ReactNode;
  className?: string;
};

export default function UL({ children, className: classes }: UnorderedListProps) {
  const className = classNames('ul', classes);

  return (
    <BaseElement Element={Text} className={className}>
      {children}
    </BaseElement>
  );
}
