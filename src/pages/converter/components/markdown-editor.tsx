import { Textarea } from "@/components/ui/textarea";

type MarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  return (
    <div className="h-full">
      <Textarea
        className="h-full min-h-[600px] resize-none font-mono text-sm leading-relaxed"
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your markdown here..."
        value={value}
      />
    </div>
  );
}
