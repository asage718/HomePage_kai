import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const users = await prisma.adminUser.findMany({
    select: { id: true, username: true, createdAt: true },
    orderBy: { createdAt: 'asc' },
  });
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body as { username?: string; password?: string };

  if (!username || !username.trim()) {
    return NextResponse.json({ error: 'ユーザー名は必須です' }, { status: 400 });
  }
  if (!password || password.length < 4) {
    return NextResponse.json({ error: 'パスワードは4文字以上で入力してください' }, { status: 400 });
  }

  const existing = await prisma.adminUser.findUnique({ where: { username: username.trim() } });
  if (existing) {
    return NextResponse.json({ error: 'このユーザー名は既に使用されています' }, { status: 409 });
  }

  const passwordHash = await hash(password, 10);
  const user = await prisma.adminUser.create({
    data: { username: username.trim(), passwordHash },
    select: { id: true, username: true, createdAt: true },
  });

  return NextResponse.json(user, { status: 201 });
}
