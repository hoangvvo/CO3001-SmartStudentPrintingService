import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC } from "react";
import { SelectFileSelected } from "./select-file-selected";
import { SelectFileUpload } from "./select-file-upload";

export const SelectFile: FC<{
  onSelected: (fileId: number) => void;
  onConfirm: (fileId: number) => void;
  onCanceled: () => void;
  fileId?: number | null;
}> = ({ onSelected, fileId, onCanceled, onConfirm }) => {
  return (
    <div className="flex flex-col gap-4">
      <Alert>
        <AlertTitle>Select file</AlertTitle>
        <AlertDescription>
          Select the file you would like to print
        </AlertDescription>
      </Alert>
      {fileId ? (
        <SelectFileSelected
          fileId={fileId}
          onCanceled={onCanceled}
          onConfirm={onConfirm}
        />
      ) : (
        <Tabs defaultValue="upload" className="max-w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="upload">File Upload</TabsTrigger>
            <TabsTrigger value="select-existing">Recent uploads</TabsTrigger>
            <TabsTrigger value="select-integrations">Integrations</TabsTrigger>
          </TabsList>
          <TabsContent value="upload">
            <SelectFileUpload onSelected={onSelected} />
          </TabsContent>
          <TabsContent value="select-existing">Select Existing</TabsContent>
          <TabsContent value="select-integrations">
            Select Integrations
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};
