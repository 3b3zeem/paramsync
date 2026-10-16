'use client';

import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { HookDocItem } from '../data/hooks.data';
import { DocsPaginationFooter } from '../components/DocsPaginationFooter';
import { CodeBlock } from '@/components/shared/CodeBlock';
import { ShareFeatureButton } from '@/components/shared/ShareFeatureButton';
import { highlightCode, getTokenClass } from '@/lib/syntaxHighlighter';

interface HookDetailDocViewProps {
  hook: HookDocItem;
}

export function HookDetailDocView({ hook }: HookDetailDocViewProps) {
  return (
    <article className="w-full py-6 sm:py-10 px-2 sm:px-4 md:px-6 lg:px-8">
      {/* Title & Signature Header */}
      <header className="border-b border-zinc-200 dark:border-[#323846] pb-8 mb-8">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-zinc-100 dark:bg-[#191b21] border border-zinc-200 dark:border-[#383f4e] text-zinc-700 dark:text-zinc-300">
              Hook
            </span>
            <span className="text-xs text-zinc-500 font-mono">
              paramsync &gt; hooks
            </span>
          </div>

          <ShareFeatureButton
            title={hook.name}
            description={hook.summary}
            url={`https://paramsync.dev/docs/hooks/${hook.slug}`}
            category="Hook Reference"
          />
        </div>

        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {hook.name}
        </h1>

        <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {hook.summary}
        </p>

        {/* Signature Box - VS Code IntelliSense Style */}
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
                {highlightCode(hook.signature, 'typescript').map((line, lIdx) => (
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

      {/* What it does */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
          What it does
        </h2>
        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm sm:text-base">
          {hook.whatItDoes}
        </p>
      </section>

      {/* Best For */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
          Best For
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {hook.bestFor.map((item, idx) => (
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

      {/* Options Table */}
      {hook.options.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
            Configuration Options
          </h2>
          <div className="border border-zinc-200 dark:border-[#323846] rounded-xl overflow-hidden bg-white dark:bg-[#191b21] shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm font-mono border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-[#2a2f3a] bg-zinc-50 dark:bg-[#23272f] font-sans text-xs text-zinc-700 dark:text-zinc-200">
                  <th className="p-3.5 sm:px-4 sm:py-3 font-semibold">Option</th>
                  <th className="p-3.5 sm:px-4 sm:py-3 font-semibold">Type</th>
                  <th className="p-3.5 sm:px-4 sm:py-3 font-semibold">Default</th>
                  <th className="p-3.5 sm:px-4 sm:py-3 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-[#2a2f3a]/80 text-zinc-600 dark:text-zinc-300 font-sans">
                {hook.options.map((opt, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-[#23272f]/40 transition-colors">
                    <td className="p-3.5 sm:px-4 sm:py-3 font-mono font-bold text-zinc-900 dark:text-white">
                      {opt.name}
                    </td>
                    <td className="p-3.5 sm:px-4 sm:py-3">
                      <span className="px-1.5 py-0.5 rounded bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800/60 font-mono text-xs">
                        {opt.type}
                      </span>
                    </td>
                    <td className="p-3.5 sm:px-4 sm:py-3">
                      <span className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 font-mono text-xs">
                        {opt.defaultValue || '-'}
                      </span>
                    </td>
                    <td className="p-3.5 sm:px-4 sm:py-3 text-zinc-600 dark:text-zinc-300 text-xs sm:text-sm">
                      {opt.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Return Values Table */}
      {hook.returns.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
            Return Values
          </h2>
          <div className="border border-zinc-200 dark:border-[#323846] rounded-xl overflow-hidden bg-white dark:bg-[#191b21] shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm font-mono border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-[#2a2f3a] bg-zinc-50 dark:bg-[#23272f] font-sans text-xs text-zinc-700 dark:text-zinc-200">
                  <th className="p-3.5 sm:px-4 sm:py-3 font-semibold">Return Value</th>
                  <th className="p-3.5 sm:px-4 sm:py-3 font-semibold">Type</th>
                  <th className="p-3.5 sm:px-4 sm:py-3 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-[#2a2f3a]/80 text-zinc-600 dark:text-zinc-300 font-sans">
                {hook.returns.map((ret, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-[#23272f]/40 transition-colors">
                    <td className="p-3.5 sm:px-4 sm:py-3 font-mono font-bold text-blue-600 dark:text-blue-300">
                      {ret.name}
                    </td>
                    <td className="p-3.5 sm:px-4 sm:py-3">
                      <span className="px-1.5 py-0.5 rounded bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800/60 font-mono text-xs">
                        {ret.type}
                      </span>
                    </td>
                    <td className="p-3.5 sm:px-4 sm:py-3 text-zinc-600 dark:text-zinc-300 text-xs sm:text-sm">
                      {ret.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Code Example */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
          Usage Example
        </h2>
        <CodeBlock code={hook.codeExample} language="tsx" filename={`${hook.name}Example.tsx`} />

        {hook.advancedExample && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2 font-mono">
              Advanced Techniques
            </h3>
            <CodeBlock code={hook.advancedExample} language="tsx" />
          </div>
        )}
      </section>

      {/* Bottom Pagination */}
      <DocsPaginationFooter customPath={`/docs/hooks/${hook.slug}`} />
    </article>
  );
}
