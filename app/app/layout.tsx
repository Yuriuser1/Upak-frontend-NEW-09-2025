
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Providers } from '@/components/providers';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'UPAK - Создание карточек товаров для маркетплейсов',
  description: 'Профессиональные карточки товаров для Wildberries и OZON. Увеличьте продажи с качественными описаниями и изображениями.',
  keywords: 'карточки товаров, wildberries, ozon, маркетплейсы, продажи, seo',
  authors: [{ name: 'UPAK Team' }],
  openGraph: {
    title: 'UPAK - Создание карточек товаров',
    description: 'Профессиональные карточки товаров для маркетплейсов',
    type: 'website',
    locale: 'ru_RU',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers session={session}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
