import { getRequestConfig } from 'next-intl/server';
import Papa from 'papaparse';

import { routing } from './routing';

const SHEET_CSV_URL = process.env.NEXT_GOOGLE_SHEET_TRANSLATIONS_URL as string;

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const response = await fetch(SHEET_CSV_URL);
  const csv = await response.text();

  const parsed = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  });

  const messages: Record<string, any> = {};

  for (const row of parsed.data as any[]) {
    const category = row.category;
    const key = row.key;
    const value = row[locale] || row.hy;

    if (!messages[category]) {
      messages[category] = {};
    }

    messages[category][key] = value;
  }

  return {
    locale,
    messages,
  };
});
