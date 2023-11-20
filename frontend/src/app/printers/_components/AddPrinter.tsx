import { parseResponseError } from "@/apis/error";
import { printerApi } from "@/apis/printer";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { FC, useState } from "react";
import { PrinterForm } from "./PrinterForm";

export const AddPrinter: FC = () => {
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: printerApi.createPrinter,
    onSuccess() {
      toast({
        title: "Printer added",
        description: "Printer has been added successfully.",
      });
      setOpen(false);
    },
    onError(error) {
      parseResponseError(error).then((error) => {
        toast({
          title: "Could not add printer",
          description: error.message,
          variant: "destructive",
        });
      });
    },
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Add Printer</Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[425px]">
        <SheetHeader className="mb-4">
          <SheetTitle>Add Printer</SheetTitle>
          <SheetDescription>
            Add new printer to Student Smart Printing Service
          </SheetDescription>
        </SheetHeader>
        <PrinterForm
          onSubmit={mutation.mutate}
          submitLabel="Add"
          disabled={mutation.isPending}
        />
      </SheetContent>
    </Sheet>
  );
};
