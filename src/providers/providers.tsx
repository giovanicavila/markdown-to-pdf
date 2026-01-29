import { ThemeProvider } from "@/contexts/theme-provider";
import { MainLayout } from "@/layout/main-layout";

export function Providers() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MainLayout/>
    </ThemeProvider>
  );
}
