'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Work, WorkCategory, categories } from '@/lib/types';
import Lightbox from './Lightbox';
import styles from './Gallery.module.css';

interface GalleryProps {
  works: Work[];
  showFilter?: boolean;
}

export default function Gallery({ works, showFilter = true }: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState<WorkCategory | 'all'>('all');
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  const filteredWorks =
    activeCategory === 'all'
      ? works
      : works.filter((w) => w.category === activeCategory);

  return (
    <>
      {showFilter && (
        <div className={styles.filter}>
          <button
            className={`${styles.filterBtn} ${activeCategory === 'all' ? styles.filterActive : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
      <div className={styles.grid}>
        {filteredWorks.map((work) => (
          <button
            key={work.id}
            className={styles.card}
            onClick={() => setSelectedWork(work)}
          >
            <div className={styles.imageWrap}>
              <Image
                src={work.image}
                alt={work.title}
                fill
                sizes="(max-width: 480px) 45vw, (max-width: 1024px) 45vw, 30vw"
                quality={70}
                className={styles.image}
              />
            </div>
            <div className={styles.info}>
              <h3 className={styles.title}>{work.title}</h3>
              <span className={styles.category}>{work.category}</span>
            </div>
          </button>
        ))}
      </div>
      {selectedWork && (
        <Lightbox work={selectedWork} onClose={() => setSelectedWork(null)} />
      )}
    </>
  );
}
