import Link from 'next/link';
import Image from 'next/image';
import SnsLinks from '@/components/SnsLinks/SnsLinks';
import HeroSlideshow from '@/components/HeroSlideshow/HeroSlideshow';
import { getWorks } from '@/lib/data';
import { getSlideshow } from '@/lib/data';
import styles from './page.module.css';

export default async function HomePage() {
  const [works, slides] = await Promise.all([getWorks(), getSlideshow()]);
  const highlightWorks = works.slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              aoimachi
            </h1>
            <p className={styles.heroDescription}>
              イラスト・キャラクターデザイン・漫画制作を手がけるaoimachiのポートフォリオサイトです。
            </p>
            <div className={styles.heroActions}>
              <Link href="/works" className={styles.heroBtn}>
                View Works
              </Link>
              <Link href="/contact" className={styles.heroBtnOutline}>
                Contact
              </Link>
            </div>
            <div className={styles.heroSns}>
              <SnsLinks />
            </div>
          </div>
          <div className={styles.heroVisual}>
            <HeroSlideshow slides={slides} />
          </div>
        </div>
      </section>

      {/* Works Highlight */}
      <section className={styles.worksSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Works</h2>
            <p className={styles.sectionSub}>最新の作品</p>
          </div>
          <div className={styles.worksGrid}>
            {highlightWorks.map((work) => (
              <Link href="/works" key={work.id} className={styles.workCard}>
                <div className={styles.workImageWrap}>
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    sizes="(max-width: 480px) 45vw, (max-width: 1024px) 45vw, 25vw"
                    quality={70}
                    className={styles.workImage}
                  />
                </div>
                <h3 className={styles.workTitle}>{work.title}</h3>
                <span className={styles.workCategory}>{work.category}</span>
              </Link>
            ))}
          </div>
          <div className={styles.viewAll}>
            <Link href="/works" className={styles.viewAllLink}>
              View All Works
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.arrow}>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
