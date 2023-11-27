import { Printer } from "@/apis/openapi";
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
import { FileText, MapPin, Ruler, Sparkle } from "lucide-react";
import Image from "next/image";
import { FC, ReactNode } from "react";
import { CAPABILITIES_LABELS } from "./constants";

export const PrinterCard: FC<{
  printer: Printer;
  footer?: ReactNode;
  horizontal?: boolean;
}> = ({ printer, footer, horizontal }) => {
  return (
    <Card>
      <div className={cn(horizontal && "md:flex flex-row gap-4")}>
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
        <CardContent
          className={cn(
            `flex flex-col gap-2`,
            horizontal && `md:grid grid-cols-2 grid-rows-2 md:pt-4`,
          )}
        >
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
      </div>
      <CardFooter className="flex gap-2">{footer}</CardFooter>
    </Card>
  );
};
