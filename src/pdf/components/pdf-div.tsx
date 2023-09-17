import { View } from '@react-pdf/renderer';
import { ReactNode } from 'react';

import BaseElement from './pdf-base-element';

type DivProps = {
  children: ReactNode;
  className?: string;
};

export default function Div({ children, className }: DivProps) {
  return (
    <BaseElement Element={View} className={className}>
      {children}
    </BaseElement>
  );
}
