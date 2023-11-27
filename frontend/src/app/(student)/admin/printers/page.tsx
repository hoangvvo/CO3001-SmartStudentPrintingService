"use client";

import { printerApi } from "@/apis/printer";
import { ErrorPage } from "@/components/pages/error-page";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader } from "@/components/views/page-header";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { CAPABILITIES_LABELS } from "../../printers/_components/constants";
import { AddPrinter } from "./_components/AddPrinter";
import { EditPrinter } from "./_components/EditPrinter";

export default function AdminPrintersPage() {
  const { data, error, isPending } = useQuery({
    queryKey: ["printers"],
    queryFn: printerApi.listPrinters,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <ErrorPage title="Could not load printers" message={error.message} />
    );
  }

  return (
    <div className="container">
      <PageHeader
        title="Printers"
        subtitle="Manage printers in your school"
        actions={<AddPrinter />}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Paper Count</TableCell>
            <TableCell>Features</TableCell>
            <TableCell>Paper Sizes</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.printers.map((printer) => (
            <TableRow key={printer.id}>
              <TableCell>{printer.id}</TableCell>
              <TableCell>{printer.brand_name}</TableCell>
              <TableCell>{printer.model_name}</TableCell>
              <TableCell>{printer.location}</TableCell>
              <TableCell
                className={cn(printer.paper_count <= 0 && "text-destructive")}
              >
                {printer.paper_count}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {printer.capabilities.map((capability) => (
                    <Badge variant="outline" key={capability}>
                      {CAPABILITIES_LABELS[capability]}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {printer.paper_sizes.map((paperSize) => (
                    <Badge variant="outline" key={paperSize}>
                      {paperSize}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <EditPrinter printer={printer} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
