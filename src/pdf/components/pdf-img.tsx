import { Image, Svg, Path } from '@react-pdf/renderer';

import { usePdfDocumentContext } from '@/context/pdf-document-context';

import GithubSvg from '../icons/pdf-github';
import GmailSvg from '../icons/pdf-gmail';
import LinkedinSvg from '../icons/pdf-linkedin';
import WebsiteSvg from '../icons/pdf-website';

type ImgProps = {
  className: string;
  src: string;
  alt: string;
};

export default function Img({ className, src }: ImgProps) {
  const { computeStyle } = usePdfDocumentContext();

  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image src={src} style={computeStyle(className, 'div')} />;
}
