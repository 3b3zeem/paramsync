import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  conceptsData,
  allConceptSlugs,
} from "@/features/docs/data/concepts.data";
import { ConceptDetailDocView } from "@/features/docs/views/ConceptDetailDocView";
import { JsonLd } from "@/components/shared/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allConceptSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const concept = conceptsData[slug];
  if (!concept) return { title: "Concept Not Found" };

  const canonicalUrl = `https://paramsync.vercel.app/docs/concepts/${slug}`;
  const ogImageUrl = `https://paramsync.vercel.app/api/og?title=${encodeURIComponent(concept.title)}&category=Core%20Concept&desc=${encodeURIComponent(concept.summary)}`;

  return {
    title: `${concept.title} | paramsync Concepts`,
    description: concept.summary,
    keywords: [
      concept.title,
      "paramsync concepts",
      "clean url policy",
      "suspense boundaries nextjs",
      "stale page prevention",
      "nextjs search params best practices",
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${concept.title} | paramsync`,
      description: concept.summary,
      url: canonicalUrl,
      siteName: "paramsync",
      type: "article",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${concept.title} - paramsync Concepts`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${concept.title} | paramsync`,
      description: concept.summary,
      images: [ogImageUrl],
      creator: "@paramsync",
    },
  };
}

export default async function ConceptDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const concept = conceptsData[slug];
  if (!concept) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${concept.title} | paramsync Concepts`,
    description: concept.summary,
    url: `https://paramsync.vercel.app/docs/concepts/${slug}`,
    inLanguage: "en-US",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://paramsync.vercel.app",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Documentation",
          item: "https://paramsync.vercel.app/docs",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Concepts",
          item: "https://paramsync.vercel.app/docs/concepts/clean-url-policy",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: concept.title,
          item: `https://paramsync.vercel.app/docs/concepts/${slug}`,
        },
      ],
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <ConceptDetailDocView concept={concept} />;
    </>
  );
}
