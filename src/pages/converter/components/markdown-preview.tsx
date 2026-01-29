import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ScrollArea } from "@/components/ui/scroll-area";

type MarkdownPreviewProps = {
  markdown: string;
};

export function MarkdownPreview({ markdown }: MarkdownPreviewProps) {
  return (
    <ScrollArea className="h-[600px] w-full rounded-md border bg-card">
      <div className="p-6">
        <div className="prose prose-sm dark:prose-invert max-w-none prose-blockquote:border-l-primary prose-pre:bg-muted prose-headings:font-semibold prose-code:text-foreground prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </div>
      </div>
    </ScrollArea>
  );
}
