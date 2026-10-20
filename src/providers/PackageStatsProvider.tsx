"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { PackageStats } from "@/types/stats.types";

const DEFAULT_STATS: PackageStats = {
  version: "1.0.6",
  downloads: 918,
  stars: 0,
  loading: false,
};

const PackageStatsContext = createContext<PackageStats>(DEFAULT_STATS);

export function PackageStatsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [stats, setStats] = useState<PackageStats>(DEFAULT_STATS);

  useEffect(() => {
    let isMounted = true;

    async function loadStats() {
      try {
        const res = await fetch("/api/package-stats");
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && data) {
          setStats({
            version: data.version || DEFAULT_STATS.version,
            downloads:
              typeof data.downloads === "number"
                ? data.downloads
                : DEFAULT_STATS.downloads,
            stars:
              typeof data.stars === "number" ? data.stars : DEFAULT_STATS.stars,
            loading: false,
          });
        }
      } catch {
        // Silently use defaults on network failure
      }
    }

    loadStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PackageStatsContext.Provider value={stats}>
      {children}
    </PackageStatsContext.Provider>
  );
}

export function usePackageStats(): PackageStats {
  return useContext(PackageStatsContext);
}
