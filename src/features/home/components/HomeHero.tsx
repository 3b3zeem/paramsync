"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Copy, Download, Star } from "lucide-react";
import { PackageManager } from "../types/home.types";
import { Logo } from "@/components/shared/Logo";
import { usePackageStats } from "@/hooks/usePackageStats";

const INSTALL_COMMANDS: Record<PackageManager, string> = {
  npm: "npm install paramsync",
  pnpm: "pnpm add paramsync",
  yarn: "yarn add paramsync",
  bun: "bun add paramsync",
};

export function HomeHero() {
  const { version, downloads, stars } = usePackageStats();
  const [pm, setPm] = useState<PackageManager>("npm");
  const [copied, setCopied] = useState(false);

  const currentCommand = INSTALL_COMMANDS[pm];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-19 flex flex-col justify-center items-center bg-white dark:bg-[#23272f] border-b border-zinc-200 dark:border-[#323846] transition-colors">
      <div className="flex items-center gap-2 group focus:outline-none shrink-0">
        <Logo className="w-32 h-32 mx-auto" />
      </div>
      <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white max-w-4xl mx-auto leading-[1.15] text-center">
        Type-Safe URL Query State Manager for React & Next.js
      </h1>

      <p className="mt-6 text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
        Zero typing lag, automated Clean URL parameter purging, race condition protection, and router-agnostic support across Vite, React Router, Remix, and Next.js App Router.
      </p>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/playground"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-medium text-sm hover:opacity-90 transition-opacity shadow-xs"
        >
          <span>Interactive Playground</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href="/docs/parsers/parse-as-string"
          className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-zinc-300 dark:border-[#383f4e] bg-white dark:bg-[#191b21] text-zinc-700 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-[#2a303d] font-medium text-sm transition-colors shadow-2xs"
        >
          Read Documentation
        </Link>
      </div>

      {/* Subtle Install Command Card */}
      <div className="mt-7 max-w-md mx-auto rounded-lg border border-zinc-200 dark:border-[#383f4e] bg-zinc-50/90 dark:bg-[#191b21] p-1.5 shadow-xs">
        <div className="flex items-center justify-between gap-2 px-1 pb-1.5 border-b border-zinc-200 dark:border-[#2a2f3a]">
          {/* Package Manager Switcher Tabs */}
          <div className="flex items-center gap-1">
            {(["npm", "pnpm", "yarn", "bun"] as PackageManager[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setPm(tab)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                  pm === tab
                    ? "bg-white dark:bg-[#23272f] text-zinc-900 dark:text-white border border-zinc-200 dark:border-[#383f4e] font-medium shadow-2xs"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <span suppressHydrationWarning className="text-[10px] font-mono text-zinc-400 dark:text-zinc-400 uppercase tracking-wider pr-1">
            v{version}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 px-2.5 py-1.5 font-mono text-xs">
          <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-200 min-w-0">
            <span className="text-zinc-400 select-none">$</span>
            <span className="truncate">{currentCommand}</span>
          </div>

          <button
            onClick={handleCopy}
            title="Copy installation command"
            className="flex items-center gap-1 px-2 py-0.5 rounded text-xs font-sans text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-[#23272f] transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500 text-[11px]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="text-[11px]">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Package Metrics */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400">
        <a
          href="https://www.npmjs.com/package/paramsync"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span suppressHydrationWarning>{downloads.toLocaleString()} monthly downloads</span>
        </a>
        <span className="text-zinc-300 dark:text-zinc-700 select-none hidden sm:inline">•</span>
        <a
          href="https://github.com/3b3zeem/paramsync-lib"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
        >
          <Star className="w-3.5 h-3.5" />
          <span suppressHydrationWarning>{stars.toLocaleString()} GitHub stars</span>
        </a>
      </div>
    </section>
  );
}
