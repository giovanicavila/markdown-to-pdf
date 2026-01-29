import { ModeToggle } from "@/components/theme-toggle/theme-toggle";

export function Header() {
  return (
    <header className="mb-8 flex items-center justify-between border-transparent border-b pb-6">
      <div>
        <h1 className="font-bold text-3xl tracking-tight">Markdown to PDF</h1>
        <p className="mt-2 text-muted-foreground text-sm">
          Convert your markdown documents to beautiful PDF files
        </p>
      </div>
      <ModeToggle />
    </header>
  );
}
