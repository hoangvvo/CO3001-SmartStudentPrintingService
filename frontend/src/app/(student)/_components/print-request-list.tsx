import { PrinterJobStatusEnum } from "@/apis/openapi";
import { printerJobApi } from "@/apis/printer-job";
import { buttonVariants } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Link from "next/link";
import { FC } from "react";

export const PrintRequestList: FC = () => {
  const { data } = useQuery({
    queryKey: ["print-jobs"],
    queryFn: printerJobApi.listPrinterJobs,
  });

  const ongoingPrinterJobs = data?.printer_jobs.filter(
    (printerJob) => printerJob.status !== PrinterJobStatusEnum.Completed,
  );

  return (
    <div className="space-y-8">
      {ongoingPrinterJobs?.map((printerJob) => (
        <Link
          href={`/history/${printerJob.id}`}
          className="flex items-center hover:opacity-50 transition-opacity"
          key={printerJob.id}
        >
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {printerJob.user_file?.file_name}
            </p>
            <p className="text-sm text-muted-foreground">
              {format(printerJob.start_time, "dd MMM yyyy HH:mm")}
            </p>
          </div>
          <div className="ml-auto font-medium text-sm capitalize text-primary flex items-center gap-2">
            {printerJob.status}
          </div>
        </Link>
      ))}
      {!ongoingPrinterJobs?.length && (
        <div className="flex flex-1 flex-col items-center justify-center space-y-4 py-8">
          <p className="text-muted-foreground">
            You have no ongoing print requests
          </p>
          <Link
            href="/print"
            className={buttonVariants({
              variant: "link",
            })}
          >
            Start Printing
          </Link>
        </div>
      )}
    </div>
  );
};
