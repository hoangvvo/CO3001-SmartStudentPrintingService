"use client";

import { printerJobApi } from "@/apis/printer-job";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader } from "@/components/views/page-header";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Link from "next/link";

export default function HistoryPage() {
  const { data } = useQuery({
    queryKey: ["print-jobs"],
    queryFn: printerJobApi.listPrinterJobs,
  });

  return (
    <div className="container">
      <PageHeader
        title="History"
        subtitle="Your print history and ongoing print jobs"
      />
      <div className="flex flex-col gap-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>File Name</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>Printer</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.printer_jobs.map((printerJob) => (
              <TableRow key={printerJob.id}>
                <TableCell>{printerJob.id}</TableCell>
                <TableCell>
                  <Link
                    href={`/files/${printerJob.user_file?.id}`}
                    className="text-primary underline"
                  >
                    {printerJob.user_file?.file_name}
                  </Link>
                </TableCell>
                <TableCell>
                  {format(printerJob.start_time, "dd MMM yyyy HH:mm")}
                </TableCell>
                <TableCell>
                  {printerJob.printer?.brand_name}{" "}
                  {printerJob.printer?.model_name} (
                  {printerJob.printer?.location})
                </TableCell>
                <TableCell className="capitalize text-primary">
                  {printerJob.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
