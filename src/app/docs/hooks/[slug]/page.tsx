import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hooksData, allHookSlugs } from '@/features/docs/data/hooks.data';
import { HookDetailDocView } from '@/features/docs/views/HookDetailDocView';
import { JsonLd } from '@/components/shared/JsonLd';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allHookSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const hook = hooksData[slug];
  if (!hook) return { title: 'Hook Not Found' };

  const canonicalUrl = `https://paramsync.dev/docs/hooks/${slug}`;
  const ogImageUrl = `https://paramsync.dev/api/og?title=${encodeURIComponent(hook.name)}&category=Hook%20Reference&desc=${encodeURIComponent(hook.summary)}`;

  return {
    title: `${hook.name} Hook Reference`,
    description: hook.summary,
    keywords: [
      hook.name,
      'useQueryState',
      'useBatchQueryParams',
      'paramsync hook',
      'nextjs query state hook',
      'react search params hook',
      'url query manager',
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${hook.name} | paramsync Documentation`,
      description: hook.summary,
      url: canonicalUrl,
      siteName: 'paramsync',
      type: 'article',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${hook.name} Hook Reference - paramsync`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${hook.name} | paramsync`,
      description: hook.summary,
      images: [ogImageUrl],
      creator: '@paramsync',
    },
  };
}

export default async function HookDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const hook = hooksData[slug];
  if (!hook) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `${hook.name} Hook Reference | paramsync`,
    description: hook.summary,
    url: `https://paramsync.dev/docs/hooks/${slug}`,
    inLanguage: 'en-US',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://paramsync.dev',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Documentation',
          item: 'https://paramsync.dev/docs',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Hooks',
          item: 'https://paramsync.dev/docs/hooks/use-query-state',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: hook.name,
          item: `https://paramsync.dev/docs/hooks/${slug}`,
        },
      ],
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <HookDetailDocView hook={hook} />;
    </>
  );
}
