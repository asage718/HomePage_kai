export type WorkCategory = 'イラスト' | 'キャラクターデザイン';

export interface Work {
  id: string;
  title: string;
  description: string;
  category: WorkCategory;
  image: string;
  date: string;
}

export interface Slide {
  src: string;
  alt: string;
}

export const categories: WorkCategory[] = ['イラスト', 'キャラクターデザイン'];
