import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { FC } from "react";

export const StatCard: FC<{
  title: string;
  Icon: LucideIcon;
  children: React.ReactNode;
  footer: string;
}> = ({ title, Icon, children, footer }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="w-6 h-6" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{children}</div>
        <p className="text-xs text-muted-foreground">{footer}</p>
      </CardContent>
    </Card>
  );
};
