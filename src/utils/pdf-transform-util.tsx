import React, { ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

/**
 * From chatGPT
 * @param htmlString
 * @returns
 */
export function toJsx(htmlString: string): JSX.Element | JSX.Element[] {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;

  const jsxElements: JSX.Element[] = [];

  for (let i = 0; i < tempDiv.childNodes.length; i++) {
    const childNode = tempDiv.childNodes[i];

    if (childNode.nodeType === 1) {
      const { tagName, attributes } = childNode as Element;

      const props: { [key: string]: string } = {
        key: uuidv4(),
      };

      for (let j = 0; j < attributes.length; j++) {
        const { name, value } = attributes[j];
        props[name] = value;
      }

      const reactElement = React.createElement(tagName.toLowerCase(), props, toJsx((childNode as Element).innerHTML));

      jsxElements.push(reactElement);
    } else if (childNode.nodeType === 3) {
      // @ts-ignore
      jsxElements.push(childNode.textContent || ''); // Handle text nodes
    }
  }

  return jsxElements.length === 1 ? jsxElements[0] : jsxElements;
}
