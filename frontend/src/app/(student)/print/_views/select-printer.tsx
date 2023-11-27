import { printerApi } from "@/apis/printer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { PrinterCard } from "../../printers/_components/PrinterCard";

export const SelectPrinter: FC<{
  onSelected: (printerId: number) => void;
  selectedPrinterId?: number;
}> = ({ onSelected, selectedPrinterId }) => {
  const { data } = useQuery({
    queryKey: ["printers"],
    queryFn: printerApi.listPrinters,
  });

  return (
    <div className="flex flex-col gap-4">
      <Alert>
        <AlertTitle>Select printer</AlertTitle>
        <AlertDescription>
          Select an available printer to print your documents
        </AlertDescription>
      </Alert>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data?.printers.map((printer) => (
          <PrinterCard
            key={printer.id}
            printer={printer}
            footer={
              printer.paper_count <= 0 ? (
                <Button variant="outline" className="w-full" disabled>
                  No Paper
                </Button>
              ) : selectedPrinterId === printer.id ? (
                <Button
                  variant="link"
                  className="w-full"
                  onClick={() => onSelected(printer.id)}
                >
                  Selected
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => onSelected(printer.id)}
                >
                  Select
                </Button>
              )
            }
          />
        ))}
      </div>
    </div>
  );
};
