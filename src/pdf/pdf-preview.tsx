import { PDFViewer } from '@react-pdf/renderer';

import { usePdfPreviewContext } from '@/context/pdf-preview-context';

import PdfDocument from './pdf-document';

type PdfPreviewProps = {
  // styleSheets: StyleSheetList;
};

export default function PdfPreview() {
  const { styles } = usePdfPreviewContext();

  return (
    <PDFViewer style={{ height: '100vh', width: '100vw' }}>
      <PdfDocument styles={styles} />
    </PDFViewer>
  );
}
