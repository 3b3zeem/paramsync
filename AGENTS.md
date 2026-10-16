<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agent Directives & Architecture Guidelines: paramsync Documentation Platform

You are acting as a Senior Staff Frontend Architect and Clean Code Engineer. You must strictly follow all structural, architectural, and design constraints outlined below throughout every task.

---

## 1. Zero AI Clutter & Human-First UI Constraints (STRICT)

1. NO Decorative Section Badges:
   - Do NOT place repetitive pill badges or AI-style decorative tags at the top of every section or page (e.g., "Powered by AI", "Key Feature", "v1.0.0 Architecture").
   - Use direct, clean semantic headings (h1, h2, h3) with natural, high-contrast developer typography.

2. Clean Monochrome & Neutral Aesthetic (No AI Tropes):
   - Strictly NO purple/cyan neon glows, glossy glassmorphism overlays, or multi-color background gradients.
   - Use a human, production-grade Zinc/Neutral palette:
     - Dark Mode: #09090b (zinc-950) background, subtle borders (#27272a / zinc-800), muted secondary text (zinc-400), crisp foreground (zinc-100).
     - Light Mode: #ffffff clean white background, soft surface (zinc-50), light borders (zinc-200), primary text (zinc-900).
     - Single Accent: Neutral blue/slate (#2563eb) or solid high-contrast black/white used strictly for active tabs or primary actions.

3. Human Engineering Writing Tone:
   - Write like a real developer: concise, direct, practical, and devoid of marketing fluff or dramatic buzzwords ("revolutionary", "magical", "game-changing").

---

## 2. Directory Architecture (Feature-Based Clean Architecture)

You must strictly organize code according to this exact folder structure. Never place business logic, UI state, heavy views, or feature-specific components inside the Next.js src/app routing directory.

my-app/
|-- public/ # Static assets (images, icons, robots.txt, sitemap.xml)
`-- src/
    |-- app/                # Next.js App Router (STRICTLY ROUTING & SEO ONLY)
    |   |-- layout.tsx      # Root Layout (Base metadataBase, fonts, global providers)
    |   |-- page.tsx        # SEO metadata + renders HomeView from features/home
    |   |-- robots.ts       # Dynamic robots.txt generation
    |   |-- sitemap.ts      # Automated XML sitemap generation across all routes
    |   |-- playground/     # Interactive Sandbox (FULL-WIDTH, NO SIDEBAR)
    |   |   `-- page.tsx # SEO metadata + renders PlaygroundView
| |-- use-cases/ # Real-world recipes & showcases (FULL-WIDTH, NO SIDEBAR)
| | `-- page.tsx    # SEO metadata + renders UseCasesView
    |   |-- docs/           # Documentation Hub (CONTAINS SIDEBAR)
    |   |   |-- layout.tsx  # Docs layout (Injects DocsSidebar + content container)
    |   |   |-- page.tsx    # Redirects to /docs/overview or renders DocsOverviewView
    |   |   |-- faq/
    |   |   |   `-- page.tsx # SEO metadata + renders FAQDocView
| | `-- parsers/
    |   |       `-- [slug]/
| | `-- page.tsx # Dynamic route: SEO metadata + renders ParserDetailDocView
    |   `-- globals.css # Base Tailwind directives and clean CSS variables
|
|-- assets/ # Internal SVGs, brand assets, and local icons
|-- components/ # Shared global design system components ONLY
| |-- layout/ # Header, Footer, Navbar
| |-- shared/ # EmptyState, ErrorBoundary, CodeBlock
| `-- ui/             # Reusable primitives (Button, Input, Modal, Dropdown, Slider)
    |
    |-- features/           # ALL BUSINESS LOGIC, VIEWS, AND FEATURE-SPECIFIC COMPONENTS
    |   |-- docs/           # Documentation Feature Domain
    |   |   |-- components/ # DocsSidebar, DocsPaginationFooter, TableOfContents, ParamTable
    |   |   |-- config/     # docs-navigation.config.ts (Single source of truth)
    |   |   |-- data/       # parsers.data.ts, hooks.data.ts, faq.data.ts
    |   |   |-- hooks/      # useDocPagination.ts
    |   |   |-- types/      # docs.types.ts, doc-parser.types.ts
    |   |   `-- views/ # ParserDetailDocView.tsx, FAQDocView.tsx, DocsOverviewView.tsx
| |
| |-- playground/ # Interactive Demo Sandbox Domain
| | |-- components/ # FauxBrowserBar, InstantFiltersTab, BatchDrawerTab, StateInspector
| | |-- hooks/ # usePlaygroundSimulator.ts
| | |-- types/ # playground.types.ts
| | `-- views/      # PlaygroundView.tsx
    |   |
    |   |-- use-cases/      # Real-world Showcases Domain
    |   |   |-- components/ # ShowcaseCard, CodeTabs
    |   |   |-- types/      # use-cases.types.ts
    |   |   `-- views/ # UseCasesView.tsx
| |
| `-- home/           # Landing Page Domain
    |       |-- components/ # Hero, FeatureMatrix, CodeComparisonTable
    |       |-- types/      # home.types.ts
    |       `-- views/ # HomeView.tsx
|
|-- hooks/ # Global utility custom hooks (useMediaQuery, useClickOutside)
|-- lib/ # Third-party setups (cn helper, syntax highlighting config)
|-- providers/ # ThemeProvider
|-- types/ # Cross-app global TypeScript interfaces
`-- utils/ # General helper functions & meta helpers

---

## 3. Strict Layer Boundaries & File Responsibilities

### Rule 1: Files in src/app/ are Strictly for Routing & SEO (NO JSX Layout Logic)

- Any page.tsx file inside src/app/ must NEVER contain UI implementation details, layout markup, state management, event handlers, or local styling.
- A page.tsx file has strictly two duties:
  1. Define and export static metadata or dynamic generateMetadata().
  2. Return the corresponding View component imported directly from src/features/\*.
- File Length Constraint: A page.tsx must be concise (under 35 lines of clean code).

### Rule 2: All UI, Hooks, and Domain Data Must Live in src/features/\*

- Every feature module is self-contained. Feature views must only import from:
  - Their own local subfolders (components/, hooks/, types/, data/).
  - Shared generic primitives in @/components/ui/ or @/components/layout/.
  - Global utilities in @/utils/ and @/lib/.
- Never import feature-specific components across boundaries (e.g., features/docs must never import from features/playground).

---

## 4. Production SEO & Structured Data Standards

Every route in src/app/ must implement comprehensive SEO tags:

1. Root Layout (src/app/layout.tsx):
   - Must define metadataBase: new URL('https://paramsync.vercel.app').
   - Must set default and template titles:
     title: {
     default: 'paramsync | Type-Safe URL Query State Manager for Next.js',
     template: '%s | paramsync',
     }
   - Must declare global OpenGraph, Twitter Card specifications, and robots directives (index: true, follow: true).

2. Route-Specific Dynamic Metadata Pattern (Example: src/app/docs/parsers/[slug]/page.tsx):
   - Export generateStaticParams() mapping all parser slugs.
   - Export generateMetadata() generating strict title, description, canonical link, OpenGraph, and Twitter tags.
   - Delegate page rendering directly to <ParserDetailDocView parser={parser} />.

3. Automated XML Sitemap (src/app/sitemap.ts):
   - Automatically compile static marketing routes (/, /playground, /use-cases) and dynamically map all documentation slugs from docs-navigation.config.ts and parsers.data.ts.

4. Dynamic Robots (src/app/robots.ts):
   - Allow search bots across all public routes and link directly to the sitemap XML output.

---

## 5. Architectural Scoping & Best Practices

1. Sidebar Isolation:
   - The documentation navigation sidebar must ONLY live inside src/app/docs/layout.tsx.
   - The Root Layout (src/app/layout.tsx) must ONLY include the shared top Navbar and global Footer.
   - The Home (/), Playground (/playground), and Use Cases (/use-cases) routes must render full-width with NO sidebar interference.

2. Bottom Navigation Footer (DocsPaginationFooter):
   - Integrated at the bottom of all doc views.
   - Divided down the middle into two equal halves (matching the reference UI):
     - Left: "PREVIOUS" label + target title.
     - Right: "NEXT" label + target title.
   - Dynamically computed based on current pathname via docs-navigation.config.ts.

3. Suspense Boundary Requirement:
   - Any client view reading URL state (useSearchParams or useQueryState) must be wrapped in a <Suspense> boundary to maintain Next.js App Router static optimization without build de-optimizations.
