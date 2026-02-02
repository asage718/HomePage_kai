'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Work } from '@/data/works';
import styles from './Lightbox.module.css';

interface LightboxProps {
  work: Work;
  onClose: () => void;
}

export default function Lightbox({ work, onClose }: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="閉じる">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className={styles.imageWrap}>
          <Image
            src={work.image}
            alt={work.title}
            width={800}
            height={800}
            className={styles.image}
          />
        </div>
        <div className={styles.info}>
          <h2 className={styles.title}>{work.title}</h2>
          <span className={styles.category}>{work.category}</span>
          <p className={styles.description}>{work.description}</p>
        </div>
      </div>
    </div>
  );
}
