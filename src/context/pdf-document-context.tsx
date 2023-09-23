import ReactPDF from '@react-pdf/renderer';
import React, { createContext, useContext, ReactNode, useCallback } from 'react';

import type { LayoutItem } from '@/types/layouts';
import type { ContentAll } from '@/types/content-all';

type PdfDocumentContextType = {
  items: ContentAll[];
  layouts: LayoutItem[];
  styles: ReactPDF.Styles;
  /**
   *
   * ```ts
   * computeStyle(className, 'div')
   * ```
   */
  computeStyle: (className?: string, ...elements: Array<string | {}>) => Record<string, string>;
};

const initialState: PdfDocumentContextType = {
  items: [],
  layouts: [],
  styles: {},
  computeStyle: () => ({}),
};

const PdfDocumentContext = createContext<PdfDocumentContextType>(initialState);

type PdfDocumentProviderProps = {
  children: ReactNode;
  items: ContentAll[];
  layouts: LayoutItem[];
  styles: ReactPDF.Styles;
};

/**
 * This is layer is inside of an iFrame and cannot access upper level contexts
 *
 * @param {PdfDocumentProviderProps} param0 params
 * @returns
 */
export function PdfDocumentProvider(props: PdfDocumentProviderProps) {
  const { children, styles, items, layouts } = props;

  const computeStyle = useCallback(
    (className?: string, ...elements: Array<string | {}>) => {
      const classNames = className ? className.split(' ') : [];
      const classesList = [...classNames, ...elements];

      const compiledStyle = classesList.reduce((previousValue, currentValue) => {
        if (typeof currentValue === 'object') {
          return { ...previousValue, ...currentValue };
        }

        if (typeof currentValue === 'string' && styles[currentValue]) {
          return { ...previousValue, ...styles[currentValue] };
        }

        return { ...previousValue };
      }, {});

      // this property causes spacing issues in pdf
      // @ts-ignore
      delete compiledStyle['lineHeight'];

      return compiledStyle;
    },
    [styles],
  );

  return (
    <PdfDocumentContext.Provider value={{ styles, items, layouts, computeStyle }}>
      {children}
    </PdfDocumentContext.Provider>
  );
}

export function usePdfDocumentContext() {
  const context = useContext(PdfDocumentContext);

  if (context === undefined) {
    throw new Error('usePdfDocumentContext must be used within a PdfDocumentProvider');
  }

  return context;
}
