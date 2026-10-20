import { NextResponse } from "next/server";

export const revalidate = 3600;

const FALLBACK_STATS = {
  version: "1.0.6",
  downloads: 918,
  stars: 0,
};

async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs = 3500,
) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return res;
  } finally {
    clearTimeout(id);
  }
}

export async function GET() {
  try {
    const [npmLatestRes, npmDownloadsRes, githubRes] = await Promise.allSettled(
      [
        fetchWithTimeout("https://registry.npmjs.org/paramsync/latest", {
          next: { revalidate: 3600 },
          headers: { Accept: "application/json" },
        }).then((r) => (r.ok ? r.json() : null)),

        fetchWithTimeout(
          "https://api.npmjs.org/downloads/point/last-month/paramsync",
          {
            next: { revalidate: 3600 },
            headers: { Accept: "application/json" },
          },
        ).then((r) => (r.ok ? r.json() : null)),

        fetchWithTimeout("https://api.github.com/repos/3b3zeem/paramsync-lib", {
          headers: {
            Accept: "application/vnd.github.v3+json",
            "User-Agent": "paramsync-website",
          },
          next: { revalidate: 3600 },
        }).then((r) => (r.ok ? r.json() : null)),
      ],
    );

    const version =
      npmLatestRes.status === "fulfilled" && npmLatestRes.value?.version
        ? String(npmLatestRes.value.version)
        : FALLBACK_STATS.version;

    const downloads =
      npmDownloadsRes.status === "fulfilled" &&
      typeof npmDownloadsRes.value?.downloads === "number"
        ? npmDownloadsRes.value.downloads
        : FALLBACK_STATS.downloads;

    const stars =
      githubRes.status === "fulfilled" &&
      typeof githubRes.value?.stargazers_count === "number"
        ? githubRes.value.stargazers_count
        : FALLBACK_STATS.stars;

    return NextResponse.json(
      { version, downloads, stars },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch {
    return NextResponse.json(FALLBACK_STATS);
  }
}
