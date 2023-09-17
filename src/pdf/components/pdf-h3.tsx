import { Text } from '@react-pdf/renderer';
import { ReactNode } from 'react';

import BaseElement from './pdf-base-element';
import classNames from 'classnames';

type Header3Props = {
  children: ReactNode;
  className?: string;
};

export default function H3({ children, className: classes }: Header3Props) {
  const className = classNames('h3', classes);

  return (
    <BaseElement Element={Text} className={className}>
      {children}
    </BaseElement>
  );
}
