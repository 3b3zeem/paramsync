import { Metadata } from "next";
import { QuickStartDocView } from "@/features/docs/views/QuickStartDocView";
import { JsonLd } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Quick Start Tutorial",
  description:
    "Learn how to bind URL search parameters to type-safe React state in Next.js App Router in 3 easy steps.",
  alternates: { canonical: "https://paramsync.vercel.app/docs/quick-start" },
  openGraph: {
    title: "Quick Start Tutorial | paramsync",
    description:
      "Bind URL search parameters to type-safe React state in Next.js in 3 minutes.",
    url: "https://paramsync.vercel.app/docs/quick-start",
    siteName: "paramsync",
    type: "article",
    images: [
      {
        url: "https://paramsync.vercel.app/api/og?title=Quick%20Start%20Tutorial&category=Getting%20Started&desc=Build%20a%20debounced%20search%20input%20and%20pagination%20flow%20in%203%20easy%20steps.",
        width: 1200,
        height: 630,
        alt: "Quick Start Tutorial - paramsync",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quick Start Tutorial | paramsync",
    description: "Learn how to use paramsync in React and Next.js in minutes.",
    images: [
      "https://paramsync.vercel.app/api/og?title=Quick%20Start%20Tutorial&category=Getting%20Started&desc=Build%20a%20debounced%20search%20input%20and%20pagination%20flow%20in%203%20easy%20steps.",
    ],
    creator: "@paramsync",
  },
};

export default function QuickStartPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Quick Start with paramsync in Next.js",
    description:
      "Learn how to set up type-safe URL query state with useQueryState.",
    url: "https://paramsync.vercel.app/docs/quick-start",
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <QuickStartDocView />
    </>
  );
}
