import { Text } from '@react-pdf/renderer';
import { ReactNode } from 'react';

import BaseElement from './pdf-base-element';
import classNames from 'classnames';

type ListItemProps = {
  children: ReactNode;
  className?: string;
};

export default function LI({ children, className: classes }: ListItemProps) {
  const className = classNames('li', classes);

  return (
    <BaseElement Element={Text} className={className}>
      {children}
    </BaseElement>
  );
}
