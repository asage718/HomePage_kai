// Work types
export type WorkCategory = 'イラスト' | 'キャラクターデザイン';

export interface Work {
  id: string;
  title: string;
  description: string;
  category: WorkCategory;
  image: string;
  date: string;
}

// Slideshow types
export interface Slide {
  src: string;
  alt: string;
}

// Contact types
export type ContactStatus = 'unread' | 'in_progress' | 'done';

export interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
}

// Profile types
export interface Profile {
  id?: number;
  name: string;
  role: string;
  bio: string;
  image: string | null;
}

export interface Career {
  id?: number;
  year: string;
  text: string;
}

// Account types
export interface Account {
  id: number;
  username: string;
  createdAt: string;
}

// Image types
export interface ImageRecord {
  id: number;
  url: string;
  filename: string;
  createdAt?: string;
}
