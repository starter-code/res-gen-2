import { View } from '@react-pdf/renderer';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { usePdfDocumentContext } from '@/context/pdf-document-context';
import { CONTENT_TYPES, LAYOUTS } from '@/constants';

import HeadingMacro from '@/components/json-macros/heading-macro';
import SummaryMacro from '@/components/json-macros/summary-macro';
import ExperienceMacro from '@/components/json-macros/experience-macro';

import { toPdfComponents } from '@/utils/pdf-transform-util';

import type { ContentItem } from '@/types/content-item';

function Item(props: ContentItem) {
  switch (props.contentType) {
    case CONTENT_TYPES.HEADING: {
      const markup = renderToStaticMarkup(<HeadingMacro key={props.contentId} {...JSON.parse(props.content)} />);
      const component = toPdfComponents(markup);

      return component;
    }
    case CONTENT_TYPES.SUMMARY: {
      const markup = renderToStaticMarkup(<SummaryMacro key={props.contentId} {...JSON.parse(props.content)} />);
      const component = toPdfComponents(markup);

      return component;
    }
    case CONTENT_TYPES.EXPERIENCE: {
      const markup = renderToStaticMarkup(<ExperienceMacro key={props.contentId} {...JSON.parse(props.content)} />);
      const component = toPdfComponents(markup);

      return component;
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
              <View key={layout.layoutId}>
                {items.map(item => {
                  return <Item key={item.contentId} {...item} />;
                })}
              </View>
            );
          }
          case LAYOUTS.DOUBLE: {
            return (
              <View key={layout.layoutId}>
                {items.map(item => {
                  return <Item key={item.contentId} {...item} />;
                })}
              </View>
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
