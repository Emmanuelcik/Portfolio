/**
 * Locale-aware date formatting for content metadata.
 * Keep date strings out of i18n/ui.ts — render at component level
 * so we don't duplicate every month name across both languages.
 */

import type { Lang } from '~/i18n/ui';

const LOCALES: Record<Lang, string> = {
  en: 'en-US',
  es: 'es-MX',
};

export function formatMonthYear(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(LOCALES[lang], {
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function formatRange(
  start: Date,
  end: Date | undefined,
  current: boolean,
  lang: Lang,
  presentLabel: string,
): string {
  const startStr = formatMonthYear(start, lang);
  const endStr =
    current || !end ? presentLabel : formatMonthYear(end, lang);
  return `${startStr} - ${endStr}`;
}
