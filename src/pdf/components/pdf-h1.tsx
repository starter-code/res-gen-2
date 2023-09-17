import { Text } from '@react-pdf/renderer';
import { ReactNode } from 'react';

import BaseElement from './pdf-base-element';
import classNames from 'classnames';

type Header1Props = {
  children: ReactNode;
  className?: string;
};

export default function H1({ children, className: classes }: Header1Props) {
  const className = classNames('h1', classes);

  return (
    <BaseElement Element={Text} className={className}>
      {children}
    </BaseElement>
  );
}
