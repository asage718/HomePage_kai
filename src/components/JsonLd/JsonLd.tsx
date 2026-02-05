import { siteConfig } from '@/lib/seo-config';

interface PersonJsonLdProps {
  name?: string;
  jobTitle?: string;
  description?: string;
  image?: string | null;
}

export function PersonJsonLd({
  name = siteConfig.author,
  jobTitle = 'イラストレーター・キャラクターデザイナー',
  description = siteConfig.description,
  image,
}: PersonJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    description,
    url: siteConfig.url,
    image: image || undefined,
    sameAs: siteConfig.twitter ? [`https://twitter.com/${siteConfig.twitter.replace('@', '')}`] : [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebsiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      '@type': 'Person',
      name: siteConfig.author,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface CreativeWorkJsonLdProps {
  name: string;
  description: string;
  image: string;
  dateCreated?: string;
  creator?: string;
}

export function CreativeWorkJsonLd({
  name,
  description,
  image,
  dateCreated,
  creator = siteConfig.author,
}: CreativeWorkJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    description,
    image,
    dateCreated,
    creator: {
      '@type': 'Person',
      name: creator,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
