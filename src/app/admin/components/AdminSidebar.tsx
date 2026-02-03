'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './AdminSidebar.module.css';

const navItems = [
  { href: '/admin/works', label: '作品管理', icon: '🖼' },
  { href: '/admin/slideshow', label: 'スライドショー', icon: '📽' },
  { href: '/admin/contacts', label: 'お問い合わせ', icon: '✉' },
  { href: '/admin/accounts', label: 'アカウント', icon: '👤' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const res = await fetch('/api/contacts/unread-count');
        if (res.ok) {
          const data = await res.json();
          setUnreadCount(data.count);
        }
      } catch {
        // ignore
      }
    };

    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

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
            {item.href === '/admin/contacts' && unreadCount > 0 && (
              <span className={styles.unreadDot} />
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
