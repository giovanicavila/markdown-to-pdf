import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { createElement } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Apply styles to heading elements
 */
function styleHeading(htmlEl: HTMLElement, tagName: string) {
  if (tagName === "h1") {
    htmlEl.style.fontSize = "2em";
    htmlEl.style.fontWeight = "bold";
    htmlEl.style.marginTop = "1em";
    htmlEl.style.marginBottom = "0.5em";
  } else if (tagName === "h2") {
    htmlEl.style.fontSize = "1.5em";
    htmlEl.style.fontWeight = "bold";
    htmlEl.style.marginTop = "0.8em";
    htmlEl.style.marginBottom = "0.4em";
  } else if (tagName === "h3") {
    htmlEl.style.fontSize = "1.25em";
    htmlEl.style.fontWeight = "bold";
    htmlEl.style.marginTop = "0.6em";
    htmlEl.style.marginBottom = "0.3em";
  } else if (tagName === "h4") {
    htmlEl.style.fontSize = "1.1em";
    htmlEl.style.fontWeight = "bold";
    htmlEl.style.marginTop = "0.5em";
    htmlEl.style.marginBottom = "0.25em";
  }
}

/**
 * Apply styles to specific element types
 */
function styleElement(htmlEl: HTMLElement, tagName: string) {
  if (tagName === "p") {
    htmlEl.style.marginTop = "0";
    htmlEl.style.marginBottom = "1em";
  } else if (tagName === "ul" || tagName === "ol") {
    htmlEl.style.marginTop = "0";
    htmlEl.style.marginBottom = "1em";
    htmlEl.style.paddingLeft = "2em";
  } else if (tagName === "li") {
    htmlEl.style.marginBottom = "0.5em";
  } else if (tagName === "code") {
    htmlEl.style.backgroundColor = "rgb(243, 244, 246)";
    htmlEl.style.padding = "0.125em 0.25em";
    htmlEl.style.borderRadius = "0.25em";
    htmlEl.style.fontFamily = "monospace";
    htmlEl.style.fontSize = "0.9em";
  } else if (tagName === "pre") {
    htmlEl.style.backgroundColor = "rgb(243, 244, 246)";
    htmlEl.style.padding = "1em";
    htmlEl.style.borderRadius = "0.5em";
    htmlEl.style.overflowX = "auto";
    htmlEl.style.marginTop = "0";
    htmlEl.style.marginBottom = "1em";
  } else if (tagName === "blockquote") {
    htmlEl.style.borderLeft = "4px solid rgb(156, 163, 175)";
    htmlEl.style.paddingLeft = "1em";
    htmlEl.style.fontStyle = "italic";
    htmlEl.style.marginTop = "1em";
    htmlEl.style.marginBottom = "1em";
  } else if (tagName === "a") {
    htmlEl.style.color = "rgb(59, 130, 246)";
    htmlEl.style.textDecoration = "underline";
  } else if (tagName === "img") {
    htmlEl.style.maxWidth = "100%";
    htmlEl.style.height = "auto";
    htmlEl.style.borderRadius = "0.5em";
    htmlEl.style.marginTop = "1em";
    htmlEl.style.marginBottom = "1em";
  } else if (tagName === "hr") {
    htmlEl.style.borderTop = "1px solid rgb(229, 231, 235)";
    htmlEl.style.marginTop = "2em";
    htmlEl.style.marginBottom = "2em";
  } else if (tagName === "table") {
    htmlEl.style.width = "100%";
    htmlEl.style.borderCollapse = "collapse";
    htmlEl.style.marginBottom = "1em";
  } else if (tagName === "th") {
    htmlEl.style.border = "1px solid rgb(229, 231, 235)";
    htmlEl.style.padding = "0.5em";
    htmlEl.style.backgroundColor = "rgb(243, 244, 246)";
    htmlEl.style.fontWeight = "bold";
    htmlEl.style.textAlign = "left";
  } else if (tagName === "td") {
    htmlEl.style.border = "1px solid rgb(229, 231, 235)";
    htmlEl.style.padding = "0.5em";
  } else if (tagName === "strong") {
    htmlEl.style.fontWeight = "bold";
  } else if (tagName === "em") {
    htmlEl.style.fontStyle = "italic";
  }
}

/**
 * Apply explicit RGB/hex styles to all elements to avoid oklch color issues
 */
function applyPdfStyles(element: HTMLElement) {
  // Apply styles to the root element
  element.style.color = "rgb(0, 0, 0)";
  element.style.backgroundColor = "rgb(255, 255, 255)";

  // Apply styles to all child elements
  const allElements = element.querySelectorAll("*");
  for (const el of allElements) {
    const htmlEl = el as HTMLElement;
    const tagName = htmlEl.tagName.toLowerCase();

    // Reset any CSS variables that might use oklch
    htmlEl.style.color = "rgb(0, 0, 0)";
    htmlEl.style.backgroundColor = "transparent";

    // Style headings
    if (tagName.startsWith("h")) {
      styleHeading(htmlEl, tagName);
    }

    // Style other elements
    styleElement(htmlEl, tagName);
  }
}

export async function convertMarkdownToPdf(markdown: string): Promise<void> {
  // Create an iframe to completely isolate from page CSS (avoids oklch issues)
  const iframe = document.createElement("iframe");
  iframe.style.position = "absolute";
  iframe.style.left = "-9999px";
  iframe.style.top = "0";
  iframe.style.width = "210mm";
  iframe.style.height = "297mm";
  iframe.style.border = "none";
  iframe.style.visibility = "hidden";
  document.body.appendChild(iframe);

  // Wait for iframe to load
  const iframeDoc = await new Promise<Document>((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("Iframe failed to load. Please try again."));
    }, 5000);

    iframe.onload = () => {
      clearTimeout(timeout);
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        resolve(doc);
      } else {
        reject(new Error("Failed to access iframe document"));
      }
    };
    iframe.onerror = () => {
      clearTimeout(timeout);
      reject(new Error("Failed to create iframe"));
    };
    iframe.src = "about:blank";
  });

  // Create a temporary container in the isolated iframe
  const tempDiv = iframeDoc.createElement("div");
  tempDiv.style.width = "210mm"; // A4 width
  tempDiv.style.padding = "20mm";
  tempDiv.style.fontFamily = "system-ui, -apple-system, sans-serif";
  tempDiv.style.fontSize = "14px";
  tempDiv.style.lineHeight = "1.6";
  tempDiv.style.color = "rgb(0, 0, 0)";
  tempDiv.style.backgroundColor = "rgb(255, 255, 255)";
  tempDiv.style.maxWidth = "none";
  tempDiv.style.boxSizing = "border-box";

  // Render markdown to HTML using React
  const ReactDOM = await import("react-dom/client");
  const container = document.createElement("div");
  const root = ReactDOM.createRoot(container);

  await new Promise<void>((resolve) => {
    root.render(
      createElement(
        ReactMarkdown,
        {
          remarkPlugins: [remarkGfm],
        },
        markdown
      )
    );
    // Give React time to render
    setTimeout(() => {
      tempDiv.innerHTML = container.innerHTML;
      iframeDoc.body.appendChild(tempDiv);

      // Apply explicit styles to all elements to avoid oklch colors
      applyPdfStyles(tempDiv);

      resolve();
    }, 100);
  });

  // Wait for images to load
  const images = tempDiv.querySelectorAll("img");
  await Promise.all(
    Array.from(images).map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
          } else {
            img.onload = () => resolve();
            img.onerror = () => resolve();
            // Timeout after 5 seconds
            setTimeout(() => resolve(), 5000);
          }
        })
    )
  );

  // Convert to canvas - html2canvas can work with elements in iframes
  let canvas: HTMLCanvasElement;
  try {
    canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      foreignObjectRendering: true,
    });
  } catch (error) {
    root.unmount();
    document.body.removeChild(iframe);
    throw new Error(
      error instanceof Error
        ? `Failed to capture content: ${error.message}`
        : "Failed to capture content for PDF generation"
    );
  }

  // Clean up
  root.unmount();
  document.body.removeChild(iframe);

  // Create PDF
  try {
    const imgData = canvas.toDataURL("image/png");
    if (!imgData || imgData === "data:,") {
      throw new Error("Failed to generate image data from canvas");
    }

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Download PDF
    pdf.save("markdown-converted.pdf");
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? `Failed to create PDF: ${error.message}`
        : "Failed to create PDF file"
    );
  }
}
