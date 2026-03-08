import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { SessionWrapper } from '@/app/wrappers/session-wrapper';
import { LocalizationProvider } from '@/app/wrappers/localization-provider';
import { Locales } from '@/constants';
import { StoreProvider } from '@/app/wrappers/store-provider';
import '../globals.css';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'IMCITY - Intelligent Information Hub',
  description: 'Your intelligent information hub. Connect, discover, and explore the future of digital experiences.',
};

export default async function RootLayout({ children, params }: Readonly<LayoutProps>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StoreProvider>
          <LocalizationProvider locale={locale as Locales}>
            <NextIntlClientProvider messages={messages}>
              <SessionWrapper>{children}</SessionWrapper>
            </NextIntlClientProvider>
          </LocalizationProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
