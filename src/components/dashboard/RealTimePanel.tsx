import { Activity, Users, Zap, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface RealTimePanelProps {
  className?: string;
}

// Mock real-time data - will be replaced with actual API data
const realtimeMetrics = [
  { property: "Extension New", activeUsers: 234, icon: Zap },
  { property: "Extension Post Install", activeUsers: 156, icon: Zap },
  { property: "Price Tracker", activeUsers: 89, icon: Activity },
  { property: "Spend Lens", activeUsers: 45, icon: Globe },
  { property: "Goodies Landing", activeUsers: 23, icon: Users },
];

export function RealTimePanel({ className }: RealTimePanelProps) {
  const totalActiveUsers = realtimeMetrics.reduce((acc, m) => acc + m.activeUsers, 0);

  return (
    <div className={cn("bg-card rounded-xl border border-border/50 overflow-hidden", className)}>
      <div className="bg-card-header px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm font-medium text-card-header-foreground uppercase tracking-wider">
            Real-Time
          </span>
        </div>
        <span className="text-xs text-card-header-foreground/70">
          Last 30 minutes
        </span>
      </div>
      
      <div className="p-5">
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-foreground">{totalActiveUsers}</div>
          <div className="text-sm text-muted-foreground mt-1">Active Users Now</div>
        </div>

        <div className="space-y-3">
          {realtimeMetrics.map((metric) => (
            <div
              key={metric.property}
              className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                  <metric.icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">{metric.property}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">{metric.activeUsers}</span>
                <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
