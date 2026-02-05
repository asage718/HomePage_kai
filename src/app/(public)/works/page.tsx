import type { Metadata } from 'next';
import Gallery from '@/components/Gallery/Gallery';
import { BreadcrumbJsonLd } from '@/components/JsonLd/JsonLd';
import { siteConfig } from '@/lib/seo-config';
import { getWorks } from '@/lib/data';
import styles from './page.module.css';

export const revalidate = 60; // ISR: 1分

export const metadata: Metadata = {
  title: 'Works',
  description: 'aoimachiの作品一覧。イラスト・キャラクターデザインなどのポートフォリオ作品を掲載しています。',
  openGraph: {
    title: 'Works | aoimachi',
    description: 'aoimachiの作品一覧。イラスト・キャラクターデザインなどのポートフォリオ作品を掲載しています。',
  },
};

export default async function WorksPage() {
  let works: Awaited<ReturnType<typeof getWorks>> = [];
  try {
    works = await getWorks();
  } catch (error) {
    console.error('Failed to fetch works:', error);
  }

  return (
    <section className={styles.section}>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', url: siteConfig.url },
          { name: 'Works', url: `${siteConfig.url}/works` },
        ]}
      />
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
