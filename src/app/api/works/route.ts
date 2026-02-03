import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const works = await prisma.work.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(works);
}

export async function POST(request: Request) {
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

  return NextResponse.json(newWork, { status: 201 });
}
