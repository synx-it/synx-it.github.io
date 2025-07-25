import en from './locales/en.json';
import it from './locales/it.json';

export type SupportedLocale = 'en' | 'it';

export const i18n = {
  locales: ['en', 'it'],
  defaultLocale: 'en',
};

export const translations = {
  en,
  it,
};

type Translations = {
  [key: string]: string | Translations;
};

export function t(locale: SupportedLocale, key: string): string {
  const keys = key.split('.');
  const localeTranslations: Translations = translations[locale];

  const value = keys.reduce<string | Translations | undefined>(
    (acc, currentKey) => {
      if (acc && typeof acc === 'object' && acc[currentKey]) {
        return acc[currentKey];
      }
      return undefined;
    },
    localeTranslations
  );

  if (typeof value === 'string') {
    return value;
  }

  return key;
}
