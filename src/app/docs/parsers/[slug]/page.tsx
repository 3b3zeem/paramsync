import { Metadata } from "next";
import { notFound } from "next/navigation";
import { parsersData, allParserSlugs } from "@/features/docs/data/parsers.data";
import { ParserDetailDocView } from "@/features/docs/views/ParserDetailDocView";
import { JsonLd } from "@/components/shared/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allParserSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parser = parsersData[slug];
  if (!parser) return { title: "Parser Not Found" };

  const canonicalUrl = `https://paramsync.vercel.app/docs/parsers/${slug}`;
  const ogImageUrl = `https://paramsync.vercel.app/api/og?title=${encodeURIComponent(parser.name)}&category=Parser%20Reference&desc=${encodeURIComponent(parser.summary)}`;

  return {
    title: `${parser.name} Parser Reference`,
    description: parser.summary,
    keywords: [
      parser.name,
      "paramsync parser",
      "nextjs query state",
      "url search params",
      "type safe query state",
      "clean url policy",
      "nextjs 15",
      "react 19",
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${parser.name} | paramsync Documentation`,
      description: parser.summary,
      url: canonicalUrl,
      siteName: "paramsync",
      type: "article",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${parser.name} Parser Reference - paramsync`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${parser.name} | paramsync`,
      description: parser.summary,
      images: [ogImageUrl],
      creator: "@paramsync",
    },
  };
}

export default async function ParserDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const parser = parsersData[slug];
  if (!parser) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${parser.name} Parser Reference | paramsync`,
    description: parser.summary,
    url: `https://paramsync.vercel.app/docs/parsers/${slug}`,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: "paramsync",
      url: "https://paramsync.vercel.app",
    },
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
          name: "Parsers",
          item: "https://paramsync.vercel.app/docs/parsers/parse-as-string",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: parser.name,
          item: `https://paramsync.vercel.app/docs/parsers/${slug}`,
        },
      ],
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <ParserDetailDocView parser={parser} />
    </>
  );
}
