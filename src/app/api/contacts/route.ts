import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const VALID_STATUSES = ['unread', 'in_progress', 'done'] as const;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.trim() || '';
    const status = searchParams.get('status') || '';

    const where: Record<string, unknown> = {};

    if (q) {
      where.OR = [
        { name: { contains: q } },
        { email: { contains: q } },
        { subject: { contains: q } },
        { message: { contains: q } },
      ];
    }

    if (status && VALID_STATUSES.includes(status as typeof VALID_STATUSES[number])) {
      where.status = status;
    }

    const contacts = await prisma.contact.findMany({
      where,
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
    const { id, status } = body;

    if (typeof id !== 'number') {
      return NextResponse.json({ error: '無効なリクエストです' }, { status: 400 });
    }

    if (typeof status !== 'string' || !VALID_STATUSES.includes(status as typeof VALID_STATUSES[number])) {
      return NextResponse.json({ error: '無効なステータスです' }, { status: 400 });
    }

    const contact = await prisma.contact.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(contact);
  } catch {
    return NextResponse.json({ error: '更新に失敗しました' }, { status: 500 });
  }
}
