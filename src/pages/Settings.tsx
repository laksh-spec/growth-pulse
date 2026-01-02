import { Settings as SettingsIcon, ChevronRight, Key, Users, Database, Bell, Link } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const settingsSections = [
  {
    icon: Key,
    title: "API Integrations",
    description: "Connect YouTube Data API and Google Analytics",
    status: "Not Connected",
    action: "Configure",
  },
  {
    icon: Users,
    title: "Team Management",
    description: "Manage team members and permissions",
    status: "1 Member",
    action: "Manage",
  },
  {
    icon: Database,
    title: "Data Sync",
    description: "Configure automatic data synchronization",
    status: "Active",
    action: "Settings",
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Configure alert preferences and channels",
    status: "Email enabled",
    action: "Configure",
  },
  {
    icon: Link,
    title: "Webhooks",
    description: "Set up external integrations and webhooks",
    status: "0 Configured",
    action: "Add",
  },
];

export default function SettingsPage() {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <SettingsIcon className="h-4 w-4" />
          <span>Configuration</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Settings</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Configure integrations, team access, and preferences
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-4 mb-8">
        {settingsSections.map((section) => (
          <div
            key={section.title}
            className="bg-card rounded-xl border border-border/50 p-5 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                <section.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{section.title}</h3>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{section.status}</span>
              <Button variant="outline" size="sm">
                {section.action}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Preferences */}
      <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Preferences</h3>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">Auto-refresh real-time data</p>
              <p className="text-sm text-muted-foreground">Update real-time panel every 30 seconds</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">Email daily digest</p>
              <p className="text-sm text-muted-foreground">Receive daily summary of key metrics</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">Spike detection alerts</p>
              <p className="text-sm text-muted-foreground">Get notified when videos go viral</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
