import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { errorResponse } from '@/lib/api-utils';

export async function GET() {
  try {
    const images = await prisma.image.findMany({
      select: { id: true, url: true, filename: true },
      orderBy: { createdAt: 'desc' },
    });

    const response = NextResponse.json(images);
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    return response;
  } catch {
    return errorResponse('取得に失敗しました');
  }
}
