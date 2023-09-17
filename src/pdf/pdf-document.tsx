import ReactPDF, { Document, Page, usePDF } from '@react-pdf/renderer';

import { formatDateToYYMMDD } from '@/utils/date-util';
import { usePdfDocumentContext } from '@/context/pdf-document-context';

import Div from './pdf-div';
import Text from './pdf-text';

type PdfDocumentProps = {
  // styles: ReactPDF.Styles;
};

export default function PdfDocument({}: PdfDocumentProps) {
  const { styles } = usePdfDocumentContext();

  return (
    <Document title={`${formatDateToYYMMDD()}-your-resume.pdf`}>
      <Page size="LETTER" style={styles.page}>
        <Div className={''}>
          <Text className="ml-2">Section #1</Text>
          <Text className="ml-1">Section #2</Text>
        </Div>
      </Page>
    </Document>
  );
}
