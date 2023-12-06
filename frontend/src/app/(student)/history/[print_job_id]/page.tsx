"use client";

import { printerJobApi } from "@/apis/printer-job";
import { ErrorPage } from "@/components/pages/error-page";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/views/page-header";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Printer, Trash } from "lucide-react";
import Link from "next/link";

export default function PrintJobPage({
  params,
}: {
  params: {
    print_job_id: string;
  };
}) {
  const { data, error, isPending } = useQuery({
    queryKey: ["print-jobs", params.print_job_id],
    queryFn: () => printerJobApi.getPrinterJob(Number(params.print_job_id)),
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <ErrorPage title="Could not load job" message={error.message} />;
  }

  const printerJob = data.printer_job;

  if (!printerJob) return null;

  return (
    <div className="container">
      <PageHeader
        title={`#${printerJob.id}: ${printerJob.user_file?.file_name}`}
        subtitle={printerJob.status.toUpperCase()}
      />
      <div className="flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
          <div className="flex flex-col justify-center items-start gap-4 px-4">
            <h2 className="text-secondary-foreground font-bold">File</h2>
            <Link
              className="text-lg text-primary"
              href={`/files/${printerJob.file_id}`}
            >
              {printerJob.user_file?.file_name}
            </Link>
          </div>
          <div className="flex flex-col justify-center items-start gap-4 px-4">
            <h2 className="text-secondary-foreground font-bold">Printer</h2>
            <p className="text-lg">
              {printerJob.printer?.brand_name} {printerJob.printer?.model_name}{" "}
              ({printerJob.printer?.location})
            </p>
          </div>
          <div className="flex flex-col justify-center items-start gap-4 px-4">
            <h2 className="text-secondary-foreground font-bold">Page Size</h2>
            <p className="text-lg">{printerJob.page_size}</p>
          </div>
          <div className="flex flex-col justify-center items-start gap-4 px-4">
            <h2 className="text-secondary-foreground font-bold">Page Count</h2>
            <p className="text-lg">{printerJob.page_count}</p>
          </div>
          <div className="flex flex-col justify-center items-start gap-4 px-4">
            <h2 className="text-secondary-foreground font-bold">Side</h2>
            <p className="text-lg">
              {printerJob.double_side ? "Double-sided" : "Single-sided"}
            </p>
          </div>
          <div className="flex flex-col justify-center items-start gap-4 px-4">
            <h2 className="text-secondary-foreground font-bold">Color</h2>
            <p className="text-lg">
              {printerJob.color ? "Color" : "Black and white"}
            </p>
          </div>
          <div className="flex flex-col justify-center items-start gap-4 px-4">
            <h2 className="text-secondary-foreground font-bold">Orientation</h2>
            <p className="text-lg capitalize">{printerJob.orientation}</p>
          </div>
          <div className="flex flex-col justify-center items-start gap-4 px-4">
            <h2 className="text-secondary-foreground font-bold">Start on</h2>
            <p className="text-lg">
              {format(printerJob.start_time, "dd MMM yyyy HH:mm")}
            </p>
          </div>
          <div className="flex flex-col justify-center items-start gap-4 px-4">
            <h2 className="text-secondary-foreground font-bold">Finish on</h2>
            <p className="text-lg">
              {printerJob.end_time
                ? format(printerJob.end_time, "dd MMM yyyy HH:mm")
                : "-"}
            </p>
          </div>
        </div>
        <Separator />
        <div className="flex gap-4">
          <Link
            href={`/print?file_id=${printerJob.file_id}`}
            className={buttonVariants({
              variant: "secondary",
            })}
          >
            <Printer className="w-4 h-4 mr-2" /> Print again
          </Link>
          <Button variant="destructive">
            <Trash className="w-4 h-4 mr-2" /> Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
