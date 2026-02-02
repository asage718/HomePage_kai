import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About | Portfolio',
  description: 'イラストレーターのプロフィール・経歴を紹介しています。',
};

export default function AboutPage() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>About</h1>
          <p className={styles.subtitle}>プロフィール</p>
        </div>

        <div className={styles.content}>
          <div className={styles.profileImage}>
            <div className={styles.imagePlaceholder}>
              <span>Profile Photo</span>
            </div>
          </div>

          <div className={styles.bio}>
            <h2 className={styles.name}>イラストレーター名</h2>
            <p className={styles.role}>Illustrator / Character Designer</p>

            <div className={styles.text}>
              <p>
                イラストレーター・キャラクターデザイナーとして活動しています。
                柔らかい色彩と繊細なタッチで、キャラクターイラストや風景画を中心に制作しています。
              </p>
              <p>
                書籍の装画やゲームのキャラクターデザイン、広告イラストなど幅広く手がけています。
                作品を通じて、見る人の心に温かさや感動を届けることを大切にしています。
              </p>
            </div>

            <div className={styles.career}>
              <h3 className={styles.careerTitle}>経歴・実績</h3>
              <ul className={styles.careerList}>
                <li className={styles.careerItem}>
                  <span className={styles.careerYear}>2024</span>
                  <span className={styles.careerText}>個展「色彩の世界」開催</span>
                </li>
                <li className={styles.careerItem}>
                  <span className={styles.careerYear}>2023</span>
                  <span className={styles.careerText}>○○出版 書籍装画担当</span>
                </li>
                <li className={styles.careerItem}>
                  <span className={styles.careerYear}>2023</span>
                  <span className={styles.careerText}>○○ゲーム キャラクターデザイン</span>
                </li>
                <li className={styles.careerItem}>
                  <span className={styles.careerYear}>2022</span>
                  <span className={styles.careerText}>フリーランスとして活動開始</span>
                </li>
                <li className={styles.careerItem}>
                  <span className={styles.careerYear}>2021</span>
                  <span className={styles.careerText}>○○美術大学 卒業</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
