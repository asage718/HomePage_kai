'use client';

import DashboardShell from '../../components/DashboardShell';
import WorkForm from '../WorkForm';
import styles from '../works.module.css';

export default function NewWorkPage() {
  return (
    <DashboardShell>
      <div className={styles.header}>
        <h1 className={styles.title}>新規作品</h1>
      </div>
      <WorkForm />
    </DashboardShell>
  );
}
