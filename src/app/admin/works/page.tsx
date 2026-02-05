'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DashboardShell from '../components/DashboardShell';
import type { Work } from '@/lib/types';
import styles from './works.module.css';

export default function AdminWorksPage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/works')
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setWorks(data); })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`「${title}」を削除しますか？`)) return;

    const res = await fetch(`/api/works/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setWorks((prev) => prev.filter((w) => w.id !== id));
    }
  };

  return (
    <DashboardShell>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>作品管理</h1>
          {!loading && (
            <p className={styles.count}>{works.length}件の作品</p>
          )}
        </div>
        <Link href="/admin/works/new" className={styles.addBtn}>
          + 新規作成
        </Link>
      </div>

      {loading ? (
        <div className={styles.loading}>読み込み中...</div>
      ) : works.length === 0 ? (
        <div className={styles.empty}>
          <p>作品がありません</p>
          <Link href="/admin/works/new" className={styles.addBtn}>
            最初の作品を追加
          </Link>
        </div>
      ) : (
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <span className={styles.colImage}>画像</span>
            <span className={styles.colTitle}>タイトル</span>
            <span className={styles.colCategory}>カテゴリ</span>
            <span className={styles.colDate}>日付</span>
            <span className={styles.colActions}>操作</span>
          </div>
          {works.map((work) => (
            <div key={work.id} className={styles.row}>
              <div className={styles.colImage}>
                {work.image ? (
                  <Image
                    src={work.image}
                    alt={work.title}
                    width={48}
                    height={48}
                    className={styles.thumb}
                  />
                ) : (
                  <div className={styles.noImage}>-</div>
                )}
              </div>
              <div className={styles.colTitle}>
                <span className={styles.workTitle}>{work.title}</span>
              </div>
              <div className={styles.colCategory}>
                <span className={styles.badge}>{work.category}</span>
              </div>
              <div className={styles.colDate}>{work.date}</div>
              <div className={styles.colActions}>
                <Link
                  href={`/admin/works/${work.id}/edit`}
                  className={styles.editBtn}
                >
                  編集
                </Link>
                <button
                  onClick={() => handleDelete(work.id, work.title)}
                  className={styles.deleteBtn}
                >
                  削除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
