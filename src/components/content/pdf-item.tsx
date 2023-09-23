import { renderToStaticMarkup } from 'react-dom/server';

import { toPdfComponents } from '@/utils/pdf-transform-util';

import MacroItem from './macro-item';

import type { ContentAll } from '@/types/content-all';

type PdfItemProps = ContentAll;

export default function PdfItem(props: PdfItemProps) {
  const element = <MacroItem key={props.contentId} {...props} />;
  const markup = renderToStaticMarkup(element);
  const component = toPdfComponents(markup);

  return component;
}
