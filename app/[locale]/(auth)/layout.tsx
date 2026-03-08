import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import logo from '@/assets/svg/Logo.svg';
import LanguageSwitcher from '@/components/language-switcher';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations('Auth');

  return (
    <div className="min-h-screen bg-[var(--color-page)] text-[var(--color-ink)]">
      <div className="relative flex min-h-screen flex-col">
        <div className="rounded-b-[32px] bg-[var(--color-primary)] px-6 pt-4 pb-16 shadow-sm sm:rounded-b-[40px]">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
            <div className="flex-1" />
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-white/15">
              <Image src={logo} alt={t('logoAlt')} width={48} height={48} />
            </div>
            <div className="flex flex-1 items-center justify-end">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        <div className="mx-auto -mt-12 w-full max-w-md px-6 pb-12 lg:max-w-xl">
          <div className="rounded-[32px] bg-[var(--color-surface)] p-8 shadow-xl">{children}</div>
        </div>
      </div>
    </div>
  );
}
