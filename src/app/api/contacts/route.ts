import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(contacts);
  } catch {
    return NextResponse.json({ error: '取得に失敗しました' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, read } = body;

    if (typeof id !== 'number' || typeof read !== 'boolean') {
      return NextResponse.json({ error: '無効なリクエストです' }, { status: 400 });
    }

    const contact = await prisma.contact.update({
      where: { id },
      data: { read },
    });

    return NextResponse.json(contact);
  } catch {
    return NextResponse.json({ error: '更新に失敗しました' }, { status: 500 });
  }
}
