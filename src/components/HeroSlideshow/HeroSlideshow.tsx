'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './HeroSlideshow.module.css';

interface Slide {
  src: string;
  alt: string;
}

const slides: Slide[] = [
  { src: '/images/works/sample1.jpg', alt: 'sample1' },
  { src: '/images/works/syokanokaze.jpg', alt: '初夏の風' },
  { src: '/images/works/illust50.jpg', alt: 'illust50' },
  { src: '/images/works/illust43.jpg', alt: 'illust43' },
];

const INTERVAL = 4000;

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrent((prev) => {
      setPrevious(prev);
      return index;
    });
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <button
          className={styles.arrow}
          onClick={prev}
          aria-label="前の画像"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className={styles.slideshow}>
          <div className={styles.track}>
            {slides.map((slide, i) => (
              <div
                key={i}
                className={`${styles.slide} ${i === current ? styles.active : ''} ${i === previous ? styles.prev : ''}`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, 420px"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          className={styles.arrow}
          onClick={next}
          aria-label="次の画像"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </div>

      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`スライド${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
