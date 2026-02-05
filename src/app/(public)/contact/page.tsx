import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm/ContactForm';
import { BreadcrumbJsonLd } from '@/components/JsonLd/JsonLd';
import { siteConfig } from '@/lib/seo-config';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'イラスト・キャラクターデザインのお仕事のご依頼・ご相談はこちらからお問い合わせください。',
  openGraph: {
    title: 'Contact | aoimachi',
    description: 'イラスト・キャラクターデザインのお仕事のご依頼・ご相談はこちらからお問い合わせください。',
  },
};

export default function ContactPage() {
  return (
    <section className={styles.section}>
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', url: siteConfig.url },
          { name: 'Contact', url: `${siteConfig.url}/contact` },
        ]}
      />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Contact</h1>
          <p className={styles.subtitle}>お問い合わせ</p>
        </div>
        <p className={styles.description}>
          お仕事のご依頼・ご相談は、下記フォームよりお気軽にお問い合わせください。<br />
          内容を確認の上、3営業日以内にご返信いたします。
        </p>

        <ContactForm />

        <div className={styles.worksLink}>
          <p className={styles.worksLinkText}>ご依頼前に作品をご覧になりたい方はこちら</p>
          <Link href="/works" className={styles.worksLinkButton}>
            作品一覧を見る
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.arrow}>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
