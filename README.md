# Frontend Development Template

A modern, production-ready React + TypeScript frontend template with Vite, featuring a well-organized project structure, comprehensive tooling, and best practices for building scalable applications.

## 🚀 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite 7** - Build tool and dev server
- **React Router 7** - Declarative routing
- **TanStack Query** - Server state management
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Vitest** - Unit testing framework
- **Biome + Ultracite** - Linting and formatting
- **Husky** - Git hooks

## ✨ Features

- ⚡ **Fast Development** - Vite HMR for instant updates
- 🎨 **Modern UI** - shadcn/ui components with Tailwind CSS
- 📦 **Type Safety** - Full TypeScript support
- 🧪 **Testing Ready** - Vitest configured and ready to use
- 🎯 **Code Quality** - Biome + Ultracite for consistent code style
- 🔒 **Git Hooks** - Husky pre-commit and pre-push hooks
- 📱 **Responsive** - Mobile-first design approach
- ♿ **Accessible** - Built with accessibility in mind

## 📁 Project Structure

```
src/
├── @types/              # TypeScript types (api/, filters/)
├── api/                 # API layer: axios instances, queries, mutations
│   ├── [baseURL config] # baseURL configuration
│   └── [feature]/       # e.g. login, users, agents, events, etc.
│       ├── queries/     # Feature-specific queries
│       ├── mutations/   # Feature-specific mutations
│       └── [feature].ts # Functions using baseURL and creating requests
├── assets/              # Static assets (favicon, logos)
├── components/          # Shared UI components
│   ├── ui/              # shadcn/ui primitives (Button, Card, Input, etc.)
│   ├── Cards/           # StatsProgressCard, StatsSimpleCard, Toplist
│   ├── Charts/          # BarChart
│   ├── DatePicker/, DateRangeFilter/, Filter/
│   ├── Header/, ModeToggle/, Pagination/, Search/
├── config/              # App configuration (e.g. env)
├── constants/           # Layout and app constants
├── contexts/            # React contexts (auth, theme, toast)
├── hooks/               # Custom React hooks
├── layout/              # App layouts
├── lib/                 # Utilities and helpers
├── pages/               # Route-level pages
│   ├── Home/           # Dashboard sections
│   │   ├── Agents/, Events/, Geral/, Groups/, Users/
│   │   │   ├── [Section].tsx    # Section page
│   │   │   └── components/      # Section-specific components only
│   │   └── Home.tsx
│   └── Login/
│       └── Login.tsx
├── providers/           # Context providers
├── routes/              # Route definitions
├── tests/               # Vitest test files
│   ├── components/      # Component tests
│   ├── hooks/           # Hook tests
│   ├── utils/           # Utility function tests
│   └── api/             # API layer tests
└── utils/               # Utility functions
```

## 🛠️ Prerequisites

- **Node.js** 18+ (recommended: use [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm))
- **Package Manager**: `npm`, `pnpm`, or `bun` (recommended: `pnpm`)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend-development-template-cursor
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables** (if needed)
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest tests |
| `npm run check` | Run Ultracite checks |
| `npm run fix` | Fix issues with Ultracite |

## 🧪 Testing

This project uses **Vitest** for unit testing. Tests are located in `src/tests/` organized by category.

### Running Tests

```bash
# Run tests once
npm run test

# Run tests in watch mode
npm run test -- --watch

# Run tests with coverage
npm run test -- --coverage
```

### Test Structure

- **Component tests** → `src/tests/components/`
- **Hook tests** → `src/tests/hooks/`
- **Utility tests** → `src/tests/utils/`
- **API tests** → `src/tests/api/`

### Writing Tests

```tsx
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Button } from "@/components/ui/button"

describe("Button", () => {
	it("renders with correct text", () => {
		render(<Button>Click me</Button>)
		expect(screen.getByText("Click me")).toBeInTheDocument()
	})
})
```

## 🎨 Code Quality

### Linting & Formatting

This project uses **Biome** with the **Ultracite** preset for consistent code style.

```bash
# Format code
npm run fix

# Check for issues
npm run check
```

### Git Hooks

**Husky** is configured with pre-commit and pre-push hooks to ensure code quality:

- **Pre-commit**: Runs linting and formatting checks
- **Pre-push**: Runs tests (if configured)

## 📝 Development Guidelines

### Naming Conventions

- **Files**: Use **kebab-case** (e.g., `user-profile.tsx`, `login-form.tsx`)
- **Components**: PascalCase for component names (e.g., `UserProfile`, `LoginForm`)
- **Variables/Functions**: camelCase (e.g., `getUserData`, `handleSubmit`)

### Component Rules

1. **Use shadcn/ui components** - Never recreate base components with raw HTML/CSS
2. **Keep components small** - Maximum 300 lines; break into smaller components
3. **Maximum 6 props** - Use composition or options objects for more props
4. **No memoization** - Avoid `useMemo`, `React.memo`, `useCallback` unless profiling shows a need

### Data Fetching

- **Use TanStack Query** - Never use `useEffect` for API calls
- **API layer** - Organize by feature in `src/api/[feature]/`
- **Queries & Mutations** - Separate into `queries/` and `mutations/` directories

### Styling

- **Tailwind CSS** - Use utility classes, mobile-first approach
- **Responsive breakpoints**: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- **Don't modify base components** - Only adjust layout/spacing, not colors/borders

### Accessibility

- Use semantic HTML (`<button>`, `<nav>`, `<main>`, etc.)
- Add `aria-label` to icon-only buttons
- Ensure keyboard navigation works
- Maintain visible focus indicators

## 🗂️ Path Aliases

The project uses path aliases for cleaner imports:

```tsx
// Instead of
import { Button } from "../../../components/ui/button"

// Use
import { Button } from "@/components/ui/button"
```

Configured in `vite.config.ts` and `tsconfig.json`.

## 🔧 Configuration Files

- **`vite.config.ts`** - Vite configuration
- **`tsconfig.json`** - TypeScript configuration
- **`biome.jsonc`** - Biome linting/formatting configuration
- **`eslint.config.js`** - ESLint configuration
- **`.husky/`** - Git hooks configuration

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [React Router Documentation](https://reactrouter.com)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Vitest Documentation](https://vitest.dev)


