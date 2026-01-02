import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "success" | "warning" | "error" | "info";
  label: string;
  className?: string;
}

const statusStyles = {
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  error: "bg-destructive/15 text-destructive",
  info: "bg-info/15 text-info",
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  return (
    <span className={cn("status-badge", statusStyles[status], className)}>
      {label}
    </span>
  );
}
