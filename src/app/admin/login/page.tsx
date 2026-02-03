import type { Metadata } from 'next';
import LoginForm from './LoginForm';
import styles from './login.module.css';

export const metadata: Metadata = {
  title: '管理画面ログイン | aoimachi',
};

export default function LoginPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>管理画面</h1>
        <p className={styles.subtitle}>パスワードを入力してログインしてください</p>
        <LoginForm />
      </div>
    </div>
  );
}
