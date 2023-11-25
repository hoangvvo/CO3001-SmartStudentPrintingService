import { Printer, UserRoleEnum } from "@/apis/openapi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserStore } from "@/stores/user.store";
import { FileText, MapPin, Ruler, Sparkle } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { CAPABILITIES_LABELS } from "./constants";

export const PrinterCard: FC<{ printer: Printer }> = ({ printer }) => {
  const { user } = useUserStore();
  return (
    <Card>
      <CardHeader className="flex flex-row gap-4">
        {printer.image_url && (
          <div className="w-16 overflow-hidden relative">
            <Image
              src={printer.image_url}
              objectFit="contain"
              fill
              alt="Printer"
            />
          </div>
        )}
        <div className="flex flex-col gap-2 flex-1">
          <CardTitle>{printer.brand_name}</CardTitle>
          <CardDescription>{printer.model_name}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center">
          <Ruler className="w-4 h-4 mr-2" />
          <div className="flex items-center gap-1 flex-wrap flex-1">
            {printer.paper_sizes.map((paperSize) => (
              <Badge variant="outline" key={paperSize}>
                {paperSize}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <Sparkle className="w-4 h-4 mr-2" />
          <div className="flex items-center gap-1 flex-wrap flex-1">
            {printer.capabilities.map((capability) => (
              <Badge variant="outline" key={capability}>
                {CAPABILITIES_LABELS[capability]}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <FileText className="w-4 h-4 mr-2" />
          <Badge variant="secondary">{printer.paper_count} pages</Badge>
        </div>
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-2" />
          <Badge variant="secondary">{printer.location}</Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {user?.role === UserRoleEnum.Admin ||
        user?.role === UserRoleEnum.Spso ? (
          <Button variant="outline" className="flex-1">
            Manage
          </Button>
        ) : null}
        <Button className="flex-1">Print</Button>
      </CardFooter>
    </Card>
  );
};
