import { FileDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type ConvertButtonProps = {
  onClick: () => void;
  disabled: boolean;
  isConverting: boolean;
};

export function ConvertButton({
  onClick,
  disabled,
  isConverting,
}: ConvertButtonProps) {
  return (
    <Button className="gap-2" disabled={disabled} onClick={onClick} size="lg">
      {isConverting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Converting...
        </>
      ) : (
        <>
          <FileDown className="h-4 w-4" />
          Convert to PDF
        </>
      )}
    </Button>
  );
}
