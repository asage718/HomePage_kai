'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Image from 'next/image';
import styles from './HeroSlideshow.module.css';

interface Slide {
  src: string;
  alt: string;
}

const INTERVAL = 4000;

interface HeroSlideshowProps {
  slides?: Slide[];
}

const defaultSlides: Slide[] = [
  { src: '/images/works/sample1.jpg', alt: 'sample1' },
  { src: '/images/works/syokanokaze.jpg', alt: '初夏の風' },
  { src: '/images/works/illust50.jpg', alt: 'illust50' },
  { src: '/images/works/illust43.jpg', alt: 'illust43' },
];

export default function HeroSlideshow({ slides }: HeroSlideshowProps) {
  const activeSlides = useMemo(
    () => (slides && slides.length > 0 ? slides : defaultSlides),
    [slides]
  );
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(0);
  const slidesLengthRef = useRef(activeSlides.length);

  useEffect(() => {
    slidesLengthRef.current = activeSlides.length;
  }, [activeSlides.length]);

  const goTo = useCallback((index: number) => {
    setCurrent((prev) => {
      setPrevious(prev);
      return index;
    });
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => {
      setPrevious(prev);
      return (prev + 1) % slidesLengthRef.current;
    });
  }, []);

  const handlePrev = useCallback(() => {
    setCurrent((prev) => {
      setPrevious(prev);
      return (prev - 1 + slidesLengthRef.current) % slidesLengthRef.current;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <button
          className={styles.arrow}
          onClick={handlePrev}
          aria-label="前の画像"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className={styles.slideshow}>
          <div className={styles.track}>
            {activeSlides.map((slide, i) => (
              <div
                key={i}
                className={`${styles.slide} ${i === current ? styles.active : ''} ${i === previous ? styles.prev : ''}`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 90vw, 420px"
                  quality={75}
                  priority={i === 0}
                  loading={i === 0 ? 'eager' : 'lazy'}
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
        {activeSlides.map((_, i) => (
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
