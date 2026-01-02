import { useState } from "react";
import { BarChart3, ChevronRight, Activity, Users, Globe } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { RealTimePanel } from "@/components/dashboard/RealTimePanel";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockGaProperties } from "@/data/mockData";

const gaMetricsData = [
  { date: "Jan", views: 12000, installs: 450, searches: 8500 },
  { date: "Feb", views: 14500, installs: 520, searches: 9200 },
  { date: "Mar", views: 13200, installs: 480, searches: 8800 },
  { date: "Apr", views: 16800, installs: 620, searches: 11500 },
  { date: "May", views: 15400, installs: 580, searches: 10200 },
  { date: "Jun", views: 19200, installs: 720, searches: 13500 },
  { date: "Jul", views: 18100, installs: 680, searches: 12800 },
  { date: "Aug", views: 22500, installs: 850, searches: 16200 },
  { date: "Sep", views: 24800, installs: 920, searches: 18500 },
  { date: "Oct", views: 23200, installs: 880, searches: 17200 },
  { date: "Nov", views: 28500, installs: 1050, searches: 21500 },
  { date: "Dec", views: 32400, installs: 1200, searches: 25800 },
];

export default function Analytics() {
  const [selectedProperty, setSelectedProperty] = useState("all");

  const totalActiveUsers = mockGaProperties.reduce((acc, p) => acc + p.activeUsers, 0);
  const totalNewUsers = mockGaProperties.reduce((acc, p) => acc + p.newUsers, 0);
  const totalSessions = mockGaProperties.reduce((acc, p) => acc + p.sessions, 0);

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <BarChart3 className="h-4 w-4" />
          <span>Analytics</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Google Analytics</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">GA Analytics</h1>
            <p className="text-muted-foreground">
              Track metrics across all GA4 properties
            </p>
          </div>
          <Select value={selectedProperty} onValueChange={setSelectedProperty}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select property" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties (Aggregate)</SelectItem>
              {mockGaProperties.map((prop) => (
                <SelectItem key={prop.id} value={prop.id}>
                  {prop.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <KpiCard
          title="Active Users"
          value={totalActiveUsers.toLocaleString()}
          trend={{ value: 8.2, label: "vs last week" }}
          icon={<Activity className="h-4 w-4" />}
        />
        <KpiCard
          title="New Users"
          value={totalNewUsers.toLocaleString()}
          trend={{ value: 12.5, label: "vs last week" }}
          icon={<Users className="h-4 w-4" />}
        />
        <KpiCard
          title="Sessions"
          value={totalSessions.toLocaleString()}
          trend={{ value: 5.8, label: "vs last week" }}
          icon={<Globe className="h-4 w-4" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ChartCard
          title="Historical Metrics"
          subtitle="Sessions and events over time"
          className="lg:col-span-2"
        >
          <PerformanceChart data={gaMetricsData} />
        </ChartCard>

        <RealTimePanel />
      </div>

      {/* Property Breakdown Table */}
      <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Property Breakdown</h3>
          <p className="text-sm text-muted-foreground">
            Metrics per GA4 property
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Active Users</th>
                <th>New Users</th>
                <th>Sessions</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockGaProperties.map((prop) => (
                <tr key={prop.id} className="cursor-pointer hover:bg-muted/50">
                  <td>
                    <div>
                      <p className="font-medium">{prop.name}</p>
                      <p className="text-xs text-muted-foreground">{prop.id}</p>
                    </div>
                  </td>
                  <td className="font-medium">{prop.activeUsers}</td>
                  <td className="font-medium">{prop.newUsers}</td>
                  <td className="font-medium">{prop.sessions}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                      <span className="text-sm text-success">Active</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
