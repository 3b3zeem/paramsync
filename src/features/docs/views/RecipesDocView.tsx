'use client';

import React from 'react';
import { DocsPaginationFooter } from '../components/DocsPaginationFooter';
import { CodeBlock } from '@/components/shared/CodeBlock';
import { ShareFeatureButton } from '@/components/shared/ShareFeatureButton';
import { Database, Server, Smartphone } from 'lucide-react';

export function RecipesDocView() {
  return (
    <article className="w-full py-6 sm:py-10 px-2 sm:px-4 md:px-6 lg:px-8">
      <header className="border-b border-zinc-200 dark:border-[#323846] pb-8 mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
            <span>paramsync</span>
            <span>&gt;</span>
            <span className="text-zinc-700 dark:text-zinc-300">recipes</span>
          </div>

          <ShareFeatureButton
            title="Integration Recipes"
            description="Production recipes for TanStack Query, RSC, and URL modals."
            url="https://paramsync.dev/docs/recipes"
            category="Recipes"
          />
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Integration Recipes
        </h1>
        <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
          Common architectural recipes: TanStack Query, React Server Components (RSC), and URL-driven modals.
        </p>
      </header>

      {/* Recipe 1: TanStack Query (React Query) */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-2 text-zinc-900 dark:text-zinc-100 font-semibold text-lg">
          <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2>TanStack Query Synchronization</h2>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 leading-relaxed">
          Pass reactive query state directly into queryKey arrays. React Query automatically refetches data whenever the URL changes:
        </p>
        <CodeBlock
          code={`'use client';

import { useQuery } from '@tanstack/react-query';
import { useQueryState, parseAsString, parseAsInteger } from 'paramsync';

export function ProductFeed() {
  const [search] = useQueryState('q', parseAsString.withDefault(''), { debounceMs: 300 });
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));

  const { data, isLoading } = useQuery({
    queryKey: ['products', search, page],
    queryFn: () => fetchProducts({ search, page }),
  });

  if (isLoading) return <div>Loading products...</div>;
  return <div>{/* Render items */}</div>;
}`}
          language="tsx"
          filename="ProductFeed.tsx"
        />
      </section>

      {/* Recipe 2: RSC Data Fetching */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-2 text-zinc-900 dark:text-zinc-100 font-semibold text-lg">
          <Server className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2>Server Component (RSC) Direct Parser Usage</h2>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 leading-relaxed">
          Because parsers have zero DOM dependencies, you can import and run them directly in server components and Route Handlers:
        </p>
        <CodeBlock
          code={`// app/products/page.tsx (Server Component)
import { parseAsString, parseAsInteger } from 'paramsync';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const rawParams = await searchParams;

  // Validate and parse server-side:
  const search = parseAsString.parse((rawParams.q as string) ?? null) ?? '';
  const page = parseAsInteger.parse((rawParams.page as string) ?? null) ?? 1;

  const products = await db.product.findMany({
    where: { name: { contains: search } },
    skip: (page - 1) * 20,
    take: 20,
  });

  return <ProductGrid products={products} />;
}`}
          language="tsx"
          filename="app/products/page.tsx"
        />
      </section>

      {/* Recipe 3: Modal Routing */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-2 text-zinc-900 dark:text-zinc-100 font-semibold text-lg">
          <Smartphone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h2>URL-Driven Shareable Modals</h2>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 leading-relaxed">
          Control modal visibility and active item selection via query parameters so users can share links directly to open dialogs:
        </p>
        <CodeBlock
          code={`'use client';

import { useQueryState, parseAsString } from 'paramsync';

export function UserTable() {
  const [selectedUserId, setSelectedUserId] = useQueryState('editUser', parseAsString);

  return (
    <>
      <button onClick={() => setSelectedUserId('usr_102')}>Edit User #102</button>

      {selectedUserId && (
        <EditUserModal
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)} // Closes and cleans URL
        />
      )}
    </>
  );
}`}
          language="tsx"
          filename="UserTable.tsx"
        />
      </section>

      <DocsPaginationFooter customPath="/docs/recipes" />
    </article>
  );
}
