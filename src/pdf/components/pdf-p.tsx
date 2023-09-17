import { Text } from '@react-pdf/renderer';
import { ReactNode } from 'react';

import BaseElement from './pdf-base-element';
import classNames from 'classnames';

type ParagraphProps = {
  children: ReactNode;
  className?: string;
};

export default function P({ children, className: classes }: ParagraphProps) {
  const className = classNames('p', classes);

  return (
    <BaseElement Element={Text} className={className}>
      {children}
    </BaseElement>
  );
}
