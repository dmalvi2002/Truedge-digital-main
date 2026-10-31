'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { resolveImageAlt, type PageImageSettings } from '@/lib/sanity/page-images';

const ImageSettings = createContext<PageImageSettings[]>([]);

export default function PageImageProvider({ settings, children }: { settings: PageImageSettings[]; children: ReactNode }) {
  return <ImageSettings.Provider value={settings}>{children}</ImageSettings.Provider>;
}

export function usePageImageAlt(source: string, fallback: string) {
  const settings = useContext(ImageSettings);
  const pathname = usePathname();
  return resolveImageAlt(settings, pathname || '/', source, fallback);
}
