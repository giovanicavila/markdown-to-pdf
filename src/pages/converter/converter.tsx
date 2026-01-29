import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/components/animate/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConvertButton } from "./components/convert-button";
import { MarkdownEditor } from "./components/markdown-editor";
import { MarkdownPreview } from "./components/markdown-preview";
import { useMarkdownConverter } from "./hooks/use-markdown-converter";

export function Converter() {
  const { markdown, setMarkdown, isConverting, handleConvert } =
    useMarkdownConverter();

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="space-y-4 border-b pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="font-bold text-2xl">
                Markdown Editor
              </CardTitle>
              <p className="mt-1 text-muted-foreground text-sm">
                Write your markdown and convert it to PDF
              </p>
            </div>
            <ConvertButton
              disabled={isConverting || !markdown.trim()}
              isConverting={isConverting}
              onClick={handleConvert}
            />
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs className="w-full" defaultValue="editor">
            <TabsList className="relative grid w-full grid-cols-2">
              <TabsTrigger className="font-medium text-sm" value="editor">
                Editor
              </TabsTrigger>
              <TabsTrigger className="font-medium text-sm" value="preview">
                Preview
              </TabsTrigger>
            </TabsList>
            <TabsContents className="mt-6">
              <TabsContent value="editor">
                <MarkdownEditor onChange={setMarkdown} value={markdown} />
              </TabsContent>
              <TabsContent value="preview">
                <MarkdownPreview markdown={markdown} />
              </TabsContent>
            </TabsContents>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
