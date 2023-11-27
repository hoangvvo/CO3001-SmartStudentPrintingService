"use client";

import { userFileApi } from "@/apis/user-file";
import { ErrorPage } from "@/components/pages/error-page";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/views/page-header";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Download, Printer, Trash } from "lucide-react";
import Link from "next/link";
import prettyBytes from "pretty-bytes";

export default function FilePage({
  params,
}: {
  params: {
    file_id: string;
  };
}) {
  const { data, error, isPending } = useQuery({
    queryKey: ["user-files", params.file_id],
    queryFn: () => userFileApi.getUserFile(Number(params.file_id)),
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <ErrorPage title="Could not load file" message={error.message} />;
  }

  const file = data?.file;

  if (!file) return null;

  return (
    <div className="container">
      <PageHeader title={file.file_name} subtitle={file.user?.name} />
      <div className="flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-4xl w-full">
          <div className="flex flex-col justify-center items-start gap-4 px-4">
            <h2 className="text-secondary-foreground font-bold">File Type</h2>
            <p className="text-lg">{file.file_type}</p>
          </div>
          <div className="flex flex-col justify-center items-start gap-4 px-4">
            <h2 className="text-secondary-foreground font-bold">File Size</h2>
            <p className="text-lg">{prettyBytes(file.file_size)}</p>
          </div>
          <div className="flex flex-col justify-center items-start gap-4 px-4">
            <h2 className="text-secondary-foreground font-bold">Uploaded on</h2>
            <p className="text-lg">
              {format(file.created_at, "dd MMM yyyy HH:mm")}
            </p>
          </div>
        </div>
        <Separator />
        <div className="flex gap-4">
          <Link
            href={`/print?file_id=${file.id}`}
            className={buttonVariants({
              variant: "secondary",
            })}
          >
            <Printer className="w-4 h-4 mr-2" /> Print
          </Link>
          <a
            className={buttonVariants({
              variant: "secondary",
            })}
            href={`/api/files/${file.id}/download`}
            download
          >
            <Download className="w-4 h-4 mr-2" /> Download
          </a>
          <Button variant="destructive">
            <Trash className="w-4 h-4 mr-2" /> Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
