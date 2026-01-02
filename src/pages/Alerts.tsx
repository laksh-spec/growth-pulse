import { Bell, ChevronRight, Plus, Filter, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/dashboard/StatusBadge";

const mockAlerts = [
  {
    id: "1",
    type: "spike",
    title: "Viral Video Detected",
    description: "Uber vs Ola comparison video gained 500K views in 24 hours",
    category: "Cab Comparison",
    timestamp: "2 hours ago",
    status: "success" as const,
    icon: TrendingUp,
  },
  {
    id: "2",
    type: "threshold",
    title: "Install Goal Reached",
    description: "Monthly app installs exceeded 10,000 target",
    category: "Product Metrics",
    timestamp: "5 hours ago",
    status: "success" as const,
    icon: TrendingUp,
  },
  {
    id: "3",
    type: "anomaly",
    title: "Extension Install Drop",
    description: "Extension installs down 15% compared to last week",
    category: "Product Metrics",
    timestamp: "1 day ago",
    status: "warning" as const,
    icon: TrendingDown,
  },
  {
    id: "4",
    type: "correlation",
    title: "New Correlation Found",
    description: "Strong correlation detected between Education videos and Spend Lens usage",
    category: "Intelligence",
    timestamp: "2 days ago",
    status: "info" as const,
    icon: AlertTriangle,
  },
];

export default function Alerts() {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Bell className="h-4 w-4" />
          <span>Notifications</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Alerts</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Alerts & Notifications</h1>
            <p className="text-muted-foreground">
              Monitor spikes, anomalies, and goal completions
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Alert Rule
          </Button>
        </div>
      </div>

      {/* Alert Cards */}
      <div className="space-y-4">
        {mockAlerts.map((alert) => (
          <div
            key={alert.id}
            className="bg-card rounded-xl border border-border/50 p-5 hover:shadow-card transition-shadow cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                alert.status === "success" ? "bg-success/15 text-success" :
                alert.status === "warning" ? "bg-warning/15 text-warning" :
                "bg-info/15 text-info"
              }`}>
                <alert.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">{alert.title}</h3>
                  <StatusBadge status={alert.status} label={alert.category} />
                </div>
                <p className="text-muted-foreground mb-2">{alert.description}</p>
                <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {mockAlerts.length === 0 && (
        <div className="text-center py-16">
          <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No alerts yet</h3>
          <p className="text-muted-foreground mb-4">
            Create alert rules to get notified about important changes
          </p>
          <Button>Create First Alert</Button>
        </div>
      )}
    </DashboardLayout>
  );
}
