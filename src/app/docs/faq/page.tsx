import { Metadata } from "next";
import { FAQDocView } from "@/features/docs/views/FAQDocView";
import { JsonLd } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "FAQ & Troubleshooting",
  description:
    "Frequently asked questions, performance gotchas, Turbopack compatibility, and troubleshooting for paramsync in Next.js.",
  alternates: {
    canonical: "https://paramsync.vercel.app/docs/faq",
  },
  openGraph: {
    title: "FAQ & Troubleshooting | paramsync",
    description:
      "Answers to architectural, performance, and integration questions for paramsync.",
    url: "https://paramsync.vercel.app/docs/faq",
    siteName: "paramsync",
    type: "article",
    images: [
      {
        url: "https://paramsync.vercel.app/api/og?title=FAQ%20%26%20Troubleshooting&category=Support&desc=Frequently%20asked%20questions%2C%20gotchas%2C%20and%20troubleshooting%20for%20paramsync.",
        width: 1200,
        height: 630,
        alt: "FAQ & Troubleshooting - paramsync",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ & Troubleshooting | paramsync",
    description: "Frequently asked questions and gotchas for paramsync.",
    images: [
      "https://paramsync.vercel.app/api/og?title=FAQ%20%26%20Troubleshooting&category=Support&desc=Frequently%20asked%20questions%2C%20gotchas%2C%20and%20troubleshooting%20for%20paramsync.",
    ],
    creator: "@paramsync",
  },
};

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: "paramsync FAQ & Troubleshooting",
    url: "https://paramsync.vercel.app/docs/faq",
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <FAQDocView />
    </>
  );
}
