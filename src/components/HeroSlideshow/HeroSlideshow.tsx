'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import styles from './HeroSlideshow.module.css';

interface Slide {
  src: string;
  alt: string;
}

interface HeroSlideshowProps {
  slides?: Slide[];
}

const defaultSlides: Slide[] = [
  { src: '/images/works/sample1.jpg', alt: 'sample1' },
  { src: '/images/works/syokanokaze.jpg', alt: '初夏の風' },
  { src: '/images/works/illust50.jpg', alt: 'illust50' },
  { src: '/images/works/illust43.jpg', alt: 'illust43' },
  { src: '/images/works/illust34.jpg', alt: 'illust34' },
];

const DISPLAY_COUNT = 5;

export default function HeroSlideshow({ slides }: HeroSlideshowProps) {
  const displaySlides = useMemo(
    () => {
      const source = slides && slides.length > 0 ? slides : defaultSlides;
      return source.slice(0, DISPLAY_COUNT);
    },
    [slides]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {displaySlides.map((slide, i) => (
          <div
            key={i}
            className={styles.item}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 30vw, 20vw"
              quality={75}
              priority={i < 2}
              loading={i < 2 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
