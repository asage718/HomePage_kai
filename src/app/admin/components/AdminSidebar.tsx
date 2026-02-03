'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { UNREAD_CHECK_INTERVAL } from '@/lib/constants';
import styles from './AdminSidebar.module.css';

const navItems = [
  { href: '/admin/works', label: '作品管理', icon: '🖼' },
  { href: '/admin/slideshow', label: 'スライドショー', icon: '📽' },
  { href: '/admin/profile', label: 'プロフィール', icon: '📝' },
  { href: '/admin/contacts', label: 'お問い合わせ', icon: '✉' },
  { href: '/admin/accounts', label: 'アカウント', icon: '👤' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState<number | null>(null);
  const prevCountRef = useRef<number>(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const res = await fetch('/api/contacts/unread-count');
        if (res.ok) {
          const data = await res.json();
          setUnreadCount(data.count);
          prevCountRef.current = data.count;
        }
      } catch {
        // ignore
      }
    };

    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, UNREAD_CHECK_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const displayCount = unreadCount ?? prevCountRef.current;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <Link href="/" className={styles.logoLink}>aoimachi</Link>
        <span className={styles.badge}>管理</span>
      </div>
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.navItem} ${pathname.startsWith(item.href) ? styles.active : ''}`}
          >
            <span className={styles.icon}>{item.icon}</span>
            {item.label}
            {item.href === '/admin/contacts' && displayCount > 0 && (
              <span className={styles.unreadDot} />
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
