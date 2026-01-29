import { Header } from "@/components/header/header";
import { Converter } from "@/pages/converter/converter";

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <Header />
        <Converter />
      </main>
    </div>
  );
}
