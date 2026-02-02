export type WorkCategory = 'イラスト' | '漫画' | 'ロゴ' | 'キャラクターデザイン';

export interface Work {
  id: string;
  title: string;
  description: string;
  category: WorkCategory;
  image: string;
  date: string;
}

export const categories: WorkCategory[] = ['イラスト', '漫画', 'ロゴ', 'キャラクターデザイン'];

export const works: Work[] = [
  {
    id: '1',
    title: '春の風景',
    description: '桜が舞い散る春の風景を描いたイラストです。柔らかい色合いで季節の移ろいを表現しました。',
    category: 'イラスト',
    image: '/images/works/work-01.jpg',
    date: '2024-03',
  },
  {
    id: '2',
    title: 'ファンタジーキャラクター',
    description: 'オリジナルファンタジー作品のキャラクターデザインです。',
    category: 'キャラクターデザイン',
    image: '/images/works/work-02.jpg',
    date: '2024-02',
  },
  {
    id: '3',
    title: '夜の街並み',
    description: 'ネオンが輝く夜の街並みを描いたイラストです。光と影のコントラストにこだわりました。',
    category: 'イラスト',
    image: '/images/works/work-03.jpg',
    date: '2024-01',
  },
  {
    id: '4',
    title: 'ショートコミック「日常」',
    description: '日常の何気ないワンシーンを切り取ったショートコミックです。',
    category: '漫画',
    image: '/images/works/work-04.jpg',
    date: '2023-12',
  },
  {
    id: '5',
    title: 'カフェロゴデザイン',
    description: '架空のカフェのためにデザインしたロゴです。温かみのあるデザインを意識しました。',
    category: 'ロゴ',
    image: '/images/works/work-05.jpg',
    date: '2023-11',
  },
  {
    id: '6',
    title: '海辺の少女',
    description: '夕暮れの海辺に佇む少女を描いたイラストです。',
    category: 'イラスト',
    image: '/images/works/work-06.jpg',
    date: '2023-10',
  },
  {
    id: '7',
    title: 'マスコットキャラクター',
    description: 'イベント用のマスコットキャラクターデザインです。親しみやすさを重視しました。',
    category: 'キャラクターデザイン',
    image: '/images/works/work-07.jpg',
    date: '2023-09',
  },
  {
    id: '8',
    title: '冒険漫画「旅立ち」',
    description: '冒険をテーマにしたオリジナル漫画の1話目です。',
    category: '漫画',
    image: '/images/works/work-08.jpg',
    date: '2023-08',
  },
];
