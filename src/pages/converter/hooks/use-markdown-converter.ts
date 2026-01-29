import { useState } from "react";
import { toast } from "sonner";
import { convertMarkdownToPdf } from "../utils/pdf-converter";

const defaultMarkdown = `# Welcome to Markdown to PDF Converter

This is a **modern** and *beautiful* converter that transforms your markdown text into PDF files.

## Features

- 📝 Write markdown in the editor
- 👁️ Preview your markdown in real-time
- 📄 Convert to PDF with one click
- 🌓 Dark and light theme support

## Getting Started

1. Type or paste your markdown in the editor
2. Preview it in the preview tab
3. Click "Convert to PDF" to download

## Markdown Syntax

### Headers

\`\`\`markdown
# H1
## H2
### H3
\`\`\`

### Lists

- Item 1
- Item 2
  - Nested item

### Code

\`\`\`javascript
const hello = "world"
\`\`\`

### Links

[Visit GitHub](https://github.com)

---

Enjoy converting your markdown to PDF! 🎉
`;

export function useMarkdownConverter() {
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [isConverting, setIsConverting] = useState(false);

  const handleConvert = async () => {
    if (!markdown.trim()) {
      toast.error("Empty markdown", {
        description: "Please enter some markdown text before converting.",
      });
      return;
    }

    setIsConverting(true);

    const toastId = toast.loading("Converting markdown to PDF...", {
      description: "This may take a few seconds",
    });

    try {
      await convertMarkdownToPdf(markdown);
      toast.success("PDF generated successfully!", {
        id: toastId,
        description: "Your PDF file has been downloaded.",
      });
    } catch (error) {
      console.error("Error converting to PDF:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to convert markdown to PDF. Please try again.";
      toast.error("Conversion failed", {
        id: toastId,
        description: errorMessage,
      });
    } finally {
      setIsConverting(false);
    }
  };

  return {
    markdown,
    setMarkdown,
    isConverting,
    handleConvert,
  };
}
