'use client';

import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import styles from './DashboardShell.module.css';

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <AdminSidebar />
      <div className={styles.main}>
        <AdminHeader />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
