import type { Metadata } from 'next';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Portfolio | イラストレーター',
  description: 'イラストレーターのポートフォリオサイトです。イラスト・キャラクターデザイン・漫画などの作品を掲載しています。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main style={{ paddingTop: 'var(--header-height)' }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
