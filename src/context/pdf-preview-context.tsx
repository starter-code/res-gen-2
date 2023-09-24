import ReactPDF, { StyleSheet } from '@react-pdf/renderer';
import React, { createContext, ReactNode, useContext, useMemo } from 'react';

import { toJsObject } from '@/utils/pdf-css-transform-util';

type PdfPreviewContextType = {
  styles: ReactPDF.Styles;
};

const initialState: PdfPreviewContextType = {
  styles: {},
};

const PdfPreviewContext = createContext<PdfPreviewContextType>(initialState);

type PdfPreviewProps = {
  children: ReactNode;
};

/**
 * This is the last layer before the iFrame
 *
 * @param {PdfPreviewProps} param0 params
 * @returns
 */
export function PdfPreviewProvider({ children }: PdfPreviewProps) {
  const styleSheets = useMemo(() => window.document.styleSheets, []);

  const styles = useMemo(() => {
    const rules = Object.values(styleSheets)
      .map(styleSheet =>
        Object.values(styleSheet.cssRules).filter(cssRule =>
          cssRule instanceof CSSStyleRule //
            ? cssRule.selectorText.startsWith('.')
            : false,
        ),
      )
      .flat() as CSSStyleRule[];

    const styleRules = rules.reduce((previousValue, currentValue) => {
      const { cssText, selectorText } = currentValue;

      return { ...previousValue, ...toJsObject(cssText, selectorText) };
    }, {});

    const styleSheet = StyleSheet.create({
      ...styleRules,
      page: {
        fontSize: '12px', // rem
        padding: '24px',
        fontFamily: 'Roboto',
      },
      text: {
        fontFamily: 'Roboto',
        noWrap: true, // Prevent text from wrapping
      },
      '': {},
    });

    return styleSheet;
  }, [styleSheets]);

  return <PdfPreviewContext.Provider value={{ styles }}>{children}</PdfPreviewContext.Provider>;
}

export function usePdfPreviewContext() {
  const context = useContext(PdfPreviewContext);

  if (context === undefined) {
    throw new Error('usePdfPreviewContext must be used within a PdfPreview');
  }

  return context;
}
