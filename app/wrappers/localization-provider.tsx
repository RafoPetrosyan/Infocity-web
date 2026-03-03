'use client';

import * as React from 'react';
import dayjs from 'dayjs';

import 'dayjs/locale/hy-am';

import tz from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { DAY_JS_LOCALES, Locales } from '@/constants';

export interface LocalizationProviderProps {
  children: React.ReactNode;
  locale: Locales;
}

export function LocalizationProvider({ children, locale }: LocalizationProviderProps): React.JSX.Element {
  dayjs.locale(DAY_JS_LOCALES[locale]);
  dayjs.extend(utc);
  dayjs.extend(tz);

  return <>{children}</>;
}
