import { PrinterCapabilitiesEnum } from "@/apis/openapi";
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
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  brand_name: z.string(),
  model_name: z.string(),
  capabilities: z.array(z.nativeEnum(PrinterCapabilitiesEnum)),
  location: z.string(),
  printer_address: z.string().ip({
    message: "Invalid printer address",
  }),
  is_enabled: z.boolean(),
});

export const PrinterForm: FC<{
  initialValues?: z.infer<typeof formSchema>;
  disabled?: boolean;
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
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
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex gap-2 flex-col"
      >
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
                  Select the capabilities of this printer.
                </FormDescription>
              </div>
              {Object.values(PrinterCapabilitiesEnum).map((capability) => (
                <FormField
                  key={capability}
                  control={form.control}
                  name="capabilities"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={capability}
                        className="flex flex-row items-start space-x-3 space-y-0"
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
                          {capability}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
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
          name="is_enabled"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled
                  aria-readonly
                />
              </FormControl>
              <FormLabel>Enabled</FormLabel>
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
