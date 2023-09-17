import React, { ReactNode } from 'react';

import Div from '../pdf/pdf-div';

export function replaceComponents(element: ReactNode): ReactNode {
  if (React.isValidElement(element)) {
    const { type, props } = element;

    if (type === 'div') {
      return <Div {...props} />;
    }

    // Recursively traverse children and clone them
    const newChildren = React.Children.map(props.children, child => replaceComponents(child));

    return React.cloneElement(element, undefined, newChildren);
  }

  return element;
}
