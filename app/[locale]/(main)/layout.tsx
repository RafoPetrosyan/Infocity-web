import { MainLayoutClient } from '@/components/main-layout-client';
import { fetcher } from '@/lib/fetcher';
import type { Category, Emotion } from '@/store/global/types';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

async function fetchLayoutData(locale: string): Promise<{ categories: Category[]; emotions: Emotion[] }> {
  try {
    const [categories, emotions] = await Promise.all([
      fetcher<Category[]>('/categories', { locale }),
      fetcher<Emotion[]>('/emotions', { locale }),
    ]);
    return { categories: categories ?? [], emotions: emotions ?? [] };
  } catch {
    return { categories: [], emotions: [] };
  }
}

export default async function Layout({ children, params }: LayoutProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  const { categories, emotions } = await fetchLayoutData(locale);

  return (
    <MainLayoutClient categories={categories} emotions={emotions}>
      {children}
    </MainLayoutClient>
  );
}
