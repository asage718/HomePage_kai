import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: '無効なIDです' }, { status: 400 });
  }

  const body = await request.json();
  const { password } = body as { password?: string };

  if (!password || password.length < 4) {
    return NextResponse.json({ error: 'パスワードは4文字以上で入力してください' }, { status: 400 });
  }

  const existing = await prisma.adminUser.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: 'ユーザーが見つかりません' }, { status: 404 });
  }

  const passwordHash = await hash(password, 10);
  await prisma.adminUser.update({
    where: { id },
    data: { passwordHash },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: '無効なIDです' }, { status: 400 });
  }

  const count = await prisma.adminUser.count();
  if (count <= 1) {
    return NextResponse.json({ error: '最後のアカウントは削除できません' }, { status: 400 });
  }

  const existing = await prisma.adminUser.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: 'ユーザーが見つかりません' }, { status: 404 });
  }

  await prisma.adminUser.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
