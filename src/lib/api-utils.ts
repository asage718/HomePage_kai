import { NextResponse } from 'next/server';

// Unified API response helpers
export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function errorResponse(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

export function validationErrorResponse(errors: Record<string, string | undefined>) {
  return NextResponse.json({ errors }, { status: 400 });
}

// Parse and validate ID parameter
export function parseId(id: string): number | null {
  const parsed = parseInt(id, 10);
  return isNaN(parsed) ? null : parsed;
}

// Error messages
export const ERROR_MESSAGES = {
  // Common
  INTERNAL_ERROR: 'エラーが発生しました',
  NOT_FOUND: '見つかりませんでした',
  INVALID_REQUEST: '無効なリクエストです',

  // Auth
  INVALID_CREDENTIALS: 'ユーザー名またはパスワードが正しくありません',
  UNAUTHORIZED: '認証が必要です',

  // Contact
  CONTACT_FETCH_ERROR: '取得に失敗しました',
  CONTACT_UPDATE_ERROR: '更新に失敗しました',
  CONTACT_SEND_ERROR: '送信に失敗しました',
  INVALID_STATUS: '無効なステータスです',

  // Upload
  NO_FILE: 'ファイルが選択されていません',
  INVALID_FILE_TYPE: '許可されていないファイル形式です',
  FILE_TOO_LARGE: 'ファイルサイズは10MB以下にしてください',
  UPLOAD_ERROR: 'アップロードに失敗しました',

  // Account
  USERNAME_EXISTS: 'このユーザー名は既に使用されています',
  ACCOUNT_CREATE_ERROR: '作成に失敗しました',
  ACCOUNT_UPDATE_ERROR: '更新に失敗しました',
  ACCOUNT_DELETE_ERROR: '削除に失敗しました',
  CANNOT_DELETE_SELF: '自分自身は削除できません',

  // Profile
  PROFILE_FETCH_ERROR: '取得に失敗しました',
  PROFILE_UPDATE_ERROR: '更新に失敗しました',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  SAVED: '保存しました',
  DELETED: '削除しました',
  UPDATED: '更新しました',
  CREATED: '作成しました',
  SENT: '送信しました',
} as const;
