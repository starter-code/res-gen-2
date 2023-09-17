import { Text } from '@react-pdf/renderer';
import { ReactNode } from 'react';

import BaseElement from './pdf-base-element';
import classNames from 'classnames';

type Header4Props = {
  children: ReactNode;
  className?: string;
};

export default function H4({ children, className: classes }: Header4Props) {
  const className = classNames('h4', classes);

  return (
    <BaseElement Element={Text} className={className}>
      {children}
    </BaseElement>
  );
}
