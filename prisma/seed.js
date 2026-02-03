const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const dataDir = path.join(process.cwd(), 'data');

  // Seed works
  const worksRaw = fs.readFileSync(path.join(dataDir, 'works.json'), 'utf-8');
  const works = JSON.parse(worksRaw);

  for (const w of works) {
    await prisma.work.upsert({
      where: { id: w.id },
      update: {},
      create: {
        id: w.id,
        title: w.title,
        description: w.description,
        category: w.category,
        image: w.image,
        date: w.date,
      },
    });
  }
  console.log(`Seeded ${works.length} works`);

  // Seed slideshow
  const slidesRaw = fs.readFileSync(path.join(dataDir, 'slideshow.json'), 'utf-8');
  const slides = JSON.parse(slidesRaw);

  await prisma.slide.deleteMany();
  await prisma.slide.createMany({
    data: slides.map((s, i) => ({
      src: s.src,
      alt: s.alt,
      position: i,
    })),
  });
  console.log(`Seeded ${slides.length} slides`);

  // Seed images from public/images/works/
  const imagesDir = path.join(process.cwd(), 'public', 'images', 'works');
  if (fs.existsSync(imagesDir)) {
    const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const files = fs.readdirSync(imagesDir).filter((f) => {
      const ext = path.extname(f).toLowerCase();
      return imageExts.includes(ext);
    });

    for (const filename of files) {
      const url = `/images/works/${filename}`;
      await prisma.image.upsert({
        where: { url },
        update: {},
        create: { url, filename },
      });
    }
    console.log(`Seeded ${files.length} images`);
  }

  // Seed admin user
  const passwordHash = await hash('admin', 10);
  await prisma.adminUser.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash,
    },
  });
  console.log('Seeded admin user (admin/admin)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
