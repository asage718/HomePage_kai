// SEO設定 - サイトURLはVercelドメインまたはカスタムドメインに変更してください
export const siteConfig = {
  name: 'aoimachi',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://aoimachi.vercel.app',
  title: 'aoimachi | イラストレーター・キャラクターデザイナー',
  description:
    'イラストレーター・キャラクターデザイナーaoimachiのポートフォリオサイト。イラスト、キャラクターデザイン、漫画制作などの作品を掲載しています。お仕事のご依頼も承っております。',
  keywords: [
    'イラストレーター',
    'キャラクターデザイン',
    'イラスト',
    '漫画',
    'aoimachi',
    'ポートフォリオ',
    'フリーランス',
    'イラスト依頼',
  ],
  author: 'aoimachi',
  locale: 'ja_JP',
  twitter: '@aoimachi', // Twitterアカウントがあれば設定
};
