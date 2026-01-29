import { Toaster } from "@/components/ui/sonner";
import { MainLayout } from "@/layout/main-layout";
import { Converter } from "@/pages/converter/converter";

function App() {
  return (
    <MainLayout>
      <Converter />
      <Toaster />
    </MainLayout>
  );
}

export default App;
