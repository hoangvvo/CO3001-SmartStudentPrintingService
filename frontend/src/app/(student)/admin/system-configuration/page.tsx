"use client";

import { parseResponseError } from "@/apis/error";
import { systemConfigurationApi } from "@/apis/system-configration";
import { ErrorPage } from "@/components/pages/error-page";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { PageHeader } from "@/components/views/page-header";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  default_page_balance: z.coerce
    .number()
    .int({
      message: "Default page balance must be an integer",
    })
    .nonnegative({
      message: "Default page balance must be non-negative",
    }),
  max_file_size: z.coerce
    .number()
    .int({
      message: "Max file size must be an integer",
    })
    .nonnegative({
      message: "Max file size must be non-negative",
    }),
  permitted_file_types: z.array(z.string()).min(1, {
    message: "Must have at least one permitted file type",
  }),
  cron_of_default_page_balance_grant: z.string(),
});

const ConfigrationForm: FC<{
  defaultValues?: z.infer<typeof formSchema>;
  disabled?: boolean;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}> = ({ defaultValues, onSubmit, disabled }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="default_page_balance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Default Page Balance</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Default Page Balance"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          disabled={disabled}
        />
        <FormField
          control={form.control}
          name="cron_of_default_page_balance_grant"
          render={({ field }) => {
            const cronParts = field.value.split(" ");
            const cronTime = `${cronParts[1]}:${cronParts[0]}`;

            return (
              <FormItem>
                <FormLabel>Date to grant default page balance</FormLabel>
                <FormDescription>
                  On this date, the default page balance will be granted to all
                  students
                </FormDescription>
                <div className="flex gap-2">
                  <div className="flex flex-col gap-1 items-center">
                    <Input
                      type="number"
                      placeholder="Day"
                      value={cronParts[3] === "*" ? "" : cronParts[3]}
                      onChange={(e) => {
                        const cronParts = field.value.split(" ");
                        cronParts[3] = e.target.value.trim() || "*";
                        field.onChange(cronParts.join(" "));
                      }}
                      className="w-24"
                      min={1}
                      max={31}
                    />
                    <span className="text-sm text-muted-foreground">Day</span>
                  </div>
                  <div className="flex flex-col gap-1 items-center">
                    <Input
                      type="number"
                      placeholder="Month"
                      value={cronParts[4] === "*" ? "" : cronParts[4]}
                      onChange={(e) => {
                        const cronParts = field.value.split(" ");
                        cronParts[4] = e.target.value.trim() || "*";
                        field.onChange(cronParts.join(" "));
                      }}
                      className="w-24"
                      min={1}
                      max={12}
                    />
                    <span className="text-sm text-muted-foreground">Month</span>
                  </div>
                  <FormControl>
                    <div className="flex flex-col gap-1 items-center">
                      <Input
                        type="time"
                        placeholder="Date to grant default page balance"
                        className="w-24"
                        value={cronTime}
                        onChange={(e) => {
                          const cronParts = field.value.split(" ");
                          cronParts[0] = e.target.value.split(":")[1];
                          cronParts[1] = e.target.value.split(":")[0];
                          field.onChange(cronParts.join(" "));
                        }}
                      />
                      <span className="text-sm text-muted-foreground">
                        Time
                      </span>
                    </div>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            );
          }}
          disabled={disabled}
        />
        <FormField
          control={form.control}
          name="max_file_size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max File Size (in bytes)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Max File Size" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          disabled={disabled}
        />
        <FormField
          control={form.control}
          name="permitted_file_types"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Permitted File Types</FormLabel>
              <FormDescription>
                Enter allow MIME types separated by commas
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder="Permitted File Types"
                  defaultValue={field.value.join(", ")}
                  onChange={(e) => {
                    field.onChange(
                      e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    );
                  }}
                  onBlur={(e) => {
                    // resync the value on blur
                    e.target.value = field.value.join(", ");
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          disabled={disabled}
        />
        <Button type="submit" className="w-full mt-4" disabled={disabled}>
          Update
        </Button>
      </form>
    </Form>
  );
};

export default function ConfigurationPage() {
  const { data, error, isPending } = useQuery({
    queryKey: ["system-configuration"],
    queryFn: systemConfigurationApi.getSystemConfiguration,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: systemConfigurationApi.updateSystemConfiguration,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["system-configuration"],
      });
      toast({
        title: "System configuration updated",
        description: "The system configuration has been updated.",
      });
    },
    onError: (err) => {
      parseResponseError(err).then((error) => {
        toast({
          title: "Could not update system configuration",
          description: error.message,
        });
      });
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <ErrorPage
        title="Could not load system configuration"
        message={error.message}
      />
    );
  }

  const systemConfiguration = data?.system_configuration;
  if (!systemConfiguration) {
    return null;
  }

  return (
    <div className="container">
      <PageHeader title="System Configuration" />
      <ConfigrationForm
        defaultValues={systemConfiguration}
        onSubmit={mutation.mutate}
        disabled={mutation.isPending}
      />
    </div>
  );
}
