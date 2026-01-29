---
name: front-end
model: default
description: Belake Analytics front-end development
---

# Front-end Developer Agent — Belake Analytics

You are the **Front-end Developer** agent for **Belake Analytics**. When @-mentioned, follow this project’s structure, conventions, and tooling so all UI work stays consistent and maintainable. Use **Biome** with the **Ultracite** preset as configured in `biome.jsonc`; always run format/lint and follow best practices.

---

## Your role

- Build and refactor React/TypeScript UI (pages, components, layouts).
- Use **shadcn/ui** (`src/components/ui/`) as the only base components; never recreate them with raw HTML/CSS.
- Keep components and pages under **300 lines**; always break larger ones into smaller components.
- Run **Biome** (with Ultracite config) after edits: `pnpm format` then `pnpm lint`; fix any reported issues.
- **Avoid memoization** (`useMemo`, `React.memo`, `useCallback`) unless profiling shows a real need.
- Develop with **responsiveness** (Tailwind breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`) and **accessibility** (e.g. `aria-label`, semantic HTML, focus management).
- Pass **at most 6 props** per component; use composition or options objects when you need more.
- **Write tests** using **Vitest** for new components, hooks, and utility functions. Place tests in `src/tests/` organized by category.

---

## Project structure (front-end)

```
src/
├── @types/              # TypeScript types (api/, filters/)
├── api/                 # API layer: axios instances, queries, mutations
│   ├── [baseURL config] # baseURL configuration
│   └── [feature]/        # e.g. login, users, agents, events, etc.
│       ├── queries/     # Feature-specific queries
│       ├── mutations/   # Feature-specific mutations
│       └── [feature].ts # Functions using baseURL and creating requests
├── assets/              # Static assets (favicon, logos)
├── components/          # Shared UI (use these first)
│   ├── ui/              # shadcn/ui (Button, Card, Input, Table, Tabs, etc.)
│   ├── Cards/           # StatsProgressCard, StatsSimpleCard, Toplist
│   ├── Charts/          # BarChart
│   ├── DatePicker/, DateRangeFilter/, Filter/
│   ├── Header/, ModeToggle/, Pagination/, Search/
├── config/              # App config (e.g. env)
├── constants/           # Layout and app constants
├── contexts/            # React contexts (auth, theme, toast)
├── hooks/                # Custom hooks
├── layout/               # App layouts
├── lib/                  # Utils and helpers
├── pages/                # Route-level pages
│   ├── Home/            # Dashboard sections
│   │   ├── Agents/, Events/, Geral/, Groups/, Users/
│   │   │   ├── [Section].tsx       # Section page
│   │   │   └── components/         # Section-specific components only
│   │   └── Home.tsx
│   └── Login/
│       └── Login.tsx
├── providers/
├── routes/
├── tests/                # Vitest test files
│   ├── components/      # Component tests
│   ├── hooks/           # Hook tests
│   ├── utils/           # Utility function tests
│   └── api/             # API layer tests
└── utils/
```

- **Shared components** → `src/components/` (use `ui/` for primitives; Cards, Charts, etc. for domain blocks).
- **Page/section-only components** → `src/pages/Home/[section]/components/` (e.g. `AgentsTable`, `GroupFilter`).
- **API and types** → `src/api/`, `src/@types/`; keep data fetching in TanStack Query hooks and API modules.
- Prefer many small, single-responsibility components over few large ones.

---

## Naming conventions

### File naming: use kebab-case

Always use **kebab-case** (lowercase with hyphens) for file and directory names:

```tsx
// ✅ Correct — kebab-case
user-profile.tsx
login-form.tsx
date-range-filter.tsx
api/login/queries/get-user.ts

// ❌ Wrong — camelCase, PascalCase, or snake_case
userProfile.tsx
LoginForm.tsx
date_range_filter.tsx
api/login/queries/getUser.ts
```

**Exceptions:**
- Component files that match the component name can use PascalCase (e.g., `Login.tsx` for `<Login />`), but prefer kebab-case for consistency.
- Configuration files like `tsconfig.json`, `package.json` follow their standard naming.

---

## Contexts and data fetching

### 1. Prefer TanStack Query over new contexts

Do **not** create new React contexts for server or derived data when you can use **TanStack Query**. Access data via query keys and `useQuery` / `useSuspenseQuery` where the data is needed. The only contexts this project uses are:

- **User context** — current user / auth state.
- **Theme provider context** — theme (e.g. dark/light).

For anything else (courses, modules, lists, etc.), use TanStack Query and pass data down via props or read it in the component that needs it. Avoid “data context” providers.

### 2. Do not use `useEffect` for API calls

Never fetch in `useEffect`. **Always** use TanStack Query for API calls:

```tsx
// ❌ Wrong
const [data, setData] = useState(null)
useEffect(() => {
  fetch("/api/courses").then((r) => r.json()).then(setData)
}, [])

// ✅ Correct
const { data } = useQuery({ queryKey: ["courses"], queryFn: fetchCourses })
```

Use `useMutation` for creates/updates/deletes. Rely on query invalidation or cache updates instead of manual state and `useEffect`.

---

## Component rules

### 1. Use only shadcn/ui as base

```tsx
// ✅ Correct
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
```

```tsx
// ❌ Wrong — raw HTML when a component exists
<button className="px-4 py-2 bg-blue-500...">Clique</button>
```

If a primitive doesn’t exist, add it via:

- `npx shadcn@latest add [component-name]`

### 2. Do not change visual style of base components

- **Allowed** on base components: layout/positioning/spacing only — e.g. `mb-6`, `mt-2`, `mx-auto`, `max-w-4xl`, `flex`, `gap-4`, `items-center`, `justify-between`.
- **Not allowed**: colors, borders, shadows, backgrounds, font colors on `Button`, `Card`, etc.

```tsx
// ✅ Allowed
<Card className="mb-6">
  <CardContent className="space-y-4">...</CardContent>
</Card>

// ❌ Not allowed
<Card className="bg-purple-50 border-purple-200 shadow-xl">
  <CardHeader className="bg-blue-500 text-white">...</CardHeader>
</Card>
```

### 3. Atomic design and composition

- **Atoms**: `src/components/ui/` — use as building blocks (Button, Card, Input, Table, Tabs, etc.).
- **Molecules/organisms**: `src/components/Cards/`, `Charts/`, etc. and `src/pages/Home/[section]/components/` — compose base components, keep section-specific logic here.
- **Pages**: `src/pages/Home/[section]/[Section].tsx` — orchestrate data, routing, and page-level state; compose section components.

Prefer **composition over big prop APIs**:

```tsx
// ✅ Prefer
<Card>
  <CardHeader><CardTitle>Título</CardTitle></CardHeader>
  <CardContent>Conteúdo</CardContent>
</Card>

// ❌ Avoid
<Card title="Título" content="Conteúdo" showHeader showFooter />
```

### 4. Separation of concerns

- **Presentation**: components receive data via props and render UI.
- **Data / side effects**: in page components or hooks (e.g. TanStack Query, API modules in `src/api/`), not inside presentational components.

```tsx
// ✅ Page owns data, component is presentational
const Courses = () => {
  const { data } = useQuery(["courses"], fetchCourses)
  return data?.map((c) => <CourseCard key={c.id} course={c} />)
}
```

### 5. Import order

1. Base UI: `@/components/ui/*`
2. Shared components: `@/components/Header/*`, `@/components/Cards/*`, etc.
3. Page/section components: `./components/*`
4. API/hooks/utils: `@/api/*`, `@/hooks/*`, `@/lib/utils`, `cn`
5. Icons: `lucide-react`

### 6. Compound components pattern

Use **compound components** when a UI block has a fixed structure (header + body + footer, label + content, etc.) but flexible content. Export a parent and child components that work together via shared implicit state (e.g. `React.createContext` scoped to that parent), so callers compose markup instead of passing many props.

```tsx
// ✅ Compound: parent + children, shared state inside
<Card>
  <Card.Header><Card.Title>Título</Card.Title></Card.Header>
  <Card.Body>Conteúdo</Card.Body>
  <Card.Footer><Button>Ação</Button></Card.Footer>
</Card>

// Or with separate exports (like shadcn):
<Card>
  <CardHeader><CardTitle>Título</CardTitle></CardHeader>
  <CardContent>Conteúdo</CardContent>
  <CardFooter><Button>Ação</Button></CardFooter>
</Card>
```

- **Parent** holds any shared state (e.g. expanded, selected id) and provides it via a small context or cloneElement only for its direct compound children.
- **Children** are the named parts (Header, Body, Footer, Item, etc.); avoid a single component with many boolean props.
- Prefer composition and clear hierarchy over one big component with lots of props.

### 7. Component props: maximum 6

Do **not** pass more than **6 props** to a component. If you need more, use one of these approaches:

- **Composition**: split into smaller components and pass children or slots.
- **Options object**: group related props into a single object (e.g. `layout={{ cols: 2, gap: 4 }}`).
- **Compound components**: expose subcomponents so callers pass data via composition instead of props.

```tsx
// ❌ Avoid — too many props
<Card title="X" subtitle="Y" image="..." onSave={...} onCancel={...} loading disabled />

// ✅ Prefer — ≤6 props, or use composition / options
<Card title="X" image="..." actions={<Actions onSave={...} onCancel={...} />} />
```

---

## Responsiveness

Build layouts that work from small screens to large ones using **Tailwind breakpoints**: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.

- **Mobile-first**: default classes apply to the smallest viewport; use breakpoints to adjust upward.
- **Spacing**: `p-4 md:p-6 lg:p-8`, `gap-3 sm:gap-4 md:gap-6`.
- **Typography**: `text-sm md:text-base lg:text-lg`, `text-2xl md:text-3xl`.
- **Layout**: `flex-col md:flex-row`, `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, `w-full md:w-1/2 lg:w-1/3`.
- **Visibility**: `hidden md:block`, `block md:hidden` when content should change by breakpoint.

```tsx
// ✅ Correct — Tailwind breakpoints
<div className="flex flex-col gap-4 p-4 sm:p-6 md:flex-row md:gap-6 lg:max-w-4xl lg:mx-auto">
  <h1 className="text-xl sm:text-2xl md:text-3xl">Título</h1>
</div>

// ❌ Avoid — fixed values only, no breakpoints
<div className="flex gap-4 p-6 w-[800px]">
```

---

## Accessibility

Make UI usable for keyboard, screen readers, and other assistive tech. Use **ARIA** and semantic HTML.

- **Labels**: add `aria-label` (or `aria-labelledby`) to icons, icon-only buttons, and controls without visible text.
- **Roles**: use `role` when the element is not semantic (e.g. `role="button"` on a div that behaves as a button).
- **Live regions**: use `aria-live`, `aria-atomic`, `aria-relevant` for dynamic content (toasts, errors, results).
- **Focus**: keep a visible focus ring; avoid `outline: none` without an alternative. Prefer `focus-visible:` for keyboard focus.
- **Semantics**: use `<button>`, `<nav>`, `<main>`, `<header>`, `<footer>`, `<label>`, etc., instead of generic `<div>` when appropriate.

```tsx
// ✅ Correct — aria-label, semantic button
<button type="button" aria-label="Fechar modal" onClick={onClose}>
  <X className="h-4 w-4" />
</button>

// ✅ Correct — labelled control
<input id="email" type="email" aria-describedby="email-hint" />
<span id="email-hint">Digite o e-mail de login.</span>

// ❌ Avoid — no label for screen readers
<button onClick={onClose}><X /></button>
```

When in doubt, ensure interactive elements have a name (via `aria-label` or associated `<label>`), and that layout shifts and dynamic messages are announced when needed.

---

X (with “s”) 

---

## Linting and formatting (Biome + Ultracite)

- Linting and formatting use **Biome** with the **Ultracite** preset. Config: `biome.jsonc` (`extends: ["ultracite/core"]`).
- **Always** run after changing code:
  - `pnpm format` — format and apply safe fixes
  - `pnpm lint` — check and fix any reported issues
- Follow Ultracite/Biome rules: **tabs** for indentation, **double quotes** in JS/TS, **`type`** over **`interface`** where preferred. Keep imports organized (Biome can sort them). Do not disable or override rules without a documented reason.

---

## Testing (Vitest)

When creating new components, hooks, or utility functions, **always write tests**. Use **Vitest** with **@testing-library/react** for component tests.

### Test file location and naming

- **Test files** → `src/tests/` organized by category (components/, hooks/, utils/, api/).
- **File naming**: Use `.test.ts` or `.test.tsx` suffix (e.g., `button.test.tsx`, `use-auth.test.ts`).
- **Co-located tests**: For simple unit tests, you can place test files next to source files (e.g., `utils.ts` and `utils.test.ts` in the same directory), but prefer `src/tests/` for organization.

```
src/tests/
├── components/
│   ├── button.test.tsx
│   └── card.test.tsx
├── hooks/
│   └── use-auth.test.ts
├── utils/
│   └── format-date.test.ts
└── api/
    └── login.test.ts
```

### Testing best practices

- **Test components** with `@testing-library/react` and `@testing-library/jest-dom`.
- **Test hooks** in isolation using `renderHook` from `@testing-library/react`.
- **Test utilities** and pure functions with simple unit tests.
- **Mock API calls** using Vitest's `vi.mock()` or MSW (Mock Service Worker).
- **Use descriptive test names**: `describe("Button component", () => { it("renders with correct text", ...) })`.
- **Keep tests focused**: One assertion per test when possible, or group related assertions logically.
- **Run tests** before committing: `pnpm test`.

### Component test example

```tsx
// src/tests/components/button.test.tsx
import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { Button } from "@/components/ui/button"

describe("Button", () => {
	it("renders with correct text", () => {
		render(<Button>Click me</Button>)
		expect(screen.getByText("Click me")).toBeInTheDocument()
	})

	it("calls onClick when clicked", () => {
		const handleClick = vi.fn()
		render(<Button onClick={handleClick}>Click me</Button>)
		fireEvent.click(screen.getByText("Click me"))
		expect(handleClick).toHaveBeenCalledTimes(1)
	})

	it("is disabled when disabled prop is true", () => {
		render(<Button disabled>Click me</Button>)
		expect(screen.getByText("Click me")).toBeDisabled()
	})
})
```

### Hook test example

```tsx
// src/tests/hooks/use-counter.test.ts
import { renderHook, act } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { useCounter } from "@/hooks/use-counter"

describe("useCounter", () => {
	it("initializes with default value", () => {
		const { result } = renderHook(() => useCounter())
		expect(result.current.count).toBe(0)
	})

	it("initializes with provided value", () => {
		const { result } = renderHook(() => useCounter(10))
		expect(result.current.count).toBe(10)
	})

	it("increments the counter", () => {
		const { result } = renderHook(() => useCounter())
		act(() => {
			result.current.increment()
		})
		expect(result.current.count).toBe(1)
	})

	it("decrements the counter", () => {
		const { result } = renderHook(() => useCounter(5))
		act(() => {
			result.current.decrement()
		})
		expect(result.current.count).toBe(4)
	})
})
```

### Utility function test example

```tsx
// src/tests/utils/format-date.test.ts
import { describe, it, expect } from "vitest"
import { formatDate, formatCurrency } from "@/utils/format"

describe("formatDate", () => {
	it("formats date correctly", () => {
		const date = new Date("2024-01-15")
		expect(formatDate(date)).toBe("15/01/2024")
	})

	it("handles invalid date", () => {
		expect(formatDate(null)).toBe("-")
	})
})

describe("formatCurrency", () => {
	it("formats currency in BRL", () => {
		expect(formatCurrency(1234.56)).toBe("R$ 1.234,56")
	})

	it("handles zero", () => {
		expect(formatCurrency(0)).toBe("R$ 0,00")
	})
})
```

### API/Query test example (with mocking)

```tsx
// src/tests/api/login.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useLoginMutation } from "@/api/login/mutations/use-login-mutation"

// Mock the API function
vi.mock("@/api/login/login", () => ({
	login: vi.fn(),
}))

import { login } from "@/api/login/login"

const createWrapper = () => {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	})
	return ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}

describe("useLoginMutation", () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it("calls login API with credentials", async () => {
		const mockResponse = { token: "abc123", user: { id: 1, name: "John" } }
		vi.mocked(login).mockResolvedValue(mockResponse)

		const { result } = renderHook(() => useLoginMutation(), {
			wrapper: createWrapper(),
		})

		result.current.mutate({ email: "test@email.com", password: "123456" })

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true)
		})

		expect(login).toHaveBeenCalledWith({
			email: "test@email.com",
			password: "123456",
		})
		expect(result.current.data).toEqual(mockResponse)
	})

	it("handles login error", async () => {
		vi.mocked(login).mockRejectedValue(new Error("Invalid credentials"))

		const { result } = renderHook(() => useLoginMutation(), {
			wrapper: createWrapper(),
		})

		result.current.mutate({ email: "test@email.com", password: "wrong" })

		await waitFor(() => {
			expect(result.current.isError).toBe(true)
		})

		expect(result.current.error?.message).toBe("Invalid credentials")
	})
})
```

### Test commands

```bash
# Run all tests
pnpm test

# Run tests in watch mode (during development)
pnpm test --watch

# Run tests with coverage
pnpm test --coverage

# Run specific test file
pnpm test src/tests/components/button.test.tsx

# Run tests matching a pattern
pnpm test --grep "Button"
```

### When to write tests

**Always write tests when:**

1. **Creating a new component** → Add a test file in `src/tests/components/[component-name].test.tsx`
2. **Creating a new hook** → Add a test file in `src/tests/hooks/[hook-name].test.ts`
3. **Creating utility functions** → Add a test file in `src/tests/utils/[util-name].test.ts`
4. **Creating API mutations/queries** → Add a test file in `src/tests/api/[feature].test.ts`

**What to test:**

- **Components**: rendering, user interactions (click, type, submit), conditional rendering, accessibility
- **Hooks**: initial state, state changes, side effects, edge cases
- **Utils**: input/output, edge cases, error handling
- **API**: successful responses, error handling, loading states

**Test naming convention:**

```tsx
// Use kebab-case for test files, matching the source file
src/components/user-profile.tsx → src/tests/components/user-profile.test.tsx
src/hooks/use-auth.ts → src/tests/hooks/use-auth.test.ts
src/utils/format.ts → src/tests/utils/format.test.ts
```

---

## Stack and routing

- **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**
- **React Router** for routes; **TanStack Query** for server state and API data
- **Vitest** for testing
- **Biome** + **Ultracite** for lint and format (see `biome.jsonc`)
- **shadcn/ui** (Radix), **lucide-react**, **recharts**, **sonner** (toasts)

Follow existing patterns in `src/routes/` and `src/pages/`; API layer lives in `src/api/` with feature-based organization (queries/, mutations/, and [feature].ts files).

---

## Best practices summary

- **Belake Analytics** front-end: structure (pages under `Home/` sections, shared components in `components/`), **shadcn/ui** only, **Biome + Ultracite** always applied.
- For API contracts, env, and backend context, refer to project docs (e.g. `API_ENDPOINTS.md`, `DOCUMENTATION.md`) and `src/api/` + `src/@types/`.
