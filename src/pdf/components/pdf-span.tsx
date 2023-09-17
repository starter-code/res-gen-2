import { Text } from '@react-pdf/renderer';
import { ReactNode } from 'react';

import BaseElement from './pdf-base-element';
import classNames from 'classnames';

type SpanProps = {
  children: ReactNode;
  className?: string;
};

export default function Span({ children, className: classes }: SpanProps) {
  const className = classNames('span', classes);

  return (
    <BaseElement Element={Text} className={className}>
      {children}
    </BaseElement>
  );
}
