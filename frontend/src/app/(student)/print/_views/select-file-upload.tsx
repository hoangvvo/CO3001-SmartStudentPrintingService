import { parseResponseError } from "@/apis/error";
import { systemConfigurationApi } from "@/apis/system-configration";
import { userFileApi } from "@/apis/user-file";
import { FILE_ICONS } from "@/app/(student)/files/_components/constants";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Info, UploadCloud } from "lucide-react";
import prettyBytes from "pretty-bytes";
import { FC, ReactNode, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export const SelectFileUpload: FC<{
  onSelected: (fileId: number) => void;
}> = ({ onSelected }) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { data: dataSystemConfigration } = useQuery({
    queryKey: ["system-configuration"],
    queryFn: systemConfigurationApi.getSystemConfiguration,
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept:
      dataSystemConfigration?.system_configuration.permitted_file_types.reduce(
        (acc, type) => {
          acc[type] = [];
          return acc;
        },
        {} as Record<string, string[]>,
      ),
    maxFiles: 1,
    disabled: !dataSystemConfigration?.system_configuration,
    maxSize: dataSystemConfigration?.system_configuration.max_file_size,
  });

  const onClear = () => {
    setFile(null);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: userFileApi.createUserFile,
    onSuccess: (data) => {
      toast({
        title: "File uploaded",
        description: "Your file has been uploaded",
      });
      onSelected(data.file.id);
      queryClient.invalidateQueries({
        queryKey: ["user-files"],
      });
    },
    onError: (error) => {
      parseResponseError(error).then((error) => {
        toast({
          title: "Error uploading file",
          description: error.message,
          variant: "destructive",
        });
      });
    },
  });

  const onUpload = () => {
    if (!file) return;
    mutation.mutate({ file });
  };

  if (file) {
    const fileIcon =
      (Object.entries(FILE_ICONS).find(([key, Icon]) =>
        file.type.includes(key),
      )?.[1] as ReactNode) || FILE_ICONS["default"];

    return (
      <div className="flex flex-col gap-4 w-full">
        <p className="text-lg font-bold text-secondary-foreground">
          Selected file
        </p>
        <div className="rounded-xl border bg-card text-card-foreground shadow flex p-4 items-center">
          {fileIcon}
          <div className="ml-4 space-y-1 flex-1">
            <p className="text-sm font-medium leading-none">{file.name}</p>
            <p className="text-sm text-muted-foreground">
              {prettyBytes(file.size)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onClear}>
            Select another
          </Button>
          <Button onClick={onUpload} disabled={mutation.isPending}>
            {mutation.isPending ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div
        {...getRootProps()}
        className="border-2 border-dashed rounded-lg p-4 flex flex-col gap-4 h-72 items-center justify-center text-muted-foreground"
      >
        <input {...getInputProps()} />
        <UploadCloud className="w-16 h-16" />
        <p>You can drag and drop some files here, or click to select files</p>
        {dataSystemConfigration?.system_configuration && (
          <div className="flex items-center gap-4">
            <Info className="w-4 h-4" />
            <p className="text-sm min-w-0 flex-1">
              Accept:{" "}
              {dataSystemConfigration.system_configuration.permitted_file_types.join(
                ", ",
              )}{" "}
              <br />
              Max file size:{" "}
              {prettyBytes(
                dataSystemConfigration.system_configuration.max_file_size || 0,
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
