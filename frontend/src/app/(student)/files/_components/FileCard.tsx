import { UserFile } from "@/apis/openapi";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar, FileType } from "lucide-react";
import prettyBytes from "pretty-bytes";
import { FC, ReactNode } from "react";

export const UserFileCard: FC<{
  userFile: UserFile;
  footer?: ReactNode;
  horizontal?: boolean;
}> = ({ userFile, footer, horizontal }) => {
  return (
    <Card>
      <div className={cn(horizontal && "md:flex flex-row gap-4")}>
        <CardHeader className="flex flex-row gap-4">
          <div className="flex flex-col gap-2 flex-1">
            <CardTitle>{userFile.file_name}</CardTitle>
            <CardDescription>{prettyBytes(userFile.file_size)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent
          className={cn(
            `flex flex-col gap-2`,
            horizontal && `md:grid grid-cols-1 grid-rows-2 md:pt-4`,
          )}
        >
          <div className="flex items-center">
            <FileType className="w-4 h-4 mr-2" />
            <Badge variant="secondary">{userFile.file_type}</Badge>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <Badge variant="secondary">
              {format(userFile.created_at, "dd/MM/yyyy HH:mm")}
            </Badge>
          </div>
        </CardContent>
      </div>
      <CardFooter className="flex gap-2">{footer}</CardFooter>
    </Card>
  );
};
