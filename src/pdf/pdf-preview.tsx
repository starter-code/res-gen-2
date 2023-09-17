import { PDFViewer } from '@react-pdf/renderer';

import { usePdfPreviewContext } from '@/context/pdf-preview-context';

import PdfDocument from './pdf-document';
import { useAppContext } from '@/context/app-context';
import { PdfDocumentProvider } from '@/context/pdf-document-context';

type PdfPreviewProps = {
  // styleSheets: StyleSheetList;
};

export default function PdfPreview() {
  const { styles } = usePdfPreviewContext();
  const { items, layouts } = useAppContext();

  return (
    <PDFViewer style={{ height: '100vh', width: '100vw' }}>
      <PdfDocumentProvider styles={styles} items={items} layouts={layouts}>
        <PdfDocument />
      </PdfDocumentProvider>
    </PDFViewer>
  );
}
