import { Text } from '@react-pdf/renderer';
import { ReactNode } from 'react';

import BaseElement from './pdf-base-element';
import classNames from 'classnames';

type Header5Props = {
  children: ReactNode;
  className?: string;
};

export default function H5({ children, className: classes }: Header5Props) {
  const className = classNames('h5', classes);

  return (
    <BaseElement Element={Text} className={className}>
      {children}
    </BaseElement>
  );
}
