import { ReactNode } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    label: string;
  };
  icon?: ReactNode;
  className?: string;
}

export function KpiCard({ title, value, trend, icon, className }: KpiCardProps) {
  const isPositive = trend && trend.value > 0;
  const isNegative = trend && trend.value < 0;
  const isNeutral = trend && trend.value === 0;

  return (
    <div className={cn("kpi-card animate-slide-in-up", className)}>
      <div className="kpi-card-header flex items-center justify-between">
        <span>{title}</span>
        {icon && (
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
      </div>
      <div className="kpi-card-body">
        <div className="kpi-value animate-count-up">{value}</div>
        {trend && (
          <div
            className={cn(
              "kpi-trend",
              isPositive && "kpi-trend-positive",
              isNegative && "kpi-trend-negative",
              isNeutral && "text-muted-foreground"
            )}
          >
            {isPositive && <TrendingUp className="h-4 w-4" />}
            {isNegative && <TrendingDown className="h-4 w-4" />}
            {isNeutral && <Minus className="h-4 w-4" />}
            <span>
              {isPositive ? "+" : ""}
              {trend.value}%
            </span>
            <span className="text-muted-foreground ml-1">{trend.label}</span>
          </div>
        )}
      </div>
    </div>
  );
}
