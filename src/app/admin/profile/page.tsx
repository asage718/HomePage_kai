'use client';

import { useState, useEffect } from 'react';
import DashboardShell from '../components/DashboardShell';
import ImageUploader from '../components/ImageUploader';
import styles from './profile.module.css';

interface Career {
  year: string;
  text: string;
}

interface ProfileData {
  name: string;
  role: string;
  bio: string;
  image: string | null;
}

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    role: '',
    bio: '',
    image: null,
  });
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/profile')
      .then((res) => res.json())
      .then((data) => {
        if (data.profile) setProfile(data.profile);
        if (Array.isArray(data.careers)) setCareers(data.careers);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, careers }),
      });

      if (res.ok) {
        setMessage('保存しました');
      } else {
        setMessage('保存に失敗しました');
      }
    } catch {
      setMessage('エラーが発生しました');
    } finally {
      setSaving(false);
    }
  };

  const addCareer = () => {
    setCareers([...careers, { year: new Date().getFullYear().toString(), text: '' }]);
  };

  const updateCareer = (index: number, field: keyof Career, value: string) => {
    const updated = [...careers];
    updated[index] = { ...updated[index], [field]: value };
    setCareers(updated);
  };

  const removeCareer = (index: number) => {
    setCareers(careers.filter((_, i) => i !== index));
  };

  const moveCareer = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= careers.length) return;

    const updated = [...careers];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setCareers(updated);
  };

  if (loading) {
    return (
      <DashboardShell>
        <div className={styles.loading}>読み込み中...</div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className={styles.header}>
        <h1 className={styles.title}>プロフィール編集</h1>
      </div>

      <div className={styles.form}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>プロフィール画像</h2>
          <ImageUploader
            value={profile.image || ''}
            onChange={(url) => setProfile({ ...profile, image: url })}
          />
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>基本情報</h2>

          <div className={styles.field}>
            <label className={styles.label}>名前</label>
            <input
              type="text"
              className={styles.input}
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder="aoimachi"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>肩書き</label>
            <input
              type="text"
              className={styles.input}
              value={profile.role}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
              placeholder="Illustrator / Character Designer"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>自己紹介文</label>
            <textarea
              className={styles.textarea}
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              rows={6}
              placeholder="イラストレーターとして活動しています..."
            />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>経歴・実績</h2>
            <button type="button" className={styles.addButton} onClick={addCareer}>
              + 追加
            </button>
          </div>

          <div className={styles.careerList}>
            {careers.length === 0 ? (
              <p className={styles.emptyText}>経歴がありません</p>
            ) : (
              careers.map((career, index) => (
                <div key={index} className={styles.careerItem}>
                  <div className={styles.careerControls}>
                    <button
                      type="button"
                      className={styles.moveButton}
                      onClick={() => moveCareer(index, 'up')}
                      disabled={index === 0}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      className={styles.moveButton}
                      onClick={() => moveCareer(index, 'down')}
                      disabled={index === careers.length - 1}
                    >
                      ↓
                    </button>
                  </div>
                  <input
                    type="text"
                    className={styles.yearInput}
                    value={career.year}
                    onChange={(e) => updateCareer(index, 'year', e.target.value)}
                    placeholder="2024"
                  />
                  <input
                    type="text"
                    className={styles.textInput}
                    value={career.text}
                    onChange={(e) => updateCareer(index, 'text', e.target.value)}
                    placeholder="経歴・実績を入力"
                  />
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => removeCareer(index)}
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className={styles.actions}>
          {message && <span className={styles.message}>{message}</span>}
          <button
            type="button"
            className={styles.saveButton}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? '保存中...' : '保存する'}
          </button>
        </div>
      </div>
    </DashboardShell>
  );
}
