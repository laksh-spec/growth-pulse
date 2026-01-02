import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function ChartCard({ title, subtitle, children, actions, className }: ChartCardProps) {
  return (
    <div className={cn("chart-container", className)}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="chart-title">{title}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground -mt-2">{subtitle}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  );
}
