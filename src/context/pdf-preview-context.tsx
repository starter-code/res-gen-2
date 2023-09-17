import ReactPDF, { StyleSheet } from '@react-pdf/renderer';
import React, { createContext, useContext, ReactNode, useMemo } from 'react';

import { toJsObject, toCamel, replaceCSSVariables, toPdfCssFormat } from '@/utils/css-util';

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
      const selector = currentValue.selectorText.replace('.', '');
      const cssRule = toJsObject(currentValue.cssText.replace(currentValue.selectorText, ''));
      const cssObject = replaceCSSVariables(cssRule);

      Object.entries(cssObject).forEach(([key, value]: [value: string, key: string]) => {
        delete cssObject[key];

        Object.assign(cssObject, { [toCamel(key)]: toPdfCssFormat(value) });
      });

      return { ...previousValue, [selector]: cssObject };
    }, {});

    const styleSheet = StyleSheet.create({
      ...styleRules,
      page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
        width: '100vw',
      },
      placeholder: {
        width: '100%',
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
