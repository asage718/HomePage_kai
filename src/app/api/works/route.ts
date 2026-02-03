import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api-utils';

export async function GET() {
  try {
    const works = await prisma.work.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        image: true,
        date: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const response = NextResponse.json(works);
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    return response;
  } catch {
    return errorResponse('取得に失敗しました');
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newWork = await prisma.work.create({
      data: {
        title: body.title || '',
        description: body.description || '',
        category: body.category || 'イラスト',
        image: body.image || '',
        date: body.date || new Date().toISOString().slice(0, 7),
      },
    });

    return successResponse(newWork, 201);
  } catch {
    return errorResponse('作成に失敗しました');
  }
}
