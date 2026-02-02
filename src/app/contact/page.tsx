import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm/ContactForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact | aoimachi',
  description: 'お仕事のご依頼・ご相談はこちらからお問い合わせください。',
};

export default function ContactPage() {
  return (
    <section className={styles.section}>
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
      </div>
    </section>
  );
}
