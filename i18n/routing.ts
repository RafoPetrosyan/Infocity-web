import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import {LOCALES} from "@/app/constants";

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: 'hy',
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
