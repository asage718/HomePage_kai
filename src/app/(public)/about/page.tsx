import type { Metadata } from 'next';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { PersonJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd/JsonLd';
import { siteConfig } from '@/lib/seo-config';
import styles from './page.module.css';

export const revalidate = 3600; // ISR: 1時間

export const metadata: Metadata = {
  title: 'About',
  description: 'イラストレーター・キャラクターデザイナーaoimachiのプロフィール・経歴・実績を紹介しています。',
  openGraph: {
    title: 'About | aoimachi',
    description: 'イラストレーター・キャラクターデザイナーaoimachiのプロフィール・経歴・実績を紹介しています。',
  },
};

const defaultProfile = {
  name: 'aoimachi',
  role: 'Illustrator / Character Designer',
  bio: 'イラストレーター・キャラクターデザイナーとして活動しています。',
  image: null,
};

async function getProfileData() {
  try {
    const [profile, careers] = await Promise.all([
      prisma.profile.findFirst(),
      prisma.career.findMany({
        orderBy: { position: 'asc' },
      }),
    ]);

    return {
      profile: profile || defaultProfile,
      careers,
    };
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    return { profile: defaultProfile, careers: [] as { id: number; year: string; text: string; position: number }[] };
  }
}

export default async function AboutPage() {
  const { profile, careers } = await getProfileData();

  const bioLines = profile.bio.split('\n').filter((line) => line.trim());

  return (
    <section className={styles.section}>
      <PersonJsonLd
        name={profile.name}
        jobTitle={profile.role}
        description={profile.bio}
        image={profile.image}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', url: siteConfig.url },
          { name: 'About', url: `${siteConfig.url}/about` },
        ]}
      />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>About</h1>
          <p className={styles.subtitle}>プロフィール</p>
        </div>

        <div className={styles.content}>
          <div className={styles.profileImage}>
            {profile.image ? (
              <Image
                src={profile.image}
                alt={profile.name}
                width={300}
                height={300}
                className={styles.image}
              />
            ) : (
              <div className={styles.imagePlaceholder}>
                <span>Profile Photo</span>
              </div>
            )}
          </div>

          <div className={styles.bio}>
            <h2 className={styles.name}>{profile.name}</h2>
            <p className={styles.role}>{profile.role}</p>

            <div className={styles.text}>
              {bioLines.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>

            {careers.length > 0 && (
              <div className={styles.career}>
                <h3 className={styles.careerTitle}>経歴・実績</h3>
                <ul className={styles.careerList}>
                  {careers.map((career) => (
                    <li key={career.id} className={styles.careerItem}>
                      <span className={styles.careerYear}>{career.year}</span>
                      <span className={styles.careerText}>{career.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
