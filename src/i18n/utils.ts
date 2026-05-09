import { defaultLang, ui, type Lang, type UiKey } from './ui';

/** Detect the active locale from a URL pathname. */
export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split('/');
  if (segment && segment in ui) return segment as Lang;
  return defaultLang;
}

/** Returns a typed `t(key)` lookup bound to the given locale. */
export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** Build a localized URL path (default locale stays unprefixed). */
export function localizedPath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang) return clean;
  if (clean === '/') return `/${lang}/`;
  return `/${lang}${clean}`;
}

/** Strip the locale prefix from a path, if any (returns the canonical EN path). */
export function unlocalizedPath(path: string): string {
  return path.replace(/^\/(en|es)(?=\/|$)/, '') || '/';
}
