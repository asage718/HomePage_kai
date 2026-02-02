import SnsLinks from '@/components/SnsLinks/SnsLinks';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <SnsLinks size="small" />
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} aoimachi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
