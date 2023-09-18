import { Image } from '@react-pdf/renderer';

import { usePdfDocumentContext } from '@/context/pdf-document-context';

import GithubSvg from '../icons/pdf-github';
import GmailSvg from '../icons/pdf-gmail';
import LinkedinSvg from '../icons/pdf-linkedin';
import WebsiteSvg from '../icons/pdf-website';

type ImgProps = {
  className: string;
  src: string;
  height: string;
  width: string;
  alt: string;
};

const ICONS = {
  github: GithubSvg,
  gmail: GmailSvg,
  linkedin: LinkedinSvg,
  website: WebsiteSvg,
} as const;

export default function Img({ className, src, height, width }: ImgProps) {
  const { computeStyle } = usePdfDocumentContext();

  const regex = /(\S+)-icon/g;
  const match = regex.exec(className);

  if (match && match[1]) {
    const [, matcher] = match;

    // @ts-ignore
    const Component = ICONS[matcher];

    // Hmm not working at the moment
    return <Component />;
  }
}
