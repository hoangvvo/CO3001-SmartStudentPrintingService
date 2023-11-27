"use client";

import { userFileApi } from "@/apis/user-file";
import { PageHeader } from "@/components/views/page-header";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { UserFileCard } from "./_components/FileCard";

export default function FilesPage() {
  const { data } = useQuery({
    queryKey: ["user-files"],
    queryFn: userFileApi.listUserFiles,
  });

  return (
    <div className="container">
      <PageHeader
        title="My Files"
        subtitle="Manage all your files in one place"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data?.files.map((file) => (
          <Link href={`/files/${file.id}`} key={file.id}>
            <UserFileCard key={file.id} userFile={file} />
          </Link>
        ))}
      </div>
    </div>
  );
}
