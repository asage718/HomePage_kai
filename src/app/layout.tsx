import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'aoimachi | Portfolio',
  description: 'aoimachiのポートフォリオサイトです。イラスト・キャラクターデザイン・漫画などの作品を掲載しています。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
