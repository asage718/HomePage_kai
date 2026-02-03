import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api-utils';

export async function GET() {
  try {
    const slides = await prisma.slide.findMany({
      select: { src: true, alt: true },
      orderBy: { position: 'asc' },
    });

    const response = NextResponse.json(slides);
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    return response;
  } catch {
    return errorResponse('取得に失敗しました');
  }
}

export async function PUT(request: Request) {
  try {
    const slides: { src: string; alt: string }[] = await request.json();

    await prisma.$transaction([
      prisma.slide.deleteMany(),
      prisma.slide.createMany({
        data: slides.map((s, i) => ({
          src: s.src,
          alt: s.alt,
          position: i,
        })),
      }),
    ]);

    return successResponse(slides);
  } catch {
    return errorResponse('更新に失敗しました');
  }
}
