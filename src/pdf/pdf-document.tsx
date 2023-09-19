import ReactPDF, { Document, Page, usePDF } from '@react-pdf/renderer';

import { formatDateToYYMMDD } from '@/utils/date-util';
import { usePdfDocumentContext } from '@/context/pdf-document-context';

import PdfComponentManager from '@/managers/pdf-component-manager';

import GithubSvg from './icons/pdf-github';
import GmailSvg from './icons/pdf-gmail';
import LinkedinSvg from './icons/pdf-linkedin';
import WebsiteSvg from './icons/pdf-website';

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
