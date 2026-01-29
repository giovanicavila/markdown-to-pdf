# Markdown to PDF Converter

A modern web application for converting Markdown text into PDF documents. Built with React and TypeScript, featuring a real-time preview, animated UI components, and seamless PDF generation.

## Overview

This application provides a clean, intuitive interface for writing Markdown content and converting it to PDF format. Users can edit their Markdown in a dedicated editor, preview the rendered output in real-time, and generate professional PDF documents with a single click.

## Features

- Real-time Markdown preview with GitHub Flavored Markdown support
- Split-pane editor and preview interface with animated tab transitions
- One-click PDF conversion with progress indicators
- Dark and light theme support
- Responsive design optimized for desktop and mobile devices
- Toast notifications for user feedback
- Client-side processing with no server required

## Technology Stack

- React 19 with TypeScript
- Vite 7 for build tooling and development
- Tailwind CSS 4 for styling
- shadcn/ui and animate-ui for component library
- html2canvas and jsPDF for PDF generation
- react-markdown for Markdown rendering
- Sonner for toast notifications
- Bun as the package manager

## Prerequisites

- Bun 1.0 or higher
- Node.js 18 or higher (if not using Bun)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd markdown-to-pdf
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `bun run dev` - Start the development server
- `bun run build` - Build for production
- `bun run preview` - Preview the production build locally
- `bun run lint` - Run ESLint
- `bun run test` - Run Vitest tests
- `bun run check` - Run code quality checks with Ultracite
- `bun run fix` - Auto-fix code style issues

## Usage

1. Enter or paste your Markdown content in the Editor tab
2. Switch to the Preview tab to see the rendered output
3. Click "Convert to PDF" to generate and download the PDF file
4. The PDF will be automatically downloaded to your device

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── animate-ui/     # Animated UI components
│   └── ui/             # Base UI components (shadcn/ui)
├── contexts/           # React context providers
│   └── theme-provider.tsx
├── hooks/              # Custom React hooks
├── layout/             # Layout components
├── pages/              # Page components
│   └── converter/      # Main converter page
│       ├── components/ # Converter-specific components
│       ├── hooks/      # Converter hooks
│       └── utils/      # PDF conversion utilities
└── lib/                # Utility functions
```

## Deployment

This project includes a GitHub Actions workflow for automatic deployment to GitHub Pages. The workflow triggers on pushes to the main branch and automatically builds and deploys the application.

To enable GitHub Pages:

1. Navigate to your repository Settings
2. Go to Pages section
3. Select "GitHub Actions" as the source
4. The workflow will deploy automatically on the next push to main

## Development Guidelines

- Use kebab-case for file names
- Keep components under 300 lines
- Maximum 6 props per component
- Use TypeScript for all new code
- Follow the existing project structure
- Write tests for new components and utilities

## License

This project is private and proprietary.
