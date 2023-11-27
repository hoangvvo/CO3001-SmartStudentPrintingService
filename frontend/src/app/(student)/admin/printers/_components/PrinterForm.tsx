import { PrinterCapabilitiesEnum } from "@/apis/openapi";
import {
  CAPABILITIES_LABELS,
  PAPER_SIZES,
} from "@/app/(student)/printers/_components/constants";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  brand_name: z.string().min(1, {
    message: "Brand name cannot be empty",
  }),
  model_name: z.string().min(1, {
    message: "Model name cannot be empty",
  }),
  capabilities: z.array(z.nativeEnum(PrinterCapabilitiesEnum)).min(1, {
    message: "Must have at least one capability",
  }),
  location: z.string().min(1, {
    message: "Location cannot be empty",
  }),
  printer_address: z.string().ip({
    message: "Invalid printer address",
  }),
  is_enabled: z.boolean(),
  paper_sizes: z.array(z.string()).min(1, {
    message: "Must have at least one paper size",
  }),
  paper_count: z.coerce.number().nonnegative({
    message: "Paper count must be non-negative",
  }),
  image_url: z.string(),
});

export const PrinterForm: FC<{
  initialValues?: z.infer<typeof formSchema>;
  disabled?: boolean;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  submitLabel: string;
}> = ({ initialValues, onSubmit, disabled, submitLabel }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      brand_name: "",
      model_name: "",
      capabilities: [],
      location: "",
      printer_address: "",
      is_enabled: true,
      paper_count: 0,
      paper_sizes: [],
      image_url: "",
    },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name === "brand_name") {
        if (value.brand_name?.toLowerCase().includes("epson")) {
          form.setValue(
            "image_url",
            "/assets/printers/Epson-SureColor-P700_20231101-052726_full.jpeg",
          );
        }
        if (value.brand_name?.toLowerCase().includes("brother")) {
          form.setValue(
            "image_url",
            "/assets/printers/Brother-HL-L2350DW_20180709-141909_full.jpeg",
          );
        }
        if (value.brand_name?.toLowerCase().includes("hp")) {
          form.setValue(
            "image_url",
            "/assets/printers/HP-OfficeJet-Pro-9015_20191010-140142_full.jpeg",
          );
        }
        if (value.brand_name?.toLowerCase().includes("canon")) {
          form.setValue("image_url", "/assets/printers/Canon-PixmaG570.png");
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex gap-4 flex-col"
      >
        <FormField
          control={form.control}
          name="is_enabled"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Enabled</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="printer_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Printer Address</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Printer IP Address" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="brand_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Epson" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="model_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="XP-4100" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="capabilities"
          render={({ field }) => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">
                  Printer Capabilities
                </FormLabel>
                <FormDescription>
                  Specify what this printer can do
                </FormDescription>
              </div>
              <div className="flex flex-gap gap-4 flex-wrap">
                {Object.values(PrinterCapabilitiesEnum).map((capability) => (
                  <FormField
                    key={capability}
                    control={form.control}
                    name="capabilities"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={capability}
                          className="flex flex-row items-center space-x-2 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(capability)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, capability])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== capability,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {CAPABILITIES_LABELS[capability]}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paper_sizes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paper Sizes</FormLabel>
              <div className="flex flex-gap gap-4 flex-wrap">
                {PAPER_SIZES.map((paperSize) => (
                  <FormField
                    key={paperSize}
                    control={form.control}
                    name="paper_sizes"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={paperSize}
                          className="flex flex-row items-center space-x-2 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(paperSize)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, paperSize])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== paperSize,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {paperSize}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paper_count"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paper Count</FormLabel>
              <FormControl>
                <Input {...field} type="number" placeholder="100" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} placeholder="B4 404" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-4" disabled={disabled}>
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
};
