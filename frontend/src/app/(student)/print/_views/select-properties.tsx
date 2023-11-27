import { parseResponseError } from "@/apis/error";
import {
  Printer,
  PrinterCapabilitiesEnum,
  PrinterJobOrientationEnum,
  UserFile,
} from "@/apis/openapi";
import { printerApi } from "@/apis/printer";
import { printerJobApi } from "@/apis/printer-job";
import { userFileApi } from "@/apis/user-file";
import { UserFileCard } from "@/app/(student)/files/_components/FileCard";
import { PrinterCard } from "@/app/(student)/printers/_components/PrinterCard";
import { ErrorPage } from "@/components/pages/error-page";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  page_size: z.string().min(1, {
    message: "Page size must be selected",
  }),
  double_side: z.boolean(),
  orientation: z.nativeEnum(PrinterJobOrientationEnum),
  color: z.boolean(),
});

const SelectPropertiesForm: FC<{
  printer: Printer;
  file: UserFile;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  disabled?: boolean;
}> = ({ printer, file, onSubmit, disabled }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      page_size: printer.paper_sizes[0],
      orientation: PrinterJobOrientationEnum.Portrait,
      double_side: false,
      color: false,
    },
    disabled,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex gap-4 flex-col"
      >
        <FormField
          control={form.control}
          name="page_size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paper Size</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={disabled}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select paper size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {printer.paper_sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="orientation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Orientation</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={disabled}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select orientation" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={PrinterJobOrientationEnum.Portrait}>
                      Portrait
                    </SelectItem>
                    <SelectItem value={PrinterJobOrientationEnum.Landscape}>
                      Landscape
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="double_side"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Print Side</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value === "true")}
                  defaultValue={String(field.value)}
                  disabled={disabled}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select printing side" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={String(false)}>Single-sided</SelectItem>
                    <SelectItem
                      value={String(true)}
                      disabled={
                        !printer.capabilities.includes(
                          PrinterCapabilitiesEnum.DoubleSided,
                        )
                      }
                    >
                      Double-sided
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value === "true")}
                  value={String(field.value)}
                  disabled={disabled}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={String(false)}>Black & White</SelectItem>
                    <SelectItem
                      value={String(true)}
                      disabled={
                        !printer.capabilities.includes(
                          PrinterCapabilitiesEnum.Color,
                        )
                      }
                    >
                      Color
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator className="my-4" />
        <Button type="submit" disabled={disabled}>
          Print
        </Button>
      </form>
    </Form>
  );
};

export const SelectProperties: FC<{
  printer_id: number;
  file_id: number;
  setStep: (step: string) => void;
  setIsSuccess: (isSuccess: boolean) => void;
}> = ({ printer_id, file_id, setStep, setIsSuccess }) => {
  const { data: dataPrinter, error: errorPrinter } = useQuery({
    queryKey: ["printers", printer_id],
    queryFn: () => printerApi.getPrinter(printer_id),
  });
  const { data: dataFile, error: errorFile } = useQuery({
    queryKey: ["user-files", file_id],
    queryFn: () => userFileApi.getUserFile(file_id),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: printerJobApi.createPrinterJob,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["printer-jobs"],
      });

      toast({
        title: "Print job created",
        description: "Your print job has been created",
      });

      setIsSuccess(true);
    },
    onError: (error) => {
      parseResponseError(error).then((error) => {
        toast({
          title: "Could not create print job",
          description: error.message,
          variant: "destructive",
        });
      });
    },
  });

  if (errorPrinter) {
    return (
      <ErrorPage
        title="Could not load printer"
        message={errorPrinter.message}
      />
    );
  }
  if (errorFile) {
    return (
      <ErrorPage title="Could not load file" message={errorFile.message} />
    );
  }

  const printer = dataPrinter?.printer;
  const file = dataFile?.file;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate({
      ...values,
      file_id: file_id,
      printer_id: printer_id,
      page_count: 1,
    });
  };

  if (!printer || !file) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PrinterCard
          printer={printer}
          horizontal
          footer={
            <Button
              variant="link"
              className="w-full"
              onClick={() => setStep("select-printer")}
            >
              Select another printer
            </Button>
          }
        />
        <UserFileCard
          userFile={file}
          horizontal
          footer={
            <Button
              variant="link"
              className="w-full"
              onClick={() => setStep("select-file")}
            >
              Select another file
            </Button>
          }
        />
      </div>
      <Alert>
        <AlertTitle>Select printing properties</AlertTitle>
        <AlertDescription>
          Select how you would like to print your file
        </AlertDescription>
      </Alert>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <SelectPropertiesForm
          printer={printer}
          file={file}
          onSubmit={onSubmit}
          disabled={mutation.isPending}
        />
      </div>
    </div>
  );
};
