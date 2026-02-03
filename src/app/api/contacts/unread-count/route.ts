import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const count = await prisma.contact.count({
      where: { status: 'unread' },
    });
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ error: '取得に失敗しました' }, { status: 500 });
  }
}
