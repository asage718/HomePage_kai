import type { Metadata } from 'next';
import Gallery from '@/components/Gallery/Gallery';
import { works } from '@/data/works';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Works | Portfolio',
  description: '作品一覧ページです。イラスト・キャラクターデザイン・漫画・ロゴなどの作品を掲載しています。',
};

export default function WorksPage() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Works</h1>
          <p className={styles.subtitle}>作品一覧</p>
        </div>
        <Gallery works={works} />
      </div>
    </section>
  );
}
