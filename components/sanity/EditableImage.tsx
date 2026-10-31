'use client';

import Image, { type ImageProps } from 'next/image';
import { usePageImageAlt } from './PageImageProvider';

/** Keeps the original Next Image sizing, source, placeholders and animation hooks. */
export default function EditableImage({ imageSource, alt, ...props }: ImageProps & { imageSource?: string }) {
  const source = imageSource || (typeof props.src === 'string' ? props.src : '');
  const resolvedAlt = usePageImageAlt(source, alt);
  return <Image {...props} alt={resolvedAlt} />;
}
