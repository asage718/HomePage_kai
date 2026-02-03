'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import DashboardShell from '../../../components/DashboardShell';
import WorkForm from '../../WorkForm';
import type { Work } from '@/lib/types';
import styles from '../../works.module.css';

export default function EditWorkPage() {
  const params = useParams();
  const [work, setWork] = useState<Work | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/works/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error('作品が見つかりません');
        return res.json();
      })
      .then((data) => setWork(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [params.id]);

  return (
    <DashboardShell>
      <div className={styles.header}>
        <h1 className={styles.title}>作品を編集</h1>
      </div>
      {loading ? (
        <div className={styles.loading}>読み込み中...</div>
      ) : error ? (
        <div className={styles.loading}>{error}</div>
      ) : work ? (
        <WorkForm work={work} />
      ) : null}
    </DashboardShell>
  );
}
