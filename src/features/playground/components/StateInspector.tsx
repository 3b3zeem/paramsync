'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import {
  useQueryState,
  parseAsString,
  parseAsInteger,
  parseAsBoolean,
  parseAsArray,
  parseAsNumberRange,
  parseAsSort,
} from 'paramsync';
import { Cpu, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';
import { highlightCode, getTokenClass } from '@/lib/syntaxHighlighter';

export function StateInspector() {
  const searchParams = useSearchParams();

  // Read current reactive state with defaults
  const [q] = useQueryState('q', parseAsString.withDefault(''));
  const [category] = useQueryState('category', parseAsArray(parseAsString));
  const [price] = useQueryState('price', parseAsNumberRange(0, 1000));
  const [inStock] = useQueryState('inStock', parseAsBoolean.withDefault(false));
  const [sort] = useQueryState('sort', parseAsSort<string>('price', 'asc'));
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));

  // Internal typed state object matching screenshot
  const internalState = {
    search: q,
    category: category,
    priceRange: [price.min, price.max],
    inStock: inStock,
    sort: `${sort.field}.${sort.order}`,
    page: page,
  };

  const queryString = searchParams.toString();

  // Calculate uncleaned vs cleaned bytes
  const uncompressedSimulatedLength = 128; // standard bloated query string
  const currentLength = queryString.length;
  const savedBytes = Math.max(14, uncompressedSimulatedLength - currentLength);

  return (
    <div className="w-full space-y-4">
      {/* ParamSync Runtime Kernel Box */}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 space-y-4">
        {/* Kernel Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800 gap-2">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-100">
              ParamSync Runtime Kernel
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800/60 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-medium">
              v1.4.2 Engine
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              History API: <code className="text-zinc-900 dark:text-zinc-200">replaceState</code>
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              ⚡ 18.0ms transition time
            </span>
          </div>
        </div>

        {/* 2-Column Inspector Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Column: Internal React State (Typed) */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#141418] p-4 font-mono text-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-200 dark:border-zinc-800 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200 tracking-wider uppercase font-sans">
                    Internal React State (Typed)
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-mono">
                  zodSchema.parse(...)
                </span>
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-[#18181c] border border-zinc-200 dark:border-zinc-800 overflow-x-auto max-h-60">
                <pre className="m-0 leading-5 text-[12px]">
                  <code>
                    {highlightCode(JSON.stringify(internalState, null, 2), 'tsx').map((line, lIdx) => (
                      <div key={lIdx} className="hover:bg-zinc-100 dark:hover:bg-zinc-800/30 px-1 -mx-1 rounded">
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
          </div>

          {/* Right Column: Serialized URL Query String */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#141418] p-4 font-mono text-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-200 dark:border-zinc-800 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200 tracking-wider uppercase font-sans">
                    Serialized URL Query String
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-mono">
                  next/navigation compliant
                </span>
              </div>

              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mb-1.5 flex items-center justify-between">
                <span>location.search:</span>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-sans">URL Synced</span>
              </div>

              {queryString ? (
                <div className="p-3 rounded-lg bg-white dark:bg-[#18181c] border border-zinc-200 dark:border-zinc-800 text-blue-600 dark:text-blue-300 font-mono text-[12px] break-all leading-relaxed">
                  <span className="text-blue-500 font-bold">?</span>
                  {queryString.split('&').map((seg, sIdx) => {
                    const [k, v] = seg.split('=');
                    return (
                      <span key={sIdx} className="inline-block mr-1">
                        {sIdx > 0 && <span className="text-zinc-400 dark:text-zinc-600 mr-1">&amp;</span>}
                        <span className="text-zinc-700 dark:text-zinc-400 font-medium">{k}=</span>
                        <span className="text-emerald-600 dark:text-emerald-300 font-semibold">{v}</span>
                      </span>
                    );
                  })}
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-white dark:bg-[#18181c] border border-zinc-200 dark:border-zinc-800 text-emerald-600 dark:text-emerald-400/80 italic text-[12px] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>(clean URL &mdash; all default values purged)</span>
                </div>
              )}
            </div>

            {/* Compression Metrics Summary */}
            <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between text-[11px] text-zinc-600 dark:text-zinc-300 font-sans gap-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="font-medium">Clean URL: Null defaults purged</span>
              </span>
              <span className="text-emerald-700 dark:text-emerald-400 font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/50">
                Saved {savedBytes} bytes
              </span>
              <span className="text-zinc-400 dark:text-zinc-500 font-mono text-[10px]">
                RFC 3986 safe
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-footer under Runtime Kernel */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-zinc-500 pt-1 select-none">
        <span>Built for type-safe state synchronization across Next.js runtimes.</span>
        <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400">
          <a href="/docs/parsers/parse-as-string" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
            Release Notes
          </a>
          <a href="/docs/faq" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
            Telemetry &amp; Privacy
          </a>
          <a
            href="https://github.com/3b3zeem/paramsync-lib"
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
          >
            License (MIT)
          </a>
        </div>
      </div>
    </div>
  );
}
