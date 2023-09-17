import React, { ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { v4 as uuidv4 } from 'uuid';

import { usePdfDocumentContext } from '@/context/pdf-document-context';
import { CONTENT_TYPES, LAYOUTS } from '@/constants';

import HeadingMacro from '@/components/json-macros/heading-macro';
import SummaryMacro from '@/components/json-macros/summary-macro';
import ExperienceMacro from '@/components/json-macros/experience-macro';
import Div from '../pdf/components/pdf-div';
import H1 from '@/pdf/components/pdf-h1';
import H2 from '@/pdf/components/pdf-h2';
import H3 from '@/pdf/components/pdf-h3';
import H4 from '@/pdf/components/pdf-h4';
import H5 from '@/pdf/components/pdf-h5';
import P from '@/pdf/components/pdf-p';
import Span from '@/pdf/components/pdf-span';

import type { ContentItem } from '@/types/content-item';

function htmlStringToJSX(htmlString: string): JSX.Element | JSX.Element[] {
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

      const reactElement = React.createElement(
        tagName.toLowerCase(),
        props,
        htmlStringToJSX((childNode as Element).innerHTML),
      );

      jsxElements.push(reactElement);
    } else if (childNode.nodeType === 3) {
      // @ts-ignore
      jsxElements.push(childNode.textContent || ''); // Handle text nodes
    }
  }

  return jsxElements.length === 1 ? jsxElements[0] : jsxElements;
}

function replaceComponents(element: ReactNode): ReactNode {
  if (React.isValidElement(element)) {
    const { props } = element;

    return (
      <>
        {React.Children.map(props.children, child => {
          switch (child.type) {
            case 'div':
              return <Div {...props}>{replaceComponents(child.props.children)}</Div>;
            case 'span':
              return <Span {...props}>{replaceComponents(child.props.children)}</Span>;
            case 'p':
              return <P {...props}>{replaceComponents(child.props.children)}</P>;
            case 'h1':
              return <H1 {...props}>{replaceComponents(child.props.children)}</H1>;
            case 'h2':
              return <H2 {...props}>{replaceComponents(child.props.children)}</H2>;
            case 'h3':
              return <H3 {...props}>{replaceComponents(child.props.children)}</H3>;
            case 'h4':
              return <H4 {...props}>{replaceComponents(child.props.children)}</H4>;
            case 'h5':
              return <H5 {...props}>{replaceComponents(child.props.children)}</H5>;
            default:
              return <>{replaceComponents(child.props.children)}</>;
          }
        })}
      </>
    );
  }

  return element;
}

function Item(props: ContentItem) {
  switch (props.contentType) {
    case CONTENT_TYPES.HEADING: {
      return replaceComponents(<HeadingMacro key={props.contentId} {...JSON.parse(props.content)} />);
    }
    case CONTENT_TYPES.SUMMARY: {
      const jsx = renderToStaticMarkup(<SummaryMacro key={props.contentId} {...JSON.parse(props.content)} />);
      const component = htmlStringToJSX(jsx);

      return replaceComponents(component);
    }
    case CONTENT_TYPES.EXPERIENCE: {
      return replaceComponents(<ExperienceMacro key={props.contentId} {...JSON.parse(props.content)} />);
    }
    default: {
      throw new Error(`Unsupported contentType ${props.contentType}`);
    }
  }
}

export default function PdfComponentManager() {
  const { layouts, items } = usePdfDocumentContext();

  return (
    <>
      {layouts.map(layout => {
        switch (layout.layoutType) {
          case LAYOUTS.SINGLE: {
            return (
              <Div key={layout.layoutId}>
                {items.map(item => {
                  return <Item key={item.contentId} {...item} />;
                })}
              </Div>
            );
          }
          case LAYOUTS.DOUBLE: {
            return (
              <Div key={layout.layoutId}>
                {items.map(item => {
                  return <Item key={item.contentId} {...item} />;
                })}
              </Div>
            );
          }
          default: {
            throw new Error(`Unsupported layoutType ${layout.layoutType}`);
          }
        }
      })}
    </>
  );
}
