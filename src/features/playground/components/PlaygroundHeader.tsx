"use client";

import React, { useState } from "react";
import {
  SlidersHorizontal,
  Layers,
  ShieldCheck,
  Copy,
  Check,
  RotateCcw,
  Share2,
} from "lucide-react";
import { motion } from "framer-motion";
import { ShareFeatureButton } from "@/components/shared/ShareFeatureButton";

interface PlaygroundHeaderProps {
  activeTab: "instant" | "batch";
  onSelectTab: (tab: "instant" | "batch") => void;
  onOpenDrawer: () => void;
  onResetAll: () => void;
  onApplyPreset: () => void;
}

export function PlaygroundHeader({
  activeTab,
  onSelectTab,
  onOpenDrawer,
  onResetAll,
  onApplyPreset,
}: PlaygroundHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {}
  };

  return (
    <div className="w-full flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pb-3 select-none">
      {/* Left Modes & Policy Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Instant Reactive Filters Tab */}
        <button
          type="button"
          onClick={() => onSelectTab("instant")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors border ${
            activeTab === "instant"
              ? "bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-medium"
              : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="font-medium">Instant Reactive Filters</span>
        </button>

        {/* Modal / Drawer Batch Commit Button */}
        <button
          type="button"
          onClick={onOpenDrawer}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors border bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700"
        >
          <Layers className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
          <span>Modal / Drawer Batch Commit</span>
        </button>

        {/* Clean URL Policy Status Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono border border-emerald-200 dark:border-emerald-950/80 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
          <span>
            Clean URL Policy:{" "}
            <strong className="font-semibold text-emerald-800 dark:text-emerald-300">
              Active
            </strong>{" "}
            <span className="text-emerald-600/80 dark:text-emerald-500/80">
              (defaults purged)
            </span>
          </span>
        </div>
      </div>

      {/* Right Action Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Copy Shareable URL */}
        <button
          type="button"
          onClick={handleCopyUrl}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                Copied!
              </span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
              <span>Copy Shareable URL</span>
            </>
          )}
        </button>

        {/* Reset Query Params */}
        <button
          type="button"
          onClick={onResetAll}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
          <span>Reset Query Params</span>
        </button>

        {/* Share Preset Button */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onApplyPreset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors shadow-sm"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Apply Preset</span>
        </motion.button>

        {/* Share Feature Button */}
        <ShareFeatureButton
          title="paramsync Interactive Playground"
          description="Live sandbox testing real-time URL state synchronization and batch navigation updates."
          url="https://paramsync.vercel.app/playground"
          category="Playground"
        />
      </div>
    </div>
  );
}
