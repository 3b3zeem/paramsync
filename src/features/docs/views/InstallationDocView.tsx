"use client";

import React from "react";
import { DocsPaginationFooter } from "../components/DocsPaginationFooter";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { ShareFeatureButton } from "@/components/shared/ShareFeatureButton";

export function InstallationDocView() {
  return (
    <article className="w-full py-6 sm:py-10 px-2 sm:px-4 md:px-6 lg:px-8">
      <header className="border-b border-zinc-200 dark:border-[#323846] pb-8 mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
            <span>paramsync</span>
            <span>&gt;</span>
            <span className="text-zinc-700 dark:text-zinc-300">
              installation
            </span>
          </div>

          <ShareFeatureButton
            title="Installation & Setup"
            description="Install paramsync for Next.js 14, Next.js 15, and React 18/19."
            url="https://paramsync.vercel.app/docs/installation"
            category="Getting Started"
          />
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Installation &amp; Setup
        </h1>
        <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
          How to install paramsync and integrate it into Next.js 14, Next.js 15,
          and React 18/19 applications.
        </p>
      </header>

            {/* Entrypoints Guide */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
          Entrypoints &amp; Framework Support
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          paramsync provides dedicated entrypoints tailored to your application architecture:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-[#323846] bg-zinc-50 dark:bg-zinc-900/50">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
              Vite, React Router, Remix, Astro
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3">
              Router-agnostic with built-in Vanilla browser history support and zero dependencies on Next.js.
            </p>
            <CodeBlock
              code={"import { useQueryState, parseAsString } from 'paramsync';"}
              language="tsx"
              filename="Component.tsx"
            />
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-[#323846] bg-zinc-50 dark:bg-zinc-900/50">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
              Next.js App Router (RSC)
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3">
              Deep integration with Next.js router transitions, useTransition, and Server Components.
            </p>
            <CodeBlock
              code={"import { useQueryState, parseAsString } from 'paramsync/next';"}
              language="tsx"
              filename="Component.tsx"
            />
          </div>
        </div>
      </section>

      {/* Package Manager Commands */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
          Install Package
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          Install paramsync using your preferred Node.js package manager:
        </p>
        <CodeBlock
          code={`# npm
npm install paramsync

# pnpm
pnpm add paramsync

# yarn
yarn add paramsync

# bun
bun add paramsync`}
          language="bash"
          filename="terminal"
        />
      </section>

      {/* Peer Dependencies */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
          Peer Dependencies
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          paramsync has zero external dependencies and relies solely on React
          and Next.js:
        </p>
        <div className="border border-zinc-200 dark:border-[#323846] rounded-xl overflow-hidden bg-white dark:bg-[#191b21] shadow-2xs">
          <table className="w-full text-left text-xs sm:text-sm font-mono border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-[#323846] bg-zinc-50 dark:bg-[#23272f] font-sans text-xs text-zinc-700 dark:text-zinc-300">
                <th className="p-3 sm:px-4 sm:py-3 font-semibold">
                  Dependency
                </th>
                <th className="p-3 sm:px-4 sm:py-3 font-semibold">
                  Supported Versions
                </th>
                <th className="p-3 sm:px-4 sm:py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-[#323846]/80 text-zinc-700 dark:text-zinc-300 font-sans">
              <tr className="hover:bg-zinc-50 dark:hover:bg-[#23272f]/40 transition-colors">
                <td className="p-3 sm:px-4 sm:py-3 font-mono font-medium text-zinc-900 dark:text-zinc-100">
                  react
                </td>
                <td className="p-3 sm:px-4 sm:py-3 font-mono text-zinc-600 dark:text-zinc-400">
                  &gt;= 18.0.0 || &gt;= 19.0.0
                </td>
                <td className="p-3 sm:px-4 sm:py-3 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-medium">
                  Required
                </td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-[#23272f]/40 transition-colors">
                <td className="p-3 sm:px-4 sm:py-3 font-mono font-medium text-zinc-900 dark:text-zinc-100">
                  next
                </td>
                <td className="p-3 sm:px-4 sm:py-3 font-mono text-zinc-600 dark:text-zinc-400">
                  &gt;= 13.0.0 (App Router)
                </td>
                <td className="p-3 sm:px-4 sm:py-3 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-medium">
                  Required
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Next.js 15 Turbopack Compatibility */}
      <section className="mb-10 p-5 rounded-xl border border-zinc-200 dark:border-[#323846] bg-zinc-50/80 dark:bg-[#23272f] shadow-2xs">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
          Next.js 15 &amp; Turbopack Certified
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          paramsync is distributed as dual ESM/CJS bundles with clean
          tree-shaking metadata. It compiles with zero warnings in Turbopack,
          Webpack, and Vite environments.
        </p>
      </section>

      <DocsPaginationFooter customPath="/docs/installation" />
    </article>
  );
}
