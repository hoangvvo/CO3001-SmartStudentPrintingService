import { userFileApi } from "@/apis/user-file";
import { FILE_ICONS } from "@/app/(student)/files/_components/constants";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import prettyBytes from "pretty-bytes";
import { FC, ReactNode } from "react";

export const SelectFileSelected: FC<{
  fileId: number;
  onCanceled: () => void;
  onConfirm: (fileId: number) => void;
}> = ({ fileId, onConfirm, onCanceled }) => {
  const { data, error, isPending } = useQuery({
    queryKey: ["user-files", fileId],
    queryFn: () => userFileApi.getUserFile(fileId),
  });

  if (error) {
    return (
      <>
        <Alert>
          <AlertTitle>Could not find file</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
        <Button variant="outline" onClick={onCanceled}>
          Select another
        </Button>
      </>
    );
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  const file = data?.file;
  if (!file) return null;

  const fileIcon =
    (Object.entries(FILE_ICONS).find(([key, Icon]) =>
      file.file_type.includes(key),
    )?.[1] as ReactNode) || FILE_ICONS["default"];

  return (
    <div className="flex flex-col gap-4 w-full">
      <p className="text-lg font-bold text-secondary-foreground">
        Selected file
      </p>
      <div className="rounded-xl border bg-card text-card-foreground shadow flex p-4 items-center">
        {fileIcon}
        <div className="ml-4 space-y-1 flex-1">
          <p className="text-sm font-medium leading-none">{file.file_name}</p>
          <p className="text-sm text-muted-foreground">
            {prettyBytes(file.file_size)}
          </p>
        </div>
        <Check className="w-6 h-6 text-primary" />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onCanceled}>
          Select another
        </Button>
        <Button onClick={() => onConfirm(fileId)}>Next</Button>
      </div>
    </div>
  );
};
