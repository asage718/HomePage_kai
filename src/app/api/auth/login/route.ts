import { NextResponse } from 'next/server';
import { verifyLogin, createToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'ユーザー名とパスワードを入力してください' }, { status: 400 });
    }

    const valid = await verifyLogin(username, password);
    if (!valid) {
      return NextResponse.json({ error: 'ユーザー名またはパスワードが正しくありません' }, { status: 401 });
    }

    const token = await createToken(username);
    const response = NextResponse.json({ success: true });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
