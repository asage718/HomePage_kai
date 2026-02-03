import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const profile = await prisma.profile.findFirst();
    const careers = await prisma.career.findMany({
      orderBy: { position: 'asc' },
    });

    return NextResponse.json({
      profile: profile || {
        name: 'aoimachi',
        role: 'Illustrator / Character Designer',
        bio: '',
        image: null,
      },
      careers,
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json({ error: '取得に失敗しました' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { profile, careers } = body;

    // Update or create profile
    const existingProfile = await prisma.profile.findFirst();

    if (existingProfile) {
      await prisma.profile.update({
        where: { id: existingProfile.id },
        data: {
          name: profile.name,
          role: profile.role,
          bio: profile.bio,
          image: profile.image,
        },
      });
    } else {
      await prisma.profile.create({
        data: {
          name: profile.name,
          role: profile.role,
          bio: profile.bio,
          image: profile.image,
        },
      });
    }

    // Update careers
    await prisma.career.deleteMany();
    if (careers && careers.length > 0) {
      await prisma.career.createMany({
        data: careers.map((c: { year: string; text: string }, i: number) => ({
          year: c.year,
          text: c.text,
          position: i,
        })),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: '更新に失敗しました' }, { status: 500 });
  }
}
