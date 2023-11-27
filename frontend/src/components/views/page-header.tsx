import { FC, ReactNode } from "react";

export const PageHeader: FC<{
  title: ReactNode;
  subtitle?: string;
  actions?: ReactNode;
}> = ({ title, subtitle, actions }) => {
  return (
    <div className="flex py-8 justify-between items-center flex-col gap-4 lg:flex-row">
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2 flex-wrap">{actions}</div>
    </div>
  );
};
