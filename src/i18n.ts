import en from './locales/en.json';
import it from './locales/it.json';

export type SupportedLocale = 'en' | 'it';

export const translations = {
  en,
  it,
};

export function t(locale: SupportedLocale, key: string): string {
  const keys = key.split('.');
  let value: any = translations[locale];
  for (const k of keys) {
    value = value?.[k];
    if (!value) return key;
  }
  return value;
}
