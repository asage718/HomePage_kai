'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from '../components/ImageUploader';
import { categories } from '@/lib/types';
import type { Work, WorkCategory } from '@/lib/types';
import styles from './WorkForm.module.css';

interface WorkFormProps {
  work?: Work;
}

export default function WorkForm({ work }: WorkFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(work?.title || '');
  const [description, setDescription] = useState(work?.description || '');
  const [category, setCategory] = useState<WorkCategory>(work?.category || 'イラスト');
  const [image, setImage] = useState(work?.image || '');
  const [date, setDate] = useState(work?.date || new Date().toISOString().slice(0, 7));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const isEdit = !!work;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('タイトルを入力してください');
      return;
    }

    setSaving(true);

    try {
      const url = isEdit ? `/api/works/${work.id}` : '/api/works';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, category, image, date }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || '保存に失敗しました');
      }

      router.push('/admin/works');
    } catch (err) {
      setError(err instanceof Error ? err.message : '保存に失敗しました');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.grid}>
        <div className={styles.mainCol}>
          <div className={styles.field}>
            <label className={styles.label}>タイトル</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
              placeholder="作品タイトル"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>説明</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
              placeholder="作品の説明（任意）"
              rows={5}
            />
          </div>
          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label className={styles.label}>カテゴリ</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as WorkCategory)}
                className={styles.select}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>日付</label>
              <input
                type="month"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>
        </div>
        <div className={styles.sideCol}>
          <div className={styles.field}>
            <label className={styles.label}>画像</label>
            <ImageUploader value={image} onChange={setImage} />
          </div>
        </div>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.actions}>
        <button
          type="button"
          onClick={() => router.push('/admin/works')}
          className={styles.cancelBtn}
        >
          キャンセル
        </button>
        <button type="submit" className={styles.submitBtn} disabled={saving}>
          {saving ? '保存中...' : isEdit ? '更新する' : '作成する'}
        </button>
      </div>
    </form>
  );
}
