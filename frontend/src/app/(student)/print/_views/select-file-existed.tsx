import { userFileApi } from "@/apis/user-file";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { UserFileCard } from "../../files/_components/FileCard";

export const SelectFileExisted: FC<{
  onSelected: (fileId: number) => void;
  fileId?: number | null;
}> = ({ onSelected, fileId }) => {
  const { data } = useQuery({
    queryKey: ["user-files"],
    queryFn: userFileApi.listUserFiles,
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {data?.files.map((file) => (
        <UserFileCard
          key={file.id}
          userFile={file}
          footer={
            fileId === file.id ? (
              <Button
                variant="link"
                className="w-full"
                onClick={() => onSelected(file.id)}
              >
                Selected
              </Button>
            ) : (
              <Button className="w-full" onClick={() => onSelected(file.id)}>
                Select
              </Button>
            )
          }
        />
      ))}
    </div>
  );
};
