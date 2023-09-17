import { Text } from '@react-pdf/renderer';
import { ReactNode } from 'react';

import BaseElement from './pdf-base-element';
import classNames from 'classnames';

type Header2Props = {
  children: ReactNode;
  className?: string;
};

export default function H2({ children, className: classes }: Header2Props) {
  const className = classNames('h2', classes);

  return (
    <BaseElement Element={Text} className={className}>
      {children}
    </BaseElement>
  );
}
