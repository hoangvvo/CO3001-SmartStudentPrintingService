"use client";

import { printerApi } from "@/apis/printer";
import { useQuery } from "@tanstack/react-query";
import { AddPrinter } from "./_components/AddPrinter";

export default function PrintersPage() {
  const { data } = useQuery({
    queryKey: ["printers"],
    queryFn: printerApi.listPrinters,
  });

  return (
    <div className="container">
      <div className="flex py-4 justify-between items-center">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Printers</h2>
          <p className="text-muted-foreground">
            Manage printers in your school
          </p>
        </div>
        <AddPrinter />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"></div>
    </div>
  );
}
