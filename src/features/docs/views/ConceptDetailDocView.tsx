'use client';

import React from 'react';
import { ConceptDocItem } from '../data/concepts.data';
import { DocsPaginationFooter } from '../components/DocsPaginationFooter';
import { CodeBlock } from '@/components/shared/CodeBlock';
import { ShareFeatureButton } from '@/components/shared/ShareFeatureButton';
import { AlertCircle, CheckCircle2, Lightbulb } from 'lucide-react';

interface ConceptDetailDocViewProps {
  concept: ConceptDocItem;
}

export function ConceptDetailDocView({ concept }: ConceptDetailDocViewProps) {
  return (
    <article className="w-full py-6 sm:py-10 px-2 sm:px-4 md:px-6 lg:px-8">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-[#323846] pb-8 mb-8">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-purple-50 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 font-semibold">
              Concept
            </span>
            <span className="text-xs text-zinc-500 font-mono">
              paramsync &gt; concepts
            </span>
          </div>

          <ShareFeatureButton
            title={concept.title}
            description={concept.summary}
            url={`https://paramsync.dev/docs/concepts/${concept.slug}`}
            category="Core Concept"
          />
        </div>

        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {concept.title}
        </h1>

        <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {concept.summary}
        </p>
      </header>

      {/* The Problem */}
      <section className="mb-10 p-5 rounded-xl border border-rose-200 dark:border-rose-950/60 bg-rose-50/70 dark:bg-rose-950/20 shadow-2xs">
        <div className="flex items-center gap-2 mb-2 text-rose-700 dark:text-rose-400 font-semibold text-sm">
          <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
          <span>The Problem</span>
        </div>
        <p className="text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
          {concept.problem}
        </p>
      </section>

      {/* The Solution */}
      <section className="mb-10 p-5 rounded-xl border border-emerald-200 dark:border-emerald-950/60 bg-emerald-50/70 dark:bg-emerald-950/20 shadow-2xs">
        <div className="flex items-center gap-2 mb-2 text-emerald-700 dark:text-emerald-400 font-semibold text-sm">
          <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>The paramsync Solution</span>
        </div>
        <p className="text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
          {concept.solution}
        </p>
      </section>

      {/* Key Architectural Takeaways */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4 tracking-tight">
          Key Architectural Takeaways
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {concept.keyTakeaways.map((takeaway, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 p-3.5 rounded-lg border border-zinc-200 dark:border-[#323846] bg-white dark:bg-[#23272f] text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed shadow-2xs"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Code Snippet */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
          Implementation Pattern
        </h2>
        <CodeBlock code={concept.codeSnippet} language="tsx" filename="Pattern.tsx" />
      </section>

      {/* Deep Dive Sections if any */}
      {concept.deepDiveSections?.map((section, idx) => (
        <section key={idx} className="mb-10">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
            {section.heading}
          </h2>
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-[#323846] bg-zinc-50 dark:bg-[#191b21] font-mono text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-line leading-relaxed shadow-2xs">
            {section.content}
          </div>
        </section>
      ))}

      {/* Bottom Pagination Footer */}
      <DocsPaginationFooter customPath={`/docs/concepts/${concept.slug}`} />
    </article>
  );
}
