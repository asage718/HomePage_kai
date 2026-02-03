import type { WorkCategory, ContactStatus } from './types';

// Work categories
export const WORK_CATEGORIES: WorkCategory[] = ['イラスト', 'キャラクターデザイン'];

// Contact status
export const CONTACT_STATUSES: ContactStatus[] = ['unread', 'in_progress', 'done'];

export const CONTACT_STATUS_LABELS: Record<ContactStatus, string> = {
  unread: '未対応',
  in_progress: '対応中',
  done: '完了',
};

export const CONTACT_FILTER_TABS = [
  { value: '', label: '全て' },
  { value: 'unread', label: '未対応' },
  { value: 'in_progress', label: '対応中' },
  { value: 'done', label: '完了' },
] as const;

// Service types for contact form
export const SERVICE_TYPES = [
  'イラスト制作',
  'キャラクターデザイン',
  'ロゴデザイン',
  '漫画制作',
  'その他',
] as const;

// Upload settings
export const UPLOAD_ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
];
export const UPLOAD_MAX_SIZE = 10 * 1024 * 1024; // 10MB

// Auth settings
export const AUTH_COOKIE_NAME = 'admin_session';
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// UI settings
export const DEBOUNCE_DELAY = 300;
export const TOAST_DURATION = 2000;
export const UNREAD_CHECK_INTERVAL = 30000; // 30 seconds

// Validation
export const PASSWORD_MIN_LENGTH = 4;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Default values
export const DEFAULT_PROFILE = {
  name: 'aoimachi',
  role: 'Illustrator / Character Designer',
  bio: '',
  image: null,
};
