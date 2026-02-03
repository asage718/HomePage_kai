import { EMAIL_REGEX, PASSWORD_MIN_LENGTH, CONTACT_STATUSES } from './constants';
import type { ContactStatus } from './types';

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function isValidPassword(password: string): boolean {
  return password.length >= PASSWORD_MIN_LENGTH;
}

export function isValidContactStatus(status: string): status is ContactStatus {
  return CONTACT_STATUSES.includes(status as ContactStatus);
}

export type ContactFormErrors = {
  [key: string]: string | undefined;
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export function validateContactForm(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'お名前を入力してください';
  }

  if (!data.email.trim()) {
    errors.email = 'メールアドレスを入力してください';
  } else if (!isValidEmail(data.email)) {
    errors.email = '正しいメールアドレスを入力してください';
  }

  if (!data.subject.trim()) {
    errors.subject = '依頼内容を入力してください';
  }

  if (!data.message.trim()) {
    errors.message = 'メッセージを入力してください';
  }

  return errors;
}
