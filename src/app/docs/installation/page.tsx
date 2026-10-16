import { Metadata } from 'next';
import { InstallationDocView } from '@/features/docs/views/InstallationDocView';
import { JsonLd } from '@/components/shared/JsonLd';

export const metadata: Metadata = {
  title: 'Installation & Setup',
  description: 'Install paramsync with npm, pnpm, yarn, or bun for Next.js 14, 15, and React 18/19 applications.',
  alternates: { canonical: 'https://paramsync.dev/docs/installation' },
  openGraph: {
    title: 'Installation & Setup | paramsync',
    description: 'Install paramsync with npm, pnpm, yarn, or bun for Next.js 14, 15, and React 18/19.',
    url: 'https://paramsync.dev/docs/installation',
    siteName: 'paramsync',
    type: 'article',
    images: [
      {
        url: 'https://paramsync.dev/api/og?title=Installation%20%26%20Setup&category=Getting%20Started&desc=How%20to%20install%20paramsync%20and%20integrate%20it%20into%20Next.js%20and%20React%20projects.',
        width: 1200,
        height: 630,
        alt: 'Installation & Setup - paramsync',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Installation & Setup | paramsync',
    description: 'How to install paramsync in Next.js 14/15 and React 18/19.',
    images: [
      'https://paramsync.dev/api/og?title=Installation%20%26%20Setup&category=Getting%20Started&desc=How%20to%20install%20paramsync%20and%20integrate%20it%20into%20Next.js%20and%20React%20projects.',
    ],
    creator: '@paramsync',
  },
};

export default function InstallationPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Install paramsync',
    description: 'Step-by-step guide to installing paramsync via npm, pnpm, yarn, or bun in Next.js.',
    url: 'https://paramsync.dev/docs/installation',
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <InstallationDocView />
    </>
  );
}
