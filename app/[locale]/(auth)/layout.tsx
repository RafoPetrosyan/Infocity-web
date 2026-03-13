import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import logo from '@/assets/svg/Logo.svg';
import LanguageSwitcher from '@/components/language-switcher';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations('Auth');

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--color-page)] text-[var(--color-ink)]">
      <div className="relative flex min-h-screen flex-col">
        <div className="rounded-b-[24px] bg-[var(--color-primary)] px-4 pt-3 pb-12 shadow-sm sm:rounded-b-[32px] sm:px-6 sm:pb-16 md:rounded-b-[40px]">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 sm:gap-4">
            <div className="flex-1" />
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 sm:h-16 sm:w-16 sm:rounded-3xl">
              <Image src={logo} alt={t('logoAlt')} width={48} height={48} className="h-9 w-9 sm:h-12 sm:w-12" />
            </div>
            <div className="flex flex-1 items-center justify-end">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        <div className="mx-auto -mt-8 w-full max-w-md px-4 pb-8 sm:-mt-10 sm:px-6 sm:pb-12 lg:-mt-12 lg:max-w-xl">
          <div className="rounded-[24px] bg-[var(--color-surface)] p-5 shadow-xl sm:rounded-[32px] sm:p-6 md:p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
