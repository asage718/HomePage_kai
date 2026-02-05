'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import DashboardShell from '../components/DashboardShell';
import type { Slide } from '@/lib/types';
import type { Work } from '@/lib/types';
import styles from './slideshow.module.css';

export default function SlideshowPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('/api/slideshow').then((r) => r.json()),
      fetch('/api/works').then((r) => r.json()),
    ])
      .then(([slidesData, worksData]) => {
        if (Array.isArray(slidesData)) setSlides(slidesData);
        if (Array.isArray(worksData)) setWorks(worksData);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await fetch('/api/slideshow', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slides),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  const moveSlide = useCallback((index: number, direction: -1 | 1) => {
    setSlides((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }, []);

  const removeSlide = useCallback((index: number) => {
    setSlides((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const addSlide = useCallback((work: Work) => {
    setSlides((prev) => [...prev, { src: work.image, alt: work.title }]);
    setShowPicker(false);
  }, []);

  const availableWorks = works.filter(
    (w) => w.image && !slides.some((s) => s.src === w.image)
  );

  return (
    <DashboardShell>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>スライドショー管理</h1>
          <p className={styles.count}>{slides.length}枚の画像</p>
        </div>
        <div className={styles.headerActions}>
          {saved && <span className={styles.savedMsg}>保存しました</span>}
          <button
            onClick={handleSave}
            className={styles.saveBtn}
            disabled={saving}
          >
            {saving ? '保存中...' : '保存する'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className={styles.loading}>読み込み中...</div>
      ) : (
        <>
          <div className={styles.slideList}>
            {slides.map((slide, index) => (
              <div key={`${slide.src}-${index}`} className={styles.slideItem}>
                <div className={styles.slideOrder}>{index + 1}</div>
                <div className={styles.slideImage}>
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    width={120}
                    height={80}
                    className={styles.slideThumb}
                  />
                </div>
                <div className={styles.slideInfo}>
                  <span className={styles.slideAlt}>{slide.alt}</span>
                  <span className={styles.slideSrc}>{slide.src}</span>
                </div>
                <div className={styles.slideActions}>
                  <button
                    onClick={() => moveSlide(index, -1)}
                    className={styles.moveBtn}
                    disabled={index === 0}
                    title="上へ"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveSlide(index, 1)}
                    className={styles.moveBtn}
                    disabled={index === slides.length - 1}
                    title="下へ"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => removeSlide(index)}
                    className={styles.removeBtn}
                    title="削除"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          {!showPicker ? (
            <button
              onClick={() => setShowPicker(true)}
              className={styles.addBtn}
              disabled={availableWorks.length === 0}
            >
              {availableWorks.length === 0
                ? '追加できる作品がありません'
                : '+ 作品から追加'}
            </button>
          ) : (
            <div className={styles.picker}>
              <div className={styles.pickerHeader}>
                <span className={styles.pickerTitle}>作品を選択</span>
                <button
                  onClick={() => setShowPicker(false)}
                  className={styles.pickerClose}
                >
                  閉じる
                </button>
              </div>
              <div className={styles.pickerGrid}>
                {availableWorks.map((work) => (
                  <button
                    key={work.id}
                    onClick={() => addSlide(work)}
                    className={styles.pickerItem}
                  >
                    <Image
                      src={work.image}
                      alt={work.title}
                      width={100}
                      height={100}
                      className={styles.pickerThumb}
                    />
                    <span className={styles.pickerLabel}>{work.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </DashboardShell>
  );
}
