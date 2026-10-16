import { Metadata } from 'next';
import { DocsOverviewView } from '@/features/docs/views/DocsOverviewView';

export const metadata: Metadata = {
  title: 'Documentation Overview',
  description:
    'Complete documentation for paramsync: zero-overhead, type-safe URL Search Parameters state manager for React and Next.js App Router.',
  alternates: {
    canonical: 'https://paramsync.dev/docs',
  },
  openGraph: {
    title: 'Documentation Overview | paramsync',
    description:
      'Learn how to manage type-safe URL state in Next.js App Router with 0ms typing lag and clean URLs.',
    url: 'https://paramsync.dev/docs',
  },
};

export default function DocsPage() {
  return <DocsOverviewView />;
}
