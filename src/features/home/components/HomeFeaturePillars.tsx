'use client';

import React from 'react';
import { Zap, ShieldCheck, Layers } from 'lucide-react';

export function HomeFeaturePillars() {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-16 bg-zinc-50 dark:bg-[#191b21] text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-[#2a2f3a] transition-colors">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-3">
          Engineered for Production Velocity
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Eliminates typing stutter, hydration desynchronization, and cluttered URLs with three core architectural pillars.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pillar 1: 0ms Input Latency */}
        <div className="p-6 rounded-xl border border-zinc-200 dark:border-[#323846] bg-white dark:bg-[#23272f] hover:border-zinc-400 dark:hover:border-zinc-400 transition-all flex flex-col justify-between shadow-xs">
          <div>
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-amber-500 dark:text-amber-400" />
            </div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              0ms Input Latency
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Controlled inputs update local React state instantaneously with zero typing lag,
              while browser URL synchronization is debounced asynchronously in the background.
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-[#323846] text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
            <span className="text-amber-500 dark:text-amber-400">&bull;</span>
            <span>debounceMs: 300 by default</span>
          </div>
        </div>

        {/* Pillar 2: Clean URL Policy */}
        <div className="p-6 rounded-xl border border-zinc-200 dark:border-[#323846] bg-white dark:bg-[#23272f] hover:border-zinc-400 dark:hover:border-zinc-400 transition-all flex flex-col justify-between shadow-xs">
          <div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            </div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Clean URL Policy
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Default values, empty strings <code className="text-zinc-800 dark:text-zinc-200 font-mono text-xs bg-zinc-100 dark:bg-[#191b21] px-1 py-0.5 rounded">&quot;&quot;</code>, and empty arrays{' '}
              <code className="text-zinc-800 dark:text-zinc-200 font-mono text-xs bg-zinc-100 dark:bg-[#191b21] px-1 py-0.5 rounded">[]</code> are automatically purged from the query string, preserving canonical SEO links.
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-[#323846] text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
            <span className="text-emerald-500 dark:text-emerald-400">&bull;</span>
            <span>Zero query string pollution</span>
          </div>
        </div>

        {/* Pillar 3: Atomic Batch Transitions */}
        <div className="p-6 rounded-xl border border-zinc-200 dark:border-[#323846] bg-white dark:bg-[#23272f] hover:border-zinc-400 dark:hover:border-zinc-400 transition-all flex flex-col justify-between shadow-xs">
          <div>
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
              <Layers className="w-5 h-5 text-blue-500 dark:text-blue-400" />
            </div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Atomic Batch Transitions
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Filter drawers and slide-overs commit updates across 10+ query parameters in a single, unified Next.js navigation transition without history bloat.
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-[#323846] text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
            <span className="text-blue-500 dark:text-blue-400">&bull;</span>
            <span>1 history entry per commit</span>
          </div>
        </div>
      </div>
    </section>
  );
}
