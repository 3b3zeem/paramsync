"use client";

import React, { useState, useMemo } from "react";
import { Check, Copy, Terminal, FileCode2, GitBranch, X } from "lucide-react";
import { highlightCode, getTokenClass } from "@/lib/syntaxHighlighter";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = "tsx",
  filename,
  className = "",
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const cleanCode = useMemo(() => code.trim(), [code]);

  // Tokenize the code into lines and syntax tokens
  const tokenizedLines = useMemo(() => {
    return highlightCode(cleanCode, language);
  }, [cleanCode, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cleanCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const isBash = ["bash", "sh", "shell", "terminal", "zsh"].includes(
    language.toLowerCase(),
  );

  // Determine display filename and tab icon
  const displayFilename =
    filename ||
    (isBash
      ? "terminal"
      : `example.${language === "typescript" ? "ts" : "tsx"}`);

  // Format language display for status bar
  const displayLanguage = isBash
    ? "Shell Script"
    : language === "tsx"
      ? "TypeScript JSX"
      : language === "typescript" || language === "ts"
        ? "TypeScript"
        : language.toUpperCase();

  return (
    <div
      className={`relative my-6 rounded-xl border border-zinc-300/80 dark:border-[#363c4a] bg-white dark:bg-[#1b1d24] shadow-md shadow-zinc-900/5 dark:shadow-none overflow-hidden font-mono text-[13px] ${className}`}
    >
      {/* VS Code Window Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-[#2d3340] bg-[#f1f5f9] dark:bg-[#16181f] px-3.5 py-2 select-none">
        {/* Left: Window Traffic Lights & Editor Tab */}
        <div className="flex items-center gap-3">
          {/* macOS / VS Code Window Traffic Lights */}
          <div className="flex items-center gap-1.5 pl-0.5 pr-2">
            <span
              className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] inline-block shadow-inner"
              title="Close"
            />
            <span
              className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] inline-block shadow-inner"
              title="Minimize"
            />
            <span
              className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] inline-block shadow-inner"
              title="Expand"
            />
          </div>

          {/* VS Code Active File Tab */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-t-md bg-white dark:bg-[#292e39] border-t-2 border-t-[#007acc] border-x border-zinc-300/80 dark:border-[#363c4a] text-xs font-sans shadow-xs">
            {isBash ? (
              <Terminal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <span className="w-4 h-4 rounded bg-[#007acc] text-white flex items-center justify-center font-bold text-[9px] tracking-tight font-mono">
                TS
              </span>
            )}
            <span className="font-mono text-[12px] font-medium text-zinc-900 dark:text-zinc-100">
              {displayFilename}
            </span>
            <span className="text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300 ml-1 cursor-pointer">
              <X className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Right: Copy Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            aria-label={copied ? "Copied code" : "Copy code to clipboard"}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-sans transition-all duration-150 border cursor-pointer ${
              copied
                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 shadow-xs"
                : "border-zinc-300 dark:border-[#363c4a] bg-white dark:bg-[#292e39] text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-[#333947]"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-medium text-[11px]">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                <span className="font-medium text-[11px]">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Body: Line Numbers + Highlighted Code */}
      <div className="flex overflow-x-auto bg-white dark:bg-[#1b1d24] py-3 text-zinc-900 dark:text-zinc-100">
        {/* Line Numbers Column */}
        {showLineNumbers && (
          <div
            aria-hidden="true"
            className="flex flex-col shrink-0 select-none text-zinc-400 dark:text-zinc-500/80 font-mono text-[12px] leading-6 text-right pr-3.5 pl-3 border-r border-zinc-200 dark:border-[#2d3340] bg-[#f8fafc] dark:bg-[#16181f]/80"
          >
            {tokenizedLines.map((_, idx) => (
              <span key={idx}>{idx + 1}</span>
            ))}
          </div>
        )}

        {/* Syntax Highlighted Code Content */}
        <div className="flex-1 min-w-0 pl-4 pr-6">
          <pre className="m-0 font-mono text-[13px] leading-6">
            <code>
              {tokenizedLines.map((lineTokens, lineIdx) => (
                <div
                  key={lineIdx}
                  className="hover:bg-blue-50/50 dark:hover:bg-zinc-800/30 px-1 -mx-1 rounded transition-colors whitespace-pre"
                >
                  {lineTokens.length === 0 ? (
                    <span>&nbsp;</span>
                  ) : (
                    lineTokens.map((token, tokenIdx) => (
                      <span
                        key={tokenIdx}
                        className={getTokenClass(token.type)}
                      >
                        {token.text}
                      </span>
                    ))
                  )}
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>

      {/* VS Code Bottom Status Bar */}
      <div className="flex items-center justify-between border-t border-zinc-200 dark:border-[#2d3340] bg-[#f8fafc] dark:bg-[#16181f] px-3.5 py-1.5 text-[11px] font-sans text-zinc-600 dark:text-zinc-400 select-none">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors">
            <GitBranch className="w-3 h-3 text-[#007acc] dark:text-blue-400" />
            <span className="font-mono text-[10px]">main</span>
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">|</span>
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
            paramsync
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
          <span>{displayLanguage}</span>
          <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">
            |
          </span>
          <span className="hidden sm:inline">UTF-8</span>
          <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">
            |
          </span>
          <span>Ln {tokenizedLines.length}, Col 1</span>
        </div>
      </div>
    </div>
  );
}
