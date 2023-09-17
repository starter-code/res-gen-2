import ReactPDF, { Document, Page, usePDF } from '@react-pdf/renderer';

import { formatDateToYYMMDD } from '@/utils/date-util';
import { usePdfDocumentContext } from '@/context/pdf-document-context';

import PdfComponentManager from '@/managers/pdf-component-manager';

type PdfDocumentProps = {
  // styles: ReactPDF.Styles;
};

export default function PdfDocument({}: PdfDocumentProps) {
  const { styles } = usePdfDocumentContext();

  return (
    <Document title={`${formatDateToYYMMDD()}-your-resume.pdf`}>
      <Page size="LETTER" style={styles.page}>
        <PdfComponentManager />
      </Page>
    </Document>
  );
}
