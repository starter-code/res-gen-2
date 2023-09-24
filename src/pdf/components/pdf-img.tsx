import { Image } from '@react-pdf/renderer';
import { useMemo } from 'react';

import { usePdfDocumentContext } from '@/context/pdf-document-context';

type ImgProps = {
  className: string;
  src: string;
  alt: string;
  style: {};
};

export default function Img({ className, src, style = {} }: ImgProps) {
  const { computeStyle } = usePdfDocumentContext();

  const styles = useMemo(
    () => computeStyle(className, 'img', style),
    [computeStyle, className, style], //
  );

  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image src={src} style={styles} />;
}
