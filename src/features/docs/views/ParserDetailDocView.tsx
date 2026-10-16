'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ParserDocItem } from '../types/doc-parser.types';
import { DocsPaginationFooter } from '../components/DocsPaginationFooter';
import { CodeBlock } from '@/components/shared/CodeBlock';
import { ShareFeatureButton } from '@/components/shared/ShareFeatureButton';
import { highlightCode, getTokenClass } from '@/lib/syntaxHighlighter';

interface ParserDetailDocViewProps {
  parser: ParserDocItem;
}

export function ParserDetailDocView({ parser }: ParserDetailDocViewProps) {
  return (
    <article className="w-full py-6 sm:py-10 px-2 sm:px-4 md:px-6 lg:px-8">
      {/* Title & Signature Header */}
      <header className="border-b border-zinc-200 dark:border-[#323846] pb-8 mb-8">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-zinc-100 dark:bg-[#191b21] border border-zinc-200 dark:border-[#383f4e] text-zinc-700 dark:text-zinc-300">
              Parser
            </span>
            <span className="text-xs text-zinc-500 font-mono">
              paramsync &gt; parsers
            </span>
          </div>

          <ShareFeatureButton
            title={parser.name}
            description={parser.summary}
            url={`https://paramsync.dev/docs/parsers/${parser.slug}`}
            category="Parser Reference"
          />
        </div>

        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {parser.name}
        </h1>

        <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {parser.summary}
        </p>

        {/* Type Signature Card - VS Code IntelliSense Style */}
        <div className="mt-5 rounded-xl border border-zinc-200 dark:border-[#323846] bg-white dark:bg-[#191b21] shadow-2xs overflow-hidden">
          <div className="flex items-center justify-between px-3.5 py-2 border-b border-zinc-200 dark:border-[#2a2f3a] bg-[#f8fafc] dark:bg-[#15171c] text-xs font-mono select-none">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-[#007acc] text-white flex items-center justify-center font-bold text-[9px] font-mono">
                TS
              </span>
              <span className="text-zinc-700 dark:text-zinc-300 font-sans font-medium text-[11px] uppercase tracking-wider">
                TypeScript Signature
              </span>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono">IntelliSense</span>
          </div>
          <div className="p-4 overflow-x-auto bg-white dark:bg-[#191b21] font-mono text-xs sm:text-sm">
            <pre className="m-0 leading-relaxed text-zinc-900 dark:text-zinc-100">
              <code>
                {highlightCode(parser.signature, 'typescript').map((line, lIdx) => (
                  <div key={lIdx}>
                    {line.map((token, tIdx) => (
                      <span key={tIdx} className={getTokenClass(token.type)}>
                        {token.text}
                      </span>
                    ))}
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </header>

      {/* Section: What It Does */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
          What it does
        </h2>
        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm sm:text-base">
          {parser.whatItDoes}
        </p>
      </section>

      {/* Section: Best For */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
          Best For
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {parser.bestFor.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 p-3.5 rounded-xl border border-zinc-200 dark:border-[#323846] bg-white dark:bg-[#23272f] text-sm text-zinc-700 dark:text-zinc-200 shadow-2xs hover:border-zinc-300 dark:hover:border-zinc-500 transition-colors"
            >
              <div className="p-1 rounded-md bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <span className="leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Section: How to use it properly */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
          How to use it properly
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
          Import <code className="font-mono text-blue-600 dark:text-cyan-300 bg-zinc-100 dark:bg-[#191b21] px-1.5 py-0.5 rounded border border-zinc-200 dark:border-[#383f4e]">{parser.name}</code> from{' '}
          <code className="font-mono text-amber-600 dark:text-amber-300 bg-zinc-100 dark:bg-[#191b21] px-1.5 py-0.5 rounded border border-zinc-200 dark:border-[#383f4e]">&apos;paramsync&apos;</code> and bind it to{' '}
          <code className="font-mono text-blue-600 dark:text-cyan-300 bg-zinc-100 dark:bg-[#191b21] px-1.5 py-0.5 rounded border border-zinc-200 dark:border-[#383f4e]">useQueryState</code>:
        </p>
        <CodeBlock code={parser.codeExample} language="tsx" filename="Example.tsx" />

        {parser.advancedExample && (
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Advanced Technique
              </span>
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              Functional Updates &amp; Dynamic State
            </h3>
            <CodeBlock
              code={parser.advancedExample}
              language="tsx"
              filename="AdvancedUsage.tsx"
            />
          </div>
        )}
      </section>

      {/* Section: Clean URL Behavior */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Clean URL Behavior
          </h2>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4 leading-relaxed">
          {parser.cleanUrlBehavior.description}
        </p>

        <div className="border border-zinc-200 dark:border-[#323846] rounded-xl overflow-hidden bg-white dark:bg-[#191b21] shadow-2xs">
          <table className="w-full text-left text-xs sm:text-sm font-mono border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-[#2a2f3a] bg-zinc-50 dark:bg-[#23272f] font-sans text-xs text-zinc-700 dark:text-zinc-200">
                <th className="p-3.5 sm:px-4 sm:py-3 font-semibold">State Condition</th>
                <th className="p-3.5 sm:px-4 sm:py-3 font-semibold">Clean URL Action</th>
                <th className="p-3.5 sm:px-4 sm:py-3 font-semibold">Resulting URL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-[#2a2f3a]/80 text-zinc-700 dark:text-zinc-200">
              {parser.cleanUrlBehavior.rules.map((rule, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-[#23272f]/40 transition-colors">
                  <td className="p-3.5 sm:px-4 sm:py-3 text-zinc-900 dark:text-zinc-100 font-medium">{rule.condition}</td>
                  <td className="p-3.5 sm:px-4 sm:py-3 text-zinc-600 dark:text-zinc-400 font-sans">{rule.behavior}</td>
                  <td className="p-3.5 sm:px-4 sm:py-3">
                    <span className="inline-block px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 font-mono text-xs max-w-[240px] sm:max-w-none truncate">
                      {rule.exampleUrl}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Parameters Table (if applicable) */}
      {parser.parameters && parser.parameters.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
            Configuration Parameters
          </h2>
          <div className="border border-zinc-200 dark:border-[#323846] rounded-xl overflow-hidden bg-white dark:bg-[#191b21] shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm font-mono border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-[#2a2f3a] bg-zinc-50 dark:bg-[#23272f] font-sans text-xs text-zinc-700 dark:text-zinc-200">
                  <th className="p-3.5 sm:px-4 sm:py-3 font-semibold">Parameter</th>
                  <th className="p-3.5 sm:px-4 sm:py-3 font-semibold">Type</th>
                  <th className="p-3.5 sm:px-4 sm:py-3 font-semibold">Default</th>
                  <th className="p-3.5 sm:px-4 sm:py-3 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-[#2a2f3a]/80 text-zinc-600 dark:text-zinc-300 font-sans">
                {parser.parameters.map((param, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-[#23272f]/40 transition-colors">
                    <td className="p-3.5 sm:px-4 sm:py-3 font-mono font-bold text-zinc-900 dark:text-white">
                      {param.name}
                    </td>
                    <td className="p-3.5 sm:px-4 sm:py-3">
                      <span className="px-1.5 py-0.5 rounded bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800/60 font-mono text-xs">
                        {param.type}
                      </span>
                    </td>
                    <td className="p-3.5 sm:px-4 sm:py-3">
                      <span className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 font-mono text-xs">
                        {param.defaultValue || '-'}
                      </span>
                    </td>
                    <td className="p-3.5 sm:px-4 sm:py-3 text-zinc-600 dark:text-zinc-300 text-xs sm:text-sm">
                      {param.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Related Parsers */}
      {parser.relatedParsers && parser.relatedParsers.length > 0 && (
        <section className="mb-10">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3 font-mono">
            Related API References
          </h3>
          <div className="flex flex-wrap gap-2">
            {parser.relatedParsers.map((rel) => (
              <Link
                key={rel.href}
                href={rel.href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-zinc-200 dark:border-[#323846] bg-white dark:bg-[#23272f] text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-500 transition-colors shadow-2xs"
              >
                <span>{rel.name}</span>
                <ArrowRight className="w-3 h-3 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Bottom Pagination Footer */}
      <DocsPaginationFooter customPath={`/docs/parsers/${parser.slug}`} />
    </article>
  );
}
