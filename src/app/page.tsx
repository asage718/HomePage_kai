import Link from 'next/link';
import Image from 'next/image';
import SnsLinks from '@/components/SnsLinks/SnsLinks';
import { works } from '@/data/works';
import styles from './page.module.css';

const highlightWorks = works.slice(0, 4);

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Illustration<br />
              <span className={styles.heroTitleAccent}>&amp; Design</span>
            </h1>
            <p className={styles.heroDescription}>
              イラスト・キャラクターデザイン・漫画制作を手がけるイラストレーターのポートフォリオサイトです。
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
            <div className={styles.heroImagePlaceholder}>
              <span>Main Visual</span>
            </div>
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
                    width={400}
                    height={400}
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
