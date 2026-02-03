import { prisma } from './prisma';
import type { Work, Slide } from './types';

export async function getWorks(): Promise<Work[]> {
  const rows = await prisma.work.findMany({
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
  const rows = await prisma.slide.findMany({
    orderBy: { position: 'asc' },
  });
  return rows.map((r) => ({
    src: r.src,
    alt: r.alt,
  }));
}
