'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './AdminSidebar.module.css';

const navItems = [
  { href: '/admin/works', label: '作品管理', icon: '🖼' },
  { href: '/admin/slideshow', label: 'スライドショー', icon: '📽' },
  { href: '/admin/contacts', label: 'お問い合わせ', icon: '✉' },
  { href: '/admin/accounts', label: 'アカウント', icon: '👤' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

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
          </Link>
        ))}
      </nav>
    </aside>
  );
}
