import { ContentItem } from '@/types/content-item';
import { LayoutItem } from '@/types/layout-types';
import ReactPDF from '@react-pdf/renderer';
import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback, useEffect } from 'react';

type PdfDocumentContextType = {
  items: ContentItem[];
  layouts: LayoutItem[];
  styles: ReactPDF.Styles;
};

const initialState: PdfDocumentContextType = {
  items: [],
  layouts: [],
  styles: {},
};

const PdfDocumentContext = createContext<PdfDocumentContextType>(initialState);

type PdfDocumentProviderProps = {
  children: ReactNode;
  items: ContentItem[];
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

  return <PdfDocumentContext.Provider value={{ styles, items, layouts }}>{children}</PdfDocumentContext.Provider>;
}

export function usePdfDocumentContext() {
  const context = useContext(PdfDocumentContext);

  if (context === undefined) {
    throw new Error('usePdfDocumentContext must be used within a PdfDocumentProvider');
  }

  return context;
}
