import { prisma } from './prisma';
import type { Work, Slide } from './types';

export async function getWorks(): Promise<Work[]> {
  const rows = await prisma.work.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      image: true,
      date: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description,
    category: r.category as Work['category'],
    image: r.image,
    date: r.date,
  }));
}

export async function getSlideshow(): Promise<Slide[]> {
  return prisma.slide.findMany({
    select: { src: true, alt: true },
    orderBy: { position: 'asc' },
  });
}
