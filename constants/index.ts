export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const LANGUAGE_STORAGE_KEY = 'locale';

export const LOCALES = ['en', 'hy', 'ru'] as const;

export type Locales = 'hy' | 'en' | 'ru';

export const DAY_JS_LOCALES = {
  hy: 'hy-am',
  en: 'en',
  ru: 'ru',
};
