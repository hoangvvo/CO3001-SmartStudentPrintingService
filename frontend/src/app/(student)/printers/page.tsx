"use client";

import { printerApi } from "@/apis/printer";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/views/page-header";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PrinterCard } from "./_components/PrinterCard";

export default function PrintersPage() {
  const { data } = useQuery({
    queryKey: ["printers"],
    queryFn: printerApi.listPrinters,
  });

  return (
    <div className="container">
      <PageHeader
        title="Printers"
        subtitle="All printers available in your school"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data?.printers.map((printer) => (
          <PrinterCard
            key={printer.id}
            printer={printer}
            footer={
              <Link href={`/print?printer_id=${printer.id}`} legacyBehavior>
                {printer.paper_count <= 0 ? (
                  <Button variant="outline" className="w-full" disabled>
                    No Paper
                  </Button>
                ) : !printer.is_enabled ? (
                  <Button variant="outline" className="w-full" disabled>
                    Disabled
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full justify-between">
                    Print
                    <ArrowRight width={16} height={16} />
                  </Button>
                )}
              </Link>
            }
          />
        ))}
      </div>
    </div>
  );
}
