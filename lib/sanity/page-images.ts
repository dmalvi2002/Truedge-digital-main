export type ImageAltSetting = { alt?: string; decorative?: boolean };
export type PageImageSettings = { routePath: string; imageAlt?: Record<string, ImageAltSetting | unknown> | null };

/** Stable across builds, filenames with dots, and image optimisation URLs. */
export function imageSettingKey(source: string): string {
  let hash = 2166136261;
  for (const char of source) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return `image_${(hash >>> 0).toString(16)}`;
}

export function resolveImageAlt(settings: PageImageSettings[], route: string, source: string, fallback: string): string {
  const value = settings.find(page => page.routePath === route)?.imageAlt?.[imageSettingKey(source)];
  if (!value || typeof value !== 'object') return fallback;
  const setting = value as ImageAltSetting;
  if (setting.decorative === true) return '';
  return typeof setting.alt === 'string' && setting.alt.trim() ? setting.alt.trim() : fallback;
}
