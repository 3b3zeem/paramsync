import { Metadata } from "next";
import { DocsOverviewView } from "@/features/docs/views/DocsOverviewView";
import { JsonLd } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Documentation Overview",
  description:
    "Complete documentation for paramsync: zero-overhead, type-safe URL Search Parameters state manager for React and Next.js App Router.",
  alternates: {
    canonical: "https://paramsync.vercel.app/docs",
  },
  openGraph: {
    title: "Documentation Overview | paramsync",
    description:
      "Learn how to manage type-safe URL state in Next.js App Router with 0ms typing lag and clean URLs.",
    url: "https://paramsync.vercel.app/docs",
    siteName: "paramsync",
    type: "article",
    images: [
      {
        url: "https://paramsync.vercel.app/api/og?title=Documentation%20Overview&category=Documentation&desc=Complete%20guides%2C%20parser%20references%2C%20and%20hooks%20for%20Next.js%20query%20state.",
        width: 1200,
        height: 630,
        alt: "Documentation Overview - paramsync",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Documentation Overview | paramsync",
    description: "Complete documentation and guides for paramsync.",
    images: [
      "https://paramsync.vercel.app/api/og?title=Documentation%20Overview&category=Documentation&desc=Complete%20guides%2C%20parser%20references%2C%20and%20hooks%20for%20Next.js%20query%20state.",
    ],
    creator: "@paramsync",
  },
};

export default function DocsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "paramsync Documentation Overview",
    description:
      "Complete guides and references for paramsync in React and Next.js.",
    url: "https://paramsync.vercel.app/docs",
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <DocsOverviewView />
    </>
  );
}
