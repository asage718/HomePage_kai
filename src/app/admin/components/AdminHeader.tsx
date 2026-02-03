'use client';

import { useRouter } from 'next/navigation';
import styles from './AdminHeader.module.css';

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.spacer} />
        <div className={styles.actions}>
          <a href="/" className={styles.siteLink} target="_blank" rel="noopener noreferrer">
            サイトを見る
          </a>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            ログアウト
          </button>
        </div>
      </div>
    </header>
  );
}
