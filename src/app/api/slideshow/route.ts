import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const slides = await prisma.slide.findMany({
    orderBy: { position: 'asc' },
  });
  return NextResponse.json(slides.map((s) => ({ src: s.src, alt: s.alt })));
}

export async function PUT(request: Request) {
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

  return NextResponse.json(slides);
}
