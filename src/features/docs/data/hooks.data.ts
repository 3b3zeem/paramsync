export interface HookDocItem {
  slug: string;
  name: string;
  signature: string;
  returnType: string;
  summary: string;
  whatItDoes: string;
  bestFor: string[];
  options: {
    name: string;
    type: string;
    defaultValue?: string;
    description: string;
  }[];
  returns: {
    name: string;
    type: string;
    description: string;
  }[];
  codeExample: string;
  advancedExample?: string;
}

export const hooksData: Record<string, HookDocItem> = {
  'use-query-state': {
    slug: 'use-query-state',
    name: 'useQueryState',
    signature: 'useQueryState<T>(key: string, parser: Parser<T>, options?: UseQueryStateOptions<T>): [T, (val: T | ((prev: T) => T)) => void, () => void, boolean]',
    returnType: 'readonly [value, setValue, reset, isPending]',
    summary: 'Core reactive hook synchronizing individual URL search parameters with optimistic React state.',
    whatItDoes:
      'Provides a [value, setValue, reset, isPending] tuple similar to useState. Automatically parses URL search params on mount and populates state. Setting state updates local React state immediately for 0ms typing feedback, and debounces or throttles Next.js router transitions in the background.',
    bestFor: [
      'Search input boxes with debounce',
      'Pagination page indices (?page=2)',
      'Sorting drop-downs (?sort=price.asc)',
      'Tab navigation and facet checkboxes',
    ],
    options: [
      {
        name: 'defaultValue',
        type: 'T',
        defaultValue: 'undefined',
        description: 'Fallback value returned when the query parameter is absent from the URL or invalid.',
      },
      {
        name: 'debounceMs',
        type: 'number',
        defaultValue: '0',
        description: 'Delay in milliseconds before synchronizing to the browser URL. Controlled inputs retain 0ms local responsiveness.',
      },
      {
        name: 'history',
        type: "'replace' | 'push'",
        defaultValue: "'replace'",
        description: "Navigation mode. 'replace' avoids polluting browser history; 'push' creates a new back/forward history entry.",
      },
      {
        name: 'scroll',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Whether Next.js should scroll to the top of the viewport after updating the URL.',
      },
    ],
    returns: [
      {
        name: 'value',
        type: 'T',
        description: 'The current typed state value parsed from the URL query string.',
      },
      {
        name: 'setValue',
        type: '(valueOrUpdater: T | ((prev: T) => T)) => void',
        description: 'Function to update state. Supports direct values or functional state updaters.',
      },
      {
        name: 'reset',
        type: '() => void',
        description: 'Convenience helper to reset state back to its defaultValue and purge the param from the URL.',
      },
      {
        name: 'isPending',
        type: 'boolean',
        description: 'React useTransition flag indicating whether Next.js App Router background navigation is currently ongoing.',
      },
    ],
    codeExample: `'use client';

import { useQueryState, parseAsString } from 'paramsync';

export function SearchBox() {
  const [query, setQuery, reset, isPending] = useQueryState(
    'q',
    parseAsString.withDefault(''),
    {
      debounceMs: 300,
      history: 'replace',
      scroll: false,
    }
  );

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search documentation..."
      />
      {query && <button onClick={reset}>Clear</button>}
      {isPending && <span>Updating URL...</span>}
    </div>
  );
}`,
    advancedExample: `// Functional updates:
setQuery((prev) => prev.trim().toLowerCase());

// Resetting programmatically:
reset();`,
  },

  'use-batch-query-params': {
    slug: 'use-batch-query-params',
    name: 'useBatchQueryParams',
    signature: 'useBatchQueryParams(options?: UseBatchQueryParamsOptions): { setBatchParams, resetAllParams, isPending }',
    returnType: '{ setBatchParams, resetAllParams, isPending }',
    summary: 'Atomic multi-parameter manager committing multiple URL updates in a single Next.js navigation transition.',
    whatItDoes:
      'Solves the problem of updating multiple query parameters sequentially (which causes multiple router transitions and re-renders). Allows modifying, adding, or deleting multiple keys simultaneously in one atomic history step. Ideal for "Apply Filters" modal/drawer buttons and reset-all buttons.',
    bestFor: [
      'Filter drawers and slide-over panels with an "Apply" button',
      'Batch filter resetting (Clear All Filters)',
      'Multi-facet dashboard views',
      'Complex query presets and saved bookmarks',
    ],
    options: [
      {
        name: 'history',
        type: "'replace' | 'push'",
        defaultValue: "'replace'",
        description: "Navigation mode. 'replace' modifies current URL; 'push' pushes new entry into browser history.",
      },
      {
        name: 'scroll',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Whether to scroll to top after committing the batch update.',
      },
    ],
    returns: [
      {
        name: 'setBatchParams',
        type: '(updates: BatchParamsRecord, navOptions?: BatchNavigationOptions) => void',
        description: 'Commits multiple parameter updates at once. Passing null as a value deletes that parameter from the URL.',
      },
      {
        name: 'resetAllParams',
        type: '(preserveKeys?: string[], navOptions?: BatchNavigationOptions) => void',
        description: 'Removes all query parameters from the URL at once while preserving specific keys. Instantly resets the internal state of all active useQueryState hooks on the page and cancels pending debounce timers (0ms UI latency).',
      },
      {
        name: 'isPending',
        type: 'boolean',
        description: 'React useTransition state indicating when the atomic batch navigation is in flight.',
      },
    ],
    codeExample: `'use client';

import {
  useBatchQueryParams,
  parseAsArray,
  parseAsString,
  parseAsNumberRange,
} from 'paramsync';

export function FilterDrawer({ draftFilters, onClose }) {
  const { setBatchParams, resetAllParams, isPending } = useBatchQueryParams();

  const handleApply = () => {
    // Commit 4 updates in 1 single router transition:
    setBatchParams({
      q: draftFilters.keyword || null,
      category: {
        value: draftFilters.categories,
        parser: parseAsArray(parseAsString),
      },
      price: {
        value: draftFilters.priceRange,
        parser: parseAsNumberRange(0, 1000),
      },
      page: null, // Deletes 'page' parameter to reset to page 1
    });
    onClose();
  };

  return (
    <div>
      <button onClick={handleApply} disabled={isPending}>
        {isPending ? 'Applying...' : 'Apply All (1 Transition)'}
      </button>
      <button onClick={() => resetAllParams(['utm_source'])}>
        Reset All
      </button>
    </div>
  );
}`,
    advancedExample: `// Preserving certain keys when clearing filters:
resetAllParams(['tab', 'viewMode']);`,
  },
};

export const allHookSlugs = Object.keys(hooksData);
