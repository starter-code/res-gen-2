import ReactPDF from '@react-pdf/renderer';
import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback, useEffect } from 'react';

type PdfDocumentContextType = {
  styles: ReactPDF.Styles;
};

const initialState: PdfDocumentContextType = {
  styles: {},
};

const PdfDocumentContext = createContext<PdfDocumentContextType>(initialState);

type PdfDocumentProviderProps = {
  children: ReactNode;
  styles: ReactPDF.Styles;
};

export function PdfDocumentProvider({ children, styles }: PdfDocumentProviderProps) {
  return <PdfDocumentContext.Provider value={{ styles }}>{children}</PdfDocumentContext.Provider>;
}

export function usePdfDocumentContext() {
  const context = useContext(PdfDocumentContext);

  if (context === undefined) {
    throw new Error('usePdfDocumentContext must be used within a PdfDocumentProvider');
  }

  return context;
}
