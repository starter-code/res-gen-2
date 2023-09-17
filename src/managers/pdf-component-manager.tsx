import React, { ReactElement, ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

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
import UL from '@/pdf/components/pdf-ul';
import LI from '@/pdf/components/pdf-li';
import { toJsx } from '@/utils/pdf-transform-util';

import type { ContentItem } from '@/types/content-item';

function replaceComponents(element: ReactNode): ReactNode {
  const { props } = element as ReactElement;

  if (!props) {
    return element;
  }

  if (!props.children) {
    return element;
  }

  return (
    <>
      {React.Children.map(props.children, child => {
        if (!child.type) {
          return element;
        }

        switch (child.type) {
          case 'div':
            return replaceComponents(<Div {...props}>{child.props.children}</Div>);
          case 'span':
            return replaceComponents(<Span {...props}>{child.props.children}</Span>);
          case 'p':
            return replaceComponents(<P {...props}>{child.props.children}</P>);
          case 'h1':
            return replaceComponents(<H1 {...props}>{child.props.children}</H1>);
          case 'h2':
            return replaceComponents(<H2 {...props}>{child.props.children}</H2>);
          case 'h3':
            return replaceComponents(<H3 {...props}>{child.props.children}</H3>);
          case 'h4':
            return replaceComponents(<H4 {...props}>{child.props.children}</H4>);
          case 'h5':
            return replaceComponents(<H5 {...props}>{child.props.children}</H5>);
          case 'ul':
            return replaceComponents(<UL {...props}>{child.props.children}</UL>);
          case 'li':
            return replaceComponents(<LI {...props}>{child.props.children}</LI>);
          default:
            return <>{replaceComponents(child.props.children)}</>;
        }
      })}
    </>
  );
}

function Item(props: ContentItem) {
  switch (props.contentType) {
    case CONTENT_TYPES.HEADING: {
      const jsx = renderToStaticMarkup(<HeadingMacro key={props.contentId} {...JSON.parse(props.content)} />);
      const component = toJsx(jsx);

      return replaceComponents(component);
    }
    case CONTENT_TYPES.SUMMARY: {
      const jsx = renderToStaticMarkup(<SummaryMacro key={props.contentId} {...JSON.parse(props.content)} />);
      const component = toJsx(jsx);

      return replaceComponents(component);
    }
    case CONTENT_TYPES.EXPERIENCE: {
      const jsx = renderToStaticMarkup(<ExperienceMacro key={props.contentId} {...JSON.parse(props.content)} />);
      const component = toJsx(jsx);
      const pdfComponent = replaceComponents(component);

      //   const component = (
      //     <div>
      //       <p>hello0</p>
      //       <p>
      //         <span>hello</span>
      //         <span>world 1</span>
      //       </p>
      //       {/* <p>
      //         <span>hello</span>
      //         <span>world 2</span>
      //       </p> */}
      //     </div>
      //   );

      console.log('!!! jsx', jsx, component, pdfComponent);

      return replaceComponents(component);
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
