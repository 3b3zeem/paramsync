"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Check, Copy, ExternalLink, Globe } from "lucide-react";

interface ShareFeatureButtonProps {
  title: string;
  description?: string;
  url?: string;
  category?: string;
}

export function ShareFeatureButton({
  title,
  description = "Type-Safe URL Query State Manager for Next.js",
  url,
  category = "Documentation",
}: ShareFeatureButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Compute canonical URL if not explicitly passed
  const shareUrl =
    typeof window !== "undefined"
      ? url || window.location.href
      : url || "https://paramsync.vercel.app";

  // Close on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        // Fallback for older environments
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignored
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${title} | paramsync`,
          text: description,
          url: shareUrl,
        });
        setIsOpen(false);
      } catch {
        // User cancelled share
      }
    }
  };

  const shareOnTwitter = () => {
    const text = `Check out ${title} in paramsync — Type-Safe URL Query State Manager for Next.js:\n`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(
      twitterUrl,
      "_blank",
      "noopener,noreferrer,width=550,height=420",
    );
  };

  const shareOnLinkedIn = () => {
    const text = `Check out ${title} in paramsync — Type-Safe URL Query State Manager for Next.js:\n\n${shareUrl}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).catch(() => {});
    }
    const linkedInUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`;
    window.open(
      linkedInUrl,
      "_blank",
      "noopener,noreferrer,width=650,height=600",
    );
  };

  const hasNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Share ${title}`}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer select-none ${
          isOpen
            ? "border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold shadow-xs"
            : "border-zinc-200 dark:border-[#383f4e] bg-white dark:bg-[#191b21] text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-500 hover:bg-zinc-50 dark:hover:bg-[#23272f]"
        }`}
      >
        <Share2 className="w-3.5 h-3.5" />
        <span>Share</span>
      </button>

      {/* Share Popover Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-xl border border-zinc-200 dark:border-[#323846] bg-white dark:bg-[#23272f] p-3.5 shadow-xl z-50 text-left font-sans"
          >
            {/* Header info */}
            <div className="mb-3 pb-2.5 border-b border-zinc-100 dark:border-[#323846]">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-400 uppercase tracking-wider">
                  {category}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium">
                  paramsync
                </span>
              </div>
              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1">
                {title}
              </p>
            </div>

            {/* Direct Copy Link Input */}
            <div className="flex items-center gap-1.5 p-1 rounded-lg border border-zinc-200 dark:border-[#383f4e] bg-zinc-50 dark:bg-[#191b21] mb-2.5">
              <input
                type="text"
                readOnly
                value={shareUrl}
                aria-label="Feature URL"
                className="flex-1 bg-transparent border-0 px-2 text-[11px] font-mono text-zinc-600 dark:text-zinc-400 truncate outline-none select-all"
              />
              <button
                type="button"
                onClick={handleCopy}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium transition-colors cursor-pointer shrink-0 ${
                  copied
                    ? "bg-emerald-600 text-white"
                    : "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Share Action Buttons */}
            <div className="space-y-1">
              {/* Share to X (Twitter) */}
              <button
                type="button"
                onClick={shareOnTwitter}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[#191b21] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>Share on X / Twitter</span>
                </div>
                <ExternalLink className="w-3 h-3 text-zinc-400" />
              </button>

              {/* Share to LinkedIn */}
              <button
                type="button"
                onClick={shareOnLinkedIn}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[#191b21] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="w-3.5 h-3.5 fill-current text-blue-600 dark:text-blue-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span>Share on LinkedIn</span>
                </div>
                <ExternalLink className="w-3 h-3 text-zinc-400" />
              </button>

              {/* Native Device Share (when supported) */}
              {hasNativeShare && (
                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[#191b21] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-emerald-500" />
                    <span>More share options...</span>
                  </div>
                  <Share2 className="w-3 h-3 text-zinc-400" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
