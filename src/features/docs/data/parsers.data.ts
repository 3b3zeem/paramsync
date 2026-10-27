import { ParserDocItem } from '../types/doc-parser.types';

export const parsersData: Record<string, ParserDocItem> = {
  'parse-as-string-literal': {
    slug: 'parse-as-string-literal',
    name: 'parseAsStringLiteral',
    signature: 'parseAsStringLiteral<T extends string>(allowedValues: readonly T[] | T[]): Parser<T | null>',
    returnType: 'T | null (or T with .withDefault())',
    summary: 'Type-safe parser for string literal unions. Guarantees 100% TypeScript type safety without manual type casting.',
    whatItDoes:
      'Constrains query parameters to a fixed list of allowed literal values (e.g. [\'all\', \'pending\', \'accepted\', \'rejected\']). If a user alters the URL parameter to an unrecognized value, it automatically falls back to your specified default value, protecting your UI components from invalid states.',
    bestFor: [
      'Filter status selectors and tab switches',
      'Entity approval states (pending, approved, rejected)',
      'Display modes (grid, list, kanban)',
      'Enum-like URL parameters requiring strict TypeScript union types',
    ],
    cleanUrlBehavior: {
      rule: 'Omitted when matching default value or invalid',
      description: 'Omits the parameter when it matches the default option or contains an illegal string.',
      rules: [
        {
          condition: 'value === defaultValue',
          behavior: 'Key removed from URL',
          exampleUrl: 'https://example.com/orders (clean)',
        },
        {
          condition: 'value is not in allowedValues (e.g. ?status=hacked)',
          behavior: 'Automatically falls back to defaultValue and purges invalid key',
          exampleUrl: 'https://example.com/orders (clean)',
        },
        {
          condition: 'value === "pending"',
          behavior: 'Serialized as query param',
          exampleUrl: 'https://example.com/orders?status=pending',
        },
      ],
    },
    parameters: [
      {
        name: 'allowedValues',
        type: 'readonly T[] | T[]',
        required: true,
        description: 'Array or tuple of permitted string literal values. Use as const for strict inference.',
      },
    ],
    codeExample: [
      "'use client';",
      "",
      "import { useQueryState, parseAsStringLiteral } from 'paramsync';",
      "",
      "type OrderStatus = 'all' | 'pending' | 'shipped' | 'delivered';",
      "",
      "export function OrderStatusFilter() {",
      "  // Infer type: 'all' | 'pending' | 'shipped' | 'delivered' without type casting!",
      "  const [status, setStatus] = useQueryState(",
      "    'status',",
      "    parseAsStringLiteral(['all', 'pending', 'shipped', 'delivered'] as const).withDefault('all')",
      "  );",
      "",
      "  return (",
      "    <select value={status} onChange={(e) => setStatus(e.target.value as OrderStatus)}>",
      "      <option value=\"all\">All Orders</option>",
      "      <option value=\"pending\">Pending</option>",
      "      <option value=\"shipped\">Shipped</option>",
      "      <option value=\"delivered\">Delivered</option>",
      "    </select>",
      "  );",
      "}"
    ].join('\n'),
    advancedExample: [
      "// Arabic literals supported natively!",
      "const roles = ['مدير', 'مشرف', 'مستخدم'] as const;",
      "const [role, setRole] = useQueryState('role', parseAsStringLiteral(roles).withDefault('مستخدم'));"
    ].join('\n'),
    relatedParsers: [
      { name: 'parseAsString', href: '/docs/parsers/parse-as-string' },
      { name: 'useQueryState', href: '/docs/hooks/use-query-state' },
    ],
  },

  'parse-as-iso-date': {
    slug: 'parse-as-iso-date',
    name: 'parseAsIsoDate',
    signature: 'parseAsIsoDate: Parser<Date | null>',
    returnType: 'Date | null (or Date with .withDefault())',
    summary: 'Calendar date parser converting between Date objects and YYYY-MM-DD query strings with strict validation.',
    whatItDoes:
      'Converts JavaScript Date objects to clean YYYY-MM-DD query parameters and parses them back into valid Date objects. Features strict validation against non-existent dates (e.g. Feb 31), months out of bounds (1-12), and leap years. Automatically implements deep millisecond equality under the Clean URL Policy.',
    bestFor: [
      'Date range filter pickers (from/to dates)',
      'Calendar day viewers and daily logs',
      'Booking and reservation filters',
      'Financial statement date selectors',
    ],
    cleanUrlBehavior: {
      rule: 'Omitted when matching default Date or invalid',
      description: 'Omits the parameter when the selected date matches the default date timestamp.',
      rules: [
        {
          condition: 'date.getTime() === defaultDate.getTime()',
          behavior: 'Key removed from URL',
          exampleUrl: 'https://example.com/trips (clean)',
        },
        {
          condition: 'invalid date string (e.g. 2026-02-31)',
          behavior: 'Reverts to default date and omits invalid key',
          exampleUrl: 'https://example.com/trips (clean)',
        },
        {
          condition: 'date === 2026-10-27',
          behavior: 'Serialized as YYYY-MM-DD',
          exampleUrl: 'https://example.com/trips?date_from=2026-10-27',
        },
      ],
    },
    parameters: [
      {
        name: 'defaultValue',
        type: 'Date',
        required: false,
        description: 'Optional default Date object passed to .withDefault(fallbackDate).',
      },
    ],
    codeExample: [
      "'use client';",
      "",
      "import { useQueryState, parseAsIsoDate } from 'paramsync';",
      "",
      "export function DateFilter() {",
      "  const [dateFrom, setDateFrom] = useQueryState(",
      "    'date_from',",
      "    parseAsIsoDate.withDefault(new Date(2026, 0, 1))",
      "  );",
      "",
      "  return (",
      "    <input",
      "      type=\"date\"",
      "      value={dateFrom ? parseAsIsoDate.serialize(dateFrom) : ''}",
      "      onChange={(e) => setDateFrom(e.target.value ? new Date(e.target.value) : null)}",
      "    />",
      "  );",
      "}"
    ].join('\n'),
    advancedExample: [
      "// Batch date ranges with useBatchQueryParams",
      "const { setBatchParams } = useBatchQueryParams();",
      "setBatchParams({",
      "  from: { value: new Date(2026, 9, 1), parser: parseAsIsoDate },",
      "  to: { value: new Date(2026, 9, 31), parser: parseAsIsoDate },",
      "});"
    ].join('\n'),
    relatedParsers: [
      { name: 'parseAsString', href: '/docs/parsers/parse-as-string' },
      { name: 'parseAsNumberRange', href: '/docs/parsers/parse-as-number-range' },
    ],
  },

  'parse-as-json': {
    slug: 'parse-as-json',
    name: 'parseAsJson',
    signature: 'parseAsJson<T>(validator?: (data: unknown) => boolean): Parser<T | null>',
    returnType: 'T | null (or T with .withDefault())',
    summary: 'Structured object parser serializing and deserializing JSON with safe URL decoding and error guards.',
    whatItDoes:
      'Serializes complex objects using JSON.stringify and parses them using JSON.parse. Features safe URI decoding so malformed percent characters or syntax errors never throw URIError or crash your application. Supports an optional runtime validator function to ensure shape integrity.',
    bestFor: [
      'Complex multi-level filter trees and nested configurations',
      'Composite query criteria (e.g. { role, minRating, verified })',
      'Table column preferences and layout state',
      'Dynamic form draft states stored in the URL',
    ],
    cleanUrlBehavior: {
      rule: 'Omitted when matching default object or invalid JSON',
      description: 'Omits the parameter when deep object equality matches defaultValue or if JSON is invalid.',
      rules: [
        {
          condition: 'areValuesEqual(object, defaultObject)',
          behavior: 'Key removed from URL',
          exampleUrl: 'https://example.com/reports (clean)',
        },
        {
          condition: 'invalid JSON syntax (e.g. ?f={bad)',
          behavior: 'Safely falls back to defaultValue without crashing',
          exampleUrl: 'https://example.com/reports (clean)',
        },
      ],
    },
    parameters: [
      {
        name: 'validator',
        type: '(data: unknown) => boolean',
        required: false,
        description: 'Optional predicate function to validate the parsed JSON payload.',
      },
    ],
    codeExample: [
      "'use client';",
      "",
      "import { useQueryState, parseAsJson } from 'paramsync';",
      "",
      "interface FilterCriteria {",
      "  role: string;",
      "  minRating: number;",
      "}",
      "",
      "export function ComplexFilter() {",
      "  const [filters, setFilters] = useQueryState(",
      "    'filters',",
      "    parseAsJson<FilterCriteria>().withDefault({ role: 'all', minRating: 0 })",
      "  );",
      "",
      "  return (",
      "    <div>",
      "      <span>Role: {filters.role}</span>",
      "      <button onClick={() => setFilters({ role: 'admin', minRating: 5 })}>",
      "        Set Admin",
      "      </button>",
      "    </div>",
      "  );",
      "}"
    ].join('\n'),
    advancedExample: [
      "// With custom runtime validator",
      "const validatedParser = parseAsJson<{ role: string }>((d): d is { role: string } => {",
      "  return typeof d === 'object' && d !== null && 'role' in d;",
      "});"
    ].join('\n'),
    relatedParsers: [
      { name: 'parseAsArray', href: '/docs/parsers/parse-as-array' },
      { name: 'createParser', href: '/docs/parsers/create-parser' },
    ],
  },

  'parse-as-string': {
    slug: 'parse-as-string',
    name: 'parseAsString',
    signature: 'parseAsString: Parser<string | null>',
    returnType: 'string | null (or string with .withDefault())',
    summary: 'Standard string parameter parser with Arabic/Unicode support, safe URI decoding, and automatic empty string purging.',
    whatItDoes:
      'Reads and writes query string values with native support for Arabic characters, spaces, and Unicode. Built-in safe decoding wraps decodeURIComponent in try/catch to guarantee your app never crashes on malformed percent sequences (URIError). When paired with withDefault(""), any empty string input or matches to the default are omitted from the URL automatically according to the Clean URL Policy.',
    bestFor: [
      'Free-text search inputs and live search bars',
      'Active tab identifiers and category names',
      'Slug-based selection filters',
      'External referral or UTM campaign tracking parameters',
    ],
    cleanUrlBehavior: {
      rule: 'Omitted when empty ("") or matching default value',
      description:
        'Prevents ugly queries like `?search=` or `?tab=overview` from polluting browser address bars and analytics logs.',
      rules: [
        {
          condition: 'value === "" (empty string)',
          behavior: 'Key removed from URL',
          exampleUrl: 'https://example.com/products (clean)',
        },
        {
          condition: 'value === defaultValue',
          behavior: 'Key removed from URL',
          exampleUrl: 'https://example.com/products (clean)',
        },
        {
          condition: 'value === "mechanical keyboard"',
          behavior: 'Serialized as query param',
          exampleUrl: 'https://example.com/products?q=mechanical+keyboard',
        },
      ],
    },
    parameters: [
      {
        name: 'defaultValue',
        type: 'string',
        required: false,
        description: 'Optional default value supplied via .withDefault(fallback). Narrows return type to string.',
        defaultValue: '""',
      },
    ],
    codeExample: `'use client';

import { useQueryState, parseAsString } from 'paramsync';

export function SearchFilter() {
  // 300ms debounce ensures 0ms typing latency with debounced URL sync
  const [search, setSearch] = useQueryState(
    'q',
    parseAsString.withDefault(''),
    { debounceMs: 300 }
  );

  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search documentation..."
      className="px-3 py-2 border rounded bg-zinc-900 border-zinc-800 text-zinc-100"
    />
  );
}`,
    advancedExample: `// Functional state updates and clear button
<button onClick={() => setSearch('')}>Clear</button>
// Functional update:
setSearch((prev) => prev.trim().toLowerCase());`,
    relatedParsers: [
      { name: 'parseAsArray', href: '/docs/parsers/parse-as-array' },
      { name: 'useQueryState', href: '/docs/hooks/use-query-state' },
    ],
  },

  'parse-as-integer': {
    slug: 'parse-as-integer',
    name: 'parseAsInteger',
    signature: 'parseAsInteger: Parser<number | null>',
    returnType: 'number | null (or number with .withDefault())',
    summary: 'Strict integer parser that guarantees safe, non-NaN integer state representations in URLs.',
    whatItDoes:
      'Parses base-10 integer numbers from URL query strings. Rejects non-numeric characters, floating decimals, and NaN values, falling back safely to the specified default value or null.',
    bestFor: [
      'Pagination page indices (?page=2)',
      'Page size and limit selectors (?limit=25)',
      'Quantity counters and step controllers',
      'Numeric entity IDs in query-driven modals',
    ],
    cleanUrlBehavior: {
      rule: 'Omitted when matching default (e.g. page 1)',
      description:
        'Default page 1 is purged so initial catalog pages remain cleanly canonical (`/catalog` instead of `/catalog?page=1`).',
      rules: [
        {
          condition: 'page === 1 (withDefault(1))',
          behavior: 'Key removed from URL',
          exampleUrl: 'https://example.com/feed',
        },
        {
          condition: 'page === 3',
          behavior: 'Serialized as integer',
          exampleUrl: 'https://example.com/feed?page=3',
        },
        {
          condition: 'URL contains malformed `?page=abc`',
          behavior: 'Falls back to 1 safely without crashing',
          exampleUrl: 'Internal state = 1',
        },
      ],
    },
    parameters: [
      {
        name: 'defaultValue',
        type: 'number',
        required: false,
        description: 'Integer fallback configured through .withDefault(number).',
        defaultValue: '1',
      },
    ],
    codeExample: `'use client';

import { useQueryState, parseAsInteger } from 'paramsync';

export function PaginationControls() {
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1)
  );

  return (
    <div className="flex items-center gap-2">
      <button
        disabled={page <= 1}
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        className="px-3 py-1.5 rounded border border-zinc-800 disabled:opacity-40"
      >
        Previous
      </button>
      <span className="font-mono text-sm">Page {page}</span>
      <button
        onClick={() => setPage((p) => p + 1)}
        className="px-3 py-1.5 rounded border border-zinc-800"
      >
        Next
      </button>
    </div>
  );
}`,
    advancedExample: `// Auto-reset page when filter changes
function handleFilterChange(newFilter: string) {
  setPage(1); // Cleanses ?page parameter from URL
  setFilter(newFilter);
}`,
    relatedParsers: [
      { name: 'parseAsFloat', href: '/docs/parsers/parse-as-float' },
      { name: 'parseAsNumberRange', href: '/docs/parsers/parse-as-number-range' },
    ],
  },

  'parse-as-float': {
    slug: 'parse-as-float',
    name: 'parseAsFloat',
    signature: 'parseAsFloat: Parser<number | null>',
    returnType: 'number | null (or number with .withDefault())',
    summary: 'Floating-point number parser for decimals, ratings, geographical coordinates, and metrics.',
    whatItDoes:
      'Parses decimal values using strict floating-point validation. Rejects Infinity, -Infinity, and invalid non-numeric strings, guaranteeing clean IEEE-754 numbers in your React components.',
    bestFor: [
      'Customer rating filters (?minRating=4.5)',
      'Geographical coordinates (?lat=37.77&lng=-122.41)',
      'Precision price filters and percentage discounts (?discount=15.5)',
      'Dimensions and physical weight metrics',
    ],
    cleanUrlBehavior: {
      rule: 'Omitted when matching default value',
      description: 'Default ratings (e.g. 0.0) or initial coordinates are omitted to keep URLs concise.',
      rules: [
        {
          condition: 'rating === 0 (default)',
          behavior: 'Key removed from URL',
          exampleUrl: 'https://example.com/items',
        },
        {
          condition: 'rating === 4.5',
          behavior: 'Serialized as decimal',
          exampleUrl: 'https://example.com/items?minRating=4.5',
        },
      ],
    },
    codeExample: `'use client';

import { useQueryState, parseAsFloat } from 'paramsync';

export function RatingFilter() {
  const [minRating, setMinRating] = useQueryState(
    'minRating',
    parseAsFloat.withDefault(0.0)
  );

  return (
    <select
      value={minRating}
      onChange={(e) => setMinRating(parseFloat(e.target.value))}
      className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-sm"
    >
      <option value="0">All Ratings</option>
      <option value="3.5">3.5+ Stars</option>
      <option value="4.0">4.0+ Stars</option>
      <option value="4.5">4.5+ Stars</option>
    </select>
  );
}`,
    relatedParsers: [
      { name: 'parseAsInteger', href: '/docs/parsers/parse-as-integer' },
      { name: 'parseAsNumberRange', href: '/docs/parsers/parse-as-number-range' },
    ],
  },

  'parse-as-boolean': {
    slug: 'parse-as-boolean',
    name: 'parseAsBoolean',
    signature: 'parseAsBoolean: Parser<boolean | null>',
    returnType: 'boolean | null (or boolean with .withDefault())',
    summary: 'Boolean flag parser that maps truthy ("true", "1") and falsy ("false", "0") query values.',
    whatItDoes:
      'Normalizes various URL boolean conventions into strict JavaScript booleans. Treats "true" and "1" as true, and "false" and "0" as false. Unrecognized values fall back gracefully to the parser default.',
    bestFor: [
      '"In Stock Only" e-commerce inventory toggles',
      '"Include Outdated" documentation switches',
      'Dense table view vs expanded card view modes',
      'Feature preview flags in query strings',
    ],
    cleanUrlBehavior: {
      rule: 'Omitted when false (or matching default)',
      description: 'Toggles in their default disabled state do not populate `?inStock=false` into the URL.',
      rules: [
        {
          condition: 'inStock === false (default)',
          behavior: 'Key removed from URL',
          exampleUrl: 'https://example.com/shop',
        },
        {
          condition: 'inStock === true',
          behavior: 'Serialized as `?inStock=true`',
          exampleUrl: 'https://example.com/shop?inStock=true',
        },
      ],
    },
    codeExample: `'use client';

import { useQueryState, parseAsBoolean } from 'paramsync';

export function InStockToggle() {
  const [inStock, setInStock] = useQueryState(
    'inStock',
    parseAsBoolean.withDefault(false)
  );

  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={inStock}
        onChange={(e) => setInStock(e.target.checked)}
        className="rounded border-zinc-700 bg-zinc-900 text-blue-600 focus:ring-0"
      />
      <span className="text-sm text-zinc-300">In Stock Only</span>
    </label>
  );
}`,
    relatedParsers: [
      { name: 'parseAsString', href: '/docs/parsers/parse-as-string' },
      { name: 'useQueryState', href: '/docs/hooks/use-query-state' },
    ],
  },

  'parse-as-array': {
    slug: 'parse-as-array',
    name: 'parseAsArray',
    signature: 'parseAsArray<T>(itemParser: Parser<T>, separator?: string): ParserWithDefault<NonNullable<T>[]>',
    returnType: 'T[]',
    summary: 'Higher-order collection parser for multi-select facet filters, tags, and category lists.',
    whatItDoes:
      'Accepts an underlying item parser (such as parseAsString or parseAsInteger) and splits delimited strings into a typed JavaScript array. Empty arrays `[]` are automatically purged from the query string.',
    bestFor: [
      'Multi-select category checkboxes (?categories=audio,laptops)',
      'Multiple tag selectors (?tags=react,nextjs,typescript)',
      'Status badges filter (?status=open,in_review)',
      'Multi-user selection filters',
    ],
    cleanUrlBehavior: {
      rule: 'Omitted when array is empty `[]` or matches default',
      description: 'When users clear all checkboxes or badges, the entire parameter is cleaned out of the URL.',
      rules: [
        {
          condition: 'categories.length === 0',
          behavior: 'Key removed completely from URL',
          exampleUrl: 'https://example.com/store',
        },
        {
          condition: 'categories === ["audio", "keyboards"]',
          behavior: 'Serialized as comma-separated values',
          exampleUrl: 'https://example.com/store?categories=audio,keyboards',
        },
      ],
    },
    parameters: [
      {
        name: 'itemParser',
        type: 'Parser<T>',
        required: true,
        description: 'Underlying parser for array items (e.g. parseAsString, parseAsInteger).',
      },
      {
        name: 'separator',
        type: 'string',
        required: false,
        description: 'Delimiter character between items. Defaults to comma `,`.',
        defaultValue: '","',
      },
    ],
    codeExample: `'use client';

import { useQueryState, parseAsArray, parseAsString } from 'paramsync';

const ALL_CATEGORIES = ['electronics', 'clothing', 'home', 'books'] as const;

export function CategoryFacet() {
  const [categories, setCategories] = useQueryState(
    'categories',
    parseAsArray(parseAsString)
  );

  const toggleCategory = (cat: string) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {ALL_CATEGORIES.map((cat) => {
        const isActive = categories.includes(cat);
        return (
          <button
            key={cat}
            onClick={() => toggleCategory(cat)}
            className={\`px-2.5 py-1 text-xs rounded border font-mono transition-colors \${
              isActive
                ? 'bg-zinc-100 text-zinc-900 border-zinc-100 font-medium'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
            }\`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}`,
    advancedExample: `// Parsing array of numbers (e.g. ?ids=101,102,103)
const [ids, setIds] = useQueryState('ids', parseAsArray(parseAsInteger));`,
    relatedParsers: [
      { name: 'parseAsString', href: '/docs/parsers/parse-as-string' },
      { name: 'parseAsNumberRange', href: '/docs/parsers/parse-as-number-range' },
    ],
  },

  'parse-as-number-range': {
    slug: 'parse-as-number-range',
    name: 'parseAsNumberRange',
    signature: 'parseAsNumberRange(defaultMin: number, defaultMax: number, separator?: string): ParserWithDefault<NumberRange>',
    returnType: '{ min: number; max: number }',
    summary: 'Composite parser for dual-thumb numeric sliders, price spans, and min/max boundaries.',
    whatItDoes:
      'Serializes and deserializes a `{ min: number, max: number }` object into a compact hyphenated string (e.g. `?price=50-250`). Automatically purges the parameter when the range matches default boundaries.',
    bestFor: [
      'Dual-thumb price range sliders ($0 - $1000)',
      'Year production filters (?year=1990-2024)',
      'Dimensions and square footage boundaries',
      'Salary and hourly compensation ranges',
    ],
    cleanUrlBehavior: {
      rule: 'Omitted when range equals default bounds',
      description: 'When slider is set to full bounds (min === defaultMin && max === defaultMax), parameter is deleted.',
      rules: [
        {
          condition: 'price === { min: 0, max: 1000 } (defaults)',
          behavior: 'Key removed from URL',
          exampleUrl: 'https://example.com/catalog',
        },
        {
          condition: 'price === { min: 100, max: 500 }',
          behavior: 'Serialized as `?price=100-500`',
          exampleUrl: 'https://example.com/catalog?price=100-500',
        },
      ],
    },
    parameters: [
      {
        name: 'defaultMin',
        type: 'number',
        required: true,
        description: 'Lower boundary fallback and clean URL baseline.',
      },
      {
        name: 'defaultMax',
        type: 'number',
        required: true,
        description: 'Upper boundary fallback and clean URL baseline.',
      },
      {
        name: 'separator',
        type: 'string',
        required: false,
        description: 'Delimiter character between min and max. Defaults to hyphen `-`.',
        defaultValue: '"-"',
      },
    ],
    codeExample: `'use client';

import { useQueryState, parseAsNumberRange } from 'paramsync';

export function PriceRangeFilter() {
  const [price, setPrice] = useQueryState(
    'price',
    parseAsNumberRange(0, 1000)
  );

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-mono text-zinc-400">
        <span>\${price.min}</span>
        <span>\${price.max}</span>
      </div>
      <input
        type="range"
        min={0}
        max={1000}
        value={price.max}
        onChange={(e) =>
          setPrice((prev) => ({ ...prev, max: Number(e.target.value) }))
        }
        className="w-full accent-blue-600 bg-zinc-800"
      />
    </div>
  );
}`,
    relatedParsers: [
      { name: 'parseAsInteger', href: '/docs/parsers/parse-as-integer' },
      { name: 'parseAsArray', href: '/docs/parsers/parse-as-array' },
    ],
  },

  'parse-as-sort': {
    slug: 'parse-as-sort',
    name: 'parseAsSort',
    signature: 'parseAsSort<TField extends string>(defaultField: TField, defaultOrder?: "asc" | "desc", separator?: string): ParserWithDefault<SortOption<TField>>',
    returnType: '{ field: TField; order: "asc" | "desc" }',
    summary: 'Composite parser for tabular sort state, column sorting, and order direction.',
    whatItDoes:
      'Encodes `{ field, order }` configurations into standard query formats like `?sort=createdAt.desc` or `?sort=price.asc`. Automatically cleans the query string when set to the default sort order.',
    bestFor: [
      'Data grid table header click sorting',
      'E-commerce product feed sorting (Price: Low to High)',
      'Blog post and documentation chronological order',
      'Search relevance versus date toggling',
    ],
    cleanUrlBehavior: {
      rule: 'Omitted when matching defaultField and defaultOrder',
      description: 'The default sorting state is omitted from the URL to preserve canonical links.',
      rules: [
        {
          condition: 'sort === { field: "createdAt", order: "desc" } (defaults)',
          behavior: 'Key removed from URL',
          exampleUrl: 'https://example.com/posts',
        },
        {
          condition: 'sort === { field: "price", order: "asc" }',
          behavior: 'Serialized as `?sort=price.asc`',
          exampleUrl: 'https://example.com/posts?sort=price.asc',
        },
      ],
    },
    parameters: [
      {
        name: 'defaultField',
        type: 'string',
        required: true,
        description: 'Baseline field to sort by (e.g. "createdAt", "name", "price").',
      },
      {
        name: 'defaultOrder',
        type: '"asc" | "desc"',
        required: false,
        description: 'Baseline order direction. Defaults to "asc".',
        defaultValue: '"asc"',
      },
      {
        name: 'separator',
        type: 'string',
        required: false,
        description: 'Delimiter between field and direction. Defaults to period `.`.',
        defaultValue: '"."',
      },
    ],
    codeExample: `'use client';

import { useQueryState, parseAsSort } from 'paramsync';

export function SortDropdown() {
  const [sort, setSort] = useQueryState(
    'sort',
    parseAsSort('createdAt', 'desc')
  );

  return (
    <select
      value={\`\${sort.field}.\${sort.order}\`}
      onChange={(e) => {
        const [field, order] = e.target.value.split('.') as [string, 'asc' | 'desc'];
        setSort({ field, order });
      }}
      className="bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm rounded px-3 py-1.5"
    >
      <option value="createdAt.desc">Newest First</option>
      <option value="createdAt.asc">Oldest First</option>
      <option value="price.asc">Price: Low to High</option>
      <option value="price.desc">Price: High to Low</option>
    </select>
  );
}`,
    relatedParsers: [
      { name: 'parseAsString', href: '/docs/parsers/parse-as-string' },
      { name: 'useQueryState', href: '/docs/hooks/use-query-state' },
    ],
  },

  'create-parser': {
    slug: 'create-parser',
    name: 'createParser',
    signature: 'createParser<T>(options: { parse: (val: string | null) => T; serialize: (val: T) => string; defaultValue?: T }): Parser<T>',
    returnType: 'Parser<T>',
    summary: 'Extensible factory for building bespoke domain parsers with full TypeScript inference.',
    whatItDoes:
      'Provides the low-level primitive for building custom parsers. Implements bi-directional parse and serialize logic, automatic null handling, and equips your custom parser with the .withDefault() method automatically.',
    bestFor: [
      'Complex objects or JSON query parameters',
      'Date and ISO timestamp parsing (Date objects)',
      'Custom TypeScript enums and literal union types',
      'Encrypted or base64-encoded URL parameters',
    ],
    cleanUrlBehavior: {
      rule: 'Respects custom defaultValue equality check',
      description: 'Values matching the default value or returning empty string from serialize are purged.',
      rules: [
        {
          condition: 'serialize(value) === "" or value === defaultValue',
          behavior: 'Key removed from URL',
          exampleUrl: 'https://example.com/app',
        },
      ],
    },
    codeExample: `'use client';

import { createParser, useQueryState } from 'paramsync';

// Custom Date parser that handles ISO strings
const parseAsIsoDate = createParser<Date | null>({
  parse: (val) => (val ? new Date(val) : null),
  serialize: (val) => (val ? val.toISOString().split('T')[0] : ''),
});

export function DatePickerFilter() {
  const [selectedDate, setSelectedDate] = useQueryState('date', parseAsIsoDate);

  return (
    <input
      type="date"
      value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
      onChange={(e) =>
        setSelectedDate(e.target.value ? new Date(e.target.value) : null)
      }
      className="bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-zinc-100"
    />
  );
}`,
    relatedParsers: [
      { name: 'parseAsString', href: '/docs/parsers/parse-as-string' },
      { name: 'parseAsArray', href: '/docs/parsers/parse-as-array' },
    ],
  },
};

export const allParserSlugs = Object.keys(parsersData);
