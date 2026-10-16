"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Code2, ShieldCheck, Zap, Layers } from "lucide-react";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { ShareFeatureButton } from "@/components/shared/ShareFeatureButton";
import { DocsPaginationFooter } from "../components/DocsPaginationFooter";
import { parsersData } from "../data/parsers.data";

export function DocsOverviewView() {
  const parsersList = Object.values(parsersData);

  return (
    <article className="w-full py-6 sm:py-10 px-2 sm:px-4 md:px-6 lg:px-8">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 pb-8 mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
            <span>paramsync</span>
            <span>&gt;</span>
            <span className="text-zinc-700 dark:text-zinc-300">overview</span>
          </div>

          <ShareFeatureButton
            title="paramsync Documentation"
            description="Type-safe URL Search Parameters state manager for React and Next.js."
            url="https://paramsync.vercel.app/docs"
            category="Documentation"
          />
        </div>

        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          paramsync Documentation
        </h1>
        <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          A high-performance, type-safe URL Search Parameters state manager
          engineered for React 18+ and Next.js App Router applications.
        </p>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-6">
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-[#323846] bg-white dark:bg-[#23272f] hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 font-semibold">
                0ms
              </span>
            </div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              0ms Typing Lag
            </h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
              Local input state responds instantly while URL updates are
              smoothly debounced in the background.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-[#323846] bg-white dark:bg-[#23272f] hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold">
                Auto-Purge
              </span>
            </div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Clean URL Policy
            </h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
              Empty strings, empty arrays, and defaults are purged automatically
              from query strings.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-[#323846] bg-white dark:bg-[#23272f] hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="p-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-cyan-200 dark:border-cyan-500/30 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 font-semibold">
                Atomic
              </span>
            </div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Batch Transitions
            </h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
              Commit multi-filter drawer updates atomically in one single
              Next.js navigation transition.
            </p>
          </div>
        </div>
      </header>

      {/* Installation */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
          Installation
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
          Install paramsync via your preferred package manager:
        </p>
        <CodeBlock
          code={`npm install paramsync\n# or\npnpm add paramsync\n# or\nyarn add paramsync`}
          language="bash"
          filename="terminal"
        />
      </section>

      {/* Quick Example */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
          Quick Start Example
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
          Pair{" "}
          <code className="font-mono text-zinc-800 dark:text-zinc-200">
            useQueryState
          </code>{" "}
          with built-in parsers to bind state directly to URL search params:
        </p>
        <CodeBlock
          code={`'use client';

import { useQueryState, parseAsString, parseAsInteger } from 'paramsync';

export default function SearchFeed() {
  // Live search with 300ms debounce
  const [search, setSearch] = useQueryState('q', parseAsString.withDefault(''), {
    debounceMs: 300,
  });

  // Numeric page index
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setPage(1); // auto-reset page on search
          setSearch(e.target.value);
        }}
        placeholder="Filter results..."
      />
    </div>
  );
}`}
          language="tsx"
          filename="SearchFeed.tsx"
        />
      </section>

      {/* Built-in Parsers Grid */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
          Built-in Parsers Reference
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          Each parser enforces strict runtime validation, TypeScript type
          narrowing, and Clean URL policy purging:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {parsersList.map((parser) => (
            <Link
              key={parser.slug}
              href={`/docs/parsers/${parser.slug}`}
              className="group p-4 rounded-lg border border-zinc-200 dark:border-[#323846] bg-white dark:bg-[#23272f] hover:bg-zinc-50 dark:hover:bg-[#2a303c] hover:border-zinc-300 dark:hover:border-zinc-500 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {parser.name}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="mt-1.5 text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                {parser.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom Pagination Footer */}
      <DocsPaginationFooter customPath="/docs" />
    </article>
  );
}
