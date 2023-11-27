import { parseResponseError } from "@/apis/error";
import { Printer } from "@/apis/openapi";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { FC, useState } from "react";
import { PrinterForm } from "./PrinterForm";

export const EditPrinter: FC<{ printer: Printer }> = ({ printer }) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: printerApi.updatePrinter,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["printers"],
      });
      toast({
        title: "Printer updated",
        description: "Printer has been updated successfully.",
      });
      setOpen(false);
    },
    onError(error) {
      parseResponseError(error).then((error) => {
        toast({
          title: "Could not update printer",
          description: error.message,
          variant: "destructive",
        });
      });
    },
  });

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="secondary" size="icon">
            <Pencil className="w-4 h-4" />
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-[425px]">
          <SheetHeader className="mb-4">
            <SheetTitle>Update Printer</SheetTitle>
            <SheetDescription>
              {printer.brand_name} {printer.model_name} ({printer.location})
            </SheetDescription>
          </SheetHeader>
          <PrinterForm
            onSubmit={(values) => {
              mutation.mutate({ ...values, id: printer.id });
            }}
            submitLabel="Update"
            disabled={mutation.isPending}
            initialValues={{
              ...printer,
              brand_name: printer.brand_name ?? "",
              model_name: printer.model_name ?? "",
              location: printer.location ?? "",
              image_url: printer.image_url ?? "",
            }}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};
