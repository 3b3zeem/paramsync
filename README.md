# paramsync

<p align="center">
  <strong>Type-Safe URL Query State Manager for Next.js and React</strong>
</p>

<p align="center">
  Zero typing latency, automated Clean URL parameter purging, and atomic batch transitions engineered specifically for React 18+ and Next.js App Router applications.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/paramsync"><img src="https://img.shields.io/npm/v/paramsync.svg?style=flat&color=2563eb" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/paramsync"><img src="https://img.shields.io/npm/dm/paramsync.svg?style=flat&color=3b82f6" alt="npm downloads" /></a>
  <a href="https://github.com/3b3zeem/paramsync-lib"><img src="https://img.shields.io/github/license/3b3zeem/paramsync-lib?style=flat&color=10b981" alt="license" /></a>
  <img src="https://img.shields.io/badge/TypeScript-5+-3178c6.svg?style=flat" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Next.js-14%20%7C%2015-black.svg?style=flat" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-18%20%7C%2019-61dafb.svg?style=flat" alt="React" />
</p>

---

## Why paramsync?

Standard Next.js `useSearchParams()` is read-only and requires manual, error-prone string concatenation, router transitions, and type casting. `paramsync` provides a reactive, `useState`-like hook that seamlessly binds state directly to URL search parameters:

- ⚡ **0ms Typing Latency:** Controlled inputs respond instantly without keyboard stutter while Next.js router transitions are smoothly debounced in the background.
- 🧹 **Clean URL Policy:** Default values, empty strings (`""`), and empty arrays (`[]`) are automatically purged from the query string to maintain canonical, SEO-friendly URLs.
- 📦 **Atomic Batch Transitions:** Commit multi-filter drawers across 10+ query parameters in a single unified Next.js navigation transition without browser history bloat.
- 🛡️ **Strict Runtime Validation:** Type-safe parsers enforce runtime validation and type narrowing for strings, integers, floats, booleans, arrays, numeric ranges, and sort models.
- 🌐 **RSC & Server-Side Compatible:** Parsers have zero DOM dependencies and can be imported directly in React Server Components, Route Handlers, and Middleware.

---

## Installation

Install `paramsync` via your preferred package manager:

```bash
# npm
npm install paramsync

# pnpm
pnpm add paramsync

# yarn
yarn add paramsync

# bun
bun add paramsync
```

---

## Quick Start

Pair `useQueryState` with built-in parsers to bind state directly to URL search params:

```tsx
"use client";

import { useQueryState, parseAsString, parseAsInteger } from "paramsync";

export default function SearchFeed() {
  // 1. Debounced live search with 0ms typing feedback
  const [search, setSearch] = useQueryState(
    "q",
    parseAsString.withDefault(""),
    {
      debounceMs: 300,
      history: "replace",
    },
  );

  // 2. Numeric page index (purged from URL when equal to default 1)
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setPage(1); // Auto-reset page on search
          setSearch(e.target.value);
        }}
        placeholder="Filter results..."
      />

      <div className="flex gap-2">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
}
```

> [!NOTE]
> Client components reading URL search parameters in Next.js App Router should be wrapped in a `<Suspense>` boundary to maintain static optimization and prevent client-side de-optimizations.

---

## Built-in Parsers Reference

Each parser enforces strict runtime validation, TypeScript type narrowing, and Clean URL policy purging:

| Parser                               | Return Type          | URL Format        | Clean URL Behavior                      |
| :----------------------------------- | :------------------- | :---------------- | :-------------------------------------- |
| `parseAsString`                      | `string`             | `?q=query`        | Purges `""` and default value           |
| `parseAsInteger`                     | `number`             | `?page=2`         | Discards `NaN` & floats; purges default |
| `parseAsFloat`                       | `number`             | `?lat=37.77`      | Discards non-numeric strings            |
| `parseAsBoolean`                     | `boolean`            | `?inStock=true`   | Maps `"true"`/`"1"` and `"false"`/`"0"` |
| `parseAsArray(parser)`               | `T[]`                | `?cat=books,tech` | Purges empty arrays `[]`                |
| `parseAsNumberRange(min, max)`       | `{ min, max }`       | `?price=100-500`  | Validates bounds and delimiter          |
| `parseAsSort(keys, dir)`             | `{ key, direction }` | `?sort=date.desc` | Enforces whitelist of sort keys         |
| `createParser({ parse, serialize })` | `T`                  | Custom            | Fully customizable parser schema        |

### Parser Builder Methods

All built-in parsers include helper methods for customization:

```ts
// Set fallback default value
const pageParser = parseAsInteger.withDefault(1);

// Custom options per parser
const searchParser = parseAsString.withDefault("").withOptions({
  debounceMs: 400,
  history: "replace",
  shallow: true,
});
```

---

## Atomic Batch Transitions (`useBatchQueryParams`)

When building filter drawers, slide-overs, or search dialogs, you often need to stage multiple parameter updates and commit them in a single router transition:

```tsx
"use client";

import { useBatchQueryParams, parseAsString, parseAsArray } from "paramsync";

export function FilterDrawer({ onClose }: { onClose: () => void }) {
  const { setQueryParams } = useBatchQueryParams();

  const handleApply = (filters: { category: string[]; query: string }) => {
    // Commit all updates simultaneously in 1 Next.js router transition
    setQueryParams({
      category: {
        value: filters.category,
        parser: parseAsArray(parseAsString),
      },
      q: { value: filters.query, parser: parseAsString },
      page: 1, // Reset pagination
    });
    onClose();
  };

  return (
    <button
      onClick={() => handleApply({ category: ["shoes"], query: "running" })}
    >
      Apply
    </button>
  );
}
```

---

## React Server Components (RSC) Usage

All parsers are pure JavaScript functions with zero DOM dependencies. You can import them directly in Server Components or Route Handlers to validate and parse `searchParams`:

```tsx
// app/catalog/page.tsx (Server Component)
import { parseAsString, parseAsInteger } from "paramsync";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  // Safe server-side validation with fallbacks
  const search = parseAsString.withDefault("").parseServer(params.q);
  const page = parseAsInteger.withDefault(1).parseServer(params.page);

  const products = await db.products.findMany({
    where: { name: { contains: search } },
    skip: (page - 1) * 20,
    take: 20,
  });

  return <ProductGrid items={products} />;
}
```

---

## Comparison: paramsync vs Vanilla Next.js

| Feature               | Vanilla Next.js (`useSearchParams`)       | paramsync                                        |
| :-------------------- | :---------------------------------------- | :----------------------------------------------- |
| **Typing Latency**    | Re-renders and stutters on keystrokes     | **0ms instantaneous local feedback**             |
| **Debouncing**        | Manual `setTimeout` + cleanup boilerplate | **Built-in `{ debounceMs: 300 }`**               |
| **Type Safety**       | Raw `string \| null`                      | **Strict TypeScript type narrowing**             |
| **URL Cleanliness**   | Leaves `?q=&filter=&page=1`               | **Auto-purges defaults and empty values**        |
| **Batch Transitions** | 5 updates = 5 router navigation events    | **Atomic 1-step commit (`useBatchQueryParams`)** |
| **Server Components** | Manual URL parsing and string casting     | **Pure parser functions for RSC**                |

---

## Documentation & Live Sandbox

Explore interactive demonstrations, production recipes, and complete parser specifications on the official documentation platform:

- **Documentation:** [https://paramsync.vercel.app/docs](https://paramsync.vercel.app/docs)
- **Interactive Playground:** [https://paramsync.vercel.app/playground](https://paramsync.vercel.app/playground)
- **Use Cases & Recipes:** [https://paramsync.vercel.app/use-cases](https://paramsync.vercel.app/use-cases)

---

## Running the Website Locally

To run this documentation and sandbox platform locally:

```bash
git clone https://github.com/3b3zeem/paramsync.git
cd paramsync-website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Contributing

Contributions, bug reports, and feature requests are welcome! Feel free to check the [issues page](https://github.com/3b3zeem/paramsync/issues).

---

## License

Distributed under the **MIT License**. See `LICENSE` for more information.
